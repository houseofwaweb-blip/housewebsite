import Image from "next/image";
import Link from "next/link";

/**
 * /the-house/how-we-choose — "How we choose the people who care for your home"
 *
 * REVISIONS v4 §6. There must NOT be a customer-facing page called "House
 * Approved Partners, Coming Soon". Professional accreditation belongs to HoWA
 * Approved; inventing a parallel House Approved network would recreate exactly
 * the brand and provider confusion this restructuring exists to resolve.
 *
 * v4 splits the two audiences across two sites:
 *   - This page (House site) is for CUSTOMERS. It is about trust and provider
 *     transparency: who turns up, what standard they are held to, and how the
 *     work is recorded and put right if it goes wrong.
 *   - "Become House Approved" (professional recruitment) belongs on the HoWA
 *     site and is linked, not duplicated, from here.
 *
 * It is explicitly NOT a speculative directory of partners who do not yet
 * exist, and it must not imply an operational nationwide network.
 *
 * Locked rule (v4 §6): customers buy services from the House. Professionals
 * join the House Approved network. HoWA connects and operates the relationship.
 */

export const metadata = {
  title: "How we choose the people who care for your home",
  description:
    "Who turns up, what standard they are held to, and how the work is recorded. House of Willow Alexander teams and named House Approved professionals, with the provider always disclosed before you commit.",
};

const PROVIDERS = [
  {
    title: "A House of Willow Alexander team",
    body: "Our own employed crews, in our own liveried electric vans, trained to the House standard. Most garden, cleaning, window and gutter work across our core postcodes is done this way.",
    line: "Delivered by the Willow Alexander service businesses. Book directly, or online through HoWA.",
  },
  {
    title: "A named House Approved professional",
    body: "For specialist work, and for jobs beyond the reach of our own crews, we use a professional we have approved. They are named. You are never handed to an anonymous subcontractor and told it is the same thing.",
    line: "Delivered by [Provider], a House Approved professional. Booked and managed through HoWA.",
  },
];

const STANDARDS = [
  {
    title: "Identity and right to work",
    body: "Checked before anyone is put in front of a customer. For our own teams this is part of employment; for approved professionals it is part of approval.",
  },
  {
    title: "Insurance",
    body: "Public liability cover is held by whoever carries out the work, and is confirmed before they are booked. Where a trade requires additional cover, that is confirmed too.",
  },
  {
    title: "Qualifications where the work demands them",
    body: "Gas work is carried out by a Gas Safe registered engineer. Electrical work is carried out by a qualified, registered electrician and certificated. Tree work is carried out by a qualified arborist. We do not treat these as optional.",
  },
  {
    title: "Customer care",
    body: "Arrive when we said, explain what is happening, leave the place as we found it, and tell you plainly when something has changed or gone wrong.",
  },
  {
    title: "Evidence of the work",
    body: "Photographs before and after where the job warrants it, notes on what was done, and the materials and products used. Filed against your address rather than lost in a thread.",
  },
  {
    title: "Continuing to meet it",
    body: "Approval is not permanent. If a provider stops meeting the standard, the arrangement ends. That is the entire point of holding one.",
  },
];

const AFTERCARE = [
  {
    q: "Something was not right. What happens?",
    a: "Tell us, through HoWA or by telephone, and we will put it right. Where the work was carried out by a named House Approved professional, the House still owns the conversation with you. You are not sent away to argue with someone you did not choose.",
  },
  {
    q: "Can I change or cancel an appointment?",
    a: "Yes, from My Home in HoWA or by calling us. You will see the confirmed time, who is coming and the agreed scope, so a change is a couple of taps rather than a phone queue.",
  },
  {
    q: "Will I get the same people each time?",
    a: "For recurring work we try hard to send the same team, because a cleaner or gardener who knows your home does better work. We will tell you when it cannot be the same people.",
  },
  {
    q: "Who holds my records?",
    a: "The work carried out on your home is kept in your Home Record in HoWA, the Home Intelligence app the House uses. It stays with the address, so the next visit picks up where the last one left off.",
  },
];

export default function HowWeChoosePage() {
  return (
    <div className="bg-house-cream text-house-brown">
      {/* Hero */}
      <section className="px-[5vw] pt-[clamp(48px,6vw,96px)] pb-[clamp(32px,4vw,60px)]">
        <div className="mx-auto max-w-[880px]">
          <nav aria-label="Breadcrumb" className="mb-6 font-sans text-[12px] tracking-[0.14em] uppercase text-house-stone">
            <Link href="/the-house/about" className="text-house-stone no-underline hover:text-house-gold-ink">
              Our House
            </Link>
            <span aria-hidden className="mx-2">/</span>
            <span className="text-house-brown">Our standards</span>
          </nav>
          <p className="mb-5 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">
            Provider transparency
          </p>
          <h1 className="font-display text-[clamp(30px,4.6vw,58px)] leading-[1.06] text-house-brown">
            How we choose the people <em>who care for your home.</em>
          </h1>
          <p className="mt-7 max-w-[62ch] font-sans text-[17px] leading-[1.7] text-house-stone">
            Letting someone into your home is an act of trust, and you are
            entitled to know who they are before they knock. This page sets out
            who turns up, what they are held to, and what happens if it is not
            right.
          </p>
        </div>
      </section>

      {/* Two kinds of provider */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(44px,5.5vw,88px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[1080px]">
          <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">Who turns up</p>
          <h2 className="mb-4 font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-brown">
            Two kinds of hands, <em>one standard.</em>
          </h2>
          <p className="mb-9 max-w-[62ch] font-sans text-[16px] leading-[1.65] text-house-stone">
            You are always told which of these is coming, before you pay or
            commit to anything. Never afterwards.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {PROVIDERS.map((p) => (
              <article key={p.title} className="flex flex-col border border-house-brown/15 bg-house-cream p-8">
                <h3 className="mb-3 font-display text-[23px] leading-tight text-house-brown">{p.title}</h3>
                <p className="mb-5 flex-1 font-sans text-[15px] leading-[1.6] text-house-stone">{p.body}</p>
                <p className="border-l-2 border-house-gold pl-4 font-sans text-[14px] leading-[1.55] text-house-brown">
                  {p.line}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-7 max-w-[70ch] font-sans text-[14px] leading-[1.6] text-house-stone/85">
            HoWA manages the booking and keeps the record of the work. It is not the
            physical service provider, and it never appears at your door.
          </p>
        </div>
      </section>

      {/* The standard */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(44px,5.5vw,88px)]">
        <div className="mx-auto max-w-[1080px]">
          <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">The standard</p>
          <h2 className="mb-9 font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-brown">
            What every provider is held to.
          </h2>
          <dl className="grid gap-x-12 gap-y-8 md:grid-cols-2">
            {STANDARDS.map((st) => (
              <div key={st.title} className="border-t border-house-brown/20 pt-5">
                <dt className="mb-2 font-display text-[20px] leading-tight text-house-brown">{st.title}</dt>
                <dd className="m-0 max-w-[48ch] font-sans text-[15px] leading-[1.65] text-house-stone">{st.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Real teams */}
      <section className="bg-house-forest px-[5vw] py-[clamp(48px,6vw,92px)]">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-center" style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--color-house-gold-light)", margin: "0 0 14px", fontWeight: 500 }}>
            Our own teams
          </p>
          <h2 className="text-center" style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(24px,3.4vw,42px)", lineHeight: 1.1, color: "var(--color-house-cream)", margin: "0 0 clamp(28px,4vw,48px)" }}>
            These are the people, <em>and this is the work.</em>
          </h2>
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {[
              { src: "/services/photos/vans/asher-348.webp", alt: "A liveried House of Willow Alexander electric van" },
              { src: "/services/photos/gardening/garden-clearance-hero.webp", alt: "House gardeners clearing a garden" },
              { src: "/services/photos/window-cleaning/regular-window-cleaning-work.webp", alt: "A House window cleaner working on a garden-room window" },
              { src: "/services/photos/cleaning/regular-cleaning-work.webp", alt: "A House cleaner in Willow Alexander livery wiping down a kitchen worktop" },
            ].map((t) => (
              <div key={t.src} className="relative aspect-[4/5] overflow-hidden bg-house-forest">
                <Image src={t.src} alt={t.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointments, records and aftercare */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(44px,5.5vw,88px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[880px]">
          <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">
            Appointments, records and putting things right
          </p>
          <h2 className="mb-8 font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-brown">
            What happens around the work.
          </h2>
          <div className="grid gap-0">
            {AFTERCARE.map((f) => (
              <details key={f.q} className="border-b border-house-brown/12 py-5">
                <summary className="cursor-pointer list-none font-display text-[19px] leading-tight text-house-brown">
                  {f.q}
                </summary>
                <p className="mt-3 max-w-[64ch] font-sans text-[15px] leading-[1.65] text-house-stone">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* For professionals — pointed at HoWA, never duplicated here (v4 §6B). */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(44px,5.5vw,84px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[760px] text-center">
          <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">
            Are you a professional?
          </p>
          <h2 className="mb-4 font-display text-[clamp(22px,2.6vw,34px)] leading-[1.12] text-house-brown">
            Professionals join through HoWA.
          </h2>
          <p className="mx-auto mb-8 max-w-[58ch] font-sans text-[16px] leading-[1.65] text-house-stone">
            Customers buy services from the House. Professionals join the HoWA
            Approved network, and HoWA connects and operates the relationship
            between the two. Applications are handled on the HoWA site.
          </p>
          <a
            href="https://howa.co.uk/approved"
            className="inline-flex items-center justify-center gap-2 border border-house-brown/25 px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold"
          >
            Become House Approved <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      {/* Close */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(44px,5.5vw,84px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[880px] text-center">
          <p className="mb-8 font-display text-[clamp(22px,2.8vw,34px)] leading-[1.2] text-house-brown">
            Still want to ask before you book? <em>That is a fair question.</em>
          </p>
          <div className="mx-auto grid max-w-[380px] gap-3 sm:max-w-[620px] sm:grid-cols-2">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 border border-house-gold-dark bg-house-gold-ink px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110"
            >
              Book a House service
            </Link>
            <a
              href="tel:08000478738"
              className="inline-flex items-center justify-center gap-2 border border-house-brown/25 px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold"
            >
              Call 0800 047 8738
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
