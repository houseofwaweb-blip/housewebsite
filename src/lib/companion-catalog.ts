import type { ScanRevealData, ScanField } from "@/components/companion/ScanReveal";

/**
 * House Companion feature catalog. One canonical page per route
 * (/house-companion/[feature]), built in the exact grammar of the HoWA product
 * site's ai/[feature] pages: hero (with the drawn sketch-over-photo image) ->
 * four-part contract + animated scan reveal -> boundary -> sibling routes ->
 * hand-off. Data-driven so every route reads the same and links the same.
 *
 * Directive §09/§10 — four routes: Care and Repair, Garden Design, Home and
 * Interior Design, Whole Home. Whole Home is a direct route into HoWA, so it is
 * a nav link (/howa) rather than a scan page and is not in this catalog.
 *
 * CTA model (kept unambiguous, per the "what is the difference" review):
 *  - Repair is a FIX, so it leads with "Book a repair" (a House service).
 *  - Garden and Interior are DESIGNS, so they lead with "Commission a … design"
 *    (create the scheme via the Design product / a House Approved studio). The
 *    secondary is a clearly-different lighter House service, never a synonym.
 */

export type CompanionFeature = {
  slug: string;
  navLabel: string;
  eyebrow: string;
  headline: string;
  headlineEm: string;
  intro: string;
  heroImage: { src: string; alt: string; aspect: string };
  /** Four-part contract (directive §10 value-before-account). */
  give: string;
  returns: string;
  saved: string;
  routes: string;
  boundary: string;
  /** Primary = the natural next step for this route. Secondary = a different-in-kind option. */
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  reveal: { data: ScanRevealData; fields: ScanField[] };
  /** Optional House Companion app screen for this route (breaks up the page). */
  appImage?: { src: string; alt: string; caption: string; w: number; h: number };
  /** Optional "the redesign, rendered" image, shown contained (not full width). */
  addonImage?: { src: string; alt: string; eyebrow: string; heading: string; headingEm: string; caption: string; aspect: string };
  /** Optional sketched directions, shown in a contained 2x2 grid. */
  sketches?: { src: string; alt: string; label: string }[];
  /** Heading + blurb for the sketch grid (design vs repair read differently). */
  sketchLead?: { kicker: string; title: string; titleEm: string; blurb: string };
};

export const COMPANION_FEATURES: CompanionFeature[] = [
  {
    slug: "repair",
    navLabel: "Care or repair",
    eyebrow: "Fix or repair · House Companion powered by HoWA",
    headline: "Show us the problem.",
    headlineEm: "See what it needs.",
    intro:
      "Photograph a fault, a mark, a leak or a damaged item. House Companion reads the likely issue, its urgency and the right professional route, then prepares the brief so the House team arrives informed.",
    heroImage: {
      src: "/powered-by-howa/companion-repair-hero.png",
      alt: "A hand holding a phone running House Companion with a repair scan ready: a broken chair diagnosed and the repair projected over it, showing the loose joint, split timber and the fix to restore strength.",
      aspect: "16/9",
    },
    give: "A photo of the fault, where it is and how urgent it feels.",
    returns: "The likely issue, its urgency, an indicative cost and a job brief.",
    saved: "The fault, assessment and brief, held with your address in HoWA.",
    routes: "Book a House repair, or a House Approved trade where verification is needed.",
    boundary:
      "Initial guidance to help you act, not a structural survey, gas inspection or emergency service. A named provider confirms scope and price before any work.",
    primaryLabel: "Book a repair",
    primaryHref: "/services/handyman",
    secondaryLabel: "See all House services",
    secondaryHref: "/services",
    appImage: {
      src: "/powered-by-howa/companion-repair-app.png",
      alt: "The House Companion app showing a repair scan ready, with a problem and fixed view of a damp corner and a Scan a problem action.",
      caption: "Scan a problem in the House Companion app and see what it is, before and after, with the best service matched for your home.",
      w: 940,
      h: 2025,
    },
    sketches: [
      { src: "/powered-by-howa/companion-sketch-repair-1.png", alt: "A loose chair diagnosed and a repair proposed: reattach the front leg with stronger fixings, reinforce the joint block and realign the legs.", label: "A loose chair leg" },
      { src: "/powered-by-howa/companion-sketch-repair-2.png", alt: "A table with a failed leg joint diagnosed and a repair proposed: reattach the leg with stronger fixings and reinforce the corner block.", label: "A failed table joint" },
      { src: "/powered-by-howa/companion-sketch-repair-3.png", alt: "A crooked hanging frame diagnosed and a repair proposed: resecure the wall fixing, check the hanging wire and level the frame.", label: "A crooked frame" },
      { src: "/powered-by-howa/companion-sketch-repair-4.png", alt: "A damaged fence panel diagnosed and a repair proposed: replace the panel with new timber and secure it to the posts with galvanised fixings.", label: "A damaged fence panel" },
    ],
    sketchLead: { kicker: "A few examples", title: "See the fix,", titleEm: "before the visit.", blurb: "A sample of how House Companion reads a fault and sketches the repair over it, so you can see what putting it right involves before anyone comes out." },
    addonImage: {
      src: "/powered-by-howa/companion-repair-scan.png",
      alt: "A hand holding a phone running the House Companion repair scan, pointed at a broken chair and marking the fault straight over it: repair and refit the leg, the loose joint and the split timber.",
      eyebrow: "Point and scan",
      heading: "It reads what is",
      headingEm: "actually wrong.",
      caption: "Point House Companion at the problem and it reads the fault through the camera, marking what has failed and the repair straight over it, so you know what is wrong before anyone comes out.",
      aspect: "16/9",
    },
    reveal: {
      data: {
        productName: "House Companion · Repair",
        source: "Photo + Home Record",
        confidence: "Moderate",
        statusScanning: "HoWA · scanning",
        statusResolved: "Assessed",
        image: "/powered-by-howa/ai-repair-scan.png",
        imageAlt: "A home fault being read for an initial assessment",
        imageLabel: "A reported fault",
        pins: ["Corrosion", "Damp trace", "Worn seal"],
        scanCaption: "Scanning the fault",
        resolveCaption: "Reading the fault",
        finalCaption: "Your repair scan",
        disclaimer:
          "A sample assessment and indicative estimate, not a definitive diagnosis or a binding quote. A named provider confirms scope and price.",
        continueLabel: "Book a repair →",
        continueHref: "/services/handyman",
      },
      fields: [
        { kind: "text", label: "The problem", value: "A corroded radiator valve, with damp beginning to track into the skirting." },
        { kind: "chips", label: "How big it is", items: ["Localised", "Urgency: within days", "Water risk: medium"] },
        { kind: "chips", label: "Likely cause", items: ["Failed valve seal", "A slow weep over time"] },
        { kind: "chips", label: "Materials and parts", items: ["Thermostatic valve", "PTFE tape", "System inhibitor", "Bleed key"] },
        { kind: "metric", label: "Indicative cost", lo: 120, hi: 280, prefix: "£", note: "An indicative range, not a binding quote." },
        { kind: "brief", label: "The job brief", lines: [
          "Isolate and drain the affected circuit before removing the valve.",
          "Fit a new valve, re-tape the joints and refill with inhibitor.",
          "Dry and monitor the skirting so damp does not track further.",
          "A competent or Gas Safe engineer confirms scope and price on site.",
        ] },
      ],
    },
  },

  {
    slug: "garden",
    navLabel: "Design a garden",
    eyebrow: "Design a garden · House Companion powered by HoWA",
    headline: "Scan the garden.",
    headlineEm: "Shape the feeling.",
    intro:
      "Tell House Companion how you want the garden to live and feel. It reads the zones and character, then shapes a first concept, a planting and materials direction and an indicative budget you own.",
    heroImage: {
      src: "/powered-by-howa/companion-garden-redesign.png",
      alt: "A hand holding a phone running House Companion, with a full garden redesign projected over the real garden: pleached trees, a hard-wearing lawn, mixed seasonal planting, sandstone paving and layered lighting.",
      aspect: "16/9",
    },
    give: "A photo of the garden and how you want it to live and feel.",
    returns: "A first concept, zones, a planting and materials direction and a budget.",
    saved: "The garden concept, decisions and project, held with your address in HoWA.",
    routes: "Commission a House Approved garden design, or book routine garden care.",
    boundary:
      "A sample first concept and indicative budget, not a measured survey or binding quote. A House Approved garden studio confirms scope and price on a visit.",
    primaryLabel: "Commission a garden design",
    primaryHref: "/design/gardens",
    secondaryLabel: "Book garden care",
    secondaryHref: "/services/gardening",
    appImage: {
      src: "/powered-by-howa/companion-garden-app.png",
      alt: "The House Companion app showing a garden redesign ready, with a before and after of the outdoor space and a Scan your garden action.",
      caption: "Scan your garden in the House Companion app and see its potential, before and after, tailored to your home.",
      w: 941,
      h: 1672,
    },
    sketches: [
      { src: "/powered-by-howa/companion-sketch-garden-1.png", alt: "A garden redrawn over the space: a pergola and seating, seasonal structure, new layered planting and defined borders.", label: "A garden, redrawn" },
      { src: "/powered-by-howa/companion-sketch-garden-4.png", alt: "A cottage garden redrawn over the space: a specimen tree, flowering climbers, a curved path to an arbour seat and layered cottage planting.", label: "A cottage garden, redrawn" },
      { src: "/powered-by-howa/companion-sketch-garden-2.png", alt: "A courtyard redrawn over the space: a specimen tree focal point, a timber screen with climbers, built-in bench seating and gravel with stepping zones.", label: "A courtyard, redrawn" },
      { src: "/powered-by-howa/companion-sketch-garden-3.png", alt: "A terrace redrawn over the space: an olive tree focal point, a water bowl, built-in seating and a gravel entertaining terrace.", label: "A terrace, redrawn" },
    ],
    sketchLead: { kicker: "A few directions", title: "See the garden,", titleEm: "redrawn.", blurb: "A sample of how House Companion sketches the garden over what is already there, so the direction is easy to picture before anything is planted." },
    addonImage: {
      src: "/powered-by-howa/companion-garden-hero.png",
      alt: "A hand holding a phone running the House Companion garden design scan, reading an overgrown garden and drawing the design straight over it.",
      eyebrow: "Point and scan",
      heading: "It reads the garden",
      headingEm: "you already have.",
      caption: "Point House Companion at the garden and it reads the space through the camera, drawing the design straight over what is there, so the change is easy to picture before anything is planted.",
      aspect: "16/9",
    },
    reveal: {
      data: {
        productName: "House Companion · Garden",
        source: "Photo + Home Record",
        confidence: "Moderate",
        statusScanning: "HoWA · scanning",
        statusResolved: "Designed",
        image: "/powered-by-howa/ai-garden-scan.png",
        imageAlt: "A garden being read for a first concept, planting and indicative budget",
        imageLabel: "A garden · scanned",
        pins: ["Terrace", "Lawn", "Deep border"],
        scanCaption: "Scanning the garden",
        resolveCaption: "Reading the garden",
        finalCaption: "Your first concept",
        disclaimer:
          "A sample first concept and indicative budget, not a botanical diagnosis, measured survey or binding quote. A named garden studio confirms scope and price.",
        continueLabel: "Commission a garden design →",
        continueHref: "/design/gardens",
      },
      fields: [
        { kind: "text", label: "The garden", value: "A 9m by 14m garden worked from a dining terrace, across a clean lawn, to deep borders at the boundary." },
        { kind: "chips", label: "Zones", items: ["Terrace dining", "Lawn", "Deep borders"] },
        { kind: "swatches", label: "Materials and planting", items: [
          { name: "Sandstone", hex: "#c9bba3", note: "Sawn paving" },
          { name: "Corten", hex: "#8a5a3b", note: "Steel edging" },
          { name: "Yew", hex: "#3b4a34", note: "Structure" },
          { name: "Birch", hex: "#d9d2c4", note: "Multi-stem" },
          { name: "Lavender", hex: "#7e7ba6", note: "Planting" },
        ] },
        { kind: "metric", label: "Indicative budget", lo: 12000, hi: 28000, prefix: "£", note: "An indicative range for design and build, not a quote." },
        { kind: "brief", label: "The concept", lines: [
          "A calm, low-maintenance garden that works from the terrace to the back boundary.",
          "A sandstone terrace for dining, a clean lawn, and deep borders for year-round structure.",
          "Naturalistic planting in yew, grasses and lavender, held with corten edging.",
          "Built to mature well and ask little to stay right.",
        ] },
      ],
    },
  },

  {
    slug: "room",
    navLabel: "Design a room or home",
    eyebrow: "Design a room or home · House Companion powered by HoWA",
    headline: "Scan the room.",
    headlineEm: "Build the scheme.",
    intro:
      "Show House Companion how the space should feel and work. It learns what you love, what you reject and how the room must function, then shapes a first direction, palette and budget you own.",
    heroImage: {
      src: "/powered-by-howa/companion-interior-hero.png",
      alt: "A hand holding a phone running House Companion, with a full interior redesign projected into the real room: built-in shelving, a fireplace feature wall, layered lighting, wall panelling, soft furnishings and accent seating.",
      aspect: "16/9",
    },
    give: "A photo of the room, how it must work and the feeling you want.",
    returns: "A first direction, palette, layout, indicative budget and a brief.",
    saved: "Your taste, decisions and the room project, held with your address in HoWA.",
    routes: "Commission a House Approved interior design, or book a House service.",
    boundary:
      "A sample first direction, not a fixed specification. Chosen and rejected options stay with the project so your taste is not forgotten.",
    primaryLabel: "Commission an interior design",
    primaryHref: "/design/interiors",
    secondaryLabel: "Book a House service",
    secondaryHref: "/services",
    appImage: {
      src: "/powered-by-howa/companion-interior-app.png",
      alt: "The House Companion app showing an interior redesign ready, with a before and after of a living room and a Scan your room action.",
      caption: "Scan your room in the House Companion app and see how it can be reimagined, before and after, tailored to your home.",
      w: 941,
      h: 1672,
    },
    sketches: [
      { src: "/powered-by-howa/companion-sketch-room-1.png", alt: "A bedroom redrawn over the room: layered lighting, built-in joinery, an upholstered headboard and a textured rug.", label: "A bedroom, redrawn" },
      { src: "/powered-by-howa/companion-sketch-room-4.png", alt: "A living room redrawn over the room: built-in joinery, a curved sofa, a statement coffee table and layered lighting.", label: "A living room, redrawn" },
      { src: "/powered-by-howa/companion-sketch-room-3.png", alt: "A bathroom redrawn over the room: a freestanding bath, a walk-in shower, a shower niche and a floating vanity.", label: "A bathroom, redrawn" },
      { src: "/powered-by-howa/companion-sketch-room-2.png", alt: "A study redrawn over the room: built-in joinery, task lighting, a pinboard wall and a reading corner.", label: "A study, redrawn" },
    ],
    sketchLead: { kicker: "A few directions", title: "See the room,", titleEm: "redrawn.", blurb: "A sample of how House Companion sketches the room over what is already there, so the direction is easy to picture before anything is bought." },
    addonImage: {
      src: "/powered-by-howa/companion-interior-scan.png",
      alt: "A hand holding a phone running the House Companion interior design scan, reading an empty room and drawing a furnished scheme straight over it.",
      eyebrow: "Point and scan",
      heading: "It reads the room",
      headingEm: "you already have.",
      caption: "Point House Companion at the room and it reads the space through the camera, drawing the scheme straight over what is there, so you can picture the change before anything moves.",
      aspect: "16/9",
    },
    reveal: {
      data: {
        productName: "House Companion · Interior",
        source: "Photo + Home Record",
        confidence: "Moderate",
        statusScanning: "HoWA · scanning",
        statusResolved: "Designed",
        image: "/design/interiors/project-living-room.webp",
        imageAlt: "A living room being read for a first design direction",
        imageLabel: "A living room · London",
        pins: ["Conversation", "Reading nook", "Media wall"],
        scanCaption: "Scanning the room",
        resolveCaption: "Reading the room",
        finalCaption: "Your first direction",
        disclaimer:
          "A sample first direction and indicative budget, not a fixed specification or binding quote. A House Approved studio confirms scope and price.",
        continueLabel: "Commission an interior design →",
        continueHref: "/design/interiors",
      },
      fields: [
        { kind: "text", label: "The room", value: "A living room with good light, worked around conversation, a reading nook and a media wall." },
        { kind: "chips", label: "Zones", items: ["Conversation", "Reading nook", "Media wall"] },
        { kind: "swatches", label: "Palette", items: [
          { name: "Clay", hex: "#b7a08b", note: "Plaster paint" },
          { name: "Oak", hex: "#9c7a4e", note: "Natural" },
          { name: "Flax", hex: "#d8cdb8", note: "Linen" },
          { name: "Aged brass", hex: "#a8894f", note: "Fittings" },
          { name: "Ink", hex: "#2c3038", note: "Accent" },
        ] },
        { kind: "metric", label: "Indicative budget", lo: 9000, hi: 13500, prefix: "£", note: "An indicative range for the scheme, not a quote." },
        { kind: "brief", label: "The brief", lines: [
          "A calm, plaster-toned scheme that lets the room's light do the work.",
          "Furniture re-planned around conversation, with a quiet reading nook by the window.",
          "Natural oak, flax linen and aged brass: warm, and made to wear well.",
          "A media wall built into joinery, not bolted on.",
        ] },
      ],
    },
  },
];

export function getCompanionFeature(slug: string): CompanionFeature | undefined {
  return COMPANION_FEATURES.find((f) => f.slug === slug);
}
