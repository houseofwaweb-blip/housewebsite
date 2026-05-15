import Image from "next/image";
import Link from "next/link";
import s from "./recipes.module.css";
import { getRecipeList } from "@/lib/cms/news-musings";

export const metadata = {
  title: "Recipes — Seasonal cooking, simply done.",
  description:
    "Seasonal recipes from the House — simple food, good ingredients, and the meals that make a home feel lived in.",
};

export default async function RecipesIndexPage() {
  const items = await getRecipeList();
  const [hero, ...rest] = items;

  return (
    <div className={s.page}>
      {/* 1. Header */}
      <section className={s.head}>
        <div className={s.headInner}>
          <p className={s.eyebrow}>The House · Recipes</p>
          <h1 className={s.headTitle}>
            Seasonal cooking, <em>simply done.</em>
          </h1>
          <p className={s.headLede}>
            Good ingredients, straightforward methods, and the meals that make
            a home feel lived in. New recipes each season.
          </p>
        </div>
      </section>

      {/* 2. Featured */}
      {hero ? (
        <section className={s.featured}>
          <Link href={`/recipes/${hero.slug}`} className={s.featuredCard}>
            {hero.image ? (
              <div className={s.featuredImage}>
                <Image
                  src={hero.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  priority
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            ) : (
              <div className={s.featuredImagePlaceholder} aria-hidden="true" />
            )}
            <div className={s.featuredBody}>
              <p className={s.featuredEy}>The latest</p>
              <h2 className={s.featuredTitle}>{hero.title}</h2>
              <p className={s.featuredLede}>{hero.lede}</p>
              {(hero.prepTime || hero.cookTime || hero.serves) ? (
                <div className={s.featuredMeta}>
                  {hero.prepTime ? (
                    <span><span className={s.metaLabel}>Prep</span> {hero.prepTime}</span>
                  ) : null}
                  {hero.cookTime ? (
                    <span><span className={s.metaLabel}>Cook</span> {hero.cookTime}</span>
                  ) : null}
                  {hero.serves ? (
                    <span><span className={s.metaLabel}>Serves</span> {hero.serves}</span>
                  ) : null}
                </div>
              ) : null}
              <time dateTime={hero.publishedAt} className={s.featuredDate}>
                {formatDate(hero.publishedAt, "long")}
              </time>
            </div>
          </Link>
        </section>
      ) : null}

      {/* 3. Grid */}
      {rest.length > 0 ? (
        <section className={s.grid}>
          <header className={s.gridHead}>
            <p className={s.eyebrowCentered}>The archive</p>
            <h2 className={s.gridTitle}>
              More <em>from the kitchen.</em>
            </h2>
          </header>
          <div className={s.gridInner}>
            {rest.map((r) => (
              <article key={r.slug} className={s.card}>
                <Link href={`/recipes/${r.slug}`} className={s.cardLink}>
                  {r.image ? (
                    <div className={s.cardImage}>
                      <Image
                        src={r.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                      />
                    </div>
                  ) : (
                    <div className={s.cardImagePlaceholder} aria-hidden="true" />
                  )}
                  <h3 className={s.cardTitle}>{r.title}</h3>
                  <p className={s.cardLede}>{r.lede}</p>
                  {(r.prepTime || r.serves) ? (
                    <p className={s.cardMeta}>
                      {[r.prepTime && `Prep ${r.prepTime}`, r.serves && `Serves ${r.serves}`]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  ) : null}
                  <time dateTime={r.publishedAt} className={s.cardDate}>
                    {formatDate(r.publishedAt, "short")}
                  </time>
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {items.length === 0 ? (
        <section className={s.empty}>
          <p className={s.emptyText}>Recipes are on their way. Check back soon.</p>
        </section>
      ) : null}
    </div>
  );
}

function formatDate(iso: string, style: "long" | "short" = "long"): string {
  const d = new Date(iso);
  return style === "long"
    ? d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
