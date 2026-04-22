import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";
import { ProductCard } from "@/components/commerce/ProductCard";
import {
  CATALOGUE_COLLECTIONS,
  getCatalogueCollection,
} from "@/lib/shop-data/catalogue";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const collection = CATALOGUE_COLLECTIONS.find((c) => c.handle === handle);
  if (!collection) return { title: "Collection not found" };
  return {
    title: `${collection.title} — Shop`,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const collection = CATALOGUE_COLLECTIONS.find((c) => c.handle === handle);
  if (!collection) notFound();

  const products = getCatalogueCollection(handle);

  return (
    <article className="bg-house-white text-house-brown">
      {/* Hero */}
      <section className="bg-house-cream px-[5vw] pt-[12vh] pb-14">
        <div className="max-w-[880px] mx-auto text-center">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 font-sans text-[11px] tracking-[0.18em] uppercase text-house-stone"
          >
            <Link href="/shop" className="no-underline hover:text-house-gold transition-colors">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-house-brown">{collection.title}</span>
          </nav>
          <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,76px)] leading-[1.05] tracking-[-0.01em]">
            {collection.title}.
          </h1>
          <p className="mt-4 font-sans text-[11px] tracking-[0.18em] uppercase text-house-stone">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section className="px-[5vw] py-16">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
            {products.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Other collections */}
      <section className="px-[5vw] py-14 bg-house-cream border-t border-house-brown/10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-baseline justify-between mb-6">
            <Eyebrow>Other collections</Eyebrow>
            <GhostLink href="/shop">All products</GhostLink>
          </div>
          <div className="flex flex-wrap gap-4">
            {CATALOGUE_COLLECTIONS.filter((c) => c.handle !== handle)
              .slice(0, 8)
              .map((c) => (
                <Link
                  key={c.handle}
                  href={`/shop/collections/${c.handle}`}
                  className="font-sans text-[11px] tracking-[0.2em] uppercase no-underline text-house-brown border border-house-brown/20 px-5 py-2.5 transition-all duration-[var(--t-base)] ease-out hover:border-house-gold hover:text-house-gold"
                >
                  {c.title}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </article>
  );
}

export function generateStaticParams() {
  return CATALOGUE_COLLECTIONS.map((c) => ({ handle: c.handle }));
}
