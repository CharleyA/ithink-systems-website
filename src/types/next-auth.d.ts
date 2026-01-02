import { DefaultSession } from "next-auth";
import { UserRole } from "@/content/portal/types";

declare module "next-auth" {
  interface User {
    role?: UserRole;
    clientId?: string;
    isAdmin?: boolean;
  }

  interface Session {
    user: {
      id: string;
      role?: UserRole;
      clientId?: string;
      isAdmin?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: UserRole;
    clientId?: string;
    isAdmin?: boolean;
  }
}
