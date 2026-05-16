using System.Data;
using Microsoft.EntityFrameworkCore;

namespace AI.CompanyOS.API.Data;

public static class SchemaInitializer
{
    public static void CreateTables(AppDbContext db)
    {
        var connection = db.Database.GetDbConnection();
        if (connection.State != ConnectionState.Open)
            connection.Open();

        Execute(connection, @"
            CREATE TABLE IF NOT EXISTS projects (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL DEFAULT '',
                client_name VARCHAR(255) NOT NULL DEFAULT '',
                budget NUMERIC NOT NULL DEFAULT 0,
                deadline TIMESTAMP NOT NULL DEFAULT NOW(),
                status VARCHAR(50) NOT NULL DEFAULT 'pending',
                priority VARCHAR(50) NOT NULL DEFAULT 'medium',
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW()
            )");

        Execute(connection, @"
            CREATE TABLE IF NOT EXISTS resources (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL DEFAULT '',
                role VARCHAR(100) NOT NULL DEFAULT '',
                agent_type VARCHAR(50) NOT NULL DEFAULT 'worker',
                skills JSONB NOT NULL DEFAULT '[]',
                current_load INT NOT NULL DEFAULT 0,
                max_load INT NOT NULL DEFAULT 5,
                performance_score REAL NOT NULL DEFAULT 1.0,
                is_available BOOLEAN NOT NULL DEFAULT TRUE,
                hourly_rate NUMERIC NOT NULL DEFAULT 0,
                created_at TIMESTAMP NOT NULL DEFAULT NOW()
            )");

        Execute(connection, @"
            CREATE TABLE IF NOT EXISTS requirements (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
                raw_text TEXT NOT NULL DEFAULT '',
                parsed_summary TEXT NOT NULL DEFAULT '',
                parsed_data JSONB NOT NULL DEFAULT '{}',
                status VARCHAR(50) NOT NULL DEFAULT 'pending',
                tasks_generated INT NOT NULL DEFAULT 0,
                created_at TIMESTAMP NOT NULL DEFAULT NOW()
            )");

        Execute(connection, @"
            CREATE TABLE IF NOT EXISTS tasks (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
                assigned_resource_id UUID REFERENCES resources(id) ON DELETE SET NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL DEFAULT '',
                status VARCHAR(50) NOT NULL DEFAULT 'backlog',
                priority VARCHAR(50) NOT NULL DEFAULT 'medium',
                agent_role VARCHAR(50) NOT NULL DEFAULT 'worker',
                estimated_hours INT NOT NULL DEFAULT 0,
                actual_hours INT NOT NULL DEFAULT 0,
                due_date TIMESTAMP,
                requirements JSONB NOT NULL DEFAULT '{}',
                assignment_score REAL NOT NULL DEFAULT 0,
                sprint VARCHAR(100) NOT NULL DEFAULT 'backlog',
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW()
            )");

        Execute(connection, @"
            CREATE TABLE IF NOT EXISTS ai_decisions (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                project_id UUID,
                task_id UUID,
                resource_id UUID,
                agent_role TEXT NOT NULL DEFAULT '',
                decision_type TEXT NOT NULL DEFAULT '',
                rationale TEXT NOT NULL DEFAULT '',
                confidence_score REAL NOT NULL DEFAULT 0,
                is_approved BOOLEAN NOT NULL DEFAULT TRUE,
                prompt_used TEXT NOT NULL DEFAULT '',
                raw_response TEXT NOT NULL DEFAULT '',
                created_at TIMESTAMP NOT NULL DEFAULT NOW()
            )");

        Execute(connection, @"
            CREATE TABLE IF NOT EXISTS agent_logs (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                agent_role TEXT NOT NULL DEFAULT '',
                action TEXT NOT NULL DEFAULT '',
                details TEXT NOT NULL DEFAULT '',
                level VARCHAR(20) NOT NULL DEFAULT 'info',
                related_entity_id UUID,
                related_entity_type TEXT NOT NULL DEFAULT '',
                created_at TIMESTAMP NOT NULL DEFAULT NOW()
            )");

        Execute(connection, @"
            CREATE TABLE IF NOT EXISTS project_documents (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
                document_type VARCHAR(50) NOT NULL DEFAULT '',
                title VARCHAR(255) NOT NULL DEFAULT '',
                content TEXT NOT NULL DEFAULT '',
                git_source TEXT NOT NULL DEFAULT '',
                generated_at TIMESTAMP NOT NULL DEFAULT NOW()
            )");

        Execute(connection, @"
            CREATE TABLE IF NOT EXISTS project_members (
                project_id  UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
                resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
                added_at    TIMESTAMP NOT NULL DEFAULT NOW(),
                PRIMARY KEY (project_id, resource_id)
            )");

        Execute(connection, @"
            CREATE TABLE IF NOT EXISTS task_assignees (
                task_id     UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
                resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
                assigned_at TIMESTAMP NOT NULL DEFAULT NOW(),
                PRIMARY KEY (task_id, resource_id)
            )");

        Execute(connection, "CREATE INDEX IF NOT EXISTS ix_tasks_project_id ON tasks(project_id)");
        Execute(connection, "CREATE INDEX IF NOT EXISTS ix_tasks_resource_id ON tasks(assigned_resource_id)");
        Execute(connection, "CREATE INDEX IF NOT EXISTS ix_requirements_project_id ON requirements(project_id)");
        Execute(connection, "CREATE INDEX IF NOT EXISTS ix_task_assignees_task_id ON task_assignees(task_id)");
    }

    private static void Execute(IDbConnection connection, string sql)
    {
        using var cmd = connection.CreateCommand();
        cmd.CommandText = sql;
        cmd.ExecuteNonQuery();
    }
}
