export interface Product {
  id: string;
  name: string;
  summary: string;
  features: string[];
  demoUrl: string;
  contactUrl: string;
}

export const products: Product[] = [
  {
    id: "medisure-os",
    name: "Medisure_OS",
    summary: "A comprehensive Operating System for medical facilities, integrating EHR, pharmacy, and laboratory management.",
    features: [
      "Integrated Electronic Health Records (EHR)",
      "Real-time Pharmacy & Inventory Tracking",
      "Automated Laboratory Result Dispatch"
    ],
    demoUrl: "https://demo.ithinksys.co.zw/medisure",
    contactUrl: "https://ithinksys.co.zw/contact?product=medisure"
  },
  {
    id: "school-payflow",
    name: "School Payflow",
    summary: "Streamlined fee collection and financial management for educational institutions of all sizes.",
    features: [
      "Multi-channel Fee Collection",
      "Automated Parent Notification System",
      "Real-time Financial Reporting"
    ],
    demoUrl: "https://demo.ithinksys.co.zw/payflow",
    contactUrl: "https://ithinksys.co.zw/contact?product=payflow"
  },
  {
    id: "ai-assessment",
    name: "AI Assessment Platform",
    summary: "Advanced AI-driven platform for automated grading and student performance analytics.",
    features: [
      "Automated Essay & Short-answer Grading",
      "Predictive Performance Analytics",
      "Adaptive Learning Path Generation"
    ],
    demoUrl: "https://demo.ithinksys.co.zw/ai-assessment",
    contactUrl: "https://ithinksys.co.zw/contact?product=ai-assessment"
  }
];
