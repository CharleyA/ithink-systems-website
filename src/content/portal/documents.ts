import { Document } from "./types";

export const documents: Document[] = [
  {
    id: "doc-001",
    name: "Service Agreement 2024",
    type: "pdf",
    size: "2.4 MB",
    clientId: "demo-client",
    uploadedAt: "2024-01-05",
  },
  {
    id: "doc-002",
    name: "Project Proposal - Mobile App",
    type: "pdf",
    size: "1.8 MB",
    clientId: "demo-client",
    projectId: "proj-003",
    uploadedAt: "2024-02-20",
  },
  {
    id: "doc-003",
    name: "Q1 Progress Report",
    type: "pdf",
    size: "3.1 MB",
    clientId: "demo-client",
    projectId: "proj-001",
    uploadedAt: "2024-03-31",
  },
  {
    id: "doc-004",
    name: "Technical Specifications",
    type: "doc",
    size: "856 KB",
    clientId: "other-client",
    uploadedAt: "2024-01-15",
  },
];
