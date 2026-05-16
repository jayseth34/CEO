namespace AI.CompanyOS.API.DTOs;

public record AnalyzeCodebaseDto(string? GitHubUrl, string? LocalPath);

public record ProjectDocumentDto(
    Guid Id,
    Guid ProjectId,
    string DocumentType,
    string Title,
    string Content,
    string GitSource,
    DateTime GeneratedAt
);
