import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { getRecipeList } from "@/lib/cms/news-musings";

export const metadata = {
  title: "Recipes",
  description:
    "Seasonal recipes from the House — simple food, good ingredients, and the meals that make a home feel lived in.",
};

export default async function RecipesIndexPage() {
  const items = await getRecipeList();
  const [hero, ...rest] = items;

  return (
    <article className="bg-house-cream text-house-brown">
      {/* Header */}
      <section className="px-[5vw] pt-[12vh] pb-10">
        <div className="max-w-[880px] mx-auto">
          <Eyebrow>The House · Recipes</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,80px)] leading-[1.05] tracking-[-0.01em] mt-4">
            Seasonal cooking, <em>simply done</em>.
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[62ch]">
            Good ingredients, straightforward methods, and the meals that make a
            home feel lived in. New recipes each season.
          </p>
        </div>
      </section>

      {/* Hero card */}
      {hero ? (
        <section className="px-[5vw] pb-12">
          <div className="max-w-[1280px] mx-auto">
            <Link
              href={`/recipes/${hero.slug}`}
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
                <p className="font-sans italic text-[17px] leading-[1.6] text-house-stone mb-3 max-w-[54ch]">
                  {hero.lede}
                </p>
                {(hero.prepTime || hero.cookTime || hero.serves) && (
                  <div className="flex gap-4 mb-5 font-sans text-[11px] tracking-[0.14em] uppercase text-house-stone">
                    {hero.prepTime && <span>Prep {hero.prepTime}</span>}
                    {hero.cookTime && <span>Cook {hero.cookTime}</span>}
                    {hero.serves && <span>Serves {hero.serves}</span>}
                  </div>
                )}
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
          {rest.map((r) => {
            const date = new Date(r.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            return (
              <article key={r.slug} className="flex flex-col h-full">
                <Link
                  href={`/recipes/${r.slug}`}
                  className="group flex flex-col h-full no-underline transition-all duration-[var(--t-slow)] ease-out hover:-translate-y-0.5"
                >
                  {r.image ? (
                    <div className="relative aspect-[4/3] w-full mb-4 overflow-hidden">
                      <Image
                        src={r.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-cover transition-all duration-[var(--t-xslow)] ease-out group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : null}
                  <h3 className="font-display font-medium text-[22px] leading-[1.2] text-house-brown group-hover:text-house-gold transition-colors duration-[var(--t-slow)] ease-out mb-2">
                    {r.title}
                  </h3>
                  <p className="font-sans italic text-[15px] leading-[1.55] text-house-stone mb-2">
                    {r.lede}
                  </p>
                  {(r.prepTime || r.serves) && (
                    <p className="font-sans text-[10px] tracking-[0.14em] uppercase text-house-stone mb-3">
                      {[r.prepTime && `Prep ${r.prepTime}`, r.serves && `Serves ${r.serves}`].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  <time
                    dateTime={r.publishedAt}
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

      {/* Empty state */}
      {items.length === 0 && (
        <section className="px-[5vw] py-20 text-center">
          <p className="font-display italic text-[22px] text-house-stone">
            Recipes are on their way. Check back soon.
          </p>
        </section>
      )}
    </article>
  );
}
