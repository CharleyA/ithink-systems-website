import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Healthcare IT, Education Platforms & ERP Solutions in Zimbabwe",
  description:
    "Explore iThink Systems solutions for healthcare, education, ERPNext, AI integration, SaaS, and IT infrastructure in Zimbabwe.",
  alternates: {
    canonical: absoluteUrl("/solutions"),
  },
};
