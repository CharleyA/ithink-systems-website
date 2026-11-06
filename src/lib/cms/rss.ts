import { absoluteUrl, siteName } from "@/lib/seo";
import { listPublicPosts } from "@/lib/cms/posts";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function renderRss() {
  const { rows } = await listPublicPosts({ page: 1, pageSize: 50 });
  const items = rows
    .map((post) => {
      const link = absoluteUrl(`/blog/${post.slug}`);
      const date = post.publishedAt ?? post.updatedAt;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${date.toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
      <author>${escapeXml(post.author)}</author>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(`${siteName} Blog`)}</title>
    <link>${escapeXml(absoluteUrl("/blog"))}</link>
    <description>Practical notes on healthcare IT, ERPNext, education platforms, and custom software from ${escapeXml(siteName)} in Bulawayo.</description>
    <language>en-zw</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}
