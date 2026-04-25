import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { absoluteUrl, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: 'System Development in Zimbabwe | Business & Operational Systems | iThink Systems',
  description:
    'iThink Systems delivers system development in Zimbabwe for ERP, finance, healthcare, education, and internal operations, building digital systems that support real business processes.',
  alternates: {
    canonical: absoluteUrl('/system-development-zimbabwe'),
  },
};

const items = ['Operational systems for institutions and businesses', 'ERP and finance workflow development', 'Healthcare and education platforms', 'Approval, reporting, and control systems', 'Cloud-enabled deployment options', 'Training and implementation support'];
const relatedProjects = [{ title: 'ERPNext Implementation — Mpilo Central Hospital', href: '/case-studies/erpnext-mpilo', desc: 'Institutional systems work covering procurement, inventory, finance, and HR.' }, { title: 'Eduloan — Custom ERP on Frappe', href: '/case-studies/eduloan-erp', desc: 'Custom system development supporting lending, payroll, assets, and projects.' }, { title: 'CALM Health — Medical Aid Insurance System', href: '/case-studies/calm-health', desc: 'Purpose-built system design for regulated operational workflows.' }];
const faqItems = [{ q: 'What is the difference between a website, an application, and a system?', a: 'A website mainly presents information, an application supports user interaction and tasks, and a system usually coordinates broader business workflows, data, controls, and reporting.' }, { q: 'Can you help us decide what kind of platform we need?', a: 'Yes. We can assess whether you need a website, an application, a portal, or a larger internal system before development starts.' }, { q: 'Do you also support implementation and user training?', a: 'Yes. We can support rollout, training, and practical adoption after development.' }];

export default function Page() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }}
        />
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            System Development in Zimbabwe
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We develop practical digital systems for organisations that need stronger workflow control, data visibility, automation, and operational reliability. That includes internal systems, ERP workflows, portals, and sector-specific platforms.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {items.map((item) => (
            <div key={item} className="rounded-2xl border bg-card p-6 shadow-sm">
              <p className="font-semibold text-foreground">{item}</p>
            </div>
          ))}
        </div>

        <section className="mt-20">
          <h2 className="text-3xl font-bold text-foreground">Relevant projects and case studies</h2>
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
          <h2 className="text-2xl font-bold text-foreground">Want to discuss your project?</h2>
          <p className="mt-4 text-muted-foreground">
            If you need a website, application, internal system, ERP workflow, or hosting support, we can scope the right next step with you.
          </p>
          <div className="mt-6 flex gap-4">
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/case-studies">See More Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
