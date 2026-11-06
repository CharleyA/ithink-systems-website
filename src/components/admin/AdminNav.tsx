"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/products", label: "Products" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="rounded-3xl border bg-white p-4">
      <p className="px-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#EC5A24]">iThink CMS</p>
      <nav className="mt-4 flex flex-col gap-1">
        {links.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-xl px-3 py-2 text-sm font-semibold",
                active ? "bg-[#FDEEE8] text-[#EC5A24]" : "text-[#1A1A1A] hover:bg-[#FDEEE8]",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-6 flex flex-col gap-2 border-t pt-4">
        <Link href="/" className="px-3 text-sm font-semibold text-[#5F5F5F] hover:text-[#EC5A24]">
          View site
        </Link>
        <button
          type="button"
          className="px-3 text-left text-sm font-semibold text-[#5F5F5F] hover:text-[#EC5A24]"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
