import Link from "next/link";
import { SERVICES, HOUSEHOLD, resolveStatus, STATUS_RULES } from "@/lib/truth";

/**
 * The truth-driven band for a live service route (Directive v2 STEP 07).
 *
 * Everything here reads from the truth layer, which is the PASS condition:
 * "Postcode, status, provider and write-back values come from the truth layer."
 * Nothing on this band is hand-written per service, so a service cannot drift
 * out of step with what the House can actually deliver.
 *
 * Two rules are enforced in code rather than left to a writer:
 *
 *  1. WRITE-BACK. The directive is explicit: only say "will appear in your Home
 *     Record" where the end-to-end workflow has been TESTED. Otherwise say "can
 *     be saved" or "your booking confirmation begins the record". So the copy is
 *     selected by writebackMode; there is no way to promise automatic write-back
 *     for a service whose mode is not "automatic".
 *
 *  2. HOUSEHOLD OWNERSHIP. Every route carries a visible Household marker and
 *     breadcrumb (gardening -> The Gardener; cleaning, windows and gutters ->
 *     The Housekeeper). The service stays the H1 for urgent intent; the member
 *     owns its place in the House.
 */

const WRITEBACK_COPY: Record<string, string> = {
  automatic:
    "After the visit, supported photographs, notes, invoice and next-care information will appear in your Home Record.",
  customer_save:
    "Your booking and confirmation can be held against the home. Where the provider workflow supports it, completion photographs, notes, invoice, warranty or next-care information return to the same Home Record.",
  confirmation_only:
    "Your booking confirmation begins the home's record. Documents from the visit can be saved to it.",
  none: "Your booking confirmation can be saved to the home's record.",
};

const PRICE_COPY: Record<string, string> = {
  fixed: "Fixed price, shown before you confirm. VAT shown at checkout.",
  from: "Priced from a published starting point, confirmed before you commit. VAT shown at checkout.",
  hourly: "Charged by the hour, with the rate shown before you confirm. VAT shown at checkout.",
  quote: "Quoted after the provider understands the work. You see the quotation basis before you commit.",
  not_published: "Price is not published for this service.",
};

export function ServiceTruthBand({ slug }: { slug: string }) {
  // Match on canonical route as well as id: the truth layer's gutter service is
  // "gutter-clearing" while its route is /services/gutter-cleaning.
  const svc =
    SERVICES.find((s) => s.id === slug) ??
    SERVICES.find((s) => s.canonicalRoute === `/services/${slug}`);
  if (!svc) return null;

  const status = resolveStatus(svc);
  const rules = STATUS_RULES[status];
  const owner = HOUSEHOLD.find((m) => m.id === svc.householdOwner);
  const areas = svc.postcodeRules;

  return (
    <section className="px-[5vw] py-14 bg-house-cream-dark border-t border-b border-house-brown/10">
      <div className="max-w-[1100px] mx-auto">
        {/* Household marker + breadcrumb. The member owns the service's place. */}
        {owner && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 list-none p-0 m-0 font-sans text-[12px] tracking-[0.14em] uppercase text-house-brown/60">
              <li><Link href="/household" className="no-underline text-house-brown/60 hover:text-house-gold-ink">The Household</Link></li>
              <li aria-hidden="true">·</li>
              <li><Link href={owner.route} className="no-underline text-house-gold-ink">{owner.publicName}</Link></li>
              <li aria-hidden="true">·</li>
              <li className="text-house-brown/80">{svc.publicName}</li>
            </ol>
          </nav>
        )}

        <div className="grid gap-8 md:grid-cols-3">
          {/* Availability — real coverage, never a blanket region. */}
          <div>
            <h3 className="font-sans text-[11px] tracking-[0.2em] uppercase text-house-gold-ink mb-3">Availability</h3>
            <p className="font-sans text-[15px] leading-[1.6] text-house-brown/80 m-0">{rules.label}</p>
            {areas.length > 0 && (
              <p className="font-sans text-[13.5px] leading-[1.6] text-house-brown/65 mt-2 m-0">
                Currently serviceable around {areas.join(", ")}. Check your postcode for a definite answer.
              </p>
            )}
          </div>

          {/* Named provider — the legal seller, not the House. */}
          <div>
            <h3 className="font-sans text-[11px] tracking-[0.2em] uppercase text-house-gold-ink mb-3">Who does the work</h3>
            {svc.sellerEntity ? (
              <>
                <p className="font-sans text-[15px] leading-[1.6] text-house-brown/80 m-0">{svc.sellerEntity}</p>
                <p className="font-sans text-[13.5px] leading-[1.6] text-house-brown/65 mt-2 m-0">
                  Booked through HoWA. The named provider is responsible for its
                  contract and delivery unless checkout states otherwise.
                </p>
              </>
            ) : (
              <p className="font-sans text-[15px] leading-[1.6] text-house-brown/80 m-0">
                The provider responsible for the work is shown before you confirm.
              </p>
            )}
          </div>

          {/* Price basis — the mode, not an invented number. */}
          <div>
            <h3 className="font-sans text-[11px] tracking-[0.2em] uppercase text-house-gold-ink mb-3">Price basis</h3>
            <p className="font-sans text-[15px] leading-[1.6] text-house-brown/80 m-0">{PRICE_COPY[svc.priceMode]}</p>
          </div>
        </div>

        {/* Home Record — wording selected by the real write-back mode. */}
        <div className="mt-10 pt-8 border-t border-house-brown/12">
          <h3 className="font-display text-[clamp(20px,2.2vw,28px)] leading-[1.15] text-house-black m-0 mb-3">
            A visit should leave more than a receipt.
          </h3>
          <p className="font-sans text-[15.5px] leading-[1.65] text-house-brown/78 m-0 max-w-[68ch]">
            {WRITEBACK_COPY[svc.writebackMode]}
          </p>
        </div>
      </div>
    </section>
  );
}
