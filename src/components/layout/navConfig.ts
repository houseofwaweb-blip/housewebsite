import type { MegaPanel } from "@/components/nav/MegaMenu";
import shopNavData from "@/lib/shop-data/shop-nav.generated.json";

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
 * Primary navigation configuration.
 *
 * Order: The House · Services · Protect · Design · Marketplace · The Hearth · HoWA Platform
 *
 * Per the v5 HoWA-separation review (2026-06-18): the House sells first.
 * HoWA sits last and is labelled "HoWA Platform" so it reads as a separate
 * product (the online booking + Home Record layer), not a House vertical.
 */
export const PRIMARY_NAV: MegaPanel[] = [
  {
    id: "the-house",
    trigger: "The House",
    // The standalone overview hub was retired; the dropdown's "See all" link and
    // the bare /the-house route both lead to About (the section's overview).
    triggerHref: "/the-house/about",
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
        heading: "From the House",
        links: [
          { label: "News", href: "/news", description: "Press, awards & announcements" },
          { label: "Musings", href: "/musings", description: "Notes & practical advice" },
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
          { label: "The Studios", href: "/design/studios", description: "The collective explained" },
          { label: "Partner directory", href: "/partners", description: "Vetted designers & makers" },
          { label: "Delve Interiors", href: "/partners/delve-interiors" },
          { label: "Jessica Durling-McMahon", href: "/partners/jessica-durling-mcmahon" },
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
    // Mobile drawer reads groups[0]; desktop uses the two-level `shop` menu.
    groups: [
      {
        heading: "Categories",
        links: SHOP_CATEGORIES.map((c) => ({ label: c.title, href: c.href })),
      },
    ],
    shop: {
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

  {
    id: "howa",
    trigger: "Meet HoWA",
    triggerHref: "/howa",
    groups: [
      {
        heading: "Bookings & Home Record",
        links: [
          { label: "Overview", href: "/howa", description: "The Home Intelligence OS" },
          { label: "Book online through HoWA", href: "#open-booking-form", description: "Online House bookings" },
          { label: "HoWA (Assistant)", href: "/howa/assistant", description: "Free: start with an address" },
          { label: "How it works", href: "/howa/how-it-works", description: "Four quiet jobs" },
        ],
      },
      {
        heading: "Tiers",
        links: [
          { label: "Housekeeper by HoWA", href: "/howa/housekeeper", description: "The membership: £16.99/mo" },
          { label: "Steward", href: "/howa/steward", description: "The top tier: £29.99/mo" },
          { label: "Plans & Pricing", href: "/howa/plans", description: "Compare tiers" },
          { label: "FAQ", href: "/howa/faq" },
        ],
      },
    ],
    preview: {
      image: "/home/hero-georgian.webp",
      alt: "HoWA product interface",
      tag: "The platform",
      heading: "Online booking and the Home Record, powered by HoWA.",
      href: "/howa",
    },
  },
];
