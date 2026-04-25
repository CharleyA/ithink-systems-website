import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { absoluteUrl, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: 'Website Development in Zimbabwe | Corporate & Institutional Websites | iThink Systems',
  description:
    'iThink Systems provides website development in Zimbabwe, delivering corporate, institutional, and organisation websites built for credibility, usability, and long-term growth.',
  alternates: {
    canonical: absoluteUrl('/website-development-zimbabwe'),
  },
};

const items = ['Corporate websites', 'Institutional and organisation websites', 'Responsive mobile-first design', 'Clear service and brand presentation', 'Scalable modern web architecture', 'Deployment and long-term support'];
const relatedProjects = [{ title: 'United College of Education — Website Development', href: '/case-studies/uce-website', desc: 'Institutional website delivery supporting communication and academic visibility.' }, { title: 'Golden 60 — Website Development', href: '/case-studies/golden-60-website', desc: 'Modern corporate website for stronger brand visibility and professional presentation.' }, { title: 'Dementia Association of Zimbabwe — Website Development', href: '/case-studies/dementia-association-website', desc: 'Organisation website built to strengthen awareness, engagement, and credibility.' }];
const faqItems = [{ q: 'Can you build both simple websites and larger institutional websites?', a: 'Yes. We can deliver lean corporate websites, more content-heavy institutional sites, and website-plus-system combinations depending on the project.' }, { q: 'Do you help with hosting and launch?', a: 'Yes. We can support deployment, cloud hosting guidance, domain setup, and go-live planning.' }, { q: 'Can we see examples first?', a: 'Yes. We now have website-related case studies on the site so prospective clients can review the work before reaching out.' }];

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
            Website Development in Zimbabwe
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We build professional websites for companies, institutions, healthcare organisations, and education stakeholders that need a credible digital presence, clear communication, and room to grow.
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
