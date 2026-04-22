#!/usr/bin/env node
/**
 * WP → Sanity importer for News + Musings.
 *
 *   News    = WP posts filtered by category "News"  → Sanity `newsItem`
 *   Musings = WP CPT "advice"                        → Sanity `musing`
 *
 * Reuses the same HTML → Portable Text converter, image upload, and
 * idempotent ID strategy as the Hearth importer.
 *
 * Run from platform/:
 *   node scripts/import-wp-extras.mjs             # both
 *   node scripts/import-wp-extras.mjs --news      # news only
 *   node scripts/import-wp-extras.mjs --musings   # musings only
 *   node scripts/import-wp-extras.mjs --dry-run
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import { JSDOM } from "jsdom";
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
const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry-run");
const ONLY_NEWS = args.has("--news");
const ONLY_MUSINGS = args.has("--musings");

// --- Sanity client ---------------------------------------------------------
const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

// --- HTML decoders ---------------------------------------------------------
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8216;/g, "\u2018")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&#8211;/g, "\u2013")
    .replace(/&#8212;/g, "\u2014")
    .replace(/&#038;/g, "&")
    .replace(/&#8230;/g, "\u2026")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&mdash;/g, "\u2014")
    .replace(/&hellip;/g, "\u2026")
    .replace(/&apos;/g, "\u2019");

const stripHtml = (s) =>
  decode((s || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());

const truncateWords = (s, max) => {
  if (!s || s.length <= max) return s;
  const sliced = s.slice(0, max);
  const lastSpace = sliced.lastIndexOf(" ");
  const cut = lastSpace > max * 0.6 ? sliced.slice(0, lastSpace) : sliced;
  return cut.replace(/[,;:.!?\-\u2013\u2014]+$/g, "") + "\u2026";
};

// --- HTML → Portable Text (mirrors Hearth importer) ------------------------
const span = (text, marks = []) => ({
  _type: "span",
  _key: randomUUID().slice(0, 12),
  text,
  marks,
});

function walkInline(node, activeMarks, markDefs) {
  if (node.nodeType === 3) {
    return node.nodeValue ? [span(node.nodeValue, activeMarks)] : [];
  }
  if (node.nodeType !== 1) return [];
  const tag = node.tagName.toLowerCase();
  if (tag === "br") return [span("\n", activeMarks)];

  let next = activeMarks;
  if (tag === "em" || tag === "i") next = [...activeMarks, "em"];
  else if (tag === "strong" || tag === "b") next = [...activeMarks, "strong"];
  else if (tag === "a") {
    const href = node.getAttribute("href") || "";
    if (href) {
      const key = randomUUID().slice(0, 12);
      markDefs.push({ _type: "link", _key: key, href });
      next = [...activeMarks, key];
    }
  }

  const out = [];
  for (const child of node.childNodes) out.push(...walkInline(child, next, markDefs));
  return out;
}

const STYLE_FOR_TAG = {
  h1: "h2",
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

// --- image upload ----------------------------------------------------------
async function uploadImage(url) {
  if (!url || !/^https?:\/\//i.test(url)) return null;
  const existing = await client.fetch(
    '*[_type == "sanity.imageAsset" && source.name == "wp" && source.id == $url][0]',
    { url },
  );
  if (existing) return existing._id;
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`    ! image fetch ${res.status} for ${url}`);
    return null;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const filename = path.basename(new URL(url).pathname);
  const asset = await client.assets.upload("image", buf, {
    filename,
    source: { id: url, name: "wp", url },
  });
  return asset._id;
}

// --- WP → Sanity shared mapping -------------------------------------------
function commonFields(wp) {
  const media = (wp._embedded && wp._embedded["wp:featuredmedia"]) || [];
  const featured = media[0]?.source_url ?? null;
  return {
    slug: wp.slug,
    title: decode(wp.title.rendered),
    lede: truncateWords(stripHtml(wp.excerpt?.rendered ?? wp.content?.rendered ?? ""), 220),
    body: wp.content?.rendered ?? "",
    imageUrl: featured,
    imageAlt: media[0]?.alt_text ?? "",
    publishedAt: wp.date,
    tags: (wp._embedded?.["wp:term"] || [])
      .flat()
      .filter((t) => t.taxonomy === "post_tag")
      .map((t) => decode(t.name)),
    externalUrl: wp.link,
  };
}

// --- fetch all pages of a WP endpoint -------------------------------------
async function fetchAll(endpoint, params = {}) {
  const qs = new URLSearchParams({
    per_page: "100",
    _embed: "1",
    ...params,
  });
  const url = `https://willowalexander.co.uk/wp-json/wp/v2/${endpoint}?${qs}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`WP ${endpoint} HTTP ${res.status}`);
  const total = Number(res.headers.get("x-wp-total")) || 0;
  const pages = Number(res.headers.get("x-wp-totalpages")) || 1;
  const all = [...(await res.json())];
  for (let p = 2; p <= pages; p++) {
    const r = await fetch(
      `https://willowalexander.co.uk/wp-json/wp/v2/${endpoint}?${qs}&page=${p}`,
    );
    if (r.ok) all.push(...(await r.json()));
  }
  console.log(`  fetched ${all.length}/${total} from ${endpoint}`);
  return all;
}

// --- NEWS pipeline (post with category News) ------------------------------
async function importNews() {
  console.log("\n=== News ===");
  const wpItems = await fetchAll("posts", { categories: "1" });
  for (const wp of wpItems) {
    const f = commonFields(wp);
    const assetId = !DRY ? await uploadImage(f.imageUrl) : null;
    const body = htmlToPortableText(f.body);
    const doc = {
      _id: `news.${f.slug}`,
      _type: "newsItem",
      title: f.title,
      slug: { _type: "slug", current: f.slug },
      lede: f.lede,
      hero: assetId
        ? {
            _type: "image",
            asset: { _type: "reference", _ref: assetId },
            alt: f.imageAlt || f.title,
          }
        : undefined,
      body,
      author: "House of Willow Alexander",
      externalUrl: f.externalUrl,
      publishedAt: f.publishedAt,
    };
    if (DRY) {
      console.log(`  [dry] ${f.slug} (blocks: ${body.length})`);
      continue;
    }
    await client.createOrReplace(doc);
    console.log(`  \u2713 ${f.slug}  (blocks: ${body.length})`);
  }
}

// --- MUSINGS pipeline (advice CPT) ----------------------------------------
async function importMusings() {
  console.log("\n=== Musings ===");
  const wpItems = await fetchAll("advice");
  for (const wp of wpItems) {
    const f = commonFields(wp);
    const assetId = !DRY ? await uploadImage(f.imageUrl) : null;
    const body = htmlToPortableText(f.body);
    const doc = {
      _id: `musing.${f.slug}`,
      _type: "musing",
      title: f.title,
      slug: { _type: "slug", current: f.slug },
      lede: f.lede,
      hero: assetId
        ? {
            _type: "image",
            asset: { _type: "reference", _ref: assetId },
            alt: f.imageAlt || f.title,
          }
        : undefined,
      body,
      author: "House of Willow Alexander",
      tags: f.tags,
      publishedAt: f.publishedAt,
    };
    if (DRY) {
      console.log(`  [dry] ${f.slug} (blocks: ${body.length})`);
      continue;
    }
    await client.createOrReplace(doc);
    console.log(`  \u2713 ${f.slug}  (blocks: ${body.length})`);
  }
}

// --- main ------------------------------------------------------------------
async function main() {
  console.log(`Target: ${PROJECT_ID}/${DATASET}${DRY ? " [dry-run]" : ""}`);
  if (ONLY_NEWS) await importNews();
  else if (ONLY_MUSINGS) await importMusings();
  else {
    await importNews();
    await importMusings();
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
