import "server-only";
import path from "node:path";
import sharp from "sharp";

/**
 * Reads the intrinsic pixel size of an image in /public, cached per path.
 * Lets server components render <Image> at the file's true aspect ratio so
 * nothing is stretched or upscaled. Falls back to a 4:3 guess if unreadable.
 */
const cache = new Map<string, { width: number; height: number }>();

export async function getPublicImageSize(src: string): Promise<{ width: number; height: number }> {
  const cached = cache.get(src);
  if (cached) return cached;
  const file = path.join(process.cwd(), "public", src.replace(/^\//, ""));
  try {
    const meta = await sharp(file).metadata();
    const dims = { width: meta.width ?? 1600, height: meta.height ?? 1200 };
    cache.set(src, dims);
    return dims;
  } catch {
    return { width: 1600, height: 1200 };
  }
}
