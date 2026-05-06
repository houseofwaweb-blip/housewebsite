#!/usr/bin/env node
/**
 * Seed the Homepage V2 singleton in Sanity.
 *
 * Steps:
 *  1. Reads optimised images from /tmp/home-v2-optimised/ (run optimise-home-v2-images.mjs first)
 *  2. Uploads each to Sanity (idempotent — checks source.id before re-uploading)
 *  3. Creates / replaces the homepageV2 singleton with all the seed copy
 *
 * Usage:
 *   node scripts/seed-home-v2.mjs --dry-run       # preview without writing
 *   node scripts/seed-home-v2.mjs                 # apply
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

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

const OPTIMISED_DIR = "/tmp/home-v2-optimised";

// Idempotent image upload — uses source.id keyed on filename
async function uploadImage(filename, alt) {
  const filePath = path.join(OPTIMISED_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`  ! optimised image missing: ${filename}`);
    return null;
  }
  const sourceId = `homepageV2/${filename}`;
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
  const asset = await client.assets.upload("image", buf, {
    filename,
    contentType: "image/webp",
    source: { id: sourceId, name: "homepageV2", url: filename },
  });
  console.log(`  ✓ uploaded: ${filename} (${asset._id})`);
  return asset._id;
}

const imgRef = (assetId, alt) =>
  assetId
    ? {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
        alt: alt || "",
      }
    : undefined;

async function main() {
  console.log(`Target: ${PROJECT_ID}/${DATASET}${DRY ? " [dry-run]" : ""}\n`);
  console.log("Uploading images...");

  const images = {
    hero: await uploadImage("hero.webp", "Sage living room with cream sofa, lamp and plant"),
    phoneAssistant: await uploadImage("phone-assistant.webp", "HoWA Assistant — AI Repair Scan"),
    phoneHousekeeper: await uploadImage("phone-housekeeper.webp", "HoWA Housekeeper — Today's Plan"),
    phoneSteward: await uploadImage("phone-steward.webp", "HoWA Steward — House Health"),
    tempKeeper: await uploadImage("temperament-keeper.webp", "I. The Keeper"),
    tempMaker: await uploadImage("temperament-maker.webp", "II. The Maker"),
    tempGuardian: await uploadImage("temperament-guardian.webp", "III. The Guardian"),
    tempGardener: await uploadImage("temperament-gardener.webp", "IV. The Gardener"),
    pillarDesignCare: await uploadImage("pillar-design-care.webp", "Sage doorway into a marble kitchen"),
    pillarProtect: await uploadImage("pillar-protect.webp", "Townhouse facade at night with one blue-lit window"),
    pillarShop: await uploadImage("pillar-shop.webp", "Pink roses in a brass vase atop stacked design books"),
    pillarHearth: await uploadImage("pillar-hearth.webp", "Open book and coffee mug by a window"),
  };

  console.log("\nSeeding homepageV2 singleton...");

  const doc = {
    _id: "homepageV2",
    _type: "homepageV2",

    // Hero
    heroEyebrow: "For homes with soul",
    heroHeadline: "Beautiful living, *intelligently stewarded.*",
    heroLede:
      "The House of Willow Alexander brings design, care, protection, and trusted services into one clear world. HoWA is the stewardship system behind it.",
    heroPrimaryCtaLabel: "Explore the House",
    heroPrimaryCtaHref: "/the-house",
    heroSecondaryCtaLabel: "Discover HoWA",
    heroSecondaryCtaSub: "Our system",
    heroSecondaryCtaHref: "/howa",
    heroImage: imgRef(images.hero, "Sage living room with cream sofa, lamp and plant"),
    heroOverlayHeading: "The Home Operating System",
    heroOverlayTagline:
      "Observes. Learns. Acts. So nothing is missed, delayed, or forgotten.",

    // Temperaments
    temperamentsTitle: "A house. Many roles. One standard.",
    temperaments: [
      { _type: "temperament", _key: "tk", name: "The Keeper",   image: imgRef(images.tempKeeper, "I. The Keeper"),   href: "/the-house/keeper",   ctaLabel: "Learn more" },
      { _type: "temperament", _key: "tm", name: "The Maker",    image: imgRef(images.tempMaker, "II. The Maker"),    href: "/the-house/maker",    ctaLabel: "Learn more" },
      { _type: "temperament", _key: "tg", name: "The Guardian", image: imgRef(images.tempGuardian, "III. The Guardian"), href: "/the-house/guardian", ctaLabel: "Learn more" },
      { _type: "temperament", _key: "td", name: "The Gardener", image: imgRef(images.tempGardener, "IV. The Gardener"),  href: "/the-house/gardener", ctaLabel: "Learn more" },
    ],

    // HoWA Showcase
    howaSubtitle: "The Home Operating System",
    howaLede:
      "The living record of your home. HoWA captures what matters, orchestrates what needs doing, and protects what endures.",
    howaLinkLabel: "See how HoWA works",
    howaLinkHref: "/howa/how-it-works",
    howaPhones: [
      { _type: "phoneScreen", _key: "p1", tier: "Assistant",   image: imgRef(images.phoneAssistant, "HoWA Assistant — AI Repair Scan") },
      { _type: "phoneScreen", _key: "p2", tier: "Housekeeper", image: imgRef(images.phoneHousekeeper, "HoWA Housekeeper — Today's Plan") },
      { _type: "phoneScreen", _key: "p3", tier: "Steward",     image: imgRef(images.phoneSteward, "HoWA Steward — House Health") },
    ],
    howaFeatures: [
      { _type: "feature", _key: "f1", icon: "eye",          heading: "Aware",       body: "Notices what matters. Tracks change in real time." },
      { _type: "feature", _key: "f2", icon: "list-checks",  heading: "Organise",    body: "Tasks orchestrated. Services aligned." },
      { _type: "feature", _key: "f3", icon: "sparkles",     heading: "Intelligent", body: "Predicts risk. Optimises systems." },
      { _type: "feature", _key: "f4", icon: "shield-check", heading: "Protective",  body: "Builds evidence. Holds value." },
    ],
    howaCtaLabel: "Explore HoWA",
    howaCtaHref: "/howa",

    // Pillars
    pillars: [
      {
        _type: "pillar", _key: "p-dc",
        name: "Design & Care",
        headline: "Spaces shaped by taste.",
        body: "Interiors and gardens by House-approved studios. Care by trusted teams. Everything connected through HoWA.",
        image: imgRef(images.pillarDesignCare, "Sage doorway into a marble kitchen"),
        sublinks: [
          { _key: "sl1", _type: "link", label: "Interiors", href: "/design/interiors" },
          { _key: "sl2", _type: "link", label: "Gardens",   href: "/design/gardens" },
          { _key: "sl3", _type: "link", label: "Services",  href: "/services" },
        ],
      },
      {
        _type: "pillar", _key: "p-pr",
        name: "Protect",
        headline: "Care recorded is risk reduced.",
        body: "Home Protection Review, ongoing care plans, and insurance via Provenance. Calm prevention, not alarm.",
        image: imgRef(images.pillarProtect, "Townhouse facade at night with one blue-lit window"),
        ctaLabel: "Protect the home",
        ctaHref: "/protect",
      },
      {
        _type: "pillar", _key: "p-sh",
        name: "Shop",
        headline: "House Approved Objects",
        body: "Curated homeware, garden tools, and objects for the home. Selected by the House, verified through HoWA. Not a marketplace. A considered edit.",
        image: imgRef(images.pillarShop, "Pink roses in a brass vase atop stacked design books"),
        ctaLabel: "Shop now",
        ctaHref: "/shop",
      },
      {
        _type: "pillar", _key: "p-he",
        name: "The Hearth",
        headline: "Writing on Homes",
        body: "Long-form writing on the craft of looking after a place properly. Seasonal features, design profiles, garden notes, and more.",
        image: imgRef(images.pillarHearth, "Open book and coffee mug by a window"),
        ctaLabel: "Read the latest",
        ctaHref: "/journal",
      },
    ],

    // Workflow + Stats
    workflowLeadIcon: "clipboard-check",
    workflowSteps: [
      { _type: "step", _key: "ws1", heading: "Boiler failure predicted", sub: "14 days early" },
      { _type: "step", _key: "ws2", heading: "Service booked",            sub: "Automatically" },
      { _type: "step", _key: "ws3", heading: "Cost reduced",              sub: "By *42%*" },
      { _type: "step", _key: "ws4", heading: "No disruption",             sub: "To your home" },
    ],
    stats: [
      { _type: "stat", _key: "s1", num: "247", label: "Homes stewarded" },
      { _type: "stat", _key: "s2", num: "4",   label: "Launch partners" },
      { _type: "stat", _key: "s3", num: "4.9", label: "Average rating" },
      { _type: "stat", _key: "s4", num: "0",   label: "Net emissions" },
    ],

    // Powered By
    poweredByTitle: "Powered by the House of Willow Alexander",
    poweredByItems: [
      { _type: "item", _key: "pi1", icon: "circle-check", label: "Trusted services and specialists" },
      { _type: "item", _key: "pi2", icon: "badge-check",  label: "Verified partners and suppliers" },
      { _type: "item", _key: "pi3", icon: "leaf",         label: "Stewardship execution layer" },
      { _type: "item", _key: "pi4", icon: "award",        label: "Accountability at every step" },
    ],

    // Final CTA
    finalCtaStatement:
      "For homes with soul, proper care should never be left to memory alone.",
    finalCtaSub:
      "The House defines what good looks like, HoWA ensures it happens.",
    finalCtaPrimaryLabel: "Start HoWA",
    finalCtaPrimaryHref: "/howa",
    finalCtaSecondaryLabel: "Book a consultation",
    finalCtaSecondaryHref: "/book-consultation",
  };

  if (DRY) {
    console.log("\n[dry-run] would write:");
    console.log(JSON.stringify(doc, null, 2).slice(0, 800) + "\n...");
    return;
  }
  await client.createOrReplace(doc);
  console.log(`\n✓ homepageV2 singleton seeded.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
