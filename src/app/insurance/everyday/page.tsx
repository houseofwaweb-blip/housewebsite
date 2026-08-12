import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { insuranceOg } from "@/lib/insurance/og";

/**
 * D1 · /insurance/everyday, the self-serve door. Deliberately NOT called
 * "compare": the House does not compare. Each product hands off to the service
 * Provenance operates. The hand-off must be visually and textually unambiguous,
 * and high-value properties are routed to the advised service.
 */
export const metadata: Metadata = {
  title: "Everyday cover",
  description: "Home, car, pet and travel cover for everything that does not need a conversation, arranged online through the service Provenance operates.",
  ...insuranceOg("everyday", "Everyday cover"),
};

const PRODUCTS = [
  { name: "Home", body: "Buildings and contents for a standard home.", slug: "home", image: "/insurance/ev-home.webp", imageAlt: "A well-kept everyday home." },
  { name: "Car, van and motorbike", body: "Including temporary cover from one hour to 28 days.", slug: "motor", image: "/insurance/ev-motor.webp", imageAlt: "A car and van outside a home." },
  { name: "Pet and travel", body: "Pet cover, and single-trip or annual travel.", slug: "pet-and-travel", image: "/insurance/ev-pet.webp", imageAlt: "A family pet at home." },
  { name: "Breakdown and bicycle", body: "Roadside and recovery, and cover for road, mountain and electric bikes.", slug: "breakdown-and-bicycle", image: "/insurance/ev-breakdown.webp", imageAlt: "A bicycle kept ready by the door." },
];

export default function EverydayHub() {
  return (
    <div className="ins-everyday bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-20 pb-10">
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-[color:var(--ins-ink)]">Insurance · Everyday cover</p>
            <h1 className="mt-4 font-display text-[clamp(30px,4.6vw,52px)] leading-[1.05] text-house-black">
              For everything that does not need a conversation.
            </h1>
            <p className="mt-6 max-w-[52ch] font-sans text-[18px] leading-[1.6] text-house-stone">
              Straightforward cover you can arrange online in a few minutes. The House does not run this itself, it is operated by Provenance, and clicking through takes you into their regulated service.
            </p>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/insurance/townhouse-golden.webp"
              alt="A white townhouse doorway with a black panelled door, framed by wisteria and white climbing roses in warm evening light, a well-kept everyday home."
              fill
              sizes="(min-width: 1120px) 540px, 90vw"
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
      </section>

      {/* Products, each an image card that hands off to the Provenance-operated service */}
      <section className="px-[5vw] pt-10 pb-10">
        <div className="mx-auto grid max-w-[1120px] gap-x-8 gap-y-10 sm:grid-cols-2">
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
                <h2 className="font-display text-[21px] leading-tight text-house-black transition-colors group-hover:text-[color:var(--ins-ink)]">{p.name}</h2>
                <p className="mt-2 mb-7 font-sans text-[16px] leading-[1.6] text-house-stone">{p.body}</p>
                <span className="mt-auto inline-flex w-fit items-center justify-center whitespace-nowrap border border-[color:var(--ins-dark)] bg-[var(--ins-accent)] px-6 py-3 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-on)] transition-[filter] group-hover:brightness-110">
                  View cover →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* The hand-off, stated plainly */}
      <section className="px-[5vw] pb-10">
        <div className="mx-auto max-w-[760px] border-l-2 border-[color:var(--ins-ink)] bg-house-cream-dark/50 px-5 py-4">
          <p className="m-0 font-sans text-[15px] leading-[1.6] text-house-brown/85">
            This is a self-serve service operated by Provenance, who are authorised and regulated by the FCA. The House introduces you and is an introducer only: it does not advise on, arrange, administer or compare insurance. When you click through, you leave the House and enter Provenance's regulated service.
          </p>
        </div>
      </section>

      {/* High-value routing */}
      <section className="px-[5vw] pb-16">
        <div className="mx-auto max-w-[760px]">
          <p className="font-sans text-[16px] leading-[1.65] text-house-brown/85">
            Insuring a listed, high-value or non-standard home? Everyday cover is not built for it.{" "}
            <Link href="/insurance/private-client" className="text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown">Speak to a specialist instead →</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
