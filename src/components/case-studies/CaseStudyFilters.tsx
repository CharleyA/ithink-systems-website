"use client";

import { Industry, Service } from "@/content/case-studies";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CaseStudyFiltersProps {
  activeIndustry: Industry | "All";
  onIndustryChange: (industry: Industry | "All") => void;
  activeService: Service | "All";
  onServiceChange: (service: Service | "All") => void;
  industries: Industry[];
  services: Service[];
}

export function CaseStudyFilters({
  activeIndustry,
  onIndustryChange,
  activeService,
  onServiceChange,
  industries,
  services,
}: CaseStudyFiltersProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-sm font-semibold mb-3 text-foreground">Filter by Industry</h4>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeIndustry === "All" ? "default" : "outline"}
            size="sm"
            onClick={() => onIndustryChange("All")}
            className="rounded-full"
          >
            All Industries
          </Button>
          {industries.map((industry) => (
            <Button
              key={industry}
              variant={activeIndustry === industry ? "default" : "outline"}
              size="sm"
              onClick={() => onIndustryChange(industry)}
              className="rounded-full"
            >
              {industry}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3 text-foreground">Filter by Service</h4>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeService === "All" ? "default" : "outline"}
            size="sm"
            onClick={() => onServiceChange("All")}
            className="rounded-full"
          >
            All Services
          </Button>
          {services.map((service) => (
            <Button
              key={service}
              variant={activeService === service ? "default" : "outline"}
              size="sm"
              onClick={() => onServiceChange(service)}
              className="rounded-full"
            >
              {service}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
