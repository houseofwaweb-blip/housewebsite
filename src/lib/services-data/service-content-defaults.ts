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
      "Every visit photographed, kept in your Home Record where connected",
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
      "A clear quote by postcode and frontage, no surprises",
      "Every visit kept in your Home Record where connected",
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
      "Insured, vetted team as standard",
      "House-standard products, appropriate to every surface",
      "Room-by-room checklist, nothing missed",
      "Every visit kept in your Home Record where connected",
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
      "Downpipe clearing, as not all downpipes are reachable from the ground; quoted where access allows",
      "Anything above second-floor window height, or requiring scaffold",
    ],
    waste: [
      "Debris cleared from the gutters is bagged and removed, included in your quote.",
      "A before-and-after camera inspection is included.",
      "Any repairs found are quoted separately and never carried out without your agreement.",
    ],
  },
  // Finding 15: jet washing and tree work must carry their own scope and time
  // guides, not inherit the garden-maintenance inclusions and gardener estimates.
  "jet-washing": {
    body:
      "Professional pressure washing for hard surfaces, with the technique and pressure matched to each surface so it is cleaned without being damaged. Patios, paths, driveways and decking brought back; walls, which need a gentler approach, are softwashed rather than jet washed. We manage runoff, clear the washings and leave the area rinsed and tidy.",
    whyChoose: [
      "Pressure matched to each surface, no guesswork",
      "Walls softwashed, not blasted",
      "Runoff managed and the area left clean",
      "Washings and debris cleared as part of the job",
    ],
    howLong: [
      { label: "A small patio or short path", time: "Around 1 to 2 hours" },
      { label: "A typical driveway or patio", time: "Around half a day" },
      { label: "A large or heavily soiled area", time: "A full day, sometimes a team of two" },
    ],
    excluded: [
      "Repointing, resealing or resurfacing",
      "Deep stains that will not lift safely",
      "Roof and render cleaning",
      "Work that needs access equipment, quoted separately",
    ],
    waste: [
      "Loosened dirt and washings are cleared and the area rinsed, included in your quote.",
      "Any resealing or resanding you ask for is quoted separately.",
      "Water is drawn from your outdoor tap where available.",
    ],
  },
  "tree-work": {
    body:
      "Careful tree work by trained hands, working to what the tree and the site allow. Crown reduction, thinning, shaping and deadwood removal, and light felling of smaller trees. Larger trees, and anything near a structure or power line, are looked at and quoted after a discussion, with an arborist route where the work needs one.",
    whyChoose: [
      "Trained, insured team working to the tree and the site",
      "Clear limits, larger works quoted after a discussion",
      "An arborist route for complex or high work",
      "Green waste removed by a licensed carrier",
    ],
    howLong: [
      { label: "A single small tree or light deadwooding", time: "A few hours" },
      { label: "Several trees or a larger crown reduction", time: "Around a day, a team of two" },
      { label: "Larger or complex works", time: "Quoted after a site discussion" },
    ],
    excluded: [
      "Trees above 3 metres, or near structures and power lines, until discussed",
      "Stump grinding and removal, quoted separately",
      "Emergency or storm-damage call-outs",
      "Protected trees without the necessary consents",
    ],
    waste: [
      "Green waste and arisings are removed by a licensed carrier, included in your quote.",
      "Logs or chippings can be left for you on request.",
      "Stump grinding is quoted separately.",
    ],
  },
  // Finding 18: end-of-tenancy has its own checklist, an end-of-tenancy time
  // guide (not the regular-clean one), and clear furniture/carpet rules.
  "end-of-tenancy-cleaning": {
    body:
      "A fixed, inventory-standard checklist for the end of a tenancy, so the property is handed back properly and the deposit conversation is straightforward. A deep clean of the kitchen and bathrooms, emptied storage cleaned inside and out, and floors finished throughout.",
    whyChoose: [
      "A fixed end-of-tenancy checklist, cleaned to inventory standard",
      "Kitchen deep clean: oven, hob, extractor, fridge/freezer and cupboards",
      "Emptied units cleaned inside and out",
      "Insured, vetted team",
    ],
    howLong: [
      { label: "A one-bed flat, emptied", time: "Around 3 to 4 hours" },
      { label: "A three-bed house, emptied", time: "Most of a day, often a team of two" },
      { label: "A larger or heavily soiled property", time: "A full day, a team of two" },
    ],
    excluded: [
      "Moving heavy furniture; we clean around anything a single cleaner cannot move safely",
      "Units still holding personal items",
      "Professional carpet cleaning, available at extra cost (standard is vacuuming)",
      "Exterior windows (see Window Cleaning)",
    ],
    waste: [
      "House-standard cleaning products and equipment are included.",
      "Household rubbish is bagged and placed in your bins; we do not remove waste off-site.",
      "Professional carpet cleaning is quoted separately if you want it.",
    ],
  },
};
