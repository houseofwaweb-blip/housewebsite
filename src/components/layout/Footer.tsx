import Link from "next/link";
import Image from "next/image";
import { CookiePreferencesLink } from "@/components/consent/CookiePreferencesLink";

/**
 * Global footer — designed to the further-amendments mockup (brief §14): a
 * single light band with the wordmark + brand line + socials on the left, seven
 * nav columns (Services / Design / Insurance / Shop / The House / The Hearth /
 * Help), a "for homes that do good" script accent, and the legal bar below.
 *
 * Column labels/order are from the brief; hrefs point at the best-resolving
 * routes (some brief items, e.g. Careers, have no page yet and are omitted).
 * Social row currently has Instagram only (the live site's confirmed handle);
 * Pinterest/Facebook/YouTube URLs to be added when supplied.
 */

export interface FooterColumn {
  heading: string;
  links: Array<{ label: string; href: string }>;
}

const COLS: FooterColumn[] = [
  {
    heading: "Services",
    links: [
      { label: "Gardening", href: "/services/gardening" },
      { label: "Cleaning", href: "/services/cleaning" },
      { label: "Window & exterior cleaning", href: "/services/window-cleaning" },
      { label: "Handyman", href: "/services/handyman" },
      { label: "Regular care", href: "/services#plans" },
    ],
  },
  {
    heading: "Design",
    links: [
      { label: "Garden Design", href: "/design/gardens" },
      { label: "Home Design", href: "/design/interiors" },
      { label: "Consultations", href: "/design/consultation" },
    ],
  },
  {
    heading: "Insurance",
    links: [
      { label: "Home Insurance", href: "/insurance" },
      { label: "Make a Claim", href: "/insurance/claims-and-help" },
      { label: "Existing Customers", href: "/insurance/claims-and-help" },
    ],
  },
  {
    heading: "Shop",
    links: [
      { label: "New", href: "/shop/all" },
      { label: "Home", href: "/shop" },
      { label: "Garden", href: "/shop" },
      { label: "Gifts", href: "/gift-cards" },
    ],
  },
  {
    heading: "The House",
    links: [
      { label: "About", href: "/the-house/about" },
      { label: "Sustainability", href: "/the-house/sustainability" },
      { label: "The unOrdinary", href: "/cinema" },
    ],
  },
  {
    heading: "The Hearth",
    links: [
      { label: "Homes", href: "/the-hearth/category/interiors-and-styling" },
      { label: "Gardens", href: "/the-hearth/category/gardens-and-exteriors" },
      { label: "Design", href: "/the-hearth/category/design-and-architecture" },
      { label: "Living", href: "/the-hearth/category/heritage-and-culture" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "FAQs", href: "/help" },
      { label: "My HoWA", href: "/my-house" },
      { label: "Track a Booking", href: "/my-house" },
    ],
  },
];

export interface FooterProps {
  columns?: FooterColumn[];
  tagline?: string;
}

export function Footer({ columns, tagline }: FooterProps) {
  const cols = columns && columns.length > 0 ? columns : COLS;
  const tag = tagline || "That feeling you call home.";
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-house-brown/12 bg-house-cream-light text-house-brown">
      <div className="mx-auto max-w-[1760px] px-[5vw] py-[clamp(40px,5vw,72px)]">
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-[1fr_2.7fr]">
          {/* Brand block */}
          <div>
            <Link href="/" aria-label="House of Willow Alexander, home" className="inline-block">
              <Image src="/brand/wordmark.svg" alt="House of Willow Alexander" width={296} height={125} className="h-[52px] w-auto" />
            </Link>
            <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.22em] text-house-gold-dark">
              Homes &middot; Gardens &middot; A brighter tomorrow
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href="https://www.instagram.com/world_of_willowalexander/" target="_blank" rel="noopener noreferrer" aria-label="House of Willow Alexander on Instagram" className="is-round flex h-9 w-9 items-center justify-center rounded-full border border-house-brown/25 text-house-brown transition-colors hover:border-house-brown hover:text-house-gold-ink">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="https://www.facebook.com/HouseOfWillowAlexander" target="_blank" rel="noopener noreferrer" aria-label="House of Willow Alexander on Facebook" className="is-round flex h-9 w-9 items-center justify-center rounded-full border border-house-brown/25 text-house-brown transition-colors hover:border-house-brown hover:text-house-gold-ink">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M14 8.5V7c0-.8.2-1.2 1.3-1.2H17V3h-2.5C11.9 3 11 4.4 11 6.6v1.9H9V11h2v10h3V11h2.2l.3-2.5H14Z"/></svg>
              </a>
              <a href="https://www.youtube.com/@HouseOfWillowAlexander" target="_blank" rel="noopener noreferrer" aria-label="House of Willow Alexander on YouTube" className="is-round flex h-9 w-9 items-center justify-center rounded-full border border-house-brown/25 text-house-brown transition-colors hover:border-house-brown hover:text-house-gold-ink">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5 3-5 3Z"/></svg>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {cols.map((col) => (
              <div key={col.heading}>
                <h4 className="mb-4 font-sans text-[12px] tracking-[0.2em] uppercase text-house-gold-dark">
                  {col.heading}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link, i) => (
                    <li key={`${link.href}-${i}`}>
                      <Link
                        href={link.href}
                        className="font-sans text-[15px] leading-snug text-house-brown/80 no-underline transition-colors duration-[var(--t-base)] hover:text-house-gold-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Script accent */}
        <p className="font-script mt-10 text-right text-[clamp(28px,2.6vw,44px)] leading-none text-house-gold-dark">
          For homes that do good.
        </p>

        {/* Disclosure */}
        <p className="mt-8 max-w-[80ch] font-sans text-[12.5px] leading-[1.6] text-house-stone">
          Booking and home intelligence powered by HoWA. Insurance is arranged by Provenance, which is authorised and regulated by the Financial Conduct Authority.
        </p>

        {/* Legal bar */}
        <div className="mt-6 flex flex-col gap-4 border-t border-house-brown/12 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-[13.5px] text-house-stone">
            &copy; {year} House of Willow Alexander. {tag}
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-[13.5px] text-house-brown/70">
            <Link href="/legal/privacy" className="no-underline hover:text-house-brown transition-colors">Privacy</Link>
            <Link href="/legal/terms" className="no-underline hover:text-house-brown transition-colors">Terms</Link>
            <Link href="/legal/cookies" className="no-underline hover:text-house-brown transition-colors">Cookies</Link>
            <CookiePreferencesLink />
          </nav>
        </div>
      </div>
    </footer>
  );
}
