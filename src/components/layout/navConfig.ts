import type { MegaPanel } from "@/components/nav/MegaMenu";

/**
 * Primary navigation configuration.
 *
 * Order: The House · HoWA · Protect · Design · Services · Shop · The Hearth
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
          { label: "Home Protection", href: "/protect/home-protection", description: "Coming soon" },
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
          { label: "Book with HoWA", href: "#open-booking-form" },
        ],
      },
    ],
  },

  {
    id: "shop",
    trigger: "Shop",
    triggerHref: "/shop",
    groups: [
      {
        heading: "Browse",
        links: [
          { label: "All products", href: "/shop" },
          { label: "House Approved", href: "/shop/collections/house-approved", description: "Our mark of quality" },
          { label: "Collections", href: "/shop/collections", description: "Curated edits" },
          { label: "Gift Cards", href: "/gift-cards", description: "Give the gift of care" },
        ],
      },
    ],
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
];
