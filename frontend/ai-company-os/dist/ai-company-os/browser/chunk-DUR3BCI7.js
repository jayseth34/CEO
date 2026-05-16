import {
  HttpClient,
  HttpParams,
  environment,
  inject,
  ɵɵdefineInjectable
} from "./chunk-I2DB5OAP.js";

// src/app/core/services/api.service.ts
var ApiService = class _ApiService {
  constructor() {
    this.http = inject(HttpClient);
    this.base = environment.apiUrl;
  }
  // Projects
  getProjects() {
    return this.http.get(`${this.base}/projects`);
  }
  getProject(id) {
    return this.http.get(`${this.base}/projects/${id}`);
  }
  createProject(dto) {
    return this.http.post(`${this.base}/projects`, dto);
  }
  updateProjectStatus(id, status) {
    return this.http.patch(`${this.base}/projects/${id}/status`, JSON.stringify(status), {
      headers: { "Content-Type": "application/json" }
    });
  }
  deleteProject(id) {
    return this.http.delete(`${this.base}/projects/${id}`);
  }
  getDashboardStats() {
    return this.http.get(`${this.base}/projects/stats`);
  }
  // Tasks
  getTasks(params) {
    let p = new HttpParams();
    if (params?.projectId)
      p = p.set("projectId", params.projectId);
    if (params?.status)
      p = p.set("status", params.status);
    if (params?.sprint)
      p = p.set("sprint", params.sprint);
    return this.http.get(`${this.base}/tasks`, { params: p });
  }
  getTaskBoard(projectId) {
    return this.http.get(`${this.base}/tasks/board/${projectId}`);
  }
  createTask(dto) {
    return this.http.post(`${this.base}/tasks`, dto);
  }
  updateTask(id, dto) {
    return this.http.patch(`${this.base}/tasks/${id}`, dto);
  }
  autoAssignTask(id) {
    return this.http.post(`${this.base}/tasks/${id}/assign`, {});
  }
  deleteTask(id) {
    return this.http.delete(`${this.base}/tasks/${id}`);
  }
  // Resources
  getResources() {
    return this.http.get(`${this.base}/resources`);
  }
  getWorkloadSummary() {
    return this.http.get(`${this.base}/resources/workload`);
  }
  createResource(dto) {
    return this.http.post(`${this.base}/resources`, dto);
  }
  // Requirements
  submitRequirement(projectId, rawText) {
    return this.http.post(`${this.base}/requirements`, { projectId, rawText });
  }
  getRequirements(projectId) {
    return this.http.get(`${this.base}/requirements/${projectId}`);
  }
  // Agents
  getAgentLogs(role, limit = 50) {
    let p = new HttpParams().set("limit", limit.toString());
    if (role)
      p = p.set("role", role);
    return this.http.get(`${this.base}/agents/logs`, { params: p });
  }
  getDecisions(limit = 20) {
    return this.http.get(`${this.base}/agents/decisions?limit=${limit}`);
  }
  getActivitySummary() {
    return this.http.get(`${this.base}/agents/activity-summary`);
  }
  ctoAnalyze(projectId) {
    return this.http.post(`${this.base}/agents/cto/analyze/${projectId}`, {});
  }
  triggerRebalance() {
    return this.http.post(`${this.base}/agents/orchestrator/rebalance`, {});
  }
  approveDecision(id, approved) {
    return this.http.patch(`${this.base}/agents/decisions/${id}/approve`, approved);
  }
  // Documents
  analyzeProject(projectId, dto) {
    return this.http.post(`${this.base}/projects/${projectId}/analyze`, dto);
  }
  getProjectDocuments(projectId) {
    return this.http.get(`${this.base}/projects/${projectId}/documents`);
  }
  downloadDocument(id) {
    return this.http.get(`${this.base}/documents/${id}/download`, { responseType: "blob" });
  }
  deleteDocument(id) {
    return this.http.delete(`${this.base}/documents/${id}`);
  }
  getProjectTeam(projectId) {
    return this.http.get(`${this.base}/projects/${projectId}/team`);
  }
  getAllResourcesWithMembership(projectId) {
    return this.http.get(`${this.base}/projects/${projectId}/members/all`);
  }
  addProjectMember(projectId, resourceId) {
    return this.http.post(`${this.base}/projects/${projectId}/members/${resourceId}`, {});
  }
  removeProjectMember(projectId, resourceId) {
    return this.http.delete(`${this.base}/projects/${projectId}/members/${resourceId}`);
  }
  static {
    this.\u0275fac = function ApiService_Factory(t) {
      return new (t || _ApiService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApiService, factory: _ApiService.\u0275fac, providedIn: "root" });
  }
};

export {
  ApiService
};
//# sourceMappingURL=chunk-DUR3BCI7.js.map
