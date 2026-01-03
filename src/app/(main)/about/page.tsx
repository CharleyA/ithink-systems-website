"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Target, 
  Heart, 
  Lightbulb,
  Linkedin,
  Twitter
} from "lucide-react";
import Link from "next/link";

const values = [
  {
    name: "Regional Expertise",
    description: "We build solutions that are natively Zimbabwean, designed for the specific infrastructure and operational landscape of our region.",
    icon: Lightbulb
  },
  {
    name: "Professional Excellence",
    description: "We maintain rigorous standards of software engineering, delivering enterprise-grade systems that perform reliably.",
    icon: Target
  },
  {
    name: "Integrity",
    description: "Building trust through transparency, data security, and a consistent track record of successful deployments.",
    icon: Heart
  }
];

  const team = [
    {
      name: "Charles Moyo",
      role: "Founding Director & Lead Engineer",
      image: "/images/team/charley-pic.jpeg?width=800&height=800&resize=cover",
      bio: "Systems architect with a focus on practical enterprise technology since 2021."
    },
    {
      name: "Faith Donga",
      role: "Creative Director",
      image: "/images/team/faith-pic.jpeg?width=800&height=800&resize=cover",
      bio: "Leading creative vision and brand strategy for impactful digital experiences."
    },
    {
      name: "Nhlanhla Ndlovu",
      role: "Marketing Director",
      image: "/images/team/nhlanhla-pic.jpeg?width=800&height=800&resize=cover",
      bio: "Driving market growth and strategic partnerships across the region."
    },
    {
      name: "Graham Chimwanja",
      role: "Accountant",
      image: "https://ui-avatars.com/api/?name=Graham+Chimwanja&size=400&background=f59e0b&color=fff&bold=true",
      bio: "Ensuring financial integrity and sustainable business operations."
    },
    {
      name: "Lungelo Sibanda",
      role: "Projects Director",
      image: "/images/team/lungelo-pic.jpeg?width=800&height=800&resize=cover",
      bio: "Overseeing project delivery and client success across all implementations."
    }
  ];

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Mission Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">About iThink Systems</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Registered in 2021 and based in Bulawayo, iThink Systems provides practical enterprise solutions that address the real-world operational needs of Zimbabwean institutions.
            </p>
          </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-24 lg:max-w-none lg:grid-cols-2 lg:items-center">
              <div className="relative aspect-[16/9] lg:aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                  alt="iThink Systems team collaborating on local solutions in Bulawayo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Our Mission</h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  We provide reliable technical foundations for local organizations, delivering enterprise-grade technology tailored to our specific environment. From clinics in Matabeleland to educational institutions in Harare, we build systems that work under real-world conditions.
                </p>
                <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Vision</h3>
                    <p className="mt-2 text-muted-foreground">To be the most reliable partner for institutional digitization in Zimbabwe.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Track Record</h3>
                    <p className="mt-2 text-muted-foreground">Supporting 18+ institutions and managing flagship ERP implementations since 2021.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Core Values</h2>
            <p className="mt-4 text-lg text-muted-foreground">The principles that guide our development and implementation process.</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {values.map((value) => (
                <div key={value.name} className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border shadow-sm">
                  <div className="rounded-lg bg-primary/10 p-3 mb-6 text-primary">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <dt className="text-xl font-bold text-foreground mb-4">{value.name}</dt>
                  <dd className="text-muted-foreground leading-relaxed">{value.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Leadership Team</h2>
            <p className="mt-4 text-lg text-muted-foreground">Professionals dedicated to building robust technological foundations for Zimbabwe.</p>
          </div>
          <ul role="list" className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {team.map((person) => (
              <li key={person.name} className="flex flex-col items-center">
<div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-primary/20 p-2">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover object-[center_20%] rounded-full"
                    />
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-foreground">{person.name}</h3>
                <p className="text-sm font-semibold leading-6 text-primary">{person.role}</p>
                <p className="mt-4 text-center text-muted-foreground px-4">{person.bio}</p>
                <div className="mt-6 flex gap-4">
                  <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
