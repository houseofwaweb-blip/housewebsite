import { ContactForm } from "@/components/forms/ContactForm";
import PostcodeBooking from "@/components/booking/PostcodeBooking";
import { env } from "@/lib/env";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import s from "./contact.module.css";

export const metadata = {
  title: "Contact | Write to the House.",
  description: "Write to the House. We read every message.",
};

export default function ContactPage() {
  return (
    <div className={s.page}>
      <section className={s.hero}>
        <FlowerWatermark color="gold" side="right" opacity={0.16} />
        <div className={s.heroInner}>
          <p className={s.heroEy}>Contact</p>
          <h1 className={s.heroTitle}>
            Write to <em>the House.</em>
          </h1>
          <p className={s.heroLede}>
            Choose what this is about first. The form adapts so you only answer
            what we need. We read every message.
          </p>
        </div>
      </section>

      {/* Postcode → booking. Navigates into the ServiceOS booking form with the
          postcode (and service, when set) already applied. Works on any origin
          because it is a plain navigation, not the ServiceOS-hosted search box. */}
      <section className="border-t border-house-line px-[5vw] py-[clamp(28px,3.5vw,48px)]">
        <div className="mx-auto max-w-[1180px]">
          <p className="mb-4 font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-dark">
            Book a service
          </p>
          <PostcodeBooking
            heading="Where can we help?"
            hint="Enter your postcode to check availability and open the booking form."
            cta="Check availability"
          />
        </div>
      </section>

      {/* Direct contact details — phone, email, hours, urgent (spec §20) */}
      <section className="border-t border-house-line bg-house-cream-light px-[5vw] py-[clamp(32px,4vw,56px)]">
        <div className="mx-auto grid max-w-[1180px] gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-dark">Call the House</p>
            <a href="tel:08000478738" className="mt-2 block font-display text-[clamp(1.3rem,1.8vw,1.6rem)] text-house-ink no-underline hover:text-house-brown">
              0800 047 8738
            </a>
            <p className="mt-1 font-sans text-[14px] text-house-brown/70">Freephone, from a UK line.</p>
          </div>
          <div>
            <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-dark">Email</p>
            <a href="mailto:sales@willowalexander.co.uk" className="mt-2 block font-display text-[clamp(1.1rem,1.5vw,1.35rem)] text-house-ink no-underline break-words hover:text-house-brown">
              sales@willowalexander.co.uk
            </a>
            <p className="mt-1 font-sans text-[14px] text-house-brown/70">We reply within one working day.</p>
          </div>
          <div>
            <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-dark">Opening hours</p>
            <p className="mt-2 font-sans text-[15px] leading-relaxed text-house-brown/85">
              Monday to Friday, 8am to 6pm<br />
              Saturday, 9am to 1pm<br />
              Sunday and bank holidays, closed
            </p>
          </div>
          <div>
            <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-dark">Something urgent?</p>
            <p className="mt-2 font-sans text-[15px] leading-relaxed text-house-brown/85">
              For a booking already under way, call us on{" "}
              <a href="tel:08000478738" className="text-house-brown underline underline-offset-2">0800 047 8738</a>{" "}
              so we can reach the professional directly. For a home emergency, contact the relevant emergency service first.
            </p>
          </div>
        </div>
      </section>

      <section className={s.form}>
        <div className={s.formInner}>
          <ContactForm
            turnstileSiteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
            sourcePage="/contact"
          />
        </div>
      </section>
    </div>
  );
}
