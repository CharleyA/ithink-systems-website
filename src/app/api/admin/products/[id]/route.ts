import { ZodError } from "zod";
import { json, readJson, requireApiToken, validationError } from "@/lib/cms/http";
import { deleteProduct, getAdminProduct, updateProduct } from "@/lib/cms/products";
import { revalidateContent } from "@/lib/cms/revalidate";
import { productPatchSchema } from "@/lib/cms/schemas";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

export async function GET(req: Request, context: Context) {
  const denied = requireApiToken(req);
  if (denied) return denied;
  const { id } = await context.params;
  const product = await getAdminProduct(id);
  if (!product) return json({ error: "Not found" }, 404);
  return json({ product });
}

export async function PATCH(req: Request, context: Context) {
  const denied = requireApiToken(req);
  if (denied) return denied;
  const body = await readJson(req);
  if (body.error) return body.error;

  try {
    const input = productPatchSchema.parse(body.data);
    const { id } = await context.params;
    const result = await updateProduct(id, input);
    if (!result.ok) return json({ error: result.error }, result.status);
    revalidateContent();
    return json({ product: result.product });
  } catch (error) {
    if (error instanceof ZodError) return validationError(error);
    throw error;
  }
}

export async function DELETE(req: Request, context: Context) {
  const denied = requireApiToken(req);
  if (denied) return denied;
  const { id } = await context.params;
  const result = await deleteProduct(id);
  if (!result.ok) return json({ error: result.error }, result.status);
  revalidateContent();
  return json({ ok: true });
}
