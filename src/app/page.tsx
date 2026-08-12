import Image from "next/image";
import Link from "next/link";
import s from "./home-v5/home-v5.module.css";
import { getLatestHearthArticles } from "@/lib/cms/hearth";
import { shopifyProvider } from "@/lib/commerce/shopify";
import { MiniNewsletter } from "@/components/marketing/MiniNewsletter";
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
  title: { absolute: "House of Willow Alexander | Home & pet insurance, boiler & appliance cover, shop and journal" },
  description:
    "Home and pet insurance introductions, boiler and appliance cover, a curated home and garden shop, and a journal about looking after your home. London & Kent and beyond.",
};

/** The four Protect products. Boiler and appliance are home-cover products with
 *  their own pages; home and pet route to the insurance introductions. */
const PROTECT = [
  { title: "Home Insurance", who: "Buildings and contents for a standard home. Period, listed and high-value homes go to our advised service.", signal: "Introduced by the House, arranged by Provenance", cta: "Get a home insurance quote", href: "/insurance/everyday/home", image: "/insurance/ev-home.webp", alt: "A well-kept British home" },
  { title: "Pet Insurance", who: "Dogs and cats. Lifetime, time-limited and accident-only cover, explained plainly.", signal: "For cats and dogs", cta: "Get a pet quote", href: "/insurance/everyday/pet-and-travel", image: "/insurance/ev-pet.webp", alt: "A family pet at home" },
  { title: "Boiler Cover", who: "Help when the heating stops, with cover for boilers and central heating.", signal: "Annual and monthly options", cta: "Check boiler cover", href: "/insurance/boiler-cover", image: "/insurance/boiler-cover.webp", alt: "A warm, well-kept home" },
  { title: "Appliance Cover", who: "Protect the household appliances you rely on, from washing machines to ovens.", signal: "Single or multiple items", cta: "Cover an appliance", href: "/insurance/appliance-cover", image: "/insurance/appliance-cover.webp", alt: "A considered home interior" },
];

const TRUST = [
  { h: "Built around your home", p: "not a comparison-site form" },
  { h: "Start in two minutes", p: "a postcode, then a call back" },
  { h: "London & Kent, and beyond", p: "wherever your home is" },
  { h: "Arranged by Provenance", p: "FCA-regulated, profits to charity" },
];

const SHOP_ROOMS = [
  { name: "Kitchen", handle: "kitchen", image: "/shop/rooms/kitchen.webp" },
  { name: "Living Room", handle: "living-room", image: "/shop/rooms/living-room.webp" },
  { name: "Garden & Outdoor", handle: "garden-outdoor", image: "/shop/rooms/garden.webp" },
];

const ECOSYSTEM = [
  { name: "Delve Interiors", scope: "Interior design", href: "/design/interiors" },
  { name: "Willow Gardens", scope: "Garden design", href: "/design/gardens" },
  { name: "Gardening", scope: "Book local help", href: "/services/gardening" },
  { name: "Cleaning", scope: "Book a clean", href: "/services/cleaning" },
  { name: "Window cleaning", scope: "Book a visit", href: "/services/window-cleaning" },
  { name: "Gutter cleaning", scope: "Book a visit", href: "/services/gutter-cleaning" },
];

const PRODUCTS_FALLBACK = [
  { name: "Hand-thrown mug", price: "£24.00", image: null as string | null, href: "/shop/collections/home-accessories" },
  { name: "Woven linen cushion", price: "£38.00", image: null as string | null, href: "/shop/collections/soft-furnishings" },
  { name: "Painted stem vase", price: "£32.00", image: null as string | null, href: "/shop/collections/home-accessories" },
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
    ? realProducts.slice(0, 3).map((p) => ({
        name: p.title,
        price: formatMoney(p.price),
        image: p.images[0]?.url ?? null,
        href: `/shop/${p.handle}`,
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
              That feeling<br />
              <em>you call home.</em>
            </h1>
            <p className="mt-6 max-w-[52ch] font-sans text-[clamp(17px,1.9vw,20px)] leading-[1.6] text-house-brown">
              <strong className="font-semibold text-house-black">Home &amp; pet insurance</strong> and <strong className="font-semibold text-house-black">boiler &amp; appliance cover</strong>, a <strong className="font-semibold text-house-black">curated home &amp; garden shop</strong>, and a <strong className="font-semibold text-house-black">journal</strong> on looking after your home.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/insurance" className={BTN_PRIMARY}>Explore protection</Link>
              <Link href="/shop" className={BTN_SECONDARY}>Shop all products</Link>
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
      <section className="px-[5vw] py-[clamp(44px,6vw,84px)] text-house-cream" style={{ background: "var(--house-green)" }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="mb-3 font-sans text-[11px] tracking-[0.28em] uppercase text-house-cream/60">Protection for home and those who live there</p>
              <h2 className="font-display text-[clamp(26px,3.4vw,44px)] leading-[1.08] text-house-cream">
                Cover made clear, <em className="text-[color:var(--house-green-soft)]">when it matters.</em>
              </h2>
            </div>
            <p className="max-w-[46ch] font-sans text-[16px] leading-[1.65] text-house-cream/80">
              Start with what you need. We introduce you to a trusted, regulated partner and make the hand-off explicit, so you always know whose form you are filling in.
            </p>
          </div>

          {/* Trust strip */}
          <div className="mb-6 grid grid-cols-2 gap-px overflow-hidden border border-house-cream/15 bg-house-cream/15 lg:grid-cols-4">
            {TRUST.map((t) => (
              <div key={t.h} className="bg-[var(--house-green)] px-5 py-4">
                <p className="font-sans text-[15px] font-semibold text-house-cream">{t.h}</p>
                <p className="mt-0.5 font-sans text-[12.5px] leading-[1.45] text-house-cream/65">{t.p}</p>
              </div>
            ))}
          </div>

          {/* Quote starter — plain GET hand-off to the enquiry page */}
          <form action="/insurance/speak-to-a-specialist" method="get" className="mb-8 flex flex-col gap-3 border border-house-cream/15 bg-house-cream/5 p-3 sm:flex-row sm:items-stretch">
            <input name="postcode" placeholder="Enter your postcode" aria-label="Postcode" className="min-w-0 flex-1 border border-house-cream/20 bg-house-cream px-4 py-3 font-sans text-[16.5px] text-house-brown outline-none placeholder:text-house-stone focus:border-house-cream" />
            <select name="cover" aria-label="Cover type" defaultValue="" className="flex-1 border border-house-cream/20 bg-house-cream px-4 py-3 font-sans text-[16.5px] text-house-brown outline-none focus:border-house-cream">
              <option value="" disabled>Choose cover type…</option>
              <option value="home">Home insurance</option>
              <option value="pet">Pet insurance</option>
              <option value="boiler">Boiler cover</option>
              <option value="appliance">Appliance cover</option>
            </select>
            <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap border border-house-cream bg-house-cream px-7 py-3 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--house-green-deep)] transition-[filter] hover:brightness-95">
              Start a quote
            </button>
          </form>

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

          <div className="mt-7">
            <Link href="/insurance#find-cover" className="inline-flex items-center justify-center whitespace-nowrap border border-house-cream/40 px-7 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream no-underline transition-colors hover:border-house-cream hover:bg-house-cream/10">
              View all covers →
            </Link>
          </div>

          <p className="mt-6 max-w-[80ch] font-sans text-[14px] leading-[1.6] text-house-cream/70">
            House of Willow Alexander acts as an introducer. Insurance and cover are arranged and provided by regulated third parties, including Provenance Insurance Brokers Ltd (FCA FRN 804047). Full details are shown before you leave the site.
          </p>
        </div>
      </section>

      {/* 3. Shop — real products, real prices */}
      <section className="px-[5vw] py-[clamp(44px,6vw,84px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-dark">The Shop</p>
              <h2 className="font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
                Useful, beautiful, <em>honestly priced.</em>
              </h2>
            </div>
            <p className="max-w-[46ch] font-sans text-[16px] leading-[1.65] text-house-stone">
              A considered edit of everyday pieces at real prices, with a smaller House Selection for the objects with a story worth telling.
            </p>
          </div>

          {/* Shop by room — labelled, with a route to the full room index */}
          <div className="mb-4 mt-12 flex items-end justify-between gap-4 border-t border-house-brown/12 pt-6">
            <h3 className="font-display text-[clamp(20px,2.2vw,28px)] leading-[1.06] text-house-brown">Shop by room</h3>
            <Link href="/shop" className="whitespace-nowrap font-sans text-[12px] tracking-[0.16em] uppercase text-house-gold-dark no-underline transition-colors hover:text-house-brown">
              All rooms →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {SHOP_ROOMS.map((r) => (
              <Link key={r.handle} href={`/shop/collections/${r.handle}`} className="group relative block aspect-[4/3] overflow-hidden bg-house-cream-dark no-underline">
                <Image src={r.image} alt={r.name} fill sizes="(min-width:640px) 31vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                <span aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,19,13,0.7), rgba(26,19,13,0.03) 55%)" }} />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-[clamp(18px,1.8vw,24px)] leading-[1.1] text-white">{r.name}</p>
                  <p className="mt-1 font-sans text-[11px] tracking-[0.18em] uppercase text-white/85">Shop the room →</p>
                </div>
              </Link>
            ))}
          </div>

          {/* House Selection — full-width editorial band */}
          <Link href="/shop/collections/house-approved" className="group relative mt-12 flex min-h-[180px] items-end overflow-hidden bg-house-black p-6 text-house-cream no-underline sm:min-h-[240px] sm:p-8">
            <Image src="/home-v4/pillar-3.webp" alt="An editorial still life from the House Selection" fill sizes="100vw" className="object-cover opacity-40 transition-transform duration-500 group-hover:scale-[1.03]" />
            <div className="relative max-w-[38ch]">
              <p className="font-sans text-[10.5px] tracking-[0.22em] uppercase text-house-gold-light">The House Selection</p>
              <p className="mt-2 font-display text-[clamp(22px,2.6vw,34px)] leading-[1.05]">Objects that earn their place.</p>
              <p className="mt-3 font-sans text-[12.5px] tracking-[0.16em] uppercase text-house-cream/85 group-hover:text-house-cream">Explore the selection →</p>
            </div>
          </Link>

          {/* Real product rail with prices */}
          <div className="mb-4 mt-12 flex items-end justify-between gap-4 border-t border-house-brown/12 pt-6">
            <h3 className="font-display text-[clamp(20px,2.2vw,28px)] leading-[1.06] text-house-brown">Fresh from the shelves</h3>
            <Link href="/shop" className="whitespace-nowrap font-sans text-[12px] tracking-[0.16em] uppercase text-house-gold-dark no-underline transition-colors hover:text-house-brown">
              Shop all →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {marketCards.map((p) => (
              <Link key={p.name} href={p.href} className="group block no-underline">
                <div className="relative aspect-square w-full overflow-hidden bg-house-cream-dark">
                  {p.image ? <Image src={p.image} alt={p.name} fill sizes="(min-width:640px) 22vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" /> : null}
                </div>
                <p className="mt-3 font-sans text-[15px] leading-tight text-house-brown">{p.name}</p>
                <p className="mt-0.5 font-sans text-[14px] text-house-stone">{p.price}</p>
              </Link>
            ))}
            <Link href="/shop" className="flex items-center justify-center border border-house-brown/20 bg-house-white p-6 text-center font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown no-underline transition-colors hover:border-house-brown">
              Shop all products →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Magazine — Hearth + Cinema folded in + email capture */}
      <section className="px-[5vw] py-[clamp(44px,6vw,84px)]" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-dark">The Magazine</p>
              <h2 className="font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
                Read, watch, <em>then act when useful.</em>
              </h2>
            </div>
            <p className="max-w-[46ch] font-sans text-[16px] leading-[1.65] text-house-stone">
              The Hearth and Cinema, one editorial destination that draws readers back and guides them onward.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-8">
            {/* Lead article */}
            <Link href={lead.href} className="group flex flex-col bg-house-white no-underline">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image src={lead.image} alt={lead.alt} fill sizes="(min-width:1024px) 56vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              </div>
              <div className="p-6">
                <p className="font-sans text-[10.5px] tracking-[0.2em] uppercase text-house-gold-dark">Seasonal home guide</p>
                <h3 className="mt-2 font-display text-[clamp(22px,2.4vw,32px)] leading-[1.12] text-house-brown group-hover:text-[color:var(--house-green-ink)]">{lead.title}</h3>
                {lead.dek ? <p className="mt-3 max-w-[54ch] font-sans text-[16.5px] leading-[1.6] text-house-stone">{lead.dek}</p> : null}
                <span className="mt-4 inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--house-green-ink)]">Read the story →</span>
              </div>
            </Link>

            <div className="flex flex-col gap-4">
              {/* Cinema folded in as a video item */}
              <Link href="/cinema" className="group grid grid-cols-[120px_1fr] items-center gap-4 bg-house-white p-3 no-underline sm:grid-cols-[150px_1fr]">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image src="/home-v4/cinema-grid.webp" alt="A film still from the House Cinema" fill sizes="150px" style={{ objectPosition: "center bottom" }} className="object-cover" />
                  <span aria-hidden className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-black/35 text-[12px] text-white">▶</span>
                  </span>
                </div>
                <div>
                  <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-house-gold-dark">Film</p>
                  <h4 className="mt-1 font-display text-[18px] leading-tight text-house-brown group-hover:text-[color:var(--house-green-ink)]">A room made for reading</h4>
                  <span className="mt-1 inline-block font-sans text-[11px] tracking-[0.14em] uppercase text-[color:var(--house-green-ink)]">Watch the film →</span>
                </div>
              </Link>
              {/* Two secondary articles */}
              {secondary.slice(0, 2).map((story) => (
                <Link key={story.title} href={story.href} className="group grid grid-cols-[120px_1fr] items-center gap-4 bg-house-white p-3 no-underline sm:grid-cols-[150px_1fr]">
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image src={story.image} alt={story.alt} fill sizes="150px" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-house-gold-dark">Home care</p>
                    <h4 className="mt-1 font-display text-[18px] leading-tight text-house-brown group-hover:text-[color:var(--house-green-ink)]">{story.title}</h4>
                    <span className="mt-1 inline-block font-sans text-[11px] tracking-[0.14em] uppercase text-[color:var(--house-green-ink)]">Read the guide →</span>
                  </div>
                </Link>
              ))}
              {/* Email capture — the only sign-up on the page */}
              <div className="bg-[var(--house-green)] p-5 text-house-cream">
                <p className="font-display text-[19px] leading-tight">A useful note, once a week.</p>
                <p className="mt-1 mb-3 font-sans text-[12.5px] leading-[1.5] text-house-cream/70">Seasonal advice, new stories and selected objects. No daily noise.</p>
                <MiniNewsletter sourcePage="/" />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-house-brown/12 pt-6">
            <Link href="/the-hearth" className="font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--house-green-ink)] no-underline hover:text-house-brown">Read the magazine →</Link>
            {[
              { label: "Interiors", href: "/the-hearth/category/interiors-and-styling" },
              { label: "Gardens", href: "/the-hearth/category/gardens-and-exteriors" },
              { label: "Food and hosting", href: "/recipes" },
              { label: "Films", href: "/cinema" },
            ].map((c) => (
              <Link key={c.label} href={c.href} className="font-sans text-[14px] text-house-stone no-underline underline-offset-4 hover:text-house-brown hover:underline">{c.label}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Proof strip — dark burgundy */}
      <section className="px-[5vw] py-[clamp(40px,5vw,72px)] text-house-cream" style={{ background: "var(--ins-accent)" }}>
        <div className="mx-auto grid max-w-[1180px] items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 font-sans text-[11px] tracking-[0.28em] uppercase text-house-cream/60">The House, in practice</p>
            <h2 className="font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-cream">
              Trusted with the practical parts of <em className="text-[color:var(--house-green-soft)]">home.</em>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { h: "FCA-regulated partner", p: "cover arranged by Provenance, not by us" },
              { h: "Named support", p: "real people when you need them" },
              { h: "London & Kent", p: "service areas shown before you begin" },
            ].map((e) => (
              <div key={e.h}>
                <p className="font-display text-[19px] leading-tight text-house-cream">{e.h}</p>
                <p className="mt-1.5 font-sans text-[14px] leading-[1.5] text-house-cream/70">{e.p}</p>
              </div>
            ))}
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

      {/* 7. Ecosystem strip — one compact row */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(28px,4vw,52px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[1180px]">
          <p className="mb-6 text-center font-display text-[clamp(18px,2vw,26px)] leading-tight text-house-brown">Interiors, gardens and trusted local services</p>
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-house-brown/12 bg-house-brown/12 sm:grid-cols-3 lg:grid-cols-6">
            {ECOSYSTEM.map((e) => (
              <Link key={e.name} href={e.href} className="group flex flex-col items-center bg-house-white px-4 py-6 text-center no-underline transition-colors hover:bg-house-cream">
                <span className="font-display text-[16px] leading-tight text-house-brown group-hover:text-[color:var(--house-green-ink)]">{e.name}</span>
                <span className="mt-1 font-sans text-[11.5px] text-house-stone">{e.scope}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
