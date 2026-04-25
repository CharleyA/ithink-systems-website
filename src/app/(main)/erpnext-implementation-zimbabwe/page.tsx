import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { absoluteUrl, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "ERPNext Implementation in Zimbabwe | ERP & ERPNext Partner | iThink Systems",
  description:
    "iThink Systems provides ERPNext implementation and ERP system development in Zimbabwe for healthcare, education, distribution, and institutional operations, covering finance, procurement, HR, stock control, and workflow automation.",
  alternates: {
    canonical: absoluteUrl("/erpnext-implementation-zimbabwe"),
  },
  keywords: [
    "ERPNext Zimbabwe",
    "ERPNext implementation Zimbabwe",
    "ERP implementation Zimbabwe",
    "ERP software Zimbabwe",
  ],
};

const faqItems = [
  {
    q: "Do you implement ERPNext in Zimbabwe?",
    a: "Yes. We support ERPNext implementation in Zimbabwe across procurement, inventory, accounting, HR, payroll, and broader operational workflows.",
  },
  {
    q: "Can you build a custom ERP system as well as implement ERPNext?",
    a: "Yes. Depending on the use case, we can implement ERPNext, extend ERPNext with custom modules, or build a custom ERP or internal business system where needed.",
  },
  {
    q: "Do you handle migration, training, and support?",
    a: "Yes. We can help with requirements mapping, process redesign, configuration, migration planning, rollout, user training, and ongoing support.",
  },
  {
    q: "Can we review ERP-related projects you have delivered?",
    a: "Yes. We have case studies across ERP implementation, accounting systems, and custom business systems, including work for Mpilo Central Hospital, Eduloan, and Neomed Pharmaceuticals.",
  },
];

const relatedProjects = [
  {
    title: "ERPNext Implementation — Mpilo Central Hospital",
    href: "/case-studies/erpnext-mpilo",
    desc: "Procurement, inventory, accounting, and HR system implementation for a major healthcare institution.",
  },
  {
    title: "Eduloan — Custom ERP on Frappe",
    href: "/case-studies/eduloan-erp",
    desc: "Integrated ERP covering accounting, HR, payroll, loans, assets, and project workflows.",
  },
  {
    title: "Neomed Pharmaceuticals — Accounting System",
    href: "/case-studies/neomed-accounting",
    desc: "Operational finance and accounting systems tailored to real institutional workflow needs.",
  },
];

export default function ErpnextImplementationZimbabwePage() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }}
        />
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            ERPNext Implementation in Zimbabwe
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            iThink Systems helps organizations in Zimbabwe deploy ERPNext and ERP systems for finance, procurement, HR, inventory, projects, and operations. We focus on clean implementation, reliable reporting, and practical adoption across real business environments.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {[
            "ERPNext setup and configuration",
            "Finance and accounting workflows",
            "Procurement and stock management",
            "HR, payroll, and internal controls",
            "Custom modules and integration work",
            "Training, rollout, and post-go-live support",
          ].map((item) => (
            <div key={item} className="rounded-2xl border bg-card p-6 shadow-sm">
              <p className="font-semibold text-foreground">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 space-y-6 text-base leading-8 text-muted-foreground">
          <p>
            ERPNext is a powerful open-source ERP platform, but successful implementation depends on process understanding, disciplined configuration, and support for local operating realities. Our work emphasizes accurate setup, usable workflows, and structured data that supports decision-making.
          </p>
          <p>
            We can support greenfield ERPNext deployments, recovery for struggling implementations, custom module development, integrations, ERP websites and portals, and optimization of existing environments.
          </p>
        </div>

        <section className="mt-20">
          <h2 className="text-3xl font-bold text-foreground">Relevant ERP and business systems case studies</h2>
          <p className="mt-4 text-muted-foreground">
            These projects give a clearer picture of our implementation work across ERP, accounting, and operational systems.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {relatedProjects.map((project) => (
              <Link key={project.href} href={project.href} className="rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-md">
                <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.desc}</p>
                <p className="mt-4 text-sm font-semibold text-primary">View case study →</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold text-foreground">Frequently asked questions</h2>
          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <div key={item.q} className="rounded-2xl border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">{item.q}</h3>
                <p className="mt-3 text-muted-foreground leading-7">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 rounded-3xl bg-muted/50 p-8">
          <h2 className="text-2xl font-bold text-foreground">Looking for ERPNext or ERP implementation support in Zimbabwe?</h2>
          <p className="mt-4 text-muted-foreground">
            Let’s review your workflows and map the right rollout plan for your ERP, internal system, website, portal, or operational platform.
          </p>
          <div className="mt-6 flex gap-4">
            <Button asChild>
              <Link href="/contact">Talk to Us</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/case-studies">See More Projects</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
