using AI.CompanyOS.API.Data;
using AI.CompanyOS.API.DTOs;
using AI.CompanyOS.API.Hubs;
using AI.CompanyOS.API.Models;
using AI.CompanyOS.API.Services;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace AI.CompanyOS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController(
    AppDbContext db,
    AgentService agentSvc,
    IHubContext<AgentHub> hub,
    IConfiguration config) : ControllerBase
{
    private string ConnStr => config.GetConnectionString("DefaultConnection")!;

    [HttpGet]
    public async Task<ActionResult<List<TaskSummaryDto>>> GetAll([FromQuery] Guid? projectId, [FromQuery] string? status, [FromQuery] string? sprint)
    {
        using var conn = new NpgsqlConnection(ConnStr);
        var sql = @"
            SELECT
                t.id,
                t.project_id        AS ProjectId,
                p.name              AS ProjectName,
                t.title,
                t.status,
                t.priority,
                t.agent_role        AS AgentRole,
                t.sprint,
                t.estimated_hours   AS EstimatedHours,
                t.assigned_resource_id   AS AssignedResourceId,
                r.name              AS AssignedResourceName,
                t.assignment_score  AS AssignmentScore,
                t.due_date          AS DueDate,
                t.created_at        AS CreatedAt
            FROM tasks t
            JOIN projects p ON p.id = t.project_id
            LEFT JOIN resources r ON r.id = t.assigned_resource_id
            WHERE (@ProjectId IS NULL OR t.project_id = @ProjectId)
              AND (@Status IS NULL OR t.status = @Status)
              AND (@Sprint IS NULL OR t.sprint = @Sprint)
            ORDER BY
                CASE t.priority WHEN 'critical' THEN 1 WHEN 'high' THEN 2 WHEN 'medium' THEN 3 ELSE 4 END,
                t.created_at DESC
        ";

        var rows = await conn.QueryAsync<TaskSummaryDto>(sql, new { ProjectId = projectId, Status = status, Sprint = sprint });
        return Ok(rows);
    }

    [HttpGet("board/{projectId:guid}")]
    public async Task<ActionResult<TaskBoardDto>> GetBoard(Guid projectId)
    {
        using var conn = new NpgsqlConnection(ConnStr);
        var all = await conn.QueryAsync<TaskSummaryDto>(@"
            SELECT
                t.id,
                t.project_id        AS ProjectId,
                p.name              AS ProjectName,
                t.title,
                t.status,
                t.priority,
                t.agent_role        AS AgentRole,
                t.sprint,
                t.estimated_hours   AS EstimatedHours,
                t.assigned_resource_id   AS AssignedResourceId,
                r.name              AS AssignedResourceName,
                t.assignment_score  AS AssignmentScore,
                t.due_date          AS DueDate,
                t.created_at        AS CreatedAt
            FROM tasks t
            JOIN projects p ON p.id = t.project_id
            LEFT JOIN resources r ON r.id = t.assigned_resource_id
            WHERE t.project_id = @ProjectId
            ORDER BY t.created_at DESC
        ", new { ProjectId = projectId });

        var list = all.ToList();
        return Ok(new TaskBoardDto(
            list.Where(t => t.Status == "backlog").ToList(),
            list.Where(t => t.Status == "todo").ToList(),
            list.Where(t => t.Status == "in_progress").ToList(),
            list.Where(t => t.Status == "review").ToList(),
            list.Where(t => t.Status == "done").ToList()
        ));
    }

    [HttpPost]
    public async Task<ActionResult<ProjectTask>> Create([FromBody] CreateTaskDto dto)
    {
        var task = new ProjectTask
        {
            ProjectId = dto.ProjectId,
            Title = dto.Title,
            Description = dto.Description,
            Priority = dto.Priority,
            AgentRole = dto.AgentRole,
            EstimatedHours = dto.EstimatedHours,
            DueDate = dto.DueDate,
            Sprint = dto.Sprint
        };

        db.Tasks.Add(task);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { projectId = task.ProjectId }, task);
    }

    [HttpPatch("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateTaskDto dto)
    {
        using var conn = new NpgsqlConnection(ConnStr);

        // Adjust resource loads when reassigning
        if (dto.AssignedResourceId.HasValue)
        {
            var oldResourceId = await conn.QuerySingleOrDefaultAsync<Guid?>(
                "SELECT assigned_resource_id FROM tasks WHERE id = @Id", new { Id = id });

            if (oldResourceId.HasValue && oldResourceId.Value != dto.AssignedResourceId.Value)
                await conn.ExecuteAsync(
                    "UPDATE resources SET current_load = GREATEST(0, current_load - 1) WHERE id = @Id",
                    new { Id = oldResourceId.Value });

            if (!oldResourceId.HasValue || oldResourceId.Value != dto.AssignedResourceId.Value)
                await conn.ExecuteAsync(
                    "UPDATE resources SET current_load = current_load + 1 WHERE id = @Id",
                    new { Id = dto.AssignedResourceId.Value });
        }

        var affected = await conn.ExecuteAsync(@"
            UPDATE tasks SET
                title = COALESCE(@Title, title),
                description = COALESCE(@Description, description),
                status = COALESCE(@Status, status),
                priority = COALESCE(@Priority, priority),
                assigned_resource_id = COALESCE(@AssignedResourceId, assigned_resource_id),
                estimated_hours = COALESCE(@EstimatedHours, estimated_hours),
                actual_hours = COALESCE(@ActualHours, actual_hours),
                sprint = COALESCE(@Sprint, sprint),
                updated_at = NOW()
            WHERE id = @Id
        ", new { Id = id, dto.Title, dto.Description, dto.Status, dto.Priority, dto.AssignedResourceId, dto.EstimatedHours, dto.ActualHours, dto.Sprint });

        if (affected == 0) return NotFound();

        await hub.Clients.All.SendAsync("TaskUpdated", new { taskId = id, dto.Status });
        return NoContent();
    }

    [HttpPost("{id:guid}/assign")]
    public async Task<ActionResult> AutoAssign(Guid id)
    {
        var task = await db.Tasks.FindAsync(id);
        if (task == null) return NotFound();

        var (resource, score, rationale) = await agentSvc.AssignTaskAsync(task);
        if (resource == null) return BadRequest("No available resource found for this task");

        task.AssignedResourceId = resource.Id;
        task.AssignmentScore = score;
        task.Status = "todo";
        resource.CurrentLoad++;
        await db.SaveChangesAsync();

        await hub.Clients.All.SendAsync("TaskAssigned", new { taskId = id, resourceName = resource.Name, score, rationale });
        return Ok(new { resource.Name, score, rationale });
    }

    // ── Co-Assignees ─────────────────────────────────────────────────────────

    /// <summary>All co-assignees for every task in a project (one call, no N+1).</summary>
    [HttpGet("project/{projectId:guid}/assignees")]
    public async Task<ActionResult<List<ProjectTaskAssigneeDto>>> GetProjectCoAssignees(Guid projectId)
    {
        using var conn = new NpgsqlConnection(ConnStr);
        var rows = await conn.QueryAsync<ProjectTaskAssigneeDto>(@"
            SELECT
                ta.task_id      AS TaskId,
                ta.resource_id  AS ResourceId,
                r.name          AS ResourceName,
                r.role          AS Role
            FROM task_assignees ta
            JOIN resources r ON r.id = ta.resource_id
            JOIN tasks     t ON t.id = ta.task_id
            WHERE t.project_id = @ProjectId
            ORDER BY ta.assigned_at
        ", new { ProjectId = projectId });
        return Ok(rows);
    }

    /// <summary>Add a co-assignee to a task. Does NOT touch assigned_resource_id or current_load.</summary>
    [HttpPost("{id:guid}/assignees/{resourceId:guid}")]
    public async Task<IActionResult> AddCoAssignee(Guid id, Guid resourceId)
    {
        using var conn = new NpgsqlConnection(ConnStr);

        var taskExists = await conn.QuerySingleOrDefaultAsync<int?>(
            "SELECT 1 FROM tasks WHERE id = @Id", new { Id = id });
        if (taskExists == null) return NotFound("Task not found");

        await conn.ExecuteAsync(@"
            INSERT INTO task_assignees (task_id, resource_id)
            VALUES (@TaskId, @ResourceId)
            ON CONFLICT DO NOTHING
        ", new { TaskId = id, ResourceId = resourceId });

        await hub.Clients.All.SendAsync("TaskUpdated", new { taskId = id });
        return Ok();
    }

    /// <summary>Remove a co-assignee from a task.</summary>
    [HttpDelete("{id:guid}/assignees/{resourceId:guid}")]
    public async Task<IActionResult> RemoveCoAssignee(Guid id, Guid resourceId)
    {
        using var conn = new NpgsqlConnection(ConnStr);
        var affected = await conn.ExecuteAsync(@"
            DELETE FROM task_assignees
            WHERE task_id = @TaskId AND resource_id = @ResourceId
        ", new { TaskId = id, ResourceId = resourceId });

        if (affected == 0) return NotFound();

        await hub.Clients.All.SendAsync("TaskUpdated", new { taskId = id });
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        using var conn = new NpgsqlConnection(ConnStr);
        var affected = await conn.ExecuteAsync("DELETE FROM tasks WHERE id = @Id", new { Id = id });
        return affected > 0 ? NoContent() : NotFound();
    }
}
