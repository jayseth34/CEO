namespace AI.CompanyOS.API.Models;

public class ProjectDocument
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ProjectId { get; set; }
    public string DocumentType { get; set; } = "";
    public string Title { get; set; } = "";
    public string Content { get; set; } = "";
    public string GitSource { get; set; } = "";
    public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;
    public Project? Project { get; set; }
}
