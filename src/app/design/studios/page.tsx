import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";
import { StateBadge } from "@/components/primitives/StateBadge";

/**
 * /design/studios — the curated partner collective.
 *
 * A deeper editorial layer beneath /design. Where /design lists the four
 * studios as cards, this page explains: who the collective is, how the
 * House selects studios, what the House Approved seal means in design,
 * and how to start a commission via the HoWA Companion.
 */
export const metadata = {
  title: "The Studios",
  description:
    "The studios and designers the House works with. How we select, what House Approved means in design, and how to commission a project.",
};

const STUDIOS = [
  {
    slug: "delve-interiors",
    name: "Delve Interiors",
    typeLabel: "Interiors studio",
    location: "London & South East",
    blurb:
      "Considered schemes, quiet palettes, careful detailing. Listed homes, period flats, contemporary pieds-à-terre.",
    signatures: ["Listed-property specialist", "Period detailing", "Quiet colour"],
  },
  {
    slug: "jessica-durling-mcmahon",
    name: "Jessica Durling-McMahon",
    typeLabel: "Interior designer",
    location: "London & Cotswolds",
    blurb:
      "Layered rooms with confident colour, antiques properly used, and a deep love of textile and pattern.",
    signatures: ["Confident colour", "Antiques placement", "Textile-led"],
  },
  {
    slug: "willow-alexander-gardens",
    name: "Willow Alexander Gardens",
    typeLabel: "Garden design",
    location: "UK-wide",
    blurb:
      "Planting schemes and landscapes rooted in the garden's existing character. Ecological, seasonal, edible.",
    signatures: ["Planting-led", "Ecological", "Heritage gardens"],
  },
  {
    slug: "house-ai",
    name: "House AI",
    typeLabel: "Specialist partner",
    location: "UK-wide",
    blurb:
      "Automation, lighting schemes, and quiet technology that disappears into the architecture rather than dominating it.",
    signatures: ["Lighting design", "Automation", "Quiet technology"],
  },
];

const SELECTION_TESTS = [
  {
    title: "Living-home test",
    body: "Their work survives the kind of use a real family puts a home through. Not a show home. A lived-in one — with dogs, children, dinner parties, weekends.",
  },
  {
    title: "Person test",
    body: "We have met them, visited their studio, and would put a friend in their hands. Every studio carries individual responsibility, not a faceless agency front.",
  },
  {
    title: "Care test",
    body: "Every project comes with care notes — what was specified, where it came from, how to look after it, who to call when something needs attention. The record stays with the home.",
  },
];

const COMMISSION_STEPS = [
  {
    n: "01.",
    name: "Begin with a conversation",
    body: "The HoWA Companion asks the right questions to understand your home, your priorities, and what feels right. About two minutes.",
  },
  {
    n: "02.",
    name: "Matched, not assigned",
    body: "We propose two or three studios from the collective who fit the project. You pick. The Companion creates the design brief on your home record.",
  },
  {
    n: "03.",
    name: "Commission",
    body: "Project lives in HoWA throughout — drawings, mood boards, decisions, samples, costs, supplier records. You stay in the loop without managing it.",
  },
  {
    n: "04.",
    name: "Looked after",
    body: "When the project completes, every choice stays in the record. So in five years' time when a sofa needs reupholstering, we know the fabric, who supplied it, and who can remake it.",
  },
];

export default function DesignStudiosPage() {
  return (
    <article className="bg-house-cream text-house-brown">
      {/* ============================================================
          1. Hero
          ============================================================ */}
      <section className="px-[5vw] pt-[12vh] pb-20 border-b border-house-brown/10">
        <div className="max-w-[1080px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Eyebrow>The Studios</Eyebrow>
            <StateBadge state="live">Four at launch</StateBadge>
          </div>
          <h1 className="em-accent font-display font-medium text-[clamp(48px,6.4vw,88px)] leading-[1.02] tracking-[-0.012em] mt-2 max-w-[18ch]">
            A small collective of <em>studios</em>, properly chosen.
          </h1>
          <p className="font-display italic text-[clamp(20px,2vw,26px)] leading-[1.45] text-house-brown/80 mt-8 max-w-[44ch]">
            Every studio working under the House Approved seal has been
            visited, interviewed, and put in front of a real project.
          </p>
          <p className="font-sans text-[16px] leading-[1.7] text-house-brown/72 mt-7 max-w-[58ch]">
            The collective starts small on purpose. We would rather work with four studios
            we trust than forty we don&apos;t. The list grows when, and only when, we find
            the next person we&apos;d quietly recommend to a friend.
          </p>
        </div>
      </section>

      {/* ============================================================
          2. Studios — editorial cards
          ============================================================ */}
      <section className="px-[5vw] py-24 md:py-28 bg-white border-b border-house-brown/10">
        <div className="max-w-[1280px] mx-auto">
          <header className="text-center max-w-[640px] mx-auto mb-16">
            <Eyebrow>The collective at launch</Eyebrow>
            <h2 className="em-accent font-display font-medium text-[clamp(32px,3.6vw,48px)] leading-[1.1] tracking-[-0.005em] mt-5">
              Four studios. <em>Four ways</em> to begin.
            </h2>
          </header>

          <div className="grid md:grid-cols-2 gap-px bg-house-brown/10">
            {STUDIOS.map((studio) => (
              <article key={studio.slug} className="bg-house-cream p-10 lg:p-14">
                <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-house-gold-dark mb-3">
                  {studio.typeLabel} · {studio.location}
                </p>
                <h3 className="em-accent font-display font-medium text-[clamp(28px,2.8vw,38px)] leading-[1.1] mb-5">
                  {studio.name}
                </h3>
                <p className="font-sans text-[16px] leading-[1.65] text-house-brown/78 mb-6">
                  {studio.blurb}
                </p>
                <ul className="flex flex-col gap-2 mb-7 border-t border-house-brown/12 pt-5">
                  {studio.signatures.map((s) => (
                    <li
                      key={s}
                      className="relative pl-5 font-sans text-[13px] leading-[1.55] text-house-brown/72 before:content-['—'] before:absolute before:left-0 before:text-house-gold"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/partners/${studio.slug}`}
                  className="inline-block font-sans text-[12px] tracking-[0.22em] uppercase text-house-brown border border-house-brown px-6 py-3 no-underline transition-all duration-200 ease-out hover:bg-house-brown hover:text-house-cream"
                >
                  See the work
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          3. Selection — three tests
          ============================================================ */}
      <section className="px-[5vw] py-24 md:py-28 border-b border-house-brown/10">
        <div className="max-w-[1080px] mx-auto">
          <header className="max-w-[640px] mb-14">
            <Eyebrow>What House Approved means in design</Eyebrow>
            <h2 className="em-accent font-display font-medium text-[clamp(32px,3.6vw,48px)] leading-[1.1] tracking-[-0.005em] mt-5">
              Three tests, every <em>time.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.7] text-house-brown/72 mt-6">
              The House Approved seal isn&apos;t bestowed once and forgotten. Every studio
              is reviewed annually against the same three tests. If any test fails for two
              consecutive cycles, the studio leaves the collective.
            </p>
          </header>
          <div className="grid md:grid-cols-3 gap-px bg-house-brown/10">
            {SELECTION_TESTS.map((t, i) => (
              <article key={t.title} className="bg-house-cream p-10">
                <p className="font-display italic text-[14px] text-house-gold-dark mb-3">
                  {`Test ${["I", "II", "III"][i]}.`}
                </p>
                <h3 className="font-sans font-medium text-[12px] tracking-[0.28em] uppercase text-house-brown mb-4">
                  {t.title}
                </h3>
                <p className="font-sans text-[14px] leading-[1.65] text-house-brown/78">
                  {t.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          4. How to commission — 4-step process
          ============================================================ */}
      <section className="px-[5vw] py-24 md:py-28 bg-white border-b border-house-brown/10">
        <div className="max-w-[1080px] mx-auto">
          <header className="max-w-[640px] mb-14">
            <Eyebrow>How to commission</Eyebrow>
            <h2 className="em-accent font-display font-medium text-[clamp(32px,3.6vw,48px)] leading-[1.1] tracking-[-0.005em] mt-5">
              From a brief to a <em>finished room.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.7] text-house-brown/72 mt-6">
              You don&apos;t pick a studio cold. The Companion learns enough to put two
              or three in front of you that fit, and the design brief lives on your home
              record from day one.
            </p>
          </header>
          <ol className="grid md:grid-cols-2 gap-px bg-house-brown/10">
            {COMMISSION_STEPS.map((step) => (
              <li key={step.n} className="bg-house-cream p-10 lg:p-12 list-none">
                <p className="font-display italic text-[14px] text-house-gold-dark mb-3">
                  {step.n}
                </p>
                <h3 className="font-sans font-medium text-[12px] tracking-[0.28em] uppercase text-house-brown mb-4">
                  {step.name}
                </h3>
                <p className="font-sans text-[15px] leading-[1.65] text-house-brown/78">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================================================
          5. Final CTA
          ============================================================ */}
      <section className="px-[5vw] py-24 md:py-32 bg-house-brown text-house-cream text-center">
        <div className="max-w-[760px] mx-auto">
          <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-house-gold-light mb-6">
            Ready when you are
          </p>
          <h2 className="em-accent font-display font-medium text-[clamp(32px,3.8vw,52px)] leading-[1.1] tracking-[-0.005em]">
            Begin with a <em>conversation.</em>
          </h2>
          <p className="font-display italic text-[clamp(18px,1.9vw,22px)] leading-[1.5] text-house-cream/85 mt-7 max-w-[56ch] mx-auto">
            The HoWA Companion takes about two minutes. The studios match to the brief.
            You only meet the ones we think fit.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap mt-10">
            <Link
              href="/howa/companion"
              className="inline-block font-sans text-[12px] tracking-[0.22em] uppercase text-house-brown bg-house-cream border border-house-cream px-7 py-4 no-underline transition-all duration-200 ease-out hover:bg-house-gold hover:border-house-gold"
            >
              Launch the Companion
            </Link>
            <GhostLink href="/design">Back to Design</GhostLink>
          </div>
        </div>
      </section>
    </article>
  );
}
