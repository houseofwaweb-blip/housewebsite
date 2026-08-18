/**
 * UK postcode handling for the booking entry point.
 *
 * Pure functions, no DOM — everything here is unit tested in postcode.test.ts.
 */

/**
 * Postcode areas Willow Alexander covers, mirroring the service coverage
 * configured in ServiceOS (BR, CR, DA, E, IG, N, SE, SW, TN).
 *
 * This is an ADVISORY check so out-of-area visitors get a useful message
 * instead of a dead end inside the booking form. ServiceOS remains the
 * authority — it re-checks coverage per service against the full address.
 *
 * Keep in sync with Setup → Services → Coverage if the areas change.
 */
export const COVERED_AREAS: readonly string[] = [
  'BR', 'CR', 'DA', 'E', 'IG', 'N', 'SE', 'SW', 'TN',
];

/** Practical UK postcode pattern, applied after normalisation. */
const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s\d[A-Z]{2}$/;

/**
 * Upper-cases, strips stray whitespace and restores the single space before
 * the inward code, so "br88au" and "BR8  8au" both become "BR8 8AU".
 *
 * Inputs too short to have an inward code are returned compacted, which lets
 * the caller validate them rather than having a space inserted mid-typing.
 */
export function normalisePostcode(raw: string): string {
  const compact = raw.toUpperCase().replace(/\s+/g, '');
  if (compact.length < 5) return compact;
  return `${compact.slice(0, -3)} ${compact.slice(-3)}`;
}

export function isValidPostcode(raw: string): boolean {
  return UK_POSTCODE.test(normalisePostcode(raw));
}

/** "BR8 8AU" → "BR8" */
export function outwardCode(raw: string): string {
  return normalisePostcode(raw).split(' ')[0] ?? '';
}

/**
 * "BR8 8AU" → "BR". Matches the leading letters only, so NW1 resolves to "NW"
 * rather than being mistaken for the covered "N" area.
 */
export function postcodeArea(raw: string): string {
  return outwardCode(raw).match(/^[A-Z]{1,2}/)?.[0] ?? '';
}

export function isCovered(raw: string): boolean {
  return COVERED_AREAS.includes(postcodeArea(raw));
}

/**
 * Builds the URL that opens the ServiceOS booking form with the service and
 * postcode already applied.
 *
 *   book=1                       → tells our BookingWidget to open the modal on
 *                                  arrival (it fires the trigger click once the
 *                                  OBF client is ready)
 *   service_id=<id>              → optional service pre-selection (top-level;
 *                                  proven to preselect + skip the service screen)
 *   fs_payload[postcode]=…       → the postcode, prefilled into the booking form
 *
 * The postcode key is `fs_payload[postcode]`, CONFIRMED WORKING on the live OBF
 * (2026-08-18). The booking form itself lives in the ServiceOS iframe, which
 * reads a field literally called `postcode` out of the `fs_payload[*]`
 * pass-through. The bundle's `covering_postcode` selector is consumed by the
 * client wrapper but is NOT the iframe's address field, which is why every
 * covering_postcode variant failed. Brackets are left LITERAL (only the value is
 * encoded); browsers keep `[`/`]` unescaped in the query and the iframe reads the
 * literal key. This MUST be reached by a FULL page navigation (plain <a> /
 * location.assign) — a client-side Next <Link> does not re-init the OBF — and
 * BookingWidget must strip our params via raw-string editing, never
 * URLSearchParams.toString(), which would re-encode the brackets before the OBF
 * reads them.
 *
 * We deliberately do NOT emit `fs_screen=new_booking`. That is the OBF's own
 * auto-open trigger, and because it stays in the history entry the visitor hits
 * Back into, it re-opens the booking every time they try to leave (the reported
 * loop). `book=1` alone is enough: our BookingWidget opens the modal, and the OBF
 * still reads service_id / fs_payload[postcode] from the URL at init.
 */
export function buildBookingUrl(
  postcode: string,
  serviceId?: number,
  path = '/',
): string {
  const parts = ['book=1'];
  if (serviceId) parts.push(`service_id=${encodeURIComponent(String(serviceId))}`);
  if (postcode) {
    parts.push(
      `fs_payload[postcode]=${encodeURIComponent(normalisePostcode(postcode))}`,
    );
  }
  return `${path}?${parts.join('&')}`;
}
