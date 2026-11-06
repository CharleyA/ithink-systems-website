import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const now = new Date();
  let counts = { posts: 0, drafts: 0, scheduled: 0, products: 0 };
  let recent: { id: string; title: string; status: string; slug: string; publishedAt: Date | null }[] = [];
  let unavailable = false;

  try {
    const [posts, drafts, scheduled, products, latest] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: "DRAFT" } }),
      prisma.post.count({ where: { status: "PUBLISHED", publishedAt: { gt: now } } }),
      prisma.product.count(),
      prisma.post.findMany({
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: { id: true, title: true, status: true, slug: true, publishedAt: true },
      }),
    ]);
    counts = { posts, drafts, scheduled, products };
    recent = latest;
  } catch (error) {
    console.error(error);
    unavailable = true;
  }

  const cards = [
    { label: "Posts", value: counts.posts, href: "/admin/posts" },
    { label: "Drafts", value: counts.drafts, href: "/admin/posts" },
    { label: "Scheduled", value: counts.scheduled, href: "/admin/posts" },
    { label: "Products", value: counts.products, href: "/admin/products" },
  ];

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Dashboard</h1>
          <p className="mt-2 text-[#5F5F5F]">Publish the daily note, or update a product, without a code change.</p>
        </div>
        <Link href="/admin/posts/new" className="rounded-xl bg-[#EC5A24] px-4 py-2 text-sm font-semibold text-white">
          New post
        </Link>
      </div>
      {unavailable && <p className="mt-6 text-sm text-red-700">The database is not reachable. Check DATABASE_URL and that migrations have run.</p>}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="rounded-3xl border bg-white p-6">
            <p className="text-sm font-semibold text-[#5F5F5F]">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-[#1A1A1A]">{card.value}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 rounded-3xl border bg-white p-6">
        <h2 className="text-lg font-bold">Recent posts</h2>
        <ul className="mt-4 divide-y">
          {recent.length === 0 && <li className="py-3 text-sm text-[#5F5F5F]">No posts yet.</li>}
          {recent.map((post) => {
            const scheduled = post.status === "PUBLISHED" && post.publishedAt && post.publishedAt > new Date();
            const label = scheduled ? "Scheduled" : post.status === "PUBLISHED" ? "Published" : "Draft";
            return (
              <li key={post.id} className="flex items-center justify-between py-3 text-sm">
                <Link href={`/admin/posts/${post.id}`} className="font-semibold hover:text-[#EC5A24]">
                  {post.title}
                </Link>
                <span className="text-[#5F5F5F]">{label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
