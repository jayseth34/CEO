import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Project, Task, TaskBoard, Resource, AgentLog,
  AIDecision, DashboardStats, Requirement, ProjectDocument, ProjectTeamMember, ResourceWithMembership, TaskCoAssignee
} from '../models/models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  // Projects
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.base}/projects`);
  }

  getProject(id: string): Observable<any> {
    return this.http.get(`${this.base}/projects/${id}`);
  }

  createProject(dto: Partial<Project> & { clientName: string; budget: number; deadline: string }): Observable<Project> {
    return this.http.post<Project>(`${this.base}/projects`, dto);
  }

  updateProjectStatus(id: string, status: string): Observable<void> {
    return this.http.patch<void>(`${this.base}/projects/${id}/status`, JSON.stringify(status), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/projects/${id}`);
  }

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.base}/projects/stats`);
  }

  // Tasks
  getTasks(params?: { projectId?: string; status?: string; sprint?: string }): Observable<Task[]> {
    let p = new HttpParams();
    if (params?.projectId) p = p.set('projectId', params.projectId);
    if (params?.status) p = p.set('status', params.status);
    if (params?.sprint) p = p.set('sprint', params.sprint);
    return this.http.get<Task[]>(`${this.base}/tasks`, { params: p });
  }

  getTaskBoard(projectId: string): Observable<TaskBoard> {
    return this.http.get<TaskBoard>(`${this.base}/tasks/board/${projectId}`);
  }

  createTask(dto: Partial<Task> & { projectId: string }): Observable<Task> {
    return this.http.post<Task>(`${this.base}/tasks`, dto);
  }

  updateTask(id: string, dto: Partial<Task>): Observable<void> {
    return this.http.patch<void>(`${this.base}/tasks/${id}`, dto);
  }

  autoAssignTask(id: string): Observable<{ name: string; score: number; rationale: string }> {
    return this.http.post<any>(`${this.base}/tasks/${id}/assign`, {});
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/tasks/${id}`);
  }

  // Resources
  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.base}/resources`);
  }

  getWorkloadSummary(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/resources/workload`);
  }

  createResource(dto: Partial<Resource>): Observable<Resource> {
    return this.http.post<Resource>(`${this.base}/resources`, dto);
  }

  // Requirements
  submitRequirement(projectId: string, rawText: string): Observable<any> {
    return this.http.post(`${this.base}/requirements`, { projectId, rawText });
  }

  getRequirements(projectId: string): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(`${this.base}/requirements/${projectId}`);
  }

  // Agents
  getAgentLogs(role?: string, limit = 50): Observable<AgentLog[]> {
    let p = new HttpParams().set('limit', limit.toString());
    if (role) p = p.set('role', role);
    return this.http.get<AgentLog[]>(`${this.base}/agents/logs`, { params: p });
  }

  getDecisions(limit = 20): Observable<AIDecision[]> {
    return this.http.get<AIDecision[]>(`${this.base}/agents/decisions?limit=${limit}`);
  }

  getActivitySummary(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/agents/activity-summary`);
  }

  ctoAnalyze(projectId: string): Observable<{ analysis: string }> {
    return this.http.post<{ analysis: string }>(`${this.base}/agents/cto/analyze/${projectId}`, {});
  }

  triggerRebalance(): Observable<any> {
    return this.http.post(`${this.base}/agents/orchestrator/rebalance`, {});
  }

  approveDecision(id: string, approved: boolean): Observable<void> {
    return this.http.patch<void>(`${this.base}/agents/decisions/${id}/approve`, approved);
  }

  // Documents
  analyzeProject(projectId: string, dto: { githubUrl?: string | null; localPath?: string | null }): Observable<ProjectDocument[]> {
    return this.http.post<ProjectDocument[]>(`${this.base}/projects/${projectId}/analyze`, dto);
  }

  getProjectDocuments(projectId: string): Observable<ProjectDocument[]> {
    return this.http.get<ProjectDocument[]>(`${this.base}/projects/${projectId}/documents`);
  }

  downloadDocument(id: string): Observable<Blob> {
    return this.http.get(`${this.base}/documents/${id}/download`, { responseType: 'blob' });
  }

  deleteDocument(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/documents/${id}`);
  }

  getProjectTeam(projectId: string): Observable<ProjectTeamMember[]> {
    return this.http.get<ProjectTeamMember[]>(`${this.base}/projects/${projectId}/team`);
  }

  getAllResourcesWithMembership(projectId: string): Observable<ResourceWithMembership[]> {
    return this.http.get<ResourceWithMembership[]>(`${this.base}/projects/${projectId}/members/all`);
  }

  addProjectMember(projectId: string, resourceId: string): Observable<void> {
    return this.http.post<void>(`${this.base}/projects/${projectId}/members/${resourceId}`, {});
  }

  removeProjectMember(projectId: string, resourceId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/projects/${projectId}/members/${resourceId}`);
  }

  // Task Co-Assignees
  getProjectCoAssignees(projectId: string): Observable<TaskCoAssignee[]> {
    return this.http.get<TaskCoAssignee[]>(`${this.base}/tasks/project/${projectId}/assignees`);
  }

  addTaskCoAssignee(taskId: string, resourceId: string): Observable<void> {
    return this.http.post<void>(`${this.base}/tasks/${taskId}/assignees/${resourceId}`, {});
  }

  removeTaskCoAssignee(taskId: string, resourceId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/tasks/${taskId}/assignees/${resourceId}`);
  }
}
