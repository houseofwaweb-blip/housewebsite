import type { MegaPanel } from "@/components/nav/MegaMenu";
import shopNavData from "@/lib/shop-data/shop-nav.generated.json";
import {
  GARDENING_SUBS,
  WINDOW_CLEANING_SUBS,
  CLEANING_SUBS,
  HANDYMAN_SUBS,
  REMOVALS_SUBS,
  ENERGY_SUBS,
  PET_CARE_SUBS,
} from "@/lib/services-data/sub-services";

/**
 * Shop categories + sub-categories, generated from Shopify collections & tags
 * (src/lib/shop-data/shop-nav.generated.json). Regenerate when categories
 * change. Drives the two-level Shop mega-menu.
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
 *
 * NOTE (Aug-17 rebuild): labels here follow the spec's discipline naming, but
 * hrefs still point at the existing route slugs so every link stays live. The
 * slug migration to the spec set (gardeners/cleaners/window-cleaners/...) and
 * the four net-new disciplines (housekeeping, dog-walkers, home-and-garden,
 * interiors) land in Phase 1c when services-data expands to 10.
 */
const toNavSubs = (
  parent: string,
  arr: ReadonlyArray<{ slug: string; name: string }>,
): { label: string; href: string }[] =>
  arr.map((s) => ({ label: s.name, href: `/services/${parent}/${s.slug}` }));

const SERVICE_CATEGORIES: {
  title: string;
  href: string;
  colour: string;
  subs: { label: string; href: string }[];
}[] = [
  { title: "Gardeners", href: "/services/gardening", colour: "var(--service-gardeners)", subs: toNavSubs("gardening", GARDENING_SUBS) },
  { title: "Housekeeping", href: "/services/housekeeping", colour: "var(--service-housekeeping)", subs: [] },
  { title: "Cleaners", href: "/services/cleaning", colour: "var(--service-cleaners)", subs: toNavSubs("cleaning", CLEANING_SUBS) },
  { title: "Window cleaners", href: "/services/window-cleaning", colour: "var(--service-windows)", subs: toNavSubs("window-cleaning", WINDOW_CLEANING_SUBS) },
  { title: "Repairs & handyman", href: "/services/handyman", colour: "var(--service-handyman)", subs: toNavSubs("handyman", HANDYMAN_SUBS) },
  { title: "Removals", href: "/services/removals", colour: "var(--service-removals)", subs: toNavSubs("removals", REMOVALS_SUBS) },
  { title: "Electrical & energy", href: "/services/energy", colour: "var(--service-energy)", subs: toNavSubs("energy", ENERGY_SUBS) },
  { title: "Dog walking & pet care", href: "/services/pet-care", colour: "var(--service-dog-walkers)", subs: toNavSubs("pet-care", PET_CARE_SUBS) },
  { title: "Home & garden", href: "/services/home-and-garden", colour: "var(--service-home-garden)", subs: [] },
  {
    title: "Design",
    href: "/design",
    colour: "var(--house-brown)",
    subs: [
      { label: "Interior design", href: "/design/interiors" },
      { label: "Garden design", href: "/design/gardens" },
    ],
  },
];

/** Bottom row of the Services mega-menu. Book action stays prominent.
 * Insurance lives here as well as in utility nav (Sept HoWA review, Step 02:
 * "Put Insurance in the services mega-menu as well as utility navigation"). */
const SERVICE_FOOTER = [
  { label: "Insurance & Cover", href: "/insurance" },
  { label: "House Approved standards", href: "/the-house/standards" },
  { label: "Book a service", href: "#open-booking-form" },
];

/**
 * Primary navigation — further-amendments brief §3.
 *
 * Order: Services · Design · Insurance · Shop · The House · The Hearth
 *
 * The brief is the authority for nav structure: Insurance is a primary pillar,
 * HoWA is NOT a pillar (it is infrastructure), and "My HoWA" lives in the
 * utility nav (Header.tsx: Search · My HoWA · Bag). HoWA marketing pages stay
 * reachable from the homepage HoWA section and the footer.
 */
export const PRIMARY_NAV: MegaPanel[] = [
  {
    id: "services",
    trigger: "Services",
    triggerHref: "/services",
    groups: [
      {
        heading: "Home care",
        links: [
          { label: "Gardeners", href: "/services/gardening", colour: "var(--service-gardeners)" },
          { label: "Housekeeping", href: "/services/housekeeping", colour: "var(--service-housekeeping)" },
          { label: "Cleaners", href: "/services/cleaning", colour: "var(--service-cleaners)" },
          { label: "Window cleaners", href: "/services/window-cleaning", colour: "var(--service-windows)" },
          { label: "Repairs & handyman", href: "/services/handyman", colour: "var(--service-handyman)" },
          { label: "Removals", href: "/services/removals", colour: "var(--service-removals)" },
        ],
      },
      {
        heading: "Specialist",
        links: [
          { label: "Electrical & energy", href: "/services/energy", colour: "var(--service-energy)" },
          { label: "Dog walking & pet care", href: "/services/pet-care", colour: "var(--service-dog-walkers)" },
          { label: "Home & garden", href: "/services/home-and-garden", colour: "var(--service-home-garden)" },
          { label: "Interior design", href: "/design/interiors", colour: "var(--house-brown)" },
          { label: "Garden design", href: "/design/gardens", colour: "var(--service-gardeners)" },
        ],
      },
      {
        heading: "Recurring care",
        links: [
          { label: "Home & garden care", href: "/services/home-and-garden", description: "The whole property, one rhythm" },
          { label: "Insurance & Cover", href: "/insurance", description: "Introductions via Provenance" },
          { label: "House Approved standards", href: "/the-house/standards", description: "How we vet" },
          { label: "Book a service", href: "#open-booking-form" },
        ],
      },
    ],
    // Desktop: hover a service, its sub-services appear beside it. Mobile drawer
    // uses `groups`.
    twoLevel: {
      categories: SERVICE_CATEGORIES,
      footer: SERVICE_FOOTER,
      // Spec §6.1: the Services mega-menu must also carry one featured editorial
      // still life, one "See services near you" postcode field, and one House
      // Approved trust statement. The menu stays cream; colour is punctuation.
      featured: {
        image: "/home-v4/the-house-fleet.webp",
        alt: "A still life of well-kept domestic objects on a linen surface",
        tag: "House Approved",
        heading: "Every visit, to the House standard.",
        href: "/the-house/standards",
      },
      postcode: { label: "See services near you", action: "/services" },
      trust: "House standards, clear service information and support when you need it.",
    },
  },

  {
    id: "design",
    trigger: "Design",
    triggerHref: "/design",
    groups: [
      {
        heading: "Design by the House",
        links: [
          { label: "Interior design", href: "/design/interiors", description: "Through our named partner" },
          { label: "Garden design", href: "/design/gardens", description: "Planting, structure & flow" },
        ],
      },
      {
        heading: "Explore with HoWA",
        links: [
          { label: "Start a design idea", href: "/howa/design", description: "Explore a concept, keep the brief" },
          { label: "How design works", href: "/design", description: "From an idea to a finished room" },
        ],
      },
    ],
    preview: {
      image: "/home/hero-georgian.webp",
      alt: "A considered British interior",
      tag: "Design",
      heading: "From an idea to a finished room.",
      href: "/design",
    },
  },

  {
    id: "insurance",
    trigger: "Insurance",
    triggerHref: "/insurance",
    groups: [
      {
        heading: "Home & cover",
        links: [
          { label: "Home insurance", href: "/insurance", description: "Cover shaped around your home" },
          { label: "Claims & help", href: "/insurance/claims-and-help", description: "Make a claim or get support" },
        ],
      },
    ],
    preview: {
      image: "/insurance/hub-hero.webp",
      alt: "A handsome British home, well protected",
      tag: "Insurance",
      heading: "Cover for the home you actually have.",
      href: "/insurance",
    },
  },

  {
    id: "shop",
    trigger: "Shop",
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
      featured: {
        image: "/lifestyle/period-portrait.webp",
        alt: "A woman in a warm period British interior",
        tag: "The House Store",
        heading: "Beautifully chosen.",
        href: "/shop",
      },
      featuredSide: "left",
      footer: [
        { label: "House Approved", href: "/shop/collections/house-approved" },
        { label: "All products", href: "/shop" },
        { label: "All collections", href: "/shop/collections" },
        { label: "Gift Cards", href: "/gift-cards" },
      ],
    },
  },

  {
    id: "the-house",
    trigger: "The House",
    triggerHref: "/the-house",
    groups: [
      {
        heading: "What we stand for",
        links: [
          { label: "Philosophy", href: "/the-house/philosophy", description: "Our founding idea" },
          { label: "The Artwork of the House", href: "/the-house/artwork", description: "Heritage, craft, colour" },
          { label: "Standards", href: "/the-house/standards", description: "How we work" },
          { label: "Sustainability", href: "/the-house/sustainability", description: "Our commitments" },
        ],
      },
      {
        heading: "How the House works",
        links: [
          { label: "How it works", href: "/how-it-works", description: "Bookings, records and reminders" },
          { label: "House Approved Pro", href: "/house-approved-pro", description: "For trusted tradespeople" },
          { label: "About", href: "/the-house/about", description: "The team behind the House" },
        ],
      },
    ],
    preview: {
      image: "/home/hero-georgian.webp",
      alt: "A Georgian terrace in Notting Hill",
      tag: "The Philosophy",
      heading: "Ownership is passive. Stewardship is intentional.",
      href: "/the-house/philosophy",
    },
  },

  {
    id: "the-hearth",
    trigger: "The Hearth",
    triggerHref: "/the-hearth",
    groups: [
      {
        heading: "The Hearth",
        links: [
          { label: "Read the magazine", href: "/the-hearth", description: "Homes, gardens & living well" },
          { label: "House Cinema", href: "/cinema", description: "Films from the House" },
          { label: "Recipes", href: "/recipes", description: "Seasonal cooking" },
          { label: "News", href: "/news", description: "Press, awards & announcements" },
        ],
      },
    ],
    preview: {
      image: "/home/hero-georgian.webp",
      alt: "The Hearth magazine",
      tag: "The Hearth",
      heading: "Writing worth keeping, for the home and garden.",
      href: "/the-hearth",
    },
  },
];
