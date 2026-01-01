import { notFound } from "next/navigation";
import { caseStudies } from "@/content/case-studies";
import CaseStudyDetailContent from "@/components/case-studies/CaseStudyDetailContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyDetailContent caseStudy={caseStudy} />;
}
