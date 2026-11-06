import type { Metadata } from "next";
import { getSiteVariant } from "@/lib/site-variant";
import DemoHub from "@/components/DemoHub";
import { ProductsHub, type HubProduct } from "@/components/ProductsHub";
import { CorporateHome, type HomePost, type HomeProduct } from "@/components/CorporateHome";
import { absoluteUrl } from "@/lib/seo";
import { formatHarare, formatPrice } from "@/lib/cms/format";
import { latestPublicPosts } from "@/lib/cms/posts";
import { featuredProducts, listPublishedProducts } from "@/lib/cms/products";
import { products as staticProducts } from "@/content/products";

export const metadata: Metadata = {
  title: "Healthcare IT, ERPNext & Custom Software in Zimbabwe",
  description:
    "Bulawayo-based iThink Systems delivers healthcare IT solutions, ERPNext implementation, education platforms, AI integration, and custom software development in Zimbabwe.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

export default async function Page() {
  const variant = await getSiteVariant();

  if (variant === "demo") {
    return <DemoHub />;
  }

  if (variant === "products") {
    return <ProductsHub products={await loadHubProducts()} />;
  }

  const content = await loadHomeContent();
  return <CorporateHome latestPosts={content.posts} featuredProducts={content.products} />;
}

async function loadHubProducts(): Promise<HubProduct[]> {
  try {
    const rows = await listPublishedProducts();
    if (rows.length === 0) return staticHub();
    return rows.map((product) => ({
      id: product.slug,
      name: product.name,
      summary: product.summary,
      features: product.features,
      demoUrl: product.demoUrl,
      contactUrl: product.ctaUrl,
    }));
  } catch (error) {
    console.error(error);
    return staticHub();
  }
}

function staticHub(): HubProduct[] {
  return staticProducts.map((product) => ({
    id: product.id,
    name: product.name,
    summary: product.summary,
    features: product.features,
    demoUrl: product.demoUrl,
    contactUrl: product.contactUrl,
  }));
}

async function loadHomeContent(): Promise<{ posts: HomePost[]; products: HomeProduct[] }> {
  try {
    const [posts, products] = await Promise.all([latestPublicPosts(3), featuredProducts(3)]);
    return {
      posts: posts.map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        dateLabel: formatHarare(post.publishedAt),
        coverImage: post.coverImage,
      })),
      products: products.map((product) => ({
        slug: product.slug,
        name: product.name,
        summary: product.summary,
        category: product.category,
        priceLabel: formatPrice(product),
        image: product.images[0] ?? null,
      })),
    };
  } catch (error) {
    console.error(error);
    return { posts: [], products: [] };
  }
}
