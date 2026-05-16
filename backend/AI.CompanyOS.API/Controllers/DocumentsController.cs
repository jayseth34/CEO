using AI.CompanyOS.API.Data;
using AI.CompanyOS.API.DTOs;
using AI.CompanyOS.API.Models;
using AI.CompanyOS.API.Services;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace AI.CompanyOS.API.Controllers;

[ApiController]
[Route("api")]
public class DocumentsController(AppDbContext db, AgentService agentSvc, IConfiguration config) : ControllerBase
{
    private string ConnStr => config.GetConnectionString("DefaultConnection")!;

    // ── Documents ────────────────────────────────────────────────────────────

    [HttpPost("projects/{id:guid}/analyze")]
    public async Task<ActionResult> Analyze(Guid id, [FromBody] AnalyzeCodebaseDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.GitHubUrl) && string.IsNullOrWhiteSpace(dto.LocalPath))
            return BadRequest(new { error = "Provide either a GitHub URL or a local path." });

        var project = await db.Projects.FindAsync(id);
        if (project == null) return NotFound();

        try
        {
            var docs = await agentSvc.AnalyzeCodebaseAsync(id, dto.GitHubUrl, dto.LocalPath);
            return Ok(docs.Select(d => new ProjectDocumentDto(
                d.Id, d.ProjectId, d.DocumentType, d.Title, d.Content, d.GitSource, d.GeneratedAt)));
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("projects/{id:guid}/documents")]
    public async Task<ActionResult<List<ProjectDocumentDto>>> GetDocuments(Guid id)
    {
        using var conn = new NpgsqlConnection(ConnStr);
        var docs = await conn.QueryAsync<ProjectDocumentDto>(@"
            SELECT
                id,
                project_id      AS ProjectId,
                document_type   AS DocumentType,
                title           AS Title,
                content         AS Content,
                git_source      AS GitSource,
                generated_at    AS GeneratedAt
            FROM project_documents
            WHERE project_id = @ProjectId
            ORDER BY generated_at DESC
        ", new { ProjectId = id });

        return Ok(docs);
    }

    [HttpGet("documents/{id:guid}/download")]
    public async Task<IActionResult> Download(Guid id)
    {
        var doc = await db.ProjectDocuments.FindAsync(id);
        if (doc == null) return NotFound();

        var bytes = System.Text.Encoding.UTF8.GetBytes(doc.Content);
        var filename = $"{doc.DocumentType}_{doc.GeneratedAt:yyyyMMdd_HHmm}.md";
        return File(bytes, "text/markdown; charset=utf-8", filename);
    }

    [HttpDelete("documents/{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var doc = await db.ProjectDocuments.FindAsync(id);
        if (doc == null) return NotFound();
        db.ProjectDocuments.Remove(doc);
        await db.SaveChangesAsync();
        return NoContent();
    }

    // ── Team / Members ────────────────────────────────────────────────────────

    /// <summary>Returns project members with their active-task counts.</summary>
    [HttpGet("projects/{id:guid}/team")]
    public async Task<ActionResult> GetTeam(Guid id)
    {
        using var conn = new NpgsqlConnection(ConnStr);
        var team = await conn.QueryAsync(@"
            SELECT
                r.id            AS ResourceId,
                r.name          AS ResourceName,
                r.role          AS Role,
                COUNT(t.id) FILTER (WHERE t.status IN ('todo','in_progress','review'))::int AS ActiveTasks
            FROM project_members pm
            JOIN resources r ON r.id = pm.resource_id
            LEFT JOIN tasks t ON t.assigned_resource_id = r.id AND t.project_id = @ProjectId
            WHERE pm.project_id = @ProjectId
            GROUP BY r.id, r.name, r.role
            ORDER BY r.name
        ", new { ProjectId = id });

        return Ok(team);
    }

    /// <summary>Returns ALL resources, each tagged with whether they are a member of this project.</summary>
    [HttpGet("projects/{id:guid}/members/all")]
    public async Task<ActionResult> GetAllResources(Guid id)
    {
        using var conn = new NpgsqlConnection(ConnStr);
        var rows = await conn.QueryAsync(@"
            SELECT
                r.id        AS ResourceId,
                r.name      AS ResourceName,
                r.role      AS Role,
                r.agent_type AS AgentType,
                EXISTS(
                    SELECT 1 FROM project_members pm
                    WHERE pm.project_id = @ProjectId AND pm.resource_id = r.id
                ) AS IsMember
            FROM resources r
            ORDER BY r.name
        ", new { ProjectId = id });

        return Ok(rows);
    }

    /// <summary>Add a resource to the project team.</summary>
    [HttpPost("projects/{projectId:guid}/members/{resourceId:guid}")]
    public async Task<IActionResult> AddMember(Guid projectId, Guid resourceId)
    {
        if (!await db.Projects.AnyAsync(p => p.Id == projectId)) return NotFound("Project not found");
        if (!await db.Resources.AnyAsync(r => r.Id == resourceId)) return NotFound("Resource not found");

        var exists = await db.ProjectMembers
            .AnyAsync(m => m.ProjectId == projectId && m.ResourceId == resourceId);
        if (!exists)
        {
            db.ProjectMembers.Add(new ProjectMember { ProjectId = projectId, ResourceId = resourceId });
            await db.SaveChangesAsync();
        }

        return Ok();
    }

    /// <summary>Remove a resource from the project team.</summary>
    [HttpDelete("projects/{projectId:guid}/members/{resourceId:guid}")]
    public async Task<IActionResult> RemoveMember(Guid projectId, Guid resourceId)
    {
        var member = await db.ProjectMembers
            .FirstOrDefaultAsync(m => m.ProjectId == projectId && m.ResourceId == resourceId);
        if (member == null) return NotFound();

        db.ProjectMembers.Remove(member);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
