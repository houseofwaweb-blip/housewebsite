import type { MegaPanel } from "@/components/nav/MegaMenu";

/**
 * Navigation — Persona-Led Zero-Interpretation Directive v2 (STEP 04).
 *
 * LOCKED primary navigation:
 *   The House · The Household · The Stores · The Host · HoWA
 *   + Search · Sign in · [Book through HoWA]
 *
 * The Household is the organising layer. Services and Design are NOT peer
 * primary labels: they remain reachable underneath the relevant member
 * (Gardening under The Gardener; Cleaning/Window/Gutter under The Housekeeper;
 * Interior/Garden Design under The Designer), plus search, paid routes and
 * direct URLs. `/shop` stays the transactional root (public name: The Stores);
 * `/the-hearth` stays the magazine, with `/host` as the welcome layer above it.
 *
 * No mega-menu. No basket outside The Stores. No agent/bot/free-door language.
 */

export const PRIMARY_NAV: MegaPanel[] = [
  {
    id: "the-house",
    trigger: "The House",
    triggerHref: "/the-house/about",
    groups: [
      {
        heading: "The House",
        links: [
          { label: "About", href: "/the-house/about" },
          { label: "Origin", href: "/the-house/about#origin" },
          { label: "Philosophy", href: "/the-house/philosophy" },
          { label: "Standards", href: "/the-house/standards" },
          { label: "House Approved", href: "/house-approved" },
          { label: "Partners", href: "/partners" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
  },
  {
    id: "the-household",
    trigger: "The Household",
    triggerHref: "/household",
    groups: [
      {
        heading: "Senior staff",
        links: [
          { label: "The Housekeeper", href: "/howa/housekeeper", description: "Nothing slips." },
          { label: "The Steward", href: "/howa/steward", description: "The house, protected before failure." },
          { label: "The Butler", href: "/household/butler", description: "The instruments of the house, read by anyone." },
        ],
      },
      {
        heading: "Start with what needs attention",
        links: [
          { label: "The Gardener", href: "/household/gardener", description: "Gardening" },
          { label: "The Handyman", href: "/household/handyman", description: "A fault or repair" },
          { label: "The Designer", href: "/household/designer", description: "Interior & Garden Design" },
          { label: "The Surveyor", href: "/household/surveyor", description: "Cracks, damp and quotes" },
          { label: "The Archivist", href: "/household/archivist", description: "Paperwork into dates" },
          { label: "The Storekeeper", href: "/shop", description: "The Stores" },
        ],
      },
      {
        heading: "At the door",
        links: [
          { label: "The Host", href: "/host", description: "Come in. Everything worth knowing about keeping a home." },
        ],
      },
      {
        heading: "Live care",
        links: [
          { label: "Gardening", href: "/services/gardening", description: "Under The Gardener" },
          { label: "Cleaning", href: "/services/cleaning", description: "Under The Housekeeper" },
          { label: "Window cleaning", href: "/services/window-cleaning", description: "Under The Housekeeper" },
          { label: "Gutter clearing", href: "/services/gutter-cleaning", description: "Under The Housekeeper" },
        ],
      },
      {
        heading: "Utilities",
        links: [
          { label: "Meet the whole Household", href: "/household" },
          { label: "See all services", href: "/services" },
          { label: "Start with my address", href: "/howa" },
        ],
      },
    ],
  },
  {
    id: "the-stores",
    trigger: "The Stores",
    triggerHref: "/shop",
    groups: [
      {
        heading: "The Stores",
        links: [
          { label: "Shop by room", href: "/shop" },
          { label: "House Approved collection", href: "/shop/collections/house-approved" },
        ],
      },
    ],
  },
  {
    id: "the-host",
    trigger: "The Host",
    triggerHref: "/host",
    groups: [
      {
        heading: "The Host",
        links: [
          { label: "The Hearth", href: "/the-hearth" },
          { label: "Seasonal guides", href: "/the-hearth" },
          { label: "Practical advice", href: "/the-hearth" },
          { label: "Recipes", href: "/recipes" },
          { label: "House news", href: "/news" },
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
        heading: "HoWA",
        links: [
          { label: "Start with my address", href: "/howa" },
          { label: "HoWA Score", href: "/howa-score" },
          { label: "Home Record", href: "/howa" },
          { label: "Ask HoWA", href: "/howa/ask" },
          { label: "Housekeeper", href: "/howa/housekeeper" },
          { label: "Steward", href: "/howa/steward" },
          { label: "Help", href: "/howa/faq" },
        ],
      },
    ],
  },
];

/** No secondary nav row: the five destinations above are the whole shell. */
export const SECONDARY_NAV: { label: string; href: string }[] = [];
