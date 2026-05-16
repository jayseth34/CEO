import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignalrService } from './core/services/signalr.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="layout">
      <aside class="sidebar">
        <div class="sidebar-logo">
          AI Company OS
          <span>Multi-Agent Platform</span>
        </div>
        <nav class="sidebar-nav">
          <a class="nav-item" routerLink="/dashboard" routerLinkActive="active">
            <span class="nav-icon">◈</span> Dashboard
          </a>
          <a class="nav-item" routerLink="/projects" routerLinkActive="active">
            <span class="nav-icon">▤</span> Projects
          </a>
          <a class="nav-item" routerLink="/tasks" routerLinkActive="active">
            <span class="nav-icon">✦</span> Tasks
          </a>
          <a class="nav-item" routerLink="/resources" routerLinkActive="active">
            <span class="nav-icon">◎</span> Resources
          </a>
          <a class="nav-item" routerLink="/requirements" routerLinkActive="active">
            <span class="nav-icon">⊞</span> Requirements
          </a>
          <a class="nav-item" routerLink="/agents" routerLinkActive="active">
            <span class="nav-icon">⬡</span> Agent Monitor
          </a>
        </nav>
        <div class="sidebar-status">
          <span class="status-dot"></span>
          {{ signalr.isConnected ? 'Live — agents active' : 'Connecting...' }}
        </div>
      </aside>
      <main class="main">
        <router-outlet />
      </main>
    </div>
    @if (alerts.length > 0) {
      <div style="position:fixed;top:16px;right:16px;display:flex;flex-direction:column;gap:8px;z-index:9999;max-width:340px;">
        @for (alert of alerts; track alert.id) {
          <div class="alert alert-warn" style="position:relative;padding-right:32px;">
            <strong>{{ alert.title }}</strong><br>{{ alert.message }}
            <button (click)="dismissAlert(alert.id)" style="position:absolute;top:8px;right:10px;background:none;border:none;color:inherit;cursor:pointer;font-size:16px;">×</button>
          </div>
        }
      </div>
    }
  `
})
export class AppComponent implements OnInit {
  signalr = inject(SignalrService);
  alerts: Array<{ id: number; title: string; message: string }> = [];
  private alertId = 0;

  async ngOnInit() {
    await this.signalr.connect();
    this.signalr.events$.subscribe(ev => {
      if (ev.type === 'DeadlineAlert') {
        this.showAlert('Deadline Risk', `${ev.payload.projectName}: ${Math.round(ev.payload.daysRemaining)} days left, ${ev.payload.remainingTasks} tasks pending`);
      }
      if (ev.type === 'WorkloadRebalanced') {
        this.showAlert('Rebalanced', `Orchestrator moved ${ev.payload.count} tasks to balance workloads`);
      }
    });
  }

  showAlert(title: string, message: string) {
    const id = ++this.alertId;
    this.alerts.push({ id, title, message });
    setTimeout(() => this.dismissAlert(id), 6000);
  }

  dismissAlert(id: number) {
    this.alerts = this.alerts.filter(a => a.id !== id);
  }
}
