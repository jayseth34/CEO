namespace AI.CompanyOS.API.Models;

public class Requirement
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ProjectId { get; set; }
    public string RawText { get; set; } = string.Empty;
    public string ParsedSummary { get; set; } = string.Empty;
    public Dictionary<string, object> ParsedData { get; set; } = [];
    public string Status { get; set; } = "pending"; // pending, parsed, tasked
    public int TasksGenerated { get; set; } = 0;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Project? Project { get; set; }
}
