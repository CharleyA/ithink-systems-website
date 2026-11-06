import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.isAdmin) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#FDEEE8]/50">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[220px_1fr]">
        <AdminNav />
        <div>
          <p className="mb-4 text-sm text-[#5F5F5F]">Signed in as {session.user.email}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
