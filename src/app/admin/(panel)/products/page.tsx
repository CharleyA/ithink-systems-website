import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { name: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/admin/products/new" className="rounded-xl bg-[#EC5A24] px-4 py-2 text-sm font-semibold text-white">
          New product
        </Link>
      </div>
      <div className="mt-6 overflow-hidden rounded-3xl border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#FDEEE8]">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Visibility</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-3">
                  <Link href={`/admin/products/${product.id}`} className="font-semibold hover:text-[#EC5A24]">
                    {product.name}
                  </Link>
                </td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3 text-[#5F5F5F]">
                  {product.published ? "Published" : "Hidden"}
                  {product.featured ? " · Featured" : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
