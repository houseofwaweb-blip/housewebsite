import Image from "next/image";
import Link from "next/link";
import s from "./coming-soon.module.css";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { env } from "@/lib/env";

/**
 * /howa/coming-soon — HoWA app waitlist page.
 *
 * Section order:
 *   1. Hero — navy "blueprint mode" with the steward blueprint cross-section,
 *      copy + waitlist form left
 *   2. Stats strip — what's launching
 *   3. What's coming — three columns describing the product
 *   4. Closing — read about HoWA in the meantime
 */

export const metadata = {
  title: "HoWA — Coming soon",
  description:
    "HoWA Product is where stewardship becomes operational: home records, the Companion, bookings, and a single place for the House to reach you. Join the waitlist.",
  robots: { index: false, follow: true },
};

const STAT_COLS = [
  { value: "Q3", label: "Opening soon" },
  { value: "1", label: "Email when ready" },
  { value: "0", label: "Cost to wait" },
  { value: "100%", label: "Private" },
];

const COMING = [
  {
    icon: "I.",
    title: "The Living Record",
    body: "Every service, decision, and document filed to one record that grows with the home. Your trade can reference it. Your insurer can verify it. Your buyer can inherit it.",
  },
  {
    icon: "II.",
    title: "The Companion",
    body: "AI repair scan, instant quote, design moodboards. Capture home type, rooms, priorities, style and budget. Calm, specific, honest about what it doesn't know.",
  },
  {
    icon: "III.",
    title: "Bookings & member pricing",
    body: "Priority across House services and approved partners. 10% off everything. One contact, one invoice, the same trade twice when continuity matters.",
  },
];

export default function HowaComingSoonPage() {
  return (
    <div className={`${s.page} ${s.stewardTheme}`}>
      {/* 1. Hero — navy blueprint mode + waitlist */}
      <section className={s.hero}>
        <div className={s.heroBg} aria-hidden="true">
          <Image
            src="/home-v4/steward-hero-blueprint.png"
            alt=""
            fill
            sizes="100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "right center" }}
          />
        </div>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>HoWA · Coming soon</p>
            <h1 className={s.heroTitle}>
              The home, <em>finally understood.</em>
            </h1>
            <p className={s.heroLede}>
              HoWA Product is where stewardship becomes operational — home
              records, the Companion diagnostic, bookings, and one place for
              the House to reach you. We'll write the moment it opens.
            </p>
            <div className={s.waitlistWrap}>
              <WaitlistForm
                product="howa_app"
                turnstileSiteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
                sourcePage="/howa/coming-soon"
                dark
                submitLabel="Tell me when it opens"
                successMessage="Thank you. You'll be among the first to hear."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats strip */}
      <section className={s.statsStrip}>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>The full operating system, very soon.</p>
          <p className={s.statsLedeLine2}>The brand site is live today. The product opens next.</p>
        </div>
        {STAT_COLS.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. What's coming */}
      <section className={s.whatsComing}>
        <header className={s.whatsHead}>
          <p className={s.whatsEy}>What's launching</p>
          <h2 className={s.whatsTitle}>
            One operating system, <em>three quiet doors in.</em>
          </h2>
        </header>
        <div className={s.whatsGrid}>
          {COMING.map((item) => (
            <article key={item.title} className={s.whatsCard}>
              <p className={s.whatsCardNumber}>{item.icon}</p>
              <h3 className={s.whatsCardTitle}>{item.title}</h3>
              <p className={s.whatsCardBody}>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Closing */}
      <section className={s.closing}>
        <p className={s.closingKicker}>In the meantime.</p>
        <p className={s.closingStatement}>
          <em>Read more about HoWA.</em>
        </p>
        <div className={s.closingCtas}>
          <Link href="/howa" className={s.closingBtnFilled}>
            Visit the HoWA page
          </Link>
          <Link href="/howa/plus" className={s.closingBtnGhost}>
            See HoWA+ →
          </Link>
        </div>
      </section>
    </div>
  );
}
