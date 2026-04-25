import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Software Products & Digital Platforms in Zimbabwe",
  description:
    "Discover iThink Systems software products and digital platforms for healthcare, education, finance, retail, operations, and managed support in Zimbabwe.",
  alternates: {
    canonical: absoluteUrl("/products"),
  },
};
