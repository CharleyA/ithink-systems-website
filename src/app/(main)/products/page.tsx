import { ProductCatalog } from "@/components/products/ProductCatalog";
import { listProducts } from "@/lib/cms/products";
import catalogue from "../../../../prisma/product-seed.json";
import type { Product, ProductStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

export { metadata } from "./metadata";

export default async function ProductsPage() {
  let products: Product[] = [];
  try {
    products = await listProducts();
  } catch (error) {
    console.error(error);
    products = catalogue.map((item) => ({
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

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#EC5A24]">Catalogue</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-5xl">Our products</h1>
          <p className="mt-5 text-lg leading-8 text-[#5F5F5F]">
            Systems for schools, clinics, businesses, lodges, and the teams that look after them. Ask for a quote and we will talk through what fits.
          </p>
        </div>
        {products.length === 0 ? (
          <p className="mt-16 text-[#5F5F5F]">Products will appear here once they are in the catalogue.</p>
        ) : (
          <ProductCatalog products={products} />
        )}
      </div>
    </div>
  );
}
