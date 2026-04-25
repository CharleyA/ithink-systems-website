"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Stethoscope, 
  GraduationCap, 
  Cpu, 
  BarChart3, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Banknote,
  LayoutGrid,
  Database,
  Monitor,
  Cloud,
  Server,
  Activity
} from "lucide-react";
import Image from "next/image";

const solutions = [
  {
    title: "Medisure_OS",
    description: "A complete operating system for medical facilities, integrating EHR, pharmacy, and laboratory management.",
    icon: Stethoscope,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    title: "School Payflow",
    description: "Streamlined fee collection and financial management for educational institutions of all sizes.",
    icon: GraduationCap,
    color: "text-orange-600",
    bg: "bg-orange-50"
  },
  {
    title: "ERPNext Implementation",
    description: "Practical business operations management using world-class open-source ERP solutions.",
    icon: BarChart3,
    color: "text-green-600",
    bg: "bg-green-50"
  },
    {
      title: "Custom Automation & Workflow Tools",
      description: "Purpose-built automation and assessment tools designed for specific organizational needs.",
      icon: Cpu,
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ];

const featuredProjects = [
  {
    title: "ERPNext Implementation — Mpilo Central Hospital",
    outcome: "Procurement, inventory control, accounting, and HR systems for a major public referral hospital.",
    tag: "Zimbabwe • Healthcare ERP",
    icon: Stethoscope,
    image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=2071&auto=format&fit=crop"
  },
  {
    title: "MOODLE LMS Deployments — 18+ Institutions",
    outcome: "Installation, customization, training, and support for blended learning environments.",
    tag: "Zimbabwe • Education Technology",
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Neomed Pharmaceuticals — Accounting System",
    outcome: "Implementation and configuration of an enterprise accounting system for pharmaceutical operations.",
    tag: "Zimbabwe • Accounting Systems",
    icon: BarChart3,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Eduloan — Custom ERP on Frappe",
    outcome: "Development of an integrated ERP covering accounting, HR, payroll, loan management, assets, and projects.",
    tag: "Zimbabwe • ERP Development",
    icon: Banknote,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "CALM Health — Medical Aid Insurance System",
    outcome: "Design and development of a medical aid insurance management system using open-source technologies.",
    tag: "Zimbabwe • Health Insurance Systems",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop"
  },
      {
        title: "Website Development — United College of Education",
        outcome: "Design and development of an institutional website to support academic visibility and communication.",
        tag: "Zimbabwe • Web Development",
        icon: Cpu,
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
      },
      {
        title: "Contract-Based IT Infrastructure Deployment",
        outcome: "Project-based provisioning of institutional hardware and licensed software for education and healthcare digital transformation initiatives.",
        tag: "Zimbabwe • IT Infrastructure",
        icon: Monitor,
        image: "https://images.unsplash.com/photo-1573166364524-d9dbfd8bbf83?q=80&w=2070&auto=format&fit=crop"
      }
    ];

  const enablementCapabilities = [
    {
      title: "Enterprise Systems Development & ERP",
      description: "Architecting robust backend systems and custom ERP modules that form the backbone of modern business operations.",
      icon: Database,
      image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Education & Healthcare Platforms",
      description: "Deploying specialized digital environments for patient management, clinical workflows, and academic administration.",
      icon: Activity,
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop"
    },
      {
        title: "IT Infrastructure & End-User Computing",
        description: "As part of our implementation projects, we provision and deploy enterprise-grade hardware, servers, and licensed productivity software—delivered through formal contracts to ensure institutional-scale readiness with professional configuration and handover.",
        icon: Monitor,
        image: "https://images.unsplash.com/photo-1573166364524-d9dbfd8bbf83?q=80&w=2070&auto=format&fit=crop"
      },
    {
      title: "Cloud Hosting & Support Services",
      description: "Provisioning secure, high-availability cloud environments with dedicated technical support for mission-critical apps.",
      icon: Cloud,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070&auto=format&fit=crop"
    },
  ];
  
  const stats = [
  { label: "Institutions Supported", value: "18+" },
  { label: "Registered Since", value: "2021" },
  { label: "Flagship ERPs", value: "2" },
  { label: "SaaS Builds", value: "15+" },
  { label: "Base Location", value: "Bulawayo" },
];

export function CorporateHome() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2 lg:items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
                  <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                    Healthcare IT, ERPNext & Custom Software Built for Zimbabwe
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    From our base in Bulawayo, iThink Systems delivers healthcare IT solutions, ERPNext implementation, education platforms, AI integration, and custom software development tailored to local operational realities in Zimbabwe.
                  </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button size="lg" asChild>
                  <Link href="/solutions">Explore Solutions</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/custom-software-development-zimbabwe">Custom Software</Link>
                </Button>
                <Link href="/about" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors flex items-center gap-1">
                  Our local commitment <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"
                    alt="African professional software engineer working in a modern office"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 rounded-2xl bg-primary p-6 shadow-xl hidden sm:block">
                  <p className="text-sm font-medium text-white">Professional Services Since 2021</p>
                  <p className="text-2xl font-bold text-white">iThink Systems</p>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

        {/* Stats Section */}
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-12 text-center lg:grid-cols-5">
              {stats.map((stat) => (
                <div key={stat.label} className="mx-auto flex max-w-xs flex-col gap-y-2">
                  <dt className="text-base leading-7 text-muted-foreground">{stat.label}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Featured Zimbabwe Projects */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary flex items-center lg:justify-center gap-2">
                <LayoutGrid className="h-4 w-4" /> Track Record
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Featured Zimbabwe Projects
              </p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Delivering impact through robust technical implementations for leading local institutions.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {featuredProjects.map((project, idx) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex flex-col items-start bg-card rounded-2xl border hover:shadow-md transition-shadow relative overflow-hidden group"
                  >
                    {project.image && (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    )}
                    <div className="p-8 flex-1 flex flex-col w-full">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                          {project.tag}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold leading-7 text-foreground mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm leading-6 text-muted-foreground mb-6">
                        {project.outcome}
                      </p>
                      <div className="mt-auto pt-6 border-t w-full flex items-center justify-between text-muted-foreground/60">
                        <project.icon className="h-5 w-5" />
                        <span className="text-[10px] uppercase tracking-wider font-semibold">Verified Implementation</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

        {/* End-to-End Technology Enablement */}
        <section className="py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary flex items-center lg:justify-center gap-2">
                <Cpu className="h-4 w-4" /> Full-Stack Support
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                End-to-End Technology Enablement
              </p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                We support both software and infrastructure, positioning hardware as a critical enabler of digital transformation.
              </p>
            </div>
              <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                {enablementCapabilities.map((capability, idx) => (
                  <motion.div
                    key={capability.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex flex-col items-start bg-card rounded-2xl border hover:shadow-md transition-shadow relative overflow-hidden group"
                  >
                    {capability.image && (
                      <div className="relative h-40 w-full overflow-hidden">
                        <Image
                          src={capability.image}
                          alt={capability.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    )}
                    <div className="p-8 flex-1 flex flex-col w-full text-center items-center">
                      <div className="rounded-full bg-primary/10 p-3 mb-6">
                        <capability.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold leading-7 text-foreground mb-3">
                        {capability.title}
                      </h3>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {capability.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
          </div>
        </section>


      {/* Solutions Grid */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Core Systems</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Enterprise-Grade Solutions
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We deploy reliable, high-performance platforms that address the specific needs of local institutions.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {solutions.map((solution) => (
                <motion.div 
                  key={solution.title}
                  whileHover={{ y: -5 }}
                  className="flex flex-col bg-card p-8 rounded-2xl border transition-all hover:shadow-lg"
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                    <div className={`rounded-lg ${solution.bg} p-2`}>
                      <solution.icon className={`h-6 w-6 ${solution.color}`} aria-hidden="true" />
                    </div>
                    {solution.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">{solution.description}</p>
                    <p className="mt-6">
                      <Link href={`/solutions#${solution.title.toLowerCase().replace(/[\s_]+/g, "-")}`} className="text-sm font-semibold leading-6 text-primary flex items-center gap-1">
                        Learn more <ArrowRight className="h-4 w-4" />
                      </Link>
                    </p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative isolate overflow-hidden bg-foreground py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
            <div className="lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-primary">Why iThink Systems</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Designed for Local Reality</p>
                <p className="mt-6 text-lg leading-8 text-zinc-400">
                  We understand the unique connectivity, energy, and operational landscape in Zimbabwe. Our systems are engineered to perform in real-world conditions.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-zinc-400 lg:max-w-none">
                    {[
                      {
                        name: "Scalable Deployment.",
                        description: "Systems that handle growing data volume, optimized for both local and cloud environments.",
                        icon: Zap,
                      },
                      {
                        name: "Data Sovereignty.",
                        description: "Secure, compliant data management tailored to local regulatory requirements.",
                        icon: ShieldCheck,
                      },
                      {
                        name: "Operational Performance.",
                        description: "Optimized software performance to ensure reliability even during peak usage.",
                        icon: Cpu,
                      },
                    ].map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-white">
                        <feature.icon className="absolute left-1 top-1 h-5 w-5 text-primary" aria-hidden="true" />
                        {feature.name}
                      </dt>{' '}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
              <div className="flex items-start justify-end lg:order-first">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2071&auto=format&fit=crop"
                    alt="Team of professional African developers collaborating on local solutions"
                    width={2432}
                    height={1442}
                    className="w-[48rem] max-w-none rounded-xl"
                  />
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-muted/50 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to modernize your operations?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Partner with a Bulawayo-based technology company focused on practical, scalable, and professional digital systems for organizations in Zimbabwe.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/contact">Get Started Today</Link>
              </Button>
              <div className="flex flex-col sm:flex-row gap-4 text-sm font-semibold leading-6">
                <Link href="/solutions" className="text-foreground hover:text-primary transition-colors">
                  View our core systems <span aria-hidden="true">→</span>
                </Link>
                <Link href="/website-development-zimbabwe" className="text-foreground hover:text-primary transition-colors">
                  Website development <span aria-hidden="true">→</span>
                </Link>
                <Link href="/application-development-zimbabwe" className="text-foreground hover:text-primary transition-colors">
                  Application development <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
