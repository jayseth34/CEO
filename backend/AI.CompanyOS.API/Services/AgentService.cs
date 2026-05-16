using AI.CompanyOS.API.Data;
using AI.CompanyOS.API.Models;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Text;
using System.Text.Json;

namespace AI.CompanyOS.API.Services;

public class AgentService(AppDbContext db, AIClientService ai, IConfiguration config, ILogger<AgentService> logger, IHttpClientFactory httpFactory)
{
    private string ConnStr => config.GetConnectionString("DefaultConnection")!;

    // CEO Agent: parse raw requirement text into structured tasks
    public async Task<List<ProjectTask>> CeoParseRequirementAsync(Requirement requirement)
    {
        await LogAgentAction("ceo", "parse_requirement", $"Parsing requirement for project {requirement.ProjectId}");

        var system = """
            You are the CEO agent of an AI-powered software company.
            Your job is to parse a client business requirement and break it into concrete tasks.
            Return ONLY a valid JSON object with this exact structure:
            {
              "tasks": [
                { "title": string, "description": string, "agentRole": "developer|designer|qa|devops", "priority": "low|medium|high|critical", "estimatedHours": number, "requiredSkills": string[] }
              ],
              "summary": string,
              "estimatedSprints": number
            }
            """;

        var response = await ai.CompleteAsync(system, $"Business requirement:\n{requirement.RawText}");

        try
        {
            var json = ExtractJson(response);
            using var doc = JsonDocument.Parse(json);
            var root = doc.RootElement;

            var tasks = new List<ProjectTask>();
            foreach (var t in root.GetProperty("tasks").EnumerateArray())
            {
                tasks.Add(new ProjectTask
                {
                    ProjectId = requirement.ProjectId,
                    Title = t.GetProperty("title").GetString() ?? "",
                    Description = t.GetProperty("description").GetString() ?? "",
                    AgentRole = t.GetProperty("agentRole").GetString() ?? "developer",
                    Priority = t.GetProperty("priority").GetString() ?? "medium",
                    EstimatedHours = t.TryGetProperty("estimatedHours", out var h) ? h.GetInt32() : 4,
                    Requirements = new Dictionary<string, object>
                    {
                        ["requiredSkills"] = t.TryGetProperty("requiredSkills", out var s)
                            ? s.EnumerateArray().Select(x => x.GetString()!).ToList()
                            : new List<string>()
                    }
                });
            }

            requirement.ParsedSummary = root.TryGetProperty("summary", out var sum) ? sum.GetString() ?? "" : "";
            requirement.ParsedData["estimatedSprints"] = root.TryGetProperty("estimatedSprints", out var sp) ? sp.GetInt32() : 1;
            requirement.Status = "parsed";
            requirement.TasksGenerated = tasks.Count;

            await SaveDecision("ceo", "requirement_parse", null, null,
                $"Parsed into {tasks.Count} tasks. Sprints: {requirement.ParsedData["estimatedSprints"]}",
                0.9f, response);

            return tasks;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "CEO agent failed to parse requirement");
            await LogAgentAction("ceo", "parse_error", ex.Message, "error");
            return [];
        }
    }

    // Assignment Engine: find the best resource for a task using inline SQL + scoring
    public async Task<(Resource? resource, float score, string rationale)> AssignTaskAsync(ProjectTask task)
    {
        await LogAgentAction("pm", "assign_task", $"Finding best resource for task '{task.Title}'");

        var requiredSkills = task.Requirements.TryGetValue("requiredSkills", out var s)
            ? JsonSerializer.Deserialize<List<string>>(JsonSerializer.Serialize(s)) ?? []
            : [];

        // Inline SQL: score = skill_match * 0.5 + availability * 0.3 + performance * 0.2
        using var conn = new NpgsqlConnection(ConnStr);
        // Filter by agent_role when specified (e.g. "developer" matches "Frontend Developer")
        var agentRole = task.AgentRole?.Trim() ?? "";
        var roleFilter = string.IsNullOrEmpty(agentRole) || agentRole == "worker"
            ? "" : "AND LOWER(r.role) LIKE '%' || LOWER(@AgentRole) || '%'";

        var candidates = await conn.QueryAsync<ResourceCandidate>($@"
            SELECT
                r.id              AS Id,
                r.name            AS Name,
                r.current_load    AS CurrentLoad,
                r.max_load        AS MaxLoad,
                r.performance_score AS PerformanceScore,
                r.skills          AS Skills,
                CASE WHEN r.max_load = 0 THEN 0
                     ELSE (1.0 - (r.current_load::float / r.max_load::float))
                END AS AvailabilityRatio,
                (
                    SELECT COUNT(*)::float
                    FROM jsonb_array_elements_text(r.skills) AS skill
                    WHERE skill = ANY(@RequiredSkills)
                ) / GREATEST(array_length(@RequiredSkills, 1), 1)::float AS SkillMatchRatio
            FROM resources r
            WHERE r.is_available = true
              AND r.current_load < r.max_load
              {roleFilter}
            ORDER BY SkillMatchRatio DESC, AvailabilityRatio DESC
            LIMIT 10
        ", new { RequiredSkills = requiredSkills.ToArray(), AgentRole = agentRole });

        var best = candidates
            .Select(c => new
            {
                c.Id,
                c.Name,
                Score = (float)(c.SkillMatchRatio * 0.5 + c.AvailabilityRatio * 0.3 + (c.PerformanceScore / 5.0) * 0.2)
            })
            .OrderByDescending(x => x.Score)
            .FirstOrDefault();

        if (best == null)
        {
            await LogAgentAction("pm", "no_resource", $"No available resource for task '{task.Title}'", "warn");
            return (null, 0f, "No available resource found");
        }

        var resource = await db.Resources.FindAsync(best.Id);
        var rationale = $"Selected {best.Name} with score {best.Score:F2} (skill match + availability + performance)";

        await SaveDecision("pm", "task_assignment", task.Id, best.Id, rationale, best.Score, "");
        await LogAgentAction("pm", "task_assigned", $"Task '{task.Title}' → {best.Name} (score: {best.Score:F2})");

        return (resource, best.Score, rationale);
    }

    // CTO Agent: analyze project and generate tech recommendations
    public async Task<string> CtoAnalyzeProjectAsync(Guid projectId)
    {
        await LogAgentAction("cto", "analyze_project", $"Analyzing project {projectId}");

        var stats = await db.Database.SqlQueryRaw<ProjectStats>(@"
            SELECT
                p.name,
                p.budget,
                p.deadline,
                COUNT(t.id) as total_tasks,
                COUNT(DISTINCT t.agent_role) as distinct_roles
            FROM projects p
            LEFT JOIN tasks t ON t.project_id = p.id
            WHERE p.id = {0}
            GROUP BY p.name, p.budget, p.deadline
        ", projectId).FirstOrDefaultAsync();

        if (stats == null) return "Project not found";

        var prompt = $"Project: {stats.Name}\nBudget: {stats.Budget:C}\nDeadline: {stats.Deadline:d}\nTotal tasks: {stats.TotalTasks}";
        var system = "You are the CTO agent. Analyze the project and recommend tech stack, architecture, and risk mitigation in 3-5 bullet points. Be concise.";

        return await ai.CompleteAsync(system, prompt);
    }

    // Orchestrator check: find overloaded resources and rebalance
    public async Task<int> RebalanceWorkloadsAsync()
    {
        using var conn = new NpgsqlConnection(ConnStr);

        var overloaded = await conn.QueryAsync<OverloadedResource>(@"
            SELECT
                r.id          AS Id,
                r.name        AS Name,
                r.current_load AS CurrentLoad,
                r.max_load    AS MaxLoad,
                t.id          AS TaskId,
                t.title       AS TaskTitle,
                t.priority    AS Priority
            FROM resources r
            JOIN tasks t ON t.assigned_resource_id = r.id AND t.status IN ('todo','in_progress')
            WHERE r.current_load > r.max_load * 0.9
            ORDER BY r.current_load DESC, t.priority ASC
        ");

        int rebalanced = 0;
        foreach (var item in overloaded)
        {
            var task = await db.Tasks.FindAsync(item.TaskId);
            if (task == null) continue;

            task.AssignedResourceId = null;
            task.Status = "backlog";
            await LogAgentAction("orchestrator", "rebalance", $"Unassigned task '{item.TaskTitle}' from overloaded {item.Name}");
            rebalanced++;
        }

        if (rebalanced > 0) await db.SaveChangesAsync();
        return rebalanced;
    }

    // Codebase Analyzer: fetch from GitHub URL or local path, generate 4 documents
    public async Task<List<ProjectDocument>> AnalyzeCodebaseAsync(Guid projectId, string? githubUrl, string? localPath)
    {
        await LogAgentAction("cto", "analyze_codebase", $"Analyzing codebase for project {projectId}: {githubUrl ?? localPath}");

        string codebaseContent;
        string source;

        if (!string.IsNullOrWhiteSpace(githubUrl))
        {
            codebaseContent = await FetchGitHubCodebaseAsync(githubUrl.Trim());
            source = githubUrl.Trim();
        }
        else if (!string.IsNullOrWhiteSpace(localPath))
        {
            codebaseContent = FetchLocalCodebase(localPath.Trim());
            source = localPath.Trim();
        }
        else
        {
            throw new ArgumentException("Provide either a GitHub URL or local path.");
        }

        var docTypes = new[] { "root_plan", "requirements", "test_cases", "change_impact" };
        var documents = new List<ProjectDocument>();

        foreach (var docType in docTypes)
        {
            var content = await GenerateDocumentContentAsync(docType, codebaseContent);
            documents.Add(new ProjectDocument
            {
                ProjectId = projectId,
                DocumentType = docType,
                Title = GetDocTitle(docType),
                Content = content,
                GitSource = source
            });
        }

        db.ProjectDocuments.AddRange(documents);
        await db.SaveChangesAsync();

        await LogAgentAction("cto", "codebase_analyzed", $"Generated {documents.Count} documents for project {projectId}");
        return documents;
    }

    private async Task<string> FetchGitHubCodebaseAsync(string url)
    {
        var (owner, repo) = ParseGitHubUrl(url);
        var client = httpFactory.CreateClient("github");

        // Single API call to get the full tree
        var treeJson = await client.GetStringAsync(
            $"https://api.github.com/repos/{owner}/{repo}/git/trees/HEAD?recursive=1");

        using var treeDoc = JsonDocument.Parse(treeJson);
        var filePaths = treeDoc.RootElement
            .GetProperty("tree")
            .EnumerateArray()
            .Where(f => f.GetProperty("type").GetString() == "blob")
            .Select(f => f.GetProperty("path").GetString()!)
            .Where(IsInterestingFile)
            .OrderBy(GetFilePriority)
            .Take(40)
            .ToList();

        var sb = new StringBuilder();
        sb.AppendLine($"# Repository: {owner}/{repo}");
        sb.AppendLine($"\n## File Tree ({filePaths.Count} key files):\n");
        foreach (var p in filePaths) sb.AppendLine($"- {p}");
        sb.AppendLine("\n## File Contents:\n");

        int totalChars = 0;
        foreach (var path in filePaths)
        {
            if (totalChars > 80_000) break;
            try
            {
                // Use raw.githubusercontent.com — no rate limit, no API quota
                var content = await client.GetStringAsync(
                    $"https://raw.githubusercontent.com/{owner}/{repo}/HEAD/{path}");
                if (content.Length > 5000) content = content[..5000] + "\n... (truncated)";
                sb.AppendLine($"\n### {path}\n```\n{content}\n```");
                totalChars += content.Length;
            }
            catch { /* skip inaccessible files */ }
        }

        return sb.ToString();
    }

    private static string FetchLocalCodebase(string localPath)
    {
        if (!Directory.Exists(localPath))
            throw new DirectoryNotFoundException($"Directory not found: {localPath}");

        var skipSegments = new[] { "node_modules", ".git", "bin", "obj", "dist", ".gradle", "__pycache__", "vendor", ".nuget", "packages" };
        var skipExts = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { ".png", ".jpg", ".jpeg", ".gif", ".ico", ".pdf", ".zip", ".tar", ".gz", ".exe", ".dll", ".pdb", ".lock" };

        var files = Directory.EnumerateFiles(localPath, "*", SearchOption.AllDirectories)
            .Where(f => !skipSegments.Any(seg => f.Split(Path.DirectorySeparatorChar).Contains(seg)))
            .Where(f => !skipExts.Contains(Path.GetExtension(f)))
            .OrderBy(f => GetFilePriority(Path.GetFileName(f)))
            .Take(50)
            .ToList();

        var sb = new StringBuilder();
        sb.AppendLine($"# Local Project: {Path.GetFileName(localPath.TrimEnd(Path.DirectorySeparatorChar))}");
        sb.AppendLine($"\n## File Tree ({files.Count} files):\n");
        foreach (var f in files) sb.AppendLine($"- {f.Replace(localPath, "").TrimStart(Path.DirectorySeparatorChar)}");
        sb.AppendLine("\n## File Contents:\n");

        int totalChars = 0;
        foreach (var file in files)
        {
            if (totalChars > 80_000) break;
            try
            {
                var content = File.ReadAllText(file);
                if (content.Length > 5000) content = content[..5000] + "\n... (truncated)";
                var rel = file.Replace(localPath, "").TrimStart(Path.DirectorySeparatorChar);
                sb.AppendLine($"\n### {rel}\n```\n{content}\n```");
                totalChars += content.Length;
            }
            catch { /* skip unreadable files */ }
        }

        return sb.ToString();
    }

    private async Task<string> GenerateDocumentContentAsync(string docType, string codebaseContent)
    {
        var system = GetDocSystemPrompt(docType);
        var limited = codebaseContent.Length > 15_000
            ? codebaseContent[..15_000] + "\n\n... (codebase truncated)"
            : codebaseContent;
        return await ai.CompleteAsync(system, $"Analyze this codebase and generate the {docType} document:\n\n{limited}", maxTokens: 4096);
    }

    private static (string owner, string repo) ParseGitHubUrl(string url)
    {
        url = url.TrimEnd('/')
                 .Replace("https://github.com/", "")
                 .Replace("http://github.com/", "")
                 .Replace("github.com/", "");
        var parts = url.Split('/');
        if (parts.Length < 2) throw new ArgumentException($"Cannot parse GitHub URL: {url}");
        return (parts[0], parts[1]);
    }

    private static bool IsInterestingFile(string path)
    {
        var skipDirs = new[] { "node_modules/", ".git/", "bin/", "obj/", "dist/", ".gradle/", "__pycache__/", "vendor/", ".nuget/", "packages/", ".cache/", "coverage/" };
        if (skipDirs.Any(d => path.Contains(d))) return false;
        var skipExts = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { ".png", ".jpg", ".jpeg", ".gif", ".ico", ".svg", ".pdf", ".zip", ".exe", ".dll", ".pdb", ".lock" };
        return !skipExts.Contains(Path.GetExtension(path));
    }

    private static int GetFilePriority(string path)
    {
        var lower = path.ToLower();
        if (lower is "readme.md" or "readme.txt") return 0;
        if (lower.EndsWith(".md")) return 1;
        if (lower.Contains("package.json") || lower.EndsWith(".csproj") || lower.EndsWith(".sln")) return 2;
        if (lower is "program.cs" or "startup.cs" or "main.ts" or "app.module.ts") return 3;
        if (lower.Contains("appsettings") || lower.Contains("tsconfig") || lower.Contains("angular.json")) return 4;
        if (lower.EndsWith(".cs") || lower.EndsWith(".ts")) return 5;
        return 10;
    }

    private static string GetDocTitle(string docType) => docType switch
    {
        "root_plan"     => "Root Plan & Architecture",
        "requirements"  => "Requirements Document",
        "test_cases"    => "Test Cases & QA Plan",
        "change_impact" => "Change Impact Analysis",
        _               => docType
    };

    private static string GetDocSystemPrompt(string docType) => docType switch
    {
        "root_plan" => "You are a senior software architect. Analyze the provided codebase and generate a Root Plan document in Markdown. Include sections: Executive Summary, Technical Architecture, Technology Stack (table), Module Breakdown (table), Development Phases/Sprints, Risk Assessment, and Recommendations. Be specific — reference actual code patterns you observe.",
        "requirements" => "You are a business analyst. Analyze the provided codebase and generate a Requirements Document in Markdown. Include: Functional Requirements (numbered list with FR-NN IDs), Non-Functional Requirements (performance/security/scalability), API Requirements (table of endpoints), Data Requirements (models and schemas), Integration Requirements, and Acceptance Criteria.",
        "test_cases" => "You are a senior QA engineer. Analyze the provided codebase and generate Test Cases in Markdown. Include: Test Strategy, Unit Test Cases (table: ID|Module|Test Name|Input|Expected Output|Priority), Integration Test Scenarios, Edge Cases & Error Handling, Test Data Requirements, and Performance Test Scenarios.",
        "change_impact" => "You are a technical lead performing impact analysis. Analyze the provided codebase and generate a Change Impact Analysis in Markdown. Include: Current State Assessment, High-Risk Components, Dependency Map, Impact Assessment Matrix (table: Change Area|Impacted Components|Risk Level|Testing Required), Breaking Change Risks, Migration Strategy, and Rollback Plan.",
        _ => "Analyze the codebase and generate a technical document in Markdown format."
    };

    private async Task LogAgentAction(string role, string action, string details, string level = "info")
    {
        db.AgentLogs.Add(new AgentLog { AgentRole = role, Action = action, Details = details, Level = level });
        await db.SaveChangesAsync();
    }

    private async Task SaveDecision(string role, string type, Guid? taskId, Guid? resourceId, string rationale, float confidence, string rawResponse)
    {
        db.AIDecisions.Add(new AIDecision
        {
            AgentRole = role,
            DecisionType = type,
            TaskId = taskId,
            ResourceId = resourceId,
            Rationale = rationale,
            ConfidenceScore = confidence,
            RawResponse = rawResponse
        });
        await db.SaveChangesAsync();
    }

    private static string ExtractJson(string text)
    {
        var start = text.IndexOf('{');
        var end = text.LastIndexOf('}');
        if (start >= 0 && end > start) return text[start..(end + 1)];
        return text;
    }

    private record ResourceCandidate(Guid Id, string Name, int CurrentLoad, int MaxLoad, float PerformanceScore, string Skills, double AvailabilityRatio, double SkillMatchRatio);
    private record OverloadedResource(Guid Id, string Name, int CurrentLoad, int MaxLoad, Guid TaskId, string TaskTitle, string Priority);
    private record ProjectStats(string Name, decimal Budget, DateTime Deadline, int TotalTasks, int DistinctRoles);
}
