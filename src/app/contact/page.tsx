import { Eyebrow } from "@/components/primitives/Eyebrow";
import { ContactForm } from "@/components/forms/ContactForm";
import { env } from "@/lib/env";

export const metadata = {
  title: "Contact",
  description: "Write to the House. We read every message.",
};

export default function ContactPage() {
  return (
    <section className="bg-house-cream text-house-brown px-[5vw] py-[14vh]">
      <div className="max-w-[1040px] mx-auto">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="font-display text-[clamp(40px,5vw,72px)] font-medium leading-[1.08] mt-4">
          Write to the House.
        </h1>
        <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[60ch]">
          Choose what this is about first. The form adapts so you only answer what we need.
        </p>

        <div className="mt-12">
          <ContactForm
            turnstileSiteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
            sourcePage="/contact"
          />
        </div>
      </div>
    </section>
  );
}
