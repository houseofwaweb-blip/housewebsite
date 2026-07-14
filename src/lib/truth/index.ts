/**
 * THE TRUTH LAYER — Directive v2, STEP 02.
 *
 * One central source for public status, provider identity, price mode, coverage,
 * write-back and evidence. No page may carry its own unsupported version of any
 * of these. A route may never present `live` when its seller/provider, coverage,
 * price route or booking route is missing: `resolveStatus()` downgrades it.
 *
 * TRUTH OVER SIZE: when data is incomplete the public site becomes smaller and
 * more truthful. Never add unverified geography, disciplines or write-back.
 */

export type PublicStatus =
  | "live"
  | "limited"
  | "beta"
  | "in_build"
  | "register_interest"
  | "future"
  | "hidden";

export type WritebackMode = "automatic" | "customer_save" | "confirmation_only" | "none";

export type PriceMode = "fixed" | "from" | "hourly" | "quote" | "not_published";

export type HouseholdOwner =
  | "housekeeper" | "steward" | "butler" | "gardener" | "handyman"
  | "designer" | "surveyor" | "archivist" | "storekeeper" | "host" | "none";

/** State -> public wording, CTA behaviour and index/nav behaviour (v2 STEP 02). */
export const STATUS_RULES: Record<
  PublicStatus,
  { label: string; cta: "book" | "check" | "beta" | "register" | "none"; indexable: boolean; inNav: boolean }
> = {
  live: { label: "Available in selected postcodes", cta: "book", indexable: true, inNav: true },
  limited: { label: "Limited availability", cta: "check", indexable: true, inNav: true },
  beta: { label: "Founding beta", cta: "beta", indexable: true, inNav: true },
  in_build: { label: "In build", cta: "register", indexable: false, inNav: false },
  register_interest: { label: "Register interest", cta: "register", indexable: true, inNav: false },
  future: { label: "Planned", cta: "none", indexable: false, inNav: false },
  hidden: { label: "", cta: "none", indexable: false, inNav: false },
};

export interface PublicOffering {
  id: string;
  publicName: string;
  status: PublicStatus;
  householdOwner: HouseholdOwner;
  /** Named legal seller/fulfiller. Required before `live`. */
  sellerEntity?: string;
  postcodeRules: string[];
  priceMode: PriceMode;
  bookable: boolean;
  writebackMode: WritebackMode;
  canonicalRoute: string;
  redirectAliases?: string[];
  evidenceReviewedAt?: string;
  image?: string;
  line?: string;
}

/**
 * Guard: a missing mandatory field downgrades the public state rather than
 * letting an unsupported `live` claim reach the page (v2 STEP 02 PASS rule).
 */
export function resolveStatus(o: PublicOffering): PublicStatus {
  if (o.status === "hidden") return "hidden";
  const claimsLive = o.status === "live" || o.status === "limited";
  const hasSeller = Boolean(o.sellerEntity);
  const hasCoverage = o.postcodeRules.length > 0;
  const hasPriceRoute = o.priceMode !== "not_published";
  if (claimsLive && !(hasSeller && hasCoverage && hasPriceRoute && o.bookable)) {
    return "register_interest";
  }
  return o.status;
}

export const statusLabel = (o: PublicOffering) => STATUS_RULES[resolveStatus(o)].label;
export const isBookable = (o: PublicOffering) => STATUS_RULES[resolveStatus(o)].cta === "book";
export const isIndexable = (o: PublicOffering) => STATUS_RULES[resolveStatus(o)].indexable;

/** Named provider entities. Nothing may claim `live` without one of these. */
// The named legal sellers. Display names and the fact that each is a separate
// operating business come from the Digital Estate service-site register, which
// lists willowalexandergardeners.co.uk, willowalexandercleaners.co.uk and
// willowalexanderwindowcleaners.co.uk as distinct brands that keep their own
// names, domains and delivery identities.
//
// Gutter clearing has no brand of its own in the register because it is
// delivered by the window cleaning business, so it sells under
// waWindowCleaners rather than getting a fabricated entity of its own.
export const PROVIDERS = {
  waGardeners: {
    id: "waGardeners",
    displayName: "Willow Alexander Gardeners",
    providerClass: "Founding service family",
    profileRoute: "/partners/willow-alexander-gardens",
  },
  waCleaners: {
    id: "waCleaners",
    displayName: "Willow Alexander Cleaners",
    providerClass: "Founding service family",
    profileRoute: "/partners/willow-alexander-gardens",
  },
  waWindowCleaners: {
    id: "waWindowCleaners",
    displayName: "Willow Alexander Window Cleaners",
    providerClass: "Founding service family",
    profileRoute: "/partners/willow-alexander-gardens",
  },
} as const;

/**
 * SERVICE REGISTER — only four services may be presented as live care.
 * Future services are separated (v2 STEP 08) and never pad the live grid.
 */
export const SERVICES: PublicOffering[] = [
  {
    id: "gardening",
    publicName: "Gardening",
    status: "live",
    householdOwner: "gardener",
    sellerEntity: PROVIDERS.waGardeners.displayName,
    postcodeRules: ["SW", "W", "KT", "W4", "W6", "TW"],
    priceMode: "quote",
    bookable: true,
    writebackMode: "customer_save",
    canonicalRoute: "/services/gardening",
    image: "/services/subbrands/gardeners.webp",
    line: "Seasonal care, lawns, borders, hedges, planting and garden restoration.",
  },
  {
    id: "cleaning",
    publicName: "Cleaning",
    status: "live",
    householdOwner: "housekeeper",
    sellerEntity: PROVIDERS.waCleaners.displayName,
    postcodeRules: ["SW", "W", "KT", "W4", "W6", "TW"],
    priceMode: "quote",
    bookable: true,
    writebackMode: "customer_save",
    canonicalRoute: "/services/cleaning",
    image: "/services/subbrands/cleaners.webp",
    line: "Regular or one-off care, with the scope and provider made clear before booking.",
  },
  {
    id: "window-cleaning",
    publicName: "Window cleaning",
    status: "live",
    householdOwner: "housekeeper",
    sellerEntity: PROVIDERS.waWindowCleaners.displayName,
    postcodeRules: ["SW", "W", "KT", "W4", "W6", "TW"],
    priceMode: "quote",
    bookable: true,
    writebackMode: "customer_save",
    canonicalRoute: "/services/window-cleaning",
    image: "/services/subbrands/window-cleaner.webp",
    line: "Reliable window care, recorded as part of the home's maintenance rhythm.",
  },
  {
    id: "gutter-clearing",
    publicName: "Gutter clearing",
    status: "live",
    householdOwner: "housekeeper",
    // Gutter clearing is delivered by the window cleaning business (confirmed
    // by Alex, 2026-07-14). The estate register lists no separate gutter brand
    // because there isn't one: same operating company, same reach-and-vac kit.
    sellerEntity: PROVIDERS.waWindowCleaners.displayName,
    postcodeRules: ["SW", "W", "KT", "SE", "BR", "DA", "TN"],
    priceMode: "quote",
    bookable: true,
    writebackMode: "customer_save",
    canonicalRoute: "/services/gutter-cleaning",
    image: "/services/subbrands/gutter-cleaning.webp",
    line: "Cleared, checked and ready for the weather, with notes returned to the home.",
  },
  // Future / register-interest. Never rendered inside the live grid (v2 STEP 08).
  {
    id: "handyman",
    publicName: "Handyman",
    status: "in_build",
    householdOwner: "handyman",
    postcodeRules: [],
    priceMode: "not_published",
    bookable: false,
    writebackMode: "none",
    canonicalRoute: "/services/handyman",
  },
  {
    id: "removals",
    publicName: "Removals",
    status: "register_interest",
    householdOwner: "none",
    postcodeRules: [],
    priceMode: "not_published",
    bookable: false,
    writebackMode: "none",
    canonicalRoute: "/services/removals",
  },
  {
    id: "energy",
    publicName: "Energy & Electrical",
    status: "register_interest",
    householdOwner: "none",
    postcodeRules: [],
    priceMode: "not_published",
    bookable: false,
    writebackMode: "none",
    canonicalRoute: "/services/energy",
  },
  {
    id: "pet-care",
    publicName: "Pet Care",
    status: "future",
    householdOwner: "none",
    postcodeRules: [],
    priceMode: "not_published",
    bookable: false,
    writebackMode: "none",
    canonicalRoute: "/services/pet-care",
  },
];

/** Only services that genuinely resolve to `live` may appear as live care. */
export const LIVE_SERVICES = SERVICES.filter((s) => resolveStatus(s) === "live");
export const servicesFor = (owner: HouseholdOwner) =>
  LIVE_SERVICES.filter((s) => s.householdOwner === owner);

/**
 * MEMBERSHIP REGISTER — prices are published ONLY when salesGatePassed is true
 * (v2: feature set, terms, cancellation, VAT and support must match the page).
 */
export interface Membership {
  id: string;
  publicName: string;
  price: string;
  salesGatePassed: boolean;
  holdingLabel: string;
}
/**
 * The two paid tiers.
 *
 * The holding labels state the PRICE with a "when live" qualifier, which is
 * what STEP 09's canonical members table specifies verbatim: "Paid software
 * depth: £16.99/month when live" and "£29.99/month when live". An earlier pass
 * hid the price behind a vaguer label ("Membership opens when the stated
 * functions are live"); that was over-cautious and deviated from the directive.
 * The price is not the unsafe part. STEP 03's rule is narrower: no route may
 * imply £16.99 or £29.99 includes gardening, cleaning or other physical visits,
 * which is what COMMERCIAL_SEPARATION below exists to prevent.
 */
export const MEMBERSHIPS: Membership[] = [
  { id: "housekeeper", publicName: "HoWA Housekeeper", price: "£16.99/month", salesGatePassed: false, holdingLabel: "£16.99/month when live" },
  { id: "steward", publicName: "HoWA Steward", price: "£29.99/month", salesGatePassed: false, holdingLabel: "£29.99/month when live" },
];
export const membershipLabel = (m: Membership) => (m.salesGatePassed ? m.price : m.holdingLabel);
/** Look up a tier's public label by id, for cards that only know the member. */
export const membershipLabelFor = (id: string) => {
  const m = MEMBERSHIPS.find((x) => x.id === id);
  return m ? membershipLabel(m) : "";
};


/**
 * HOME RECORD OBJECTS — what each member writes back (v2 STEP 09, the
 * "Required writeback" line of each member section 09B-09K).
 *
 * 09A s6 requires the member page to name the Home Record objects rather than
 * describe them vaguely. Rendered as readable labels; the identifiers here are
 * the directive's own.
 *
 * These describe what a member writes back ONCE ITS TOOL IS LIVE. Most tools
 * are in build, so the page must present this as what will be kept, never as
 * something already happening. The truth layer's toolStatus drives that
 * wording; nothing here should be read as a claim that write-back is running.
 */
export const WRITEBACK_OBJECTS: Record<string, string[]> = {
  gardener: ["Garden scan", "Garden zone", "Seasonal task", "Service request", "Acquisition event", "Score update"],
  handyman: ["Repair scan", "Issue", "Risk item", "Task", "Service request", "Evidence when completed"],
  designer: ["Design scan", "Design brief", "Project", "Task", "Acquisition event", "Decisions and files"],
  surveyor: ["Fabric scan", "Quote decode", "Risk item", "Task", "Referral service request"],
  archivist: ["Document", "Extraction", "Renewal task", "Evidence item", "Score update"],
  storekeeper: ["Order", "Asset, warranty, manual or room record for relevant goods"],
  host: ["Saved guide", "Task", "Source attribution", "Acquisition event where supported"],
  housekeeper: ["Tasks", "Reminders", "Monthly brief", "Cost item", "Permissions", "Subscription events"],
  steward: ["Risk lifecycle", "Approval event", "Evidence pack", "Annual report", "Score event", "Subscription action"],
  butler: ["Device map", "Utility and telemetry reading", "Automation proposal", "Approval", "Action audit"],
};

/**
 * APPROVED PARTNERS — the fact gate for Directive v2 STEP 14.
 *
 * "Create the route architecture now, but publish only what has been approved."
 *
 * STEP 14's table lists named route SLOTS to prepare, not names cleared to
 * publish: Delve Interiors, Willow Alexander Interiors, Willow Alexander
 * Gardens, Coffee Girl Designs, Jessica Durling Design, Willow Alexander
 * Gardeners. A slot existing is not evidence the studio does.
 *
 * Only these two are approved to publish (confirmed by Alex, 2026-07-14):
 *   - Jessica was dropped some time ago. A profile was still being served from
 *     Sanity under the old personal name "Jessica Durling-McMahon", which is not
 *     even the entity the directive names ("Jessica Durling Design").
 *   - Coffee Girl Designs has never been a partner. It appears in the slot table
 *     only, and must not be created from it.
 *   - House AI appears nowhere in the directive or the Digital Estate register.
 *     It came from CLAUDE.md's pre-rebrand "Launch partners (4)" list, which the
 *     directive supersedes.
 *
 * This gate is deliberately an allowlist rather than a blocklist, and it is
 * checked on BOTH the local and the Sanity partner paths. Partner profiles can
 * be created in the CMS at any time; an unknown slug must fail closed rather
 * than publish itself. Add a slug here only when its fact pack is approved.
 */
export const APPROVED_PARTNERS = ["willow-alexander-gardens", "delve-interiors"] as const;

export const isApprovedPartner = (slug: string): boolean =>
  (APPROVED_PARTNERS as readonly string[]).includes(slug);

/** Commercial separation — PUBLISH-READY COPY, do not rewrite (v2 STEP 03). */
/**
 * The professional boundary — PUBLISH-READY COPY, do not rewrite (v2 STEP 09).
 * Required by the shared member template (09A s5). It is the line that keeps a
 * Household member from reading as a substitute for the qualified professional
 * who is actually responsible and actually liable.
 */
export const PROFESSIONAL_BOUNDARY =
  "Your contract is with the named provider shown in HoWA. The Household helps understand and route the need; it does not replace the professional responsible for the work.";

export const COMMERCIAL_SEPARATION =
  "HoWA Housekeeper and HoWA Steward are software subscriptions. Physical service visits are booked and paid for separately. The named service provider remains responsible for its contract and delivery unless checkout states otherwise.";

/**
 * HOUSEHOLD REGISTER — the one config the header, homepage, /household, footer
 * and member cross-links all read from (v2 STEP 04).
 * Groups: senior staff -> need-based members -> The Host at the door.
 */
export interface HouseholdMember {
  id: HouseholdOwner;
  publicName: string;
  promise: string;
  group: "senior" | "need" | "door";
  toolStatus: PublicStatus;
  serviceStatus: PublicStatus;
  route: string;
  image: string;
  action: string;
  membershipId?: string;
}

export const HOUSEHOLD: HouseholdMember[] = [
  { id: "housekeeper", publicName: "The Housekeeper", promise: "Nothing slips.", group: "senior", toolStatus: "in_build", serviceStatus: "live", route: "/household/housekeeper", image: "/howa/household/housekeeper.webp", action: "Employ the Housekeeper", membershipId: "housekeeper" },
  { id: "steward", publicName: "The Steward", promise: "The house, protected before failure.", group: "senior", toolStatus: "in_build", serviceStatus: "in_build", route: "/household/steward", image: "/howa/household/steward.webp", action: "Protect the home", membershipId: "steward" },
  { id: "butler", publicName: "The Butler", promise: "The instruments of the house, read by anyone, worked only on appointment.", group: "senior", toolStatus: "beta", serviceStatus: "future", route: "/household/butler", image: "/howa/household/butler.webp", action: "See how it works" },

  { id: "gardener", publicName: "The Gardener", promise: "Show me your garden and I'll tell you what it's asking for.", group: "need", toolStatus: "beta", serviceStatus: "live", route: "/household/gardener", image: "/howa/household/gardener.webp", action: "Scan the garden" },
  { id: "handyman", publicName: "The Handyman", promise: "Photo the problem. I'll tell you what it likely is, how urgent, and what's fair to pay.", group: "need", toolStatus: "beta", serviceStatus: "in_build", route: "/household/handyman", image: "/howa/household/handyman.webp", action: "Photograph a fault" },
  { id: "designer", publicName: "The Designer", promise: "One photograph, and I'll show you what the room could be.", group: "need", toolStatus: "beta", serviceStatus: "live", route: "/household/designer", image: "/howa/household/designer.webp", action: "Begin a design project" },
  { id: "surveyor", publicName: "The Surveyor", promise: "The crack, the damp, the quote you don't quite trust, read properly.", group: "need", toolStatus: "beta", serviceStatus: "future", route: "/household/surveyor", image: "/howa/household/surveyor.webp", action: "Decode a concern" },
  { id: "archivist", publicName: "The Archivist", promise: "Send me one document and watch it become dates, reminders and proof.", group: "need", toolStatus: "beta", serviceStatus: "future", route: "/household/archivist", image: "/howa/household/archivist.webp", action: "Send one document" },
  { id: "storekeeper", publicName: "The Storekeeper", promise: "Everything the house needs, chosen properly, bought, and remembered.", group: "need", toolStatus: "live", serviceStatus: "live", route: "/shop", image: "/howa/household/storekeeper.webp", action: "Enter The Stores" },

  { id: "host", publicName: "The Host", promise: "Come in. Everything worth knowing about keeping a home, kept here.", group: "door", toolStatus: "live", serviceStatus: "live", route: "/host", image: "/howa/household/host.webp", action: "Meet The Host" },
];

export const seniorStaff = () => HOUSEHOLD.filter((m) => m.group === "senior");
export const needMembers = () => HOUSEHOLD.filter((m) => m.group === "need");
export const theHost = () => HOUSEHOLD.find((m) => m.group === "door")!;

/** The canonical example Score, used identically across the House site (v2 STEP 05 §7). */
export const EXAMPLE_SCORE = {
  value: 76,
  outOf: 100,
  label: "In order, with gaps",
  factors: [
    "Boiler service · due in 14 days",
    "Gutter clean · before winter",
    "Smoke alarms · tested OK",
  ],
  nextAction: "book the boiler service before winter, and save the certificate to the record.",
};
