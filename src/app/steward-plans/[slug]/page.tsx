import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";
import { Accordion } from "@/components/primitives/Accordion";
import { PLANS, findPlan } from "@/lib/steward-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const plan = findPlan(slug);
  if (!plan) return { title: "Plan not found" };
  return {
    title: `${plan.name} — Steward Plans`,
    description: plan.lede,
  };
}

export default async function PlanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plan = findPlan(slug);
  if (!plan) notFound();

  const siblings = PLANS.filter(
    (p) => p.category === plan.category && p.slug !== plan.slug,
  );

  return (
    <article className="bg-house-white text-house-brown">
      {/* Hero image */}
      <div className="relative w-full overflow-hidden">
        <Image
          src={plan.image}
          alt={plan.name}
          width={2400}
          height={1200}
          priority
          sizes="100vw"
          className="w-full aspect-[21/9] max-md:aspect-[16/9] object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(21,30,43,0.6)_100%)]" />
        <div className="absolute bottom-[24px] left-[5vw] z-10">
          <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold-light">
            {plan.categoryLabel} · {plan.tier}
          </span>
        </div>
      </div>

      {/* Content */}
      <section className="px-[5vw] py-[64px]">
        <div className="max-w-[860px] mx-auto">
          <nav className="font-sans text-[11px] tracking-[0.18em] uppercase text-house-stone mb-[32px]">
            <Link href="/steward-plans" className="no-underline hover:text-house-gold transition-colors">
              Steward Plans
            </Link>
            <span className="mx-[8px]">/</span>
            <span className="text-house-brown">{plan.name}</span>
          </nav>

          <Eyebrow className="block mb-[12px]">{plan.categoryLabel}</Eyebrow>
          <h1 className="font-display font-medium text-[clamp(36px,5vw,56px)] leading-[1.08] tracking-[-0.01em] mb-[12px]">
            {plan.tier}
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mb-[24px] max-w-[60ch]">
            {plan.lede}
          </p>

          {/* Price + CTA */}
          <div className="flex items-baseline gap-[12px] mb-[32px]">
            <span className="font-display font-medium text-[36px]">{plan.priceLabel}</span>
            <span className="font-sans text-[14px] text-house-stone">/ month</span>
          </div>

          <Link
            href="/book-consultation?plan=steward"
            className="inline-block px-[32px] py-[16px] font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light mb-[48px]"
          >
            Subscribe to this plan
          </Link>

          {/* Body */}
          <p className="font-sans text-[16px] leading-[1.75] text-house-brown/85 mb-[32px] max-w-[60ch]">
            {plan.body}
          </p>

          {/* Inclusions */}
          <div className="border-t border-house-brown/10 pt-[32px] mb-[32px]">
            <h2 className="font-display font-medium text-[28px] mb-[20px]">What&apos;s included</h2>
            <ul className="flex flex-col gap-[8px]">
              {plan.inclusions.map((inc) => (
                <li
                  key={inc}
                  className="relative pl-[20px] font-sans text-[16px] leading-[1.55] text-house-brown/90 before:content-['—'] before:absolute before:left-0 before:text-house-gold"
                >
                  {inc}
                </li>
              ))}
            </ul>
          </div>

          {/* Details accordion */}
          <Accordion
            items={[
              {
                id: "steward",
                summary: "About House Steward membership",
                body: (
                  <p>
                    Steward Plans are available exclusively to House Steward
                    members. Membership includes access to all plans, priority
                    scheduling, a dedicated House contact, and quarterly reviews.
                    One membership covers one property.
                  </p>
                ),
              },
              {
                id: "cancel",
                summary: "Can I change or cancel?",
                body: (
                  <p>
                    Plans adjust monthly. Add or remove services by writing to
                    the House or through your HoWA record. Cancellation takes
                    effect at the next billing date.
                  </p>
                ),
              },
              {
                id: "areas",
                summary: "Where do you operate?",
                body: (
                  <p>
                    London and the Home Counties at launch: Chelsea, Kensington,
                    Fulham, Hammersmith, Battersea, Clapham, Notting Hill,
                    Chiswick, Kingston, Bromley, Sevenoaks, and surrounding areas.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* Other plans in this category */}
      {siblings.length > 0 ? (
        <section className="px-[5vw] py-[64px] bg-house-cream border-t border-house-brown/10">
          <div className="max-w-[1080px] mx-auto">
            <Eyebrow className="block mb-[8px]">Other {plan.categoryLabel} plans</Eyebrow>
            <h2 className="font-display font-medium text-[28px] mb-[32px]">
              Compare tiers.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/steward-plans/${s.slug}`}
                  className="group flex items-start gap-[20px] bg-white border border-house-brown/12 p-[24px] no-underline transition-all duration-[var(--t-slow)] ease-out hover:-translate-y-0.5 hover:border-house-gold"
                >
                  <Image
                    src={s.image}
                    alt={s.name}
                    width={200}
                    height={125}
                    sizes="120px"
                    className="w-[120px] h-[75px] object-cover shrink-0"
                  />
                  <div>
                    <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold mb-[4px]">
                      {s.tier}
                    </div>
                    <div className="font-display font-medium text-[20px] group-hover:text-house-gold transition-colors duration-[var(--t-slow)] ease-out">
                      {s.priceLabel}<span className="font-sans text-[13px] font-normal text-house-stone"> / month</span>
                    </div>
                    <p className="font-sans text-[13px] text-house-stone mt-[4px] leading-[1.5]">
                      {s.lede}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-[24px]">
              <GhostLink href="/steward-plans">All Steward Plans</GhostLink>
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}

export function generateStaticParams() {
  return PLANS.map((p) => ({ slug: p.slug }));
}
