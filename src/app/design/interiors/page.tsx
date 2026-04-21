import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";

export const metadata = {
  title: "Design · Interiors",
  description:
    "Whole-house renovations, single-room reads, and careful detailing. Every scheme House Approved.",
};

const PROCESS = [
  {
    n: "01",
    title: "Listen",
    body: "A proper conversation in the home, or video if distance demands. Who lives here. How you want to feel. What you've tried before that didn't work.",
  },
  {
    n: "02",
    title: "Sketch",
    body: "Pinned concept, palette, and plan within three weeks. Directional, not prescriptive — a start we can push against.",
  },
  {
    n: "03",
    title: "Develop",
    body: "Full schemes, sample sign-offs, fabric and finish approvals. FF&E schedule, project plan, realistic budget sheet.",
  },
  {
    n: "04",
    title: "Deliver",
    body: "Project managed on site by the studio. Regular photographs kept in your HoWA record. Handover includes care notes for every material.",
  },
];

export default function InteriorsPage() {
  return (
    <article className="bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-[12vh] pb-14">
        <div className="max-w-[880px] mx-auto">
          <Eyebrow>Design · Interiors</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,76px)] leading-[1.05] tracking-[-0.01em] mt-4">
            A house, <em>re-read</em>.
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[60ch]">
            Interior commissions through two House Approved studios. Full-home
            renovations, single-room re-reads, and the quiet detailing that
            makes ordinary rooms feel permanent.
          </p>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <Link
              href="/book-consultation?service=design-interiors"
              className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold px-6 py-3.5 no-underline transition-colors duration-[var(--t-slow)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
            >
              Start a consultation
            </Link>
            <GhostLink href="/partners/delve-interiors">See Delve</GhostLink>
            <GhostLink href="/partners/jessica-durling-mcmahon">See Jessica</GhostLink>
          </div>
        </div>
      </section>

      <section className="px-[5vw] py-16 bg-white border-t border-house-brown/10">
        <div className="max-w-[1080px] mx-auto">
          <Eyebrow>How it goes</Eyebrow>
          <h2 className="font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mt-3 mb-10 max-w-[22ch]">
            Four quiet stages.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS.map((step) => (
              <div
                key={step.n}
                className="flex flex-col gap-3 border-t border-house-gold pt-5"
              >
                <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold">
                  {step.n}
                </div>
                <h3 className="font-display font-medium text-[22px] leading-[1.2]">
                  {step.title}
                </h3>
                <p className="font-sans text-[15px] leading-[1.6] text-house-stone">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-[5vw] py-16 border-t border-house-brown/10">
        <div className="max-w-[720px] mx-auto text-center">
          <p className="font-sans italic text-[22px] leading-[1.5] text-house-brown/90">
            &ldquo;A home that carries you. Not a statement you have to keep
            up with.&rdquo;
          </p>
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-house-stone mt-5">
            The House brief
          </p>
        </div>
      </section>
    </article>
  );
}
