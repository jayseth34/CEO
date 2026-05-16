namespace AI.CompanyOS.API.Models;

public class AIDecision
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid? ProjectId { get; set; }
    public Guid? TaskId { get; set; }
    public Guid? ResourceId { get; set; }
    public string AgentRole { get; set; } = string.Empty; // ceo, cto, pm, orchestrator
    public string DecisionType { get; set; } = string.Empty; // task_assignment, priority_change, resource_rebalance
    public string Rationale { get; set; } = string.Empty;
    public float ConfidenceScore { get; set; }
    public bool IsApproved { get; set; } = true; // human can override
    public string PromptUsed { get; set; } = string.Empty;
    public string RawResponse { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
