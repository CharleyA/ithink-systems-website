"use client";

import { motion } from "framer-motion";
import { 
  Stethoscope, 
  GraduationCap, 
  BarChart3, 
  Cpu, 
  Cloud,
  Server,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";

const solutions = [
    {
      id: "healthcare",
      title: "Healthcare Systems",
      description: "Modernizing healthcare delivery in Zimbabwe with integrated digital solutions.",
      features: [
      "Electronic Health Records (EHR)",
      "Hospital Management Systems",
      "Telemedicine Platforms",
      "Inventory & Pharmacy Management",
      "Patient Portal & Scheduling"
    ],
    icon: Stethoscope,
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop",
      color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    id: "education",
    title: "Education Platforms",
    description: "Bridging the educational gap with scalable learning management systems.",
    features: [
      "Learning Management Systems (LMS)",
      "Student Information Systems (SIS)",
      "E-Learning Content Delivery",
      "Examination Management",
      "Parent-Teacher Portals"
    ],
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop",
    color: "text-orange-600",
    bg: "bg-orange-50"
  },
  {
    id: "erpnext",
    title: "ERPNext Implementation",
    description: "Full-cycle ERP solutions to streamline business processes and finance.",
    features: [
      "Financial Accounting",
      "Human Resources & Payroll",
      "Sales & CRM",
      "Stock & Warehouse Management",
      "Manufacturing & Production"
    ],
    icon: BarChart3,
    image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?q=80&w=2070&auto=format&fit=crop",
    color: "text-green-600",
    bg: "bg-green-50"
  },
    {
      id: "automation",
      title: "Advanced Data & Integration",
      description: "Leveraging structured data and automation to solve complex local organizational challenges.",
      features: [
        "Business Intelligence & Reporting",
        "Legacy System Integrations",
        "Automated Data Collection",
        "Custom API Development",
        "Workflow Optimization"
      ],
      icon: Cpu,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      id: "saas",
      title: "Custom SaaS Development",
      description: "Tailor-made software as a service for unique business models.",
      features: [
        "Multi-tenant Architecture",
        "Scalable Cloud Hosting",
        "API Integration",
        "Subscription Management",
        "White-label Solutions"
      ],
      icon: Cloud,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2071&auto=format&fit=crop",
      color: "text-cyan-600",
      bg: "bg-cyan-50"
    },
    {
      id: "infrastructure",
      title: "IT Infrastructure & Technology Enablement",
      description: "The foundation that enables successful digital transformation.",
      features: [
        "Contract-based institutional hardware provisioning",
        "Project-bundled productivity licensing",
        "Professional device configuration and rollout",
        "User readiness training for ERP, LMS, and healthcare systems",
        "Server & networking deployment for enterprise environments"
      ],
      icon: Server,
      image: "https://images.unsplash.com/photo-1573166364524-d9dbfd8bbf83?q=80&w=2070&auto=format&fit=crop",
      color: "text-slate-600",
      bg: "bg-slate-50"
    }
  ];

export default function SolutionsPage() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">Our Solutions</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We provide specialized technology solutions designed to address the specific needs of the healthcare, education, and business sectors in Zimbabwe.
            </p>
        </div>

        <div className="mt-20 space-y-24">
          {solutions.map((solution, index) => (
            <motion.div 
              key={solution.id}
              id={solution.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col gap-16 lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-x-4 mb-6">
                  <div className={`rounded-xl ${solution.bg} p-3`}>
                    <solution.icon className={`h-8 w-8 ${solution.color}`} />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">{solution.title}</h2>
                </div>
                <p className="text-lg leading-8 text-muted-foreground mb-8">
                  {solution.description}
                </p>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-x-3 text-base text-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-none" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 relative aspect-[16/9] lg:aspect-auto">
                <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
