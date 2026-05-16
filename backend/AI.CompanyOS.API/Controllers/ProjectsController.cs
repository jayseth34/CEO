using AI.CompanyOS.API.Data;
using AI.CompanyOS.API.DTOs;
using AI.CompanyOS.API.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace AI.CompanyOS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController(AppDbContext db, IConfiguration config) : ControllerBase
{
    private string ConnStr => config.GetConnectionString("DefaultConnection")!;

    [HttpGet]
    public async Task<ActionResult<List<ProjectSummaryDto>>> GetAll()
    {
        using var conn = new NpgsqlConnection(ConnStr);
        var rows = await conn.QueryAsync<ProjectSummaryDto>(@"
            SELECT
                p.id,
                p.name,
                p.client_name       AS ClientName,
                p.status,
                p.priority,
                p.budget,
                p.deadline,
                COUNT(t.id)::int                                              AS TotalTasks,
                COUNT(t.id) FILTER (WHERE t.status = 'done')::int         AS CompletedTasks,
                COUNT(t.id) FILTER (WHERE t.status = 'in_progress')::int  AS InProgressTasks,
                p.created_at        AS CreatedAt
            FROM projects p
            LEFT JOIN tasks t ON t.project_id = p.id
            GROUP BY p.id, p.name, p.client_name, p.status, p.priority, p.budget, p.deadline, p.created_at
            ORDER BY p.created_at DESC
        ");

        return Ok(rows);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProjectDetailDto>> GetById(Guid id)
    {
        var project = await db.Projects
            .Include(p => p.Tasks).ThenInclude(t => t.AssignedResource)
            .Include(p => p.Requirements)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project == null) return NotFound();

        return Ok(new ProjectDetailDto(
            project.Id, project.Name, project.Description, project.ClientName,
            project.Status, project.Priority, project.Budget, project.Deadline,
            project.CreatedAt, project.UpdatedAt,
            project.Tasks.Select(t => new TaskSummaryDto(
                t.Id, t.ProjectId, project.Name, t.Title, t.Status, t.Priority,
                t.AgentRole, t.Sprint, t.EstimatedHours,
                t.AssignedResourceId, t.AssignedResource?.Name,
                t.AssignmentScore, t.DueDate, t.CreatedAt)).ToList(),
            project.Requirements.Select(r => new RequirementDto(
                r.Id, r.ProjectId, r.RawText, r.ParsedSummary, r.Status, r.TasksGenerated, r.CreatedAt)).ToList()
        ));
    }

    [HttpPost]
    public async Task<ActionResult<Project>> Create([FromBody] CreateProjectDto dto)
    {
        var project = new Project
        {
            Name = dto.Name,
            Description = dto.Description,
            ClientName = dto.ClientName,
            Budget = dto.Budget,
            Deadline = dto.Deadline,
            Priority = dto.Priority,
            Status = "planning"
        };

        db.Projects.Add(project);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = project.Id }, project);
    }

    [HttpPatch("{id:guid}/status")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] string status)
    {
        using var conn = new NpgsqlConnection(ConnStr);
        var affected = await conn.ExecuteAsync(
            "UPDATE projects SET status = @Status, updated_at = NOW() WHERE id = @Id",
            new { Status = status, Id = id });

        return affected > 0 ? NoContent() : NotFound();
    }

    [HttpGet("stats")]
    public async Task<ActionResult<DashboardStatsDto>> GetStats()
    {
        using var conn = new NpgsqlConnection(ConnStr);

        var stats = await conn.QuerySingleAsync<dynamic>(@"
            SELECT
                (SELECT COUNT(*) FROM projects) AS total_projects,
                (SELECT COUNT(*) FROM projects WHERE status = 'active') AS active_projects,
                (SELECT COUNT(*) FROM tasks) AS total_tasks,
                (SELECT COUNT(*) FROM tasks WHERE status = 'done') AS completed_tasks,
                (SELECT COUNT(*) FROM resources) AS total_resources,
                (SELECT COUNT(*) FROM resources WHERE is_available = true AND current_load < max_load) AS available_resources,
                (SELECT COALESCE(SUM(budget), 0) FROM projects) AS total_budget
        ");

        var recentActivity = await conn.QueryAsync<AgentActivityDto>(@"
            SELECT agent_role AS AgentRole, action, details, created_at AS Timestamp
            FROM agent_logs
            ORDER BY created_at DESC
            LIMIT 10
        ");

        return Ok(new DashboardStatsDto(
            (int)stats.total_projects, (int)stats.active_projects,
            (int)stats.total_tasks, (int)stats.completed_tasks,
            (int)stats.total_resources, (int)stats.available_resources,
            (decimal)stats.total_budget,
            recentActivity.ToList()
        ));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var project = await db.Projects.FindAsync(id);
        if (project == null) return NotFound();
        db.Projects.Remove(project);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
