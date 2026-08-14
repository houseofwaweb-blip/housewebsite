import Image from "next/image";
import Link from "next/link";
import s from "./home-v5/home-v5.module.css";
import { getLatestHearthArticles } from "@/lib/cms/hearth";
import { shopifyProvider } from "@/lib/commerce/shopify";
import { MiniNewsletter } from "@/components/marketing/MiniNewsletter";
import { ProductRailCard } from "@/components/marketing/ProductRailCard";
import { ProvenanceLockup } from "@/components/insurance/ProvenanceLockup";
import { DESIGN_VOUCHERS } from "@/lib/design-vouchers";

/**
 * Homepage — Aug 2026 rework (aug12 feedback, variant 1).
 *
 * A front door with clearly signposted rooms, not a brand portal. The hero
 * carries the feeling and a plain-English proposition; a dark Protect module
 * sits immediately below the fold (the highest-intent, previously-buried line);
 * Shop shows real prices; the Magazine folds Cinema in and carries the only
 * email capture; a proof strip, a short House block and one ecosystem strip
 * close it out. Palette mixes the House cream/gold with deep green (Protect)
 * and burgundy (proof). Gold is demoted from CTA duty to ornament.
 */

export const metadata = {
  title: { absolute: "House of Willow Alexander | Home & pet insurance, boiler & appliance cover, shop and magazine" },
  description:
    "Home and pet insurance introductions, boiler and appliance cover, a curated home and garden shop, and a magazine about looking after your home. London & Kent and beyond.",
  alternates: { canonical: "/" },
};

/** The four Protect products. Boiler and appliance are home-cover products with
 *  their own pages; home and pet route to the insurance introductions. */
const PROTECT = [
  { title: "Home Insurance", who: "Buildings and contents for a standard home. Period, listed and high-value homes go to our advised service.", signal: "For a standard home", cta: "Get a home insurance quote", href: "/insurance/everyday/home", image: "/insurance/ev-home.webp", alt: "A well-kept British home" },
  { title: "Pet Insurance", who: "Dogs and cats. Lifetime, time-limited and accident-only cover, explained plainly.", signal: "For cats and dogs", cta: "Get a pet quote", href: "/insurance/everyday/pet-and-travel", image: "/insurance/ev-pet.webp", alt: "A family pet at home" },
  { title: "Boiler Cover", who: "Help when the heating stops, with cover for boilers and central heating.", signal: "Annual and monthly options", cta: "Check boiler cover", href: "/insurance/boiler-cover", image: "/insurance/boiler-cover.webp", alt: "A warm, well-kept home" },
  { title: "Appliance Cover", who: "Protect the household appliances you rely on, from washing machines to ovens.", signal: "Single or multiple items", cta: "Cover an appliance", href: "/insurance/appliance-cover", image: "/insurance/appliance-cover.webp", alt: "A considered home interior" },
];

// Trust row at the top of the green module. Rating is our real 5-star (no
// count shown); the rest are honest, verifiable signals — no fabricated
// review counts or "homes protected" figures.
const TRUST: { h: string; p: string; gold?: boolean }[] = [
  { h: "5.0 ★★★★★", p: "Verified customer rating", gold: true },
  { h: "FCA-regulated partner", p: "Cover arranged by Provenance" },
  { h: "Named support", p: "Real people, not a call centre" },
  { h: "London & Kent, and beyond", p: "Wherever your home is" },
];

const SHOP_ROOMS = [
  { name: "Kitchen", handle: "kitchen", image: "/shop/rooms/kitchen.webp" },
  { name: "Living Room", handle: "living-room", image: "/shop/rooms/living-room.webp" },
  { name: "Garden & Outdoor", handle: "garden-outdoor", image: "/shop/rooms/garden.webp" },
];

const ECOSYSTEM = [
  { name: "Interior Design", href: "/design/interiors" },
  { name: "Garden Design", href: "/design/gardens" },
  { name: "Home Services", href: "/services" },
];

const PRODUCTS_FALLBACK = [
  { name: "Hand-thrown mug", price: "£24.00", image: null as string | null, href: "/shop/collections/home-accessories", handle: "", variantId: undefined as string | undefined, multiVariant: true, inStock: true },
  { name: "Woven linen cushion", price: "£38.00", image: null as string | null, href: "/shop/collections/soft-furnishings", handle: "", variantId: undefined as string | undefined, multiVariant: true, inStock: true },
  { name: "Painted stem vase", price: "£32.00", image: null as string | null, href: "/shop/collections/home-accessories", handle: "", variantId: undefined as string | undefined, multiVariant: true, inStock: true },
];

const HEARTH_FALLBACK = [
  { title: "The August home checklist: a calm guide to late summer", dek: "Practical jobs, quieter rooms and the small decisions that make a home easier to live in.", image: "/home-v4/pillar-1.webp" },
  { title: "How to read a house survey", dek: "The findings that matter, and the ones that read worse than they are.", image: "/home-v4/pillar-2.webp" },
  { title: "The art of the considered interior", dek: "Why the best rooms look as though nobody tried.", image: "/home-v4/pillar-3.webp" },
  { title: "Five things your boiler is telling you", dek: "The noises worth acting on before the cold arrives.", image: "/home-v4/pillar-4.webp" },
];

function formatMoney(m: { amount: string; currencyCode: string }) {
  const sym = m.currencyCode === "GBP" ? "£" : m.currencyCode === "USD" ? "$" : "";
  return `${sym}${Number(m.amount).toFixed(2)}`;
}

// Button styles — gold is off CTA duty; primary is solid green, secondary is ink outline.
const BTN_PRIMARY = "inline-flex items-center justify-center whitespace-nowrap border border-[color:var(--house-green-deep)] bg-[var(--house-green)] px-7 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream no-underline transition-[filter] hover:brightness-110";
const BTN_SECONDARY = "inline-flex items-center justify-center whitespace-nowrap border border-house-brown/40 px-7 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown no-underline transition-colors hover:border-house-brown";

export default async function HomePage() {
  const hearthArticles = await getLatestHearthArticles(4).catch(() => []);
  const shopProducts = await shopifyProvider.listFeaturedProducts(12).catch(() => []);
  // Design edits/plans and care vouchers are sold on their own pages, never as
  // homeware — keep them out of the Shop rail (same rule as /shop's isPlanProduct).
  const voucherHandles = new Set(
    Object.values(DESIGN_VOUCHERS).map((v) => v.handle).filter(Boolean) as string[],
  );
  const PLAN_TITLE = /\b(edit|plan|plans|apartment\+|home & garden\+|full house)\b/i;
  const realProducts = shopProducts.filter(
    (p) => !voucherHandles.has(p.handle) && !PLAN_TITLE.test(p.title),
  );
  const marketCards = realProducts.length
    ? realProducts.slice(0, 7).map((p) => ({
        name: p.title,
        price: formatMoney(p.price),
        image: p.images[0]?.url ?? null,
        href: `/shop/${p.handle}`,
        handle: p.handle,
        variantId: p.variantId,
        multiVariant: (p.variantCount ?? 1) > 1,
        inStock: p.availableForSale,
      }))
    : PRODUCTS_FALLBACK;

  const stories = hearthArticles.length >= 4
    ? hearthArticles.slice(0, 4).map((a) => ({ title: a.title, dek: a.dek ?? "", href: `/the-hearth/${a.slug}`, image: a.image, alt: a.imageAlt ?? a.title }))
    : HEARTH_FALLBACK.map((f) => ({ title: f.title, dek: f.dek, href: "/the-hearth", image: f.image, alt: f.title }));
  const [lead, ...secondary] = stories;

  return (
    <div className={s.page}>
      {/* 1. Hero — feeling + plain proposition + one primary CTA */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className="font-sans text-[11px] tracking-[0.28em] uppercase text-house-gold-dark">The British home, covered and cared for</p>
            <h1 className={s.heroTitle}>
              That feeling{" "}<br />
              <em>you call home.</em>
            </h1>
            <p className="mt-6 max-w-[52ch] font-sans text-[clamp(17px,1.9vw,20px)] leading-[1.6] text-house-brown">
              <strong className="font-semibold text-house-black">Home &amp; pet insurance</strong> and <strong className="font-semibold text-house-black">boiler &amp; appliance cover</strong>, a <strong className="font-semibold text-house-black">curated home &amp; garden shop</strong>, and a <strong className="font-semibold text-house-black">magazine</strong> about looking after your home.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:max-w-[500px]">
              <Link href="/insurance" className={`${BTN_PRIMARY} w-full sm:flex-1`}>Get covered</Link>
              <Link href="/shop" className={`${BTN_SECONDARY} w-full sm:flex-1`}>Shop all products</Link>
            </div>
          </div>
        </div>
        <div className={s.heroVisual}>
          <div className={s.heroVisualFrame}>
            <Image
              src="/home-v4/hero-georgian-london.webp"
              alt="A refined sage-green Georgian London townhouse with a classical portico entrance, urn planters and a hedge-lined front garden"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* 2. Protect — dark green module, immediately below the fold */}
      <section className="px-[5vw] pt-[clamp(28px,4vw,52px)] pb-[clamp(44px,6vw,84px)] text-house-cream" style={{ background: "var(--house-green)" }}>
        <div className="mx-auto max-w-[1200px]">
          {/* Trust row — the proof signals, at the top of the green module */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 border-b border-house-cream/15 pb-8 sm:grid-cols-4">
            {TRUST.map((t) => (
              <div key={t.h} className="text-center">
                <p className={`font-display text-[clamp(16px,1.8vw,19px)] leading-tight ${t.gold ? "text-house-gold-light" : "text-house-cream"}`}>{t.h}</p>
                <p className="mt-1.5 font-sans text-[12.5px] leading-[1.4] text-house-cream/65">{t.p}</p>
              </div>
            ))}
          </div>

          {/* Heading — centered layout, original copy */}
          <div className="mx-auto mt-10 mb-9 max-w-[680px] text-center">
            <h2 className="font-display text-[clamp(28px,3.6vw,44px)] leading-[1.08] text-house-cream">
              Cover made clear, <em className="text-[color:var(--house-green-soft)]">when it matters.</em>
            </h2>
            <p className="mt-4 font-sans text-[16.5px] leading-[1.6] text-house-cream/80">
              Start with what you need. We introduce you to a trusted, regulated partner and make the hand-off explicit, so you always know whose form you are filling in.
            </p>
          </div>

          {/* Four product cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROTECT.map((p) => (
              <Link key={p.title} href={p.href} className="group flex flex-col overflow-hidden bg-house-cream no-underline transition-[filter] hover:brightness-[1.02]">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image src={p.image} alt={p.alt} fill sizes="(min-width:1024px) 22vw, (min-width:640px) 46vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[21px] leading-tight text-house-black">{p.title}</h3>
                  <p className="mt-2 flex-1 font-sans text-[14.5px] leading-[1.55] text-house-brown/80">{p.who}</p>
                  <p className="mt-4 font-sans text-[10.5px] tracking-[0.16em] uppercase text-[color:var(--house-green-ink)]">{p.signal}</p>
                  <span className="mt-2 font-sans text-[12.5px] font-semibold text-[color:var(--house-green-ink)] group-hover:underline">{p.cta} →</span>
                </div>
              </Link>
            ))}
          </div>

          <ProvenanceLockup variant="onDark" className="mt-8" />

          <p className="mt-6 max-w-[80ch] font-sans text-[14px] leading-[1.6] text-house-cream/70">
            House of Willow Alexander acts as an introducer. Insurance and cover are arranged and provided by regulated third parties, including Provenance Insurance Brokers Ltd (FCA FRN 804047). Full details are shown before you leave the site.
          </p>
        </div>
      </section>

      {/* 3. Shop — real products, real prices */}
      <section className="px-[5vw] py-[clamp(44px,6vw,84px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[1280px]">
          {/* Row 1 — heading + rooms + House Selection, one line */}
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-5 lg:items-stretch">
            {/* Heading block */}
            <div className="col-span-2 flex flex-col justify-center lg:col-span-1">
              <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-dark">The Shop</p>
              <h2 className="font-display text-[clamp(24px,2.4vw,32px)] leading-[1.08] text-house-brown">
                Chosen for <em>the House.</em>
              </h2>
              <Link href="/shop" className="mt-4 inline-flex w-fit items-center font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--house-green-ink)] no-underline transition-colors hover:text-house-brown">
                Shop all products →
              </Link>
            </div>
            {/* Room cards */}
            {SHOP_ROOMS.map((r) => (
              <Link key={r.handle} href={`/shop/collections/${r.handle}`} className="group relative block h-full min-h-[220px] overflow-hidden bg-house-cream-dark no-underline">
                <Image src={r.image} alt={r.name} fill sizes="(min-width:1024px) 18vw, 46vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                <span aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,19,13,0.72), rgba(26,19,13,0.03) 55%)" }} />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-[clamp(17px,1.6vw,22px)] leading-[1.1] text-white">{r.name}</p>
                  <p className="mt-1 font-sans text-[10.5px] tracking-[0.18em] uppercase text-white/85">Shop now →</p>
                </div>
              </Link>
            ))}
            {/* House Selection */}
            <Link href="/shop/collections/house-approved" className="group col-span-2 flex flex-col justify-center bg-house-cream-dark/55 p-5 no-underline lg:col-span-1">
              <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-house-gold-dark">House Selection</p>
              <p className="mt-2 font-sans text-[15px] leading-[1.5] text-house-stone">Our edit of considered pieces for your home.</p>
              <span className="mt-4 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--house-green-ink)] transition-colors group-hover:text-house-brown">Explore the collection →</span>
            </Link>
          </div>

          {/* Row 2 — products, plain cards */}
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4">
            {marketCards.slice(0, 4).map((p) => (
              <ProductRailCard key={p.name} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Magazine — dark green, horizontal row (heading · lead · 3 cards · email) */}
      <section className="px-[5vw] py-[clamp(44px,6vw,80px)] text-house-cream" style={{ background: "var(--house-green)" }}>
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-6 lg:h-[400px] lg:grid-cols-[0.8fr_1.9fr_2.6fr_1.2fr] lg:items-stretch">
            {/* Heading */}
            <div className="flex flex-col justify-center">
              <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-light">From the Magazine</p>
              <h2 className="font-display text-[clamp(24px,2.4vw,32px)] leading-[1.1] text-house-cream">
                Read, watch, <em className="text-[color:var(--house-green-soft)]">take what&apos;s useful.</em>
              </h2>
              <Link href="/the-hearth" className="mt-4 inline-flex w-fit items-center font-sans text-[12px] tracking-[0.16em] uppercase text-house-gold-light no-underline transition-colors hover:text-house-cream">
                Visit the magazine →
              </Link>
            </div>

            {/* Lead card — text left, image right */}
            <Link href={lead.href} className="group grid grid-cols-1 overflow-hidden bg-house-cream/[0.06] no-underline sm:grid-cols-2">
              <div className="order-2 flex flex-col justify-center p-5 sm:order-1">
                <span className="w-fit border border-house-cream/40 px-2 py-1 font-sans text-[10px] tracking-[0.16em] uppercase text-house-cream/85">Home</span>
                <h3 className="mt-3 line-clamp-3 font-display text-[clamp(18px,1.7vw,23px)] leading-[1.16] text-house-cream group-hover:text-house-gold-light">{lead.title}</h3>
                {lead.dek ? <p className="mt-2 line-clamp-3 font-sans text-[13px] leading-[1.5] text-house-cream/70">{lead.dek}</p> : null}
                <span className="mt-4 font-sans text-[10.5px] tracking-[0.14em] uppercase text-house-gold-light">Read the story →</span>
              </div>
              <div className="relative order-1 min-h-[200px] sm:order-2 lg:h-full">
                <Image src={lead.image} alt={lead.alt} fill sizes="(min-width:1024px) 24vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
            </Link>

            {/* 3 small cards */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { cat: "Interiors", title: secondary[0]?.title, href: secondary[0]?.href, image: secondary[0]?.image, alt: secondary[0]?.alt, cta: "Read more →", video: false },
                { cat: "Garden", title: secondary[1]?.title, href: secondary[1]?.href, image: secondary[1]?.image, alt: secondary[1]?.alt, cta: "Read more →", video: false },
                { cat: "Lifestyle", title: "A room made for reading", href: "/cinema", image: "/home-v4/cinema-grid.webp", alt: "A film still from the House Cinema", cta: "Watch now →", video: true },
              ].map((c) => (
                <Link key={c.cat} href={c.href ?? "/the-hearth"} className="group flex h-full flex-col no-underline">
                  <div className="relative aspect-[4/5] min-h-0 w-full overflow-hidden lg:aspect-auto lg:flex-1">
                    <Image src={c.image ?? "/home-v4/pillar-1.webp"} alt={c.alt ?? ""} fill sizes="(min-width:1024px) 15vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                    {c.video ? (
                      <span aria-hidden className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-black/35 text-[12px] text-white">▶</span>
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2.5 font-sans text-[10px] tracking-[0.18em] uppercase text-house-gold-light">{c.cat}</p>
                  <h4 className="mt-1 line-clamp-2 font-display text-[15px] leading-tight text-house-cream group-hover:text-house-gold-light">{c.title}</h4>
                  <span className="mt-1 inline-block font-sans text-[10.5px] tracking-[0.12em] uppercase text-house-cream/60">{c.cta}</span>
                </Link>
              ))}
            </div>

            {/* Email box */}
            <div className="flex flex-col justify-center bg-house-cream/[0.06] p-5">
              <p className="font-display text-[19px] leading-tight text-house-cream">Get useful notes, straight to your inbox.</p>
              <p className="mt-1.5 mb-3 font-sans text-[12.5px] leading-[1.5] text-house-cream/70">Practical ideas, timely advice and new things we love.</p>
              <MiniNewsletter sourcePage="/" />
            </div>
          </div>
        </div>
      </section>


      {/* 6. The House — short */}
      <section className="px-[5vw] py-[clamp(44px,6vw,84px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto grid max-w-[1120px] items-center gap-[clamp(28px,4.5vw,60px)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-house-cream-dark">
            <Image src="/home/origin-studio.webp" alt="The original Willow Alexander garden studio: soil, seasons and a single electric van" fill sizes="(min-width:1024px) 42vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-dark">The House</p>
            <h2 className="mb-4 font-display text-[clamp(24px,3vw,40px)] leading-[1.08] text-house-brown">
              A modern British <em>home tradition.</em>
            </h2>
            <p className="mb-5 max-w-[56ch] font-sans text-[16px] leading-[1.7] text-house-stone">
              House of Willow Alexander brings protection, useful objects and thoughtful editorial under one roof. The proposition is practical; the point of view remains distinctly ours.
            </p>
            <Link href="/the-house/about" className={BTN_SECONDARY}>Read our story</Link>
          </div>
        </div>
      </section>

      {/* 7. Ecosystem strip — one thin inline row */}
      <section className="border-t border-house-brown/12 px-[5vw] py-[clamp(20px,3vw,34px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <span className="font-sans text-[12px] tracking-[0.16em] uppercase text-house-stone">More from the House</span>
          {ECOSYSTEM.map((e) => (
            <Link key={e.name} href={e.href} className="font-sans text-[14.5px] text-house-brown no-underline transition-colors hover:text-[color:var(--house-green-ink)]">
              {e.name} →
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
