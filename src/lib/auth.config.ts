import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js config. Middleware imports this file only.
 * Database lookups live in auth.ts so Prisma is not bundled into the edge runtime.
 */
export const authConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/portal/login",
  },
  providers: [],
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? "";
        token.email = user.email;
        token.role = user.role;
        token.clientId = user.clientId;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) || "";
        session.user.email = token.email as string;
        session.user.role = token.role as typeof session.user.role;
        session.user.clientId = token.clientId as string;
        session.user.isAdmin = Boolean(token.isAdmin);
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
