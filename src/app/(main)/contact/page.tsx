"use client";

import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  MessageSquare,
  Building
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
export default function ContactPage() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">Contact Us</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Have a project in mind or want to build a website, application, system, ERP workflow, or hosted platform? We'd love to hear from you.
          </p>
        </div>
        <div className="mx-auto mt-20 grid max-w-7xl grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-foreground">Get in touch</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our team is ready to discuss how iThink Systems can help your organization thrive.
              </p>
            </div>
              <div className="space-y-8">
                {[
                  { 
                    name: "Bulawayo Office", 
                    value: "Bulawayo, Zimbabwe", 
                    icon: MapPin 
                  },
                  { 
                    name: "Email Us", 
                    value: "info@ithinksys.co.zw", 
                    icon: Mail 
                  },
                  { 
                    name: "Call Us", 
                    value: "+263772950432", 
                    icon: Phone 
                  }
                ].map((item) => (
                <div key={item.name} className="flex gap-x-6 items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{item.name}</h3>
                    <p className="mt-2 text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-3xl bg-muted/50 p-8">
              <div className="flex items-center gap-4 text-primary">
                <MessageSquare className="h-8 w-8" />
                <h3 className="text-xl font-bold text-foreground">Support 24/7</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Our support team is always available for our existing clients. Login to your portal or use the emergency line.
              </p>
            </div>
          </motion.div>
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border bg-card p-8 shadow-xl sm:p-12"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Organization Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="solution">Interested Solution</Label>
                <select 
                  id="solution" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select a solution...</option>
                  <option value="healthcare">Healthcare Systems</option>
                  <option value="education">Education Platforms</option>
                  <option value="erpnext">ERPNext Implementation</option>
                  <option value="ai">AI-Powered Software</option>
                  <option value="saas">Custom SaaS Development</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Tell us about your project..." className="min-h-[150px]" />
              </div>
              <Button type="submit" className="w-full h-12 text-lg font-bold group">
                Send Message <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
