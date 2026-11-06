import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { tokensMatch } from "@/lib/cms/http";

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";

  if (!process.env.AUTH_SECRET || !token || !tokensMatch(token, process.env.AUTH_SECRET)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminEmail = process.env.PORTAL_ADMIN_EMAIL!;
  const adminPassword = process.env.PORTAL_ADMIN_PASSWORD!;
  const demoEmail = process.env.PORTAL_DEMO_EMAIL!;
  const demoPassword = process.env.PORTAL_DEMO_PASSWORD!;

  if (!adminEmail || !adminPassword || !demoEmail || !demoPassword) {
    return NextResponse.json(
      { error: "Missing portal credentials in env" },
      { status: 500 },
    );
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
      active: true,
    },
  });

  await prisma.portalUser.upsert({
    where: { email: demoEmail },
    update: {},
    create: {
      email: demoEmail,
      name: "Demo Client",
      role: "Client",
      isAdmin: false,
      clientId: "demo",
      passwordHash: demoHash,
      active: true,
    },
  });

  return NextResponse.json({ ok: true, message: "✅ Portal users seeded" });
}
