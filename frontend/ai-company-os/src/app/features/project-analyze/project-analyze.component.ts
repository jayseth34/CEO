import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { ProjectDocument, ProjectTeamMember, ResourceWithMembership, Task } from '../../core/models/models';

@Component({
  selector: 'app-project-analyze',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="page-header">
      <div>
        <a routerLink="/projects" style="color:var(--text-muted);text-decoration:none;font-size:13px;display:inline-block;margin-bottom:4px">← Back to Projects</a>
        <div class="page-title">{{ project?.name || 'Project Analysis' }}</div>
        <div class="page-sub">Codebase analysis · Documents · Team status</div>
      </div>
      @if (project) {
        <span class="badge" [class]="statusBadge(project.status)">{{ project.status }}</span>
      }
    </div>

    <div class="page-body">

      <!-- Analyze Card -->
      <div class="card" style="margin-bottom:20px">
        <div style="font-size:14px;font-weight:600;margin-bottom:12px">Analyze Codebase</div>
        <div style="font-size:13px;color:var(--text-muted);margin-bottom:12px">
          Point to a GitHub repository or a local directory — AI will generate a Root Plan, Requirements doc, Test Cases, and Change Impact Analysis.
        </div>
        <div style="display:flex;gap:16px;margin-bottom:12px">
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px">
            <input type="radio" [(ngModel)]="sourceType" value="github" /> GitHub URL
          </label>
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px">
            <input type="radio" [(ngModel)]="sourceType" value="local" /> Local Path
          </label>
        </div>
        <div style="display:flex;gap:8px">
          <input
            [(ngModel)]="sourceInput"
            [placeholder]="sourceType === 'github' ? 'https://github.com/owner/repo' : 'C:\\Projects\\MyApp'"
            style="flex:1"
            (keyup.enter)="analyze()"
          />
          <button class="btn btn-primary" (click)="analyze()" [disabled]="analyzing || !sourceInput.trim()">
            {{ analyzing ? 'Analyzing...' : 'Generate All Documents' }}
          </button>
        </div>
        @if (analyzing) {
          <div style="margin-top:12px;display:flex;align-items:center;gap:8px;color:var(--text-muted);font-size:13px">
            <div class="spinner" style="width:14px;height:14px;flex-shrink:0"></div>
            Fetching codebase and generating 4 documents with AI — this may take 30–60 seconds…
          </div>
        }
        @if (analyzeError) {
          <div style="margin-top:10px;padding:8px 12px;background:rgba(239,68,68,0.1);border-radius:6px;color:#ef4444;font-size:13px">
            {{ analyzeError }}
          </div>
        }
      </div>

      <!-- Generated Documents -->
      <div style="font-size:14px;font-weight:600;margin-bottom:10px">
        Generated Documents
        <span class="badge badge-muted" style="margin-left:8px">{{ documents.length }}</span>
      </div>
      @if (docsLoading) { <div class="spinner" style="margin-bottom:20px"></div> }
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px;margin-bottom:28px">
        @for (doc of documents; track doc.id) {
          <div class="card" style="display:flex;flex-direction:column;gap:8px">
            <div class="flex items-center justify-between">
              <span class="badge" [class]="docTypeBadge(doc.documentType)">{{ docTypeLabel(doc.documentType) }}</span>
              <span class="text-muted text-sm">{{ doc.generatedAt | date:'dd MMM, HH:mm' }}</span>
            </div>
            <div style="font-weight:600;font-size:14px">{{ doc.title }}</div>
            @if (doc.gitSource) {
              <div class="text-muted text-sm" style="font-size:11px;word-break:break-all">
                {{ doc.gitSource.length > 50 ? (doc.gitSource | slice:0:50) + '…' : doc.gitSource }}
              </div>
            }
            <div class="flex gap-2" style="margin-top:4px">
              <button class="btn btn-ghost btn-sm" (click)="viewDoc(doc)">View</button>
              <button class="btn btn-ghost btn-sm" (click)="download(doc)">↓ Download</button>
              <button class="btn btn-ghost btn-sm" style="color:#ef4444" (click)="deleteDoc(doc.id)">Delete</button>
            </div>
          </div>
        }
        @if (!docsLoading && !documents.length) {
          <div class="text-muted text-sm" style="grid-column:1/-1;padding:16px 0">
            No documents yet. Use the form above to analyze a codebase.
          </div>
        }
      </div>

      <!-- Project Team -->
      <div class="flex items-center justify-between" style="margin-bottom:10px">
        <div style="font-size:14px;font-weight:600">
          Project Team
          <span class="badge badge-muted" style="margin-left:8px">{{ team.length }}</span>
        </div>
        <button class="btn btn-ghost btn-sm" (click)="openManageTeam()">+ Manage Team</button>
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:28px">
        <!-- "All Tasks" pill -->
        <div
          class="card"
          style="min-width:160px;cursor:pointer;padding:12px 16px;border:2px solid transparent;transition:border-color 0.15s"
          [style.border-color]="selectedResourceId === null ? 'var(--accent)' : 'var(--border)'"
          (click)="selectResource(null)"
        >
          <div style="font-weight:600;font-size:14px">All Tasks</div>
          <div class="text-muted text-sm">{{ tasks.length }} total</div>
        </div>
        @for (m of team; track m.resourceId) {
          <div
            class="card"
            style="min-width:160px;cursor:pointer;padding:12px 16px;border:2px solid transparent;transition:border-color 0.15s;position:relative"
            [style.border-color]="selectedResourceId === m.resourceId ? 'var(--accent)' : 'var(--border)'"
            (click)="selectResource(m.resourceId)"
          >
            <div style="font-weight:600;font-size:14px">{{ m.resourceName }}</div>
            <div class="text-muted text-sm" style="margin-bottom:4px">{{ m.role }}</div>
            <span class="badge badge-warning">{{ m.activeTasks }} active</span>
          </div>
        }
        @if (!team.length && !teamLoading) {
          <div class="text-muted text-sm" style="padding:12px 0">
            No members yet — click "Manage Team" to add people.
          </div>
        }
      </div>

      <!-- Task List -->
      <div class="flex items-center justify-between" style="margin-bottom:12px">
        <div style="font-size:14px;font-weight:600">
          Tasks
          @if (selectedResourceId) {
            <span class="text-muted" style="font-weight:400"> — {{ selectedMemberName }}</span>
          }
          <span class="badge badge-muted" style="margin-left:8px">{{ filteredTasks.length }}</span>
        </div>
        <select
          [(ngModel)]="statusFilter"
          style="font-size:13px;background:var(--surface2);border:1px solid var(--border);color:var(--text);padding:4px 10px;border-radius:6px;cursor:pointer"
        >
          <option value="">All Statuses</option>
          <option value="backlog">Backlog</option>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div class="card" style="padding:0;overflow:hidden;margin-bottom:32px">
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead>
            <tr style="border-bottom:1px solid var(--border);background:var(--surface2)">
              <th style="padding:10px 14px;text-align:left;color:var(--text-muted);font-weight:500">Task</th>
              <th style="padding:10px 14px;text-align:left;color:var(--text-muted);font-weight:500;min-width:200px">Assignees</th>
              <th style="padding:10px 14px;text-align:left;color:var(--text-muted);font-weight:500">Priority</th>
              <th style="padding:10px 14px;text-align:left;color:var(--text-muted);font-weight:500">Status</th>
            </tr>
          </thead>
          <tbody>
            @for (task of filteredTasks; track task.id) {
              <tr style="border-bottom:1px solid var(--border)">
                <!-- Task title — click to expand description -->
                <td style="padding:10px 14px">
                  <div
                    style="font-weight:500;cursor:pointer"
                    (click)="toggleDescription(task.id)"
                    title="Click to toggle description"
                  >{{ task.title }}</div>
                  @if (expandedTaskId === task.id && task.description) {
                    <div style="margin-top:4px;font-size:12px;color:var(--text-muted);line-height:1.5">
                      {{ task.description }}
                    </div>
                  }
                  <div style="font-size:11px;color:var(--text-muted);margin-top:2px">
                    {{ task.agentRole }} · {{ task.estimatedHours }}h est.
                  </div>
                </td>

                <!-- Assignees: primary select + co-assignee chips -->
                <td style="padding:10px 14px">
                  <!-- Primary assignee dropdown -->
                  <select
                    [value]="task.assignedResourceId ?? ''"
                    (change)="reassignTask(task, $any($event.target).value)"
                    style="font-size:12px;background:var(--surface2);border:1px solid var(--border);color:var(--text);padding:3px 8px;border-radius:4px;cursor:pointer;max-width:160px"
                  >
                    <option value="">— Unassigned —</option>
                    @for (m of team; track m.resourceId) {
                      <option [value]="m.resourceId">{{ m.resourceName }}</option>
                    }
                  </select>

                  <!-- Co-assignee chips -->
                  <div style="display:flex;flex-wrap:wrap;gap:3px;margin-top:5px">
                    @for (ca of getCoAssignees(task.id); track ca.resourceId) {
                      <span style="display:inline-flex;align-items:center;gap:2px;background:var(--surface2);border:1px solid var(--border);border-radius:3px;padding:1px 5px;font-size:11px;color:var(--text)">
                        +{{ ca.resourceName }}
                        <button
                          (click)="removeCoAssignee(task, ca.resourceId)"
                          style="background:none;border:none;cursor:pointer;color:var(--text-muted);padding:0 0 0 2px;font-size:14px;line-height:1"
                          title="Remove co-assignee"
                        >×</button>
                      </span>
                    }
                    @if (addingCoAssigneeTask === task.id) {
                      <select
                        (change)="addCoAssignee(task, $any($event.target).value)"
                        style="font-size:11px;background:var(--surface2);border:1px solid var(--accent);color:var(--text);padding:1px 4px;border-radius:3px;cursor:pointer"
                      >
                        <option value="">Pick member…</option>
                        @for (m of getAvailableForCoAssign(task); track m.resourceId) {
                          <option [value]="m.resourceId">{{ m.resourceName }}</option>
                        }
                      </select>
                      <button
                        (click)="addingCoAssigneeTask = null"
                        style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:13px;padding:0 2px"
                      >✕</button>
                    } @else if (getAvailableForCoAssign(task).length > 0) {
                      <button
                        (click)="addingCoAssigneeTask = task.id"
                        style="background:none;border:1px dashed var(--border);border-radius:3px;cursor:pointer;font-size:11px;padding:1px 6px;color:var(--text-muted)"
                      >+ co-worker</button>
                    }
                  </div>
                </td>

                <td style="padding:10px 14px">
                  <span class="badge" [class]="priorityBadge(task.priority)">{{ task.priority }}</span>
                </td>

                <td style="padding:10px 14px">
                  <select
                    [value]="task.status"
                    (change)="updateTaskStatus(task, $any($event.target).value)"
                    style="font-size:12px;background:var(--surface2);border:1px solid var(--border);color:var(--text);padding:3px 8px;border-radius:4px;cursor:pointer"
                  >
                    <option value="backlog">Backlog</option>
                    <option value="todo">Todo</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                  </select>
                </td>
              </tr>
            }
            @if (!filteredTasks.length) {
              <tr>
                <td colspan="4" style="padding:24px 14px;color:var(--text-muted);text-align:center">
                  No tasks match the current filter.
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>

    <!-- Document Viewer Modal -->
    @if (viewingDoc) {
      <div class="modal-backdrop" (click)="$event.target === $event.currentTarget && (viewingDoc = null)">
        <div class="modal" style="max-width:820px;width:92vw;max-height:88vh;display:flex;flex-direction:column">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <div>
              <span class="badge" [class]="docTypeBadge(viewingDoc.documentType)" style="margin-bottom:4px">{{ docTypeLabel(viewingDoc.documentType) }}</span>
              <div class="modal-title" style="margin-bottom:0">{{ viewingDoc.title }}</div>
            </div>
            <button class="btn btn-ghost" (click)="viewingDoc = null" style="font-size:18px;padding:4px 10px">✕</button>
          </div>
          <div style="flex:1;overflow-y:auto;background:var(--surface);border-radius:8px;padding:16px;border:1px solid var(--border)">
            <pre style="font-size:12px;line-height:1.7;white-space:pre-wrap;word-break:break-word;margin:0;font-family:inherit;color:var(--text)">{{ viewingDoc.content }}</pre>
          </div>
          <div class="modal-footer" style="margin-top:14px">
            <button class="btn btn-ghost" (click)="viewingDoc = null">Close</button>
            <button class="btn btn-primary" (click)="download(viewingDoc)">↓ Download .md</button>
          </div>
        </div>
      </div>
    }

    <!-- Manage Team Modal -->
    @if (showManageTeam) {
      <div class="modal-backdrop" (click)="$event.target === $event.currentTarget && (showManageTeam = false)">
        <div class="modal" style="max-width:520px;width:92vw">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <div class="modal-title" style="margin-bottom:0">Manage Team</div>
            <button class="btn btn-ghost" (click)="showManageTeam = false" style="font-size:18px;padding:4px 10px">✕</button>
          </div>
          <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px">
            Add members to this project so they appear in the task assignee dropdowns.
          </p>
          @if (allResourcesLoading) {
            <div class="spinner"></div>
          } @else {
            <div style="max-height:400px;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
              @for (r of allResources; track r.resourceId) {
                <div class="card" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px">
                  <div>
                    <div style="font-weight:600;font-size:13px">{{ r.resourceName }}</div>
                    <div class="text-muted text-sm">{{ r.role }}</div>
                  </div>
                  @if (r.isMember) {
                    <button
                      class="btn btn-ghost btn-sm"
                      style="color:#ef4444;min-width:72px"
                      (click)="removeMember(r)"
                    >Remove</button>
                  } @else {
                    <button
                      class="btn btn-primary btn-sm"
                      style="min-width:72px"
                      (click)="addMember(r)"
                    >+ Add</button>
                  }
                </div>
              }
              @if (!allResources.length) {
                <div class="text-muted text-sm" style="padding:16px 0;text-align:center">
                  No resources found. Add resources in the Resources page first.
                </div>
              }
            </div>
          }
          <div class="modal-footer" style="margin-top:16px">
            <button class="btn btn-ghost" (click)="showManageTeam = false">Done</button>
          </div>
        </div>
      </div>
    }
  `
})
export class ProjectAnalyzeComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);

  projectId!: string;
  project: any = null;
  documents: ProjectDocument[] = [];
  team: ProjectTeamMember[] = [];
  tasks: Task[] = [];
  allResources: ResourceWithMembership[] = [];

  // co-assignee state
  coAssigneesMap: Record<string, Array<{resourceId: string; resourceName: string}>> = {};
  addingCoAssigneeTask: string | null = null;
  expandedTaskId: string | null = null;

  sourceType: 'github' | 'local' = 'github';
  sourceInput = '';
  analyzing = false;
  analyzeError = '';
  docsLoading = true;
  teamLoading = true;
  allResourcesLoading = false;
  selectedResourceId: string | null = null;
  statusFilter = '';
  viewingDoc: ProjectDocument | null = null;
  showManageTeam = false;

  get filteredTasks(): Task[] {
    return this.tasks.filter(t =>
      (!this.selectedResourceId || t.assignedResourceId === this.selectedResourceId) &&
      (!this.statusFilter || t.status === this.statusFilter)
    );
  }

  get selectedMemberName(): string {
    return this.team.find(m => m.resourceId === this.selectedResourceId)?.resourceName ?? '';
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    this.loadProject();
    this.loadDocuments();
    this.loadTeam();
  }

  loadProject() {
    this.api.getProject(this.projectId).subscribe({
      next: p => {
        this.project = p;
        this.tasks = p.tasks ?? [];
        this.loadCoAssignees();
      }
    });
  }

  loadCoAssignees() {
    this.api.getProjectCoAssignees(this.projectId).subscribe({
      next: list => {
        this.coAssigneesMap = {};
        for (const ca of list) {
          if (!this.coAssigneesMap[ca.taskId]) this.coAssigneesMap[ca.taskId] = [];
          this.coAssigneesMap[ca.taskId].push({ resourceId: ca.resourceId, resourceName: ca.resourceName });
        }
      }
    });
  }

  loadDocuments() {
    this.docsLoading = true;
    this.api.getProjectDocuments(this.projectId).subscribe({
      next: d => { this.documents = d; this.docsLoading = false; },
      error: () => { this.docsLoading = false; }
    });
  }

  loadTeam() {
    this.teamLoading = true;
    this.api.getProjectTeam(this.projectId).subscribe({
      next: t => { this.team = t; this.teamLoading = false; },
      error: () => { this.teamLoading = false; }
    });
  }

  openManageTeam() {
    this.showManageTeam = true;
    this.allResourcesLoading = true;
    this.api.getAllResourcesWithMembership(this.projectId).subscribe({
      next: r => { this.allResources = r; this.allResourcesLoading = false; },
      error: () => { this.allResourcesLoading = false; }
    });
  }

  addMember(r: ResourceWithMembership) {
    this.api.addProjectMember(this.projectId, r.resourceId).subscribe(() => {
      r.isMember = true;
      this.loadTeam();
    });
  }

  removeMember(r: ResourceWithMembership) {
    this.api.removeProjectMember(this.projectId, r.resourceId).subscribe(() => {
      r.isMember = false;
      if (this.selectedResourceId === r.resourceId) this.selectedResourceId = null;
      this.loadTeam();
    });
  }

  // ── Co-Assignees ──────────────────────────────────────────────────────────

  getCoAssignees(taskId: string): Array<{resourceId: string; resourceName: string}> {
    return this.coAssigneesMap[taskId] ?? [];
  }

  getAvailableForCoAssign(task: Task): ProjectTeamMember[] {
    const existing = new Set(this.getCoAssignees(task.id).map(ca => ca.resourceId));
    if (task.assignedResourceId) existing.add(task.assignedResourceId);
    return this.team.filter(m => !existing.has(m.resourceId));
  }

  addCoAssignee(task: Task, resourceId: string) {
    if (!resourceId) return;
    this.api.addTaskCoAssignee(task.id, resourceId).subscribe(() => {
      if (!this.coAssigneesMap[task.id]) this.coAssigneesMap[task.id] = [];
      const member = this.team.find(m => m.resourceId === resourceId);
      if (member) this.coAssigneesMap[task.id].push({ resourceId, resourceName: member.resourceName });
      this.addingCoAssigneeTask = null;
    });
  }

  removeCoAssignee(task: Task, resourceId: string) {
    this.api.removeTaskCoAssignee(task.id, resourceId).subscribe(() => {
      this.coAssigneesMap[task.id] = this.getCoAssignees(task.id).filter(ca => ca.resourceId !== resourceId);
    });
  }

  toggleDescription(taskId: string) {
    this.expandedTaskId = this.expandedTaskId === taskId ? null : taskId;
  }

  // ── Existing methods ──────────────────────────────────────────────────────

  analyze() {
    if (!this.sourceInput.trim()) return;
    this.analyzing = true;
    this.analyzeError = '';

    const dto = this.sourceType === 'github'
      ? { githubUrl: this.sourceInput.trim(), localPath: null }
      : { githubUrl: null, localPath: this.sourceInput.trim() };

    this.api.analyzeProject(this.projectId, dto).subscribe({
      next: docs => {
        this.documents = [...docs, ...this.documents];
        this.analyzing = false;
        this.sourceInput = '';
      },
      error: err => {
        this.analyzeError = err?.error?.error ?? 'Analysis failed. Check the URL or path and try again.';
        this.analyzing = false;
      }
    });
  }

  viewDoc(doc: ProjectDocument) { this.viewingDoc = doc; }

  download(doc: ProjectDocument) {
    this.api.downloadDocument(doc.id).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${doc.documentType}_${new Date().toISOString().slice(0, 10)}.md`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  deleteDoc(id: string) {
    this.api.deleteDocument(id).subscribe(() => {
      this.documents = this.documents.filter(d => d.id !== id);
      if (this.viewingDoc?.id === id) this.viewingDoc = null;
    });
  }

  selectResource(id: string | null) { this.selectedResourceId = id; }

  updateTaskStatus(task: Task, status: string) {
    this.api.updateTask(task.id, { status } as any).subscribe(() => {
      task.status = status as any;
      this.loadTeam();
    });
  }

  reassignTask(task: Task, resourceId: string) {
    const newId = resourceId || null;
    this.api.updateTask(task.id, { assignedResourceId: newId } as any).subscribe(() => {
      task.assignedResourceId = newId ?? undefined;
      task.assignedResourceName = newId
        ? this.team.find(m => m.resourceId === newId)?.resourceName
        : undefined;
      this.loadTeam();
    });
  }

  docTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      root_plan: 'Root Plan',
      requirements: 'Requirements',
      test_cases: 'Test Cases',
      change_impact: 'Change Impact'
    };
    return labels[type] ?? type;
  }

  docTypeBadge(type: string): string {
    const map: Record<string, string> = {
      root_plan: 'badge-accent',
      requirements: 'badge-success',
      test_cases: 'badge-warning',
      change_impact: 'badge-danger'
    };
    return map[type] ?? 'badge-muted';
  }

  statusBadge(s: string) {
    return {
      'badge-success': s === 'active' || s === 'completed',
      'badge-warning': s === 'planning' || s === 'paused',
      'badge-muted': s === 'pending'
    };
  }

  priorityBadge(p: string) {
    return {
      'badge-danger': p === 'critical',
      'badge-warning': p === 'high',
      'badge-accent': p === 'medium',
      'badge-muted': p === 'low'
    };
  }
}
