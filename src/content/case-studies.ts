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
    year: 2025,
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
    links: [{ label: 'Visit Website', url: 'https://uce.ac.zw/' }],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop'
  },
  {
    slug: 'golden-60-website',
    title: 'Website Development — Golden 60',
    client: 'Golden 60',
    industry: 'Services',
    services: ['Web Development'],
    year: 2026,
    location: 'Zimbabwe',
    status: 'Live',
    featured: false,
    summary: 'Design and development of a modern corporate website to strengthen Golden 60\'s digital presence and brand visibility.',
    challenge: [
      'Need for a cleaner and more credible online presence.',
      'Requirement for a professional website that clearly communicates the organisation\'s brand and offering.',
      'Need for a responsive experience that works well across desktop and mobile devices.'
    ],
    solution: [
      'Designed and developed a polished corporate website aligned to the Golden 60 brand.',
      'Structured the site to present company information clearly and professionally.',
      'Implemented a responsive front-end for an accessible browsing experience across devices.'
    ],
    outcomes: [
      'Established a stronger digital presence for Golden 60.',
      'Improved the presentation of the organisation to clients, partners, and visitors online.',
      'Delivered a professional website foundation that supports brand visibility and engagement.'
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS'],
    links: [{ label: 'Visit Website', url: 'https://golden60.co.zw/' }],
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop'
  },
  {
    slug: 'dementia-association-website',
    title: 'Website Development — Dementia Association of Zimbabwe',
    client: 'Dementia Association of Zimbabwe',
    industry: 'Healthcare',
    services: ['Web Development'],
    year: 2026,
    location: 'Zimbabwe',
    status: 'Live',
    featured: false,
    summary: 'Design and development of a professional website to strengthen the organisation’s digital presence, public awareness, and stakeholder engagement.',
    challenge: [
      'Need for a credible and informative online presence for advocacy and awareness work.',
      'Requirement for a professional website that clearly communicates the organisation’s mission, programmes, and public value.',
      'Need for a responsive and accessible experience for visitors across devices.'
    ],
    solution: [
      'Designed and developed a modern organisational website aligned to the Dementia Association of Zimbabwe brand.',
      'Structured the site to present information clearly for supporters, partners, and the public.',
      'Implemented a responsive front-end to improve accessibility and user experience across desktop and mobile.'
    ],
    outcomes: [
      'Established a stronger digital presence for the organisation.',
      'Improved public access to information about dementia awareness and the association’s work.',
      'Delivered a professional platform that supports visibility, credibility, and engagement.'
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS'],
    links: [{ label: 'Visit Website', url: 'https://dementiazim.co.zw/' }],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop'
  },
  {
    slug: 'ipsas-demo-school-accounting-finance-platform',
    title: 'IPSAS Demo — School Accounting & Finance Platform',
    client: 'iThink Systems',
    industry: 'Education',
    services: ['Web Development', 'Custom SaaS', 'Accounting Systems'],
    year: 2026,
    location: 'Zimbabwe',
    status: 'Live',
    featured: false,
    summary: 'Design and development of a school accounting and finance demo platform showcasing digital financial management for educational institutions.',
    challenge: [
      'Need for a practical demonstration platform tailored to school finance operations.',
      'Requirement for a clear and professional interface to showcase accounting workflows for educational institutions.',
      'Need for a web-based system that demonstrates modern school financial management capabilities.'
    ],
    solution: [
      'Developed a web-based school accounting and finance demo platform for institutional use cases.',
      'Structured the platform to showcase finance, accounting, and reporting workflows relevant to schools.',
      'Implemented an accessible and professional interface suitable for demonstrations and stakeholder engagement.'
    ],
    outcomes: [
      'Provided a practical platform for demonstrating school finance digitisation.',
      'Improved the presentation of iThink Systems\' accounting capabilities for the education sector.',
      'Created a strong demo foundation for product discussions, onboarding, and stakeholder presentations.'
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS'],
    links: [{ label: 'Visit Website', url: 'https://ipsas-demo.ithinksys.co.zw/' }],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop'
  },
  {
    slug: 'clinicflow-patient-management-system',
    title: 'ClinicFlow — Patient Management System',
    client: 'iThink Systems',
    industry: 'Healthcare',
    services: ['Custom SaaS', 'Digital Transformation'],
    year: 2026,
    location: 'Zimbabwe',
    status: 'Live',
    featured: false,
    summary: 'Design and development of a patient management system to support digital clinic operations and streamlined healthcare workflows.',
    challenge: [
      'Need for a modern digital platform to support patient and clinic management workflows.',
      'Requirement for a clear and efficient system for presenting healthcare administration capabilities.',
      'Need for a web-based solution that improves process visibility and operational efficiency in clinical settings.'
    ],
    solution: [
      'Developed ClinicFlow as a digital patient management system for healthcare workflows.',
      'Structured the platform to support streamlined patient-related processes and operational visibility.',
      'Implemented a professional web interface suitable for healthcare demonstrations and product engagement.'
    ],
    outcomes: [
      'Provided a strong digital platform for demonstrating patient management workflows.',
      'Improved the presentation of iThink Systems\' healthcare technology capabilities.',
      'Created a scalable foundation for further healthcare workflow digitisation.'
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS'],
    links: [{ label: 'Visit Website', url: 'https://clinicflow.ithinksys.co.zw/' }],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop'
  }
];
