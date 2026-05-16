using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Infrastructure;

#nullable disable

namespace AI.CompanyOS.API.Migrations;

[Migration("20240101000000_InitialCreate")]
public partial class InitialCreate : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "projects",
            columns: table => new
            {
                id = table.Column<Guid>(nullable: false),
                name = table.Column<string>(maxLength: 255, nullable: false),
                description = table.Column<string>(nullable: false, defaultValue: ""),
                client_name = table.Column<string>(nullable: false, defaultValue: ""),
                budget = table.Column<decimal>(nullable: false, defaultValue: 0m),
                deadline = table.Column<DateTime>(nullable: false),
                status = table.Column<string>(maxLength: 50, nullable: false, defaultValue: "pending"),
                priority = table.Column<string>(maxLength: 50, nullable: false, defaultValue: "medium"),
                created_at = table.Column<DateTime>(nullable: false, defaultValueSql: "NOW()"),
                updated_at = table.Column<DateTime>(nullable: false, defaultValueSql: "NOW()")
            },
            constraints: table => table.PrimaryKey("PK_projects", x => x.id));

        migrationBuilder.CreateTable(
            name: "resources",
            columns: table => new
            {
                id = table.Column<Guid>(nullable: false),
                name = table.Column<string>(maxLength: 255, nullable: false),
                email = table.Column<string>(maxLength: 255, nullable: false, defaultValue: ""),
                role = table.Column<string>(maxLength: 100, nullable: false, defaultValue: ""),
                agent_type = table.Column<string>(maxLength: 50, nullable: false, defaultValue: "worker"),
                skills = table.Column<string>(type: "jsonb", nullable: false, defaultValue: "[]"),
                current_load = table.Column<int>(nullable: false, defaultValue: 0),
                max_load = table.Column<int>(nullable: false, defaultValue: 5),
                performance_score = table.Column<float>(nullable: false, defaultValue: 1.0f),
                is_available = table.Column<bool>(nullable: false, defaultValue: true),
                hourly_rate = table.Column<decimal>(nullable: false, defaultValue: 0m),
                created_at = table.Column<DateTime>(nullable: false, defaultValueSql: "NOW()")
            },
            constraints: table => table.PrimaryKey("PK_resources", x => x.id));

        migrationBuilder.CreateTable(
            name: "requirements",
            columns: table => new
            {
                id = table.Column<Guid>(nullable: false),
                project_id = table.Column<Guid>(nullable: false),
                raw_text = table.Column<string>(nullable: false, defaultValue: ""),
                parsed_summary = table.Column<string>(nullable: false, defaultValue: ""),
                parsed_data = table.Column<string>(type: "jsonb", nullable: false, defaultValue: "{}"),
                status = table.Column<string>(maxLength: 50, nullable: false, defaultValue: "pending"),
                tasks_generated = table.Column<int>(nullable: false, defaultValue: 0),
                created_at = table.Column<DateTime>(nullable: false, defaultValueSql: "NOW()")
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_requirements", x => x.id);
                table.ForeignKey("FK_requirements_projects", x => x.project_id, "projects", "id", onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "tasks",
            columns: table => new
            {
                id = table.Column<Guid>(nullable: false),
                project_id = table.Column<Guid>(nullable: false),
                assigned_resource_id = table.Column<Guid>(nullable: true),
                title = table.Column<string>(maxLength: 255, nullable: false),
                description = table.Column<string>(nullable: false, defaultValue: ""),
                status = table.Column<string>(maxLength: 50, nullable: false, defaultValue: "backlog"),
                priority = table.Column<string>(maxLength: 50, nullable: false, defaultValue: "medium"),
                agent_role = table.Column<string>(maxLength: 50, nullable: false, defaultValue: "worker"),
                estimated_hours = table.Column<int>(nullable: false, defaultValue: 0),
                actual_hours = table.Column<int>(nullable: false, defaultValue: 0),
                due_date = table.Column<DateTime>(nullable: true),
                requirements = table.Column<string>(type: "jsonb", nullable: false, defaultValue: "{}"),
                assignment_score = table.Column<float>(nullable: false, defaultValue: 0f),
                sprint = table.Column<string>(maxLength: 100, nullable: false, defaultValue: "backlog"),
                created_at = table.Column<DateTime>(nullable: false, defaultValueSql: "NOW()"),
                updated_at = table.Column<DateTime>(nullable: false, defaultValueSql: "NOW()")
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_tasks", x => x.id);
                table.ForeignKey("FK_tasks_projects", x => x.project_id, "projects", "id", onDelete: ReferentialAction.Cascade);
                table.ForeignKey("FK_tasks_resources", x => x.assigned_resource_id, "resources", "id", onDelete: ReferentialAction.SetNull);
            });

        migrationBuilder.CreateTable(
            name: "ai_decisions",
            columns: table => new
            {
                id = table.Column<Guid>(nullable: false),
                project_id = table.Column<Guid>(nullable: true),
                task_id = table.Column<Guid>(nullable: true),
                resource_id = table.Column<Guid>(nullable: true),
                agent_role = table.Column<string>(nullable: false, defaultValue: ""),
                decision_type = table.Column<string>(nullable: false, defaultValue: ""),
                rationale = table.Column<string>(nullable: false, defaultValue: ""),
                confidence_score = table.Column<float>(nullable: false, defaultValue: 0f),
                is_approved = table.Column<bool>(nullable: false, defaultValue: true),
                prompt_used = table.Column<string>(nullable: false, defaultValue: ""),
                raw_response = table.Column<string>(nullable: false, defaultValue: ""),
                created_at = table.Column<DateTime>(nullable: false, defaultValueSql: "NOW()")
            },
            constraints: table => table.PrimaryKey("PK_ai_decisions", x => x.id));

        migrationBuilder.CreateTable(
            name: "agent_logs",
            columns: table => new
            {
                id = table.Column<Guid>(nullable: false),
                agent_role = table.Column<string>(nullable: false, defaultValue: ""),
                action = table.Column<string>(nullable: false, defaultValue: ""),
                details = table.Column<string>(nullable: false, defaultValue: ""),
                level = table.Column<string>(maxLength: 20, nullable: false, defaultValue: "info"),
                related_entity_id = table.Column<Guid>(nullable: true),
                related_entity_type = table.Column<string>(nullable: false, defaultValue: ""),
                created_at = table.Column<DateTime>(nullable: false, defaultValueSql: "NOW()")
            },
            constraints: table => table.PrimaryKey("PK_agent_logs", x => x.id));

        migrationBuilder.CreateIndex("IX_tasks_project_id", "tasks", "project_id");
        migrationBuilder.CreateIndex("IX_tasks_assigned_resource_id", "tasks", "assigned_resource_id");
        migrationBuilder.CreateIndex("IX_requirements_project_id", "requirements", "project_id");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable("agent_logs");
        migrationBuilder.DropTable("ai_decisions");
        migrationBuilder.DropTable("tasks");
        migrationBuilder.DropTable("requirements");
        migrationBuilder.DropTable("resources");
        migrationBuilder.DropTable("projects");
    }
}
