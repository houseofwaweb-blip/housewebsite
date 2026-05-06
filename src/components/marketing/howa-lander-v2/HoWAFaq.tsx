import s from "./howa-lander-v2.module.css";

/* Native <details> accordion — no JS required, fully accessible.
   Six items addressing the most common objections that block sign-up. */
const FAQ = [
  {
    q: "Can I cancel HoWA+ anytime?",
    a: "Yes. Your home record stays with you on the free tier. No data is held hostage and there's no minimum term.",
  },
  {
    q: "How long does setup take?",
    a: "Roughly two minutes for the Companion intake. The record builds itself from there as you book services or save documents.",
  },
  {
    q: "What if my home doesn't fit a category?",
    a: "HoWA learns one home at a time. Type, period, layout, garden, listed status — all configurable through the Companion or directly from the record.",
  },
  {
    q: "Where does my data live?",
    a: "UK servers, encrypted at rest, never sold. You can export your full record at any time and delete the account in one click.",
  },
  {
    q: "Do I have to use the booked services?",
    a: "No. The marketplace is optional. You can use HoWA purely as a record, or bring in your own contractors and have them billed alongside.",
  },
  {
    q: "What happens if I move?",
    a: "Your call at the time. The record can transfer with you to the new home, stay tied to the property and pass to the next owner, or both.",
  },
];

export function HoWAFaq() {
  return (
    <section className={s.faqSection} aria-label="Frequently asked questions">
      <header className={s.faqHead}>
        <p className={s.faqEy}>Questions, asked and answered</p>
        <h2 className={s.faqTitle}>
          Before you <em>begin.</em>
        </h2>
      </header>

      <div className={s.faqList}>
        {FAQ.map((item, i) => (
          <details key={item.q} className={s.faqItem} open={i === 0}>
            <summary className={s.faqQ}>
              <span>{item.q}</span>
              <span aria-hidden="true" className={s.faqMarker} />
            </summary>
            <p className={s.faqA}>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
