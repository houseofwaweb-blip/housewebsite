import s from "./proof-strip.module.css";

/* Placeholder accreditations — circles with name labels.
   Real logos to come from Alex (The List, Guild of Master Craftsmen,
   Carbon Neutral, Federation of Window Cleaners, CHAS, etc.). */
const ACCREDITATIONS = [
  "The List",
  "Guild of Master Craftsmen",
  "Carbon Neutral",
  "Federation of Window Cleaners",
  "CHAS",
  "SafeContractor",
];

/* Placeholder reviews. Once a Trustpilot business unit ID is wired up
   we can swap to the live widget; for now these stand in. */
const REVIEWS = [
  {
    quote:
      "They turned up when they said they would, did the work properly, and left the place spotless. Rare.",
    attr: "S. Patel · Tunbridge Wells",
  },
  {
    quote:
      "I finally have one place to see everything that's been done to the house. It's quietly brilliant.",
    attr: "M. Harrison · Sevenoaks",
  },
  {
    quote:
      "The Companion suggested gutter clearance before the storms. Saved us a flood.",
    attr: "A. Lloyd · Kent",
  },
];

export function ProofStrip() {
  return (
    <section aria-label="Trust and reviews" className={s.section}>
      <div className={s.inner}>
        <header className={s.accreditHead}>
          <h2 className={s.accreditTitle}>Accredited &amp; certified</h2>
        </header>

        <div className={s.accreditRow}>
          {ACCREDITATIONS.map((name) => (
            <div key={name} className={s.accreditItem}>
              <div className={s.accreditCircle} aria-hidden="true">
                ·
              </div>
              <p className={s.accreditLabel}>{name}</p>
            </div>
          ))}
        </div>

        <header className={s.reviewsHead}>
          <h3 className={s.reviewsTitle}>What households say</h3>
          <div className={s.reviewsMeta}>
            <span className={s.stars} aria-hidden="true">★ ★ ★ ★ ★</span>
            <span><strong>4.9</strong> · 247 reviews</span>
          </div>
        </header>

        <div className={s.reviewGrid}>
          {REVIEWS.map((r, i) => (
            <article key={i} className={s.review}>
              <div className={s.reviewStars} aria-hidden="true">★ ★ ★ ★ ★</div>
              <p className={s.reviewQuote}>&ldquo;{r.quote}&rdquo;</p>
              <p className={s.reviewAttr}>{r.attr}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
