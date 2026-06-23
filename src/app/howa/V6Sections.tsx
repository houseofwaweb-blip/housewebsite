import Image from "next/image";

/* ──────────────────────────────────────────────────────────────────────
   Sections ported from askhowa.co.uk (app/v6/V6Sections.tsx) into the
   House /howa surface. Verbatim port — same Tailwind v4 + @theme tokens
   and utility classes (.handwriting / .font-display / .font-italic-display
   / .smallcaps) already present in globals.css. Adaptations for this site:
     • image paths .png → .webp (converted with sharp into public/home-v4/)
     • waitlist CTA → /howa/coming-soon (this site's waitlist route)
   Copy rules preserved: never the word "AI"; no em dashes.

   NOTE: V6HowItWorks and V6Stewardship from the donor file are NOT included
   here — they already live as their own components in this directory.
   ────────────────────────────────────────────────────────────────────── */

const hand = { className: "handwriting" };

/* ============================================================
   WHAT HoWA IS  —  the positioning line. Places HoWA above the
   categories it sits on top of (home apps, smart-home, marketplaces,
   insurers).
   ============================================================ */
export function V6WhatItIs() {
  const beneath = [
    { who: "Home apps", does: "organise" },
    { who: "Smart-home", does: "controls devices" },
    { who: "Marketplaces", does: "find trades" },
    { who: "Insurers", does: "price risk" },
  ];
  return (
    <section id="what" className="bg-[#f4f1e9] py-16 lg:py-24 border-t border-[color:var(--color-ink)]/8 scroll-mt-20">
      <div className="max-w-[940px] mx-auto px-6 sm:px-10 text-center">
        <p className="smallcaps text-[12px] tracking-[0.2em] text-[color:var(--color-gold-deep)] mb-5">What HoWA is</p>
        <p className="font-italic-display text-[clamp(18px,1.8vw,24px)] text-[color:var(--color-ink-soft)] mb-6">
          Not a smart-home gadget. Not a folder of receipts. Not a booking app.
        </p>
        <h2 className="font-display text-[clamp(28px,3.4vw,46px)] leading-[1.12] tracking-[-0.01em] text-[color:var(--color-ink)]">
          HoWA is the layer above them, the one that{" "}
          <span className="font-italic-display text-[#c5a960]">knows your home</span>, remembers
          what&apos;s happened, and tells you what to do about it.
        </h2>
      </div>

      <div className="max-w-[1040px] mx-auto px-6 sm:px-10 mt-12 lg:mt-14">
        <figure className="relative w-full aspect-[1896/829] rounded-lg overflow-hidden bg-[#27384c] shadow-[0_34px_80px_-36px_rgba(20,15,5,0.7)] ring-1 ring-[color:var(--color-gold)]/15">
          <Image
            src="/home-v4/v6-layer-above.webp"
            alt="A Georgian cutaway house with HoWA's intelligence layer floating above it as a constellation of golden nodes, on a deep navy ground."
            fill
            sizes="(max-width:1024px) 92vw, 1040px"
            className="object-cover"
          />
          <figcaption className="absolute inset-0 pointer-events-none">
            <div className="hidden md:block absolute top-[11%] left-[4.5%] max-w-[190px]">
              <div className="flex items-center gap-2">
                <span aria-hidden className="w-6 h-px bg-[color:var(--color-gold)]/80" />
                <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-[#f3ede0]/90">The HoWA layer</span>
              </div>
              <p className="font-mono text-[11px] tracking-[0.02em] text-[#f3ede0]/55 pl-8 mt-1">understands, then acts</p>
            </div>
            <div className="hidden md:block absolute top-[60%] right-[4.5%] max-w-[200px] text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-[#f3ede0]/90">Your home</span>
                <span aria-hidden className="w-6 h-px bg-[color:var(--color-gold)]/80" />
              </div>
              <p className="font-mono text-[11px] tracking-[0.02em] text-[#f3ede0]/55 pr-8 mt-1">every room, asset and document</p>
            </div>
            <span className="hidden sm:block absolute bottom-[7%] left-[4.5%] font-mono text-[10px] tracking-[0.22em] uppercase text-[#f3ede0]/40">Fig. 01 &middot; the layer above</span>
          </figcaption>
        </figure>
      </div>

      <div className="max-w-[1040px] mx-auto px-6 sm:px-10 mt-8 lg:mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[color:var(--color-gold)]/20 rounded-lg overflow-hidden border border-[color:var(--color-gold)]/20">
          {beneath.map((c) => (
            <div key={c.who} className="bg-[#f4f1e9] px-5 py-6 text-center">
              <p className="font-display text-[17px] mb-1">{c.who}</p>
              <p className="text-[14px] text-[color:var(--color-ink-soft)]/75">{c.does}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-8 text-[clamp(16px,1.6vw,20px)] leading-[1.5] text-[color:var(--color-ink-soft)] max-w-[660px] mx-auto">
          None of them remember your home, or turn what they know into the next right action.{" "}
          <span className="font-italic-display text-[color:var(--color-gold-deep)]">HoWA does.</span>
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   ONE SYSTEM, ONE LIVING RECORD
   ============================================================ */
export function V6OneRecord() {
  const points = [
    { n: "01", t: "One address.", b: "Every detail, decision and document connected to your home." },
    { n: "02", t: "Always up to date.", b: "Records update with you, so everyone works from the same truth." },
    { n: "03", t: "Passes on with the home.", b: "When you sell, its memory transfers with the property, with your permission." },
  ];
  return (
    <section id="record" className="bg-[#f4f1e9] py-16 lg:py-20 scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        <div className="lg:col-span-3">
          <p className={`${hand.className} text-[21px] text-[color:var(--color-gold-deep)] mb-2`}>One continuous record.</p>
          <h2 className="font-display text-[clamp(29px,2.8vw,42px)] leading-[1.05] tracking-[-0.01em]">
            One address. One record.
            <br />
            <span className="font-italic-display text-[#c5a960]">Three depths of care.</span>
          </h2>
          <p className="mt-4 text-[17px] leading-[1.55] text-[color:var(--color-ink-soft)] max-w-[300px]">
            Everything HoWA learns about your home lives in one place, and when you sell, its memory passes on with it.
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="relative w-full aspect-[4/3]">
            <Image src="/home-v4/v6-one-record-v2.webp" alt="Three phones in the Assistant, Housekeeper and Steward colourways, with the dollhouse softly behind." fill sizes="(max-width:1024px) 92vw, 45vw" className="object-contain" />
          </div>
        </div>
        <div className="lg:col-span-4 space-y-6">
          {points.map((p) => (
            <div key={p.n} className="flex gap-4">
              <span className="font-display text-[20px] text-[#c5a960] tabular-nums">{p.n}</span>
              <div>
                <p className="font-display text-[19px] leading-[1.2] mb-1">{p.t}</p>
                <p className="text-[15.5px] leading-[1.5] text-[color:var(--color-ink-soft)] max-w-[260px]">{p.b}</p>
              </div>
            </div>
          ))}
        </div>
        </div>

        <RecordDataModel />
      </div>
    </section>
  );
}

function RecordDataModel() {
  const rows: { t: string; tag: "live" | "coming" }[] = [
    { t: "Captures context once: documents, appliances, jobs, garden and risks, in one place.", tag: "live" },
    { t: "Reads dates, suppliers and warranty periods from the things you upload.", tag: "coming" },
    { t: "Transfers with the property when you sell, with your permission, BASPI ready.", tag: "coming" },
  ];
  return (
    <div className="mt-14 lg:mt-16 border-t border-[color:var(--color-gold)]/20 pt-10">
      <p className="smallcaps text-[11px] tracking-[0.18em] text-[color:var(--color-gold-deep)] mb-5 text-center">
        How the record is built
      </p>
      <figure className="relative w-full aspect-[1672/941] rounded-lg overflow-hidden bg-[#27384c] shadow-[0_30px_70px_-34px_rgba(20,15,5,0.6)] ring-1 ring-[color:var(--color-gold)]/20 mb-9">
        <Image
          src="/home-v4/v6-home-graph.webp"
          alt="A blueprint of the HoWA home record: Home branches into Spaces, each Space into its Assets, and each Asset into a dated timeline of Events."
          fill
          sizes="(max-width:1024px) 92vw, 1180px"
          className="object-cover"
        />
      </figure>
      <ul className="max-w-[760px] mx-auto space-y-3.5">
        {rows.map((r) => (
          <li key={r.t} className="flex items-start gap-3 text-[15.5px] leading-[1.5] text-[color:var(--color-ink-soft)]">
            <span className="mt-0.5 shrink-0"><Tick /></span>
            <span className="flex-1">{r.t}</span>
            {r.tag === "coming" && <StatusTag kind="coming" />}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusTag({ kind }: { kind: "live" | "coming" }) {
  if (kind === "live") {
    return (
      <span className="shrink-0 mt-0.5 smallcaps text-[9.5px] tracking-[0.14em] rounded-full px-2 py-0.5 bg-[color:var(--color-howa-green)]/12 text-[color:var(--color-howa-green)]">
        Live now
      </span>
    );
  }
  return (
    <span className="shrink-0 mt-0.5 smallcaps text-[9.5px] tracking-[0.14em] rounded-full px-2 py-0.5 border border-[color:var(--color-ink)]/20 text-[color:var(--color-ink-soft)]/65">
      Coming
    </span>
  );
}

/* ============================================================
   TRUST & PRIVACY — your record is yours; not sold, not used to
   train anyone's models.
   ============================================================ */
export function V6Trust() {
  return (
    <section id="trust" className="bg-[#f4f1e9] border-y border-[color:var(--color-ink)]/8">
      <div className="max-w-[880px] mx-auto px-6 sm:px-10 py-12 lg:py-14 text-center">
        <ShieldIcon className="mx-auto w-7 h-7 text-[color:var(--color-gold-deep)] mb-4" />
        <p className="font-display text-[clamp(19px,2vw,26px)] leading-[1.3] text-[color:var(--color-ink)] max-w-[660px] mx-auto">
          Your home&apos;s record belongs to you. We don&apos;t sell it, and we don&apos;t use it to train anyone&apos;s models.
        </p>
        <p className="mt-3 text-[15.5px] leading-[1.55] text-[color:var(--color-ink-soft)]">
          You choose what is shared, with whom, and every access is logged.
        </p>
      </div>
    </section>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" />
      <path d="M9.2 12.2l1.9 1.9 3.7-4" />
    </svg>
  );
}

/* ============================================================
   THREE THINGS HoWA DOES TODAY — Ask HoWA · Scans · The Logbook.
   ============================================================ */
export function V6ThreeThings() {
  const cards = [
    {
      key: "ask",
      icon: <AskIcon />,
      title: "Ask HoWA",
      body: "Ask anything about your home, and get an answer from your home, not the internet.",
      examples: ["When was the boiler last serviced?", "What did we spend on plumbing last year?"],
      foot: "Answers from your own record, and shows the document it relied on.",
    },
    {
      key: "scan",
      icon: <ScanIcon />,
      title: "Scans",
      kicker: "repair · garden · room",
      body: "Point your phone at a problem. HoWA tells you what it is, how urgent it is, and what to do next.",
      foot: "Every scan saves to your home record.",
    },
    {
      key: "log",
      icon: <LogbookIcon />,
      title: "The Logbook",
      body: "Every manual, warranty, certificate, quote and job, in one place that remembers the dates for you.",
      foot: "Reminders for servicing, warranties and renewals come to you.",
    },
  ];
  return (
    <section id="does" className="bg-[#f4f1e9] pt-16 lg:pt-20 pb-10 scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
        <div className="text-center max-w-[680px] mx-auto mb-12">
          <p className="smallcaps text-[12px] tracking-[0.2em] text-[color:var(--color-gold-deep)] mb-3">Live today</p>
          <h2 className="font-display text-[clamp(28px,2.8vw,42px)] leading-[1.08] tracking-[-0.01em]">
            Three things HoWA does <span className="font-italic-display text-[#c5a960]">today</span>.
          </h2>
          <p className="mt-4 text-[17px] leading-[1.55] text-[color:var(--color-ink-soft)]">
            All of this works right now, the foundation the rest is built on.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div key={c.key} className="relative rounded-lg border border-[color:var(--color-gold)]/25 bg-white/45 p-7 flex flex-col">
              <div className="mb-5">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[color:var(--color-gold)]/12 text-[color:var(--color-gold-deep)]">
                  {c.icon}
                </span>
              </div>
              <h3 className="font-display text-[22px] leading-[1.1]">{c.title}</h3>
              {c.kicker && (
                <p className="smallcaps text-[10.5px] tracking-[0.16em] text-[color:var(--color-gold-deep)] mt-1.5">{c.kicker}</p>
              )}
              <p className="text-[16px] leading-[1.5] text-[color:var(--color-ink-soft)] mt-3">{c.body}</p>
              {c.examples && (
                <ul className="space-y-1.5 mt-4">
                  {c.examples.map((e) => (
                    <li key={e} className="font-italic-display text-[16px] text-[color:var(--color-ink)]/75 leading-[1.3]">
                      &ldquo;{e}&rdquo;
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-auto pt-4 border-t border-[color:var(--color-ink)]/8 text-[14px] leading-[1.45] text-[color:var(--color-ink-soft)]/80">
                {c.foot}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROTECTION — the cost of a home isn't the mortgage. Navy register.
   ============================================================ */
export function V6Protection() {
  const flow = ["Review", "Plan", "Setup", "Evidence", "Renewal readiness"];
  return (
    <section id="protection" className="relative text-[#f3ede0] overflow-hidden scroll-mt-20" style={{ background: "#27384c" }}>
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-7">
        <p className="smallcaps text-[11px] tracking-[0.18em] text-[#f3ede0]/60 mb-5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a960]" /> Protection
        </p>
        <h2 className="font-display text-[clamp(30px,3.4vw,50px)] leading-[1.08] tracking-[-0.01em] text-[#f3ede0] max-w-[900px]">
          The cost of a home isn&apos;t the mortgage.
        </h2>
        <p className="mt-4 font-display text-[clamp(20px,2vw,30px)] leading-[1.25] text-[#f3ede0]/80 max-w-[780px]">
          It&apos;s the <span className="font-italic-display text-[#c5a960]">leak</span> you didn&apos;t catch, the{" "}
          <span className="font-italic-display text-[#c5a960]">renewal</span> you missed, the{" "}
          <span className="font-italic-display text-[#c5a960]">damp</span> you found too late.
        </p>
        <p className="mt-8 text-[clamp(17px,1.7vw,21px)] leading-[1.5] text-[#f3ede0]/90 max-w-[680px]">
          HoWA watches for the things that turn into bills, and builds the evidence that you cared for your home.
        </p>

        <div className="mt-10 flex items-center flex-wrap gap-x-2.5 gap-y-3">
          {flow.map((s, i) => (
            <span key={s} className="flex items-center gap-2.5">
              <span className={"rounded-md border px-3.5 py-2 font-mono text-[12.5px] tracking-[0.03em] " + (i === flow.length - 1 ? "border-[#c5a960]/55 text-[#c5a960]" : "border-[#f3ede0]/25 text-[#f3ede0]/90")}>
                {s}
              </span>
              {i < flow.length - 1 && (
                <span aria-hidden className="text-[#c5a960] text-[16px]">→</span>
              )}
            </span>
          ))}
          <span className="ml-1 smallcaps text-[9px] tracking-[0.14em] rounded-full px-2 py-0.5 border border-[#f3ede0]/25 text-[#f3ede0]/55">
            Coming
          </span>
        </div>

        <p className="mt-8 text-[12.5px] leading-[1.5] text-[#f3ede0]/45 max-w-[560px]">
          HoWA prepares evidence and prefills your details for renewal. It does not give insurance advice or arrange cover.
        </p>
        </div>

        <div className="lg:col-span-5">
          <div className="relative w-full aspect-[1122/1402] max-w-[420px] mx-auto lg:ml-auto rounded-lg overflow-hidden ring-1 ring-[color:var(--color-gold)]/20 shadow-[0_30px_70px_-34px_rgba(0,0,0,0.75)]">
            <Image
              src="/home-v4/v6-protection.webp"
              alt="The dollhouse on deep navy with HoWA's gold monitoring nodes placed on the home's vulnerable points, watching for the things that turn into bills."
              fill
              sizes="(max-width:1024px) 80vw, 420px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIAL
   ============================================================ */
export function V6Testimonial() {
  return (
    <section className="bg-[#f4f1e9] py-14 border-t border-[color:var(--color-ink)]/8">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5">
          <p className="font-italic-display text-[#c5a960] text-[41px] leading-none mb-2">&ldquo;</p>
          <p className="font-italic-display text-[clamp(23px,2vw,32px)] leading-[1.25] text-[color:var(--color-ink)]">
            HoWA brings calm to the complexity of owning a home.
          </p>
        </div>
        <div className="lg:col-span-4">
          <p className="text-[16.5px] leading-[1.55] text-[color:var(--color-ink-soft)]">
            For the first time we have one place for everything. It saves time, money and so much mental space.
          </p>
          <p className="mt-3 text-[15px] text-[color:var(--color-ink-soft)]/70">Charlotte M., Homeowner</p>
        </div>
        <div className="lg:col-span-3">
          <div className="relative w-full aspect-[4/3] max-w-[220px] ml-auto">
            <Image src="/home-v4/v6-review-house-v2.webp" alt="A Georgian dollhouse, warmly lit." fill sizes="220px" className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   STATS BAR
   ============================================================ */
export function V6Stats() {
  const stats = [
    { n: "14", l: "Rooms & spaces" },
    { n: "1,200+", l: "Items recorded" },
    { n: "87%", l: "Home health" },
    { n: "100%", l: "Your data. Your privacy." },
  ];
  return (
    <section className="bg-[#f4f1e9] py-12 border-t border-[color:var(--color-ink)]/8">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 flex flex-col lg:flex-row items-center gap-8">
        <div className="shrink-0 max-w-[230px]">
          <p className="font-display text-[21px] leading-[1.15]">A typical home.</p>
          <p className="text-[15px] text-[color:var(--color-ink-soft)]/70 mt-1">Illustrative of what HoWA holds for a home like yours.</p>
        </div>
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.l}>
              <p className="font-display text-[25px] leading-none">{s.n}</p>
              <p className="text-[12.5px] text-[color:var(--color-ink-soft)]/70 mt-1.5 leading-[1.3]">{s.l}</p>
            </div>
          ))}
        </div>
        <div className="relative w-[120px] aspect-[4/3] shrink-0">
          <Image src="/home-v4/v6-hero-house.webp" alt="" fill sizes="120px" className="object-contain" />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA BAND (olive)
   ============================================================ */
export function V6Cta() {
  return (
    <section className="text-[#f3ede0]" style={{ background: "#5f6a49" }}>
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 py-12 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-[clamp(25px,2.4vw,36px)] leading-[1.1]">
            Start with your address.
            <br className="hidden sm:block" /> Meet the home that remembers.
          </h2>
        </div>
        <div className="flex items-center gap-5">
          <p className="text-[15.5px] text-[#f3ede0]/85 max-w-[220px] hidden sm:block">
            Join the waitlist and be among the first to bring HoWA to your home.
          </p>
          <a href="/howa/coming-soon" className="inline-flex items-center gap-2 rounded-md bg-[#f3ede0] px-7 py-3.5 text-[16px] text-[#27384c] hover:bg-white transition-colors whitespace-nowrap">
            Join the waitlist
          </a>
          <p className={`${hand.className} hidden lg:block text-[20px] text-[#f3ede0]/80`}>We&apos;d love to have you.</p>
        </div>
      </div>
    </section>
  );
}

/* ── capability icons (Three things HoWA does) ── */
function AskIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 11.5a8.5 8.5 0 0 1-12.1 7.7L3 21l1.8-5.9A8.5 8.5 0 1 1 21 11.5z" />
      <path d="M9.7 9.4a2.3 2.3 0 0 1 4.5.7c0 1.5-2.2 2.3-2.2 2.3" />
      <path d="M12 15.6h.01" />
    </svg>
  );
}
function ScanIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8" />
      <path d="M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8" />
      <path d="M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16" />
      <path d="M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
      <circle cx="12" cy="12" r="2.4" />
    </svg>
  );
}
function LogbookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6.5 3H19a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 18.5v-13A2.5 2.5 0 0 1 6.5 3z" />
      <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
      <path d="M9 7.5h7M9 11h7" />
    </svg>
  );
}

/* ── shared ── */
function Tick({ light }: { light?: boolean }) {
  const c = light ? "#c5a960" : "var(--color-howa-green)";
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}
