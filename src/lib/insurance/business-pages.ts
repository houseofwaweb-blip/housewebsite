/**
 * Business insurance pages (spec Group E). Warm B2B referral through the House's
 * contractor, supplier and member network, no aggregator problem. Introducer
 * boundary is identical to retail: the House introduces, Provenance arranges.
 * "Request a review" (the silent-review device), 6-field form with company.
 */

export type BusinessPage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  hero: { eyebrow: string; heading: string; lede: string };
  /** Optional hero image, rendered in the split hero beside the heading block. */
  image?: string;
  imageAlt?: string;
  /** Optional image for the "Who this is for" split section. */
  whoImage?: string;
  whoImageAlt?: string;
  who: { heading: string; body: string[] };
  detail: { title: string; points: { h: string; p: string }[] };
  placed: { heading: string; body: string };
  /** E1 only: the free "silent review" lead device + links to the sub-pages. */
  silentReview?: boolean;
  subLinks?: { label: string; href: string }[];
  enquiryType: string;
};

export const BUSINESS_PAGES: BusinessPage[] = [
  {
    slug: "business", // rendered at /insurance/business
    title: "Business insurance",
    metaTitle: "Business insurance broker introductions",
    metaDescription:
      "Warm B2B insurance introductions for the House's contractor, supplier and member network. A free silent review of existing cover. Introduced by the House, arranged by Provenance.",
    hero: {
      eyebrow: "Business",
      heading: "The cover a working business needs, without the aggregator guesswork.",
      lede: "Brokers hold most of the UK commercial market for a reason: business risk does not fit a comparison form. Introductions here are warm B2B, through a network the House already knows.",
    },
    image: "/insurance/cat-business.webp",
    imageAlt:
      "The trades and studios in the House's own network, covered for commercial, liability and professional risk.",
    whoImage: "/insurance/house-record.webp",
    whoImageAlt:
      "A leather ledger, brass sconce and a fountain pen on a sage surface, standing for the free silent review of the cover a working business already holds.",
    who: {
      heading: "Who this is for",
      body: [
        "The House's contractor and supplier network, members running their own businesses, and the House's own operating companies.",
        "If you already work with the House, you are a known quantity, which is the strongest starting point a specialist broker can have.",
      ],
    },
    detail: {
      title: "The silent review",
      points: [
        { h: "A free review of what you hold", p: "Provenance will review your existing arrangements and identify gaps, underinsurance and where the premium can be benchmarked. No obligation, and nothing changes unless you decide it should." },
        { h: "Built for relationships, not rate", p: "The UK commercial market is soft, so this is built for the long relationship and the cross-sell, not for a quick saving. That is the honest position." },
        { h: "One conversation across the estate", p: "Where a member's home and business both need cover, they can sit with one adviser rather than two." },
      ],
    },
    placed: {
      heading: "What Provenance can place",
      body: "Business combined, professional indemnity, directors' and officers', property owners, fleet from two vehicles, motor trade and cyber. The House introduces you; Provenance arranges and administers the cover.",
    },
    silentReview: true,
    subLinks: [
      { label: "Trades & contractors", href: "/insurance/business/trades-and-contractors" },
      { label: "Professional indemnity", href: "/insurance/business/professional-indemnity" },
    ],
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
      lede: "Construction is the largest single sector of UK small business, and it is the House's own supply chain, which makes it the warmest introduction route there is.",
    },
    image: "/insurance/interior-editorial.webp",
    imageAlt:
      "A sunlit period drawing room with a marble fireplace, gilt-framed pictures and armfuls of cut flowers, the kind of home a House Approved trade is trusted to work in.",
    whoImage: "/insurance/house-record.webp",
    whoImageAlt:
      "A leather ledger and a fountain pen resting on a sage surface, standing for the liability, tools and contract-works cover a trade needs set down clearly.",
    who: {
      heading: "What a trade actually needs",
      body: [
        "Public and employers' liability, tools cover, contract works, and professional indemnity where design is part of the job. A specialist puts the right combination together rather than a one-size policy.",
        "For anyone on, or applying to, the House Approved list, this is the same standard-and-cover conversation.",
      ],
    },
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
    image: "/insurance/interior-editorial.webp",
    imageAlt:
      "A refined period interior with a marble chimneypiece, framed pictures and abundant fresh flowers, the kind of work architects and designers carry lasting liability for.",
    whoImage: "/insurance/house-record.webp",
    whoImageAlt:
      "A leather ledger and drawings on a sage sill, standing for the drawings and specifications whose professional-indemnity exposure outlives the job.",
    who: {
      heading: "Who it is for",
      body: [
        "The professions whose advice, drawings and specifications carry liability long after the job is done.",
        "Provenance sets the limit against real exposure rather than a round number, which is where most policies are quietly wrong.",
      ],
    },
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
    enquiryType: "professional-indemnity",
  },
];

export function getBusinessPage(slug: string): BusinessPage | undefined {
  return BUSINESS_PAGES.find((p) => p.slug === slug);
}

/** The sub-pages (everything except the E1 hub, which lives at /insurance/business). */
export const BUSINESS_SUB_SLUGS = BUSINESS_PAGES.filter((p) => p.slug !== "business").map((p) => p.slug);
