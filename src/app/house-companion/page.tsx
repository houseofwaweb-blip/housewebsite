import Link from "next/link";
import Image from "next/image";
import { SampleDesignShowcase } from "@/components/design/SampleDesignShowcase";
import { AskCompanionDemo } from "@/components/companion/AskCompanionDemo";

/**
 * /house-companion — the promoted House-branded intelligent front door
 * (Aug 2026 House Companion reframe). House Companion understands the need and
 * taste, shapes the brief, and routes into HoWA. Powered by HoWA.
 *
 * FUNCTION-GATED: live photo/voice intake and AI generation are product build
 * (directive P4). This page is the honest "early access" route-in: it explains
 * House Companion and sends each mode to its real destination (a service, a
 * design route or the Home Record) rather than claiming a live AI flow.
 *
 * Copy from the August 2026 Website Copy Pack §04. House brand rule: no em
 * dashes in customer-facing copy.
 */

export const metadata = {
  title: "House Companion | Your home, understood beautifully.",
  description:
    "House Companion is the House's intelligent front door, powered by HoWA. Share a photograph, a problem or an idea, and it shapes the brief, guides a design or prepares the right House service, then keeps every next step with your home.",
};

const MY_HOME = "https://accounts.willowalexander.co.uk/";

/** "From feeling to action" — the four things House Companion does. */
const WHAT_IT_DOES = [
  { t: "Understand the need", b: "Describe what is not working, upload a photograph or choose the part of the home you want to improve." },
  { t: "Learn your taste", b: "Share references, dislikes, colours, materials, planting character, routines, budget and what must stay." },
  { t: "Create the route", b: "Receive a recommended service, design project, scan task, plan pack or professional next step." },
  { t: "Stay with the project", b: "Return to the same brief, decisions, files, approvals and actions inside your HoWA Home Record." },
];

/** One Companion, four tailored modes (Visual Brief slide 06). The intake
 *  character (tags) changes with intent; the underlying Home Record stays one. */
const MODES = [
  {
    id: "care",
    kind: "Care & repair",
    tags: "Photo · Question · Scope",
    prompt: "What is happening, where, and how urgent is it?",
    body: "A fault, a mark, a leak or an unclear service need. House Companion reads the likely issue and urgency, then prepares the brief so the right team arrives informed.",
    cta: "Tell us what is wrong",
    href: "/house-companion/repair",
    image: "/powered-by-howa/tool-repair-scan.webp",
  },
  {
    id: "garden",
    kind: "Garden design",
    tags: "Taste · Scan · Plan",
    prompt: "How should the garden feel and work?",
    body: "It learns the feeling you want, how you use the space, the planting character you love and what must stay, then shapes the concept and the route to a plan.",
    cta: "Shape my garden brief",
    href: "/house-companion/garden",
    image: "/powered-by-howa/tool-garden-scan.webp",
  },
  {
    id: "room",
    kind: "Home design",
    tags: "Room · Scheme · Sourcing",
    prompt: "Which space, and how should it feel?",
    body: "It learns what you love, what you reject and how the room must work, then builds a first direction, palette, layout and sourcing you own. Your taste, remembered.",
    cta: "Shape my room brief",
    href: "/house-companion/room",
    image: "/powered-by-howa/tool-ai-design.webp",
  },
  {
    id: "whole-home",
    kind: "Whole home",
    tags: "Priorities · Phases · Team",
    prompt: "What would make the home feel more known?",
    body: "An address and a broader ambition. House Companion prioritises across care, protection, design and records, and sequences the programme, held in one Home Record.",
    cta: "See whole-home in HoWA",
    href: "/howa",
    image: "/powered-by-howa/companion-whole-home.png",
  },
];

/** "Conversation becomes state" — the five HoWA objects House Companion builds
 *  as you talk (Visual Brief slide 08). This is what makes it a product, not a
 *  chat: every confirmed answer updates the address-bound Home Record. */
const BECOMES_STATE = [
  { t: "Home profile", b: "Taste, dislikes, budget and how much upkeep you want to give." },
  { t: "Spaces & zones", b: "Each room and garden zone, its dimensions, light and condition." },
  { t: "Design project", b: "The brief, the stage, the files, the decisions and the next action." },
  { t: "Tasks & approvals", b: "What is still missing, the choices you make and any professional review." },
  { t: "Events & evidence", b: "Visits, installation, photographs, warranties and provenance." },
];

export default function HouseCompanionPage() {
  return (
    <div className="bg-house-cream text-house-brown">
      {/* HERO */}
      <section className="px-[5vw] pt-[clamp(48px,6vw,96px)] pb-[clamp(40px,5vw,80px)]">
        <div className="mx-auto grid max-w-[1280px] gap-[clamp(32px,5vw,72px)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <p className="mb-4 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">
              House Companion · Powered by HoWA
            </p>
            <h1 className="mb-5 font-display text-[clamp(34px,5vw,64px)] leading-[1.04] text-house-brown">
              Your home, <em>understood beautifully.</em>
            </h1>
            <p className="mb-6 max-w-[54ch] font-sans text-[17px] leading-[1.6] text-house-stone">
              House Companion is the House's intelligent front door, powered by
              HoWA. Show it a room, a garden, a photo or a problem. It learns your
              taste, shapes the design or the brief, and stays with the project all
              the way to trusted delivery. Every answer is kept with your home, not
              lost in a chat.
            </p>
            <p className="mb-7 max-w-[52ch] font-sans text-[14.5px] leading-[1.55] text-house-stone/85">
              Not a tier. Not a second app. Not a gate you have to pass. It is the
              House's way in, and it does not forget.
            </p>
            <div className="btn-row">
              <a href="#start" className="inline-flex items-center justify-center gap-2 border border-house-gold-dark bg-house-gold-ink px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110">
                Tell us what you need <span aria-hidden>→</span>
              </a>
              <Link href="/services" className="inline-flex items-center justify-center gap-2 border border-house-brown/25 px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold">
                Book a House service
              </Link>
            </div>
            <p className="mt-5 font-sans text-[12px] leading-[1.5] text-house-stone/75">
              Early access. Live photo and voice capture are arriving. For now,
              choose what you are trying to do and House Companion prepares the
              brief, powered by HoWA AI Design.
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="/powered-by-howa/hero.webp"
              alt="A real home with House Companion understanding what it needs and how it should feel, its findings kept quietly alongside."
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ASK — the scripted ask/reply demo (mirrors /ai). */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto max-w-[1080px]">
          <div className="mx-auto mb-10 max-w-[680px] text-center">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">Ask House Companion</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
              Ask a question. <em>Choose what happens next.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              Tell House Companion what you are trying to do. It reads the home,
              gives you a clear answer, then hands the next step to HoWA.
            </p>
          </div>
          <AskCompanionDemo />
        </div>
      </section>

      {/* WHAT IT DOES */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto mb-11 max-w-[680px] text-center">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">What it does</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
              From feeling <em>to action.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              House Companion brings the House's eye for taste, care and detail into
              HoWA. It learns what matters to you, understands the room, garden or
              problem in front of you, and keeps the project moving without asking
              you to start again.
            </p>
          </div>
          <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {WHAT_IT_DOES.map((w, i) => (
              <div key={w.t} className="border-t border-house-brown/15 pt-4">
                <span className="font-display text-[22px] text-house-gold-ink">{i + 1}</span>
                <h3 className="mb-1.5 mt-1 font-display text-[19px] leading-tight text-house-brown">{w.t}</h3>
                <p className="font-sans text-[14px] leading-[1.55] text-house-stone">{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE APP — the phone rises flush from the section's bottom edge. Background
          matches the mockup's warm field so it reads as popping up, not boxed. */}
      <section className="relative overflow-hidden border-t border-house-brown/10" style={{ background: "#eadccf" }}>
        <div className="mx-auto grid max-w-[1200px] items-stretch gap-[clamp(16px,4vw,64px)] px-[5vw] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex items-end justify-center lg:justify-start">
            <Image
              src="/powered-by-howa/companion-app.png"
              alt="The House Companion app: a garden and room ready to redesign, a personal style profile, recommended House services and the next best action, all powered by HoWA."
              width={1122}
              height={1402}
              sizes="(max-width: 1024px) 74vw, 420px"
              className="mb-[clamp(28px,4vw,56px)] block h-auto w-full max-w-[320px] self-end sm:max-w-[380px] lg:max-w-[420px]"
            />
          </div>
          <div className="flex max-w-[560px] flex-col justify-center py-[clamp(48px,6vw,92px)]">
            <p className="mb-4 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">The House Companion app</p>
            <h2 className="mb-5 font-display text-[clamp(28px,3.6vw,50px)] leading-[1.05] text-house-brown">
              Your home and your taste, <em>in one place.</em>
            </h2>
            <p className="mb-7 max-w-[52ch] font-sans text-[17px] leading-[1.6] text-house-stone">
              Scan a room or garden and see its potential, build a style profile
              that is refined, timeless and yours, book trusted House services, and
              always know your next best action. It learns how you live, what you
              love and how you want your home to feel, powered by HoWA.
            </p>
            <ul className="mb-9 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {["Scan your garden or room", "Your personal style profile", "Recommended House services", "Your next best action"].map((f) => (
                <li key={f} className="flex items-baseline gap-2 font-sans text-[15px] leading-[1.5] text-house-brown">
                  <span className="text-house-gold-ink" aria-hidden>·</span> {f}
                </li>
              ))}
            </ul>
            <p className="mb-3 font-sans text-[11px] tracking-[0.22em] uppercase text-house-stone/70">Coming soon</p>
            <div className="flex flex-wrap items-center gap-3">
              <Image
                src="/brand/apple-app-store-badge.svg"
                alt="Download on the App Store"
                width={120}
                height={40}
                className="h-[46px] w-auto"
              />
              <Image
                src="/brand/google-play-prereg.png"
                alt="Pre-register on Google Play"
                width={270}
                height={80}
                className="h-[46px] w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MODE SELECTOR */}
      <section id="start" className="px-[5vw] py-[clamp(48px,6vw,92px)]">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto mb-11 max-w-[680px] text-center">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">Where to begin</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
              What are you <em>trying to do?</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              Each choice opens the right route. You are never sent through a single
              long questionnaire, and an ordinary booking is never forced through
              House Companion.
            </p>
          </div>
          <div className="mx-auto grid max-w-[1040px] gap-6 sm:grid-cols-2">
            {MODES.map((m) => (
              <Link key={m.id} id={m.id} href={m.href} className="group flex flex-col border border-house-brown/12 bg-house-cream no-underline transition-colors hover:border-house-gold">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image src={m.image} alt={m.kind} fill sizes="(max-width: 640px) 100vw, 520px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-[24px] leading-tight text-house-brown">{m.kind}</h3>
                  <p className="mt-2 font-sans text-[10.5px] tracking-[0.2em] uppercase text-house-gold-ink">{m.tags}</p>
                  <p className="mb-2 mt-2.5 font-sans text-[13px] italic text-house-stone">{m.prompt}</p>
                  <p className="mb-6 flex-1 font-sans text-[15px] leading-[1.55] text-house-stone">{m.body}</p>
                  <span className="font-sans text-[12px] tracking-[0.2em] uppercase text-house-gold-ink transition-colors group-hover:text-house-brown">{m.cta} →</span>
                </div>
              </Link>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-[60ch] text-center font-sans text-[13px] leading-[1.55] text-house-stone/80">
            Not sure? Start with the part of the home that is on your mind, or{" "}
            <Link href="/services" className="text-house-gold-ink underline underline-offset-2 hover:text-house-brown">book a House service</Link>{" "}
            if you already know what you need.
          </p>
        </div>
      </section>

      {/* CONVERSATION BECOMES STATE — the app depth (Visual Brief slide 08). */}
      <section className="border-t border-house-brown/10 bg-house-forest px-[5vw] py-[clamp(52px,6.5vw,100px)]">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto mb-12 max-w-[720px] text-center">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-light">Not a chatbot</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.4vw,46px)] leading-[1.06] text-house-cream">
              Every answer becomes <em>part of your home.</em>
            </h2>
            <p className="mx-auto max-w-[60ch] font-sans text-[16px] leading-[1.65] text-[rgba(245,240,232,0.86)]">
              House Companion does not forget when you close the tab. Each confirmed
              answer updates your address-bound record in HoWA, so the next step
              always knows what the last one decided. A conversation that becomes
              structure, not a transcript that is lost.
            </p>
          </div>
          <ol className="grid gap-px overflow-hidden border border-house-gold-dark/40 bg-house-gold-dark/40 sm:grid-cols-2 lg:grid-cols-5">
            {BECOMES_STATE.map((s, i) => (
              <li key={s.t} className="flex flex-col bg-house-forest p-6">
                <span className="font-display text-[20px] text-house-gold-light">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mb-2 mt-2 font-display text-[19px] leading-tight text-house-cream">{s.t}</h3>
                <p className="font-sans text-[13.5px] leading-[1.55] text-[rgba(245,240,232,0.78)]">{s.b}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-8 max-w-[64ch] text-center font-sans text-[13px] leading-[1.6] text-[rgba(245,240,232,0.7)]">
            The same record can be reached from House Companion or straight from
            HoWA. One address, one living record, one continuous relationship.
          </p>
        </div>
      </section>

      {/* SAMPLE — the design experience, powered by HoWA */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto mb-9 max-w-[680px] text-center">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">A sample</p>
            <h2 className="mb-4 font-display text-[clamp(24px,3vw,40px)] leading-[1.08] text-house-brown">
              Taste becomes <em>a project.</em>
            </h2>
            <p className="font-sans text-[15px] leading-[1.6] text-house-stone">
              A sample of how a room or garden becomes a first design direction,
              palette, budget and brief. House Companion shapes it; HoWA holds the
              project, decisions and files.
            </p>
          </div>
          <SampleDesignShowcase />
        </div>
      </section>

      {/* HAND-OFF + RELATIONSHIP */}
      <section className="bg-house-forest px-[5vw] py-[clamp(52px,6.5vw,100px)]">
        <div className="mx-auto max-w-[860px] text-center">
          <p className="mb-4 font-sans text-[11px] tracking-[0.28em] uppercase text-house-gold-light">Continue in HoWA</p>
          <h2 className="mb-5 font-display text-[clamp(26px,3.4vw,46px)] leading-[1.08] text-house-cream">
            Your brief is ready. <em>Your home will remember it.</em>
          </h2>
          <p className="mx-auto mb-8 max-w-[62ch] font-sans text-[16px] leading-[1.65] text-[rgba(245,240,232,0.86)]">
            Confirm the address to create or match the Home Record. Your photographs,
            answers and decisions carry across, so you can see the recommendation,
            book the work or continue the design without starting again. One
            continuous project. No cold hand-off. No brief re-keyed.
          </p>
          <div className="btn-row">
            <a href={MY_HOME} className="inline-flex items-center justify-center gap-2 border border-house-gold-dark bg-house-gold-ink px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110">
              Continue in HoWA <span aria-hidden>→</span>
            </a>
            <Link href="/howa" className="inline-flex items-center justify-center gap-2 border border-house-gold-dark/60 px-8 py-4 text-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-cream no-underline transition-colors hover:bg-house-gold-ink hover:text-house-brown">
              Meet HoWA
            </Link>
          </div>
          <p className="mx-auto mt-9 max-w-[70ch] font-display text-[clamp(17px,1.8vw,22px)] italic text-[rgba(245,240,232,0.9)]">
            House Companion understands you. HoWA understands the home. The House
            brings it to life.
          </p>
        </div>
      </section>
    </div>
  );
}
