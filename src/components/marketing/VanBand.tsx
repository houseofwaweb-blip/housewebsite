import Image from "next/image";

/**
 * VanBand — a full-width "real life" photography band (change brief slide 17 +
 * the brief to pull real photography of teams/vans through the site). Real
 * House vans / crew, with a short line. Reusable so it can be scattered.
 */
export function VanBand({
  src = "/services/vans/asher-343.webp",
  alt = "House of Willow Alexander branded vans, ready for the day's work",
  caption = "Real teams. Real vans. One House standard.",
}: {
  src?: string;
  alt?: string;
  caption?: string;
}) {
  return (
    <section className="relative w-full overflow-hidden bg-house-cream-dark">
      <div className="relative aspect-[16/10] sm:aspect-[16/8] w-full">
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" style={{ objectPosition: "center 38%" }} />
        <span
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(26,19,13,0.62), rgba(26,19,13,0.0) 42%)" }}
        />
        {caption ? (
          <p className="absolute inset-x-0 bottom-0 p-[clamp(20px,4vw,56px)] text-center font-display text-[clamp(22px,3vw,40px)] leading-[1.1] text-white">
            {caption}
          </p>
        ) : null}
      </div>
    </section>
  );
}
