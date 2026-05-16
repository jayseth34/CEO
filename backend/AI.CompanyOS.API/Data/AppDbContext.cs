using AI.CompanyOS.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace AI.CompanyOS.API.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<ProjectTask> Tasks => Set<ProjectTask>();
    public DbSet<Resource> Resources => Set<Resource>();
    public DbSet<AIDecision> AIDecisions => Set<AIDecision>();
    public DbSet<AgentLog> AgentLogs => Set<AgentLog>();
    public DbSet<Requirement> Requirements => Set<Requirement>();
    public DbSet<ProjectDocument> ProjectDocuments => Set<ProjectDocument>();
    public DbSet<ProjectMember> ProjectMembers => Set<ProjectMember>();
    public DbSet<TaskAssignee> TaskAssignees => Set<TaskAssignee>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var jsonOptions = new JsonSerializerOptions();

        modelBuilder.Entity<Project>(e =>
        {
            e.ToTable("projects");
            e.HasKey(p => p.Id);
            e.Property(p => p.Name).HasMaxLength(255).IsRequired();
            e.Property(p => p.Status).HasMaxLength(50).HasDefaultValue("pending");
            e.Property(p => p.Priority).HasMaxLength(50).HasDefaultValue("medium");
            e.Property(p => p.CreatedAt).HasDefaultValueSql("NOW()");
            e.Property(p => p.UpdatedAt).HasDefaultValueSql("NOW()");
        });

        modelBuilder.Entity<ProjectTask>(e =>
        {
            e.ToTable("tasks");
            e.HasKey(t => t.Id);
            e.Property(t => t.Title).HasMaxLength(255).IsRequired();
            e.Property(t => t.Status).HasMaxLength(50).HasDefaultValue("backlog");
            e.Property(t => t.Priority).HasMaxLength(50).HasDefaultValue("medium");
            e.Property(t => t.AgentRole).HasMaxLength(50);
            e.Property(t => t.Sprint).HasMaxLength(100).HasDefaultValue("backlog");
            e.Property(t => t.Requirements)
             .HasColumnType("jsonb")
             .HasConversion(
                v => JsonSerializer.Serialize(v, jsonOptions),
                v => JsonSerializer.Deserialize<Dictionary<string, object>>(v, jsonOptions) ?? new());
            e.Property(t => t.CreatedAt).HasDefaultValueSql("NOW()");
            e.Property(t => t.UpdatedAt).HasDefaultValueSql("NOW()");
            e.HasOne(t => t.Project).WithMany(p => p.Tasks).HasForeignKey(t => t.ProjectId).OnDelete(DeleteBehavior.Cascade);
            e.HasOne(t => t.AssignedResource).WithMany(r => r.Tasks).HasForeignKey(t => t.AssignedResourceId).OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<Resource>(e =>
        {
            e.ToTable("resources");
            e.HasKey(r => r.Id);
            e.Property(r => r.Name).HasMaxLength(255).IsRequired();
            e.Property(r => r.Email).HasMaxLength(255);
            e.Property(r => r.Role).HasMaxLength(100);
            e.Property(r => r.AgentType).HasMaxLength(50).HasDefaultValue("worker");
            e.Property(r => r.PerformanceScore).HasDefaultValue(1.0f);
            e.Property(r => r.MaxLoad).HasDefaultValue(5);
            e.Property(r => r.IsAvailable).HasDefaultValue(true);
            e.Property(r => r.CreatedAt).HasDefaultValueSql("NOW()");
            e.Property(r => r.Skills)
             .HasColumnType("jsonb")
             .HasConversion(
                v => JsonSerializer.Serialize(v, jsonOptions),
                v => JsonSerializer.Deserialize<List<string>>(v, jsonOptions) ?? new());
        });

        modelBuilder.Entity<AIDecision>(e =>
        {
            e.ToTable("ai_decisions");
            e.HasKey(d => d.Id);
            e.Property(d => d.CreatedAt).HasDefaultValueSql("NOW()");
        });

        modelBuilder.Entity<AgentLog>(e =>
        {
            e.ToTable("agent_logs");
            e.HasKey(l => l.Id);
            e.Property(l => l.Level).HasMaxLength(20).HasDefaultValue("info");
            e.Property(l => l.CreatedAt).HasDefaultValueSql("NOW()");
        });

        modelBuilder.Entity<Requirement>(e =>
        {
            e.ToTable("requirements");
            e.HasKey(r => r.Id);
            e.Property(r => r.Status).HasMaxLength(50).HasDefaultValue("pending");
            e.Property(r => r.CreatedAt).HasDefaultValueSql("NOW()");
            e.Property(r => r.ParsedData)
             .HasColumnType("jsonb")
             .HasConversion(
                v => JsonSerializer.Serialize(v, jsonOptions),
                v => JsonSerializer.Deserialize<Dictionary<string, object>>(v, jsonOptions) ?? new());
            e.HasOne(r => r.Project).WithMany(p => p.Requirements).HasForeignKey(r => r.ProjectId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<ProjectDocument>(e =>
        {
            e.ToTable("project_documents");
            e.HasKey(d => d.Id);
            e.Property(d => d.DocumentType).HasMaxLength(50).IsRequired();
            e.Property(d => d.Title).HasMaxLength(255);
            e.Property(d => d.GeneratedAt).HasDefaultValueSql("NOW()");
            e.HasOne(d => d.Project).WithMany().HasForeignKey(d => d.ProjectId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<ProjectMember>(e =>
        {
            e.ToTable("project_members");
            e.HasKey(m => new { m.ProjectId, m.ResourceId });
            e.Property(m => m.AddedAt).HasDefaultValueSql("NOW()");
            e.HasOne(m => m.Project).WithMany().HasForeignKey(m => m.ProjectId).OnDelete(DeleteBehavior.Cascade);
            e.HasOne(m => m.Resource).WithMany().HasForeignKey(m => m.ResourceId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<TaskAssignee>(e =>
        {
            e.ToTable("task_assignees");
            e.HasKey(a => new { a.TaskId, a.ResourceId });
            e.Property(a => a.AssignedAt).HasDefaultValueSql("NOW()");
            e.HasOne(a => a.Task).WithMany().HasForeignKey(a => a.TaskId).OnDelete(DeleteBehavior.Cascade);
            e.HasOne(a => a.Resource).WithMany().HasForeignKey(a => a.ResourceId).OnDelete(DeleteBehavior.Cascade);
        });
    }
}
