import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About iThink Systems | IT Company in Bulawayo, Zimbabwe",
  description:
    "Learn about iThink Systems, a Bulawayo-based technology company delivering software, ERP, healthcare, and education solutions in Zimbabwe.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
};
