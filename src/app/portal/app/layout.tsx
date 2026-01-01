"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FolderKanban,
  HeadphonesIcon,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const sidebarItems = [
  { name: "Dashboard", href: "/portal/app", icon: LayoutDashboard },
  { name: "Projects", href: "/portal/app/projects", icon: FolderKanban },
  { name: "Tickets", href: "/portal/app/tickets", icon: HeadphonesIcon },
  { name: "Docs", href: "/portal/app/docs", icon: FileText },
  { name: "Billing", href: "/portal/app/billing", icon: CreditCard },
  { name: "Settings", href: "/portal/app/settings", icon: Settings },
];

export default function PortalAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/portal/login" });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg border shadow-sm"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <Link href="/portal/app" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">iT</span>
              </div>
              <span className="font-semibold text-foreground">Client Portal</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {sidebarItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/portal/app" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-md border-b">
          <div className="flex items-center justify-between h-16 px-6 lg:px-8">
            <h1 className="text-lg font-semibold text-foreground pl-12 lg:pl-0">
              {sidebarItems.find((item) =>
                pathname === item.href ||
                (item.href !== "/portal/app" && pathname.startsWith(item.href))
              )?.name || "Dashboard"}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {session?.user?.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
