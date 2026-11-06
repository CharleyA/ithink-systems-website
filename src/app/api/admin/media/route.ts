import { json, readJson, requireApiToken } from "@/lib/cms/http";
import { decodeBase64Image, saveImageBytes, saveImageUpload } from "@/lib/cms/media";

export const dynamic = "force-dynamic";

const MAX_BODY = 8_000_000;

export async function POST(req: Request) {
  const denied = requireApiToken(req);
  if (denied) return denied;

  const length = Number(req.headers.get("content-length") || 0);
  if (length > MAX_BODY) {
    return json({ error: "Payload too large" }, 413);
  }

  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = await readJson(req, MAX_BODY);
    if (body.error) return body.error;
    const payload = body.data as { filename?: unknown; data?: unknown; base64?: unknown };
    const encoded = typeof payload.data === "string" ? payload.data : typeof payload.base64 === "string" ? payload.base64 : "";
    if (!encoded) return json({ error: "data (base64) is required" }, 400);
    const filename = typeof payload.filename === "string" && payload.filename.trim() ? payload.filename : "cover.jpg";
    const result = await saveImageBytes(decodeBase64Image(encoded), filename);
    if (!result.ok) return json({ error: result.error }, 400);
    return json({ media: result.media }, 201);
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json({ error: "Send multipart form data with a file field, or JSON with data set to base64" }, 400);
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return json({ error: "file is required" }, 400);
  }

  const result = await saveImageUpload(file);
  if (!result.ok) return json({ error: result.error }, 400);
  return json({ media: result.media }, 201);
}
