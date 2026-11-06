import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FDEEE8]/60 px-4">
      <Suspense>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
