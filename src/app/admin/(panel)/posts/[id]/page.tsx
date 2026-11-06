import Link from "next/link";
import { notFound } from "next/navigation";
import { deletePostAction } from "@/app/admin/actions";
import { PostEditor } from "@/components/admin/PostEditor";
import { toHarareInput } from "@/lib/cms/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Edit post</h1>
        <div className="flex items-center gap-4">
          {post.status === "PUBLISHED" && (
            <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-[#EC5A24]">
              View
            </Link>
          )}
          <form action={deletePostAction}>
            <input type="hidden" name="id" value={post.id} />
            <button type="submit" className="text-sm font-semibold text-red-700">
              Delete
            </button>
          </form>
        </div>
      </div>
      {query.saved && <p className="mb-4 rounded-xl bg-white px-3 py-2 text-sm text-[#1A1A1A]">Saved.</p>}
      {query.error && <p className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{query.error}</p>}
      <PostEditor
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          body: post.body,
          coverImage: post.coverImage ?? "",
          ogImage: post.ogImage ?? "",
          category: post.category,
          tags: post.tags.join(", "),
          author: post.author,
          status: post.status,
          publishedAt: toHarareInput(post.publishedAt),
          seoTitle: post.seoTitle ?? "",
          seoDescription: post.seoDescription ?? "",
        }}
      />
    </div>
  );
}
