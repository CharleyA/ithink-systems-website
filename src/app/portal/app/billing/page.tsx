import { auth } from "@/lib/auth";
import AdminBillingClient from "./AdminBillingClient";

export default async function BillingPage() {
  const session = await auth();
  const isAdmin = session?.user?.isAdmin || false;

  return <AdminBillingClient isAdmin={isAdmin} />;
}
