/**
 * Services dataset, hardcoded for launch, swap to Sanity `service` +
 * `servicePackage` documents later. Shape matches the GROQ response so
 * the migration is a single line: `await sanityFetch({...})`.
 */

export type ServiceSlug =
  | "gardening"
  | "window-cleaning"
  | "cleaning"
  | "gutter-cleaning"
  | "handyman"
  | "removals"
  | "energy"
  | "pet-care";

/**
 * How a package is charged. The House does not publish figures on the public
 * site, so every package declares its charging BASIS instead of a price. The
 * customer sees "Priced per hour" rather than a number.
 *
 * Only these five apply here. "per team" (the House sends professionals, not a
 * fixed crew size) and "survey" (reserved for design commissions) are excluded
 * by decision.
 */
export type ServiceBasis = "per visit" | "per hour" | "per item" | "per job" | "quote";

const BASIS_PHRASE: Record<ServiceBasis, string> = {
  "per visit": "Priced per visit",
  "per hour": "Priced per hour",
  "per item": "Priced per item",
  "per job": "Priced per job",
  quote: "Priced on a quote",
};

/** Customer-facing charging-basis line, e.g. "Priced per hour". Never a £ figure.
 *  Falls back to a neutral enquiry line where a basis is not set (e.g. a package
 *  hydrated from the CMS before its basis is authored). */
export function basisPhrase(basis?: ServiceBasis): string {
  return basis ? BASIS_PHRASE[basis] : "Priced on enquiry";
}

export interface ServicePackage {
  slug: string;
  name: string;
  tier: "one-off" | "care" | "steward";
  /**
   * Charging-basis phrase shown to the customer (e.g. "Priced per hour"). The
   * House does not publish £ figures on the public site, so this carries the
   * basis, never a number. Kept as a string so existing "from price" reads
   * (hero, booking panel, grid) render the basis with no template changes.
   */
  price: string;
  /** Machine-readable charging basis. Drives the pricing card and grid line.
   *  Optional only so CMS-hydrated packages type-check; every hand-authored
   *  package in this file sets it. */
  basis?: ServiceBasis;
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
  /** Render the detail page as a coming-soon page (hero + "Service Coming
   *  Soon", detail sections hidden) even if photography exists. Copy stays in
   *  the data for when it launches. */
  comingSoon?: boolean;
}

export interface Service {
  slug: ServiceSlug;
  name: string;
  lede: string;
  eyebrow: string;
  headline: string;
  /** Substring of `headline` to italicise as the lander-framework em accent. */
  headlineEm?: string;
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
  /** Beeton-style spine colour. Used by ArtworkVolumesShelf and elsewhere
   *  that wants to colour-code a service. Optional because not every
   *  service has a brand volume (e.g. gutter-cleaning, energy). */
  colour?: string;
}

import {
  GARDENING_SUBS,
  WINDOW_CLEANING_SUBS,
  CLEANING_SUBS,
  GUTTER_CLEANING_SUBS,
  HANDYMAN_SUBS,
  REMOVALS_SUBS,
  ENERGY_SUBS,
  PET_CARE_SUBS,
  SERVICE_TRUST_BADGES,
  SERVICE_FAQ_SHARED,
} from "./sub-services";

export const SERVICES: Record<ServiceSlug, Service> = {
  gardening: {
    slug: "gardening",
    name: "Gardening",
    lede: "Planting, maintenance, and seasonal care by gardeners who know the difference between a bay and a laurel.",
    eyebrow: "Services · Gardening",
    heroImage: "/services/photos/gardening-hero.webp",
    headline: "A garden you meant to have.",
    headlineEm: "to have.",
    colour: "#1E3D33",
    sections: {
      included: [
        "Garden tidies and clearance",
        "Lawn care, mowing and edging",
        "Hedge and boundary maintenance",
        "Tree surgery and planting",
        "Green waste removed by a licensed carrier",
      ],
      how: [
        "Tell us about the garden, and your postcode",
        "A clear, itemised price for the work",
        "Book a one-off, or a regular seasonal rhythm",
        "We arrive when arranged, and file the visit to your Home Record",
      ],
    },
    recurring: true,
    availableAreas: ["SW", "W", "KT", "W4", "W6", "TW"],
    packages: [
      {
        slug: "tidy",
        name: "One-off tidy",
        tier: "one-off",
        price: "Priced per job",
        basis: "per job",
        bestFor: "pre-event or back-from-holiday",
        inclusions: [
          "Overgrowth cut back, beds and paths cleared",
          "Weeding, edging and a light prune",
          "Green waste removed by a licensed carrier",
        ],
        cta: "bookNow",
      },
      {
        slug: "seasonal",
        name: "Seasonal care",
        tier: "care",
        price: "Priced per hour",
        basis: "per hour",
        bestFor: "ongoing monthly rhythm",
        inclusions: [
          "Regular, season-aware visits",
          "Green waste composted, removed by a licensed carrier",
          "Battery and electric tools, quieter visits",
          "Carbon neutral",
        ],
        cta: "bookNow",
      },
      {
        slug: "estate-garden-care",
        name: "Estate care",
        tier: "steward",
        price: "Priced per hour",
        basis: "per hour",
        bestFor: "larger gardens, a fuller recurring rhythm",
        inclusions: [
          "A fuller recurring rhythm, fortnightly or weekly",
          "The same gardener through the seasons",
          "Coordinated with window, gutter and cleaning care",
          "Green waste composted, removed by a licensed carrier",
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
    // Confirmed per-service credential only (gardeners are a licensed waste carrier).
    trustBadges: ["Licensed waste carrier"],
  },

  "window-cleaning": {
    slug: "window-cleaning",
    name: "Window cleaning",
    lede: "Pure water cleaning from the ground, powered by our electric fleet. No ladders, no harsh detergents, no streaks. Federation of Window Cleaners certified.",
    eyebrow: "Services · Window cleaning",
    heroImage: "/services/photos/window-cleaning-hero.webp",
    headline: "Light, properly let in.",
    headlineEm: "properly let in.",
    colour: "#3D123C",
    sections: {
      included: [
        "All outside windows, frames and sills, front and back",
        "Pure water cleaning, no harsh detergents, dries streak-free",
        "Upper floors reached safely from the ground, no ladders against your walls",
        "uPVC frames, sills and trim cleaned back to white",
        "A note on any cracked or misted glass we spot",
      ],
      how: [
        "Tell us your postcode and a little about the property",
        "A fixed price for your property",
        "Book a one-off, or a regular visit every month or two",
        "A reminder the day before, and the visit filed to your Home Record",
      ],
    },
    recurring: true,
    availableAreas: ["SW", "W", "KT", "W4", "W6", "TW"],
    packages: [
      {
        slug: "oneoff-windows",
        name: "One-off clean",
        tier: "one-off",
        price: "Priced per job",
        basis: "per job",
        bestFor: "a first look, or between scheduled visits",
        inclusions: [
          "All outside windows, frames and sills",
          "Front and back of the property",
          "Pure water, streak-free finish",
        ],
        cta: "bookNow",
      },
      {
        slug: "monthly-windows",
        name: "Monthly care",
        tier: "care",
        price: "Priced per hour",
        basis: "per hour",
        bestFor: "streets with regular rain or dust",
        inclusions: [
          "The same trained team, visit after visit",
          "A confirmed visit window, with notice before we arrive",
          "Real-time arrival tracking",
        ],
        cta: "bookNow",
      },
    ],
    subServices: WINDOW_CLEANING_SUBS,
    faq: [
      { q: "Are you insured?", a: "Yes. Every team member is fully insured, with Federation of Window Cleaners certification." },
      { q: "How do you clean upper floors?", a: "We reach the upper floors from the ground with a water-fed pole, so no ladders lean against your walls." },
      ...SERVICE_FAQ_SHARED.slice(1),
    ],
    // Confirmed per-service credential only (window cleaners carry insurance).
    trustBadges: ["Insured"],
  },

  cleaning: {
    slug: "cleaning",
    name: "Cleaning",
    lede: "Trained, uniformed cleaners using plant-based products that lift grime without leaving a chemical note in the air. Electric fleet, battery-powered tools, fragrance-free on request.",
    eyebrow: "Services · Cleaning",
    heroImage: "/services/photos/cleaning-hero.webp",
    headline: "A house that feels cared for.",
    headlineEm: "that feels cared for.",
    colour: "#294D58",
    sections: {
      included: [
        "Full-home clean, kitchens, bathrooms, living spaces, bedrooms",
        "Plant-based, low-tox products",
        "Battery-powered, low-noise equipment, we bring everything",
        "Wood, tile, carpet and laminate floors, each cleaned the right way",
        "Window insides, skirting boards, light switches, door handles",
        "Optional inside-oven and inside-fridge deep clean",
      ],
      how: [
        "Tell us the home, the rooms, and the products you prefer",
        "We set a plan around your priorities, room by room",
        "A vetted team arrives on time, bringing everything they need",
        "We walk the work with you and file a note to your record",
      ],
    },
    recurring: true,
    availableAreas: ["SW", "W", "KT", "W4", "W6", "TW"],
    packages: [
      {
        slug: "oneoff-clean",
        name: "One-off clean",
        tier: "one-off",
        price: "Priced per job",
        basis: "per job",
        bestFor: "pre-arrival, post-guests, estate agent viewings",
        inclusions: [
          "A single deep clean, top to bottom",
          "Kitchens and bathrooms, surfaces, hob and descale",
          "Floors vacuumed and mopped throughout",
        ],
        cta: "bookNow",
      },
      {
        slug: "weekly-clean",
        name: "Weekly care",
        tier: "care",
        price: "Priced per hour",
        basis: "per hour",
        bestFor: "working households and family homes",
        inclusions: [
          "Weekly or fortnightly, the same trusted cleaner",
          "Plant-based, low-tox products as standard",
          "DBS-checked, insured and reference-verified",
          "No long contract, change or pause whenever you like",
        ],
        cta: "bookNow",
      },
      {
        slug: "whole-home-clean",
        name: "Whole-home care",
        tier: "steward",
        price: "Priced per hour",
        basis: "per hour",
        bestFor: "larger homes and listed buildings",
        inclusions: [
          "Everything in weekly care, for larger homes",
          "Deep cleaning, top to bottom",
          "Coordinated with garden, windows and gutters",
          "Full public liability and accidental-damage cover",
        ],
        cta: "waitlist",
      },
    ],
    subServices: CLEANING_SUBS,
    faq: [
      { q: "Can I choose my own products?", a: "Yes. Note your preferences in your Home Record and the team will follow them. We default to House-standard, fragrance-free ranges." },
      { q: "What about key access?", a: "Most clients share a key code or a lockbox code. We text before arrival and never share access with anyone outside the team." },
      ...SERVICE_FAQ_SHARED,
    ],
    // Confirmed per-service credentials only (cleaners are DBS-checked, insured, reference-verified).
    trustBadges: ["DBS-checked", "Insured", "Reference-verified"],
  },

  "gutter-cleaning": {
    slug: "gutter-cleaning",
    name: "Gutter cleaning",
    colour: "#3D123C",
    lede: "Gutters cleared from the ground with a vacuum system and a camera check. Clears blockages, leaves, moss and bird mess. Safe and ladder-free.",
    eyebrow: "Services · Gutter cleaning",
    heroImage: "/services/photos/gutter-cleaning-hero.webp",
    headline: "A small job that saves a large one.",
    headlineEm: "that saves a large one.",
    sections: {
      included: [
        "Full gutter clear from the ground, front and back",
        "A camera check to confirm every gutter is clear",
        "Downpipes cleaned and checked for blockages",
        "A note on any repairs needed, loose brackets, splits or poor drainage",
      ],
      how: [
        "Tell us about the property and how we get access",
        "A fixed quote based on your postcode and the property",
        "Typically seen within a week, twice a year if scheduled",
        "A text before we arrive, no need to be home",
      ],
    },
    recurring: true,
    availableAreas: ["SW", "W", "KT", "W4", "W6", "TW"],
    packages: [
      {
        slug: "oneoff-gutter",
        name: "One-off clear",
        tier: "one-off",
        price: "Priced per job",
        basis: "per job",
        bestFor: "first visits, or after a big storm",
        inclusions: [
          "Full gutter clear, front and back",
          "Downpipes cleaned and checked for blockages",
          "Filed to your Home Record",
        ],
        cta: "bookNow",
      },
      {
        slug: "twice-yearly-gutter",
        name: "Twice-yearly care",
        tier: "care",
        price: "Priced per hour",
        basis: "per hour",
        bestFor: "most British homes",
        inclusions: [
          "Autumn and spring visits",
          "Downpipes cleaned and checked each visit",
          "A note on any repairs the gutters need",
          "Filed to your Home Record",
        ],
        cta: "bookNow",
      },
    ],
    subServices: GUTTER_CLEANING_SUBS,
    faq: [
      { q: "How often should gutters be cleaned?", a: "At least twice a year, autumn after the last leaves, and spring before heavy rain. Properties near trees may need quarterly." },
      { q: "Can you repair damaged gutters?", a: "We flag issues in the condition report. For replacements we introduce you to a trusted roofer through the House." },
      ...SERVICE_FAQ_SHARED,
    ],
    trustBadges: SERVICE_TRUST_BADGES,
  },
  handyman: {
    slug: "handyman",
    name: "Handyman",
    lede: "General repairs, furniture assembly, picture hanging, shelf fitting, and the odd jobs a house always needs. Fully insured, on time.",
    eyebrow: "Services \u00b7 Handyman",
    heroImage: "/services/home/handyman.webp",
    headline: "The small fixes that keep a house running.",
    colour: "#5D1408",
    sections: {
      included: [
        "Furniture assembly, flat-pack, beds, wardrobes",
        "Picture hanging, mirror mounting, and shelf fitting",
        "TV wall-mounting and cable management",
        "Door hanging, lock changes, and handle replacement",
        "General repairs, cupboard doors, toilet seats, shower screens",
        "Baby-proofing, cat flaps, alarm installation",
        "Painting and decorating touch-ups",
        "Decking repairs and garden gate fixes",
      ],
      how: [
        "Describe the job, photos or a short video are usually enough",
        "A fixed quote, VAT included",
        "The team arrives with the tools and materials for the job",
        "The work is photographed and filed to your Home Record",
      ],
    },
    recurring: false,
    availableAreas: ["SW", "W", "KT", "SE", "BR", "DA", "TN"],
    packages: [
      {
        slug: "handyman-hour",
        name: "By the hour",
        tier: "one-off",
        price: "Priced per hour",
        basis: "per hour",
        bestFor: "quick fixes and single tasks",
        inclusions: [
          "Fully equipped for the task",
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
        price: "Priced per job",
        basis: "per job",
        bestFor: "a list of small jobs in one go",
        inclusions: [
          "Up to four hours on site",
          "Multiple tasks in one visit",
          "All tools and standard fixings included",
        ],
        cta: "bookNow",
      },
      {
        slug: "estate-handyman-care",
        name: "Whole-home care",
        tier: "steward",
        price: "Priced per hour",
        basis: "per hour",
        bestFor: "larger homes with ongoing maintenance needs",
        inclusions: [
          "Coordinated with cleaning, garden and window care",
          "A dedicated handyperson who knows your home",
          "Booked and tracked in your Home Record",
        ],
        cta: "waitlist",
      },
    ],
    subServices: HANDYMAN_SUBS,
    faq: [
      { q: "Do I need to be home?", a: "An adult should be present while work is carried out. If you have a regular key arrangement on file in your Home Record, we can discuss access for pre-agreed tasks." },
      { q: "Do you remove waste?", a: "Yes, waste removal can be arranged. We\u2019ll confirm at quoting stage whether it\u2019s included or charged separately." },
      { q: "Do you need to visit before quoting?", a: "Not usually. Photos or a short video are enough for most jobs. For larger or structural work, we\u2019ll arrange a site visit." },
      { q: "What\u2019s your cancellation policy?", a: "Cancellations must be made 48 hours before the booking. Refund terms apply, full details in your booking confirmation." },
      ...SERVICE_FAQ_SHARED,
    ],
    trustBadges: SERVICE_TRUST_BADGES,
  },

  removals: {
    slug: "removals",
    name: "Removals",
    lede: "Carbon-neutral house moves, packing, and storage coordination. Uniformed teams, fully insured, careful with the things that matter.",
    eyebrow: "Services \u00b7 Removals",
    heroImage: "/services/moving/removals.webp",
    headline: "Moving, without the dread.",
    colour: "#861950",
    sections: {
      included: [
        "Small and medium house moves across London and Kent",
        "Packing and wrapping, full or partial, your choice",
        "Large-item shop collection and delivery",
        "Local pick-up and drop-off for single pieces",
        "Moving items to and from storage",
        "Home organising before or after a move",
      ],
      how: [
        "Tell us what\u2019s moving, where from, where to",
        "Fixed quote based on volume, distance, and access",
        "Book at least two weeks ahead, short notice possible",
        "Uniformed team arrives on time, fully insured, electric fleet",
      ],
    },
    recurring: false,
    availableAreas: ["SW", "W", "KT", "SE", "BR", "DA", "TN"],
    packages: [
      {
        slug: "local-move",
        name: "Local pick-up & drop-off",
        tier: "one-off",
        price: "Priced on a quote",
        basis: "quote",
        bestFor: "single items, shop collections, storage runs",
        inclusions: [
          "Loaded, transported and unloaded with care",
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
        price: "Priced on a quote",
        basis: "quote",
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
        price: "Priced on a quote",
        basis: "quote",
        bestFor: "family homes and larger properties",
        inclusions: [
          "Packing service available (full or partial)",
          "Everything loaded, moved and placed in the right rooms",
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

  energy: {
    slug: "energy",
    name: "Energy & Electrical",
    colour: "#0F183D",
    lede: "Solar installation, EV charging, electrical repairs, and safety inspections. NICEIC-registered, fully certified, electric fleet.",
    eyebrow: "Services \u00b7 Energy & Electrical",
    heroImage: "/services/home/energy.webp",
    headline: "Power that works for the home.",
    sections: {
      included: [
        "Domestic and commercial electrical installation",
        "Solar panel installation and battery storage",
        "EV charger installation (all major brands)",
        "Full and partial rewires",
        "Electrical testing, inspection, and certification (EICR)",
        "Fault finding and emergency repairs",
      ],
      how: [
        "Describe the job or send photos, we\u2019ll price it from those where we can",
        "A detailed, itemised quote once we have scoped the work",
        "NICEIC-registered electrician assigned to the job",
        "Certification and paperwork filed to your Home Record",
      ],
    },
    recurring: false,
    availableAreas: ["SW", "W", "KT", "SE", "BR", "DA", "TN"],
    packages: [
      {
        slug: "electrical-callout",
        name: "Call-out & repair",
        tier: "one-off",
        price: "Priced per job",
        basis: "per job",
        bestFor: "faults, outages, and urgent fixes",
        inclusions: [
          "Diagnostic and repair in one visit where possible",
          "All parts and labour included in quote",
          "Certification issued for all notifiable work",
        ],
        cta: "bookNow",
      },
      {
        slug: "electrical-project",
        name: "Project work",
        tier: "one-off",
        price: "Priced on a quote",
        basis: "quote",
        bestFor: "installations, rewires, and new builds",
        inclusions: [
          "Full project scoping and design",
          "NICEIC-registered installation",
          "Building control notification handled",
          "Completion certificate and Home Record update",
        ],
        cta: "quoteEntry",
      },
      {
        slug: "eicr-testing",
        name: "Testing & inspection",
        tier: "one-off",
        price: "Priced per job",
        basis: "per job",
        bestFor: "landlords, buyers, and five-year compliance",
        inclusions: [
          "Full EICR (Electrical Installation Condition Report)",
          "Portable appliance testing available",
          "Written report with recommendations",
          "Filed to your Home Record for future reference",
        ],
        cta: "bookNow",
      },
    ],
    subServices: ENERGY_SUBS,
    faq: [
      { q: "Are your electricians qualified?", a: "Yes. Every electrician is NICEIC-registered and fully insured. Certification is issued for all notifiable work." },
      { q: "Can you install solar panels?", a: "Yes. We handle the full process: site assessment, design, installation, DNO notification, and MCS certification." },
      { q: "Do I need an EICR?", a: "Landlords must have a valid EICR every five years. Homeowners should test every ten years or when buying a property." },
      { q: "Can you install an EV charger?", a: "Yes. We install all major brands (Ohme, Pod Point, Wallbox, Tesla) and handle the OZEV grant application where eligible." },
      ...SERVICE_FAQ_SHARED.slice(1),
    ],
    trustBadges: SERVICE_TRUST_BADGES,
  },

  "pet-care": {
    slug: "pet-care",
    name: "Pet Care",
    lede: "Trusted, insured dog walking and pet sitting by experienced handlers. GPS-tracked walks, photo updates, and visit notes filed to your Home Record.",
    eyebrow: "Services \u00b7 Pet Care",
    headline: "Because the dog is part of the house.",
    heroImage: "/services/pet/pet-care.webp",
    colour: "#235255",
    sections: {
      included: [
        "Daily, weekly, or ad-hoc dog walking",
        "Pet sitting, in your home or in the sitter\u2019s",
        "GPS-tracked walks with live route sharing",
        "Photo and behaviour updates after every visit",
        "Feeding, medication, and routine care as instructed",
        "All handlers DBS-checked, insured, and experienced",
      ],
      how: [
        "Tell us about your pet, breed, temperament, routine",
        "We match you with a handler based on fit, not just location",
        "A meet-and-greet before the first walk or sit",
        "Book a service, single visits or a recurring rhythm",
      ],
    },
    recurring: true,
    availableAreas: ["SW", "W", "KT", "SE", "BR"],
    packages: [
      {
        slug: "dog-walk-single",
        name: "Single walk",
        tier: "one-off",
        price: "Priced per job",
        basis: "per job",
        bestFor: "occasional days out or late meetings",
        inclusions: [
          "30- or 60-minute walk",
          "GPS-tracked route",
          "Photo and behaviour update",
          "Logged in your Home Record",
        ],
        cta: "bookNow",
      },
      {
        slug: "dog-walk-weekly",
        name: "Weekly walking",
        tier: "care",
        price: "Priced per hour",
        basis: "per hour",
        bestFor: "working households with a regular schedule",
        inclusions: [
          "Five walks per week, same handler",
          "Consistent time slot and route",
          "Key access held on your Home Record",
          "Monthly report filed to record",
        ],
        cta: "bookNow",
      },
      {
        slug: "pet-sitting",
        name: "Pet sitting",
        tier: "one-off",
        price: "Priced per job",
        basis: "per job",
        bestFor: "holidays, weekends away, emergencies",
        inclusions: [
          "In-home care (yours or the sitter\u2019s)",
          "Feeding, walks, and medication as directed",
          "Daily photo and status update",
          "Meet-and-greet beforehand",
        ],
        cta: "bookNow",
      },
    ],
    subServices: PET_CARE_SUBS,
    faq: [
      { q: "Are your handlers insured?", a: "Yes. Every handler carries public liability insurance and is DBS-checked. Proof available on request." },
      { q: "Can you walk reactive dogs?", a: "In some cases, yes. We\u2019ll assess during the meet-and-greet and match you with a handler experienced in reactive behaviour." },
      { q: "What happens if my dog is unwell?", a: "The handler contacts you immediately. If they can\u2019t reach you, they follow your emergency vet instructions on file in your Home Record." },
      { q: "Do you walk in groups?", a: "Solo walks only, unless you specifically request a group walk with a known companion dog." },
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
  "energy",
  "pet-care",
];
