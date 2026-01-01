import { Ticket } from "./types";

export const tickets: Ticket[] = [
  {
    id: "TKT-001",
    subject: "Unable to access inventory module",
    status: "in-progress",
    priority: "high",
    clientId: "demo-client",
    projectId: "proj-001",
    createdAt: "2024-03-10",
  },
  {
    id: "TKT-002",
    subject: "Report generation taking too long",
    status: "open",
    priority: "medium",
    clientId: "demo-client",
    projectId: "proj-001",
    createdAt: "2024-03-15",
  },
  {
    id: "TKT-003",
    subject: "Request for additional user licenses",
    status: "resolved",
    priority: "low",
    clientId: "demo-client",
    createdAt: "2024-03-01",
  },
  {
    id: "TKT-004",
    subject: "Database connection timeout",
    status: "open",
    priority: "high",
    clientId: "other-client",
    createdAt: "2024-03-20",
  },
];
