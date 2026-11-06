# iThink Systems website

Next.js site for [ithinksys.co.zw](https://ithinksys.co.zw), with a small content layer for the daily blog and the product catalogue.

Staff publish from `/admin`. An automated assistant uses the JSON API below. The client portal at `/portal` is unchanged: it still signs in with NextAuth credentials.

## Auth

One session mechanism: **NextAuth** (JWT cookie), configured in `src/lib/auth.ts`.

1. If the email exists in `PortalUser`, the bcrypt password on that row is checked. A wrong password is rejected even if `PORTAL_ADMIN_PASSWORD` matches.
2. If the email is not in the database yet, or the database cannot be reached, the historical `PORTAL_ADMIN_*` / `PORTAL_DEMO_*` environment login still works.
3. `/admin` requires `isAdmin`. The demo client cannot open it.
4. Login attempts are rate-limited (8 per email and 30 per IP, each 15 minutes) for both the portal and the admin form.

`src/lib/session.ts` is an old unused cookie helper. Do not wire new screens to it.

Admin UI writes go through Server Actions. Next.js checks the `Origin` header on those requests, so a cross-site form cannot post them. The JSON API does not accept the session cookie. It requires `Authorization: Bearer $CMS_API_TOKEN`.

## Local development

Requirements: Node 22, and Postgres 16 (Docker).

```bash
cp .env.example .env.local
# Put the same POSTGRES_* lines in .env so Compose can interpolate them.
cp .env.example .env
# Edit both files. Use a real AUTH_SECRET, CMS_API_TOKEN, and passwords.

docker compose up -d postgres
npm install --legacy-peer-deps
npx prisma generate
npm run db:migrate
npm run db:seed
npm run db:seed-users
npm run dev

The seed scripts read `.env` and `.env.local` when those variables are not already exported.
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin
- RSS: http://localhost:3000/feed.xml and http://localhost:3000/blog/rss.xml

`DATABASE_URL` on the host uses `localhost`. Inside the app container it must use the hostname `postgres`.

## Environment variables

See `.env.example` for the full list.

| Variable | Purpose |
|---|---|
| `POSTGRES_USER` | Postgres role. Default `ithink` in Compose. |
| `POSTGRES_PASSWORD` | Postgres password. Compose reads `${POSTGRES_PASSWORD}` from `.env` or the shell. Never commit it. |
| `POSTGRES_DB` | Database name. Default `ithinksite`. |
| `DATABASE_URL` | Connection string for Prisma. |
| `AUTH_SECRET` | NextAuth secret. Also the bearer token for `POST /api/admin/seed`. |
| `AUTH_TRUST_HOST` | Set `true` behind the reverse proxy. |
| `PORTAL_ADMIN_EMAIL` | Admin email for env login and the user seed. |
| `PORTAL_ADMIN_PASSWORD` | Admin password for env login and the user seed. |
| `PORTAL_DEMO_EMAIL` | Demo client email. |
| `PORTAL_DEMO_PASSWORD` | Demo client password. |
| `CMS_API_TOKEN` | Bearer token for the content API. |
| `UPLOAD_DIR` | Directory for a copy of uploaded images. Docker mounts this at `/data/uploads`. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional Google Analytics id. |

New in this release: `CMS_API_TOKEN`, `UPLOAD_DIR`, `AUTH_TRUST_HOST`, and the `POSTGRES_*` variables referenced by Compose.

## First admin user

With the app database up and `PORTAL_ADMIN_*` / `PORTAL_DEMO_*` set:

```bash
npm run db:seed-users
```

Or, once the server is running:

```bash
curl -fsS -X POST \
  -H "Authorization: Bearer $AUTH_SECRET" \
  http://127.0.0.1:3000/api/admin/seed
```

Inside Docker:

```bash
docker compose exec ithinksite node prisma/seed-users.mjs
```

Re-running the seed does not change an existing password. To rotate one:

```bash
node prisma/seed-users.mjs --reset
```

Then sign in at `/admin/login` with `PORTAL_ADMIN_EMAIL`. An admin can also sign in at `/portal/login` and open `/admin`.

## Content API

All routes require:

```
Authorization: Bearer $CMS_API_TOKEN
Content-Type: application/json
```

Unknown or missing tokens receive `401`. The API allows 120 requests per minute. Bodies over 1 MB are rejected. Image uploads are multipart, field name `file`, maximum 5 MB, JPEG / PNG / GIF / WebP only (SVG is rejected).

Dates are ISO-8601. A `datetime-local` value without a timezone is interpreted as Africa/Harare (UTC+2). A published post whose `publishedAt` is in the future stays off the site, the sitemap, and the RSS feed until that time.

### Posts

`GET /api/admin/posts?page=1&pageSize=20&status=draft`

`POST /api/admin/posts`

```json
{
  "title": "How a clinic can start with electronic records",
  "slug": "clinic-electronic-records",
  "excerpt": "A short brief for teams moving off paper registers.",
  "body": "## Start with the register\n\nWrite the first visit down once.",
  "coverImage": "/media/your-media-id",
  "category": "Healthcare",
  "tags": ["ehr", "clinics"],
  "author": "iThink Systems",
  "status": "published",
  "publishedAt": "2026-11-06T08:00:00+02:00",
  "seoTitle": "Starting electronic records in a clinic",
  "seoDescription": "A practical first step for Zimbabwean clinics."
}
```

`slug` is optional; it is generated from the title. `status` is `draft` or `published`. Omit `publishedAt` on a published post to publish immediately.

`GET /api/admin/posts/:id` accepts the id or the slug.

`PATCH /api/admin/posts/:id` with any subset of the fields above.

`DELETE /api/admin/posts/:id`

### Products

`GET /api/admin/products`

`POST /api/admin/products`

```json
{
  "name": "Medisure_OS",
  "slug": "medisure-os",
  "summary": "Operating system for medical facilities.",
  "description": "Longer markdown description.",
  "features": ["EHR", "Pharmacy", "Laboratory"],
  "images": ["/media/your-media-id"],
  "category": "Healthcare",
  "priceCents": null,
  "priceLabel": "Contact for pricing",
  "ctaUrl": "/contact?product=medisure-os",
  "demoUrl": "https://demo.ithinksys.co.zw/medisure",
  "featured": true,
  "sortOrder": 1,
  "published": true
}
```

Leave `priceCents` null to show `priceLabel`. A number is US cents (`150000` is USD 1,500.00).

`GET`, `PATCH`, and `DELETE /api/admin/products/:id` behave like posts.

### Images

`POST /api/admin/media` as `multipart/form-data` with a `file` field.

```json
{ "media": { "id": "…", "url": "/media/…", "mimeType": "image/jpeg", "size": 12345, "filename": "cover.jpg" } }
```

Use `url` as `coverImage` or in `images`. The file is stored in the `MediaAsset` table and copied to `UPLOAD_DIR`.

## Docker deploy

The image is `node:22-bookworm-slim`. On start it runs `prisma migrate deploy`, seeds catalogue products (without overwriting edits), and then `npm start`.

```bash
# .env holds POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB for Compose.
# .env.local holds DATABASE_URL (host: postgres), AUTH_SECRET, CMS_API_TOKEN, portal passwords.
docker compose build
docker compose up -d
docker compose exec ithinksite node prisma/seed-users.mjs
```

Useful commands:

```bash
docker compose logs -f ithinksite
docker compose exec ithinksite npx prisma migrate status
```

### Migrations on a database that already has PortalUser

Production was created without a `prisma/migrations` history. The first migration is a baseline:

- `20261106090000_baseline_portal_user` creates `UserRole` and `PortalUser` only if they are missing. It does not drop, truncate, or rewrite the live table.
- `20261106091000_cms_content` adds `Post`, `Product`, and `MediaAsset`.

`prisma migrate deploy` alone returns P3005 on that database, because Prisma will not start a migration history on a non-empty database. It does not change any rows when it refuses. The container entrypoint runs `node prisma/ensure-baseline.mjs` first. That script detects `PortalUser` without a `_prisma_migrations` table and records the baseline as already applied (`prisma migrate resolve --applied 20261106090000_baseline_portal_user`) without executing it. `migrate deploy` then creates only `Post`, `Product`, and `MediaAsset`.

The same two commands are the manual one-time path if you start the app without the entrypoint:

```bash
npx prisma migrate resolve --applied 20261106090000_baseline_portal_user
npx prisma migrate deploy
```

On a brand-new empty database, skip `migrate resolve` and run `npm run db:migrate` only. The baseline SQL itself is also idempotent (`CREATE TABLE IF NOT EXISTS`), so it does not drop or rewrite `PortalUser` if it does run.

Before the first production deploy:

```bash
docker exec <postgres-container> pg_dump -U ithink -d ithinksite > ithinksite-backup.sql
docker exec <postgres-container> psql -U ithink -d ithinksite -c '\d "PortalUser"'
docker exec <postgres-container> psql -U ithink -d ithinksite -c 'SELECT count(*) FROM "PortalUser";'
```

Confirm the live columns match `prisma/schema.prisma` (`id`, `email`, `name`, `role`, `clientId`, `isAdmin`, `passwordHash`, `active`, `createdAt`, `updatedAt`). The baseline will not alter a table that already exists, so a drifted table would keep working only if it already matches.

After deploy:

```bash
docker exec <postgres-container> psql -U ithink -d ithinksite -c 'SELECT count(*) FROM "PortalUser";'
docker compose exec ithinksite npx prisma migrate status
```

The product seed runs on every start and only inserts missing slugs. Staff edits are kept.

### Rollback

Schema migrations are forward-only. To roll back:

1. Restore the SQL backup into Postgres (this returns `PortalUser` and drops the new tables if the dump predates them).
2. Deploy the previous application image:

```bash
docker compose up -d --no-deps ithinksite
```

Do not run `prisma migrate` against the restored database with this codebase unless you intend to re-apply the content tables.

Uploaded images live in Postgres and in the `uploads_data` volume. Restoring only the database is enough to keep the bytes; the app rewrites the volume copy on read if it is missing.

## Public pages

- `/blog` lists published posts (9 per page) and filters by category. Future `publishedAt` values are hidden.
- `/blog/[slug]` renders sanitized Markdown, Open Graph tags, and `Article` JSON-LD.
- `/products` and `/products/[slug]` read the `Product` table. The first seed includes the three products from `src/content/products.ts` plus the previous catalogue on the products page, so the page is not smaller after deploy.
- The home page shows three featured products and the three newest published posts.
- `sitemap.ts` includes published posts and products. `robots.ts` disallows `/admin` and `/api/admin`.

## Security notes

- Markdown is parsed with `marked` and sanitized with `sanitize-html` before it is rendered. Scripts, event handlers, and `javascript:` URLs are stripped.
- Admin and API inputs are validated with Zod (length, slug shape, and http(s) or same-site links only).
- Login is rate-limited in the NextAuth credentials provider.
- No secrets belong in git. `.env`, `.env.local`, and `data/` are ignored. `POSTGRES_PASSWORD` is `${POSTGRES_PASSWORD}` in `docker-compose.yml`.
