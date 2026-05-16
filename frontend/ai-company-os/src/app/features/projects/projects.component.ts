import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Project } from '../../core/models/models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="page-header">
      <div>
        <div class="page-title">Projects</div>
        <div class="page-sub">{{ projects.length }} projects</div>
      </div>
      <button class="btn btn-primary" (click)="showModal = true">+ New Project</button>
    </div>
    <div class="page-body">
      @if (loading) { <div class="spinner"></div> }
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px">
        @for (p of projects; track p.id) {
          <div class="card" style="position:relative">
            <div class="flex items-center justify-between mb-4">
              <span class="badge" [class]="statusBadge(p.status)">{{ p.status }}</span>
              <span class="badge" [class]="priorityBadge(p.priority)">{{ p.priority }}</span>
            </div>
            <div style="font-size:15px;font-weight:600;margin-bottom:4px">{{ p.name }}</div>
            <div class="text-muted text-sm">{{ p.clientName }}</div>

            <div style="margin:12px 0;display:grid;grid-template-columns:1fr 1fr;gap:8px">
              <div>
                <div class="text-muted text-sm">Budget</div>
                <div style="font-size:13px;font-weight:500">₹{{ p.budget | number:'1.0-0' }}</div>
              </div>
              <div>
                <div class="text-muted text-sm">Deadline</div>
                <div style="font-size:13px;font-weight:500">{{ p.deadline | date:'mediumDate' }}</div>
              </div>
              <div>
                <div class="text-muted text-sm">Tasks</div>
                <div style="font-size:13px;font-weight:500">{{ p.completedTasks }}/{{ p.totalTasks }} done</div>
              </div>
              <div>
                <div class="text-muted text-sm">In Progress</div>
                <div style="font-size:13px;font-weight:500">{{ p.inProgressTasks }}</div>
              </div>
            </div>

            @if (p.totalTasks > 0) {
              <div class="progress mb-4">
                <div class="progress-fill" [style.width.%]="(p.completedTasks / p.totalTasks) * 100"></div>
              </div>
            }

            <div class="flex gap-2" style="flex-wrap:wrap">
              <a [routerLink]="['/projects', p.id, 'board']" class="btn btn-ghost btn-sm">Board</a>
              <a [routerLink]="['/projects', p.id, 'analyze']" class="btn btn-ghost btn-sm">Analyze</a>
              <a [routerLink]="['/requirements']" [queryParams]="{projectId: p.id}" class="btn btn-ghost btn-sm">+ Req</a>
              <select class="btn btn-ghost btn-sm" style="padding:4px 8px;cursor:pointer" [value]="p.status" (change)="changeStatus(p.id, $any($event.target).value)">
                <option value="pending">Pending</option>
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
              </select>
              <button class="btn btn-ghost btn-sm" style="color:#ef4444;margin-left:auto" (click)="confirmDelete(p)">Delete</button>
            </div>
          </div>
        }
        @if (!loading && !projects.length) {
          <div class="text-muted" style="grid-column:1/-1;text-align:center;padding:40px">
            No projects yet. Create your first project.
          </div>
        }
      </div>
    </div>

    <!-- New Project Modal -->
    @if (showModal) {
      <div class="modal-backdrop" (click)="$event.target === $event.currentTarget && (showModal = false)">
        <div class="modal">
          <div class="modal-title">New Project</div>
          <div class="form-group">
            <label>Project Name</label>
            <input [(ngModel)]="form.name" placeholder="e.g. Food Delivery App" />
          </div>
          <div class="form-group">
            <label>Client Name</label>
            <input [(ngModel)]="form.clientName" placeholder="Client or company name" />
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea [(ngModel)]="form.description" placeholder="Brief project overview"></textarea>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div class="form-group">
              <label>Budget (₹)</label>
              <input type="number" [(ngModel)]="form.budget" placeholder="2000000" />
            </div>
            <div class="form-group">
              <label>Deadline</label>
              <input type="date" [(ngModel)]="form.deadline" />
            </div>
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
          <div class="modal-footer">
            <button class="btn btn-ghost" (click)="showModal = false">Cancel</button>
            <button class="btn btn-primary" (click)="create()" [disabled]="saving">
              {{ saving ? 'Creating...' : 'Create Project' }}
            </button>
          </div>
        </div>
      </div>
    }

    <!-- Delete Confirmation Modal -->
    @if (deleteTarget) {
      <div class="modal-backdrop" (click)="$event.target === $event.currentTarget && (deleteTarget = null)">
        <div class="modal" style="max-width:420px">
          <div class="modal-title" style="color:#ef4444">Delete Project</div>
          <p style="font-size:14px;color:var(--text-muted);margin-bottom:6px">
            Are you sure you want to delete <strong style="color:var(--text)">{{ deleteTarget.name }}</strong>?
          </p>
          <p style="font-size:13px;color:#ef4444;margin-bottom:0">
            This will permanently delete all tasks, requirements, documents, and team memberships for this project.
          </p>
          <div class="modal-footer" style="margin-top:20px">
            <button class="btn btn-ghost" (click)="deleteTarget = null">Cancel</button>
            <button class="btn btn-primary" style="background:#ef4444;border-color:#ef4444" (click)="deleteProject()" [disabled]="deleting">
              {{ deleting ? 'Deleting…' : 'Yes, Delete Project' }}
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class ProjectsComponent implements OnInit {
  private api = inject(ApiService);
  projects: Project[] = [];
  loading = true;
  showModal = false;
  saving = false;
  deleting = false;
  deleteTarget: Project | null = null;
  form = { name: '', clientName: '', description: '', budget: 0, deadline: '', priority: 'medium' };

  ngOnInit() {
    this.api.getProjects().subscribe({ next: p => { this.projects = p; this.loading = false; }, error: () => { this.loading = false; } });
  }

  create() {
    if (!this.form.name || !this.form.clientName) return;
    this.saving = true;
    this.api.createProject(this.form as any).subscribe({
      next: p => { this.projects.unshift(p); this.showModal = false; this.saving = false; this.form = { name: '', clientName: '', description: '', budget: 0, deadline: '', priority: 'medium' }; },
      error: () => { this.saving = false; }
    });
  }

  changeStatus(id: string, status: string) {
    this.api.updateProjectStatus(id, status).subscribe(() => {
      const p = this.projects.find(p => p.id === id);
      if (p) p.status = status as any;
    });
  }

  confirmDelete(p: Project) { this.deleteTarget = p; }

  deleteProject() {
    if (!this.deleteTarget) return;
    this.deleting = true;
    const id = this.deleteTarget.id;
    this.api.deleteProject(id).subscribe({
      next: () => {
        this.projects = this.projects.filter(p => p.id !== id);
        this.deleteTarget = null;
        this.deleting = false;
      },
      error: () => { this.deleting = false; }
    });
  }

  statusBadge(s: string) { return { 'badge-success': s === 'active' || s === 'completed', 'badge-warning': s === 'planning' || s === 'paused', 'badge-muted': s === 'pending' }; }
  priorityBadge(p: string) { return { 'badge-danger': p === 'critical', 'badge-warning': p === 'high', 'badge-accent': p === 'medium', 'badge-muted': p === 'low' }; }
}
