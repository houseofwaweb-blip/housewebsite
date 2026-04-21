import Image from "next/image";
import Link from "next/link";
import { COLLECTION } from "@/lib/hearth-data";

/**
 * HearthCollectionBand — cream-dark band, text-left / 2-image-right split.
 * Per variant-A: ◆ kicker, Cormorant h2 with italic accent, italic p,
 * black pill CTA. 2fr/1fr image grid (big square + stacked pair).
 */
export function HearthCollectionBand() {
  return (
    <section
      aria-label="The Hearth Collection"
      className="bg-house-cream-dark px-[5vw] py-[72px] border-t border-b border-house-brown/8 my-8"
    >
      <div className="max-w-[1360px] mx-auto grid md:grid-cols-[1fr_1.2fr] gap-14 items-center">
        <div>
          <span className="block mb-[14px] font-hearth-sans text-[10px] tracking-[0.28em] uppercase text-house-gold">
            ◆ The Hearth Collection · {COLLECTION.season}
          </span>
          <h2 className="font-hearth-serif font-medium text-[clamp(32px,3.6vw,48px)] leading-[1.1] tracking-[-0.005em] text-house-black mb-3">
            {COLLECTION.titleEm && COLLECTION.title.includes(COLLECTION.titleEm) ? (
              <>
                {COLLECTION.title.split(COLLECTION.titleEm)[0]}
                <em className="italic font-normal">{COLLECTION.titleEm}</em>
                {COLLECTION.title.split(COLLECTION.titleEm).slice(1).join(COLLECTION.titleEm)}
              </>
            ) : (
              COLLECTION.title
            )}
          </h2>
          <p className="font-hearth-serif italic text-[18px] leading-[1.55] text-house-stone mb-5 max-w-[460px]">
            {COLLECTION.body}
          </p>
          <Link
            href={COLLECTION.ctaHref}
            className="inline-block font-hearth-sans text-[11px] tracking-[0.2em] uppercase text-white bg-house-black px-6 py-[13px] no-underline transition-colors duration-[var(--t-slow)] ease-out hover:bg-house-brown"
          >
            {COLLECTION.ctaLabel} →
          </Link>
        </div>

        <div className="grid grid-cols-[2fr_1fr] gap-3">
          <Image
            src={COLLECTION.big}
            alt=""
            width={1200}
            height={1200}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="w-full h-full aspect-square object-cover"
          />
          <div className="grid grid-rows-2 gap-3">
            <Image
              src={COLLECTION.stackA}
              alt=""
              width={800}
              height={800}
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="w-full h-full aspect-square object-cover"
            />
            <Image
              src={COLLECTION.stackB}
              alt=""
              width={800}
              height={800}
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="w-full h-full aspect-square object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
