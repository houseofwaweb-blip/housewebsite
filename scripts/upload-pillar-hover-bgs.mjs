#!/usr/bin/env node
/**
 * Upload the four pillar hover-background images to Sanity and patch
 * the homepageV3 singleton so each pillar gets a `hoverImage` reference.
 *
 * Source files (PNG) live in:
 *   ../../context/May Ai House and Howa images /surreal-*-background.png
 *
 * Pipeline:
 *   1. Optimise each PNG to WebP (max 2400px long edge, q86 effort 6)
 *   2. Upload to Sanity (idempotent via source.id `homepageV3/pillar-<name>-bg.webp`)
 *   3. Patch homepageV3.pillars[i].hoverImage with the asset ref
 *
 * Usage:
 *   node scripts/upload-pillar-hover-bgs.mjs --dry-run
 *   node scripts/upload-pillar-hover-bgs.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import sharp from "sharp";

// --- env ---
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const envFile = path.join(root, ".env.local");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

const PROJECT_ID = process.env.SANITY_PROJECT_ID;
const DATASET = process.env.SANITY_DATASET || "production";
const TOKEN =
  process.env.SANITY_MANAGEMENT_TOKEN ||
  process.env.SANITY_TOKEN ||
  process.env.SANITY_READ_TOKEN;
if (!PROJECT_ID || !TOKEN) {
  console.error("Missing SANITY_PROJECT_ID or token");
  process.exit(1);
}
const DRY = process.argv.includes("--dry-run");

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

// Source PNG → pillar mapping. Pillar key matches the _key in
// homepageV3.pillars (p-dc / p-pr / p-sh / p-he).
const PILLAR_BGS = [
  {
    key: "p-dc",
    sourcePng: "surreal-design-background.png",
    targetWebp: "pillar-design-care-bg.webp",
    alt: "Design & Care — surreal interior",
  },
  {
    key: "p-pr",
    sourcePng: "surreal-protect-background.png",
    targetWebp: "pillar-protect-bg.webp",
    alt: "Protect — surreal interior",
  },
  {
    key: "p-sh",
    sourcePng: "surreal-bathroom-pedestal-pink-peony-background.png",
    targetWebp: "pillar-shop-bg.webp",
    alt: "Shop — surreal pedestal with pink peony",
  },
  {
    key: "p-he",
    sourcePng: "surreal-the-hearth-background.png",
    targetWebp: "pillar-hearth-bg.webp",
    alt: "The Hearth — surreal interior",
  },
];

const SOURCE_DIR = path.resolve(root, "..", "context", "May Ai House and Howa images ");
const TMP_DIR = "/tmp/pillar-hover-bgs";

async function ensureOptimised() {
  fs.mkdirSync(TMP_DIR, { recursive: true });
  for (const p of PILLAR_BGS) {
    const src = path.join(SOURCE_DIR, p.sourcePng);
    const dst = path.join(TMP_DIR, p.targetWebp);
    if (!fs.existsSync(src)) {
      console.error(`  ✗ source missing: ${p.sourcePng}`);
      process.exit(1);
    }
    if (fs.existsSync(dst)) {
      console.log(`  · already optimised: ${p.targetWebp}`);
      continue;
    }
    const meta = await sharp(src).metadata();
    const info = await sharp(src)
      .resize({ width: 2400, withoutEnlargement: true })
      .webp({ quality: 86, effort: 6 })
      .toFile(dst);
    console.log(
      `  ✓ optimised: ${p.targetWebp} (${meta.width}x${meta.height} → ${info.width}x${info.height}, ${Math.round(info.size / 1024)}KB)`,
    );
  }
}

async function uploadImage(filename, alt) {
  const filePath = path.join(TMP_DIR, filename);
  const sourceId = `homepageV3/${filename}`;
  const existing = await client.fetch(
    '*[_type == "sanity.imageAsset" && source.id == $id][0]{_id}',
    { id: sourceId },
  );
  if (existing?._id) {
    console.log(`  · cached: ${filename} (${existing._id})`);
    return existing._id;
  }
  if (DRY) {
    console.log(`  [dry] would upload: ${filename}`);
    return `image-DRY-${filename}`;
  }
  const buf = fs.readFileSync(filePath);
  // Retry with backoff in case of 502s (seen previously)
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const asset = await client.assets.upload("image", buf, {
        filename,
        contentType: "image/webp",
        source: { id: sourceId, name: "homepageV3", url: filename },
      });
      console.log(`  ✓ uploaded: ${filename} (${asset._id})`);
      return asset._id;
    } catch (err) {
      lastErr = err;
      console.warn(`  ! upload attempt ${attempt} failed: ${err.message}`);
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
  throw lastErr;
}

const imgRef = (assetId, alt) =>
  assetId
    ? { _type: "image", asset: { _type: "reference", _ref: assetId }, alt: alt || "" }
    : undefined;

async function main() {
  console.log(`Target: ${PROJECT_ID}/${DATASET}${DRY ? " [dry-run]" : ""}\n`);

  console.log("Optimising PNGs → WebP …");
  await ensureOptimised();

  console.log("\nUploading to Sanity …");
  const uploads = {};
  for (const p of PILLAR_BGS) {
    uploads[p.key] = await uploadImage(p.targetWebp, p.alt);
  }

  console.log("\nFetching current homepageV3.pillars …");
  const doc = await client.fetch(
    '*[_id == "homepageV3"][0]{ pillars[]{ _key, name } }',
  );
  if (!doc?.pillars?.length) {
    console.error("homepageV3 doc has no pillars — run seed-home-v3.mjs first");
    process.exit(1);
  }
  for (const p of doc.pillars) {
    console.log(`  · ${p._key} → ${p.name}`);
  }

  console.log("\nPatching pillar.hoverImage references …");
  const tx = client.transaction();
  for (const p of PILLAR_BGS) {
    const assetId = uploads[p.key];
    if (!assetId || assetId.startsWith("image-DRY-")) {
      console.log(`  [dry] would set ${p.key}.hoverImage → ${p.targetWebp}`);
      continue;
    }
    tx.patch("homepageV3", (patch) =>
      patch.set({
        [`pillars[_key=="${p.key}"].hoverImage`]: imgRef(assetId, p.alt),
      }),
    );
    console.log(`  ✓ patch queued: ${p.key}.hoverImage`);
  }

  if (DRY) {
    console.log("\n[dry-run] no commit");
    return;
  }
  await tx.commit();
  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
