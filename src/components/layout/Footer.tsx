import Link from "next/link";
import Image from "next/image";
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

// Footer architecture (REVISIONS v3 §12): the footer must carry Services, Home
// Insurance, Pet Insurance, HoWA and Our House, and must NOT carry obsolete
// plan links. v3 §9 removes maintenance plans, ongoing plans, House maintenance
// memberships and Steward or Housekeeper service plans from this site, so
// nothing may link to /steward-plans or the HoWA tier pages from here.
// Forbidden language (§11): "Book through HoWA", "House Approved products",
// "House Approved Insurance", "HoWA Store", "Marketplace".
const COLS: FooterColumn[] = [
  {
    heading: "The House",
    links: [
      { label: "About the House", href: "/the-house/about" },
      { label: "Philosophy", href: "/the-house/philosophy" },
      // v4 §6 — customer-facing provider transparency.
      { label: "How we choose our people", href: "/the-house/how-we-choose" },
      { label: "Standards", href: "/the-house/standards" },
      { label: "Sustainability", href: "/the-house/sustainability" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Services & Design",
    links: [
      { label: "All services", href: "/services" },
      { label: "Gardening", href: "/services/gardening" },
      { label: "Cleaning", href: "/services/cleaning" },
      { label: "Window cleaning", href: "/services/window-cleaning" },
      { label: "Garden Design", href: "/design/gardens" },
      { label: "Home & Interior Design", href: "/design/interiors" },
    ],
  },
  {
    heading: "Protect",
    links: [
      { label: "Insurance introductions", href: "/insurance" },
      { label: "Home Insurance", href: "/insurance/private-client" },
      { label: "Pet Insurance", href: "/insurance/everyday/pet-and-travel" },
      { label: "Boiler Cover", href: "/insurance/boiler-cover" },
      { label: "Appliance Cover", href: "/insurance/appliance-cover" },
      { label: "Home Protection Review", href: "/insurance/home-protection" },
    ],
  },
  {
    heading: "Shop",
    links: [
      { label: "Shop All", href: "/shop" },
      { label: "Collections", href: "/shop/collections" },
      { label: "The House Selection", href: "/shop/collections/house-approved" },
      { label: "Gift Cards", href: "/gift-cards" },
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
  const tag = tagline || "The British home, cared for.";

  return (
    <footer className="relative overflow-hidden bg-house-brown text-house-cream px-[5vw] py-16 mt-auto">
      <FlowerWatermark color="white" side="left" opacity={0.13} />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <p className="font-display italic text-[clamp(24px,3vw,38px)] leading-[1.15] text-house-cream/90 pb-12 max-w-[18ch]">
          That Feeling You Call Home.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 pb-12 border-b border-[rgba(245,240,232,0.12)]">
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
          Home and garden work is delivered by the Willow Alexander service
          businesses across London and Kent. Book with each business directly, or
          online through HoWA.
        </p>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <Link href="/" aria-label="House of Willow Alexander, home">
            <Image
              src="/brand/wordmark-white.svg"
              alt="House of Willow Alexander"
              width={296}
              height={125}
              className="h-[48px] w-auto opacity-90"
            />
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
