/**
 * Everyday cover pre-frames (spec Group D, D2, D5). Thin pages: explain, set the
 * expectation, and route the enquiry to a House specialist who arranges cover
 * for you through Provenance. The House hosts no quote form and never says
 * "compare". High-value homes are routed to advised.
 */

export type EverydayPage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  lede: string;
  /** Split-hero image, rendered beside the heading and lede. */
  image?: string;
  imageAlt?: string;
  covered: string[];
  journey: string;
  /** Optional per-product breakdown (motor, pet+travel, breakdown+bicycle). */
  products?: { name: string; body: string }[];
  /** Show the "insuring a high-value home? go advised" routing note. */
  highValueRouting?: boolean;
};

export const EVERYDAY_PAGES: EverydayPage[] = [
  {
    slug: "home",
    title: "Home insurance",
    metaTitle: "Home insurance, everyday cover",
    metaDescription:
      "Straightforward buildings and contents cover, arranged for you through Provenance. High-value and period homes are routed to the advised service.",
    heading: "Home insurance, for a standard home.",
    lede: "For a straightforward house or flat, everyday buildings and contents cover, arranged for you. Tell the House what you need and a specialist arranges it through Provenance on your behalf.",
    image: "/insurance/ev-home.webp",
    imageAlt:
      "A well-kept everyday home, the kind covered by straightforward buildings and contents insurance.",
    covered: [
      "Buildings cover for the structure",
      "Contents cover for what is inside",
      "Optional add-ons such as accidental damage",
    ],
    journey: "Tell the House what you need, and a specialist arranges your cover through Provenance.",
    highValueRouting: true,
  },
  {
    slug: "motor",
    title: "Car, van and motorbike",
    metaTitle: "Car, van and motorbike insurance, everyday cover",
    metaDescription:
      "Cover for car, van and motorbike, plus temporary cover from one hour to 28 days, arranged for you through Provenance.",
    heading: "Car, van and motorbike.",
    lede: "Everyday motor cover in one place, including the temporary cover that is genuinely useful and rarely marketed.",
    image: "/insurance/ev-motor.webp",
    imageAlt:
      "A car and van at a home, standing for everyday motor cover including temporary use.",
    covered: [
      "Third-party, third-party fire and theft, or comprehensive",
      "Optional breakdown, legal and key cover",
      "Temporary cover from one hour to 28 days",
    ],
    journey: "Tell the House which cover fits, and a specialist arranges it through Provenance.",
    products: [
      { name: "Car", body: "Standard private car cover." },
      { name: "Van", body: "Private and light commercial van use." },
      { name: "Motorbike", body: "Bikes and scooters." },
      { name: "Temporary cover", body: "From one hour to 28 days, for borrowing, lending or a short need." },
    ],
  },
  {
    slug: "pet-and-travel",
    title: "Pet and travel",
    metaTitle: "Pet and travel insurance, everyday cover",
    metaDescription:
      "Pet cover, and single-trip or annual travel including specialist medical, arranged for you through Provenance.",
    heading: "Pet and travel.",
    lede: "Two low-fuss covers in one place, both arranged for you through Provenance.",
    image: "/insurance/ev-pet.webp",
    imageAlt:
      "A family pet at home, standing for everyday pet and travel cover.",
    covered: [
      "Vet-bill cover for cats and dogs",
      "Single-trip and annual multi-trip travel",
      "Travel cover where existing conditions apply",
    ],
    journey: "Tell the House whether you need pet or travel cover, and a specialist arranges it through Provenance.",
    products: [
      { name: "Pet", body: "Cover for vet bills and the usual pet risks." },
      { name: "Single-trip travel", body: "One holiday or trip." },
      { name: "Annual multi-trip", body: "For several trips a year." },
      { name: "Specialist medical travel", body: "Where existing conditions need cover." },
    ],
  },
  {
    slug: "breakdown-and-bicycle",
    title: "Breakdown and bicycle",
    metaTitle: "Breakdown and bicycle cover, everyday",
    metaDescription:
      "Roadside, recovery and home-start breakdown cover, and cover for road, mountain, electric and high-value bicycles, arranged for you through Provenance.",
    heading: "Breakdown and bicycle.",
    lede: "The smaller everyday covers, arranged for you through Provenance.",
    image: "/insurance/ev-breakdown.webp",
    imageAlt:
      "A bicycle kept ready by the door, standing for breakdown and bicycle cover.",
    covered: [
      "Roadside assistance, recovery and home start",
      "Cover for road, mountain, electric and high-value bikes",
      "Arranged for you through Provenance",
    ],
    journey: "Tell the House which cover you need, and a specialist arranges it through Provenance.",
    products: [
      { name: "Breakdown", body: "Roadside assistance, recovery and home start." },
      { name: "Bicycle", body: "Road, mountain, electric and high-value bikes." },
    ],
  },
];

export function getEverydayPage(slug: string): EverydayPage | undefined {
  return EVERYDAY_PAGES.find((p) => p.slug === slug);
}

export const EVERYDAY_SLUGS = EVERYDAY_PAGES.map((p) => p.slug);
