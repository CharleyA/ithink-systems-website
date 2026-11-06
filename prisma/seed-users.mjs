/**
 * Create the first portal/admin user from PORTAL_ADMIN_* and PORTAL_DEMO_*.
 * Existing rows are left unchanged unless you pass --reset.
 *
 *   node prisma/seed-users.mjs
 *   node prisma/seed-users.mjs --reset
 */
import "./load-env.mjs";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const reset = process.argv.includes("--reset");

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

async function upsertUser({ email, password, name, role, isAdmin, clientId }) {
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.portalUser.upsert({
    where: { email },
    update: reset ? { passwordHash, name, role, isAdmin, active: true } : {},
    create: {
      email,
      name,
      role,
      isAdmin,
      clientId,
      passwordHash,
      active: true,
    },
  });
}

async function main() {
  await upsertUser({
    email: required("PORTAL_ADMIN_EMAIL"),
    password: required("PORTAL_ADMIN_PASSWORD"),
    name: "Portal Admin",
    role: "Admin",
    isAdmin: true,
    clientId: "internal",
  });
  await upsertUser({
    email: required("PORTAL_DEMO_EMAIL"),
    password: required("PORTAL_DEMO_PASSWORD"),
    name: "Demo Client",
    role: "Client",
    isAdmin: false,
    clientId: "demo",
  });
  console.log(reset ? "Portal users upserted and passwords reset." : "Portal users seeded. Existing passwords were kept.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
