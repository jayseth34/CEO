using System.Text;
using System.Text.Json;

namespace AI.CompanyOS.API.Services;

public class AIClientService(IConfiguration config, ILogger<AIClientService> logger)
{
    private readonly string _apiKey = config["Anthropic:ApiKey"] ?? "";
    private readonly string _model = config["Anthropic:Model"] ?? "claude-sonnet-4-6";
    private readonly HttpClient _http = new();

    public async Task<string> CompleteAsync(string systemPrompt, string userMessage, int maxTokens = 2048)
    {
        if (string.IsNullOrEmpty(_apiKey))
        {
            logger.LogWarning("No Anthropic API key configured — returning mock response");
            return GenerateMockResponse(userMessage);
        }

        var payload = new
        {
            model = _model,
            max_tokens = maxTokens,
            system = systemPrompt,
            messages = new[] { new { role = "user", content = userMessage } }
        };

        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.anthropic.com/v1/messages");
        request.Headers.Add("x-api-key", _apiKey);
        request.Headers.Add("anthropic-version", "2023-06-01");
        request.Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

        var response = await _http.SendAsync(request);
        var body = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            logger.LogError("Anthropic API error {Status}: {Body}", response.StatusCode, body);
            return GenerateMockResponse(userMessage);
        }

        using var doc = JsonDocument.Parse(body);
        return doc.RootElement
            .GetProperty("content")[0]
            .GetProperty("text")
            .GetString() ?? "";
    }

    private static string GenerateMockResponse(string input)
    {
        if (input.Contains("Analyze this codebase"))
        {
            if (input.Contains("root_plan") || input.Contains("Root Plan"))
                return "# Root Plan & Architecture\n\n## 1. Executive Summary\nThis project is a full-stack web application with a .NET backend and Angular frontend.\n\n## 2. Technical Architecture\n- **Backend**: ASP.NET Core 8 REST API with PostgreSQL\n- **Frontend**: Angular 17 SPA\n- **Communication**: REST + SignalR for real-time updates\n\n## 3. Technology Stack\n| Layer | Technology |\n|-------|------------|\n| Backend | .NET 8, ASP.NET Core |\n| Database | PostgreSQL, EF Core, Dapper |\n| Frontend | Angular 17, TypeScript |\n| Real-time | SignalR |\n\n## 4. Module Breakdown\n- **Projects** – Project lifecycle management\n- **Tasks** – Task tracking and assignment\n- **Resources** – Team member management\n- **AI Agents** – Automated decision making\n\n## 5. Development Phases\n- **Sprint 1**: Core CRUD + database schema (2 weeks)\n- **Sprint 2**: AI agent integration (2 weeks)\n- **Sprint 3**: UI polish + testing (1 week)\n\n## 6. Risk Assessment\n- AI API availability and cost\n- Database scaling under load\n- Real-time performance with many concurrent users\n\n## 7. Recommendations\n- Add authentication (JWT or OAuth)\n- Implement caching for dashboard stats\n- Add comprehensive logging and monitoring";

            if (input.Contains("requirements"))
                return "# Requirements Document\n\n## 1. Functional Requirements\n1. FR-01: Users shall be able to create and manage projects\n2. FR-02: Tasks shall be assigned to team members automatically via AI scoring\n3. FR-03: AI agents shall parse business requirements into structured tasks\n4. FR-04: Dashboard shall display real-time KPIs and agent activity\n5. FR-05: Resources can update task status\n6. FR-06: System shall log all agent decisions with rationale\n\n## 2. Non-Functional Requirements\n- **Performance**: API responses < 200ms for CRUD, < 5s for AI analysis\n- **Availability**: 99.9% uptime target\n- **Security**: Input validation, parameterized queries, CORS policy\n\n## 3. API Requirements\n| Endpoint | Method | Description |\n|----------|--------|-------------|\n| /api/projects | GET/POST | List and create projects |\n| /api/tasks | GET/POST/PATCH | Task management |\n| /api/resources | GET/POST | Resource management |\n| /api/agents/logs | GET | Agent activity logs |\n\n## 4. Data Requirements\n- Projects: name, client, budget, deadline, status, priority\n- Tasks: title, status, priority, assignment, hours\n- Resources: name, role, skills (JSONB), load capacity\n\n## 5. Integration Requirements\n- Anthropic Claude API for AI agent reasoning\n- SignalR for real-time task updates";

            if (input.Contains("test_cases"))
                return "# Test Cases & QA Plan\n\n## 1. Test Strategy\nCombination of unit tests, integration tests, and end-to-end tests.\n\n## 2. Unit Test Cases\n| ID | Module | Test Name | Input | Expected Output |\n|----|--------|-----------|-------|-----------------|\n| UT-01 | Projects | Create project | Valid DTO | 201 Created + project ID |\n| UT-02 | Projects | Create project | Missing name | 400 Bad Request |\n| UT-03 | Tasks | Auto-assign | Task with skills | Resource with highest score |\n| UT-04 | Tasks | Update status | Valid status | 204 No Content |\n| UT-05 | Resources | Toggle availability | Resource ID | 204 No Content |\n| UT-06 | Agents | Log action | Role + action | Saved to DB |\n\n## 3. Integration Test Scenarios\n1. Create project → add requirement → AI parses → tasks generated\n2. Create task → auto-assign → verify resource load incremented\n3. Update task status → SignalR event fired → frontend receives update\n\n## 4. Edge Cases\n- No available resources for task assignment\n- AI API timeout or failure (fallback to mock)\n- Empty codebase analysis\n- Concurrent task status updates\n\n## 5. Performance Test Scenarios\n- 100 concurrent dashboard requests\n- AI analysis under 30 seconds\n- SignalR with 50 concurrent connections";

            if (input.Contains("change_impact"))
                return "# Change Impact Analysis\n\n## 1. Current State Assessment\nThe codebase is well-structured with clear separation of concerns. Main areas of concern: tight coupling between AgentService and database, no authentication layer, limited error handling in AI calls.\n\n## 2. High-Risk Components\n- **AgentService**: Central orchestration — changes ripple widely\n- **SchemaInitializer**: DDL changes require careful migration\n- **AIClientService**: External dependency, API changes break everything\n\n## 3. Dependency Map\n```\nOrchestratorService → AgentService → AIClientService\nControllers → AgentService → AppDbContext\nControllers → AppDbContext (direct Dapper)\n```\n\n## 4. Impact Assessment Matrix\n| Change Area | Impacted Components | Risk | Testing Required |\n|-------------|--------------------|----|------------------|\n| Database schema | All controllers, EF models | HIGH | Full regression |\n| AgentService | Orchestrator, all controllers | HIGH | Integration tests |\n| AI prompts | Document quality | LOW | Manual review |\n| Frontend models | All components | MEDIUM | UI tests |\n\n## 5. Breaking Change Risks\n- Renaming DB columns breaks both EF Core and Dapper queries\n- Changing DTO record constructors breaks all callers\n- Modifying SignalR event names breaks frontend listeners\n\n## 6. Migration Strategy\n- Use `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` for additive changes\n- Version API routes for breaking changes\n- Feature flags for risky AI prompt changes\n\n## 7. Rollback Plan\n- Database: Keep DDL idempotent with IF NOT EXISTS\n- Application: Blue-green deployment with health checks\n- AI: Mock fallback always available";

            return "# Analysis Complete\n\nCodebase analyzed successfully. No API key configured — install an Anthropic API key for full AI-powered document generation.";
        }

        if (input.Contains("tasks") || input.Contains("requirement"))
            return """
            {
              "tasks": [
                {"title": "Setup project scaffolding", "description": "Initialize repository and base architecture", "agentRole": "developer", "priority": "high", "estimatedHours": 4, "requiredSkills": ["dotnet", "angular"]},
                {"title": "Design database schema", "description": "Create ER diagram and migration scripts", "agentRole": "developer", "priority": "high", "estimatedHours": 6, "requiredSkills": ["postgresql"]},
                {"title": "UI wireframes", "description": "Design key screens in Figma", "agentRole": "designer", "priority": "medium", "estimatedHours": 8, "requiredSkills": ["figma", "ux"]},
                {"title": "API integration tests", "description": "Write end-to-end API test suite", "agentRole": "qa", "priority": "medium", "estimatedHours": 5, "requiredSkills": ["api-testing"]}
              ],
              "summary": "Project broken into 4 core tasks covering architecture, database, UI, and testing.",
              "estimatedSprints": 2
            }
            """;

        return """{"rationale": "Task assigned based on skill match and current workload.", "confidence": 0.85}""";
    }
}
