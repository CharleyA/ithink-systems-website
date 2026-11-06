import type { Prisma, Product } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isUniqueViolation } from "@/lib/cms/http";
import { assertList, emptyToNull, isSafeImageRef, isSafeLink, slugify, SLUG_RE } from "@/lib/cms/schemas";

export type ProductWrite = {
  name: string;
  slug?: string | null;
  summary: string;
  description: string;
  features?: string[];
  images?: string[];
  category: string;
  priceCents?: number | null;
  priceLabel?: string | null;
  ctaUrl: string;
  demoUrl?: string | null;
  featured?: boolean;
  sortOrder?: number;
  published?: boolean;
};

const publicOrder: Prisma.ProductOrderByWithRelationInput[] = [
  { featured: "desc" },
  { sortOrder: "asc" },
  { name: "asc" },
];

export function serializeProduct(product: Product) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    summary: product.summary,
    description: product.description,
    features: product.features,
    images: product.images,
    category: product.category,
    priceCents: product.priceCents,
    priceLabel: product.priceLabel,
    ctaUrl: product.ctaUrl,
    demoUrl: product.demoUrl,
    featured: product.featured,
    sortOrder: product.sortOrder,
    published: product.published,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

function fail(error: string, status: number) {
  return { ok: false as const, error, status };
}

function cleanSlug(slug: string) {
  if (!SLUG_RE.test(slug)) throw new Error("Slug must use lowercase letters, numbers, and hyphens");
  return slug;
}

function cleanImages(images: string[]) {
  const list = assertList(images, "Images", 8, 500);
  for (const image of list) {
    if (!isSafeImageRef(image)) throw new Error("Each image must be an uploaded /media link or an http(s) URL");
  }
  return list;
}

function cleanLink(value: string | null, label: string) {
  if (!value) return null;
  if (!isSafeLink(value)) throw new Error(`${label} must be a site path or an http(s) URL`);
  return value;
}

export async function listPublishedProducts() {
  return prisma.product.findMany({
    where: { published: true },
    orderBy: publicOrder,
  });
}

export async function getPublishedProduct(slug: string) {
  return prisma.product.findFirst({ where: { slug, published: true } });
}

export async function featuredProducts(take = 3) {
  const featured = await prisma.product.findMany({
    where: { published: true, featured: true },
    orderBy: publicOrder,
    take,
  });
  if (featured.length >= take) return featured;
  const rest = await prisma.product.findMany({
    where: { published: true, id: { notIn: featured.map((item) => item.id) } },
    orderBy: publicOrder,
    take: take - featured.length,
  });
  return [...featured, ...rest];
}

export async function listSitemapProducts() {
  return prisma.product.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });
}

export async function listAdminProducts() {
  const rows = await prisma.product.findMany({ orderBy: publicOrder });
  return rows.map(serializeProduct);
}

export async function getAdminProduct(idOrSlug: string) {
  const product = await prisma.product.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
  });
  return product ? serializeProduct(product) : null;
}

export async function createProduct(input: ProductWrite) {
  try {
    const product = await prisma.product.create({
      data: {
        name: input.name.trim(),
        slug: cleanSlug(emptyToNull(input.slug) ?? slugify(input.name)),
        summary: input.summary.trim(),
        description: input.description.trim(),
        features: assertList(input.features ?? [], "Features", 20, 160),
        images: cleanImages(input.images ?? []),
        category: input.category.trim(),
        priceCents: input.priceCents ?? null,
        priceLabel: emptyToNull(input.priceLabel) ?? "Contact for pricing",
        ctaUrl: cleanLink(input.ctaUrl.trim(), "CTA link") || "/contact",
        demoUrl: cleanLink(emptyToNull(input.demoUrl), "Demo link"),
        featured: input.featured ?? false,
        sortOrder: input.sortOrder ?? 0,
        published: input.published ?? false,
      },
    });
    return { ok: true as const, product: serializeProduct(product) };
  } catch (error) {
    if (isUniqueViolation(error)) return fail("A product with that slug already exists", 409);
    if (error instanceof Error && !("code" in error)) return fail(error.message, 400);
    throw error;
  }
}

export async function updateProduct(idOrSlug: string, input: Partial<ProductWrite>) {
  const existing = await prisma.product.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
  });
  if (!existing) return fail("Not found", 404);

  try {
    const data: Prisma.ProductUpdateInput = {};
    if (input.name != null) data.name = input.name.trim();
    if (input.slug !== undefined) data.slug = cleanSlug(emptyToNull(input.slug) ?? slugify(input.name ?? existing.name));
    if (input.summary != null) data.summary = input.summary.trim();
    if (input.description != null) data.description = input.description.trim();
    if (input.features !== undefined) data.features = assertList(input.features, "Features", 20, 160);
    if (input.images !== undefined) data.images = cleanImages(input.images);
    if (input.category != null) data.category = input.category.trim();
    if (input.priceCents !== undefined) data.priceCents = input.priceCents;
    if (input.priceLabel !== undefined) data.priceLabel = emptyToNull(input.priceLabel) ?? "Contact for pricing";
    if (input.ctaUrl != null) data.ctaUrl = cleanLink(input.ctaUrl.trim(), "CTA link") || "/contact";
    if (input.demoUrl !== undefined) data.demoUrl = cleanLink(emptyToNull(input.demoUrl), "Demo link");
    if (input.featured !== undefined) data.featured = input.featured;
    if (input.sortOrder !== undefined) data.sortOrder = input.sortOrder;
    if (input.published !== undefined) data.published = input.published;

    const product = await prisma.product.update({ where: { id: existing.id }, data });
    return { ok: true as const, product: serializeProduct(product) };
  } catch (error) {
    if (isUniqueViolation(error)) return fail("A product with that slug already exists", 409);
    if (error instanceof Error && !("code" in error)) return fail(error.message, 400);
    throw error;
  }
}

export async function deleteProduct(idOrSlug: string) {
  const existing = await prisma.product.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
    select: { id: true },
  });
  if (!existing) return fail("Not found", 404);
  await prisma.product.delete({ where: { id: existing.id } });
  return { ok: true as const };
}
