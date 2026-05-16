namespace AI.CompanyOS.API.DTOs;

public record CreateResourceDto(
    string Name,
    string Email,
    string Role,
    string AgentType,
    List<string> Skills,
    int MaxLoad = 5,
    decimal HourlyRate = 0
);

public record ResourceDto(
    Guid Id,
    string Name,
    string Email,
    string Role,
    string AgentType,
    List<string> Skills,
    int CurrentLoad,
    int MaxLoad,
    float PerformanceScore,
    bool IsAvailable,
    decimal HourlyRate,
    int ActiveTaskCount
);
