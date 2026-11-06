import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteProductAction } from "@/app/admin/actions";
import { ProductEditor } from "@/components/admin/ProductEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit product</h1>
        <div className="flex items-center gap-4">
          {product.published && (
            <Link href={`/products/${product.slug}`} className="text-sm font-semibold text-[#EC5A24]">
              View
            </Link>
          )}
          <form action={deleteProductAction}>
            <input type="hidden" name="id" value={product.id} />
            <button type="submit" className="text-sm font-semibold text-red-700">
              Delete
            </button>
          </form>
        </div>
      </div>
      {query.saved && <p className="mb-4 rounded-xl bg-white px-3 py-2 text-sm">Saved.</p>}
      {query.error && <p className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{query.error}</p>}
      <ProductEditor
        initial={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          summary: product.summary,
          description: product.description,
          features: product.features.join("\n"),
          images: product.images.join("\n"),
          category: product.category,
          price: product.priceCents == null ? "" : (product.priceCents / 100).toFixed(2),
          priceLabel: product.priceLabel,
          ctaUrl: product.ctaUrl,
          demoUrl: product.demoUrl ?? "",
          featured: product.featured,
          sortOrder: product.sortOrder,
          published: product.published,
        }}
      />
    </div>
  );
}
