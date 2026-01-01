"use client";

import { motion } from "framer-motion";
import { 
  Shield, 
  Zap, 
  Users, 
  Lock,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const products = [
  {
    name: "iHealth Connect",
    tagline: "The Future of Patient Care",
    description: "A comprehensive EHR and facility management system designed to work in both connected and offline environments.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    features: ["Offline Sync", "Multi-facility Support", "Mobile App for Doctors"]
  },
  {
    name: "iLearn African Portal",
    tagline: "Education Without Boundaries",
    description: "An adaptive learning platform that prioritizes low-bandwidth content delivery and local language support.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074&auto=format&fit=crop",
    features: ["Video Compression", "Gamified Learning", "Assessment Engine"]
  },
  {
    name: "iSaaS Core",
    tagline: "Launch Your Startup Faster",
    description: "A foundational SaaS framework with built-in multi-tenancy, payments, and African gateway integrations.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    features: ["Local Payment Hooks", "Security First", "Rapid Deployment"]
  }
];

export default function ProductsPage() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Our Products</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Innovating for the Digital Frontier
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our flagship products are built on years of experience and a deep understanding of the African market.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-3">
          {products.map((product) => (
            <motion.div 
              key={product.name}
              whileHover={{ y: -10 }}
              className="flex flex-col overflow-hidden rounded-2xl bg-card border shadow-sm transition-all hover:shadow-xl"
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary uppercase tracking-wider">{product.tagline}</p>
                  <h3 className="mt-2 text-2xl font-bold text-foreground">{product.name}</h3>
                  <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-foreground font-medium">
                        <Zap className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <Button variant="outline" className="w-full group" asChild>
                    <Link href="/contact">
                      Request Demo <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
