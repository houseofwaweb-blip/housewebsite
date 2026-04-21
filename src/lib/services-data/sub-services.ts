import type { SubService } from ".";

/**
 * Sub-services for each of the 4 launch disciplines.
 * Content sourced from WP /service/ hierarchy + editorial rewrite for House voice.
 * These populate the sub-service grid on /services/[slug] and drive the
 * /services/[slug]/[sub] detail pages.
 */

export const GARDENING_SUBS: SubService[] = [
  {
    slug: "garden-clearance",
    name: "Garden clearance",
    lede: "Reclaim an overgrown space. We clear, sort, and remove — leaving a garden ready for what comes next.",
    body: "Whether you have just moved in, are preparing to sell, or simply haven't been able to keep up with an increasingly overgrown garden, a professional clearance is the first step back. Our horticulturally trained team assesses what should stay, what should go, and what needs care rather than removal. All green waste is removed by licensed carriers. The garden is left clean, raked, and ready for replanting or a design brief.",
    whyChoose: [
      "Horticulturally trained team — we don't just cut, we assess",
      "Structured approach: assess, clear, remove, prepare",
      "Licensed waste carriers — responsible disposal as standard",
      "Discreet, efficient, and respectful of your neighbours",
    ],
    included: [
      "Full site assessment before work begins",
      "Cutting back of overgrown shrubs, hedges, and borders",
      "Removal of dead plants, debris, and green waste",
      "Light ground preparation for future planting",
      "Photographic before-and-after in your HoWA record",
    ],
    faq: [
      { q: "Do you remove and dispose of all garden waste?", a: "Yes. We are licensed waste carriers. Everything is removed, sorted, and disposed of responsibly — never fly-tipped." },
      { q: "How do you approach larger or heavily overgrown gardens?", a: "We start with a structured assessment. For larger spaces we may stage the clearance over two visits, so the work is done properly and nothing worth keeping is lost." },
      { q: "Can you prepare a garden for sale or letting?", a: "Yes — we regularly prepare gardens for estate agent photography and viewings. We can also coordinate with Willow Alexander Gardens for planting if you want to go further." },
    ],
  },
  {
    slug: "garden-tidy",
    name: "Garden tidy",
    lede: "A single visit to bring the garden back to order. Weeding, edging, pruning, and a clean finish.",
  },
  {
    slug: "lawn-mowing",
    name: "Lawn mowing",
    lede: "Regular or one-off mowing, edging, and stripe. Blades set to the right height for the season.",
  },
  {
    slug: "lawn-care",
    name: "Lawn care",
    lede: "Feeds, aerating, scarifying, and weed treatment. The work behind a lawn that looks after itself.",
  },
  {
    slug: "hedge-and-boundary-maintenance",
    name: "Hedge & boundary maintenance",
    lede: "Formal hedges trimmed to line. Informal boundaries shaped with the season. All cuttings removed.",
  },
  {
    slug: "planting",
    name: "Planting",
    lede: "Seasonal beds, border refreshes, and specimen planting. We supply or plant what you bring.",
  },
  {
    slug: "tree-work",
    name: "Tree work",
    lede: "Crown reduction, deadwood removal, and light felling up to 4 metres. Larger jobs quoted on site.",
  },
  {
    slug: "turf-laying",
    name: "Turf laying",
    lede: "New lawns from quality turf, properly prepared. Ground levelled, turf laid, edges cut, first water done.",
  },
  {
    slug: "garden-maintenance-subscriptions",
    name: "Garden maintenance subscriptions",
    lede: "Scheduled seasonal care — the same gardener, on a rhythm. Weekly, fortnightly, or monthly.",
    body: "Our subscription plans are the most popular way to keep a garden running. You pick the rhythm. We assign a named gardener who learns the space. Visits are scheduled through HoWA, photographed, and logged to your home record. No per-visit admin, no surprises.",
  },
  {
    slug: "jet-washing",
    name: "Jet washing",
    lede: "Paths, patios, decking, and driveways. Professional equipment, controlled pressure, no surface damage.",
  },
];

export const WINDOW_CLEANING_SUBS: SubService[] = [
  {
    slug: "regular-window-cleaning",
    name: "Regular window cleaning",
    lede: "Scheduled monthly or bi-monthly cleans. The same team, the same day, text before arrival.",
    body: "Pure-water pole cleaning for all exterior windows, frames, and sills. Scheduled on a cadence that suits the property — monthly for high-traffic streets, bi-monthly for quieter ones. You don't need to be home. We text the morning of, arrive when we said, and file a note to your HoWA record after each visit.",
    whyChoose: [
      "Pure-water pole system — no detergents, no residue, no streaks",
      "Frames and sills included as standard (not extra)",
      "Up to four storeys from the ground, no ladders required",
      "A rain guarantee: if it rains within 48 hours, we return free",
    ],
    included: [
      "All exterior windows, frames, and sills",
      "Front and back elevations",
      "Text reminder the day before",
      "Condition note on cracked or failed glazing if spotted",
      "Logged in HoWA after each visit",
    ],
    faq: [
      { q: "Do I need to be at the property?", a: "No. Most clients pass on a gate code or leave access instructions. We text before arrival and photograph after." },
      { q: "What if it rains right after you clean?", a: "Our 48-hour rain guarantee means we come back at no extra charge. Pure-water cleaning is more rain-resistant than traditional methods, though." },
      { q: "How fast can I book?", a: "Usually within a few days. For urgent one-offs we can sometimes fit you in next-day." },
    ],
  },
  {
    slug: "one-off-window-cleaning",
    name: "One-off window cleaning",
    lede: "A single visit to restore clarity. Same equipment and standard as the regular service, no commitment.",
  },
  {
    slug: "gutter-cleaning",
    name: "Gutter cleaning",
    lede: "Vacuum-pole gutter clears, front and back. Photographic evidence of every run. Twice a year is ideal.",
    body: "Blocked gutters cause damp, staining, and pest access. Our team clears all gutters by industrial vacuum pole — no ladders on your walls, no damage to fascia. We photograph every run before and after, note any loose brackets or splits, and file the whole thing to your HoWA record. Most homes need this twice a year: once after the last leaves, once before winter rain.",
    whyChoose: [
      "Industrial vacuum pole — safe, efficient, no ladders on walls",
      "Before/after photographic record filed to HoWA",
      "Downpipe checks and minor blockage clearance included",
      "Flags repairs early, before damp sets in",
    ],
    included: [
      "Full gutter clear — front and back elevations",
      "Downpipe visual check + minor clearance",
      "Photographic record filed to HoWA",
      "Condition report on brackets, splits, and falls",
      "Green waste bagged and removed",
    ],
    faq: [
      { q: "How often should gutters be cleaned?", a: "At least twice a year — autumn after the last leaves, and spring before heavy rain. Properties near trees may benefit from quarterly." },
      { q: "Can you repair damaged gutters?", a: "We flag issues in the condition report. For replacements and re-seating we introduce you to a trusted roofer through the House." },
    ],
  },
  {
    slug: "softwashing",
    name: "Softwashing",
    lede: "Low-pressure exterior cleaning for render, cladding, and delicate stonework. No jet-wash damage.",
  },
];

export const CLEANING_SUBS: SubService[] = [
  {
    slug: "regular-cleaning",
    name: "Regular cleaning",
    lede: "Weekly or fortnightly domestic care. Same team each visit, your preferences on file in HoWA.",
    body: "Our regular cleaning service is built on consistency. We assign a named team who learns the home — your surfaces, your products, your preferences. Visits are scheduled through HoWA and logged with a short note after each one. If your regular cleaner is away, we send a cover team briefed from your record.",
    whyChoose: [
      "Named team who learns the home over time",
      "Scheduled through HoWA — no per-visit admin",
      "All products House-approved; fragrance-free on request",
      "Vetted, insured, and DBS-checked as standard",
    ],
    included: [
      "Full ground-floor and bedroom clean",
      "Kitchen surfaces, hob, and sink",
      "Bathroom descale and sanitisation",
      "Floors vacuumed and mopped (surface-appropriate)",
      "Logged in HoWA after each visit",
    ],
    faq: [
      { q: "Can I use my own products?", a: "Of course. If you prefer specific brands or fragrance-free products, note it in HoWA and the team will follow it." },
      { q: "What about bank holidays?", a: "Regular service clients get bank holiday coverage included. We'll reschedule around closures in advance." },
    ],
  },
  {
    slug: "one-off-cleaning",
    name: "One-off cleaning",
    lede: "A single deep clean for move-in, post-guests, or estate agent viewings. No commitment, full standard.",
  },
  {
    slug: "end-of-tenancy-cleaning",
    name: "End-of-tenancy cleaning",
    lede: "Inventory-standard clean for landlords and tenants. Oven, carpets, and behind-furniture deep work included.",
  },
  {
    slug: "after-building-cleaning",
    name: "After-building cleaning",
    lede: "Post-renovation deep clean. Dust extraction, paint-spot removal, and surface-by-surface restoration.",
  },
  {
    slug: "spring-clean",
    name: "Spring clean",
    lede: "A seasonal reset — windows inside, skirting, light switches, under-furniture, and the things the weekly misses.",
  },
];

export const GUTTER_CLEANING_SUBS: SubService[] = [];

export const SERVICE_TRUST_BADGES = [
  "House & Garden 'The List'",
  "Guild of Master Craftsmen",
  "Carbon Neutral Certified",
  "Fully Insured & Accredited",
  "Safe Contractor Approved",
];

export const SERVICE_AREAS = [
  "Chelsea",
  "Kensington",
  "Fulham",
  "Hammersmith",
  "Battersea",
  "Clapham",
  "Notting Hill",
  "Chiswick",
  "Kingston",
  "Dulwich",
  "Greenwich",
  "Blackheath",
  "Bromley",
  "Beckenham",
  "Sevenoaks",
  "Orpington",
];

export const SERVICE_FAQ_SHARED = [
  { q: "Are you insured?", a: "Yes. Every team is fully insured, vetted, and accredited. Proof of cover is available on request." },
  { q: "Do I need to be at the property?", a: "No. Most clients share access instructions or a key code. We text before arrival and file a note to your HoWA record after." },
  { q: "How fast can I book?", a: "Usually within a few days for regular services. Urgent one-offs can sometimes be fitted next-day." },
  { q: "What writes into HoWA?", a: "Every visit is logged: date, team, notes, photographs on request, products used. It compounds into a record of care." },
];
