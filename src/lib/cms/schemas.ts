import { z } from "zod";

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function slugify(input: string) {
  const slug = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return slug || "item";
}

export function isSafeLink(value: string) {
  if (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\") && !value.includes(" ")) {
    return true;
  }
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function isSafeImageRef(value: string) {
  if (/^\/media\/[A-Za-z0-9_-]+$/.test(value)) return true;
  return isSafeLink(value) && !value.startsWith("/");
}

const stringList = z
  .union([z.array(z.string()), z.string()])
  .optional()
  .transform((value) => {
    if (value == null) return undefined;
    const raw = Array.isArray(value) ? value : value.split(/[\n,]/);
    return raw.map((item) => item.trim()).filter(Boolean);
  });

const statusField = z
  .enum(["DRAFT", "PUBLISHED", "draft", "published"])
  .optional()
  .transform((value) => (value ? (value.toUpperCase() as "DRAFT" | "PUBLISHED") : undefined));

export const postWriteSchema = z.object({
  title: z.string().trim().min(3).max(180),
  slug: z.string().trim().max(120).optional().nullable(),
  excerpt: z.string().trim().min(1).max(400),
  body: z.string().trim().min(1).max(100_000),
  coverImage: z.string().trim().max(500).optional().nullable(),
  category: z.string().trim().min(1).max(80),
  tags: stringList,
  author: z.string().trim().min(1).max(120).optional().nullable(),
  status: statusField,
  publishedAt: z.string().trim().optional().nullable(),
  seoTitle: z.string().trim().max(180).optional().nullable(),
  seoDescription: z.string().trim().max(300).optional().nullable(),
});

export const postPatchSchema = postWriteSchema.partial();

export const productWriteSchema = z.object({
  name: z.string().trim().min(2).max(160),
  slug: z.string().trim().max(120).optional().nullable(),
  summary: z.string().trim().min(1).max(400),
  description: z.string().trim().min(1).max(20_000),
  features: stringList,
  images: stringList,
  category: z.string().trim().min(1).max(80),
  priceCents: z.number().int().min(0).max(100_000_000).optional().nullable(),
  priceLabel: z.string().trim().min(1).max(80).optional().nullable(),
  ctaUrl: z.string().trim().min(1).max(500),
  demoUrl: z.string().trim().max(500).optional().nullable(),
  featured: z.boolean().optional(),
  sortOrder: z.number().int().min(0).max(10_000).optional(),
  published: z.boolean().optional(),
});

export const productPatchSchema = productWriteSchema.partial();

export function emptyToNull(value: string | null | undefined) {
  const trimmed = value?.trim() ?? "";
  return trimmed ? trimmed : null;
}

export function assertList(values: string[] | undefined, label: string, maxItems: number, maxLen: number) {
  const list = values ?? [];
  if (list.length > maxItems) {
    throw new Error(`${label} can include at most ${maxItems} items`);
  }
  for (const item of list) {
    if (item.length > maxLen) {
      throw new Error(`Each ${label.toLowerCase()} item must be ${maxLen} characters or fewer`);
    }
  }
  return list;
}
