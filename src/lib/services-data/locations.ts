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

/**
 * Per-town editorial detail, so every location page is wholly unique rather than
 * a template with the name swapped (audit #13 — "add unique content to each
 * indexable one"). `areas` = neighbourhoods/parts of the town, `nearby` =
 * surrounding areas we also cover, `about` = a two-sentence local paragraph.
 * These feed the intro and an "About <town>" section, so the copy differs by
 * town on top of the service-level and character-level variation.
 */
export interface TownDetail {
  /** Neighbourhoods, roads or landmarks within the town. */
  areas: string[];
  /** Surrounding areas we also serve, for the "and around" line + local links. */
  nearby: string[];
  /** A short, town-specific paragraph. Real local detail, no invented streets. */
  about: string;
}

export const TOWN_DETAIL: Record<string, TownDetail> = {
  "badgers-mount": { areas: ["the village", "Well Hill", "Halstead edge"], nearby: ["Halstead", "Shoreham", "Knockholt", "Orpington"], about: "Badgers Mount sits on the North Downs just off the M25 and A21, a small greenbelt community of larger detached homes, paddocks and long rural plots. Much of the work here is on open, exposed ground where hedges, verges and boundary trees set the rhythm of the year." },
  balham: { areas: ["Balham High Road", "the Nightingale Triangle", "Hyde Farm", "Heaver Estate"], nearby: ["Clapham", "Tooting", "Streatham", "Wandsworth Common"], about: "Balham runs between Clapham and Tooting in SW12, a busy grid of Victorian and Edwardian terraces and red-brick mansion blocks around the High Road. Wandsworth and Tooting Bec Commons frame the area, and most homes have compact rear gardens and classic bay-fronted facades." },
  battersea: { areas: ["Battersea Park", "Clapham Junction", "the Shaftesbury Estate", "Nine Elms"], nearby: ["Clapham", "Wandsworth", "Chelsea", "Vauxhall"], about: "Battersea stretches from the park and the river down to Clapham Junction in SW11 and SW8, mixing long Victorian terraces with tight side returns and, along Nine Elms, new riverside blocks. Space is at a premium, so much of the work is careful maintenance of small, overlooked gardens and courtyards." },
  beckenham: { areas: ["Beckenham High Street", "Kelsey Park", "Cator Park", "Elmers End", "Shortlands"], nearby: ["Bromley", "West Wickham", "Penge", "Shortlands"], about: "Beckenham (BR3) is a leafy south-London suburb built around its high street, Kelsey Park and the Cator Estate, with generous semi-detached and detached family homes on established plots. The larger gardens and mature planting here reward a steady seasonal rhythm rather than one-off tidies." },
  bexley: { areas: ["Bexley Village", "Old Bexley", "Hall Place", "North Cray"], nearby: ["Sidcup", "Bexleyheath", "Dartford", "Crayford"], about: "Bexley (DA5) keeps a village feel around its old high street and the River Cray, with settled suburban family homes on well-proportioned plots. Hall Place and its gardens set the tone locally, and many homes back onto mature boundaries and established lawns." },
  bickley: { areas: ["Bickley Park", "Page Heath", "Southborough", "Widmore"], nearby: ["Bromley", "Chislehurst", "Petts Wood", "Southborough"], about: "Bickley (BR1, BR7) is one of Bromley's most established addresses, known for large Edwardian and inter-war houses on wide, wooded plots around Bickley Park. The scale of the gardens and the mature trees mean most work here is proper estate-style upkeep across the seasons." },
  "biggin-hill": { areas: ["Main Road", "Leaves Green", "Downe edge", "the airport side"], nearby: ["Downe", "Keston", "Westerham", "Orpington"], about: "Biggin Hill (TN16) runs along a ridge on the North Downs, so many plots are larger, sloping and exposed with long views. The hillside ground and the wind off the Downs shape the planting, drainage and boundary work more than in the sheltered suburbs below." },
  blackheath: { areas: ["Blackheath Village", "the Heath", "the Cator Estate", "Vanbrugh Park"], nearby: ["Greenwich", "Lewisham", "Lee", "Charlton"], about: "Blackheath (SE3) is a conservation-area village set around its open heath, with fine Georgian and Victorian homes and a strong sense of period detail. Much of the area falls under conservation controls, so planting, walls and frontages are handled with the setting in mind." },
  brixton: { areas: ["Brixton Hill", "Brixton Village", "Loughborough Junction", "Tulse Hill edge"], nearby: ["Clapham", "Herne Hill", "Stockwell", "Streatham"], about: "Brixton (SW2, SW9) is a dense, energetic part of Lambeth, a mix of Victorian terraces, compact courtyards and estate housing around the market and the Hill. Gardens tend to be small and enclosed, so the work is about making tight, shaded spaces feel cared for." },
  bromley: { areas: ["Bromley town centre", "Shortlands", "Bromley Common", "Sundridge Park", "Hayes"], nearby: ["Beckenham", "Chislehurst", "Bickley", "Hayes", "Petts Wood"], about: "Bromley (BR1, BR2) is the commercial heart of the borough, ranging from town-centre homes to large established plots in Sundridge Park and Shortlands and newer re-landscaped gardens further out. The variety means everything from courtyard upkeep to full seasonal care of substantial gardens." },
  "canary-wharf": { areas: ["Canary Wharf", "the Isle of Dogs", "Wood Wharf", "South Quay"], nearby: ["Limehouse", "Poplar", "Greenwich (across the river)", "Rotherhithe"], about: "Canary Wharf (E14) is a high-rise, high-density quarter where outdoor space means roof terraces, balconies and podium courtyards rather than lawns. The work here is containers, screening and terrace planting that has to cope with wind and reflected heat." },
  chelsea: { areas: ["the King's Road", "Chelsea Green", "Cheyne Walk", "Sloane Square edge"], nearby: ["Kensington", "Fulham", "Knightsbridge", "Pimlico"], about: "Chelsea (SW3, SW10) is one of London's most exacting addresses, where gardens are walled courtyards, paved terraces and roof spaces behind period townhouses. Every element is on show and close to the house, so finish and upkeep matter as much as the planting itself." },
  chislehurst: { areas: ["Chislehurst Common", "the High Street", "Camden Park", "Elmstead"], nearby: ["Bickley", "Petts Wood", "Sidcup", "Mottingham"], about: "Chislehurst (BR7) is known for its commons, caves and large houses on wooded, established plots. Mature trees and generous gardens define the area, so the work is long-view care of substantial planting rather than quick tidies." },
  clapham: { areas: ["Clapham Common", "Abbeville Village", "Clapham Old Town", "Clapham North"], nearby: ["Battersea", "Balham", "Brixton", "Stockwell"], about: "Clapham (SW4) centres on its common, with Victorian terraces and family homes across the Abbeville and Old Town areas. Gardens are typically classic London rears behind period houses, well suited to a regular, tidy seasonal rhythm." },
  "crystal-palace": { areas: ["the Triangle", "Crystal Palace Park", "Church Road", "Upper Norwood"], nearby: ["Norwood", "Sydenham", "Penge", "Dulwich"], about: "Crystal Palace (SE19) sits high on the ridge around the park and the Triangle, so many streets are steeply terraced and the plots slope sharply. That gradient shapes everything from access to drainage and terracing on the gardens here." },
  dartford: { areas: ["Dartford town centre", "Temple Hill", "Wilmington", "Joydens Wood"], nearby: ["Bexley", "Crayford", "Greenhithe", "Swanley"], about: "Dartford (DA1, DA2) is a settled north-Kent town of suburban family homes and well-established plots on the edge of the Darent valley. Gardens here are generally roomy and level, suited to regular maintenance and seasonal planting." },
  dulwich: { areas: ["Dulwich Village", "East Dulwich", "West Dulwich", "Herne Hill edge"], nearby: ["Herne Hill", "Sydenham", "Crystal Palace", "Camberwell"], about: "Dulwich (SE21, SE22) is leafy and largely governed by the Dulwich Estate, with large period homes, wide verges and strong conservation controls. The mature, well-treed gardens reward careful long-term care within the estate's planting and boundary conventions." },
  farnborough: { areas: ["Farnborough Village", "the High Street", "Green Street Green", "Locksbottom"], nearby: ["Orpington", "Downe", "Keston", "Chelsfield"], about: "Farnborough (BR6) keeps a village character on the southern edge of Orpington, with family homes and larger village-edge plots backing onto open Kent countryside. The rural fringe means bigger boundaries, hedges and mature trees to keep in order." },
  farningham: { areas: ["the village", "the Darent bridge", "Sparepenny Lane", "Eynsford edge"], nearby: ["Eynsford", "Horton Kirby", "South Darenth", "Swanley"], about: "Farningham (DA4) is a small Darent-valley village of period cottages and larger country plots either side of the river. Riverside ground and country gardens define the work, with mature planting and long boundaries the norm." },
  fulham: { areas: ["Fulham Broadway", "Parsons Green", "Fulham Palace Road", "Sands End"], nearby: ["Chelsea", "Hammersmith", "Putney (across the river)", "West Kensington"], about: "Fulham (SW6) is a densely built grid of bay-fronted Victorian terraces between Parsons Green and the river. Gardens are walled London rears, often narrow, where the priority is a neat, green, well-kept space close to the house." },
  greenwich: { areas: ["Greenwich town centre", "the Park", "West Greenwich", "Maze Hill"], nearby: ["Blackheath", "Deptford", "Charlton", "Lewisham"], about: "Greenwich (SE10) pairs a World Heritage riverside and royal park with period terraces and larger Georgian homes on the slopes above. Conservation setting and mature planting mean sympathetic, considered upkeep across the area." },
  hammersmith: { areas: ["Brackenbury Village", "Ravenscourt Park", "the riverside", "Shepherd's Bush edge"], nearby: ["Fulham", "Chiswick", "Shepherd's Bush", "Barons Court"], about: "Hammersmith (W6) mixes Victorian terraces around Brackenbury and Ravenscourt Park with a busy riverside and town centre. Gardens are mostly small courtyards and rears, so the work is making compact, enclosed spaces green and tidy." },
  "horton-kirby": { areas: ["the village", "the Darent valley", "Franks Lane", "South Darenth edge"], nearby: ["South Darenth", "Farningham", "Eynsford", "Dartford"], about: "Horton Kirby (DA4) is a Darent-valley village of period homes and larger rural plots, with the river and open farmland close at hand. The country setting brings bigger boundaries, orchards and established trees into the work." },
  kensington: { areas: ["Kensington High Street", "Holland Park edge", "communal garden squares", "Church Street"], nearby: ["Notting Hill", "Chelsea", "Holland Park", "South Kensington"], about: "Kensington (W8, SW7) is a grand address of stucco townhouses, communal garden squares and walled courtyards. Much of the outdoor space is shared square gardens and small private terraces, all held to a high standard of finish." },
  knockholt: { areas: ["Knockholt Pound", "the village", "Chevening edge", "Halstead side"], nearby: ["Halstead", "Badgers Mount", "Chevening", "Sevenoaks"], about: "Knockholt (TN14) is one of the highest villages in the area, set among large country homes on rural North Downs plots. Exposed, elevated ground and long boundaries mean the work here is substantial country-garden care." },
  lambeth: { areas: ["Kennington", "Vauxhall", "Waterloo edge", "the Albert Embankment"], nearby: ["Southwark", "Brixton", "Stockwell", "Waterloo"], about: "Lambeth (SE11) around Kennington and Vauxhall is a dense inner-London mix of Georgian and Victorian terraces, small courtyards and estates. Space is tight and often shaded, so the focus is on smart, low-maintenance planting that suits city gardens." },
  mottingham: { areas: ["Mottingham village", "the SE9 estates", "Grove Park edge", "Eltham side"], nearby: ["Eltham", "Chislehurst", "New Eltham", "Grove Park"], about: "Mottingham (SE9) is a settled suburb of family homes and larger inter-war plots between Eltham and Chislehurst. Gardens are generally roomy and level, well suited to a regular maintenance routine through the year." },
  "new-eltham": { areas: ["New Eltham station", "Avery Hill", "Pope Street", "Sidcup edge"], nearby: ["Eltham", "Sidcup", "Mottingham", "Avery Hill"], about: "New Eltham (SE9) is a 1930s suburb of bay-fronted family homes on tidy plots near Avery Hill Park. The regular garden sizes and clear boundaries here lend themselves to a straightforward, dependable seasonal rhythm." },
  norwood: { areas: ["West Norwood", "Upper Norwood", "Gipsy Hill", "Tulse Hill edge"], nearby: ["Crystal Palace", "Streatham", "Dulwich", "Sydenham"], about: "Norwood (SE27, SE19) climbs the ridge from West Norwood up towards Crystal Palace, so many streets are hillside terraces on sloping plots. The gradient and the mature street trees shape the terracing and planting across the area." },
  "notting-hill": { areas: ["Portobello Road", "Ladbroke Grove", "the garden squares", "Westbourne Grove"], nearby: ["Kensington", "Holland Park", "Bayswater", "Ladbroke Grove"], about: "Notting Hill (W11) is famous for its stucco townhouses and shared communal garden squares behind the crescents. The private spaces are small terraces and courtyards, kept immaculate to match the setting." },
  orpington: { areas: ["Orpington High Street", "Petts Wood edge", "Crofton", "St Mary Cray", "Goddington"], nearby: ["Petts Wood", "Farnborough", "Chelsfield", "St Mary Cray"], about: "Orpington (BR6, BR5) is a large south-east suburb of family homes and roomy suburban plots stretching towards the Kent countryside. The generous, level gardens here suit both regular maintenance and larger seasonal projects." },
  sevenoaks: { areas: ["Sevenoaks High Street", "Knole Park", "Riverhead", "Kippington"], nearby: ["Riverhead", "Otford", "Westerham", "Knockholt"], about: "Sevenoaks (TN13) is a Kent market town beside Knole Park, known for large country homes on established, well-treed plots. The scale of the gardens and the parkland setting call for proper long-term horticultural care." },
  sidcup: { areas: ["Sidcup High Street", "Foots Cray", "Lamorbey", "Blackfen edge"], nearby: ["Bexley", "New Eltham", "Chislehurst", "Blackfen"], about: "Sidcup (DA14, DA15) is a settled suburb of 1930s family homes on well-defined plots around Lamorbey and Foots Cray. The consistent garden sizes and level ground make it ideal for a regular, tidy maintenance schedule. Our registered office is in Sidcup, so it is very much a home patch." },
  "south-darenth": { areas: ["the village", "the Darent riverside", "Horton Kirby edge", "Sutton at Hone side"], nearby: ["Horton Kirby", "Farningham", "Sutton at Hone", "Dartford"], about: "South Darenth (DA4) is a riverside village in the Darent valley, with period homes and plots running down towards the water. The riverside ground and country setting bring damp-tolerant planting and longer boundaries into the work." },
  southwark: { areas: ["Bermondsey", "Borough", "Rotherhithe", "the riverside warehouses"], nearby: ["Lambeth", "Bermondsey", "Rotherhithe", "Borough"], about: "Southwark (SE1, SE16) is inner-London and largely built up, so gardens are courtyard spaces, roof terraces and the planted decks of warehouse conversions. The work is container and terrace planting that suits a dense riverside setting." },
  swanley: { areas: ["Swanley town centre", "Hextable", "White Oak", "Crockenhill edge"], nearby: ["Hextable", "Crockenhill", "Farningham", "Dartford"], about: "Swanley (BR8) is a north-west Kent town of family homes and suburban plots on the edge of the greenbelt. The gardens are generally roomy and level, suited to regular maintenance and straightforward seasonal planting." },
  sydenham: { areas: ["Sydenham High Street", "Mayow Park", "Kirkdale", "Forest Hill edge"], nearby: ["Forest Hill", "Crystal Palace", "Penge", "Catford"], about: "Sydenham (SE26) runs along the hill between Forest Hill and Crystal Palace, with Victorian terraces on sloping plots around Mayow Park. The gradient and the period gardens shape the terracing and planting through the area." },
  westerham: { areas: ["Westerham green", "Hosey Hill", "Crockham Hill", "Brasted edge"], nearby: ["Brasted", "Biggin Hill", "Sevenoaks", "Oxted"], about: "Westerham (TN16) is a historic Kent town below the North Downs, surrounded by large country homes and hillside plots. The sloping, rural ground and mature boundaries make this substantial country-garden work." },
};

/** Editorial detail for a town (areas, nearby, about), or null if none authored. */
export function townDetail(slug: string): TownDetail | null {
  return TOWN_DETAIL[slug] ?? null;
}

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
