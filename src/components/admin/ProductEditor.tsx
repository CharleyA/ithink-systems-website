"use client";

import { useActionState, useState } from "react";
import { saveProductAction, uploadAdminImage, type ActionState } from "@/app/admin/actions";

export type ProductEditorValues = {
  id?: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  audience: string;
  status: "LIVE" | "DEMO" | "COMING_SOON";
  demoUrl: string;
  image: string;
  sortOrder: number;
};

const empty: ProductEditorValues = {
  name: "",
  slug: "",
  tagline: "",
  description: "",
  audience: "",
  status: "LIVE",
  demoUrl: "",
  image: "",
  sortOrder: 0,
};

export function ProductEditor({ initial }: { initial?: ProductEditorValues }) {
  const values = initial ?? empty;
  const [state, action, pending] = useActionState(saveProductAction, {} as ActionState);
  const [image, setImage] = useState(values.image);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      {values.id && <input type="hidden" name="id" value={values.id} />}
      <input type="hidden" name="image" value={image} />
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
          Tagline
          <input name="tagline" required defaultValue={values.tagline} className="mt-1 w-full rounded-xl border px-3 py-2" />
        </label>
        <label className="block text-sm font-semibold">
          Description (Markdown)
          <textarea name="description" required defaultValue={values.description} rows={8} className="mt-1 w-full rounded-xl border px-3 py-2" />
        </label>
        <label className="block text-sm font-semibold">
          Audience
          <input name="audience" required defaultValue={values.audience} className="mt-1 w-full rounded-xl border px-3 py-2" />
        </label>
      </div>
      <div className="space-y-4">
        <div className="space-y-4 rounded-3xl border bg-white p-6">
          <label className="block text-sm font-semibold">
            Status
            <select name="status" defaultValue={values.status} className="mt-1 w-full rounded-xl border px-3 py-2">
              <option value="LIVE">Live</option>
              <option value="DEMO">Demo</option>
              <option value="COMING_SOON">Coming soon</option>
            </select>
          </label>
          <label className="block text-sm font-semibold">
            Demo URL
            <input name="demoUrl" defaultValue={values.demoUrl} className="mt-1 w-full rounded-xl border px-3 py-2" />
          </label>
          <label className="block text-sm font-semibold">
            Sort order
            <input name="sortOrder" type="number" min={0} defaultValue={values.sortOrder} className="mt-1 w-full rounded-xl border px-3 py-2" />
          </label>
          <p className="text-xs leading-5 text-[#5F5F5F]">Ask for a quote links to the contact page. There is no price field, and the phone number is not stored on the product.</p>
        </div>
        <div className="space-y-3 rounded-3xl border bg-white p-6">
          <p className="text-sm font-semibold">Image</p>
          {image && <img src={image} alt="" className="h-36 w-full rounded-xl object-cover" />}
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
              if (result.url) setImage(result.url);
              else setUploadError(result.error || "Upload failed");
            }}
          />
          <label className="block text-sm font-semibold">
            Or paste a path or URL
            <input value={image} onChange={(event) => setImage(event.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
          </label>
        </div>
        <button type="submit" disabled={pending} className="w-full rounded-xl bg-[#EC5A24] px-4 py-3 font-semibold text-white disabled:opacity-60">
          {pending ? "Saving..." : "Save product"}
        </button>
      </div>
    </form>
  );
}
