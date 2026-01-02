import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        const demoEmail = process.env.PORTAL_DEMO_EMAIL;
        const demoPassword = process.env.PORTAL_DEMO_PASSWORD;
        const adminEmail = process.env.PORTAL_ADMIN_EMAIL;
        const adminPassword = process.env.PORTAL_ADMIN_PASSWORD;

        if (email === adminEmail && password === adminPassword) {
          return {
            id: "admin",
            email: adminEmail,
            name: "Admin User",
            role: "Admin",
            clientId: "admin",
            isAdmin: true,
          };
        }

        if (email === demoEmail && password === demoPassword) {
          return {
            id: "1",
            email: demoEmail,
            name: "Demo User",
            role: "Client",
            clientId: "demo-client",
            isAdmin: false,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/portal/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.clientId = user.clientId;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as any;
        session.user.clientId = token.clientId as string;
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },
});
