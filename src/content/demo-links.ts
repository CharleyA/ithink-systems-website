export interface DemoLink {
  name: string;
  description: string;
  url: string;
  image?: string;
}

export const demoLinks: DemoLink[] = [
  {
    name: "Medisure OS",
    description: "Our flagship healthcare management system designed for clinical excellence and patient care.",
    url: process.env.DEMO_MEDISURE_URL || "#",
  },
  {
    name: "School Payflow",
    description: "Streamlined education payment and management platform for modern African institutions.",
    url: process.env.DEMO_SCHOOLPAYFLOW_URL || "#",
  },
  {
    name: "ERPNext Test Environment",
    description: "Explore the full capabilities of ERPNext in our managed sandbox environment.",
    url: process.env.DEMO_ERPNEXT_URL || "#",
  }
];
