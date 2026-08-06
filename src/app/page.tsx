import Image from "next/image";
import Link from "next/link";
import s from "./home-v5/home-v5.module.css";
import { getLatestHearthArticles } from "@/lib/cms/hearth";
import { shopifyProvider } from "@/lib/commerce/shopify";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";

/**
 * Homepage — Aug 2026 eComm/Insurance refocus.
 *
 * The House pares down to a curated marketplace, home insurance, The Hearth,
 * Cinema (video), and light links out to the Willow Alexander service
 * businesses. The booking platform, HoWA product marketing and AI design/
 * companion layer are all gone. Booking a service is a plain outbound step
 * (the business sites, or howa.co.uk).
 */

export const metadata = {
  title: { absolute: "House of Willow Alexander | Marketplace, insurance, The Hearth and film" },
  description:
    "A curated marketplace, home and pet insurance introductions, editorial journal and film, and the Willow Alexander home-service businesses.",
};

/** The House's destinations — six image-led cards, all visible on desktop. */
const DESTINATIONS = [
  { want: "Find something for my home", title: "The Marketplace", line: "Considered goods for the work and pleasure of home.", cta: "Shop the House", href: "/shop", image: "/shop/rooms/kitchen.webp", alt: "A kitchen dressed with House-selected pieces" },
  { want: "Protect my home or pet", title: "Insurance", line: "Dedicated Home and Pet Insurance introductions.", cta: "Explore Insurance", href: "/insurance", image: "/home-v4/protect-insurance.webp", alt: "An Edwardian London townhouse at golden hour" },
  { want: "Read and be inspired", title: "The Hearth", line: "Stories, gardens, recipes and the culture of home.", cta: "Enter The Hearth", href: "/the-hearth", image: "/home-v4/pillar-3.webp", alt: "An editorial still life from The Hearth" },
  { want: "Watch and unwind", title: "Cinema", line: "Films and short video from the House.", cta: "Enter the Cinema", href: "/cinema", image: "/home-v4/pillar-2.webp", alt: "A cinematic, low-lit interior scene" },
  { want: "Design a room or garden", title: "Design", line: "Considered interiors and gardens by our studios.", cta: "Explore Design", href: "/design", image: "/home-v4/design-portrait.webp", alt: "A considered interior scheme by the House studios" },
  { want: "Care for my home or garden", title: "Services", line: "The Willow Alexander home-service businesses.", cta: "See the services", href: "/services", image: "/services/photos/gardening/lawn-care-hero.webp", alt: "Two gardeners mowing and clearing a large lawn" },
];

/** A curated snapshot of the service businesses. Cards link to the service
 *  page, which links out to each business + HoWA. */
const POPULAR_SERVICES = [
  { name: "Gardening", href: "/services/gardening", scope: "Lawns, borders and hedges kept in order through the season.", image: "/services/photos/gardening/garden-tidy-hero.webp" },
  { name: "Cleaning", href: "/services/cleaning", scope: "A cleaner who learns your home and holds it to the same standard.", image: "/services/photos/cleaning/regular-cleaning-hero.webp" },
  { name: "Window cleaning", href: "/services/window-cleaning", scope: "Reach-and-wash exterior cleaning across London and Kent.", image: "/services/photos/window-cleaning/one-off-window-cleaning-hero.webp" },
  { name: "Handyman", href: "/services/handyman", scope: "Repairs, maintenance and the jobs that have been waiting.", image: "/services/photos/handyman-hero.webp" },
];

const SHOP_EDIT = [
  { name: "Kitchen", handle: "kitchen", image: "/shop/rooms/kitchen.webp" },
  { name: "Living Room", handle: "living-room", image: "/shop/rooms/living-room.webp" },
  { name: "Garden & Outdoor", handle: "garden-outdoor", image: "/shop/rooms/garden.webp" },
];

const PRODUCTS = [
  { name: "Dark Grey Chunky Knit Throw", price: "£89.00", image: "https://cdn.shopify.com/s/files/1/1006/9449/1462/files/handmade-dark-grey-chunky-knit-throw.jpg", href: "/shop/collections/soft-furnishings" },
  { name: "Soft Furnishings", price: "The collection", image: null, href: "/shop/collections/soft-furnishings" },
  { name: "Home Accessories", price: "The collection", image: null, href: "/shop/collections/home-accessories" },
];

const HEARTH_FALLBACK = [
  { title: "A guide to seasonal planting", dek: "What to put in the ground now so the garden earns its keep in spring.", image: "/home-v4/pillar-1.webp" },
  { title: "How to read a house survey", dek: "The findings that matter, and the ones that read worse than they are.", image: "/home-v4/pillar-2.webp" },
  { title: "The art of the considered interior", dek: "Why the best rooms look as though nobody tried.", image: "/home-v4/pillar-3.webp" },
  { title: "Five things your boiler is telling you", dek: "The noises worth acting on before the cold arrives.", image: "/home-v4/pillar-4.webp" },
];

function formatMoney(m: { amount: string; currencyCode: string }) {
  const sym = m.currencyCode === "GBP" ? "£" : m.currencyCode === "USD" ? "$" : "";
  return `${sym}${Number(m.amount).toFixed(2)}`;
}

export default async function HomePage() {
  const hearthArticles = await getLatestHearthArticles(4).catch(() => []);
  const shopProducts = await shopifyProvider.listFeaturedProducts(3).catch(() => []);
  const marketCards = shopProducts.length
    ? shopProducts.slice(0, 3).map((p) => ({
        name: p.title,
        price: formatMoney(p.price),
        image: p.images[0]?.url ?? null,
        href: `/shop/${p.handle}`,
      }))
    : PRODUCTS;

  const stories = hearthArticles.length >= 4
    ? hearthArticles.slice(0, 4).map((a) => ({ title: a.title, dek: a.dek ?? "", href: `/the-hearth/${a.slug}`, image: a.image, alt: a.imageAlt ?? a.title }))
    : HEARTH_FALLBACK.map((f) => ({ title: f.title, dek: f.dek, href: "/the-hearth", image: f.image, alt: f.title }));
  const [lead, ...secondary] = stories;

  return (
    <div className={s.page}>
      {/* 1. Utility strip */}
      <div className="border-b border-house-brown/10 bg-house-cream-dark/40 px-[5vw] py-2">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center">
          <p className="m-0 font-sans text-[12px] tracking-[0.06em] text-house-stone">
            A curated marketplace, insurance and The Hearth
          </p>
          <a href="tel:08000478738" className="font-sans text-[12px] tracking-[0.06em] text-house-brown no-underline hover:text-house-gold-ink">
            0800 047 8738
          </a>
        </div>
      </div>

      {/* 2. Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <FlowerWatermark color="gold" side="left" opacity={0.16} className="!top-auto bottom-[-12%] h-[74%]" />
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>House of Willow Alexander</p>
            <h1 className={s.heroTitle}>
              That feeling<br />
              <em>you call home.</em>
            </h1>
            <p className={s.heroLede}>
              A curated marketplace, home and pet insurance, an editorial journal
              and film, and the trusted people who look after home and garden.
            </p>
            <div className="mt-7 grid max-w-[520px] grid-cols-2 gap-3">
              <Link href="/shop" className={s.btnFilled} style={{ justifyContent: "center", textAlign: "center", whiteSpace: "nowrap" }}>
                Marketplace
              </Link>
              <Link href="/insurance" className={s.btnGhost} style={{ justifyContent: "center", textAlign: "center", whiteSpace: "nowrap" }}>
                Insurance
              </Link>
              <Link href="/the-hearth" className={s.btnGhost} style={{ justifyContent: "center", textAlign: "center", whiteSpace: "nowrap" }}>
                The Hearth
              </Link>
              <Link href="/services" className={s.btnFilled} style={{ justifyContent: "center", textAlign: "center", whiteSpace: "nowrap" }}>
                Home services
              </Link>
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

      {/* 3. Destination chooser */}
      <section id="house-help" className="px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto mb-10 max-w-[680px] text-center">
            <h2 className="mb-4 font-display text-[clamp(28px,3.4vw,46px)] leading-[1.06] text-house-brown">
              How can the House help?
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              Shop, protect, read, watch, design, or find trusted help for the
              home and garden.
            </p>
          </div>
          <p className="mb-3 font-sans text-[11px] tracking-[0.2em] uppercase text-house-stone/70 lg:hidden">
            Swipe for all six
          </p>
          <div className="-mx-[5vw] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[5vw] pb-3 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
            {DESTINATIONS.map((d) => (
              <Link
                key={d.title}
                href={d.href}
                className="group flex w-[78vw] shrink-0 snap-start flex-col border border-house-brown/12 bg-house-cream no-underline transition-colors hover:border-house-gold sm:w-[52vw] lg:w-auto"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-house-cream-dark">
                  <Image src={d.image} alt={d.alt} fill sizes="(min-width: 1024px) 31vw, 78vw" className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="mb-2 font-sans text-[11px] tracking-[0.18em] uppercase text-house-gold-ink">{d.want}</p>
                  <h3 className="mb-2.5 font-display text-[26px] leading-tight text-house-brown">{d.title}</h3>
                  <p className="mb-6 flex-1 font-sans text-[15px] leading-[1.55] text-house-stone">{d.line}</p>
                  <span className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink transition-colors group-hover:text-house-brown">{d.cta} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Shop */}
      <section className="px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-[560px]">
              <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">The Marketplace</p>
              <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
                Chosen for <em>the House.</em>
              </h2>
              <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
                Useful and beautiful things for the work and pleasure of keeping a
                home. Every object earns its place.
              </p>
            </div>
            <Link href="/shop" className={s.btnGhost}>
              Shop the House <span aria-hidden className={s.arrow}>→</span>
            </Link>
          </div>
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {SHOP_EDIT.map((r) => (
              <Link key={r.handle} href={`/shop/collections/${r.handle}`} className="group relative block aspect-[4/3] overflow-hidden bg-house-cream-dark no-underline">
                <Image src={r.image} alt={r.name} fill sizes="(min-width: 640px) 31vw, 100vw" className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.04]" />
                <span aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,19,13,0.72), rgba(26,19,13,0.05) 55%)" }} />
                <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                  <p className="font-display text-[clamp(18px,1.8vw,26px)] leading-[1.1] text-white">{r.name}</p>
                  <p className="mt-1.5 font-sans text-[12px] tracking-[0.2em] uppercase text-white/80 transition-colors group-hover:text-white">Shop the room →</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {marketCards.map((p) => (
              <Link key={p.name} href={p.href} className={s.productCard}>
                <div className={s.productImg}>
                  {p.image ? <Image src={p.image} alt={p.name} fill sizes="(min-width: 640px) 31vw, 100vw" /> : null}
                </div>
                <div className={s.productBody}>
                  <p className={s.productName}>{p.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Insurance */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto mb-10 max-w-[660px] text-center">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">Insurance</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
              Protection for home <em>and those who live there.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              The House introduces you to an authorised partner. The regulated
              advice, the quotation and the policy come from them, not from us.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { title: "Home Insurance", body: "For period homes, non-standard construction, valuable contents and households that do not fit a comparison-site form.", href: "/insurance/home", cta: "Explore Home Insurance", image: "/home-v4/protect-insurance.webp", alt: "An Edwardian London townhouse at golden hour", pos: "center" },
              { title: "Pet Insurance", body: "For dogs, cats and the animals that make a house a home. Lifetime, time-limited and accident-only cover explained plainly.", href: "/insurance/pet", cta: "Explore Pet Insurance", image: "/services/subbrands/dog-walking.webp", alt: "A dog lead, waste-bag holder and travel bowl laid out on a wooden table", pos: "bottom" },
            ].map((card) => (
              <Link key={card.title} href={card.href} className="group flex flex-col border border-house-brown/12 bg-house-cream no-underline transition-colors hover:border-house-gold">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-house-cream-dark">
                  <Image src={card.image} alt={card.alt} fill sizes="(min-width: 768px) 44vw, 100vw" style={{ objectPosition: card.pos }} className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="mb-2 font-display text-[24px] leading-tight text-house-brown">{card.title}</h3>
                  <p className="mb-6 flex-1 font-sans text-[15px] leading-[1.55] text-house-stone">{card.body}</p>
                  <span className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink transition-colors group-hover:text-house-brown">{card.cta} →</span>
                </div>
              </Link>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-[70ch] text-center font-sans text-[12px] leading-[1.5] text-house-stone/80">
            House of Willow Alexander is an introducer only and does not provide,
            arrange or advise on insurance. Cover is arranged and provided by an
            authorised, FCA-regulated insurance partner.
          </p>
        </div>
      </section>

      {/* 6. Editorial feature from The Hearth */}
      <section className="px-[5vw] py-[clamp(52px,6.5vw,100px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-10 max-w-[640px]">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">From The Hearth</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
              Notes on the life <em>of the home.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              Stories, observations and useful knowledge for the way we live,
              gather, cultivate and care for the places we call home.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
            <Link href={lead.href} className="group flex flex-col no-underline">
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-house-cream-dark">
                <Image src={lead.image} alt={lead.alt} fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.02]" />
              </div>
              <h3 className="mt-6 font-display text-[clamp(24px,2.8vw,38px)] leading-[1.12] text-house-brown transition-colors group-hover:text-house-gold-ink">{lead.title}</h3>
              {lead.dek ? <p className="mt-3 max-w-[54ch] font-sans text-[16px] leading-[1.6] text-house-stone">{lead.dek}</p> : null}
              <span className="mt-4 font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink">Read the story →</span>
            </Link>
            <div className="flex flex-col gap-6">
              {secondary.map((story, i) => (
                <Link key={story.title} href={story.href} className={i === 0 ? "group flex flex-col no-underline" : "group grid grid-cols-[100px_1fr] items-start gap-4 no-underline sm:grid-cols-[132px_1fr]"}>
                  <div className={i === 0 ? "relative aspect-[16/9] w-full overflow-hidden bg-house-cream-dark" : "relative aspect-square w-full overflow-hidden bg-house-cream-dark"}>
                    <Image src={story.image} alt={story.alt} fill sizes={i === 0 ? "(min-width: 1024px) 40vw, 100vw" : "132px"} className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]" />
                  </div>
                  <div className={i === 0 ? "mt-4" : undefined}>
                    <h3 className={i === 0 ? "font-display text-[22px] leading-tight text-house-brown transition-colors group-hover:text-house-gold-ink" : "font-display text-[18px] leading-tight text-house-brown transition-colors group-hover:text-house-gold-ink"}>{story.title}</h3>
                    {i === 0 && story.dek ? <p className="mt-2 font-sans text-[15px] leading-[1.55] text-house-stone">{story.dek}</p> : null}
                    <span className="mt-2 inline-block font-sans text-[11px] tracking-[0.18em] uppercase text-house-gold-ink">Continue reading →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-house-brown/12 pt-7">
            <Link href="/the-hearth" className={s.btnGhost}>Enter The Hearth <span aria-hidden className={s.arrow}>→</span></Link>
            {[
              { label: "Interiors", href: "/the-hearth/category/interiors-and-styling" },
              { label: "Gardens", href: "/the-hearth/category/gardens-and-exteriors" },
              { label: "Food and hosting", href: "/recipes" },
              { label: "Objects and materials", href: "/the-hearth/category/colour-and-materials" },
            ].map((c) => (
              <Link key={c.label} href={c.href} className="font-sans text-[13px] text-house-stone no-underline underline-offset-4 hover:text-house-brown hover:underline">{c.label}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Cinema teaser */}
      <section className="relative overflow-hidden bg-house-black px-[5vw] py-[clamp(56px,8vw,120px)] text-house-cream">
        <div className="mx-auto grid max-w-[1200px] items-center gap-[clamp(28px,5vw,72px)] lg:grid-cols-2">
          <div>
            <p className="mb-4 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-light">The Cinema</p>
            <h2 className="mb-5 font-display text-[clamp(28px,3.8vw,52px)] leading-[1.05] text-house-cream">
              Sit back. <em className="text-house-gold-light">Watch the House.</em>
            </h2>
            <p className="mb-8 max-w-[52ch] font-sans text-[16px] leading-[1.7] text-house-cream/80">
              Films and short video from the House: gardens through the seasons,
              rooms coming together, and the makers behind the objects we choose.
            </p>
            <Link href="/cinema" className="inline-flex items-center gap-2 border border-house-gold bg-house-gold px-8 py-4 font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110">
              Enter the Cinema →
            </Link>
          </div>
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-house-gold-dark/40">
            <Image src="/home-v4/pillar-2.webp" alt="A low-lit cinematic interior" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            <span aria-hidden className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-house-cream/70 bg-house-black/40 text-house-cream backdrop-blur-sm">▶</span>
            </span>
          </div>
        </div>
      </section>

      {/* 8. Design */}
      <section className="px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto mb-11 max-w-[680px] text-center">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">Design</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
              Interiors and gardens, <em>considered.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              Considered interior and garden design by the studios we work with.
              Commission a scheme, or give one as a voucher.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { title: "Interior Design", body: "Rooms read for the people who live in them, by Delve Interiors.", href: "/design/interiors", image: "/design/interiors/project-bedroom.webp", cta: "Explore Interior Design" },
              { title: "Garden Design", body: "Gardens designed from concept to plan, by Willow Alexander Gardens.", href: "/design/gardens", image: "/design/gardens/projects/contemporary-tiered-garden-design/01.webp", cta: "Explore Garden Design" },
            ].map((card) => (
              <Link key={card.title} href={card.href} className="group flex flex-col border border-house-brown/12 bg-house-white no-underline transition-colors hover:border-house-gold">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-house-cream-dark">
                  <Image src={card.image} alt={card.title} fill sizes="(min-width: 768px) 44vw, 100vw" className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="mb-2 font-display text-[24px] leading-tight text-house-brown">{card.title}</h3>
                  <p className="mb-6 flex-1 font-sans text-[15px] leading-[1.55] text-house-stone">{card.body}</p>
                  <span className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink transition-colors group-hover:text-house-brown">{card.cta} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Services snapshot */}
      <section id="popular-services" className="border-t border-house-brown/10 px-[5vw] py-[clamp(48px,6vw,92px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-10 max-w-[620px]">
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">The Services</p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.2vw,44px)] leading-[1.06] text-house-brown">
              Trusted people for <em>home and garden.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-stone">
              The Willow Alexander service businesses look after the practical work
              of the home. Book on their own sites, or online through HoWA.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {POPULAR_SERVICES.map((svc) => (
              <Link key={svc.name} href={svc.href} className="group flex flex-col border border-house-brown/12 bg-house-cream no-underline transition-colors hover:border-house-gold">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-house-cream-dark">
                  <Image src={svc.image} alt={svc.name} fill sizes="(min-width: 1024px) 23vw, 100vw" className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 font-display text-[21px] leading-tight text-house-brown">{svc.name}</h3>
                  <p className="mb-5 flex-1 font-sans text-[14px] leading-[1.55] text-house-stone">{svc.scope}</p>
                  <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-house-gold-ink transition-colors group-hover:text-house-brown">See the service →</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mx-auto mt-11 flex max-w-[380px] justify-center">
            <Link href="/services" className={s.btnFilled} style={{ justifyContent: "center", textAlign: "center" }}>
              See all services
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Founders */}
      <section className="px-[5vw] py-[clamp(52px,6.5vw,100px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto grid max-w-[1180px] gap-[clamp(28px,4.5vw,64px)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-house-cream-dark">
            <Image src="/home/origin-studio.webp" alt="The original Willow Alexander garden studio: soil, seasons and a single electric van" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="mb-3 font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">The House</p>
            <h2 className="mb-5 font-display text-[clamp(26px,3.2vw,42px)] leading-[1.08] text-house-brown">
              A modern British <em>home institution.</em>
            </h2>
            <p className="mb-4 max-w-[56ch] font-sans text-[16px] leading-[1.7] text-house-stone">
              House of Willow Alexander began with the practical care of real homes
              and gardens, and grew into a curated marketplace, insurance
              introductions, and an editorial journal for the life of the home.
            </p>
            <Link href="/the-house/about" className={s.btnGhost}>
              Our story <span aria-hidden className={s.arrow}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Final chooser */}
      <section className={s.closing}>
        <FlowerWatermark color="white" side="right" opacity={0.14} />
        <p className={s.closingStatement}>
          Where would you <em>like to begin?</em>
        </p>
        <div className="mx-auto mt-8 grid w-full max-w-[380px] gap-3 sm:max-w-[760px] sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/shop" className={s.btnFilled} style={{ justifyContent: "center", textAlign: "center" }}>
            Shop
          </Link>
          <Link href="/insurance" className={s.btnGhostDark} style={{ justifyContent: "center", textAlign: "center" }}>
            Insurance
          </Link>
          <Link href="/the-hearth" className={s.btnGhostDark} style={{ justifyContent: "center", textAlign: "center" }}>
            The Hearth
          </Link>
          <Link href="/cinema" className={s.btnGhostDark} style={{ justifyContent: "center", textAlign: "center" }}>
            Cinema
          </Link>
        </div>
      </section>
    </div>
  );
}
