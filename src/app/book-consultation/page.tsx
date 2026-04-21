import { Eyebrow } from "@/components/primitives/Eyebrow";
import { BookingForm } from "@/components/forms/BookingForm";
import { env } from "@/lib/env";

export const metadata = {
  title: "Book consultation",
  description:
    "Speak with the House about design, services, or care. We'll reply within one working day.",
};

export default function BookConsultationPage() {
  return (
    <section className="bg-house-cream text-house-brown px-[5vw] py-[14vh]">
      <div className="max-w-[960px] mx-auto">
        <Eyebrow>Consultation</Eyebrow>
        <h1 className="font-display text-[clamp(40px,5vw,72px)] font-medium leading-[1.08] mt-4">
          Speak with the House.
        </h1>
        <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[60ch]">
          Tell us a little about what you're after and one of the House will write back
          within a working day. Details stay in confidence.
        </p>

        <div className="mt-12">
          <BookingForm
            turnstileSiteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
            sourcePage="/book-consultation"
          />
        </div>
      </div>
    </section>
  );
}
