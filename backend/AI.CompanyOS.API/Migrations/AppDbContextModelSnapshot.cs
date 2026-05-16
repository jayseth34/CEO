using AI.CompanyOS.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

#nullable disable

namespace AI.CompanyOS.API.Migrations;

[DbContext(typeof(AppDbContext))]
partial class AppDbContextModelSnapshot : ModelSnapshot
{
    protected override void BuildModel(ModelBuilder modelBuilder)
    {
#pragma warning disable 612, 618
        modelBuilder.HasAnnotation("ProductVersion", "8.0.0")
            .HasAnnotation("Relational:MaxIdentifierLength", 63);

        modelBuilder.Entity("AI.CompanyOS.API.Models.Project", b =>
        {
            b.Property<Guid>("Id").HasColumnName("id");
            b.Property<string>("Name").HasMaxLength(255).HasColumnName("name");
            b.Property<string>("Description").HasColumnName("description");
            b.Property<string>("ClientName").HasColumnName("client_name");
            b.Property<decimal>("Budget").HasColumnName("budget");
            b.Property<DateTime>("Deadline").HasColumnName("deadline");
            b.Property<string>("Status").HasMaxLength(50).HasDefaultValue("pending").HasColumnName("status");
            b.Property<string>("Priority").HasMaxLength(50).HasDefaultValue("medium").HasColumnName("priority");
            b.Property<DateTime>("CreatedAt").HasDefaultValueSql("NOW()").HasColumnName("created_at");
            b.Property<DateTime>("UpdatedAt").HasDefaultValueSql("NOW()").HasColumnName("updated_at");
            b.HasKey("Id");
            b.ToTable("projects");
        });

        modelBuilder.Entity("AI.CompanyOS.API.Models.Resource", b =>
        {
            b.Property<Guid>("Id").HasColumnName("id");
            b.Property<string>("Name").HasMaxLength(255).HasColumnName("name");
            b.Property<string>("Email").HasMaxLength(255).HasColumnName("email");
            b.Property<string>("Role").HasMaxLength(100).HasColumnName("role");
            b.Property<string>("AgentType").HasMaxLength(50).HasDefaultValue("worker").HasColumnName("agent_type");
            b.Property<string>("Skills").HasColumnType("jsonb").HasColumnName("skills");
            b.Property<int>("CurrentLoad").HasDefaultValue(0).HasColumnName("current_load");
            b.Property<int>("MaxLoad").HasDefaultValue(5).HasColumnName("max_load");
            b.Property<float>("PerformanceScore").HasDefaultValue(1.0f).HasColumnName("performance_score");
            b.Property<bool>("IsAvailable").HasDefaultValue(true).HasColumnName("is_available");
            b.Property<decimal>("HourlyRate").HasDefaultValue(0m).HasColumnName("hourly_rate");
            b.Property<DateTime>("CreatedAt").HasDefaultValueSql("NOW()").HasColumnName("created_at");
            b.HasKey("Id");
            b.ToTable("resources");
        });

        modelBuilder.Entity("AI.CompanyOS.API.Models.Requirement", b =>
        {
            b.Property<Guid>("Id").HasColumnName("id");
            b.Property<Guid>("ProjectId").HasColumnName("project_id");
            b.Property<string>("RawText").HasColumnName("raw_text");
            b.Property<string>("ParsedSummary").HasColumnName("parsed_summary");
            b.Property<string>("ParsedData").HasColumnType("jsonb").HasColumnName("parsed_data");
            b.Property<string>("Status").HasMaxLength(50).HasDefaultValue("pending").HasColumnName("status");
            b.Property<int>("TasksGenerated").HasDefaultValue(0).HasColumnName("tasks_generated");
            b.Property<DateTime>("CreatedAt").HasDefaultValueSql("NOW()").HasColumnName("created_at");
            b.HasKey("Id");
            b.HasIndex("ProjectId");
            b.ToTable("requirements");
        });

        modelBuilder.Entity("AI.CompanyOS.API.Models.ProjectTask", b =>
        {
            b.Property<Guid>("Id").HasColumnName("id");
            b.Property<Guid>("ProjectId").HasColumnName("project_id");
            b.Property<Guid?>("AssignedResourceId").HasColumnName("assigned_resource_id");
            b.Property<string>("Title").HasMaxLength(255).HasColumnName("title");
            b.Property<string>("Description").HasColumnName("description");
            b.Property<string>("Status").HasMaxLength(50).HasDefaultValue("backlog").HasColumnName("status");
            b.Property<string>("Priority").HasMaxLength(50).HasDefaultValue("medium").HasColumnName("priority");
            b.Property<string>("AgentRole").HasMaxLength(50).HasDefaultValue("worker").HasColumnName("agent_role");
            b.Property<int>("EstimatedHours").HasDefaultValue(0).HasColumnName("estimated_hours");
            b.Property<int>("ActualHours").HasDefaultValue(0).HasColumnName("actual_hours");
            b.Property<DateTime?>("DueDate").HasColumnName("due_date");
            b.Property<string>("Requirements").HasColumnType("jsonb").HasColumnName("requirements");
            b.Property<float>("AssignmentScore").HasDefaultValue(0f).HasColumnName("assignment_score");
            b.Property<string>("Sprint").HasMaxLength(100).HasDefaultValue("backlog").HasColumnName("sprint");
            b.Property<DateTime>("CreatedAt").HasDefaultValueSql("NOW()").HasColumnName("created_at");
            b.Property<DateTime>("UpdatedAt").HasDefaultValueSql("NOW()").HasColumnName("updated_at");
            b.HasKey("Id");
            b.HasIndex("ProjectId");
            b.HasIndex("AssignedResourceId");
            b.ToTable("tasks");
        });

        modelBuilder.Entity("AI.CompanyOS.API.Models.AIDecision", b =>
        {
            b.Property<Guid>("Id").HasColumnName("id");
            b.Property<Guid?>("ProjectId").HasColumnName("project_id");
            b.Property<Guid?>("TaskId").HasColumnName("task_id");
            b.Property<Guid?>("ResourceId").HasColumnName("resource_id");
            b.Property<string>("AgentRole").HasColumnName("agent_role");
            b.Property<string>("DecisionType").HasColumnName("decision_type");
            b.Property<string>("Rationale").HasColumnName("rationale");
            b.Property<float>("ConfidenceScore").HasDefaultValue(0f).HasColumnName("confidence_score");
            b.Property<bool>("IsApproved").HasDefaultValue(true).HasColumnName("is_approved");
            b.Property<string>("PromptUsed").HasColumnName("prompt_used");
            b.Property<string>("RawResponse").HasColumnName("raw_response");
            b.Property<DateTime>("CreatedAt").HasDefaultValueSql("NOW()").HasColumnName("created_at");
            b.HasKey("Id");
            b.ToTable("ai_decisions");
        });

        modelBuilder.Entity("AI.CompanyOS.API.Models.AgentLog", b =>
        {
            b.Property<Guid>("Id").HasColumnName("id");
            b.Property<string>("AgentRole").HasColumnName("agent_role");
            b.Property<string>("Action").HasColumnName("action");
            b.Property<string>("Details").HasColumnName("details");
            b.Property<string>("Level").HasMaxLength(20).HasDefaultValue("info").HasColumnName("level");
            b.Property<Guid?>("RelatedEntityId").HasColumnName("related_entity_id");
            b.Property<string>("RelatedEntityType").HasColumnName("related_entity_type");
            b.Property<DateTime>("CreatedAt").HasDefaultValueSql("NOW()").HasColumnName("created_at");
            b.HasKey("Id");
            b.ToTable("agent_logs");
        });

        modelBuilder.Entity("AI.CompanyOS.API.Models.Requirement", b =>
        {
            b.HasOne("AI.CompanyOS.API.Models.Project", "Project")
             .WithMany("Requirements")
             .HasForeignKey("ProjectId")
             .OnDelete(DeleteBehavior.Cascade)
             .IsRequired();
        });

        modelBuilder.Entity("AI.CompanyOS.API.Models.ProjectTask", b =>
        {
            b.HasOne("AI.CompanyOS.API.Models.Project", "Project")
             .WithMany("Tasks")
             .HasForeignKey("ProjectId")
             .OnDelete(DeleteBehavior.Cascade)
             .IsRequired();
            b.HasOne("AI.CompanyOS.API.Models.Resource", "AssignedResource")
             .WithMany("Tasks")
             .HasForeignKey("AssignedResourceId")
             .OnDelete(DeleteBehavior.SetNull);
        });
#pragma warning restore 612, 618
    }
}
