import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";

export const metadata = {
  title: "Legal",
  description: "Privacy, terms, and cookie policy for House of Willow Alexander.",
};

const LEGAL_PAGES = [
  { slug: "privacy", title: "Privacy", blurb: "What we collect, why, and how it's handled." },
  { slug: "terms", title: "Terms", blurb: "The rules of using the site, HoWA, and our services." },
  { slug: "cookies", title: "Cookies", blurb: "What we set in your browser and why." },
];

export default function LegalIndex() {
  return (
    <article className="bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-[12vh] pb-14">
        <div className="max-w-[720px] mx-auto">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(36px,5vw,64px)] leading-[1.08] tracking-[-0.01em] mt-4">
            Small print, <em>plainly written</em>.
          </h1>
          <p className="font-sans text-[18px] leading-[1.6] text-house-brown/75 mt-5 max-w-[58ch]">
            These pages are the legal backbone for how the House operates.
            We&apos;ve tried to keep them in plain English. Any question, write
            to us and we&apos;ll translate.
          </p>
        </div>
      </section>

      <section className="px-[5vw] pb-16">
        <div className="max-w-[720px] mx-auto flex flex-col">
          {LEGAL_PAGES.map((p) => (
            <Link
              key={p.slug}
              href={`/legal/${p.slug}`}
              className="group flex items-baseline justify-between gap-6 py-6 border-t border-house-brown/10 last:border-b no-underline"
            >
              <div>
                <h2 className="font-display font-medium text-[24px] leading-[1.2] text-house-brown group-hover:text-house-gold transition-colors duration-[var(--t-slow)] ease-out">
                  {p.title}
                </h2>
                <p className="font-sans italic text-[15px] leading-[1.5] text-house-stone mt-1">
                  {p.blurb}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="font-sans text-[11px] tracking-[0.2em] uppercase text-house-gold transition-all duration-[var(--t-slow)] ease-out group-hover:translate-x-2"
              >
                Read →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
