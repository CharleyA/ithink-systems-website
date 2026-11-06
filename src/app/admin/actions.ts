"use server";

import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { auth } from "@/lib/auth";
import { renderMarkdown } from "@/lib/cms/markdown";
import { saveImageUpload } from "@/lib/cms/media";
import { createPost, deletePost, updatePost } from "@/lib/cms/posts";
import { createProduct, deleteProduct, updateProduct } from "@/lib/cms/products";
import { revalidateContent } from "@/lib/cms/revalidate";
import { postWriteSchema, productWriteSchema } from "@/lib/cms/schemas";

export type ActionState = { error?: string; url?: string };

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.isAdmin) redirect("/admin/login");
}

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

function issue(error: unknown) {
  if (error instanceof ZodError) return error.issues[0]?.message || "Invalid input";
  return "Invalid input";
}

export async function previewMarkdownAction(markdown: string) {
  await requireAdmin();
  return renderMarkdown(String(markdown || "").slice(0, 100_000));
}

export async function uploadAdminImage(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose an image" };
  const result = await saveImageUpload(file);
  if (!result.ok) return { error: result.error };
  return { url: result.media.url };
}

export async function savePostAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const id = field(formData, "id").trim();
  const payload = {
    title: field(formData, "title"),
    slug: field(formData, "slug"),
    excerpt: field(formData, "excerpt"),
    body: field(formData, "body"),
    coverImage: field(formData, "coverImage"),
    ogImage: field(formData, "ogImage"),
    category: field(formData, "category"),
    tags: field(formData, "tags"),
    author: field(formData, "author"),
    status: field(formData, "status") || "DRAFT",
    publishedAt: field(formData, "publishedAt"),
    seoTitle: field(formData, "seoTitle"),
    seoDescription: field(formData, "seoDescription"),
  };

  const parsed = postWriteSchema.safeParse(payload);
  if (!parsed.success) return { error: issue(parsed.error) };

  const result = id
    ? await updatePost(id, { ...parsed.data, tags: parsed.data.tags ?? [] })
    : await createPost({ ...parsed.data, tags: parsed.data.tags ?? [], status: parsed.data.status ?? "DRAFT" });
  if (!result.ok) return { error: result.error };
  revalidateContent();
  redirect(`/admin/posts/${result.post.id}?saved=1`);
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();
  const id = field(formData, "id").trim();
  const result = await deletePost(id);
  if (!result.ok) redirect(`/admin/posts/${id}?error=${encodeURIComponent(result.error)}`);
  revalidateContent();
  redirect("/admin/posts");
}

export async function saveProductAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const id = field(formData, "id").trim();
  const sortRaw = field(formData, "sortOrder").trim();
  const sortOrder = sortRaw ? Number(sortRaw) : 0;
  if (!Number.isInteger(sortOrder) || sortOrder < 0) {
    return { error: "Sort order must be a whole number" };
  }

  const payload = {
    name: field(formData, "name"),
    slug: field(formData, "slug"),
    tagline: field(formData, "tagline"),
    description: field(formData, "description"),
    audience: field(formData, "audience"),
    status: field(formData, "status") || "Live",
    demoUrl: field(formData, "demoUrl"),
    image: field(formData, "image"),
    sortOrder,
  };

  const parsed = productWriteSchema.safeParse(payload);
  if (!parsed.success) return { error: issue(parsed.error) };
  const result = id ? await updateProduct(id, parsed.data) : await createProduct(parsed.data);
  if (!result.ok) return { error: result.error };
  revalidateContent();
  redirect(`/admin/products/${result.product.id}?saved=1`);
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin();
  const id = field(formData, "id").trim();
  const result = await deleteProduct(id);
  if (!result.ok) redirect(`/admin/products/${id}?error=${encodeURIComponent(result.error)}`);
  revalidateContent();
  redirect("/admin/products");
}
