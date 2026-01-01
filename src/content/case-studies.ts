export type Industry = 'Healthcare' | 'Education' | 'Manufacturing' | 'Finance' | 'Technology' | 'Services';
export type Service = 'ERPNext Implementation' | 'Custom SaaS' | 'Advanced Automation' | 'Digital Transformation' | 'Cloud Migration' | 'Web Development' | 'Accounting Systems' | 'ERP Development';
export type Status = 'Live' | 'Pilot' | 'In Progress';

export interface Metric {
  label: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: Industry;
  services: Service[];
  year: number;
  location?: string;
  status?: Status;
  summary: string;
  featured?: boolean;
  metrics?: Metric[];
  challenge: string[];
  solution: string[];
  outcomes: string[];
  techStack: string[];
  links?: { label: string; url: string }[];
  image: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'erpnext-mpilo',
    title: 'ERPNext Implementation — Mpilo Central Hospital',
    client: 'Mpilo Central Hospital',
    industry: 'Healthcare',
    services: ['ERPNext Implementation', 'Digital Transformation'],
    year: 2024,
    location: 'Bulawayo, Zimbabwe',
    status: 'Live',
    featured: true,
    summary: 'Procurement, inventory control, accounting, and HR systems for a major public referral hospital.',
    challenge: [
      'Manual tracking of medical supplies and hospital assets.',
      'Complex procurement workflows leading to delays in essential supplies.',
      'Need for integrated financial and HR management in a large-scale public institution.'
    ],
    solution: [
      'Deployed ERPNext with custom modules for healthcare procurement and inventory.',
      'Digitized asset tracking for hospital equipment and facilities.',
      'Integrated payroll and HR management for the hospital staff.'
    ],
    outcomes: [
      'Real-time visibility into inventory levels across departments.',
      'Streamlined procurement approval workflows.',
      'Improved financial reporting and accountability.'
    ],
    techStack: ['ERPNext', 'Frappe Framework', 'Python', 'MariaDB'],
    image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=2071&auto=format&fit=crop'
  },
  {
    slug: 'moodle-lms',
    title: 'MOODLE LMS Deployments — 18+ Institutions',
    client: 'Various Educational Institutions',
    industry: 'Education',
    services: ['Digital Transformation', 'Custom SaaS'],
    year: 2023,
    location: 'National, Zimbabwe',
    status: 'Live',
    featured: true,
    summary: 'Installation, customization, training, and support for blended learning environments.',
    challenge: [
      'Lack of centralized digital platforms for learning materials and assessments.',
      'Difficulty in managing student records and grades across large institutions.',
      'Need for reliable remote access to educational resources.'
    ],
    solution: [
      'Large-scale deployment of Moodle LMS across 18+ institutions.',
      'Customized themes and plugins to meet local pedagogical requirements.',
      'Comprehensive training for educators and administrative staff.'
    ],
    outcomes: [
      'Established stable e-learning environments for thousands of students.',
      'Improved efficiency in assessment and grade management.',
      'Enhanced digital literacy among academic staff.'
    ],
    techStack: ['PHP', 'Moodle SDK', 'MySQL', 'Linux'],
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop'
  },
  {
    slug: 'neomed-accounting',
    title: 'Neomed Pharmaceuticals — Accounting System',
    client: 'Neomed Pharmaceuticals',
    industry: 'Healthcare',
    services: ['Accounting Systems'],
    year: 2023,
    location: 'Bulawayo, Zimbabwe',
    status: 'Live',
    featured: false,
    summary: 'Implementation and configuration of an enterprise accounting system for pharmaceutical operations.',
    challenge: [
      'Fragmented financial tracking across pharmaceutical distribution channels.',
      'Need for precise inventory valuation and tax compliance.',
      'Manual reconciliation of sales and expenditures.'
    ],
    solution: [
      'Implemented a robust enterprise accounting system tailored for pharmaceutical retail.',
      'Configured automated financial reporting and tax calculation modules.',
      'Integrated inventory management with accounting ledgers.'
    ],
    outcomes: [
      'Accurate real-time financial reporting.',
      'Reduced errors in tax compliance and inventory valuation.',
      'Streamlined month-end closing processes.'
    ],
    techStack: ['Accounting Software', 'SQL', 'ERP Integration'],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop'
  },
  {
    slug: 'eduloan-erp',
    title: 'Eduloan — Custom ERP on Frappe',
    client: 'Eduloan Zimbabwe',
    industry: 'Finance',
    services: ['ERP Development', 'Digital Transformation'],
    year: 2024,
    location: 'Harare, Zimbabwe',
    status: 'Live',
    featured: false,
    summary: 'Development of an integrated ERP covering accounting, HR, payroll, loan management, assets, and projects.',
    challenge: [
      'Managing complex loan life cycles and repayment tracking manually.',
      'Disconnected systems for HR, payroll, and financial projects.',
      'Requirement for a scalable platform to handle growing client portfolios.'
    ],
    solution: [
      'Built a comprehensive custom ERP on the Frappe framework.',
      'Developed specialized modules for loan management and project tracking.',
      'Integrated HR and payroll into the central financial system.'
    ],
    outcomes: [
      'Centralized management of all business operations.',
      'Improved accuracy in loan interest calculations and repayment tracking.',
      'Enhanced project visibility and resource allocation.'
    ],
    techStack: ['Frappe Framework', 'Python', 'MariaDB', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop'
  },
  {
    slug: 'calm-health',
    title: 'CALM Health — Medical Aid Insurance System',
    client: 'CALM Health',
    industry: 'Healthcare',
    services: ['Digital Transformation', 'Custom SaaS'],
    year: 2024,
    location: 'Bulawayo, Zimbabwe',
    status: 'In Progress',
    featured: false,
    summary: 'Design and development of a medical aid insurance management system using open-source technologies.',
    challenge: [
      'Processing high volumes of medical insurance claims manually.',
      'Managing provider networks and membership eligibility in real-time.',
      'Need for secure data management of sensitive health information.'
    ],
    solution: [
      'Architected a specialized medical aid management system.',
      'Implemented automated claims adjudication and provider portal.',
      'Leveraged open-source technologies for a cost-effective, scalable solution.'
    ],
    outcomes: [
      'Reduced claim processing turnaround times.',
      'Improved accuracy in eligibility verification.',
      'Enhanced security and audit trails for patient data.'
    ],
    techStack: ['Node.js', 'PostgreSQL', 'React', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop'
  },
  {
    slug: 'uce-website',
    title: 'Website Development — United College of Education',
    client: 'United College of Education',
    industry: 'Education',
    services: ['Web Development'],
    year: 2023,
    location: 'Bulawayo, Zimbabwe',
    status: 'Live',
    featured: false,
    summary: 'Design and development of an institutional website to support academic visibility and communication.',
    challenge: [
      'Limited digital presence for institutional communication.',
      'Need for a modern platform to share academic news, resources, and portals.',
      'Requirement for a mobile-responsive design for students and parents.'
    ],
    solution: [
      'Designed and developed a modern institutional website.',
      'Implemented an easy-to-use CMS for staff updates.',
      'Optimized for local mobile connectivity and accessibility.'
    ],
    outcomes: [
      'Enhanced institutional visibility and professional brand image.',
      'Improved communication with students and the wider academic community.',
      'Scalable foundation for future digital academic services.'
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop'
  }
];
