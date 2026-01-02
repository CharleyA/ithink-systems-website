"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Receipt, RefreshCw, CheckCircle, XCircle, Loader2 } from "lucide-react";

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
}

interface InvoiceStats {
  totalInvoices: number;
  totalOutstanding: number;
  totalPaid: number;
  overdueCount: number;
}

interface ConnectionStatus {
  connected: boolean;
  user?: string;
  error?: string;
}

const statusColors: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
  Unpaid: "bg-yellow-100 text-yellow-700",
  Overdue: "bg-red-100 text-red-700",
  "Partly Paid": "bg-orange-100 text-orange-700",
  Cancelled: "bg-gray-100 text-gray-700",
};

interface AdminBillingClientProps {
  isAdmin: boolean;
}

export default function AdminBillingClient({ isAdmin }: AdminBillingClientProps) {
  const [invoices, setInvoices] = useState<SalesInvoice[]>([]);
  const [stats, setStats] = useState<InvoiceStats | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const [invoicesRes, statsRes, connectionRes] = await Promise.all([
        fetch("/api/erpnext"),
        fetch("/api/erpnext?action=stats"),
        fetch("/api/erpnext?action=test"),
      ]);

      if (invoicesRes.ok) {
        const data = await invoicesRes.json();
        setInvoices(data.data || []);
      }

      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data);
      }

      if (connectionRes.ok) {
        const data = await connectionRes.json();
        setConnectionStatus(data);
      }
    } catch (error) {
      console.error("Failed to fetch ERPNext data:", error);
      setConnectionStatus({ connected: false, error: "Failed to connect" });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Billing</h2>
          <p className="text-muted-foreground mt-1">Loading ERPNext data...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Billing</h2>
          <p className="text-muted-foreground mt-1">
            {isAdmin ? "Manage all invoices from ERPNext." : "View your invoices and payment history."}
          </p>
        </div>
        {isAdmin && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              {connectionStatus?.connected ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">ERPNext Connected</span>
                  <span className="text-muted-foreground">({connectionStatus.user})</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span className="text-red-600">ERPNext Disconnected</span>
                </>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={cn("h-4 w-4 mr-2", refreshing && "animate-spin")} />
              Refresh
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card rounded-xl border p-6">
          <p className="text-sm text-muted-foreground">Total Invoices</p>
          <p className="text-3xl font-bold text-foreground mt-1">
            {stats?.totalInvoices || invoices.length}
          </p>
        </div>
        <div className="bg-card rounded-xl border p-6">
          <p className="text-sm text-muted-foreground">Outstanding Balance</p>
          <p className="text-3xl font-bold text-foreground mt-1">
            ${(stats?.totalOutstanding || 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-card rounded-xl border p-6">
          <p className="text-sm text-muted-foreground">Total Paid</p>
          <p className="text-3xl font-bold text-green-600 mt-1">
            ${(stats?.totalPaid || 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-card rounded-xl border p-6">
          <p className="text-sm text-muted-foreground">Overdue</p>
          <p className="text-3xl font-bold text-red-600 mt-1">
            {stats?.overdueCount || 0}
          </p>
        </div>
      </div>

      {invoices.length > 0 ? (
        <div className="bg-card rounded-xl border overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="font-semibold text-foreground">Invoice History from ERPNext</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Invoice ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Outstanding
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {invoices.map((invoice) => (
                  <tr key={invoice.name} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">{invoice.name}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {invoice.customer_name || invoice.customer}
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">
                      {invoice.currency} {invoice.grand_total?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">
                      {invoice.currency} {invoice.outstanding_amount?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-medium",
                          statusColors[invoice.status] || "bg-gray-100 text-gray-700"
                        )}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {invoice.due_date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-xl border p-12 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <Receipt className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">No invoices found</h3>
          <p className="text-muted-foreground text-sm">
            {connectionStatus?.connected
              ? "No invoices found in ERPNext."
              : "Unable to connect to ERPNext. Please check your configuration."}
          </p>
        </div>
      )}
    </div>
  );
}
