import Link from "next/link";
import Image from "next/image";
import { HomeRecordButton } from "@/components/commerce/HomeRecordButton";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonLd";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";
import type { ShopProduct } from "@/lib/shop-data";

/**
 * DesignPackagePage — a bespoke layout for design packages (concept plans, 3D
 * design, planting plans, the House Edit, etc.), distinct from the physical
 * product PDP (Visual Review Step 09 / brief Step 11). A design SERVICE reads
 * as editorial and process-led: a centred introduction, a full-width concept
 * image, the deliverables, how the studio develops it, the boundary of a
 * concept, and a professional fulfilment route. No cart, care, warranty,
 * shipping, returns or replacement.
 */

const GARDEN_HANDLES = new Set(["planting-plans", "concept-plans", "2d-3d-plans", "lighting-plans"]);

const STEPS = [
  { n: "01", t: "Explore a direction", b: "Share the space, how you use it and what you want to change. Keep the ideas that feel right." },
  { n: "02", t: "Shape the brief", b: "Refine the direction and the decisions that matter, into a brief you can take further." },
  { n: "03", t: "A House studio develops it", b: "A design professional takes the brief on, with proper review, scope, measurements and price." },
  { n: "04", t: "Keep it with your home", b: "The direction and decisions stay in your Home Record, ready for the work when you are." },
];

export function DesignPackagePage({ product }: { product: ShopProduct }) {
  const isGarden = GARDEN_HANDLES.has(product.handle);
  const discipline = isGarden ? "Garden design" : "Interior design";
  const disciplineHref = isGarden ? "/design/gardens" : "/design/interiors";
  // product.image is a string URL; product.images is an array of {src, alt}
  // objects (not valid for next/image src). Prefer the string.
  const firstImage = product.images?.[0];
  const heroImage =
    product.image ??
    (typeof firstImage === "string" ? firstImage : firstImage?.src);
  const body = (product.body ?? product.lede ?? "").trim();

  return (
    <div className="bg-house-cream text-house-brown">
      <BreadcrumbJsonLd
        items={[
          { name: "Design", href: "/design" },
          { name: discipline, href: disciplineHref },
          { name: product.title, href: `/shop/${product.handle}` },
        ]}
      />
      <MetaViewContent contentId={product.handle} contentName={product.title} contentCategory="design_package" />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto w-[min(1200px,calc(100%-10vw))] pt-8 font-sans text-[13px] tracking-[0.04em] text-house-stone">
        <Link href="/design" className="hover:text-house-brown no-underline">Design</Link>
        <span className="px-2 text-house-brown/40">/</span>
        <Link href={disciplineHref} className="hover:text-house-brown no-underline">{discipline}</Link>
        <span className="px-2 text-house-brown/40">/</span>
        <span>{product.title}</span>
      </nav>

      {/* 1. Centred editorial intro */}
      <section className="mx-auto w-[min(760px,calc(100%-10vw))] pt-[clamp(28px,4vw,52px)] text-center">
        <p className="flex items-center justify-center gap-3 font-sans text-[12px] tracking-[0.26em] uppercase text-house-gold-ink">
          <span aria-hidden className="h-px w-8 bg-house-gold-dark/50" />
          Design service · {discipline}
          <span aria-hidden className="h-px w-8 bg-house-gold-dark/50" />
        </p>
        <h1 className="mt-5 font-display text-[clamp(38px,5.4vw,68px)] leading-[1.02]">{product.title}</h1>
        <p className="mt-4 font-sans text-[15px] text-house-stone">By House of Willow Alexander</p>
        <p
          className="mt-3 font-sans font-semibold text-[clamp(22px,2.4vw,28px)] text-house-brown"
          style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
        >
          {product.price}
        </p>
        {product.lede?.trim() ? (
          <p className="mx-auto mt-6 max-w-[52ch] font-display italic text-[clamp(19px,2vw,24px)] leading-[1.5] text-house-stone">
            {product.lede.trim()}
          </p>
        ) : null}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/design#routes"
            className="inline-flex w-full items-center justify-center whitespace-nowrap border border-house-brown bg-house-brown px-8 py-4 font-sans text-[13px] tracking-[0.18em] uppercase text-house-cream no-underline transition-[filter] hover:brightness-125 sm:w-auto"
          >
            Start your design brief
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center whitespace-nowrap border border-house-brown/40 px-8 py-4 font-sans text-[13px] tracking-[0.18em] uppercase text-house-brown no-underline transition-colors hover:border-house-brown sm:w-auto"
          >
            Speak to a designer
          </Link>
        </div>
        <p className="mt-4 font-sans text-[13px] text-house-stone">A design service, developed by a House studio. Not a physical product.</p>
      </section>

      {/* 2. Full-width concept image (contained, editorial) */}
      {heroImage ? (
        <section className="mx-auto mt-[clamp(32px,5vw,64px)] w-[min(1200px,calc(100%-8vw))]">
          <figure className="relative m-0 aspect-[16/9] w-full overflow-hidden bg-house-cream-dark">
            <Image src={heroImage} alt={product.title} fill priority sizes="(max-width: 1200px) 92vw, 1200px" className="object-cover" />
            <figcaption className="absolute bottom-3 left-3 bg-house-cream/90 px-3 py-1 font-sans text-[11px] tracking-[0.14em] uppercase text-house-brown/70">
              Illustrative concept · For discussion
            </figcaption>
          </figure>
        </section>
      ) : null}

      {/* 3. What's included + Save */}
      <section className="mx-auto mt-[clamp(40px,6vw,80px)] grid w-[min(1200px,calc(100%-8vw))] gap-[clamp(32px,5vw,72px)] lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-house-gold-ink">What is included</p>
          <div className="mt-4 max-w-[62ch] whitespace-pre-line font-sans text-[19px] leading-[1.75] text-house-brown/85">
            {body || "A considered, design-led direction for your space, and a brief you can develop with a professional."}
          </div>
        </div>
        <aside className="self-start border border-house-brown/15 bg-house-white p-7">
          <p className="font-display text-[22px] leading-tight">Keep it with your home.</p>
          <p className="mt-2 font-sans text-[16px] leading-[1.6] text-house-stone">
            Save the direction and brief to your Home Record, ready to develop with a professional when you are.
          </p>
          <div className="mt-5">
            <HomeRecordButton handle={product.handle} title={product.title} price={product.price} image={product.image} />
          </div>
        </aside>
      </section>

      {/* 4. How the design service works — numbered process */}
      <section className="mt-[clamp(48px,7vw,96px)] border-y border-house-brown/10 bg-[#f6efe7]">
        <div className="mx-auto w-[min(1200px,calc(100%-8vw))] py-[clamp(44px,6vw,80px)]">
          <h2 className="max-w-[20ch] font-display text-[clamp(28px,3.4vw,44px)] leading-[1.08]">How this design service works.</h2>
          <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="border-t border-house-brown/20 pt-4">
                <p className="font-display text-[26px] leading-none text-house-gold-dark/70">{s.n}</p>
                <h3 className="mt-3 font-display text-[21px] leading-tight">{s.t}</h3>
                <p className="mt-2 font-sans text-[16px] leading-[1.55] text-house-brown/75">{s.b}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-[70ch] font-sans text-[14px] leading-[1.6] text-house-stone">
            A HoWA or studio concept is a starting point for discussion. It is not a measured design, structural advice, a construction drawing or a fixed cost. A professional studio develops a commissioned design from an agreed brief and survey.
          </p>
        </div>
      </section>

      {/* 5. Closing CTA band */}
      <section className="bg-house-brown text-house-cream">
        <div className="mx-auto flex w-[min(1200px,calc(100%-8vw))] flex-col items-start gap-6 py-[clamp(44px,6vw,80px)] md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-[18ch] font-display text-[clamp(28px,3.4vw,46px)] leading-[1.05]">
            Ready to begin your {isGarden ? "garden" : "interior"} design?
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/design#routes"
              className="inline-flex items-center justify-center whitespace-nowrap border border-house-cream bg-house-cream px-8 py-4 font-sans text-[13px] tracking-[0.18em] uppercase text-house-brown no-underline transition-[filter] hover:brightness-95"
            >
              Choose a design specialist
            </Link>
            <Link
              href={disciplineHref}
              className="inline-flex items-center justify-center whitespace-nowrap border border-house-cream/40 px-8 py-4 font-sans text-[13px] tracking-[0.18em] uppercase text-house-cream no-underline transition-colors hover:border-house-cream"
            >
              See all {isGarden ? "garden" : "interior"} design
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
