import { renderRss } from "@/lib/cms/rss";

export const dynamic = "force-dynamic";

export async function GET() {
  const xml = await renderRss();
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
