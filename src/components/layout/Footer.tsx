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
// Directive v2 STEP 04 — six columns, Household-led.
const COLS: FooterColumn[] = [
  {
    heading: "The House",
    links: [
      { label: "About", href: "/the-house/about" },
      { label: "Origin", href: "/the-house/about#origin" },
      { label: "Philosophy", href: "/the-house/philosophy" },
      { label: "Standards", href: "/the-house/standards" },
      { label: "House Approved", href: "/house-approved" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "The Household",
    links: [
      { label: "The Housekeeper", href: "/household/housekeeper" },
      { label: "The Steward", href: "/household/steward" },
      { label: "The Butler", href: "/household/butler" },
      { label: "The Gardener", href: "/household/gardener" },
      { label: "The Handyman", href: "/household/handyman" },
      { label: "The Designer", href: "/household/designer" },
      { label: "The Surveyor", href: "/household/surveyor" },
      { label: "The Archivist", href: "/household/archivist" },
      { label: "The Storekeeper", href: "/shop" },
      { label: "The Host", href: "/host" },
    ],
  },
  {
    heading: "The Stores and The Host",
    links: [
      { label: "Shop all rooms", href: "/shop" },
      { label: "House Approved collection", href: "/shop/collections/house-approved" },
      { label: "Gift cards", href: "/gift-cards" },
      { label: "The Hearth", href: "/the-hearth" },
      { label: "Recipes", href: "/recipes" },
      { label: "House news", href: "/news" },
    ],
  },
  {
    heading: "HoWA",
    links: [
      { label: "Start with my address", href: "/howa" },
      { label: "HoWA Score", href: "/howa-score" },
      { label: "Home Record", href: "/howa" },
      { label: "Housekeeper", href: "/household/housekeeper" },
      { label: "Steward", href: "/household/steward" },
      { label: "Help", href: "/howa/faq" },
    ],
  },
  {
    heading: "Professionals",
    links: [
      { label: "Apply for Approval", href: "/become-a-house-pro" },
      { label: "Partner with the House", href: "/become-a-house-pro" },
      { label: "Sign in to House Pro", href: "/become-a-house-pro" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Consumer terms", href: "/legal/terms" },
      { label: "Partner terms", href: "/legal/terms" },
      { label: "Cookies", href: "/legal/cookies" },
      { label: "Accessibility", href: "/legal" },
    ],
  },
];

export interface FooterProps {
  columns?: FooterColumn[];
  tagline?: string;
}

export function Footer({ columns, tagline }: FooterProps) {
  const cols = columns && columns.length > 0 ? columns : COLS;
  const tag = tagline || "The House sets the standard. The Household makes each need familiar. HoWA understands and remembers the home.";

  return (
    <footer className="relative overflow-hidden bg-house-brown text-house-cream px-[5vw] py-16 mt-auto">
      <FlowerWatermark color="white" side="left" opacity={0.13} />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <p className="font-display italic text-[clamp(24px,3vw,38px)] leading-[1.15] text-house-cream/90 pb-12 max-w-[18ch]">
          The home, finally known.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 pb-12 border-b border-[rgba(245,240,232,0.12)]">
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

        {/* Directive v2 STEP 04 — PUBLISH-READY COPY, verbatim. */}
        <p className="pt-8 font-display italic text-[19px] leading-[1.5] text-house-gold-light max-w-[760px]">
          The House does the work. HoWA remembers it.
        </p>
        <p className="pt-4 font-sans text-[15px] leading-[1.6] text-house-cream/55 max-w-[760px]">
          House of HoWA is a trading surface of HoWA Living Ltd. Physical services
          are supplied by the named service company or independent provider shown
          before confirmation.
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
