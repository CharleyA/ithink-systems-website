import Link from "next/link";
import { statusLabel } from "@/lib/cms/products";
import type { Product } from "@prisma/client";
import { AskForQuote } from "@/components/marketing/AskForQuote";
import { SceneImage } from "@/components/media/SceneImage";
import { altForScene } from "@/lib/scene-images";

export function ProductCatalog({ products }: { products: Product[] }) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <article key={product.slug} className="flex flex-col overflow-hidden rounded-3xl border bg-white">
          {product.image && (
            <div className="relative aspect-video">
              <SceneImage
                src={product.image}
                alt={altForScene(product.image, `${product.name}`)}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#EC5A24]">{statusLabel(product.status)}</p>
            <h2 className="mt-2 text-xl font-bold text-[#1A1A1A]">
              <Link href={`/products/${product.slug}`} className="hover:text-[#EC5A24]">
                {product.name}
              </Link>
            </h2>
            <p className="mt-2 text-sm font-semibold text-[#5F5F5F]">{product.tagline}</p>
            <p className="mt-3 flex-1 text-sm leading-6 text-[#5F5F5F]">{product.audience}</p>
            <div className="mt-6">
              <AskForQuote />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
