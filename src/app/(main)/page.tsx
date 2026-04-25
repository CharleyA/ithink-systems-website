import type { Metadata } from "next";
import { getSiteVariant } from "@/lib/site-variant";
import DemoHub from "@/components/DemoHub";
import { ProductsHub } from "@/components/ProductsHub";
import { CorporateHome } from "@/components/CorporateHome";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Healthcare IT, ERPNext & Custom Software in Zimbabwe",
  description:
    "Bulawayo-based iThink Systems delivers healthcare IT solutions, ERPNext implementation, education platforms, AI integration, and custom software development in Zimbabwe.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

export default async function Page() {
  const variant = await getSiteVariant();

  if (variant === "demo") {
    return <DemoHub />;
  }

  if (variant === "products") {
    return <ProductsHub />;
  }

  return <CorporateHome />;
}
