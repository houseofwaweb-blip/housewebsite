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
    colour: "#3a4a35",
    sections: {
      included: [
        "Seasonal pruning, weeding, and bed maintenance",
        "Lawn care, mowing, edging, seasonal feeds",
        "Tree, shrub, and hedge shaping up to 4m",
        "Plant health reviews and replacement recommendations",
        "Green waste removal (licensed carrier)",
      ],
      how: [
        "Walk the garden with you, or read the brief you send",
        "Quote within 48 hours, itemised, no surprises",
        "Schedule with you, one-off, monthly, or seasonal",
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
    lede: "Pole and reach pure water system, powered by our carbon-neutral electric fleet. No ladders, no squeegees, no streaks. Federation of Window Cleaners certified.",
    eyebrow: "Services · Window cleaning",
    heroImage: "/services/photos/window-cleaning-hero.webp",
    headline: "Light, properly let in.",
    headlineEm: "properly let in.",
    colour: "#3e2649",
    sections: {
      included: [
        "All exterior windows, frames, and sills, front and back elevations",
        "Pure water pole and reach system, no detergents, dries streak-free",
        "Up to four storeys from the ground, no ladders against your walls",
        "UPVC frame, soffit, and fascia cleaning",
        "Condition note on any cracked or failed glazing spotted",
      ],
      how: [
        "Tell us your postcode and frontage type",
        "Fixed quote within 24 hours, no surprises",
        "Book a one-off or schedule monthly / bi-monthly",
        "Text reminder the day before, van tracking on the day",
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
    lede: "Trained, uniformed cleaners using organic products that lift grime without leaving a chemical note in the air. Zero-emission fleet, battery-operated tools, fragrance-free on request.",
    eyebrow: "Services · Cleaning",
    heroImage: "/services/photos/cleaning-hero.webp",
    headline: "A house that feels cared for.",
    headlineEm: "that feels cared for.",
    colour: "#2e4055",
    sections: {
      included: [
        "Full-home clean, kitchens, bathrooms, living spaces, bedrooms",
        "Eco-friendly organic products via Bower Collective",
        "Battery-operated, low-noise equipment, we bring everything",
        "Laminated floor, wood, carpet, and tile, handled correctly per material",
        "Window interiors, skirting, light switches, door handles",
        "Optional laundry, linen, inside-oven, and inside-fridge deep clean",
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
    lede: "SkyVac gutter cleaning system with camera-guided inspection. Clears blockages, debris, leaves, moss, and bird mess. Safe and ladder-free from the ground.",
    eyebrow: "Services · Gutter cleaning",
    heroImage: "/services/photos/gutter-cleaning-hero.webp",
    headline: "A small job that saves a large one.",
    headlineEm: "that saves a large one.",
    sections: {
      included: [
        "Full SkyVac vacuum-pole gutter clear, front and back elevations",
        "Camera-guided inspection to confirm all blockages cleared",
        "Down and drainpipe cleaning and blockage check",
        "Photographic before/after record of each gutter run",
        "Flag for repairs, loose brackets, splits, poor falls",
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
      { q: "How often should gutters be cleaned?", a: "At least twice a year, autumn after the last leaves, and spring before heavy rain. Properties near trees may need quarterly." },
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
    colour: "#5a2533",
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
    colour: "#7a2540",
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

  energy: {
    slug: "energy",
    name: "Energy & Electrical",
    lede: "Solar installation, EV charging, electrical repairs, and safety inspections. NICEIC-registered, fully certified, carbon-neutral fleet.",
    eyebrow: "Services \u00b7 Energy & Electrical",
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
        "Describe the job or send photos \u2014 we\u2019ll scope it remotely where possible",
        "Detailed quote within 48 hours, fully itemised",
        "NICEIC-registered electrician assigned to the job",
        "Certification and paperwork filed to your HoWA record",
      ],
    },
    recurring: false,
    availableAreas: ["SW", "W", "KT", "SE", "BR", "DA", "TN"],
    packages: [
      {
        slug: "electrical-callout",
        name: "Call-out & repair",
        tier: "one-off",
        price: "from \u00a3120",
        bestFor: "faults, outages, and urgent fixes",
        inclusions: [
          "Diagnostic and repair in one visit where possible",
          "All parts and labour included in quote",
          "Emergency same-day availability",
          "Certification issued for all notifiable work",
        ],
        cta: "bookNow",
      },
      {
        slug: "electrical-project",
        name: "Project work",
        tier: "one-off",
        price: "from quote",
        bestFor: "installations, rewires, and new builds",
        inclusions: [
          "Full project scoping and design",
          "NICEIC-registered installation",
          "Building control notification handled",
          "Completion certificate and HoWA record update",
        ],
        cta: "quoteEntry",
      },
      {
        slug: "eicr-testing",
        name: "Testing & inspection",
        tier: "one-off",
        price: "from \u00a3180",
        bestFor: "landlords, buyers, and five-year compliance",
        inclusions: [
          "Full EICR (Electrical Installation Condition Report)",
          "Portable appliance testing available",
          "Written report with recommendations",
          "Filed to HoWA for future reference",
        ],
        cta: "bookNow",
      },
    ],
    subServices: ENERGY_SUBS,
    faq: [
      { q: "Are your electricians qualified?", a: "Yes. Every electrician is NICEIC-registered and fully insured. Certification is issued for all notifiable work." },
      { q: "Can you install solar panels?", a: "Yes. We handle the full process: survey, design, installation, DNO notification, and MCS certification." },
      { q: "Do I need an EICR?", a: "Landlords must have a valid EICR every five years. Homeowners should test every ten years or when buying a property." },
      { q: "Can you install an EV charger?", a: "Yes. We install all major brands (Ohme, Pod Point, Wallbox, Tesla) and handle the OZEV grant application where eligible." },
      ...SERVICE_FAQ_SHARED.slice(1),
    ],
    trustBadges: SERVICE_TRUST_BADGES,
  },

  "pet-care": {
    slug: "pet-care",
    name: "Pet Care",
    lede: "Trusted, insured dog walking and pet sitting by experienced handlers. GPS-tracked walks, photo updates, and visit notes filed to your HoWA record.",
    eyebrow: "Services \u00b7 Pet Care",
    headline: "Because the dog is part of the house.",
    colour: "#2a4f54",
    sections: {
      included: [
        "Daily, weekly, or ad-hoc dog walking",
        "Pet sitting \u2014 in your home or in the sitter\u2019s",
        "GPS-tracked walks with live route sharing",
        "Photo and behaviour updates after every visit",
        "Feeding, medication, and routine care as instructed",
        "All handlers DBS-checked, insured, and experienced",
      ],
      how: [
        "Tell us about your pet \u2014 breed, temperament, routine",
        "We match you with a handler based on fit, not just location",
        "A meet-and-greet before the first walk or sit",
        "Book through HoWA \u2014 single visits or a recurring rhythm",
      ],
    },
    recurring: true,
    availableAreas: ["SW", "W", "KT", "SE", "BR"],
    packages: [
      {
        slug: "dog-walk-single",
        name: "Single walk",
        tier: "one-off",
        price: "from \u00a318",
        bestFor: "occasional days out or late meetings",
        inclusions: [
          "30- or 60-minute walk",
          "GPS-tracked route",
          "Photo and behaviour update",
          "Logged in HoWA",
        ],
        cta: "bookNow",
      },
      {
        slug: "dog-walk-weekly",
        name: "Weekly walking",
        tier: "care",
        price: "from \u00a375 / week",
        bestFor: "working households with a regular schedule",
        inclusions: [
          "Five walks per week, same handler",
          "Consistent time slot and route",
          "Key access through HoWA",
          "Monthly report filed to record",
        ],
        cta: "bookNow",
      },
      {
        slug: "pet-sitting",
        name: "Pet sitting",
        tier: "one-off",
        price: "from \u00a345 / day",
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
      { q: "What happens if my dog is unwell?", a: "The handler contacts you immediately. If they can\u2019t reach you, they follow your emergency vet instructions on file in HoWA." },
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
