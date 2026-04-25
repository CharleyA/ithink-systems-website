"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Smartphone,
  Calculator,
  Boxes,
  Shield,
  HeartPulse,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const products = [
  {
    name: "Web & App Platforms",
    tagline: "Modern Digital Experiences",
    description:
      "High-performance websites and web applications built with Next.js and TypeScript for speed, reliability, and growth.",
    icon: Globe,
    features: ["Next.js Architecture", "TypeScript Codebase", "SEO + Performance Optimized"],
  },
  {
    name: "Mobile Business Apps",
    tagline: "Business in Your Pocket",
    description:
      "Cross-platform mobile applications that keep teams, customers, and operations connected in real time.",
    icon: Smartphone,
    features: ["Android & iOS Support", "Offline-Ready Workflows", "API Integrations"],
  },
  {
    name: "IPSAS Schools Accounting Suite",
    tagline: "Compliance-Ready Education Finance",
    description:
      "School accounting workflows aligned to IPSAS-aligned reporting expectations with practical controls for institutional finance teams.",
    icon: Calculator,
    features: ["Financial Reporting", "Budget & Control", "Audit-Friendly Structure"],
  },
  {
    name: "Warehouse Management Suite",
    tagline: "Smarter Stock Control",
    description:
      "Inventory, receiving, issuing, and stock tracking tools designed to reduce leakage and improve visibility across stores.",
    icon: Boxes,
    features: ["Stock Movement Tracking", "Reorder Intelligence", "Multi-Store Support"],
  },
  {
    name: "Insurance Management Platform",
    tagline: "Policy & Claims Operations",
    description:
      "Digitized insurance administration for member management, policy workflows, claims processing, and operational reporting.",
    icon: Shield,
    features: ["Member Administration", "Claims Workflow", "Operational Dashboards"],
  },
  {
    name: "Patient Management System",
    tagline: "Care-Focused Clinical Operations",
    description:
      "Integrated patient and facility workflows supporting registration, clinical records, and service coordination.",
    icon: HeartPulse,
    features: ["Patient Records", "Facility Workflow Support", "Clinical Data Access"],
  },
  {
    name: "Retail Management Suite",
    tagline: "End-to-End Retail Operations",
    description:
      "A practical retail operations platform connecting products, sales, stock, and reporting in one system.",
    icon: ShoppingBag,
    features: ["Sales & POS Flows", "Stock + Pricing Control", "Retail Performance Insights"],
  },
  {
    name: "AI Integration & Enablement",
    tagline: "Practical AI for Real Workflows",
    description:
      "Applied AI integration services to embed automation, assistants, and intelligent decision support into existing business systems.",
    icon: Shield,
    features: ["Workflow AI Integration", "AI Readiness Advisory", "Team Enablement & Training"],
  },
  {
    name: "Managed Support Services",
    tagline: "Reliable Ongoing Support",
    description:
      "Structured technical support and system care to keep operations stable, secure, and continuously improving.",
    icon: CheckCircle,
    features: ["Issue Resolution", "System Monitoring", "Continuous Improvement Support"],
  },
];
export default function ProductsPage() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">Our Products</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Purpose-built digital products designed for real institutional and business operations in Zimbabwe and beyond.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex flex-col bg-card p-8 rounded-3xl border shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <product.icon className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">{product.tagline}</p>
                  <h2 className="text-xl font-bold text-foreground">{product.name}</h2>
                </div>
              </div>
              <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>
              <ul className="grid grid-cols-1 gap-3 mt-auto">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-foreground font-medium text-sm">
                    <CheckCircle className="h-4 w-4 text-primary flex-none" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t">
                <Button variant="link" className="px-0 text-primary font-bold group" asChild>
                  <Link href="/contact">
                    Talk to us about this solution
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
