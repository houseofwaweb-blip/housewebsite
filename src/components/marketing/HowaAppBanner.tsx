import Image from "next/image";
import { AppStoreBadges } from "@/app/howa/v4/_components/AppStoreBadges";

/**
 * HowaAppBanner — a compact "get the app" strip for the homepage (and anywhere
 * a small app prompt is wanted): the app visual, a line of copy, and the store
 * badges. Pre-launch the badges point at /howa/coming-soon (see AppStoreBadges).
 */
export function HowaAppBanner() {
  return (
    <section className="howa-surface px-[6vw] py-[clamp(28px,3.5vw,44px)]" style={{ background: "var(--color-howa-navy)" }}>
      <div className="mx-auto flex max-w-[1080px] flex-col items-center gap-6 text-center md:flex-row md:gap-10 md:text-left">
        {/* App visual */}
        <div className="relative aspect-[1500/845] w-[clamp(180px,22vw,240px)] shrink-0">
          <Image
            src="/home-v4/howa-app-showcase.webp"
            alt="The HoWA app across phones in front of the illustrated House"
            fill
            sizes="240px"
            className="object-contain"
          />
        </div>

        {/* Copy */}
        <div className="flex-1 text-[color:var(--color-howa-paper)]">
          <p className="mb-1.5 font-sans text-[14px] uppercase tracking-[0.3em] text-[color:var(--color-howa-teal)]">
            The HoWA app
          </p>
          <p className="font-display text-[clamp(21px,2vw,27px)] leading-[1.2]">
            Your home&apos;s living record, score and next steps, in your pocket.
          </p>
          <p className="mt-1 font-sans text-[18px] text-[color:var(--color-howa-paper)]/65">
            Coming soon to iPhone and Android.
          </p>
        </div>

        {/* Badges */}
        <div className="shrink-0">
          <AppStoreBadges className="justify-center" />
        </div>
      </div>
    </section>
  );
}
