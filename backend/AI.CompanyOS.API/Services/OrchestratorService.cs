using AI.CompanyOS.API.Data;
using AI.CompanyOS.API.Hubs;
using Dapper;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace AI.CompanyOS.API.Services;

// Background service that runs every 60s — checks for unassigned tasks, overloads, deadlines
public class OrchestratorService(
    IServiceScopeFactory scopeFactory,
    IHubContext<AgentHub> hub,
    IConfiguration config,
    ILogger<OrchestratorService> logger) : BackgroundService
{
    private string ConnStr => config.GetConnectionString("DefaultConnection")!;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("Orchestrator started");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await RunCycleAsync();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Orchestrator cycle failed");
            }

            await Task.Delay(TimeSpan.FromSeconds(60), stoppingToken);
        }
    }

    private async Task RunCycleAsync()
    {
        using var scope = scopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var agentSvc = scope.ServiceProvider.GetRequiredService<AgentService>();

        // 1. Find unassigned tasks and auto-assign them
        var unassigned = await db.Tasks
            .Where(t => t.AssignedResourceId == null && t.Status == "backlog")
            .Include(t => t.Project)
            .Take(10)
            .ToListAsync();

        foreach (var task in unassigned)
        {
            var (resource, score, rationale) = await agentSvc.AssignTaskAsync(task);
            if (resource != null)
            {
                task.AssignedResourceId = resource.Id;
                task.AssignmentScore = score;
                task.Status = "todo";
                resource.CurrentLoad++;

                await hub.Clients.All.SendAsync("TaskAssigned", new
                {
                    taskId = task.Id,
                    taskTitle = task.Title,
                    resourceName = resource.Name,
                    score,
                    rationale
                });

                logger.LogInformation("Auto-assigned task '{Title}' to {Name}", task.Title, resource.Name);
            }
        }

        // 2. Check for deadline risks using inline SQL
        using var conn = new NpgsqlConnection(ConnStr);
        var atRisk = await conn.QueryAsync<DeadlineRisk>(@"
            SELECT
                p.id as project_id,
                p.name as project_name,
                p.deadline,
                COUNT(t.id) FILTER (WHERE t.status NOT IN ('done')) as remaining_tasks,
                EXTRACT(DAY FROM p.deadline - NOW()) as days_remaining
            FROM projects p
            JOIN tasks t ON t.project_id = p.id
            WHERE p.status = 'active'
              AND p.deadline < NOW() + INTERVAL '7 days'
            GROUP BY p.id, p.name, p.deadline
            HAVING COUNT(t.id) FILTER (WHERE t.status NOT IN ('done')) > 0
        ");

        foreach (var risk in atRisk)
        {
            await hub.Clients.All.SendAsync("DeadlineAlert", new
            {
                projectId = risk.ProjectId,
                projectName = risk.ProjectName,
                daysRemaining = risk.DaysRemaining,
                remainingTasks = risk.RemainingTasks
            });
            logger.LogWarning("Deadline risk: {Name} — {Days} days, {Tasks} tasks remaining", risk.ProjectName, risk.DaysRemaining, risk.RemainingTasks);
        }

        // 3. Update resource current_load from actual task counts
        await conn.ExecuteAsync(@"
            UPDATE resources r
            SET current_load = (
                SELECT COUNT(*)
                FROM tasks t
                WHERE t.assigned_resource_id = r.id
                  AND t.status IN ('todo', 'in_progress', 'review')
            )
        ");

        // 4. Rebalance overloads
        var rebalanced = await agentSvc.RebalanceWorkloadsAsync();
        if (rebalanced > 0)
            await hub.Clients.All.SendAsync("WorkloadRebalanced", new { count = rebalanced });

        if (unassigned.Count > 0 || atRisk.Any() || rebalanced > 0)
            await db.SaveChangesAsync();
    }

    private record DeadlineRisk(Guid ProjectId, string ProjectName, DateTime Deadline, int RemainingTasks, double DaysRemaining);
}
