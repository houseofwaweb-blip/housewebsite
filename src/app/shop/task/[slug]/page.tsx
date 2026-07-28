import Link from "next/link";
import { notFound } from "next/navigation";
import s from "../../shop.module.css";
import { getShopProducts, getShopBrands } from "@/lib/shop-data/source";
import { ShopBrowser } from "../../ShopBrowser";
import { HouseStandardStrip } from "@/components/marketing/HouseStandardStrip";
import { SHOP_TASKS, findShopTask, productsForTask } from "@/lib/shop-data/tasks";
import type { Metadata } from "next";

/**
 * /shop/task/[slug] — a task-based edit of the House Shop (DIRECTIVE §12).
 * Reuses the standard product grid (ShopBrowser); the product set is the live
 * catalogue filtered by the task's keywords.
 */

export function generateStaticParams() {
  return SHOP_TASKS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const task = findShopTask(slug);
  if (!task) return { title: "Shop by task" };
  return {
    title: { absolute: `${task.title} | The House Shop` },
    description: task.blurb,
  };
}

export default async function ShopTaskPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const task = findShopTask(slug);
  if (!task) notFound();

  const all = await getShopProducts();
  const products = productsForTask(task, all);

  // Brands present in this edit, for the filter rail.
  const counts = new Map<string, number>();
  for (const p of products) {
    if (p.brand) counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1);
  }
  const brands = [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .filter((b) => b.count >= 2)
    .sort((a, b) => b.count - a.count);

  return (
    <div className={s.page}>
      <section className={s.hero}>
        <nav aria-label="Breadcrumb" className={s.crumbs}>
          <Link href="/shop" className={s.crumbLink}>Shop</Link>
          <span className={s.crumbSep}>/</span>
          <span>{task.title}</span>
        </nav>
        <p className={s.heroEy}>The House · Shop by task</p>
        <h1 className={s.heroTitle}>{task.title}.</h1>
        <p className="font-sans text-[15px] leading-[1.6] text-house-stone max-w-[60ch] mt-3">
          {task.blurb}
        </p>
      </section>

      <HouseStandardStrip points={["Chosen for the task, not the aisle", "Care notes for use and repair", "Chosen to last, made to mend"]} />

      {products.length > 0 ? (
        <ShopBrowser products={products} collections={[]} brands={brands} />
      ) : (
        <section className="px-[5vw] py-16 text-center">
          <p className="font-sans text-[15px] text-house-stone">
            This edit is being gathered. Meanwhile,{" "}
            <Link href="/shop/all" className="text-house-gold-ink underline underline-offset-2">
              browse all products
            </Link>
            .
          </p>
        </section>
      )}

      {/* Other task edits */}
      <section className="px-[5vw] py-[clamp(40px,5vw,72px)] border-t border-house-brown/10">
        <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink mb-6 text-center">
          More ways to shop
        </p>
        <div className="mx-auto max-w-[1100px] grid grid-cols-2 md:grid-cols-3 gap-3">
          {SHOP_TASKS.filter((t) => t.slug !== task.slug).map((t) => (
            <Link
              key={t.slug}
              href={`/shop/task/${t.slug}`}
              className="font-display text-[18px] text-house-brown no-underline border border-house-brown/12 bg-house-white px-5 py-4 hover:border-house-gold transition-colors"
            >
              {t.title} <span aria-hidden className="text-house-gold-ink">→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
