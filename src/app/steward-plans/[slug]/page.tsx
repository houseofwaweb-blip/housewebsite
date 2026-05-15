import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Accordion } from "@/components/primitives/Accordion";
import { PLANS, findPlan } from "@/lib/steward-data";
import { getAllPlanSlugs } from "@/lib/cms/steward-plans";
import s from "./plan.module.css";

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
    <div className={s.page}>
      {/* Hero — full-bleed image with navy scrim */}
      <section className={s.hero}>
        <div className={s.heroImage}>
          <Image
            src={plan.image}
            alt={plan.name}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className={s.heroScrim} aria-hidden="true" />
        <nav className={s.heroCrumbs}>
          <Link href="/steward-plans" className={s.heroCrumbLink}>Steward Plans</Link>
          <span className={s.heroCrumbSep}>/</span>
          <span>{plan.categoryLabel}</span>
        </nav>
        <div className={s.heroCopy}>
          <p className={s.heroEy}>{plan.categoryLabel} · {plan.tier}</p>
          <h1 className={s.heroTitle}>{plan.name}</h1>
          <p className={s.heroLede}>{plan.lede}</p>
          <div className={s.heroPriceRow}>
            <span className={s.heroPrice}>{plan.priceLabel}</span>
            <span className={s.heroPriceUnit}>/ month</span>
          </div>
          <Link href="#open-booking-form" className={s.btnFilled}>
            Subscribe to this plan
          </Link>
        </div>
      </section>

      {/* Body */}
      <section className={s.body}>
        <div className={s.bodyInner}>
          <p className={s.bodyCopy}>{plan.body}</p>

          <div className={s.inclusions}>
            <h2 className={s.inclusionsTitle}>What's included</h2>
            <ul className={s.inclusionsList}>
              {plan.inclusions.map((inc) => (
                <li key={inc}>{inc}</li>
              ))}
            </ul>
          </div>

          <div className={s.faq}>
            <Accordion
              items={[
                {
                  id: "steward",
                  summary: "About House Steward membership",
                  body: (
                    <p>
                      Steward Plans are available exclusively to House Steward
                      members. Membership includes access to all plans, priority
                      scheduling, a dedicated House contact, and quarterly
                      reviews. One membership covers one property.
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
                      London and the Home Counties at launch: Chelsea,
                      Kensington, Fulham, Hammersmith, Battersea, Clapham,
                      Notting Hill, Chiswick, Kingston, Bromley, Sevenoaks, and
                      surrounding areas.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Other plans in this category */}
      {siblings.length > 0 ? (
        <section className={s.siblings}>
          <header className={s.siblingsHead}>
            <p className={s.siblingsEy}>Other {plan.categoryLabel} plans</p>
            <h2 className={s.siblingsTitle}>Compare <em>tiers.</em></h2>
          </header>
          <div className={s.siblingsGrid}>
            {siblings.map((sib) => (
              <Link
                key={sib.slug}
                href={`/steward-plans/${sib.slug}`}
                className={s.siblingCard}
              >
                <div className={s.siblingImage}>
                  <Image
                    src={sib.image}
                    alt={sib.name}
                    fill
                    sizes="180px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={s.siblingBody}>
                  <p className={s.siblingTier}>{sib.tier}</p>
                  <p className={s.siblingPrice}>
                    {sib.priceLabel}<span> / month</span>
                  </p>
                  <p className={s.siblingLede}>{sib.lede}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className={s.siblingsFoot}>
            <Link href="/steward-plans" className={s.siblingsFootLink}>
              All Steward Plans
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllPlanSlugs();
  return slugs.map((slug) => ({ slug }));
}
