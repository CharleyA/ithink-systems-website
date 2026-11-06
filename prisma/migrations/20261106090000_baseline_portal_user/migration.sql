-- Baseline for the existing live database.
-- PortalUser was created before Prisma Migrate existed (no migrations folder,
-- and the image only ran `prisma generate`). Every statement below is
-- idempotent: on the live database the enum, table, and unique index already
-- exist, so this migration records the baseline without dropping or rewriting
-- rows. On a brand-new database it creates the same table Prisma expects.

DO $$ BEGIN
  CREATE TYPE "UserRole" AS ENUM ('Admin', 'Client');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "PortalUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'Client',
    "clientId" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "passwordHash" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortalUser_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "PortalUser_email_key" ON "PortalUser"("email");
