export const siteUrl = "https://ithinksys.co.zw";
export const siteName = "iThink Systems";
export const defaultTitle = "iThink Systems | Healthcare IT, ERPNext & Custom Software in Zimbabwe";
export const defaultDescription =
  "iThink Systems is a Bulawayo-based technology company delivering healthcare IT solutions, ERPNext implementation, education platforms, AI integration, and custom software development in Zimbabwe.";

export const defaultKeywords = [
  "iThink Systems",
  "IT company in Bulawayo",
  "IT company in Zimbabwe",
  "healthcare IT solutions Zimbabwe",
  "ERPNext implementation Zimbabwe",
  "custom software development Zimbabwe",
  "hospital management software Zimbabwe",
  "education software Zimbabwe",
  "AI integration Zimbabwe",
  "Bulawayo software company",
];

export function absoluteUrl(path = "") {
  if (!path || path === "/") return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: absoluteUrl("/images/logo.png"),
    description: defaultDescription,
    email: "info@ithinksys.co.zw",
    telephone: "+263772950432",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bulawayo",
      addressCountry: "ZW",
    },
    areaServed: [
      { "@type": "Country", name: "Zimbabwe" },
      { "@type": "Place", name: "Bulawayo" },
      { "@type": "Place", name: "Harare" },
    ],
    knowsAbout: [
      "Healthcare IT Solutions",
      "ERPNext Implementation",
      "Custom Software Development",
      "Education Platforms",
      "AI Integration",
      "Cloud Hosting",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/contact`,
      "query-input": "required name=search_term_string",
    },
  };
}


export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
