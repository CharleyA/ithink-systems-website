export type UserRole = "Client" | "Staff" | "Admin";

export interface Project {
  id: string;
  name: string;
  status: "active" | "completed" | "on-hold";
  progress: number;
  clientId: string;
}

export interface Ticket {
  id: string;
  subject: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  clientId: string;
  projectId?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  clientId: string;
  projectId?: string;
}

export interface Invoice {
  id: string;
  amount: number;
  status: "paid" | "unpaid" | "overdue";
  dueDate: string;
  clientId: string;
}
