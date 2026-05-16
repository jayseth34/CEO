import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Project, Requirement } from '../../core/models/models';

@Component({
  selector: 'app-requirements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div>
        <div class="page-title">Requirements</div>
        <div class="page-sub">Submit business requirements — CEO agent breaks them into tasks</div>
      </div>
    </div>
    <div class="page-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
        <div>
          <div class="card" style="margin-bottom:16px">
            <div class="card-title">Submit New Requirement</div>
            <div class="form-group">
              <label>Project</label>
              <select [(ngModel)]="form.projectId">
                <option value="">Select project...</option>
                @for (p of projects; track p.id) {
                  <option [value]="p.id">{{ p.name }}</option>
                }
              </select>
            </div>
            <div class="form-group">
              <label>Business Requirement</label>
              <textarea [(ngModel)]="form.rawText" rows="6"
                placeholder="Describe what you need in plain language. Example: Build us a food delivery app with real-time tracking, restaurant management portal, and payment integration. Budget ₹20L, deadline 3 months.">
              </textarea>
            </div>
            <button class="btn btn-primary" style="width:100%" (click)="submit()" [disabled]="submitting || !form.projectId || !form.rawText">
              {{ submitting ? 'CEO Agent is parsing...' : 'Submit to CEO Agent' }}
            </button>
          </div>

          @if (result) {
            <div class="card">
              <div class="card-title">CEO Agent Response</div>
              <div class="alert alert-info" style="margin-bottom:12px">
                {{ result.tasksGenerated }} tasks generated — {{ result.summary }}
              </div>
              @for (task of result.tasks; track task.title) {
                <div style="padding:8px 0;border-bottom:1px solid var(--border)">
                  <div style="display:flex;gap:8px;align-items:center;margin-bottom:2px">
                    <span class="badge badge-muted">{{ task.agentRole }}</span>
                    <span class="badge" [class]="priorityBadge(task.priority)">{{ task.priority }}</span>
                    <span class="text-muted text-sm">{{ task.estimatedHours }}h</span>
                  </div>
                  <div style="font-size:13px;font-weight:500">{{ task.title }}</div>
                </div>
              }
            </div>
          }
        </div>

        <div class="card">
          <div class="card-title">Requirement History</div>
          @if (!form.projectId) {
            <div class="text-muted text-sm">Select a project to see its requirements</div>
          }
          @for (req of requirements; track req.id) {
            <div style="padding:12px 0;border-bottom:1px solid var(--border)">
              <div class="flex items-center justify-between mb-4">
                <span class="badge" [class]="req.status === 'tasked' ? 'badge-success' : 'badge-warning'">{{ req.status }}</span>
                <span class="text-muted text-sm">{{ req.createdAt | date:'short' }}</span>
              </div>
              <div class="text-sm" style="color:var(--text);margin-bottom:4px;font-style:italic">
                "{{ req.rawText | slice:0:120 }}{{ req.rawText.length > 120 ? '...' : '' }}"
              </div>
              @if (req.parsedSummary) {
                <div class="text-muted text-sm">{{ req.parsedSummary }}</div>
              }
              <div class="text-muted text-sm" style="margin-top:4px">{{ req.tasksGenerated }} tasks generated</div>
            </div>
          }
          @if (!requirements.length && form.projectId) {
            <div class="text-muted text-sm">No requirements submitted yet for this project</div>
          }
        </div>
      </div>
    </div>
  `
})
export class RequirementsComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);

  projects: Project[] = [];
  requirements: Requirement[] = [];
  submitting = false;
  result: any = null;
  form = { projectId: '', rawText: '' };

  ngOnInit() {
    this.api.getProjects().subscribe(p => {
      this.projects = p;
      const preselect = this.route.snapshot.queryParamMap.get('projectId');
      if (preselect) { this.form.projectId = preselect; this.loadRequirements(); }
    });
  }

  submit() {
    if (!this.form.projectId || !this.form.rawText.trim()) return;
    this.submitting = true;
    this.result = null;
    this.api.submitRequirement(this.form.projectId, this.form.rawText).subscribe({
      next: res => {
        this.result = res;
        this.submitting = false;
        this.form.rawText = '';
        this.loadRequirements();
      },
      error: () => { this.submitting = false; }
    });
  }

  loadRequirements() {
    if (!this.form.projectId) return;
    this.api.getRequirements(this.form.projectId).subscribe(r => this.requirements = r);
  }

  priorityBadge(p: string) { return { 'badge-danger': p === 'critical', 'badge-warning': p === 'high', 'badge-accent': p === 'medium', 'badge-muted': p === 'low' }; }
}
