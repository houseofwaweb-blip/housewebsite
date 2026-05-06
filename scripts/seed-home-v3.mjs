#!/usr/bin/env node
/**
 * Seed the Homepage V3 singleton (Product-first flow).
 * Reuses images already uploaded to Sanity by seed-home-v2.mjs.
 *
 * Usage:
 *   node scripts/seed-home-v3.mjs --dry-run
 *   node scripts/seed-home-v3.mjs
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
const TOKEN =
  process.env.SANITY_MANAGEMENT_TOKEN ||
  process.env.SANITY_TOKEN ||
  process.env.SANITY_READ_TOKEN;
const DRY = process.argv.includes("--dry-run");

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

async function findAsset(sourceId) {
  const a = await client.fetch(
    '*[_type == "sanity.imageAsset" && source.id == $id][0]{_id}',
    { id: sourceId },
  );
  return a?._id ?? null;
}
const imgRef = (assetId, alt) =>
  assetId ? { _type: "image", asset: { _type: "reference", _ref: assetId }, alt } : undefined;

async function main() {
  console.log(`Target: ${process.env.SANITY_PROJECT_ID}/production${DRY ? " [dry-run]" : ""}\n`);

  const hero          = await findAsset("homepageV2/hero.webp");
  const phone1        = await findAsset("homepageV2/phone-assistant.webp");
  const phone2        = await findAsset("homepageV2/phone-housekeeper.webp");
  const phone3        = await findAsset("homepageV2/phone-steward.webp");
  const designCare    = await findAsset("homepageV2/pillar-design-care.webp");
  const protect       = await findAsset("homepageV2/pillar-protect.webp");
  const shop          = await findAsset("homepageV2/pillar-shop.webp");
  const hearth        = await findAsset("homepageV2/pillar-hearth.webp");
  const insurance     = await findAsset("homepageV3/protect-insurance.webp");

  const missing = Object.entries({ hero, phone1, phone2, phone3, designCare, protect, shop, hearth, insurance })
    .filter(([, v]) => !v).map(([k]) => k);
  if (missing.length) {
    console.error("Missing image assets in Sanity (run seed-home-v2.mjs first):", missing);
    process.exit(1);
  }

  const doc = {
    _id: "homepageV3",
    _type: "homepageV3",

    // Hero — same headline, but reframed for product-first flow
    heroEyebrow: "For homes with soul",
    heroHeadline: "Your home, *intelligently stewarded.*",
    heroLede:
      "HoWA is the operating system for your home. It observes what matters, books what needs doing, and remembers what was done. Quiet by design.",
    heroPrimaryCtaLabel: "Start HoWA",
    heroPrimaryCtaHref: "/howa",
    heroSecondaryCtaLabel: "See how it works",
    heroSecondaryCtaSub: "60 sec",
    heroSecondaryCtaHref: "/howa/how-it-works",
    heroImage: imgRef(hero, "Sage living room with cream sofa, lamp and plant"),
    heroOverlayHeading: "The Home Operating System",
    heroOverlayTagline: "Observes. Learns. Acts. So nothing is missed, delayed, or forgotten.",

    // HoWA Showcase — proof of what the OS is
    howaSubtitle: "The Home Operating System",
    howaLede:
      "Three views, one record. HoWA captures what matters, orchestrates what needs doing, and protects what endures.",
    howaLinkLabel: "See how HoWA works",
    howaLinkHref: "/howa/how-it-works",
    howaPhones: [
      { _type: "phoneScreen", _key: "p1", tier: "Assistant",   image: imgRef(phone1, "HoWA Assistant — AI Repair Scan") },
      { _type: "phoneScreen", _key: "p2", tier: "Housekeeper", image: imgRef(phone2, "HoWA Housekeeper — Today's Plan") },
      { _type: "phoneScreen", _key: "p3", tier: "Steward",     image: imgRef(phone3, "HoWA Steward — House Health") },
    ],
    howaFeatures: [
      { _type: "feature", _key: "f1", icon: "eye",          heading: "Aware",       body: "Notices what matters. Tracks change in real time." },
      { _type: "feature", _key: "f2", icon: "list-checks",  heading: "Organise",    body: "Tasks orchestrated. Services aligned." },
      { _type: "feature", _key: "f3", icon: "sparkles",     heading: "Intelligent", body: "Predicts risk. Optimises systems." },
      { _type: "feature", _key: "f4", icon: "shield-check", heading: "Protective",  body: "Builds evidence. Holds value." },
    ],
    howaCtaLabel: "Explore HoWA",
    howaCtaHref: "/howa",

    // Workflow + Stats — the proof
    workflowEyebrow: "Stewardship in motion",
    workflowTitle: "How It Works",
    workflowSub:
      "An everyday system that catches problems early, books trusted partners, and keeps the cost of caring for the home down.",
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

    // Tier Ladder
    tiersEyebrow: "Three ways to live with HoWA",
    tiersTitle: "From companion to fully managed.",
    tiersSub:
      "Every tier shares one record. Move up when it makes sense. Cancel anytime.",
    tiers: [
      {
        _type: "tier", _key: "t1",
        name: "HoWA",
        price: "Free to start",
        tagline: "The companion that learns your home.",
        body: "A diagnostic and a living record. See what your home knows. No card required.",
        inclusions: [
          "Companion diagnostic",
          "Living record of your home",
          "Two reminders per month",
        ],
        ctaLabel: "Start with the Companion",
        ctaHref: "/howa/companion",
        tone: "quiet",
      },
      {
        _type: "tier", _key: "t2",
        name: "HoWA+",
        price: "£16.99 / month",
        tagline: "The everyday system, fully woven in.",
        body: "Auto-bookings with House-approved partners. Member pricing. The full record.",
        inclusions: [
          "Everything in HoWA",
          "Auto-booking with House partners",
          "Member-only service pricing",
          "Unlimited reminders & photos",
          "Annual House report",
        ],
        ctaLabel: "Start HoWA+",
        ctaHref: "/howa/plus",
        tone: "active",
      },
      {
        _type: "tier", _key: "t3",
        name: "Steward",
        price: "By application",
        tagline: "Fully managed. By the House.",
        body: "Done-for-you stewardship for homes that warrant a named team. Limited intake.",
        inclusions: [
          "Everything in HoWA+",
          "Named contact, on call",
          "Quarterly Protect Review",
          "Annual planning sit-down",
          "Coordinated execution across services",
        ],
        ctaLabel: "Apply for Steward",
        ctaHref: "/howa/steward",
        tone: "premium",
      },
    ],

    // Pillars — what membership unlocks
    pillarsEyebrow: "Across the House",
    pillarsTitle: "What membership unlocks",
    pillarsSub:
      "HoWA membership is the connective layer. Behind it sits the studios, services, shop, and editorial that make a House.",
    pillars: [
      {
        _type: "pillar", _key: "p-dc",
        name: "Design & Care", headline: "Spaces shaped\nby taste.",
        body: "Interiors and gardens by House-approved studios. Care by trusted teams. Everything connected through HoWA.",
        image: imgRef(designCare, "Sage doorway into a marble kitchen"),
        sublinks: [
          { _key: "sl1", _type: "link", label: "Interiors", href: "/design/interiors" },
          { _key: "sl2", _type: "link", label: "Gardens",   href: "/design/gardens" },
          { _key: "sl3", _type: "link", label: "Services",  href: "/services" },
        ],
      },
      {
        _type: "pillar", _key: "p-pr",
        name: "Protect", headline: "Care recorded\nis risk reduced.",
        body: "Home Protection Review, ongoing care plans, and insurance via Provenance. Calm prevention, not alarm.",
        image: imgRef(protect, "Townhouse facade at night with one blue-lit window"),
        ctaLabel: "Protect the home", ctaHref: "/protect",
      },
      {
        _type: "pillar", _key: "p-sh",
        name: "Shop", headline: "House Approved\nObjects",
        body: "Curated homeware, garden tools, and objects for the home. Selected by the House, verified through HoWA. Not a marketplace. A considered edit.",
        image: imgRef(shop, "Pink roses in a brass vase atop stacked design books"),
        ctaLabel: "Shop now", ctaHref: "/shop",
      },
      {
        _type: "pillar", _key: "p-he",
        name: "The Hearth", headline: "Writing\non Homes",
        body: "Long-form writing on the craft of looking after a place properly. Seasonal features, design profiles, garden notes, and more.",
        image: imgRef(hearth, "Open book and coffee mug by a window"),
        ctaLabel: "Read the latest", ctaHref: "/journal",
      },
    ],

    // Protect deep-dive — Insurance as lead, Protection Review as follow-up
    protectEyebrow: "Protect",
    protectTitle: "Care that pre-empts.",
    protectSub:
      "Two ways the House holds value in a home — one by underwriting it, one by quietly looking after it.",
    protectBlocks: [
      {
        _type: "protectBlock", _key: "pb1",
        label: "Insurance",
        headline: "House-led home insurance, by Provenance.",
        body:
          "Underwritten through Provenance, our FCA-regulated introducer. Specialist cover for considered homes — not a price-comparison race. Claims supported by HoWA's record from day one.",
        image: imgRef(insurance, "Classical entrance at twilight, lamps lit"),
        bullets: [
          "FCA-regulated cover via Provenance",
          "HoWA-backed evidence at claim time",
          "Listed-property and high-value experience",
          "One renewal, one record, one team",
        ],
        ctaLabel: "Register interest",
        ctaHref: "/insurance",
      },
      {
        _type: "protectBlock", _key: "pb2",
        label: "Protection Review",
        headline: "An annual look at what could go wrong, before it does.",
        body:
          "A surveyor walks the house, the garden, and the systems. Findings filed straight to the record, then routed to House-approved partners. Quiet prevention, not alarm.",
        image: imgRef(protect, "Townhouse facade at night with one blue-lit window"),
        bullets: [
          "Annual on-site review",
          "Findings filed to your living record",
          "Auto-routed to House partners",
          "Tracked over years, not just a snapshot",
        ],
        ctaLabel: "Book a review",
        ctaHref: "/protect",
      },
    ],

    // Powered by
    poweredByTitle: "Powered by the House of Willow Alexander",
    poweredByItems: [
      { _type: "item", _key: "pi1", icon: "circle-check", label: "Trusted services and specialists" },
      { _type: "item", _key: "pi2", icon: "badge-check",  label: "Verified partners and suppliers" },
      { _type: "item", _key: "pi3", icon: "leaf",         label: "Stewardship execution layer" },
      { _type: "item", _key: "pi4", icon: "award",        label: "Accountability at every step" },
    ],

    // Final CTA
    finalCtaStatement: "For homes with soul, proper care should never be left to memory alone.",
    finalCtaSub: "The House defines what good looks like, HoWA ensures it happens.",
    finalCtaPrimaryLabel: "Start HoWA",
    finalCtaPrimaryHref: "/howa",
    finalCtaSecondaryLabel: "Apply for Steward",
    finalCtaSecondaryHref: "/howa/steward",
  };

  if (DRY) {
    console.log("[dry-run] would write doc id homepageV3");
    return;
  }
  await client.createOrReplace(doc);
  console.log("✓ homepageV3 singleton seeded.");
}

main().catch((err) => { console.error(err); process.exit(1); });
