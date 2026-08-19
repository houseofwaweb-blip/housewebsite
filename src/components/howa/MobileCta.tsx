/* Full-width waitlist button for mobile only. Mobile pages are long, so a
   single hero CTA gets missed; drop one of these between sections (after the
   demo, after pricing) so a scrolling thumb is never far from one. `lg:hidden`
   keeps it off desktop, which has CTAs in view already. (askhowa mobile pass.) */
export function MobileCta({
  label = "Join the waitlist",
  href = "/howa/coming-soon",
  sub,
}: {
  label?: string;
  href?: string;
  sub?: string;
}) {
  return (
    <div className="bg-[#fbfaf5] px-6 pt-3 pb-10 lg:hidden">
      <a
        href={href}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-[color:var(--color-howa-green)] px-6 py-4 text-[18.5px] text-white transition-colors hover:bg-[color:var(--color-howa-green-deep)]"
      >
        {label} <span aria-hidden>&rarr;</span>
      </a>
      {sub ? (
        <p className="mt-2.5 text-center text-[18px] leading-[1.4] text-[color:var(--color-ink-soft)]/70">{sub}</p>
      ) : null}
    </div>
  );
}
