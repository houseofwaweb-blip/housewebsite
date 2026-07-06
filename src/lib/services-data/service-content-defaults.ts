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
}

export const SERVICE_CONTENT_DEFAULTS: Record<string, ServiceContentDefault> = {
  gardening: {
    body:
      "Every visit is carried out by a horticulturally trained team who read the garden before they touch it — assessing what should stay, what should go, and what needs care rather than cutting. We work cleanly and quietly, remove green waste through licensed carriers, and leave the space ready for the season ahead. One-off or ongoing, the standard is the same: considered, tidy, and respectful of the home around it.",
    whyChoose: [
      "Horticulturally trained team — we assess, we don't just cut",
      "Licensed waste carriers, responsible disposal as standard",
      "Clean, quiet, and respectful of you and your neighbours",
      "Every visit photographed and filed to your HoWA record",
    ],
  },
  "window-cleaning": {
    body:
      "Pure-water, reach-and-wash cleaning that leaves glass spotless and streak-free — frames and sills included. The team works to a fixed route and a fixed standard, reaching upper floors safely from the ground with no ladders against the house. One-off or on a regular cycle, every visit is logged so you always know when we were last there.",
    whyChoose: [
      "Pure-water reach-and-wash — frames and sills included",
      "Upper floors cleaned safely from the ground, no ladders",
      "Fixed quote by postcode and frontage, no surprises",
      "Every visit logged to your HoWA record",
    ],
  },
  cleaning: {
    body:
      "A thorough, surface-appropriate clean by an insured, vetted team who treat your home as their own. We use House-approved products, work to a room-by-room checklist, and leave everything as it should be — no cut corners, no rushed finish. Book a one-off reset or a regular rhythm; either way the standard holds.",
    whyChoose: [
      "Insured, vetted team, DBS-checked as standard",
      "House-approved products, appropriate to every surface",
      "Room-by-room checklist — nothing missed",
      "Every visit logged to your HoWA record",
    ],
  },
  "gutter-cleaning": {
    body:
      "SkyVac vacuum-pole clearance with camera-guided inspection — front and back elevations cleared of leaves, moss, and debris, safely from the ground. You get a photographic before-and-after of each run and a note of anything that needs watching. No ladders, no mess, no guesswork.",
    whyChoose: [
      "SkyVac clearance from the ground — no ladders",
      "Camera-guided inspection, before-and-after photos",
      "Front and back elevations cleared as standard",
      "Condition report filed to your HoWA record",
    ],
  },
};
