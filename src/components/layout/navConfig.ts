import type { MegaPanel } from "@/components/nav/MegaMenu";

/**
 * Primary navigation configuration.
 *
 * Order: The House · HoWA · Protect · Design · Services · Marketplace · Journal
 */
export const PRIMARY_NAV: MegaPanel[] = [
  {
    id: "the-house",
    trigger: "The House",
    triggerHref: "/the-house",
    groups: [
      {
        heading: "What we stand for",
        links: [
          { label: "Philosophy", href: "/the-house/philosophy", description: "Our founding idea" },
          { label: "Standards", href: "/the-house/standards", description: "How we work" },
          { label: "Sustainability", href: "/the-house/sustainability", description: "Our commitments" },
        ],
      },
      {
        heading: "Reading",
        links: [
          { label: "The Hearth Magazine", href: "/journal", description: "Editorial writing on homes & gardens" },
        ],
      },
    ],
    preview: {
      image: "/home/hero-georgian.png",
      alt: "A Georgian terrace in Notting Hill",
      tag: "The Philosophy",
      heading: "Ownership is passive. Stewardship is intentional.",
      href: "/the-house/philosophy",
    },
  },

  {
    id: "howa",
    trigger: "HoWA",
    triggerHref: "/howa",
    groups: [
      {
        heading: "The Product",
        links: [
          { label: "Overview", href: "/howa", description: "What HoWA does" },
          { label: "HoWA+", href: "/howa/plus", description: "The membership — £16.99/mo" },
          { label: "How it works", href: "/howa/how-it-works", description: "Four quiet jobs" },
          { label: "Companion", href: "/howa/companion", description: "The diagnostic" },
        ],
      },
      {
        heading: "More",
        links: [
          { label: "Plans & Pricing", href: "/howa/plans", description: "Compare tiers" },
          { label: "Steward", href: "/howa/steward", description: "Managed care — coming soon" },
          { label: "FAQ", href: "/howa/faq" },
        ],
      },
    ],
    preview: {
      image: "/home/hero-georgian.png",
      alt: "HoWA product interface",
      tag: "Arriving soon",
      heading: "A single place for the House to reach you.",
      href: "/howa/coming-soon",
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
          { label: "Protect Review", href: "/protect#review", description: "Coming soon" },
          { label: "House Approved Insurance", href: "/insurance", description: "Register interest" },
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
          { label: "Partner directory", href: "/partners", description: "Vetted designers & makers" },
          { label: "Delve Interiors", href: "/partners/delve-interiors" },
          { label: "Jessica Durling-McMahon", href: "/partners/jessica-durling-mcmahon" },
          { label: "Willow Alexander Gardens", href: "/partners/willow-alexander-gardens" },
        ],
      },
    ],
    preview: {
      image: "/home/hero-georgian.png",
      alt: "Interior detail",
      tag: "Featured",
      heading: "A house, re-read.",
      href: "/design",
    },
  },

  {
    id: "services",
    trigger: "Services",
    triggerHref: "/services",
    groups: [
      {
        heading: "Services at launch",
        links: [
          { label: "Gardening", href: "/services/gardening", description: "Seasonal & one-off" },
          { label: "Window cleaning", href: "/services/window-cleaning" },
          { label: "Cleaning", href: "/services/cleaning" },
          { label: "Gutter cleaning", href: "/services/gutter-cleaning" },
        ],
      },
      {
        heading: "Managed care",
        links: [
          { label: "Steward Plans", href: "/steward-plans", description: "Recurring, intentional" },
          { label: "Book consultation", href: "/book-consultation" },
        ],
      },
    ],
  },

  {
    id: "marketplace",
    trigger: "Marketplace",
    triggerHref: "/shop",
    groups: [
      {
        heading: "Browse",
        links: [
          { label: "All products", href: "/shop" },
          { label: "House Approved", href: "/shop/collections/house-approved", description: "Our mark of quality" },
          { label: "Collections", href: "/shop/collections", description: "Curated edits" },
        ],
      },
    ],
  },

  {
    id: "journal",
    trigger: "Journal",
    triggerHref: "/journal",
    groups: [
      {
        heading: "The Hearth",
        links: [
          { label: "The Hearth Magazine", href: "/journal", description: "Editorial writing" },
        ],
      },
      {
        heading: "Free reading",
        links: [
          { label: "Musings", href: "/musings", description: "Notes & practical advice" },
          { label: "News", href: "/news", description: "Press & announcements" },
        ],
      },
      {
        heading: "The House",
        links: [
          { label: "About", href: "/the-house/about", description: "The team behind the House" },
          { label: "Proof", href: "/the-house/proof", description: "Press, awards, testimony" },
        ],
      },
    ],
  },
];
