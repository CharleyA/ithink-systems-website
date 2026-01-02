const ERPNEXT_URL = process.env.ERPNEXT_URL;
const ERPNEXT_API_KEY = process.env.ERPNEXT_API_KEY;
const ERPNEXT_API_SECRET = process.env.ERPNEXT_API_SECRET;

interface ERPNextResponse<T> {
  data: T;
  message?: string;
}

interface SalesInvoice {
  name: string;
  customer: string;
  customer_name: string;
  posting_date: string;
  due_date: string;
  grand_total: number;
  outstanding_amount: number;
  status: string;
  currency: string;
  items?: SalesInvoiceItem[];
}

interface SalesInvoiceItem {
  item_code: string;
  item_name: string;
  qty: number;
  rate: number;
  amount: number;
}

interface ERPNextListResponse {
  data: { name: string }[];
}

async function erpnextFetch<T>(endpoint: string): Promise<T> {
  if (!ERPNEXT_URL || !ERPNEXT_API_KEY || !ERPNEXT_API_SECRET) {
    throw new Error("ERPNext credentials not configured");
  }

  const url = `${ERPNEXT_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${ERPNEXT_API_KEY}:${ERPNEXT_API_SECRET}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`ERPNext API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function testConnection(): Promise<{ connected: boolean; user?: string; error?: string }> {
  try {
    const result = await erpnextFetch<{ message: string }>("/api/method/frappe.auth.get_logged_user");
    return { connected: true, user: result.message };
  } catch (error) {
    return { connected: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function getSalesInvoices(limit = 20): Promise<SalesInvoice[]> {
  const fields = JSON.stringify([
    "name",
    "customer",
    "customer_name", 
    "posting_date",
    "due_date",
    "grand_total",
    "outstanding_amount",
    "status",
    "currency"
  ]);
  
  const result = await erpnextFetch<{ data: SalesInvoice[] }>(
    `/api/resource/Sales%20Invoice?fields=${encodeURIComponent(fields)}&limit_page_length=${limit}&order_by=posting_date%20desc`
  );
  
  return result.data;
}

export async function getSalesInvoice(name: string): Promise<SalesInvoice> {
  const result = await erpnextFetch<ERPNextResponse<SalesInvoice>>(
    `/api/resource/Sales%20Invoice/${encodeURIComponent(name)}`
  );
  
  return result.data;
}

export async function getInvoiceStats(): Promise<{
  totalInvoices: number;
  totalOutstanding: number;
  totalPaid: number;
  overdueCount: number;
}> {
  const invoices = await getSalesInvoices(100);
  
  const totalInvoices = invoices.length;
  const totalOutstanding = invoices.reduce((sum, inv) => sum + (inv.outstanding_amount || 0), 0);
  const totalPaid = invoices
    .filter(inv => inv.status === "Paid")
    .reduce((sum, inv) => sum + inv.grand_total, 0);
  const overdueCount = invoices.filter(inv => inv.status === "Overdue").length;
  
  return { totalInvoices, totalOutstanding, totalPaid, overdueCount };
}

export type { SalesInvoice, SalesInvoiceItem };
