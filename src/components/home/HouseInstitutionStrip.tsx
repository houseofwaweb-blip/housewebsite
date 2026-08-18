import Link from "next/link";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";

/**
 * HouseInstitutionStrip — the homepage's closing institutional band (enhanced
 * mockup footer strip). Dark House-brown. HoWA appears here as supporting
 * infrastructure ("keeps the whole House in order"), never as the identity.
 * Carries the floral pattern as the House's institutional signature (spec §4.4:
 * gold/white linework, one pattern moment per viewport).
 */
export function HouseInstitutionStrip() {
  return (
    <section className="relative overflow-hidden bg-house-brown text-house-cream px-[5vw] py-[clamp(40px,5vw,72px)]">
      <FlowerWatermark color="gold" side="right" opacity={0.16} />
      <div className="relative z-10 mx-auto max-w-[1360px] grid gap-8 lg:grid-cols-[1.1fr_1fr_auto] lg:items-center">
        <div>
          <p className="font-display text-[1.6rem] leading-[1.1] text-house-cream">
            An institution for the British home.
          </p>
          <p className="mt-2 font-sans text-[14px] text-house-cream/70">
            Service, pride and good order.
          </p>
        </div>

        <p className="font-sans text-[15px] leading-relaxed text-house-cream/85 lg:text-center">
          HoWA powers the booking, Home Record and reminders that help keep useful household information together.
        </p>

        <div className="flex flex-col items-start lg:items-end gap-3">
          <div className="font-sans text-[13px] text-house-cream/70 lg:text-right">
            <p className="tracking-[0.14em] uppercase text-[11px] text-house-gold">Speak to the House</p>
            <p className="mt-1">
              <a href="tel:08000478738" className="text-house-cream/85 no-underline hover:text-house-cream">
                0800 047 8738
              </a>
            </p>
            <p>
              <a href="mailto:sales@willowalexander.co.uk" className="text-house-cream/85 no-underline hover:text-house-cream">
                sales@willowalexander.co.uk
              </a>
            </p>
          </div>
          <Link
            href="/the-house/about"
            className="font-sans text-[11px] tracking-[0.16em] uppercase text-house-cream bg-house-brown border border-house-brown px-6 py-3 no-underline hover:brightness-125 transition"
          >
            Explore the House
          </Link>
        </div>
      </div>
    </section>
  );
}
