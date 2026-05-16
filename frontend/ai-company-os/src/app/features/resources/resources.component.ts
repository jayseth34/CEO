import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Resource } from '../../core/models/models';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div>
        <div class="page-title">Team Resources</div>
        <div class="page-sub">{{ resources.length }} members — AI manages their workload</div>
      </div>
      <button class="btn btn-primary" (click)="showModal = true">+ Add Member</button>
    </div>
    <div class="page-body">
      @if (loading) { <div class="spinner"></div> }
      <div class="table-wrap card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Agent Type</th>
              <th>Skills</th>
              <th>Workload</th>
              <th>Score</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            @for (r of resources; track r.id) {
              <tr>
                <td>
                  <div style="font-weight:500">{{ r.name }}</div>
                  <div class="text-muted text-sm">{{ r.email }}</div>
                </td>
                <td>{{ r.role }}</td>
                <td>
                  <span class="badge badge-accent">{{ r.agentType }}</span>
                </td>
                <td>
                  <div style="display:flex;gap:4px;flex-wrap:wrap;max-width:200px">
                    @for (skill of r.skills.slice(0,4); track skill) {
                      <span class="badge badge-muted" style="font-size:10px">{{ skill }}</span>
                    }
                    @if (r.skills.length > 4) {
                      <span class="text-muted text-sm">+{{ r.skills.length - 4 }}</span>
                    }
                  </div>
                </td>
                <td style="min-width:140px">
                  <div class="flex items-center gap-2">
                    <div class="progress" style="flex:1">
                      <div class="progress-fill" [class.overloaded]="r.currentLoad >= r.maxLoad"
                           [style.width.%]="(r.currentLoad / r.maxLoad) * 100"></div>
                    </div>
                    <span class="text-sm text-muted">{{ r.currentLoad }}/{{ r.maxLoad }}</span>
                  </div>
                </td>
                <td>
                  <span [class]="scoreColor(r.performanceScore)">{{ r.performanceScore | number:'1.1-1' }}</span>
                </td>
                <td>
                  <span class="badge" [class]="r.isAvailable && r.currentLoad < r.maxLoad ? 'badge-success' : 'badge-warning'">
                    {{ r.isAvailable && r.currentLoad < r.maxLoad ? 'Available' : 'Busy' }}
                  </span>
                </td>
                <td>
                  <button class="btn btn-ghost btn-sm" style="color:#ef4444" (click)="confirmDelete(r)">Delete</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>

    @if (showModal) {
      <div class="modal-backdrop" (click)="$event.target === $event.currentTarget && (showModal = false)">
        <div class="modal">
          <div class="modal-title">Add Team Member</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div class="form-group">
              <label>Name</label>
              <input [(ngModel)]="form.name" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input [(ngModel)]="form.email" type="email" />
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div class="form-group">
              <label>Role</label>
              <select [(ngModel)]="form.role">
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="qa">QA</option>
                <option value="devops">DevOps</option>
                <option value="pm">PM</option>
              </select>
            </div>
            <div class="form-group">
              <label>Agent Type</label>
              <select [(ngModel)]="form.agentType">
                <option value="worker">Worker</option>
                <option value="manager">Manager</option>
                <option value="cto">CTO</option>
                <option value="ceo">CEO</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Skills (comma-separated)</label>
            <input [(ngModel)]="skillsInput" placeholder="angular, typescript, postgresql" />
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div class="form-group">
              <label>Max Tasks</label>
              <input type="number" [(ngModel)]="form.maxLoad" />
            </div>
            <div class="form-group">
              <label>Hourly Rate (₹)</label>
              <input type="number" [(ngModel)]="form.hourlyRate" />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" (click)="showModal = false">Cancel</button>
            <button class="btn btn-primary" (click)="create()" [disabled]="saving">
              {{ saving ? 'Adding...' : 'Add Member' }}
            </button>
          </div>
        </div>
      </div>
    }

    @if (deleteTarget) {
      <div class="modal-backdrop" (click)="$event.target === $event.currentTarget && (deleteTarget = null)">
        <div class="modal" style="max-width:420px">
          <div class="modal-title" style="color:#ef4444">Delete Member</div>
          <p style="font-size:14px;color:var(--text-muted);margin-bottom:6px">
            Are you sure you want to delete <strong style="color:var(--text)">{{ deleteTarget.name }}</strong>?
          </p>
          <p style="font-size:13px;color:#ef4444;margin-bottom:0">
            This will remove them from all projects and unassign their tasks. Task history is preserved.
          </p>
          <div class="modal-footer" style="margin-top:20px">
            <button class="btn btn-ghost" (click)="deleteTarget = null">Cancel</button>
            <button class="btn btn-primary" style="background:#ef4444;border-color:#ef4444" (click)="deleteMember()" [disabled]="deleting">
              {{ deleting ? 'Deleting…' : 'Yes, Delete Member' }}
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class ResourcesComponent implements OnInit {
  private api = inject(ApiService);
  resources: Resource[] = [];
  loading = true;
  showModal = false;
  saving = false;
  deleting = false;
  deleteTarget: Resource | null = null;
  skillsInput = '';
  form = { name: '', email: '', role: 'developer', agentType: 'worker', maxLoad: 5, hourlyRate: 0 };

  ngOnInit() {
    this.api.getResources().subscribe({ next: r => { this.resources = r; this.loading = false; }, error: () => { this.loading = false; } });
  }

  create() {
    if (!this.form.name) return;
    this.saving = true;
    const skills = this.skillsInput.split(',').map(s => s.trim()).filter(Boolean);
    this.api.createResource({ ...this.form, skills } as any).subscribe({
      next: r => { this.resources.push(r); this.showModal = false; this.saving = false; this.skillsInput = ''; this.form = { name: '', email: '', role: 'developer', agentType: 'worker', maxLoad: 5, hourlyRate: 0 }; },
      error: () => { this.saving = false; }
    });
  }

  confirmDelete(r: Resource) { this.deleteTarget = r; }

  deleteMember() {
    if (!this.deleteTarget) return;
    this.deleting = true;
    const id = this.deleteTarget.id;
    this.api.deleteResource(id).subscribe({
      next: () => {
        this.resources = this.resources.filter(r => r.id !== id);
        this.deleteTarget = null;
        this.deleting = false;
      },
      error: () => { this.deleting = false; }
    });
  }

  scoreColor(s: number) { return s >= 0.8 ? 'priority-medium' : s >= 0.5 ? 'priority-high' : 'priority-critical'; }
}
