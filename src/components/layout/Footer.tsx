import Link from "next/link";
import { CookiePreferencesLink } from "@/components/consent/CookiePreferencesLink";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";

/**
 * Global footer.
 * Spec: DESIGN.md Part C · "<Footer />"
 * Carries: wordmark, nav links, contact, legal, tagline.
 *
 * Link columns can be overridden from Sanity via the `columns` prop.
 * Falls back to the hardcoded COLS when no Sanity data is passed.
 */

export interface FooterColumn {
  heading: string;
  links: Array<{ label: string; href: string }>;
}

// Footer architecture (v5 HoWA-separation review, 2026-06-18): the footer
// quietly teaches the hierarchy — House -> Services/Protection/Marketplace ->
// Bookings powered by HoWA -> Reading.
// Footer architecture (House of HoWA rebrand, launch read section 35): leads
// with HoWA, then the House (standard), Services (proof), Reading, Account.
const COLS: FooterColumn[] = [
  {
    heading: "HoWA",
    links: [
      { label: "Start with your address", href: "/howa/assistant" },
      { label: "HoWA Score", href: "/howa-score" },
      { label: "Home Record", href: "/howa" },
      { label: "The Household", href: "/household" },
      { label: "Assistant", href: "/howa/assistant" },
      { label: "Housekeeper", href: "/howa/housekeeper" },
      { label: "Steward", href: "/howa/steward" },
      { label: "Plans", href: "/howa/plans" },
    ],
  },
  {
    heading: "The House",
    links: [
      { label: "About House of HoWA", href: "/the-house/about" },
      { label: "Philosophy", href: "/the-house/philosophy" },
      { label: "Artwork", href: "/the-house/artwork" },
      { label: "Standards", href: "/the-house/standards" },
      { label: "Sustainability", href: "/the-house/sustainability" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Gardening", href: "/services/gardening" },
      { label: "Cleaning", href: "/services/cleaning" },
      { label: "Window cleaning", href: "/services/window-cleaning" },
      { label: "Gutter cleaning", href: "/services/gutter-cleaning" },
      { label: "Handyman", href: "/services/handyman" },
      { label: "Design", href: "/design" },
      { label: "Protect", href: "/protect" },
    ],
  },
  {
    heading: "Reading",
    links: [
      { label: "The Hearth", href: "/the-hearth" },
      { label: "Musings", href: "/musings" },
      { label: "Recipes", href: "/recipes" },
      { label: "News", href: "/news" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Sign in", href: "https://accounts.willowalexander.co.uk/" },
      { label: "Book through HoWA", href: "#open-booking-form" },
      { label: "Marketplace", href: "/shop" },
    ],
  },
];

export interface FooterProps {
  columns?: FooterColumn[];
  tagline?: string;
}

export function Footer({ columns, tagline }: FooterProps) {
  const cols = columns && columns.length > 0 ? columns : COLS;
  const tag = tagline || "The House sets the standard. HoWA remembers the home.";

  return (
    <footer className="relative overflow-hidden bg-house-brown text-house-cream px-[5vw] py-16 mt-auto">
      <FlowerWatermark color="white" side="left" opacity={0.13} />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <p className="font-display italic text-[clamp(24px,3vw,38px)] leading-[1.15] text-house-cream/90 pb-12 max-w-[18ch]">
          The home, finally known.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 pb-12 border-b border-[rgba(245,240,232,0.12)]">
          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-light mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-[16px] text-house-cream no-underline opacity-85 hover:opacity-100 transition-opacity duration-[var(--t-base)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="pt-8 font-sans text-[15px] leading-[1.6] text-house-cream/55 max-w-[760px]">
          House of HoWA is a new House for home stewardship: trusted services,
          approved partners and the HoWA Home Operating System that gives every
          home a record, a Score and a next action. The House sets the standard.
          HoWA remembers the home. Founding partners and House Approved providers
          deliver the work.
        </p>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <Link href="/" aria-label="House of HoWA, home" className="no-underline">
            <span className="font-display text-[28px] leading-none text-house-cream opacity-95">
              House of HoWA
            </span>
          </Link>
          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-[14px] text-house-cream/70"
          >
            <Link href="/legal/privacy" className="no-underline hover:text-house-cream transition-colors">
              Privacy
            </Link>
            <Link href="/legal/terms" className="no-underline hover:text-house-cream transition-colors">
              Terms
            </Link>
            <Link href="/legal/cookies" className="no-underline hover:text-house-cream transition-colors">
              Cookie policy
            </Link>
            <CookiePreferencesLink />
          </nav>
        </div>

        <p className="pt-6 font-sans italic text-[15px] text-house-cream/60 text-center md:text-right">
          {tag}
        </p>
      </div>
    </footer>
  );
}
