import Image from "next/image";
import Link from "next/link";

type Product = { name: string; price: string; image: string | null; href: string };

/**
 * StoreOffers — homepage §5 (Aug-17 rebuild, L610–627). Store edit + House
 * Offers panel only, placed alongside the editorial spread. Cover is
 * represented through the Offers "selected cover offers" line, not a separate
 * card. No sale stickers, countdowns or "hurry" copy (L627).
 */
export function StoreOffers({ products }: { products: Product[] }) {
  const edit = products.slice(0, 4);

  return (
    <section className="bg-house-cream-light px-[5vw] py-[clamp(40px,4vw,68px)] border-t border-house-line">
      <div className="mx-auto max-w-[1360px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-sans text-[13px] tracking-[0.22em] uppercase text-house-gold-dark">
              The House Store
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,2.6vw,2.6rem)] leading-[1.05] text-house-ink">
              Useful things, beautifully chosen.
            </h2>
          </div>
          <Link
            href="/shop"
            className="font-sans text-[13px] tracking-[0.18em] uppercase text-house-brown no-underline border-b border-house-brown/40 pb-1 hover:border-house-brown"
          >
            Shop the edit
          </Link>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* Product edit */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {edit.map((p) => (
              <Link key={p.href} href={p.href} className="group block no-underline">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-house-cream-dark">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width:1024px) 16vw, 44vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : null}
                </div>
                <p className="mt-3 font-sans text-[15.5px] leading-tight text-house-brown group-hover:text-house-gold-dark transition-colors line-clamp-2">
                  {p.name}
                </p>
                <p className="mt-1 font-sans text-[16px] text-house-stone">{p.price}</p>
              </Link>
            ))}
          </div>

          {/* Right column: House Offers (brief §5 — Store + Offers only) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex-1 border border-house-gold/30 bg-house-brown p-7 flex flex-col justify-between">
              <div>
                <p className="font-sans text-[13px] tracking-[0.18em] uppercase text-house-gold">
                  House Offers
                </p>
                <h3 className="mt-3 font-display text-[1.5rem] leading-[1.1] text-house-cream">
                  Considered seasonal offers.
                </h3>
                <p className="mt-3 font-sans text-[17px] leading-relaxed text-house-cream/70">
                  Seasonal service packages, member benefits and selected cover offers.
                </p>
              </div>
              <Link
                href="/offers"
                className="mt-6 inline-block font-sans text-[13px] tracking-[0.16em] uppercase text-house-cream bg-house-ink border border-house-ink px-6 py-3 no-underline w-fit hover:brightness-125 transition"
              >
                View House Offers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
