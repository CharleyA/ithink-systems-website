import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { absoluteUrl, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Healthcare IT Solutions in Zimbabwe | Hospital & Clinic Software | iThink Systems",
  description:
    "iThink Systems delivers healthcare IT solutions in Zimbabwe, including hospital management systems, patient records, pharmacy workflows, laboratory systems, and digital transformation support for healthcare institutions.",
  alternates: {
    canonical: absoluteUrl("/healthcare-it-solutions-zimbabwe"),
  },
  keywords: [
    "healthcare IT solutions Zimbabwe",
    "hospital management software Zimbabwe",
    "clinic software Zimbabwe",
    "electronic health records Zimbabwe",
  ],
};

const faqItems = [
  {
    q: "What healthcare IT solutions do you provide in Zimbabwe?",
    a: "We support hospitals, clinics, laboratories, and medical aid institutions with digital systems covering patient administration, operations, procurement, finance, inventory, and workflow modernization.",
  },
  {
    q: "Can you build a custom healthcare application or system?",
    a: "Yes. We can design and build custom healthcare software, web applications, portals, and internal operational systems depending on the organisation’s workflow and reporting needs.",
  },
  {
    q: "Do you provide implementation, hosting, and support?",
    a: "Yes. We can support solution design, deployment, cloud hosting guidance, rollout, training, and ongoing technical support depending on project scope.",
  },
  {
    q: "Can we see healthcare-related work you have done?",
    a: "Yes. We have relevant healthcare and health-adjacent case studies including Mpilo Central Hospital, CALM Health, and other digital systems delivered for Zimbabwean institutions.",
  },
];

const relatedProjects = [
  {
    title: "ERPNext Implementation — Mpilo Central Hospital",
    href: "/case-studies/erpnext-mpilo",
    desc: "Hospital procurement, inventory control, accounting, and HR workflows for a major public referral hospital.",
  },
  {
    title: "CALM Health — Medical Aid Insurance System",
    href: "/case-studies/calm-health",
    desc: "Medical aid and claims workflow digitization using modern open-source technologies.",
  },
  {
    title: "Dementia Association of Zimbabwe — Website Development",
    href: "/case-studies/dementia-association-website",
    desc: "Professional healthcare-related website delivery to improve visibility, awareness, and engagement.",
  },
];

export default function HealthcareItSolutionsZimbabwePage() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }}
        />
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Healthcare IT Solutions in Zimbabwe
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            iThink Systems helps hospitals, clinics, laboratories, and medical aid institutions in Zimbabwe modernize operations with practical healthcare IT solutions. We design and implement systems that improve patient workflow, strengthen reporting, and support reliable day-to-day service delivery.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {[
            "Hospital management systems",
            "Electronic health records and patient administration",
            "Pharmacy and laboratory workflow support",
            "Procurement, stock, and operational controls",
            "Medical aid and insurance workflow platforms",
            "Training, rollout, and long-term support",
          ].map((item) => (
            <div key={item} className="rounded-2xl border bg-card p-6 shadow-sm">
              <p className="font-semibold text-foreground">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 space-y-6 text-base leading-8 text-muted-foreground">
          <p>
            Our healthcare technology work is shaped by local operating realities in Zimbabwe, including infrastructure constraints, compliance expectations, and the need for systems that remain usable under real-world pressure. That means we focus on operational practicality, clear workflows, and robust system architecture rather than surface-level demos.
          </p>
          <p>
            Whether your organization needs a hospital management platform, patient administration tooling, pharmacy and laboratory integration, a healthcare website, or a custom internal system, we can help scope, implement, and support the right solution.
          </p>
        </div>

        <section className="mt-20">
          <h2 className="text-3xl font-bold text-foreground">Relevant healthcare case studies</h2>
          <p className="mt-4 text-muted-foreground">
            If you want to evaluate our work, start with these healthcare and health-adjacent projects.
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
          <h2 className="text-2xl font-bold text-foreground">Need a healthcare IT partner in Zimbabwe?</h2>
          <p className="mt-4 text-muted-foreground">
            Talk to iThink Systems about your hospital, clinic, insurance, website, application, or health-system digitization project.
          </p>
          <div className="mt-6 flex gap-4">
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/case-studies?industry=Healthcare">Browse Healthcare Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
