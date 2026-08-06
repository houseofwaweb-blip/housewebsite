import Image from "next/image";
import Link from "next/link";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";

/**
 * /the-house/about — Our House (REVISIONS v3 §7, complete rewrite).
 *
 * v3 removes:
 *   - the diagram that tried to explain the brand or company structure;
 *   - the "HoWA design begins..." section and all design-funnel copy
 *     (relocated to /design/interiors and /design/gardens per §10);
 *   - abstract corporate language before the founders and origin are
 *     established.
 *
 * Structure is §7's recommended order:
 *   1 Hero · 2 Meet the founders · 3 Where the House began ·
 *   4 What the work revealed · 5 Why HoWA was created · 6 The House today ·
 *   7 Standards and philosophy
 *
 * Governing rule (§7): this page tells the human and institutional story.
 * Product journeys such as HoWA First Design belong on their commercial pages.
 *
 * PHOTOGRAPHY GAP — §7 requires a photograph of Samuel Collett and Alexander
 * Lloyd Oakley together, plus a portrait of each with their role. Those files
 * do not exist in the repo yet. The founder blocks below are built and render
 * correctly; they use a named-plate treatment until the real photographs land.
 * §7 is explicit that founder photography must NOT be replaced with generated
 * people, anonymous stock portraits or abstract diagrams, so no substitute
 * imagery has been used. Drop the files in at the paths in FOUNDERS and set
 * `photo` to enable the portraits.
 */

export const metadata = {
  title: "Our House",
  description:
    "House of Willow Alexander was founded by Samuel Collett and Alexander Lloyd Oakley from a belief that the home and garden should be cared for as one living whole.",
};

const FOUNDERS: Array<{
  name: string;
  role: string;
  body: string;
  /** Set once real founder photography exists, e.g. "/the-house/founders/samuel.webp". */
  photo?: string;
}> = [
  {
    name: "Samuel Collett",
    role: "Co-founder · Design, brand and the intelligence behind it",
    body: "Samuel is responsible for how the House looks, sounds and thinks. Design direction, the editorial voice, the standard applied to everything the House puts its name to, and the thinking that became HoWA. He is the reason a service business ended up building a Home Record rather than another booking form.",
  },
  {
    name: "Alexander Lloyd Oakley",
    role: "Co-founder · Operations and the work on the ground",
    body: "Alex runs the part of the House that turns up at your door. He built the service side from the first van outwards: the teams, the routes, the standards a visit has to meet, and the training that makes one gardener's work look like the next one's. If a job is quoted, scheduled or delivered, it runs to a standard he set.",
  },
];

const TODAY = [
  { title: "Services", body: "Garden care, cleaning and housekeeping, window and gutter cleaning, handyman and repairs, clearance and specialist garden work.", href: "/services", cta: "Book a House service" },
  { title: "Design", body: "Interior and garden design, beginning with a mapped first direction and continuing with a named human studio.", href: "/design", cta: "See design" },
  { title: "Home and Pet Insurance", body: "Introductions to an authorised, FCA-regulated partner. Two separate routes, because they are two different conversations.", href: "/insurance", cta: "See insurance" },
  { title: "The Shop", body: "Considered goods for the work and pleasure of keeping a home, chosen for usefulness, beauty and longevity.", href: "/shop", cta: "Visit the Shop" },
  { title: "The Hearth", body: "Essays, recipes, garden notes and design writing, published when there is something worth saying.", href: "/the-hearth", cta: "Read The Hearth" },
  { title: "Stewardship of the whole home", body: "One standard across the garden, the rooms, the fabric and the record, rather than six suppliers who never speak to each other.", href: "/the-house/standards", cta: "Read the standards" },
];

const STANDARDS = [
  { title: "Care, held to one standard", body: "Every team and every studio is held to the same test: would we trust this in a home we love? If the answer changes, so does the arrangement." },
  { title: "Provider transparency", body: "You are always told who is coming before you commit. A House of Willow Alexander team, or a named House Approved professional. Never an anonymous subcontractor." },
  { title: "Responsible cultivation", body: "Electric vans and battery tools, peat-free where we can source it, planting chosen for the soil and the season rather than the catalogue, and green waste taken by a licensed carrier." },
  { title: "Style, and the sense to use it", body: "Taste is not decoration. It is knowing what a house already is, and refusing to do the thing that would spoil it." },
  { title: "Stewardship over transaction", body: "A home is not a job number. It is where a life is kept, and the record we hold should still make sense to whoever keeps it next." },
];

export default function AboutPage() {
  return (
    <div className="bg-house-cream text-house-brown">
      {/* 1. Hero (§7.1) */}
      <section className="px-[5vw] pt-[clamp(48px,6vw,96px)] pb-[clamp(36px,4.5vw,68px)]">
        <div className="mx-auto max-w-[880px] text-center">
          <p className="mb-5 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">
            Our House
          </p>
          <h1 className="font-display text-[clamp(32px,5vw,62px)] leading-[1.05] text-house-brown">
            A House built around <em>the care of home.</em>
          </h1>
          <p className="mx-auto mt-7 max-w-[64ch] font-sans text-[17px] leading-[1.7] text-house-stone">
            House of Willow Alexander was founded by Samuel Collett and Alexander
            Lloyd Oakley from a belief that the home and garden should be cared
            for as one living whole, through practical service, thoughtful design
            and long-term stewardship.
          </p>
        </div>
      </section>

      {/* 2. Meet the founders (§7.2) — real founders, distinct responsibilities,
          a shared point of view. What each one contributes, not a biography. */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[1080px]">
          <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">The founders</p>
          <h2 className="mb-4 font-display text-[clamp(24px,3vw,40px)] leading-[1.1] text-house-brown">
            Two people, <em>one argument they keep having.</em>
          </h2>
          <p className="mb-10 max-w-[62ch] font-sans text-[16px] leading-[1.65] text-house-stone">
            Alex wants the work done properly. Samuel wants it to mean something.
            The House is what happens when neither of them gives way.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {FOUNDERS.map((f) => (
              <article key={f.name} className="flex flex-col border border-house-brown/12 bg-house-cream">
                {f.photo ? (
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-house-cream-dark">
                    <Image src={f.photo} alt={`${f.name}, ${f.role}`} fill sizes="(min-width: 768px) 44vw, 100vw" className="object-cover" />
                  </div>
                ) : (
                  <div className="flex aspect-[16/7] w-full items-center justify-center border-b border-house-brown/12 bg-house-cream-dark/50">
                    <span className="font-display text-[clamp(30px,4vw,52px)] leading-none text-house-gold-ink/70">
                      {f.name.split(" ").map((w) => w[0]).join("")}
                    </span>
                  </div>
                )}
                <div className="p-8">
                  <h3 className="mb-1.5 font-display text-[26px] leading-tight text-house-brown">{f.name}</h3>
                  <p className="mb-4 font-sans text-[12px] tracking-[0.14em] uppercase text-house-gold-ink">{f.role}</p>
                  <p className="font-sans text-[15px] leading-[1.65] text-house-stone">{f.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Where the House began (§7.3) — the practical origin, not a
          manufactured heritage narrative. */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]">
        <div className="mx-auto grid max-w-[1180px] gap-[clamp(28px,4.5vw,64px)] lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-house-cream-dark">
            <Image
              src="/home/origin-studio.webp"
              alt="The original Willow Alexander garden studio: soil, seasons and a single electric van"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">Where the House began</p>
            <h2 className="mb-5 font-display text-[clamp(24px,3vw,40px)] leading-[1.1] text-house-brown">
              It started with other people&rsquo;s gardens.
            </h2>
            <p className="mb-4 max-w-[56ch] font-sans text-[16px] leading-[1.7] text-house-stone">
              The House began as Willow Alexander Gardens: one electric van, a
              small round of regular clients across London and the South East,
              and a habit of doing the job the slow way. Weeding by hand where it
              mattered. Planting for the soil rather than the invoice. Coming
              back in the right week rather than the convenient one.
            </p>
            <p className="mb-4 max-w-[56ch] font-sans text-[16px] leading-[1.7] text-house-stone">
              Clients started asking for the inside as well. Then the windows,
              then the gutters, then who to call about the roof. The round grew
              because people kept asking the same question: could you also look
              after this?
            </p>
            <p className="max-w-[56ch] font-sans text-[16px] leading-[1.7] text-house-stone">
              None of it was strategy. It was a customer standing in a doorway
              asking for help with something adjacent, and two people who found
              it hard to say no.
            </p>
          </div>
        </div>
      </section>

      {/* 4. What the work revealed (§7.4) */}
      <section className="bg-house-forest px-[5vw] py-[clamp(48px,6vw,92px)]">
        <div className="mx-auto max-w-[880px]">
          <p className="mb-4 font-sans text-[11px] tracking-[0.26em] uppercase text-house-gold-light">What the work revealed</p>
          <h2 className="mb-6 font-display text-[clamp(24px,3.2vw,42px)] leading-[1.12] text-house-cream">
            Every home we looked after had the same hole in it.
          </h2>
          <p className="mb-5 max-w-[62ch] font-sans text-[17px] leading-[1.7] text-[rgba(245,240,232,0.86)]">
            Looking after real homes revealed a larger problem. Appointments
            lived in one place, invoices in another, maintenance was forgotten
            and valuable knowledge disappeared whenever a contractor changed.
            Customers repeatedly had to explain their homes from the beginning.
          </p>
          <p className="max-w-[62ch] font-sans text-[16px] leading-[1.7] text-[rgba(245,240,232,0.75)]">
            The same conversation, over and over. What paint is that. When was
            the boiler last serviced. Who planted this and will it come back.
            Nobody knew, because nobody had ever been asked to keep the answer.
          </p>
        </div>
      </section>

      {/* 5. Why HoWA was created (§7.5) — the relationship, explained in words.
          No diagram, per §7. */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto grid max-w-[1180px] gap-[clamp(28px,4.5vw,64px)] lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">Why HoWA was created</p>
            <h2 className="mb-5 font-display text-[clamp(24px,3vw,40px)] leading-[1.1] text-house-brown">
              So a home would stop <em>starting from scratch.</em>
            </h2>
            <p className="mb-4 max-w-[56ch] font-sans text-[16px] leading-[1.7] text-house-stone">
              HoWA was created in response to what the House learned. It is a
              separate Home Intelligence system designed to connect the
              information, decisions and work surrounding a home. Today, House of
              Willow Alexander proudly uses HoWA to manage its customers&rsquo;
              bookings, schedules, communications and Home Records.
            </p>
            <p className="mb-7 max-w-[56ch] font-sans text-[16px] leading-[1.7] text-house-stone">
              The order matters. The House did not set out to build software. It
              set out to look after homes, kept finding the same gap, and
              eventually built the thing that would close it.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/howa"
                className="inline-flex items-center gap-2 border border-house-gold-dark bg-house-gold-ink px-7 py-3.5 font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110"
              >
                See how the House uses HoWA <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-house-cream-dark">
            <Image
              src="/home-v4/howa-why-created-lab.webp"
              alt="The HoWA Lab: a cutaway model of a House on a plinth in a Victorian records and survey room, with a HoWA Score gauge, sample trays of plaster, soil, water and timber, and cabinets of records, seasons, systems and listening"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 6. The House today (§7.6) — the complete House. */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]">
        <div className="mx-auto max-w-[1180px]">
          <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">The House today</p>
          <h2 className="mb-10 font-display text-[clamp(24px,3vw,40px)] leading-[1.1] text-house-brown">
            One House, <em>six ways in.</em>
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {TODAY.map((t) => (
              <Link
                key={t.title}
                href={t.href}
                className="group flex flex-col border border-house-brown/12 bg-house-white p-7 no-underline transition-colors hover:border-house-gold"
              >
                <h3 className="mb-2.5 font-display text-[22px] leading-tight text-house-brown">{t.title}</h3>
                <p className="mb-6 flex-1 font-sans text-[15px] leading-[1.55] text-house-stone">{t.body}</p>
                <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-house-gold-ink transition-colors group-hover:text-house-brown">
                  {t.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Standards and philosophy (§7.7) */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto max-w-[1080px]">
          <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">Standards and philosophy</p>
          <h2 className="mb-10 font-display text-[clamp(24px,3vw,40px)] leading-[1.1] text-house-brown">
            What we will not trade away.
          </h2>
          <dl className="grid gap-x-12 gap-y-8 md:grid-cols-2">
            {STANDARDS.map((st) => (
              <div key={st.title} className="border-t border-house-brown/20 pt-5">
                <dt className="mb-2 font-display text-[21px] leading-tight text-house-brown">{st.title}</dt>
                <dd className="m-0 max-w-[48ch] font-sans text-[15px] leading-[1.65] text-house-stone">{st.body}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-11 grid max-w-[380px] gap-3 sm:max-w-[640px] sm:grid-cols-2">
            <Link
              href="/the-house/standards"
              className="inline-flex items-center justify-center gap-2 border border-house-brown/25 px-7 py-3.5 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold"
            >
              Read the House standards <span aria-hidden>→</span>
            </Link>
            <Link
              href="/the-house/philosophy"
              className="inline-flex items-center justify-center gap-2 border border-house-brown/25 px-7 py-3.5 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold"
            >
              Read the philosophy <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How to reach us */}
      <div id="reach-us" style={{ background: "var(--color-house-cream)" }}>
        <EnquiryForm
          sourcePage="/the-house/about"
          eyebrow="How to reach us"
          headline="Write to the House."
          body="A question about a garden, a window, a warranty or a press enquiry. Choose the topic and it lands in the right inbox. We reply within one working day."
        />
      </div>
    </div>
  );
}
