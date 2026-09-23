import Image from "next/image";
import Link from "next/link";
import { HeroBookingBar } from "@/components/home/HeroBookingBar";

/**
 * CabinetHero — homepage hero (Sept-2026 "further amendments" mockup).
 *
 * Desktop (xl+): a full-stretch British hall image; copy + booking bar overlay
 * the LEFT as a flex column (justify-between + a min gap, so they never overlap
 * or crowd each other however short the fixed-aspect stage gets); the six
 * coloured service DOORS on the right are each a hotspot link.
 *
 * Below xl: a PORTRAIT cabinet image (hero-cabinet-mobile.webp) whose six doors
 * are each a tappable hotspot, then the copy + booking bar underneath. The doors
 * live on the image, so there is no separate text button grid.
 *
 * Hotspot rectangles are % of each frame, best-effort over the painted doors.
 */
type Hotspot = { label: string; href: string; x: number; y: number; w: number; h: number };

const SERVICES = [
  { label: "Gardening", href: "/services/gardening" },
  { label: "Cleaning", href: "/services/cleaning" },
  { label: "Handyman", href: "/services/handyman" },
  { label: "Windows", href: "/services/window-cleaning" },
  { label: "Removals", href: "/services/removals" },
  { label: "Design", href: "/design" },
];

// Wide hall image (desktop): doors on the right half.
const DOORS: Hotspot[] = [
  { ...SERVICES[0], x: 57, y: 24, w: 14, h: 16 },
  { ...SERVICES[1], x: 72, y: 24, w: 15, h: 16 },
  { ...SERVICES[2], x: 57, y: 42, w: 14, h: 17 },
  { ...SERVICES[3], x: 72, y: 42, w: 15, h: 17 },
  { ...SERVICES[4], x: 57, y: 61, w: 14, h: 18 },
  { ...SERVICES[5], x: 72, y: 61, w: 15, h: 18 },
];

// Portrait cabinet image (mobile): a 2-col x 3-row grid of doors.
const MOBILE_DOORS: Hotspot[] = [
  { ...SERVICES[0], x: 13.5, y: 30, w: 34, h: 18.5 },
  { ...SERVICES[1], x: 51.5, y: 30, w: 34, h: 18.5 },
  { ...SERVICES[2], x: 13.5, y: 50, w: 34, h: 17 },
  { ...SERVICES[3], x: 51.5, y: 50, w: 34, h: 17 },
  { ...SERVICES[4], x: 13.5, y: 68.5, w: 34, h: 18 },
  { ...SERVICES[5], x: 51.5, y: 68.5, w: 34, h: 18 },
];

function Copy() {
  return (
    <>
      <p className="mb-4 font-sans text-[clamp(10px,0.9vw,12px)] uppercase tracking-[0.24em] text-house-gold-light">
        A British home &amp; garden institution
      </p>
      <h1 className="font-display text-[clamp(52px,7.4vw,128px)] leading-[0.92] text-house-cream">
        That feeling<br />you call <em className="italic">home.</em>
      </h1>
      <p className="mt-5 max-w-[40ch] font-sans text-[clamp(16px,1.5vw,22px)] leading-[1.4] text-house-cream/90">
        Home and garden services, design, insurance and beautiful things for the
        home. All in one place, with people you can trust.
      </p>
    </>
  );
}

export function CabinetHero() {
  return (
    <section aria-label="House of Willow Alexander" className="bg-house-forest">
      {/* Desktop (xl+): wide hall stage — native aspect so the door hotspots align */}
      <div className="relative hidden w-full xl:block" style={{ aspectRatio: "1916 / 821" }}>
        <Image
          src="/home/hero-hall-doors.webp"
          alt="A British hall with the House of Willow Alexander service cupboard: six coloured doors for gardening, cleaning, handyman, windows, removals and design, with a dog resting on the checkerboard floor."
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Left scrim for legible overlay copy */}
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(24,36,28,0.78) 0%, rgba(24,36,28,0.40) 30%, rgba(24,36,28,0) 55%)" }} />

        {/* Door hotspots */}
        <div className="absolute inset-0" aria-label="Choose a service from the cupboard">
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

        {/* Copy + booking bar overlay (left column). Flex column with
            justify-between AND a minimum gap keeps the copy at the top and the
            booking bar at the bottom with clear space between them, so they never
            overlap or crowd each other however short the stage becomes.
            pointer-events-none lets the right-hand door hotspots stay clickable. */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between gap-[clamp(28px,5vh,72px)] px-[clamp(24px,4vw,72px)] py-[clamp(32px,4.5vh,64px)]">
          <div className="pointer-events-auto max-w-[52%]">
            <Copy />
          </div>
          <div className="pointer-events-auto w-[min(760px,52%)]">
            <HeroBookingBar />
            <p className="mt-2 font-sans text-[12px] uppercase tracking-[0.2em] text-house-cream/80">Booked through HoWA</p>
          </div>
        </div>
      </div>

      {/* Below xl: portrait cabinet with tappable doors. Phones stack (cabinet,
          copy, booking bar); tablets (md-xl) place the cabinet and copy side by
          side so the portrait image doesn't float in an empty band, with the
          booking bar full-width beneath (so its fields never squash in a narrow
          column). */}
      <div className="xl:hidden">
        <div className="mx-auto grid max-w-[1120px] items-center gap-x-10 md:grid-cols-2 md:px-8 md:pt-10">
          <div className="relative mx-auto w-full max-w-[480px]" style={{ aspectRatio: "1092 / 1440" }}>
            <Image
              src="/home/hero-cabinet-mobile.webp"
              alt="The House of Willow Alexander service cabinet: six coloured doors for gardening, cleaning, handyman, windows, removals and design."
              fill
              priority
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
            />
            <div className="absolute inset-0" aria-label="Choose a service from the cabinet">
              {MOBILE_DOORS.map((d) => (
                <Link
                  key={d.label}
                  href={d.href}
                  aria-label={d.label}
                  className="absolute rounded-sm transition-colors duration-200 hover:bg-house-gold-light/15 focus-visible:bg-house-gold-light/25"
                  style={{ left: `${d.x}%`, top: `${d.y}%`, width: `${d.w}%`, height: `${d.h}%` }}
                >
                  <span className="sr-only">{d.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="px-6 pt-8 md:p-0">
            <Copy />
          </div>
        </div>

        <div className="mx-auto max-w-[1120px] px-6 pb-9 pt-6 md:px-8 md:pb-10">
          <HeroBookingBar />
          <p className="mt-2 font-sans text-[12px] uppercase tracking-[0.2em] text-house-cream/70">Booked through HoWA</p>
        </div>
      </div>
    </section>
  );
}
