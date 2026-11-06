import Link from "next/link";
import { AskForQuote } from "@/components/marketing/AskForQuote";
import { SceneImage } from "@/components/media/SceneImage";
import { altForScene } from "@/lib/scene-images";

export type HubProduct = {
  id: string;
  name: string;
  tagline: string;
  audience: string;
  statusLabel: string;
  demoUrl: string | null;
  image: string | null;
};

export function ProductsHub({ products }: { products: HubProduct[] }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <span className="text-lg font-bold">iThink Systems</span>
          <Link href="https://ithinksys.co.zw" className="text-sm font-semibold text-[#EC5A24]">
            Corporate site
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-4xl font-bold tracking-tight text-[#1A1A1A]">Our products</h1>
        <p className="mt-4 max-w-2xl text-lg text-[#5F5F5F]">Systems you can open, try, or ask us to quote.</p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="flex flex-col overflow-hidden rounded-3xl border bg-white">
              {product.image && (
                <div className="relative aspect-video">
                  <SceneImage
                    src={product.image}
                    alt={altForScene(product.image, product.name)}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#EC5A24]">{product.statusLabel}</p>
                <h2 className="mt-2 text-2xl font-bold">{product.name}</h2>
                <p className="mt-3 text-[#5F5F5F]">{product.tagline}</p>
                <p className="mt-2 text-sm text-[#5F5F5F]">For {product.audience}</p>
                <div className="mt-6 flex flex-col gap-3">
                  {product.demoUrl && (
                    <a href={product.demoUrl} className="text-sm font-semibold text-[#1A1A1A] underline" target="_blank" rel="noopener noreferrer">
                      Open the demo
                    </a>
                  )}
                  <AskForQuote />
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
