import Link from "next/link";
import Image from "next/image";

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

const COLS: FooterColumn[] = [
  {
    heading: "The House",
    links: [
      { label: "Philosophy", href: "/the-house/philosophy" },
      { label: "Standards", href: "/the-house/standards" },
      { label: "Proof", href: "/the-house/proof" },
      { label: "Sustainability", href: "/the-house/sustainability" },
      { label: "About", href: "/the-house/about" },
    ],
  },
  {
    heading: "HoWA",
    links: [
      { label: "Overview", href: "/howa" },
      { label: "Companion", href: "/howa/companion" },
      { label: "Plans & Pricing", href: "/howa/plans" },
      { label: "FAQ", href: "/howa/faq" },
    ],
  },
  {
    heading: "Commerce",
    links: [
      { label: "Design", href: "/design" },
      { label: "Services", href: "/services" },
      { label: "Protect", href: "/protect" },
      { label: "Shop", href: "/shop" },
    ],
  },
  {
    heading: "Reading",
    links: [
      { label: "The Hearth", href: "/journal" },
      { label: "Musings", href: "/musings" },
      { label: "News", href: "/news" },
    ],
  },
  {
    heading: "House",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Book consultation", href: "/book-consultation" },
      { label: "Partners", href: "/partners" },
      { label: "Legal", href: "/legal" },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 pb-12 border-b border-[rgba(245,240,232,0.12)]">
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
          <div className="font-sans italic text-[14px] text-house-cream/70">
            {tag}
          </div>
        </div>
      </div>
    </footer>
  );
}
