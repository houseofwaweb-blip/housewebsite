/**
 * Service-level content defaults for sub-service pages.
 *
 * Most sub-services only carry a name + lede. To keep every
 * /services/[slug]/[sub] page rendering the same complete flow
 * (About → Why choose → What's included → From the work → FAQ), each
 * sub-service inherits from its parent service:
 *   - `included` + `faq`  → from the parent Service data (real content)
 *   - `body` + `whyChoose` → from the defaults below (the parent Service type
 *                            doesn't carry these, so they live here)
 *
 * A sub-service's own `body` / `whyChoose` / `included` / `faq` always take
 * precedence when present. These are service-level standards, so sharing them
 * across a service's sub-pages is correct, not filler.
 */

export interface ServiceContentDefault {
  body: string;
  whyChoose: string[];
  /** §16 "How long do I need?" — operational duration examples. */
  howLong?: { label: string; time: string }[];
  /** §16 "What isn't included" — explicit exclusions. */
  excluded?: string[];
  /** §16 "Waste & materials" — what's included, what's extra. */
  waste?: string[];
}

export const SERVICE_CONTENT_DEFAULTS: Record<string, ServiceContentDefault> = {
  gardening: {
    body:
      "Every visit is carried out by a horticulturally trained team who read the garden before they touch it, assessing what should stay, what should go, and what needs care rather than cutting. We work cleanly and quietly, remove green waste through licensed carriers, and leave the space ready for the season ahead. One-off or ongoing, the standard is the same: considered, tidy, and respectful of the home around it.",
    whyChoose: [
      "Horticulturally trained team, we assess, we don't just cut",
      "Licensed waste carriers, responsible disposal as standard",
      "Clean, quiet, and respectful of you and your neighbours",
      "Every visit photographed and filed to your Home Record",
    ],
    howLong: [
      { label: "A small courtyard or front garden", time: "Around half a day, one gardener" },
      { label: "An average family garden that has got away from you", time: "A full day, a team of two" },
      { label: "A large or heavily overgrown garden", time: "Two or more visits, a team of two" },
    ],
    excluded: [
      "Tree surgery or any work above two storeys",
      "Stump removal and heavy machinery",
      "Hard landscaping, paving and construction",
      "Chemical weed treatment unless agreed in advance",
    ],
    waste: [
      "Green waste from the visit is removed and disposed of through licensed carriers, included in your quote.",
      "A separate charge applies only for exceptional volumes, always agreed with you before we start.",
      "Plants, bulbs and materials you ask us to supply are quoted separately.",
    ],
  },
  "window-cleaning": {
    body:
      "Pure-water, reach-and-wash cleaning that leaves glass spotless and streak-free, frames and sills included. The team works to a fixed route and a fixed standard, reaching upper floors safely from the ground with no ladders against the house. One-off or on a regular cycle, every visit is logged so you always know when we were last there.",
    whyChoose: [
      "Pure-water reach-and-wash, frames and sills included",
      "Upper floors cleaned safely from the ground, no ladders",
      "Fixed quote by postcode and frontage, no surprises",
      "Every visit logged to your Home Record",
    ],
    howLong: [
      { label: "A terraced or flat frontage", time: "Around 30 to 45 minutes" },
      { label: "A typical semi-detached home", time: "Around 45 to 60 minutes" },
      { label: "A large detached home", time: "An hour or more, sometimes a team of two" },
    ],
    excluded: [
      "Internal glass unless booked as an add-on",
      "Conservatory roofs and glass above three storeys",
      "Painting, sealing or repair of frames",
      "Removal of paint, render or builders' residue",
    ],
    waste: [
      "Pure water and all equipment are included in your quote.",
      "There is no waste to dispose of, the reach-and-wash system uses filtered water only.",
      "No materials charge applies to standard window cleaning.",
    ],
  },
  cleaning: {
    body:
      "A thorough, surface-appropriate clean by an insured, vetted team who treat your home as their own. We use House-standard products, work to a room-by-room checklist, and leave everything as it should be, no cut corners, no rushed finish. Book a one-off reset or a regular rhythm; either way the standard holds.",
    whyChoose: [
      "Insured, vetted team, DBS-checked as standard",
      "House-standard products, appropriate to every surface",
      "Room-by-room checklist, nothing missed",
      "Every visit logged to your Home Record",
    ],
    howLong: [
      { label: "A one-bed flat, regular clean", time: "Around 2 hours" },
      { label: "A three-bed house, regular clean", time: "Around 3 hours" },
      { label: "A deep or one-off clean", time: "Half to a full day, sometimes a team of two" },
    ],
    excluded: [
      "Exterior windows (see Window Cleaning)",
      "Clearing clutter or hoarded spaces",
      "Moving heavy furniture or lifting hazards",
      "Specialist stain, mould or biohazard removal",
    ],
    waste: [
      "House-standard cleaning products and equipment are included.",
      "Household rubbish is bagged and placed in your bins; we do not remove waste off-site.",
      "Specialist products you request are quoted separately.",
    ],
  },
  "gutter-cleaning": {
    body:
      "SkyVac vacuum-pole clearance with camera-guided inspection, front and back elevations cleared of leaves, moss, and debris, safely from the ground. You get a photographic before-and-after of each run and a note of anything that needs watching. No ladders, no mess, no guesswork.",
    whyChoose: [
      "SkyVac clearance from the ground, no ladders",
      "Camera-guided inspection, before-and-after photos",
      "Front and back elevations cleared as standard",
      "Condition report filed to your Home Record",
    ],
    howLong: [
      { label: "A terraced or semi frontage", time: "Around 45 minutes" },
      { label: "A typical detached home, front and back", time: "Around an hour" },
      { label: "A large home, or blocked and heavily soiled gutters", time: "An hour or more" },
    ],
    excluded: [
      "Gutter repair, resealing or replacement",
      "Roof tile or fascia repair",
      "Downpipe excavation below ground",
      "Work above three storeys or requiring scaffold",
    ],
    waste: [
      "Debris cleared from the gutters is bagged and removed, included in your quote.",
      "A before-and-after camera inspection is included.",
      "Any repairs found are quoted separately and never carried out without your agreement.",
    ],
  },
};
