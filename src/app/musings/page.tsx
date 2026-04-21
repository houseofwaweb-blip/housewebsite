import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { getMusingList } from "@/lib/cms/news-musings";

export const metadata = {
  title: "Musings",
  description:
    "The House's free blog — notes on gardens, rooms, seasons, and the keeping of a home.",
};

export default async function MusingsIndexPage() {
  const items = await getMusingList();
  const [hero, ...rest] = items;

  return (
    <article className="bg-house-cream text-house-brown">
      {/* Header */}
      <section className="px-[5vw] pt-[12vh] pb-10">
        <div className="max-w-[880px] mx-auto">
          <Eyebrow>The House · Musings</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,80px)] leading-[1.05] tracking-[-0.01em] mt-4">
            Short notes &amp; <em>practical advice</em>.
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[62ch]">
            Free to read. Gardens, rooms, seasons, and the quiet work of
            keeping a home. Longer editorial writing lives in{" "}
            <Link
              href="/journal"
              className="text-house-brown underline decoration-house-gold underline-offset-4"
            >
              The Hearth
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Hero card */}
      {hero ? (
        <section className="px-[5vw] pb-12">
          <div className="max-w-[1280px] mx-auto">
            <Link
              href={`/musings/${hero.slug}`}
              className="group grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-10 items-center no-underline transition-all duration-[var(--t-slow)] ease-out hover:-translate-y-0.5"
            >
              {hero.image ? (
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={hero.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              ) : null}
              <div>
                <Eyebrow>Latest</Eyebrow>
                <h2 className="font-display font-medium text-[clamp(30px,3.6vw,48px)] leading-[1.1] tracking-[-0.005em] text-house-brown group-hover:text-house-gold transition-colors duration-[var(--t-base)] ease-out mt-4 mb-4">
                  {hero.title}
                </h2>
                <p className="font-sans italic text-[17px] leading-[1.6] text-house-stone mb-5 max-w-[54ch]">
                  {hero.lede}
                </p>
                <time
                  dateTime={hero.publishedAt}
                  className="font-sans text-[11px] tracking-[0.18em] uppercase text-house-stone"
                >
                  {new Date(hero.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      {/* Grid */}
      <section className="px-[5vw] pb-20 border-t border-house-brown/10 pt-12">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {rest.map((m) => {
            const date = new Date(m.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            return (
              <article key={m.slug} className="flex flex-col h-full">
                <Link
                  href={`/musings/${m.slug}`}
                  className="group flex flex-col h-full no-underline transition-all duration-[var(--t-slow)] ease-out hover:-translate-y-0.5"
                >
                  {m.image ? (
                    <div className="relative aspect-[4/3] w-full mb-4 overflow-hidden">
                      <Image
                        src={m.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-cover transition-all duration-[var(--t-xslow)] ease-out group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : null}
                  <h3 className="font-display font-medium text-[22px] leading-[1.2] text-house-brown group-hover:text-house-gold transition-colors duration-[var(--t-slow)] ease-out mb-2">
                    {m.title}
                  </h3>
                  <p className="font-sans italic text-[15px] leading-[1.55] text-house-stone mb-3">
                    {m.lede}
                  </p>
                  <time
                    dateTime={m.publishedAt}
                    className="mt-auto font-sans text-[10px] tracking-[0.18em] uppercase text-house-stone"
                  >
                    {date}
                  </time>
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </article>
  );
}
