import Image from "next/image";
import Link from "next/link";
import { SERVICE_BUSINESSES, HOWA_BOOK_URL } from "@/lib/service-businesses";

/**
 * /services — the service businesses directory (Aug 2026 eComm/Insurance
 * refocus). The House no longer books services in-site; it introduces the
 * separate Willow Alexander service businesses and links out to each, or to
 * HoWA to book online.
 */

export const metadata = {
  title: "Home & garden services",
  description:
    "The Willow Alexander service businesses: gardening, cleaning, window and gutter cleaning, and handyman. Book directly with each business, or online through HoWA.",
};

export default function ServicesIndex() {
  return (
    <div className="bg-house-cream text-house-brown">
      {/* Hero */}
      <section className="px-[5vw] pt-20 pb-12 text-center">
        <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">
          The House · Services
        </p>
        <h1 className="mx-auto mt-4 max-w-[20ch] font-display text-[clamp(38px,5.6vw,72px)] leading-[1.03] text-house-black">
          The people who <em className="italic">look after your home.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-[60ch] font-sans text-[17px] leading-[1.6] text-house-stone">
          The practical work of keeping a house and garden is carried out by the
          Willow Alexander service businesses. Each has its own team and its own
          site. Book with the business directly, or online through HoWA.
        </p>
      </section>

      {/* Directory */}
      <section className="px-[5vw] pb-24">
        <div className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-2">
          {SERVICE_BUSINESSES.map((b) => (
            <article
              key={b.slug}
              className="flex flex-col overflow-hidden border border-house-brown/12 bg-house-white"
            >
              <Link href={`/services/${b.slug}`} className="relative block aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={b.image}
                  alt={b.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </Link>
              <div className="flex flex-1 flex-col p-7">
                <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-house-gold-ink">
                  {b.business}
                </p>
                <h2 className="mt-2 font-display text-[26px] leading-tight text-house-black">
                  <Link href={`/services/${b.slug}`} className="no-underline hover:text-house-gold-ink">
                    {b.name}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 font-sans text-[15px] leading-[1.6] text-house-stone">
                  {b.blurb}
                </p>

                {b.subs.length > 0 ? (
                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 p-0">
                    {b.subs.map((sub) => (
                      <li key={sub.href} className="list-none">
                        <a
                          href={sub.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-sans text-[13px] text-house-brown/75 underline underline-offset-2 hover:text-house-gold-ink"
                        >
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={b.bookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center whitespace-nowrap border border-house-gold-dark bg-house-gold-ink px-6 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-110"
                  >
                    Visit {b.business.replace("Willow Alexander ", "")}
                  </a>
                  <a
                    href={HOWA_BOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center whitespace-nowrap border border-house-brown/30 px-6 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold-ink"
                  >
                    Book via HoWA
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-[60ch] text-center font-sans text-[14px] leading-[1.6] text-house-stone/85">
          Each business covers London and Kent. Prices, availability and booking
          are handled on their own sites, or online through HoWA.
        </p>
      </section>
    </div>
  );
}
