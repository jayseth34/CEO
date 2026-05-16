namespace AI.CompanyOS.API.Models;

public class TaskAssignee
{
    public Guid TaskId { get; set; }
    public Guid ResourceId { get; set; }
    public DateTime AssignedAt { get; set; } = DateTime.UtcNow;
    public ProjectTask? Task { get; set; }
    public Resource? Resource { get; set; }
}
