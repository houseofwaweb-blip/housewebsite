import type { MegaPanel } from "@/components/nav/MegaMenu";
import shopNavData from "@/lib/shop-data/shop-nav.generated.json";
import {
  GARDENING_SUBS,
  WINDOW_CLEANING_SUBS,
  CLEANING_SUBS,
} from "@/lib/services-data/sub-services";

/**
 * Shop categories + sub-categories, generated from Shopify collections & tags
 * (src/lib/shop-data/shop-nav.generated.json). Regenerate when categories
 * change. Drives the two-level Marketplace mega-menu.
 */
const SHOP_CATEGORIES = (
  shopNavData as Array<{ title: string; handle: string; subs: Array<{ title: string; handle: string }> }>
).map((c) => ({
  title: c.title,
  href: `/shop/collections/${c.handle}`,
  subs: c.subs.map((s) => ({ label: s.title, href: `/shop/collections/${s.handle}` })),
}));

/**
 * Services + their sub-services for the two-level Services mega-menu.
 * Sub-links are built from the REAL sub-services (services-data/sub-services)
 * so the menu always matches the actual /services/[slug]/[sub] pages.
 *   - Gardening / Window cleaning / Cleaning carry their sub-services.
 *   - Gutter cleaning's sub-service array is currently mis-populated with
 *     handyman items (pre-existing data bug), so it links through until fixed.
 *   - Deferred services link through too (empty subs → "Browse all").
 */
const toNavSubs = (
  parent: string,
  arr: ReadonlyArray<{ slug: string; name: string }>,
): { label: string; href: string }[] =>
  arr.map((s) => ({ label: s.name, href: `/services/${parent}/${s.slug}` }));

const SERVICE_CATEGORIES: {
  title: string;
  href: string;
  subs: { label: string; href: string }[];
}[] = [
  { title: "Gardening", href: "/services/gardening", subs: toNavSubs("gardening", GARDENING_SUBS) },
  { title: "Window cleaning", href: "/services/window-cleaning", subs: toNavSubs("window-cleaning", WINDOW_CLEANING_SUBS) },
  { title: "Cleaning", href: "/services/cleaning", subs: toNavSubs("cleaning", CLEANING_SUBS) },
  { title: "Gutter cleaning", href: "/services/gutter-cleaning", subs: [] },
  { title: "Handyman", href: "/services/handyman", subs: [] },
  { title: "Removals", href: "/services/removals", subs: [] },
  { title: "Energy & Electrical", href: "/services/energy", subs: [] },
  { title: "Pet Care", href: "/services/pet-care", subs: [] },
];

/** Bottom row of the Services mega-menu — the managed-care / utility links. */
const SERVICE_FOOTER = [
  { label: "Steward Plans", href: "/steward-plans" },
  { label: "House Credit", href: "/house-credit" },
  { label: "Book a House Service", href: "#open-booking-form" },
];

/**
 * Primary navigation configuration.
 *
 * Order: The House · Services · Protect · Design · Marketplace · The Hearth · HoWA Platform
 *
 * Per the v5 HoWA-separation review (2026-06-18): the House sells first.
 * HoWA sits last and is labelled "HoWA Platform" so it reads as a separate
 * product (the online booking + Home Record layer), not a House vertical.
 */
export const PRIMARY_NAV: MegaPanel[] = [
  // HoWA Score and The Household are the two lead product moments (launch read
  // section 3). Simple top-level links, no dropdown. House content (About,
  // Philosophy, Artwork, Standards, Sustainability, Contact) now lives in the
  // footer / secondary surface.
  { id: "howa-score", trigger: "HoWA Score", triggerHref: "/howa-score", groups: [] },
  { id: "household", trigger: "The Household", triggerHref: "/household", groups: [] },

  {
    id: "services",
    trigger: "Services",
    triggerHref: "/services",
    groups: [
      {
        heading: "Home care",
        links: [
          { label: "Gardening", href: "/services/gardening", description: "Seasonal & one-off" },
          { label: "Window cleaning", href: "/services/window-cleaning" },
          { label: "Cleaning", href: "/services/cleaning" },
          { label: "Gutter cleaning", href: "/services/gutter-cleaning" },
          { label: "Handyman", href: "/services/handyman" },
          { label: "Removals", href: "/services/removals" },
        ],
      },
      {
        heading: "Specialist",
        links: [
          { label: "Energy & Electrical", href: "/services/energy", description: "Solar, EV, rewires" },
          { label: "Pet Care", href: "/services/pet-care", description: "Walking & sitting" },
        ],
      },
      {
        heading: "Managed care",
        links: [
          { label: "Steward Plans", href: "/steward-plans", description: "Recurring, intentional" },
          { label: "House Credit", href: "/house-credit", description: "Interest-free finance" },
          { label: "Book a House Service", href: "#open-booking-form" },
        ],
      },
    ],
    // Desktop: two-level menu — hover a service, its sub-services appear beside
    // it (same pattern as Marketplace). Mobile drawer still uses `groups`.
    twoLevel: {
      categories: SERVICE_CATEGORIES,
      footer: SERVICE_FOOTER,
    },
  },

  {
    id: "protect",
    trigger: "Protect",
    triggerHref: "/protect",
    groups: [
      {
        heading: "Protection",
        links: [
          { label: "Home Protection", href: "/protect/home-protection", description: "Register interest" },
          { label: "House Approved Insurance", href: "/protect/insurance", description: "Register interest" },
        ],
      },
    ],
  },

  {
    id: "design",
    trigger: "Design",
    triggerHref: "/design",
    groups: [
      {
        heading: "Disciplines",
        links: [
          { label: "Interiors", href: "/design/interiors", description: "Considered schemes" },
          { label: "Gardens", href: "/design/gardens", description: "Planting & landscapes" },
        ],
      },
      {
        heading: "Our studios",
        links: [
          { label: "How design begins", href: "/design/studios", description: "The House's design routes" },
          { label: "Partner directory", href: "/partners", description: "House Approved designers & makers" },
          { label: "Delve Interiors", href: "/partners/delve-interiors" },
          { label: "Willow Alexander Gardens", href: "/partners/willow-alexander-gardens" },
        ],
      },
    ],
    preview: {
      image: "/home/hero-georgian.webp",
      alt: "Interior detail",
      tag: "Featured",
      heading: "A house, re-read.",
      href: "/design",
    },
  },

  {
    id: "shop",
    trigger: "Marketplace",
    triggerHref: "/shop",
    // Mobile drawer reads groups[0]; desktop uses the two-level menu.
    groups: [
      {
        heading: "Categories",
        links: SHOP_CATEGORIES.map((c) => ({ label: c.title, href: c.href })),
      },
    ],
    twoLevel: {
      categories: SHOP_CATEGORIES,
      footer: [
        { label: "House Approved", href: "/shop/collections/house-approved" },
        { label: "All products", href: "/shop" },
        { label: "All collections", href: "/shop/collections" },
        { label: "Gift Cards", href: "/gift-cards" },
      ],
    },
  },

  {
    id: "the-hearth",
    trigger: "The Hearth",
    triggerHref: "/the-hearth",
    groups: [
      {
        heading: "The Hearth Magazine",
        links: [
          { label: "Read the magazine", href: "/the-hearth", description: "Editorial writing on homes & gardens" },
          { label: "Recipes", href: "/recipes", description: "Seasonal cooking" },
        ],
      },
    ],
  },

  { id: "partners", trigger: "Partners", triggerHref: "/partners", groups: [] },
];

/**
 * Secondary navigation (launch read section 3) — the House / institutional
 * links, sitting quietly beneath the primary product nav.
 */
export const SECONDARY_NAV: { label: string; href: string }[] = [
  { label: "The House", href: "/the-house/about" },
  { label: "Artwork", href: "/the-house/artwork" },
  { label: "Standards", href: "/the-house/standards" },
  { label: "Sustainability", href: "/the-house/sustainability" },
  { label: "About", href: "/the-house/about" },
  { label: "Contact", href: "/contact" },
];
