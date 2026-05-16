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
  `
})
export class ResourcesComponent implements OnInit {
  private api = inject(ApiService);
  resources: Resource[] = [];
  loading = true;
  showModal = false;
  saving = false;
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
      next: r => { this.resources.push(r); this.showModal = false; this.saving = false; },
      error: () => { this.saving = false; }
    });
  }

  scoreColor(s: number) { return s >= 0.8 ? 'priority-medium' : s >= 0.5 ? 'priority-high' : 'priority-critical'; }
}
