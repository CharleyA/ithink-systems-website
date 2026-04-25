import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ithinksys.co.zw";
  const routes = [
    "",
    "/services",
    "/products",
    "/solutions",
    "/case-studies",
    "/about",
    "/contact",
    "/healthcare-it-solutions-zimbabwe",
    "/erpnext-implementation-zimbabwe",
    "/it-company-bulawayo",
    "/custom-software-development-zimbabwe",
    "/website-development-zimbabwe",
    "/application-development-zimbabwe",
    "/system-development-zimbabwe",
    "/hosting-services-zimbabwe",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
