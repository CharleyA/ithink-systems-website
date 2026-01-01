import { Project } from "./types";

export const projects: Project[] = [
  {
    id: "proj-001",
    name: "ERPNext Implementation",
    status: "active",
    progress: 65,
    clientId: "demo-client",
  },
  {
    id: "proj-002",
    name: "Website Redesign",
    status: "completed",
    progress: 100,
    clientId: "demo-client",
  },
  {
    id: "proj-003",
    name: "Mobile App Development",
    status: "on-hold",
    progress: 10,
    clientId: "other-client",
  },
];
