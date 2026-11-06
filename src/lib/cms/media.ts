import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";

const MAX_BYTES = 5 * 1024 * 1024;

export function uploadDir() {
  return process.env.UPLOAD_DIR || path.join(process.cwd(), "data", "uploads");
}

function detectImage(buf: Buffer) {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (
    buf.length >= 8 &&
    buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  ) {
    return "image/png";
  }
  const head = buf.subarray(0, 6).toString("ascii");
  if (head === "GIF87a" || head === "GIF89a") return "image/gif";
  if (buf.length >= 12 && buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP") {
    return "image/webp";
  }
  return null;
}

function safeName(name: string) {
  const base = path.basename(name).replace(/[^A-Za-z0-9._-]/g, "_");
  return base.slice(0, 120) || "image";
}

export function decodeBase64Image(input: string) {
  const stripped = input.replace(/^data:[^;]+;base64,/i, "").replace(/\s/g, "");
  return Buffer.from(stripped, "base64");
}

export async function saveImageBytes(bytes: Buffer, filename: string) {
  if (bytes.length <= 0 || bytes.length > MAX_BYTES) {
    return { ok: false as const, error: "Image must be between 1 byte and 5 MB" };
  }

  const mimeType = detectImage(bytes);
  if (!mimeType) {
    return { ok: false as const, error: "Only JPEG, PNG, GIF, and WebP images are accepted" };
  }

  const asset = await prisma.mediaAsset.create({
    data: {
      filename: safeName(filename || "image"),
      mimeType,
      size: bytes.length,
      bytes,
    },
  });

  try {
    const dir = uploadDir();
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, asset.id), bytes);
  } catch (error) {
    console.error("Upload volume write failed; image remains stored in the database.", error);
  }

  return {
    ok: true as const,
    media: {
      id: asset.id,
      url: `/media/${asset.id}`,
      mimeType: asset.mimeType,
      size: asset.size,
      filename: asset.filename,
    },
  };
}

export async function saveImageUpload(file: File) {
  return saveImageBytes(Buffer.from(await file.arrayBuffer()), file.name || "image");
}

export async function readMedia(id: string) {
  if (!/^[A-Za-z0-9_-]+$/.test(id)) return null;
  const asset = await prisma.mediaAsset.findUnique({ where: { id } });
  if (!asset) return null;

  const diskPath = path.join(uploadDir(), id);
  try {
    const fromDisk = await readFile(diskPath);
    return { mimeType: asset.mimeType, filename: asset.filename, bytes: fromDisk };
  } catch {
    const bytes = Buffer.from(asset.bytes);
    try {
      await mkdir(uploadDir(), { recursive: true });
      await writeFile(diskPath, bytes);
    } catch {
      // Serving from the database is enough when the volume is read-only.
    }
    return { mimeType: asset.mimeType, filename: asset.filename, bytes };
  }
}
