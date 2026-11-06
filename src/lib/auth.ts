import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/lib/auth.config";
import { resolvePortalLogin } from "@/lib/portal-auth";
import { clientIp, rateLimit } from "@/lib/rate-limit";

class LoginRateLimited extends CredentialsSignin {
  code = "rate_limited";
}

const WINDOW_MS = 15 * 60 * 1000;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        const email = String(credentials?.email ?? "").trim();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        const ip = clientIp(request);
        const byEmail = rateLimit(`login:email:${email.toLowerCase()}`, 8, WINDOW_MS);
        const byIp = rateLimit(`login:ip:${ip}`, 30, WINDOW_MS);
        if (!byEmail.ok || !byIp.ok) {
          throw new LoginRateLimited();
        }

        return resolvePortalLogin(email, password);
      },
    }),
  ],
});
