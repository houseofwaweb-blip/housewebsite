import Image from "next/image";
import Link from "next/link";
import { HeroBookingBar } from "@/components/home/HeroBookingBar";

/**
 * CabinetHero — homepage hero (Sept-2026 "further amendments" mockup): a
 * full-stretch British hall image. Copy overlays the LEFT; the six coloured
 * service DOORS on the right are each a hotspot link; a cream booking bar spans
 * the bottom. On desktop the stage keeps the image's native aspect so the door
 * hotspots line up; on mobile the copy + booking bar stack under the image.
 *
 * Hotspot rectangles are % of the frame, best-effort over the painted doors.
 */
type Hotspot = { label: string; href: string; x: number; y: number; w: number; h: number };

const DOORS: Hotspot[] = [
  { label: "Gardening", href: "/services/gardening", x: 57, y: 24, w: 14, h: 16 },
  { label: "Cleaning", href: "/services/cleaning", x: 72, y: 24, w: 15, h: 16 },
  { label: "Handyman", href: "/services/handyman", x: 57, y: 42, w: 14, h: 17 },
  { label: "Windows", href: "/services/window-cleaning", x: 72, y: 42, w: 15, h: 17 },
  { label: "Removals", href: "/services/removals", x: 57, y: 61, w: 14, h: 18 },
  { label: "Design", href: "/design", x: 72, y: 61, w: 15, h: 18 },
];

function Copy() {
  return (
    <>
      <p className="mb-4 font-sans text-[clamp(10px,0.9vw,12px)] uppercase tracking-[0.24em] text-house-gold-light">
        A British home &amp; garden institution
      </p>
      <h1 className="font-display text-[clamp(52px,8vw,132px)] leading-[0.92] text-house-cream">
        That feeling<br />you call <em className="italic">home.</em>
      </h1>
      <p className="mt-6 max-w-[34ch] font-sans text-[clamp(18px,1.9vw,28px)] leading-[1.45] text-house-cream/90">
        Home and garden services, design, insurance and beautiful things for the
        home. All in one place, with people you can trust.
      </p>
    </>
  );
}

export function CabinetHero() {
  return (
    <section aria-label="House of Willow Alexander" className="bg-house-forest">
      {/* Full-stretch stage — native aspect so the door hotspots align */}
      <div className="relative w-full" style={{ aspectRatio: "1916 / 821" }}>
        <Image
          src="/home/hero-hall-doors.webp"
          alt="A British hall with the House of Willow Alexander service cupboard: six coloured doors for gardening, cleaning, handyman, windows, removals and design, with a dog resting on the checkerboard floor."
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Left scrim for legible overlay copy (desktop) */}
        <div aria-hidden className="absolute inset-0 hidden xl:block" style={{ background: "linear-gradient(90deg, rgba(24,36,28,0.78) 0%, rgba(24,36,28,0.40) 30%, rgba(24,36,28,0) 55%)" }} />

        {/* Copy overlay (desktop) */}
        <div className="absolute left-[clamp(24px,4vw,72px)] top-[15%] hidden max-w-[52%] xl:block">
          <Copy />
        </div>

        {/* Door hotspots (desktop) */}
        <div className="absolute inset-0 hidden xl:block" aria-label="Choose a service from the cupboard">
          {DOORS.map((d) => (
            <Link
              key={d.label}
              href={d.href}
              aria-label={d.label}
              className="absolute rounded-sm outline-offset-2 transition-colors duration-200 hover:bg-house-gold-light/15 focus-visible:bg-house-gold-light/25"
              style={{ left: `${d.x}%`, top: `${d.y}%`, width: `${d.w}%`, height: `${d.h}%` }}
            >
              <span className="sr-only">{d.label}</span>
            </Link>
          ))}
        </div>

        {/* Booking bar, lower-left under the copy (desktop) — left half only, per
            the mockup, so it doesn't run under the door cupboard on the right */}
        <div className="absolute left-[clamp(24px,4vw,72px)] bottom-[6%] hidden w-[min(760px,54%)] xl:block">
          <HeroBookingBar />
          <p className="mt-2 font-sans text-[12px] uppercase tracking-[0.2em] text-house-cream/80">Booked through HoWA</p>
        </div>
      </div>

      {/* Below xl: copy + booking bar stacked under the image (the fixed-aspect
          stage is too short for the overlay to sit without the H1, subline and
          booking bar colliding, so we stack until there is real vertical room). */}
      <div className="px-6 py-8 xl:hidden">
        <Copy />
        <div className="mt-6">
          <HeroBookingBar />
          <p className="mt-2 font-sans text-[12px] uppercase tracking-[0.2em] text-house-cream/70">Booked through HoWA</p>
        </div>

        {/* The six doors as tappable links (the image hotspots are desktop-only) */}
        <nav aria-label="Choose a service" className="mt-7 grid grid-cols-2 gap-2.5">
          {DOORS.map((d) => (
            <Link
              key={d.label}
              href={d.href}
              className="flex h-12 items-center justify-center border border-house-cream/30 bg-house-cream/5 px-3 text-center font-sans text-[13px] uppercase tracking-[0.12em] text-house-cream no-underline transition-colors hover:bg-house-cream/15"
            >
              {d.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
