/**
 * The five free Household "doors" (personas). ONE data file drives ONE template
 * (`PersonaPage`) for every /household/[role] page. Copy + funnel config here;
 * layout in PersonaPage.tsx. Built from PERSONA-ROOM-PAGES-HANDOVER.md, adapted
 * to the House of HoWA site (routes, palette, existing GA click-delegate).
 *
 * Hard brand rules (see handover §6):
 *  - Never write "AI" in visible copy. Allowed ONLY in metaTitle/metaDescription.
 *  - No em/en dashes anywhere. Commas only.
 *  - Every free tool reaches a SAVE moment. No dead ends.
 */

export type ToolKind = "photo" | "upload" | "paste" | "document" | "address";
export type PersonaResultLine = { k: string; v: string };

export type Persona = {
  slug: string;
  name: string;
  short: string;
  room: string;
  accent: string;

  // HERO
  heroTitle: string;
  heroBody: string;
  duty: string;
  toolCta: string;
  toolKind: ToolKind;
  toolHint: string;

  // SCRIPTED TOOL RESULT (demonstration; swap for a real API later)
  resultHeading: string;
  resultLines: PersonaResultLine[];
  resultNote: string;
  saveCta: string;
  saveMemoryLine: string;

  // WANT HANDS / BOOKING
  handsTitle: string;
  handsBody: string;
  handsCta: string;

  // UPSELL to a paid senior
  upsellBody: string;
  upsellCta: string;
  upsellHref: string;

  // GRID CARD
  cardLine: string;
  cardCta: string;

  // ANALYTICS + SEO
  doorTag: string;
  metaTitle: string;
  metaDescription: string;

  // CHIPS + PROFILE
  knows: string[];
  saves: string;
  nextAction: string;
};

export type PersonaFeature = { t: string; d: string };
export type PersonaArt = { colourway: string; motto: string; features: PersonaFeature[] };

/** Where the free-tool / app CTAs route on the House site (the free Assistant tier). */
export const APP_HREF = "/howa/assistant";
/** Where "want hands" booking routes (the ServiceOS booking modal). */
export const BOOK_HREF = "#open-booking-form";
/** Per-persona cutaway-house image. */
export const personaImage = (slug: string) => `/howa/household/${slug}.webp`;

export const PERSONAS: Record<string, Persona> = {
  gardener: {
    slug: "gardener",
    name: "The Gardener",
    short: "Gardener",
    room: "A free Household door",
    accent: "#5f6a49",
    heroTitle: "Your garden knows what it needs. Let The Gardener read it first.",
    heroBody:
      "Photo a bed, a border, a struggling plant or the whole garden. The Gardener tells you what is thriving, what is struggling, and what this season is asking of it.",
    duty: "For the garden that needs reading before it needs doing.",
    toolCta: "Scan the garden",
    toolKind: "photo",
    toolHint: "One photo of a bed, a plant or the whole garden is enough.",
    resultHeading: "Here is what the garden is telling you.",
    resultLines: [
      { k: "Reading", v: "A late-summer border, mostly healthy, with one shrub showing drought stress and early leaf drop." },
      { k: "This season", v: "Water deeply twice a week, deadhead the roses, and hold off feeding until autumn." },
      { k: "Worth doing", v: "A light prune now protects next year's growth; a mulch in October keeps the roots warm." },
    ],
    resultNote: "Guidance, not a site visit. A gardener confirms anything structural or safety related on the day.",
    saveCta: "Save this reading",
    saveMemoryLine: "The Gardener will keep your planting, the season's plan, photos and every visit.",
    handsTitle: "Want hands in the soil?",
    handsBody:
      "Book a gardener who already knows your borders. Your photos and the season's plan travel with the visit, with your consent.",
    handsCta: "Book a gardener",
    upsellBody: "The Gardener reads the season. The Housekeeper makes sure nothing in the garden is ever forgotten.",
    upsellCta: "Employ the Housekeeper",
    upsellHref: "/howa/housekeeper",
    cardLine: "Scan your garden. Learn what is thriving, what is struggling and what the season asks.",
    cardCta: "Scan free",
    doorTag: "gardener",
    metaTitle: "AI Garden Health Check & Seasonal Plan | The Gardener by HoWA",
    metaDescription:
      "Photo a bed, border or struggling plant. Get a plain-English read on what is thriving, what needs help and what this season asks.",
    knows: ["Plants", "Seasons", "Aspect", "Soil clues", "Planting plans", "Visit history"],
    saves: "Garden notes, plant concerns, the seasonal plan and visit history.",
    nextAction: "Care plan, reminder, quote, visit or design brief.",
  },

  handyman: {
    slug: "handyman",
    name: "The Handyman",
    short: "Handyman",
    room: "A free Household door",
    accent: "#b56a5c",
    heroTitle: "Something broken? Let The Handyman read it before anyone is booked.",
    heroBody:
      "Photo the fault, the boiler, the tap, the crack, the fence, the appliance making that noise. The Handyman explains what it likely is, how urgent it may be, and what a fair fix should cost.",
    duty: "For the thing that is broken, dripping, clicking or making people anxious.",
    toolCta: "Photo the fault",
    toolKind: "photo",
    toolHint: "A photo of the fault is enough. If there is danger, call the appropriate professional first.",
    resultHeading: "Here is what the fault may be.",
    resultLines: [
      { k: "Likely cause", v: "Boiler pressure loss, consistent with a slow leak or a failing valve." },
      { k: "Urgency", v: "Not an emergency, but worth booking within a fortnight before winter load." },
      { k: "Fair cost", v: "Typically £90 to £180 for a diagnosis and repair, parts depending." },
    ],
    resultNote: "Guidance, not a formal inspection. Always route gas, electrical and dangerous issues to a qualified professional.",
    saveCta: "Save this issue",
    saveMemoryLine: "The Handyman will keep the repair history, photos, diagnosis, quote and outcome.",
    handsTitle: "Want hands?",
    handsBody: "Book someone who already understands the issue. Your photos and notes travel with the job, with your consent.",
    handsCta: "Book a repair",
    upsellBody: "The Handyman knows what it costs. The Housekeeper makes sure it never surprises you again.",
    upsellCta: "Employ the Housekeeper",
    upsellHref: "/howa/housekeeper",
    cardLine: "Photo a fault. Learn what it likely is, how urgent it feels and what a fair fix might cost.",
    cardCta: "Photo the fault",
    doorTag: "handyman",
    metaTitle: "AI Repair Diagnosis & Fair Cost Check | The Handyman by HoWA",
    metaDescription:
      "Photo a fault, leak, boiler panel or repair issue. Get a plain-English read, urgency and fair-cost range before you book.",
    knows: ["Repairs", "Parts", "Urgency", "Warranties", "Fair-cost ranges", "Contractor context"],
    saves: "Fault photo, likely issue, urgency, quote context and repair history.",
    nextAction: "Book help, save for later, add a warranty or create a reminder.",
  },

  designer: {
    slug: "designer",
    name: "The Designer",
    short: "Designer",
    room: "A free Household door",
    accent: "#8a6f8f",
    heroTitle: "You can picture it. Let The Designer help you see it.",
    heroBody:
      "Send one photo of a room or a garden. The Designer returns a considered direction: mood, palette, materials, planting or layout, something you can actually act on.",
    duty: "For the room or garden you can imagine, but cannot yet see clearly.",
    toolCta: "Send one photo",
    toolKind: "upload",
    toolHint: "One photo of the space as it is today is all The Designer needs to begin.",
    resultHeading: "Here is a direction to begin with.",
    resultLines: [
      { k: "Direction", v: "A calm, warm-neutral scheme that keeps the light and settles the room." },
      { k: "Palette", v: "Chalk-white walls, oak and rush, one deep clay accent for depth." },
      { k: "First move", v: "Change the lighting and the textiles before anything structural; the room shifts at once." },
    ],
    resultNote: "A starting direction, not a full design. A studio develops the detail, drawings and costs.",
    saveCta: "Save this direction",
    saveMemoryLine: "The Designer will keep the direction, palette, supplier notes and every decision as the project grows.",
    handsTitle: "Want it drawn properly?",
    handsBody:
      "Hand this direction to a House studio or an approved maker. The brief, palette and photos travel with it, with your consent.",
    handsCta: "Speak to a studio",
    upsellBody: "The Designer sets the direction. The Housekeeper keeps the project, the suppliers and the decisions in order.",
    upsellCta: "Employ the Housekeeper",
    upsellHref: "/howa/housekeeper",
    cardLine: "Send one photo. A room or garden becomes a considered direction, palette, planting, layout or mood.",
    cardCta: "See yours",
    doorTag: "designer",
    metaTitle: "AI Interior & Garden Design Direction | The Designer by HoWA",
    metaDescription:
      "Send one photo of a room or garden. Get a considered direction, palette and first move you can actually act on.",
    knows: ["Rooms", "Light", "Proportion", "Palette", "Materials", "Planting"],
    saves: "The idea, style direction, design brief and project memory.",
    nextAction: "Save the scheme, speak to a studio, or plan the project.",
  },

  surveyor: {
    slug: "surveyor",
    name: "The Surveyor",
    short: "Surveyor",
    room: "A free Household door",
    accent: "#4d5b6a",
    heroTitle: "The worry at the back of your mind. Let The Surveyor look.",
    heroBody:
      "Photo a crack, a damp patch, a survey note or a builder's quote. The Surveyor returns a calmer, plain-English view of what it might be and what should be checked next.",
    duty: "For the crack, damp patch or quote that sits in the back of your mind.",
    toolCta: "Decode it",
    toolKind: "paste",
    toolHint: "A photo of the crack or damp, or a paste of the quote or survey line, is enough.",
    resultHeading: "Here is a calmer read on it.",
    resultLines: [
      { k: "Likely nature", v: "A fine, stable crack consistent with normal settlement, not active structural movement." },
      { k: "Watch for", v: "Any widening past 3mm, a diagonal spread, or doors starting to stick." },
      { k: "Next step", v: "Photograph it dated and monitor for a season; a surveyor only if it moves." },
    ],
    resultNote: "Guidance, not a structural survey. Anything active, spreading or safety related needs a qualified surveyor.",
    saveCta: "Save this concern",
    saveMemoryLine: "The Surveyor will keep the concern, the evidence, dated photos and the outcome, ready for insurance or sale.",
    handsTitle: "Want a professional eye?",
    handsBody:
      "When it needs a specialist, book the right kind. Your dated evidence and notes travel with the job, with your consent.",
    handsCta: "Arrange a specialist",
    upsellBody: "The Surveyor calms the worry. The Steward watches the house, so worries are caught before they start.",
    upsellCta: "Apply for the Steward",
    upsellHref: "/howa/steward",
    cardLine: "Decode a crack, damp patch, survey note or quote that has been sitting in your head.",
    cardCta: "Decode free",
    doorTag: "surveyor",
    metaTitle: "AI Crack, Damp & Survey Quote Decoder | The Surveyor by HoWA",
    metaDescription:
      "Photo a crack, damp patch or paste a quote. Get a calmer read on what it might be and what to check next.",
    knows: ["Cracks", "Damp", "Movement", "Quotes", "Survey notes", "Risk"],
    saves: "The concern, likely explanation, dated evidence and next step.",
    nextAction: "Monitor it, save the evidence, or arrange the right specialist.",
  },

  archivist: {
    slug: "archivist",
    name: "The Archivist",
    short: "Archivist",
    room: "A free Household door",
    accent: "#8a6f3f",
    heroTitle: "The paperwork that keeps disappearing. Let The Archivist keep it.",
    heroBody:
      "Send one document, a warranty, a certificate, an invoice, a manual. The Archivist turns it into dates, costs, reminders and evidence, filed against your address.",
    duty: "For the paperwork that keeps disappearing.",
    toolCta: "Send one document",
    toolKind: "document",
    toolHint: "One document is enough, a warranty, certificate, invoice, report or manual.",
    resultHeading: "Here is what the document holds.",
    resultLines: [
      { k: "What it is", v: "A boiler service certificate, dated last March, under a manufacturer warranty." },
      { k: "Key dates", v: "The warranty runs to March 2028; the next annual service is due this March." },
      { k: "Worth setting", v: "A reminder six weeks before the service, with the certificate attached." },
    ],
    resultNote: "A first read of the document. Always keep the original for any formal claim or sale.",
    saveCta: "File this document",
    saveMemoryLine: "The Archivist will keep the document, its dates, costs, reminders and where the proof lives.",
    handsTitle: "Want it all gathered?",
    handsBody:
      "Building an evidence pack for a claim, a sale or a handover? The Archivist assembles it in one place, ready to share.",
    handsCta: "Build an evidence pack",
    upsellBody: "The Archivist files the paper. The Housekeeper makes sure nothing ever lapses again.",
    upsellCta: "Employ the Housekeeper",
    upsellHref: "/howa/housekeeper",
    cardLine: "Send one document. Watch it become dates, costs and reminders.",
    cardCta: "Send one document",
    doorTag: "archivist",
    metaTitle: "AI Document, Warranty & Certificate Filing | The Archivist by HoWA",
    metaDescription:
      "Send one document. Watch it become key dates, costs, reminders and evidence, filed against your address.",
    knows: ["Warranties", "Certificates", "Invoices", "Manuals", "Reports", "Dates"],
    saves: "The document, its key dates, costs, reminders and evidence.",
    nextAction: "Set a reminder, attach it to a room or asset, or build an evidence pack.",
  },

  butler: {
    slug: "butler",
    name: "The Butler",
    short: "Butler",
    room: "Staged release",
    accent: "#8a8f7a",
    heroTitle: "The Butler reads the instruments of the home.",
    heroBody:
      "Meters, thermostats, sensors and connected systems each hold a small truth about the home. The Butler learns to read them, explains them in plain language, and, only with your explicit permission, helps operate the systems that support it.",
    duty: "For the home whose systems should be understood before they are automated.",
    toolCta: "See a demonstration",
    toolKind: "address",
    toolHint: "See how a connected home could be read. A demonstration, using clear examples, before anything is connected.",
    resultHeading: "Here is what the instruments might say.",
    resultLines: [
      { k: "Heating", v: "The boiler is cycling more often than the weather explains, worth a look before winter." },
      { k: "Damp risk", v: "Humidity in the north bedroom climbs after showers and is slow to clear." },
      { k: "Energy", v: "Overnight standby draw is higher than the home in use, a saving worth checking." },
    ],
    resultNote: "A demonstration, not a live reading. Nothing is connected or operated without your explicit permission, and the Butler works only with supported systems.",
    saveCta: "Save this demonstration",
    saveMemoryLine: "The Butler will keep readings over time, the permissions you grant and the actions taken, as an audit trail in the Home Record.",
    handsTitle: "Want it set up with you?",
    handsBody:
      "When supported connected systems and installers are ready, the House can help arrange a proper setup, with a named provider and your explicit, revocable permission.",
    handsCta: "Register interest",
    upsellBody: "The Butler reads the instruments. The Steward watches the whole home and, as it grows, includes supported Butler control.",
    upsellCta: "Explore the Steward",
    upsellHref: "/howa/steward",
    cardLine: "Read the instruments of the home and, with permission, help operate supported connected systems.",
    cardCta: "See how it works",
    doorTag: "butler",
    metaTitle: "AI Connected-Home Instruments & Controls | The Butler by HoWA",
    metaDescription:
      "See what a connected home could tell you. The Butler reads instruments, explains them in plain language and, with permission, helps operate supported systems.",
    knows: ["Meters", "Heating", "Sensors", "Energy", "Damp risk", "Permissions"],
    saves: "Readings over time, permissions granted and actions taken.",
    nextAction: "Watch a system, grant a permission, or explore the Steward.",
  },
};

export const PERSONA_ART: Record<string, PersonaArt> = {
  gardener: {
    colourway: "sage and terracotta",
    motto: "Reads. Plans. Tends.",
    features: [
      { t: "Garden reading", d: "What is thriving, what is struggling and why, from a single photo." },
      { t: "Seasonal plans", d: "What the garden needs this month, before it gets away from you." },
      { t: "Plant library", d: "Every plant you grow, identified and remembered, with how to care for it." },
      { t: "Care reminders", d: "Nudges for watering, feeding and pruning, timed to what you actually grow." },
      { t: "Garden journal", d: "Photos, notes and visits kept over time, so the garden's story is never lost." },
    ],
  },
  handyman: {
    colourway: "warm amber ochre",
    motto: "Repairs. Restores. Resolves.",
    features: [
      { t: "Repair diagnosis", d: "A plain-English read of what a fault likely is, from a single photo." },
      { t: "Fair-cost ranges", d: "What a sensible fix should cost, so no quote catches you out." },
      { t: "Warranty matching", d: "Checks whether a repair is still covered before you pay for it." },
      { t: "Repair history", d: "Every fault, quote and fix kept together, against the thing that broke." },
      { t: "Trusted trades", d: "A route to vetted professionals, with your diagnosis already attached." },
    ],
  },
  designer: {
    colourway: "plum and bone",
    motto: "Imagines. Composes. Directs.",
    features: [
      { t: "Direction & mood", d: "A considered starting point for the space, not a hundred confusing options." },
      { t: "Palette & materials", d: "Colours, finishes and textures that will actually sit well together." },
      { t: "Design brief", d: "A clear brief you can hand to a studio, a maker or the House." },
      { t: "Supplier notes", d: "Where the pieces might come from, saved against the project." },
      { t: "Project memory", d: "Every decision, drawing and finish kept, so the home remembers how it was made." },
    ],
  },
  surveyor: {
    colourway: "slate and parchment",
    motto: "Reads. Explains. Reassures.",
    features: [
      { t: "Risk read", d: "A calmer, plain-English view of what the concern might be." },
      { t: "Quote decode", d: "Understand a survey note or a builder's quote before you commit." },
      { t: "Monitoring", d: "Track a crack or damp patch over time with dated photographs." },
      { t: "Evidence pack", d: "Keep the proof together, ready for insurance, a sale or a specialist." },
      { t: "Specialist route", d: "When it needs a professional, the right kind of help, booked through HoWA." },
    ],
  },
  archivist: {
    colourway: "brass and ink",
    motto: "Reads. Files. Remembers.",
    features: [
      { t: "Document capture", d: "One upload becomes a searchable, remembered part of the Home Record." },
      { t: "Key dates", d: "Renewals, expiries and service dates pulled out and turned into reminders." },
      { t: "Warranty notes", d: "What is covered, for how long, and where the proof lives." },
      { t: "Reminders", d: "The home tells you before something lapses, not after." },
      { t: "Evidence packs", d: "Everything gathered for a claim, a sale or a handover, in one place." },
    ],
  },
  butler: {
    colourway: "slate and brass",
    motto: "Reads. Explains. Operates, with permission.",
    features: [
      { t: "Instrument reading", d: "Meters, thermostats and sensors, read and explained in plain language." },
      { t: "Staged release", d: "Demonstration first, then recommendations, then command, only where you allow it." },
      { t: "Permission and control", d: "Nothing is operated without explicit, revocable permission, and only for supported systems." },
      { t: "Audit trail", d: "Readings, permissions and actions kept together in the Home Record." },
      { t: "Steward depth", d: "Deeper connected-home control grows inside the Steward, never implying universal compatibility." },
    ],
  },
};
