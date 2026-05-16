namespace AI.CompanyOS.API.Models;

public class ProjectMember
{
    public Guid ProjectId { get; set; }
    public Guid ResourceId { get; set; }
    public DateTime AddedAt { get; set; } = DateTime.UtcNow;

    public Project? Project { get; set; }
    public Resource? Resource { get; set; }
}
