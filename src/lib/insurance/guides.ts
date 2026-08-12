/**
 * Insurance guides (spec Group G). Organic search support: editorial tone, not
 * an ad. Every statistic is indicative and pending Provenance sign-off. Soft
 * route to the advised service at the foot only. No calculators (that edges
 * toward advice). No urgency.
 */

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** Split-hero image, rendered beside the title and intro. */
  image?: string;
  imageAlt?: string;
  /** "In short" key-takeaway bullets, near the top. */
  takeaways?: string[];
  /** A single arresting figure, shown as a callout panel under the intro. */
  stat?: { value: string; label: string };
  /** Body sections. An optional per-section stat renders as an inline callout. */
  sections: { heading: string; paras: string[]; stat?: { value: string; label: string } }[];
  /** A comparison table clarifying confusable terms (rebuild vs market value, etc.). */
  table?: { title?: string; caption?: string; columns: string[]; rows: string[][] };
  /** FAQ accordion at the foot (native <details>, no JS). */
  faqs?: { q: string; a: string }[];
  /** Foot CTA: a soft link to the advised service, or the renewal reminder. */
  footCta: "specialist" | "renewal";
  /** Related guides / pages, rendered as cards at the foot. */
  related?: { label: string; href: string }[];
  /** Named sources for the figures, listed under the article. */
  sources?: string[];
  /** Show the "figures indicative / pending sign-off" note. */
  hasFigures?: boolean;
};

export const GUIDES: Guide[] = [
  {
    slug: "underinsurance",
    takeaways: [
      "Around 70% of UK homes are insured below what it would actually cost to rebuild them.",
      "The error is almost always downward, and index-linking rarely keeps pace.",
      "Listed, extended and non-standard homes are worst affected.",
      "A rebuild assessment sets the right figure, not a market valuation.",
    ],
    stat: { value: "70%", label: "of UK properties are insured below their rebuild cost, at an average of 66% of what they should be" },
    faqs: [
      { q: "How do I know if I'm underinsured?", a: "Compare your sum insured against a professional rebuild (reinstatement) cost, not your home's market value. If you have never had a rebuild assessment, or your home is period, extended or non-standard, it is worth checking." },
      { q: "Is being over-insured a problem too?", a: "Yes. Nearly a quarter of properties are over-insured, by an average of 129%, which is premium wasted. The right figure saves as often as it protects." },
      { q: "Does index-linking keep my cover accurate?", a: "Not reliably. Index-linking is meant to track building costs but tends to run below actual reinstatement, especially when costs move quickly as they did between 2020 and 2024." },
      { q: "Who works out the rebuild cost?", a: "For a standard home a professional reinstatement assessment sets the figure. For a listed, extended or non-standard home it is the only reliable way to get it right." },
    ],
    sources: [
      "Association of British Insurers (ABI)",
      "BCIS rebuild-cost data",
      "Rebuild cost inflation 2020-2024, published market research",
    ],
    title: "The underinsurance gap: are you insured for what it would really cost?",
    metaTitle: "Am I underinsured? The UK underinsurance gap",
    metaDescription:
      "Around 70% of UK properties are insured below their rebuild cost, at an average of 66%. Why it happens, the over-insurance counterpoint, and how to check.",
    intro:
      "Most homes are insured for the wrong figure, and the direction of the error is nearly always down. Here is what the evidence says, why it happens, and how to check your own cover without a calculator making the decision for you.",
    image: "/insurance/interior-editorial.webp",
    imageAlt:
      "A sunlit period drawing room with a marble fireplace, gilt-framed pictures and armfuls of cut flowers, a home whose true rebuild cost is easily under-estimated.",
    sections: [
      { heading: "The headline finding", paras: [
        "Around 70% of UK properties are insured below their rebuild cost, at an average of 66% of what they should be. In plain terms, a majority of homes would not be paid enough to rebuild after a total loss.",
      ] },
      { heading: "Why it happens", paras: [
        "The usual mechanism is index-linking, which is meant to keep a sum insured in step with building costs but tends to run below actual reinstatement. And costs have moved fast: rebuild costs rose around 40% between 2020 and 2024, faster than most policies tracked.",
        "Listed, extended and non-standard homes are affected most, because their rebuild cost is hardest to estimate from a table in the first place.",
      ] },
      { heading: "The over-insurance counterpoint", paras: [
        "It runs both ways. Nearly a quarter of properties are over-insured, by an average of 129%, which is simply money wasted on premium. A proper figure saves as often as it protects.",
      ] },
      { heading: "How to check", paras: [
        "Start with the distinction that catches most people: rebuild cost is what it would cost to rebuild the house, not what it would sell for. For a standard home a professional rebuild assessment sets the figure; for a listed, extended or non-standard home it is the only reliable way to get it right.",
      ] },
    ],
    footCta: "specialist",
    related: [
      { label: "What a rebuild cost actually is", href: "/insurance/guides/rebuild-cost" },
      { label: "Insuring a listed building", href: "/insurance/guides/listed-building-insurance" },
    ],
    hasFigures: true,
  },
  {
    slug: "rebuild-cost",
    takeaways: [
      "Rebuild cost is what it would cost to rebuild your home, not what it would sell for.",
      "The two numbers are rarely the same, and only rebuild cost belongs on your policy.",
      "Listed, extended and non-standard homes cannot be estimated from a table.",
      "Construction costs are still rising, so a figure from a few years ago is probably low.",
    ],
    stat: { value: "40%", label: "rise in rebuild costs between 2020 and 2024, faster than most policies tracked" },
    table: {
      title: "Rebuild cost, market value and sum insured",
      columns: ["Term", "What it means", "On your policy?"],
      rows: [
        ["Rebuild cost", "What it would cost to rebuild the home: materials, labour, fees, demolition, site clearance", "Yes"],
        ["Market value", "What the home would sell for, including location, demand and the land", "No"],
        ["Sum insured", "The figure your buildings cover is set at, ideally equal to rebuild cost", "The number to get right"],
      ],
      caption: "Insuring on market value instead of rebuild cost is the most common cause of underinsurance.",
    },
    faqs: [
      { q: "Why isn't market value the right figure?", a: "Market value includes the land and location, which you do not rebuild. In some areas rebuild cost is well below market value; for period and rural homes it is often well above it." },
      { q: "What is a reinstatement cost assessment?", a: "A professional measures the building and prices its actual construction: the fabric, finishes, fees and the cost of rebuilding to current regulations. It is the figure a specialist underwriter wants to see." },
      { q: "Can I use an online calculator?", a: "For a standard home, calculators such as the ABI/BCIS tool give a starting point. For listed, extended or non-standard homes they are unreliable, because they assume standard construction." },
    ],
    sources: ["BCIS (Building Cost Information Service)", "Association of British Insurers (ABI)"],
    title: "What a rebuild cost actually is",
    metaTitle: "What is rebuild cost? Reinstatement cost, explained",
    metaDescription:
      "Rebuild cost is not market value. What a professional reinstatement assessment includes, why some homes cannot be estimated from a table, and where costs are heading.",
    intro:
      "The single most useful thing to understand about insuring a home is the difference between what it would sell for and what it would cost to rebuild. They are rarely the same number, and only one of them belongs on your policy.",
    image: "/insurance/period-home.webp",
    imageAlt:
      "A white stucco period townhouse with a columned portico and black door, dressed in wisteria and white roses, a home priced by its rebuild cost rather than its market value.",
    sections: [
      { heading: "Rebuild cost versus market value", paras: [
        "Market value reflects location, demand and the land. Rebuild cost reflects materials, labour, professional fees, demolition and site clearance. In some areas the rebuild cost is far below the market value; in others, particularly for period and rural homes, it is well above it. Insuring on the wrong one is how underinsurance starts.",
      ] },
      { heading: "What a reinstatement assessment includes", paras: [
        "A professional reinstatement cost assessment measures the building and prices its actual construction: the fabric, the finishes, the fees, the cost of doing it under current regulations. It is the figure a specialist underwriter wants to see.",
      ] },
      { heading: "Why some homes cannot be tabled", paras: [
        "Listed, extended and non-standard homes cannot be estimated from a rebuild-cost table, because the table assumes standard construction. Heritage fabric, unusual materials and additions all move the figure in ways an average cannot capture.",
      ] },
      { heading: "Where costs are heading", paras: [
        "Construction costs are still rising: broadly 3 to 5% over the winter of 2025 to 2026, with services and fit-out up 6 to 8%. A figure that was right two years ago is probably low now.",
      ] },
    ],
    footCta: "specialist",
    related: [
      { label: "The underinsurance gap", href: "/insurance/guides/underinsurance" },
      { label: "Insuring a listed building", href: "/insurance/guides/listed-building-insurance" },
    ],
    hasFigures: true,
  },
  {
    slug: "listed-building-insurance",
    takeaways: [
      "A listed building is insured differently because it is repaired differently.",
      "After a loss, reinstatement is usually like-for-like, under listed building consent.",
      "Heritage fabric costs more than a standard rebuild table assumes.",
      "A reinstatement assessment for a listed home is worth commissioning.",
    ],
    stat: { value: "64%", label: "of assessed Grade II listed buildings were found to be underinsured" },
    table: {
      title: "What changes with the grade",
      columns: ["Grade", "What it means", "Repair control"],
      rows: [
        ["Grade II", "Special interest; the great majority of listed homes", "Alterations need consent"],
        ["Grade II*", "Particularly important, more than special interest", "Tighter control, higher rebuild cost"],
        ["Grade I", "Exceptional interest", "The most tightly controlled, and the dearest to reinstate"],
      ],
      caption: "Higher grades carry more obligation and a higher rebuild cost, which the premium reflects.",
    },
    faqs: [
      { q: "Can I use modern materials to repair a listed building?", a: "Usually not. Listed building consent typically requires like-for-like reinstatement in original materials and methods, even after an insured loss. That is slower and dearer than a modern repair, which is why the rebuild cost is higher." },
      { q: "Do I need consent to repair after damage?", a: "For anything beyond like-for-like repair, yes, and consent does not pause for an insurance claim. The local conservation officer usually becomes part of the process." },
      { q: "Why can't a standard rebuild calculator price my home?", a: "Lime mortar, hand-made brick, oak framing and specialist trades all cost more than modern equivalents, and a standard table does not know they are there. A reinstatement assessment prices what is actually there." },
    ],
    sources: ["Historic England", "RebuildCostASSESSMENT listed-building data"],
    hasFigures: true,
    title: "Insuring a listed building: a practical guide",
    metaTitle: "Listed building insurance: a practical guide",
    metaDescription:
      "The grades, what listed building consent means for repair after a claim, rebuild cost for heritage fabric, and working with conservation officers.",
    intro:
      "A listed building is insured differently because it is repaired differently. This guide covers the grades, consent, rebuild cost for heritage fabric, and the people you end up working with when something goes wrong.",
    image: "/insurance/private-client.webp",
    imageAlt:
      "A sage-green period country house at sunset, wisteria over its portico above a cottage garden, the sort of heritage home repaired like for like after a loss.",
    sections: [
      { heading: "The grades", paras: [
        "Grade II, Grade II* and Grade I reflect increasing significance, and increasing obligation. The higher the grade, the more tightly repair is controlled and the more a rebuild costs, which the premium reflects.",
      ] },
      { heading: "Consent, and what it means after a claim", paras: [
        "Listed building consent governs alterations, and it does not pause for an insurance claim. After a loss, reinstatement usually has to be like for like, using original materials and methods, under the same consent regime. That is slower and dearer than a modern repair.",
      ] },
      { heading: "Rebuild cost for heritage fabric", paras: [
        "Lime mortar, hand-made brick, oak framing and specialist trades all cost more than their modern equivalents, and a standard rebuild table does not know they are there. A reinstatement assessment for a listed home is worth commissioning.",
      ] },
      { heading: "Working with conservation officers", paras: [
        "For anything significant, the local conservation officer becomes part of the process. A specialist policy and a broker who understands heritage risk make that conversation far smoother.",
      ] },
    ],
    footCta: "specialist",
    related: [
      { label: "Listed building insurance", href: "/insurance/listed-buildings" },
      { label: "The underinsurance gap", href: "/insurance/guides/underinsurance" },
    ],
  },
  {
    slug: "renovation-insurance",
    takeaways: [
      "A home is most exposed while it is being worked on, and a standard policy may stop responding.",
      "JCT building contracts set out who insures the existing structure and the works.",
      "Non-negligence cover responds to neighbour damage that is nobody's fault.",
      "Arrange one renovation policy before the contractor starts, not after.",
    ],
    table: {
      title: "What a renovation policy covers",
      columns: ["Cover", "What it protects"],
      rows: [
        ["Existing structure", "The standing building while works are underway"],
        ["Contract works", "The new work itself, materials and labour, until complete"],
        ["Contents", "Your belongings during the project"],
        ["Liability & non-negligence", "Injury or damage claims, including neighbour damage that is nobody's fault"],
      ],
      caption: "One policy over all four, for the period of the works; then cover returns to a normal footing.",
    },
    faqs: [
      { q: "Will my normal home insurance cover the building work?", a: "Often not. Standard cover assumes a finished, occupied house. Once the building is open, unoccupied for periods, or controlled by contractors, several conditions may no longer be met and cover can fall away." },
      { q: "Doesn't the builder's insurance cover it?", a: "A contractor's policy covers their liability, not necessarily your existing structure or the works. JCT contracts set out who insures what; checking that clause avoids the common gap where each party assumes the other has it." },
      { q: "When should I arrange it?", a: "Before the contractor starts. A single renovation policy over the existing structure, the works, contents and liability, for the length of the job, is the clean way to do it." },
    ],
    sources: ["JCT (Joint Contracts Tribunal) standard building contract forms"],
    title: "Insurance during building work",
    metaTitle: "Insurance during renovation and building work",
    metaDescription:
      "What happens to a household policy during works, who is responsible under a JCT contract, non-negligence cover explained, and when to arrange it.",
    intro:
      "A home is at its most exposed while it is being worked on, and that is exactly when a standard household policy may stop responding. Here is what changes during works, and what to have in place before the contractor starts.",
    image: "/insurance/townhouse-golden.webp",
    imageAlt:
      "A white townhouse entrance dressed in wisteria and white roses in golden evening light, a finished home of the kind building work leaves temporarily exposed.",
    sections: [
      { heading: "What happens to a household policy", paras: [
        "Standard home insurance assumes a finished, occupied house. Once the building is open, unoccupied for periods, or under the control of contractors, several of its conditions may no longer be met, and cover can quietly fall away.",
      ] },
      { heading: "Who is responsible under a JCT contract", paras: [
        "Building contracts, and the JCT forms in particular, set out who insures the existing structure and the works. A short read of that clause, checked against the contractor's own cover, avoids the common gap where each party assumes the other has it. This is factual, not advice.",
      ] },
      { heading: "Non-negligence cover", paras: [
        "Where work happens close to a neighbour, non-negligence cover responds to damage that is nobody's fault, which ordinary liability cover will not. It matters more than its obscurity suggests.",
      ] },
      { heading: "When to arrange it", paras: [
        "Before the contractor starts, not after. A single renovation policy over the existing structure, the works, contents and liability, for the period of the job, is the clean way to do it.",
      ] },
    ],
    footCta: "specialist",
    related: [
      { label: "Renovation, extension and contract works", href: "/insurance/renovation-and-extension" },
      { label: "What a rebuild cost actually is", href: "/insurance/guides/rebuild-cost" },
    ],
  },
  {
    slug: "renewal",
    takeaways: [
      "Home insurance is usually cheapest 5 to 25 days before renewal, best around 15 days out.",
      "Quoting more than about 28 days ahead often costs more, not less.",
      "Auto-renewal is convenient and rarely the cheapest option.",
      "One diarised reminder a year is the whole discipline.",
    ],
    stat: { value: "~15 days", label: "before renewal is typically the cheapest moment to buy home insurance" },
    table: {
      title: "When to buy",
      columns: ["When you buy", "What tends to happen"],
      rows: [
        ["More than ~28 days before", "Often costs more; insurers price a distant start date"],
        ["5 to 25 days before", "The cheapest window, best around 15 days out"],
        ["On renewal day", "Averages meaningfully more than buying at the right moment"],
        ["Auto-renewal", "Convenient, rarely cheapest; worth a yearly look"],
      ],
      caption: "Timing is one of the few genuinely free savings available.",
    },
    faqs: [
      { q: "When is the cheapest time to renew?", a: "Between 5 and 25 days before your renewal date, with the optimum around 15 days out. Buying on the day itself averages meaningfully more." },
      { q: "Isn't earlier always better?", a: "Not past about 28 days. Quote too far ahead and the price often rises, because insurers price the extra uncertainty of a distant start date." },
      { q: "Should I just let it auto-renew?", a: "Auto-renewal is convenient but rarely the cheapest, and it does not check the cover still fits. A diarised look each year is worth it." },
    ],
    sources: ["MoneySavingExpert renewal-timing analysis", "Consumer pricing studies, published market research"],
    title: "When to renew, and why timing pays",
    metaTitle: "When to renew home insurance: timing that saves",
    metaDescription:
      "Insurance is cheapest 5 to 25 days before renewal, with the optimum around 15 days out. Why quoting too early costs more, auto-renewal, and setting a reminder.",
    intro:
      "Insurance is bought at exactly one moment in the year, and the price moves depending on when you buy. A little timing is one of the few genuinely free savings available.",
    image: "/insurance/hub-hero.webp",
    imageAlt:
      "A cream Georgian townhouse in golden evening light, a home whose cover is worth timing well.",
    sections: [
      { heading: "The window", paras: [
        "Cover tends to be cheapest between 5 and 25 days before renewal, with the sweet spot around 15 days out. Bought on renewal day itself it averages meaningfully more than bought at the right moment; the difference is real money for doing nothing but timing it.",
      ] },
      { heading: "Why quoting too early costs more", paras: [
        "Quote more than about 28 days ahead and the price often rises, because insurers price the extra uncertainty of a distant start date. Earlier is not cheaper past that point.",
      ] },
      { heading: "Auto-renewal", paras: [
        "Auto-renewal is convenient and rarely cheapest. It is worth a diarised look every year rather than a quiet roll-over, both for price and for whether the cover still fits.",
      ] },
      { heading: "The simplest move", paras: [
        "Set a reminder for the right window and let it do the work. One note a year is the whole discipline.",
      ] },
    ],
    footCta: "renewal",
    hasFigures: true,
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);
