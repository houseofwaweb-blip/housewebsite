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

function Rail({ title, cards, viewAllHref }: { title: string; cards: Card[]; viewAllHref: string }) {
  if (cards.length === 0) return null;
  return (
    <section className="px-[5vw] py-[clamp(36px,4.5vw,60px)] border-b border-house-brown/8">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-7">
          <h2 className="font-display italic text-[clamp(22px,2.6vw,32px)] text-house-brown">{title}</h2>
          <Link
            href={viewAllHref}
            className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-dark no-underline border-b border-house-gold/40 pb-1"
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
              <p className="font-display text-[16px] leading-[1.25] text-house-brown group-hover:text-house-gold-dark transition-colors">
                {c.title}
              </p>
              <p className="font-sans text-[15px] text-house-stone mt-0.5">{c.price}</p>
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
    <section style={{ background: "var(--color-house-brown)" }} className="px-[5vw] py-[clamp(48px,6vw,90px)]">
      <div className="max-w-[1160px] mx-auto grid md:grid-cols-2 gap-[clamp(28px,4vw,64px)] items-center">
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
          <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-dark mb-5">The piece this week</p>
          <h2 className="font-display text-[clamp(28px,3.4vw,46px)] leading-[1.06] mb-4">{p.title}</h2>
          <p className="font-sans text-[16px] text-house-cream/70 mb-5">{p.price}</p>
          {p.excerpt ? (
            <p className="font-sans text-[15px] leading-[1.7] text-house-cream/65 max-w-[46ch] mb-3 line-clamp-2">
              {p.excerpt}{" "}
              <Link href={`/shop/${p.handle}`} className="text-house-gold-dark no-underline whitespace-nowrap hover:text-house-cream">
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
              className="inline-flex items-center justify-center font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown bg-house-gold px-8 py-4 no-underline transition-colors hover:bg-house-cream disabled:opacity-70 cursor-pointer"
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
              <p className="font-display text-[clamp(22px,2.4vw,34px)] leading-tight text-white">{b.name}</p>
              <p className="font-sans text-[15px] text-white/80 mt-1.5">{b.sub}</p>
              <p className="font-sans text-[12px] tracking-[0.2em] uppercase text-white/90 mt-4 transition-colors group-hover:text-white">
                Explore the collection →
              </p>
            </div>
          </Link>
        ))}
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
  const [shopProducts, best, fresh] = await Promise.all([
    getShopProducts().catch(() => []),
    shopifyProvider.listBestSellers(40).catch(() => []),
    shopifyProvider.listNewArrivals(40).catch(() => []),
  ]);

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

  return (
    <div className={s.page}>
      {/* Brand intro */}
      <section className="relative overflow-hidden border-b border-house-brown/8 px-[5vw] pt-12 pb-9 text-center">
        <FlowerWatermark color="gold" side="right" opacity={0.18} />
        <div className="relative z-10 max-w-[680px] mx-auto">
          <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-dark mb-3">
            The House · Marketplace
          </p>
          <h1 className="font-display text-[clamp(30px,3.4vw,48px)] leading-[1.05] tracking-[-0.01em] text-house-brown">
            Objects with a place{" "}
            <em className="italic" style={{ fontFamily: "var(--font-display)" }}>
              in the House.
            </em>
          </h1>
          <p className="font-sans text-[15px] text-house-stone max-w-[460px] mx-auto mt-4 leading-[1.6]">
            An edited cabinet, not a catalogue. Each thing here is House Approved,
            chosen for how it is made, how long it lasts, and whether it can be
            mended rather than replaced.
          </p>
          <Link
            href="/shop/all"
            className="inline-flex items-center justify-center font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold px-7 py-3.5 no-underline transition-colors hover:bg-house-gold-dark hover:border-house-gold-dark mt-7"
          >
            Shop all products
          </Link>
        </div>
      </section>

      {/* Shop by room — leads the page */}
      <section className="px-[5vw] py-[clamp(44px,6vw,80px)] border-b border-house-brown/8">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8">
            <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-dark mb-2">
              Room by room
            </p>
            <h2 className="font-display italic text-[clamp(26px,3vw,40px)] leading-[1.05] text-house-brown">
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
                    <p className="font-display text-[clamp(19px,2.1vw,28px)] leading-[1.1] text-white">{r.name}</p>
                    <p className="font-sans text-[12px] tracking-[0.2em] uppercase text-white/80 mt-2 transition-colors group-hover:text-white">
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
                  <span className="absolute top-6 left-0 right-0 text-center font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-dark">
                    Placeholder image
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center px-4 text-center font-display text-[clamp(19px,2.1vw,28px)] leading-[1.1] text-house-brown">
                    {r.name}
                  </span>
                  <span className="absolute bottom-6 left-0 right-0 text-center font-sans text-[12px] tracking-[0.2em] uppercase text-house-stone transition-colors group-hover:text-house-gold-dark">
                    Shop the room →
                  </span>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Broken-up commerce zone: grid → single feature → dual pickers → slider → grid */}
      <Rail title="House Approved." cards={houseApproved} viewAllHref="/shop/collections/house-approved" />
      <Rail title="Best sellers." cards={bestSellers} viewAllHref="/shop/all" />
      <FeaturedProduct p={featured} />
      <TwoCollections />
      <ProductSlider title="More worth keeping." slides={sliderSlides} />
      <Rail title="New in." cards={newIn} viewAllHref="/shop/all" />

      <HouseStandardStrip points={["Vetted against real family use", "Care notes for use and repair", "Chosen to last, made to mend"]} />
    </div>
  );
}
