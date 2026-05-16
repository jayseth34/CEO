import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { SignalrService } from '../../core/services/signalr.service';
import { Task, TaskBoard, Project } from '../../core/models/models';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div>
        <div class="page-title">Task Board</div>
        <div class="page-sub">{{ projectId ? 'Project view' : 'All tasks' }}</div>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-ghost btn-sm" (click)="showModal = true">+ Add Task</button>
        <button class="btn btn-ghost btn-sm" (click)="refresh()">Refresh</button>
      </div>
    </div>
    <div class="page-body" style="padding-bottom:0">
      @if (loading) { <div class="spinner"></div> }
      @if (board && !loading) {
        <div class="board">
          @for (col of columns; track col.key) {
            <div class="column">
              <div class="column-header">
                {{ col.label }}
                <span class="column-count">{{ getColTasks(col.key).length }}</span>
              </div>
              <div class="column-body">
                @for (task of getColTasks(col.key); track task.id) {
                  <div class="task-card" (click)="selectTask(task)">
                    <div class="task-card-title">{{ task.title }}</div>
                    <div class="task-card-meta">
                      <span class="badge badge-muted text-sm">{{ task.agentRole }}</span>
                      <span class="badge text-sm" [class]="priorityBadge(task.priority)">{{ task.priority }}</span>
                    </div>
                    @if (task.assignedResourceName) {
                      <div class="text-muted text-sm" style="margin-top:6px">
                        ◎ {{ task.assignedResourceName }}
                      </div>
                    }
                    @if (!task.assignedResourceId) {
                      <button class="btn btn-ghost btn-sm" style="margin-top:8px;width:100%" (click)="autoAssign(task, $event)">
                        AI Assign
                      </button>
                    }
                    @if (task.estimatedHours) {
                      <div class="text-muted text-sm" style="margin-top:4px">{{ task.estimatedHours }}h estimate</div>
                    }
                  </div>
                }
              </div>
            </div>
          }
        </div>
      }
    </div>

    @if (selectedTask) {
      <div class="modal-backdrop" (click)="$event.target === $event.currentTarget && (selectedTask = null)">
        <div class="modal" style="width:520px">
          <div class="modal-title">{{ selectedTask.title }}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
            <div>
              <label>Status</label>
              <select [(ngModel)]="selectedTask.status" (change)="updateTask('status', selectedTask.status)">
                <option value="backlog">Backlog</option>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label>Priority</label>
              <select [(ngModel)]="selectedTask.priority" (change)="updateTask('priority', selectedTask.priority)">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Sprint</label>
            <input [(ngModel)]="selectedTask.sprint" (blur)="updateTask('sprint', selectedTask.sprint)" />
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label>Agent Role</label>
              <div style="padding:9px 12px;background:var(--surface2);border-radius:7px;font-size:13px">{{ selectedTask.agentRole }}</div>
            </div>
            <div>
              <label>Estimated Hours</label>
              <div style="padding:9px 12px;background:var(--surface2);border-radius:7px;font-size:13px">{{ selectedTask.estimatedHours }}h</div>
            </div>
          </div>
          @if (selectedTask.assignedResourceName) {
            <div class="alert alert-info" style="margin-top:12px">
              Assigned to <strong>{{ selectedTask.assignedResourceName }}</strong>
              — score: {{ selectedTask.assignmentScore | number:'1.2-2' }}
            </div>
          }
          <div class="modal-footer">
            <button class="btn btn-danger btn-sm" (click)="deleteTask(selectedTask.id)">Delete</button>
            <button class="btn btn-ghost" (click)="selectedTask = null">Close</button>
            @if (!selectedTask.assignedResourceId) {
              <button class="btn btn-primary" (click)="autoAssign(selectedTask)">AI Auto-Assign</button>
            }
          </div>
        </div>
      </div>
    }

    @if (showModal) {
      <div class="modal-backdrop" (click)="$event.target === $event.currentTarget && (showModal = false)">
        <div class="modal">
          <div class="modal-title">Add Task</div>
          @if (!projectId) {
            <div class="form-group">
              <label>Project</label>
              <select [(ngModel)]="form.selectedProjectId">
                <option value="">— select a project —</option>
                @for (p of projects; track p.id) {
                  <option [value]="p.id">{{ p.name }}</option>
                }
              </select>
            </div>
          }
          <div class="form-group">
            <label>Title</label>
            <input [(ngModel)]="form.title" placeholder="Task title" />
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea [(ngModel)]="form.description" placeholder="What needs to be done?"></textarea>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div class="form-group">
              <label>Agent Role</label>
              <select [(ngModel)]="form.agentRole">
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="qa">QA</option>
                <option value="devops">DevOps</option>
                <option value="pm">PM</option>
              </select>
            </div>
            <div class="form-group">
              <label>Priority</label>
              <select [(ngModel)]="form.priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Estimated Hours</label>
            <input type="number" [(ngModel)]="form.estimatedHours" />
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" (click)="showModal = false">Cancel</button>
            <button class="btn btn-primary" (click)="createTask()" [disabled]="saving">
              {{ saving ? 'Creating...' : 'Create Task' }}
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class TasksComponent implements OnInit, OnDestroy {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private signalr = inject(SignalrService);
  private sub?: Subscription;

  board: TaskBoard | null = null;
  allTasks: Task[] = [];
  projects: Project[] = [];
  loading = true;
  showModal = false;
  saving = false;
  selectedTask: Task | null = null;
  projectId: string | null = null;

  form = { title: '', description: '', agentRole: 'developer', priority: 'medium', estimatedHours: 4, selectedProjectId: '' };

  columns = [
    { key: 'backlog', label: 'Backlog' },
    { key: 'todo', label: 'To Do' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'review', label: 'Review' },
    { key: 'done', label: 'Done' }
  ];

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.refresh();
    if (!this.projectId) {
      this.api.getProjects().subscribe({ next: p => { this.projects = p; }, error: () => {} });
    }
    this.sub = this.signalr.events$.subscribe(ev => {
      if (ev.type === 'TaskAssigned' || ev.type === 'TaskUpdated') this.refresh();
    });
  }

  ngOnDestroy() { this.sub?.unsubscribe(); }

  refresh() {
    this.loading = true;
    if (this.projectId) {
      this.api.getTaskBoard(this.projectId).subscribe({
        next: b => { this.board = b; this.loading = false; },
        error: () => { this.loading = false; }
      });
    } else {
      this.api.getTasks().subscribe({
        next: tasks => {
          this.allTasks = tasks;
          this.board = {
            backlog: tasks.filter(t => t.status === 'backlog'),
            todo: tasks.filter(t => t.status === 'todo'),
            inProgress: tasks.filter(t => t.status === 'in_progress'),
            review: tasks.filter(t => t.status === 'review'),
            done: tasks.filter(t => t.status === 'done')
          };
          this.loading = false;
        },
        error: () => { this.loading = false; }
      });
    }
  }

  getColTasks(key: string): Task[] {
    if (!this.board) return [];
    const map: Record<string, Task[]> = {
      backlog: this.board.backlog,
      todo: this.board.todo,
      in_progress: this.board.inProgress,
      review: this.board.review,
      done: this.board.done
    };
    return map[key] ?? [];
  }

  selectTask(task: Task) { this.selectedTask = { ...task }; }

  updateTask(field: string, value: any) {
    if (!this.selectedTask) return;
    this.api.updateTask(this.selectedTask.id, { [field]: value }).subscribe(() => this.refresh());
  }

  autoAssign(task: Task, event?: Event) {
    event?.stopPropagation();
    this.api.autoAssignTask(task.id).subscribe({ next: () => this.refresh(), error: () => {} });
  }

  createTask() {
    const projectId = this.projectId ?? this.form.selectedProjectId;
    if (!this.form.title || !projectId) return;
    this.saving = true;
    this.api.createTask({ ...this.form, projectId } as any).subscribe({
      next: () => { this.showModal = false; this.saving = false; this.refresh(); this.form = { title: '', description: '', agentRole: 'developer', priority: 'medium', estimatedHours: 4, selectedProjectId: '' }; },
      error: () => { this.saving = false; }
    });
  }

  deleteTask(id: string) {
    this.api.deleteTask(id).subscribe(() => { this.selectedTask = null; this.refresh(); });
  }

  priorityBadge(p: string) { return { 'badge-danger': p === 'critical', 'badge-warning': p === 'high', 'badge-accent': p === 'medium', 'badge-muted': p === 'low' }; }
}
