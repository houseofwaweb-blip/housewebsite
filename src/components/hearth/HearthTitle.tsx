import Link from "next/link";

/**
 * HearthTitle — renders an article title with optional italic emphasis
 * on a substring (the `titleEm` from HearthArticle).
 *
 *   <HearthTitle title="Colour, by daylight" em="by daylight" />
 *   → Colour, <em>by daylight</em>
 *
 * If the `em` substring isn't found, renders the title as-is.
 */
export function HearthTitle({
  title,
  em,
  href,
  className,
}: {
  title: string;
  em?: string;
  href?: string;
  className?: string;
}) {
  const parts = em && title.includes(em) ? title.split(em) : null;
  const content = parts ? (
    <>
      {parts[0]}
      <em className="italic font-normal">{em}</em>
      {parts.slice(1).join(em)}
    </>
  ) : (
    title
  );
  if (href) {
    return (
      <Link
        href={href}
        className={`text-inherit no-underline hover:text-house-gold transition-colors duration-[var(--t-base)] ease-out ${className ?? ""}`}
      >
        {content}
      </Link>
    );
  }
  return <span className={className}>{content}</span>;
}
