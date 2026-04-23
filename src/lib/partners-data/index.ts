/**
 * Launch partners — hardcoded for the 4 we commit to at launch.
 * Shape matches Sanity `partner` schema so we can swap later.
 *
 * Used as the base for both designers and suppliers. Imagery is shared
 * placeholder art (public/partners/*) until per-partner photography lands.
 */

export type PartnerSlug =
  | "delve-interiors"
  | "jessica-durling-mcmahon"
  | "willow-alexander-gardens"
  | "house-ai";

export interface PartnerPackage {
  tier: string;
  name: string;
  priceFrom: string;
  priceUnit: string;
  bestFor: string;
  inclusions: string[];
  ctaLabel: string;
  featured?: boolean;
}

export interface PartnerProject {
  title: string;
  caption: string;
  meta: string;
  image: string;
}

export interface LaunchPartner {
  slug: PartnerSlug;
  name: string;
  type: "design-studio" | "interior-designer" | "craftsman" | "brand-partner";
  typeLabel: string;

  // Hero (editorial cover)
  heroEyebrow: string;
  heroHeadline: string;
  heroHeadlineEm?: string;
  heroSub: string;
  heroImage: string;
  heroCaption: string;

  // Designer block
  role: string;
  shortBio: string;
  longBio: string[];
  portraitImage: string;
  founded: string;
  basedIn: string;
  recent: string;

  // Packages
  packagesHeading: string;
  packagesHeadingEm?: string;
  packagesLede: string;
  packages: PartnerPackage[];

  // Recent work
  projectsHeading: string;
  projectsHeadingEm?: string;
  projects: PartnerProject[];

  // FAQ + closing line + meta
  faq: { q: string; a: string }[];
  closingLine: string;
  closingLineEm?: string;

  specialties: string[];
  serviceAreas: string[];
  website?: string;
  instagram?: string;
  houseApprovedSeal: boolean;
  awaitingAssets?: boolean;

  // Services provided by this partner
  services?: Array<{
    name: string;
    price: string;
    description: string;
  }>;
}

// Default project placeholder set — shared until partners provide real imagery.
const PLACEHOLDER_PROJECTS: PartnerProject[] = [
  {
    title: "A drawing room in Notting Hill",
    caption: "Interiors · 2025",
    meta: "Commissioned through the House",
    image: "/partners/project-1.jpg",
  },
  {
    title: "A kitchen in the Cotswolds",
    caption: "Interiors · 2024",
    meta: "House Approved",
    image: "/partners/project-2.jpg",
  },
  {
    title: "A reading room in Chelsea",
    caption: "Interiors · 2024",
    meta: "Private commission",
    image: "/partners/project-3.jpg",
  },
  {
    title: "A principal suite in Hampshire",
    caption: "Interiors · 2023",
    meta: "Full-house edit",
    image: "/partners/project-4.jpg",
  },
  {
    title: "A townhouse hall in Islington",
    caption: "Interiors · 2023",
    meta: "Room edit",
    image: "/partners/project-5.jpg",
  },
  {
    title: "A country kitchen in Oxfordshire",
    caption: "Interiors · 2023",
    meta: "Full-house edit",
    image: "/partners/project-6.jpg",
  },
];

// Default design package ladder for studios. House AI gets a custom set.
const DEFAULT_DESIGN_PACKAGES: PartnerPackage[] = [
  {
    tier: "I. Entry",
    name: "Room Edit",
    priceFrom: "£2,400",
    priceUnit: "per room",
    bestFor: "A single-room refresh with scheme + sourcing.",
    inclusions: [
      "Style diagnostic & mood direction",
      "Bespoke scheme (colour, fabric, light)",
      "Sourcing list via House Approved",
      "One revision round",
      "Delivered into HoWA as a live project",
    ],
    ctaLabel: "Configure in HoWA →",
  },
  {
    tier: "II. Recommended",
    name: "Full House Edit",
    priceFrom: "£12,000",
    priceUnit: "bespoke scope",
    bestFor:
      "A coherent language across every room, held together over time.",
    inclusions: [
      "Full architectural scheme",
      "Room-by-room sourcing & material pack",
      "Site visits & install coordination",
      "Three revision rounds",
      "Aftercare & HoWA project continuity",
    ],
    ctaLabel: "Book consultation →",
    featured: true,
  },
  {
    tier: "III. Add-ons",
    name: "Extras",
    priceFrom: "£400",
    priceUnit: "per add",
    bestFor: "Stack on top of Room Edit or Full House Edit.",
    inclusions: [
      "Shoppable moodboard",
      "Full material & sample pack",
      "Designer follow-up call",
      "House Approved procurement",
      "Aftercare extension",
    ],
    ctaLabel: "Add in HoWA →",
  },
];

const DEFAULT_FAQ = [
  {
    q: "How is HoWA different from hiring a designer directly?",
    a: "HoWA matches, configures, and holds the record — you keep the designer relationship.",
  },
  {
    q: "Can I buy a package before a consultation?",
    a: "Yes. Room Edit is Pay Now. Full House Edit is consultation-first.",
  },
  {
    q: "What does \u201cHouse Approved\u201d sourcing mean?",
    a: "A curated roster of makers and suppliers vetted by the House for craft and quality.",
  },
  {
    q: "Does every action live in HoWA?",
    a: "Every meaningful one. The living record is the point.",
  },
];

export const LAUNCH_PARTNERS: Record<PartnerSlug, LaunchPartner> = {
  "delve-interiors": {
    slug: "delve-interiors",
    name: "Delve Interiors",
    type: "interior-designer",
    typeLabel: "Interior Designer",

    heroEyebrow: "Design \u00b7 Interiors by the House",
    heroHeadline: "Consciously designed interiors.",
    heroHeadlineEm: "designed interiors.",
    heroSub:
      "At the House of Willow Alexander, we believe that interiors are living expressions of the people who inhabit them. Beauty, balance, and intention \u2014 curated by Alana Miller and THE HOUSE EDIT.",
    heroImage: "/design/interiors/project-tunbridge-1.webp",
    heroCaption: "Tunbridge Wells \u00b7 Delve Interiors",

    role: "Alana Miller \u00b7 Founder, THE HOUSE EDIT",
    shortBio:
      "Timeless design with heritage charm and modern ease. Layered interiors that feel both elegant and effortless.",
    longBio: [
      "With a refined eye for timeless design, Alana Miller is the creative force behind THE HOUSE EDIT. Trained at the KLC School of Design, she blends heritage charm with modern ease, curating layered interiors that feel both elegant and effortless.",
      "Her signature style embraces tactile warmth, sustainable finds, and an intuitive sense of flow \u2014 spaces that tell a story and invite you to live beautifully. Guided by collaboration and care, Alana crafts homes that are as soulful as they are functional, always one-of-a-kind \u2014 whether restoring an Edwardian cottage or reimagining a family home.",
    ],
    portraitImage: "/design/interiors/designer-portrait.jpg",
    founded: "2018",
    basedIn: "London & Home Counties",
    recent: "Hertfordshire \u00b7 Buckinghamshire \u00b7 Tunbridge Wells",

    packagesHeading: "Three ways to commission.",
    packagesHeadingEm: "One living record.",
    packagesLede:
      "Every package writes back into your HoWA home record, so decisions, materials, and moodboards stay with the house \u2014 not in an email thread.",
    packages: DEFAULT_DESIGN_PACKAGES,

    projectsHeading: "From the studio.",
    projectsHeadingEm: "Recent commissions.",
    projects: [
      { title: "Hertfordshire Living Room", caption: "Interiors \u00b7 2025", meta: "Full house edit", image: "/design/interiors/project-living-room.webp" },
      { title: "Buckinghamshire Bedroom", caption: "Interiors \u00b7 2025", meta: "Room edit", image: "/design/interiors/project-bedroom.webp" },
      { title: "Hertfordshire Dining Room", caption: "Interiors \u00b7 2024", meta: "Full house edit", image: "/design/interiors/project-dining.webp" },
      { title: "Tunbridge Wells Drawing Room", caption: "Interiors \u00b7 2024", meta: "Period restoration", image: "/design/interiors/project-tunbridge-1.webp" },
      { title: "Tunbridge Wells Study", caption: "Interiors \u00b7 2024", meta: "Period restoration", image: "/design/interiors/project-tunbridge-2.webp" },
      { title: "Tunbridge Wells Detail", caption: "Interiors \u00b7 2024", meta: "Finishing touches", image: "/design/interiors/project-detail.webp" },
    ],

    faq: [
      { q: "What is THE HOUSE EDIT?", a: "A 90-minute one-to-one online styling session with Alana. Thoughtful guidance on palette, layout, and sourcing, delivered as a personalised PDF moodboard." },
      { q: "Can I upgrade from a House Edit to a Full House Edit?", a: "Yes. Your initial edit applies as credit toward the full package. Nothing is wasted." },
      { q: "Do you work outside London?", a: "Yes. Alana works across London, the Home Counties, and the South East. Video consultations available for further afield." },
      { q: "Does everything save to HoWA?", a: "Every meaningful decision. Moodboards, sourcing lists, material packs, and project notes all write to your living record." },
    ],
    closingLine:
      "Every space should feel intentional \u2014 shaped by thoughtful choices and natural materials.",
    closingLineEm: "shaped by thoughtful choices and natural materials.",

    specialties: ["Layered interiors", "Heritage restoration", "Sustainable sourcing", "Textile-forward schemes"],
    serviceAreas: ["London", "Home Counties", "South East"],
    instagram: "@thehouseedit",
    houseApprovedSeal: true,

    services: [
      { name: "The House Edit", price: "\u00a3295", description: "A 90-minute one-to-one online styling session. Personalised PDF moodboard with curated links. 10% House Store discount." },
      { name: "Additions to Your Edit", price: "from \u00a3195", description: "Shoppable moodboard, sourcing per room, material pack (swatches, samples, scents), 30-minute follow-up call." },
      { name: "The Full House Edit", price: "from \u00a3795", description: "Initial 90-minute consultation, moodboards for up to three rooms, sourcing for two rooms, a tactile material pack, 30-minute follow-up, 15% House Store discount." },
      { name: "Room Edit", price: "from \u00a32,400", description: "A single-room refresh with full scheme, colour, fabric, light, and sourcing via House Approved." },
      { name: "Full House Edit (Studio)", price: "from \u00a312,000", description: "A coherent language across every room. Full architectural scheme, room-by-room sourcing, site visits, install coordination, aftercare." },
      { name: "The Style Diagnostic", price: "Coming Soon", description: "A guided style journey that reveals your personal home moodboard. Free mini style summary, shoppable digital moodboard, AI & designer session upgrade." },
    ],
  },

  "jessica-durling-mcmahon": {
    slug: "jessica-durling-mcmahon",
    name: "Jessica Durling-McMahon",
    type: "interior-designer",
    typeLabel: "Interior designer",

    heroEyebrow: "Design · Interiors by the House",
    heroHeadline: "Rooms with a memory.",
    heroHeadlineEm: "with a memory.",
    heroSub:
      "Layered rooms with confident colour, antiques properly used, and a love of textile. From a single room refresh to a full-house edit, commissioned through the House and coordinated through HoWA.",
    heroImage: "/partners/hero.png",
    heroCaption: "Kensington drawing room \u00b7 Jessica Durling-McMahon",

    role: "Founder \u00b7 Durling Interiors, London",
    shortBio:
      "Layered rooms with confident colour, antiques properly used, and a love of textile.",
    longBio: [
      "A studio led by instinct and discipline. Rooms composed with a slow hand, for homes that prefer to feel inherited rather than assembled.",
      "Work ranges from intimate reading rooms to full-house commissions across London and the Home Counties. Studio focus: pattern, light, and the restraint to let a room settle.",
    ],
    portraitImage: "/partners/portrait.png",
    founded: "2017",
    basedIn: "Notting Hill",
    recent: "Kensington \u00b7 Cotswolds",

    packagesHeading: "Three ways to commission.",
    packagesHeadingEm: "One living record.",
    packagesLede:
      "Every package writes back into your HoWA home record, so decisions, materials, and moodboards stay with the house \u2014 not in an email thread.",
    packages: DEFAULT_DESIGN_PACKAGES,

    projectsHeading: "From the studio.",
    projectsHeadingEm: "Recent commissions.",
    projects: PLACEHOLDER_PROJECTS,

    faq: DEFAULT_FAQ,
    closingLine:
      "For a room worth living in \u2014 commission once, and steward over time.",
    closingLineEm: "commission once, and steward over time.",

    specialties: ["Layered colour", "Antiques & vintage sourcing", "Textile-forward schemes"],
    serviceAreas: ["London", "South East", "Cotswolds"],
    instagram: "@jessicadurlingmcmahon",
    houseApprovedSeal: true,
    awaitingAssets: true,
  },

  "willow-alexander-gardens": {
    slug: "willow-alexander-gardens",
    name: "Willow Alexander Gardens",
    type: "design-studio",
    typeLabel: "Garden design",

    heroEyebrow: "Design · Gardens by the House",
    heroHeadline: "Gardens that keep growing.",
    heroHeadlineEm: "keep growing.",
    heroSub:
      "Planting schemes and landscapes rooted in the garden\u2019s existing character. Full commissions from concept to install, plus the seasonal care that keeps it looking like it was always there.",
    heroImage: "/partners/hero.png",
    heroCaption: "Country house garden \u00b7 Willow Alexander Gardens",

    role: "Design practice \u00b7 London & Home Counties",
    shortBio:
      "Planting schemes and landscapes rooted in the garden's existing character.",
    longBio: [
      "Willow Alexander Gardens is the design practice the House originally grew out of. It runs full landscape commissions \u2014 from concept through build to planting \u2014 and the seasonal management that keeps the finished thing looking like it was always there.",
      "The studio also underwrites the Gardening service operationally: the same team that designs gardens is the team that quietly looks after them.",
    ],
    portraitImage: "/partners/portrait.png",
    founded: "2015",
    basedIn: "West London",
    recent: "Oxfordshire \u00b7 Hampshire \u00b7 SW London",

    packagesHeading: "Three ways to commission.",
    packagesHeadingEm: "One living record.",
    packagesLede:
      "Every package writes back into your HoWA home record. Seasonal care flows straight into scheduled service visits.",
    packages: [
      {
        tier: "I. Entry",
        name: "Planting Refresh",
        priceFrom: "£1,800",
        priceUnit: "per scheme",
        bestFor: "Replanting existing structure with a fresh palette.",
        inclusions: [
          "Garden walk + brief",
          "Seasonal planting plan",
          "Sourcing list via House Approved",
          "One revision round",
          "Delivered into HoWA as a live project",
        ],
        ctaLabel: "Configure in HoWA \u2192",
      },
      {
        tier: "II. Recommended",
        name: "Full Garden Design",
        priceFrom: "£9,000",
        priceUnit: "bespoke scope",
        bestFor: "Concept through install, hard and soft landscaping.",
        inclusions: [
          "Full landscape scheme",
          "Planting plan & sourcing",
          "Site visits & install coordination",
          "Seasonal handover pack",
          "Rolling seasonal care (optional)",
        ],
        ctaLabel: "Book consultation \u2192",
        featured: true,
      },
      {
        tier: "III. Add-ons",
        name: "Extras",
        priceFrom: "£300",
        priceUnit: "per add",
        bestFor: "Stack on top of either package.",
        inclusions: [
          "Seasonal review visit",
          "Container & pot planting",
          "Lighting scheme",
          "House Approved procurement",
          "Aftercare extension",
        ],
        ctaLabel: "Add in HoWA \u2192",
      },
    ],

    projectsHeading: "From the studio.",
    projectsHeadingEm: "Recent commissions.",
    projects: PLACEHOLDER_PROJECTS,

    faq: DEFAULT_FAQ,
    closingLine:
      "A garden you want to live in \u2014 planted once, tended forever.",
    closingLineEm: "planted once, tended forever.",

    specialties: ["Naturalistic planting", "Restoration of neglected gardens", "Seasonal plans"],
    serviceAreas: ["London", "Home Counties", "Oxfordshire"],
    website: "https://willowalexandergardens.example",
    instagram: "@willowalexandergardens",
    houseApprovedSeal: true,
  },

  "house-ai": {
    slug: "house-ai",
    name: "House AI",
    type: "brand-partner",
    typeLabel: "Specialist partner",

    heroEyebrow: "Design · Systems by the House",
    heroHeadline: "Intelligence that disappears into the architecture.",
    heroHeadlineEm: "disappears into the architecture.",
    heroSub:
      "Automation, lighting schemes, audio, and heating controls \u2014 designed with our interior studios from the first brief. The brains behind the HoWA Companion as well.",
    heroImage: "/partners/hero.png",
    heroCaption: "Integrated lighting scheme \u00b7 House AI",

    role: "Specialist partner \u00b7 UK-wide",
    shortBio:
      "Automation, lighting, audio, and quiet technology that disappears into the architecture.",
    longBio: [
      "House AI is our specialist partner for anything electrical, automated, or intelligent inside a home. They build systems that are meant to be invisible: lighting that does the right thing without thinking about it, audio you don't see, heating that learns.",
      "They work with our design studios from early concept so the technology doesn't feel bolted on. House AI also powers the back-end of the HoWA Companion \u2014 the model behind the diagnostic.",
    ],
    portraitImage: "/partners/portrait.png",
    founded: "2021",
    basedIn: "London",
    recent: "Notting Hill \u00b7 Oxfordshire \u00b7 Edinburgh",

    packagesHeading: "Three ways to engage.",
    packagesHeadingEm: "One home intelligence.",
    packagesLede:
      "Every integration writes back into your HoWA record \u2014 wiring diagrams, settings, firmware, scenes. No black boxes.",
    packages: [
      {
        tier: "I. Advisory",
        name: "Design Review",
        priceFrom: "£1,200",
        priceUnit: "one-off",
        bestFor: "A specialist eye over a renovation's technology plan.",
        inclusions: [
          "Walkthrough with the architect or designer",
          "Written review with recommended specs",
          "Budget sanity-check",
          "Priority intros to installers",
          "Filed to HoWA",
        ],
        ctaLabel: "Configure in HoWA \u2192",
      },
      {
        tier: "II. Recommended",
        name: "Full Integration",
        priceFrom: "£18,000",
        priceUnit: "bespoke scope",
        bestFor:
          "Lighting, audio, heating, security \u2014 planned and installed coherently.",
        inclusions: [
          "Full technology scheme",
          "Lighting \u00b7 audio \u00b7 heating \u00b7 security",
          "Site visits & install coordination",
          "Scene + automation setup",
          "Aftercare & HoWA-held settings",
        ],
        ctaLabel: "Book consultation \u2192",
        featured: true,
      },
      {
        tier: "III. Add-ons",
        name: "Extras",
        priceFrom: "£400",
        priceUnit: "per add",
        bestFor: "Stack on top of either package.",
        inclusions: [
          "Scene redesign",
          "Firmware refresh",
          "Annual health check",
          "Smart-home audit",
          "Companion-linked alerts",
        ],
        ctaLabel: "Add in HoWA \u2192",
      },
    ],

    projectsHeading: "Recent work.",
    projectsHeadingEm: "From the studios of the House.",
    projects: PLACEHOLDER_PROJECTS,

    faq: DEFAULT_FAQ,
    closingLine:
      "Technology worth not thinking about \u2014 specified once, updated forever.",
    closingLineEm: "specified once, updated forever.",

    specialties: ["Lighting schemes", "Audio & AV", "Heating & controls", "Companion models"],
    serviceAreas: ["UK-wide"],
    houseApprovedSeal: true,
    awaitingAssets: true,
  },
};

export const PARTNER_ORDER: PartnerSlug[] = [
  "delve-interiors",
  "jessica-durling-mcmahon",
  "willow-alexander-gardens",
  "house-ai",
];
