import Link from "next/link";
import Image from "next/image";
import { CookiePreferencesLink } from "@/components/consent/CookiePreferencesLink";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { PoweredByHowa } from "@/components/marketing/PoweredByHowa";

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

// Footer — doc §6.3 five-column structure. The footer quietly teaches the
// hierarchy: House first, HoWA as the technology line beneath.
const COLS: FooterColumn[] = [
  {
    heading: "Services",
    links: [
      { label: "All services", href: "/services" },
      { label: "Gardeners", href: "/services/gardeners" },
      { label: "Cleaners", href: "/services/cleaners" },
      { label: "Window cleaners", href: "/services/window-cleaners" },
      { label: "Repairs", href: "/services/repairs-handyman" },
      { label: "Home & garden", href: "/services/home-and-garden" },
    ],
  },
  {
    heading: "Insurance & Cover",
    links: [
      { label: "Home cover", href: "/insurance-and-cover/home-cover" },
      { label: "Pet cover", href: "/insurance-and-cover/pet-cover" },
      { label: "Home & pet cover", href: "/insurance-and-cover/home-and-pet-cover" },
      { label: "Get a quote", href: "/insurance-and-cover/quote" },
      { label: "Claims & help", href: "/insurance-and-cover/help-and-claims" },
    ],
  },
  {
    heading: "Shop · Magazine · Offers",
    links: [
      { label: "The House Store", href: "/shop" },
      { label: "The Hearth magazine", href: "/magazine" },
      { label: "House Offers", href: "/offers" },
      { label: "Gift cards", href: "/gift-cards" },
    ],
  },
  {
    heading: "Help & account",
    links: [
      { label: "Help centre", href: "/help" },
      { label: "Contact", href: "/contact" },
      { label: "My House", href: "/my-house" },
      { label: "How it works", href: "/how-it-works" },
    ],
  },
  {
    heading: "The House",
    links: [
      { label: "About the House", href: "/the-house/about" },
      { label: "Philosophy", href: "/the-house/philosophy" },
      { label: "Standards", href: "/the-house/standards" },
      { label: "House Approved Pro", href: "/house-approved-pro" },
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
    <footer className="relative overflow-hidden bg-house-brown text-house-cream px-[5vw] py-16 mt-auto">
      <FlowerWatermark color="gold" side="left" opacity={0.16} />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <p className="font-display italic text-[clamp(24px,3vw,38px)] leading-[1.15] text-house-cream/90 pb-12 max-w-[22ch]">
          Welcome to the House that looks after yours.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 pb-12 border-b border-[rgba(245,240,232,0.12)]">
          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-light mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link, i) => (
                  <li key={`${link.href}-${i}`}>
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

        <p className="pt-8 font-sans text-[16px] leading-[1.6] text-house-cream/80 max-w-[720px]">
          House of Willow Alexander, for the care, protection and enjoyment of home and garden.
        </p>
        <p className="pt-2 font-sans text-[14px] leading-[1.6] text-house-cream/55 max-w-[720px]">
          Booking and home intelligence powered by HoWA. Insurance is arranged by Provenance,
          which is authorised and regulated by the Financial Conduct Authority.
        </p>
        <div className="pt-4">
          <PoweredByHowa size="compact" href="/how-it-works" dark />
        </div>

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
