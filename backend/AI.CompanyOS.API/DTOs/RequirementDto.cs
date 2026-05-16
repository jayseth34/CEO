namespace AI.CompanyOS.API.DTOs;

public record SubmitRequirementDto(
    Guid ProjectId,
    string RawText
);

public record RequirementDto(
    Guid Id,
    Guid ProjectId,
    string RawText,
    string ParsedSummary,
    string Status,
    int TasksGenerated,
    DateTime CreatedAt
);

public record AgentLogDto(
    Guid Id,
    string AgentRole,
    string Action,
    string Details,
    string Level,
    DateTime CreatedAt
);

public record AIDecisionDto(
    Guid Id,
    string AgentRole,
    string DecisionType,
    string Rationale,
    float ConfidenceScore,
    bool IsApproved,
    DateTime CreatedAt
);

public record DashboardStatsDto(
    int TotalProjects,
    int ActiveProjects,
    int TotalTasks,
    int CompletedTasks,
    int TotalResources,
    int AvailableResources,
    decimal TotalBudget,
    List<AgentActivityDto> RecentAgentActivity
);

public record AgentActivityDto(
    string AgentRole,
    string Action,
    string Details,
    DateTime Timestamp
);
