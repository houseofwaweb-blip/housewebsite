import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { insuranceOg } from "@/lib/insurance/og";
import { InsuranceTrustStrip } from "@/components/insurance/InsuranceTrustStrip";
import { InsuranceDisclosure } from "@/components/insurance/InsuranceDisclosure";
import { InsuranceCtaBand } from "@/components/insurance/InsuranceCtaBand";
import { ProvenanceLockup } from "@/components/insurance/ProvenanceLockup";

/**
 * D1 · /insurance/everyday, the everyday-cover hub. Rebuilt to share the
 * specialist rhythm (hero → green trust band → the product grid near the top →
 * how it works → burgundy anchor → disclosure). Introducer boundary throughout;
 * high-value homes routed to the advised service.
 */
export const metadata: Metadata = {
  title: "Everyday cover",
  description: "Home, car, pet and travel cover for the everyday things. Introduced by the House, arranged by Provenance.",
  ...insuranceOg("everyday", "Everyday cover"),
};

const PRODUCTS = [
  { name: "Home", body: "Buildings and contents for a standard home.", slug: "home", image: "/insurance/ev-home.webp", imageAlt: "A well-kept everyday home." },
  { name: "Car, van and motorbike", body: "Including temporary cover from one hour to 28 days.", slug: "motor", image: "/insurance/ev-motor.webp", imageAlt: "A car and van outside a home." },
  { name: "Pet and travel", body: "Pet cover, and single-trip or annual travel.", slug: "pet-and-travel", image: "/insurance/ev-pet.webp", imageAlt: "A family pet's collar and travel things on a table." },
  { name: "Breakdown and bicycle", body: "Roadside and recovery, and cover for road, mountain and electric bikes.", slug: "breakdown-and-bicycle", image: "/insurance/ev-breakdown.webp", imageAlt: "A bicycle kept ready by the door." },
];

const STEPS = [
  { n: "1", h: "Choose a cover", p: "Pick the everyday cover you need, from home to bicycle." },
  { n: "2", h: "A short introduction", p: "Leave a few details. Nothing about sums insured, and no comparison forms." },
  { n: "3", h: "Provenance arranges it", p: "A specialist calls, arranges the cover and handles it from there." },
];

export default function EverydayHub() {
  return (
    <div className="ins-everyday bg-house-cream text-house-brown">
      {/* 1. Hero — cream split */}
      <section className="px-[5vw] pt-20 pb-12">
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-sans text-[14px] tracking-[0.3em] uppercase text-[color:var(--ins-ink)]">Insurance · Everyday cover</p>
            <h1 className="mt-4 font-display text-[clamp(33px,4.6vw,55px)] leading-[1.05] text-house-black">
              For everything that does not need a conversation.
            </h1>
            <p className="mt-6 max-w-[52ch] font-sans text-[21px] leading-[1.6] text-house-stone">
              Straightforward cover for the everyday things. Tell us what you need and a specialist will arrange it. The House introduces you; Provenance arranges the cover.
            </p>
            <div className="mt-8">
              <a
                href="#choose-a-cover"
                className="inline-flex items-center justify-center whitespace-nowrap border border-[color:var(--ins-dark)] bg-[var(--ins-accent)] px-7 py-3.5 font-sans text-[14px] tracking-[0.16em] uppercase text-[color:var(--ins-on)] no-underline transition-[filter] hover:brightness-110"
              >
                Choose a cover
              </a>
            </div>
            <ProvenanceLockup className="mt-6" />
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/insurance/everyday-hero.webp"
              alt="A dark green study desk arranged with a gold-lettered 'Everyday Cover' book, a model stone cottage, two model Mini cars, a dog collar and bowl, house keys, a folded map and a 'Cover Schedule' folder, the everyday things a household insures."
              fill
              sizes="(min-width: 1120px) 540px, 90vw"
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
      </section>

      {/* 2. Trust strip — dark green band */}
      <InsuranceTrustStrip />

      {/* 3. The product grid, near the top */}
      <section id="choose-a-cover" className="scroll-mt-24 px-[5vw] pt-14 pb-10">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="mb-8 font-display text-[clamp(25px,2.8vw,37px)] leading-[1.12] text-house-black">Choose a cover.</h2>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {PRODUCTS.map((p) => (
              <Link
                key={p.name}
                href={`/insurance/everyday/${p.slug}`}
                className="group flex flex-col overflow-hidden border border-house-brown/12 bg-house-white no-underline transition-[border-color,box-shadow] hover:border-[color:var(--ins-ink)] hover:shadow-[0_14px_40px_-24px_rgba(0,0,0,0.4)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 540px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[25px] leading-tight text-house-black transition-colors group-hover:text-[color:var(--ins-ink)]">{p.name}</h3>
                  <p className="mt-2 mb-7 font-sans text-[19px] leading-[1.6] text-house-stone">{p.body}</p>
                  <span className="mt-auto inline-flex w-fit items-center justify-center whitespace-nowrap border border-[color:var(--ins-dark)] bg-[var(--ins-accent)] px-6 py-3 font-sans text-[14px] tracking-[0.16em] uppercase text-[color:var(--ins-on)] transition-[filter] group-hover:brightness-110">
                    View cover →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How it works — cream-dark band */}
      <section className="px-[5vw] py-14" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto max-w-[1120px]">
          <p className="font-sans text-[14px] tracking-[0.24em] uppercase text-[color:var(--ins-ink)]">How it works</p>
          <h2 className="mt-3 mb-9 max-w-[26ch] font-display text-[clamp(25px,2.8vw,37px)] leading-[1.12] text-house-black">Simple to arrange, no comparison forms.</h2>
          <ol className="grid list-none gap-x-10 gap-y-8 p-0 sm:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="border-t border-house-brown/15 pt-4">
                <p className="font-display text-[25px] leading-none text-[color:var(--ins-ink)]">{s.n}</p>
                <h3 className="mt-3 font-display text-[22px] leading-tight text-house-black">{s.h}</h3>
                <p className="mt-2 font-sans text-[17.5px] leading-[1.6] text-house-brown/85">{s.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Burgundy anchor */}
      <section className="px-[5vw] py-12 text-house-cream" style={{ background: "var(--ins-accent)" }}>
        <div className="mx-auto max-w-[1120px]">
          <p className="max-w-[52ch] font-display text-[clamp(23px,2.4vw,33px)] leading-[1.25] text-house-cream">
            No fear, no urgency, no pressure. The House introduces you; Provenance arranges and administers the cover.
          </p>
          <ProvenanceLockup variant="onDark" className="mt-8" />
        </div>
      </section>

      {/* 6. High-value routing */}
      <section className="px-[5vw] py-12">
        <div className="mx-auto max-w-[760px]">
          <p className="font-sans text-[18.5px] leading-[1.65] text-house-brown/85">
            Insuring a listed, high-value or non-standard home? Everyday cover is not built for it.{" "}
            <Link href="/insurance/private-client" className="text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown">Speak to a specialist instead →</Link>
          </p>
        </div>
      </section>

      {/* Strong closing CTA band — always an action before the footer */}
      <InsuranceCtaBand
        eyebrow="Arrange everyday cover"
        heading="Choose a cover and a specialist will arrange it."
        body="Home, car, pet and travel. Tell us what you need and a specialist will arrange it. No comparison forms, and no pressure."
        primaryLabel="Choose a cover"
        primaryHref="#choose-a-cover"
        tertiary={{ label: "Speak to a specialist", href: "/insurance/private-client" }}
      />

      {/* 7. Disclosure */}
      <section className="px-[5vw] pb-16">
        <div className="mx-auto max-w-[760px]">
          <InsuranceDisclosure />
        </div>
      </section>
    </div>
  );
}
