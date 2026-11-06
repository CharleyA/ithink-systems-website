import type { Prisma, Product, ProductStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isUniqueViolation } from "@/lib/cms/http";
import { emptyToNull, isSafeImageRef, isSafeLink, slugify, SLUG_RE } from "@/lib/cms/schemas";

export type ProductWrite = {
  name: string;
  slug?: string | null;
  tagline: string;
  description: string;
  audience: string;
  status?: string | null;
  demoUrl?: string | null;
  image?: string | null;
  sortOrder?: number;
};

const publicOrder: Prisma.ProductOrderByWithRelationInput[] = [{ sortOrder: "asc" }, { name: "asc" }];

export function statusLabel(status: ProductStatus) {
  if (status === "LIVE") return "Live";
  if (status === "DEMO") return "Demo";
  return "Coming soon";
}

export function parseProductStatus(value: string | null | undefined): ProductStatus | undefined {
  if (!value || !value.trim()) return undefined;
  const key = value.trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (key === "live") return "LIVE";
  if (key === "demo") return "DEMO";
  if (key === "coming_soon") return "COMING_SOON";
  throw new Error("status must be Live, Demo, or Coming soon");
}

export function serializeProduct(product: Product) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    tagline: product.tagline,
    description: product.description,
    audience: product.audience,
    status: product.status,
    statusLabel: statusLabel(product.status),
    demoUrl: product.demoUrl,
    image: product.image,
    sortOrder: product.sortOrder,
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

function cleanImage(image: string | null) {
  if (image && !isSafeImageRef(image)) throw new Error("Image must be a site path or an http(s) URL");
  return image;
}

function cleanLink(value: string | null, label: string) {
  if (!value) return null;
  if (!isSafeLink(value)) throw new Error(`${label} must be an http(s) URL`);
  return value;
}

export async function listProducts() {
  return prisma.product.findMany({ orderBy: publicOrder });
}

export async function getProduct(slug: string) {
  return prisma.product.findUnique({ where: { slug } });
}

export async function listSitemapProducts() {
  return prisma.product.findMany({
    select: { slug: true, updatedAt: true },
    orderBy: { sortOrder: "asc" },
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
        tagline: input.tagline.trim(),
        description: input.description.trim(),
        audience: input.audience.trim(),
        status: parseProductStatus(input.status) ?? "LIVE",
        demoUrl: cleanLink(emptyToNull(input.demoUrl), "Demo link"),
        image: cleanImage(emptyToNull(input.image)),
        sortOrder: input.sortOrder ?? 0,
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
    if (input.tagline != null) data.tagline = input.tagline.trim();
    if (input.description != null) data.description = input.description.trim();
    if (input.audience != null) data.audience = input.audience.trim();
    if (input.status !== undefined) data.status = parseProductStatus(input.status) ?? existing.status;
    if (input.demoUrl !== undefined) data.demoUrl = cleanLink(emptyToNull(input.demoUrl), "Demo link");
    if (input.image !== undefined) data.image = cleanImage(emptyToNull(input.image));
    if (input.sortOrder !== undefined) data.sortOrder = input.sortOrder;

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
