/**
 * HoWA scan/feature catalog. Master brief §05.6 / §06.
 *
 * Literal capability names, no personas (§04). Each feature carries the §06
 * four-part card contract (give / return / saved / routes), an availability
 * label (§06), and a boundary note so indicative output is never presented as a
 * definitive diagnosis or binding quote (§06 safety).
 *
 * Customer-facing names drop the literal word "AI" per House brand. Single
 * source of truth for the scan features used across the HoWA pages.
 */

export type ScanStatus = "Available" | "Beta" | "Partner pilot" | "Coming next";

export type ScanFeature = {
  slug: string;
  name: string;
  status: ScanStatus;
  /** The clear outcome headline used as the page h1, so it leads with what you
   *  get, not the feature label. */
  outcomeHeadline: string;
  /** §06 customer promise. */
  promise: string;
  /** §05.6 input. */
  give: string;
  /** §05.6 useful output. */
  returns: string;
  /** §06 saved objects. */
  saved: string;
  /** §06 action routes (who fulfils them). */
  routes: string;
  /** §06 boundary: where the output is indicative, not definitive. */
  boundary: string;
  /** Art-direction brief for the feature-result product-proof image. */
  imageBrief: string;
  /** Real scan/result image (public path). */
  resultImage?: string;
  /** Sketch-over-photo hero image (a real room/garden/subject with the HoWA
   *  white-line sketch drawn over it). */
  heroImage?: { src: string; aspect: string; alt: string };
  /** What the scan preview says it is scanning, e.g. "the garden". */
  scanSubject?: string;
  /** Optional 2x2 gallery of real scan examples (sketch-over-photo). */
  gallery?: string[];
  /** A short, relevant FAQ (2-3 items). */
  faq?: { q: string; a: string }[];
  /** Optional warm lived-home lifestyle band. */
  lifestyleImage?: { src: string; alt: string; caption: string; body?: string };
};

export const SCAN_FEATURES: ScanFeature[] = [
  {
    slug: "ask",
    name: "Ask HoWA",
    status: "Beta",
    outcomeHeadline: "Ask with your home already in mind.",
    promise: "Ask a question about your home and get an answer based on the information you have saved, with the source shown when there is one.",
    give: "A question about your home",
    returns: "An answer based on your saved information, with its source and any uncertainty",
    saved: "The answer, its source and any note or task you choose to keep",
    routes: "Save it · Set a reminder · Explore a feature · Get help",
    boundary: "HoWA uses the information you have saved and the connections you have enabled. It says when it does not have enough information. For safety, spending or property decisions, it may recommend a professional check.",
    imageBrief: "Ask HoWA result: a plain-language answer about the actual home with source chips and a save/assign/monitor action row.",
    heroImage: { src: "/howa/v5/ai-ask-sketch.png", aspect: "4/3", alt: "Ask HoWA: a home read for a question, with the HoWA sketch drawn over it." },
    faq: [
      { q: "Can I see where an answer came from?", a: "Yes. When an answer uses a saved document or record, you can open that source. If the evidence is missing, HoWA tells you." },
      { q: "What if HoWA does not know?", a: "It tells you what is missing and what you can add or check next, rather than presenting a guess as a fact." },
    ],
  },
  {
    slug: "repair",
    name: "Repair Scan",
    status: "Beta",
    outcomeHeadline: "Understand the problem before the next step.",
    promise: "Add a photo, sound or symptom to get a clearer first view of what may be wrong and what to do next.",
    give: "A photo, sound or description of the problem",
    returns: "What it may be, how urgent it appears, safe checks and a useful next step",
    saved: "The photo, notes and any task or quote you choose to keep",
    routes: "Check safely · Monitor · Request a quote · Find a specialist",
    boundary: "This is an initial interpretation of what you can show HoWA. It is not a certified inspection, a definitive diagnosis or a binding quote. Gas, electrical, structural and other safety-critical issues should be handled by an appropriately qualified professional.",
    imageBrief: "Repair Scan result: a photographed fault with likely cause, an urgency band, safe first steps, an indicative cost range and a provider-ready job brief.",
    heroImage: { src: "/howa/v5/ai-repair-sketch.webp", aspect: "4/3", alt: "Repair Scan: a fault read from a photo, with the HoWA sketch drawn over it." },
    gallery: ["/howa/v5/scans/repair-1.png", "/howa/v5/scans/repair-2.png", "/howa/v5/scans/repair-3.png", "/howa/v5/scans/repair-4.png"],
    faq: [
      { q: "Is this a professional diagnosis?", a: "No. It helps you understand what the visible signs may mean and what is sensible to do next. A qualified professional confirms the fault and the work required." },
      { q: "Will HoWA tell me to do unsafe work?", a: "Safety-critical work is not presented as a DIY task. HoWA should direct you to the appropriate professional instead." },
    ],
  },
  {
    slug: "garden",
    name: "Garden Scan",
    status: "Available",
    outcomeHeadline: "Get to know what your garden needs.",
    promise: "Add a current photo of a plant, border or garden to get a useful first view of what it may need now and what to keep an eye on.",
    give: "A current plant, border or garden photo",
    returns: "Likely identification, signs worth noticing, seasonal guidance and a useful next step",
    saved: "The photo, plant note and any care task or brief you choose to keep",
    routes: "Save a care task · Plan the garden · Request a quote · Find a gardener",
    boundary: "This is an initial visual interpretation, not a botanical diagnosis, measured site survey or binding quote. A gardener or designer confirms on-site conditions, scope and price where needed.",
    imageBrief: "Garden Scan result: a garden image resolved into zones, plant notes, seasonal priorities and an indicative scope, with a route to a named gardener.",
    heroImage: { src: "/howa/v5/ai-garden-sketch.webp", aspect: "4/3", alt: "Garden Scan: a garden read and planned, with the HoWA sketch drawn over it." },
    resultImage: "/howa/v5/ai-garden-result.jpg",
    scanSubject: "the garden",
    gallery: ["/howa/v5/scans/garden-1.png", "/howa/v5/scans/garden-2.png", "/howa/v5/scans/garden-3.png", "/howa/v5/scans/garden-4.png"],
    faq: [
      { q: "How certain is plant identification?", a: "HoWA should show how confident the identification is and let you correct it. A correction can then be kept with your garden record." },
      { q: "Does using the garden feature book work?", a: "No. A care task, design brief or quote request is created only when you choose the next step." },
    ],
    lifestyleImage: { src: "/howa/v6/lifestyle-conservatory.webp", alt: "Someone examining a plant cutting at a conservatory workbench, a botanical reference open beside the pots.", caption: "Get to know what your garden needs, season by season.", body: "Use a current observation to understand the next useful task, then keep the note with your home if you want to return to it." },
  },
  {
    slug: "design",
    name: "Design Scan",
    status: "Beta",
    outcomeHeadline: "Make room for the way you live.",
    promise: "Add a room, garden or project idea and turn it into a clearer starting direction you can refine or share.",
    give: "A room, garden, reference image or project idea",
    returns: "A concept direction, materials to consider, a budget starting point and a clearer brief",
    saved: "The direction, preferences and project brief you choose to keep",
    routes: "Save · Refine · Explore products · Speak to a studio",
    boundary: "This is an early creative direction, not a measured design, structural advice, construction drawing or fixed cost. A professional studio develops a commissioned design from an agreed brief and survey.",
    imageBrief: "Design Scan result: a room or garden photo turned into a concept direction, a simple space plan, a materials palette and a rough budget frame.",
    heroImage: { src: "/howa/v5/ai-design-sketch.webp", aspect: "4/3", alt: "Design Scan: a room turned into a first direction, with the HoWA sketch drawn over it." },
    scanSubject: "the space",
    lifestyleImage: { src: "/howa/v6/lifestyle-dressing.webp", alt: "A calm, personal dressing room full of considered choices and the things someone lives with.", caption: "Make room for the way you live.", body: "Start from how a room is really used and the things you keep, not a blank showroom." },
    gallery: ["/howa/v5/scans/design-1.png", "/howa/v5/scans/design-2.png", "/howa/v5/scans/design-3.png", "/howa/v5/scans/design-4.png"],
    faq: [
      { q: "Is this a finished design?", a: "No. It gives you a direction to react to and refine before a professional commission. It is not a measured drawing or construction-ready design." },
      { q: "Can I keep refining it?", a: "Yes. Save the direction you prefer, change the brief and carry the useful decisions forward when you are ready to speak to a studio." },
    ],
  },
  {
    slug: "property",
    name: "Property & Quote Intelligence",
    status: "Beta",
    outcomeHeadline: "Understand the quote before you decide.",
    promise: "Add a quote or show a condition issue to see what it says, what may be missing and which questions are worth asking next.",
    give: "A builder's quote, crack, damp issue or other visible condition concern",
    returns: "A plain-English summary, missing information, useful questions and the next appropriate check",
    saved: "The quote, issue note and any evidence request or task you choose to keep",
    routes: "Monitor · Add evidence · Ask a question · Find a specialist",
    boundary: "HoWA helps you understand the information in front of you. It is not a chartered survey, structural verdict, regulated advice or commercial estimate. A qualified professional confirms condition, risk, scope and price.",
    imageBrief: "Property & Quote Intelligence result: a confusing quote or condition issue decoded into plain language, with a risk note, the missing evidence to request and a referral route.",
    heroImage: { src: "/howa/v5/ai-property-sketch.png", aspect: "4/3", alt: "Property & Quote Intelligence: a condition issue read, with the HoWA sketch drawn over it." },
    gallery: ["/howa/v5/scans/property-1.png", "/howa/v5/scans/property-2.png", "/howa/v5/scans/property-3.png", "/howa/v5/scans/property-4.png"],
    faq: [
      { q: "Is this a survey?", a: "No. It helps turn a condition issue or quote into clearer questions and next steps. A qualified professional provides the inspection or formal advice when one is needed." },
      { q: "What can HoWA show me in a quote?", a: "It can help you see the work described, likely omissions or assumptions and the questions worth asking before you agree." },
    ],
  },
  {
    slug: "documents",
    name: "Document Intelligence",
    status: "Beta",
    outcomeHeadline: "Make the paperwork useful.",
    promise: "Add a policy, certificate, invoice, manual or warranty and review the useful facts, dates and reminders HoWA finds.",
    give: "A policy, certificate, invoice, manual or warranty",
    returns: "Useful facts, dates, costs and parties for you to review",
    saved: "The original document and the details you confirm",
    routes: "File it · Set a reminder · Correct a detail · Link it to the home",
    boundary: "HoWA helps you read and organise a document. It is not legal, financial or regulated advice. You can review and correct the details before using them.",
    imageBrief: "Document Intelligence result: a policy or certificate with its key facts, dates, costs and parties extracted, filed to the Home Record with reminders set.",
    scanSubject: "the documents",
    heroImage: { src: "/howa/v5/ai-documents-sketch.png", aspect: "4/3", alt: "Document Intelligence: a policy read for its facts, with the HoWA sketch drawn over it." },
    gallery: ["/howa/v5/scans/documents-1.png", "/howa/v5/scans/documents-2.png", "/howa/v5/scans/documents-3.png", "/howa/v5/scans/documents-4.png"],
    lifestyleImage: { src: "/howa/v6/lifestyle-archive.webp", alt: "Someone gathering a home's papers, maps and records at a warm desk of labelled drawers.", caption: "Make the paperwork useful.", body: "A policy, certificate or warranty becomes facts and dates you can review, kept with the home it belongs to." },
    faq: [
      { q: "Can I get back to the original document?", a: "Yes. The original stays linked to the details you confirm, so you can open the source when you need it." },
      { q: "What if HoWA reads something incorrectly?", a: "Correct the detail before saving it. Any linked reminder should update when the saved date changes." },
    ],
  },
  {
    slug: "plan",
    name: "Home Plan",
    status: "Coming next",
    outcomeHeadline: "A clearer plan for the home ahead.",
    promise: "Bring saved dates, tasks and priorities into one place, with a clear reason for what appears next.",
    give: "The dates, tasks and priorities already saved for your home",
    returns: "A prioritised view of what needs attention, when and why",
    saved: "Tasks, priorities, dates, projects and the decisions you make",
    routes: "Do it · Schedule it · Monitor it · Delegate it",
    boundary: "The Home Plan is built from the information you have saved and the features available to your home. It helps you prioritise, but you decide what to do, defer, monitor or delegate.",
    imageBrief: "Home Plan result: the home's known, due and next items sequenced into a calm, prioritised plan across the seasons, with clear owners and dates.",
    heroImage: { src: "/howa/v5/ai-plan-sketch.png", aspect: "4/3", alt: "Home Plan: the whole home sequenced, with the HoWA sketch drawn over it." },
    faq: [
      { q: "Where do the tasks come from?", a: "From dates, documents, records and decisions you have saved. Each item should show why it is there." },
      { q: "Does HoWA act on the plan by itself?", a: "No. You choose what to save, schedule, request or delegate. A suggested action is not treated as completed work." },
    ],
  },
];

export function getScanFeature(slug: string): ScanFeature | undefined {
  return SCAN_FEATURES.find((f) => f.slug === slug);
}

/**
 * §03 CTA system: adapted per feature where "scan" does not fit (Ask HoWA,
 * Property & Quote, Documents, Home Plan).
 */
export function featureCta(slug: string): string {
  switch (slug) {
    case "ask": return "Ask HoWA";
    case "repair": return "Check a repair";
    case "garden": return "Check the garden";
    case "design": return "Start a design";
    case "property": return "Review a quote";
    case "documents": return "Read a document";
    case "plan": return "See Home Plan";
    default: return "Explore a sample home";
  }
}
