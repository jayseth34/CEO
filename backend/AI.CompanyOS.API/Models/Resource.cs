namespace AI.CompanyOS.API.Models;

public class Resource
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty; // developer, designer, qa, pm, devops
    public string AgentType { get; set; } = "worker"; // ceo, cto, manager, worker
    public List<string> Skills { get; set; } = [];
    public int CurrentLoad { get; set; } = 0;   // active tasks count
    public int MaxLoad { get; set; } = 5;
    public float PerformanceScore { get; set; } = 1.0f;
    public bool IsAvailable { get; set; } = true;
    public decimal HourlyRate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<ProjectTask> Tasks { get; set; } = [];
}
