import Image from "next/image";
import Link from "next/link";
import type { EverydayPage } from "@/lib/insurance/everyday-pages";

/**
 * EverydayPreframe, the thin Group D pages. Explain, set expectation, then route
 * to a specialist who arranges the cover through Provenance. Enquiry-led, no
 * form, no "compare", and (for home) a route to the advised service.
 */
export function EverydayPreframe({ data }: { data: EverydayPage }) {
  return (
    <div className="ins-everyday bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-20 pb-10">
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-sans text-[14px] tracking-[0.3em] uppercase text-[color:var(--ins-ink)]">Insurance · Everyday cover</p>
            <h1 className="mt-4 font-display text-[clamp(33px,4.6vw,55px)] leading-[1.05] text-house-black">{data.heading}</h1>
            <p className="mt-6 max-w-[52ch] font-sans text-[21px] leading-[1.6] text-house-stone">{data.lede}</p>
          </div>
          {data.image ? (
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={data.image}
                alt={data.imageAlt ?? ""}
                fill
                sizes="(min-width: 1120px) 540px, 90vw"
                priority
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          ) : null}
        </div>
      </section>

      {/* What's covered / products */}
      {data.covered.length > 0 ? (
        <section className="px-[5vw] pb-8">
          <div className="mx-auto max-w-[760px]">
            <h2 className="font-sans text-[17px] font-semibold tracking-[0.06em] uppercase text-[color:var(--ins-ink)]">At a glance</h2>
            <ul className="mt-4 grid gap-2 p-0 sm:grid-cols-2">
              {data.covered.map((c) => (
                <li key={c} className="flex gap-2.5 font-sans text-[19px] leading-[1.55] text-house-brown/85">
                  <span aria-hidden className="text-[color:var(--ins-ink)]">·</span>{c}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {data.products && data.products.length > 0 ? (
        <section className="px-[5vw] pb-8">
          <div className="mx-auto grid max-w-[880px] gap-4 sm:grid-cols-2">
            {data.products.map((p) => (
              <div key={p.name} className="border border-house-brown/15 bg-house-white p-5">
                <h3 className="font-display text-[22px] leading-tight text-house-black">{p.name}</h3>
                <p className="mt-1.5 font-sans text-[18.5px] leading-[1.55] text-house-stone">{p.body}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* How it works + hand-off — dark graphite band (plain everyday world, not burgundy) */}
      <section className="mt-4 px-[5vw] py-12 text-house-cream" style={{ background: "var(--ins-dark)" }}>
        <div className="mx-auto max-w-[880px]">
          <h2 className="font-display text-[clamp(25px,2.6vw,33px)] leading-tight text-house-cream">How it works</h2>
          <p className="mt-3 max-w-[54ch] font-sans text-[17.5px] leading-[1.6] text-house-cream/75">{data.journey}</p>
          <ol className="mt-7 grid gap-6 p-0 sm:grid-cols-3">
            {[
              { n: "1", h: "Choose your cover", p: "Choose the type of cover you need from the options above." },
              { n: "2", h: "Leave a few details", p: "Leave the details needed for the House to make the introduction." },
              { n: "3", h: "Provenance takes it from there", p: "A Provenance specialist contacts you and arranges the cover." },
            ].map((step) => (
              <li key={step.n} className="list-none">
                <p className="font-display text-[33px] leading-none text-house-cream/35">{step.n}</p>
                <p className="mt-2 font-sans text-[18.5px] font-semibold text-house-cream">{step.h}</p>
                <p className="mt-1 font-sans text-[16.5px] leading-[1.5] text-house-cream/70">{step.p}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <Link
              href="/insurance/speak-to-a-specialist"
              data-ga-event="cta_click"
              data-ga-cta="speak_to_specialist"
              data-ga-product={data.slug}
              className="inline-flex items-center justify-center whitespace-nowrap border border-house-cream bg-house-cream px-7 py-3.5 font-sans text-[14px] tracking-[0.16em] uppercase text-[color:var(--ins-dark)] no-underline transition-[filter] hover:brightness-95"
            >
              Speak to a specialist →
            </Link>
            <p className="mt-3 font-sans text-[14.5px] text-house-cream/55">The House introduces you; Provenance arranges and administers the cover.</p>
          </div>
        </div>
      </section>

      {/* Hand-off statement */}
      <section className="px-[5vw] pb-8">
        <div className="mx-auto max-w-[760px] border-l-2 border-[color:var(--ins-ink)] bg-house-cream-dark/50 px-5 py-4">
          <p className="m-0 font-sans text-[18px] leading-[1.6] text-house-brown/85">
            Cover is arranged and administered by Provenance, authorised and regulated by the FCA. The House is an introducer only: it does not advise on, arrange, administer or compare insurance.
          </p>
        </div>
      </section>

      {/* High-value routing (home) */}
      {data.highValueRouting ? (
        <section className="px-[5vw] pb-16">
          <div className="mx-auto max-w-[760px]">
            <p className="font-sans text-[19px] leading-[1.65] text-house-brown/85">
              Insuring a listed, high-value or otherwise specialist home?{" "}
              <Link href="/insurance/private-client" className="text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown">Speak to the Private Client team →</Link>
            </p>
          </div>
        </section>
      ) : null}
    </div>
  );
}
