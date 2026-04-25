import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact iThink Systems | Bulawayo, Zimbabwe",
  description:
    "Contact iThink Systems in Bulawayo for healthcare IT, ERPNext implementation, custom software development, and digital transformation projects in Zimbabwe.",
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
};
