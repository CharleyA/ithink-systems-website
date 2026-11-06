import { ZodError } from "zod";
import { json, readJson, requireApiToken, validationError } from "@/lib/cms/http";
import { createProduct, listAdminProducts } from "@/lib/cms/products";
import { revalidateContent } from "@/lib/cms/revalidate";
import { productWriteSchema } from "@/lib/cms/schemas";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const denied = requireApiToken(req);
  if (denied) return denied;
  const products = await listAdminProducts();
  return json({ data: products, total: products.length });
}

export async function POST(req: Request) {
  const denied = requireApiToken(req);
  if (denied) return denied;
  const body = await readJson(req);
  if (body.error) return body.error;

  try {
    const input = productWriteSchema.parse(body.data);
    const result = await createProduct({
      ...input,
      features: input.features ?? [],
      images: input.images ?? [],
    });
    if (!result.ok) return json({ error: result.error }, result.status);
    revalidateContent();
    return json({ product: result.product }, 201);
  } catch (error) {
    if (error instanceof ZodError) return validationError(error);
    throw error;
  }
}
