import { ZodError } from "zod";
import { json, readJson, requireApiToken, validationError } from "@/lib/cms/http";
import { createPost, listAdminPosts } from "@/lib/cms/posts";
import { revalidateContent } from "@/lib/cms/revalidate";
import { pullInlineImages } from "@/lib/cms/inline-image";
import { postWriteSchema } from "@/lib/cms/schemas";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const denied = requireApiToken(req);
  if (denied) return denied;

  const url = new URL(req.url);
  const page = clampInt(url.searchParams.get("page"), 1, 1, 10_000);
  const pageSize = clampInt(url.searchParams.get("pageSize"), 20, 1, 50);
  const statusParam = url.searchParams.get("status");
  const status = statusParam?.toUpperCase();
  if (status && status !== "DRAFT" && status !== "PUBLISHED") {
    return json({ error: "status must be draft or published" }, 400);
  }

  const result = await listAdminPosts({
    page,
    pageSize,
    status: status === "DRAFT" || status === "PUBLISHED" ? status : undefined,
  });
  return json(result);
}

export async function POST(req: Request) {
  const denied = requireApiToken(req);
  if (denied) return denied;

  const body = await readJson(req, 8_000_000);
  if (body.error) return body.error;

  try {
    const raw = (body.data ?? {}) as Record<string, unknown>;
    const images = await pullInlineImages(raw);
    if (!images.ok) return json({ error: images.error }, 400);
    const input = postWriteSchema.parse(raw);
    const result = await createPost({
      ...input,
      tags: input.tags ?? [],
      status: input.status ?? "DRAFT",
    });
    if (!result.ok) return json({ error: result.error }, result.status);
    revalidateContent();
    return json({ post: result.post }, 201);
  } catch (error) {
    if (error instanceof ZodError) return validationError(error);
    throw error;
  }
}

function clampInt(value: string | null, fallback: number, min: number, max: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(parsed)));
}
