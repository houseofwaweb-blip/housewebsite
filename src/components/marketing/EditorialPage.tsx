import { Eyebrow } from "@/components/primitives/Eyebrow";

/**
 * EditorialPage — shared template for static editorial pages under /the-house,
 * /legal, and anywhere a long-form "one page, one idea" layout is needed.
 *
 * Pass sections as an array; each renders with headline + body + optional pullquote.
 * Body strings may contain line breaks — paragraphs are split on `\n\n`.
 */

export interface EditorialSection {
  heading?: string;
  /** Double-newline-separated paragraphs. */
  body: string;
  /** Optional pull quote rendered after the body. */
  quote?: { text: string; attribution?: string };
}

export interface EditorialPageProps {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  sections: EditorialSection[];
  updatedAt?: string;
}

export function EditorialPage({
  eyebrow,
  title,
  lede,
  sections,
  updatedAt,
}: EditorialPageProps) {
  return (
    <article className="bg-house-cream text-house-brown">
      <header className="px-[5vw] pt-[12vh] pb-10">
        <div className="max-w-[760px] mx-auto">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(40px,5.5vw,72px)] leading-[1.05] tracking-[-0.01em] mt-4">
            {title}
          </h1>
          {lede ? (
            <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[60ch]">
              {lede}
            </p>
          ) : null}
        </div>
      </header>

      <div className="px-[5vw] pb-20">
        <div className="max-w-[720px] mx-auto">
          {sections.map((section, i) => (
            <section key={i} className="mt-12 first:mt-0">
              {section.heading ? (
                <h2 className="font-display font-medium text-[clamp(26px,3vw,36px)] leading-[1.2] mb-5 text-house-brown">
                  {section.heading}
                </h2>
              ) : null}
              {section.body.split("\n\n").map((p, j) => (
                <p
                  key={j}
                  className="font-sans text-[18px] leading-[1.7] text-house-brown/90 mb-4"
                >
                  {p}
                </p>
              ))}
              {section.quote ? (
                <blockquote className="my-10 border-l border-house-gold pl-7">
                  <p className="font-display italic text-[clamp(22px,2.8vw,28px)] leading-[1.4] text-house-brown">
                    &ldquo;{section.quote.text}&rdquo;
                  </p>
                  {section.quote.attribution ? (
                    <cite className="font-sans not-italic text-[11px] tracking-[0.2em] uppercase text-house-stone mt-3 block">
                      {section.quote.attribution}
                    </cite>
                  ) : null}
                </blockquote>
              ) : null}
            </section>
          ))}

          {updatedAt ? (
            <p className="font-sans text-[11px] tracking-[0.18em] uppercase text-house-stone mt-16 pt-6 border-t border-house-brown/10">
              Last updated {updatedAt}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
