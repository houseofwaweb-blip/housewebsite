/**
 * Local-SEO location dataset — service × town landing pages.
 *
 * Model: one page per launch service per town, e.g. "Gardening in Bromley
 * (BR1, BR2)". 4 launch services × 38 towns = 152 pages, served from
 * /services/local/<service>-in-<town>.
 *
 * Towns + postcodes were compiled from the live willowalexandergardeners.co.uk
 * catalogue (the proven local set) and cover London and Kent. Each town has a
 * service-agnostic `character` line (the local property/plot mix) woven into
 * every service's intro, so the copy varies by town AND service rather than
 * reading as a template.
 *
 * H1 always carries the town + its postcodes; the intro anchors to the FIRST
 * postcode, matching the gardeners-site pattern that already ranks.
 */

import { SERVICES, type Service, type ServiceSlug } from "./index";

export interface Town {
  slug: string;
  name: string;
  /** Postcode districts, most specific first. H1 lists all; intro anchors to [0]. */
  postcodes: string[];
  /** Service-agnostic local character (homes/plots), woven into every intro. */
  character: string;
}

/** The four launch services that get location pages (live in every town). */
export const LOCATION_SERVICE_SLUGS = [
  "gardening",
  "window-cleaning",
  "cleaning",
  "gutter-cleaning",
] as const;

export type LocationServiceSlug = (typeof LOCATION_SERVICE_SLUGS)[number];

/** Per-service copy for the location template. Everything else (name, faq,
 *  hero image, colour, trust badges, sub-services) is read from SERVICES. */
export const LOCATION_SERVICES: Record<
  LocationServiceSlug,
  {
    /** Intro verb phrase, e.g. "Planting, maintenance and seasonal garden care". */
    verb: string;
    /** Local-proof caption label, e.g. "A garden we've cared for". */
    proofLabel: string;
    /** Short noun for "what we cover" and CTAs, e.g. "garden". */
    noun: string;
  }
> = {
  gardening: {
    verb: "Planting, maintenance and seasonal garden care",
    proofLabel: "A garden we've cared for",
    noun: "garden",
  },
  "window-cleaning": {
    verb: "Pure-water window cleaning and exterior care",
    proofLabel: "Windows we've cleaned",
    noun: "windows",
  },
  cleaning: {
    verb: "Regular, deep and one-off home cleaning",
    proofLabel: "A home we've cleaned",
    noun: "home",
  },
  "gutter-cleaning": {
    verb: "Ground-based gutter clearing with a camera check",
    proofLabel: "Gutters we've cleared",
    noun: "gutters",
  },
};

export const TOWNS: Town[] = [
  { slug: "badgers-mount", name: "Badgers Mount", postcodes: ["TN14"], character: "large rural properties and paddock-edge plots" },
  { slug: "balham", name: "Balham", postcodes: ["SW12"], character: "Victorian terraces and mansion blocks" },
  { slug: "battersea", name: "Battersea", postcodes: ["SW11", "SW8"], character: "long terraces and tight side returns" },
  { slug: "beckenham", name: "Beckenham", postcodes: ["BR3"], character: "family homes and larger semi-detached plots" },
  { slug: "bexley", name: "Bexley", postcodes: ["DA5"], character: "family homes and established suburban plots" },
  { slug: "bickley", name: "Bickley", postcodes: ["BR1", "BR7"], character: "large, established Edwardian and inter-war homes" },
  { slug: "biggin-hill", name: "Biggin Hill", postcodes: ["TN16"], character: "larger hillside plots and exposed, sloping ground" },
  { slug: "blackheath", name: "Blackheath", postcodes: ["SE3"], character: "period Georgian and Victorian homes" },
  { slug: "brixton", name: "Brixton", postcodes: ["SW2", "SW9"], character: "Victorian terraces and compact courtyards" },
  { slug: "bromley", name: "Bromley", postcodes: ["BR1", "BR2"], character: "family homes, larger established plots and contemporary re-landscapes" },
  { slug: "canary-wharf", name: "Canary Wharf", postcodes: ["E14"], character: "roof terraces, balconies and courtyards" },
  { slug: "chelsea", name: "Chelsea", postcodes: ["SW3", "SW10"], character: "walled courtyards, paved gardens and roof terraces" },
  { slug: "chislehurst", name: "Chislehurst", postcodes: ["BR7"], character: "large homes on wooded, established plots" },
  { slug: "clapham", name: "Clapham", postcodes: ["SW4"], character: "Victorian terraces and family homes" },
  { slug: "crystal-palace", name: "Crystal Palace", postcodes: ["SE19"], character: "hillside terraces and steeply sloping plots" },
  { slug: "dartford", name: "Dartford", postcodes: ["DA1", "DA2"], character: "family homes and settled suburban plots" },
  { slug: "dulwich", name: "Dulwich", postcodes: ["SE21", "SE22"], character: "large, leafy homes and conservation-area plots" },
  { slug: "farnborough", name: "Farnborough", postcodes: ["BR6"], character: "family homes and larger village-edge plots" },
  { slug: "farningham", name: "Farningham", postcodes: ["DA4"], character: "village homes and larger country plots" },
  { slug: "fulham", name: "Fulham", postcodes: ["SW6"], character: "walled terraces and bay-fronted homes" },
  { slug: "greenwich", name: "Greenwich", postcodes: ["SE10"], character: "period terraces and larger Georgian homes" },
  { slug: "hammersmith", name: "Hammersmith", postcodes: ["W6"], character: "Victorian terraces and small courtyards" },
  { slug: "horton-kirby", name: "Horton Kirby", postcodes: ["DA4"], character: "village homes and larger rural plots" },
  { slug: "kensington", name: "Kensington", postcodes: ["W8", "SW7"], character: "communal squares, walled courtyards and townhouses" },
  { slug: "knockholt", name: "Knockholt", postcodes: ["TN14"], character: "large country homes on rural plots" },
  { slug: "lambeth", name: "Lambeth", postcodes: ["SE11"], character: "terraces, small courtyards and estates" },
  { slug: "mottingham", name: "Mottingham", postcodes: ["SE9"], character: "family homes and larger suburban plots" },
  { slug: "new-eltham", name: "New Eltham", postcodes: ["SE9"], character: "1930s family homes and suburban plots" },
  { slug: "norwood", name: "Norwood", postcodes: ["SE27", "SE19"], character: "hillside terraces and sloping plots" },
  { slug: "notting-hill", name: "Notting Hill", postcodes: ["W11"], character: "stucco townhouses and shared garden squares" },
  { slug: "orpington", name: "Orpington", postcodes: ["BR6", "BR5"], character: "family homes and larger suburban plots" },
  { slug: "sevenoaks", name: "Sevenoaks", postcodes: ["TN13"], character: "large country homes on established plots" },
  { slug: "sidcup", name: "Sidcup", postcodes: ["DA14", "DA15"], character: "1930s family homes and settled suburban plots" },
  { slug: "south-darenth", name: "South Darenth", postcodes: ["DA4"], character: "village homes and riverside plots" },
  { slug: "southwark", name: "Southwark", postcodes: ["SE1", "SE16"], character: "courtyard gardens, roof terraces and warehouse conversions" },
  { slug: "swanley", name: "Swanley", postcodes: ["BR8"], character: "family homes and suburban plots" },
  { slug: "sydenham", name: "Sydenham", postcodes: ["SE26"], character: "Victorian terraces and sloping plots" },
  { slug: "westerham", name: "Westerham", postcodes: ["TN16"], character: "large country homes and hillside plots" },
];

const TOWN_BY_SLUG = new Map(TOWNS.map((t) => [t.slug, t]));

export interface LocationPage {
  slug: string; // e.g. "gardening-in-bromley"
  service: Service;
  serviceSlug: LocationServiceSlug;
  town: Town;
}

/** London vs Kent, from the leading postcode area. Used only for copy ("across
 *  London and Kent" stays global; this labels the individual town). */
export function townRegion(town: Town): "London" | "Kent" {
  const area = town.postcodes[0].replace(/[0-9].*$/, "");
  return area === "DA" || area === "TN" ? "Kent" : "London";
}

/** Resolve a "<service>-in-<town>" slug to its page, or null. Parses by known
 *  service prefix so hyphenated town slugs (crystal-palace) are unambiguous. */
export function getLocationPage(slug: string): LocationPage | null {
  for (const serviceSlug of LOCATION_SERVICE_SLUGS) {
    const prefix = `${serviceSlug}-in-`;
    if (slug.startsWith(prefix)) {
      const townSlug = slug.slice(prefix.length);
      const town = TOWN_BY_SLUG.get(townSlug);
      if (!town) return null;
      return {
        slug,
        serviceSlug,
        service: SERVICES[serviceSlug as ServiceSlug],
        town,
      };
    }
  }
  return null;
}

/** All 152 location slugs, for generateStaticParams + the sitemap. */
export function allLocationSlugs(): string[] {
  const out: string[] = [];
  for (const serviceSlug of LOCATION_SERVICE_SLUGS) {
    for (const town of TOWNS) {
      out.push(`${serviceSlug}-in-${town.slug}`);
    }
  }
  return out;
}

/** The town pages for one service (used by the service page's "Areas we cover"
 *  section so the 152 pages are internally linked, not orphaned). */
export function townLinksForService(serviceSlug: LocationServiceSlug): Array<{
  href: string;
  label: string;
}> {
  return TOWNS.map((t) => ({
    href: `/services/local/${serviceSlug}-in-${t.slug}`,
    label: t.name,
  }));
}

/** The other launch services in the same town (the "Also available in <town>"
 *  cross-links that build the internal mesh). */
export function siblingServicesInTown(
  serviceSlug: LocationServiceSlug,
  townSlug: string,
): Array<{ href: string; name: string; verb: string; image?: string }> {
  return LOCATION_SERVICE_SLUGS.filter((s) => s !== serviceSlug).map((s) => ({
    href: `/services/local/${s}-in-${townSlug}`,
    name: SERVICES[s as ServiceSlug].name,
    verb: LOCATION_SERVICES[s].verb,
    image: SERVICES[s as ServiceSlug].heroImage,
  }));
}
