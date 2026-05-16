namespace AI.CompanyOS.API.Models;

public class Project
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ClientName { get; set; } = string.Empty;
    public decimal Budget { get; set; }
    public DateTime Deadline { get; set; }
    public string Status { get; set; } = "pending"; // pending, planning, active, paused, completed
    public string Priority { get; set; } = "medium"; // low, medium, high, critical
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<ProjectTask> Tasks { get; set; } = [];
    public ICollection<Requirement> Requirements { get; set; } = [];
}
