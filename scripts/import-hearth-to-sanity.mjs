#!/usr/bin/env node
/**
 * Hearth → Sanity importer.
 *
 * Reads src/lib/hearth-data/wp-import/articles.json (the transformed WP
 * export) and writes it into the live Sanity project:
 *
 *   1. Create (or reuse) articleCategory documents for each unique
 *      categoryLong value.
 *   2. For each article:
 *        a. Download the WP featured image, upload to Sanity assets.
 *        b. Convert WP HTML body → Portable Text via @sanity/block-tools.
 *        c. Create the article document with:
 *             - slug, title, lede, author, publishedAt, isPremium, season, seo
 *             - hero image reference
 *             - category reference
 *             - body (Portable Text blocks)
 *   3. Idempotent: uses deterministic IDs derived from slug / category name,
 *      so re-running updates rather than duplicating.
 *
 * Env required (loaded from platform/.env.local):
 *   SANITY_PROJECT_ID
 *   SANITY_DATASET (default: production)
 *   SANITY_MANAGEMENT_TOKEN (editor-level write access)
 *
 * Run from platform/:  node scripts/import-hearth-to-sanity.mjs
 *                      node scripts/import-hearth-to-sanity.mjs --limit=5
 *                      node scripts/import-hearth-to-sanity.mjs --dry-run
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import { JSDOM } from "jsdom";
import { randomUUID } from "node:crypto";

// ---------------------------------------------------------------------------
// Env loader (minimal — supabase-style .env parser)
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------
const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry-run");
const limitArg = [...args].find((a) => a.startsWith("--limit="));
const LIMIT = limitArg ? parseInt(limitArg.split("=")[1], 10) : Infinity;

// ---------------------------------------------------------------------------
// Sanity client
// ---------------------------------------------------------------------------
const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

// ---------------------------------------------------------------------------
// HTML → Portable Text (minimal, hand-rolled to avoid @sanity/block-tools'
// schema-compile requirement).
//
// Supports: p, h2, h3, h4, ul/ol/li, blockquote, em, strong, a.
// Inline-level marks are emitted as Portable Text "markDefs" (for links) or
// "marks" arrays (for em/strong) on the child spans.
// ---------------------------------------------------------------------------
const newSpan = (text, marks = []) => ({
  _type: "span",
  _key: randomUUID().slice(0, 12),
  text,
  marks,
});

function walkInline(node, activeMarks, markDefs) {
  // Text node → single span
  if (node.nodeType === 3) {
    return node.nodeValue ? [newSpan(node.nodeValue, activeMarks)] : [];
  }
  if (node.nodeType !== 1) return [];
  const tag = node.tagName.toLowerCase();

  // <br> → soft break preserved as "\n"
  if (tag === "br") return [newSpan("\n", activeMarks)];

  // Build next mark list + push a markDef for links
  let nextMarks = activeMarks;
  if (tag === "em" || tag === "i") nextMarks = [...activeMarks, "em"];
  else if (tag === "strong" || tag === "b") nextMarks = [...activeMarks, "strong"];
  else if (tag === "a") {
    const href = node.getAttribute("href") || "";
    if (href) {
      const key = randomUUID().slice(0, 12);
      markDefs.push({ _type: "link", _key: key, href });
      nextMarks = [...activeMarks, key];
    }
  }

  // Walk children collecting spans
  const out = [];
  for (const child of node.childNodes) {
    out.push(...walkInline(child, nextMarks, markDefs));
  }
  return out;
}

const STYLE_FOR_TAG = {
  h1: "h2", // demote — site reserves h1 for page titles
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h4",
  h6: "h4",
  blockquote: "blockquote",
  p: "normal",
  div: "normal",
};

function htmlToPortableText(html) {
  if (!html) return [];
  const dom = new JSDOM(`<!doctype html><body>${html}</body>`);
  const body = dom.window.document.body;
  const blocks = [];

  const pushTextBlock = (node, style) => {
    const markDefs = [];
    const children = walkInline(node, [], markDefs);
    if (!children.length) return;
    // Drop blocks that are whitespace-only
    const combined = children.map((c) => c.text).join("").trim();
    if (!combined) return;
    blocks.push({
      _type: "block",
      _key: randomUUID().slice(0, 12),
      style,
      markDefs,
      children,
    });
  };

  const pushList = (listNode, ordered) => {
    for (const li of listNode.children) {
      if (li.tagName.toLowerCase() !== "li") continue;
      const markDefs = [];
      const children = walkInline(li, [], markDefs);
      if (!children.length) continue;
      blocks.push({
        _type: "block",
        _key: randomUUID().slice(0, 12),
        style: "normal",
        listItem: ordered ? "number" : "bullet",
        level: 1,
        markDefs,
        children,
      });
    }
  };

  for (const node of body.children) {
    const tag = node.tagName.toLowerCase();
    if (tag === "ul") pushList(node, false);
    else if (tag === "ol") pushList(node, true);
    else if (STYLE_FOR_TAG[tag]) pushTextBlock(node, STYLE_FOR_TAG[tag]);
    else pushTextBlock(node, "normal");
  }

  return blocks;
}

// ---------------------------------------------------------------------------
// Category mapping — WP long category → Sanity doc.
// Deterministic IDs so re-running is idempotent.
// ---------------------------------------------------------------------------
const slugify = (s) =>
  s.toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const categoryDocId = (categoryLong) => `category.${slugify(categoryLong)}`;
const articleDocId = (slug) => `article.${slug}`;

async function ensureCategory(categoryLong) {
  const _id = categoryDocId(categoryLong);
  const existing = await client.fetch("*[_id == $id][0]", { id: _id });
  if (existing) return _id;
  if (DRY) {
    console.log(`  [dry] would create category: ${categoryLong}`);
    return _id;
  }
  await client.createIfNotExists({
    _id,
    _type: "articleCategory",
    name: categoryLong,
    slug: { _type: "slug", current: slugify(categoryLong) },
    order: 0,
  });
  console.log(`  ✓ category: ${categoryLong}`);
  return _id;
}

async function uploadImageForArticle(article) {
  if (!article.image) return null;
  // Skip placeholder / relative paths — only upload real WP CDN URLs.
  if (!/^https?:\/\//i.test(article.image)) return null;
  if (DRY) {
    console.log(`  [dry] would upload image from ${article.image}`);
    return null;
  }
  // Skip if this asset already exists for the slug.
  // Sanity doesn't let us pick the asset _id, so we stash the WP URL as a
  // metadata field and look it up on re-run.
  const existing = await client.fetch(
    '*[_type == "sanity.imageAsset" && source.name == "wp" && source.id == $url][0]',
    { url: article.image },
  );
  if (existing) return existing._id;

  const res = await fetch(article.image);
  if (!res.ok) {
    console.warn(`  ! image fetch failed (${res.status}) for ${article.slug}`);
    return null;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const filename = path.basename(new URL(article.image).pathname);
  const asset = await client.assets.upload("image", buf, {
    filename,
    source: { id: article.image, name: "wp", url: article.image },
  });
  return asset._id;
}


// ---------------------------------------------------------------------------
// Article upsert
// ---------------------------------------------------------------------------
async function upsertArticle(article) {
  const catId = await ensureCategory(article.categoryLong);
  const imageAssetId = await uploadImageForArticle(article);

  const doc = {
    _id: articleDocId(article.slug),
    _type: "article",
    title: article.title,
    slug: { _type: "slug", current: article.slug },
    lede: article.dek,
    hero: imageAssetId
      ? {
          _type: "image",
          asset: { _type: "reference", _ref: imageAssetId },
          alt: article.imageAlt || article.title,
        }
      : undefined,
    body: htmlToPortableText(article.body),
    category: { _type: "reference", _ref: catId },
    author: article.author,
    publishedAt: article.publishedAt,
    isPremium: false,
  };

  if (DRY) {
    console.log(`  [dry] would upsert ${article.slug} (body blocks: ${doc.body.length})`);
    return;
  }

  await client.createOrReplace(doc);
  console.log(`  ✓ ${article.slug}  (body blocks: ${doc.body.length})`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const articlesPath = path.join(
    root,
    "src/lib/hearth-data/wp-import/articles.json",
  );
  const articles = JSON.parse(fs.readFileSync(articlesPath, "utf8"));
  const toImport = articles.slice(0, LIMIT);
  console.log(
    `Importing ${toImport.length}/${articles.length} articles` +
      (DRY ? " [dry-run]" : "") +
      ` → ${PROJECT_ID}/${DATASET}`,
  );

  // Ensure each unique category up front
  const uniqueCats = [...new Set(toImport.map((a) => a.categoryLong))];
  console.log(`\nCategories (${uniqueCats.length}):`);
  for (const c of uniqueCats) await ensureCategory(c);

  console.log(`\nArticles:`);
  let ok = 0;
  let fail = 0;
  for (const a of toImport) {
    try {
      await upsertArticle(a);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${a.slug}: ${err.message}`);
      fail++;
    }
  }

  console.log(`\nDone. ${ok} ok, ${fail} failed.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
