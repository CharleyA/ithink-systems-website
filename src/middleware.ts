import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdmin = !!req.auth?.user?.isAdmin;

  if (nextUrl.pathname.startsWith("/admin")) {
    const isLogin = nextUrl.pathname === "/admin/login";
    if (isLogin && isAdmin) {
      return NextResponse.redirect(new URL("/admin", nextUrl));
    }
    if (!isLogin && !isAdmin) {
      const url = new URL("/admin/login", nextUrl);
      if (isLoggedIn) url.searchParams.set("error", "forbidden");
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const isPortalAppRoute = nextUrl.pathname.startsWith("/portal/app");
  const isPortalLoginRoute = nextUrl.pathname === "/portal/login";
  const isPortalForgotRoute = nextUrl.pathname === "/portal/forgot";

  if (isPortalAppRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/portal/login", nextUrl));
  }

  if ((isPortalLoginRoute || isPortalForgotRoute) && isLoggedIn) {
    return NextResponse.redirect(new URL("/portal/app", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/portal/:path*", "/admin", "/admin/:path*"],
};
