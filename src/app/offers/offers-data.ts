import type { Offer } from "@/components/offers/OfferCard";

/**
 * House Offers content (spec §14). Realistic launch offers across the required
 * categories: seasonal service package, multi-service care, member benefit,
 * a cover offer and a consultation experience. Honest terms throughout; no fake
 * scarcity, countdowns or strike-through pricing. Would be CMS-driven in
 * production (spec §24 `Offer` type); held here until the Offer schema lands.
 */
export const OFFERS: Offer[] = [
  {
    slug: "autumn-garden-and-gutter",
    category: "Seasonal package",
    title: "The autumn garden and gutter tidy",
    image: "/services/subbrands/gardeners.webp",
    imageAlt: "Gardening tools and cut autumn foliage arranged as a still life",
    summary:
      "One visit to tidy the garden for winter and clear the gutters, done by our gardeners and window cleaners together.",
    included: [
      "A full autumn tidy: borders cut back, beds cleared, the lawn given its last cut",
      "Gutters, downpipes and gullies cleared on the same visit",
      "Green waste removed and composted, nothing left behind",
      "A short note on what the garden will need come spring",
    ],
    eligibility:
      "New and existing customers at a serviced postcode. One booking per household.",
    priceBasis:
      "Priced as a single visit and confirmed after a short survey, rather than a fixed figure here. The saving is against booking the garden tidy and the gutter clear separately. Ask for current terms.",
    starts: "Early autumn",
    ends: "late autumn",
    exclusions:
      "Excludes tree surgery, moss removal and gardens over half an acre, which are quoted on their own. Safe ladder access and parking must be available on the day.",
    termsHref: "/legal/service-terms",
    cta: { label: "Book the autumn tidy", href: "/services/gardening" },
    accent: "var(--service-gardeners)",
  },
  {
    slug: "whole-home-care-plan",
    category: "Multi-service care",
    title: "The whole-home care plan",
    image: "/services/subbrands/cleaners.webp",
    imageAlt: "Cleaning materials and cloths arranged as a still life",
    summary:
      "Regular cleaning, gardening and window cleaning on one plan, with one point of contact and one monthly bill.",
    included: [
      "A recurring visit schedule across three or more House services",
      "One coordinator who keeps the visits in step",
      "A single monthly statement rather than separate invoices",
      "Help rebooking through your coordinator when plans change",
    ],
    eligibility:
      "Households booking three or more regular services in one plan, at a serviced postcode.",
    priceBasis:
      "Priced per plan after a home visit. The value is in coordinating the visits under one point of contact, rather than a headline discount. Ask for current terms.",
    starts: "Open now",
    ends: "Reviewed each season",
    exclusions:
      "One-off and survey-based work is quoted separately and sits outside the plan. A minimum term may apply; you can pause or change services with notice.",
    termsHref: "/legal/service-terms",
    cta: { label: "Arrange a plan", href: "/services" },
  },
  {
    slug: "my-house-member-benefits",
    category: "Member benefit",
    title: "My House member benefits",
    image: "/insurance/townhouse-golden.webp",
    imageAlt: "A London townhouse in warm golden light",
    summary:
      "The perks that come with a free My House account, kept in one place.",
    included: [
      "Priority booking windows through the busy seasons, subject to availability",
      "A held rate card between bookings, where the benefit applies",
      "Seasonal maintenance reminders set around your home",
      "Invitations to House events and previews",
    ],
    eligibility: "Anyone with a My House account. Free to join, and free to leave.",
    priceBasis:
      "No charge to join. The benefits are included with a My House account; individual services are still priced and booked as usual.",
    starts: "Open now",
    ends: "Ongoing",
    exclusions:
      "Priority windows are subject to availability. Event invitations are limited by venue capacity. Held rates follow the published rate card and any change is notified in advance.",
    termsHref: "/legal/terms",
    cta: { label: "See My House", href: "/my-house" },
  },
  {
    slug: "the-house-gift-edit",
    category: "Store edit",
    title: "The House gift edit",
    image: "/home-v4/house-temperaments-still-life.webp",
    imageAlt: "A still life of homeware objects arranged for gifting",
    summary:
      "A small seasonal pick of homeware and gifts, wrapped and ready to give.",
    included: [
      "A curated selection of homeware and gifts, refreshed each season",
      "Wrapping in House papers with a hand-written card, chosen at checkout",
      "A short note on the maker or origin of each piece",
      "Standard UK delivery, with costs shown at checkout",
    ],
    eligibility:
      "Anyone shopping the House, with delivery to a United Kingdom address. Gift wrapping is chosen at checkout.",
    priceBasis:
      "Each piece is sold at its usual shelf price; there is no mark-up for the edit. Wrapping and delivery terms are shown at checkout.",
    starts: "Open now",
    ends: "Refreshed each season",
    exclusions:
      "The edit changes with the season and pieces sell as stock allows; nothing is held or back-ordered. Made-to-order and personalised items are quoted at checkout.",
    termsHref: "/legal/terms",
    cta: { label: "Shop the gift edit", href: "/shop" },
  },
  {
    slug: "home-cover-review",
    category: "Cover offer",
    title: "A free home and contents cover review",
    image: "/insurance/period-home.webp",
    imageAlt: "A period home under a calm sky",
    summary:
      "A free second look at the home insurance you already hold, with no obligation and nothing to buy on the day.",
    included: [
      "A no-obligation review of your existing home and contents cover",
      "A check for the common under-insurance gaps, rebuild figure included",
      "An introduction to Provenance, who arrange and administer any cover",
      "A written summary of what was discussed, yours to keep",
    ],
    eligibility:
      "Homeowners in the United Kingdom. The review is free and carries no obligation to switch.",
    priceBasis:
      "The review is free. Any cover is arranged and administered by Provenance; the House does not advise on, sell or underwrite the policy.",
    starts: "Open now",
    ends: "Ongoing",
    exclusions:
      "Not advice. The House introduces you to Provenance; the terms that bind are set out in the policy documents, and cover is subject to Provenance's acceptance.",
    termsHref: "/legal/insurance-disclosures",
    cta: { label: "Request a review", href: "/insurance" },
  },
  {
    slug: "interiors-consultation",
    category: "Experience",
    title: "An interiors design consultation",
    image: "/design/interiors/project-living-room.webp",
    imageAlt: "A styled living room with considered furniture and light",
    summary:
      "Time at home with our interiors team to plan a room or a whole house.",
    included: [
      "A design consultation in your home",
      "A written summary of ideas, priorities and where to begin",
      "A scheme direction and a considered next step to build from",
    ],
    eligibility:
      "Homes within the interiors service area. Consultation-led, arranged by enquiry rather than instant booking.",
    priceBasis:
      "Priced on enquiry, and redeemable against a full project booked soon after. Ask for current terms.",
    starts: "Open now",
    ends: "Ongoing",
    exclusions:
      "The redeemable amount applies to projects over a minimum value, confirmed at the consultation. Travel beyond the standard service area may be charged and is agreed beforehand.",
    termsHref: "/legal/service-terms",
    cta: { label: "Book a consultation", href: "/services/interiors" },
    accent: "var(--service-interiors)",
  },
];
