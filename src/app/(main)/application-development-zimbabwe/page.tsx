import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { absoluteUrl, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: 'Application Development in Zimbabwe | Web Applications & Portals | iThink Systems',
  description:
    'iThink Systems provides application development in Zimbabwe, building web apps, portals, workflow tools, and digital business systems for healthcare, education, and enterprise operations.',
  alternates: {
    canonical: absoluteUrl('/application-development-zimbabwe'),
  },
};

const items = ['Web application development', 'Customer and internal portals', 'Workflow and process automation tools', 'Operational dashboards and reporting', 'Integration with business systems', 'Support, iteration, and scaling'];
const relatedProjects = [{ title: 'CALM Health — Medical Aid Insurance System', href: '/case-studies/calm-health', desc: 'Application-level system design for health insurance workflows and operational controls.' }, { title: 'Eduloan — Custom ERP on Frappe', href: '/case-studies/eduloan-erp', desc: 'Business application development spanning multiple operational domains.' }, { title: 'Neomed Pharmaceuticals — Accounting System', href: '/case-studies/neomed-accounting', desc: 'Application-backed financial workflow improvement for pharmaceutical operations.' }];
const faqItems = [{ q: 'Can you build a custom application for our company?', a: 'Yes. We can build a custom web application based on your users, workflows, approvals, and reporting needs.' }, { q: 'Do you only build websites?', a: 'No. We build websites, applications, full systems, and integrated business platforms depending on the problem to be solved.' }, { q: 'Can the application be hosted and maintained?', a: 'Yes. We can support hosting, deployment, and post-launch maintenance depending on the engagement model.' }];

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
            Application Development in Zimbabwe
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            If you need an application built for customers, staff, operations, or management, we can help design and deliver a web-based solution that fits your workflow and long-term goals.
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
