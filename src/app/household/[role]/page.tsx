import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SafetyBoundary } from "@/components/marketing/HowaModules";

/**
 * /household/[role] — a free Household door (launch read section 6, per-role).
 * Layout mirrors the askhowa reference role pages (hero + what it reads/saves/
 * next action + "inside the room" features), in the House palette. The two paid
 * roles (Housekeeper, Steward) live at /howa/housekeeper and /howa/steward.
 */

interface Role {
  name: string;
  color: string;
  img: string;
  headline: string;
  forLine: string;
  intro: string;
  reads: string;
  saves: string;
  nextAction: string;
  cta: string;
  safety?: boolean;
  features: { title: string; body: string }[];
}

const ROLES: Record<string, Role> = {
  gardener: {
    name: "The Gardener",
    color: "#5f6f3c",
    img: "/howa/household/gardener.webp",
    headline: "Your garden knows what it needs. Meet the one who listens.",
    forLine: "For the garden that needs reading before it needs doing.",
    intro:
      "Scan your garden, one photo is enough. The Gardener returns what is thriving, what is struggling, and what this season asks of it. Free, in about a minute.",
    reads: "Plants · Seasons · Aspect · Soil clues · Planting plans · Visit history",
    saves: "Garden notes, plant concerns, seasonal plan and visit history.",
    nextAction: "Care plan, reminder, quote, visit or design brief.",
    cta: "Scan the garden free",
    features: [
      { title: "Garden plans", body: "A season-by-season plan drawn from your photo and your address." },
      { title: "Plant care reminders", body: "Nudges for watering, feeding and pruning, timed to what you actually grow." },
      { title: "Seasonal tasks", body: "What the garden needs this month, before it gets away from you." },
      { title: "Plant library", body: "Every plant you have, identified and remembered, with how to care for it." },
      { title: "Garden journal", body: "Photos, notes and visits kept over time, so the garden's story is never lost." },
    ],
  },
  handyman: {
    name: "The Handyman",
    color: "#b3623a",
    img: "/howa/household/handyman.webp",
    headline: "Something's not right. Show the Handyman before you call anyone.",
    forLine: "For the thing that is broken, dripping, loose, clicking or making you wonder who to call.",
    intro:
      "Photograph a fault. The Handyman returns a plain-English view of what it likely is, how urgent it may be, and what a fair fix should look like. Free.",
    reads: "Faults · Fittings · Wear · Urgency · Likely cause · Fair cost",
    saves: "Fault photo, likely issue, urgency, quote range and repair history.",
    nextAction: "Book help, save for later, add a warranty or set a reminder.",
    cta: "Photograph a fault",
    safety: true,
    features: [
      { title: "Fault diagnosis", body: "A plain-English read on what the fault likely is, and how serious it looks." },
      { title: "Urgency flags", body: "Whether it can wait, should be watched, or needs a professional now." },
      { title: "Fair-cost guide", body: "A sense of what a reasonable fix should cost before you book." },
      { title: "Repair history", body: "Every fix kept against the address, so nothing is repeated blindly." },
      { title: "Warranty capture", body: "Save the guarantee for the part or the work, filed where you can find it." },
    ],
  },
  designer: {
    name: "The Designer",
    color: "#7c5a78",
    img: "/howa/household/designer.webp",
    headline: "You can picture it. The Designer helps you see it.",
    forLine: "For the room or garden you can imagine, but cannot yet see clearly.",
    intro:
      "Send one photo. A room or garden becomes a considered direction: mood, materials, planting, palette or layout. Free.",
    reads: "Rooms · Light · Proportion · Palette · Materials · Planting",
    saves: "Idea, style direction, design brief and project memory.",
    nextAction: "Save the scheme, speak to a studio, or plan the project.",
    cta: "Send one photo",
    features: [
      { title: "Direction & mood", body: "A considered starting point for the space, not a hundred confusing options." },
      { title: "Palette & materials", body: "Colours, finishes and textures that will actually sit well together." },
      { title: "Design brief", body: "A clear brief you can hand to a studio, a maker or the House." },
      { title: "Supplier notes", body: "Where the pieces might come from, saved against the project." },
      { title: "Project memory", body: "Every decision, drawing and finish kept so the home remembers how it was made." },
    ],
  },
  surveyor: {
    name: "The Surveyor",
    color: "#4a5568",
    img: "/howa/household/surveyor.webp",
    headline: "The worry at the back of your mind. Let the Surveyor look.",
    forLine: "For the crack, damp patch or quote that sits in the back of your mind.",
    intro:
      "Scan a crack, damp patch, survey note or quote. The Surveyor returns a calmer explanation of what it might be and what should be checked next. Free.",
    reads: "Cracks · Damp · Movement · Quotes · Survey notes · Risk",
    saves: "Concern, likely explanation, evidence and next step.",
    nextAction: "Monitor it, save the evidence, or arrange the right specialist.",
    cta: "Decode it free",
    safety: true,
    features: [
      { title: "Risk read", body: "A calmer, plain-English view of what the concern might be." },
      { title: "Quote decode", body: "Understand a survey note or a builder's quote before you commit." },
      { title: "Monitoring", body: "Track a crack or damp patch over time with dated photographs." },
      { title: "Evidence pack", body: "Keep the proof together, ready for insurance, sale or a specialist." },
      { title: "Specialist route", body: "When it needs a professional, the right kind of help, booked through HoWA." },
    ],
  },
  archivist: {
    name: "The Archivist",
    color: "#8a7a3c",
    img: "/howa/household/archivist.webp",
    headline: "The paperwork that keeps disappearing. The Archivist keeps it.",
    forLine: "For the paperwork that keeps disappearing.",
    intro:
      "Upload a document. The Archivist turns it into dates, costs, reminders, warranty notes and evidence, filed against your address. Free.",
    reads: "Warranties · Certificates · Invoices · Manuals · Reports · Dates",
    saves: "Document, key dates, costs, reminders and evidence.",
    nextAction: "Set a reminder, attach it to a room or asset, or build an evidence pack.",
    cta: "Send one document",
    features: [
      { title: "Document capture", body: "One upload becomes a searchable, remembered part of the Home Record." },
      { title: "Key dates", body: "Renewals, expiries and service dates pulled out and turned into reminders." },
      { title: "Warranty notes", body: "What is covered, for how long, and where the proof lives." },
      { title: "Reminders", body: "The home tells you before something lapses, not after." },
      { title: "Evidence packs", body: "Everything gathered for a claim, a sale or a handover, in one place." },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(ROLES).map((role) => ({ role }));
}

export async function generateMetadata({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  const r = ROLES[role];
  if (!r) return { title: "Household role not found" };
  return {
    title: `${r.name} by HoWA | A free Household door`,
    description: r.intro.slice(0, 155),
  };
}

export default async function RolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  const r = ROLES[role];
  if (!r) notFound();

  return (
    <div className="howa-surface bg-house-cream text-house-brown">
      {/* Hero */}
      <section className="relative grid lg:grid-cols-2 border-b border-house-brown/8">
        <div className="flex flex-col justify-center px-[5vw] py-16 lg:py-20 lg:pr-14">
          <p className="font-sans text-[12px] tracking-[0.2em] uppercase mb-5" style={{ color: r.color }}>
            {r.name} · A free Household door
          </p>
          <h1 className="font-display text-[clamp(34px,4.4vw,60px)] leading-[1.06] tracking-[-0.01em] text-house-black max-w-[18ch]">
            {r.headline}
          </h1>
          <p className="font-display italic text-[clamp(18px,2vw,24px)] leading-[1.35] mt-6 max-w-[34ch]" style={{ color: r.color }}>
            {r.forLine}
          </p>
          <p className="font-sans text-[17px] leading-[1.65] text-house-brown/80 mt-5 max-w-[52ch]">
            {r.intro}
          </p>
          <div className="mt-8 grid sm:grid-cols-3 gap-5 max-w-[560px]">
            {[
              { label: "What it reads", value: r.reads },
              { label: "Saves", value: r.saves },
              { label: "Next action", value: r.nextAction },
            ].map((b) => (
              <div key={b.label}>
                <div className="font-sans text-[11px] tracking-[0.14em] uppercase text-house-stone mb-1.5">
                  {b.label}
                </div>
                <div className="font-sans text-[13px] leading-[1.5] text-house-brown/78">{b.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-9">
            <Link
              href="/howa/assistant"
              className="inline-block rounded-xl px-6 py-3 font-sans text-[13px] font-medium text-white transition-[filter] hover:brightness-105"
              style={{ background: r.color }}
            >
              {r.cta} →
            </Link>
          </div>
        </div>
        <div className="relative min-h-[46vh] lg:min-h-full bg-house-cream-dark">
          <Image
            src={r.img}
            alt={r.name}
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Inside the room */}
      <section className="px-[5vw] py-16 max-w-[1100px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.2em] uppercase mb-2" style={{ color: r.color }}>
          Inside {r.name}&apos;s room
        </p>
        <h2 className="font-display text-[clamp(26px,3vw,40px)] leading-[1.12] text-house-black mb-10 max-w-[24ch]">
          A room, a duty, and a memory of its own.
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {r.features.map((f) => (
            <div key={f.title} className="rounded-2xl bg-white border border-house-brown/8 shadow-[0_2px_18px_rgba(48,35,28,0.05)] p-6">
              <span className="is-round inline-block w-2.5 h-2.5 mb-3" style={{ background: r.color }} aria-hidden />
              <h3 className="font-display text-[20px] leading-[1.15] text-house-black mb-2">{f.title}</h3>
              <p className="font-sans text-[14px] leading-[1.55] text-house-brown/72">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {r.safety ? (
        <SafetyBoundary className="bg-house-cream border-t border-house-brown/8" />
      ) : null}

      {/* Want hands + whole household */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-house-brown/8">
        <div className="max-w-[1100px] mx-auto grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-[26px] leading-[1.1] text-house-black mb-3">Want hands?</h3>
            <p className="font-sans text-[16px] leading-[1.6] text-house-brown/78 mb-4">
              The read is free. The doing is bookable, House of HoWA and approved specialists, priced and scheduled through HoWA.
            </p>
            <Link href="/services" className="font-sans text-[12px] tracking-[0.16em] uppercase text-house-gold-ink no-underline">
              See who can come →
            </Link>
          </div>
          <div>
            <h3 className="font-display text-[26px] leading-[1.1] text-house-black mb-3">Then, the whole Household</h3>
            <p className="font-sans text-[16px] leading-[1.6] text-house-brown/78 mb-4">
              Like having someone who remembers? The Housekeeper runs the whole household, papers filed, seasons planned, nothing slipping.
            </p>
            <Link href="/howa/housekeeper" className="font-sans text-[12px] tracking-[0.16em] uppercase text-house-gold-ink no-underline">
              Employ the Housekeeper →
            </Link>
          </div>
        </div>
      </section>

      {/* One record close */}
      <section className="px-[5vw] py-16 text-center max-w-[820px] mx-auto">
        <p className="font-display italic text-[clamp(20px,2.4vw,30px)] leading-[1.3] text-house-brown/85">
          One voice. The Household works behind it. Everything it learns is
          written into one record: your home&apos;s.
        </p>
        <div className="mt-7">
          <Link href="/household" className="font-sans text-[12px] tracking-[0.16em] uppercase text-house-gold-ink no-underline">
            Meet the whole Household →
          </Link>
        </div>
      </section>
    </div>
  );
}
