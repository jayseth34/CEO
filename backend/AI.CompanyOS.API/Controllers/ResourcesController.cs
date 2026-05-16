using AI.CompanyOS.API.Data;
using AI.CompanyOS.API.DTOs;
using AI.CompanyOS.API.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace AI.CompanyOS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResourcesController(AppDbContext db, IConfiguration config) : ControllerBase
{
    private string ConnStr => config.GetConnectionString("DefaultConnection")!;

    [HttpGet]
    public async Task<ActionResult<List<ResourceDto>>> GetAll()
    {
        using var conn = new NpgsqlConnection(ConnStr);
        var rows = await conn.QueryAsync<ResourceDto>(@"
            SELECT
                r.id,
                r.name,
                r.email,
                r.role,
                r.agent_type        AS AgentType,
                r.skills::text      AS Skills,
                r.current_load      AS CurrentLoad,
                r.max_load          AS MaxLoad,
                r.performance_score AS PerformanceScore,
                r.is_available      AS IsAvailable,
                r.hourly_rate       AS HourlyRate,
                COUNT(t.id) FILTER (WHERE t.status IN ('todo','in_progress','review'))::int AS ActiveTaskCount
            FROM resources r
            LEFT JOIN tasks t ON t.assigned_resource_id = r.id
            GROUP BY r.id, r.name, r.email, r.role, r.agent_type, r.skills,
                     r.current_load, r.max_load, r.performance_score, r.is_available, r.hourly_rate
            ORDER BY r.agent_type, r.name
        ");

        return Ok(rows);
    }

    [HttpGet("{id:guid}/tasks")]
    public async Task<ActionResult<List<TaskSummaryDto>>> GetResourceTasks(Guid id)
    {
        using var conn = new NpgsqlConnection(ConnStr);
        var tasks = await conn.QueryAsync<TaskSummaryDto>(@"
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
            JOIN resources r ON r.id = t.assigned_resource_id
            WHERE t.assigned_resource_id = @ResourceId
            ORDER BY t.status, t.priority
        ", new { ResourceId = id });

        return Ok(tasks);
    }

    [HttpGet("workload")]
    public async Task<ActionResult> GetWorkloadSummary()
    {
        using var conn = new NpgsqlConnection(ConnStr);
        var rows = await conn.QueryAsync(@"
            SELECT
                r.name,
                r.role,
                r.current_load,
                r.max_load,
                ROUND((r.current_load::float / NULLIF(r.max_load, 0) * 100)::numeric, 1) AS utilization_pct,
                r.performance_score,
                COUNT(t.id) FILTER (WHERE t.status = 'in_progress') AS in_progress_count,
                COUNT(t.id) FILTER (WHERE t.status = 'todo') AS todo_count
            FROM resources r
            LEFT JOIN tasks t ON t.assigned_resource_id = r.id
            GROUP BY r.id, r.name, r.role, r.current_load, r.max_load, r.performance_score
            ORDER BY utilization_pct DESC NULLS LAST
        ");

        return Ok(rows);
    }

    [HttpPost]
    public async Task<ActionResult<Resource>> Create([FromBody] CreateResourceDto dto)
    {
        var resource = new Resource
        {
            Name = dto.Name,
            Email = dto.Email,
            Role = dto.Role,
            AgentType = dto.AgentType,
            Skills = dto.Skills,
            MaxLoad = dto.MaxLoad,
            HourlyRate = dto.HourlyRate
        };

        db.Resources.Add(resource);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), resource);
    }

    [HttpPatch("{id:guid}/availability")]
    public async Task<IActionResult> ToggleAvailability(Guid id, [FromBody] bool isAvailable)
    {
        using var conn = new NpgsqlConnection(ConnStr);
        var affected = await conn.ExecuteAsync(
            "UPDATE resources SET is_available = @IsAvailable WHERE id = @Id",
            new { IsAvailable = isAvailable, Id = id });

        return affected > 0 ? NoContent() : NotFound();
    }
}
