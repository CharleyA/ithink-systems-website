import type { Metadata } from "next";
import { getSiteVariant } from "@/lib/site-variant";
import DemoHub from "@/components/DemoHub";
import { ProductsHub, type HubProduct } from "@/components/ProductsHub";
import { CorporateHome, type HomePost } from "@/components/CorporateHome";
import { absoluteUrl } from "@/lib/seo";
import { formatHarare } from "@/lib/cms/format";
import { latestPublicPosts } from "@/lib/cms/posts";
import { listProducts, statusLabel } from "@/lib/cms/products";
import catalogue from "../../../prisma/product-seed.json";
import type { Product, ProductStatus } from "@prisma/client";

export const metadata: Metadata = {
  title: "Healthcare IT, ERPNext & Custom Software in Zimbabwe",
  description:
    "Bulawayo-based iThink Systems builds systems for schools, healthcare, business, councils, and hospitality.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

export default async function Page() {
  const variant = await getSiteVariant();

  if (variant === "demo") {
    return <DemoHub />;
  }

  const products = await loadProducts();

  if (variant === "products") {
    return <ProductsHub products={products.map(toHub)} />;
  }

  let posts: HomePost[] = [];
  try {
    const latest = await latestPublicPosts(3);
    posts = latest.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      dateLabel: formatHarare(post.publishedAt),
      coverImage: post.coverImage,
    }));
  } catch (error) {
    console.error(error);
  }

  return <CorporateHome latestPosts={posts} products={products} />;
}

function toHub(product: Product): HubProduct {
  return {
    id: product.slug,
    name: product.name,
    tagline: product.tagline,
    audience: product.audience,
    statusLabel: statusLabel(product.status),
    demoUrl: product.demoUrl,
    image: product.image,
  };
}

async function loadProducts(): Promise<Product[]> {
  try {
    const rows = await listProducts();
    if (rows.length > 0) return rows;
  } catch (error) {
    console.error(error);
  }
  return catalogue.map((item) => ({
    id: item.slug,
    name: item.name,
    slug: item.slug,
    tagline: item.tagline,
    description: item.description,
    audience: item.audience,
    status: item.status as ProductStatus,
    demoUrl: item.demoUrl,
    image: item.image,
    sortOrder: item.sortOrder,
    createdAt: new Date(0),
    updatedAt: new Date(0),
  }));
}
