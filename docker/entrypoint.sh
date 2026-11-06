#!/bin/sh
set -eu

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is required" >&2
  exit 1
fi

echo "Checking migration history..."
node prisma/ensure-baseline.mjs

echo "Applying database migrations..."
./node_modules/.bin/prisma migrate deploy

echo "Seeding catalogue products (existing rows are left unchanged)..."
node prisma/seed-content.mjs

mkdir -p "${UPLOAD_DIR:-/data/uploads}"

echo "Starting Next.js on port ${PORT:-3000}..."
exec npm start
