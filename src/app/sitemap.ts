import type { MetadataRoute } from "next";
import { listSitemapPosts } from "@/lib/cms/posts";
import { listSitemapProducts } from "@/lib/cms/products";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ithinksys.co.zw";
  const routes = [
    "",
    "/blog",
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

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/blog" ? "daily" : "weekly",
    priority: route === "" ? 1 : route === "/blog" ? 0.8 : 0.7,
  }));

  try {
    const [posts, products] = await Promise.all([listSitemapPosts(), listSitemapProducts()]);
    return [
      ...staticEntries,
      ...posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
      ...products.map((product) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: product.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
    ];
  } catch (error) {
    console.error("Sitemap content lookup failed", error);
    return staticEntries;
  }
}
