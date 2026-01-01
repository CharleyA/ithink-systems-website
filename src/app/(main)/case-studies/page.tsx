"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { caseStudies, Industry, Service } from "@/content/case-studies";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { CaseStudyFilters } from "@/components/case-studies/CaseStudyFilters";
import { CaseStudyCTA } from "@/components/case-studies/CaseStudyCTA";

export default function CaseStudiesPage() {
  const [activeIndustry, setActiveIndustry] = useState<Industry | "All">("All");
  const [activeService, setActiveService] = useState<Service | "All">("All");

  const industries = useMemo(() => {
    return Array.from(new Set(caseStudies.map((cs) => cs.industry)));
  }, []);

  const services = useMemo(() => {
    return Array.from(new Set(caseStudies.flatMap((cs) => cs.services)));
  }, []);

  const filteredCaseStudies = useMemo(() => {
    return caseStudies
      .filter((cs) => {
        const industryMatch = activeIndustry === "All" || cs.industry === activeIndustry;
        const serviceMatch = activeService === "All" || cs.services.includes(activeService);
        return industryMatch && serviceMatch;
      })
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.year - a.year;
      });
  }, [activeIndustry, activeService]);

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="max-w-3xl mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
          >
            Case Studies
          </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-lg leading-8 text-muted-foreground"
            >
              Real-world examples of how iThink Systems delivers high-impact technology solutions 
              across healthcare, education, and enterprise sectors in Zimbabwe.
            </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <CaseStudyFilters
                activeIndustry={activeIndustry}
                onIndustryChange={setActiveIndustry}
                activeService={activeService}
                onServiceChange={setActiveService}
                industries={industries}
                services={services}
              />
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filteredCaseStudies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
                {filteredCaseStudies.map((cs, index) => (
                  <CaseStudyCard key={cs.slug} caseStudy={cs} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border rounded-2xl bg-muted/30">
                <p className="text-muted-foreground">No case studies found matching your criteria.</p>
                <button 
                  onClick={() => { setActiveIndustry("All"); setActiveService("All"); }}
                  className="mt-4 text-primary font-medium hover:underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>

        <CaseStudyCTA />
      </div>
    </div>
  );
}
