"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { products } from "@/content/products";
import { CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";

export function ProductsHub() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">iT</span>
            </div>
            <span className="font-bold text-xl tracking-tight">Products Hub</span>
          </div>
          <Button variant="ghost" asChild>
            <Link href="https://ithinksys.co.zw">Corporate Site</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Our Software Solutions
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Discover our range of specialized platforms designed to solve complex challenges in healthcare, education, and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="flex flex-col bg-card border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="p-8 flex-grow">
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {product.name}
                  </h2>
                </div>
                
                <p className="text-muted-foreground mb-8 line-clamp-3">
                  {product.summary}
                </p>

                <div className="space-y-4 mb-8">
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/70">
                    Key Features
                  </p>
                  <ul className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-8 pt-0 mt-auto flex flex-col gap-3">
                <Button className="w-full justify-between group/btn" asChild>
                  <Link href={product.demoUrl}>
                    Request Demo
                    <ExternalLink className="h-4 w-4 ml-2 opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={product.contactUrl}>
                    Contact Sales
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-24 p-12 rounded-3xl bg-muted/30 border border-dashed border-muted-foreground/20 text-center">
          <h3 className="text-2xl font-semibold mb-4">Need a custom solution?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Beyond our flagship products, we offer custom software development tailored to your specific organizational needs.
          </p>
          <Button variant="link" asChild className="text-primary font-semibold">
            <Link href="https://ithinksys.co.zw/services" className="flex items-center gap-2">
              Explore our services <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>

      <footer className="border-t py-12 mt-24">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} iThink Systems. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
