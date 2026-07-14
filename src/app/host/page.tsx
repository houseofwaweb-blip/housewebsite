import Link from "next/link";
import Image from "next/image";
import { getLatestHearthArticles } from "@/lib/cms/hearth";

/**
 * /host — The Host (Directive v2, STEP 04 shell requirement; STEP 17 completes).
 *
 * The welcome and organising layer ABOVE the magazine. `/the-hearth` remains the
 * canonical magazine and article estate: this is not a replacement redirect.
 */

export const metadata = {
  title: "The Host | Come in",
  description:
    "The Host welcomes you into the culture and practical knowledge of keeping a home: The Hearth, recipes, seasonal guides and practical advice, kept because they are worth returning to.",
};

const SHELVES = [
  { t: "The Hearth", d: "Essays, garden notes and design wisdom, published when there is something worth saying.", href: "/the-hearth" },
  { t: "Recipes", d: "Seasonal cooking and the rituals of a home through the year.", href: "/recipes" },
  { t: "House news", d: "What the House is doing, and why.", href: "/news" },
];

const ctaPrimary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-6 py-3 no-underline transition-[filter] hover:brightness-110";
const ctaSecondary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/30 px-6 py-3 no-underline transition-colors hover:border-house-gold-ink hover:text-house-gold-ink";

export default async function HostPage() {
  const articles = await getLatestHearthArticles(3).catch(() => []);

  return (
    <div className="bg-house-cream text-house-brown">
      {/* Hero — text left, The Host at the door right */}
      <section className="grid lg:grid-cols-2 border-b border-house-brown/8">
        <div className="flex flex-col justify-center px-[5vw] py-16 lg:py-20 lg:pr-14">
          <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink mb-6">The Host · At the door</p>
          <h1 className="font-display text-[clamp(40px,5.4vw,74px)] leading-[1.02] tracking-[-0.01em] text-house-black">
            Come in.
          </h1>
          <p className="font-display italic text-[clamp(18px,2.1vw,26px)] leading-[1.35] text-house-brown/85 mt-6 max-w-[34ch]">
            Everything worth knowing about keeping a home, kept here.
          </p>
          <p className="font-sans text-[17px] leading-[1.65] text-house-brown/80 mt-5 max-w-[52ch]">
            The Hearth, recipes, seasonal knowledge and practical guidance, kept because they are worth returning to.
            Not reading for its own sake, but the culture and craft of keeping a home well.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/the-hearth" className={ctaPrimary}>Read The Hearth</Link>
            <Link href="/household" className={ctaSecondary}>Meet the Household</Link>
          </div>
        </div>
        <div className="relative min-h-[46vh] lg:min-h-full bg-house-cream-dark">
          <Image src="/howa/household/host.webp" alt="The Host, at the door of the House" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" priority />
        </div>
      </section>

      {/* Shelves */}
      <section className="px-[5vw] py-16 max-w-[1100px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-8">What The Host keeps</p>
        <div className="grid gap-6 md:grid-cols-3">
          {SHELVES.map((s) => (
            <Link key={s.t} href={s.href} className="group block no-underline border-t border-house-brown/15 pt-5">
              <h2 className="font-display text-[24px] leading-[1.15] text-house-black group-hover:text-house-gold-ink transition-colors mb-2">{s.t}</h2>
              <p className="font-sans text-[15px] leading-[1.6] text-house-brown/75">{s.d}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* From The Hearth */}
      {articles.length > 0 ? (
        <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-house-brown/8">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display italic text-[clamp(22px,2.6vw,34px)] text-house-black">From The Hearth</h2>
              <Link href="/the-hearth" className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink no-underline hidden sm:block">Read The Hearth →</Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {articles.slice(0, 3).map((a) => (
                <Link key={a.slug} href={`/the-hearth/${a.slug}`} className="group block no-underline">
                  <div className="relative aspect-[4/3] overflow-hidden bg-house-cream mb-4">
                    <Image src={a.image} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]" />
                  </div>
                  <h3 className="font-display text-[21px] leading-[1.15] text-house-black group-hover:text-house-gold-ink transition-colors">{a.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Reading that can act */}
      <section className="px-[5vw] py-16 max-w-[820px] mx-auto text-center">
        <h2 className="font-display text-[clamp(24px,3vw,38px)] leading-[1.12] text-house-black mb-5">Reading that can act.</h2>
        <p className="font-sans text-[17px] leading-[1.7] text-house-brown/80 mb-8">
          A guide should not just be read. Where it is useful, it can become a saved task, a reminder, or a question for
          the right member of the Household. The Host gives the House its voice. HoWA gives that voice somewhere to act.
        </p>
        <Link href="/household" className={ctaSecondary}>Meet the Household →</Link>
      </section>
    </div>
  );
}
