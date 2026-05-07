import { Eyebrow } from "@/components/primitives/Eyebrow";
import { BookingWidget } from "@/components/marketing/BookingWidget";

export const metadata = {
  title: "Book with HoWA",
  description:
    "Book a service or speak with the House. The booking platform is the one we use today, embedded here under the HoWA brand.",
};

export default function BookConsultationPage() {
  return (
    <section className="bg-house-cream text-house-brown px-[5vw] py-[10vh] min-h-[80vh]">
      <div className="max-w-[1080px] mx-auto">
        <Eyebrow>Book with HoWA</Eyebrow>
        <h1 className="font-display text-[clamp(40px,5vw,72px)] font-medium leading-[1.08] mt-4">
          Speak with the <em>House.</em>
        </h1>
        <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[60ch]">
          Pick the service, the date, the home — and one of the House team will be in
          touch within a working day. Same booking platform you&apos;ll see across the
          rest of the network, just under the HoWA brand here.
        </p>

        <div className="mt-12 min-h-[640px]">
          <BookingWidget />
        </div>
      </div>
    </section>
  );
}
