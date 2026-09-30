/**
 * The deep-green trust band used across insurance pages (specialist template and
 * the hubs), so every insurance page shares the same reassurance rhythm right
 * under the hero. Insurance is not live yet, so this reads as coming-soon and
 * makes no FCA/claims claim.
 */
export function InsuranceTrustStrip() {
  const trust = [
    { h: "Coming soon", p: "Insurance from the House opens soon" },
    { h: "Shaped around your home", p: "Cover considered for the property you live in" },
    { h: "A considered route", p: "The House helps you find the right cover" },
    { h: "Register your interest", p: "Join the waitlist to hear first" },
  ];
  return (
    <section className="px-[5vw] py-7 text-house-cream" style={{ background: "var(--house-green)" }}>
      <div className="mx-auto grid max-w-[1120px] gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
        {trust.map((t) => (
          <div key={t.h} className="flex flex-col">
            <span className="font-sans text-[16.5px] font-semibold tracking-[0.01em] text-house-cream">{t.h}</span>
            <span className="mt-0.5 font-sans text-[14.5px] leading-[1.45] text-house-cream/70">{t.p}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
