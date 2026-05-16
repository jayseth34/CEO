namespace AI.CompanyOS.API.DTOs;

public record CreateProjectDto(
    string Name,
    string Description,
    string ClientName,
    decimal Budget,
    DateTime Deadline,
    string Priority = "medium"
);

public record ProjectSummaryDto(
    Guid Id,
    string Name,
    string ClientName,
    string Status,
    string Priority,
    decimal Budget,
    DateTime Deadline,
    int TotalTasks,
    int CompletedTasks,
    int InProgressTasks,
    DateTime CreatedAt
);

public record ProjectDetailDto(
    Guid Id,
    string Name,
    string Description,
    string ClientName,
    string Status,
    string Priority,
    decimal Budget,
    DateTime Deadline,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    List<TaskSummaryDto> Tasks,
    List<RequirementDto> Requirements
);
