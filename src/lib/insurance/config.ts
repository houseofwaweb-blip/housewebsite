/**
 * Insurance build, shared config and the regulatory perimeter in code.
 *
 * Insurance from the House is COMING SOON. The House is an INTRODUCER ONLY: an
 * FCA-regulated insurance specialist will arrange and administer all cover when
 * it opens, and that partner is not named on the site until then. Nothing on
 * this domain may describe the House as advising on, arranging, administering,
 * COMPARING or transacting insurance. No advice language. No urgency. Forms
 * never ask pre-purchase questions (sums insured, contents value, claims
 * history, existing insurer), Article 33B limits the House to passing
 * information it already holds.
 */

/** The introducer legal entity (the selling party). HoWA appears nowhere. */
export const INTRODUCER_LEGAL_NAME = "House of Willow Alexander";

/**
 * The forthcoming online portal the House will send enquirers into. Not live at
 * launch, so every portal-bound button falls back to "#" (a no-op anchor).
 * One-time switch when it goes live: set NEXT_PUBLIC_INSURANCE_PORTAL_URL in
 * Vercel, or change this default. All portal CTAs read from here, so it flips
 * everywhere at once.
 */
export const PORTAL_URL =
  process.env.NEXT_PUBLIC_INSURANCE_PORTAL_URL ?? "#";

export const RENEWAL_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
  "Not sure yet",
] as const;
export type RenewalMonth = (typeof RENEWAL_MONTHS)[number];

/**
 * Covers the enquiry form offers, grouped for the <select>. `value` matches the
 * page's `enquiryType` slug so the form can pre-select the cover for the page
 * the visitor is on. The recipient of the enquiry sees the human label.
 */
export const INSURANCE_COVER_GROUPS: {
  group: string;
  options: { value: string; label: string }[];
}[] = [
  {
    group: "Home & pet",
    options: [
      { value: "home", label: "Home insurance" },
      { value: "private-client", label: "Private client & estate" },
      { value: "motor", label: "Car, van & motorbike" },
      { value: "pet-and-travel", label: "Pet & travel" },
      { value: "breakdown-and-bicycle", label: "Breakdown & bicycle" },
      { value: "boiler-cover", label: "Boiler & heating cover" },
      { value: "appliance-cover", label: "Appliance cover" },
    ],
  },
  {
    group: "Specialist property",
    options: [
      { value: "listed-buildings", label: "Listed buildings" },
      { value: "thatched-properties", label: "Thatched properties" },
      { value: "non-standard-construction", label: "Non-standard construction" },
      { value: "second-homes", label: "Second & holiday homes" },
      { value: "unoccupied-property", label: "Unoccupied & probate" },
      { value: "renovation-and-extension", label: "Renovation & works" },
    ],
  },
  {
    group: "Assets",
    options: [
      { value: "fine-art-and-collections", label: "Fine art, jewellery & collections" },
      { value: "classic-and-prestige-motor", label: "Classic & prestige motor" },
      { value: "boat-yacht-aviation", label: "Boat, yacht & aviation" },
    ],
  },
  {
    group: "Business",
    options: [
      { value: "business", label: "Business insurance" },
      { value: "trades-and-contractors", label: "Trades & contractors" },
      { value: "professional-indemnity", label: "Professional indemnity" },
    ],
  },
];

/** slug → human label, for storing the chosen cover on the enquiry. */
export const INSURANCE_COVER_LABEL: Record<string, string> = Object.fromEntries(
  INSURANCE_COVER_GROUPS.flatMap((g) => g.options.map((o) => [o.value, o.label])),
);
