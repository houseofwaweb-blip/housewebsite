export interface Testimonial {
  quote: string;
  name: string;
  homeType?: string;
}

export function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <div className="bg-house-white border border-house-brown/8 p-7 flex flex-col">
      <p className="font-sans italic text-[15px] leading-[1.6] text-house-brown/85 flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="mt-5 pt-4 border-t border-house-brown/6">
        <span className="block font-sans text-[13px] font-medium text-house-brown">
          {t.name}
        </span>
        {t.homeType ? (
          <span className="block font-sans text-[11px] text-house-stone mt-0.5">
            {t.homeType}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function TestimonialBand({
  testimonials,
  counter,
  counterLabel = "homes already use HoWA",
}: {
  testimonials: Testimonial[];
  counter?: number;
  counterLabel?: string;
}) {
  return (
    <section className="px-[5vw] py-16 bg-house-white border-t border-house-brown/8">
      <div className="max-w-[1100px] mx-auto">
        {counter ? (
          <div className="text-center mb-10">
            <span className="font-display font-medium text-[clamp(36px,5vw,56px)] text-house-gold">
              {counter.toLocaleString()}
            </span>
            <span className="block font-sans text-[12px] tracking-[0.18em] uppercase text-house-stone mt-1">
              {counterLabel}
            </span>
          </div>
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
