import type { Service, SubService } from "./index";
import { getRequestableService, REQUESTABLE_SERVICES, type RequestableService } from "./requestable";
import { SERVICE_TRUST_BADGES } from "./sub-services";
import { HOME_DETAIL } from "./detail-home";
import { OUTDOOR_DETAIL } from "./detail-outdoor";
import { MOVING_DETAIL } from "./detail-moving";
import type { SingleServiceView } from "@/components/marketing/SingleServiceDetail";

/**
 * Page content for the wider service catalogue.
 *
 * REVISIONS v3 §4 module 3 / §5. These services render through the SAME
 * template as gardening and cleaning (`ServiceDetail`), in `mode="quote"`:
 * identical sections, identical weight, identical House voice. The only
 * difference is what the CTAs ask for, because we cannot price these from a
 * postcode alone.
 *
 * The point is commercial as much as editorial. A stub page converts nothing.
 * A proper service page with real scope, a real method and real answers earns
 * the enquiry, and the enquiry arrives tagged with the service slug so it is
 * segmentable and retargetable.
 *
 * House voice rules that apply to every entry here:
 *   - No em dashes. Use commas, or start a new sentence.
 *   - Never the word "AI".
 *   - Never promise a capability we have not confirmed. Where the honest
 *     answer is "it depends" or "we would need to look", say that.
 *   - Never imply the House does the work with its own crews where a named
 *     HoWA Approved professional would actually do it (§2).
 */

export interface RequestableDetail {
  /** Hero eyebrow, e.g. "Services · Roofing". */
  eyebrow: string;
  headline: string;
  /** Substring of `headline` italicised as the lander-framework accent. */
  headlineEm?: string;
  lede: string;
  included: string[];
  how: string[];
  faq: Array<{ q: string; a: string }>;
  practical: {
    duration: string;
    materials: string;
    access: string;
    parking: string;
    excluded: string[];
  };
  /** Only set where we hold genuine photography of this service. */
  heroImage?: string;
  recurring?: boolean;
}

export const REQUESTABLE_DETAIL: Record<string, RequestableDetail> = {
  ...HOME_DETAIL,
  ...OUTDOOR_DETAIL,
  ...MOVING_DETAIL,
};

/** Postcode areas quoted across the catalogue. Matches services-data. */
const AREAS = ["SW", "W", "KT", "SE", "BR", "DA", "TN", "TW"];

/**
 * Hero imagery for the wider catalogue.
 *
 * Every service must have one. The shared fallback used to be
 * `service-placeholder.webp`, which is a photograph of a handwritten "Coming
 * Soon" card, so any service without its own hero was announcing itself as not
 * yet open. These services ARE open, so that image must never appear on them.
 *
 * Where we hold real photography of the work, it is used. Everything else uses
 * the sub-brand still-life for its trade: on-brand, consistent, and honest,
 * because a still-life of the tools claims nothing about a job we have not
 * photographed. Replacing these with real field photography is the obvious
 * upgrade when a shoot happens.
 */
const HERO_BY_SLUG: Record<string, string> = {
  // Garden — real field photography.
  landscaping: "/services/photos/gardening/turf-laying-hero.webp",
  // Real Willow Alexander photography recovered from the WordPress backup.
  "fencing-decking": "/services/photos/wp/decking.webp",
  irrigation: "/services/photos/gardening/lawn-care-hero.webp",
  "garden-lighting": "/services/photos/gardening/planting-hero.webp",

  // Exterior — real field photography where the subject genuinely matches.
  "gutter-repair": "/services/photos/window-cleaning/gutter-cleaning-work.webp",
  roofing: "/services/exterior/roofing.webp",
  driveways: "/services/photos/gardening/jet-washing-hero.webp",
  "solar-cleaning": "/services/exterior/solar-cleaning.webp",
  "chimney-sweep": "/services/exterior/chimney-sweep.webp",

  // Home — cleaning-adjacent work uses the real cleaning photography.
  "oven-cleaning": "/services/photos/cleaning/spring-clean-hero.webp",
  "carpet-upholstery": "/services/home/carpet-upholstery.webp",
  housekeeping: "/services/home/housekeeping.webp",

  // Home trades — dedicated per-service photography (4:3).
  plumbing: "/services/home/plumbing.webp",
  "heating-boiler": "/services/home/heating-boiler.webp",
  flooring: "/services/home/flooring.webp",
  "plastering-tiling": "/services/home/plastering-tiling.webp",
  "damp-proofing": "/services/home/damp-proofing.webp",
  "appliance-repair": "/services/home/appliance-repair.webp",
  locksmith: "/services/home/locksmith.webp",
  "pest-control": "/services/home/pest-control.webp",

  // Moving and clearance — dedicated per-service photography (4:3).
  packing: "/services/moving/packing.webp",
  storage: "/services/moving/storage.webp",
  "house-clearance": "/services/moving/house-clearance.webp",
  "waste-removal": "/services/moving/waste-removal.webp",
  removals: "/services/moving/removals.webp",

  // Specialists — real WA photography from the WP backup where we have it.
  "ev-charger": "/services/specialists/ev-charger.webp",
  "solar-battery": "/services/photos/wp/solar.webp",
  "smart-home": "/services/specialists/smart-home.webp",
  "security-alarms": "/services/specialists/security-alarms.webp",
};

/**
 * Adapts a catalogue entry plus its page content into the `Service` shape
 * `ServiceDetail` consumes, so the wider catalogue and the four launch
 * services share one template rather than drifting into two.
 *
 * `packages` is deliberately empty: these services have no fixed price to
 * publish, and inventing one would be worse than saying so. `ServiceDetail`
 * in quote mode reads that and shows the price-method line instead.
 */
export function toServiceShape(
  entry: RequestableService,
  detail: RequestableDetail,
): Service {
  return {
    // The catalogue is wider than the original ServiceSlug union, so the slug
    // is widened here. ServiceDetail only ever uses it as a lookup key.
    slug: entry.slug as Service["slug"],
    name: entry.name,
    lede: detail.lede,
    eyebrow: detail.eyebrow,
    headline: detail.headline,
    headlineEm: detail.headlineEm,
    heroImage: detail.heroImage ?? HERO_BY_SLUG[entry.slug],
    sections: { included: detail.included, how: detail.how },
    recurring: detail.recurring ?? false,
    availableAreas: AREAS,
    packages: [],
    subServices: [] as SubService[],
    faq: detail.faq,
    trustBadges: SERVICE_TRUST_BADGES,
  };
}

/** Resolves a slug to a ready-to-render quote-mode service, or null. */
export function getQuoteService(slug: string): Service | null {
  const entry = getRequestableService(slug);
  if (!entry || entry.bookable) return null;
  const detail = REQUESTABLE_DETAIL[slug];
  if (!detail) return null;
  return toServiceShape(entry, detail);
}

/** Practical "Good to know" block, keyed by slug, for ServiceDetail. */
export function getQuotePractical(slug: string) {
  return REQUESTABLE_DETAIL[slug]?.practical;
}

/**
 * Real work photography (recovered from the WP backup) for the leaf services
 * where we have more than a single shot. Gives them the same "From the work"
 * section a sub-service page like garden-clearance has. Services not listed
 * here simply omit that section; their hero image still carries the page.
 */
const WORK_BY_SLUG: Record<string, { work: string; gallery: string[] }> = {
  "fencing-decking": {
    work: "/services/photos/wp/decking-work.webp",
    gallery: [
      "/services/photos/wp/decking-gallery-1.webp",
      "/services/photos/wp/decking-gallery-2.webp",
      "/services/photos/wp/decking-gallery-3.webp",
    ],
  },
  "ev-charger": {
    work: "/services/photos/wp/ev-charger-work.webp",
    gallery: ["/services/photos/wp/ev-charger-gallery-1.webp"],
  },
  "solar-battery": {
    work: "/services/photos/wp/solar-work.webp",
    gallery: ["/services/photos/wp/solar-gallery-1.webp"],
  },
};

/** Why these hold true for every arranged service, so the "Why choose us"
 *  column reads the same on each leaf service page. */
const WHY_HOUSE = [
  "Delivered by a House team or a named HoWA Approved professional, disclosed before you commit",
  "The price method explained up front, never a hidden call-out fee",
  "Booked, scheduled and remembered in your Home Record through HoWA",
  "Vetted, insured, and held to the House standard",
];

/**
 * Builds the shared single-service view for a leaf catalogue service, so
 * standalone services (landscaping, roofing, plumbing …) render through the
 * same template as a sub-service page like garden-clearance.
 *
 * The "Related" block is the same-group services, which fills the slot a
 * category page fills with its sub-services carousel. Where we hold no
 * photography of the work, the "From the work" section is simply omitted
 * (workImage undefined); the hero image still carries the page.
 */
export function getSingleServiceView(slug: string): SingleServiceView | null {
  const entry = getRequestableService(slug);
  if (!entry || entry.bookable) return null;
  const detail = REQUESTABLE_DETAIL[slug];
  if (!detail) return null;

  const heroImage = detail.heroImage ?? HERO_BY_SLUG[slug] ?? "/services/subbrands/handyman.webp";

  const related = REQUESTABLE_SERVICES.filter(
    (x) => x.group === entry.group && x.slug !== slug,
  )
    .slice(0, 6)
    .map((x) => ({ name: x.name, href: x.href ?? `/services/${x.slug}`, blurb: x.blurb }));

  return {
    name: entry.name,
    lede: entry.blurb,
    heroImage,
    mode: "quote",
    breadcrumb: [
      { label: "Services", href: "/services" },
      { label: entry.group, href: "/services#everything" },
    ],
    aboutBody: detail.lede,
    whyChoose: WHY_HOUSE,
    workImage: WORK_BY_SLUG[slug]?.work,
    gallery: (WORK_BY_SLUG[slug]?.gallery ?? []).map((src, i) => ({
      src,
      alt: `${entry.name}, recent work ${i + 1}`,
      caption: `${entry.name} · London`,
    })),
    included: detail.included,
    faq: detail.faq,
    related: related.length
      ? {
          heading: `More in ${entry.group.toLowerCase()}`,
          title: `Other ${entry.group.toLowerCase()} services.`,
          items: related,
        }
      : undefined,
    enquiryService: slug,
    enquirySource: `/services/${slug}`,
    backHref: "/services#everything",
    backLabel: "See all services",
  };
}
