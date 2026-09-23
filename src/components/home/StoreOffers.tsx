import Image from "next/image";
import Link from "next/link";

type Product = { name: string; price: string; image: string | null; href: string };

/**
 * StoreOffers — homepage Shop section (brief §10), designed to the
 * further-amendments mockup: "Shop the House" with up to six curated product
 * cards (each with a wishlist heart) and a green "for homes that do good"
 * promo card. Copy from the brief; product data from Shopify.
 */
export function StoreOffers({ products }: { products: Product[] }) {
  const edit = products.slice(0, 6);

  return (
    <section aria-label="Shop the House" className="border-t border-house-line bg-house-cream px-[clamp(16px,3vw,40px)] py-[clamp(40px,5vw,80px)]">
      <div className="mx-auto max-w-[1760px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[clamp(30px,3vw,48px)] leading-[1.04] text-house-ink">Shop the House</h2>
            <p className="mt-2 max-w-[56ch] font-sans text-[16px] leading-[1.55] text-house-brown/75">
              Things we&rsquo;d happily live with ourselves.
            </p>
          </div>
          <Link href="/shop" className="font-sans text-[13px] tracking-[0.18em] uppercase text-house-brown no-underline border-b border-house-brown/40 pb-1 hover:border-house-brown">
            View everything →
          </Link>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {edit.map((p, i) => (
            <Link key={`${p.href}-${i}`} href={p.href} className="group block no-underline">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-house-cream-dark">
                {p.image ? (
                  <Image src={p.image} alt={p.name} fill sizes="(min-width:1280px) 14vw, (min-width:640px) 30vw, 45vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                ) : null}
                <span aria-hidden className="is-round absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-house-cream/85 text-house-brown backdrop-blur-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4"><path d="M12 20s-7-4.6-9.2-9A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 9.2 5c-2.2 4.4-9.2 9-9.2 9Z" /></svg>
                </span>
              </div>
              <p className="mt-2.5 font-sans text-[14.5px] leading-tight text-house-brown group-hover:text-house-gold-dark transition-colors line-clamp-2">
                {p.name}
              </p>
              {p.price ? <p className="mt-1 font-sans text-[15px] tabular-nums text-house-stone">{p.price}</p> : null}
            </Link>
          ))}

          {/* Green "for homes that do good" promo card */}
          <div className="col-span-2 flex flex-col justify-between bg-house-forest p-6 text-house-cream sm:col-span-1">
            <div>
              <p className="font-display text-[clamp(20px,1.5vw,26px)] italic leading-[1.15]">
                For homes that do good.
              </p>
              <p className="mt-3 font-sans text-[14px] leading-[1.5] text-house-cream/80">
                Thoughtful pieces for a more beautiful, more sustainable everyday.
              </p>
            </div>
            <Link href="/shop" className="mt-5 inline-flex h-10 w-full items-center justify-center whitespace-nowrap border border-house-gold-light bg-house-gold-light px-5 font-sans text-[12px] uppercase tracking-[0.14em] text-house-ink no-underline transition-[filter] hover:brightness-105">
              Shop now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
