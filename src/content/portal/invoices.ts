import { Invoice } from "./types";

export const invoices: Invoice[] = [
  {
    id: "inv-001",
    amount: 15000,
    status: "paid",
    dueDate: "2024-02-15",
    clientId: "demo-client",
  },
  {
    id: "inv-002",
    amount: 12500,
    status: "unpaid",
    dueDate: "2024-04-01",
    clientId: "demo-client",
  },
  {
    id: "inv-003",
    amount: 5000,
    status: "overdue",
    dueDate: "2024-03-01",
    clientId: "demo-client",
  },
  {
    id: "inv-004",
    amount: 3000,
    status: "paid",
    dueDate: "2024-01-20",
    clientId: "other-client",
  },
];
