import Link from "next/link";
import { 
  FolderKanban, 
  HeadphonesIcon, 
  FileText, 
  CreditCard,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { projects } from "@/content/portal/projects";
import { tickets } from "@/content/portal/tickets";
import { documents } from "@/content/portal/documents";
import { invoices } from "@/content/portal/invoices";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();
  const clientId = session?.user?.clientId;

  // Filter data by clientId
  const clientProjects = projects.filter((p) => p.clientId === clientId);
  const clientTickets = tickets.filter((t) => t.clientId === clientId);
  const clientDocuments = documents.filter((d) => d.clientId === clientId);
  const clientInvoices = invoices.filter((i) => i.clientId === clientId);

  const quickStats = [
    {
      name: "Active Projects",
      value: clientProjects.filter((p) => p.status === "In Progress").length.toString(),
      icon: FolderKanban,
      href: "/portal/app/projects",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      name: "Open Tickets",
      value: clientTickets.filter((t) => t.status === "Open" || t.status === "In Progress").length.toString(),
      icon: HeadphonesIcon,
      href: "/portal/app/tickets",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      name: "Documents",
      value: clientDocuments.length.toString(),
      icon: FileText,
      href: "/portal/app/docs",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      name: "Pending Invoices",
      value: clientInvoices.filter((i) => i.status === "Unpaid" || i.status === "Overdue").length.toString(),
      icon: CreditCard,
      href: "/portal/app/billing",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  const activeProjects = clientProjects.filter((p) => p.status === "In Progress");
  const recentTickets = clientTickets.slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welcome back, {session?.user?.name}</h2>
        <p className="text-muted-foreground mt-1">
          Here&apos;s an overview of your account activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-card rounded-xl border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-lg ${stat.bg} p-2.5`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-4 text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.name}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="font-semibold text-foreground">Active Projects</h3>
            <Link
              href="/portal/app/projects"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="divide-y">
            {activeProjects.length > 0 ? (
              activeProjects.map((project) => (
                <div key={project.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">{project.name}</p>
                    <span className="text-xs text-muted-foreground">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                No active projects
              </div>
            )}
          </div>
        </div>

        <div className="bg-card rounded-xl border">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="font-semibold text-foreground">Recent Tickets</h3>
            <Link
              href="/portal/app/tickets"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="divide-y">
            {recentTickets.length > 0 ? (
              recentTickets.map((ticket) => (
                <div key={ticket.id} className="p-4 flex items-start gap-3">
                  <div className="mt-0.5">
                    {ticket.status === "Resolved" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : ticket.status === "In Progress" ? (
                      <Clock className="h-5 w-5 text-orange-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {ticket.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {ticket.id} · {ticket.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                No recent tickets
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
