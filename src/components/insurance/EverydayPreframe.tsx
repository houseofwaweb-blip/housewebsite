import Image from "next/image";
import Link from "next/link";
import type { EverydayPage } from "@/lib/insurance/everyday-pages";
import { QUOTE_SERVICE_URL } from "@/lib/insurance/config";

/**
 * EverydayPreframe, the thin Group D pages. Explain, set expectation, hand off
 * to the Provenance-operated service. No form, no "compare", unambiguous
 * hand-off, and (for home) a route to the advised service.
 */
export function EverydayPreframe({ data }: { data: EverydayPage }) {
  return (
    <div className="ins-everyday bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-20 pb-10">
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-[color:var(--ins-ink)]">Insurance · Everyday cover</p>
            <h1 className="mt-4 font-display text-[clamp(30px,4.6vw,52px)] leading-[1.05] text-house-black">{data.heading}</h1>
            <p className="mt-6 max-w-[52ch] font-sans text-[18px] leading-[1.6] text-house-stone">{data.lede}</p>
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
            <h2 className="font-sans text-[13px] font-semibold tracking-[0.06em] uppercase text-[color:var(--ins-ink)]">At a glance</h2>
            <ul className="mt-4 grid gap-2 p-0 sm:grid-cols-2">
              {data.covered.map((c) => (
                <li key={c} className="flex gap-2.5 font-sans text-[16px] leading-[1.55] text-house-brown/85">
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
                <h3 className="font-display text-[19px] leading-tight text-house-black">{p.name}</h3>
                <p className="mt-1.5 font-sans text-[15px] leading-[1.55] text-house-stone">{p.body}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* The journey + hand-off */}
      <section className="px-[5vw] pb-8">
        <div className="mx-auto max-w-[760px]">
          <p className="font-sans text-[16px] leading-[1.65] text-house-brown/85">{data.journey}</p>
          <div className="mt-6">
            <a
              href={QUOTE_SERVICE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ga-event="outbound_click"
              data-ga-destination="provenance-quote"
              data-ga-product={data.slug}
              className="inline-flex items-center justify-center whitespace-nowrap border border-[color:var(--ins-dark)] bg-[var(--ins-accent)] px-7 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-on)] no-underline transition-[filter] hover:brightness-110"
            >
              Continue to the quote service ↗
            </a>
          </div>
        </div>
      </section>

      {/* Hand-off statement */}
      <section className="px-[5vw] pb-8">
        <div className="mx-auto max-w-[760px] border-l-2 border-[color:var(--ins-ink)] bg-house-cream-dark/50 px-5 py-4">
          <p className="m-0 font-sans text-[14px] leading-[1.6] text-house-brown/85">
            This is a self-serve service operated by Provenance, authorised and regulated by the FCA. The House is an introducer only: it does not advise on, arrange, administer or compare insurance. Clicking through takes you into Provenance's regulated service.
          </p>
        </div>
      </section>

      {/* High-value routing (home) */}
      {data.highValueRouting ? (
        <section className="px-[5vw] pb-16">
          <div className="mx-auto max-w-[760px]">
            <p className="font-sans text-[16px] leading-[1.65] text-house-brown/85">
              Insuring a listed, high-value or non-standard home? Everyday cover is not built for it.{" "}
              <Link href="/insurance/private-client" className="text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown">Speak to a specialist instead →</Link>
            </p>
          </div>
        </section>
      ) : null}
    </div>
  );
}
