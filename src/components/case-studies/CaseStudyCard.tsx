"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, MapPin, Calendar } from "lucide-react";
import { CaseStudy } from "@/content/case-studies";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index: number;
}

export function CaseStudyCard({ caseStudy, index }: CaseStudyCardProps) {
  const statusColors = {
    Live: "bg-green-500/10 text-green-500 border-green-500/20",
    Pilot: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "In Progress": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-md"
    >
      <Link href={`/case-studies/${caseStudy.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <Image
          src={caseStudy.image}
          alt={caseStudy.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute top-4 left-4 flex gap-2">
            {caseStudy.status && (
              <Badge className={`${statusColors[caseStudy.status]} backdrop-blur-md border`}>
                {caseStudy.status}
              </Badge>
            )}
          </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3">
          <span className="text-primary">{caseStudy.industry}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {caseStudy.year}
          </div>
          {caseStudy.location && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {caseStudy.location}
              </div>
            </>
          )}
        </div>

        <Link href={`/case-studies/${caseStudy.slug}`}>
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {caseStudy.title}
          </h3>
        </Link>
        
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3 flex-1">
          {caseStudy.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {caseStudy.services.slice(0, 3).map((service) => (
            <Badge key={service} variant="secondary" className="text-[10px] px-2 py-0">
              {service}
            </Badge>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <span className="text-sm font-semibold text-foreground">{caseStudy.client}</span>
          <Link 
            href={`/case-studies/${caseStudy.slug}`}
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            View Details <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
