namespace AI.CompanyOS.API.Models;

public class AgentLog
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string AgentRole { get; set; } = string.Empty;
    public string Action { get; set; } = string.Empty;
    public string Details { get; set; } = string.Empty;
    public string Level { get; set; } = "info"; // info, warn, error
    public Guid? RelatedEntityId { get; set; }
    public string RelatedEntityType { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
