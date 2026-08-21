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
      "Business insurance introduced by the House and arranged by Provenance, with a no-obligation review of existing cover for businesses in the House network.",
    hero: {
      eyebrow: "Business",
      heading: "Business insurance built around the business you actually run.",
      lede: "Commercial insurance needs to reflect the work, the people, the premises and the risks behind the business. The House makes the introduction and Provenance reviews and arranges the cover.",
    },
    image: "/insurance/cat-business.webp",
    imageAlt:
      "The trades and studios in the House's own network, covered for commercial, liability and professional risk.",
    whoImage: "/insurance/house-record.webp",
    whoImageAlt:
      "A leather ledger, brass sconce and fountain pen on a sage surface, representing a review of existing business insurance.",
    who: {
      heading: "Who this is for",
      body: [
        "Businesses, contractors, suppliers and members of the House network looking for a detailed review of their commercial insurance.",
        "The starting point is the business as it operates today, including the cover already in place and any gaps or overlaps worth addressing.",
      ],
    },
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
      heading: "Insurance for the work, the tools and the liability that comes with the job.",
      lede: "Trades and contractors can need several kinds of cover working together. The House introduces you to Provenance to review the work you do and arrange the cover around it.",
    },
    image: "/insurance/interior-editorial.webp",
    imageAlt:
      "A sunlit period drawing room with a marble fireplace, gilt-framed pictures and armfuls of cut flowers, the kind of home a House Approved trade is trusted to work in.",
    whoImage: "/insurance/house-record.webp",
    whoImageAlt:
      "A leather ledger and fountain pen on a sage surface, representing the insurance a trade or contracting business may need.",
    who: {
      heading: "What a trade actually needs",
      body: [
        "Public and employers' liability, tools cover, contract works, and professional indemnity where design is part of the job. A specialist can put the relevant covers together around the work the business actually does.",
        "For House Approved professionals, insurance is part of the evidence required to show that the business is set up to take on the work responsibly.",
      ],
    },
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
    image: "/insurance/interior-editorial.webp",
    imageAlt:
      "A refined period interior with a marble chimneypiece, framed pictures and abundant fresh flowers, the kind of work architects and designers carry lasting liability for.",
    whoImage: "/insurance/house-record.webp",
    whoImageAlt:
      "A leather ledger and drawings on a sage sill, representing professional work that can carry liability after a project is complete.",
    who: {
      heading: "Who it is for",
      body: [
        "Professional indemnity is for businesses whose advice, design, specification or specialist service could lead to a claim if something goes wrong.",
        "The level of cover should reflect the work, contracts, clients and potential exposure rather than an arbitrary round figure.",
      ],
    },
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
    enquiryType: "professional-indemnity",
  },
];

export function getBusinessPage(slug: string): BusinessPage | undefined {
  return BUSINESS_PAGES.find((p) => p.slug === slug);
}

/** The sub-pages (everything except the E1 hub, which lives at /insurance/business). */
export const BUSINESS_SUB_SLUGS = BUSINESS_PAGES.filter((p) => p.slug !== "business").map((p) => p.slug);
