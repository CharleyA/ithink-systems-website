"use client";

import { motion } from "motion/react";
import { 
  Code2, 
  Settings2, 
  Lightbulb, 
  Users2,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    title: "Custom Software Development",
    description: "We build tailored software solutions that solve your specific business challenges, from web apps to complex enterprise systems.",
    icon: Code2,
    features: ["Web & Mobile Apps", "API Development", "Cloud-Native Architecture", "SaaS Platforms"]
  },
  {
    title: "ERP & System Integration",
    description: "Specializing in ERPNext implementations and connecting disparate systems to create a unified business workflow.",
    icon: Settings2,
    features: ["ERPNext Setup", "Legacy Migration", "Third-party Integrations", "Workflow Automation"]
  },
    {
      title: "Technology Consulting",
      description: "Strategic advice on technology stack, digital transformation, and localized system architecture to improve operational efficiency.",
      icon: Lightbulb,
      features: ["Digital Strategy", "Architecture Review", "Security Audit", "Scalability Planning"]
    },
  {
    title: "Training & Managed Services",
    description: "Ensuring your team is equipped to use new systems effectively, with ongoing support and maintenance.",
    icon: Users2,
    features: ["Staff Training", "24/7 Support", "System Maintenance", "Performance Monitoring"]
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">Our Services</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Beyond our products, we offer professional services to help organizations navigate their digital transformation journey in Zimbabwe.
            </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col bg-card p-10 rounded-3xl border shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <service.icon className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{service.title}</h2>
              </div>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {service.description}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-foreground font-medium">
                    <CheckCircle className="h-5 w-5 text-primary flex-none" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-10 pt-8 border-t">
                <Button variant="link" className="px-0 text-primary font-bold text-lg group" asChild>
                  <Link href="/contact">
                    Discuss your project <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-32 rounded-3xl bg-foreground p-12 sm:p-20 text-white">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">Our Working Process</h2>
            <p className="mt-4 text-zinc-400">How we turn your vision into a reality.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", name: "Discovery", desc: "Understanding your goals and challenges." },
              { step: "02", name: "Strategy", desc: "Crafting the perfect technical approach." },
              { step: "03", name: "Execution", desc: "Agile development and rigorous testing." },
              { step: "04", name: "Launch", desc: "Deployment and ongoing optimization." }
            ].map((item) => (
              <div key={item.step} className="text-center md:text-left">
                <span className="text-primary text-5xl font-bold opacity-50 block mb-4">{item.step}</span>
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
