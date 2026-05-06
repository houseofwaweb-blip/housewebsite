#!/usr/bin/env node
/**
 * Optimise homepage v2 images.
 *
 * Reads source images from context/May Ai House and Howa images/, applies
 * proper resize + WebP conversion, writes to /tmp/home-v2-optimised/.
 * Output is then consumed by upload-home-v2-to-sanity.mjs.
 *
 * Phones (which need transparency) -> WebP with alpha at q=90.
 * Hero / panels / pillar shots (opaque)              -> WebP at q=85.
 * Temperament panels (illustrations + flat tones)    -> WebP at q=88.
 *
 * Long-edge cap is 2000px (more than enough at 2x retina for any cell on
 * the page — Sanity image CDN further resizes on the fly via urlFor()).
 */

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC_DIR = "/Users/willowalexander/Projects/House Redesign/context/May Ai House and Howa images ";
const OUT_DIR = "/tmp/home-v2-optimised";
fs.mkdirSync(OUT_DIR, { recursive: true });

const JOBS = [
  // hero
  { src: "home-hero.png", out: "hero.webp", maxLong: 1800, q: 85, alpha: false },

  // phone mockups (already bg-removed in /no-bg/) — keep alpha
  { src: "no-bg/phone1.png", out: "phone-assistant.webp", maxLong: 900, q: 90, alpha: true },
  { src: "no-bg/phone2.png", out: "phone-housekeeper.webp", maxLong: 900, q: 90, alpha: true },
  { src: "no-bg/phone3.png", out: "phone-steward.webp", maxLong: 900, q: 90, alpha: true },

  // temperament panels (illustrations) — 4:5 portrait
  { src: "I The Keeper.png", out: "temperament-keeper.webp", maxLong: 1200, q: 88, alpha: false },
  { src: "II The Maker.png", out: "temperament-maker.webp", maxLong: 1200, q: 88, alpha: false },
  { src: "III The Guardian.png", out: "temperament-guardian.webp", maxLong: 1200, q: 88, alpha: false },
  { src: "IV The Gardener.png", out: "temperament-gardener.webp", maxLong: 1200, q: 88, alpha: false },

  // pillar images
  { src: "mockup-crumpled-paper-home-app-poster.jpg", out: "pillar-design-care.webp", maxLong: 1400, q: 85, alpha: false },
  { src: "house-townhouse-night-blue-window.png", out: "pillar-protect.webp", maxLong: 1200, q: 85, alpha: false },
  { src: "floral-arrangement.png", out: "pillar-shop.webp", maxLong: 1200, q: 85, alpha: false },
  { src: "book-on-counter.png", out: "pillar-hearth.webp", maxLong: 1200, q: 85, alpha: false },
];

async function run() {
  console.log(`Optimising ${JOBS.length} images...`);
  const summary = [];
  for (const job of JOBS) {
    const srcPath = path.join(SRC_DIR, job.src);
    const outPath = path.join(OUT_DIR, job.out);
    if (!fs.existsSync(srcPath)) {
      console.warn(`  ! missing: ${job.src}`);
      continue;
    }
    const srcBytes = fs.statSync(srcPath).size;
    const meta = await sharp(srcPath).metadata();

    let pipeline = sharp(srcPath);
    if (meta.width > job.maxLong || meta.height > job.maxLong) {
      pipeline = pipeline.resize({
        width: job.maxLong,
        height: job.maxLong,
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    await pipeline
      .webp({
        quality: job.q,
        effort: 6,
        alphaQuality: job.alpha ? 95 : 100,
      })
      .toFile(outPath);

    const outBytes = fs.statSync(outPath).size;
    const outMeta = await sharp(outPath).metadata();
    const ratio = ((1 - outBytes / srcBytes) * 100).toFixed(0);
    summary.push({
      src: job.src,
      out: job.out,
      from: `${meta.width}x${meta.height} ${(srcBytes / 1024).toFixed(0)}KB`,
      to: `${outMeta.width}x${outMeta.height} ${(outBytes / 1024).toFixed(0)}KB`,
      saved: `${ratio}%`,
    });
    console.log(`  ✓ ${job.src} → ${job.out}  (${(srcBytes / 1024).toFixed(0)}KB → ${(outBytes / 1024).toFixed(0)}KB, -${ratio}%)`);
  }
  fs.writeFileSync(
    path.join(OUT_DIR, "_manifest.json"),
    JSON.stringify(summary, null, 2),
  );
  console.log(`\nDone. ${summary.length} images optimised in ${OUT_DIR}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
