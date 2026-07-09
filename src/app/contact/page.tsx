import { ContactForm } from "@/components/forms/ContactForm";
import { env } from "@/lib/env";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import s from "./contact.module.css";

export const metadata = {
  title: "Contact House of HoWA | Speak to the House",
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
