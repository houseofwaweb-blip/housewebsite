#!/usr/bin/env node
/**
 * Transform WordPress howa_living REST export → HearthArticle[].
 * Run: `node src/lib/hearth-data/wp-import/transform.mjs`
 *
 * Reads ./articles.raw.json (fetched via the preamble curl).
 * Writes ./articles.json — clean, shape-matched to HearthArticle[].
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

const raw = JSON.parse(fs.readFileSync(path.join(here, "articles.raw.json"), "utf8"));

// Decode common HTML entities in titles/category labels without importing deps.
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#038;/g, "&")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&hellip;/g, "…")
    .replace(/&apos;/g, "’");

const stripHtml = (s) => decode(s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());

/** Truncate at nearest word boundary, preserving punctuation, add single ellipsis. */
const truncateWords = (s, max) => {
  if (s.length <= max) return s;
  const sliced = s.slice(0, max);
  const lastSpace = sliced.lastIndexOf(" ");
  const cut = lastSpace > max * 0.6 ? sliced.slice(0, lastSpace) : sliced;
  return cut.replace(/[,;:.!?\-–—]+$/g, "") + "…";
};

const estimateReadTime = (html) => {
  const words = stripHtml(html).split(/\s+/).length;
  return Math.max(3, Math.round(words / 200));
};

/**
 * Pick an italic "em-accent" substring from a headline so the magazine gets
 * its editorial italic tail, the way variant-A shows it.
 *
 * Heuristics, in order:
 *   1. Break at a mid-title ". " or " — " or ": " → em = everything after it
 *   2. Break at a connective word after word 3 (that / for / with / on / as
 *      / of / to / in / by) → em = that word and everything after
 *   3. If the headline has ≥ 6 words, italicise the last ≈40%
 *   4. Otherwise return null and let the title render plain
 *
 * Returned string must be a substring of the title so HearthTitle can split.
 */
const pickTitleEm = (raw) => {
  const title = raw.trim().replace(/[.!?]$/, "");

  // 1. Explicit punctuation break
  const punctMatch = title.match(/^(.+?)(?:\.\s+|\s—\s+|:\s+)(.+)$/);
  if (punctMatch && punctMatch[1].split(/\s+/).length >= 2) {
    return punctMatch[2];
  }

  // 2. Connective word (only past word 3)
  const words = title.split(/\s+/);
  const connectives = new Set([
    "that", "for", "with", "on", "as", "of", "to", "in", "by",
  ]);
  for (let i = 3; i < words.length - 1; i++) {
    if (connectives.has(words[i].toLowerCase())) {
      return words.slice(i).join(" ");
    }
  }

  // 3. Last ~40% of words if headline is long
  if (words.length >= 6) {
    const start = Math.ceil(words.length * 0.6);
    return words.slice(start).join(" ");
  }

  return null;
};

// Map WP category → short label for our card UI
const SHORT_CATEGORY = {
  "COLOUR & MATERIALS": "Palette",
  "DESIGN & ARCHITECTURE": "Architecture",
  "GARDENS & EXTERIORS": "Gardens",
  "HERITAGE & CULTURE": "Heritage",
  "INTERIORS & STYLING": "Interiors",
  "TRENDS & INSPIRATION": "Trends",
};

const articles = raw
  .map((a) => {
    const terms = (a._embedded && a._embedded["wp:term"]) || [];
    const cats = terms
      .flat()
      .filter((t) => t.taxonomy === "howa_living_category")
      .map((t) => decode(t.name));
    const media = (a._embedded && a._embedded["wp:featuredmedia"]) || [];
    const image = media[0]?.source_url ?? null;
    const mediaAlt = media[0]?.alt_text ?? "";
    const primaryCat = cats[0] || "Essays";
    const shortCat = SHORT_CATEGORY[primaryCat] || primaryCat;
    const title = decode(a.title.rendered);
    return {
      slug: a.slug,
      title,
      titleEm: pickTitleEm(title) ?? undefined,
      category: shortCat,
      categoryLong: primaryCat,
      categorySlug: primaryCat.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      image: image || "/hearth/art-lead.png",
      imageAlt: mediaAlt,
      dek: truncateWords(stripHtml(a.excerpt.rendered), 200),
      author: "House of Willow Alexander",
      publishedAt: a.date,
      readTimeMinutes: estimateReadTime(a.content.rendered),
      body: a.content.rendered,
      wpId: a.id,
    };
  })
  // newest first
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

fs.writeFileSync(
  path.join(here, "articles.json"),
  JSON.stringify(articles, null, 2),
);

// Split helper — builds the page sections from the chronological list.
const split = {
  hero: articles[0],
  secondary: articles.slice(1, 4),
  mainFeed: articles.slice(4, 10),
  popular: articles.slice(10, 15).map((a) => ({
    slug: a.slug,
    tag: a.category,
    title: a.title,
    titleEm: a.titleEm,
    image: a.image,
  })),
  moreFeed: articles.slice(15, 19),
};

fs.writeFileSync(
  path.join(here, "sections.json"),
  JSON.stringify(split, null, 2),
);

console.log(`Wrote ${articles.length} articles → articles.json`);
console.log(`Wrote section split → sections.json`);
console.log(`  hero: ${split.hero.slug}`);
console.log(`  secondary: ${split.secondary.map((a) => a.slug).join(", ")}`);
console.log(`  mainFeed: ${split.mainFeed.map((a) => a.slug).join(", ")}`);
console.log(`  moreFeed: ${split.moreFeed.map((a) => a.slug).join(", ")}`);
