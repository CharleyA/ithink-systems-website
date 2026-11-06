import { ProductEditor } from "@/components/admin/ProductEditor";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">New product</h1>
      <ProductEditor />
    </div>
  );
}
