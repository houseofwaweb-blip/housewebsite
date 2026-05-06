import s from "./section-title.module.css";

/**
 * Centred section title used above Workflow, Pillars, Protect, etc.
 * Eyebrow + headline + optional sub. Same pattern across the page for rhythm.
 */
export function SectionTitle({
  eyebrow,
  title,
  sub,
  light,
}: {
  eyebrow?: string;
  title?: string;
  sub?: string;
  /** Use cream colour (for use over the sage band) */
  light?: boolean;
}) {
  if (!eyebrow && !title && !sub) return null;
  return (
    <header className={`${s.head} ${light ? s.light : ""}`}>
      {eyebrow && <div className={s.eyebrow}>{eyebrow}</div>}
      {title && <h2 className={s.title}>{title}</h2>}
      {sub && <p className={s.sub}>{sub}</p>}
    </header>
  );
}
