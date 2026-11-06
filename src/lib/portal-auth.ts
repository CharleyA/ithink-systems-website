import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export type PortalIdentity = {
  id: string;
  email: string;
  name: string;
  role: "Admin" | "Client";
  clientId: string;
  isAdmin: boolean;
};

function envIdentity(email: string, password: string): PortalIdentity | null {
  const adminEmail = process.env.PORTAL_ADMIN_EMAIL;
  const adminPassword = process.env.PORTAL_ADMIN_PASSWORD;
  const demoEmail = process.env.PORTAL_DEMO_EMAIL;
  const demoPassword = process.env.PORTAL_DEMO_PASSWORD;

  if (adminEmail && adminPassword && email === adminEmail && password === adminPassword) {
    return {
      id: "admin",
      email: adminEmail,
      name: "Admin User",
      role: "Admin",
      clientId: "admin",
      isAdmin: true,
    };
  }

  if (demoEmail && demoPassword && email === demoEmail && password === demoPassword) {
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
}

/**
 * NextAuth is the only session used by the portal and /admin.
 * A matching database user is checked first. If that email exists, the env-var
 * password is not accepted (so a changed database password cannot be bypassed).
 * If the database is down, or the email is not in the database yet, the
 * historical PORTAL_ADMIN_* / PORTAL_DEMO_* env login still works.
 */
export async function resolvePortalLogin(email: string, password: string): Promise<PortalIdentity | null> {
  const normalized = email.trim();
  if (!normalized || !password) return null;

  try {
    const user = await prisma.portalUser.findFirst({
      where: { email: { equals: normalized, mode: "insensitive" } },
    });

    if (user) {
      if (!user.active) return null;
      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) return null;
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        clientId: user.clientId,
        isAdmin: user.isAdmin || user.role === "Admin",
      };
    }
  } catch (error) {
    console.error("Portal user lookup failed; using env credentials.", error);
    return envIdentity(normalized, password);
  }

  return envIdentity(normalized, password);
}

export async function authenticatePortalUser(email: string, password: string) {
  return resolvePortalLogin(email, password);
}
