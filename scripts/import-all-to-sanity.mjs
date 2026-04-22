#!/usr/bin/env node
/**
 * Import all hardcoded site data into Sanity.
 * Idempotent — uses createOrReplace with deterministic IDs.
 *
 * Usage: node scripts/import-all-to-sanity.mjs
 */

const PROJECT_ID = process.env.SANITY_PROJECT_ID || "a9t8u8nh";
const DATASET = process.env.SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_MANAGEMENT_TOKEN || process.env.SANITY_TOKEN;
if (!TOKEN) {
  console.error("Missing SANITY_MANAGEMENT_TOKEN env var. This script needs write access.");
  console.error("Set it in .env.local or pass via: SANITY_MANAGEMENT_TOKEN=sk... node scripts/import-all-to-sanity.mjs");
  process.exit(1);
}
const API = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`;

async function mutate(mutations) {
  const batchSize = 50;
  for (let i = 0; i < mutations.length; i += batchSize) {
    const batch = mutations.slice(i, i + batchSize);
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ mutations: batch }),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Sanity API error (${res.status}): ${err}`);
    }
    const data = await res.json();
    console.log(`  Batch ${Math.floor(i / batchSize) + 1}: ${data.results.length} operations`);
  }
}

function textBlock(text) {
  return [
    {
      _type: "block",
      _key: Math.random().toString(36).slice(2, 10),
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "s1", text, marks: [] }],
    },
  ];
}

// ─────────────────────────────────────────────────────────
// 1. SERVICES
// ─────────────────────────────────────────────────────────

const SERVICES = [
  {
    slug: "gardening",
    name: "Gardening",
    lede: "Planting, maintenance, and seasonal care by gardeners who know the difference between a bay and a laurel.",
    eyebrow: "Services · Gardening",
    headline: "A garden you meant to have.",
    recurring: true,
    availableAreas: ["SW", "W", "KT", "W4", "W6", "TW"],
    included: [
      "Seasonal pruning, weeding, and bed maintenance",
      "Lawn care — mowing, edging, seasonal feeds",
      "Tree, shrub, and hedge shaping up to 4m",
      "Plant health reviews and replacement recommendations",
      "Green waste removal (licensed carrier)",
    ],
    how: [
      "Walk the garden with you, or read the brief you send",
      "Quote within 48 hours, itemised, no surprises",
      "Schedule with you — one-off, monthly, or seasonal",
      "Show up when we said, leave it looking like we cared",
    ],
    image: "/services/gardening.png",
    order: 1,
  },
  {
    slug: "window-cleaning",
    name: "Window cleaning",
    lede: "Pure-water poled cleans up to four storeys. Frames and sills included. No streaks, no drips on the sill.",
    eyebrow: "Services · Window cleaning",
    headline: "Light, properly let in.",
    recurring: true,
    availableAreas: ["SW", "W", "KT", "W4", "W6", "TW"],
    included: [
      "Exterior windows, frames, and sills",
      "Purified-water pole system — no detergents, no residue",
      "Up to four storeys from the ground",
      "Condition note on any cracked or failed glazing spotted",
    ],
    how: [
      "Tell us your postcode and frontage type",
      "Get a fixed quote within 24 hours",
      "Book a one-off or schedule monthly / bi-monthly",
      "Text reminder the day before each visit",
    ],
    image: "/services/window-cleaning.png",
    order: 2,
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    lede: "Calm, thorough, discreet. Cleaners who know which surfaces want a damp cloth and which ask for nothing.",
    eyebrow: "Services · Cleaning",
    headline: "A house that feels cared for.",
    recurring: true,
    availableAreas: ["SW", "W", "KT", "W4", "W6", "TW"],
    included: [
      "Full-home clean — kitchens, bathrooms, living spaces, bedrooms",
      "Laminated floor, wood, carpet, and tile — handled correctly per material",
      "Window interiors, skirting, light switches",
      "Optional laundry, linen, and inside-oven deep clean",
      "All products House-approved; fragrance-free available on request",
    ],
    how: [
      "Walkthrough — in person or by video — to understand preferences",
      "Fixed quote by the house, not by the hour",
      "One-off, weekly, or fortnightly",
      "Key management through HoWA; vetted, insured teams",
    ],
    image: "/services/cleaning.png",
    order: 3,
  },
  {
    slug: "gutter-cleaning",
    name: "Gutter cleaning",
    lede: "Twice-a-year gutter clears by vacuum pole. Before winter, after the last leaves. Photograph of every run, front and back.",
    eyebrow: "Services · Gutter cleaning",
    headline: "A small job that saves a large one.",
    recurring: true,
    availableAreas: ["SW", "W", "KT", "W4", "W6", "TW"],
    included: [
      "Full vacuum-pole gutter clear — front and back",
      "Downpipe check; standard clearance of visible blockages",
      "Photographic before/after record of each run",
      "Flag for repairs — loose brackets, splits, poor falls",
    ],
    how: [
      "Confirm property type and access needs",
      "Fixed quote based on your postcode and frontage",
      "Typically seen within a week, two visits a year if scheduled",
      "Text alert before arrival; no need to be home",
    ],
    image: "/services/gutter-cleaning.png",
    order: 4,
  },
];

function buildServiceMutations() {
  return SERVICES.map((s) => ({
    createOrReplace: {
      _id: `service.${s.slug}`,
      _type: "service",
      title: s.name,
      slug: { _type: "slug", current: s.slug },
      lede: s.lede,
      eyebrow: s.eyebrow,
      headline: s.headline,
      recurring: s.recurring,
      availableAreas: s.availableAreas,
      included: s.included,
      howItWorks: s.how,
      order: s.order,
    },
  }));
}

// ─────────────────────────────────────────────────────────
// 2. SERVICE PACKAGES
// ─────────────────────────────────────────────────────────

const SERVICE_PACKAGES = [
  // Gardening
  { slug: "gardening-tidy", service: "gardening", name: "One-off tidy", tier: "one-off", price: "from £180", bestFor: "pre-event or back-from-holiday", inclusions: ["Half-day visit, two-person team", "Weeding, edging, and light prune", "Green-waste removal", "Photo handover"], order: 1 },
  { slug: "gardening-seasonal", service: "gardening", name: "Seasonal care", tier: "care", price: "from £95 / visit", bestFor: "ongoing monthly rhythm", inclusions: ["Four to eight visits a year", "Planting plan reviews each season", "Priority scheduling", "One urgent call-out credit per year"], order: 2 },
  { slug: "gardening-steward", service: "gardening", name: "Steward Garden", tier: "steward", price: "from quote", bestFor: "larger gardens, fuller remit", inclusions: ["Fortnightly or weekly visits", "Annual planting plan refresh", "Dedicated gardener, named on your record", "Coordinated with window, gutter, and cleaning care"], order: 3 },
  // Window cleaning
  { slug: "window-oneoff", service: "window-cleaning", name: "One-off clean", tier: "one-off", price: "from £60", bestFor: "a first look, or between scheduled visits", inclusions: ["All exterior windows, frames, sills", "Front and back elevations", "Condition note on any issues spotted"], order: 1 },
  { slug: "window-monthly", service: "window-cleaning", name: "Monthly care", tier: "care", price: "from £42 / visit", bestFor: "streets with regular rain or dust", inclusions: ["Monthly visit, same weekday each month", "Priority rescheduling in bad weather", "No-clean guarantee if rain follows within 48 hours"], order: 2 },
  // Cleaning
  { slug: "cleaning-oneoff", service: "cleaning", name: "One-off clean", tier: "one-off", price: "from £140", bestFor: "pre-arrival, post-guests, estate agent viewings", inclusions: ["Full ground-floor and bedroom clean", "Kitchen surfaces and hob, bathroom descale", "Floors vacuumed and mopped", "Two- or three-person team depending on size"], order: 1 },
  { slug: "cleaning-weekly", service: "cleaning", name: "Weekly care", tier: "care", price: "from £95 / visit", bestFor: "working households and family homes", inclusions: ["Same team each week wherever possible", "Rotating deep-clean schedule across rooms", "Priority rescheduling", "Bank holiday coverage included"], order: 2 },
  { slug: "cleaning-steward", service: "cleaning", name: "Steward Clean", tier: "steward", price: "from quote", bestFor: "larger homes and listed buildings", inclusions: ["Everything in weekly care", "Quarterly deep cleans included", "Laundry, linen, and wardrobe rotation", "Coordinated with garden, windows, and gutters"], order: 3 },
  // Gutter
  { slug: "gutter-oneoff", service: "gutter-cleaning", name: "One-off clear", tier: "one-off", price: "from £120", bestFor: "first visits, or after a big storm", inclusions: ["Full gutter clear, front and back", "Downpipe check + minor clearance", "Photographic record in your HoWA record"], order: 1 },
  { slug: "gutter-twiceyearly", service: "gutter-cleaning", name: "Twice-yearly care", tier: "care", price: "from £180 / year", bestFor: "most British homes", inclusions: ["Autumn + spring scheduled visits", "Priority for repair quotes if anything's flagged", "Photographs filed to your record automatically"], order: 2 },
];

function buildPackageMutations() {
  return SERVICE_PACKAGES.map((p) => ({
    createOrReplace: {
      _id: `servicePackage.${p.slug}`,
      _type: "servicePackage",
      title: p.name,
      slug: { _type: "slug", current: p.slug },
      service: { _type: "reference", _ref: `service.${p.service}` },
      tier: p.tier,
      price: p.price,
      bestFor: p.bestFor,
      inclusions: p.inclusions,
      order: p.order,
    },
  }));
}

// ─────────────────────────────────────────────────────────
// 3. PARTNERS
// ─────────────────────────────────────────────────────────

const PARTNERS = [
  {
    slug: "delve-interiors",
    name: "Delve Interiors",
    type: "design-studio",
    typeLabel: "Design studio",
    heroEyebrow: "Design · Interiors by the House",
    heroHeadline: "Rooms that take their time.",
    heroSub: "A London studio on joinery, quiet palettes, and the detail work most studios don't bother with.",
    role: "Design studio · London & the South East",
    shortBio: "Considered schemes, quiet palettes, careful detailing. London and the South East.",
    longBio: "Delve is a London interiors studio run on the belief that a room gets better the more you can take out of it. They work across whole-house renovations, single-room reads, and the detail work that most studios don't bother with — joinery schedules, paint sequencing, light by light.\n\nEvery Delve project is photographed properly and filed to the client's HoWA record so future trades — decorators, electricians, cleaners — arrive knowing what they're looking at.",
    founded: "2018",
    basedIn: "London",
    specialties: ["Georgian & Victorian terraces", "Joinery-led schemes", "Listed buildings"],
    serviceAreas: ["London", "Oxfordshire", "West Sussex"],
    instagram: "@delveinteriors",
    houseApproved: true,
    order: 1,
  },
  {
    slug: "jessica-durling-mcmahon",
    name: "Jessica Durling-McMahon",
    type: "interior-designer",
    typeLabel: "Interior designer",
    heroEyebrow: "Design · Interiors by the House",
    heroHeadline: "Rooms with a memory.",
    heroSub: "Layered rooms with confident colour, antiques properly used, and a love of textile.",
    role: "Founder · Durling Interiors, London",
    shortBio: "Layered rooms with confident colour, antiques properly used, and a love of textile.",
    longBio: "A studio led by instinct and discipline. Rooms composed with a slow hand, for homes that prefer to feel inherited rather than assembled.\n\nWork ranges from intimate reading rooms to full-house commissions across London and the Home Counties. Studio focus: pattern, light, and the restraint to let a room settle.",
    founded: "2017",
    basedIn: "Notting Hill",
    specialties: ["Layered colour", "Antiques & vintage sourcing", "Textile-forward schemes"],
    serviceAreas: ["London", "South East", "Cotswolds"],
    instagram: "@jessicadurlingmcmahon",
    houseApproved: true,
    order: 2,
  },
  {
    slug: "willow-alexander-gardens",
    name: "Willow Alexander Gardens",
    type: "design-studio",
    typeLabel: "Garden design",
    heroEyebrow: "Design · Gardens by the House",
    heroHeadline: "Gardens that keep growing.",
    heroSub: "Planting schemes and landscapes rooted in the garden's existing character.",
    role: "Design practice · London & Home Counties",
    shortBio: "Planting schemes and landscapes rooted in the garden's existing character.",
    longBio: "Willow Alexander Gardens is the design practice the House originally grew out of. It runs full landscape commissions — from concept through build to planting — and the seasonal management that keeps the finished thing looking like it was always there.\n\nThe studio also underwrites the Gardening service operationally: the same team that designs gardens is the team that quietly looks after them.",
    founded: "2015",
    basedIn: "West London",
    specialties: ["Naturalistic planting", "Restoration of neglected gardens", "Seasonal plans"],
    serviceAreas: ["London", "Home Counties", "Oxfordshire"],
    instagram: "@willowalexandergardens",
    houseApproved: true,
    order: 3,
  },
  {
    slug: "house-ai",
    name: "House AI",
    type: "brand-partner",
    typeLabel: "Specialist partner",
    heroEyebrow: "Design · Systems by the House",
    heroHeadline: "Intelligence that disappears into the architecture.",
    heroSub: "Automation, lighting schemes, audio, and heating controls — designed with our interior studios from the first brief.",
    role: "Specialist partner · UK-wide",
    shortBio: "Automation, lighting, audio, and quiet technology that disappears into the architecture.",
    longBio: "House AI is our specialist partner for anything electrical, automated, or intelligent inside a home. They build systems that are meant to be invisible: lighting that does the right thing without thinking about it, audio you don't see, heating that learns.\n\nThey work with our design studios from early concept so the technology doesn't feel bolted on. House AI also powers the back-end of the HoWA Companion — the model behind the diagnostic.",
    founded: "2021",
    basedIn: "London",
    specialties: ["Lighting schemes", "Audio & AV", "Heating & controls", "Companion models"],
    serviceAreas: ["UK-wide"],
    houseApproved: true,
    order: 4,
  },
];

function buildPartnerMutations() {
  return PARTNERS.map((p) => ({
    createOrReplace: {
      _id: `partner.${p.slug}`,
      _type: "partner",
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      partnerType: p.type,
      typeLabel: p.typeLabel,
      heroEyebrow: p.heroEyebrow,
      heroHeadline: p.heroHeadline,
      heroSub: p.heroSub,
      role: p.role,
      shortBio: p.shortBio,
      bio: textBlock(p.longBio),
      founded: p.founded,
      basedIn: p.basedIn,
      specialties: p.specialties,
      serviceAreas: p.serviceAreas,
      instagram: p.instagram,
      houseApprovedSeal: p.houseApproved,
      order: p.order,
    },
  }));
}

// ─────────────────────────────────────────────────────────
// 4. STEWARD PLANS
// ─────────────────────────────────────────────────────────

const STEWARD_PLANS = [
  { slug: "home-garden-essential", name: "Home & Garden+ Essential", category: "home-garden", tier: "Essential", price: 605, featured: false, inclusions: ["Weekly gardening (1hr)", "Weekly cleaning (2hrs)", "External window cleaning (monthly)", "HoWA record & scheduling"], lede: "The foundation. Weekly gardening and cleaning, monthly windows, all managed through HoWA.", body: "The Essential plan covers the three services most homes need on a regular rhythm: garden maintenance, domestic cleaning, and external window cleaning. Each visit is logged in your HoWA record. One monthly invoice, one standard, no chasing.", image: "https://willowalexander.co.uk/wp-content/uploads/2026/01/Home-Garden-Plus-Essential.jpg", order: 1 },
  { slug: "home-garden-comprehensive", name: "Home & Garden+ Comprehensive", category: "home-garden", tier: "Comprehensive", price: 745, featured: true, inclusions: ["Weekly gardening (1hr)", "Weekly cleaning (3hrs)", "External window cleaning (monthly)", "Bi-annual gutter clean", "Quarterly deep clean (4hrs)", "HoWA record & scheduling"], lede: "The most popular. Everything in Essential plus gutters, deep cleans, and an extra hour of cleaning each week.", body: "The Comprehensive plan adds the services that compound over time: gutter clears that prevent damp, quarterly deep cleans that reach what weekly visits can't, and an additional hour of cleaning each week for larger homes. The plan most of our House Steward members choose.", image: "https://willowalexander.co.uk/wp-content/uploads/2026/01/Home-Garden-Plus-Comprehensive.jpg", order: 2 },
  { slug: "home-garden-premium", name: "Home & Garden+ Premium", category: "home-garden", tier: "Premium", price: 1040, featured: false, inclusions: ["Weekly gardening (2hrs)", "Weekly cleaning (3hrs)", "Internal & external window cleaning (monthly)", "Bi-annual gutter clean", "Quarterly deep clean (4hrs)", "HoWA record & scheduling"], lede: "The full standard. Double gardening, internal windows, and everything the Comprehensive plan includes.", body: "The Premium plan is for larger homes and gardens that need more time. Two hours of gardening each week covers serious seasonal work. Internal and external window cleaning means you never need to think about glass again. Every service coordinated through a single HoWA calendar.", image: "https://willowalexander.co.uk/wp-content/uploads/2026/01/Home-Garden-Plus-Premium.jpg", order: 3 },
  { slug: "apartment-essential", name: "Apartment Essential", category: "apartment", tier: "Essential", price: 300, featured: false, inclusions: ["Weekly cleaning (2hrs)", "External window cleaning (monthly)", "HoWA record & scheduling"], lede: "Clean and clear. Weekly cleaning and monthly windows for flats without outdoor space.", body: "The Apartment Essential plan covers the two things every flat needs: a reliable weekly clean and monthly external windows. No garden, no gutters, no extras you don't use. Simple, and priced accordingly.", image: "https://willowalexander.co.uk/wp-content/uploads/2026/01/Apartment-Plus-Essential.jpg", order: 4 },
  { slug: "apartment-balcony", name: "Apartment+ Balcony", category: "apartment", tier: "Balcony", price: 460, featured: true, inclusions: ["Fortnightly gardening (1hr)", "Weekly cleaning (2hrs)", "External window cleaning (monthly)", "Quarterly deep clean (4hrs)", "HoWA record & scheduling"], lede: "For flats with outdoor space. Fortnightly balcony gardening, weekly cleaning, quarterly deep cleans.", body: "The Balcony plan adds fortnightly gardening for your terrace, roof garden, or balcony planters, plus a quarterly deep clean that reaches the places a weekly visit can't. The most popular Apartment plan.", image: "https://willowalexander.co.uk/wp-content/uploads/2026/01/Apartment-Plus-Balcony.jpg", order: 5 },
  { slug: "apartment-comprehensive", name: "Apartment Comprehensive", category: "apartment", tier: "Comprehensive", price: 335, featured: false, inclusions: ["Weekly cleaning (2hrs)", "External window cleaning (monthly)", "Quarterly deep clean (4hrs)", "HoWA record & scheduling"], lede: "Essential plus deep cleans. No garden, but quarterly resets that keep a flat properly maintained.", body: "The Comprehensive plan adds quarterly deep cleans to the Essential base. Four hours each quarter covering ovens, behind furniture, descaling, skirting, and everything the weekly rhythm doesn't reach.", image: "https://willowalexander.co.uk/wp-content/uploads/2026/01/Apartment-Plus-Comprehensive.jpg", order: 6 },
];

function buildPlanMutations() {
  return STEWARD_PLANS.map((p) => ({
    createOrReplace: {
      _id: `stewardPlan.${p.slug}`,
      _type: "servicePackage",
      title: p.name,
      slug: { _type: "slug", current: p.slug },
      tier: p.tier,
      price: `£${p.price}/month`,
      bestFor: p.lede,
      inclusions: p.inclusions,
      category: p.category,
      featured: p.featured,
      order: p.order,
    },
  }));
}

// ─────────────────────────────────────────────────────────
// 5. SITE SETTINGS
// ─────────────────────────────────────────────────────────

function buildSettingsMutations() {
  return [
    {
      createOrReplace: {
        _id: "siteSettings",
        _type: "siteSettings",
        title: "House of Willow Alexander",
        tagline: "Ownership is passive. Stewardship is intentional.",
        contactEmail: "hello@willowalexander.co.uk",
        phone: "+44 20 7946 0958",
        address: "London, United Kingdom",
        socialLinks: [
          { platform: "Instagram", url: "https://instagram.com/houseofwillowalexander" },
          { platform: "LinkedIn", url: "https://linkedin.com/company/willowalexander" },
        ],
        howaPlusPrice: "£16.99/month",
        footerTagline: "A modern British institution for the stewardship of homes.",
      },
    },
  ];
}

// ─────────────────────────────────────────────────────────
// 6. FAQs
// ─────────────────────────────────────────────────────────

const FAQS = [
  // Insurance FAQs
  { id: "faq.insurance-broker", category: "insurance", question: "Are you an insurance broker?", answer: "No. The House acts as an introducer. We connect you with FCA-authorised partners who specialise in high-net-worth home cover. We don't advise on, arrange, or conduct regulated insurance activity." },
  { id: "faq.insurance-underwriter", category: "insurance", question: "Who underwrites the policies?", answer: "Our House Approved insurance partners are FCA-regulated specialists in heritage homes and valuable contents. We name them at the point of introduction — not before — because the right underwriter depends on your home." },
  { id: "faq.insurance-cost", category: "insurance", question: "What does it cost?", answer: "Premiums depend on the property, its contents, and the level of cover. A typical London period house with collections might sit between £3,000 and £12,000 per year. You'll receive a firm quote from the underwriter before committing to anything." },
  { id: "faq.insurance-existing", category: "insurance", question: "Can you review my existing policy?", answer: "Yes. Register interest and we'll arrange a review alongside the introduction. Many clients find their current policy undervalues period features or excludes items they assumed were covered." },
  { id: "faq.insurance-claims", category: "insurance", question: "What happens if I need to make a claim?", answer: "The claim is handled by the insurer, but the House stays with you throughout. We help coordinate access, introduce vetted loss adjusters, and follow up until the matter resolves. You don't disappear into a queue." },
  { id: "faq.insurance-howa", category: "insurance", question: "How does this link to HoWA?", answer: "Your policy summary, renewal dates, and valuation schedule are filed in your HoWA home record. When a Protect Review flags something insurable, it routes straight to the insurance workflow." },
  // General / shared
  { id: "faq.services-insured", category: "services", question: "Are you insured?", answer: "Yes. Every team is fully insured, vetted, and accredited. Proof of cover is available on request." },
  { id: "faq.services-access", category: "services", question: "Do I need to be at the property?", answer: "No. Most clients share access instructions or a key code. We text before arrival and file a note to your HoWA record after." },
  { id: "faq.services-booking", category: "services", question: "How fast can I book?", answer: "Usually within a few days for regular services. Urgent one-offs can sometimes be fitted next-day." },
  { id: "faq.services-howa", category: "services", question: "What writes into HoWA?", answer: "Every visit is logged: date, team, notes, photographs on request, products used. It compounds into a record of care." },
];

function buildFaqMutations() {
  return FAQS.map((f) => ({
    createOrReplace: {
      _id: f.id,
      _type: "faq",
      question: f.question,
      answer: textBlock(f.answer),
      category: f.category,
    },
  }));
}

// ─────────────────────────────────────────────────────────
// 7. LEGAL PAGES (stubs)
// ─────────────────────────────────────────────────────────

function buildLegalMutations() {
  return [
    {
      createOrReplace: {
        _id: "legal.privacy",
        _type: "legalPage",
        title: "Privacy Policy",
        slug: { _type: "slug", current: "privacy" },
        body: textBlock("House of Willow Alexander is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal data. We collect information you provide directly (name, email, phone, address) when you book consultations, register interest, subscribe to newsletters, or make purchases. We use this data to deliver services, process orders, and communicate with you about your home's care. We never sell your data to third parties. Your HoWA record is private to you and the House. Data is stored securely on EU-based infrastructure (Supabase, Sanity) with encryption at rest and in transit. You can request access to, correction of, or deletion of your data at any time by emailing hello@willowalexander.co.uk."),
        lastUpdated: "2026-04-01",
      },
    },
    {
      createOrReplace: {
        _id: "legal.terms",
        _type: "legalPage",
        title: "Terms of Sale",
        slug: { _type: "slug", current: "terms" },
        body: textBlock("These terms govern purchases made through the House of Willow Alexander shop. All products are sold by House of Willow Alexander Ltd, registered in England and Wales. Prices are in GBP and include VAT where applicable. Delivery is free on all UK orders. Returns are accepted within 28 days in original condition. Refunds are processed within 14 days of receiving the returned item. For services (cleaning, gardening, etc.), terms are agreed at booking and confirmed via your HoWA record. Cancellations within 24 hours of a scheduled visit may incur a charge. HoWA+ membership is billed monthly at £16.99 and can be cancelled at any time with no notice period."),
        lastUpdated: "2026-04-01",
      },
    },
    {
      createOrReplace: {
        _id: "legal.cookies",
        _type: "legalPage",
        title: "Cookie Policy",
        slug: { _type: "slug", current: "cookies" },
        body: textBlock("We use a minimal set of cookies to operate the website. Essential cookies: session management, cart persistence, security tokens. These cannot be disabled. Analytics: we use privacy-respecting analytics (no cross-site tracking, no advertising cookies). Third-party: Cloudflare Turnstile for form protection, Shopify for checkout. No advertising or remarketing cookies are used. You can manage cookie preferences in your browser settings."),
        lastUpdated: "2026-04-01",
      },
    },
  ];
}

// ─────────────────────────────────────────────────────────
// RUN
// ─────────────────────────────────────────────────────────

async function main() {
  console.log("Importing all site data to Sanity...\n");

  console.log("1. Services (4)...");
  await mutate(buildServiceMutations());

  console.log("2. Service packages (10)...");
  await mutate(buildPackageMutations());

  console.log("3. Partners (4)...");
  await mutate(buildPartnerMutations());

  console.log("4. Steward Plans (6)...");
  await mutate(buildPlanMutations());

  console.log("5. Site settings...");
  await mutate(buildSettingsMutations());

  console.log("6. FAQs (10)...");
  await mutate(buildFaqMutations());

  console.log("7. Legal pages (3)...");
  await mutate(buildLegalMutations());

  console.log("\nDone. Total: 38 documents created/updated.");
}

main().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});
