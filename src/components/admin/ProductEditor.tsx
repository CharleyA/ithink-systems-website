"use client";

import { useActionState, useState } from "react";
import { saveProductAction, uploadAdminImage, type ActionState } from "@/app/admin/actions";

export type ProductEditorValues = {
  id?: string;
  name: string;
  slug: string;
  summary: string;
  description: string;
  features: string;
  images: string;
  category: string;
  price: string;
  priceLabel: string;
  ctaUrl: string;
  demoUrl: string;
  featured: boolean;
  sortOrder: number;
  published: boolean;
};

const empty: ProductEditorValues = {
  name: "",
  slug: "",
  summary: "",
  description: "",
  features: "",
  images: "",
  category: "Healthcare",
  price: "",
  priceLabel: "Contact for pricing",
  ctaUrl: "/contact",
  demoUrl: "",
  featured: false,
  sortOrder: 0,
  published: false,
};

export function ProductEditor({ initial }: { initial?: ProductEditorValues }) {
  const values = initial ?? empty;
  const [state, action, pending] = useActionState(saveProductAction, {} as ActionState);
  const [images, setImages] = useState(values.images);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      {values.id && <input type="hidden" name="id" value={values.id} />}
      <input type="hidden" name="images" value={images} />
      <div className="space-y-4 rounded-3xl border bg-white p-6">
        {state.error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
        <label className="block text-sm font-semibold">
          Name
          <input name="name" required defaultValue={values.name} className="mt-1 w-full rounded-xl border px-3 py-2" />
        </label>
        <label className="block text-sm font-semibold">
          Slug
          <input name="slug" defaultValue={values.slug} className="mt-1 w-full rounded-xl border px-3 py-2" />
        </label>
        <label className="block text-sm font-semibold">
          Summary
          <textarea name="summary" required defaultValue={values.summary} rows={3} className="mt-1 w-full rounded-xl border px-3 py-2" />
        </label>
        <label className="block text-sm font-semibold">
          Description (Markdown)
          <textarea name="description" required defaultValue={values.description} rows={10} className="mt-1 w-full rounded-xl border px-3 py-2" />
        </label>
        <label className="block text-sm font-semibold">
          Features (one per line)
          <textarea name="features" defaultValue={values.features} rows={5} className="mt-1 w-full rounded-xl border px-3 py-2" />
        </label>
      </div>
      <div className="space-y-4">
        <div className="space-y-4 rounded-3xl border bg-white p-6">
          <label className="block text-sm font-semibold">
            Category
            <input name="category" required defaultValue={values.category} className="mt-1 w-full rounded-xl border px-3 py-2" />
          </label>
          <label className="block text-sm font-semibold">
            Price in USD
            <input name="price" defaultValue={values.price} placeholder="Leave blank to use the label" className="mt-1 w-full rounded-xl border px-3 py-2" />
          </label>
          <label className="block text-sm font-semibold">
            Price label
            <input name="priceLabel" defaultValue={values.priceLabel} className="mt-1 w-full rounded-xl border px-3 py-2" />
          </label>
          <label className="block text-sm font-semibold">
            CTA link
            <input name="ctaUrl" required defaultValue={values.ctaUrl} className="mt-1 w-full rounded-xl border px-3 py-2" />
          </label>
          <label className="block text-sm font-semibold">
            Demo link
            <input name="demoUrl" defaultValue={values.demoUrl} className="mt-1 w-full rounded-xl border px-3 py-2" />
          </label>
          <label className="block text-sm font-semibold">
            Sort order
            <input name="sortOrder" type="number" min={0} defaultValue={values.sortOrder} className="mt-1 w-full rounded-xl border px-3 py-2" />
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" name="featured" defaultChecked={values.featured} />
            Featured on the home page
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" name="published" defaultChecked={values.published} />
            Published
          </label>
        </div>
        <div className="space-y-3 rounded-3xl border bg-white p-6">
          <p className="text-sm font-semibold">Images</p>
          <textarea
            value={images}
            onChange={(event) => setImages(event.target.value)}
            rows={4}
            className="w-full rounded-xl border px-3 py-2 text-sm"
            placeholder="One /media or https URL per line"
          />
          {uploadError && <p className="text-sm text-red-700">{uploadError}</p>}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="text-sm"
            disabled={uploading}
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              setUploading(true);
              setUploadError("");
              const data = new FormData();
              data.set("file", file);
              const result = await uploadAdminImage({}, data);
              setUploading(false);
              if (!result.url) {
                setUploadError(result.error || "Upload failed");
                return;
              }
              setImages((current) => {
                const lines = current.split("\n").map((line) => line.trim()).filter(Boolean);
                return lines.includes(result.url!) ? current : [...lines, result.url!].join("\n");
              });
            }}
          />
        </div>
        <button type="submit" disabled={pending} className="w-full rounded-xl bg-[#EC5A24] px-4 py-3 font-semibold text-white disabled:opacity-60">
          {pending ? "Saving..." : "Save product"}
        </button>
      </div>
    </form>
  );
}
