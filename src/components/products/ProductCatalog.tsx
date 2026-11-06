"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/cms/format";

export type CatalogProduct = {
  slug: string;
  name: string;
  summary: string;
  category: string;
  features: string[];
  priceCents: number | null;
  priceLabel: string;
  image: string | null;
};

export function ProductCatalog({ products }: { products: CatalogProduct[] }) {
  return (
    <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product, index) => (
        <motion.article
          key={product.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: Math.min(index, 8) * 0.05 }}
          className="flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-all hover:shadow-md"
        >
          {product.image ? (
            <img src={product.image} alt="" className="h-44 w-full object-cover" />
          ) : (
            <div className="h-2 bg-[#EC5A24]" />
          )}
          <div className="flex flex-1 flex-col p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#EC5A24]">{product.category}</p>
            <h2 className="mt-2 text-xl font-bold text-foreground">
              <Link href={`/products/${product.slug}`} className="hover:text-[#EC5A24]">
                {product.name}
              </Link>
            </h2>
            <p className="mb-6 mt-3 leading-relaxed text-muted-foreground">{product.summary}</p>
            <ul className="mt-auto grid gap-3">
              {product.features.slice(0, 4).map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <CheckCircle className="h-4 w-4 flex-none text-[#EC5A24]" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center justify-between border-t pt-6">
              <p className="text-sm font-semibold text-[#5F5F5F]">{formatPrice(product)}</p>
              <Button variant="link" className="px-0 font-bold text-[#EC5A24]" asChild>
                <Link href={`/products/${product.slug}`}>
                  View product
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
