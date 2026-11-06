import Link from "next/link";
import type { Product } from "@prisma/client";
import { AskForQuote } from "@/components/marketing/AskForQuote";
import { statusLabel } from "@/lib/cms/products";
import { contactEmail, facebookUrl, officeAddress, whatsappChannelUrl } from "@/lib/site-contact";

export type HomePost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  dateLabel: string;
  coverImage: string | null;
};

const sectors = [
  { title: "Schools", text: "Accounting, learning, and the public site a school uses." },
  { title: "Healthcare", text: "Clinic and hospital workflows, from the front desk to the pharmacy." },
  { title: "Business", text: "ERPNext and the everyday systems a company actually runs." },
  { title: "Councils", text: "Practical systems for local authority offices and service points." },
  { title: "Hospitality", text: "Bookings and the tools a lodge uses to host guests." },
];

const featuredWork = [
  {
    name: "DAZ",
    href: "https://dementiazim.co.zw",
    summary: "Website for the Dementia Association of Zimbabwe, so the public can find the organisation and its work.",
  },
  {
    name: "UCE",
    href: "https://uce.ac.zw",
    summary: "Institutional website for United College of Education, built for academic visibility and communication.",
  },
];

export function CorporateHome({ latestPosts = [], products = [] }: { latestPosts?: HomePost[]; products?: Product[] }) {
  return (
    <div className="flex flex-col">
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#EC5A24]">iThink Systems · Bulawayo</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-6xl">Systems for any industry or setup</h1>
            <p className="mt-6 text-lg leading-8 text-[#5F5F5F]">
              We design, build, and look after software for schools, clinics, businesses, councils, and hospitality. Based in Bulawayo since 2021.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <AskForQuote prominent />
              <Link
                href="/products"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#1A1A1A] px-5 py-3 text-sm font-semibold text-[#1A1A1A]"
              >
                See our products
              </Link>
            </div>
          </div>
          <img
            src="/images/logo.png"
            alt="iThink Systems"
            className="mx-auto w-full max-w-md rounded-3xl bg-[#FDEEE8] object-contain p-10"
          />
        </div>
      </section>

      <section className="border-y bg-[#FDEEE8]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
          {sectors.map((sector) => (
            <div key={sector.title}>
              <h2 className="text-lg font-bold text-[#1A1A1A]">{sector.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#5F5F5F]">{sector.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A]">Products</h2>
              <p className="mt-3 text-[#5F5F5F]">Live systems, demos you can open, and work that is still on the way.</p>
            </div>
            <Link href="/products" className="text-sm font-semibold text-[#EC5A24]">
              Full catalogue
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`} className="overflow-hidden rounded-3xl border bg-white">
                <img src={product.image || "/images/products/placeholder.svg"} alt="" className="aspect-[4/3] w-full object-cover" />
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#EC5A24]">{statusLabel(product.status)}</p>
                  <h3 className="mt-2 text-lg font-bold text-[#1A1A1A]">{product.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5F5F5F]">{product.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1A1A1A] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Featured work</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {featuredWork.map((work) => (
              <a key={work.name} href={work.href} target="_blank" rel="noopener noreferrer" className="rounded-3xl bg-white p-6 text-[#1A1A1A]">
                <p className="text-sm font-semibold uppercase tracking-wider text-[#EC5A24]">{work.name}</p>
                <p className="mt-3 text-lg font-bold">{work.href.replace("https://", "")}</p>
                <p className="mt-3 text-sm leading-6 text-[#5F5F5F]">{work.summary}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FDEEE8] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-bold text-[#1A1A1A]">Latest from our blog</h2>
            <Link href="/blog" className="text-sm font-semibold text-[#EC5A24]">
              All articles
            </Link>
          </div>
          {latestPosts.length === 0 ? (
            <p className="mt-8 text-[#5F5F5F]">New articles appear here as they are published.</p>
          ) : (
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="flex flex-col overflow-hidden rounded-3xl bg-white">
                  {post.coverImage ? <img src={post.coverImage} alt="" className="h-40 w-full object-cover" /> : <div className="h-2 bg-[#EC5A24]" />}
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#EC5A24]">{post.category}</p>
                    <h3 className="mt-2 text-lg font-bold text-[#1A1A1A]">{post.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-[#5F5F5F]">{post.excerpt}</p>
                    {post.dateLabel && <p className="mt-4 text-xs text-[#5F5F5F]">{post.dateLabel}</p>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <a href={whatsappChannelUrl} target="_blank" rel="noopener noreferrer" className="rounded-3xl bg-[#FDEEE8] p-6">
            <h2 className="text-2xl font-bold text-[#1A1A1A]">Join the WhatsApp channel</h2>
            <p className="mt-3 text-sm leading-6 text-[#5F5F5F]">Short updates from iThink Systems, in the channel.</p>
          </a>
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="rounded-3xl border p-6">
            <h2 className="text-2xl font-bold text-[#1A1A1A]">Facebook</h2>
            <p className="mt-3 text-sm leading-6 text-[#5F5F5F]">The company page already linked from this site.</p>
          </a>
        </div>
      </section>

      <section className="border-t bg-[#1A1A1A] py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">Contact</h2>
            <p className="mt-2 text-sm text-white/80">{officeAddress}</p>
            <p className="mt-1 text-sm">
              <a href={`mailto:${contactEmail}`} className="underline">
                {contactEmail}
              </a>
            </p>
          </div>
          <AskForQuote prominent onDark />
        </div>
      </section>
    </div>
  );
}
