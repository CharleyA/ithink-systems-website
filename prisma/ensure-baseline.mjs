/**
 * `prisma migrate deploy` refuses to run (error P3005) when the database
 * already has tables but has never used Prisma Migrate. That is the live
 * ithinksite database: PortalUser exists, and there is no _prisma_migrations table.
 *
 * Mark the idempotent PortalUser baseline as already applied, without executing
 * it, so deploy only adds Post, Product, and MediaAsset. Rows are not touched.
 * A brand-new database skips this and lets migrate deploy create every table.
 */
import { execFileSync } from "node:child_process";
import { PrismaClient } from "@prisma/client";
import "./load-env.mjs";

const BASELINE = "20261106090000_baseline_portal_user";
const prisma = new PrismaClient();

const rows = await prisma.$queryRawUnsafe(
  `SELECT to_regclass('public._prisma_migrations')::text AS migrations,
          to_regclass('public."PortalUser"')::text AS portal`,
);
await prisma.$disconnect();

const row = rows[0] ?? {};
if (row.portal && !row.migrations) {
  console.log("Existing PortalUser database has no migration history.");
  console.log(`Recording ${BASELINE} as applied without changing existing rows.`);
  execFileSync("./node_modules/.bin/prisma", ["migrate", "resolve", "--applied", BASELINE], {
    stdio: "inherit",
  });
}
