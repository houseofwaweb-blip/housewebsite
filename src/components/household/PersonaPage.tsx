import Image from "next/image";
import Link from "next/link";
import { HowaDoorModule } from "./HowaDoorModule";
import { PersonaFeatures } from "./PersonaFeatures";
import { PERSONA_ART, personaImage, BOOK_HREF, type Persona } from "./personaData";
import { HOUSEHOLD, PROFESSIONAL_BOUNDARY } from "@/lib/truth";

/**
 * The shared per-persona ("room") page. One template renders every
 * /household/[role] page from a Persona object (handover §2):
 *   1. Hero + live free tool
 *   2. Inside the room (cutaway image + feature accordions)
 *   3. Want hands / upsell
 *   4. One record / close
 *
 * Wrapped in `.howa-surface` so the rounded cards survive the global reset.
 */
export function PersonaPage({ persona }: { persona: Persona }) {
  // Service status comes from the truth layer so a member never offers work the
  // House cannot actually arrange (09A s5: no dead button).
  const serviceLive =
    HOUSEHOLD.find((m) => m.id === persona.slug)?.serviceStatus === "live";
  const accent = persona.accent;
  const art = PERSONA_ART[persona.slug];

  return (
    <div className="howa-surface bg-[#fbfaf5] text-[#3a352c]">
      {/* 09A s1: Household marker and breadcrumb. Every member route must show
          where it sits in the House, the same way the service routes do. */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1180px] px-6 pt-8 sm:px-10">
        <ol className="m-0 flex flex-wrap items-center gap-2 p-0 font-sans text-[11.5px] uppercase tracking-[0.14em] text-[#3a352c]/55 list-none">
          <li>
            <Link href="/household" className="text-[#3a352c]/55 no-underline hover:text-[#8a6f3f]">
              The Household
            </Link>
          </li>
          <li aria-hidden="true">·</li>
          <li style={{ color: accent }}>{persona.name}</li>
        </ol>
      </nav>

      {/* HERO + TOOL */}
      <section className="pt-8 pb-14 lg:pt-10 lg:pb-20">
        <div className="mx-auto grid max-w-[1180px] items-start gap-10 px-6 sm:px-10 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
          <div>
            <p className="mb-3 font-sans text-[12px] uppercase tracking-[0.2em]" style={{ color: accent }}>
              {persona.name} · {persona.room}
            </p>
            <h1 className="font-display text-[clamp(32px,4vw,52px)] leading-[1.05] tracking-[-0.015em] text-[#1a241d]">
              {persona.heroTitle}
            </h1>
            <p className="mt-3 font-display italic text-[clamp(17px,1.8vw,21px)] leading-[1.3]" style={{ color: accent }}>
              {persona.duty}
            </p>
            <p className="mt-5 max-w-[560px] text-[18px] leading-[1.55] text-[#3a352c]">{persona.heroBody}</p>

            <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-5 sm:max-w-[460px]">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.16em]" style={{ color: accent }}>
                  What it reads
                </p>
                <p className="mt-1.5 text-[13.5px] leading-[1.5] text-[#3a352c]/85">{persona.knows.join(" · ")}</p>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.16em]" style={{ color: accent }}>
                  Saves
                </p>
                <p className="mt-1.5 text-[13.5px] leading-[1.5] text-[#3a352c]/85">{persona.saves}</p>
              </div>
            </div>
            <div className="mt-5 sm:max-w-[460px]">
              <p className="font-sans text-[10px] uppercase tracking-[0.16em]" style={{ color: accent }}>
                Next action
              </p>
              <p className="mt-1.5 text-[13.5px] leading-[1.5] text-[#3a352c]/85">{persona.nextAction}</p>
            </div>

            {/* 09A s5: professional boundary. Publish-ready copy, do not
                rewrite. A member must never read as a substitute for the
                qualified professional who is responsible and liable. */}
            <p className="mt-7 max-w-[560px] border-l-2 pl-4 text-[13.5px] leading-[1.55] text-[#3a352c]/70" style={{ borderColor: accent }}>
              {PROFESSIONAL_BOUNDARY}
            </p>
          </div>

          <HowaDoorModule persona={persona} surface="persona-page" />
        </div>
      </section>

      {/* INSIDE THE ROOM */}
      <section className="border-t border-[#1a241d]/8 py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-6 sm:px-10 lg:grid-cols-[0.72fr_1fr] lg:gap-16">
          <figure
            className="relative w-full overflow-hidden rounded-2xl bg-[#efe9dc] ring-1 ring-[#b89968]/20 shadow-[0_28px_66px_-34px_rgba(40,30,10,0.4)]"
            style={{ aspectRatio: "1024 / 1536" }}
          >
            <Image
              src={personaImage(persona.slug)}
              alt={`${persona.name} as a ${art.colourway} cutaway house.`}
              fill
              sizes="(max-width:1024px) 92vw, 460px"
              className="object-cover"
            />
          </figure>
          <div>
            <p className="mb-3 font-sans text-[12px] uppercase tracking-[0.2em]" style={{ color: accent }}>
              Inside {persona.name}&rsquo;s room
            </p>
            <h2 className="font-display text-[clamp(24px,2.8vw,38px)] leading-[1.12] tracking-[-0.01em] text-[#1a241d]">
              A room, a duty, and a memory of its own.
            </h2>
            <p className="mt-4 max-w-[520px] text-[16.5px] leading-[1.6] text-[#3a352c]">
              Everything {persona.name} does is kept in one place, against your address, ready when you ask. Tap any of
              these to see what it means.
            </p>
            <PersonaFeatures features={art.features} accent={accent} />
          </div>
        </div>
      </section>

      {/* WANT HANDS / UPSELL */}
      <section className="border-t border-[#1a241d]/8 bg-[#f4f1e9] py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-6 sm:px-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-[clamp(24px,2.6vw,36px)] leading-[1.12] text-[#1a241d]">
              {persona.handsTitle}
            </h2>
            <p className="mt-4 max-w-[520px] text-[16.5px] leading-[1.6] text-[#3a352c]">{persona.handsBody}</p>
            {/* 09A s5: "no dead button". This section offered "Book a repair"
                and the like on every member, including ones whose human service
                is in build or future, so the Handyman invited a booking nobody
                could fulfil. The book CTA now appears only where the truth layer
                says the member's service is live; otherwise the member offers
                the honest register-interest route instead. */}
            {serviceLive ? (
              <a
                href={BOOK_HREF}
                data-ga-event="booking_started"
                data-ga-door={persona.doorTag}
                data-ga-surface="persona-hands"
                className="mt-6 inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-[16px] text-white no-underline transition-opacity hover:opacity-90"
                style={{ background: accent }}
              >
                {persona.handsCta} <span aria-hidden>→</span>
              </a>
            ) : (
              <div className="mt-6">
                <p className="max-w-[520px] text-[15px] leading-[1.55] text-[#3a352c]/75">
                  {persona.name} does not arrange this work yet. Register your
                  interest and the House will write to you when a named provider
                  covers your address.
                </p>
                <Link
                  href="/contact"
                  data-ga-event="register_interest"
                  data-ga-door={persona.doorTag}
                  data-ga-surface="persona-hands"
                  className="mt-4 inline-flex items-center gap-2 rounded-md border px-6 py-3.5 text-[16px] no-underline transition-colors"
                  style={{ borderColor: accent, color: accent }}
                >
                  Register interest <span aria-hidden>→</span>
                </Link>
              </div>
            )}
          </div>
          <div className="rounded-2xl border border-[#b89968]/25 bg-white p-7">
            <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#8a6f3f]">Then, the whole household</p>
            <p className="mt-2 text-[16.5px] leading-[1.55] text-[#1a241d]">{persona.upsellBody}</p>
            <Link
              href={persona.upsellHref}
              data-ga-event={persona.upsellHref.includes("steward") ? "steward_started" : "housekeeper_started"}
              data-ga-door={persona.doorTag}
              data-ga-surface="persona-upsell"
              className="mt-5 inline-flex items-center gap-2 text-[15.5px] font-medium text-[#8a6f3f] underline underline-offset-4 transition-colors hover:text-[#1a241d]"
            >
              {persona.upsellCta} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section className="py-12">
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10 text-center">
          <p className="mx-auto max-w-[620px] font-display italic text-[clamp(18px,2vw,24px)] leading-[1.35] text-[#8a6f3f]">
            One voice. The Household works behind it. Everything it learns is written into one record: your home&rsquo;s.
          </p>
          <Link
            href="/household"
            className="mt-5 inline-flex items-center gap-1.5 text-[15px] text-[#3a352c] no-underline transition-colors hover:text-[#1a241d]"
          >
            Meet the whole Household <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
