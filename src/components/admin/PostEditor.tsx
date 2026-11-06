"use client";

import { useActionState, useState } from "react";
import { previewMarkdownAction, savePostAction, uploadAdminImage, type ActionState } from "@/app/admin/actions";

export type PostEditorValues = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage: string;
  ogImage: string;
  category: string;
  tags: string;
  author: string;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
};

const empty: PostEditorValues = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  coverImage: "",
  ogImage: "",
  category: "Education",
  tags: "",
  author: "iThink Systems",
  status: "DRAFT",
  publishedAt: "",
  seoTitle: "",
  seoDescription: "",
};

export function PostEditor({ initial }: { initial?: PostEditorValues }) {
  const values = initial ?? empty;
  const [state, action, pending] = useActionState(savePostAction, {} as ActionState);
  const [body, setBody] = useState(values.body);
  const [cover, setCover] = useState(values.coverImage);
  const [ogImage, setOgImage] = useState(values.ogImage);
  const [preview, setPreview] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function loadPreview() {
    setShowPreview(true);
    setPreview(await previewMarkdownAction(body));
  }

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
      {values.id && <input type="hidden" name="id" value={values.id} />}
      <input type="hidden" name="coverImage" value={cover} />
      <input type="hidden" name="ogImage" value={ogImage} />
      <div className="space-y-4 rounded-3xl border bg-white p-6">
        {state.error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
        <label className="block text-sm font-semibold">
          Title
          <input name="title" required defaultValue={values.title} className="mt-1 w-full rounded-xl border px-3 py-2" />
        </label>
        <label className="block text-sm font-semibold">
          Slug
          <input name="slug" defaultValue={values.slug} placeholder="auto from title" className="mt-1 w-full rounded-xl border px-3 py-2" />
        </label>
        <label className="block text-sm font-semibold">
          Excerpt
          <textarea name="excerpt" required defaultValue={values.excerpt} rows={3} className="mt-1 w-full rounded-xl border px-3 py-2" />
        </label>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-semibold">Body (Markdown)</span>
            <button type="button" className="text-sm font-semibold text-[#EC5A24]" onClick={loadPreview}>
              {showPreview ? "Refresh preview" : "Preview"}
            </button>
          </div>
          <textarea
            name="body"
            required
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={18}
            className="w-full rounded-xl border px-3 py-2 font-mono text-sm"
          />
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {["## ", "**bold**", "- ", "[link](https://)"].map((snippet) => (
              <button
                key={snippet}
                type="button"
                className="rounded-full bg-[#FDEEE8] px-2 py-1 font-semibold"
                onClick={() => setBody((current) => `${current}${current.endsWith("\n") || !current ? "" : "\n"}${snippet}`)}
              >
                {snippet.trim()}
              </button>
            ))}
          </div>
        </div>
        {showPreview && (
          <div
            className="prose prose-neutral max-w-none rounded-2xl bg-[#FDEEE8]/50 p-4 prose-a:text-[#EC5A24]"
            dangerouslySetInnerHTML={{ __html: preview || "<p>Nothing to preview yet.</p>" }}
          />
        )}
      </div>
      <div className="space-y-4">
        <div className="space-y-4 rounded-3xl border bg-white p-6">
          <label className="block text-sm font-semibold">
            Status
            <select name="status" defaultValue={values.status} className="mt-1 w-full rounded-xl border px-3 py-2">
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </label>
          <label className="block text-sm font-semibold">
            Publish time (Harare)
            <input type="datetime-local" name="publishedAt" defaultValue={values.publishedAt} className="mt-1 w-full rounded-xl border px-3 py-2" />
          </label>
          <p className="text-xs leading-5 text-[#5F5F5F]">
            A published post with a future time stays hidden until then. Leave this blank to publish immediately.
          </p>
          <label className="block text-sm font-semibold">
            Category
            <input name="category" required defaultValue={values.category} className="mt-1 w-full rounded-xl border px-3 py-2" />
          </label>
          <label className="block text-sm font-semibold">
            Tags
            <input name="tags" defaultValue={values.tags} placeholder="erp, healthcare" className="mt-1 w-full rounded-xl border px-3 py-2" />
          </label>
          <label className="block text-sm font-semibold">
            Author
            <input name="author" defaultValue={values.author} className="mt-1 w-full rounded-xl border px-3 py-2" />
          </label>
        </div>
        <div className="space-y-3 rounded-3xl border bg-white p-6">
          <p className="text-sm font-semibold">Cover image</p>
          {cover && <img src={cover} alt="" className="h-32 w-full rounded-xl object-cover" />}
          <p className="break-all text-xs text-[#5F5F5F]">{cover || "No image yet"}</p>
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
              if (result.url) setCover(result.url);
              else setUploadError(result.error || "Upload failed");
            }}
          />
          <label className="block text-sm font-semibold">
            Or paste a URL
            <input
              value={cover}
              onChange={(event) => setCover(event.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-sm font-semibold">
            Open Graph image
            <input
              value={ogImage}
              onChange={(event) => setOgImage(event.target.value)}
              placeholder="Defaults to the cover when empty"
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
            />
          </label>
        </div>
        <details className="rounded-3xl border bg-white p-6">
          <summary className="cursor-pointer text-sm font-semibold">SEO</summary>
          <label className="mt-4 block text-sm font-semibold">
            SEO title
            <input name="seoTitle" defaultValue={values.seoTitle} className="mt-1 w-full rounded-xl border px-3 py-2" />
          </label>
          <label className="mt-3 block text-sm font-semibold">
            SEO description
            <textarea name="seoDescription" defaultValue={values.seoDescription} rows={3} className="mt-1 w-full rounded-xl border px-3 py-2" />
          </label>
        </details>
        <button type="submit" disabled={pending} className="w-full rounded-xl bg-[#EC5A24] px-4 py-3 font-semibold text-white disabled:opacity-60">
          {pending ? "Saving..." : "Save post"}
        </button>
      </div>
    </form>
  );
}
