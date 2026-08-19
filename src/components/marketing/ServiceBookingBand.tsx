/**
 * ServiceBookingBand — the "three ways to book" band (online / call the team /
 * enquiry) used near the top of service and sub-service pages. Shared so service
 * and sub-service pages stay consistent.
 */
export function ServiceBookingBand() {
  return (
    <section className="px-[5vw] py-[clamp(36px,5vw,64px)] bg-house-cream-dark border-y border-house-brown/10">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-center font-sans text-[14px] tracking-[0.28em] uppercase text-house-gold-ink mb-[clamp(20px,3vw,32px)]">
          Booked through HoWA, three ways
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <a
            href="#open-booking-form"
            className="group flex flex-col items-center text-center gap-1.5 border border-house-gold-dark bg-house-gold-ink px-6 py-6 no-underline transition-[filter] hover:brightness-110"
          >
            <span className="font-sans text-[14px] tracking-[0.18em] uppercase text-white">Book online</span>
            <span className="font-sans text-[18px] text-house-cream/90">Through HoWA, choose your slot</span>
          </a>
          <a
            href="tel:08000478738"
            className="group flex flex-col items-center text-center gap-1.5 border border-house-brown/30 bg-house-white px-6 py-6 no-underline transition-colors hover:border-house-brown"
          >
            <span className="font-sans text-[14px] tracking-[0.18em] uppercase text-house-brown">Call the team</span>
            <span className="font-sans text-[18px] text-house-stone">0800 047 8738</span>
          </a>
          <a
            href="#service-enquiry"
            className="group flex flex-col items-center text-center gap-1.5 border border-house-brown/30 bg-house-white px-6 py-6 no-underline transition-colors hover:border-house-brown"
          >
            <span className="font-sans text-[14px] tracking-[0.18em] uppercase text-house-brown">Send an enquiry</span>
            <span className="font-sans text-[18px] text-house-stone">We reply within a working day</span>
          </a>
        </div>
      </div>
    </section>
  );
}
