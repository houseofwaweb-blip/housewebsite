/**
 * ServiceCtaRow — a slim, repeatable "get in touch" row dropped between content
 * sections on service and sub-service pages, so every step gives the visitor a
 * route to convert (book online, call the team, or enquire). Keep it light — it
 * recurs down the page.
 */
const PHONE_DISPLAY = "0800 047 8738";
const PHONE_HREF = "tel:08000478738";

export function ServiceCtaRow({ service }: { service: string }) {
  return (
    <div className="bg-house-cream px-[5vw] py-[clamp(20px,3vw,32px)] border-t border-house-brown/10">
      <div className="mx-auto flex max-w-[1040px] flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-7">
        <span className="font-hearth-serif italic text-[clamp(16px,1.8vw,19px)] leading-snug text-house-brown">
          Ready to book {service.toLowerCase()}?
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <a
            href="#open-booking-form"
            className="inline-flex items-center bg-house-gold-dark px-5 py-2.5 font-sans text-[11px] tracking-[0.18em] uppercase text-white no-underline transition-[filter] hover:brightness-110"
          >
            Book through HoWA
          </a>
          <a
            href={PHONE_HREF}
            className="font-sans text-[12.5px] text-house-gold-dark underline underline-offset-[3px] transition-colors hover:text-house-brown"
          >
            Call {PHONE_DISPLAY}
          </a>
          <a
            href="#service-enquiry"
            className="font-sans text-[12.5px] text-house-gold-dark underline underline-offset-[3px] transition-colors hover:text-house-brown"
          >
            Send an enquiry
          </a>
        </div>
      </div>
    </div>
  );
}
