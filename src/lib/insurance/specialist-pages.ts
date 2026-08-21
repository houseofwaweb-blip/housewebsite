/**
 * Specialist property + asset pages (spec Groups B and C). One page per RISK
 * TYPE, not per product. All render from the SpecialistPage template.
 *
 * Copy rules baked in: no "compare" as a House action, no advice language, no
 * urgency, premium ranges labelled indicative and pending Provenance sign-off.
 * The 5-field enquiry form carries the disclosure above its button.
 */

export type SpecialistPage = {
  slug: string;
  /** Card/nav title. */
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Advert landing pages stay out of the nav. */
  hero: { eyebrow: string; heading: string; lede: string };
  /** Optional hero image, rendered in the split hero beside the heading block. */
  image?: string;
  imageAlt?: string;
  /**
   * Shared "House Record" still-life, rendered in the burgundy "What Provenance
   * can place" section on every page (book text edited to drop the literal
   * "House Record" wording).
   */
  placedImage?: string;
  placedImageAlt?: string;
  /**
   * Section 3 ("Why it is different") image. Until a per-page asset is supplied,
   * `whyImageSpec` drives an on-page placeholder telling the client exactly what
   * to shoot and what to name the file. Once `whyImage` is set it renders in
   * place of the placeholder.
   */
  whyImage?: string;
  whyImageAlt?: string;
  whyImageSpec?: { description: string; dimensions: string; filename: string };
  whyDifferent: { heading: string; body: string[] };
  /**
   * "The questions a comparison form never asks" section. Property pages share
   * the default (roof / fabric / added / rebuild); asset, motor and cover pages
   * supply their own so a car page doesn't talk about roofs. Omit to use the
   * property default.
   */
  differenceIntro?: string;
  readiness?: { h: string; p: string }[];
  /** Per-page landscape image for the "difference" section. Falls back to the
      shared still-life when absent. */
  differenceImage?: string;
  differenceImageAlt?: string;
  detail: { title: string; points: { h: string; p: string }[] };
  /**
   * "What is not covered / key limitations" (spec §11 — this must never be
   * buried). Rendered as a prominent section on every cover page. When a page
   * omits it, the template falls back to DEFAULT_LIMITATIONS so no cover page is
   * ever missing its exclusions. Honest and general; the policy wording governs.
   */
  limitations?: {
    heading?: string;
    intro?: string;
    points: { h: string; p: string }[];
    note?: string;
  };
  placed: { heading: string; body: string };
  /** Sourced figures, rendered as an evidence strip where present. */
  evidence?: { stat: string; label: string }[];
  crossLinks?: { label: string; href: string }[];
  /** Optional cross-sell grid of related covers (e.g. the four everyday covers). */
  relatedCovers?: {
    title: string;
    items: { name: string; body?: string; href: string; image: string; imageAlt?: string }[];
  };
  /** For form attribution. */
  enquiryType: string;
  /** Hero CTA label; defaults to "Speak to a specialist" (business uses "Request a review"). */
  heroCta?: string;
  /** Enquiry section overrides — lets B2B pages reframe and add a company field. */
  enquiry?: {
    eyebrow?: string;
    heading?: string;
    body?: string;
    submitLabel?: string;
    withCompany?: boolean;
    withProjectStart?: boolean;
  };
  /** Attribution path override; defaults to /insurance/[slug]. */
  sourcePath?: string;
};

/**
 * The honest, universal exclusions that apply to almost any cover. Used as the
 * fallback so every cover page shows a "what is not covered" section, even
 * before a page supplies its own tailored one. Nothing here is a scare tactic;
 * it is the plain shape of an insurance policy.
 */
export const DEFAULT_LIMITATIONS: NonNullable<SpecialistPage["limitations"]> = {
  heading: "What is not covered, and what to check",
  intro:
    "Every policy has limits and exclusions. This is a general guide only, and the policy wording is what governs the cover and any claim.",
  points: [
    { h: "Wear, tear and gradual damage", p: "Ageing, gradual deterioration and damage caused by a lack of maintenance are generally outside insurance cover." },
    { h: "Anything already known", p: "A loss, fault or condition that already exists, or that you already know about when cover begins, may be excluded." },
    { h: "Under-insurance", p: "If the sum insured is too low, a claim may be reduced. Rebuild cost and contents values should reflect the amount actually at risk." },
    { h: "Limits and excesses", p: "Section limits, single-item limits and the excess all affect what may be paid. Higher-value items may need to be listed separately." },
    { h: "The House does not advise", p: "The House introduces you to Provenance and does not advise on, arrange or decide your cover. The terms that bind are the ones in the policy documents, agreed with Provenance." },
  ],
  note: "The policy wording, key facts and exclusions are provided by Provenance before you commit to anything.",
};

export const SPECIALIST_PAGES: SpecialistPage[] = [
  {
    slug: "listed-buildings",
    title: "Listed building insurance",
    metaTitle: "Listed building insurance",
    metaDescription:
      "Cover for Grade II, II* and I listed homes, built around like-for-like reinstatement and a rebuild cost that bears no relation to market value. Arranged by Provenance; introduced by the House.",
    hero: {
      eyebrow: "Specialist property",
      heading: "Listed building insurance that starts with the building itself.",
      lede: "Listed homes can require specialist materials, methods and trades when repairs are needed. There are 379,580 listed buildings in England, and the cost of reinstating one can differ significantly from its market value.",
    },
    image: "/insurance/listed.webp",
    imageAlt:
      "A Grade II listed period home, the kind repaired like for like with original materials and specialist trades.",
    placedImage: "/insurance/house-record.webp",
    placedImageAlt:
      "A worn leather ledger propped against a heritage rebuild drawing, a brass sconce and a pink peony beside it, evoking the documented history a heritage underwriter wants to see.",
    whyImage: "/insurance/listed-why.webp",
    whyImageAlt:
      "A weathered listed-building facade: a carved stone cartouche, a sash window and aged brickwork, the heritage fabric a like-for-like rebuild must match.",
    whyImageSpec: {
      description: "A close, tactile detail of heritage repair done properly: a stonemason re-pointing lime mortar, or original sash joinery being restored by hand. Warm and documentary, no faces needed.",
      dimensions: "1600 × 1067px landscape (3:2), WebP",
      filename: "/insurance/listed-why.webp",
    },
    differenceImage: "/insurance/listed-difference.webp",
    differenceImageAlt:
      "A stone archway set in a weathered red-brick listed facade, the heritage fabric a specialist reads that a comparison form cannot.",
    whyDifferent: {
      heading: "Why a listed building is a different risk",
      body: [
        "Repairs to a listed building can involve matching historic materials and methods, specialist trades and listed-building consent. Those requirements can make reinstatement slower and more costly than a modern rebuild, so market value is not a reliable guide to the sum insured.",
        "Index-linking does not replace a proper reinstatement figure. Heritage fabric, alterations and specialist workmanship can all move the real rebuild cost away from a general estimate.",
      ],
    },
    detail: {
      title: "What changes with the grade",
      points: [
        { h: "The grades", p: "Grade II, Grade II* and Grade I buildings can carry different conservation requirements. The insurer will look at the property itself, its grade and the cost of reinstatement. Figures are indicative and confirmed case by case." },
        { h: "The rebuild assessment", p: "A professional reinstatement assessment can give the underwriter a property-specific rebuild figure that accounts for heritage materials, workmanship and current requirements." },
        { h: "The underinsurance trap", p: "Reinstating listed fabric can cost more than index-linked cover anticipates. A specialist review helps establish whether the rebuild figure still reflects the property." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance works with the specialist markets that underwrite heritage risk, so a listed home can sit within one arranged policy alongside contents, outbuildings and, where relevant, the rest of the estate. The House introduces you; Provenance arranges and administers the cover.",
    },
    evidence: [
      { stat: "379,580", label: "listed buildings in England" },
      { stat: "Rebuild cost", label: "is what it costs to put a listed home back, not its market value" },
      { stat: "Heritage fabric", label: "can cost more to reinstate than a general rebuild estimate allows for" },
    ],
    crossLinks: [
      { label: "Thatched property insurance", href: "/insurance/thatched-properties" },
      { label: "Guide: insuring a listed building", href: "/insurance/guides/listed-building-insurance" },
    ],
    limitations: {
      heading: "What to check with listed-building cover",
      intro:
        "Listed-building insurance still has limits and conditions. These are common areas to check, but the policy wording is what governs any claim.",
      points: [
        { h: "The rebuild figure you give", p: "Cover follows the reinstatement sum insured. Set it below the true cost of a like-for-like heritage rebuild and a claim can be cut in proportion, which is exactly the trap a proper assessment avoids." },
        { h: "Gradual decay and known defects", p: "Rot, damp, movement and deterioration that build up over time, or a defect already known, are maintenance matters rather than insured events." },
        { h: "Consent and unapproved work", p: "Listed-building consent and appropriate repair methods can matter to the claim. Work carried out without the required consent may affect the cover." },
        { h: "Not advice", p: "The House introduces you to Provenance and does not advise on cover. Grades, limits and exclusions are set out in the policy documents." },
      ],
      note: "The policy wording and exclusions come from Provenance before you commit.",
    },
    enquiryType: "listed-buildings",
  },
  {
    slug: "thatched-properties",
    title: "Thatched property insurance",
    metaTitle: "Thatched property insurance",
    metaDescription:
      "Insurance for thatched homes, with underwriting shaped by the roof, chimney, maintenance and wider property. Around three-quarters are also listed. Arranged by Provenance; introduced by the House.",
    hero: {
      eyebrow: "Specialist property",
      heading: "Thatched-home insurance built around the roof, chimney and wider property.",
      lede: "There are around 60,000 thatched properties in Britain, and roughly three-quarters are also listed. Thatch brings specific fire, maintenance and reinstatement considerations that specialist underwriting can account for.",
    },
    image: "/insurance/thatched.webp",
    imageAlt:
      "A thatched cottage in a country garden, the kind of home standard insurers often decline or load heavily.",
    placedImage: "/insurance/house-record.webp",
    placedImageAlt:
      "A leather ledger beside a brass globe sconce and a pink peony, standing in for the sweeping records and maintenance history a thatch underwriter reviews.",
    whyImage: "/insurance/thatched-why.webp",
    whyImageAlt:
      "A thatched roof detail with a brick chimney and an eyebrow window, the craft and maintenance a thatch underwriter reads.",
    differenceIntro:
      "The useful questions are specific: the type and condition of the thatch, chimney and flue, any wood-burner, sweeping records, electrical safety and the way the property is maintained.",
    readiness: [
      { h: "The thatch", p: "Its type, age and condition, and when it was last re-ridged." },
      { h: "The chimney", p: "Any wood-burner, its lining and a spark arrestor." },
      { h: "Sweeping records", p: "How often the chimney is swept, which underwriters weigh directly." },
      { h: "The electrics", p: "An up-to-date inspection, the other common source of fire risk." },
    ],
    differenceImage: "/insurance/thatched-difference.webp",
    differenceImageAlt:
      "A thatched property detail, standing for the specific risk factors a thatch specialist reviews.",
    whyImageSpec: {
      description: "A thatcher at work on a roof ridge, or a crisp detail of a freshly combed straw ridge against sky. Craft and maintenance, not fire.",
      dimensions: "1600 × 1067px landscape (3:2), WebP",
      filename: "/insurance/thatched-why.webp",
    },
    whyDifferent: {
      heading: "What underwriters actually look at",
      body: [
        "The concern with thatch is fire, and the questions that follow are specific: the chimney and any wood-burner, the presence of a lining and spark arrestor, sweeping records, an up-to-date electrical inspection, and the type and age of the thatch itself.",
        "Clear maintenance records and accurate information about the roof, chimney and electrics give the underwriter a better basis on which to assess the risk.",
      ],
    },
    detail: {
      title: "What matters when insuring thatch",
      points: [
        { h: "The risk factors", p: "Lining, spark arrestors, sweeping frequency and electrical safety are what a specialist underwriter weighs. Documented maintenance is directly relevant to the terms offered." },
        { h: "How the risk is assessed", p: "The type and age of the thatch, the property’s listed status and the fire-safety measures in place can all affect the terms and premium. Figures are confirmed case by case." },
        { h: "Fire risk, treated as a practical detail", p: "Fire is one of the underwriting considerations for a thatched home. The useful response is accurate information and good maintenance, not alarmist language." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance works with markets that understand thatch and heritage construction, so the roof, the building and its contents sit within one arranged policy. The House introduces you; Provenance arranges and administers the cover.",
    },
    evidence: [
      { stat: "~60,000", label: "thatched properties in Britain" },
      { stat: "~75%", label: "of them also listed" },
    ],
    crossLinks: [{ label: "Listed building insurance", href: "/insurance/listed-buildings" }],
    limitations: {
      heading: "The conditions that can apply to thatch",
      intro:
        "Thatched-home policies can include specific maintenance and fire-safety conditions. These are common areas to check, but the policy wording governs.",
      points: [
        { h: "Sweeping and maintenance conditions", p: "Cover typically requires the chimney swept to a stated frequency and the thatch kept in good order. Miss the conditions and a fire claim can be affected." },
        { h: "The chimney and wood-burner", p: "The condition of the chimney, flue and any wood-burning appliance can affect the terms offered and the handling of a claim." },
        { h: "Electrics and known defects", p: "An out-of-date electrical inspection, or a defect already known, is a maintenance matter rather than an insured event." },
        { h: "Not advice", p: "The House introduces you to Provenance and does not advise on cover. Limits and exclusions are set out in the policy documents." },
      ],
      note: "The policy wording and conditions come from Provenance before you commit.",
    },
    enquiryType: "thatched-properties",
  },
  {
    slug: "non-standard-construction",
    title: "Non-standard construction",
    metaTitle: "Non-standard construction insurance",
    metaDescription:
      "Cover for timber frame, cob, stone, flint, single-skin, steel-frame and prefabricated homes where the construction needs specialist underwriting. Arranged by Provenance; introduced by the House.",
    hero: {
      eyebrow: "Specialist property",
      heading: "Specialist insurance for homes built in less common materials and systems.",
      lede: "Timber frame, cob, stone, flint, single-skin, steel frame and prefabricated construction can all need a more detailed underwriting approach. The important thing is to describe the building accurately.",
    },
    image: "/insurance/non-standard.webp",
    imageAlt:
      "A home of non-standard construction, the kind an automated quote cannot read and a specialist underwriter must.",
    placedImage: "/insurance/house-record.webp",
    placedImageAlt:
      "A leather ledger and a construction drawing on a sage sill, representing the detail of how a non-standard home is built that an underwriter needs described.",
    whyImageSpec: {
      description: "A detail of an unusual wall build: exposed cob, flint, timber frame or single-skin stone, showing the fabric an automated quote cannot read.",
      dimensions: "1600 × 1067px landscape (3:2), WebP",
      filename: "/insurance/non-standard-why.webp",
    },
    whyImage: "/insurance/non-standard-why.webp",
    whyImageAlt:
      "A detail of non-standard construction: timber framing, cob infill and a stone plinth, the fabric an automated quote cannot read.",
    differenceImage: "/insurance/non-standard-difference.webp",
    differenceImageAlt:
      "A close view of non-standard construction, the kind of fabric a specialist reads individually rather than by category.",
    differenceIntro:
      "Construction type changes the way a property is repaired, maintained and reinstated. A specialist underwriter can assess the actual materials and system rather than relying on broad assumptions.",
    readiness: [
      { h: "What it's built of", p: "Timber frame, cob, stone, flint, single-skin or steel, read individually, not by category." },
      { h: "The walls", p: "Solid-wall and single-skin construction that sits outside cavity-wall assumptions." },
      { h: "The system", p: "For post-war and prefabricated types, the specific system and its known issues." },
      { h: "What's been done", p: "Repairs, retrofits and how the fabric has been kept sound." },
    ],
    whyDifferent: {
      heading: "Why the construction needs a closer look",
      body: [
        "Homes built with less common materials or structural systems do not always fit the assumptions used for mainstream household insurance. The construction itself needs to be understood before the risk can be priced accurately.",
        "A specialist underwriter can start with the actual fabric of the building, its condition and any repairs or alterations already carried out.",
      ],
    },
    detail: {
      title: "The common constructions",
      points: [
        { h: "Timber frame and cob", p: "Traditional and modern timber frame, and earth-built walls such as cob, each behave differently in a loss and are read individually rather than by category." },
        { h: "Stone, flint and single-skin", p: "Solid-wall and single-skin properties need to be described as they are, rather than treated as though they use conventional cavity-wall construction." },
        { h: "Steel frame and prefabricated", p: "Non-traditional post-war construction, including certain prefabricated types, needs an underwriter familiar with the specific system." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance works with underwriters who can assess non-standard construction on the individual property and its condition. The House makes the introduction; Provenance arranges and administers the cover.",
    },
    enquiryType: "non-standard-construction",
  },
  {
    slug: "second-homes",
    title: "Second and holiday homes",
    metaTitle: "Second and holiday home insurance",
    metaDescription:
      "Insurance for second homes, holiday homes and holiday lets, with cover arranged around the way the property is occupied and used. Introduced by the House and arranged by Provenance.",
    hero: {
      eyebrow: "Specialist property",
      heading: "Second-home insurance should reflect how the property is actually used.",
      lede: "England has 268,152 second homes and 67,858 commercial holiday lets. Time left unoccupied, security, escape of water and any letting activity can all change the insurance requirement.",
    },
    image: "/insurance/holiday-home.webp",
    imageAlt:
      "A holiday home standing quiet, the kind left unoccupied for periods where standard policies most often decline a claim.",
    placedImage: "/insurance/house-record.webp",
    placedImageAlt:
      "A leather ledger and drawings on a sill, standing for the occupancy and use details that let a second or holiday home sit within one arranged policy.",
    whyImage: "/insurance/second-homes-why.webp",
    whyImageAlt:
      "A second home shut up quietly for the season, the kind of place standard cover is not built for.",
    differenceImage: "/insurance/second-homes-difference.webp",
    differenceImageAlt:
      "A quiet holiday home standing empty, the occupancy a comparison form never asks about.",
    differenceIntro:
      "A second home may be empty for longer periods, checked less often or let to guests. The policy needs to reflect that pattern of use.",
    readiness: [
      { h: "How often it's empty", p: "How long the property is left unoccupied between visits." },
      { h: "How it's used", p: "Second home, holiday home or holiday let, three different things to an insurer." },
      { h: "Security while away", p: "Alarms, key-holding and how the home is checked between visits." },
      { h: "Where it is", p: "Coastal, rural or overseas, each carrying its own exposure." },
    ],
    whyImageSpec: {
      description: "A second home shut up for the season in soft light: a coastal or country house with the curtains drawn, quietly waiting.",
      dimensions: "1600 × 1067px landscape (3:2), WebP",
      filename: "/insurance/second-homes-why.webp",
    },
    whyDifferent: {
      heading: "Why it is a different risk",
      body: [
        "The main difference is occupancy. Escape of water, weather damage and theft can be treated differently when a property is not lived in day to day, and policies often set conditions around longer periods of unoccupancy.",
        "A private second home and a holiday let are also different risks. The insurer needs an accurate description of how the property is used.",
      ],
    },
    detail: {
      title: "What to get right",
      points: [
        { h: "The unoccupancy clause", p: "Policies can restrict cover after a property has been unoccupied for a set period. A specialist policy can be arranged around the way the home is actually used." },
        { h: "Second home vs holiday let", p: "Letting changes the risk and needs to be declared. A holiday let should be insured as a holiday let, not as a private second home." },
        { h: "Overseas properties", p: "Homes abroad can often be brought within the same arranged relationship, on one renewal date, rather than managed separately." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance arranges cover for second, holiday and overseas homes that reflects real occupancy and use, and can consolidate them onto one renewal date with the main home. The House introduces you; Provenance arranges and administers the cover.",
    },
    evidence: [
      { stat: "268,152", label: "second homes in England" },
      { stat: "67,858", label: "commercial holiday lets in England" },
    ],
    limitations: {
      heading: "What to check with second-home cover",
      intro:
        "The policy should reflect the property’s real occupancy and use. These are common areas to check, but the policy wording governs.",
      points: [
        { h: "Long periods empty", p: "Cover may change after a property has been unoccupied for a set number of days, particularly for risks such as escape of water." },
        { h: "Letting not declared", p: "If the property is let, that use needs to be declared and insured on the correct basis." },
        { h: "Gradual damage and maintenance", p: "Slow leaks, damp and deterioration that go unnoticed between visits are maintenance matters, not insured events." },
        { h: "Not advice", p: "The House introduces you to Provenance and does not advise on cover. Occupancy conditions and exclusions are set out in the policy documents." },
      ],
      note: "The policy wording and occupancy conditions come from Provenance before you commit.",
    },
    enquiryType: "second-homes",
  },
  {
    slug: "unoccupied-property",
    title: "Unoccupied and probate property",
    metaTitle: "Unoccupied and probate property insurance",
    metaDescription:
      "Insurance for homes left empty during probate, a move, a renovation or another period of unoccupancy. Introduced by the House and arranged by Provenance.",
    hero: {
      eyebrow: "Specialist property",
      heading: "An empty house is still a home, and it still needs cover.",
      lede: "There are 309,856 long-term empty homes in England. Probate, a delayed move or building work can all leave a property unoccupied for longer than its existing household cover allows.",
    },
    image: "/insurance/probate.webp",
    imageAlt:
      "A home standing empty during probate or between owners, shut up and still.",
    placedImage: "/insurance/house-record.webp",
    placedImageAlt:
      "A leather ledger and a fountain pen resting on a calm sage surface, evoking the inspection notes and conditions kept for an empty or probate property.",
    whyImageSpec: {
      description: "An empty room in calm daylight, dust sheets over furniture. A home between chapters, dignified and still, nothing bleak.",
      dimensions: "1600 × 1067px landscape (3:2), WebP",
      filename: "/insurance/unoccupied-why.webp",
    },
    whyImage: "/insurance/unoccupied-why.webp",
    whyImageAlt:
      "An empty room in calm daylight, dust sheets over the furniture, a home between chapters.",
    differenceImage: "/insurance/unoccupied-difference.webp",
    differenceImageAlt:
      "A quiet, unoccupied home standing still, the condition and security a specialist asks about.",
    differenceIntro:
      "When nobody is living in the property, insurers look closely at how long it will be empty, how it is secured, how the water and heating are managed and how often someone checks it.",
    readiness: [
      { h: "How long it's empty", p: "The period the property will be unoccupied and the cover needed during that time." },
      { h: "How it's secured", p: "Locks, boarding where needed, alarms and who holds a key." },
      { h: "Water and heating", p: "Systems drained, or heating kept on through winter to prevent burst pipes." },
      { h: "How often it's checked", p: "How often someone visits and checks the property while it is empty." },
    ],
    whyDifferent: {
      heading: "The three situations",
      body: [
        "Probate can leave a home unoccupied while an estate is settled. If you are dealing with a death, there is enough to manage already, so the practical insurance question is simply whether the existing cover still applies and what is needed next.",
        "A property between owners or tenants, or one left empty during works, also needs cover written around the fact that nobody is living there day to day.",
      ],
    },
    detail: {
      title: "What an empty property needs",
      points: [
        { h: "Why the old policy may have lapsed", p: "Household policies usually set a limit on how long a property can be left unoccupied. Once that limit is reached, separate unoccupied-property cover may be needed." },
        { h: "What insurers ask for", p: "Regular inspections, water systems drained down, secure boarding where needed, and heating managed through winter are the usual conditions. A specialist policy sets these out plainly." },
        { h: "Arrange it when you need it", p: "A specialist can explain the cover required for the period the property will be empty and the conditions that need to be followed." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance arranges unoccupied and probate cover written for the situation, for the period it is needed. The House introduces you; Provenance arranges and administers the cover.",
    },
    evidence: [{ stat: "309,856", label: "long-term empty homes in England" }],
    limitations: {
      heading: "What an empty-home policy asks of you",
      intro:
        "Unoccupied-property cover often comes with conditions around inspections, security, water and heating. These are common areas to check, but the policy wording governs.",
      points: [
        { h: "The conditions must be kept", p: "Regular inspections, water drained down or heating maintained through winter, and secure boarding where needed are typical requirements. A claim can rest on them being met." },
        { h: "Reduced perils while empty", p: "Cover on an unoccupied home is often narrower than a lived-in one, with theft, escape of water and malicious damage limited or excluded." },
        { h: "Gradual damage", p: "Slow deterioration in a home nobody is living in is a maintenance matter rather than an insured event." },
        { h: "Not advice", p: "The House introduces you to Provenance and does not advise on cover. The conditions and exclusions are set out in the policy documents." },
      ],
      note: "The policy wording and conditions come from Provenance before you commit.",
    },
    enquiryType: "unoccupied-property",
  },
  {
    slug: "renovation-and-extension",
    title: "Renovation, extension and contract works",
    metaTitle: "Renovation and contract works insurance",
    metaDescription:
      "One policy covering the existing structure, contract works, contents and liability for the period of building work. Arranged by Provenance; introduced by the House.",
    hero: {
      eyebrow: "Specialist property",
      heading: "Building work changes the risk. The insurance needs to change with it.",
      lede: "During a renovation or extension, parts of the home may be open, unoccupied or under the control of contractors. A renovation policy can cover the existing structure, contract works, contents and homeowner liability for the period of the project.",
    },
    image: "/insurance/renovation.webp",
    imageAlt:
      "A home mid-renovation, insured under one policy over the existing structure and the contract works for the life of the project.",
    placedImage: "/insurance/house-record.webp",
    placedImageAlt:
      "A leather ledger beside building drawings on a sill, standing for the contract and works documents a single renovation policy is written around.",
    whyImageSpec: {
      description: "A home mid-works from inside: scaffold, bare plaster, protected floors and daylight through an opening. Ordered rather than chaotic.",
      dimensions: "1600 × 1067px landscape (3:2), WebP",
      filename: "/insurance/renovation-why.webp",
    },
    whyImage: "/insurance/renovation-why.webp",
    whyImageAlt:
      "A home mid-renovation, scaffold and bare plaster, the period a standard policy was not written for.",
    differenceImage: "/insurance/renovation-difference.webp",
    differenceImageAlt:
      "A house under building works, the contract and existing structure a specialist covers together.",
    differenceIntro:
      "A household policy is written for a completed home. Renovation cover is written for the period when the building and the works are changing.",
    readiness: [
      { h: "The works", p: "What is being done, and whether the home is open to the weather or structurally in flux." },
      { h: "Who is on site", p: "The contractors, their own cover, and the JCT contract position." },
      { h: "The existing structure", p: "Cover for the standing building as well as the contract works." },
      { h: "How long", p: "The length of the project, which sets the period cover is needed for." },
    ],
    whyDifferent: {
      heading: "Why the insurance changes during works",
      body: [
        "Once a project begins, the building may be partly open, unoccupied for periods or in the hands of contractors. Those changes can affect the household insurance already in place.",
        "A renovation policy is designed specifically for that period and can bring the existing structure, the contract works, contents and homeowner liability into one arrangement.",
      ],
    },
    detail: {
      title: "What renovation cover can include",
      points: [
        { h: "One policy, four things", p: "The existing structure, the contract works, contents and homeowner liability can be covered for the period of the project, subject to the policy terms." },
        { h: "JCT contracts, in plain English", p: "The building contract sets out who is responsible for insuring different parts of the project. Provenance can explain how the insurance arrangement relates to the JCT position. This is factual information, not legal advice." },
        { h: "Non-negligence cover", p: "Where work happens close to a neighbour, non-negligence cover matters. Indicative costs sit around £550 for shorter projects and around £1,000 where non-negligence is included; figures are indicative and confirmed case by case." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance arranges renovation and contract works cover for the life of a project, and the House can route straight in from the works it already manages. The House introduces you; Provenance arranges and administers the cover.",
    },
    crossLinks: [{ label: "Guide: insurance during building work", href: "/insurance/guides/renovation-insurance" }],
    limitations: {
      heading: "What a works policy does not cover",
      intro:
        "Renovation cover has a defined scope, and the building contract also matters. These are common areas to check, but the policy wording and contract govern.",
      points: [
        { h: "The contractor's own liability", p: "A works policy is not a substitute for the contractor's public liability and their cover for their own work and workmanship. The JCT contract sets out who insures what." },
        { h: "Faulty design or workmanship", p: "Defective design, materials or workmanship, and putting right work that was done badly, sit outside the cover." },
        { h: "Neighbours, without non-negligence cover", p: "Damage to an adjoining property caused without negligence is only covered where non-negligence cover is specifically included." },
        { h: "Not advice", p: "The House introduces you to Provenance and does not advise on cover. Scope, limits and exclusions are set out in the policy documents." },
      ],
      note: "The policy wording and the JCT position come from Provenance before you commit.",
    },
    enquiry: { withProjectStart: true },
    enquiryType: "renovation-and-extension",
  },
  {
    slug: "fine-art-and-collections",
    title: "Fine art, jewellery and collections",
    metaTitle: "Fine art, jewellery and collections insurance",
    metaDescription:
      "Cover for scheduled items, art, jewellery, watches, wine and design, where general contents limits fall short. Arranged by Provenance; introduced by the House.",
    hero: {
      eyebrow: "Specialist assets",
      heading: "Valuable pieces need cover that recognises what they are.",
      lede: "Fine art, jewellery, watches, wine and other collections can quickly exceed the single-item limits of general contents insurance. Scheduling and current valuations help place each item on the right basis.",
    },
    image: "/insurance/cat-fine-art.webp",
    imageAlt:
      "Fine art and collected pieces, the things worth scheduling and valuing individually rather than leaving to a general contents limit.",
    placedImage: "/insurance/house-record.webp",
    placedImageAlt:
      "A leather ledger and a fountain pen on a sage surface, standing for the inventory of scheduled and valued items a specialist policy is built around.",
    whyImage: "/insurance/fine-art-why.webp",
    whyImageAlt:
      "An open leather jewellery box of gold rings, chains and a locket, the scheduled pieces a general contents limit rarely covers.",
    whyImageSpec: {
      description: "A close still life of scheduled pieces: a framed painting corner, a watch and jewellery on a tray, being handled or valued.",
      dimensions: "1600 × 1067px landscape (3:2), WebP",
      filename: "/insurance/fine-art-why.webp",
    },
    differenceImage: "/insurance/fine-art-difference.webp",
    differenceImageAlt:
      "A gilt-framed landscape painting, a bronze rearing horse on marble and a floral urn on dark wood, the kind of collected things a comparison form never asks about.",
    differenceIntro:
      "The useful starting point is the piece itself: what it is, what it is worth now, where it is kept and whether it travels outside the home.",
    readiness: [
      { h: "What it is", p: "The maker, the period and the materials, not a line on a contents schedule." },
      { h: "What it is worth now", p: "A current valuation, because markets move, rather than the price you paid." },
      { h: "Where it lives", p: "On the wall, in a safe, worn daily or in storage, each a different risk." },
      { h: "In and out of the home", p: "Whether the item is worn, transported, exhibited or lent, and what cover applies away from home." },
    ],
    whyDifferent: {
      heading: "Why scheduled items are different",
      body: [
        "General contents insurance usually applies a single-item limit. Fine art, jewellery and collections above that limit may need to be listed and valued individually.",
        "Current valuations also help avoid insuring an item for too little or maintaining cover at a figure that no longer reflects its value.",
      ],
    },
    detail: {
      title: "How it is handled",
      points: [
        { h: "Valuation", p: "Scheduled items should be valued and reviewed as markets move. The House does not appraise items; it introduces you to the insurance route and Provenance can work with appropriate valuation partners." },
        { h: "The ancillary network", p: "Provenance's proposition extends beyond the policy to collection management, restoration, security and valuation partners." },
        { h: "Newer asset classes", p: "Watches, wine, design pieces and other modern collections can be handled alongside more traditional art and jewellery." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance arranges scheduled cover for art and collections and can bring it into a wider household arrangement where appropriate. The House makes the introduction; Provenance arranges and administers the cover.",
    },
    evidence: [{ stat: "Both ways", label: "a detailed schedule can identify over-insurance as well as gaps in cover" }],
    limitations: {
      heading: "What scheduled cover will and will not do",
      intro:
        "Scheduled cover depends on the item, the valuation and the terms agreed. These are common areas to check, but the policy wording and schedule govern.",
      points: [
        { h: "Only what is scheduled", p: "Items above the general single-item limit may need to be listed and valued separately to receive the intended level of cover." },
        { h: "Valuations must be current", p: "Cover follows the valuation on file. An out-of-date figure can leave a piece under-insured as markets move, which is why revaluation matters." },
        { h: "Wear, damage and known faults", p: "Wear, inherent defects and damage that already exists are generally outside the policy, and some transit or loan arrangements need to be agreed in advance." },
        { h: "Not advice", p: "The House does not appraise or advise on value. Provenance and its valuation partners handle that; limits and exclusions are in the policy documents." },
      ],
      note: "The policy wording and schedule terms come from Provenance before you commit.",
    },
    enquiryType: "fine-art-and-collections",
  },
  {
    slug: "classic-and-prestige-motor",
    title: "Classic and prestige motor",
    metaTitle: "Classic and prestige motor insurance",
    metaDescription:
      "Agreed-value cover for classic, collection and prestige vehicles, consolidated onto one renewal date with the home. Arranged by Provenance; introduced by the House.",
    hero: {
      eyebrow: "Specialist assets",
      heading: "Agreed-value and specialist motor cover for classic and prestige cars.",
      lede: "There are 1.93 million registered historic vehicles in the UK, owned by 690,777 people. Provenance can arrange classic, prestige and collection motor cover, including agreed-value policies where appropriate.",
    },
    image: "/insurance/cat-cars.webp",
    imageAlt:
      "A classic car, treated as part of the same estate as the home and consolidated onto one renewal date.",
    placedImage: "/insurance/house-record.webp",
    placedImageAlt:
      "A leather ledger and pen on a sage surface, standing for the agreed-value schedule that lets a prestige vehicle sit on one renewal date with the home.",
    whyImage: "/insurance/motor-why.webp",
    whyImageAlt:
      "A classic green sports car in a manor garage with driving gloves on the bonnet and the house beyond, an estate rather than a showroom.",
    differenceIntro:
      "For a classic or prestige car, the value, use, storage, security and condition of the vehicle all matter to the cover.",
    readiness: [
      { h: "What it is", p: "Make, model, year and condition, valued as the car it is rather than a category." },
      { h: "The agreed value", p: "The figure settled up front, not argued after a total loss." },
      { h: "How it is used", p: "Weekend, show, limited-mileage or daily, each priced on the real risk." },
      { h: "Where it is kept", p: "Garaging, storage and security, which can be important underwriting details." },
    ],
    differenceImage: "/insurance/motor-difference.webp",
    differenceImageAlt:
      "The wood-rimmed wheel and dashboard dials of a classic car seen through the side window, a country house beyond.",
    whyImageSpec: {
      description: "A classic car detail: a chrome badge or wire wheel, or the car in a private garage with the house beyond. Estate rather than showroom.",
      dimensions: "1600 × 1067px landscape (3:2), WebP",
      filename: "/insurance/motor-why.webp",
    },
    whyDifferent: {
      heading: "Specialist cover, brought into the wider relationship",
      body: [
        "Classic and prestige motor is a specialist market in its own right. Through Provenance, the vehicle can also sit within the same broker relationship as the home and other private-client assets where appropriate.",
        "Agreed value can be especially useful for vehicles whose worth is not well represented by a general market-value settlement.",
      ],
    },
    detail: {
      title: "What can be arranged",
      points: [
        { h: "The range", p: "Classic, collections, family fleet, supercar and hypercar, and 4x4, typically for vehicles from £50,000 upward." },
        { h: "Agreed value", p: "An agreed value is set at inception, so a total loss pays the figure agreed rather than a disputed market value." },
        { h: "One renewal date", p: "Where the wider arrangement allows it, motor and household cover can be coordinated around the same renewal period." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance arranges classic and prestige motor cover and consolidates it with the household policy. The House introduces you; Provenance arranges and administers the cover.",
    },
    evidence: [
      { stat: "1.93m", label: "registered historic vehicles in the UK" },
      { stat: "690,777", label: "people who own them" },
    ],
    enquiryType: "classic-and-prestige-motor",
  },
  {
    slug: "boat-yacht-aviation",
    title: "Boat, yacht & aviation",
    metaTitle: "Boat, yacht and aviation insurance",
    metaDescription:
      "Cover for boats, yachts and aircraft, from a family boat to complex Lloyd's placements, arranged alongside the wider estate. Introduced by the House, arranged by Provenance.",
    hero: {
      eyebrow: "Specialist assets",
      heading: "Marine and aviation cover, arranged alongside the wider estate.",
      lede: "Boats, yachts and aircraft are insured through specialist markets with their own requirements around value, use, storage, surveys and who operates them. Provenance can arrange that cover alongside a private-client relationship.",
    },
    image: "/insurance/boat-yacht-aviation.webp",
    imageAlt: "A classic yacht's brass and teak detail, an asset arranged alongside the home on one policy.",
    whyImage: "/insurance/boat-yacht-aviation-why.webp",
    whyImageAlt: "A marine or aviation detail, the vessel a specialist prices on what it is and how it is used.",
    differenceImage: "/insurance/boat-yacht-aviation-difference.webp",
    differenceImageAlt: "A boat or aircraft detail, the usage and mooring a household policy never asks about.",
    whyImageSpec: {
      description: "A marine or aviation detail: a yacht's brass and teak fittings, a compass on a chart, a folded sail, or a wing or propeller. Warm and editorial, never a glossy superyacht in motion.",
      dimensions: "1600 × 1067px landscape (3:2), WebP",
      filename: "/insurance/boat-yacht-aviation-why.webp",
    },
    whyDifferent: {
      heading: "Specialist risks, specialist markets",
      body: [
        "Marine and aviation insurance sits outside ordinary household cover. The vessel or aircraft is assessed on its own value, use, location, surveys and operating arrangements.",
        "The benefit of arranging it through the same broker is that the asset can sit alongside the home, vehicles and collections rather than being managed in isolation.",
      ],
    },
    differenceIntro:
      "Start with the vessel or aircraft itself, how it is used, where it is kept and who operates it.",
    readiness: [
      { h: "What it is", p: "The make, length or type, and value, surveyed rather than estimated." },
      { h: "How it's used", p: "Cruising ground, racing, charter or private flying, each a different risk." },
      { h: "Where it's kept", p: "Mooring, marina, hangar or dry storage, and the security that goes with it." },
      { h: "Crew and skipper", p: "Who operates it, their experience and any professional crew." },
    ],
    detail: {
      title: "What can be arranged",
      points: [
        { h: "Boats and yachts", p: "From a family motorboat or sailing yacht to a bluewater cruiser, on agreed value." },
        { h: "Aviation", p: "Private aircraft and helicopters, through the specialist and Lloyd's markets." },
        { h: "Alongside the wider estate", p: "Arranged alongside the home, cars and collections on a single renewal date." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance works with specialist marine and aviation markets, including Lloyd’s of London where appropriate, and can coordinate the cover with a wider private-client arrangement. The House makes the introduction; Provenance arranges and administers the cover.",
    },
    crossLinks: [{ label: "Private client insurance", href: "/insurance/private-client" }],
    enquiryType: "boat-yacht-aviation",
  },
  {
    slug: "boiler-cover",
    title: "Boiler and heating cover",
    metaTitle: "Boiler and central heating cover",
    metaDescription:
      "Cover for when the boiler or central heating stops, with annual and monthly options. Introduced by the House, arranged by a regulated partner.",
    hero: {
      eyebrow: "Home cover",
      heading: "Cover for the boiler and central heating when something goes wrong.",
      lede: "Boiler and central-heating cover can help with eligible repair costs when the system breaks down, with annual or monthly options depending on the plan.",
    },
    image: "/insurance/boiler-cover.webp",
    imageAlt:
      "A warm, well-kept British home interior, standing for a home whose heating is looked after.",
    placedImage: "/insurance/house-record.webp",
    placedImageAlt:
      "A leather ledger beside service notes, standing for the boiler service history a cover plan is built around.",
    whyImage: "/insurance/boiler-why.webp",
    whyImageAlt:
      "A well-kept boiler and heating system, the age and service history a cover plan is built around.",
    differenceImage: "/insurance/boiler-difference.webp",
    differenceImageAlt:
      "A boiler and heating detail, the system and its service history a plan is priced on.",
    whyImageSpec: {
      description: "A heating engineer's hands servicing a boiler, or a neat, well-kept plant room or airing cupboard. Competent and reassuring.",
      dimensions: "1600 × 1067px landscape (3:2), WebP",
      filename: "/insurance/boiler-why.webp",
    },
    differenceIntro:
      "The useful details are the age of the boiler, its service history, the parts of the heating system included and the limits of the plan.",
    readiness: [
      { h: "The boiler's age", p: "How old the system is, and whether it is still economically worth repairing." },
      { h: "The service history", p: "Whether it has been serviced, which keeps a system insurable and the terms sensible." },
      { h: "What's included", p: "The engineer, parts and labour, and whether an annual service is part of the plan." },
      { h: "Controls and heating", p: "The controls and central heating, not the boiler in isolation." },
    ],
    whyDifferent: {
      heading: "What to look for in boiler cover",
      body: [
        "Boiler and central-heating plans can cover eligible engineer visits, parts and labour when the system breaks down. Some plans also include an annual service.",
        "Age, service history, existing faults and the condition of the system can affect what a plan will accept and what it will pay for.",
      ],
    },
    detail: {
      title: "The cover options",
      points: [
        { h: "Boiler and controls", p: "Cover for the boiler, the controls and the central heating, with the annual service usually included." },
        { h: "Annual or monthly", p: "Pay yearly or spread it monthly. The House introduces you; the plan is arranged and administered by the partner." },
        { h: "Service history helps", p: "A documented service history can help establish the condition and maintenance of the system, so keep the records to hand." },
      ],
    },
    placed: {
      heading: "What the partner can place",
      body: "Cover is arranged and administered by a regulated partner. The House makes the introduction; the partner arranges the cover.",
    },
    crossLinks: [{ label: "Appliance cover", href: "/insurance/appliance-cover" }],
    limitations: {
      heading: "What boiler cover does not include",
      intro:
        "Boiler and heating cover has limits and exclusions. These are common areas to check, but the plan terms govern the cover.",
      points: [
        { h: "Old or unserviceable systems", p: "Very old boilers, or systems that cannot be economically repaired, are often excluded or capped. Age and service history decide what a plan will take on." },
        { h: "Pre-existing faults and no maintenance", p: "A fault that already exists when cover starts, and breakdowns caused by a lack of servicing, are not covered." },
        { h: "Sludge, scale and parts availability", p: "System sludge, scale and obsolete parts can affect what a plan will pay for or whether a repair is possible." },
        { h: "Not advice", p: "The House introduces you to a regulated partner and does not advise on cover. Limits and exclusions are set out in the plan documents." },
      ],
      note: "The plan terms and exclusions come from the partner before you commit.",
    },
    enquiryType: "boiler-cover",
  },
  {
    slug: "appliance-cover",
    title: "Appliance cover",
    metaTitle: "Household appliance cover",
    metaDescription:
      "Cover for the household appliances you rely on, a single item or the whole kitchen, from washing machines to ovens. Introduced by the House, arranged by a regulated partner.",
    hero: {
      eyebrow: "Home cover",
      heading: "Cover for the appliances a household relies on.",
      lede: "Cover for eligible repair or replacement when a household appliance fails outside its manufacturer warranty, from a single appliance to several across the home.",
    },
    image: "/insurance/appliance-cover.webp",
    imageAlt:
      "A considered British kitchen interior, standing for the household appliances a home relies on.",
    placedImage: "/insurance/house-record.webp",
    placedImageAlt:
      "A leather ledger and receipts, standing for the appliance details a cover plan is built around.",
    whyImage: "/insurance/appliance-why.webp",
    whyImageAlt:
      "A considered British kitchen, the household appliances a cover plan is built around.",
    differenceImage: "/insurance/appliance-difference.webp",
    differenceImageAlt:
      "A kitchen appliance detail, the age and replacement cost a specialist asks about.",
    whyImageSpec: {
      description: "A calm British kitchen detail: integrated appliances in a considered kitchen, or a hand loading a washing machine. Everyday and well-kept.",
      dimensions: "1600 × 1067px landscape (3:2), WebP",
      filename: "/insurance/appliance-why.webp",
    },
    differenceIntro:
      "Start with the appliances themselves, their age, warranty status and the basis on which a plan repairs or replaces them.",
    readiness: [
      { h: "Which appliances", p: "A single valued machine, or the whole kitchen and utility room together." },
      { h: "Age and warranty", p: "Whether each is in or out of its manufacturer warranty." },
      { h: "Repair or replace", p: "Repair where sensible, replacement where a machine cannot be economically fixed." },
      { h: "The replacement cost", p: "The amount the plan will pay towards repair or replacement, which may differ from the original purchase price." },
    ],
    whyDifferent: {
      heading: "One appliance or several",
      body: [
        "Appliance cover can apply to a single item or several household appliances, depending on the plan. It is designed for eligible mechanical or electrical failure outside the manufacturer warranty.",
        "Model details, purchase dates and warranty information make it easier to understand what is already protected and what additional cover may be useful.",
      ],
    },
    detail: {
      title: "How it is arranged",
      points: [
        { h: "One item or many", p: "Cover a single high-value appliance, or bundle the kitchen and utility room together." },
        { h: "Repair or replace", p: "Plans cover repair, and replacement where a machine cannot be economically fixed." },
        { h: "Keep the details to hand", p: "Receipts, model numbers and purchase dates make it easier to check warranties and understand the cover in place." },
      ],
    },
    placed: {
      heading: "What the partner can place",
      body: "Cover is arranged and administered by a regulated partner. The House makes the introduction; the partner arranges the cover.",
    },
    crossLinks: [{ label: "Boiler and heating cover", href: "/insurance/boiler-cover" }],
    limitations: {
      heading: "What appliance cover does not include",
      intro:
        "Appliance cover repairs or replaces machines that fail, within limits. These are the usual ones; the plan terms govern.",
      points: [
        { h: "Cosmetic and accidental damage", p: "Scratches, dents and accidental damage are not the same as mechanical failure, and are usually excluded unless specifically added." },
        { h: "Pre-existing faults and misuse", p: "A fault present before cover started, and failure caused by misuse or improper installation, are not covered." },
        { h: "Age and replacement basis", p: "Older appliances may be settled on a contribution or like-for-like basis rather than a new-for-old replacement. Plans differ, so the basis is worth checking." },
        { h: "Not advice", p: "The House introduces you to a regulated partner and does not advise on cover. Limits and exclusions are set out in the plan documents." },
      ],
      note: "The plan terms and exclusions come from the partner before you commit.",
    },
    enquiryType: "appliance-cover",
  },
];

/**
 * "Explore related cover" cross-sell pools, injected by category so a visitor
 * who lands on one risk sees the related ones (the directive's single-estate
 * argument). The template excludes the current page and caps the grid at three.
 */
const RELATED_PROPERTY = {
  title: "Explore related cover",
  items: [
    { name: "Private client & estate", body: "Advised cover for period & high-value homes.", href: "/insurance/private-client", image: "/insurance/cat-house.webp", imageAlt: "A period house insured on its true rebuild cost." },
    { name: "Listed buildings", body: "Grade I, II* and II homes.", href: "/insurance/listed-buildings", image: "/insurance/listed.webp", imageAlt: "A listed period home." },
    { name: "Thatched properties", body: "Thatch, read on its real risk.", href: "/insurance/thatched-properties", image: "/insurance/thatched.webp", imageAlt: "A thatched cottage." },
    { name: "Non-standard construction", body: "Timber, cob, flint and more.", href: "/insurance/non-standard-construction", image: "/insurance/non-standard.webp", imageAlt: "A home of non-standard construction." },
    { name: "Second & holiday homes", body: "Cover that fits real occupancy.", href: "/insurance/second-homes", image: "/insurance/holiday-home.webp", imageAlt: "A quiet holiday home." },
    { name: "Unoccupied & probate", body: "Empty homes, calmly covered.", href: "/insurance/unoccupied-property", image: "/insurance/probate.webp", imageAlt: "A home standing empty during probate." },
    { name: "Renovation & works", body: "One policy for the works.", href: "/insurance/renovation-and-extension", image: "/insurance/renovation.webp", imageAlt: "A home under renovation." },
  ],
};
const RELATED_ASSETS = {
  title: "The rest of the estate",
  items: [
    { name: "Private client & estate", body: "The whole estate on one policy.", href: "/insurance/private-client", image: "/insurance/cat-house.webp", imageAlt: "A period house." },
    { name: "Fine art, jewellery & collections", body: "Art, jewellery, watches and wine.", href: "/insurance/fine-art-and-collections", image: "/insurance/cat-fine-art.webp", imageAlt: "Fine art and collected pieces." },
    { name: "Classic & prestige motor", body: "The car, on one renewal date.", href: "/insurance/classic-and-prestige-motor", image: "/insurance/cat-cars.webp", imageAlt: "A classic car." },
    { name: "Boat, yacht & aviation", body: "Marine and aviation, on the estate.", href: "/insurance/boat-yacht-aviation", image: "/insurance/boat-yacht-aviation.webp", imageAlt: "A classic yacht detail." },
    { name: "Listed & period homes", body: "The house it all sits in.", href: "/insurance/listed-buildings", image: "/insurance/listed.webp", imageAlt: "A listed period home." },
  ],
};
const RELATED_HOMECOVER = {
  title: "Explore related cover",
  items: [
    { name: "Boiler & heating cover", body: "When the heating stops.", href: "/insurance/boiler-cover", image: "/insurance/boiler-cover.webp", imageAlt: "A well-kept home interior." },
    { name: "Appliance cover", body: "The machines a home runs on.", href: "/insurance/appliance-cover", image: "/insurance/appliance-cover.webp", imageAlt: "A considered British kitchen." },
    { name: "Home insurance", body: "Buildings and contents.", href: "/insurance/everyday/home", image: "/insurance/ev-home.webp", imageAlt: "A well-kept everyday home." },
    { name: "Private client & estate", body: "Advised cover for high-value homes.", href: "/insurance/private-client", image: "/insurance/cat-house.webp", imageAlt: "A period house." },
  ],
};
const RELATED_BUSINESS = {
  title: "Explore business cover",
  items: [
    { name: "Business insurance", body: "The commercial overview.", href: "/insurance/business", image: "/insurance/cat-business.webp", imageAlt: "The trades and studios in the House's network." },
    { name: "Trades & contractors", body: "Liability, tools and works.", href: "/insurance/business/trades-and-contractors", image: "/insurance/trades-hero.webp", imageAlt: "A House Approved trade at work." },
    { name: "Professional indemnity", body: "Cover for advice given.", href: "/insurance/business/professional-indemnity", image: "/insurance/pi-hero.webp", imageAlt: "A professional's desk and drawings." },
  ],
};

const PROPERTY_SLUGS = new Set([
  "listed-buildings", "thatched-properties", "non-standard-construction",
  "second-homes", "unoccupied-property", "renovation-and-extension",
]);
const ASSET_SLUGS = new Set(["fine-art-and-collections", "classic-and-prestige-motor", "boat-yacht-aviation"]);
const HOMECOVER_SLUGS = new Set(["boiler-cover", "appliance-cover"]);

/** Attach the right cross-sell pool to a page (unless it already has one). */
function withRelated(page: SpecialistPage | undefined): SpecialistPage | undefined {
  if (!page || page.relatedCovers) return page;
  const rc = PROPERTY_SLUGS.has(page.slug)
    ? RELATED_PROPERTY
    : ASSET_SLUGS.has(page.slug)
      ? RELATED_ASSETS
      : HOMECOVER_SLUGS.has(page.slug)
        ? RELATED_HOMECOVER
        : undefined;
  return rc ? { ...page, relatedCovers: rc } : page;
}

/**
 * The two contextual links under each page's "What Provenance can place" band:
 * one relevant sibling cover and one relevant guide. Centralised so every page
 * carries the same pair (a cover + a guide), not an ad-hoc single link.
 */
const CROSS_LINKS: Record<string, { label: string; href: string }[]> = {
  // Specialist property
  "listed-buildings": [
    { label: "Thatched property insurance", href: "/insurance/thatched-properties" },
    { label: "Guide: insuring a listed building", href: "/insurance/guides/listed-building-insurance" },
  ],
  "thatched-properties": [
    { label: "Listed building insurance", href: "/insurance/listed-buildings" },
    { label: "Guide: insuring a listed building", href: "/insurance/guides/listed-building-insurance" },
  ],
  "non-standard-construction": [
    { label: "Listed building insurance", href: "/insurance/listed-buildings" },
    { label: "Guide: what a rebuild cost is", href: "/insurance/guides/rebuild-cost" },
  ],
  "second-homes": [
    { label: "Unoccupied & probate cover", href: "/insurance/unoccupied-property" },
    { label: "Guide: when to renew", href: "/insurance/guides/renewal" },
  ],
  "unoccupied-property": [
    { label: "Second & holiday home insurance", href: "/insurance/second-homes" },
    { label: "Guide: when to renew", href: "/insurance/guides/renewal" },
  ],
  "renovation-and-extension": [
    { label: "Non-standard construction cover", href: "/insurance/non-standard-construction" },
    { label: "Guide: insurance during building work", href: "/insurance/guides/renovation-insurance" },
  ],
  // Assets
  "fine-art-and-collections": [
    { label: "Private client & estate insurance", href: "/insurance/private-client" },
    { label: "Guide: the underinsurance gap", href: "/insurance/guides/underinsurance" },
  ],
  "classic-and-prestige-motor": [
    { label: "Boat, yacht & aviation insurance", href: "/insurance/boat-yacht-aviation" },
    { label: "Guide: the underinsurance gap", href: "/insurance/guides/underinsurance" },
  ],
  "boat-yacht-aviation": [
    { label: "Classic & prestige motor insurance", href: "/insurance/classic-and-prestige-motor" },
    { label: "Guide: the underinsurance gap", href: "/insurance/guides/underinsurance" },
  ],
  // Home cover
  "boiler-cover": [
    { label: "Appliance cover", href: "/insurance/appliance-cover" },
    { label: "Guide: when to renew", href: "/insurance/guides/renewal" },
  ],
  "appliance-cover": [
    { label: "Boiler & heating cover", href: "/insurance/boiler-cover" },
    { label: "Guide: when to renew", href: "/insurance/guides/renewal" },
  ],
  // Everyday
  "home": [
    { label: "Private client & estate insurance", href: "/insurance/private-client" },
    { label: "Guide: what a rebuild cost is", href: "/insurance/guides/rebuild-cost" },
  ],
  "motor": [
    { label: "Classic & prestige motor insurance", href: "/insurance/classic-and-prestige-motor" },
    { label: "Guide: when to renew", href: "/insurance/guides/renewal" },
  ],
  "pet-and-travel": [
    { label: "Breakdown & bicycle cover", href: "/insurance/everyday/breakdown-and-bicycle" },
    { label: "Guide: when to renew", href: "/insurance/guides/renewal" },
  ],
  "breakdown-and-bicycle": [
    { label: "Car, van & motorbike insurance", href: "/insurance/everyday/motor" },
    { label: "Guide: when to renew", href: "/insurance/guides/renewal" },
  ],
  // Business
  "business": [
    { label: "Trades & contractors insurance", href: "/insurance/business/trades-and-contractors" },
    { label: "Guide: when to renew", href: "/insurance/guides/renewal" },
  ],
  "trades-and-contractors": [
    { label: "Professional indemnity insurance", href: "/insurance/business/professional-indemnity" },
    { label: "Guide: when to renew", href: "/insurance/guides/renewal" },
  ],
  "professional-indemnity": [
    { label: "Trades & contractors insurance", href: "/insurance/business/trades-and-contractors" },
    { label: "Guide: when to renew", href: "/insurance/guides/renewal" },
  ],
};

/** Attach the contextual cover + guide pair for a page. */
function withCrossLinks(page: SpecialistPage | undefined): SpecialistPage | undefined {
  if (!page) return page;
  const cl = CROSS_LINKS[page.slug];
  return cl ? { ...page, crossLinks: cl } : page;
}

export function getSpecialistPage(slug: string): SpecialistPage | undefined {
  return withCrossLinks(withRelated(SPECIALIST_PAGES.find((p) => p.slug === slug)));
}

export const SPECIALIST_SLUGS = SPECIALIST_PAGES.map((p) => p.slug);

/**
 * Everyday cover products, rendered on the SAME SpecialistPage template as the
 * specialist pages (per direction: every insurance product page shares the
 * fine-art structure). They keep their /insurance/everyday/[slug] URLs. Each
 * carries its own "questions a comparison form never asks" set so none of them
 * inherit the property (roof/fabric) default.
 */
/** The four everyday covers, shown as a cross-sell grid on each everyday page. */
const EVERYDAY_COVERS_GRID = {
  title: "Explore everyday cover",
  items: [
    { name: "Home", body: "Buildings and contents.", href: "/insurance/everyday/home", image: "/insurance/ev-home.webp", imageAlt: "A well-kept everyday home." },
    { name: "Car, van & motorbike", body: "Including temporary cover.", href: "/insurance/everyday/motor", image: "/insurance/ev-motor.webp", imageAlt: "A car and van outside a home." },
    { name: "Pet & travel", body: "Pet, and single or annual travel.", href: "/insurance/everyday/pet-and-travel", image: "/insurance/ev-pet.webp", imageAlt: "A pet's collar and travel things on a table." },
    { name: "Breakdown & bicycle", body: "Roadside, and bicycle cover.", href: "/insurance/everyday/breakdown-and-bicycle", image: "/insurance/ev-breakdown.webp", imageAlt: "A bicycle kept ready by the door." },
  ],
};

export const EVERYDAY_SPECIALIST_PAGES: SpecialistPage[] = [
  {
    slug: "home",
    title: "Home insurance",
    metaTitle: "Home insurance",
    metaDescription:
      "Buildings and contents insurance introduced by the House and arranged by Provenance, with specialist routes available for period, listed and high-value homes.",
    hero: {
      eyebrow: "Everyday cover",
      heading: "Home insurance that starts with the home itself.",
      lede: "Buildings and contents cover for houses and flats, arranged around the property and what you want to protect. The House makes the introduction and Provenance arranges the policy.",
    },
    image: "/insurance/ev-home.webp",
    imageAlt: "A well-kept everyday home, the kind covered by straightforward buildings and contents insurance.",
    whyImage: "/insurance/home-why.webp",
    whyImageAlt:
      "A calm, well-kept British home, the everyday house a standard policy is built for.",
    differenceImage: "/insurance/home-difference.webp",
    differenceImageAlt:
      "A lived-in British home, the everyday details a short conversation gets right.",
    whyImageSpec: {
      description: "A calm, well-kept British home from the outside, or a lived-in room in soft daylight. Ordinary and cared for.",
      dimensions: "1600 × 1067px landscape (3:2), WebP",
      filename: "/insurance/home-why.webp",
    },
    whyDifferent: {
      heading: "Start with the home itself",
      body: [
        "The right home cover depends on the building, the contents, the rebuild figure and how the property is used, not simply the address.",
        "Provenance can arrange the buildings, contents and optional cover that fit the property, and route more specialist homes to its advised service where needed.",
      ],
    },
    differenceIntro:
      "The useful questions are practical: what needs covering, what the home would cost to rebuild, which belongings need separate limits and how the property is used.",
    readiness: [
      { h: "Buildings or contents", p: "What needs covering: the structure, what is inside, or both." },
      { h: "The rebuild figure", p: "What it would cost to rebuild, which is not the market value." },
      { h: "The everyday risks", p: "Escape of water, accidental damage and any optional cover you may want to add." },
      { h: "How it is lived in", p: "How the property is used day to day can affect the cover and terms." },
    ],
    detail: {
      title: "What can be covered",
      points: [
        { h: "Buildings", p: "Cover for the structure of the home itself." },
        { h: "Contents", p: "Cover for belongings in the home, set at an appropriate overall level." },
        { h: "Optional cover", p: "Additional cover such as accidental damage, where it is wanted and available." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance arranges buildings and contents cover and can route period, listed or high-value homes to its advised Private Client service where that is more appropriate. The House makes the introduction.",
    },
    limitations: {
      heading: "What home cover does not include",
      intro:
        "Home insurance has limits and exclusions. These are common areas to check, but the policy wording is what governs the cover.",
      points: [
        { h: "Wear, tear and gradual damage", p: "Ageing, damp and leaks that develop gradually are generally treated as maintenance issues rather than insured events." },
        { h: "Under-insurance", p: "If the rebuild figure or contents value is too low, a claim may be reduced. Rebuild cost is different from market value." },
        { h: "Single-item and valuables limits", p: "Higher-value belongings may need to be listed separately, and cover away from the home may need to be added specifically." },
        { h: "Not advice", p: "The House introduces you to Provenance and does not advise on cover. Limits and exclusions are set out in the policy documents." },
      ],
      note: "The policy wording and exclusions come from Provenance before you commit.",
    },
    crossLinks: [{ label: "Period, listed or high-value home? Speak to a specialist", href: "/insurance/private-client" }],
    relatedCovers: EVERYDAY_COVERS_GRID,
    enquiryType: "home",
  },
  {
    slug: "motor",
    title: "Car, van and motorbike",
    metaTitle: "Car, van and motorbike insurance",
    metaDescription:
      "Everyday motor cover for car, van and motorbike, plus temporary cover from one hour to 28 days. Introduced by the House, arranged by Provenance.",
    hero: {
      eyebrow: "Everyday cover",
      heading: "Cover for the car, van or motorbike you rely on.",
      lede: "Motor insurance for cars, vans and motorbikes, including temporary cover where you only need it for a short period.",
    },
    image: "/insurance/ev-motor.webp",
    imageAlt: "A car and van at a home, standing for everyday motor cover including temporary use.",
    whyImage: "/insurance/motor-everyday-why.webp",
    whyImageAlt:
      "An everyday car and van, the vehicle and use a short conversation prices on the real risk.",
    differenceImage: "/insurance/motor-everyday-difference.webp",
    differenceImageAlt:
      "Everyday motor cover, the class of use a comparison form flattens to a postcode.",
    whyImageSpec: {
      description: "An everyday car and van on a home driveway, or keys and a licence on a hall table. Practical and unglamorous.",
      dimensions: "1600 × 1067px landscape (3:2), WebP",
      filename: "/insurance/motor-everyday-why.webp",
    },
    whyDifferent: {
      heading: "Cover that reflects how the vehicle is used",
      body: [
        "The vehicle, the drivers, where it is kept and how it is used all affect the cover. Those details matter more than a headline price on its own.",
        "Provenance can arrange everyday motor cover and temporary options, with specialist routes available for classic, prestige and collection vehicles.",
      ],
    },
    differenceIntro:
      "The useful questions are about the vehicle, the drivers, the class of use, where it is kept and whether the cover is needed for a year or only a short period.",
    readiness: [
      { h: "Car, van or bike", p: "The vehicle and its class of use, which both affect the risk and premium." },
      { h: "Level of cover", p: "Third-party, third-party fire and theft, or comprehensive." },
      { h: "Temporary needs", p: "Cover from one hour to 28 days, for borrowing or lending." },
      { h: "Optional extras", p: "Breakdown, legal and key cover, where available and useful to you." },
    ],
    detail: {
      title: "What can be arranged",
      points: [
        { h: "Car", p: "Private car insurance for everyday motoring." },
        { h: "Van and motorbike", p: "Private and light-commercial van use, and bikes and scooters." },
        { h: "Temporary cover", p: "From one hour to 28 days, for borrowing, lending or a short need." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance arranges everyday motor cover across car, van, motorbike and temporary use. The House introduces you; Provenance arranges and administers the cover.",
    },
    limitations: {
      heading: "What motor cover does not include",
      intro:
        "Motor policies have clear limits and conditions. These are common areas to check, but the policy wording is what governs the cover.",
      points: [
        { h: "Wear and mechanical breakdown", p: "General wear, servicing and mechanical breakdown are not part of a motor policy unless breakdown cover is added separately." },
        { h: "The wrong class of use", p: "The declared class of use and named drivers need to match how the vehicle is actually used. A mismatch can affect a claim." },
        { h: "Excess and modifications", p: "An excess may apply to a claim, and modifications need to be declared where required by the insurer." },
        { h: "Not advice", p: "The House introduces you to Provenance and does not advise on cover. Limits and exclusions are set out in the policy documents." },
      ],
      note: "The policy wording and exclusions come from Provenance before you commit.",
    },
    crossLinks: [{ label: "A classic or prestige vehicle? Speak to a specialist", href: "/insurance/classic-and-prestige-motor" }],
    relatedCovers: EVERYDAY_COVERS_GRID,
    enquiryType: "motor",
  },
  {
    slug: "pet-and-travel",
    title: "Pet and travel",
    metaTitle: "Pet and travel insurance",
    metaDescription:
      "Pet cover, and single-trip or annual travel including specialist medical. Introduced by the House, arranged by Provenance.",
    hero: {
      eyebrow: "Everyday cover",
      heading: "Cover for the pet at home and the trips away.",
      lede: "Pet insurance for cats and dogs, alongside single-trip, annual multi-trip and specialist travel cover arranged through Provenance.",
    },
    image: "/insurance/ev-pet.webp",
    imageAlt: "A pet's collar, leash and travel things on a table, standing for everyday pet and travel cover.",
    whyImage: "/insurance/pet-why.webp",
    whyImageAlt:
      "A pet at home in soft light, the animal a short conversation shapes the cover around.",
    differenceImage: "/insurance/pet-difference.webp",
    differenceImageAlt:
      "A pet and travel still life, the animal and the trip a comparison form never asks about.",
    whyImageSpec: {
      description: "A dog or cat at home in soft light, or a packed weekend bag by the door. Warm and domestic.",
      dimensions: "1600 × 1067px landscape (3:2), WebP",
      filename: "/insurance/pet-why.webp",
    },
    whyDifferent: {
      heading: "The details matter before you choose",
      body: [
        "For pet cover, age, breed, previous conditions and the level of veterinary fees can matter. For travel, the destination, length of trip and medical declarations can change what is available.",
        "Getting those details right at the outset makes it easier to compare the cover on its terms, rather than discovering an exclusion only when you need to claim.",
      ],
    },
    differenceIntro:
      "Start with the animal or the trip, then look closely at the limits, excesses and exclusions that apply to the cover.",
    readiness: [
      { h: "The animal", p: "The pet, its age and breed, and the level of veterinary-fee cover required." },
      { h: "Existing conditions", p: "Any previous or existing conditions that may affect the cover available." },
      { h: "One trip or many", p: "Single-trip, or annual multi-trip for several journeys a year." },
      { h: "Specialist medical", p: "Travel cover where existing medical conditions need declaring." },
    ],
    detail: {
      title: "What can be arranged",
      points: [
        { h: "Pet", p: "Cover for eligible veterinary costs and other insured pet risks, subject to the policy terms." },
        { h: "Travel", p: "Single-trip for one holiday, or annual multi-trip for several a year." },
        { h: "Specialist medical travel", p: "Where existing medical conditions need covering." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance arranges pet cover and single-trip or annual travel, including specialist medical travel. The House introduces you; Provenance arranges and administers the cover.",
    },
    limitations: {
      heading: "What pet and travel cover does not include",
      intro:
        "Pet and travel policies can differ significantly in their limits and exclusions. These are common areas to check, but the policy wording governs the cover.",
      points: [
        { h: "Pre-existing conditions", p: "Existing or previous conditions may be excluded unless the policy specifically accepts them." },
        { h: "Undeclared medical history (travel)", p: "Travel cover can be affected if an existing medical condition is not declared where the policy requires it. Specialist medical travel cover may be available." },
        { h: "Time limits and excesses", p: "Veterinary-fee cover can have limits by condition or policy year, and pet and travel policies may carry an excess. Routine and preventive treatment is generally outside pet insurance." },
        { h: "Not advice", p: "The House introduces you to Provenance and does not advise on cover. Limits and exclusions are set out in the policy documents." },
      ],
      note: "The policy wording and exclusions come from Provenance before you commit.",
    },
    relatedCovers: EVERYDAY_COVERS_GRID,
    enquiryType: "pet-and-travel",
  },
  {
    slug: "breakdown-and-bicycle",
    title: "Breakdown and bicycle",
    metaTitle: "Breakdown and bicycle cover",
    metaDescription:
      "Roadside, recovery and home-start breakdown cover, and cover for road, mountain, electric and high-value bicycles. Introduced by the House, arranged by Provenance.",
    hero: {
      eyebrow: "Everyday cover",
      heading: "Breakdown and bicycle cover for everyday journeys.",
      lede: "Roadside and recovery cover for the vehicle, and insurance for road, mountain, electric and higher-value bicycles.",
    },
    image: "/insurance/ev-breakdown.webp",
    imageAlt: "A bicycle kept ready by the door, standing for breakdown and bicycle cover.",
    whyImage: "/insurance/breakdown-why.webp",
    whyImageAlt:
      "A bicycle and the smaller everyday kit, the level of cover a short conversation sets right.",
    differenceImage: "/insurance/breakdown-difference.webp",
    differenceImageAlt:
      "Breakdown and bicycle cover, the level and use a comparison form flattens to a default.",
    whyImageSpec: {
      description: "A bicycle by a front door or in a hallway, or a car on a quiet road at dusk. Everyday and calm.",
      dimensions: "1600 × 1067px landscape (3:2), WebP",
      filename: "/insurance/breakdown-why.webp",
    },
    whyDifferent: {
      heading: "Choose the level that matches how you travel",
      body: [
        "Breakdown cover can range from roadside assistance to home start and national recovery. Bicycle cover varies by value, use, security requirements and whether the bike is away from home.",
        "The useful comparison is not just price, but whether the level of cover matches the journeys you make and the bicycle you own.",
      ],
    },
    differenceIntro:
      "Start with where you travel, the level of roadside help you want and the type and value of bicycle that needs covering.",
    readiness: [
      { h: "Level of breakdown", p: "Roadside assistance, recovery and home start, depending on the level selected." },
      { h: "Where you break down", p: "Whether you want roadside help only, recovery further afield or assistance at home." },
      { h: "The bike", p: "Road, mountain, electric or higher-value, with the sum insured set accordingly." },
      { h: "Away from home", p: "Whether the bicycle needs cover away from home, while travelling or in storage." },
    ],
    detail: {
      title: "What can be arranged",
      points: [
        { h: "Breakdown", p: "Roadside assistance, recovery and home start." },
        { h: "Bicycle", p: "Road, mountain, electric and high-value bikes." },
        { h: "Match the level to the journey", p: "Choose the breakdown level and bicycle cover around how and where you actually travel." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance arranges breakdown cover and bicycle cover across the full range of bikes. The House introduces you; Provenance arranges and administers the cover.",
    },
    limitations: {
      heading: "What breakdown and bicycle cover does not include",
      intro:
        "Breakdown and bicycle cover both depend on the level selected. These are common areas to check, but the policy wording governs.",
      points: [
        { h: "The level you chose", p: "Roadside-only cover does not include every recovery or home-start benefit. The level selected determines what help is available." },
        { h: "Pre-existing faults", p: "A known fault, or a vehicle already broken down when cover starts, is not covered." },
        { h: "Bicycle limits and security", p: "Bicycle cover is limited to the sum insured and may require an approved lock or other security conditions. Wear and unsecured theft are commonly excluded." },
        { h: "Not advice", p: "The House introduces you to Provenance and does not advise on cover. Limits and exclusions are set out in the policy documents." },
      ],
      note: "The policy wording and exclusions come from Provenance before you commit.",
    },
    relatedCovers: EVERYDAY_COVERS_GRID,
    enquiryType: "breakdown-and-bicycle",
  },
];

export function getEverydaySpecialistPage(slug: string): SpecialistPage | undefined {
  return withCrossLinks(EVERYDAY_SPECIALIST_PAGES.find((p) => p.slug === slug));
}

export const EVERYDAY_SPECIALIST_SLUGS = EVERYDAY_SPECIALIST_PAGES.map((p) => p.slug);

/**
 * Business (B2B) pages, rendered on the SAME SpecialistPage template. They keep
 * the "Request a review" silent-review device (hero CTA + enquiry), add a
 * company field, and carry their own commercial "questions a comparison form
 * never asks" set. The hub lives at /insurance/business; the rest under it.
 */
const BUSINESS_ENQUIRY = {
  eyebrow: "Request a review",
  heading: "Ask for a review of your existing cover.",
  body: "Leave your details and a Provenance specialist will contact you about a no-obligation review of the insurance you already hold. The House only collects what it needs to make the introduction.",
  submitLabel: "Request a review",
  withCompany: true,
} as const;

export const BUSINESS_SPECIALIST_PAGES: SpecialistPage[] = [
  {
    slug: "business",
    title: "Business insurance",
    metaTitle: "Business insurance broker introductions",
    metaDescription:
      "Business insurance introduced by the House and arranged by Provenance, with a no-obligation review of existing cover for businesses in the House network.",
    hero: {
      eyebrow: "Business",
      heading: "Business insurance built around the business you actually run.",
      lede: "Commercial insurance needs to reflect the work, the people, the premises and the risks behind the business. The House makes the introduction and Provenance reviews and arranges the cover.",
    },
    image: "/insurance/cat-business.webp",
    imageAlt: "The trades and studios in the House's own network, covered for commercial, liability and professional risk.",
    whyImage: "/insurance/business-why.webp",
    whyImageAlt:
      "A working studio or workshop in the House's network, the real work a commercial policy is built around.",
    differenceImage: "/insurance/business-difference.webp",
    differenceImageAlt:
      "A working business at close quarters, the exposure a comparison form cannot price.",
    whyImageSpec: {
      description: "A working studio or workshop in the House's network: hands at a bench, a site meeting, or tools in use. Real work, well kept.",
      dimensions: "1600 × 1067px landscape (3:2), WebP",
      filename: "/insurance/business-why.webp",
    },
    whyDifferent: {
      heading: "Who this is for",
      body: [
        "Businesses, contractors, suppliers and members of the House network looking for a detailed review of their commercial insurance.",
        "The starting point is the business as it operates today, including the cover already in place and any gaps or overlaps worth addressing.",
      ],
    },
    differenceIntro:
      "Commercial cover should follow the real activities and exposures of the business, rather than relying on a broad category alone.",
    readiness: [
      { h: "What the business does", p: "The activities, sites, people and customers that shape the risk." },
      { h: "The liabilities", p: "Public, employers’ and product liability, set at levels appropriate to the work." },
      { h: "The moving parts", p: "Tools, stock, vehicles, premises and cyber exposures, where relevant." },
      { h: "What is already held", p: "The policies already in place, reviewed for gaps, duplication and suitability." },
    ],
    detail: {
      title: "A review of the cover you already hold",
      points: [
        { h: "Review the existing cover", p: "Provenance can review the current arrangements for gaps, under-insurance, unnecessary cover and the level of premium. Nothing changes unless you choose to make a change." },
        { h: "Built for the business, not a category", p: "The review starts with how the business operates and the risks it carries, then matches those needs to suitable commercial cover." },
        { h: "Home and business, where relevant", p: "Where both personal and business risks need attention, Provenance can look at them within the same broker relationship." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Business combined, professional indemnity, directors' and officers', property owners, fleet from two vehicles, motor trade and cyber. The House introduces you; Provenance arranges and administers the cover.",
    },
    crossLinks: [
      { label: "Trades & contractors", href: "/insurance/business/trades-and-contractors" },
      { label: "Professional indemnity", href: "/insurance/business/professional-indemnity" },
    ],
    heroCta: "Request a review",
    enquiry: BUSINESS_ENQUIRY,
    sourcePath: "/insurance/business",
    enquiryType: "business",
  },
  {
    slug: "trades-and-contractors",
    title: "Trades and contractors",
    metaTitle: "Tradesman and contractor insurance",
    metaDescription:
      "Insurance for trades and contractors, including liability, tools, contract works and professional indemnity where relevant. Introduced by the House and arranged by Provenance.",
    hero: {
      eyebrow: "Business",
      heading: "Insurance for the work, the tools and the liability that comes with the job.",
      lede: "Trades and contractors can need several kinds of cover working together. The House introduces you to Provenance to review the work you do and arrange the cover around it.",
    },
    image: "/insurance/trades-hero.webp",
    imageAlt: "A House Approved trade at work, the kind of professional the House introduces for commercial cover.",
    whyImage: "/insurance/trades-why.webp",
    whyImageAlt:
      "A trade's tools and work in a fine home, the liability and contract works a specialist sizes to the job.",
    differenceImage: "/insurance/trades-difference.webp",
    differenceImageAlt:
      "A working trade at close quarters, the jobs and sites a comparison form prices as a category.",
    whyImageSpec: {
      description: "A House Approved trade at work in a fine period home: careful hands, dust sheets, tools laid out with care.",
      dimensions: "1600 × 1067px landscape (3:2), WebP",
      filename: "/insurance/trades-why.webp",
    },
    whyDifferent: {
      heading: "What a trade actually needs",
      body: [
        "Public and employers' liability, tools cover, contract works, and professional indemnity where design is part of the job. A specialist can put the relevant covers together around the work the business actually does.",
        "For House Approved professionals, insurance is part of the evidence required to show that the business is set up to take on the work responsibly.",
      ],
    },
    differenceIntro:
      "The right cover depends on the trade, the jobs undertaken, the sites worked on, the people employed and whether any design responsibility sits with the business.",
    readiness: [
      { h: "The work", p: "The trades carried out, and the sites and clients they are done for." },
      { h: "Liability limits", p: "Public and employers' liability set against real jobs and headcount." },
      { h: "Tools and works", p: "Tools and equipment, plus contract works where the business is responsible for them." },
      { h: "Design exposure", p: "Professional indemnity where the work includes design, specification or professional advice." },
    ],
    detail: {
      title: "The detail",
      points: [
        { h: "Liability, sized to the work", p: "Public and employers’ liability limits should reflect the jobs, sites and headcount of the business." },
        { h: "Tools and contract works", p: "Cover can include tools and equipment, as well as contract works while a project is underway." },
        { h: "Indicative premiums", p: "Tradesperson cover typically runs around £360 to £540 a year. Figures are indicative and confirmed case by case, pending Provenance sign-off." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Liability, tools, contract works, professional indemnity and the wider commercial combined cover a trade needs. The House introduces you; Provenance arranges and administers the cover.",
    },
    crossLinks: [
      { label: "Professional indemnity", href: "/insurance/business/professional-indemnity" },
      { label: "Business insurance overview", href: "/insurance/business" },
    ],
    heroCta: "Request a review",
    enquiry: BUSINESS_ENQUIRY,
    sourcePath: "/insurance/business/trades-and-contractors",
    enquiryType: "trades-and-contractors",
  },
  {
    slug: "professional-indemnity",
    title: "Professional indemnity",
    metaTitle: "Professional indemnity insurance",
    metaDescription:
      "Professional indemnity for architects, designers, surveyors and consultants, with limits set against real exposure. Introduced by the House, arranged by Provenance.",
    hero: {
      eyebrow: "Business",
      heading: "Professional indemnity for the advice, design and expertise your clients rely on.",
      lede: "For architects, designers, surveyors, consultants and other professionals whose advice or specifications can create liability after the work is complete.",
    },
    image: "/insurance/pi-hero.webp",
    imageAlt: "A professional's desk and drawings, the advice and specifications that carry lasting liability.",
    whyImage: "/insurance/pi-why.webp",
    whyImageAlt:
      "An architect's or designer's work, the exposure a specialist sizes against real contracts and clients.",
    differenceImage: "/insurance/pi-difference.webp",
    differenceImageAlt:
      "Professional drawings and advice, the exposure a round-number limit rarely reflects.",
    whyImageSpec: {
      description: "An architect's or designer's desk: drawings, a scale rule, a laptop and material samples. Considered professional work.",
      dimensions: "1600 × 1067px landscape (3:2), WebP",
      filename: "/insurance/pi-why.webp",
    },
    whyDifferent: {
      heading: "Who it is for",
      body: [
        "Professional indemnity is for businesses whose advice, design, specification or specialist service could lead to a claim if something goes wrong.",
        "The level of cover should reflect the work, contracts, clients and potential exposure rather than an arbitrary round figure.",
      ],
    },
    differenceIntro:
      "The useful questions are about the professional service provided, the contracts accepted, the clients served and the financial exposure if an error leads to a claim.",
    readiness: [
      { h: "The advice given", p: "The drawings, specifications and consultancy the practice is liable for." },
      { h: "The right limit", p: "Set against the work, contracts and clients, rather than a default figure." },
      { h: "Design and construct", p: "Where design and construction overlap, responsibility needs to be understood clearly." },
      { h: "Claims-made cover", p: "Professional indemnity is written on a claims-made basis, so continuity of cover matters." },
    ],
    detail: {
      title: "The detail",
      points: [
        { h: "Limits against exposure", p: "The right limit depends on the work, the contracts and the potential exposure if a claim is made." },
        { h: "Where design and construction meet", p: "Where a business both designs and builds, a specialist can review how the professional liability is divided and what the policy needs to cover." },
        { h: "Renewal continuity", p: "Because professional indemnity is claims-made, maintaining continuous cover can matter long after an individual job is finished." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Professional indemnity across the built-environment and consulting professions, alongside the wider business cover a practice needs. The House introduces you; Provenance arranges and administers the cover.",
    },
    crossLinks: [
      { label: "Trades & contractors", href: "/insurance/business/trades-and-contractors" },
      { label: "Business insurance overview", href: "/insurance/business" },
    ],
    heroCta: "Request a review",
    enquiry: BUSINESS_ENQUIRY,
    sourcePath: "/insurance/business/professional-indemnity",
    enquiryType: "professional-indemnity",
  },
];

export function getBusinessSpecialistPage(slug: string): SpecialistPage | undefined {
  const page = BUSINESS_SPECIALIST_PAGES.find((p) => p.slug === slug);
  const withRc = page && !page.relatedCovers ? { ...page, relatedCovers: RELATED_BUSINESS } : page;
  return withCrossLinks(withRc);
}

export const BUSINESS_SPECIALIST_SUB_SLUGS = BUSINESS_SPECIALIST_PAGES.filter((p) => p.slug !== "business").map((p) => p.slug);
