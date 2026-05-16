import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    path: 'projects/:id/board',
    loadComponent: () => import('./features/tasks/tasks.component').then(m => m.TasksComponent)
  },
  {
    path: 'projects/:id/analyze',
    loadComponent: () => import('./features/project-analyze/project-analyze.component').then(m => m.ProjectAnalyzeComponent)
  },
  {
    path: 'tasks',
    loadComponent: () => import('./features/tasks/tasks.component').then(m => m.TasksComponent)
  },
  {
    path: 'resources',
    loadComponent: () => import('./features/resources/resources.component').then(m => m.ResourcesComponent)
  },
  {
    path: 'agents',
    loadComponent: () => import('./features/agents/agents.component').then(m => m.AgentsComponent)
  },
  {
    path: 'requirements',
    loadComponent: () => import('./features/requirements/requirements.component').then(m => m.RequirementsComponent)
  },
  { path: '**', redirectTo: 'dashboard' }
];
