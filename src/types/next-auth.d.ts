import { DefaultSession } from "next-auth";
import { UserRole } from "@/content/portal/types";

declare module "next-auth" {
  interface User {
    role?: UserRole;
    clientId?: string;
  }

  interface Session {
    user: {
      id: string;
      role?: UserRole;
      clientId?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: UserRole;
    clientId?: string;
  }
}
