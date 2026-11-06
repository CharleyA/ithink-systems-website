import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatHarare } from "@/lib/cms/format";
import { renderMarkdown } from "@/lib/cms/markdown";
import { getPublicPost, relatedPublicPosts } from "@/lib/cms/posts";
import { absoluteUrl, siteName } from "@/lib/seo";
import { AskForQuote } from "@/components/marketing/AskForQuote";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ slug: string }> };

function coverUrl(cover: string | null) {
  if (!cover) return absoluteUrl("/images/logo.png");
  if (cover.startsWith("http://") || cover.startsWith("https://")) return cover;
  return absoluteUrl(cover);
}

export async function generateMetadata({ params }: Context): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublicPost(slug);
  if (!post) return { title: "Article" };
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const image = coverUrl(post.ogImage || post.coverImage);
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/blog/${post.slug}`) },
    openGraph: {
      type: "article",
      title,
      description,
      url: absoluteUrl(`/blog/${post.slug}`),
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author],
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: Context) {
  const { slug } = await params;
  const post = await getPublicPost(slug);
  if (!post) notFound();
  const related = await relatedPublicPosts(post);
  const html = renderMarkdown(post.body);
  const image = coverUrl(post.coverImage);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: [image],
    datePublished: (post.publishedAt ?? post.createdAt).toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo.png") },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };

  return (
    <article className="bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <p className="text-sm font-semibold text-[#5F5F5F]">
          <Link href="/blog" className="hover:text-[#EC5A24]">
            Blog
          </Link>
          <span> · {post.category}</span>
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-5xl">{post.title}</h1>
        <p className="mt-6 text-lg leading-8 text-[#5F5F5F]">{post.excerpt}</p>
        <p className="mt-4 text-sm text-[#5F5F5F]">
          {post.author}
          {post.publishedAt ? ` · ${formatHarare(post.publishedAt)}` : ""}
        </p>
        {post.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-[#FDEEE8] px-3 py-1 text-xs font-semibold text-[#1A1A1A]">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
      {post.coverImage && (
        <div className="mx-auto max-w-5xl px-6">
          <img src={post.coverImage} alt="" className="max-h-[28rem] w-full rounded-3xl object-cover" />
        </div>
      )}
      <div
        className="prose prose-neutral mx-auto max-w-3xl px-6 py-12 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#EC5A24] prose-img:rounded-2xl lg:px-8"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {related.length > 0 && (
        <div className="mx-auto max-w-3xl px-6 pb-4 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Related posts</h2>
          <ul className="mt-4 space-y-4">
            {related.map((item) => (
              <li key={item.id}>
                <Link href={`/blog/${item.slug}`} className="font-semibold text-[#1A1A1A] hover:text-[#EC5A24]">
                  {item.title}
                </Link>
                <p className="text-sm text-[#5F5F5F]">
                  {item.excerpt}
                  {item.publishedAt ? ` · ${formatHarare(item.publishedAt)}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mx-auto max-w-3xl px-6 pb-20 lg:px-8">
        <div className="rounded-3xl bg-[#FDEEE8] px-6 py-8 sm:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Talk to us / Ask for a quote</h2>
          <p className="mt-2 text-[#5F5F5F]">Tell us what you want to run. We reply on WhatsApp or by phone.</p>
          <div className="mt-4">
            <AskForQuote prominent />
          </div>
        </div>
      </div>
    </article>
  );
}
