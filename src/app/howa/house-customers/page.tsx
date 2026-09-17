import Link from "next/link";
import Image from "next/image";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";

/**
 * /howa/house-customers — House-customer welcome microsite, V2 MOCKUP-LOCKED
 * (HoWA_House_Customer_Microsite_V2_Mockup_Locked.md). Dedicated microsite shell
 * (global House chrome suppressed via ChromeGate), full-bleed editorial split
 * sections with paper-fade imagery, HTML product specimens/diagrams, full-bleed
 * cinematic Cinema, compact footer. Free-first; plan prices are NOT shown here
 * (deferred to /howa/plans per the locked spec). Release honesty: "Start with
 * your address" → /howa/coming-soon; "Sign in" → the ServiceOS accounts portal.
 */

const PAPER = "#f6f1e9";
const PAPER_LIGHT = "#fbf8f2";
const INK = "#2d201a";
const MUTED = "#6f635c";
const RULE = "rgba(45,32,26,0.16)";
const GOLD = "#b49359";
const DARK = "#2d1d18";
const NAVY = "#132740";

const START = "/howa/coming-soon";
const SIGNIN = "https://accounts.willowalexander.co.uk/";

export const metadata = {
  title: { absolute: "HoWA for House customers | House of Willow Alexander" },
  description:
    "Your house is trying to tell you something. Meet HoWA, the Home Intelligence bringing your House services, records and next steps together. House of Willow Alexander customers are first through the door.",
};

const CONTAINER = "mx-auto w-[min(1312px,calc(100%-128px))] max-[1199px]:w-[calc(100%-64px)] max-[767px]:w-[calc(100%-40px)]";
const fade = (side: "right" | "left", c: string) =>
  `linear-gradient(${side === "right" ? "90deg" : "270deg"}, ${c} 0%, ${c}fa 5%, ${c}e0 14%, ${c}85 25%, ${c}1f 39%, ${c}00 52%)`;

function Eyebrow({ children, color = GOLD }: { children: React.ReactNode; color?: string }) {
  return <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color }}>{children}</p>;
}
function PrimaryBtn({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link href={href} className="inline-flex h-[54px] items-center justify-center whitespace-nowrap px-10 font-sans text-[13px] uppercase tracking-[0.14em] no-underline transition-[filter] hover:brightness-110" style={dark ? { background: PAPER_LIGHT, color: INK } : { background: INK, color: PAPER_LIGHT }}>{children}</Link>
  );
}
function SecondaryBtn({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link href={href} className="inline-flex h-[54px] items-center justify-center whitespace-nowrap px-10 font-sans text-[13px] uppercase tracking-[0.14em] no-underline transition-colors" style={{ border: `1px solid ${dark ? PAPER_LIGHT : INK}`, color: dark ? PAPER_LIGHT : INK }}>{children}</Link>
  );
}

/** Full-bleed editorial split with a paper-fade image field. */
function FadeSection({ eyebrow, title, children, img, alt, side = "right", bg = PAPER, objectPos = "center", mediaW = "58%", minH = 590 }: {
  eyebrow: string; title: React.ReactNode; children: React.ReactNode; img: string; alt: string; side?: "right" | "left"; bg?: string; objectPos?: string; mediaW?: string; minH?: number;
}) {
  return (
    <section className="relative overflow-hidden" style={{ background: bg, minHeight: minH }}>
      {/* desktop media field — inset vertically so images never touch between
          sections (paper breathing room top and bottom) */}
      <div className="absolute hidden overflow-hidden md:block" style={{ [side]: 0, top: "clamp(32px,4vw,64px)", bottom: "clamp(32px,4vw,64px)", width: mediaW } as React.CSSProperties}>
        <Image src={img} alt={alt} fill sizes="60vw" className="object-cover" style={{ objectPosition: objectPos }} />
        <div className="pointer-events-none absolute inset-0" style={{ background: fade(side, bg) }} />
      </div>
      <div className={`${CONTAINER} relative z-10 flex ${side === "left" ? "justify-end" : ""}`}>
        <div className="w-full max-w-[520px] py-[clamp(56px,8vw,94px)] md:w-[44%]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-display leading-[0.98] tracking-[-0.025em] text-[clamp(38px,4vw,58px)]" style={{ color: INK }}>{title}</h2>
          <div className="mt-6 font-sans text-[19px] leading-[1.5]" style={{ color: MUTED }}>{children}</div>
        </div>
      </div>
      {/* mobile image */}
      <div className="relative block h-[300px] w-full md:hidden">
        <Image src={img} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: objectPos }} aria-hidden="true" />
      </div>
    </section>
  );
}

const TOOLS = [
  { t: "Read your garden", b: "Photo + location → plants, condition and seasonal priorities.", href: "/howa/ask?tool=garden", state: "Coming next", span: "lg:col-span-2" },
  { t: "Scan a repair", b: "Photo/video → likely issue, urgency, safety boundary and fair-cost context.", href: "/howa/ask?tool=repair", state: "Coming next", span: "lg:col-span-2" },
  { t: "Decode a quote", b: "Scope → plain English, missing items, questions and cost context.", href: "/howa/ask?tool=quote", state: "Coming next", span: "lg:col-span-2" },
  { t: "Design a space", b: "Photo + dimensions → concept, materials, budget and retained brief.", href: "/howa/design", state: "Available", span: "lg:col-span-3" },
  { t: "Read a document", b: "Policy / invoice / warranty → dates, obligations, reminders and proof.", href: "/howa/ask?tool=documents", state: "Coming next", span: "lg:col-span-3" },
];
const PLANS = [
  { name: "HoWA Free", tag: "For customers without a regular service plan.", items: ["Manage House services", "Begin the House Record", "Begin the Household Profile", "Use launch free HoWA functionality", "No paid subscription required for the House services you book"] },
  { name: "HoWA+", tag: "For households who want more continuity.", items: ["Exclusive service discounts", "Priority booking", "Plus confirmed HoWA+ software benefits at launch"] },
  { name: "HoWA Steward", tag: "For households who want a more actively managed relationship.", items: ["Fixed recurring maintenance visit", "Priority access", "Account manager", "Deeper ongoing oversight"] },
];
const FAQ = [
  { q: "Do I need to pay for HoWA to keep my House services?", a: "It depends on your services. If you do not hold a regular service plan, you can begin with free HoWA access and pay separately for the services you book. Regular garden maintenance, cleaning and full property plans move to HoWA Steward, which is explained before you agree." },
  { q: "Who moves to HoWA Steward?", a: "Customers with a regular garden maintenance, regular cleaning or full property package. Steward is £29.99 a month for 12 months, a total membership commitment of £359.88, with visits billed separately at your agreed rates. The full terms are shown before you join." },
  { q: "Are my current House services changing?", a: "Your existing service relationships continue. HoWA becomes a clearer place to see bookings, share requests and keep the details that make the next visit more useful." },
  { q: "Why are House bookings moving into HoWA?", a: "Because a useful service creates knowledge that should not disappear after the visit. HoWA gives the brief, the history and the useful results a place to connect." },
  { q: "What does the free plan include?", a: "Managing your House services, beginning your House Record and Household Profile, and the launch free HoWA functionality. If you do not hold a regular service plan, no paid subscription is required to keep using the House services you book." },
  { q: "Is HoWA only for House of Willow Alexander customers?", a: "House customers are first through the door. HoWA is being built as a wider Home Intelligence platform, and other trusted providers can join over time." },
  { q: "Can House see everything in my HoWA account?", a: "No. The House receives the information relevant to the service it is fulfilling. Your private Household Profile is kept distinct from the property's House Record." },
  { q: "What happens to my data if I move house?", a: "Your personal household context stays with you. A handover of appropriate property information is a separate process with its own permissions." },
  { q: "What is the HoWA Score?", a: "A developing view of how well a home is known, evidenced, maintained and prepared, with confidence shown separately. It is not a survey, valuation, safety certificate or insurance rating." },
  { q: "Which features are beta or coming next?", a: "Features are labelled where they are offered. Coming next means it is not yet available to use. Your account may have a different set of features from another customer's." },
];

/** In-page anchor links (the global House nav stays; this is just jump links). */
function AnchorNav() {
  const items = [
    { l: "What HoWA is", h: "#what-howa" },
    { l: "Your services", h: "#services" },
    { l: "Get started", h: "#get-started" },
    { l: "Plans", h: "#plans" },
    { l: "HoWA Cinema", h: "/howa/cinema" },
  ];
  return (
    <nav aria-label="On this page" className="sticky top-[var(--howa-anchor-top,0px)] z-30" style={{ background: "rgba(251,248,242,0.94)", borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}`, backdropFilter: "blur(6px)" }}>
      <div className={`${CONTAINER} flex flex-wrap items-center gap-x-7 gap-y-2 py-3.5 font-sans text-[12px] uppercase tracking-[0.14em]`}>
        {items.map((n) => (
          <Link key={n.h} href={n.h} className="no-underline transition-colors hover:opacity-60" style={{ color: INK }}>{n.l}</Link>
        ))}
      </div>
    </nav>
  );
}

export default function HouseCustomersPage() {
  return (
    <div className="howa-surface relative overflow-x-hidden" style={{ background: PAPER, color: INK }}>
      <MetaViewContent contentId="howa_house_customers" contentName="HoWA for House customers" contentCategory="howa_marketing" />

      {/* 01 — Hero */}
      <section className="relative overflow-hidden" style={{ background: PAPER, minHeight: 660 }}>
        <div className="absolute inset-y-0 right-0 hidden w-[61%] md:block">
          <Image src="/howa/microsite/hero-dollhouse.webp" alt="A warm Georgian doll's house beside a gardener tending hydrangeas" fill priority sizes="60vw" className="object-cover" style={{ objectPosition: "55% center" }} />
          <div className="pointer-events-none absolute inset-0" style={{ background: fade("right", PAPER) }} />
        </div>
        <div className={`${CONTAINER} relative z-10`}>
          <div className="w-full max-w-[530px] pb-[72px] pt-[clamp(48px,8vw,96px)] md:w-[42%]">
            <Eyebrow>For House of Willow Alexander customers</Eyebrow>
            <h1 className="font-display uppercase leading-[0.95] tracking-[-0.035em] text-[clamp(48px,5.4vw,82px)]" style={{ color: INK }}>Your house is trying to tell you something.</h1>
            <p className="mt-6 max-w-[480px] font-sans text-[19px] leading-[1.5]" style={{ color: MUTED }}>Three years in development, shaped by real homes and real care. House of Willow Alexander customers are first through the door.</p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <PrimaryBtn href={START}>Start with your address</PrimaryBtn>
              <SecondaryBtn href={SIGNIN}>Sign in</SecondaryBtn>
            </div>
            <p className="mt-4 font-sans text-[14px]" style={{ color: MUTED }}>Bring your home to life in a few simple steps.</p>
          </div>
        </div>
        <div className="relative block h-[300px] w-full md:hidden">
          <Image src="/howa/microsite/hero-dollhouse.webp" alt="" fill sizes="100vw" className="object-cover" aria-hidden="true" />
        </div>
      </section>

      <AnchorNav />

      {/* 02 — Provenance */}
      <FadeSection eyebrow="Provenance" title="The same trusted care. Now with a clearer view." img="/howa/microsite/garden-visit.webp" alt="A House of Willow Alexander gardener writing up a garden visit" bg={PAPER_LIGHT} objectPos="62% center" mediaW="55%">
        <p>Every visit created useful knowledge. The home kept almost none of it.</p>
        <p className="mt-4">A gardener noticed something. A cleaner spotted a change. A handyman understood a recurring failure. An invoice recorded what happened. A warranty created a future date. Once the visit ended, the household still had to hold the whole story together.</p>
        <p className="mt-5 font-display text-[22px]" style={{ color: INK }}>Three years in development. Now your home can begin to remember.</p>
      </FadeSection>

      {/* 03 — How it works (three-circle model, no photo) */}
      <section id="what-howa" className="scroll-mt-24" style={{ background: PAPER }}>
        <div className={`${CONTAINER} grid items-center gap-[52px] py-[84px] lg:grid-cols-[46%_54%]`}>
          <div>
            <Eyebrow>The product</Eyebrow>
            <h2 className="font-display leading-[0.98] tracking-[-0.025em] text-[clamp(38px,4vw,58px)]" style={{ color: INK }}>Three things, one clearer home.</h2>
            <dl className="mt-8" style={{ borderTop: `1px solid ${RULE}` }}>
              {[["The House Record", "The memory of the property: what it is, what happened, what is due."], ["The Household Profile", "The living context of the people: routines, preferences, budgets and care needs."], ["HoWA", "The living intelligence between the two. It turns signals into meaning, then helps it act."]].map(([t, b]) => (
                <div key={t} className="py-5" style={{ borderBottom: `1px solid ${RULE}` }}>
                  <dt className="font-display text-[22px]" style={{ color: INK }}>{t}</dt>
                  <dd className="mt-1 font-sans text-[16px] leading-[1.5]" style={{ color: MUTED }}>{b}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 font-sans text-[13px] uppercase tracking-[0.12em]" style={{ color: GOLD }}>House signals → Household context → HoWA → Next action → Proof → Remember</p>
          </div>
          {/* three-circle diagram */}
          <div className="relative mx-auto h-[420px] w-full max-w-[460px]">
            {[{ l: "The House Record", top: "0", left: "0" }, { l: "The Household Profile", top: "0", right: "0" }, { l: "Signals + context", bottom: "0", left: "50%", tx: "-50%" }].map((c, i) => (
              <div key={i} className="is-round absolute flex h-[clamp(180px,24vw,270px)] w-[clamp(180px,24vw,270px)] items-center justify-center rounded-full p-6 text-center" style={{ background: "rgba(190,164,108,0.18)", top: c.top, bottom: c.bottom, left: c.left, right: c.right, transform: c.tx ? `translateX(${c.tx})` : undefined }}>
                <span className="font-display text-[18px]" style={{ color: INK }}>{c.l}</span>
              </div>
            ))}
            <div className="is-round absolute left-1/2 top-1/2 flex h-[118px] w-[118px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full" style={{ background: DARK }}>
              <span className="font-display text-[22px] text-white">HoWA</span>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Product proof (selector + large bleeding visual) */}
      <section className="overflow-hidden" style={{ background: PAPER_LIGHT }}>
        <div className={`${CONTAINER} grid items-center gap-7 py-[72px] lg:grid-cols-[34%_66%]`}>
          <div>
            <Eyebrow>Product proof</Eyebrow>
            <h2 className="font-display leading-[0.98] tracking-[-0.025em] text-[clamp(34px,3.6vw,52px)]" style={{ color: INK }}>What lives in HoWA.</h2>
            <div className="mt-6" style={{ borderTop: `1px solid ${RULE}` }}>
              {[["House Record", "The memory of the property."], ["Household Profile", "The living context of the people."], ["HoWA Score", "A simple visible state of how well the home is known, evidenced, maintained, protected and prepared, with separate confidence."], ["Ask HoWA", "The internet knows homes. HoWA knows yours, and why it matters now."]].map(([t, b]) => (
                <div key={t} className="py-4" style={{ borderBottom: `1px solid ${RULE}` }}>
                  <p className="font-display text-[19px]" style={{ color: INK }}>{t}</p>
                  <p className="mt-1 font-sans text-[15px] leading-[1.45]" style={{ color: MUTED }}>{b}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[16/10] w-full md:w-[118%]">
              <Image src="/howa/microsite/product-dashboard.webp" alt="The HoWA home dashboard on a tablet and phone" fill sizes="70vw" className="object-contain object-left" />
            </div>
            <span className="mt-2 block font-sans text-[11px] uppercase tracking-[0.14em]" style={{ color: MUTED }}>Illustrative product</span>
          </div>
        </div>
      </section>

      {/* 05 — Your services in HoWA (product specimen with photo rows) */}
      <section id="services" className="relative overflow-hidden scroll-mt-24" style={{ background: PAPER }}>
        {/* backdrop inset vertically so it never touches the next section */}
        <div className="absolute hidden overflow-hidden md:block" aria-hidden="true" style={{ right: 0, top: "clamp(40px,5vw,72px)", bottom: "clamp(40px,5vw,72px)", width: "50%" }}>
          <Image src="/howa/microsite/services.webp" alt="" fill sizes="50vw" className="object-cover" style={{ opacity: 0.22 }} />
          <div className="pointer-events-none absolute inset-0" style={{ background: fade("right", PAPER) }} />
        </div>
        <div className={`${CONTAINER} relative z-10 grid items-center gap-[52px] py-[clamp(64px,9vw,104px)] lg:grid-cols-[46%_54%]`}>
          <div className="max-w-[520px]">
            <Eyebrow>Your services</Eyebrow>
            <h2 className="font-display leading-[0.98] tracking-[-0.025em] text-[clamp(34px,3.6vw,52px)]" style={{ color: INK }}>Your Willow Alexander services now live inside HoWA.</h2>
            <p className="mt-6 font-sans text-[18px] leading-[1.55]" style={{ color: MUTED }}>Existing service relationships continue. HoWA becomes the place to manage and book House services. If you do not hold a regular service plan, no paid membership is required to continue. Regular garden, cleaning and full property plans move to HoWA Steward.</p>
            <p className="mt-6 font-display text-[24px]" style={{ color: INK }}>Booked. Done. Proved. Remembered.</p>
            <p className="mt-2 font-sans text-[15px]" style={{ color: MUTED }}>Completed work can return useful proof to the House Record: photos, notes, invoice, warranty and next due date.</p>
          </div>
          {/* device specimen — photo rows, soft rounded card */}
          <div className="mx-auto w-full max-w-[440px] overflow-hidden rounded-[26px] p-7" style={{ background: PAPER_LIGHT, border: `1px solid ${RULE}`, boxShadow: "0 40px 90px -30px rgba(45,32,26,0.35)" }}>
            <p className="mb-5 font-display text-[24px]" style={{ color: INK }}>Your services</p>
            <div className="flex flex-col gap-3">
              {[
                { t: "Garden care", d: "Last visit 12 Sept · Next 10 Oct", img: "/services/field/garden-in-good-order.webp" },
                { t: "Home cleaning", d: "Last visit 8 Sept · Next 22 Sept", img: "/services/home/housekeeping.webp" },
                { t: "Handyman", d: "Last visit 5 Sept · Next 3 Oct", img: "/services/home/handyman.webp" },
              ].map((s) => (
                <div key={s.t} className="flex items-center gap-4 rounded-2xl p-3 transition-colors" style={{ border: `1px solid ${RULE}`, background: PAPER }}>
                  <div className="relative h-[56px] w-[56px] shrink-0 overflow-hidden rounded-xl">
                    <Image src={s.img} alt="" fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-sans text-[15px] font-semibold" style={{ color: INK }}>{s.t}</p>
                    <p className="mt-0.5 font-sans text-[13px]" style={{ color: MUTED }}>{s.d}</p>
                  </div>
                  <span aria-hidden="true" className="text-[18px]" style={{ color: GOLD }}>→</span>
                </div>
              ))}
            </div>
            <p className="mt-5 font-sans text-[13px] uppercase tracking-[0.14em] underline underline-offset-4" style={{ color: GOLD }}>View all services</p>
          </div>
        </div>
      </section>

      {/* 06 — Connect your House account (tonal break from Services above) */}
      <section id="get-started" className="relative overflow-hidden scroll-mt-24" style={{ background: PAPER_LIGHT, borderTop: `1px solid ${RULE}` }}>
        {/* backdrop inset vertically so it never touches the section above */}
        <div className="absolute hidden overflow-hidden md:block" aria-hidden="true" style={{ right: 0, top: "clamp(40px,5vw,72px)", bottom: "clamp(40px,5vw,72px)", width: "46%" }}>
          <Image src="/howa/microsite/dollhouse-clean.webp" alt="" fill sizes="46vw" className="object-cover" style={{ opacity: 0.22 }} />
          <div className="pointer-events-none absolute inset-0" style={{ background: fade("right", PAPER_LIGHT) }} />
        </div>
        <div className={`${CONTAINER} relative z-10 grid items-center gap-12 py-[clamp(64px,9vw,104px)] lg:grid-cols-[54%_46%]`}>
          <div className="max-w-[520px]">
            <Eyebrow>Get started</Eyebrow>
            <h2 className="font-display leading-[0.98] tracking-[-0.025em] text-[clamp(34px,3.6vw,52px)]" style={{ color: INK }}>Connect your House account.</h2>
            <p className="mt-5 max-w-[42ch] font-sans text-[18px] leading-[1.55]" style={{ color: MUTED }}>Bring your existing relationship across in seconds. We will match your details and show you your home in HoWA.</p>
            <ol className="mt-8 flex flex-col gap-4">
              {["Sign in to your House account.", "Confirm your details.", "Meet your home in HoWA."].map((s, i) => (
                <li key={i} className="flex items-center gap-4 font-sans text-[17px]" style={{ color: INK }}>
                  <span className="is-round grid h-9 w-9 shrink-0 place-items-center font-display text-[16px]" style={{ background: GOLD, color: PAPER_LIGHT }}>{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <PrimaryBtn href={SIGNIN}>Connect your account →</PrimaryBtn>
              <SecondaryBtn href={START}>Start with your address</SecondaryBtn>
            </div>
            <p className="mt-4 font-sans text-[14px]" style={{ color: MUTED }}>It is quick, secure and free.</p>
          </div>
          {/* provenance card — House becomes HoWA */}
          <div className="ml-auto w-full max-w-[400px] rounded-[26px] p-[clamp(32px,3.4vw,52px)] text-center" style={{ background: PAPER, border: `1px solid ${RULE}`, boxShadow: "0 40px 90px -30px rgba(45,32,26,0.35)" }}>
            <div className="flex flex-col items-center gap-6">
              <Image src="/brand/wordmark-stacked.svg" alt="House of Willow Alexander" width={300} height={110} className="h-[104px] w-auto" />
              <span aria-hidden="true" className="font-display text-[32px] leading-none" style={{ color: GOLD }}>↓</span>
              <Image src="/brand/howa/howa-black.svg" alt="HoWA" width={160} height={58} className="h-[58px] w-auto" />
              <p className="mt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] leading-[1.7]" style={{ color: GOLD }}>Same history.<br />A brighter tomorrow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — Mind + hands */}
      <FadeSection eyebrow="Mind + hands" title={<>HoWA is the mind.<br />House is the hands.</>} img="/howa/microsite/dollhouse-clean.webp" alt="A detailed cutaway doll's house, warmly lit" bg={PAPER_LIGHT} mediaW="59%">
        <p>HoWA remembers what has happened, understands what may matter next and helps prepare an action. House of Willow Alexander provides the human craft and physical capability to deliver many of those actions.</p>
        <p className="mt-4">Other trusted providers will also join HoWA over time, so you keep one continuing Home Intelligence relationship rather than starting again with every supplier.</p>
      </FadeSection>

      {/* 08 — Useful tools */}
      <section style={{ background: PAPER }}>
        <div className={`${CONTAINER} py-[clamp(56px,8vw,88px)]`}>
          <Eyebrow>Useful tools</Eyebrow>
          <h2 className="max-w-[22ch] font-display leading-[0.98] tracking-[-0.025em] text-[clamp(34px,3.6vw,52px)]" style={{ color: INK }}>Five useful things you can do.</h2>
          <div className="mt-10 grid gap-[18px] lg:grid-cols-6">
            {TOOLS.map((t) => (
              <Link key={t.t} href={t.href} className={`flex flex-col p-6 no-underline transition-colors hover:brightness-[0.98] ${t.span}`} style={{ background: PAPER_LIGHT, border: `1px solid ${RULE}` }}>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="font-display text-[22px]" style={{ color: INK }}>{t.t}</h3>
                  <span className="shrink-0 px-2 py-0.5 font-sans text-[10px] uppercase tracking-[0.14em]" style={{ border: `1px solid ${GOLD}`, color: GOLD }}>{t.state}</span>
                </div>
                <p className="font-sans text-[15px] leading-[1.5]" style={{ color: MUTED }}>{t.b}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 09 — Home memory (image left) */}
      <FadeSection eyebrow="Home memory" title="Your home gets a memory. Then it starts gaining senses." img="/howa/microsite/home-memory.webp" alt="The HoWA home memory view on a tablet beside household paperwork" side="left" bg={PAPER_LIGHT} mediaW="55%">
        <p>Information is currently scattered across personal inboxes, invoices, utility messages, subscriptions, purchases, warranties, manuals, service records and smart-home apps. HoWA aims to give that information a durable place around the home.</p>
        <p className="mt-4">The idea is whole-home understanding: a device tells HoWA what changed; HoWA interprets the signal using history, preferences, timing and permissions.</p>
      </FadeSection>

      {/* 10 — HoWA Score */}
      <FadeSection eyebrow="HoWA Score" title="Think of it as a credit score for the physical home." img="/howa/microsite/score.webp" alt="The HoWA Score shown as 82 out of 100" bg={PAPER} mediaW="55%" objectPos="center">
        <ul className="flex flex-col gap-2">
          {["0 to 100 visible state of the home", "A separate confidence score", "The score belongs to the address, not a person", "Movements should be explainable", "You can correct facts and add evidence", "Paid plans, providers and advertisers cannot buy points"].map((p) => (
            <li key={p} className="flex gap-2.5 font-sans text-[16px] leading-[1.45]" style={{ color: INK }}><span aria-hidden="true" style={{ color: GOLD }}>·</span>{p}</li>
          ))}
        </ul>
        <p className="mt-5 font-sans text-[14px]" style={{ color: MUTED }}>It is not a survey, a valuation, a safety certificate, an insurance rating or a public social-status judgement.</p>
      </FadeSection>

      {/* 11 — Plans (no prices per V2) */}
      <section id="plans" className="scroll-mt-24" style={{ background: PAPER_LIGHT }}>
        <div className={`${CONTAINER} py-[clamp(56px,8vw,88px)]`}>
          <Eyebrow>Plans</Eyebrow>
          <h2 className="font-display leading-[0.98] tracking-[-0.025em] text-[clamp(34px,3.6vw,52px)]" style={{ color: INK }}>Choose how deep it goes.</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {PLANS.map((p) => (
              <div key={p.name} className="flex flex-col p-7" style={{ background: PAPER, border: `1px solid ${RULE}` }}>
                <h3 className="font-display text-[26px]" style={{ color: INK }}>{p.name}</h3>
                <p className="mt-1 font-sans text-[15px]" style={{ color: MUTED }}>{p.tag}</p>
                <ul className="mt-4 flex flex-1 flex-col gap-2">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2.5 font-sans text-[15px] leading-[1.45]" style={{ color: INK }}><span aria-hidden="true" style={{ color: GOLD }}>·</span>{it}</li>
                  ))}
                </ul>
                <Link href="/howa/plans" className="mt-6 inline-flex h-[48px] items-center justify-center whitespace-nowrap px-6 font-sans text-[12px] uppercase tracking-[0.14em] no-underline" style={{ border: `1px solid ${INK}`, color: INK }}>See plan details</Link>
              </div>
            ))}
          </div>
          <p className="mt-4 font-sans text-[13px]" style={{ color: MUTED }}>Plan pricing is confirmed before you choose. If you do not hold a regular service plan, a paid plan is not required to keep using House services. Regular garden, cleaning and full property plans move to HoWA Steward.</p>
        </div>
      </section>

      {/* 12 — HoWA Cinema (full-bleed) */}
      <section className="relative overflow-hidden" style={{ minHeight: 620, color: "#fff" }}>
        <Image src="/howa/microsite/bureau.webp" alt="" fill sizes="100vw" className="object-cover" aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(19,39,64,0.88) 0%, rgba(19,39,64,0.74) 38%, rgba(19,39,64,0.42) 68%, rgba(19,39,64,0.30) 100%)" }} />
        <div className={`${CONTAINER} relative z-10 py-[clamp(72px,10vw,120px)]`}>
          <div className="w-full max-w-[560px] md:w-[48%]">
            <Eyebrow color="#d8c9a6">HoWA Cinema</Eyebrow>
            <h2 className="font-display leading-[0.98] tracking-[-0.025em] text-[clamp(38px,4.2vw,58px)]">Step into the world of HoWA.</h2>
            <p className="mt-5 font-sans text-[18px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.85)" }}>There is the technology. And then there is the world we created to explain it. The Bureau is the world we created to make an invisible idea visible: one desk reads the House, another studies the rhythm of the Household. HoWA listens to both.</p>
            <p className="mt-4 font-display text-[24px]" style={{ color: "#d8c9a6" }}>Known. Missing. Due. Next.</p>
            <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <PrimaryBtn href="/howa/cinema" dark>Enter HoWA Cinema</PrimaryBtn>
            </div>
          </div>
        </div>
      </section>

      {/* 13 — Final activation (pale split) */}
      <FadeSection eyebrow="Final activation" title="Ready to meet your home?" img="/howa/microsite/ready.webp" alt="A phone showing the connected home beside the doll's house" bg={PAPER} mediaW="55%">
        <p>Start with your address. Connect your existing House relationship. Continue on Free or explore HoWA+ / Steward.</p>
        <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <PrimaryBtn href={START}>Start with your address</PrimaryBtn>
          <SecondaryBtn href={SIGNIN}>Sign in</SecondaryBtn>
        </div>
        <p className="mt-5 font-display text-[20px]" style={{ color: INK }}>The home remembers, so the household does not have to.</p>
      </FadeSection>

      {/* FAQ */}
      <section style={{ background: PAPER_LIGHT }}>
        <div className="mx-auto max-w-[900px] px-[clamp(20px,4vw,32px)] py-[88px]">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="font-display leading-[1.0] tracking-[-0.02em] text-[clamp(30px,3.6vw,44px)]" style={{ color: INK }}>The things people ask first.</h2>
          <dl className="mt-8" style={{ borderTop: `1px solid ${RULE}` }}>
            {FAQ.map((f) => (
              <div key={f.q} className="py-6" style={{ borderBottom: `1px solid ${RULE}` }}>
                <dt className="font-display text-[20px] leading-[1.25]" style={{ color: INK }}>{f.q}</dt>
                <dd className="mt-2 font-sans text-[16px] leading-[1.6]" style={{ color: MUTED }}>{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
