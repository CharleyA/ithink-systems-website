import { ProductCatalog } from "@/components/products/ProductCatalog";
import { listPublishedProducts } from "@/lib/cms/products";

export const dynamic = "force-dynamic";

export { metadata } from "./metadata";

export default async function ProductsPage() {
  let products: Awaited<ReturnType<typeof listPublishedProducts>> = [];
  let unavailable = false;
  try {
    products = await listPublishedProducts();
  } catch (error) {
    console.error(error);
    unavailable = true;
  }

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#EC5A24]">Catalogue</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">Our Products</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Purpose-built digital products designed for real institutional and business operations in Zimbabwe and beyond.
          </p>
        </div>
        {unavailable ? (
          <p className="mt-16 text-center text-muted-foreground">The catalogue is temporarily unavailable.</p>
        ) : products.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">Products will appear here once they are published.</p>
        ) : (
          <ProductCatalog
            products={products.map((product) => ({
              slug: product.slug,
              name: product.name,
              summary: product.summary,
              category: product.category,
              features: product.features,
              priceCents: product.priceCents,
              priceLabel: product.priceLabel,
              image: product.images[0] ?? null,
            }))}
          />
        )}
      </div>
    </div>
  );
}
