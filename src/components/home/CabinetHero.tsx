import Image from "next/image";
import Link from "next/link";
import styles from "./CabinetHero.module.css";

/**
 * CabinetHero — Aug-17 rebuild spec §2 (L526–557), matched to the approved
 * "amended homepage hero" mockup (blank centre panel for the plaque).
 *
 * Desktop: the cabinet art fills a contained stage (max-width, cream margins);
 * a real HTML plaque is absolutely centred on the baked cream panel, and each
 * compartment is an accessible hotspot link.
 *
 * Mobile (spec L416–424, L1357): no overlay on a squeezed cabinet. The image
 * shows a 4:5 crop and the plaque drops BELOW it as a real cream block; the
 * booking rail underneath carries the service links (so nav never depends on
 * hotspots, which are hidden on mobile).
 *
 * Hotspot rectangles are % of the frame, best-effort over the baked labels.
 */

type Hotspot = { label: string; href: string; x: number; y: number; w: number; h: number };

// Temp hrefs: disciplines without a route yet (housekeeping, home & garden)
// point at /services until Phase 1c adds them.
const HOTSPOTS: Hotspot[] = [
  { label: "Housekeeping", href: "/services/housekeeping", x: 23, y: 10, w: 9, h: 18 },
  { label: "Gardeners", href: "/services/gardening", x: 23, y: 33, w: 9, h: 21 },
  { label: "Dog walking & pet care", href: "/services/pet-care", x: 23, y: 61, w: 9, h: 20 },
  { label: "Insurance & cover", href: "/insurance", x: 41, y: 11, w: 12, h: 22 },
  { label: "Removals", href: "/services/removals", x: 55, y: 10, w: 10, h: 19 },
  { label: "Cleaners", href: "/services/cleaning", x: 76, y: 11, w: 10, h: 19 },
  { label: "Repairs & handyman", href: "/services/handyman", x: 66, y: 40, w: 8, h: 17 },
  { label: "Dog walking & pet care", href: "/services/pet-care", x: 76, y: 38, w: 10, h: 20 },
  { label: "Electrical & energy", href: "/services/energy", x: 41, y: 66, w: 11, h: 17 },
  { label: "Window cleaners", href: "/services/window-cleaning", x: 53, y: 66, w: 11, h: 17 },
  { label: "Home & garden", href: "/services/home-and-garden", x: 66, y: 58, w: 19, h: 25 },
];

export function CabinetHero() {
  return (
    <section className={styles.hero} aria-label="The House that looks after yours">
      <div className={styles.stage}>
        <div className={styles.frame}>
          <Image
            src="/home/hero-cabinet.webp"
            alt="An antique cabinet in a warm British sitting room. Each coloured compartment is a House discipline: housekeeping, gardeners, cleaners, dog walking, removals, repairs, electrical and energy, window cleaners and home and garden. A dog rests in a red armchair and a cat sits on top."
            fill
            priority
            sizes="(min-width: 1240px) 1180px, 100vw"
            className={styles.img}
          />

          <div className={styles.hotspots} aria-label="Choose a service from the cabinet">
            {HOTSPOTS.map((h, i) => (
              <Link
                key={`${h.label}-${i}`}
                href={h.href}
                aria-label={h.label}
                className={styles.hotspot}
                style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%` }}
              >
                <span className={styles.hotspotLabel}>{h.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.plaque}>
          <p className={styles.eyebrow}>A modern British House for home and garden</p>
          <h1 className={styles.title}>Welcome to the House that looks after yours.</h1>
          <p className={styles.sub}>
            Services, insurance, useful things and good ideas, all kept in order by HoWA.
          </p>
          <div className={styles.ctas}>
            <a
              href="#open-booking-form"
              className={`${styles.cta} ${styles.ctaFilled}`}
              data-ga-event="booking_intent"
              data-ga-cta="Book a service"
            >
              Book a service
            </a>
            <Link href="/the-house" className={`${styles.cta} ${styles.ctaGhost}`}>
              Explore the House
            </Link>
          </div>
          <p className={styles.trust}>House-vetted · clear service information · House support</p>
        </div>
      </div>
    </section>
  );
}
