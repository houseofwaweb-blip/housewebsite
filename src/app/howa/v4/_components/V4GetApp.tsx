import Image from "next/image";
import { AppStoreBadges } from "./AppStoreBadges";

/**
 * V4GetApp — the "get the app" moment: the House + the app shown together, with
 * the store badges, so HoWA reads as a real, downloadable product. Pre-launch,
 * the badges point at /howa/coming-soon (see AppStoreBadges).
 */
export function V4GetApp() {
  return (
    <section className="howa-surface px-[6vw] py-[clamp(52px,6.5vw,104px)]" style={{ background: "var(--color-howa-navy)" }}>
      <div className="mx-auto grid max-w-[1140px] items-center gap-[clamp(28px,4vw,64px)] md:grid-cols-2">
        {/* Showcase image — left */}
        <div className="relative aspect-[1500/845] w-full overflow-hidden">
          <Image
            src="/home-v4/howa-app-showcase.webp"
            alt="The HoWA app shown across phones in front of the illustrated House: today's plan, the living record and the home's HoWA Score"
            fill
            sizes="(min-width: 768px) 50vw, 92vw"
            className="object-contain"
          />
        </div>

        {/* Copy + badges — right */}
        <div className="text-[color:var(--color-howa-paper)]">
          <p className="mb-4 font-sans text-[14px] uppercase tracking-[0.3em] text-[color:var(--color-howa-teal)]">
            The HoWA app
          </p>
          <h2 className="mb-4 font-display text-[clamp(31px,3.4vw,49px)] leading-[1.08]">
            Your whole home, in your pocket.
          </h2>
          <p className="mb-8 max-w-[46ch] font-sans text-[19px] leading-[1.7] text-[color:var(--color-howa-paper)]/70">
            The living record, your HoWA Score and what matters next, wherever you are.
            Coming soon to iPhone and Android, pre-register now and we will tell you the moment it lands.
          </p>
          <AppStoreBadges />
        </div>
      </div>
    </section>
  );
}
