import type { Post, PostStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { fromHarareInput } from "@/lib/cms/format";
import { isUniqueViolation } from "@/lib/cms/http";
import { assertList, emptyToNull, isSafeImageRef, slugify, SLUG_RE } from "@/lib/cms/schemas";

export type PostWrite = {
  title: string;
  slug?: string | null;
  excerpt: string;
  body: string;
  coverImage?: string | null;
  category: string;
  tags?: string[];
  author?: string | null;
  status?: PostStatus;
  publishedAt?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

export function publicPostWhere(now = new Date(), category?: string): Prisma.PostWhereInput {
  return {
    status: "PUBLISHED",
    OR: [{ publishedAt: null }, { publishedAt: { lte: now } }],
    ...(category ? { category } : {}),
  };
}

export function serializePost(post: Post) {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    body: post.body,
    coverImage: post.coverImage,
    category: post.category,
    tags: post.tags,
    author: post.author,
    status: post.status,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    scheduled: post.status === "PUBLISHED" && !!post.publishedAt && post.publishedAt.getTime() > Date.now(),
  };
}

const publicSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  coverImage: true,
  category: true,
  tags: true,
  author: true,
  publishedAt: true,
  seoTitle: true,
  seoDescription: true,
  updatedAt: true,
} satisfies Prisma.PostSelect;

function fail(error: string, status: number) {
  return { ok: false as const, error, status };
}

function cleanSlug(slug: string) {
  if (!SLUG_RE.test(slug)) {
    throw new Error("Slug must use lowercase letters, numbers, and hyphens");
  }
  return slug;
}

function cleanCover(cover: string | null) {
  if (cover && !isSafeImageRef(cover)) {
    throw new Error("Cover image must be an uploaded /media link or an http(s) URL");
  }
  return cover;
}

export async function listPublicPosts(options: { page: number; pageSize: number; category?: string }) {
  const where = publicPostWhere(new Date(), options.category);
  const [total, rows] = await Promise.all([
    prisma.post.count({ where }),
    prisma.post.findMany({
      where,
      select: publicSelect,
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      skip: (options.page - 1) * options.pageSize,
      take: options.pageSize,
    }),
  ]);
  return { total, rows };
}

export async function listPublicCategories() {
  const rows = await prisma.post.findMany({
    where: publicPostWhere(),
    select: { category: true },
    distinct: ["category"],
    orderBy: { category: "asc" },
  });
  return rows.map((row) => row.category);
}

export async function getPublicPost(slug: string) {
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return null;
  if (post.status !== "PUBLISHED") return null;
  if (post.publishedAt && post.publishedAt.getTime() > Date.now()) return null;
  return post;
}

export async function latestPublicPosts(take = 3) {
  return prisma.post.findMany({
    where: publicPostWhere(),
    select: publicSelect,
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take,
  });
}

export async function listSitemapPosts() {
  return prisma.post.findMany({
    where: publicPostWhere(),
    select: { slug: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });
}

export async function listAdminPosts(options: { page: number; pageSize: number; status?: PostStatus }) {
  const where = options.status ? { status: options.status } : {};
  const [total, rows] = await Promise.all([
    prisma.post.count({ where }),
    prisma.post.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (options.page - 1) * options.pageSize,
      take: options.pageSize,
    }),
  ]);
  return { data: rows.map(serializePost), page: options.page, pageSize: options.pageSize, total };
}

export async function getAdminPost(idOrSlug: string) {
  const post = await prisma.post.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
  });
  return post ? serializePost(post) : null;
}

export async function createPost(input: PostWrite) {
  try {
    const status = input.status ?? "DRAFT";
    const publishedAt = resolvePublishedAt(status, input.publishedAt, null, input.publishedAt !== undefined);
    const post = await prisma.post.create({
      data: {
        title: input.title.trim(),
        slug: cleanSlug(emptyToNull(input.slug) ?? slugify(input.title)),
        excerpt: input.excerpt.trim(),
        body: input.body.trim(),
        coverImage: cleanCover(emptyToNull(input.coverImage)),
        category: input.category.trim(),
        tags: assertList(input.tags ?? [], "Tags", 12, 40),
        author: emptyToNull(input.author) ?? "iThink Systems",
        status,
        publishedAt,
        seoTitle: emptyToNull(input.seoTitle),
        seoDescription: emptyToNull(input.seoDescription),
      },
    });
    return { ok: true as const, post: serializePost(post) };
  } catch (error) {
    if (isUniqueViolation(error)) return fail("A post with that slug already exists", 409);
    if (error instanceof Error && !("code" in error)) return fail(error.message, 400);
    throw error;
  }
}

export async function updatePost(idOrSlug: string, input: Partial<PostWrite>) {
  const existing = await prisma.post.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
  });
  if (!existing) return fail("Not found", 404);

  try {
    const data: Prisma.PostUpdateInput = {};
    if (input.title != null) data.title = input.title.trim();
    if (input.slug !== undefined) {
      data.slug = cleanSlug(emptyToNull(input.slug) ?? slugify(input.title ?? existing.title));
    }
    if (input.excerpt != null) data.excerpt = input.excerpt.trim();
    if (input.body != null) data.body = input.body.trim();
    if (input.coverImage !== undefined) data.coverImage = cleanCover(emptyToNull(input.coverImage));
    if (input.category != null) data.category = input.category.trim();
    if (input.tags !== undefined) data.tags = assertList(input.tags, "Tags", 12, 40);
    if (input.author !== undefined) data.author = emptyToNull(input.author) ?? "iThink Systems";
    if (input.seoTitle !== undefined) data.seoTitle = emptyToNull(input.seoTitle);
    if (input.seoDescription !== undefined) data.seoDescription = emptyToNull(input.seoDescription);

    const status = input.status ?? existing.status;
    if (input.status) data.status = input.status;
    if (input.publishedAt !== undefined || input.status) {
      const explicit = input.publishedAt !== undefined;
      data.publishedAt = resolvePublishedAt(
        status,
        explicit ? input.publishedAt : existing.publishedAt?.toISOString() ?? null,
        existing.publishedAt,
        explicit,
      );
    }

    const post = await prisma.post.update({ where: { id: existing.id }, data });
    return { ok: true as const, post: serializePost(post) };
  } catch (error) {
    if (isUniqueViolation(error)) return fail("A post with that slug already exists", 409);
    if (error instanceof Error && !("code" in error)) return fail(error.message, 400);
    throw error;
  }
}

export async function deletePost(idOrSlug: string) {
  const existing = await prisma.post.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
    select: { id: true },
  });
  if (!existing) return fail("Not found", 404);
  await prisma.post.delete({ where: { id: existing.id } });
  return { ok: true as const };
}

function resolvePublishedAt(
  status: PostStatus,
  raw: string | null | undefined,
  existing: Date | null,
  explicit: boolean,
) {
  if (!explicit) {
    if (status === "PUBLISHED") return existing ?? new Date();
    return existing;
  }
  const parsed = raw ? fromHarareInput(raw) : null;
  if (status === "PUBLISHED") return parsed ?? new Date();
  return parsed;
}
