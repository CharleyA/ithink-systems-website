import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/cms/format";
import { renderMarkdown } from "@/lib/cms/markdown";
import { getPublishedProduct } from "@/lib/cms/products";
import { absoluteUrl, siteName } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Context): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublishedProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.summary,
    alternates: { canonical: absoluteUrl(`/products/${product.slug}`) },
    openGraph: {
      title: product.name,
      description: product.summary,
      url: absoluteUrl(`/products/${product.slug}`),
      images: product.images[0] ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Context) {
  const { slug } = await params;
  const product = await getPublishedProduct(slug);
  if (!product) notFound();

  const descriptionHtml = renderMarkdown(product.description);
  const price = formatPrice(product);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    brand: { "@type": "Brand", name: siteName },
    category: product.category,
    image: product.images,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      ...(product.priceCents != null ? { price: (product.priceCents / 100).toFixed(2) } : {}),
      url: absoluteUrl(`/products/${product.slug}`),
    },
  };

  return (
    <div className="bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
        <div>
          <p className="text-sm font-semibold text-[#5F5F5F]">
            <Link href="/products" className="hover:text-[#EC5A24]">
              Products
            </Link>
            <span> · {product.category}</span>
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-5xl">{product.name}</h1>
          <p className="mt-6 text-lg leading-8 text-[#5F5F5F]">{product.summary}</p>
          {product.images[0] && (
            <img src={product.images[0]} alt="" className="mt-8 max-h-96 w-full rounded-3xl object-cover" />
          )}
          <div
            className="prose prose-neutral mt-10 max-w-none prose-a:text-[#EC5A24]"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </div>
        <aside className="h-fit rounded-3xl border bg-[#FDEEE8] p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#EC5A24]">Pricing</p>
          <p className="mt-2 text-3xl font-bold text-[#1A1A1A]">{price}</p>
          <ul className="mt-8 space-y-3">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm font-medium text-[#1A1A1A]">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-none text-[#EC5A24]" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <Button asChild>
              <Link href={product.ctaUrl}>Talk to us about this</Link>
            </Button>
            {product.demoUrl && (
              <Button variant="outline" asChild>
                <Link href={product.demoUrl}>Request a demo</Link>
              </Button>
            )}
          </div>
        </aside>
      </div>
      {product.images.length > 1 && (
        <div className="mx-auto grid max-w-7xl gap-4 px-6 pb-20 sm:grid-cols-2 lg:px-8">
          {product.images.slice(1).map((image) => (
            <img key={image} src={image} alt="" className="h-64 w-full rounded-2xl object-cover" />
          ))}
        </div>
      )}
    </div>
  );
}
