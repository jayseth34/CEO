# AI Company OS

A multi-agent platform that runs a software company autonomously. Four AI agents — **CEO**, **CTO**, **PM**, and **Orchestrator** — handle requirement parsing, task creation, smart assignment, workload rebalancing, and codebase analysis. Humans review decisions, override assignments, manage teams, and track delivery on a live dashboard.

---

## Table of Contents

1. [Who is the AI?](#who-is-the-ai)
2. [Requirements vs Tasks — The Core Distinction](#requirements-vs-tasks--the-core-distinction)
3. [Complete Workflows](#complete-workflows)
4. [Architecture & Stack](#architecture--stack)
5. [Folder Structure](#folder-structure)
6. [Database Schema](#database-schema)
7. [Quick Start](#quick-start)
8. [API Reference](#api-reference)
9. [Configuration](#configuration)

---

## Who is the AI?

The AI is **Anthropic Claude** (`claude-sonnet-4-6`), accessed through the Anthropic API. It runs inside four specialized "agents" — each agent is just Claude given a different **system prompt** that tells it what role to play:

| Agent | Role | What it actually does |
|-------|------|-----------------------|
| **CEO Agent** | Chief Executive | Reads plain-text business requirements and calls Claude to break them into a structured list of tasks with role, priority, estimated hours, and required skills |
| **PM Agent** | Project Manager | Does NOT call Claude — uses a pure **PostgreSQL scoring query** to rank available resources by skill match, availability, and performance score, then assigns the best fit |
| **CTO Agent** | Chief Technology Officer | Calls Claude with project stats to generate tech stack recommendations, architecture advice, and risk points |
| **Orchestrator** | Background Service | Runs every 60 seconds in the background — auto-assigns unassigned tasks, fires deadline alerts via SignalR, recalculates workloads, and rebalances overloaded team members |

> **If you have no Anthropic API key**, the system uses deterministic mock responses so every flow still works end-to-end.

---

## Requirements vs Tasks — The Core Distinction

This is the most important concept in the system. They are **not the same thing**.

### Requirements — Business Language

A Requirement is raw client or PM input written in plain English:

> *"Build a user login system with email/password and Google OAuth. It should remember the user for 30 days and send a welcome email on first login."*

- Written by: the **PM or client**
- Format: free-form text, no technical details needed
- Created via: the **Requirements** page → select project → type text → Submit
- Stored in: `requirements` table with `status = pending`

### Tasks — Technical Work Items

Tasks are concrete work units that developers/designers/QA actually pick up and complete:

| Field | Example |
|-------|---------|
| Title | "Implement Google OAuth callback handler" |
| AgentRole | `developer` |
| Priority | `high` |
| Estimated Hours | `6` |
| Required Skills | `["OAuth", "Node.js"]` |
| Sprint | `sprint-1` |

### How a Requirement becomes Tasks (CEO Agent Flow)

```
PM submits Requirement text
        ↓
CEO Agent (Claude) reads the text
        ↓
Claude returns JSON: { tasks: [...], summary, estimatedSprints }
        ↓
System creates Task rows in the database
        ↓
Tasks appear in the Kanban board as "Backlog"
        ↓
PM Agent auto-assigns tasks to available resources
```

**One requirement typically generates 3–10 tasks.** Each task gets an `agentRole` that the AI assignment engine uses to find the right type of person (a task with `agentRole: "developer"` will only be considered for resources whose `role` contains "developer").

---

## Complete Workflows

### Workflow 1 — Setting Up a New Project

```
1. Projects page → "+ New Project"
   └─ Fill in: name, client, budget, deadline, priority → Create

2. Project card → "Analyze" → "+ Manage Team"
   └─ Add team members who will work on this project
   └─ Only members added here appear in task assignee dropdowns

3. Project card → "+ Req" (or Requirements page)
   └─ Select project, write business requirement, Submit
   └─ CEO Agent parses it into tasks automatically (10–30 seconds)

4. Project card → "Board"
   └─ See all tasks on the Kanban board
   └─ PM Agent auto-assigns backlog tasks (or use the ⚡ button per task)
```

### Workflow 2 — Requirements → Tasks (CEO Agent)

```
Requirements page
  → Select project
  → Write requirement in plain English
  → Click "Submit to CEO Agent"

Backend: POST /api/requirements
  → RequirementsController calls AgentService.CeoParseRequirementAsync()
  → AgentService sends requirement text to Claude with a structured prompt
  → Claude returns JSON array of tasks
  → Tasks are inserted into the database with status = "backlog"
  → Requirement status = "parsed", tasksGenerated = N

Frontend: Shows "✓ Parsed into N tasks" with a link to the Board
```

### Workflow 3 — AI Task Assignment (PM Agent)

The PM Agent does NOT call Claude. It uses an **inline PostgreSQL scoring formula**:

```
score = (skill_match × 0.5) + (availability × 0.3) + (performance × 0.2)
```

- **skill_match**: fraction of the task's `requiredSkills` that the resource has in their `skills` jsonb array
- **availability**: `1 - (currentLoad / maxLoad)` — how much capacity remains
- **performance**: the resource's `performanceScore` (1–5 scale) normalized to 0–1

**Role filtering** is also applied: if a task has `agentRole = "developer"`, only resources whose `role` column contains "developer" (case-insensitive) are considered. This prevents assigning a developer task to a designer or QA engineer.

Every assignment decision is saved to `ai_decisions` with the rationale and confidence score, visible on the **Agents** page.

**Triggering assignment:**
- **Auto (Orchestrator)**: Every 60 seconds, unassigned backlog tasks are auto-assigned
- **Per task (PM Agent)**: Task Board → click ⚡ on any card → PM Agent runs immediately
- **Manual override**: Project → Analyze → task table → change the "Assignee" dropdown

### Workflow 4 — Multi-Assignee Collaboration

Tasks support one **primary assignee** plus any number of **co-assignees**:

```
Primary assignee  → set via the Assignee dropdown
                  → tracked in tasks.assigned_resource_id
                  → used by AI for load balancing and scheduling

Co-assignees      → added via "+ co-worker" button in the task table
                  → stored in task_assignees table
                  → shown as "+Name [×]" chips in the Assignee column
                  → removing a chip calls DELETE /api/tasks/{id}/assignees/{resourceId}
```

**Why the distinction?** The AI assignment engine and the Orchestrator workload recalculation only look at `assigned_resource_id`. Co-assignees are lightweight collaborators — added by the PM to indicate who else is working on a task — without inflating anyone's official workload count.

### Workflow 5 — Task Progress (Kanban)

Tasks flow through five states:

```
backlog → todo → in_progress → review → done
```

- **Kanban board** (`/projects/{id}/board`): drag-style view of all 5 columns
- **Analyze page** (`/projects/{id}/analyze`): table view with inline status dropdowns and assignee management
- **Orchestrator** monitors for deadlines: if a project is due within 7 days, a `DeadlineAlert` is fired via SignalR and shows as a banner in the UI

### Workflow 6 — Manual Task Reassignment

```
Project → Analyze → task table row
  → Assignee column → change primary dropdown → saves immediately via PATCH /api/tasks/{id}
  → Old resource: current_load - 1
  → New resource: current_load + 1
  → SignalR broadcasts TaskUpdated to all connected clients
```

### Workflow 7 — Codebase Analysis (CTO Agent)

```
Project → Analyze page → "Analyze Codebase" card
  → Choose: GitHub URL or local path
  → Click "Generate All Documents"

Backend fetches up to 40 files (GitHub) or 50 files (local)
CTO Agent (Claude) generates 4 documents:
  1. Root Plan & Architecture — tech stack, module breakdown, sprints
  2. Requirements Document     — functional/non-functional requirements with IDs
  3. Test Cases & QA Plan      — unit tests, integration scenarios, edge cases
  4. Change Impact Analysis    — risk matrix, dependencies, rollback plan

Documents are stored and can be viewed inline or downloaded as Markdown.
```

### Workflow 8 — Orchestrator Auto-Rebalance

The background service runs every 60 seconds:

```
1. Find all unassigned backlog tasks
   → Run PM Agent scoring query for each
   → Assign best resource, update current_load

2. Find projects with deadline within 7 days
   → Fire SignalR "DeadlineAlert" event
   → UI shows red banner with project name

3. Recalculate current_load from actual task counts
   → UPDATE resources SET current_load = (SELECT COUNT(*) FROM tasks WHERE ...)

4. Find overloaded resources (current_load > 90% of max_load)
   → Unassign their lowest-priority tasks → return to backlog
   → Fire SignalR "WorkloadRebalanced" event
```

You can also trigger rebalance manually: **Agents page → "Trigger Rebalance"**

### Workflow 9 — Project Deletion

```
Projects page → project card → "Delete" button (red)
  → Confirmation modal appears
  → Confirm → DELETE /api/projects/{id}
  → Cascades: deletes all tasks, requirements, documents, team memberships
  → Project removed from list immediately
```

### Workflow 10 — AI Decision Review

Every AI decision is logged with full context:

```
Agents page → "AI Decisions" tab
  → See: agent role, decision type, rationale, confidence score (0–1), timestamp
  → Approve or reject decisions (updates is_approved flag in ai_decisions table)
  → Full audit trail of all CEO and PM agent choices
```

---

## Architecture & Stack

```
┌─────────────────────────────────────────────────────────┐
│                    Angular 17 Frontend                   │
│  Dashboard · Projects · Tasks · Resources · Agents       │
│  Standalone components · Signals · SignalR client        │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP / WebSocket (SignalR)
┌──────────────────────────▼──────────────────────────────┐
│                   .NET 8 Web API                         │
│  Controllers: Projects · Tasks · Resources · Agents      │
│  AgentService (CEO/PM/CTO logic)                         │
│  OrchestratorService (BackgroundService, 60s interval)   │
│  AIClientService (Anthropic SDK + mock fallback)         │
│  AgentHub (SignalR)                                      │
└──────────────────────────┬──────────────────────────────┘
                           │ Dapper (inline SQL) + EF Core
┌──────────────────────────▼──────────────────────────────┐
│               PostgreSQL 16                              │
│  projects · tasks · resources · requirements             │
│  ai_decisions · agent_logs · project_documents           │
│  project_members · task_assignees                        │
│  jsonb columns: skills, requirements, parsed_data        │
└─────────────────────────────────────────────────────────┘
```

| Layer | Technology |
|-------|------------|
| Frontend | Angular 17 (standalone components, signals, @for control flow) |
| Backend | .NET 8 Web API |
| ORM | EF Core (model config) + Dapper (performance queries) |
| Database | PostgreSQL 16 (jsonb for skills & requirements) |
| Real-time | ASP.NET Core SignalR |
| AI | Anthropic Claude `claude-sonnet-4-6` (mock fallback if no key) |

---

## Folder Structure

```
CEO/
├── docker-compose.yml
├── README.md
│
├── backend/
│   └── AI.CompanyOS.API/
│       ├── Controllers/
│       │   ├── ProjectsController.cs       # Project CRUD + stats
│       │   ├── TasksController.cs          # Tasks + co-assignee endpoints
│       │   ├── ResourcesController.cs      # Team workload
│       │   ├── RequirementsController.cs   # Requirement → CEO agent
│       │   ├── AgentsController.cs         # Logs, decisions, rebalance, CTO
│       │   └── DocumentsController.cs      # Documents + project team members
│       │
│       ├── Models/
│       │   ├── Project.cs
│       │   ├── ProjectTask.cs
│       │   ├── Resource.cs
│       │   ├── Requirement.cs
│       │   ├── AIDecision.cs
│       │   ├── AgentLog.cs
│       │   ├── ProjectDocument.cs
│       │   ├── ProjectMember.cs            # Project ↔ Resource junction
│       │   └── TaskAssignee.cs             # Task ↔ Resource (co-assignees)
│       │
│       ├── DTOs/
│       │   ├── ProjectDto.cs
│       │   ├── TaskDto.cs                  # Includes ProjectTaskAssigneeDto
│       │   ├── ResourceDto.cs
│       │   ├── RequirementDto.cs
│       │   └── DocumentDto.cs
│       │
│       ├── Data/
│       │   ├── AppDbContext.cs             # EF Core + jsonb converters
│       │   ├── SchemaInitializer.cs        # DDL: 9 tables + indexes
│       │   └── DatabaseInitializer.cs      # Seeds 7 default resources
│       │
│       ├── Services/
│       │   ├── AIClientService.cs          # Anthropic API + mock fallback
│       │   ├── AgentService.cs             # CEO / PM / CTO agent logic
│       │   └── OrchestratorService.cs      # Background: assign, alert, rebalance
│       │
│       └── Hubs/
│           └── AgentHub.cs                 # SignalR hub
│
└── frontend/
    └── ai-company-os/
        └── src/app/
            ├── core/
            │   ├── models/models.ts        # TS interfaces (11 types)
            │   └── services/
            │       ├── api.service.ts      # All HTTP calls (40 methods)
            │       └── signalr.service.ts  # Real-time events
            │
            └── features/
                ├── dashboard/              # KPIs + agent activity
                ├── projects/               # Project cards + delete
                ├── project-analyze/        # Documents + team + multi-assignee tasks
                ├── tasks/                  # Kanban board (5 columns)
                ├── resources/              # Workload visualization
                ├── requirements/           # Requirement submission
                └── agents/                 # Logs + AI decisions
```

---

## Database Schema

```sql
-- Core entities
projects        (id, name, client_name, budget, deadline, status, priority, ...)
resources       (id, name, email, role, agent_type, skills jsonb, current_load, max_load, ...)
tasks           (id, project_id, assigned_resource_id, title, status, priority,
                 agent_role, estimated_hours, requirements jsonb, sprint, ...)

-- Relationships
project_members (project_id, resource_id, added_at)           -- explicit team membership
task_assignees  (task_id, resource_id, assigned_at)           -- co-assignees per task

-- Requirements & AI
requirements    (id, project_id, raw_text, parsed_summary, parsed_data jsonb, status, tasks_generated)
ai_decisions    (id, task_id, resource_id, agent_role, decision_type, rationale, confidence_score, ...)
agent_logs      (id, agent_role, action, details, level, created_at)
project_documents (id, project_id, document_type, title, content, git_source, generated_at)
```

**Key PostgreSQL features used:**
- `jsonb` for `skills`, `requirements`, `parsed_data` — enables array element queries
- Aggregate filters: `COUNT(*) FILTER (WHERE status = 'done')` for dashboard stats
- `CASE WHEN` scoring in assignment query
- `ON CONFLICT DO NOTHING` for idempotent inserts (team members, co-assignees)

---

## Quick Start

### Prerequisites

- .NET 8 SDK
- Node 20 + Angular CLI (`npm i -g @angular/cli`)
- PostgreSQL 16 (local or Docker)

### Option A — Docker (recommended)

```bash
# optional: set your Anthropic API key
set ANTHROPIC_API_KEY=sk-ant-...

docker-compose up --build
```

- Frontend: http://localhost:4200
- Swagger: http://localhost:5000/swagger

### Option B — Manual

```sql
-- Create the database
CREATE DATABASE ai_company_os;
```

**Backend:**
```bash
cd backend/AI.CompanyOS.API
dotnet restore
dotnet run
# API: http://localhost:5000
# Swagger: http://localhost:5000/swagger
```

The `SchemaInitializer` runs on startup and creates all 9 tables + indexes automatically.  
`DatabaseInitializer` seeds 7 default resources (Frontend Dev, Backend Dev, QA Engineer, etc.).

**Frontend:**
```bash
cd frontend/ai-company-os
npm install
ng serve
# http://localhost:4200
```

---

## API Reference

### Projects

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/projects` | List all projects with task counts |
| GET | `/api/projects/{id}` | Project detail with tasks and requirements |
| POST | `/api/projects` | Create project |
| PATCH | `/api/projects/{id}/status` | Change project status |
| DELETE | `/api/projects/{id}` | Delete project (cascades all data) |
| GET | `/api/projects/stats` | Dashboard KPIs |

### Tasks

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/tasks` | List tasks (filter: projectId, status, sprint) |
| GET | `/api/tasks/board/{projectId}` | Kanban board (5 columns) |
| GET | `/api/tasks/project/{projectId}/assignees` | All co-assignees for a project's tasks |
| POST | `/api/tasks` | Create task |
| PATCH | `/api/tasks/{id}` | Update task (status, assignee, priority, etc.) |
| POST | `/api/tasks/{id}/assign` | PM Agent auto-assigns this task |
| POST | `/api/tasks/{id}/assignees/{resourceId}` | Add co-assignee |
| DELETE | `/api/tasks/{id}/assignees/{resourceId}` | Remove co-assignee |
| DELETE | `/api/tasks/{id}` | Delete task |

### Resources

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/resources` | All resources |
| GET | `/api/resources/workload` | Workload summary |
| POST | `/api/resources` | Create resource |

### Project Team

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/projects/{id}/team` | Project members with active task counts |
| GET | `/api/projects/{id}/members/all` | All resources with isMember flag |
| POST | `/api/projects/{id}/members/{resourceId}` | Add member to project |
| DELETE | `/api/projects/{id}/members/{resourceId}` | Remove member from project |

### Requirements

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/requirements` | Submit requirement → CEO Agent parses → creates tasks |
| GET | `/api/requirements/{projectId}` | List requirements for a project |

### Agents & Documents

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/agents/logs` | Agent activity log (filter: role, limit) |
| GET | `/api/agents/decisions` | AI decision history |
| PATCH | `/api/agents/decisions/{id}/approve` | Approve/reject a decision |
| POST | `/api/agents/cto/analyze/{projectId}` | CTO tech analysis |
| POST | `/api/agents/orchestrator/rebalance` | Manual workload rebalance |
| POST | `/api/projects/{id}/analyze` | Analyze codebase (GitHub or local path) |
| GET | `/api/projects/{id}/documents` | List generated documents |
| GET | `/api/documents/{id}/download` | Download document as Markdown |
| DELETE | `/api/documents/{id}` | Delete document |

---

## Configuration

### Anthropic API Key

Edit `backend/AI.CompanyOS.API/appsettings.Development.json`:

```json
{
  "Anthropic": {
    "ApiKey": "sk-ant-YOUR_KEY_HERE",
    "Model": "claude-sonnet-4-6"
  }
}
```

Without a key, the system uses deterministic mock responses — all flows work, including requirement parsing and task creation.

### Real-time Events (SignalR)

The frontend subscribes to these events from `AgentHub`:

| Event | Payload | Triggered by |
|-------|---------|-------------|
| `TaskAssigned` | `{ taskId, resourceName, score, rationale }` | AI or manual assignment |
| `TaskUpdated` | `{ taskId, status }` | Any task update |
| `DeadlineAlert` | `{ projectId, projectName, daysRemaining }` | Orchestrator (60s check) |
| `WorkloadRebalanced` | `{ count }` | Orchestrator rebalance |

### EF Core Migrations

The project uses `SchemaInitializer` (raw DDL on startup) instead of EF Core migrations. To add a new table:

1. Add the model in `Models/`
2. Add the `DbSet<>` in `AppDbContext.cs` and configure it in `OnModelCreating`
3. Add the `CREATE TABLE IF NOT EXISTS` SQL to `SchemaInitializer.cs`
4. Restart the backend — the table is created automatically
