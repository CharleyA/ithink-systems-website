"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";
import { SiteVariant, getVariantUrl } from "@/lib/site-variant";

interface NavItem {
  name: string;
  href: string;
  external?: boolean;
}

interface NavbarProps {
  variant: SiteVariant;
}

export function Navbar({ variant }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const navigation: NavItem[] = React.useMemo(() => {
    const corporateUrl = "https://ithinksys.co.zw";
    const demoUrl = "https://demo.ithinksys.co.zw";

    if (variant === "products") {
      return [
        { name: "Products Home", href: "/" },
        { name: "Product Pages", href: "/products" },
        { name: "Contact", href: `${corporateUrl}/contact`, external: true },
        { name: "Client Portal", href: `${corporateUrl}/portal`, external: true },
      ];
    }

    if (variant === "demo") {
      return [
        { name: "Demo Home", href: "/" },
        { name: "Demos", href: "/demos" },
        { name: "Contact", href: `${corporateUrl}/contact`, external: true },
      ];
    }

// Default to corporate
      return [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Solutions", href: "/solutions" },
        { name: "Build", href: "/custom-software-development-zimbabwe" },
        { name: "Products", href: "/products" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Contact", href: "/contact" },
        { name: "Client Portal", href: "/portal" },
      ];
  }, [variant]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Logo />
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className={cn(
                "text-sm font-semibold leading-6 transition-colors hover:text-primary",
                pathname === item.href ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button asChild>
            <Link href={variant === "corporate" ? "/contact" : "https://ithinksys.co.zw/contact"}>
              Contact Us
            </Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-foreground/10">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="-block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-muted"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Button asChild className="w-full">
                  <Link 
                    href={variant === "corporate" ? "/contact" : "https://ithinksys.co.zw/contact"} 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
