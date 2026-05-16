using AI.CompanyOS.API.Data;
using AI.CompanyOS.API.DTOs;
using AI.CompanyOS.API.Models;
using AI.CompanyOS.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace AI.CompanyOS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RequirementsController(AppDbContext db, AgentService agentSvc) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> Submit([FromBody] SubmitRequirementDto dto)
    {
        var project = await db.Projects.FindAsync(dto.ProjectId);
        if (project == null) return NotFound("Project not found");

        var requirement = new Requirement
        {
            ProjectId = dto.ProjectId,
            RawText = dto.RawText,
            Status = "pending"
        };

        db.Requirements.Add(requirement);
        await db.SaveChangesAsync();

        // CEO agent parses and generates tasks
        var tasks = await agentSvc.CeoParseRequirementAsync(requirement);
        db.Tasks.AddRange(tasks);

        // Update project status
        project.Status = "active";
        project.UpdatedAt = DateTime.UtcNow;

        await db.SaveChangesAsync();

        return Ok(new
        {
            requirementId = requirement.Id,
            tasksGenerated = tasks.Count,
            summary = requirement.ParsedSummary,
            tasks = tasks.Select(t => new { t.Title, t.AgentRole, t.Priority, t.EstimatedHours })
        });
    }

    [HttpGet("{projectId:guid}")]
    public async Task<ActionResult<List<RequirementDto>>> GetByProject(Guid projectId)
    {
        var reqs = db.Requirements
            .Where(r => r.ProjectId == projectId)
            .Select(r => new RequirementDto(r.Id, r.ProjectId, r.RawText, r.ParsedSummary, r.Status, r.TasksGenerated, r.CreatedAt))
            .OrderByDescending(r => r.CreatedAt);

        return Ok(reqs);
    }
}
