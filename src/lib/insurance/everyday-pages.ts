/**
 * Everyday cover pre-frames (spec Group D, D2, D5). Thin pages: explain, set the
 * expectation, hand off to the Provenance-operated service. The House hosts no
 * quote form and never says "compare". High-value homes are routed to advised.
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
      "Straightforward buildings and contents cover, arranged online through the service Provenance operates. High-value and period homes are routed to the advised service.",
    heading: "Home insurance, for a standard home.",
    lede: "For a straightforward house or flat, everyday cover you can arrange online in a few minutes. Nothing to fill in here; the quote runs on the Provenance-operated service.",
    image: "/insurance/ev-home.webp",
    imageAlt:
      "A well-kept everyday home, the kind covered by straightforward buildings and contents insurance.",
    covered: [
      "Buildings cover for the structure",
      "Contents cover for what is inside",
      "Optional add-ons such as accidental damage",
    ],
    journey: "A short set of questions on the Provenance-operated service, and a quote in a few minutes.",
    highValueRouting: true,
  },
  {
    slug: "motor",
    title: "Car, van and motorbike",
    metaTitle: "Car, van and motorbike insurance, everyday cover",
    metaDescription:
      "Cover for car, van and motorbike, plus temporary cover from one hour to 28 days, arranged online through the service Provenance operates.",
    heading: "Car, van and motorbike.",
    lede: "Everyday motor cover in one place, including the temporary cover that is genuinely useful and rarely marketed.",
    image: "/insurance/ev-motor.webp",
    imageAlt:
      "A car and van at a home, standing for everyday motor cover including temporary use.",
    covered: [],
    journey: "Choose the journey that fits, answer a few questions on the Provenance-operated service, and get a quote.",
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
      "Pet cover, and single-trip or annual travel including specialist medical, arranged online through the service Provenance operates.",
    heading: "Pet and travel.",
    lede: "Two low-fuss covers in one place, both quick to arrange on the Provenance-operated service.",
    image: "/insurance/ev-pet.webp",
    imageAlt:
      "A family pet at home, standing for everyday pet and travel cover.",
    covered: [],
    journey: "Pick pet or travel, answer a few questions, and get a quote.",
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
      "Roadside, recovery and home-start breakdown cover, and cover for road, mountain, electric and high-value bicycles, through the service Provenance operates.",
    heading: "Breakdown and bicycle.",
    lede: "The smaller everyday covers, arranged online in a couple of minutes.",
    image: "/insurance/ev-breakdown.webp",
    imageAlt:
      "A bicycle kept ready by the door, standing for breakdown and bicycle cover.",
    covered: [],
    journey: "Choose the cover, answer a few questions, and get a quote.",
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
