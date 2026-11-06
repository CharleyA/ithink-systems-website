import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

async function main() {
  const adminEmail = process.env.PORTAL_ADMIN_EMAIL!;
  const adminPassword = process.env.PORTAL_ADMIN_PASSWORD!;
  const demoEmail = process.env.PORTAL_DEMO_EMAIL!;
  const demoPassword = process.env.PORTAL_DEMO_PASSWORD!;

  if (!adminEmail || !adminPassword || !demoEmail || !demoPassword) {
    throw new Error("Missing portal credentials in env");
  }

  const adminHash = await bcrypt.hash(adminPassword, 12);
  const demoHash = await bcrypt.hash(demoPassword, 12);

  await prisma.portalUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Portal Admin",
      role: "Admin",
      isAdmin: true,
      clientId: "internal",
      passwordHash: adminHash,
    },
  });

  await prisma.portalUser.upsert({
    where: { email: demoEmail },
    update: {},
    create: {
      email: demoEmail,
      name: "Demo Client",
      role: "Client",
      clientId: "demo",
      passwordHash: demoHash,
    },
  });

  console.log("✅ Portal users seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
