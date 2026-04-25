import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { absoluteUrl, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: 'Hosting Services in Zimbabwe | Deployment & Cloud Support | iThink Systems',
  description:
    'iThink Systems supports hosting services in Zimbabwe through deployment guidance, cloud setup, server configuration, and technical support for websites, applications, and business systems.',
  alternates: {
    canonical: absoluteUrl('/hosting-services-zimbabwe'),
  },
};

const items = ['Deployment planning and go-live support', 'Cloud hosting guidance', 'Server and environment setup', 'Production support for websites and applications', 'Performance and reliability considerations', 'Ongoing technical support options'];
const relatedProjects = [{ title: 'Golden 60 — Website Development', href: '/case-studies/golden-60-website', desc: 'Website delivery that also depends on clean production deployment.' }, { title: 'United College of Education — Website Development', href: '/case-studies/uce-website', desc: 'Institutional web delivery with practical deployment needs.' }, { title: 'ERPNext Implementation — Mpilo Central Hospital', href: '/case-studies/erpnext-mpilo', desc: 'Operational systems that require dependable deployment and support.' }];
const faqItems = [{ q: 'Do you provide hosting directly or support hosting setup?', a: 'We primarily support hosting setup, deployment, cloud guidance, and technical operations depending on the project and environment.' }, { q: 'Can you deploy both websites and business systems?', a: 'Yes. We can support deployment for websites, portals, applications, and larger operational systems.' }, { q: 'Do you offer post-launch support?', a: 'Yes. We can continue supporting production environments after launch depending on the support model agreed.' }];

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
            Hosting Services and Deployment Support in Zimbabwe
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A good system still needs stable deployment. We help clients plan and support hosting, cloud environments, server setup, go-live preparation, and post-launch support for websites, applications, and operational systems.
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
