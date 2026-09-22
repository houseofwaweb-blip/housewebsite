import Link from "next/link";
import Image from "next/image";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";

/**
 * /howa/house-customers — the existing-customer HoWA Steward migration microsite
 * (further-amendments brief §27-§35). One job: move existing regular House
 * customers into HoWA Steward with as little friction as possible. Tight and
 * minimal, NOT a general HoWA marketing site (§27). House design system kept.
 *
 * Release honesty (HOWA_APP_LIVE=false): "Activate my home" → /howa/coming-soon;
 * "I already use HoWA" → the accounts portal.
 */

const PAPER = "#f6f1e9";
const PAPER_LIGHT = "#fbf8f2";
const INK = "#2d201a";
const MUTED = "#6f635c";
const RULE = "rgba(45,32,26,0.16)";
const GOLD = "#b49359";
const DARK = "#2d1d18";

const ACTIVATE = "/howa/coming-soon";
const SIGNIN = "https://accounts.willowalexander.co.uk/";
const PHONE = "0800 047 8738";
const EMAIL = "sales@willowalexander.co.uk";

export const metadata = {
  title: { absolute: "Your House service is moving into HoWA | House of Willow Alexander" },
  description:
    "Your regular House service is moving into HoWA Steward: one place for visits, changes, records and everything we learn about your home. The people looking after your home aren't changing.",
};

const CONTAINER = "mx-auto w-[min(1200px,calc(100%-96px))] max-[767px]:w-[calc(100%-40px)]";

function Eyebrow({ children, color = GOLD }: { children: React.ReactNode; color?: string }) {
  return <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color }}>{children}</p>;
}
function PrimaryBtn({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link href={href} className="inline-flex h-[54px] items-center justify-center whitespace-nowrap px-9 font-sans text-[13px] uppercase tracking-[0.14em] no-underline transition-[filter] hover:brightness-110" style={dark ? { background: PAPER_LIGHT, color: INK } : { background: INK, color: PAPER_LIGHT }}>{children}</Link>
  );
}
function SecondaryBtn({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link href={href} className="inline-flex h-[54px] items-center justify-center whitespace-nowrap px-9 font-sans text-[13px] uppercase tracking-[0.14em] no-underline transition-colors" style={{ border: `1px solid ${dark ? PAPER_LIGHT : INK}`, color: dark ? PAPER_LIGHT : INK }}>{children}</Link>
  );
}

// §29 — what is changing
const TODAY = ["Messages", "Emails", "Separate bookings", "Changes handled manually", "Information scattered between jobs"];
const WITH_HOWA = ["Your regular services", "Upcoming visits", "Changes", "Home information", "Job history", "Photos and notes"];

// §30 — what stays the same
const STAYS = [
  "Your agreed House service rate is retained when you activate.",
  "Your existing House team continues to provide your services.",
  "You can still change the frequency, duration or type of service you receive.",
  "Your visits are charged as before, at your agreed rate.",
];

// §31 — Steward inclusions
const STEWARD = [
  "Your Home Record",
  "Service management",
  "Household preferences",
  "Visit history",
  "Documents and notes",
  "Ask HoWA",
  "Planning and reminders",
  "One place to manage regular care",
];

// §32 — activation steps
const STEPS = [
  { t: "Confirm your home", b: "We use your address to start your Home Record." },
  { t: "Activate Steward", b: "Your regular House care is linked to your HoWA account." },
  { t: "Confirm your existing plan", b: "Review your service, frequency and current agreed rate." },
];

// §33 — why (vignettes)
const WHY = [
  "A gardener sees something that needs attention.",
  "A cleaner notices damage.",
  "A window cleaner spots a gutter problem.",
  "A designer specifies a material.",
];

// §34 — FAQ (the brief's seven)
const FAQ = [
  { q: "Do I have to join HoWA Steward to continue my regular House service?", a: "Yes. Regular House care is now operated through HoWA Steward." },
  { q: "Does the £29.99 include my gardening or cleaning visits?", a: "No. Steward is the home-management membership. Your visits remain separately charged at your agreed service rate." },
  { q: "What happens to my current price?", a: "Your existing agreed House service rate is retained when you activate." },
  { q: "Can I change my visits?", a: "Yes. Frequency, duration and the services you use can change as your home changes." },
  { q: "Does changing my visits cancel my membership?", a: "No. Changing or pausing visits does not, by itself, end your 12-month membership commitment. Membership and visit terms are separate, and we show both, including cancellation terms, before you activate." },
  { q: "What if I don't need a visit?", a: "You are not charged for a visit that does not take place, subject to the agreed cancellation terms." },
  { q: "Is House disappearing?", a: "No. House of Willow Alexander remains the service and design brand. HoWA is the system through which your home, bookings and records are managed." },
  { q: "Do I need another account?", a: "You have one HoWA household account and one Home Record. House services sit inside it." },
];

export default function HouseCustomersPage() {
  return (
    <div className="howa-surface relative overflow-x-hidden" style={{ background: PAPER, color: INK }}>
      <MetaViewContent contentId="howa_house_customers" contentName="HoWA Steward migration" contentCategory="howa_marketing" />

      {/* 28 — Hero */}
      <section className="relative overflow-hidden" style={{ background: PAPER, minHeight: 600 }}>
        <div className="absolute inset-y-0 right-0 hidden w-[56%] md:block">
          <Image src="/howa/microsite/hero-dollhouse.webp" alt="A warm Georgian home cared for by the House" fill priority sizes="56vw" className="object-cover" style={{ objectPosition: "55% center" }} />
          <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(90deg, ${PAPER} 0%, ${PAPER}fa 6%, ${PAPER}e0 16%, ${PAPER}85 28%, ${PAPER}1f 42%, ${PAPER}00 54%)` }} />
        </div>
        <div className={`${CONTAINER} relative z-10`}>
          <div className="w-full max-w-[560px] pb-[72px] pt-[clamp(48px,8vw,96px)] md:w-[48%]">
            <div className="mb-6 flex items-center gap-4">
              <Image src="/brand/wordmark.svg" alt="House of Willow Alexander" width={200} height={80} className="h-[40px] w-auto" />
              <span aria-hidden className="font-display text-[22px]" style={{ color: GOLD }}>+</span>
              <Image src="/brand/howa/howa-black.svg" alt="HoWA" width={120} height={44} className="h-[26px] w-auto" />
            </div>
            <h1 className="font-display leading-[0.98] tracking-[-0.03em] text-[clamp(40px,5vw,74px)]" style={{ color: INK }}>
              Your House service is moving into HoWA.
            </h1>
            <p className="mt-6 max-w-[480px] font-sans text-[19px] leading-[1.5]" style={{ color: MUTED }}>
              The people looking after your home aren&rsquo;t changing. How
              everything is organised is.
            </p>
            <p className="mt-4 max-w-[480px] font-sans text-[17px] leading-[1.55]" style={{ color: MUTED }}>
              Your regular service will now be managed through{" "}
              <strong style={{ color: INK }}>HoWA Steward</strong>, giving you one
              place for visits, changes, records and everything we learn about
              your home.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <PrimaryBtn href={ACTIVATE}>Register for early access →</PrimaryBtn>
              <SecondaryBtn href={SIGNIN}>I already use HoWA</SecondaryBtn>
            </div>
          </div>
        </div>
        <div className="relative block h-[280px] w-full md:hidden">
          <Image src="/howa/microsite/hero-dollhouse.webp" alt="" fill sizes="100vw" className="object-cover" aria-hidden="true" />
        </div>
      </section>

      {/* 29 — What is changing */}
      <section style={{ background: PAPER_LIGHT, borderTop: `1px solid ${RULE}` }}>
        <div className={`${CONTAINER} py-[clamp(56px,8vw,96px)]`}>
          <Eyebrow>What is changing</Eyebrow>
          <h2 className="max-w-[20ch] font-display leading-[0.98] tracking-[-0.025em] text-[clamp(34px,3.8vw,54px)]" style={{ color: INK }}>A simpler way to look after home.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="p-7" style={{ background: PAPER, border: `1px solid ${RULE}` }}>
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em]" style={{ color: MUTED }}>Today</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {TODAY.map((t) => (
                  <li key={t} className="flex gap-2.5 font-sans text-[17px] leading-[1.45]" style={{ color: MUTED }}><span aria-hidden style={{ color: MUTED }}>·</span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="p-7" style={{ background: PAPER, border: `1px solid ${GOLD}` }}>
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>With HoWA</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {WITH_HOWA.map((t) => (
                  <li key={t} className="flex gap-2.5 font-sans text-[17px] leading-[1.45]" style={{ color: INK }}><span aria-hidden style={{ color: GOLD }}>·</span>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 font-display text-[clamp(22px,2.4vw,30px)]" style={{ color: INK }}>All connected to one home.</p>
        </div>
      </section>

      {/* 30 — What stays the same */}
      <section style={{ background: PAPER }}>
        <div className={`${CONTAINER} grid items-center gap-[clamp(32px,5vw,72px)] py-[clamp(56px,8vw,96px)] lg:grid-cols-[0.9fr_1.1fr]`}>
          <div className="relative order-2 aspect-[4/3] w-full overflow-hidden rounded-[20px] lg:order-1" style={{ border: `1px solid ${RULE}` }}>
            <Image src="/howa/microsite/tools-table.webp" alt="House Approved tools laid out, the same standard of care" fill sizes="(max-width:1024px) 100vw, 520px" className="object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <Eyebrow>What stays the same</Eyebrow>
            <h2 className="font-display leading-[0.98] tracking-[-0.025em] text-[clamp(34px,3.8vw,54px)]" style={{ color: INK }}>Still the House you know.</h2>
            <ul className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2" style={{ borderTop: `1px solid ${RULE}` }}>
              {STAYS.map((s) => (
                <li key={s} className="flex gap-3 pt-5 font-sans text-[18px] leading-[1.45]" style={{ color: INK }}><span aria-hidden style={{ color: GOLD }}>·</span>{s}</li>
              ))}
            </ul>
            <p className="mt-8 max-w-[62ch] font-sans text-[18px] leading-[1.6]" style={{ color: MUTED }}>
              The difference is that HoWA now remembers the relationship around your
              home, so the next visit doesn&rsquo;t begin from zero.
            </p>
          </div>
        </div>
      </section>

      {/* 31 — Steward requirement (price visible and unambiguous) */}
      <section id="steward" className="scroll-mt-24" style={{ background: DARK, color: PAPER_LIGHT }}>
        <div className={`${CONTAINER} grid items-start gap-[clamp(32px,5vw,72px)] py-[clamp(56px,8vw,104px)] lg:grid-cols-[1fr_1fr]`}>
          <div>
            <Eyebrow color="#d8c9a6">HoWA Steward</Eyebrow>
            <h2 className="font-display leading-[0.98] tracking-[-0.025em] text-[clamp(34px,3.8vw,54px)]">Your regular care now includes HoWA Steward.</h2>
            <p className="mt-8 font-display text-[clamp(44px,6vw,80px)] leading-none" style={{ color: "#fff" }}>£29.99<span className="font-sans text-[18px]" style={{ color: "rgba(255,255,255,0.7)" }}> a month</span></p>
            <p className="mt-3 font-sans text-[16px] uppercase tracking-[0.16em]" style={{ color: "#d8c9a6" }}>12-month membership · £359.88 total</p>
            <p className="mt-6 max-w-[46ch] font-sans text-[17px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.82)" }}>
              Your individual service visits continue to be charged separately at
              your agreed, pro-rated House rate.
            </p>
            <p className="mt-4 max-w-[46ch] font-sans text-[17px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.82)" }}>
              Steward includes premium support, 10% off the House shop and House
              services, and faster responses to your requests.
            </p>
            <div className="mt-8">
              <PrimaryBtn href={ACTIVATE} dark>Register for early access →</PrimaryBtn>
            </div>
          </div>
          <div className="w-full rounded-[20px] p-7" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.16)" }}>
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#d8c9a6" }}>Your regular care in HoWA</p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {STEWARD.map((s) => (
                <li key={s} className="flex gap-2.5 font-sans text-[16px] leading-[1.4]" style={{ color: PAPER_LIGHT }}><span aria-hidden style={{ color: "#d8c9a6" }}>·</span>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 32 — How activation works */}
      <section id="activate" className="scroll-mt-24" style={{ background: PAPER }}>
        <div className={`${CONTAINER} py-[clamp(56px,8vw,96px)]`}>
          <Eyebrow>How activation works</Eyebrow>
          <h2 className="font-display leading-[0.98] tracking-[-0.025em] text-[clamp(34px,3.8vw,54px)]" style={{ color: INK }}>Three simple steps.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.t} className="p-7" style={{ background: PAPER_LIGHT, border: `1px solid ${RULE}` }}>
                <span className="is-round grid h-10 w-10 place-items-center rounded-full font-display text-[18px]" style={{ background: GOLD, color: PAPER_LIGHT }}>{i + 1}</span>
                <h3 className="mt-4 font-display text-[22px]" style={{ color: INK }}>{s.t}</h3>
                <p className="mt-2 font-sans text-[16px] leading-[1.5]" style={{ color: MUTED }}>{s.b}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 font-display text-[clamp(22px,2.4vw,30px)]" style={{ color: INK }}>That&rsquo;s it.</p>
          <div className="mt-6">
            <PrimaryBtn href={ACTIVATE}>Register for early access →</PrimaryBtn>
          </div>
        </div>
      </section>

      {/* 33 — Why we are doing it */}
      <section className="relative overflow-hidden" style={{ background: PAPER_LIGHT, borderTop: `1px solid ${RULE}` }}>
        <div className={`${CONTAINER} grid items-center gap-[clamp(32px,5vw,72px)] py-[clamp(56px,8vw,104px)] lg:grid-cols-[1fr_1fr]`}>
          <div>
            <Eyebrow>Why we are doing it</Eyebrow>
            <h2 className="max-w-[22ch] font-display leading-[0.98] tracking-[-0.025em] text-[clamp(34px,3.8vw,54px)]" style={{ color: INK }}>Because your home shouldn&rsquo;t start again every visit.</h2>
            <ul className="mt-8 flex max-w-[60ch] flex-col gap-3">
              {WHY.map((w) => (
                <li key={w} className="font-sans text-[19px] leading-[1.5]" style={{ color: MUTED }}>{w}</li>
              ))}
            </ul>
            <p className="mt-6 max-w-[60ch] font-sans text-[18px] leading-[1.6]" style={{ color: MUTED }}>
              Today, those things can disappear between services. With HoWA, useful
              information comes back to the home.
            </p>
            <p className="mt-8 font-display leading-[1.05] text-[clamp(26px,3.2vw,44px)]" style={{ color: INK }}>
              The work gets done.<br />The home remembers.
            </p>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px]" style={{ border: `1px solid ${RULE}` }}>
            <Image src="/howa/microsite/garden-visit.webp" alt="A House gardener at work, noticing what the home needs" fill sizes="(max-width:1024px) 100vw, 560px" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 34 — FAQ */}
      <section style={{ background: PAPER }}>
        <div className="mx-auto max-w-[900px] px-[clamp(20px,4vw,32px)] py-[clamp(56px,8vw,96px)]">
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

      {/* 35 — Final CTA + contact */}
      <section style={{ background: DARK, color: PAPER_LIGHT }}>
        <div className={`${CONTAINER} py-[clamp(64px,9vw,120px)] text-center`}>
          <h2 className="mx-auto max-w-[20ch] font-display leading-[1.02] tracking-[-0.02em] text-[clamp(34px,4.4vw,62px)]">
            Everything your House already knows. Finally in one place.
          </h2>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryBtn href={ACTIVATE} dark>Register for early access →</PrimaryBtn>
            <SecondaryBtn href="/contact" dark>Speak to the House</SecondaryBtn>
          </div>
          <div className="mt-10 flex flex-col items-center gap-1 font-sans text-[15px]" style={{ color: "rgba(255,255,255,0.75)" }}>
            <p className="mb-1 font-sans text-[12px] uppercase tracking-[0.2em]" style={{ color: "#d8c9a6" }}>Need help?</p>
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="no-underline hover:opacity-80" style={{ color: PAPER_LIGHT }}>{PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="no-underline hover:opacity-80" style={{ color: PAPER_LIGHT }}>{EMAIL}</a>
            <p className="mt-1">Monday to Friday, 8am to 6pm</p>
          </div>
        </div>
      </section>
    </div>
  );
}
