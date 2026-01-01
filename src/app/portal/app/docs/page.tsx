import { documents } from "@/content/portal/documents";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  FileSpreadsheet, 
  FileIcon, 
  Download,
  FolderOpen
} from "lucide-react";
import { auth } from "@/lib/auth";

const typeIcons: Record<string, any> = {
  pdf: FileText,
  doc: FileText,
  xlsx: FileSpreadsheet,
  ppt: FileIcon,
  zip: FileIcon,
};

export default async function DocsPage() {
  const session = await auth();
  const clientId = session?.user?.clientId;

  const clientDocuments = documents.filter((d) => d.clientId === clientId);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Documents</h2>
        <p className="text-muted-foreground mt-1">
          Access your contracts, proposals, and project documentation.
        </p>
      </div>

      {clientDocuments.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clientDocuments.map((doc) => {
            const IconComponent = typeIcons[doc.type] || FileIcon;
            return (
              <div
                key={doc.id}
                className="bg-card rounded-xl border p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-muted p-3">
                    <IconComponent className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {doc.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {doc.size} · {doc.type.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {doc.projectId ? "Project File" : "General"}
                  </span>
                  <Button variant="ghost" size="sm" disabled>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Uploaded: {doc.uploadedAt}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-card rounded-xl border p-12 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <FolderOpen className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">No documents yet</h3>
          <p className="text-muted-foreground text-sm">
            Documents shared with your account will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
