import { invoices } from "@/content/portal/invoices";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Receipt, Download, ExternalLink } from "lucide-react";
import { auth } from "@/lib/auth";

const statusColors = {
  paid: "bg-green-100 text-green-700",
  unpaid: "bg-yellow-100 text-yellow-700",
  overdue: "bg-red-100 text-red-700",
};

export default async function BillingPage() {
  const session = await auth();
  const clientId = session?.user?.clientId;

  const clientInvoices = invoices.filter((i) => i.clientId === clientId);

  const totalPending = clientInvoices
    .filter((i) => i.status === "unpaid" || i.status === "overdue")
    .reduce((sum, i) => sum + i.amount, 0);

  const totalPaid = clientInvoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Billing</h2>
        <p className="text-muted-foreground mt-1">
          View your invoices and payment history.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card rounded-xl border p-6">
          <p className="text-sm text-muted-foreground">Outstanding Balance</p>
          <p className="text-3xl font-bold text-foreground mt-1">
            ${totalPending.toLocaleString()}
          </p>
        </div>
        <div className="bg-card rounded-xl border p-6">
          <p className="text-sm text-muted-foreground">Total Paid</p>
          <p className="text-3xl font-bold text-green-600 mt-1">
            ${totalPaid.toLocaleString()}
          </p>
        </div>
        <div className="bg-card rounded-xl border p-6">
          <p className="text-sm text-muted-foreground">Total Invoices</p>
          <p className="text-3xl font-bold text-foreground mt-1">
            {clientInvoices.length}
          </p>
        </div>
      </div>

      {clientInvoices.length > 0 ? (
        <div className="bg-card rounded-xl border overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="font-semibold text-foreground">Invoice History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Invoice ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {clientInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">
                        {invoice.id}
                      </p>
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">
                      ${invoice.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-medium capitalize",
                          statusColors[invoice.status]
                        )}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {invoice.dueDate}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" disabled>
                          <Download className="h-4 w-4" />
                        </Button>
                        {invoice.status !== "paid" && (
                          <Button variant="ghost" size="sm" disabled>
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
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
          <h3 className="font-semibold text-foreground mb-2">No invoices yet</h3>
          <p className="text-muted-foreground text-sm">
            Invoices will appear here once they are generated for your account.
          </p>
        </div>
      )}
    </div>
  );
}
