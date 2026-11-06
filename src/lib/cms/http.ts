import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { rateLimit } from "@/lib/rate-limit";

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function tokensMatch(provided: string, expected: string) {
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

/** Bearer-token gate for the assistant API. Session cookies are ignored, so this is not CSRF-able. */
export function requireApiToken(req: Request) {
  const secret = process.env.CMS_API_TOKEN;
  if (!secret) {
    return json({ error: "CMS API is not configured" }, 503);
  }

  const header = req.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token || !tokensMatch(token, secret)) {
    return json({ error: "Unauthorized" }, 401);
  }

  const limit = rateLimit("cms-api", 120, 60_000);
  if (!limit.ok) {
    return json({ error: "Too many requests", retryAfter: limit.retryAfter }, 429);
  }

  return null;
}

export async function readJson(req: Request, maxBytes = 1_000_000) {
  const length = Number(req.headers.get("content-length") || 0);
  if (length > maxBytes) {
    return { error: json({ error: "Payload too large" }, 413) };
  }
  try {
    return { data: await req.json() };
  } catch {
    return { error: json({ error: "Invalid JSON" }, 400) };
  }
}

export function validationError(error: ZodError) {
  return json(
    {
      error: "Invalid input",
      details: error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    },
    400,
  );
}

export function isUniqueViolation(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "P2002";
}
