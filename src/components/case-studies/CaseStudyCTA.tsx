import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CaseStudyCTA() {
  return (
    <section className="mt-24">
      <div className="rounded-2xl border bg-card p-8 md:p-12 shadow-sm text-center max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Want a similar solution?</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          Talk to iThink Systems about implementing a reliable, scalable system for your organisation.
        </p>
        <Button size="lg" className="rounded-full group" asChild>
          <Link href="/contact">
            Request a Consultation
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
