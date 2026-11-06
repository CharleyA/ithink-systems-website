-- Marketing catalogue. Replaces the earlier Product shape (prices, features, published flag).
-- Runs once. Existing product rows from the previous migration are dropped because that
-- catalogue has not been edited in production; PortalUser is not touched.

ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "ogImage" TEXT;

DROP TABLE IF EXISTS "Product";

DO $$ BEGIN
  CREATE TYPE "ProductStatus" AS ENUM ('LIVE', 'DEMO', 'COMING_SOON');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "status" "ProductStatus" NOT NULL DEFAULT 'LIVE',
    "demoUrl" TEXT,
    "image" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE INDEX "Product_sortOrder_idx" ON "Product"("sortOrder");

INSERT INTO "Product" ("id", "name", "slug", "tagline", "description", "audience", "status", "demoUrl", "image", "sortOrder", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid()::text, 'School Books', 'school-books', 'IPSAS school accounting', 'School accounting for finance teams that need orderly records and reports. A demo is available to try the workflow.', 'Schools and school finance teams', 'DEMO'::"ProductStatus", 'https://ipsas-demo.ithinksys.co.zw', '/images/products/school-books.jpg', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid()::text, 'iThink Medicare', 'ithink-medicare', 'Clinic and hospital management', 'A comprehensive system for medical facilities, integrating electronic health records, pharmacy, and laboratory management.', 'Clinics and hospitals', 'DEMO'::"ProductStatus", 'https://medicaredemo.ithinksys.co.zw', '/images/products/medicare.jpg', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid()::text, 'ERPNext Implementation', 'erpnext-implementation', 'Business operations on ERPNext', 'Practical ERPNext implementation for finance, stock, and the work a business does every day.', 'Businesses that want one operational system', 'LIVE'::"ProductStatus", NULL, '/images/products/erpnext.jpg', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid()::text, 'Digital Learning on Moodle', 'digital-learning-on-moodle', 'Learning on Moodle', 'Setup of Moodle for schools and training teams that want lessons, assignments, and learner records in one place. This offer is coming soon.', 'Schools and training teams', 'COMING_SOON'::"ProductStatus", NULL, '/images/products/digital-learning.jpg', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid()::text, 'Booking System for lodges', 'booking-system-for-lodges', 'Reservations for lodges', 'A booking system so a lodge can take reservations and see which rooms or chalets are free.', 'Lodges and guest houses', 'DEMO'::"ProductStatus", 'https://lodge-demo.ithinksys.co.zw', '/images/products/placeholder.svg', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid()::text, 'Inventory and Workflow Management', 'inventory-and-workflow-management', 'Stock and everyday workflows', 'Stock tracking and the handovers a team repeats each day. This offer is coming soon.', 'Stores and operations teams', 'COMING_SOON'::"ProductStatus", NULL, '/images/products/placeholder.svg', 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid()::text, 'Website Design', 'website-design', 'Websites that stay clear on a phone', 'Design and build of websites for schools, clinics, and businesses that need a straightforward public site.', 'Organisations that need a public website', 'LIVE'::"ProductStatus", NULL, '/images/products/website-design.jpg', 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid()::text, '3D Home Walkthroughs', '3d-home-walkthroughs', 'Walk through a home on screen', '3D walkthroughs so a buyer or owner can move through a home before standing in it.', 'Property developers and homeowners', 'LIVE'::"ProductStatus", NULL, '/images/products/3d-home.jpg', 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid()::text, 'Hosting and Support', 'hosting-and-support', 'Hosting, and someone to call', 'Hosting and follow-up support so a site or system keeps running after it goes live.', 'Teams that need a system looked after', 'LIVE'::"ProductStatus", NULL, '/images/products/placeholder.svg', 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid()::text, 'WhatsApp integration add-on', 'whatsapp-integration-add-on', 'WhatsApp alongside your system', 'An add-on that connects WhatsApp to a system you already use, so enquiries and updates can arrive there.', 'Teams whose customers already use WhatsApp', 'LIVE'::"ProductStatus", NULL, '/images/products/placeholder.svg', 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
