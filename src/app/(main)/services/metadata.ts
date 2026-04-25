import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Custom Software Development, ERP & IT Services in Zimbabwe",
  description:
    "iThink Systems provides custom software development, ERP integration, IT consulting, and managed technology services in Zimbabwe for healthcare, education, and enterprise operations.",
  alternates: {
    canonical: absoluteUrl("/services"),
  },
};
