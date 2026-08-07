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
  sections: { heading: string; paras: string[] }[];
  /** Foot CTA: a soft link to the advised service, or the renewal reminder. */
  footCta: "specialist" | "renewal";
  related?: { label: string; href: string };
  /** Show the "figures indicative / pending sign-off" note. */
  hasFigures?: boolean;
};

export const GUIDES: Guide[] = [
  {
    slug: "underinsurance",
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
    related: { label: "What a rebuild cost actually is", href: "/insurance/guides/rebuild-cost" },
    hasFigures: true,
  },
  {
    slug: "rebuild-cost",
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
    hasFigures: true,
  },
  {
    slug: "listed-building-insurance",
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
    related: { label: "Listed building insurance", href: "/insurance/listed-buildings" },
  },
  {
    slug: "renovation-insurance",
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
    related: { label: "Renovation, extension and contract works", href: "/insurance/renovation-and-extension" },
  },
  {
    slug: "renewal",
    title: "When to renew, and why timing pays",
    metaTitle: "When to renew home insurance: timing that saves",
    metaDescription:
      "Insurance is cheapest 5 to 25 days before renewal, with the optimum around 15 days out. Why quoting too early costs more, auto-renewal, and setting a reminder.",
    intro:
      "Insurance is bought at exactly one moment in the year, and the price moves depending on when you buy. A little timing is one of the few genuinely free savings available.",
    image: "/insurance/house-record.webp",
    imageAlt:
      "A House Record book and a fountain pen on a sage surface beside a brass sconce and a peony, evoking the single diarised note that catches the right renewal window.",
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
