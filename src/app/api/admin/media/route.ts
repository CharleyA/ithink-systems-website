import { json, requireApiToken } from "@/lib/cms/http";
import { saveImageUpload } from "@/lib/cms/media";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const denied = requireApiToken(req);
  if (denied) return denied;

  const length = Number(req.headers.get("content-length") || 0);
  if (length > 6 * 1024 * 1024) {
    return json({ error: "Payload too large" }, 413);
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json({ error: "Expected multipart form data with a file field" }, 400);
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return json({ error: "file is required" }, 400);
  }

  const result = await saveImageUpload(file);
  if (!result.ok) return json({ error: result.error }, 400);
  return json({ media: result.media }, 201);
}
