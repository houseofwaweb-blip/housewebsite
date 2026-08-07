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
  /** Optional image for the "What Provenance can place" split section. */
  placedImage?: string;
  placedImageAlt?: string;
  whyDifferent: { heading: string; body: string[] };
  detail: { title: string; points: { h: string; p: string }[] };
  placed: { heading: string; body: string };
  /** Sourced figures, rendered as an evidence strip where present. */
  evidence?: { stat: string; label: string }[];
  crossLinks?: { label: string; href: string }[];
  /** For form attribution. */
  enquiryType: string;
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
      heading: "A listed home is a different risk. It should be insured like one.",
      lede: "Listed buildings are repaired with original materials and methods, under consent constraints, by specialist trades. A standard policy priced off a table rarely reflects that. There are 379,580 listed buildings in England, and most are not insured for what it would truly cost to put them back.",
    },
    image: "/insurance/listed.webp",
    imageAlt:
      "A Grade II listed period home, the kind repaired like for like with original materials and specialist trades.",
    placedImage: "/insurance/house-record.webp",
    placedImageAlt:
      "A worn House Record ledger propped against a heritage rebuild drawing, a brass sconce and a pink peony beside it, evoking the documented history a heritage underwriter wants to see.",
    whyDifferent: {
      heading: "Why a listed building is a different risk",
      body: [
        "After a loss, a listed building must be reinstated like for like: the same stone, the same lime, the same joinery, done by trades who work to conservation standards and often under listed building consent. That is slower and dearer than a modern rebuild, and it is why the rebuild cost bears no relation to the market value.",
        "Index-linking, the mechanism most policies use to keep pace, tends to run below actual reinstatement for heritage fabric. Listed and high-value homes are named among the categories worst affected by underinsurance.",
      ],
    },
    detail: {
      title: "What changes with the grade",
      points: [
        { h: "The grades", p: "Grade II, Grade II* and Grade I each carry different repair obligations, and the premium reflects that. Listed property typically costs more than an equivalent unlisted home; the higher grades more so again. Figures are indicative and confirmed case by case." },
        { h: "The rebuild assessment", p: "Because a listed rebuild cannot be estimated from a table, a proper reinstatement assessment is worth commissioning. The House can arrange one, and the record of what your home is made of is exactly what a heritage underwriter wants to see." },
        { h: "The underinsurance trap", p: "Reinstatement for listed fabric can outrun index-linked cover by a meaningful margin. The point of the review is to find that gap before a claim does." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance works with the specialist markets that underwrite heritage risk, so a listed home can sit within one arranged policy alongside contents, outbuildings and, where relevant, the rest of the estate. The House introduces you; Provenance arranges and administers the cover.",
    },
    evidence: [
      { stat: "379,580", label: "listed buildings in England" },
      { stat: "70%", label: "of UK properties insured below rebuild cost" },
      { stat: "66%", label: "the average level they are insured at" },
    ],
    crossLinks: [
      { label: "Thatched property insurance", href: "/insurance/thatched-properties" },
      { label: "Guide: insuring a listed building", href: "/insurance/guides/listed-building-insurance" },
    ],
    enquiryType: "listed-buildings",
  },
  {
    slug: "thatched-properties",
    title: "Thatched property insurance",
    metaTitle: "Thatched property insurance",
    metaDescription:
      "Cover for thatched homes, built around the real risk factors underwriters look at. Around three-quarters are also listed. Arranged by Provenance; introduced by the House.",
    hero: {
      eyebrow: "Specialist property",
      heading: "Thatch is a specialist risk, and it should be underwritten by someone who understands it.",
      lede: "There are around 60,000 thatched properties in Britain, and roughly three-quarters are also listed. Standard insurers often decline thatch or load it heavily. A specialist reads the actual risk instead.",
    },
    image: "/insurance/thatched.webp",
    imageAlt:
      "A thatched cottage in a country garden, the kind of home standard insurers often decline or load heavily.",
    placedImage: "/insurance/house-record.webp",
    placedImageAlt:
      "A House Record book beside a brass globe sconce and a pink peony, standing in for the sweeping records and maintenance history a thatch underwriter reviews.",
    whyDifferent: {
      heading: "What underwriters actually look at",
      body: [
        "The concern with thatch is fire, and the questions that follow are specific: the chimney and any wood-burner, the presence of a lining and spark arrestor, sweeping records, an up-to-date electrical inspection, and the type and age of the thatch itself.",
        "This is the strongest version of the House's argument anywhere on the site: a maintained record of exactly these things is what turns a declined risk into an insurable one.",
      ],
    },
    detail: {
      title: "The reality of insuring thatch",
      points: [
        { h: "The risk factors", p: "Lining, spark arrestors, sweeping frequency and electrical safety are what a specialist underwriter weighs. Documented maintenance is directly relevant to the terms offered." },
        { h: "Premium reality", p: "Thatch typically adds to a household premium, and because most thatched homes are also listed, the two effects compound. Ranges are indicative and settled case by case." },
        { h: "Fire, discussed plainly", p: "This page treats fire as a factual underwriting matter, not a fear. No disaster imagery, no pressure." },
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
    enquiryType: "thatched-properties",
  },
  {
    slug: "non-standard-construction",
    title: "Non-standard construction",
    metaTitle: "Non-standard construction insurance",
    metaDescription:
      "Cover for timber frame, cob, stone, flint, single-skin, steel-frame and prefabricated homes, risks a comparison form cannot handle. Arranged by Provenance; introduced by the House.",
    hero: {
      eyebrow: "Specialist property",
      heading: "Some homes do not fit the form. Yours may be one of them.",
      lede: "Timber frame, cob, stone, flint, single-skin, steel frame, prefabricated: construction that resists standardisation is genuinely poorly served by an automated quote. It needs an underwriter who will read it.",
    },
    image: "/insurance/non-standard.webp",
    imageAlt:
      "A home of non-standard construction, the kind an automated quote cannot read and a specialist underwriter must.",
    placedImage: "/insurance/house-record.webp",
    placedImageAlt:
      "A House Record ledger and a construction drawing on a sage sill, representing the detail of how a non-standard home is built that an underwriter needs described.",
    whyDifferent: {
      heading: "Why a form cannot handle it",
      body: [
        "A comparison engine asks a fixed set of questions and prices off the answers. Non-standard construction is, by definition, the case those questions were not written for, so the engine either declines it or prices it as though it were something it is not.",
        "A specialist underwriter starts from what the building actually is, and what has been done to keep it sound.",
      ],
    },
    detail: {
      title: "The common constructions",
      points: [
        { h: "Timber frame and cob", p: "Traditional and modern timber frame, and earth-built walls such as cob, each behave differently in a loss and are read individually rather than by category." },
        { h: "Stone, flint and single-skin", p: "Solid-wall and single-skin construction sit outside standard cavity-wall assumptions, which is where automated cover tends to fall down." },
        { h: "Steel frame and prefabricated", p: "Non-traditional post-war construction, including certain prefabricated types, needs an underwriter familiar with the specific system." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance works with underwriters who assess non-standard construction on its merits rather than declining it by rule. The House introduces you and can supply what is known about the building; Provenance arranges and administers the cover.",
    },
    enquiryType: "non-standard-construction",
  },
  {
    slug: "second-homes",
    title: "Second and holiday homes",
    metaTitle: "Second and holiday home insurance",
    metaDescription:
      "Cover for second homes, holiday homes and holiday lets, where standard policies most often decline a claim. Arranged by Provenance; introduced by the House.",
    hero: {
      eyebrow: "Specialist property",
      heading: "A second home is not a first home that happens to be empty sometimes.",
      lede: "England has 268,152 second homes and 67,858 commercial holiday lets. Periods unoccupied, different security expectations, escape of water while nobody is there, and any letting activity all change the cover, and getting the distinction wrong is the commonest reason a claim is declined.",
    },
    image: "/insurance/holiday-home.webp",
    imageAlt:
      "A holiday home standing quiet, the kind left unoccupied for periods where standard policies most often decline a claim.",
    placedImage: "/insurance/house-record.webp",
    placedImageAlt:
      "A House Record book and drawings on a sill, standing for the occupancy and use details that let a second or holiday home sit within one arranged policy.",
    whyDifferent: {
      heading: "Why it is a different risk",
      body: [
        "The core issue is time spent empty. Escape of water, weather damage and theft all read differently in a home that is not lived in day to day, and standard policies carry an unoccupancy clause that many owners never notice until they claim.",
        "Then there is use. A second home, a holiday home and a holiday let are three different things to an insurer, and describing one as another can invalidate the policy entirely.",
      ],
    },
    detail: {
      title: "The things that catch people out",
      points: [
        { h: "The unoccupancy clause", p: "Most standard policies stop responding after a home has been empty for a set period. It is the single commonest reason a second-home claim fails. A specialist policy is written around how the home is actually used." },
        { h: "Second home vs holiday let", p: "Letting activity changes the cover completely. If the policy describes the wrong use, it may not pay. This is worth getting right before it matters." },
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
    enquiryType: "second-homes",
  },
  {
    slug: "unoccupied-property",
    title: "Unoccupied and probate property",
    metaTitle: "Unoccupied and probate property insurance",
    metaDescription:
      "Cover for empty homes, in probate, between owners, or empty during works. Calm, practical, no pressure. Arranged by Provenance; introduced by the House.",
    hero: {
      eyebrow: "Specialist property",
      heading: "An empty house is still a home, and it still needs cover.",
      lede: "There are 309,856 long-term empty homes in England. Behind most of them is a difficult moment: probate, a move that has not completed, a house between phases of work. This is a calm, practical page, not a sales one.",
    },
    image: "/insurance/probate.webp",
    imageAlt:
      "A home standing empty during probate or between owners, shut up and still.",
    placedImage: "/insurance/house-record.webp",
    placedImageAlt:
      "A House Record ledger and a fountain pen resting on a calm sage surface, evoking the inspection notes and conditions kept for an empty or probate property.",
    whyDifferent: {
      heading: "The three situations",
      body: [
        "Probate: a home held while an estate is settled. If you are dealing with a death, we are sorry. The practical point is only that the existing policy has very likely lapsed, often without anyone realising.",
        "A property between owners or tenants, and a house empty during works, both leave a home standing without the day-to-day presence a standard policy assumes.",
      ],
    },
    detail: {
      title: "What an empty property needs",
      points: [
        { h: "Why the old policy may have lapsed", p: "Standard cover typically ends once a home passes its unoccupancy limit, so a house that has been empty for a while is often uninsured exactly when it is most exposed." },
        { h: "What insurers ask for", p: "Regular inspections, water systems drained down, secure boarding where needed, and heating managed through winter are the usual conditions. A specialist policy sets these out plainly." },
        { h: "No urgency here", p: "There is no countdown on this page and there never will be. When you are ready, a specialist will talk it through." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance arranges unoccupied and probate cover written for the situation, for the period it is needed. The House introduces you; Provenance arranges and administers the cover.",
    },
    evidence: [{ stat: "309,856", label: "long-term empty homes in England" }],
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
      heading: "During building work, your home is at its most exposed, and often its least covered.",
      lede: "While works are underway a home may be open to the weather, structurally in flux, vulnerable to theft and controlled by contractors, and a standard household policy may not respond. A single renovation policy is unusually clean to explain and unusually worth having.",
    },
    image: "/insurance/renovation.webp",
    imageAlt:
      "A home mid-renovation, insured under one policy over the existing structure and the contract works for the life of the project.",
    placedImage: "/insurance/house-record.webp",
    placedImageAlt:
      "A House Record book beside building drawings on a sill, standing for the contract and works documents a single renovation policy is written around.",
    whyDifferent: {
      heading: "The gap most owners do not know exists",
      body: [
        "Standard home insurance assumes a finished, occupied house. Once scaffolding goes up and walls come down, several of its assumptions no longer hold, and cover can quietly fall away at the very moment risk is highest.",
        "A renovation policy is designed for exactly that period, and it is one of Provenance's cleanest products to set out.",
      ],
    },
    detail: {
      title: "What a renovation policy covers",
      points: [
        { h: "One policy, four things", p: "The existing structure, the contract works, contents and homeowner liability, all for the period of the works. When the job finishes, cover returns to a normal footing." },
        { h: "JCT contracts, in plain English", p: "Building contracts set out who insures what. A short, plain explanation of the JCT position helps you check the contractor's arrangements line up with yours. This is factual, not advice." },
        { h: "Non-negligence cover", p: "Where work happens close to a neighbour, non-negligence cover matters. Indicative costs sit around £550 for shorter projects and around £1,000 where non-negligence is included; figures are indicative and confirmed case by case." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance arranges renovation and contract works cover for the life of a project, and the House can route straight in from the works it already manages. The House introduces you; Provenance arranges and administers the cover.",
    },
    crossLinks: [{ label: "Guide: insurance during building work", href: "/insurance/guides/renovation-insurance" }],
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
      heading: "The things worth insuring properly rarely fit a general contents limit.",
      lede: "Scheduled items behave differently from general contents, and standard single-article limits bite quickly. The point is not only to cover what is under-insured, but to stop paying for what is over-insured.",
    },
    image: "/insurance/cat-fine-art.webp",
    imageAlt:
      "Fine art and collected pieces, the things worth scheduling and valuing individually rather than leaving to a general contents limit.",
    placedImage: "/insurance/house-record.webp",
    placedImageAlt:
      "A House Record book and a fountain pen on a sage surface, standing for the inventory of scheduled and valued items a specialist policy is built around.",
    whyDifferent: {
      heading: "Why scheduled items are different",
      body: [
        "General contents cover carries a per-item limit that fine art, jewellery and collections routinely exceed. Above that limit, items should be scheduled and valued individually.",
        "Valuation runs both ways. Nearly a quarter of UK properties are over-insured, by an average of 129%, which is money wasted. A proper schedule saves as often as it protects.",
      ],
    },
    detail: {
      title: "How it is handled",
      points: [
        { h: "Valuation", p: "Scheduled items should be valued, and revalued as markets move. The House does not appraise or advise on value; it records what you hold and introduces the specialist who can." },
        { h: "The ancillary network", p: "Provenance's proposition extends beyond the policy to collection management, restoration, security and valuation partners." },
        { h: "Newer asset classes", p: "Watches, wine, streetwear and design are handled seriously and without condescension." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance arranges scheduled cover for art and collections, and can fold it into a household policy on one renewal date. The House introduces you and can supply the inventory it already holds; Provenance arranges and administers the cover.",
    },
    evidence: [{ stat: "129%", label: "average over-insurance where properties are over-covered" }],
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
      heading: "The car and the house, treated as one estate.",
      lede: "There are 1.93 million registered historic vehicles in the UK, owned by 690,777 people. Specialist motor brokers do this well; the reason to come here is consolidation, one adviser, one renewal date, the car and the home managed together.",
    },
    image: "/insurance/cat-cars.webp",
    imageAlt:
      "A classic car, treated as part of the same estate as the home and consolidated onto one renewal date.",
    placedImage: "/insurance/house-record.webp",
    placedImageAlt:
      "A House Record book and pen on a sage surface, standing for the agreed-value schedule that lets a prestige vehicle sit on one renewal date with the home.",
    whyDifferent: {
      heading: "The consolidation argument",
      body: [
        "This is a mature, competitive niche, and the honest reason to arrange a prestige or classic vehicle through the House is not price. It is that the vehicle sits on the same renewal date as the home, with one specialist across the whole estate.",
        "Agreed value is the mechanism that matters: the figure the vehicle is insured for is settled up front, not argued after a loss.",
      ],
    },
    detail: {
      title: "What can be arranged",
      points: [
        { h: "The range", p: "Classic, collections, family fleet, supercar and hypercar, and 4x4, typically for vehicles from £50,000 upward." },
        { h: "Agreed value", p: "An agreed value is set at inception, so a total loss pays the figure agreed rather than a disputed market value." },
        { h: "One renewal date", p: "The vehicle joins the home and the wider estate on a single renewal, which is the whole point of arranging it here." },
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
];

export function getSpecialistPage(slug: string): SpecialistPage | undefined {
  return SPECIALIST_PAGES.find((p) => p.slug === slug);
}

export const SPECIALIST_SLUGS = SPECIALIST_PAGES.map((p) => p.slug);
