import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ScanReveal } from "@/components/companion/ScanReveal";
import { COMPANION_FEATURES, getCompanionFeature } from "@/lib/companion-catalog";

/**
 * House Companion feature route (/house-companion/[feature]). One canonical page
 * per route, built in the same grammar as the HoWA product site's ai/[feature]:
 * hero -> four-part contract + animated scan reveal -> boundary -> sibling routes
 * -> hand-off. Data-driven from companion-catalog.ts so every route reads the
 * same and links the same. Directive §09/§10.
 */

const btnFilled =
  "inline-flex items-center justify-center whitespace-nowrap font-sans text-[12px] tracking-[0.16em] uppercase text-house-white bg-house-brown border border-house-brown px-6 py-4 no-underline transition-[filter] duration-300 ease-out hover:brightness-110";
const btnGhost =
  "inline-flex items-center justify-center whitespace-nowrap font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/30 px-6 py-4 no-underline transition-colors duration-200 hover:border-house-gold-ink hover:text-house-moss";
const kicker = "font-sans text-[12px] uppercase tracking-[0.28em] text-house-moss";

export function generateStaticParams() {
  return COMPANION_FEATURES.map((f) => ({ feature: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ feature: string }> }) {
  const { feature } = await params;
  const f = getCompanionFeature(feature);
  if (!f) return { title: "House Companion" };
  return {
    title: `${f.navLabel} | House Companion`,
    description: f.intro,
  };
}

export default async function CompanionFeaturePage({ params }: { params: Promise<{ feature: string }> }) {
  const { feature } = await params;
  const f = getCompanionFeature(feature);
  if (!f) notFound();

  const others = COMPANION_FEATURES.filter((x) => x.slug !== f.slug);

  return (
    <div className="bg-house-cream text-house-brown">
      {/* HERO — two-column, the drawn sketch-over-photo image on the right. */}
      <section className="border-b border-house-brown/8 px-[5vw] pt-16 pb-14">
        <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="lg:max-w-[600px]">
            <p className={kicker}>{f.eyebrow}</p>
            <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(38px,5.2vw,68px)] leading-[1.03] tracking-[-0.01em] text-house-black">
              {f.headline} <em className="italic">{f.headlineEm}</em>
            </h1>
            <p className="mt-6 max-w-[54ch] font-sans text-[18.5px] leading-[1.6] text-house-brown/82">{f.intro}</p>
            <div className="mt-8 btn-row">
              <Link href={f.primaryHref} className={btnFilled}>{f.primaryLabel}</Link>
              <Link href={f.secondaryHref} className={btnGhost}>{f.secondaryLabel}</Link>
            </div>
          </div>
          <div
            className="relative w-full overflow-hidden border border-house-brown/12 bg-house-cream-dark shadow-[0_28px_70px_-45px_rgba(40,30,10,0.5)]"
            style={{ aspectRatio: f.heroImage.aspect.replace("/", " / ") }}
          >
            <Image
              src={f.heroImage.src}
              alt={f.heroImage.alt}
              fill
              priority
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* FOUR-PART CONTRACT + the animated scan reveal */}
      <section className="border-b border-house-brown/8 bg-house-cream-dark px-[5vw] py-16">
        <div className="mx-auto max-w-[1240px]">
          <p className="text-center font-sans text-[12px] uppercase tracking-[0.28em] text-house-gold-ink">A sample</p>
          <h2 className="mx-auto mt-3 max-w-[22ch] text-center font-display text-[clamp(28px,3.6vw,46px)] leading-[1.08] text-house-black">
            What House Companion <em className="italic">reads and returns.</em>
          </h2>
          <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["You give House Companion", f.give],
              ["What it returns", f.returns],
              ["Saved to the Home Record", f.saved],
              ["Action routes, and who fulfils them", f.routes],
            ].map(([label, value]) => (
              <div key={label} className="border-t-2 border-house-gold-ink pt-3">
                <dt className="font-sans text-[11px] uppercase tracking-[0.14em] text-house-brown/50">{label}</dt>
                <dd className="mt-1.5 font-display text-[18px] leading-[1.25] text-house-black">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-11">
            <ScanReveal data={f.reveal.data} fields={f.reveal.fields} />
          </div>
        </div>
      </section>

      {/* SKETCHED DIRECTIONS — a contained 2x2 grid of design directions, when present. */}
      {f.sketches && f.sketches.length > 0 ? (
        <section className="border-b border-house-brown/8 px-[5vw] py-16">
          <div className="mx-auto max-w-[900px]">
            <div className="mb-9 text-center">
              <p className={kicker}>{f.sketchLead?.kicker ?? "A few directions"}</p>
              <h2 className="mt-3 font-display text-[clamp(26px,3.4vw,44px)] leading-[1.08] text-house-black">
                {f.sketchLead?.title ?? "See the space,"} <em className="italic">{f.sketchLead?.titleEm ?? "redrawn."}</em>
              </h2>
              <p className="mx-auto mt-4 max-w-[56ch] font-sans text-[15px] leading-[1.6] text-house-brown/70">
                {f.sketchLead?.blurb ?? "A sample of how House Companion sketches the space over what is already there, so the direction is easy to picture."}
              </p>
            </div>
            <div className="mx-auto grid max-w-[840px] grid-cols-1 gap-5 sm:grid-cols-2">
              {f.sketches.map((sk) => (
                <figure key={sk.src} className="m-0">
                  <div className="relative aspect-[4/3] w-full overflow-hidden border border-house-brown/12">
                    <Image src={sk.src} alt={sk.alt} fill sizes="(max-width: 640px) 90vw, 400px" className="object-cover" />
                  </div>
                  <figcaption className="mt-2.5 font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown/60">{sk.label}</figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-9 flex justify-center">
              <div className="btn-row">
                <Link href="/house-companion" className={btnFilled}>Ask House Companion</Link>
                <Link href={f.primaryHref} className={btnGhost}>{f.primaryLabel}</Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* THE REDESIGN, RENDERED — a contained (not full-width) output image. */}
      {f.addonImage ? (
        <section className="border-b border-house-brown/8 px-[5vw] py-16">
          <div className="mx-auto max-w-[1000px]">
            <div className="mb-8 text-center">
              <p className={kicker}>{f.addonImage.eyebrow}</p>
              <h2 className="mt-3 font-display text-[clamp(26px,3.4vw,44px)] leading-[1.08] text-house-black">
                {f.addonImage.heading} <em className="italic">{f.addonImage.headingEm}</em>
              </h2>
              <p className="mx-auto mt-4 max-w-[58ch] font-sans text-[15px] leading-[1.6] text-house-brown/70">
                {f.addonImage.caption}
              </p>
            </div>
            <div
              className="relative mx-auto w-full max-w-[880px] overflow-hidden border border-house-brown/12 bg-house-cream-dark shadow-[0_28px_70px_-45px_rgba(40,30,10,0.5)]"
              style={{ aspectRatio: f.addonImage.aspect.replace("/", " / ") }}
            >
              <Image
                src={f.addonImage.src}
                alt={f.addonImage.alt}
                fill
                sizes="(min-width:1024px) 880px, 92vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* BOUNDARY */}
      <section className="border-b border-house-brown/8 px-[5vw] py-14">
        <div className="mx-auto max-w-[1000px]">
          <p className={kicker}>What this is, and is not</p>
          <p className="mt-4 max-w-[68ch] border-l-2 border-house-gold-ink pl-5 font-sans text-[16.5px] leading-[1.6] text-house-brown/82">
            {f.boundary}
          </p>
        </div>
      </section>

      {/* THE APP — the House Companion app screen is pinned to the section's
          bottom edge and rises up; the section is shorter than the phone, so its
          top is cropped by the section. Transparent PNG, so it sits on the
          section background directly. */}
      {f.appImage ? (
        <section className="relative overflow-hidden border-b border-house-brown/8" style={{ background: "var(--color-house-cream-dark)" }}>
          <div className="mx-auto grid max-w-[1120px] items-stretch gap-[clamp(16px,4vw,56px)] px-[5vw] lg:grid-cols-[0.82fr_1.18fr]">
            {/* Phone column: relative anchor; the phone is bottom-pinned and taller
                than the row, so its top is clipped. */}
            <div className="relative min-h-[300px] lg:min-h-0">
              <div className="absolute inset-x-0 bottom-0 h-[clamp(360px,52vw,540px)]">
                <Image
                  src={f.appImage.src}
                  alt={f.appImage.alt}
                  fill
                  sizes="(max-width: 1024px) 60vw, 340px"
                  className="object-contain object-bottom lg:object-left-bottom"
                />
              </div>
            </div>
            <div className="flex max-w-[520px] flex-col justify-center py-[clamp(48px,7vw,100px)]">
              <p className={kicker}>In the House Companion app</p>
              <h2 className="mt-4 font-display text-[clamp(26px,3.4vw,44px)] leading-[1.08] text-house-black">
                See it before <em className="italic">you commit.</em>
              </h2>
              <p className="mt-5 font-sans text-[16.5px] leading-[1.65] text-house-brown/82">
                {f.appImage.caption}
              </p>
              <p className="mt-4 font-sans text-[13px] leading-[1.6] text-house-brown/60">
                Early access: the live scan is arriving. Every scan and decision is
                kept with your address in HoWA, so nothing is repeated.
              </p>
              <div className="mt-7 btn-row">
                <Link href="/house-companion" className={btnFilled}>Ask House Companion</Link>
                <Link href={f.primaryHref} className={btnGhost}>{f.primaryLabel}</Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* SIBLING ROUTES */}
      <section className="border-b border-house-brown/8 bg-house-cream-dark px-[5vw] py-16">
        <div className="mx-auto max-w-[1240px]">
          <p className={kicker}>Another way in</p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {others.map((o) => (
              <Link key={o.slug} href={`/house-companion/${o.slug}`} className="border border-house-brown/20 bg-house-cream px-4 py-2.5 font-sans text-[14px] text-house-brown/85 no-underline transition-colors hover:border-house-gold-ink hover:text-house-moss">
                {o.navLabel}
              </Link>
            ))}
            <Link href="/howa" className="border border-house-brown/20 bg-house-cream px-4 py-2.5 font-sans text-[14px] text-house-brown/85 no-underline transition-colors hover:border-house-gold-ink hover:text-house-moss">
              Plan something bigger
            </Link>
          </div>
        </div>
      </section>

      {/* HAND-OFF */}
      <section className="bg-house-forest px-[5vw] py-20 text-house-cream">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-sans text-[12px] uppercase tracking-[0.28em] text-house-gold">Ready when you are</p>
          <h2 className="mt-4 font-display text-[clamp(30px,4vw,52px)] leading-[1.05]">
            Your brief is ready. <em className="italic">Continue in HoWA.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] font-sans text-[17px] leading-[1.65] text-house-cream/80">
            Save it to your home, see the recommended next step and book. You will
            not need to start again.
          </p>
          <div className="mt-9 btn-row">
            <Link href={f.primaryHref} className="inline-block border border-house-gold bg-house-gold px-7 py-3.5 font-sans text-[12px] uppercase tracking-[0.16em] text-house-brown no-underline transition-[filter] hover:brightness-110">
              {f.primaryLabel}
            </Link>
            <Link href={f.secondaryHref} className="inline-block border border-house-cream/40 px-7 py-3.5 font-sans text-[12px] uppercase tracking-[0.16em] text-house-cream no-underline transition-colors hover:border-house-gold hover:text-house-gold">
              {f.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
