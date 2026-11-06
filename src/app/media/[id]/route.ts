import { NextResponse } from "next/server";
import { readMedia } from "@/lib/cms/media";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const media = await readMedia(id);
  if (!media) return new NextResponse("Not found", { status: 404 });

  return new NextResponse(new Blob([new Uint8Array(media.bytes)]), {
    headers: {
      "Content-Type": media.mimeType,
      "Content-Length": String(media.bytes.length),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "Content-Disposition": `inline; filename="${media.filename.replace(/"/g, "")}"`,
    },
  });
}
