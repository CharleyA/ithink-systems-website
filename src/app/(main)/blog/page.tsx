import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { formatHarare } from "@/lib/cms/format";
import { listPublicCategories, listPublicPosts } from "@/lib/cms/posts";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 9;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const category = params.category?.trim();
  const page = Math.max(1, Number(params.page) || 1);
  const query = new URLSearchParams();
  if (category) query.set("category", category);
  if (page > 1) query.set("page", String(page));
  const path = query.size ? `/blog?${query.toString()}` : "/blog";
  const title = category ? `${category} articles` : "Blog";
  return {
    title,
    description:
      "Practical notes on healthcare IT, ERPNext, education platforms, and custom software from iThink Systems in Bulawayo.",
    alternates: {
      canonical: absoluteUrl(path),
      types: { "application/rss+xml": absoluteUrl("/feed.xml") },
    },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category?.trim() || undefined;
  const page = Math.max(1, Number(params.page) || 1);

  let posts: Awaited<ReturnType<typeof listPublicPosts>> = { total: 0, rows: [] };
  let categories: string[] = [];
  let unavailable = false;
  try {
    [posts, categories] = await Promise.all([
      listPublicPosts({ page, pageSize: PAGE_SIZE, category }),
      listPublicCategories(),
    ]);
  } catch (error) {
    console.error(error);
    unavailable = true;
  }

  const totalPages = Math.max(1, Math.ceil(posts.total / PAGE_SIZE));

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#EC5A24]">From the studio</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-5xl">Latest from the blog</h1>
          <p className="mt-5 text-lg leading-8 text-[#5F5F5F]">
            Short, practical notes for teams running healthcare, education, and business systems in Zimbabwe.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <FilterLink active={!category} href="/blog">
            All
          </FilterLink>
          {categories.map((item) => (
            <FilterLink key={item} active={item === category} href={`/blog?category=${encodeURIComponent(item)}`}>
              {item}
            </FilterLink>
          ))}
        </div>

        {unavailable ? (
          <p className="mt-16 text-[#5F5F5F]">The blog is temporarily unavailable. Please try again shortly.</p>
        ) : posts.rows.length === 0 ? (
          <p className="mt-16 text-[#5F5F5F]">No published articles in this view yet. New notes are added most weekdays.</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.rows.map((post) => (
              <article key={post.id} className="flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm">
                {post.coverImage ? (
                  <img src={post.coverImage} alt="" className="h-48 w-full object-cover" />
                ) : (
                  <div className="h-3 bg-[#EC5A24]" />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#EC5A24]">{post.category}</p>
                  <h2 className="mt-3 text-xl font-bold tracking-tight text-[#1A1A1A]">
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#EC5A24]">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[#5F5F5F]">{post.excerpt}</p>
                  <p className="mt-6 text-xs text-[#5F5F5F]">
                    {post.author}
                    {post.publishedAt ? ` · ${formatHarare(post.publishedAt)}` : ""}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-between text-sm font-semibold" aria-label="Pagination">
            <PageLink page={page - 1} category={category} disabled={page <= 1}>
              Previous
            </PageLink>
            <p className="text-[#5F5F5F]">
              Page {Math.min(page, totalPages)} of {totalPages}
            </p>
            <PageLink page={page + 1} category={category} disabled={page >= totalPages}>
              Next
            </PageLink>
          </nav>
        )}
      </div>
    </div>
  );
}

function FilterLink({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={
        active
          ? "rounded-full bg-[#EC5A24] px-4 py-1.5 text-sm font-semibold text-white"
          : "rounded-full bg-[#FDEEE8] px-4 py-1.5 text-sm font-semibold text-[#1A1A1A] hover:bg-[#EC5A24] hover:text-white"
      }
    >
      {children}
    </Link>
  );
}

function PageLink({
  page,
  category,
  disabled,
  children,
}: {
  page: number;
  category?: string;
  disabled: boolean;
  children: ReactNode;
}) {
  if (disabled) return <span className="text-[#D9D9D9]">{children}</span>;
  const query = new URLSearchParams();
  if (category) query.set("category", category);
  if (page > 1) query.set("page", String(page));
  const href = query.size ? `/blog?${query.toString()}` : "/blog";
  return (
    <Link href={href} className="text-[#EC5A24] hover:underline">
      {children}
    </Link>
  );
}
