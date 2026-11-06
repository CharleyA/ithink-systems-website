import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export async function authenticatePortalUser(
  email: string,
  password: string
) {
  const user = await prisma.portalUser.findUnique({
    where: { email },
  });

  if (!user || !user.active) return null;

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    clientId: user.clientId,
    isAdmin: user.isAdmin,
  };
}
