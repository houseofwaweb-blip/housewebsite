import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";

export const metadata = {
  title: "Design · Gardens",
  description:
    "Planting plans and landscape work, rooted in the character of the garden you already have.",
};

export default function GardensPage() {
  return (
    <article className="bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-[12vh] pb-14">
        <div className="max-w-[880px] mx-auto">
          <Eyebrow>Design · Gardens</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,76px)] leading-[1.05] tracking-[-0.01em] mt-4">
            A garden, <em>heard</em>.
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[60ch]">
            Led by Willow Alexander Gardens. Planting plans, landscape work,
            and the seasonal maintenance that keeps the finished thing
            looking like it&apos;s always been there.
          </p>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <Link
              href="/book-consultation?service=design-gardens"
              className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold px-6 py-3.5 no-underline transition-colors duration-[var(--t-slow)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
            >
              Start a consultation
            </Link>
            <GhostLink href="/partners/willow-alexander-gardens">
              See Willow Alexander Gardens
            </GhostLink>
          </div>
        </div>
      </section>

      <section className="px-[5vw] py-16 bg-white border-t border-house-brown/10">
        <div className="max-w-[1080px] mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2 className="font-display font-medium text-[28px] leading-[1.2] mt-3 mb-6">
              Three ways in.
            </h2>
            <ul className="flex flex-col gap-3">
              {[
                "Full landscape design — hard and soft, from concept to planted beds.",
                "Planting-only schemes — keep your existing structure, replant it properly.",
                "Seasonal planting refresh — annual reviews for mature gardens.",
              ].map((line) => (
                <li
                  key={line}
                  className="relative pl-5 font-sans text-[16px] leading-[1.55] text-house-brown/90 before:content-['—'] before:absolute before:left-0 before:text-house-gold"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>And then</Eyebrow>
            <h2 className="font-display font-medium text-[28px] leading-[1.2] mt-3 mb-6">
              The garden is maintained.
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone mb-4">
              Every design commission can roll into seasonal gardening care —
              the same team, scheduled through HoWA, coordinated with the
              other trades. A planted garden wants continuity.
            </p>
            <GhostLink href="/services/gardening">See gardening services</GhostLink>
          </div>
        </div>
      </section>
    </article>
  );
}
