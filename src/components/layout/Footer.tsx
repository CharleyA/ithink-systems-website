import Link from "next/link";
import { Logo } from "./Logo";
import { Facebook, Github, Linkedin } from "lucide-react";
import { facebookUrl, linkedinUrl } from "@/lib/site-contact";

const navigation = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Blog", href: "/blog" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Contact", href: "/contact" },
  ],
  solutions: [
    { name: "Healthcare Systems", href: "/solutions#healthcare" },
    { name: "Education Platforms", href: "/solutions#education" },
    { name: "ERPNext Implementation", href: "/solutions#erpnext" },
    { name: "AI Software", href: "/solutions#ai" },
    { name: "Custom SaaS", href: "/solutions#saas" },
  ],
  build: [
    { name: "Website Development", href: "/website-development-zimbabwe" },
    { name: "Application Development", href: "/application-development-zimbabwe" },
    { name: "System Development", href: "/system-development-zimbabwe" },
    { name: "Custom Software", href: "/custom-software-development-zimbabwe" },
    { name: "Hosting & Deployment", href: "/hosting-services-zimbabwe" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const linkColumns = [
  { title: "Company", items: navigation.company },
  { title: "Solutions", items: navigation.solutions },
  { title: "Build & Delivery", items: navigation.build },
  { title: "Legal", items: navigation.legal },
];

export function Footer() {
  return (
    <footer className="bg-background border-t" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-16 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0 xl:gap-x-8">
          <div className="col-span-2 space-y-8 lg:col-span-1">
            <Logo />
            <p className="text-sm leading-6 text-muted-foreground">
              Empowering innovation in Zimbabwe through professional technology solutions. Specializing in Healthcare, Education, and AI.
            </p>
            <div className="flex gap-x-6">
              <Link
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="https://github.com/CharleyA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </Link>
            </div>
          </div>
          {linkColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold leading-6 text-foreground">{column.title}</h3>
              <ul role="list" className="mt-6 space-y-4">
                {column.items.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-primary">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 border-t border-foreground/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-muted-foreground">
            &copy; {new Date().getFullYear()} iThink Systems. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
