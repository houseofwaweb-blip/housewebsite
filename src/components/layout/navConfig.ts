import type { MegaPanel } from "@/components/nav/MegaMenu";
import shopNavData from "@/lib/shop-data/shop-nav.generated.json";

/**
 * Shop categories + sub-categories, generated from Shopify collections & tags
 * (src/lib/shop-data/shop-nav.generated.json). Drives the two-level Shop menu.
 */
const SHOP_CATEGORIES = (
  shopNavData as Array<{ title: string; handle: string; subs: Array<{ title: string; handle: string }> }>
).map((c) => ({
  title: c.title,
  href: `/shop/collections/${c.handle}`,
  subs: c.subs.map((s) => ({ label: s.title, href: `/shop/collections/${s.handle}` })),
}));

/**
 * Primary navigation — Aug 2026 homepage rework (aug12 feedback §4).
 *
 * Consolidated from seven pillars to four: Protect · Shop · Magazine · The House.
 * Cinema is folded into Magazine (as Films); Design and the trades Services are
 * demoted into The House. Protect leads and gains boiler + appliance cover, the
 * previously-buried home-cover line. One word per concept: Protect, Shop,
 * Magazine.
 */
export const PRIMARY_NAV: MegaPanel[] = [
  {
    id: "insurance",
    trigger: "Protect",
    triggerHref: "/insurance",
    groups: [
      {
        // Car/van/motorbike and Breakdown/bicycle promoted out of the Everyday
        // hub to their own links so ad traffic lands without hunting. The
        // Everyday cover link stays as the self-serve umbrella.
        heading: "Home, motor & pet",
        links: [
          { label: "Home Insurance", href: "/insurance/everyday/home", description: "Buildings and contents" },
          { label: "Private client & estate", href: "/insurance/private-client", description: "One advised policy for the whole estate" },
          { label: "Car, van & motorbike", href: "/insurance/everyday/motor", description: "Including temporary cover" },
          { label: "Pet Insurance", href: "/insurance/everyday/pet-and-travel", description: "Cats and dogs" },
          { label: "Breakdown & bicycle", href: "/insurance/everyday/breakdown-and-bicycle", description: "Roadside, recovery and bikes" },
          { label: "Boiler Cover", href: "/insurance/boiler-cover", description: "When the heating stops" },
          { label: "Appliance Cover", href: "/insurance/appliance-cover", description: "The machines a home runs on" },
          { label: "Everyday cover", href: "/insurance/everyday", description: "The self-serve hub" },
        ],
      },
      {
        heading: "Specialist property",
        links: [
          { label: "Listed buildings", href: "/insurance/listed-buildings" },
          { label: "Thatched properties", href: "/insurance/thatched-properties" },
          { label: "Non-standard construction", href: "/insurance/non-standard-construction" },
          { label: "Second & holiday homes", href: "/insurance/second-homes" },
          { label: "Unoccupied & probate", href: "/insurance/unoccupied-property" },
          { label: "Renovation & works", href: "/insurance/renovation-and-extension" },
        ],
      },
      {
        // "Advice" (How this works) moved to Guides, so this is now assets +
        // business. Fine art / classic motor / boat are personal assets;
        // business insurance is its own audience with a hub that fans out to
        // trades and professional indemnity. Kept in one column to hold the
        // mega-menu at a balanced four groups.
        heading: "Assets & business",
        links: [
          { label: "Fine art, jewellery & collections", href: "/insurance/fine-art-and-collections" },
          { label: "Classic & prestige motor", href: "/insurance/classic-and-prestige-motor" },
          { label: "Boat, yacht & aviation", href: "/insurance/boat-yacht-aviation" },
          { label: "Business insurance", href: "/insurance/business" },
          { label: "Trades & contractors", href: "/insurance/business/trades-and-contractors" },
          { label: "Professional indemnity", href: "/insurance/business/professional-indemnity" },
        ],
      },
      {
        heading: "Guides",
        links: [
          { label: "The underinsurance gap", href: "/insurance/guides/underinsurance" },
          { label: "What a rebuild cost is", href: "/insurance/guides/rebuild-cost" },
          { label: "Insuring a listed building", href: "/insurance/guides/listed-building-insurance" },
          { label: "Insurance during building work", href: "/insurance/guides/renovation-insurance" },
          { label: "When to renew", href: "/insurance/guides/renewal" },
          { label: "How this works", href: "/insurance/how-this-works", description: "And how we are paid" },
        ],
      },
    ],
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
      footer: [
        { label: "The House Selection", href: "/shop/collections/house-approved" },
        { label: "All products", href: "/shop" },
        { label: "All collections", href: "/shop/collections" },
        { label: "Gift Cards", href: "/gift-cards" },
      ],
    },
  },

  {
    id: "magazine",
    trigger: "Magazine",
    triggerHref: "/the-hearth",
    // aug12 §4 — Cinema absorbed into Magazine as Films.
    groups: [
      {
        heading: "The Magazine",
        links: [
          { label: "The Latest", href: "/the-hearth", description: "Editorial on homes & gardens" },
          { label: "Recipes", href: "/recipes", description: "Seasonal cooking" },
          { label: "Films", href: "/cinema", description: "Video from the House" },
        ],
      },
      {
        heading: "Categories",
        links: [
          { label: "Interiors & Styling", href: "/the-hearth/category/interiors-and-styling" },
          { label: "Gardens & Exteriors", href: "/the-hearth/category/gardens-and-exteriors" },
          { label: "Design & Architecture", href: "/the-hearth/category/design-and-architecture" },
          { label: "Colour & Materials", href: "/the-hearth/category/colour-and-materials" },
          { label: "Heritage & Culture", href: "/the-hearth/category/heritage-and-culture" },
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
        heading: "What we stand for",
        links: [
          { label: "Philosophy", href: "/the-house/philosophy", description: "Our founding idea" },
          { label: "How we choose", href: "/the-house/how-we-choose", description: "Who cares for your home" },
          { label: "Standards", href: "/the-house/standards", description: "How we work" },
          { label: "Sustainability", href: "/the-house/sustainability", description: "Our commitments" },
        ],
      },
      {
        heading: "From the House",
        links: [
          { label: "About", href: "/the-house/about", description: "The team behind the House" },
          { label: "News", href: "/news", description: "Press, awards & announcements" },
          { label: "Contact", href: "/contact", description: "Talk to the House" },
        ],
      },
      {
        // aug12 §4 — Design and the trades Services demoted into The House.
        heading: "Design & services",
        links: [
          { label: "Interior design", href: "/design/interiors", description: "Delve Interiors" },
          { label: "Garden design", href: "/design/gardens", description: "Willow Alexander Gardens" },
          { label: "Gardening", href: "/services/gardening" },
          { label: "Cleaning", href: "/services/cleaning" },
          { label: "Window cleaning", href: "/services/window-cleaning" },
          { label: "All local services", href: "/services" },
        ],
      },
    ],
    // No preview — three groups render side-by-side in the wide grid (clearer
    // than one long stacked column).
  },
];
