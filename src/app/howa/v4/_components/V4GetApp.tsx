import Image from "next/image";
import { AppStoreBadges } from "./AppStoreBadges";

/**
 * V4GetApp — the "get the app" moment: a full phone render beside the store
 * badges, so HoWA reads as a real, downloadable product. Pre-launch, the badges
 * point at /howa/coming-soon (see AppStoreBadges).
 */
export function V4GetApp() {
  return (
    <section className="howa-surface px-[6vw] py-[clamp(56px,7vw,108px)]" style={{ background: "var(--color-howa-navy)" }}>
      <div className="mx-auto grid max-w-[1080px] items-center gap-[clamp(28px,5vw,72px)] md:grid-cols-2">
        {/* Phone render */}
        <div className="relative mx-auto h-[clamp(380px,42vw,520px)] w-[clamp(180px,21vw,246px)]">
          <Image
            src="/home-v4/phone-housekeeper-full.webp"
            alt="The HoWA app showing the home's living record, HoWA Score and what matters next"
            fill
            sizes="246px"
            className="object-contain drop-shadow-[0_40px_80px_rgba(8,12,20,0.55)]"
          />
        </div>

        {/* Copy + badges */}
        <div className="text-[color:var(--color-howa-paper)]">
          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-howa-teal)]">
            The HoWA app
          </p>
          <h2 className="mb-4 font-display text-[clamp(28px,3.2vw,44px)] leading-[1.08]">
            Your whole home, in your pocket.
          </h2>
          <p className="mb-8 max-w-[44ch] font-sans text-[15px] leading-[1.7] text-[color:var(--color-howa-paper)]/70">
            The living record, your HoWA Score and what matters next, wherever you are.
            Coming soon to iPhone and Android, pre-register now and we will tell you the moment it lands.
          </p>
          <AppStoreBadges />
        </div>
      </div>
    </section>
  );
}
