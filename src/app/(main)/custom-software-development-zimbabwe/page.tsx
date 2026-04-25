import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { absoluteUrl, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: 'Custom Software Development in Zimbabwe | iThink Systems',
  description:
    'iThink Systems provides custom software development in Zimbabwe, building business applications, operational systems, portals, and digital platforms for institutions and growing companies.',
  alternates: {
    canonical: absoluteUrl('/custom-software-development-zimbabwe'),
  },
};

const items = ['Custom business applications', 'Operational and workflow systems', 'Client and staff portals', 'ERP extensions and business integrations', 'Reporting and data management tools', 'Deployment, support, and iterative improvement'];
const relatedProjects = [{ title: 'Eduloan — Custom ERP on Frappe', href: '/case-studies/eduloan-erp', desc: 'Custom operational system development across finance, HR, payroll, loans, and projects.' }, { title: 'CALM Health — Medical Aid Insurance System', href: '/case-studies/calm-health', desc: 'Custom digital system architecture for claims, providers, and eligibility workflows.' }, { title: 'ERPNext Implementation — Mpilo Central Hospital', href: '/case-studies/erpnext-mpilo', desc: 'Large-scale operational systems delivery for a major healthcare institution.' }];
const faqItems = [{ q: 'Can you build a fully custom system instead of using templates?', a: 'Yes. We can design and build a system around your workflow, data model, approvals, reporting, and integrations.' }, { q: 'What kinds of software do you build?', a: 'We build internal systems, websites, client portals, operational platforms, ERP extensions, and workflow-based business applications.' }, { q: 'Do you support post-launch improvements?', a: 'Yes. We can continue refining, extending, and supporting the software after launch.' }];

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
            Custom Software Development in Zimbabwe
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            iThink Systems designs and builds custom software for organizations that need more than off-the-shelf tools. We create practical business applications, internal systems, portals, and digital platforms aligned to real operational needs in Zimbabwe.
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
