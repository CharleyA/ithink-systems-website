import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { absoluteUrl, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "IT Company in Bulawayo | Software, ERP & Digital Systems | iThink Systems",
  description:
    "iThink Systems is an IT company in Bulawayo delivering software development, ERP implementation, healthcare systems, education platforms, AI integration, and cloud-enabled business solutions in Zimbabwe.",
  alternates: {
    canonical: absoluteUrl("/it-company-bulawayo"),
  },
  keywords: [
    "IT company in Bulawayo",
    "software company Bulawayo",
    "technology company Bulawayo",
    "application development Zimbabwe",
    "website development Zimbabwe",
  ],
};

const faqItems = [
  {
    q: "Can you build an application, website, or full business system?",
    a: "Yes. We build websites, web applications, custom internal systems, ERP workflows, client portals, and operational tools depending on the business need.",
  },
  {
    q: "Do you only work with large institutions?",
    a: "No. We work across institutions, growing businesses, and organisations that need reliable websites, applications, ERP platforms, or custom systems.",
  },
  {
    q: "Do you help with hosting and deployment?",
    a: "Yes. We can advise on or manage cloud hosting, production deployment, server setup, and post-launch support depending on project scope.",
  },
  {
    q: "Can we see examples of your work before starting?",
    a: "Yes. Our case studies include websites, ERP implementations, accounting systems, healthcare systems, and custom business applications delivered in Zimbabwe.",
  },
];

const relatedProjects = [
  {
    title: "United College of Education — Website Development",
    href: "/case-studies/uce-website",
    desc: "Institutional website delivery for academic visibility and communication.",
  },
  {
    title: "Golden 60 — Website Development",
    href: "/case-studies/golden-60-website",
    desc: "Corporate website design and development for stronger digital presence.",
  },
  {
    title: "Eduloan — Custom ERP on Frappe",
    href: "/case-studies/eduloan-erp",
    desc: "Custom business system development for finance and operational workflows.",
  },
];

export default function ItCompanyBulawayoPage() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }}
        />
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            IT Company in Bulawayo
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            iThink Systems is a Bulawayo-based technology company building practical digital systems for healthcare, education, finance, operations, and customer support. We work with organizations that need reliable websites, applications, hosting, and internal systems — not just attractive demos.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {[
            "Custom software development",
            "Website design and development",
            "ERP and operations systems",
            "Healthcare and education platforms",
            "AI integration and automation",
            "Cloud hosting and infrastructure support",
          ].map((item) => (
            <div key={item} className="rounded-2xl border bg-card p-6 shadow-sm">
              <p className="font-semibold text-foreground">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 space-y-6 text-base leading-8 text-muted-foreground">
          <p>
            Being based in Bulawayo matters to how we work. We understand the local business environment, the realities of infrastructure and deployment, and the importance of building systems that continue to perform under practical constraints.
          </p>
          <p>
            If you are looking for an IT company in Bulawayo that can support websites, application development, ERP implementation, cloud hosting, digital transformation, and ongoing technical support, iThink Systems is positioned to help.
          </p>
        </div>

        <section className="mt-20">
          <h2 className="text-3xl font-bold text-foreground">Relevant websites, systems, and application projects</h2>
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
          <h2 className="text-2xl font-bold text-foreground">Need a Bulawayo-based technology partner?</h2>
          <p className="mt-4 text-muted-foreground">
            Contact us to discuss your website, application, ERP, healthcare, education, hosting, or digital operations project.
          </p>
          <div className="mt-6 flex gap-4">
            <Button asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/case-studies">See Our Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
