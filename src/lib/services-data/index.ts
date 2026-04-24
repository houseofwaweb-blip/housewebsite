/**
 * Services dataset — hardcoded for launch, swap to Sanity `service` +
 * `servicePackage` documents later. Shape matches the GROQ response so
 * the migration is a single line: `await sanityFetch({...})`.
 */

export type ServiceSlug =
  | "gardening"
  | "window-cleaning"
  | "cleaning"
  | "gutter-cleaning"
  | "handyman"
  | "removals";

export interface ServicePackage {
  slug: string;
  name: string;
  tier: "one-off" | "care" | "steward";
  price: string;
  bestFor?: string;
  inclusions: string[];
  cta: "bookNow" | "quoteEntry" | "waitlist";
}

export interface SubService {
  slug: string;
  name: string;
  lede: string;
  /** Full description for the sub-service detail page. */
  body?: string;
  whyChoose?: string[];
  included?: string[];
  faq?: Array<{ q: string; a: string }>;
  image?: string;
}

export interface Service {
  slug: ServiceSlug;
  name: string;
  lede: string;
  eyebrow: string;
  headline: string;
  sections: {
    included: string[];
    how: string[];
  };
  recurring: boolean;
  availableAreas: string[];
  packages: ServicePackage[];
  /** Child services shown on the top-level service page. */
  subServices: SubService[];
  /** FAQ for the top-level service page. */
  faq: Array<{ q: string; a: string }>;
  /** Trust/accreditation badges. */
  trustBadges: string[];
  /** Optional full-bleed hero image. */
  heroImage?: string;
}

import {
  GARDENING_SUBS,
  WINDOW_CLEANING_SUBS,
  CLEANING_SUBS,
  GUTTER_CLEANING_SUBS,
  HANDYMAN_SUBS,
  REMOVALS_SUBS,
  SERVICE_TRUST_BADGES,
  SERVICE_FAQ_SHARED,
} from "./sub-services";

export const SERVICES: Record<ServiceSlug, Service> = {
  gardening: {
    slug: "gardening",
    name: "Gardening",
    lede: "Planting, maintenance, and seasonal care by gardeners who know the difference between a bay and a laurel.",
    eyebrow: "Services · Gardening",
    heroImage: "https://cdn.sanity.io/images/a9t8u8nh/production/027700c20d7a27faacb0dbdf0786e58a24d410f2-1280x1920.jpg?w=1920&auto=format",
    headline: "A garden you meant to have.",
    sections: {
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
    },
    recurring: true,
    availableAreas: ["SW", "W", "KT", "W4", "W6", "TW"],
    packages: [
      {
        slug: "tidy",
        name: "One-off tidy",
        tier: "one-off",
        price: "from £180",
        bestFor: "pre-event or back-from-holiday",
        inclusions: [
          "Half-day visit, two-person team",
          "Weeding, edging, and light prune",
          "Green-waste removal",
          "Photo handover",
        ],
        cta: "bookNow",
      },
      {
        slug: "seasonal",
        name: "Seasonal care",
        tier: "care",
        price: "from £95 / visit",
        bestFor: "ongoing monthly rhythm",
        inclusions: [
          "Four to eight visits a year",
          "Planting plan reviews each season",
          "Priority scheduling",
          "One urgent call-out credit per year",
        ],
        cta: "bookNow",
      },
      {
        slug: "steward-garden",
        name: "Steward Garden",
        tier: "steward",
        price: "from quote",
        bestFor: "larger gardens, fuller remit",
        inclusions: [
          "Fortnightly or weekly visits",
          "Annual planting plan refresh",
          "Dedicated gardener, named on your record",
          "Coordinated with window, gutter, and cleaning care",
        ],
        cta: "waitlist",
      },
    ],
    subServices: GARDENING_SUBS,
    faq: [
      { q: "Do you remove and dispose of all garden waste?", a: "Yes. We are licensed waste carriers. Everything is removed, sorted, and disposed of responsibly." },
      { q: "Can I mix one-off and subscription visits?", a: "Absolutely. One-offs sit alongside a subscription rhythm without affecting it." },
      { q: "What happens in winter?", a: "Reduced cadence: monthly check-in, structural pruning, leaf clearance. The garden still needs someone." },
      ...SERVICE_FAQ_SHARED,
    ],
    trustBadges: SERVICE_TRUST_BADGES,
  },

  "window-cleaning": {
    slug: "window-cleaning",
    name: "Window cleaning",
    lede: "Pure-water poled cleans up to four storeys. Frames and sills included. No streaks, no drips on the sill.",
    eyebrow: "Services · Window cleaning",
    headline: "Light, properly let in.",
    sections: {
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
    },
    recurring: true,
    availableAreas: ["SW", "W", "KT", "W4", "W6", "TW"],
    packages: [
      {
        slug: "oneoff-windows",
        name: "One-off clean",
        tier: "one-off",
        price: "from £60",
        bestFor: "a first look, or between scheduled visits",
        inclusions: [
          "All exterior windows, frames, sills",
          "Front and back elevations",
          "Condition note on any issues spotted",
        ],
        cta: "bookNow",
      },
      {
        slug: "monthly-windows",
        name: "Monthly care",
        tier: "care",
        price: "from £42 / visit",
        bestFor: "streets with regular rain or dust",
        inclusions: [
          "Monthly visit, same weekday each month",
          "Priority rescheduling in bad weather",
          "No-clean guarantee if rain follows within 48 hours",
        ],
        cta: "bookNow",
      },
    ],
    subServices: WINDOW_CLEANING_SUBS,
    faq: [
      { q: "Are you insured?", a: "Yes. Every team member is fully insured, with Federation of Window Cleaners certification." },
      { q: "How do you clean upper floors?", a: "Pure-water pole system reaches up to four storeys from the ground. No ladders against your walls." },
      ...SERVICE_FAQ_SHARED.slice(1),
    ],
    trustBadges: SERVICE_TRUST_BADGES,
  },

  cleaning: {
    slug: "cleaning",
    name: "Cleaning",
    lede: "Calm, thorough, discreet. Cleaners who know which surfaces want a damp cloth and which ask for nothing.",
    eyebrow: "Services · Cleaning",
    headline: "A house that feels cared for.",
    sections: {
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
    },
    recurring: true,
    availableAreas: ["SW", "W", "KT", "W4", "W6", "TW"],
    packages: [
      {
        slug: "oneoff-clean",
        name: "One-off clean",
        tier: "one-off",
        price: "from £140",
        bestFor: "pre-arrival, post-guests, estate agent viewings",
        inclusions: [
          "Full ground-floor and bedroom clean",
          "Kitchen surfaces and hob, bathroom descale",
          "Floors vacuumed and mopped",
          "Two- or three-person team depending on size",
        ],
        cta: "bookNow",
      },
      {
        slug: "weekly-clean",
        name: "Weekly care",
        tier: "care",
        price: "from £95 / visit",
        bestFor: "working households and family homes",
        inclusions: [
          "Same team each week wherever possible",
          "Rotating deep-clean schedule across rooms",
          "Priority rescheduling",
          "Bank holiday coverage included",
        ],
        cta: "bookNow",
      },
      {
        slug: "steward-clean",
        name: "Steward Clean",
        tier: "steward",
        price: "from quote",
        bestFor: "larger homes and listed buildings",
        inclusions: [
          "Everything in weekly care",
          "Quarterly deep cleans included",
          "Laundry, linen, and wardrobe rotation",
          "Coordinated with garden, windows, and gutters",
        ],
        cta: "waitlist",
      },
    ],
    subServices: CLEANING_SUBS,
    faq: [
      { q: "Can I choose my own products?", a: "Yes. Note your preferences in HoWA and the team will follow them. We default to House-approved, fragrance-free ranges." },
      { q: "What about key access?", a: "Most clients share a key code or a lockbox code. We text before arrival and never share access with anyone outside the team." },
      ...SERVICE_FAQ_SHARED,
    ],
    trustBadges: SERVICE_TRUST_BADGES,
  },

  "gutter-cleaning": {
    slug: "gutter-cleaning",
    name: "Gutter cleaning",
    lede: "Twice-a-year gutter clears by vacuum pole. Before winter, after the last leaves. Photograph of every run, front and back.",
    eyebrow: "Services · Gutter cleaning",
    headline: "A small job that saves a large one.",
    sections: {
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
    },
    recurring: true,
    availableAreas: ["SW", "W", "KT", "W4", "W6", "TW"],
    packages: [
      {
        slug: "oneoff-gutter",
        name: "One-off clear",
        tier: "one-off",
        price: "from £120",
        bestFor: "first visits, or after a big storm",
        inclusions: [
          "Full gutter clear, front and back",
          "Downpipe check + minor clearance",
          "Photographic record in your HoWA record",
        ],
        cta: "bookNow",
      },
      {
        slug: "twice-yearly-gutter",
        name: "Twice-yearly care",
        tier: "care",
        price: "from £180 / year",
        bestFor: "most British homes",
        inclusions: [
          "Autumn + spring scheduled visits",
          "Priority for repair quotes if anything's flagged",
          "Photographs filed to your record automatically",
        ],
        cta: "bookNow",
      },
    ],
    subServices: GUTTER_CLEANING_SUBS,
    faq: [
      { q: "How often should gutters be cleaned?", a: "At least twice a year — autumn after the last leaves, and spring before heavy rain. Properties near trees may need quarterly." },
      { q: "Can you repair damaged gutters?", a: "We flag issues in the condition report. For replacements we introduce you to a trusted roofer through the House." },
      ...SERVICE_FAQ_SHARED,
    ],
    trustBadges: SERVICE_TRUST_BADGES,
  },
  handyman: {
    slug: "handyman",
    name: "Handyman",
    lede: "General repairs, furniture assembly, picture hanging, shelf fitting, and the odd jobs a house always needs. Fully insured, carbon-neutral, on time.",
    eyebrow: "Services \u00b7 Handyman",
    headline: "The small fixes that keep a house running.",
    sections: {
      included: [
        "Furniture assembly \u2014 flat-pack, beds, wardrobes",
        "Picture hanging, mirror mounting, and shelf fitting",
        "TV wall-mounting and cable management",
        "Door hanging, lock changes, and handle replacement",
        "General repairs \u2014 cupboard doors, toilet seats, shower screens",
        "Baby-proofing, cat flaps, alarm installation",
        "Painting and decorating touch-ups",
        "Decking repairs and garden gate fixes",
      ],
      how: [
        "Describe the job \u2014 photos or a short video are usually enough",
        "Fixed quote within 24 hours, VAT included, no surprises",
        "Uniformed team arrives on time with all tools and materials",
        "Job logged and photographed in your HoWA record",
      ],
    },
    recurring: false,
    availableAreas: ["SW", "W", "KT", "SE", "BR", "DA", "TN"],
    packages: [
      {
        slug: "handyman-hour",
        name: "By the hour",
        tier: "one-off",
        price: "from \u00a360 / hour",
        bestFor: "quick fixes and single tasks",
        inclusions: [
          "One handyperson, fully equipped",
          "All standard tools and fixings included",
          "Minimum one-hour booking",
          "Waste removal available on request",
        ],
        cta: "bookNow",
      },
      {
        slug: "handyman-half-day",
        name: "Half-day visit",
        tier: "one-off",
        price: "from \u00a3220",
        bestFor: "a list of small jobs in one go",
        inclusions: [
          "Up to four hours, one or two-person team",
          "Multiple tasks in one visit",
          "All tools and standard fixings included",
          "Photo handover of completed work",
        ],
        cta: "bookNow",
      },
      {
        slug: "steward-handyman",
        name: "Steward Handyman",
        tier: "steward",
        price: "from quote",
        bestFor: "larger homes with ongoing maintenance needs",
        inclusions: [
          "Priority scheduling and emergency call-outs",
          "Quarterly property check and snagging review",
          "Coordinated with cleaning, garden, and window care",
          "Dedicated handyperson, named on your record",
        ],
        cta: "waitlist",
      },
    ],
    subServices: HANDYMAN_SUBS,
    faq: [
      { q: "Do I need to be home?", a: "An adult should be present while work is carried out. If you have a regular key arrangement through HoWA, we can discuss access for pre-agreed tasks." },
      { q: "Do you remove waste?", a: "Yes, waste removal can be arranged. We\u2019ll confirm at quoting stage whether it\u2019s included or charged separately." },
      { q: "Do you need to visit before quoting?", a: "Not usually. Photos or a short video are enough for most jobs. For larger or structural work, we\u2019ll arrange a site visit." },
      { q: "What\u2019s your cancellation policy?", a: "Cancellations must be made 48 hours before the booking. Refund terms apply \u2014 full details in your booking confirmation." },
      ...SERVICE_FAQ_SHARED,
    ],
    trustBadges: SERVICE_TRUST_BADGES,
  },

  removals: {
    slug: "removals",
    name: "Removals",
    lede: "Carbon-neutral house moves, packing, and storage coordination. Uniformed teams, fully insured, careful with the things that matter.",
    eyebrow: "Services \u00b7 Removals",
    headline: "Moving, without the dread.",
    sections: {
      included: [
        "Small and medium house moves across London and Kent",
        "Packing and wrapping \u2014 full or partial, your choice",
        "Large-item shop collection and delivery",
        "Local pick-up and drop-off for single pieces",
        "Moving items to and from storage",
        "Home organising before or after a move",
      ],
      how: [
        "Tell us what\u2019s moving, where from, where to",
        "Fixed quote based on volume, distance, and access",
        "Book at least two weeks ahead \u2014 short notice possible",
        "Uniformed team arrives on time, fully insured, carbon-neutral fleet",
      ],
    },
    recurring: false,
    availableAreas: ["SW", "W", "KT", "SE", "BR", "DA", "TN"],
    packages: [
      {
        slug: "local-move",
        name: "Local pick-up & drop-off",
        tier: "one-off",
        price: "from \u00a3120",
        bestFor: "single items, shop collections, storage runs",
        inclusions: [
          "One van, one or two-person team",
          "Wrapping and protection included",
          "Door-to-door within the service area",
          "Flexible scheduling, including weekends",
        ],
        cta: "quoteEntry",
      },
      {
        slug: "small-move",
        name: "Small house move",
        tier: "one-off",
        price: "from \u00a3450",
        bestFor: "flats, studios, and one-bed moves",
        inclusions: [
          "Full load and unload",
          "Blanket wrapping for furniture",
          "Dismantling and reassembly of beds and tables",
          "All items insured in transit",
        ],
        cta: "quoteEntry",
      },
      {
        slug: "full-move",
        name: "Full house move",
        tier: "one-off",
        price: "from quote",
        bestFor: "family homes and larger properties",
        inclusions: [
          "Packing service available (full or partial)",
          "Multi-van team scaled to the property",
          "Storage coordination if needed",
          "Post-move home organising available",
        ],
        cta: "quoteEntry",
      },
    ],
    subServices: REMOVALS_SUBS,
    faq: [
      { q: "Are my items insured during the move?", a: "Yes. All items are fully insured in transit, with certification proof available on request." },
      { q: "How far in advance should I book?", a: "Two weeks is ideal. The team can sometimes fit short-notice moves, but availability isn\u2019t guaranteed." },
      { q: "Can you pack for me?", a: "Yes. We offer full or partial packing. Let us know which items you\u2019d like us to handle and which you\u2019ll pack yourself." },
      { q: "Do you cover areas outside London?", a: "We serve London and northern Kent as standard. For moves further afield, get in touch and we\u2019ll confirm." },
      ...SERVICE_FAQ_SHARED.slice(2),
    ],
    trustBadges: SERVICE_TRUST_BADGES,
  },
};

export const SERVICE_ORDER: ServiceSlug[] = [
  "gardening",
  "window-cleaning",
  "cleaning",
  "gutter-cleaning",
  "handyman",
  "removals",
];
