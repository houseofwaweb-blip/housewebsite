import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { StateBadge } from "@/components/primitives/StateBadge";
import { WaitlistMini } from "@/components/marketing/WaitlistMini";
import wpLongTail from "@/lib/services-data/wp-long-tail.json";

/**
 * /services/local/[slug] — locality + task page.
 *
 * Ports the WP long-tail SEO catalogue into a useful, on-brand template.
 * Each page targets the original WP query (e.g. "cat flap installation
 * Bexley") with the keyword-rich slug, but presents an honest
 * "coming when X launches in Bexley" message + cross-sells the launch
 * services we DO offer in that location.
 *
 * Manifest: `src/lib/services-data/wp-long-tail.json` — 175 entries at
 * the time of port, all under the deferred `handyman` service.
 *
 * Live (launch) services in every location: Gardening, Window Cleaning,
 * Cleaning, Gutter Cleaning. We assume coverage for these in all 35
 * locations the WP catalogue covered.
 */

interface LongTailEntry {
  slug: string;
  service: string;
  task: string | null;
  location: string;
  title: string;
  body: string;
  live: boolean;
}

const ENTRIES = wpLongTail as LongTailEntry[];

function entryBySlug(slug: string): LongTailEntry | null {
  return ENTRIES.find((e) => e.slug === slug) ?? null;
}

function prettyLocation(slug: string): string {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

function prettyTask(slug: string | null): string {
  if (!slug) return "";
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

function prettyService(slug: string): string {
  switch (slug) {
    case "gardening": return "Gardening";
    case "window-cleaning": return "Window cleaning";
    case "cleaning": return "Cleaning";
    case "gutter-cleaning": return "Gutter cleaning";
    case "handyman": return "Handyman";
    case "removals": return "Removals";
    case "energy": return "Energy";
    case "pet-care": return "Pet care";
    case "housekeeping": return "Housekeeping";
    default: return slug.charAt(0).toUpperCase() + slug.slice(1);
  }
}

const LAUNCH_SERVICES = [
  { slug: "gardening", name: "Gardening", blurb: "Planting, maintenance, lawn care, hedges, tidies." },
  { slug: "window-cleaning", name: "Window cleaning", blurb: "Pure-water pole, soft washing, regular or one-off." },
  { slug: "cleaning", name: "Cleaning", blurb: "Regular, end-of-tenancy, after-builders, deep clean." },
  { slug: "gutter-cleaning", name: "Gutter cleaning", blurb: "SkyVac vacuum-pole, photographs filed to your record." },
];

export async function generateStaticParams() {
  return ENTRIES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = entryBySlug(slug);
  if (!entry) return { title: "Page not found" };
  const location = prettyLocation(entry.location);
  const taskLine = entry.task ? `${prettyTask(entry.task)} in ${location}` : `${prettyService(entry.service)} in ${location}`;
  return {
    title: taskLine,
    description: `${prettyService(entry.service)} — ${taskLine.toLowerCase()}. ${entry.live ? "Available now from House of Willow Alexander." : "Coming when our team launches in your area. Register interest below."}`,
  };
}

export default async function LocalServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = entryBySlug(slug);
  if (!entry) notFound();

  const location = prettyLocation(entry.location);
  const task = prettyTask(entry.task);
  const serviceName = prettyService(entry.service);
  const taskLine = entry.task
    ? `${task} in ${location}`
    : `${serviceName} in ${location}`;

  return (
    <article className="bg-house-cream text-house-brown">
      {/* ============================================================
          1. Hero
          ============================================================ */}
      <section className="px-[5vw] pt-[10vh] pb-16 border-b border-house-brown/10">
        <div className="max-w-[960px] mx-auto">
          <nav aria-label="Breadcrumb" className="font-sans text-[11px] tracking-[0.18em] uppercase text-house-brown/55 mb-7">
            <Link href="/services" className="hover:text-house-brown">Services</Link>
            <span className="mx-2">/</span>
            <Link href={`/services/${entry.service}`} className="hover:text-house-brown">{serviceName}</Link>
            <span className="mx-2">/</span>
            <span>{location}</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <Eyebrow>{serviceName} · Service area</Eyebrow>
            {entry.live ? (
              <StateBadge state="live">Available now</StateBadge>
            ) : (
              <StateBadge state="coming">Coming when {serviceName.toLowerCase()} launches</StateBadge>
            )}
          </div>

          <h1 className="em-accent font-display font-medium text-[clamp(40px,5.4vw,72px)] leading-[1.05] tracking-[-0.012em]">
            {taskLine}<span className="text-house-gold-dark">.</span>
          </h1>

          <p className="font-display italic text-[clamp(18px,1.9vw,22px)] leading-[1.5] text-house-brown/80 mt-7 max-w-[44ch]">
            {entry.live ? (
              <>
                A specialist {entry.task ? task.toLowerCase() : serviceName.toLowerCase()} job covered by our team in {location}.
              </>
            ) : (
              <>
                A specialist {entry.task ? task.toLowerCase() : serviceName.toLowerCase()} job we&apos;ll cover in {location} when our {serviceName.toLowerCase()} team starts work later this year.
              </>
            )}
          </p>
        </div>
      </section>

      {/* ============================================================
          2. Coming-soon panel — only when the service is deferred
          ============================================================ */}
      {!entry.live && (
        <section className="px-[5vw] py-20 border-b border-house-brown/10">
          <div className="max-w-[960px] mx-auto grid md:grid-cols-[1fr_1.3fr] gap-12 items-start">
            <div>
              <Eyebrow>Be first to hear</Eyebrow>
              <h2 className="em-accent font-display font-medium text-[clamp(28px,3vw,40px)] leading-[1.1] mt-5">
                We&apos;ll write when {serviceName.toLowerCase()} <em>opens</em> in {location}.
              </h2>
            </div>
            <div>
              <p className="font-sans text-[16px] leading-[1.7] text-house-brown/85 mb-6 max-w-[58ch]">
                Our handyman team is in setup, not booking yet. Leave your email and
                we&apos;ll write the moment we&apos;re working in {location}. HoWA+ members
                go to the front of the list when bookings open.
              </p>
              <WaitlistMini
                product="other"
                sourcePage={`/services/local/${entry.slug}`}
                placeholder="Your email"
                buttonLabel="Register interest"
                successMessage={`Thank you. We'll write when ${serviceName.toLowerCase()} opens in ${location}.`}
              />
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          3. What we DO offer in this location today
          ============================================================ */}
      <section className="px-[5vw] py-20 bg-white border-b border-house-brown/10">
        <div className="max-w-[1080px] mx-auto">
          <header className="text-center max-w-[600px] mx-auto mb-12">
            <Eyebrow>Available in {location} today</Eyebrow>
            <h2 className="em-accent font-display font-medium text-[clamp(28px,3.2vw,40px)] leading-[1.1] tracking-[-0.005em] mt-5">
              What the House <em>does</em> cover in {location}.
            </h2>
            <p className="font-sans text-[15px] leading-[1.7] text-house-brown/72 mt-5">
              Four launch services, each delivered by House Approved teams, each booked
              and recorded through HoWA.
            </p>
          </header>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-house-brown/10">
            {LAUNCH_SERVICES.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group bg-house-cream p-7 no-underline text-house-brown transition-colors hover:bg-house-cream-dark"
              >
                <p className="font-sans text-[10px] tracking-[0.32em] uppercase text-house-gold-dark mb-3">
                  Service
                </p>
                <h3 className="em-accent font-display font-medium text-[22px] leading-[1.15] mb-3">
                  {svc.name}
                </h3>
                <p className="font-sans text-[13px] leading-[1.55] text-house-brown/72 mb-4">
                  {svc.blurb}
                </p>
                <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold-dark border-t border-house-brown/10 pt-3">
                  Available in {location} →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          4. About the job (if WP gave us body content beyond the title)
          ============================================================ */}
      {entry.body && entry.body.length > 80 && (
        <section className="px-[5vw] py-20 border-b border-house-brown/10">
          <div className="max-w-[760px] mx-auto">
            <Eyebrow>About the job</Eyebrow>
            <h2 className="em-accent font-display font-medium text-[clamp(28px,3vw,40px)] leading-[1.1] mt-5 mb-7">
              {task || serviceName}, <em>properly done.</em>
            </h2>
            <div className="font-sans text-[16px] leading-[1.75] text-house-brown/85 whitespace-pre-line">
              {entry.body}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          5. Why the House — short brand block
          ============================================================ */}
      <section className="px-[5vw] py-20 bg-house-cream-dark border-b border-house-brown/10">
        <div className="max-w-[1080px] mx-auto grid md:grid-cols-3 gap-px bg-house-brown/10">
          {[
            {
              n: "I.",
              h: "House Approved teams",
              b: "Every team operating under the House seal has been visited, vetted, and reviewed annually. We refuse to compromise on this.",
            },
            {
              n: "II.",
              h: "Held in your record",
              b: "Every booking, photograph, and invoice files to your home record in HoWA. So when something needs attention again, the history is right there.",
            },
            {
              n: "III.",
              h: "One conversation",
              b: "Whether you book one job or move to a Steward Plan, you talk to the House. We hold the relationship; the partner does the work.",
            },
          ].map((c) => (
            <article key={c.n} className="bg-house-cream p-9">
              <p className="font-display italic text-[14px] text-house-gold-dark mb-3">{c.n}</p>
              <h3 className="font-sans font-medium text-[12px] tracking-[0.28em] uppercase text-house-brown mb-3">
                {c.h}
              </h3>
              <p className="font-sans text-[14px] leading-[1.65] text-house-brown/78">
                {c.b}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ============================================================
          6. Final CTA
          ============================================================ */}
      <section className="px-[5vw] py-20 bg-house-brown text-house-cream text-center">
        <div className="max-w-[680px] mx-auto">
          <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-house-gold-light mb-5">
            Looking after homes in {location}
          </p>
          <h2 className="em-accent font-display font-medium text-[clamp(28px,3.4vw,44px)] leading-[1.1]">
            Step into <em>stewardship.</em>
          </h2>
          <p className="font-display italic text-[clamp(17px,1.8vw,21px)] leading-[1.5] text-house-cream/85 mt-6">
            Two minutes with the Assistant. A lifetime of looking after.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap mt-9">
            <Link
              href="/howa/assistant"
              className="inline-block font-sans text-[12px] tracking-[0.22em] uppercase text-house-brown bg-house-cream border border-house-cream px-7 py-4 no-underline transition-all duration-200 ease-out hover:bg-house-gold hover:border-house-gold"
            >
              Launch the Assistant
            </Link>
            <Link
              href="/services"
              className="font-sans text-[12px] tracking-[0.22em] uppercase text-house-cream/85 underline decoration-house-gold-light underline-offset-4 hover:text-house-cream"
            >
              All services →
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
