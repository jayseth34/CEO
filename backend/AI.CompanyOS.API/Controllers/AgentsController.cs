using AI.CompanyOS.API.Data;
using AI.CompanyOS.API.DTOs;
using AI.CompanyOS.API.Services;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace AI.CompanyOS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AgentsController(AppDbContext db, AgentService agentSvc, IConfiguration config) : ControllerBase
{
    private string ConnStr => config.GetConnectionString("DefaultConnection")!;

    [HttpGet("logs")]
    public async Task<ActionResult<List<AgentLogDto>>> GetLogs([FromQuery] string? role, [FromQuery] int limit = 50)
    {
        using var conn = new NpgsqlConnection(ConnStr);
        var logs = await conn.QueryAsync<AgentLogDto>(@"
            SELECT id, agent_role AS AgentRole, action, details, level, created_at AS CreatedAt
            FROM agent_logs
            WHERE @Role IS NULL OR agent_role = @Role
            ORDER BY created_at DESC
            LIMIT @Limit
        ", new { Role = role, Limit = limit });

        return Ok(logs);
    }

    [HttpGet("decisions")]
    public async Task<ActionResult<List<AIDecisionDto>>> GetDecisions([FromQuery] int limit = 20)
    {
        using var conn = new NpgsqlConnection(ConnStr);
        var decisions = await conn.QueryAsync<AIDecisionDto>(@"
            SELECT id,
                   agent_role       AS AgentRole,
                   decision_type    AS DecisionType,
                   rationale,
                   confidence_score AS ConfidenceScore,
                   is_approved      AS IsApproved,
                   created_at       AS CreatedAt
            FROM ai_decisions
            ORDER BY created_at DESC
            LIMIT @Limit
        ", new { Limit = limit });

        return Ok(decisions);
    }

    [HttpPost("cto/analyze/{projectId:guid}")]
    public async Task<ActionResult<string>> CtoAnalyze(Guid projectId)
    {
        var analysis = await agentSvc.CtoAnalyzeProjectAsync(projectId);
        return Ok(new { analysis });
    }

    [HttpPost("orchestrator/rebalance")]
    public async Task<ActionResult> TriggerRebalance()
    {
        var count = await agentSvc.RebalanceWorkloadsAsync();
        return Ok(new { rebalanced = count, message = $"Rebalanced {count} tasks" });
    }

    [HttpGet("activity-summary")]
    public async Task<ActionResult> GetActivitySummary()
    {
        using var conn = new NpgsqlConnection(ConnStr);
        var summary = await conn.QueryAsync(@"
            SELECT
                agent_role,
                COUNT(*) AS total_actions,
                COUNT(*) FILTER (WHERE level = 'error') AS errors,
                MAX(created_at) AS last_active
            FROM agent_logs
            WHERE created_at > NOW() - INTERVAL '24 hours'
            GROUP BY agent_role
            ORDER BY total_actions DESC
        ");

        return Ok(summary);
    }

    [HttpPatch("decisions/{id:guid}/approve")]
    public async Task<IActionResult> ApproveDecision(Guid id, [FromBody] bool isApproved)
    {
        using var conn = new NpgsqlConnection(ConnStr);
        var affected = await conn.ExecuteAsync(
            "UPDATE ai_decisions SET is_approved = @IsApproved WHERE id = @Id",
            new { IsApproved = isApproved, Id = id });

        return affected > 0 ? NoContent() : NotFound();
    }
}
