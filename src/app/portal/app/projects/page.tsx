import { projects } from "@/content/portal/projects";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { auth } from "@/lib/auth";

const statusColors = {
  active: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  "on-hold": "bg-yellow-100 text-yellow-700",
};

export default async function ProjectsPage() {
  const session = await auth();
  const clientId = session?.user?.clientId;

  const clientProjects = projects.filter((p) => p.clientId === clientId);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Projects</h2>
        <p className="text-muted-foreground mt-1">
          Track the progress of all your active and completed projects.
        </p>
      </div>

      {clientProjects.length > 0 ? (
        <div className="grid gap-4">
          {clientProjects.map((project) => (
            <div
              key={project.id}
              className="bg-card rounded-xl border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground text-lg">
                      {project.name}
                    </h3>
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
                        statusColors[project.status]
                      )}
                    >
                      {project.status.replace("-", " ")}
                    </span>
                  </div>
                </div>
                <div className="sm:w-32 sm:text-right">
                  <p className="text-2xl font-bold text-foreground">
                    {project.progress}%
                  </p>
                  <p className="text-xs text-muted-foreground">Complete</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl border p-12 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <Calendar className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">No projects yet</h3>
          <p className="text-muted-foreground text-sm">
            Projects will appear here once they are assigned to your account.
          </p>
        </div>
      )}
    </div>
  );
}
