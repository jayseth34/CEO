using AI.CompanyOS.API.Models;

namespace AI.CompanyOS.API.Data;

public static class DatabaseInitializer
{
    public static void Seed(AppDbContext db)
    {
        if (db.Resources.Any()) return;

        var resources = new List<Resource>
        {
            new() { Name = "Alex Chen", Email = "alex@company.ai", Role = "developer", AgentType = "worker", Skills = ["angular", "typescript", "rxjs"], MaxLoad = 5, HourlyRate = 75 },
            new() { Name = "Sarah Kim", Email = "sarah@company.ai", Role = "developer", AgentType = "worker", Skills = ["dotnet", "csharp", "postgresql", "ef-core"], MaxLoad = 5, HourlyRate = 80 },
            new() { Name = "Marco Rivera", Email = "marco@company.ai", Role = "developer", AgentType = "worker", Skills = ["angular", "dotnet", "docker", "azure"], MaxLoad = 5, HourlyRate = 85 },
            new() { Name = "Priya Patel", Email = "priya@company.ai", Role = "designer", AgentType = "worker", Skills = ["figma", "ux", "ui", "css", "tailwind"], MaxLoad = 4, HourlyRate = 65 },
            new() { Name = "Jake Thompson", Email = "jake@company.ai", Role = "qa", AgentType = "worker", Skills = ["selenium", "cypress", "api-testing", "postman"], MaxLoad = 6, HourlyRate = 60 },
            new() { Name = "Lisa Wang", Email = "lisa@company.ai", Role = "devops", AgentType = "worker", Skills = ["docker", "kubernetes", "azure", "ci-cd", "postgresql"], MaxLoad = 4, HourlyRate = 90 },
            new() { Name = "David Osei", Email = "david@company.ai", Role = "pm", AgentType = "manager", Skills = ["project-management", "agile", "scrum", "jira"], MaxLoad = 8, HourlyRate = 70 },
        };

        db.Resources.AddRange(resources);
        db.SaveChanges();
    }
}
