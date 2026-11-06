import Link from "next/link";
import { formatHarare } from "@/lib/cms/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { updatedAt: "desc" } });
  const now = new Date();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link href="/admin/posts/new" className="rounded-xl bg-[#EC5A24] px-4 py-2 text-sm font-semibold text-white">
          New post
        </Link>
      </div>
      <div className="mt-6 overflow-hidden rounded-3xl border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#FDEEE8] text-[#1A1A1A]">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">When</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-[#5F5F5F]">
                  No posts yet.
                </td>
              </tr>
            )}
            {posts.map((post) => {
              const scheduled = post.status === "PUBLISHED" && post.publishedAt && post.publishedAt > now;
              return (
                <tr key={post.id} className="border-t">
                  <td className="px-4 py-3">
                    <Link href={`/admin/posts/${post.id}`} className="font-semibold hover:text-[#EC5A24]">
                      {post.title}
                    </Link>
                    <p className="text-xs text-[#5F5F5F]">{post.category}</p>
                  </td>
                  <td className="px-4 py-3">{scheduled ? "Scheduled" : post.status === "PUBLISHED" ? "Published" : "Draft"}</td>
                  <td className="px-4 py-3 text-[#5F5F5F]">{post.publishedAt ? formatHarare(post.publishedAt) : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
