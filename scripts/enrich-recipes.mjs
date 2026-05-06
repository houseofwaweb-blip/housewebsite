#!/usr/bin/env node
/**
 * Recipe enrichment — scrapes the rendered WP page for each recipe and
 * patches the corresponding Sanity recipe doc with structured data.
 *
 * The WP REST API only returns the intro paragraph for recipes. The full
 * ingredients list, method, prep/cook times, and serving size are rendered
 * server-side from ACF blocks. This script pulls them off the live HTML.
 *
 * Run from platform/:
 *   node scripts/enrich-recipes.mjs --dry-run     # preview changes
 *   node scripts/enrich-recipes.mjs                # apply patches
 *   node scripts/enrich-recipes.mjs --slug foo     # one recipe only
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
const TOKEN =
  process.env.SANITY_MANAGEMENT_TOKEN ||
  process.env.SANITY_TOKEN ||
  process.env.SANITY_READ_TOKEN;
if (!PROJECT_ID || !TOKEN) {
  console.error("Missing SANITY_PROJECT_ID or SANITY_TOKEN in .env.local");
  process.exit(1);
}

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const slugIdx = args.indexOf("--slug");
const ONLY_SLUG = slugIdx >= 0 ? args[slugIdx + 1] : null;

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

// --- helpers ---------------------------------------------------------------
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#038;/g, "&")
    .replace(/&#8230;/g, "…")
    .replace(/&hellip;/g, "…");

const cleanText = (s) =>
  decode(s.replace(/\s+/g, " ").trim());

const span = (text, marks = []) => ({
  _type: "span",
  _key: randomUUID().slice(0, 12),
  text,
  marks,
});

const block = (children, opts = {}) => ({
  _type: "block",
  _key: randomUUID().slice(0, 12),
  style: opts.style || "normal",
  markDefs: [],
  children: Array.isArray(children) ? children : [children],
  ...(opts.listItem ? { listItem: opts.listItem, level: 1 } : {}),
});

// --- WP page parser --------------------------------------------------------
async function fetchAndParse(slug) {
  const url = `https://willowalexander.co.uk/recipe/${slug}/`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const html = await res.text();
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // 1. Prep / Cook times: look for "PREP: 10 MIN - COOK: 15 MIN" string.
  let prepTime, cookTime, serves;
  const headerText = doc.querySelector(".entry-header")?.textContent || "";
  const prepMatch = headerText.match(/PREP:\s*([0-9]+\s*(?:MIN|HR|HOUR)S?)/i);
  const cookMatch = headerText.match(/COOK:\s*([0-9]+\s*(?:MIN|HR|HOUR)S?)/i);
  if (prepMatch) prepTime = prepMatch[1].toLowerCase().replace("min", "mins");
  if (cookMatch) cookTime = cookMatch[1].toLowerCase().replace("min", "mins");

  // 2. Find ingredients & method sections by their h3 headings.
  const headings = Array.from(doc.querySelectorAll("h3"));
  const ingredientsH = headings.find((h) => /ingredients/i.test(h.textContent));
  const methodH = headings.find((h) => /method/i.test(h.textContent));

  const ingredients = [];
  let allergens = null;
  if (ingredientsH) {
    const container = ingredientsH.parentElement;
    const paragraphs = container.querySelectorAll("p");
    for (const p of paragraphs) {
      const text = cleanText(p.textContent);
      if (!text || text === " ") continue;
      // Serves line: "Makes 3 portions", "Makes 12", "Serves 4", "1 serving"
      const servesMatch =
        text.match(/^(?:Makes|Serves)\s+(\d+)\b(?:\s*(?:portions?|servings?|pieces?))?/i) ||
        text.match(/^(\d+)\s*servings?$/i);
      if (servesMatch) {
        serves = servesMatch[1];
        continue;
      }
      // Allergens
      if (/^Allergens?:/i.test(text)) {
        allergens = text.replace(/^Allergens?:\s*/i, "");
        continue;
      }
      ingredients.push(text);
    }
  }

  const methodSteps = [];
  if (methodH) {
    const container = methodH.parentElement;
    const paragraphs = container.querySelectorAll("p");
    for (const p of paragraphs) {
      const text = cleanText(p.textContent);
      if (text) methodSteps.push(text);
    }
  }

  return { prepTime, cookTime, serves, ingredients, methodSteps, allergens };
}

// --- build Portable Text body ---------------------------------------------
function buildBody({ intro, ingredients, methodSteps, allergens }) {
  const blocks = [];
  if (intro) blocks.push(block(span(intro)));
  if (ingredients.length) {
    blocks.push(block(span("Ingredients"), { style: "h2" }));
    for (const item of ingredients) {
      blocks.push(block(span(item), { listItem: "bullet" }));
    }
    if (allergens) {
      blocks.push(
        block([span("Allergens: ", ["strong"]), span(allergens)], { style: "normal" }),
      );
    }
  }
  if (methodSteps.length) {
    blocks.push(block(span("Method"), { style: "h2" }));
    for (const step of methodSteps) {
      blocks.push(block(span(step), { listItem: "number" }));
    }
  }
  return blocks;
}

// --- main ------------------------------------------------------------------
async function main() {
  console.log(`Target: ${PROJECT_ID}/${DATASET}${DRY ? " [dry-run]" : ""}`);

  const filter = ONLY_SLUG
    ? `*[_type == "recipe" && slug.current == "${ONLY_SLUG}"]`
    : `*[_type == "recipe"]`;
  const recipes = await client.fetch(
    `${filter}{_id, title, "slug": slug.current, lede}`,
  );
  console.log(`Found ${recipes.length} recipe(s) in Sanity.`);

  let ok = 0;
  let skipped = 0;
  for (const r of recipes) {
    try {
      const parsed = await fetchAndParse(r.slug);
      if (!parsed.ingredients.length && !parsed.methodSteps.length) {
        console.log(`  - ${r.slug}: no structured data found, skipping`);
        skipped++;
        continue;
      }
      const body = buildBody({
        intro: r.lede,
        ingredients: parsed.ingredients,
        methodSteps: parsed.methodSteps,
        allergens: parsed.allergens,
      });
      const patch = {
        body,
        ...(parsed.prepTime ? { prepTime: parsed.prepTime } : {}),
        ...(parsed.cookTime ? { cookTime: parsed.cookTime } : {}),
        ...(parsed.serves ? { serves: parsed.serves } : {}),
      };
      if (DRY) {
        console.log(
          `  [dry] ${r.slug}: prep=${parsed.prepTime || "-"} cook=${parsed.cookTime || "-"} serves=${parsed.serves || "-"} ingredients=${parsed.ingredients.length} steps=${parsed.methodSteps.length}`,
        );
      } else {
        await client.patch(r._id).set(patch).commit();
        console.log(
          `  ✓ ${r.slug} (prep=${parsed.prepTime || "-"} cook=${parsed.cookTime || "-"} serves=${parsed.serves || "-"} ${parsed.ingredients.length} ingredients, ${parsed.methodSteps.length} steps)`,
        );
      }
      ok++;
    } catch (err) {
      console.warn(`  ! ${r.slug}: ${err.message}`);
      skipped++;
    }
  }

  console.log(`\nDone. Enriched ${ok}, skipped ${skipped}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
