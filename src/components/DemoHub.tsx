"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { demoLinks } from "@/content/demo-links";
import { ExternalLink, ShieldAlert } from "lucide-react";

export default function DemoHub() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="bg-primary/5 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
          >
            iThink Systems <span className="text-primary">Demo Hub</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto"
          >
            Welcome to our sandbox environment. Here you can explore live demonstrations of our flagship solutions in a safe, pre-configured setting.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-sm font-medium"
          >
            <ShieldAlert className="h-4 w-4" />
            <span>Sandbox Environment: Data resets periodically</span>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 flex-grow">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demoLinks.map((demo, index) => (
              <motion.div
                key={demo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="flex flex-col bg-card rounded-2xl border p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">{demo.name}</h3>
                <p className="text-muted-foreground mb-8 flex-grow">
                  {demo.description}
                </p>
                <Button asChild className="w-full group">
                  <Link href={demo.url} target="_blank" rel="noopener noreferrer">
                    Open Demo <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
