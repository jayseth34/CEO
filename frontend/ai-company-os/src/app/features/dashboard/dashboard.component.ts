import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { DashboardStats } from '../../core/models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-header">
      <div>
        <div class="page-title">Command Center</div>
        <div class="page-sub">AI agents are managing your company in real time</div>
      </div>
      <button class="btn btn-ghost btn-sm" (click)="refresh()">Refresh</button>
    </div>
    <div class="page-body">
      @if (loading) { <div class="spinner"></div> }
      @if (stats) {
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value" style="color:#6366f1">{{ stats.totalProjects }}</div>
            <div class="stat-label">Total Projects</div>
            <div class="stat-change text-muted">{{ stats.activeProjects }} active</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" style="color:#22c55e">{{ stats.completedTasks }}</div>
            <div class="stat-label">Tasks Done</div>
            <div class="stat-change text-muted">of {{ stats.totalTasks }} total</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" style="color:#38bdf8">{{ stats.totalResources }}</div>
            <div class="stat-label">Team Members</div>
            <div class="stat-change text-muted">{{ stats.availableResources }} available</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" style="color:#f59e0b">{{ stats.totalBudget | currency:'INR':'symbol-narrow':'1.0-0' }}</div>
            <div class="stat-label">Total Budget</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ completionRate }}%</div>
            <div class="stat-label">Completion Rate</div>
            <div class="progress mt-2">
              <div class="progress-fill" [style.width.%]="completionRate"></div>
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div class="card">
            <div class="card-title">Recent Agent Activity</div>
            @for (act of stats.recentAgentActivity; track act.timestamp) {
              <div style="padding:8px 0;border-bottom:1px solid var(--border);display:flex;gap:12px;align-items:flex-start">
                <span class="badge badge-muted" [class]="'agent-' + act.agentRole" style="flex-shrink:0;margin-top:1px">{{ act.agentRole | uppercase }}</span>
                <div>
                  <div style="font-size:13px">{{ act.action }}</div>
                  <div class="text-muted text-sm">{{ act.details }}</div>
                  <div class="text-muted text-sm">{{ act.timestamp | date:'shortTime' }}</div>
                </div>
              </div>
            }
            @if (!stats.recentAgentActivity?.length) {
              <div class="text-muted text-sm">No agent activity yet. Submit a requirement to start.</div>
            }
          </div>

          <div class="card">
            <div class="card-title">Quick Actions</div>
            <div style="display:flex;flex-direction:column;gap:10px;margin-top:4px">
              <a routerLink="/projects" class="btn btn-ghost" style="justify-content:flex-start">
                ▤ &nbsp; Create New Project
              </a>
              <a routerLink="/requirements" class="btn btn-ghost" style="justify-content:flex-start">
                ⊞ &nbsp; Submit Business Requirement
              </a>
              <a routerLink="/resources" class="btn btn-ghost" style="justify-content:flex-start">
                ◎ &nbsp; Manage Team Resources
              </a>
              <a routerLink="/agents" class="btn btn-ghost" style="justify-content:flex-start">
                ⬡ &nbsp; Monitor AI Agents
              </a>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class DashboardComponent implements OnInit {
  private api = inject(ApiService);
  stats: DashboardStats | null = null;
  loading = true;

  get completionRate(): number {
    if (!this.stats || this.stats.totalTasks === 0) return 0;
    return Math.round((this.stats.completedTasks / this.stats.totalTasks) * 100);
  }

  ngOnInit() { this.refresh(); }

  refresh() {
    this.loading = true;
    this.api.getDashboardStats().subscribe({
      next: s => { this.stats = s; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
