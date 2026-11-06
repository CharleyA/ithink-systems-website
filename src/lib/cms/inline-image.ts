import { decodeBase64Image, saveImageBytes } from "@/lib/cms/media";

/** Lets a post create/update carry a cover or OG image as base64 instead of a prior upload. */
export async function pullInlineImages(raw: Record<string, unknown>) {
  const jobs: Array<{ field: "coverImage" | "ogImage"; data: string; filename: string }> = [];
  if (typeof raw.coverImageBase64 === "string" && raw.coverImageBase64.trim()) {
    jobs.push({
      field: "coverImage",
      data: raw.coverImageBase64,
      filename: typeof raw.coverImageFilename === "string" ? raw.coverImageFilename : "cover.jpg",
    });
  }
  if (typeof raw.ogImageBase64 === "string" && raw.ogImageBase64.trim()) {
    jobs.push({
      field: "ogImage",
      data: raw.ogImageBase64,
      filename: typeof raw.ogImageFilename === "string" ? raw.ogImageFilename : "og.jpg",
    });
  }
  delete raw.coverImageBase64;
  delete raw.coverImageFilename;
  delete raw.ogImageBase64;
  delete raw.ogImageFilename;

  for (const job of jobs) {
    const saved = await saveImageBytes(decodeBase64Image(job.data), job.filename);
    if (!saved.ok) return saved;
    raw[job.field] = saved.media.url;
  }
  return { ok: true as const };
}
