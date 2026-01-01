"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, CheckCircle2, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CaseStudy } from "@/content/case-studies";
import { CaseStudyCTA } from "@/components/case-studies/CaseStudyCTA";

interface CaseStudyDetailContentProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyDetailContent({ caseStudy }: CaseStudyDetailContentProps) {
  const statusColors = {
    Live: "bg-green-500/10 text-green-500 border-green-500/20",
    Pilot: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "In Progress": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src={caseStudy.image}
          alt={caseStudy.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl px-6 pb-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link 
                href="/case-studies"
                className="inline-flex items-center text-sm font-medium text-primary mb-6 hover:underline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {caseStudy.status && (
                  <>
                    <Badge className={`${statusColors[caseStudy.status]} border`}>
                      {caseStudy.status}
                    </Badge>
                    <span className="text-muted-foreground">•</span>
                  </>
                )}
                <span className="text-primary font-semibold">{caseStudy.industry}</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl max-w-4xl">
                {caseStudy.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6">Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {caseStudy.summary}
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 rounded-3xl border bg-card shadow-sm">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Client</p>
                <p className="text-lg font-bold">{caseStudy.client}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Location</p>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <p className="text-lg font-bold">{caseStudy.location || "Africa"}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Year</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <p className="text-lg font-bold">{caseStudy.year}</p>
                </div>
              </div>
            </section>

            {caseStudy.metrics && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Key Metrics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {caseStudy.metrics.map((metric) => (
                    <div key={metric.label} className="p-6 rounded-2xl border bg-muted/30 text-center">
                      <p className="text-3xl font-bold text-primary mb-1">{metric.value}</p>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold mb-6">The Challenge</h2>
              <ul className="space-y-4">
                {caseStudy.challenge.map((item, i) => (
                  <li key={i} className="flex gap-4 text-muted-foreground">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Our Solution</h2>
              <ul className="space-y-4">
                {caseStudy.solution.map((item, i) => (
                  <li key={i} className="flex gap-4 text-muted-foreground">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Business Outcomes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.outcomes.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl border bg-muted/20">
                    <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="p-8 rounded-3xl border bg-card shadow-sm sticky top-24">
              <h3 className="text-xl font-bold mb-6">Technical Details</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Services Provided</h4>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.services.map((s) => (
                      <Badge key={s} variant="secondary">{s}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-muted rounded-full text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {caseStudy.links && caseStudy.links.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Related Links</h4>
                    <div className="space-y-2">
                      {caseStudy.links.map((link) => (
                        <a 
                          key={link.url} 
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-primary hover:underline font-medium"
                        >
                          {link.label} <ChevronRight className="ml-1 h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t mt-6">
                  <p className="text-sm text-muted-foreground mb-4">Interested in a similar solution?</p>
                  <Button className="w-full group" asChild>
                    <Link href="/contact">
                      Start a Project <ArrowLeft className="ml-2 h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <CaseStudyCTA />
      </div>
    </div>
  );
}
