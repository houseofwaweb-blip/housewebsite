#!/usr/bin/env node
/**
 * Seed the HoWA Lander V2 singleton.
 * Reuses phone images already on Sanity from seed-home-v2.mjs.
 *
 * Usage:
 *   node scripts/seed-howa-lander-v2.mjs --dry-run
 *   node scripts/seed-howa-lander-v2.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

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
const DRY = process.argv.includes("--dry-run");

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

// Lookup an existing image asset by source.id (set when uploaded)
async function findAsset(sourceId) {
  const a = await client.fetch(
    '*[_type == "sanity.imageAsset" && source.id == $id][0]{_id}',
    { id: sourceId },
  );
  return a?._id ?? null;
}
const imgRef = (assetId, alt) =>
  assetId
    ? { _type: "image", asset: { _type: "reference", _ref: assetId }, alt }
    : undefined;

async function main() {
  console.log(`Target: ${PROJECT_ID}/${DATASET}${DRY ? " [dry-run]" : ""}\n`);

  // Pull asset IDs of images already on Sanity
  const heroAsset = await findAsset("howaLanderV2/lander-hero-section.webp");
  const phone1 = await findAsset("homepageV2/phone-assistant.webp");
  const phone2 = await findAsset("homepageV2/phone-housekeeper.webp");
  const phone3 = await findAsset("homepageV2/phone-steward.webp");
  const sideImg = await findAsset("homepageV2/pillar-hearth.webp");

  const missing = [];
  if (!heroAsset) missing.push("lander-hero-section.webp");
  if (!phone1) missing.push("phone-assistant.webp");
  if (!phone2) missing.push("phone-housekeeper.webp");
  if (!phone3) missing.push("phone-steward.webp");
  if (missing.length) {
    console.error("Missing image assets in Sanity:", missing);
    process.exit(1);
  }

  const doc = {
    _id: "howaLanderV2",
    _type: "howaLanderV2",

    // Header
    headerLogoCaption: "The Home Operating System",
    headerNavItems: [
      { _type: "navItem", _key: "n1", label: "The System",   href: "/howa#system" },
      { _type: "navItem", _key: "n2", label: "How It Works", href: "/howa/how-it-works" },
      { _type: "navItem", _key: "n3", label: "Partners",     href: "/partners" },
      { _type: "navItem", _key: "n4", label: "About",        href: "/the-house" },
    ],
    headerCtaLabel: "Enter HoWA",
    headerCtaHref: "/howa/enter",

    // Hero
    heroEyebrow: "House № 1892",
    heroHeadline: "Your home, *finally understood.*",
    heroSubEyebrow: "The Living Record of Your Home",
    heroLede:
      "HoWA observes, learns, and operates — so nothing is missed, delayed, or forgotten.",
    heroPrimaryCtaLabel: "Enter HoWA",
    heroPrimaryCtaHref: "/howa/enter",
    heroSecondaryCtaLabel: "See how it works",
    heroSecondaryCtaHref: "/howa/how-it-works",
    heroNextCare: { label: "Next care", day: "Thursday", time: "09:00" },
    heroImage: imgRef(heroAsset, "Architectural cross-section of a house with HoWA annotations"),
    heroAnnotationsTop: [
      "Structure sound",
      "Roof in good order",
      "Drainage adequate",
      "Services maintained",
    ],
    heroAnnotationsLeft: [
      { _type: "annotation", _key: "al1", label: "Roof",   value: "8 years remaining" },
      { _type: "annotation", _key: "al2", label: "Boiler", value: "Service due in 14 days" },
      { _type: "annotation", _key: "al3", label: "Garden", value: "Next care Thursday 09:00" },
    ],
    heroAnnotationsRight: [
      { _type: "annotation", _key: "ar1", label: "Structure",   value: "All systems normal" },
      { _type: "annotation", _key: "ar2", label: "Environment", value: "Humidity optimal 52%" },
      { _type: "annotation", _key: "ar3", label: "Risk Watch",  value: "No issues detected" },
      { _type: "annotation", _key: "ar4", label: "Care Cycle",  value: "Next review in 14 days" },
    ],

    // Tier showcase
    tiersTitle: "One system. Three ways to access it.",
    tiers: [
      {
        _type: "tier", _key: "t1",
        numeral: "I.", name: "Assistant",
        tagline: "The house, aware.",
        phoneImage: imgRef(phone1, "HoWA Assistant — AI Repair Scan"),
        features: [
          { _type: "feature", _key: "tf1", icon: "eye",            label: "Notices what matters" },
          { _type: "feature", _key: "tf2", icon: "activity",       label: "Tracks change in real time" },
          { _type: "feature", _key: "tf3", icon: "radio-tower",    label: "Surfaces signals" },
        ],
      },
      {
        _type: "tier", _key: "t2",
        numeral: "II.", name: "Housekeeper",
        tagline: "The house, in motion.",
        phoneImage: imgRef(phone2, "HoWA Housekeeper — Today's Plan"),
        features: [
          { _type: "feature", _key: "tf4", icon: "list-checks",    label: "Tasks scheduled" },
          { _type: "feature", _key: "tf5", icon: "users",          label: "Services aligned" },
          { _type: "feature", _key: "tf6", icon: "shield",         label: "Nothing slips" },
        ],
      },
      {
        _type: "tier", _key: "t3",
        numeral: "III.", name: "Steward",
        tagline: "The house, understood.",
        phoneImage: imgRef(phone3, "HoWA Steward — House Health"),
        features: [
          { _type: "feature", _key: "tf7", icon: "trending-up",    label: "Predicts risk" },
          { _type: "feature", _key: "tf8", icon: "sparkles",       label: "Optimises systems" },
          { _type: "feature", _key: "tf9", icon: "shield-check",   label: "Holds value" },
        ],
      },
    ],

    // Workflow
    workflowTitle: "Prevents problems before they cost you.",
    workflowLeadIcon: "clipboard-check",
    workflowSteps: [
      { _type: "step", _key: "ws1", heading: "Boiler failure predicted", sub: "14 days early" },
      { _type: "step", _key: "ws2", heading: "Service booked",            sub: "Automatically" },
      { _type: "step", _key: "ws3", heading: "Cost reduced",              sub: "By *42%*" },
      { _type: "step", _key: "ws4", heading: "No disruption",             sub: "To your home" },
    ],
    workflowSideImage: imgRef(sideImg, "Open book on a windowsill"),

    // Powered By
    poweredByTitle: "Powered by the House of Willow Alexander",
    poweredByItems: [
      { _type: "item", _key: "pi1", icon: "circle-check", label: "Trusted services and specialists" },
      { _type: "item", _key: "pi2", icon: "badge-check",  label: "Verified partners and suppliers" },
      { _type: "item", _key: "pi3", icon: "leaf",         label: "Seamless execution layer" },
      { _type: "item", _key: "pi4", icon: "award",        label: "Accountability at every step" },
    ],

    // Final CTA
    finalHeadline: "Step into stewardship.",
    finalSub: "Understand. Protect. Perform.",
    finalCtaLabel: "Enter HoWA",
    finalCtaHref: "/howa/enter",
  };

  if (DRY) {
    console.log("[dry-run] would write doc with id howaLanderV2");
    console.log(JSON.stringify(doc, null, 2).slice(0, 600) + "\n...");
    return;
  }
  await client.createOrReplace(doc);
  console.log("✓ howaLanderV2 singleton seeded.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
