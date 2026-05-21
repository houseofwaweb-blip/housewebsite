#!/usr/bin/env node
/**
 * WooCommerce dump → Sanity `product` documents.
 *
 * Reads src/lib/shop-data/woo-catalogue.json (501 products + 1,856
 * images), uploads each image to Sanity's asset CDN, then creates a
 * `product` document referencing those assets.
 *
 * Idempotent: deterministic _id = `product-<handle>`. Skips any product
 * whose document already exists. Sanity dedupes images by SHA-1 hash,
 * so re-uploading the same source URL is free.
 *
 * Run from platform/:
 *   node scripts/import-products-to-sanity.mjs              # full run
 *   node scripts/import-products-to-sanity.mjs --limit 5    # first 5 only (test)
 *   node scripts/import-products-to-sanity.mjs --dry-run    # parse + log, no writes
 *   node scripts/import-products-to-sanity.mjs --resume     # skip docs that already exist (default)
 *   node scripts/import-products-to-sanity.mjs --replace    # createOrReplace existing docs
 *
 * Expected runtime: 30–60 minutes for the full 501 products. Image
 * downloads are the long pole; the script processes products serially
 * to keep memory low and respect Sanity's mutation rate limits.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";

// --- env loader ------------------------------------------------------------
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
const TOKEN = process.env.SANITY_MANAGEMENT_TOKEN || process.env.SANITY_TOKEN;

if (!PROJECT_ID || !TOKEN) {
  console.error("Missing SANITY_PROJECT_ID or SANITY_MANAGEMENT_TOKEN in .env.local");
  process.exit(1);
}

// --- flags -----------------------------------------------------------------
const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const REPLACE = args.includes("--replace");
const limitIdx = args.indexOf("--limit");
const LIMIT = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : Infinity;

// --- sanity client ---------------------------------------------------------
const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

// --- catalogue dump --------------------------------------------------------
const CATALOGUE_PATH = path.join(root, "src/lib/shop-data/woo-catalogue.json");
if (!fs.existsSync(CATALOGUE_PATH)) {
  console.error(`Catalogue dump not found at ${CATALOGUE_PATH}`);
  process.exit(1);
}
const catalogue = JSON.parse(fs.readFileSync(CATALOGUE_PATH, "utf8"));
const allProducts = catalogue.products ?? [];
const products = allProducts.slice(0, Number.isFinite(LIMIT) ? LIMIT : allProducts.length);

console.log("");
console.log("───────────────────────────────────────────────");
console.log("  WooCommerce → Sanity product import");
console.log("───────────────────────────────────────────────");
console.log(`  Project:   ${PROJECT_ID}`);
console.log(`  Dataset:   ${DATASET}`);
console.log(`  Products:  ${products.length}${Number.isFinite(LIMIT) ? ` (limited from ${allProducts.length})` : ""}`);
console.log(`  Mode:      ${DRY ? "DRY-RUN (no writes)" : REPLACE ? "REPLACE (overwrites existing)" : "RESUME (skips existing)"}`);
console.log("───────────────────────────────────────────────");
console.log("");

// --- helpers ---------------------------------------------------------------

/**
 * "£48" → 4800. "£1,250.50" → 125050. Returns null on unparseable input.
 */
function parsePriceToMinor(raw) {
  if (!raw || typeof raw !== "string") return null;
  const cleaned = raw.replace(/[^0-9.]/g, "");
  if (!cleaned) return null;
  const n = parseFloat(cleaned);
  if (!Number.isFinite(n)) return null;
  return Math.round(n * 100);
}

/**
 * Map availability flags from the WC dump to our Sanity enum. Most
 * launch products were imported with inStock:false (WP store dump
 * timing), so default to "available_soon" — Alex can flip per product.
 */
function deriveAvailability(p) {
  if (p.inStock === true) return "in_stock";
  return "available_soon";
}

/** Convert plain-string body to a single Portable Text block. */
function bodyToPortableText(body) {
  if (!body) return [];
  return [
    {
      _type: "block",
      _key: randomUUID().slice(0, 12),
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: randomUUID().slice(0, 12),
          text: body,
          marks: [],
        },
      ],
    },
  ];
}

/**
 * Download an image URL and upload to Sanity's asset CDN. Sanity dedupes
 * by SHA-1, so calling this with the same URL multiple times returns the
 * existing asset reference and uses no extra storage.
 *
 * Returns { _id, url, originalFilename } on success, null on failure.
 */
async function uploadImage(imageUrl, altText) {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) {
      console.warn(`    ✗ image fetch ${res.status}: ${imageUrl}`);
      return null;
    }
    const arrayBuf = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);
    const filename = path.basename(new URL(imageUrl).pathname);
    const asset = await client.assets.upload("image", buffer, {
      filename,
      // alt text is per-usage, not on the asset itself — we set it
      // in the product document below.
    });
    return { _id: asset._id, url: asset.url, originalFilename: filename };
  } catch (err) {
    console.warn(`    ✗ image upload: ${err.message || err}`);
    return null;
  }
}

function buildImageField(asset, alt) {
  if (!asset) return null;
  return {
    _type: "image",
    _key: randomUUID().slice(0, 12),
    asset: { _type: "reference", _ref: asset._id },
    ...(alt ? { alt } : {}),
  };
}

// --- main loop -------------------------------------------------------------

let imported = 0;
let skipped = 0;
let failed = 0;
const start = Date.now();

for (let i = 0; i < products.length; i++) {
  const p = products[i];
  const idx = `[${i + 1}/${products.length}]`;
  const docId = `product-${p.handle}`;

  if (!DRY && !REPLACE) {
    const existing = await client.fetch(`*[_id == $id][0]{_id}`, { id: docId });
    if (existing) {
      console.log(`${idx} ⊘ skip  ${p.title}  (already exists)`);
      skipped++;
      continue;
    }
  }

  console.log(`${idx} → ${p.title}`);

  try {
    // ---- Upload primary image -------------------------------------------
    let primaryImage = null;
    if (p.image) {
      const asset = DRY ? { _id: "dry-asset-primary" } : await uploadImage(p.image, p.title);
      primaryImage = asset ? buildImageField(asset, p.images?.[0]?.alt ?? p.title) : null;
    }

    // ---- Upload gallery images ------------------------------------------
    const gallery = [];
    const galleryImages = (p.images ?? []).slice(0, 12);
    for (const img of galleryImages) {
      if (!img.src) continue;
      const asset = DRY ? { _id: "dry-asset-gallery" } : await uploadImage(img.src, img.alt);
      const field = asset ? buildImageField(asset, img.alt) : null;
      if (field) gallery.push(field);
    }

    // ---- Build product doc ----------------------------------------------
    const priceMinor = parsePriceToMinor(p.price);
    const compareAtMinor = parsePriceToMinor(p.compareAtPrice);
    if (priceMinor === null) {
      console.warn(`    ✗ unparseable price: "${p.price}"`);
      failed++;
      continue;
    }

    const doc = {
      _id: docId,
      _type: "product",
      title: p.title,
      handle: { _type: "slug", current: p.handle },
      lede: p.lede ?? "",
      body: bodyToPortableText(p.body),
      collection: p.collection ?? null,
      brand: p.brand ?? null,
      houseApproved: !!p.houseApproved,
      priceMinor,
      ...(compareAtMinor !== null ? { compareAtMinor } : {}),
      currency: "GBP",
      sku: p.sku ?? null,
      availability: deriveAvailability(p),
      onSale: !!p.onSale,
      ...(primaryImage ? { primaryImage } : {}),
      ...(gallery.length > 0 ? { gallery } : {}),
      sourceWooSlug: p.handle,
    };

    if (DRY) {
      console.log(`    ✓ dry-run — would write doc with ${gallery.length} gallery images`);
    } else {
      if (REPLACE) {
        await client.createOrReplace(doc);
      } else {
        await client.createIfNotExists(doc);
      }
      console.log(`    ✓ imported — ${gallery.length} gallery images`);
    }
    imported++;
  } catch (err) {
    console.error(`    ✗ failed: ${err.message || err}`);
    failed++;
  }
}

const minutes = ((Date.now() - start) / 60000).toFixed(1);
console.log("");
console.log("───────────────────────────────────────────────");
console.log(`  Imported:  ${imported}`);
console.log(`  Skipped:   ${skipped}`);
console.log(`  Failed:    ${failed}`);
console.log(`  Duration:  ${minutes} min`);
console.log("───────────────────────────────────────────────");
console.log("");

if (failed > 0) {
  console.log("Some products failed — re-run the script to retry them. The script is");
  console.log("idempotent: successful products are skipped on subsequent runs.");
  process.exit(1);
}
