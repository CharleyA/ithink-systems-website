import { headers } from "next/headers";

export type SiteVariant = "corporate" | "products" | "demo";

export async function getSiteVariant(): Promise<SiteVariant> {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  if (host.includes("demo.ithinksys.co.zw")) return "demo";
  if (host.includes("products.ithinksys.co.zw")) return "products";
  
  return "corporate";
}
