import Link from "next/link";
import Image from "next/image";
import { CookiePreferencesLink } from "@/components/consent/CookiePreferencesLink";

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
const COLS: FooterColumn[] = [
  {
    heading: "The House",
    links: [
      { label: "Philosophy", href: "/the-house/philosophy" },
      { label: "Standards", href: "/the-house/standards" },
      { label: "Sustainability", href: "/the-house/sustainability" },
      { label: "About", href: "/the-house/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Gardening", href: "/services/gardening" },
      { label: "Cleaning", href: "/services/cleaning" },
      { label: "Window Cleaning", href: "/services/window-cleaning" },
      { label: "Gutter Cleaning", href: "/services/gutter-cleaning" },
      { label: "Design", href: "/design" },
      { label: "Housekeeping", href: "/services/housekeeping" },
    ],
  },
  {
    heading: "Protection",
    links: [
      { label: "Protect Review", href: "/protect/home-protection" },
      { label: "Evidence Pack", href: "/protect" },
      { label: "Insurance Readiness", href: "/protect/insurance" },
      { label: "Register Interest", href: "/protect/insurance" },
    ],
  },
  {
    heading: "Marketplace",
    links: [
      { label: "Shop All", href: "/shop" },
      { label: "Collections", href: "/shop/collections" },
      { label: "House Approved", href: "/shop/collections/house-approved" },
      { label: "Gift Cards", href: "/gift-cards" },
    ],
  },
  {
    heading: "Bookings & Account",
    links: [
      { label: "Book online through HoWA", href: "#open-booking-form" },
      { label: "Sign in to HoWA", href: "https://accounts.willowalexander.co.uk/" },
      { label: "Home Record", href: "/howa" },
      { label: "Housekeeper", href: "/howa/housekeeper" },
      { label: "Steward", href: "/howa/steward" },
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
];

export interface FooterProps {
  columns?: FooterColumn[];
  tagline?: string;
}

export function Footer({ columns, tagline }: FooterProps) {
  const cols = columns && columns.length > 0 ? columns : COLS;
  const tag = tagline || "Ownership is passive. Stewardship is intentional.";

  return (
    <footer className="bg-house-brown text-house-cream px-[5vw] py-16 mt-auto">
      <div className="max-w-[1280px] mx-auto">
        <p className="font-display italic text-[clamp(24px,3vw,38px)] leading-[1.15] text-house-cream/90 pb-12 max-w-[18ch]">
          That Feeling You Call Home.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 pb-12 border-b border-[rgba(245,240,232,0.12)]">
          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className="font-sans text-[10px] tracking-[0.24em] uppercase text-house-gold-light mb-4">
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

        <p className="pt-8 font-sans text-[12px] leading-[1.6] text-house-cream/55 max-w-[760px]">
          House services are delivered by House of Willow Alexander and approved
          partners. Online bookings and Home Records are powered by HoWA.
        </p>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Link href="/" aria-label="House of Willow Alexander, home">
            <Image
              src="/brand/wordmark-white.svg"
              alt="House of Willow Alexander"
              width={296}
              height={125}
              className="h-[48px] w-auto opacity-90"
            />
          </Link>
          <div className="flex items-center gap-6">
            <CookiePreferencesLink />
            <div className="font-sans italic text-[14px] text-house-cream/70">
              {tag}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
