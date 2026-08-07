/**
 * Insurance build, shared config and the regulatory perimeter in code.
 *
 * The House is an INTRODUCER ONLY. Provenance (FRN 804047, part of Lloyd &
 * Whyte, Benefact-owned) arranges and administers all cover. Nothing on this
 * domain may describe the House as advising on, arranging, administering,
 * COMPARING or transacting insurance. No advice language. No urgency. Forms
 * never ask pre-purchase questions (sums insured, contents value, claims
 * history, existing insurer), Article 33B limits the House to passing
 * information it already holds.
 *
 * ALL regulatory wording here is INDICATIVE and pending Provenance compliance
 * sign-off before publish. Do not treat as final.
 */

export const PROVENANCE = {
  legalName: "Provenance Insurance Brokers Ltd",
  frn: "804047",
  group: "Lloyd & Whyte",
  backer: "Benefact",
} as const;

/** The introducer legal entity (the selling party). HoWA appears nowhere. */
export const INTRODUCER_LEGAL_NAME = "House of Willow Alexander";

/**
 * Mandated disclosure, INDICATIVE wording from the spec, pending Provenance
 * compliance's verbatim version. Rendered directly above every primary action,
 * never buried in the site footer.
 */
export const DISCLOSURE_TEXT =
  `Insurance from the House is arranged and administered by ${PROVENANCE.legalName}, ` +
  `authorised and regulated by the Financial Conduct Authority (FRN ${PROVENANCE.frn}). ` +
  `${INTRODUCER_LEGAL_NAME} acts solely as an introducer.`;

/**
 * The Provenance-operated everyday quote-and-buy service (Seopa/Quotezone).
 * Everyday cover HANDS OFF to this; the House hosts no quote form. This must
 * point at PROVENANCE, never at HoWA. Placeholder is the Provenance site until
 * they provide the real per-product Seopa/Quotezone journey URLs; override via
 * NEXT_PUBLIC_INSURANCE_QUOTE_URL.
 */
export const QUOTE_SERVICE_URL =
  process.env.NEXT_PUBLIC_INSURANCE_QUOTE_URL ?? "https://www.provenanceinsurance.co.uk/"; // TODO: real Provenance/Seopa journey URL(s)

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
