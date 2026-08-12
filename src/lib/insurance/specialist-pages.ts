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
  };
  /** Attribution path override; defaults to /insurance/[slug]. */
  sourcePath?: string;
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
        "After a loss, a listed building must be reinstated like for like: the same stone, the same lime, the same joinery, done by trades who work to conservation standards and often under listed building consent. That is slower and dearer than a modern rebuild, and it is why the rebuild cost bears no relation to the market value.",
        "Index-linking, the mechanism most policies use to keep pace, tends to run below actual reinstatement for heritage fabric. Listed and high-value homes are named among the categories worst affected by underinsurance.",
      ],
    },
    detail: {
      title: "What changes with the grade",
      points: [
        { h: "The grades", p: "Grade II, Grade II* and Grade I each carry different repair obligations, and the premium reflects that. Listed property typically costs more than an equivalent unlisted home; the higher grades more so again. Figures are indicative and confirmed case by case." },
        { h: "The rebuild assessment", p: "Because a listed rebuild cannot be estimated from a table, a proper reinstatement assessment is worth commissioning. The House can help you commission one; it is exactly what a heritage underwriter wants to see." },
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
      "A leather ledger beside a brass globe sconce and a pink peony, standing in for the sweeping records and maintenance history a thatch underwriter reviews.",
    whyImage: "/insurance/thatched-why.webp",
    whyImageAlt:
      "A thatched roof detail with a brick chimney and an eyebrow window, the craft and maintenance a thatch underwriter reads.",
    differenceIntro:
      "Most insurers see the word 'thatch' and either decline it or load it. The House introduces you to a specialist who asks the questions that actually price the risk.",
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
        "Documenting exactly these things is what can turn a risk a standard insurer declines into one a specialist will cover.",
      ],
    },
    detail: {
      title: "The reality of insuring thatch",
      points: [
        { h: "The risk factors", p: "Lining, spark arrestors, sweeping frequency and electrical safety are what a specialist underwriter weighs. Documented maintenance is directly relevant to the terms offered." },
        { h: "Premium reality", p: "Thatch typically adds to a household premium, and because most thatched homes are also listed, the two effects compound. Ranges are indicative and settled case by case." },
        { h: "Fire, discussed plainly", p: "Fire is a factual underwriting matter, not a fear. No disaster imagery, no pressure." },
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
      "A comparison engine asks a fixed set of questions and prices off the answers. Non-standard construction is exactly the case those questions were never written for.",
    readiness: [
      { h: "What it's built of", p: "Timber frame, cob, stone, flint, single-skin or steel, read individually, not by category." },
      { h: "The walls", p: "Solid-wall and single-skin construction that sits outside cavity-wall assumptions." },
      { h: "The system", p: "For post-war and prefabricated types, the specific system and its known issues." },
      { h: "What's been done", p: "Repairs, retrofits and how the fabric has been kept sound." },
    ],
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
      "A leather ledger and drawings on a sill, standing for the occupancy and use details that let a second or holiday home sit within one arranged policy.",
    whyImage: "/insurance/second-homes-why.webp",
    whyImageAlt:
      "A second home shut up quietly for the season, the kind of place standard cover is not built for.",
    differenceImage: "/insurance/second-homes-difference.webp",
    differenceImageAlt:
      "A quiet holiday home standing empty, the occupancy a comparison form never asks about.",
    differenceIntro:
      "A comparison form prices a home that is lived in. A second home is empty for stretches, sometimes let, and that changes the risk entirely.",
    readiness: [
      { h: "How often it's empty", p: "The stretches unoccupied, which most standard policies quietly limit." },
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
      lede: "There are 309,856 long-term empty homes in England. Behind most of them is a difficult moment: probate, a move that has not completed, a house between phases of work. Calm and practical, with nothing to sell you.",
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
      "A comparison form prices a home that is lived in. An empty house is a different risk, and the questions that matter are about how it is left and looked after.",
    readiness: [
      { h: "How long it's empty", p: "The period unoccupied, which most standard policies stop covering." },
      { h: "How it's secured", p: "Locks, boarding where needed, alarms and who holds a key." },
      { h: "Water and heating", p: "Systems drained, or heating kept on through winter to prevent burst pipes." },
      { h: "How often it's checked", p: "Regular inspections, the condition insurers usually require." },
    ],
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
        { h: "No urgency here", p: "There is no countdown here, and there never will be. When you are ready, a specialist will talk it through." },
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
      "A comparison form prices a finished, occupied home. During building work almost none of those assumptions hold, and the questions that matter are about the works themselves.",
    readiness: [
      { h: "The works", p: "What is being done, and whether the home is open to the weather or structurally in flux." },
      { h: "Who is on site", p: "The contractors, their own cover, and the JCT contract position." },
      { h: "The existing structure", p: "Cover for the standing building as well as the contract works." },
      { h: "How long", p: "The length of the project, which sets the period cover is needed for." },
    ],
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
      "Most contents cover is priced from a single figure and a postcode, and never asks what the valuable things actually are. The House introduces you to a specialist who starts from the pieces themselves.",
    readiness: [
      { h: "What it is", p: "The maker, the period and the materials, not a line on a contents schedule." },
      { h: "What it is worth now", p: "A current valuation, because markets move, rather than the price you paid." },
      { h: "Where it lives", p: "On the wall, in a safe, worn daily or in storage, each a different risk." },
      { h: "In and out of the home", p: "Whether it travels, is exhibited or lent, which standard cover rarely allows." },
    ],
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
        { h: "Valuation", p: "Scheduled items should be valued, and revalued as markets move. The House does not appraise or advise on value; it simply introduces the specialist who can." },
        { h: "The ancillary network", p: "Provenance's proposition extends beyond the policy to collection management, restoration, security and valuation partners." },
        { h: "Newer asset classes", p: "Watches, wine, streetwear and design are handled seriously and without condescension." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance arranges scheduled cover for art and collections, and can fold it into a household policy on one renewal date. The House introduces you to the specialist who schedules and values them properly; Provenance arranges and administers the cover.",
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
      "A leather ledger and pen on a sage surface, standing for the agreed-value schedule that lets a prestige vehicle sit on one renewal date with the home.",
    whyImage: "/insurance/motor-why.webp",
    whyImageAlt:
      "A classic green sports car in a manor garage with driving gloves on the bonnet and the house beyond, an estate rather than a showroom.",
    differenceIntro:
      "Most motor quotes are priced off a table and a registration, and never ask what the car actually is or how it is used. The House introduces you to a specialist who starts from the vehicle.",
    readiness: [
      { h: "What it is", p: "Make, model, year and condition, valued as the car it is rather than a category." },
      { h: "The agreed value", p: "The figure settled up front, not argued after a total loss." },
      { h: "How it is used", p: "Weekend, show, limited-mileage or daily, each priced on the real risk." },
      { h: "Where it is kept", p: "Garaging and security, which a comparison form flattens to a postcode." },
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
      heading: "One estate, one renewal date",
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
  {
    slug: "boat-yacht-aviation",
    title: "Boat, yacht & aviation",
    metaTitle: "Boat, yacht and aviation insurance",
    metaDescription:
      "Cover for boats, yachts and aircraft, from a family boat to complex Lloyd's placements, arranged alongside the home on one relationship. Introduced by the House, arranged by Provenance.",
    hero: {
      eyebrow: "Specialist assets",
      heading: "The boat, the yacht, the aircraft, on the same estate.",
      lede: "Marine and aviation risks sit outside a household policy and are underwritten by specialist markets. The House introduces you to one, so the boat or aircraft is arranged alongside the home rather than managed apart.",
    },
    image: "/insurance/boat-yacht-aviation.webp",
    imageAlt: "A classic yacht's brass and teak detail, an asset arranged alongside the home on one policy.",
    whyImageSpec: {
      description: "A marine or aviation detail: a yacht's brass and teak fittings, a compass on a chart, a folded sail, or a wing or propeller. Warm and editorial, never a glossy superyacht in motion.",
      dimensions: "1600 × 1067px landscape (3:2), WebP",
      filename: "/insurance/boat-yacht-aviation-why.webp",
    },
    whyDifferent: {
      heading: "Why marine and aviation are their own world",
      body: [
        "A boat, a yacht or an aircraft is not a possession a home insurer covers. Each is underwritten by specialist marine and aviation markets, on its own terms, with its own surveys, moorings, usage and crew considerations.",
        "The reason to arrange it through the House is not price. It is that the asset sits within one relationship, on one renewal date, with the home and the rest of the estate, rather than as a separate policy nobody joins up.",
      ],
    },
    differenceIntro:
      "A household policy stops at the water's edge and the runway. The House introduces you to a specialist who prices the vessel or aircraft on what it is and how it is used.",
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
        { h: "On one estate", p: "Arranged alongside the home, cars and collections on a single renewal date." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance works with the specialist marine and aviation markets, from the standard market through to complex Lloyd's of London placements, and can consolidate the vessel or aircraft with the household policy. The House introduces you; Provenance arranges and administers the cover.",
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
      heading: "When the heating stops, the cover should already be in place.",
      lede: "A boiler that fails in the cold is one of the few home problems that cannot wait. Cover for the repair, and for the annual service that prevents most failures, arranged through a regulated partner.",
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
      "Most cover is sold on price alone and never asks about the system itself. What matters is the boiler and how it has been looked after.",
    readiness: [
      { h: "The boiler's age", p: "How old the system is, and whether it is still economically worth repairing." },
      { h: "The service history", p: "Whether it has been serviced, which keeps a system insurable and the terms sensible." },
      { h: "What's included", p: "The engineer, parts and labour, and whether an annual service is part of the plan." },
      { h: "Controls and heating", p: "The controls and central heating, not the boiler in isolation." },
    ],
    whyDifferent: {
      heading: "What boiler cover actually covers",
      body: [
        "Boiler and central-heating cover pays for the engineer, the parts and the labour when the system fails, and most plans include an annual service that catches the faults that would otherwise become a mid-winter breakdown.",
        "The detail that matters is the boiler's age and service history: a maintained record is what keeps a system insurable and the terms sensible.",
      ],
    },
    detail: {
      title: "The options, in plain terms",
      points: [
        { h: "Boiler and controls", p: "Cover for the boiler, the controls and the central heating, with the annual service usually included." },
        { h: "Annual or monthly", p: "Pay yearly or spread it monthly. The House introduces you; the plan is arranged and administered by the partner." },
        { h: "Service history helps", p: "A documented service record keeps cover straightforward, so it is worth keeping the paperwork to hand." },
      ],
    },
    placed: {
      heading: "What the partner can place",
      body: "Cover is arranged and administered by a regulated partner. The House makes the introduction; the partner arranges the cover.",
    },
    crossLinks: [{ label: "Appliance cover", href: "/insurance/appliance-cover" }],
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
      heading: "The appliances a home runs on, covered before they fail.",
      lede: "A washing machine, an oven, a fridge-freezer: the everyday machines whose failure is an expensive surprise. Cover for repair or replacement, on a single item or across the home.",
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
      "Most cover is sold per box with the small print unread. What matters is which appliances, how old they are, and what they would cost to replace.",
    readiness: [
      { h: "Which appliances", p: "A single valued machine, or the whole kitchen and utility room together." },
      { h: "Age and warranty", p: "Whether each is in or out of its manufacturer warranty." },
      { h: "Repair or replace", p: "Repair where sensible, replacement where a machine cannot be economically fixed." },
      { h: "The replacement cost", p: "What it would cost to put back, not what you paid." },
    ],
    whyDifferent: {
      heading: "Single item or the whole kitchen",
      body: [
        "Appliance cover pays for repair or replacement when a machine fails outside its manufacturer warranty. It can sit on a single valued item or across every appliance in the home.",
        "Cover is simplest when you know what you own, when it was bought, and what it would cost to replace, so it is worth keeping the receipts and model details to hand.",
      ],
    },
    detail: {
      title: "How it is arranged",
      points: [
        { h: "One item or many", p: "Cover a single high-value appliance, or bundle the kitchen and utility room together." },
        { h: "Repair or replace", p: "Plans cover repair, and replacement where a machine cannot be economically fixed." },
        { h: "Kept records help", p: "Purchase dates and values make cover simpler, so it is worth keeping receipts to hand." },
      ],
    },
    placed: {
      heading: "What the partner can place",
      body: "Cover is arranged and administered by a regulated partner. The House makes the introduction; the partner arranges the cover.",
    },
    crossLinks: [{ label: "Boiler and heating cover", href: "/insurance/boiler-cover" }],
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
    { name: "Private client", body: "Advised cover for period & high-value homes.", href: "/insurance/private-client", image: "/insurance/cat-house.webp", imageAlt: "A period house insured on its true rebuild cost." },
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
    { name: "Private client", body: "The whole estate on one policy.", href: "/insurance/private-client", image: "/insurance/cat-house.webp", imageAlt: "A period house." },
    { name: "Fine art & collections", body: "Art, jewellery, watches and wine.", href: "/insurance/fine-art-and-collections", image: "/insurance/cat-fine-art.webp", imageAlt: "Fine art and collected pieces." },
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
    { name: "Private client", body: "Advised cover for high-value homes.", href: "/insurance/private-client", image: "/insurance/cat-house.webp", imageAlt: "A period house." },
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

export function getSpecialistPage(slug: string): SpecialistPage | undefined {
  return withRelated(SPECIALIST_PAGES.find((p) => p.slug === slug));
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
      "Straightforward buildings and contents cover, introduced by the House and arranged by Provenance. Period and high-value homes are routed to the advised service.",
    hero: {
      eyebrow: "Everyday cover",
      heading: "Home insurance, for a standard home.",
      lede: "For a straightforward house or flat, cover built around what the home actually is. The House introduces you; Provenance arranges the policy.",
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
      heading: "Cover built on the home, not a postcode",
      body: [
        "Most home cover is priced from a postcode and a short set of tick-boxes, then sold on price. It works, until a claim finds the gap between what was assumed and what is true.",
        "A short conversation sets the buildings and contents at the right level, and flags the add-ons worth having before they are needed rather than after.",
      ],
    },
    differenceIntro:
      "Even a standard home is priced by most insurers from a postcode and a few boxes. A short conversation catches the things a form skips.",
    readiness: [
      { h: "Buildings or contents", p: "What needs covering: the structure, what is inside, or both." },
      { h: "The rebuild figure", p: "What it would cost to rebuild, which is not the market value." },
      { h: "The everyday risks", p: "Escape of water, accidental damage and the add-ons worth having." },
      { h: "How it is lived in", p: "How the home is used day to day, which quietly changes the cover." },
    ],
    detail: {
      title: "What is covered",
      points: [
        { h: "Buildings", p: "Cover for the structure of the home itself." },
        { h: "Contents", p: "Cover for what is inside, set at a level that fits." },
        { h: "Sensible add-ons", p: "Accidental damage and similar, added only where they earn their place." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance arranges straightforward buildings and contents cover, and can route a period, listed or high-value home to the advised service where that fits better. The House introduces you; Provenance arranges and administers the cover.",
    },
    crossLinks: [{ label: "A period or listed home? Speak to a specialist", href: "/insurance/private-client" }],
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
      heading: "Car, van and motorbike.",
      lede: "Everyday motor cover in one place, including the temporary cover that is genuinely useful and rarely marketed.",
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
      heading: "Cover that fits how you actually drive",
      body: [
        "A comparison engine prices the vehicle and the postcode. It rarely asks how the car is used, who else drives it, or whether a short temporary policy would do the job better.",
        "Everyday motor is quick to arrange, and a short conversation keeps the level of cover and the extras honest.",
      ],
    },
    differenceIntro:
      "Most motor quotes are priced off a table and a registration. A short conversation makes sure the cover fits how the vehicle is actually used.",
    readiness: [
      { h: "Car, van or bike", p: "The vehicle and the class of use, priced on the real risk." },
      { h: "Level of cover", p: "Third-party, third-party fire and theft, or comprehensive." },
      { h: "Temporary needs", p: "Cover from one hour to 28 days, for borrowing or lending." },
      { h: "Extras worth having", p: "Breakdown, legal and key cover, added only where useful." },
    ],
    detail: {
      title: "What can be arranged",
      points: [
        { h: "Car", p: "Standard private car cover." },
        { h: "Van and motorbike", p: "Private and light-commercial van use, and bikes and scooters." },
        { h: "Temporary cover", p: "From one hour to 28 days, for borrowing, lending or a short need." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance arranges everyday motor cover across car, van, motorbike and temporary use. The House introduces you; Provenance arranges and administers the cover.",
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
      heading: "Pet and travel.",
      lede: "Two low-fuss covers in one place, both built around the animal and the trip rather than a tick-box.",
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
      heading: "Cover shaped by the animal and the trip",
      body: [
        "Pet and travel are the covers most often bought on price and regretted at claim time, usually over an excluded condition or a missing declaration.",
        "A short conversation gets the vet-bill level and the travel declarations right, so the cover holds when it is needed.",
      ],
    },
    differenceIntro:
      "Most pet and travel cover is bought in a rush and the exclusions read later. A short conversation makes sure it fits the animal and the trip.",
    readiness: [
      { h: "The animal", p: "The pet, its age and breed, and the vet-bill cover that suits." },
      { h: "Existing conditions", p: "Whether cover is needed where a condition already exists." },
      { h: "One trip or many", p: "Single-trip, or annual multi-trip for several journeys a year." },
      { h: "Specialist medical", p: "Travel cover where existing medical conditions need declaring." },
    ],
    detail: {
      title: "What can be arranged",
      points: [
        { h: "Pet", p: "Cover for vet bills and the usual pet risks, for cats and dogs." },
        { h: "Travel", p: "Single-trip for one holiday, or annual multi-trip for several a year." },
        { h: "Specialist medical travel", p: "Where existing medical conditions need covering." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance arranges pet cover and single-trip or annual travel, including specialist medical travel. The House introduces you; Provenance arranges and administers the cover.",
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
      heading: "Breakdown and bicycle.",
      lede: "The smaller everyday covers, arranged simply and set at the level that fits how you travel.",
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
      heading: "Small covers, set at the right level",
      body: [
        "Breakdown and bicycle cover are cheap enough that most people pick a default and move on, then find the level does not match how they actually travel.",
        "A short conversation matches the breakdown tier and the bicycle value to real use, so the cover is neither thin nor wasteful.",
      ],
    },
    differenceIntro:
      "The smaller covers are the easiest to buy badly. A short conversation makes sure the level fits how you travel.",
    readiness: [
      { h: "Level of breakdown", p: "Roadside, recovery and home start, matched to how far you go." },
      { h: "Where you break down", p: "At home, roadside or national recovery, priced accordingly." },
      { h: "The bike", p: "Road, mountain, electric or high-value, each a different figure." },
      { h: "Away from home", p: "Whether the bike is covered away from home and in transit." },
    ],
    detail: {
      title: "What can be arranged",
      points: [
        { h: "Breakdown", p: "Roadside assistance, recovery and home start." },
        { h: "Bicycle", p: "Road, mountain, electric and high-value bikes." },
        { h: "The right level", p: "Matched to how far and how often you travel, rather than a default." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Provenance arranges breakdown cover and bicycle cover across the full range of bikes. The House introduces you; Provenance arranges and administers the cover.",
    },
    relatedCovers: EVERYDAY_COVERS_GRID,
    enquiryType: "breakdown-and-bicycle",
  },
];

export function getEverydaySpecialistPage(slug: string): SpecialistPage | undefined {
  return EVERYDAY_SPECIALIST_PAGES.find((p) => p.slug === slug);
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
  heading: "A free review, not a hard sell.",
  body: "Leave your details and a specialist will call to arrange a free, no-obligation review of the cover you already hold. We ask only what we need to make the introduction; the detail belongs on your first call with Provenance.",
  submitLabel: "Request a review",
  withCompany: true,
} as const;

export const BUSINESS_SPECIALIST_PAGES: SpecialistPage[] = [
  {
    slug: "business",
    title: "Business insurance",
    metaTitle: "Business insurance broker introductions",
    metaDescription:
      "Warm B2B insurance introductions for the House's contractor, supplier and member network. A free silent review of existing cover. Introduced by the House, arranged by Provenance.",
    hero: {
      eyebrow: "Business",
      heading: "The cover a working business needs, without the aggregator guesswork.",
      lede: "Brokers hold most of the UK commercial market for a reason: business risk does not fit a comparison form. These are introductions through a network the House already knows and trusts.",
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
        "The House's contractor and supplier network, members running their own businesses, and the House's own operating companies.",
        "If you already work with the House, you are a known quantity, which is the strongest starting point a specialist broker can have.",
      ],
    },
    differenceIntro:
      "Business risk is the one thing a comparison form genuinely cannot price. A broker reads the actual exposure of the actual business.",
    readiness: [
      { h: "What the business does", p: "The real activities, sites and headcount, not a category code." },
      { h: "The liabilities", p: "Public, employers' and product liability, sized to the work." },
      { h: "The moving parts", p: "Tools, stock, fleet, premises and cyber, wherever the exposure sits." },
      { h: "What is already held", p: "The cover in place today, reviewed for gaps and overlaps." },
    ],
    detail: {
      title: "A free review of the cover you hold",
      points: [
        { h: "A free review of what you hold", p: "Provenance will review your existing arrangements and identify gaps, underinsurance and where the premium can be benchmarked. No obligation, and nothing changes unless you decide it should." },
        { h: "Built for relationships, not rate", p: "The UK commercial market is soft, so this is built for a lasting relationship rather than a one-off saving. That is the honest position." },
        { h: "One conversation across the estate", p: "Where a member's home and business both need cover, they can sit with one adviser rather than two." },
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
      "Public and employers' liability, tools, contract works and professional indemnity for trades and contractors. The House's own supply chain. Introduced by the House, arranged by Provenance.",
    hero: {
      eyebrow: "Business",
      heading: "Being properly insured and being House Approved are the same conversation.",
      lede: "Construction is the largest single sector of UK small business, and these are the trades the House already works with, which makes the introduction a natural one.",
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
        "Public and employers' liability, tools cover, contract works, and professional indemnity where design is part of the job. A specialist puts the right combination together rather than a one-size policy.",
        "For anyone on, or applying to, the House Approved list, this is the same standard-and-cover conversation.",
      ],
    },
    differenceIntro:
      "A trade's risk changes with every job, site and hire. A comparison form prices a category; a specialist prices the work.",
    readiness: [
      { h: "The work", p: "The trades carried out, and the sites and clients they are done for." },
      { h: "Liability limits", p: "Public and employers' liability set against real jobs and headcount." },
      { h: "Tools and works", p: "The tools that earn the living, and the contract works while live." },
      { h: "Design exposure", p: "Professional indemnity where any design or specification is involved." },
    ],
    detail: {
      title: "The detail",
      points: [
        { h: "Liability, sized to the work", p: "Public and employers' liability limits are set against the actual jobs, sites and headcount, not a default figure." },
        { h: "Tools and contract works", p: "Cover for the tools that earn the living, and for the works themselves while a project is live." },
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
      heading: "Cover for advice given, sized to the exposure that actually exists.",
      lede: "Architects, designers, surveyors and consultants: exactly the professional network around a home-management business, and exactly where a standard limit is often the wrong one.",
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
        "The professions whose advice, drawings and specifications carry liability long after the job is done.",
        "Provenance sets the limit against real exposure rather than a round number, which is where most policies are quietly wrong.",
      ],
    },
    differenceIntro:
      "Professional indemnity is priced on advice and exposure, not a postcode. The right limit is a function of the work, never a round number.",
    readiness: [
      { h: "The advice given", p: "The drawings, specifications and consultancy the practice is liable for." },
      { h: "The right limit", p: "Set against real exposure, contracts and clients, not a default figure." },
      { h: "Design and construct", p: "Where designing and building overlap, and liability quietly grows." },
      { h: "Claims-made cover", p: "Continuity across renewals, because gaps in cover bite later." },
    ],
    detail: {
      title: "The detail",
      points: [
        { h: "Limits against exposure", p: "How much cover is enough is a function of the work, the contracts and the clients, not a standard figure pulled from a table." },
        { h: "The design-and-construct trap", p: "The overlap between designing and building catches architects out. A specialist reads where the liability actually sits." },
        { h: "Renewal continuity", p: "Professional indemnity is claims-made, so continuity of cover matters. It is worth reviewing before, not at, renewal." },
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
  return page && !page.relatedCovers ? { ...page, relatedCovers: RELATED_BUSINESS } : page;
}

export const BUSINESS_SPECIALIST_SUB_SLUGS = BUSINESS_SPECIALIST_PAGES.filter((p) => p.slug !== "business").map((p) => p.slug);
