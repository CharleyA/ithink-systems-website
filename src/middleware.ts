import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

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
  matcher: ["/portal/:path*"],
};
