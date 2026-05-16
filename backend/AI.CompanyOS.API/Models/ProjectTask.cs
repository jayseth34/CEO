using System.Text.Json;

namespace AI.CompanyOS.API.Models;

public class ProjectTask
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ProjectId { get; set; }
    public Guid? AssignedResourceId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = "backlog"; // backlog, todo, in_progress, review, done
    public string Priority { get; set; } = "medium";
    public string AgentRole { get; set; } = "worker"; // ceo, cto, pm, dev, qa, designer
    public int EstimatedHours { get; set; }
    public int ActualHours { get; set; }
    public DateTime? DueDate { get; set; }
    public Dictionary<string, object> Requirements { get; set; } = [];
    public float AssignmentScore { get; set; }
    public string Sprint { get; set; } = "backlog";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public Project? Project { get; set; }
    public Resource? AssignedResource { get; set; }
}
