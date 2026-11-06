import { ZodError } from "zod";
import { json, readJson, requireApiToken, validationError } from "@/lib/cms/http";
import { deletePost, getAdminPost, updatePost } from "@/lib/cms/posts";
import { revalidateContent } from "@/lib/cms/revalidate";
import { postPatchSchema } from "@/lib/cms/schemas";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

export async function GET(req: Request, context: Context) {
  const denied = requireApiToken(req);
  if (denied) return denied;
  const { id } = await context.params;
  const post = await getAdminPost(id);
  if (!post) return json({ error: "Not found" }, 404);
  return json({ post });
}

export async function PATCH(req: Request, context: Context) {
  const denied = requireApiToken(req);
  if (denied) return denied;
  const body = await readJson(req);
  if (body.error) return body.error;

  try {
    const input = postPatchSchema.parse(body.data);
    const { id } = await context.params;
    const result = await updatePost(id, input);
    if (!result.ok) return json({ error: result.error }, result.status);
    revalidateContent();
    return json({ post: result.post });
  } catch (error) {
    if (error instanceof ZodError) return validationError(error);
    throw error;
  }
}

export async function DELETE(req: Request, context: Context) {
  const denied = requireApiToken(req);
  if (denied) return denied;
  const { id } = await context.params;
  const result = await deletePost(id);
  if (!result.ok) return json({ error: result.error }, result.status);
  revalidateContent();
  return json({ ok: true });
}
