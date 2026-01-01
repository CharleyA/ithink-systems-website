import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  FolderKanban, 
  HeadphonesIcon, 
  FileText, 
  CreditCard,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const features = [
  {
    icon: FolderKanban,
    title: "Project Tracking",
    description: "Monitor your project progress, milestones, and deliverables in real-time.",
  },
  {
    icon: HeadphonesIcon,
    title: "Support Tickets",
    description: "Submit and track support requests with priority-based handling.",
  },
  {
    icon: FileText,
    title: "Document Library",
    description: "Access contracts, proposals, and project documentation securely.",
  },
  {
    icon: CreditCard,
    title: "Billing Overview",
    description: "View invoices, payment history, and account statements.",
  },
];

const benefits = [
  "24/7 access to project information",
  "Real-time status updates",
  "Secure document sharing",
  "Direct communication channel",
  "Transparent billing history",
];

export default function PortalLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
            <Shield className="h-4 w-4" />
            Secure Client Access
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Client Portal
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Access your projects, support tickets, documents, and billing information 
            all in one secure location. Stay connected with your iThink Systems team.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="/portal/login">
                Sign In to Portal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Link 
              href="/contact" 
              className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
            >
              Request Access <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="relative rounded-2xl border bg-card p-8 hover:shadow-lg transition-shadow"
            >
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 rounded-3xl bg-muted/50 p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Everything you need, in one place
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our client portal provides a centralized hub for all your project 
                information, ensuring transparency and efficient communication 
                throughout our partnership.
              </p>
              <ul className="mt-8 space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-8 border shadow-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Demo Credentials
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Try out the portal with these demo credentials:
              </p>
              <div className="space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="font-mono text-sm text-foreground">demo@ithink.systems</p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-xs text-muted-foreground mb-1">Password</p>
                  <p className="font-mono text-sm text-foreground">demo123</p>
                </div>
              </div>
              <Button className="w-full mt-6" asChild>
                <Link href="/portal/login">Try Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
