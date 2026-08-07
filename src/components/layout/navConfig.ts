import type { MegaPanel } from "@/components/nav/MegaMenu";
import shopNavData from "@/lib/shop-data/shop-nav.generated.json";

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
 * REVISIONS v3 §5 — the Services menu is a WHOLE-HOME mega-menu grouped
 * Garden · Home · Exterior · Help me choose. The earlier four-service
 * limitation (v2 §04) is explicitly reversed: it was meant to stop dead
 * "coming soon" cards, but it must not stop the House presenting a credible
 * whole-home offer fulfilled through House teams AND disclosed House Approved
 * professionals. Every link below resolves to a real page.
 */
const SERVICE_CATEGORIES: {
  title: string;
  href: string;
  subs: { label: string; href: string }[];
}[] = [
  {
    title: "Garden",
    href: "/services/gardening",
    subs: [
      { label: "Garden care", href: "/services/gardening" },
      { label: "Garden clearance", href: "/services/gardening/garden-clearance" },
      { label: "Hedges & seasonal cutting", href: "/services/gardening/hedge-and-boundary-maintenance" },
      { label: "Planting & garden improvements", href: "/services/gardening/planting" },
      { label: "Trees & specialist garden work", href: "/services/gardening/tree-work" },
      { label: "Lawn care", href: "/services/gardening/lawn-care" },
      { label: "Turf laying", href: "/services/gardening/turf-laying" },
    ],
  },
  {
    title: "Home",
    href: "/services/cleaning",
    subs: [
      { label: "Cleaning & housekeeping", href: "/services/cleaning" },
      { label: "Regular cleaning", href: "/services/cleaning/regular-cleaning" },
      { label: "End-of-tenancy cleaning", href: "/services/cleaning/end-of-tenancy-cleaning" },
      { label: "Handyman & repairs", href: "/services/handyman" },
      { label: "Home maintenance", href: "/services/handyman/general-repairs" },
      { label: "Painting & decorating", href: "/services/handyman/painting-and-decorating" },
      { label: "Other home services", href: "/services" },
    ],
  },
  {
    title: "Exterior",
    href: "/services/window-cleaning",
    subs: [
      { label: "Window cleaning", href: "/services/window-cleaning" },
      { label: "Gutter cleaning", href: "/services/gutter-cleaning" },
      { label: "Pressure & exterior cleaning", href: "/services/window-cleaning/jet-washing" },
      { label: "Softwashing", href: "/services/window-cleaning/softwashing" },
    ],
  },
  {
    // §5 "Help me choose" — for customers who do not know the service name.
    // §11 do-not-use: never "Gardener app" / "Handyman app"; they are named
    // journeys inside HoWA, described by what they do for the customer.
    title: "Help me choose",
    href: "/services#help-me-choose",
    subs: [
      { label: "Describe a problem", href: "/services#help-me-choose" },
      { label: "Handyman & repairs", href: "/services/handyman" },
      { label: "Garden care & design", href: "/services/gardening" },
      { label: "Everything the House can arrange", href: "/services#everything" },
      { label: "View all services", href: "/services" },
    ],
  },
];

/**
 * Bottom row of the Services mega-menu.
 *
 * REVISIONS v3 §5 — CTA language is the customer's action ("Find a service"),
 * never "Book through HoWA". HoWA is the system handling the booking, not the
 * thing being bought.
 */
const SERVICE_FOOTER = [
  { label: "All services", href: "/services" },
  { label: "Book via HoWA", href: "https://howa.co.uk" },
];

/**
 * Primary navigation configuration.
 *
 * Aug 2026 eComm/Insurance refocus — the House pares down to Shop, Insurance,
 * The Hearth and (soon) Cinema, with light links out to the service businesses.
 * Order:
 *   The House · Services · Design · Protect · Marketplace · The Hearth
 *
 * House Companion and Meet HoWA were removed as pillars: the HoWA product is no
 * longer re-sold here (booking is a plain outbound link to howa.co.uk), and the
 * AI design/companion layer is gone. Design stays as a commissioned service
 * (purchased via a Marketplace voucher). A Cinema pillar will be added once the
 * video area is built.
 */
export const PRIMARY_NAV: MegaPanel[] = [
  {
    id: "the-house",
    // Aug 2026 directive §08 — the pillar label is "The House".
    trigger: "The House",
    // The standalone overview hub was retired; the dropdown's "See all" link and
    // the bare /the-house route both lead to About (the section's overview).
    triggerHref: "/the-house/about",
    groups: [
      {
        heading: "What we stand for",
        links: [
          { label: "Philosophy", href: "/the-house/philosophy", description: "Our founding idea" },
          // v4 §6 — the customer-facing provider-transparency page. There is no
          // "House Approved Partners" page: professional accreditation belongs
          // to House Approved, and recruitment lives on the HoWA site.
          { label: "How we choose", href: "/the-house/how-we-choose", description: "Who cares for your home" },
          { label: "The Artwork of the House", href: "/the-house/artwork", description: "Heritage, craft, colour" },
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
    // Mobile drawer renders every group, so these mirror the desktop
    // mega-menu groups (v3 §3: the mobile menu must expose the same
    // destinations).
    groups: [
      {
        heading: "Garden",
        links: [
          { label: "Garden care", href: "/services/gardening" },
          { label: "Garden clearance", href: "/services/gardening/garden-clearance" },
          { label: "Hedges & seasonal cutting", href: "/services/gardening/hedge-and-boundary-maintenance" },
          { label: "Planting & garden improvements", href: "/services/gardening/planting" },
          { label: "Trees & specialist garden work", href: "/services/gardening/tree-work" },
        ],
      },
      {
        heading: "Home",
        links: [
          { label: "Cleaning & housekeeping", href: "/services/cleaning" },
          { label: "Handyman & repairs", href: "/services/handyman" },
          { label: "Home maintenance", href: "/services/handyman/general-repairs" },
          { label: "Other home services", href: "/services" },
        ],
      },
      {
        heading: "Exterior",
        links: [
          { label: "Window cleaning", href: "/services/window-cleaning" },
          { label: "Gutter cleaning", href: "/services/gutter-cleaning" },
          { label: "Pressure & exterior cleaning", href: "/services/window-cleaning/jet-washing" },
        ],
      },
      {
        heading: "Help me choose",
        links: [
          { label: "Describe a problem", href: "/services#help-me-choose" },
          { label: "Everything the House can arrange", href: "/services#everything" },
          { label: "All services", href: "/services" },
        ],
      },
    ],
    // Desktop: two-level menu — hover a service, its sub-services appear beside
    // it (same pattern as Shop). Mobile drawer still uses `groups`.
    twoLevel: {
      categories: SERVICE_CATEGORIES,
      footer: SERVICE_FOOTER,
    },
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
        // Design is a commissioned service through named human studios. Purchase
        // is via a voucher in the Marketplace; the AI "first design" layer was
        // removed in the Aug 2026 eComm/Insurance refocus.
        heading: "The studios",
        links: [
          { label: "Delve Interiors", href: "/design/interiors", description: "Considered interior schemes" },
          { label: "Willow Alexander Gardens", href: "/design/gardens", description: "Garden design & landscapes" },
          { label: "How we choose studios", href: "/design/studios", description: "The circle we work with" },
        ],
      },
    ],
    preview: {
      image: "/design/interiors/project-living-room.webp",
      alt: "A Delve Interiors living room in deep navy, with a period fireplace, built-in shelving and a green velvet chair",
      tag: "Delve Interiors",
      heading: "Interiors, considered.",
      href: "/design/interiors",
    },
  },

  {
    id: "insurance",
    // Aug 2026 directive §08 — the pillar label is "Protect" (route stays /insurance).
    // Insurance Site Build spec (hub-and-spoke): the top nav routes into the
    // /insurance hub, and the dropdown surfaces the main destinations. Only
    // built pages are linked; Business + Guides join as they ship. The House is
    // an introducer only — no "House Approved Insurance" language anywhere.
    trigger: "Protect",
    triggerHref: "/insurance",
    groups: [
      {
        heading: "Insurance",
        links: [
          { label: "Private client", href: "/insurance/private-client", description: "Advised cover for high-value homes" },
          { label: "Everyday cover", href: "/insurance/everyday", description: "Home, car, pet and travel" },
          { label: "Business insurance", href: "/insurance/business", description: "Trades, indemnity and commercial" },
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
        heading: "Assets & advice",
        links: [
          { label: "Fine art & collections", href: "/insurance/fine-art-and-collections" },
          { label: "Classic & prestige motor", href: "/insurance/classic-and-prestige-motor" },
          { label: "Home Protection Review", href: "/insurance/home-protection", description: "Book an assessment" },
          { label: "How this works", href: "/insurance/how-this-works", description: "And how we are paid" },
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
        ],
      },
    ],
  },

  {
    id: "shop",
    // Aug 2026 directive §08 — the pillar label is "Marketplace" (route stays /shop).
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
        // DIRECTIVE §12 — visible label is "The House Selection" / "Chosen by
        // the House"; the underlying curated collection keeps its live handle so
        // the real Shopify data still resolves. Only the label is renamed.
        { label: "The House Selection", href: "/shop/collections/house-approved" },
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
    // DIRECTIVE §04 site tree — The Hearth second level exposes the categories.
    groups: [
      {
        heading: "The Hearth",
        links: [
          { label: "The Latest", href: "/the-hearth", description: "Editorial writing on homes & gardens" },
          { label: "Recipes", href: "/recipes", description: "Seasonal cooking" },
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
    id: "cinema",
    trigger: "Cinema",
    triggerHref: "/cinema",
    groups: [
      {
        heading: "The Cinema",
        links: [
          { label: "The screening room", href: "/cinema", description: "Films and short video from the House" },
        ],
      },
    ],
  },

];
