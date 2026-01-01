import { tickets } from "@/content/portal/tickets";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare } from "lucide-react";
import { auth } from "@/lib/auth";

const statusColors = {
  open: "bg-blue-100 text-blue-700",
  "in-progress": "bg-orange-100 text-orange-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-700",
};

const priorityColors = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-orange-100 text-orange-700",
};

export default async function TicketsPage() {
  const session = await auth();
  const clientId = session?.user?.clientId;

  const clientTickets = tickets.filter((t) => t.clientId === clientId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Support Tickets</h2>
          <p className="text-muted-foreground mt-1">
            View and manage your support requests.
          </p>
        </div>
        <Button disabled>
          <Plus className="h-4 w-4 mr-2" />
          New Ticket
        </Button>
      </div>

      {clientTickets.length > 0 ? (
        <div className="bg-card rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Ticket
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {clientTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {ticket.subject}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {ticket.id}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-medium capitalize",
                          statusColors[ticket.status]
                        )}
                      >
                        {ticket.status.replace("-", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-medium capitalize",
                          priorityColors[ticket.priority]
                        )}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {ticket.createdAt}
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
            <MessageSquare className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">No tickets yet</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Create a support ticket to get help from our team.
          </p>
          <Button disabled>
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
        </div>
      )}
    </div>
  );
}
