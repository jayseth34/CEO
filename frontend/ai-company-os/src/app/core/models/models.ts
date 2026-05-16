export interface Project {
  id: string;
  name: string;
  description: string;
  clientName: string;
  status: 'pending' | 'planning' | 'active' | 'paused' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  budget: number;
  deadline: string;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  description?: string;
  status: 'backlog' | 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  agentRole: string;
  sprint: string;
  estimatedHours: number;
  assignedResourceId?: string;
  assignedResourceName?: string;
  assignmentScore: number;
  dueDate?: string;
  createdAt: string;
}

export interface TaskBoard {
  backlog: Task[];
  todo: Task[];
  inProgress: Task[];
  review: Task[];
  done: Task[];
}

export interface Resource {
  id: string;
  name: string;
  email: string;
  role: string;
  agentType: 'ceo' | 'cto' | 'manager' | 'worker';
  skills: string[];
  currentLoad: number;
  maxLoad: number;
  performanceScore: number;
  isAvailable: boolean;
  hourlyRate: number;
  activeTaskCount: number;
}

export interface AgentLog {
  id: string;
  agentRole: string;
  action: string;
  details: string;
  level: 'info' | 'warn' | 'error';
  createdAt: string;
}

export interface AIDecision {
  id: string;
  agentRole: string;
  decisionType: string;
  rationale: string;
  confidenceScore: number;
  isApproved: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalTasks: number;
  completedTasks: number;
  totalResources: number;
  availableResources: number;
  totalBudget: number;
  recentAgentActivity: AgentActivity[];
}

export interface AgentActivity {
  agentRole: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface Requirement {
  id: string;
  projectId: string;
  rawText: string;
  parsedSummary: string;
  status: string;
  tasksGenerated: number;
  createdAt: string;
}

export interface ProjectDocument {
  id: string;
  projectId: string;
  documentType: 'root_plan' | 'requirements' | 'test_cases' | 'change_impact';
  title: string;
  content: string;
  gitSource: string;
  generatedAt: string;
}

export interface ProjectTeamMember {
  resourceId: string;
  resourceName: string;
  role: string;
  activeTasks: number;
}

export interface ResourceWithMembership {
  resourceId: string;
  resourceName: string;
  role: string;
  agentType: string;
  isMember: boolean;
}

export interface TaskCoAssignee {
  taskId: string;
  resourceId: string;
  resourceName: string;
  role: string;
}
