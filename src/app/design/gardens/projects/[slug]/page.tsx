import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GARDEN_PROJECTS, getGardenProject } from "@/lib/gardens-projects";
import { getPublicImageSize } from "@/lib/image-size";

/**
 * /design/gardens/projects/[slug] — a single garden commission, the design
 * shown in full. Hero + intro, then the project gallery.
 */

export async function generateStaticParams() {
  return GARDEN_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getGardenProject(slug);
  if (!project) return { title: "Garden project" };
  return {
    title: `${project.title}, ${project.location}, Gardens`,
    description: project.summary,
  };
}

export default async function GardenProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getGardenProject(slug);
  if (!project) notFound();

  const [hero, ...rest] = project.images;
  const heroDims = hero ? await getPublicImageSize(hero) : null;
  const restDims = await Promise.all(rest.map((src) => getPublicImageSize(src)));
  const others = GARDEN_PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  // Dev-only image-number badge so the file to remove can be named exactly.
  const DEV = process.env.NODE_ENV === "development";
  const fileNo = (s: string) => s.match(/(\d+)\.webp$/)?.[1] ?? "";
  const Badge = ({ src }: { src: string }) =>
    DEV ? (
      <span className="absolute top-2 left-2 z-10 bg-black/75 text-white text-[14px] font-mono px-2 py-0.5 pointer-events-none">
        {fileNo(src)}
      </span>
    ) : null;

  return (
    <article style={{ background: "var(--color-house-cream)", color: "var(--color-house-brown)" }}>
      {/* Header */}
      <header className="mx-auto max-w-[1100px] px-6 sm:px-10 pt-[clamp(72px,10vh,128px)] pb-[clamp(28px,4vw,48px)]">
        <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-dark mb-5 flex items-center gap-3">
          <span aria-hidden className="w-9 h-px bg-house-gold-dark/70" />
          Willow Alexander Gardens · {project.type}
        </p>
        <h1
          className="font-hearth-serif text-[clamp(40px,5.4vw,76px)] leading-[1.02] tracking-[-0.02em]"
          style={{ color: "var(--color-house-brown)" }}
        >
          {project.title}
        </h1>
        <p className="mt-4 font-sans text-[14px] tracking-[0.18em] uppercase text-house-brown/55">
          {project.location}
        </p>
      </header>

      {/* Hero image — natural aspect, contained so it is never upscaled or cropped */}
      {hero && heroDims ? (
        <div className="mx-auto max-w-[1120px] px-6 sm:px-10">
          <div className="relative">
            <Badge src={hero} />
            <Image
              src={hero}
              alt={`${project.title}, ${project.location}`}
              width={heroDims.width}
              height={heroDims.height}
              priority
              sizes="(min-width: 1120px) 1040px, 100vw"
              className="w-full h-auto"
              style={{ border: "1px solid rgba(48,35,28,0.08)" }}
            />
          </div>
        </div>
      ) : null}

      {/* Intro */}
      <div className="mx-auto max-w-[680px] px-6 sm:px-10 py-[clamp(48px,6vw,88px)]">
        {project.intro.split("\n\n").map((p, i) => (
          <p
            key={i}
            className="font-sans text-[17px] leading-[1.7] text-house-brown/82 mb-5"
            style={i === 0 ? { fontFamily: "var(--font-hearth-serif)", fontStyle: "italic", fontSize: "clamp(20px,2vw,24px)", lineHeight: 1.5, color: "rgba(48,35,28,0.82)" } : undefined}
          >
            {p}
          </p>
        ))}
      </div>

      {/* Gallery — masonry columns */}
      {rest.length ? (
        <div className="mx-auto max-w-[1240px] px-6 sm:px-10 pb-[clamp(56px,7vw,112px)]">
          <div className="[column-gap:14px] sm:[column-gap:18px] columns-1 sm:columns-2 lg:columns-3">
            {rest.map((src, i) => (
              <div key={src} className="mb-[14px] sm:mb-[18px] break-inside-avoid relative">
                <Badge src={src} />
                <Image
                  src={src}
                  alt={`${project.title}, view ${i + 2}`}
                  width={restDims[i].width}
                  height={restDims[i].height}
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="w-full h-auto"
                  style={{ border: "1px solid rgba(48,35,28,0.08)" }}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* CTA */}
      <section className="border-t border-house-brown/10 px-6 sm:px-10 py-[clamp(56px,7vw,104px)] text-center">
        <h2 className="font-hearth-serif text-[clamp(26px,3vw,40px)] leading-[1.1]" style={{ color: "var(--color-house-brown)" }}>
          Considering a garden of your own?
        </h2>
        <p className="mt-4 font-sans text-[16px] leading-[1.6] text-house-brown/70 max-w-[46ch] mx-auto">
          The studio takes on a small number of commissions through the House design collective.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Link href="/design/gardens#open-booking-form" className="inline-flex items-center justify-center px-7 py-3.5 bg-house-gold text-white text-[14px] tracking-[0.04em] hover:bg-house-gold-dark transition-colors">
            Enquire about a garden
          </Link>
          <Link href="/design/gardens" className="inline-flex items-center gap-1.5 text-[15px] text-house-brown/70 hover:text-house-brown transition-colors">
            All garden work <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </section>

      {/* More projects */}
      {others.length ? (
        <section className="bg-house-cream-dark/40 px-6 sm:px-10 py-[clamp(48px,6vw,88px)]">
          <div className="mx-auto max-w-[1240px]">
            <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-dark mb-7">More from the studio</p>
            <div className="grid gap-6 sm:grid-cols-3">
              {others.map((p) => (
                <Link key={p.slug} href={`/design/gardens/projects/${p.slug}`} className="group block">
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 3", border: "1px solid rgba(48,35,28,0.08)" }}>
                    <Image src={p.images[0]} alt={p.title} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <h3 className="mt-3 font-hearth-serif text-[20px] leading-tight" style={{ color: "var(--color-house-brown)" }}>{p.title}</h3>
                  <p className="font-sans text-[14px] tracking-[0.16em] uppercase text-house-brown/55 mt-1">{p.location}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
