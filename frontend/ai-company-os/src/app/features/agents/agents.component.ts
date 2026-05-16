import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { SignalrService } from '../../core/services/signalr.service';
import { AgentLog, AIDecision } from '../../core/models/models';

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div>
        <div class="page-title">Agent Monitor</div>
        <div class="page-sub">Live activity from CEO, CTO, PM, and Orchestrator agents</div>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-ghost btn-sm" (click)="triggerRebalance()">Trigger Rebalance</button>
        <button class="btn btn-ghost btn-sm" (click)="refresh()">Refresh</button>
      </div>
    </div>
    <div class="page-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">
        @for (a of agentTypes; track a.role) {
          <div class="card" style="display:flex;gap:12px;align-items:center">
            <div style="width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;background:var(--surface2)">
              {{ a.icon }}
            </div>
            <div style="flex:1">
              <div style="font-weight:600;font-size:14px" [class]="'agent-' + a.role">{{ a.label }}</div>
              <div class="text-muted text-sm">{{ a.description }}</div>
            </div>
            <div class="status-dot" style="flex-shrink:0"></div>
          </div>
        }
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div class="card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
            <div class="card-title" style="margin:0">Agent Logs</div>
            <select [(ngModel)]="selectedRole" (change)="loadLogs()" style="width:auto;padding:4px 8px;font-size:12px">
              <option value="">All agents</option>
              <option value="ceo">CEO</option>
              <option value="cto">CTO</option>
              <option value="pm">PM</option>
              <option value="orchestrator">Orchestrator</option>
            </select>
          </div>
          <div style="max-height:400px;overflow-y:auto">
            @for (log of logs; track log.id) {
              <div style="padding:8px 0;border-bottom:1px solid var(--border)">
                <div class="flex items-center gap-2" style="margin-bottom:2px">
                  <span class="badge badge-muted" [class]="'agent-' + log.agentRole" style="font-size:10px">{{ log.agentRole | uppercase }}</span>
                  <span class="badge" [class]="levelBadge(log.level)" style="font-size:10px">{{ log.level }}</span>
                  <span class="text-muted text-sm">{{ log.createdAt | date:'HH:mm:ss' }}</span>
                </div>
                <div style="font-size:12px;font-weight:500">{{ log.action }}</div>
                <div class="text-muted text-sm">{{ log.details }}</div>
              </div>
            }
            @if (!logs.length) { <div class="text-muted text-sm">No logs yet</div> }
          </div>
        </div>

        <div class="card">
          <div class="card-title">AI Decisions</div>
          <div style="max-height:400px;overflow-y:auto">
            @for (d of decisions; track d.id) {
              <div style="padding:10px 0;border-bottom:1px solid var(--border)">
                <div class="flex items-center gap-2" style="margin-bottom:4px">
                  <span class="badge badge-muted" [class]="'agent-' + d.agentRole" style="font-size:10px">{{ d.agentRole | uppercase }}</span>
                  <span class="badge badge-muted" style="font-size:10px">{{ d.decisionType }}</span>
                  <span class="text-sm" style="color:var(--success)">{{ (d.confidenceScore * 100) | number:'1.0-0' }}%</span>
                  @if (!d.isApproved) { <span class="badge badge-danger" style="font-size:10px">Rejected</span> }
                </div>
                <div class="text-sm">{{ d.rationale }}</div>
                <div class="text-muted text-sm">{{ d.createdAt | date:'short' }}</div>
                @if (d.isApproved) {
                  <button class="btn btn-danger btn-sm" style="margin-top:6px" (click)="rejectDecision(d.id)">Reject</button>
                }
              </div>
            }
            @if (!decisions.length) { <div class="text-muted text-sm">No decisions yet</div> }
          </div>
        </div>
      </div>
    </div>
  `
})
export class AgentsComponent implements OnInit, OnDestroy {
  private api = inject(ApiService);
  private signalr = inject(SignalrService);
  private sub?: Subscription;

  logs: AgentLog[] = [];
  decisions: AIDecision[] = [];
  selectedRole = '';

  agentTypes = [
    { role: 'ceo', icon: '👑', label: 'CEO Agent', description: 'Parses requirements, sets strategy, generates tasks' },
    { role: 'cto', icon: '⚙️', label: 'CTO Agent', description: 'Recommends tech stack, architecture, and risk' },
    { role: 'pm', icon: '📋', label: 'PM Agent', description: 'Assigns tasks to best-fit resources using scoring' },
    { role: 'orchestrator', icon: '🔄', label: 'Orchestrator', description: 'Monitors workloads, deadlines, rebalances work' }
  ];

  ngOnInit() {
    this.refresh();
    this.sub = this.signalr.events$.subscribe(() => this.loadLogs());
  }

  ngOnDestroy() { this.sub?.unsubscribe(); }

  refresh() { this.loadLogs(); this.loadDecisions(); }

  loadLogs() {
    this.api.getAgentLogs(this.selectedRole || undefined, 50).subscribe(l => this.logs = l);
  }

  loadDecisions() {
    this.api.getDecisions().subscribe(d => this.decisions = d);
  }

  triggerRebalance() {
    this.api.triggerRebalance().subscribe(() => this.refresh());
  }

  rejectDecision(id: string) {
    this.api.approveDecision(id, false).subscribe(() => this.loadDecisions());
  }

  levelBadge(l: string) { return { 'badge-danger': l === 'error', 'badge-warning': l === 'warn', 'badge-muted': l === 'info' }; }
}
