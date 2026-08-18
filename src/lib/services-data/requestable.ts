/**
 * The requestable service catalogue.
 *
 * REVISIONS v3 §4 module 3 / §5: the House must present a credible whole-home
 * offer, and where a category is not yet fully configured it must say "Tell us
 * what you need" rather than showing a dead or "coming soon" card.
 *
 * Commercially, that second case is the point of this file. A service we
 * cannot fulfil today is still a real customer with a real intent, so every
 * one of them gets a named landing page and a form. The enquiry lands in
 * Supabase and Klaviyo tagged with the exact service slug, which is what makes
 * the lead segmentable and retargetable later. A "coming soon" card captures
 * nothing.
 *
 * `href`     → where the card goes. Unset means /services/<slug>, which renders
 *              through the same ServiceDetail template as gardening, in quote
 *              mode. There is no separate, lesser page type.
 * `bookable` → whether we can genuinely price and book it today. Only this
 *              controls the "See prices" vs "Request" label. A few services
 *              have a page of their own but are not yet bookable, so `href`
 *              alone must never be read as "we can quote this".
 *
 * The slugs here are the single source of truth for the `serviceType` values
 * accepted by the consultation form. `src/lib/forms/schemas.ts` and
 * `EnquiryForm` both derive their option lists from this file, so adding a
 * service is a one-line change and the three can never drift apart.
 */

export type ServiceGroup =
  | "Garden"
  | "Home"
  | "Exterior"
  | "Moving & clearance"
  | "Trades & specialists";

export interface RequestableService {
  /** Stable slug. Doubles as the `serviceType` value on the enquiry.
   *  Where a service already has a page under /services, the slug MATCHES that
   *  page's slug, so the enquiry form on it prefills correctly. */
  slug: string;
  name: string;
  group: ServiceGroup;
  /** One line, used on cards and as the landing-page standfirst. */
  blurb: string;
  /** Where the card goes. Unset means /services/<slug>. */
  href?: string;
  /**
   * True only where the House can genuinely quote and book this today. Drives
   * the card label: "See prices" vs "Request". Some services have a rich page
   * of their own but are not yet bookable, so `href` alone must not be read as
   * "we can price this" or the labels start lying to customers.
   */
  bookable?: boolean;
  /** Shown on the request page: what we will actually come back with. */
  note?: string;
}

export const REQUESTABLE_SERVICES: readonly RequestableService[] = [
  // ---- Garden ----
  { slug: "gardening", name: "Garden care", group: "Garden", blurb: "Lawns, borders and seasonal upkeep, one-off or on a rhythm.", href: "/services/gardening", bookable: true },
  { slug: "garden-clearance", name: "Garden clearance", group: "Garden", blurb: "Overgrowth cut back, cleared and taken away by a licensed carrier.", href: "/services/gardening/garden-clearance", bookable: true },
  { slug: "hedge-cutting", name: "Hedges and seasonal cutting", group: "Garden", blurb: "Hedges and boundaries cut back to shape while the season allows.", href: "/services/gardening/hedge-and-boundary-maintenance", bookable: true },
  { slug: "planting", name: "Planting and garden improvements", group: "Garden", blurb: "Beds replanted, borders reworked, and plants chosen for the soil.", href: "/services/gardening/planting", bookable: true },
  { slug: "tree-work", name: "Trees and specialist garden work", group: "Garden", blurb: "Pruning, crown reductions and removals by qualified hands.", href: "/services/gardening/tree-work", bookable: true },
  { slug: "lawn-care", name: "Lawn care and turfing", group: "Garden", blurb: "Cutting, edging, feeds, scarifying and new turf laid.", href: "/services/gardening/lawn-care", bookable: true },
  { slug: "landscaping", name: "Landscaping and garden build", group: "Garden", blurb: "Patios, paths, raised beds, steps and the harder structure of a garden.", note: "We will ask for photographs and rough measurements, then arrange a site visit to price it." },
  { slug: "fencing-decking", name: "Fencing and decking", group: "Garden", blurb: "New fencing, repairs, gates and timber decking.", note: "Send photographs and a rough run length and we will come back with an estimate." },
  { slug: "irrigation", name: "Irrigation and garden watering", group: "Garden", blurb: "Automatic watering for beds, pots and lawns.", note: "We will ask about the garden size and water supply before quoting." },
  { slug: "garden-lighting", name: "Garden lighting", group: "Garden", blurb: "Lighting for paths, planting and outdoor rooms.", note: "Usually needs a site visit, and an electrician where it is mains-wired." },

  // ---- Home ----
  { slug: "cleaning", name: "Cleaning and housekeeping", group: "Home", blurb: "Regular, one-off, spring and end-of-tenancy cleaning.", href: "/services/cleaning", bookable: true },
  { slug: "handyman", name: "Handyman and repairs", group: "Home", blurb: "Hourly and half-day visits for the list that never gets done.", href: "/services/handyman", bookable: true },
  { slug: "painting-decorating", name: "Painting and decorating", group: "Home", blurb: "Interior and exterior decorating, prepared properly.", href: "/services/handyman/painting-and-decorating", bookable: true },
  { slug: "oven-cleaning", name: "Oven and appliance cleaning", group: "Home", blurb: "Ovens, hobs, extractors and ranges stripped and cleaned.", note: "Tell us the make and how many appliances and we will come back with a fixed price." },
  { slug: "carpet-upholstery", name: "Carpet and upholstery cleaning", group: "Home", blurb: "Carpets, rugs, sofas and curtains deep cleaned.", note: "We will ask for room sizes or item counts to price it." },
  { slug: "pest-control", name: "Pest control", group: "Home", blurb: "Mice, rats, wasps, moths and the things nobody wants to ring about.", note: "Tell us what you have seen and where, and we will get someone to you quickly." },
  { slug: "plumbing", name: "Plumbing", group: "Home", blurb: "Leaks, taps, toilets, radiators and bathroom work.", note: "Photographs help enormously. Send them and we will tell you what it needs." },
  { slug: "heating-boiler", name: "Heating and boilers", group: "Home", blurb: "Servicing, repairs, gas safety certificates and replacements.", note: "We will ask for the boiler make, model and last service date." },
  // Slug matches the existing /services/energy page so its own enquiry form
  // prefills correctly. Not bookable yet, so the card says "Request".
  { slug: "energy", name: "Electrical work and energy", group: "Home", blurb: "Sockets, lighting, consumer units, fault finding, EICRs and EV charge points.", href: "/services/energy", note: "All electrical work is carried out by a qualified, registered electrician." },
  { slug: "housekeeping", name: "Housekeeping", group: "Home", blurb: "A discreet ongoing presence: laundry, linen, kitchen and the daily order of a home.", href: "/services/housekeeping", note: "Tell us the days and hours you have in mind and the size of the household." },
  { slug: "flooring", name: "Flooring", group: "Home", blurb: "Wood, vinyl, tile and carpet supplied and fitted.", note: "Send room dimensions and what is down now and we will come back with options." },
  { slug: "plastering-tiling", name: "Plastering and tiling", group: "Home", blurb: "Skimming, patching, re-plastering and wall or floor tiling.", note: "Photographs and rough areas let us price this without a first visit." },
  { slug: "damp-proofing", name: "Damp, mould and condensation", group: "Home", blurb: "Diagnosis first, then the work that actually fixes the cause.", note: "We will always look at the cause before quoting for treatment." },
  { slug: "appliance-repair", name: "Appliance repair", group: "Home", blurb: "Washing machines, dishwashers, fridges and ovens.", note: "Tell us the make, model and fault code if there is one." },
  { slug: "locksmith", name: "Locks and security", group: "Home", blurb: "Lock changes, snapped keys, window locks and door security.", note: "If you are locked out right now, call the House rather than filling this in." },

  // ---- Exterior ----
  { slug: "window-cleaning", name: "Window cleaning", group: "Exterior", blurb: "Reach-and-wash exteriors, with interiors on request.", href: "/services/window-cleaning", bookable: true },
  { slug: "gutter-cleaning", name: "Gutter cleaning", group: "Exterior", blurb: "Vacuum-cleared from the ground, with before and after photographs.", href: "/services/gutter-cleaning", bookable: true },
  { slug: "pressure-washing", name: "Pressure and exterior cleaning", group: "Exterior", blurb: "Paths, patios, decking and driveways brought back.", href: "/services/window-cleaning/jet-washing", bookable: true },
  { slug: "softwashing", name: "Softwashing and render cleaning", group: "Exterior", blurb: "Render, cladding and painted masonry cleaned at low pressure.", href: "/services/window-cleaning/softwashing", bookable: true },
  { slug: "gutter-repair", name: "Gutter and downpipe repair", group: "Exterior", blurb: "Leaks, sagging runs, brackets and replacement guttering.", note: "Send photographs of the run and we will tell you whether it needs repair or replacement." },
  { slug: "roofing", name: "Roofing and roof repairs", group: "Exterior", blurb: "Slipped tiles, flashing, flat roofs and leak tracing.", note: "We will ask for photographs from the ground and arrange an inspection." },
  { slug: "chimney-sweep", name: "Chimney sweeping", group: "Exterior", blurb: "Swept, checked and certificated for your insurer.", note: "Tell us the fuel type and when it was last swept." },
  { slug: "driveways", name: "Driveways and paving", group: "Exterior", blurb: "New driveways, resurfacing, edging and drainage.", note: "This needs a site visit. Send photographs and rough dimensions to start." },
  { slug: "solar-cleaning", name: "Solar panel cleaning", group: "Exterior", blurb: "Panels cleaned so they earn what they are supposed to.", note: "We will ask how many panels and the roof height." },

  // ---- Moving & clearance ----
  { slug: "removals", name: "Removals", group: "Moving & clearance", blurb: "Local and longer moves, with packers who handle period interiors carefully.", href: "/services/removals", note: "Tell us where from, where to, and roughly how many rooms." },
  { slug: "packing", name: "Packing and unpacking", group: "Moving & clearance", blurb: "Packed properly at one end, put away at the other.", note: "Usually booked alongside a move, but available on its own." },
  { slug: "storage", name: "Storage", group: "Moving & clearance", blurb: "Short and long-term storage, collected and returned.", note: "We will ask roughly how much and for how long." },
  { slug: "house-clearance", name: "House and loft clearance", group: "Moving & clearance", blurb: "Whole properties, single rooms, lofts and garages cleared.", note: "Photographs are the fastest way to a price. Everything goes to a licensed carrier." },
  { slug: "waste-removal", name: "Waste and rubbish removal", group: "Moving & clearance", blurb: "Single loads taken away without hiring a skip.", note: "Send a photograph of the pile and we will price it by volume." },
  { slug: "man-and-van", name: "Man and van", group: "Moving & clearance", blurb: "Single items, shop collections and local drop-offs.", href: "/services/removals/local-pick-up-drop-off", bookable: true },

  // ---- Trades & specialists ----
  { slug: "pet-care", name: "Pet care and dog walking", group: "Trades & specialists", blurb: "Walkers and sitters who learn the routine and the door code.", href: "/services/pet-care", note: "Tell us the animal, the routine and the days you need covered." },
  { slug: "ev-charger", name: "EV charger installation", group: "Trades & specialists", blurb: "Home charge points, installed and certificated.", note: "We will ask about your consumer unit and where the car parks." },
  { slug: "solar-battery", name: "Solar and home battery", group: "Trades & specialists", blurb: "Generation and storage, sized to how the house actually runs.", note: "We will look at your usage before recommending anything." },
  { slug: "smart-home", name: "Smart home and networking", group: "Trades & specialists", blurb: "Wi-Fi that reaches, plus heating, lighting and door entry that behave.", note: "Tell us the property size and what is already installed." },
  { slug: "security-alarms", name: "Alarms and CCTV", group: "Trades & specialists", blurb: "Intruder alarms, cameras and door entry, installed and maintained.", note: "We will ask what you already have and what you want covered." },
  { slug: "design-interiors", name: "Interior design", group: "Trades & specialists", blurb: "A mapped first direction, then a named human studio.", href: "/design/interiors", bookable: true },
  { slug: "design-gardens", name: "Garden design", group: "Trades & specialists", blurb: "A first concept and indicative budget, then the full plan.", href: "/design/gardens", bookable: true },
] as const;

/** Everything we cannot price today: the lead-capture half of the catalogue. */
export const ENQUIRY_ONLY_SERVICES = REQUESTABLE_SERVICES.filter((s) => !s.bookable);

/** Services the House can price and book today. */
export const BOOKABLE_SERVICES = REQUESTABLE_SERVICES.filter((s) => s.bookable);

export const SERVICE_GROUPS: readonly ServiceGroup[] = [
  "Garden",
  "Home",
  "Exterior",
  "Moving & clearance",
  "Trades & specialists",
];

export function getRequestableService(slug: string): RequestableService | undefined {
  return REQUESTABLE_SERVICES.find((s) => s.slug === slug);
}

/**
 * Every accepted `serviceType` value: the catalogue slugs plus the values the
 * consultation form has always carried that are not services in the catalogue
 * sense. Typed as a non-empty tuple so `z.enum()` accepts it directly, which
 * keeps the API schema and the form select in lockstep with this file.
 */
export const SERVICE_TYPE_VALUES = [
  "general",
  "protect",
  ...REQUESTABLE_SERVICES.map((s) => s.slug),
] as [string, ...string[]];
