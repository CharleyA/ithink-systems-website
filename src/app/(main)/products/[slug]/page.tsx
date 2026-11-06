import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AskForQuote } from "@/components/marketing/AskForQuote";
import { renderMarkdown } from "@/lib/cms/markdown";
import { getProduct, statusLabel } from "@/lib/cms/products";
import { absoluteUrl, siteName } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Context): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.tagline,
    alternates: { canonical: absoluteUrl(`/products/${product.slug}`) },
    openGraph: {
      title: product.name,
      description: product.tagline,
      url: absoluteUrl(`/products/${product.slug}`),
      images: product.image ? [{ url: product.image }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Context) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const descriptionHtml = renderMarkdown(product.description);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline,
    brand: { "@type": "Brand", name: siteName },
    image: product.image ? [product.image] : undefined,
    category: product.audience,
  };

  return (
    <div className="bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-20">
        <div>
          <p className="text-sm font-semibold text-[#5F5F5F]">
            <Link href="/products" className="hover:text-[#EC5A24]">
              Products
            </Link>
            <span> · {statusLabel(product.status)}</span>
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-5xl">{product.name}</h1>
          <p className="mt-4 text-lg leading-8 text-[#5F5F5F]">{product.tagline}</p>
          <p className="mt-2 text-sm font-semibold text-[#1A1A1A]">For {product.audience}</p>
          <img
            src={product.image || "/images/products/placeholder.svg"}
            alt=""
            className="mt-8 aspect-square w-full rounded-3xl object-cover sm:aspect-[4/3]"
          />
          <div
            className="prose prose-neutral mt-8 max-w-none prose-a:text-[#EC5A24]"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </div>
        <aside className="h-fit rounded-3xl border bg-[#FDEEE8] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#EC5A24]">{statusLabel(product.status)}</p>
          <h2 className="mt-3 text-2xl font-bold text-[#1A1A1A]">Talk to us / Ask for a quote</h2>
          <p className="mt-3 text-sm leading-6 text-[#5F5F5F]">
            Tell us what you want to run. We reply on WhatsApp or by phone.
          </p>
          <div className="mt-6">
            <AskForQuote prominent />
          </div>
          {product.demoUrl && (
            <a
              href={product.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[#1A1A1A] underline"
            >
              Open the demo
            </a>
          )}
        </aside>
      </div>
    </div>
  );
}
