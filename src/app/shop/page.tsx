import Link from "next/link";
import Image from "next/image";
import s from "./shop.module.css";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { HouseStandardStrip } from "@/components/marketing/HouseStandardStrip";
import { shopifyProvider } from "@/lib/commerce/shopify";
import type { CommerceProduct } from "@/lib/commerce/types";
import { getShopProducts } from "@/lib/shop-data/source";
import type { CatalogueProduct } from "@/lib/shop-data/catalogue";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { ProductSlider, type Slide } from "./ProductSlider";
import { getLatestHearthArticles } from "@/lib/cms/hearth";

/**
 * Marketplace landing — "collections as rooms" (Designer Handover Guide, slide 25).
 * Leads with the room grid, then engaging product rails (House Approved, best
 * sellers, new in) so the shop feels curated and alive. Full filterable grid
 * lives at /shop/all.
 */
const ROOMS: { name: string; handle: string; image: string | null }[] = [
  { name: "Kitchen", handle: "kitchen", image: "/shop/rooms/kitchen.webp" },
  { name: "Dining & Table", handle: "dining", image: "/shop/rooms/dining.webp" },
  { name: "Living Room", handle: "living-room", image: "/shop/rooms/living-room.webp" },
  { name: "Bedroom", handle: "bedroom", image: "/shop/rooms/bedroom.webp" },
  { name: "Bathroom", handle: "bathroom", image: "/shop/rooms/bathroom.webp" },
  { name: "Hallway & Entrance", handle: "hallway", image: "/shop/rooms/hallway.webp" },
  { name: "Garden & Outdoor", handle: "garden-outdoor", image: "/shop/rooms/garden.webp" },
  { name: "Utility & Laundry", handle: "utility-and-laundry", image: "/shop/rooms/utility.webp" },
];

function formatMoney(m: { amount: string; currencyCode: string }) {
  const sym = m.currencyCode === "GBP" ? "£" : m.currencyCode === "USD" ? "$" : "";
  return `${sym}${Number(m.amount).toFixed(2)}`;
}

/** URL-safe slug from a collection display name (mirrors the catalogue helper). */
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
}

/** Northern-hemisphere season for the current date — drives the seasonal hero
    so the edit reads as "of this moment" without a copy edit each quarter. */
function currentSeason(d = new Date()): string {
  const m = d.getMonth();
  if (m === 11 || m <= 1) return "winter";
  if (m <= 4) return "spring";
  if (m <= 7) return "summer";
  return "autumn";
}

type Card = { handle: string; title: string; price: string; image: string; alt: string; houseApproved?: boolean };

function toCards(products: CommerceProduct[]): Card[] {
  return products
    .map((p) => ({
      handle: p.handle,
      title: p.title,
      price: formatMoney(p.price),
      image: p.images[0]?.url ?? "",
      alt: p.images[0]?.altText ?? p.title,
      houseApproved: p.metafields?.houseApproved,
    }))
    .filter((c) => c.image);
}

/** Curated section picker — products in any of `handles` (matched by collection
    handle or by the slugified collection name), skipping anything already shown.
    Chosen handles are added to `exclude` so curated rails stay distinct. */
function pickByCollection(
  products: CatalogueProduct[],
  handles: string[],
  n: number,
  exclude?: Set<string>,
): Card[] {
  const wanted = new Set(handles);
  const out: Card[] = [];
  for (const p of products) {
    if (!p.image || out.length >= n) continue;
    if (exclude?.has(p.handle)) continue;
    const inCollection =
      (p.collectionHandles && p.collectionHandles.some((h) => wanted.has(h))) ||
      wanted.has(slugify(p.collection));
    if (!inCollection) continue;
    exclude?.add(p.handle);
    out.push({
      handle: p.handle,
      title: p.title,
      price: p.price,
      image: p.image,
      alt: p.title,
      houseApproved: p.houseApproved,
    });
  }
  return out;
}

/** Rich slide/feature data (excerpt + variant for add-to-basket) from the catalogue. */
function toSlide(cp: CatalogueProduct): Slide {
  return {
    handle: cp.handle,
    title: cp.title,
    price: cp.price,
    image: cp.image || cp.images?.[0]?.src || "",
    alt: cp.title,
    excerpt: (cp.lede || "").trim() || undefined,
    houseApproved: cp.houseApproved,
    variantId: cp.variantId,
    multiVariant: cp.multiVariant ?? false,
    inStock: cp.inStock ?? true,
  };
}

function Rail({
  title,
  cards,
  viewAllHref,
  eyebrow,
  intro,
}: {
  title: string;
  cards: Card[];
  viewAllHref: string;
  eyebrow?: string;
  intro?: string;
}) {
  if (cards.length === 0) return null;
  return (
    <section className="px-[5vw] py-[clamp(36px,4.5vw,60px)] border-b border-house-brown/8">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-7">
          <div className="max-w-[560px]">
            {eyebrow ? (
              <p className="font-sans text-[14px] tracking-[0.3em] uppercase text-house-gold-ink mb-2">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="font-display italic text-[clamp(25px,2.6vw,35px)] text-house-brown">{title}</h2>
            {intro ? (
              <p className="font-sans text-[18px] leading-[1.6] text-house-stone mt-3">{intro}</p>
            ) : null}
          </div>
          <Link
            href={viewAllHref}
            className="font-sans text-[14px] tracking-[0.18em] uppercase text-house-gold-ink no-underline border-b border-house-gold/40 pb-1"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-9">
          {cards.map((c) => (
            <Link key={c.handle} href={`/shop/${c.handle}`} className="group block no-underline">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-house-cream-dark mb-3">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]"
                />
                {c.houseApproved ? (
                  <span className="absolute top-3 left-3 font-sans text-[8px] tracking-[0.18em] uppercase text-white bg-house-brown/70 px-2 py-1">
                    House Approved
                  </span>
                ) : null}
              </div>
              <p className="font-display text-[19px] leading-[1.25] text-house-brown group-hover:text-house-gold-ink transition-colors">
                {c.title}
              </p>
              <p className="font-sans text-[18px] text-house-stone mt-0.5">{c.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** A single buyable piece, given room to breathe — breaks up the product grids. */
function FeaturedProduct({ p }: { p: Slide | null }) {
  if (!p) return null;
  return (
    <section style={{ background: "var(--color-house-brown)" }} className="relative overflow-hidden px-[5vw] py-[clamp(48px,6vw,90px)]">
      <FlowerWatermark variant="pattern" color="gold" side="left" opacity={0.2} />
      <div className="relative z-10 max-w-[1160px] mx-auto grid md:grid-cols-2 gap-[clamp(28px,4vw,64px)] items-center">
        <Link
          href={`/shop/${p.handle}`}
          className="group relative block aspect-[4/5] overflow-hidden no-underline"
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          <Image
            src={p.image}
            alt={p.alt}
            fill
            sizes="(min-width: 768px) 45vw, 90vw"
            className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]"
          />
        </Link>
        <div className="text-house-cream">
          <p className="font-sans text-[14px] tracking-[0.3em] uppercase text-house-gold-ink mb-5">The piece this week</p>
          <h2 className="font-display text-[clamp(31px,3.4vw,49px)] leading-[1.06] mb-4">{p.title}</h2>
          <p className="font-sans text-[19px] text-house-cream/70 mb-5">{p.price}</p>
          {p.excerpt ? (
            <p className="font-sans text-[18px] leading-[1.7] text-house-cream/65 max-w-[46ch] mb-3 line-clamp-2">
              {p.excerpt}{" "}
              <Link href={`/shop/${p.handle}`} className="text-house-gold-ink no-underline whitespace-nowrap hover:text-house-cream">
                Read more →
              </Link>
            </p>
          ) : null}
          <div className="mt-6">
            <AddToCartButton
              handle={p.handle}
              title={p.title}
              price={p.price}
              image={p.image}
              variantId={p.variantId}
              multiVariant={p.multiVariant}
              inStock={p.inStock}
              className="inline-flex items-center justify-center font-sans text-[14px] tracking-[0.18em] uppercase text-house-brown bg-house-gold px-8 py-4 no-underline transition-colors hover:bg-house-cream disabled:opacity-70 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Two side-by-side collection pickers — a wider, editorial break between grids. */
function TwoCollections() {
  const blocks = [
    { name: "The Garden", sub: "Tools, pots and the outdoor life", handle: "garden-outdoor", image: "/shop/rooms/garden.webp" },
    { name: "The Table", sub: "Dining, glass and good linen", handle: "dining", image: "/shop/rooms/dining.webp" },
  ];
  return (
    <section className="px-[5vw] py-[clamp(36px,4.5vw,64px)] border-b border-house-brown/8">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-3">
        {blocks.map((b) => (
          <Link
            key={b.handle}
            href={`/shop/collections/${b.handle}`}
            className="group relative block aspect-[16/11] overflow-hidden bg-house-cream-dark no-underline"
          >
            <Image
              src={b.image}
              alt={b.name}
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.04]"
            />
            <span
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(26,19,13,0.72), rgba(26,19,13,0.08) 60%)" }}
            />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <p className="font-display text-[clamp(25px,2.4vw,37px)] leading-tight text-white">{b.name}</p>
              <p className="font-sans text-[18px] text-white/80 mt-1.5">{b.sub}</p>
              <p className="font-sans text-[14px] tracking-[0.2em] uppercase text-white/90 mt-4 transition-colors group-hover:text-white">
                Explore the collection →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

type HearthCard = { slug: string; title: string; image: string; category?: string; dek?: string };

/** Related Hearth story — the editorial cross-link the store owes the reader
    (spec §12). Leads with one feature, with a couple of quieter follow-ons.
    Renders nothing when the magazine has no articles yet. */
function RelatedHearth({ articles }: { articles: HearthCard[] }) {
  if (articles.length === 0) return null;
  const [lead, ...rest] = articles;
  return (
    <section className="px-[5vw] py-[clamp(44px,6vw,80px)] border-b border-house-brown/8">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-8">
          <p className="font-sans text-[14px] tracking-[0.3em] uppercase text-house-gold-ink mb-2">
            From The Hearth
          </p>
          <h2 className="font-display italic text-[clamp(29px,3vw,43px)] leading-[1.05] text-house-brown">
            Read before you choose.
          </h2>
        </div>
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-x-10 gap-y-8 items-start">
          <Link href={`/the-hearth/${lead.slug}`} className="group block no-underline">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-house-cream-dark mb-4">
              <Image
                src={lead.image}
                alt={lead.title}
                fill
                sizes="(min-width: 768px) 55vw, 90vw"
                className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]"
              />
            </div>
            {lead.category ? (
              <p className="font-sans text-[14px] tracking-[0.24em] uppercase text-house-gold-ink mb-2">
                {lead.category}
              </p>
            ) : null}
            <p className="font-display text-[clamp(23px,2.4vw,33px)] leading-[1.15] text-house-brown group-hover:text-house-gold-ink transition-colors">
              {lead.title}
            </p>
            {lead.dek ? (
              <p className="font-sans text-[18px] leading-[1.6] text-house-stone mt-2 max-w-[52ch] line-clamp-2">
                {lead.dek}
              </p>
            ) : null}
          </Link>
          {rest.length > 0 ? (
            <div className="flex flex-col">
              {rest.map((a) => (
                <Link
                  key={a.slug}
                  href={`/the-hearth/${a.slug}`}
                  className="group flex gap-4 items-start no-underline py-4 border-b border-house-brown/8 first:pt-0"
                >
                  <div className="relative w-[92px] shrink-0 aspect-square overflow-hidden bg-house-cream-dark">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      sizes="92px"
                      className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div>
                    {a.category ? (
                      <p className="font-sans text-[8px] tracking-[0.24em] uppercase text-house-gold-ink mb-1">
                        {a.category}
                      </p>
                    ) : null}
                    <p className="font-display text-[19px] leading-[1.25] text-house-brown group-hover:text-house-gold-ink transition-colors">
                      {a.title}
                    </p>
                  </div>
                </Link>
              ))}
              <Link
                href="/the-hearth"
                className="font-sans text-[14px] tracking-[0.18em] uppercase text-house-gold-ink no-underline border-b border-house-gold/40 pb-1 mt-5 self-start"
              >
                Visit The Hearth →
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export const metadata = {
  title: { absolute: "The House Marketplace | Shop home, garden and household" },
  description:
    "Objects with a place in the House. Shop by room, kitchen, table, garden and more, or browse House Approved goods, best sellers and new arrivals.",
};

export default async function ShopPage() {
  const [shopProducts, best, fresh, hearth] = await Promise.all([
    getShopProducts().catch(() => []),
    shopifyProvider.listBestSellers(40).catch(() => []),
    shopifyProvider.listNewArrivals(40).catch(() => []),
    getLatestHearthArticles(3).catch(() => []),
  ]);

  const season = currentSeason();
  const seasonLabel = season.charAt(0).toUpperCase() + season.slice(1);
  const hearthCards: HearthCard[] = hearth
    .filter((a) => a.image)
    .map((a) => ({ slug: a.slug, title: a.title, image: a.image, category: a.category, dek: a.dek }));

  // De-dupe across rails so each shows distinct products.
  const seen = new Set<string>();
  const take = (cards: Card[], n: number) => {
    const out: Card[] = [];
    for (const c of cards) {
      if (seen.has(c.handle)) continue;
      seen.add(c.handle);
      out.push(c);
      if (out.length >= n) break;
    }
    return out;
  };
  // House Approved rail from the curated seal (the "house-approved" collection is empty).
  const haCards: Card[] = shopProducts
    .filter((p) => p.houseApproved && p.image)
    .map((p) => ({ handle: p.handle, title: p.title, price: p.price, image: p.image, alt: p.title, houseApproved: true }));
  const bestCards = toCards(best);
  // Rich, buyable feature/slider data: best-seller order matched to the catalogue
  // (which carries variant IDs + the short lede excerpt).
  const catByHandle = new Map(shopProducts.map((p) => [p.handle, p] as const));
  const richBest: Slide[] = best
    .map((b) => catByHandle.get(b.handle))
    .filter((cp): cp is CatalogueProduct => Boolean(cp && cp.image))
    .map(toSlide);

  const houseApproved = take(haCards, 8);
  // Reserve the feature + slider pieces first, so the grids below don't repeat them.
  const featured = richBest.find((r) => !seen.has(r.handle)) ?? null;
  if (featured) seen.add(featured.handle);
  const sliderSlides: Slide[] = [];
  for (const r of richBest) {
    if (sliderSlides.length >= 6) break;
    if (seen.has(r.handle)) continue;
    seen.add(r.handle);
    sliderSlides.push(r);
  }
  const bestSellers = take(bestCards, 8);
  const newIn = take(toCards(fresh), 8);

  // Curated spec sections (§12). Each draws from a category, skipping anything
  // already shown above so the rails stay distinct. All return null when empty.
  const curatedSeen = new Set(seen);
  const usefulStaples = pickByCollection(shopProducts, ["household-essentials"], 4, curatedSeen);
  const gardenLiving = pickByCollection(
    shopProducts,
    ["gardening", "outdoor-living", "garden-outdoor"],
    4,
    curatedSeen,
  );
  const giftsExperiences = pickByCollection(
    shopProducts,
    ["gifts-stationery", "gifts", "stationery"],
    4,
    curatedSeen,
  );

  return (
    <div className={s.page}>
      {/* Editorial hero — one seasonal collection, not a standing statement (spec §12) */}
      <section className="relative overflow-hidden border-b border-house-brown/8 px-[5vw] pt-12 pb-9 text-center">
        <FlowerWatermark color="gold" side="right" opacity={0.18} />
        <div className="relative z-10 max-w-[680px] mx-auto">
          <p className="font-sans text-[14px] tracking-[0.3em] uppercase text-house-gold-ink mb-3">
            The House · The {season} edit
          </p>
          <h1 className="font-display text-[clamp(33px,3.4vw,51px)] leading-[1.05] tracking-[-0.01em] text-house-brown">
            The {seasonLabel}{" "}
            <em className="italic" style={{ fontFamily: "var(--font-display)" }}>
              collection.
            </em>
          </h1>
          <p className="font-sans text-[18px] text-house-stone max-w-[460px] mx-auto mt-4 leading-[1.6]">
            The pieces we are reaching for this {season}. An edited cabinet, not
            a catalogue, gathered for how it is made, how long it lasts, and
            whether it can be mended rather than replaced.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 mt-7">
            <Link
              href="/shop/collections/house-approved"
              className="inline-flex items-center justify-center font-sans text-[14px] tracking-[0.18em] uppercase text-house-brown bg-house-gold border border-house-gold px-7 py-3.5 no-underline transition-colors hover:bg-house-gold-ink hover:border-house-gold-dark"
            >
              Explore the edit
            </Link>
            <Link
              href="/shop/all"
              className="font-sans text-[14px] tracking-[0.18em] uppercase text-house-gold-ink no-underline border-b border-house-gold/40 pb-1"
            >
              Shop all products →
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by room — leads the page */}
      <section className="px-[5vw] py-[clamp(44px,6vw,80px)] border-b border-house-brown/8">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8">
            <p className="font-sans text-[14px] tracking-[0.3em] uppercase text-house-gold-ink mb-2">
              Room by room
            </p>
            <h2 className="font-display italic text-[clamp(29px,3vw,43px)] leading-[1.05] text-house-brown">
              A place for everything.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ROOMS.map((r, i) =>
              r.image ? (
                <Link
                  key={r.handle}
                  href={`/shop/collections/${r.handle}`}
                  className="group relative block aspect-[4/5] overflow-hidden bg-house-cream-dark no-underline"
                >
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    priority={i < 4}
                    className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(26,19,13,0.72), rgba(26,19,13,0.05) 55%)" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                    <p className="font-display text-[clamp(22px,2.1vw,31px)] leading-[1.1] text-white">{r.name}</p>
                    <p className="font-sans text-[14px] tracking-[0.2em] uppercase text-white/80 mt-2 transition-colors group-hover:text-white">
                      Shop the room →
                    </p>
                  </div>
                </Link>
              ) : (
                <Link
                  key={r.handle}
                  href={`/shop/collections/${r.handle}`}
                  className="group relative block aspect-[4/5] overflow-hidden bg-house-cream-dark no-underline"
                >
                  <span aria-hidden className="absolute inset-4 border border-house-brown/15" />
                  <span className="absolute top-6 left-0 right-0 text-center font-sans text-[14px] tracking-[0.3em] uppercase text-house-gold-ink">
                    Placeholder image
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center px-4 text-center font-display text-[clamp(22px,2.1vw,31px)] leading-[1.1] text-house-brown">
                    {r.name}
                  </span>
                  <span className="absolute bottom-6 left-0 right-0 text-center font-sans text-[14px] tracking-[0.2em] uppercase text-house-stone transition-colors group-hover:text-house-gold-ink">
                    Shop the room →
                  </span>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Curated store sections (spec §12): House Edit → staples → best sellers →
          feature → garden → gifts → slider → new in → related Hearth story */}
      <Rail
        title="The House Edit."
        eyebrow="Chosen by the House"
        intro="A curator-led shelf, kept small on purpose. Each piece here carries the House Approved seal, chosen for craft, provenance and a long life."
        cards={houseApproved}
        viewAllHref="/shop/collections/house-approved"
      />
      <Rail
        title="Useful staples."
        eyebrow="The everyday things"
        intro="The quiet, well-made basics a household leans on. Bought once, kept for years."
        cards={usefulStaples}
        viewAllHref="/shop/collections/household-essentials"
      />
      <Rail title="Best sellers." cards={bestSellers} viewAllHref="/shop/all" />
      <FeaturedProduct p={featured} />
      <Rail
        title="Garden and outdoor living."
        eyebrow="Beyond the back door"
        intro="Tools, pots and the pieces that make the outdoor rooms of the House worth spending time in."
        cards={gardenLiving}
        viewAllHref="/shop/collections/garden-outdoor"
      />
      <TwoCollections />
      <Rail
        title="Gifts and experiences."
        eyebrow="For someone you like"
        intro="Considered things to give, and small pleasures to keep. Wrapped with care, chosen to be remembered."
        cards={giftsExperiences}
        viewAllHref="/shop/collections/gifts-stationery"
      />
      <ProductSlider title="More worth keeping." slides={sliderSlides} />
      <Rail title="New in." cards={newIn} viewAllHref="/shop/all" />
      <RelatedHearth articles={hearthCards} />

      <HouseStandardStrip points={["Vetted against real family use", "Care notes for use and repair", "Chosen to last, made to mend"]} />
    </div>
  );
}
