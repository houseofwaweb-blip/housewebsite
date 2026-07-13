import type { MegaPanel } from "@/components/nav/MegaMenu";
import shopNavData from "@/lib/shop-data/shop-nav.generated.json";

/**
 * Navigation — Final Master Directive (13 Jul 2026).
 *
 * Six conventional destinations + one primary action ("Book a service").
 * Conventional labels reduce first-visit cognitive cost; the branded worlds
 * (The Household, The Stores, The Host) are revealed inside each page.
 *
 *   Services · Design · Shop · Ideas & Advice · The House · HoWA
 */
const SHOP_CATEGORIES = (
  shopNavData as Array<{ title: string; handle: string; subs: Array<{ title: string; handle: string }> }>
).map((c) => ({
  title: c.title,
  href: `/shop/collections/${c.handle}`,
  subs: c.subs.map((s) => ({ label: s.title, href: `/shop/collections/${s.handle}` })),
}));

export const PRIMARY_NAV: MegaPanel[] = [
  {
    id: "services",
    trigger: "Services",
    triggerHref: "/services",
    groups: [
      {
        heading: "Live services",
        links: [
          { label: "Gardening", href: "/services/gardening", description: "Available in selected postcodes" },
          { label: "Cleaning", href: "/services/cleaning" },
          { label: "Window cleaning", href: "/services/window-cleaning" },
          { label: "Gutter clearing", href: "/services/gutter-cleaning" },
        ],
      },
      {
        heading: "In build",
        links: [
          { label: "Handyman", href: "/services/handyman", description: "Diagnosis beta" },
          { label: "Removals", href: "/services/removals", description: "Register interest" },
          { label: "Energy & Electrical", href: "/services/energy", description: "Register interest" },
          { label: "Pet Care", href: "/services/pet-care", description: "Register interest" },
        ],
      },
      {
        heading: "Getting started",
        links: [
          { label: "See all services", href: "/services" },
          { label: "Book a service", href: "#open-booking-form" },
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
          { label: "Interior Design", href: "/design/interiors", description: "Founding studios" },
          { label: "Garden Design", href: "/design/gardens", description: "Studios + landscaping" },
          { label: "HoWA Concepts", href: "/design/concepts", description: "Property-specific concept" },
        ],
      },
      {
        heading: "Founding studios",
        links: [
          { label: "Delve Interiors", href: "/partners/delve-interiors" },
          { label: "Willow Alexander Gardens", href: "/partners/willow-alexander-gardens" },
          { label: "All founding partners", href: "/partners" },
        ],
      },
    ],
    preview: {
      image: "/home/hero-georgian.webp",
      alt: "A considered British interior",
      tag: "Design",
      heading: "Begin with the right studio.",
      href: "/design",
    },
  },
  {
    id: "shop",
    trigger: "Shop",
    triggerHref: "/shop",
    groups: [
      { heading: "The Stores", links: SHOP_CATEGORIES.map((c) => ({ label: c.title, href: c.href })) },
    ],
    twoLevel: {
      categories: SHOP_CATEGORIES,
      footer: [
        { label: "House Approved", href: "/shop/collections/house-approved" },
        { label: "All products", href: "/shop" },
        { label: "Gift Cards", href: "/gift-cards" },
      ],
    },
  },
  {
    id: "ideas-advice",
    trigger: "Ideas & Advice",
    triggerHref: "/the-hearth",
    groups: [
      {
        heading: "The Host",
        links: [
          { label: "The Hearth", href: "/the-hearth", description: "Homes, gardens & design" },
          { label: "Recipes", href: "/recipes", description: "Seasonal cooking" },
          { label: "News", href: "/news" },
        ],
      },
    ],
  },
  {
    id: "the-house",
    trigger: "The House",
    triggerHref: "/the-house/about",
    groups: [
      {
        heading: "The House",
        links: [
          { label: "About", href: "/the-house/about", description: "Origin & team" },
          { label: "Philosophy", href: "/the-house/philosophy" },
          { label: "Standards", href: "/the-house/standards" },
          { label: "House Approved", href: "/the-house/standards", description: "What the mark means" },
          { label: "Partners", href: "/partners" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
  },
  {
    id: "howa",
    trigger: "HoWA",
    triggerHref: "/howa",
    groups: [
      {
        heading: "The Home Operating System",
        links: [
          { label: "Start with my address", href: "/howa/assistant" },
          { label: "HoWA Score", href: "/howa-score" },
          { label: "Home Record", href: "/howa" },
          { label: "The Household", href: "/household", description: "Ten members, one record" },
        ],
      },
      {
        heading: "Continuity",
        links: [
          { label: "The Housekeeper", href: "/howa/housekeeper", description: "£16.99/mo when ready" },
          { label: "The Steward", href: "/howa/steward", description: "£29.99/mo when ready" },
          { label: "Help", href: "/howa/faq" },
        ],
      },
    ],
  },
];

/**
 * No secondary nav row in the directive model — About / Philosophy / Standards
 * / Partners / Contact live inside the "The House" destination above.
 */
export const SECONDARY_NAV: { label: string; href: string }[] = [];
