namespace AI.CompanyOS.API.DTOs;

public record CreateTaskDto(
    Guid ProjectId,
    string Title,
    string Description,
    string Priority = "medium",
    string AgentRole = "worker",
    int EstimatedHours = 0,
    DateTime? DueDate = null,
    string Sprint = "backlog"
);

public record UpdateTaskDto(
    string? Title,
    string? Description,
    string? Status,
    string? Priority,
    Guid? AssignedResourceId,
    int? EstimatedHours,
    int? ActualHours,
    string? Sprint
);

public record TaskSummaryDto(
    Guid Id,
    Guid ProjectId,
    string ProjectName,
    string Title,
    string Status,
    string Priority,
    string AgentRole,
    string Sprint,
    int EstimatedHours,
    Guid? AssignedResourceId,
    string? AssignedResourceName,
    float AssignmentScore,
    DateTime? DueDate,
    DateTime CreatedAt
);

public record TaskBoardDto(
    List<TaskSummaryDto> Backlog,
    List<TaskSummaryDto> Todo,
    List<TaskSummaryDto> InProgress,
    List<TaskSummaryDto> Review,
    List<TaskSummaryDto> Done
);

public record ProjectTaskAssigneeDto(Guid TaskId, Guid ResourceId, string ResourceName, string Role);
