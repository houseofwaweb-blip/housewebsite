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
 * whole-home offer fulfilled through House teams AND disclosed HoWA Approved
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
      { label: "Use the Handyman to diagnose an issue", href: "/services/handyman" },
      { label: "Use the Gardener to scan the garden", href: "/services/gardening" },
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
  { label: "Find a service", href: "/services" },
  { label: "See prices & availability", href: "#open-booking-form" },
];

/**
 * Primary navigation configuration.
 *
 * Order (REVISIONS v3 §3):
 *   Services · Design · Insurance · Shop · The Hearth · HoWA · Our House
 *
 * Seven items. v3 §3 explicitly RESTORES HoWA as a visible navigation
 * destination — v2's demotion to a footer link went too far. The HoWA item
 * leads to the House-context page "The House uses HoWA" (/howa), never
 * straight into a pricing comparison or the full HoWA product catalogue.
 */
export const PRIMARY_NAV: MegaPanel[] = [
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
          { label: "Find a service", href: "/services", description: "See prices & availability" },
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
        // DIRECTIVE §09/§10 — Design begins with HoWA First Design (£400), the
        // mapped first output; a named human studio continues the work. No
        // "House studio collective" and no "House Approved" designer directory
        // (that language is reserved for professionals, not used here).
        heading: "How design begins",
        links: [
          { label: "HoWA First Design", href: "/design", description: "The mapped first design" },
          { label: "Delve Interiors", href: "/design/interiors", description: "Human interior continuation" },
          { label: "Willow Alexander Gardens", href: "/design/gardens", description: "Human garden continuation" },
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
    id: "insurance",
    trigger: "Insurance",
    triggerHref: "/insurance",
    groups: [
      {
        // REVISIONS v3 §8 — Home and Pet are SEPARATE journeys with their own
        // pages. Never one generic insurance card. No "House Approved
        // Insurance" language anywhere.
        heading: "Insurance",
        links: [
          { label: "Home Insurance", href: "/insurance/home", description: "Request an introduction" },
          { label: "Pet Insurance", href: "/insurance/pet", description: "Request an introduction" },
        ],
      },
      {
        // §8 — a Home Protection Review is an operational House service, kept
        // clearly apart from the regulated insurance products.
        heading: "Home protection",
        links: [
          { label: "Home Protection Review", href: "/insurance/home-protection", description: "Book an assessment" },
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
    /**
     * REVISIONS v3 §3 + 23rd amendments (Powered by HoWA handoff §14) — the
     * relationship pillar. Labelled "Powered by HoWA", never a bare "HoWA"
     * tab, and never shown as an equal masterbrand. It leads to the service-led
     * /howa page (scan, design, quote, book). The full HoWA product,
     * memberships, Score and persona system stay on howa.co.uk.
     */
    id: "howa",
    trigger: "Powered by HoWA",
    triggerHref: "/howa",
    groups: [
      {
        heading: "Start with what you need",
        links: [
          { label: "Garden Scan", href: "/howa#choose", description: "Scan your garden" },
          { label: "Repair Scan", href: "/howa#choose", description: "Show us a repair" },
          { label: "AI Design", href: "/design/sample", description: "Scan the space" },
          { label: "Book a service", href: "#open-booking-form" },
        ],
      },
      {
        heading: "The relationship",
        links: [
          { label: "How it works", href: "/howa", description: "The House invites, HoWA understands" },
          { label: "Open My Home in HoWA", href: "https://accounts.willowalexander.co.uk/" },
          { label: "Discover the wider HoWA", href: "https://howa.co.uk", description: "The full Home Intelligence" },
        ],
      },
    ],
  },

  {
    id: "the-house",
    // §3 — the pillar is "Our House".
    trigger: "Our House",
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
          // to HoWA Approved, and recruitment lives on the HoWA site.
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
];
