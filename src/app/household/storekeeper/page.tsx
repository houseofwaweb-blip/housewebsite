import Image from "next/image";
import Link from "next/link";
import { WRITEBACK_OBJECTS, HOUSEHOLD } from "@/lib/truth";

/**
 * /household/storekeeper — Directive v2 STEP 09G.
 *
 * PAGE JOB: introduce the Storekeeper as the persona-led doorway, then route
 * commerce into The Stores at /shop. It is a doorway, not a second shop: the
 * catalogue, cart and checkout all live under /shop.
 *
 * Section order is fixed by 09G:
 *   1. Hero and exact promise
 *   2. Rooms of the House
 *   3. What earns a place (evidence-backed only)
 *   4. Selected objects / seasonal shelf
 *   5. Bought and remembered
 *   6. CTA into the /shop catalogue
 *
 * Two rules from 09G shape what is NOT here:
 *
 *  - "The claim that every product is House Approved unless evidence exists."
 *    So this page never says the range is House Approved. The secondary CTA the
 *    directive allows ("Shop the House Approved collection") is conditional on
 *    the mark being proven, and the seal's per-product evidence is not
 *    established, so it is omitted rather than shown on trust.
 *
 *  - Acceptance: "The page does not claim a candle produces the same Home
 *    Record object as a boiler or appliance." The remembered section is
 *    therefore explicitly proportionate.
 */

export const metadata = {
  title: "The Storekeeper | House of HoWA",
  description:
    "Everything the house needs, chosen properly. Objects organised by the rooms they belong to, with the seller shown plainly.",
};

const ACCENT = "#7a6229";

const ROOMS = [
  { name: "Kitchen", img: "/shop/rooms/kitchen.webp" },
  { name: "Living Room", img: "/shop/rooms/living-room.webp" },
  { name: "Bedroom", img: "/shop/rooms/bedroom.webp" },
  { name: "Bathroom", img: "/shop/rooms/bathroom.webp" },
  { name: "Dining", img: "/shop/rooms/dining.webp" },
  { name: "Hallway", img: "/shop/rooms/hallway.webp" },
  { name: "Utility", img: "/shop/rooms/utility.webp" },
  { name: "Garden", img: "/shop/rooms/garden.webp" },
];

// 09G s3. Each line is a test the House applies, not a claim about outcomes.
const EARNS_A_PLACE = [
  { t: "Use", d: "It has a job in a real home, and it does that job well enough to be worth the space it takes." },
  { t: "Repairability", d: "Where a thing can be mended, refilled or re-soled rather than replaced, that counts in its favour." },
  { t: "Provenance", d: "We would rather know where a thing came from and who made it than not." },
  { t: "Seller clarity", d: "The seller is shown plainly before you buy. You always know who you are buying from." },
];

export default function StorekeeperPage() {
  const member = HOUSEHOLD.find((m) => m.id === "storekeeper");
  const records = WRITEBACK_OBJECTS.storekeeper ?? [];

  return (
    <div className="howa-surface bg-[#fbfaf5] text-[#3a352c]">
      {/* 09A s1: Household marker and breadcrumb. */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1180px] px-6 pt-8 sm:px-10">
        <ol className="m-0 flex flex-wrap items-center gap-2 p-0 font-sans text-[11.5px] uppercase tracking-[0.14em] text-[#3a352c]/55 list-none">
          <li>
            <Link href="/household" className="text-[#3a352c]/55 no-underline hover:text-[#8a6f3f]">
              The Household
            </Link>
          </li>
          <li aria-hidden="true">·</li>
          <li style={{ color: ACCENT }}>The Storekeeper</li>
        </ol>
      </nav>

      {/* 1. Hero and exact promise (the directive's ONE-LINE PUBLIC PROMISE). */}
      <section className="pt-8 pb-14 lg:pt-10 lg:pb-20">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-6 sm:px-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <p className="mb-3 font-sans text-[12px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
              The Storekeeper · Keeps The Stores
            </p>
            <h1 className="font-display text-[clamp(32px,4vw,52px)] leading-[1.05] tracking-[-0.015em] text-[#1a241d]">
              Everything the house needs, <em className="italic">chosen properly.</em>
            </h1>
            <p className="mt-3 font-display italic text-[clamp(17px,1.8vw,21px)] leading-[1.3]" style={{ color: ACCENT }}>
              {member?.promise ?? "Everything the house needs, chosen properly, bought, and remembered."}
            </p>
            <p className="mt-5 max-w-[560px] text-[18px] leading-[1.55]">
              The Storekeeper keeps The Stores: objects organised by the rooms
              they belong to rather than by category, with the seller shown
              plainly before you buy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {/* 09G CTA rule. Primary is the catalogue itself: this page is the
                  doorway, and every commerce action belongs at /shop.

                  The directive's secondary CTA into a House Approved collection
                  is conditional ("only where the mark is proven"). Per-product
                  evidence for the seal is not established, so it is left out. */}
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-[16px] text-white no-underline transition-opacity hover:opacity-90"
                style={{ background: ACCENT }}
              >
                Enter The Stores <span aria-hidden>→</span>
              </Link>
              <Link
                href="/household"
                className="inline-flex items-center gap-2 rounded-md border px-6 py-3.5 text-[16px] no-underline transition-colors"
                style={{ borderColor: ACCENT, color: ACCENT }}
              >
                Meet the Household <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
          <figure
            className="relative w-full overflow-hidden rounded-2xl bg-[#efe9dc] ring-1 ring-[#b89968]/20"
            style={{ aspectRatio: "1024 / 1536" }}
          >
            <Image
              src="/howa/household/storekeeper.webp"
              alt="The Storekeeper as a cutaway house."
              fill
              sizes="(max-width:1024px) 92vw, 460px"
              priority
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      {/* 2. Rooms of the House — the room-first logic 09G says to keep. */}
      <section className="border-t border-[#1a241d]/8 py-14 lg:py-16">
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
          <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            Rooms of the House
          </p>
          <h2 className="font-display text-[clamp(24px,2.8vw,38px)] leading-[1.12] text-[#1a241d]">
            Organised by where a thing <em className="italic">actually lives.</em>
          </h2>
          <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.6] text-[#3a352c]/78">
            A home is not a set of product categories. The Stores are arranged as
            rooms, because that is how you think about the thing you need.
          </p>
          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {ROOMS.map((room) => (
              <Link key={room.name} href="/shop" className="group block no-underline">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#efe9dc]">
                  <Image
                    src={room.img}
                    alt=""
                    fill
                    sizes="(max-width:640px) 46vw, 22vw"
                    className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-2.5 font-display text-[18px] leading-[1.2] text-[#1a241d] transition-colors group-hover:text-[#8a6f3f]">
                  {room.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. What earns a place — evidence-backed tests only, never a seal claim. */}
      <section className="border-t border-[#1a241d]/8 bg-[#f4f1e9] py-14 lg:py-16">
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
          <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            What earns a place
          </p>
          <h2 className="font-display text-[clamp(24px,2.8vw,38px)] leading-[1.12] text-[#1a241d]">
            The tests a thing has to <em className="italic">pass.</em>
          </h2>
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {EARNS_A_PLACE.map((item) => (
              <div key={item.t} className="border-t border-[#1a241d]/15 pt-4">
                <h3 className="font-display text-[20px] leading-[1.2] text-[#1a241d]">{item.t}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-[#3a352c]/78">{item.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-[74ch] text-[13.5px] leading-[1.6] text-[#3a352c]/65">
            These are the tests the House applies when choosing what to stock.
            They are not a claim that every object in The Stores carries the House
            Approved mark: that mark is held by businesses whose evidence has been
            checked and is shown where it applies, never applied to a whole
            catalogue by association.
          </p>
        </div>
      </section>

      {/* 5. Bought and remembered — proportionate, per 09G's acceptance test. */}
      {records.length > 0 && (
        <section className="border-t border-[#1a241d]/8 py-14 lg:py-16">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
            <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
              Bought, and remembered
            </p>
            <h2 className="font-display text-[clamp(24px,2.8vw,38px)] leading-[1.12] text-[#1a241d]">
              Some things are worth <em className="italic">keeping a record of.</em>
            </h2>
            {/* The acceptance test in 09G is explicit: a candle must not be
                claimed to produce the same Home Record object as a boiler. So
                this says plainly that the record is proportionate to the object. */}
            <p className="mt-4 max-w-[66ch] text-[16px] leading-[1.6] text-[#3a352c]/78">
              An order can be kept against the home. Beyond that it depends
              entirely on what you bought. An appliance or a boiler is worth an
              asset record with its warranty, manual and the room it serves. A
              candle is an order and nothing more, and pretending otherwise would
              make the record useless.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2 p-0 list-none">
              {records.map((r) => (
                <li
                  key={r}
                  className="rounded-md border px-3 py-2 font-sans text-[12.5px] text-[#3a352c]/80"
                  style={{ borderColor: `${ACCENT}55` }}
                >
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-[70ch] text-[13px] leading-[1.55] text-[#3a352c]/65">
              Where the workflow supports it, an order and any warranty or manual
              can be saved to your Home Record.
            </p>
          </div>
        </section>
      )}

      {/* 6. CTA into the /shop catalogue. */}
      <section className="border-t border-[#1a241d]/8 bg-[#1a241d] py-16 text-center lg:py-20">
        <div className="mx-auto max-w-[720px] px-6 sm:px-10">
          <h2 className="font-display text-[clamp(26px,3vw,40px)] leading-[1.1] text-[#fbfaf5]">
            A place for <em className="italic">everything.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[16px] leading-[1.6] text-[#fbfaf5]/70">
            Considered goods organised by room, seller clearly shown and useful
            purchases capable of joining the Home Record.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-[16px] text-[#1a241d] no-underline transition-opacity hover:opacity-90"
            style={{ background: "#c5a960" }}
          >
            Shop the rooms <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
