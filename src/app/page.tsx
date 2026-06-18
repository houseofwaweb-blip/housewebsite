import Image from "next/image";
import Link from "next/link";
import s from "./home-v5/home-v5.module.css";
import v from "./home-v4a.module.css";
import { getLatestHearthArticles } from "@/lib/cms/hearth";
import { shopifyProvider } from "@/lib/commerce/shopify";

/**
 * Homepage — House-led (v5).
 *
 * Leads with House of Willow Alexander as a design authority and editorial
 * house; introduces HoWA mid-page as the intelligence layer (sections 5, 10,
 * 11 only). Section order follows howa-homepage-v5-brief.md.
 */

export const metadata = {
  title: { absolute: "House of Willow Alexander — The House Standard" },
  description:
    "House of Willow Alexander is the design authority behind every service, every standard, and the system that keeps your home in its best order.",
};

const PILLARS = [
  { label: "Design & Care", title: "Design & Care", sub: "Expert design and care for every home.", image: "/home-v4/design-portrait.webp", href: "/design" },
  { label: "The Marketplace", title: "The Marketplace", sub: "Curated essentials for home and hearth.", image: "/home-v4/pillar-2.webp", href: "/shop" },
  { label: "The Hearth", title: "The Hearth", sub: "Stories, guidance, and timeless inspiration.", image: "/home-v4/pillar-3.webp", href: "/the-hearth" },
  { label: "The House", title: "The House", sub: "The standard we hold ourselves to.", image: "/home-v4/pillar-4.webp", href: "#the-house" },
];

const HOWA_FEATURES = [
  { lead: "The Living Record", rest: "every decision, document and service, kept." },
  { lead: "House Intelligence", rest: "predicts risk, surfaces signals, acts quietly." },
  { lead: "HoWA Housekeeper", rest: "tasks orchestrated, services aligned." },
];

const PRINCIPLES = [
  { num: "I.", title: "Design-led thinking", body: "Every system, every service, every recommendation is held to a design standard — not just functional, but considered." },
  { num: "II.", title: "The living record", body: "Nothing should be lost to memory. The House keeps every decision, document and service in a record that endures." },
  { num: "III.", title: "Stewardship over transaction", body: "A home is not a product. It is an asset of life. We treat it — and those who care for it — accordingly." },
  { num: "IV.", title: "House-vetted, always", body: "Every partner, every studio, every service carries the House Approved seal. No exceptions, no compromises." },
];

const SERVICES = [
  { name: "Gardening", href: "/services/gardening", desc: "Seasonal and one-off garden care." },
  { name: "Interior Design", href: "/design/interiors", desc: "Considered schemes, House-approved studios." },
  { name: "Cleaning", href: "/services/cleaning", desc: "Regular and deep clean, scheduled through HoWA." },
  { name: "Window Cleaning", href: "/services/window-cleaning", desc: "Trusted, tracked, never chased." },
  { name: "Handyman", href: "/services/handyman", desc: "Minor repairs, quick fixes, proper tradespeople." },
  { name: "Energy & Electrical", href: "/services/energy", desc: "Solar, EV, rewires — future-proofing your home." },
];

const INTEL_STATS = [
  { label: "Boiler failure predicted", value: "14 days early" },
  { label: "Service booked", value: "automatically" },
  { label: "Cost reduced", value: "by 42%" },
  { label: "No disruption", value: "to your home" },
];

const TIERS = [
  { slug: "assistant", numeral: "I.", label: "HoWA Assistant", name: "The house, alive.", features: ["Notices what matters", "Tracks changes in real time", "Surfaces subtle signals"], href: "/howa#assistant" },
  { slug: "housekeeper", numeral: "II.", label: "HoWA Housekeeper", name: "The house, in order.", features: ["Tasks orchestrated", "Services aligned", "Nothing slips"], href: "/howa#housekeeper" },
  { slug: "steward", numeral: "III.", label: "HoWA Steward", name: "The house, understood.", features: ["Predicts risk", "Optimises systems", "Protects long-term value"], href: "/howa/steward" },
];

const POWERED = [
  { icon: HomeIcon, lead: "House-vetted partners only", rest: " — every studio carries the seal." },
  { icon: ShieldIcon, lead: "Held in your record", rest: " — every decision and document, kept." },
  { icon: LeafIcon, lead: "Carbon-neutral by default", rest: " — sustainability tracked, not claimed." },
  { icon: AwardIcon, lead: "House Approved", rest: " — the standard, openly published." },
];

const PRODUCTS = [
  { name: "Dark Grey Chunky Knit Throw", price: "£89.00", image: "https://cdn.shopify.com/s/files/1/1006/9449/1462/files/handmade-dark-grey-chunky-knit-throw.jpg", href: "/shop/collections/soft-furnishings" },
  { name: "Soft Furnishings", price: "The collection", image: null, href: "/shop/collections/soft-furnishings" },
  { name: "Home Accessories", price: "The collection", image: null, href: "/shop/collections/home-accessories" },
  { name: "House Approved", price: "Shop all", image: null, href: "/shop" },
];

const HEARTH_FALLBACK = [
  "A guide to seasonal planting",
  "How to read a house survey",
  "The art of the considered interior",
  "Five things your boiler is telling you",
];

function formatMoney(m: { amount: string; currencyCode: string }) {
  const sym = m.currencyCode === "GBP" ? "£" : m.currencyCode === "USD" ? "$" : "";
  return `${sym}${Number(m.amount).toFixed(2)}`;
}

export default async function HomePage() {
  const hearthArticles = await getLatestHearthArticles(4).catch(() => []);
  const shopProducts = await shopifyProvider.listFeaturedProducts(4).catch(() => []);
  const marketCards = shopProducts.length
    ? shopProducts.slice(0, 4).map((p) => ({
        name: p.title,
        price: formatMoney(p.price),
        image: p.images[0]?.url ?? null,
        href: `/shop/${p.handle}`,
      }))
    : PRODUCTS;

  return (
    <div className={s.page}>
      {/* 1. Hero — House-led */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>House of Willow Alexander</p>
            <h1 className={s.heroTitle}>
              A House<br />
              <em>that remembers.</em>
            </h1>
            <p className={s.heroSub}>The standard every home deserves.</p>
            <p className={s.heroLede}>
              House of Willow Alexander is the design authority behind every
              service, every standard, and the system that keeps your home in its
              best order.
            </p>
            <div className={s.heroCtas}>
              <a href="#the-house" className={s.btnGhost}>
                Discover the House <span aria-hidden className={s.arrow}>→</span>
              </a>
              <Link href="#open-booking-form" className={s.btnFilled}>
                Book with HoWA
              </Link>
            </div>
          </div>
        </div>
        <div className={s.heroVisual}>
          <div className={s.heroVisualFrame}>
            <Image
              src="/home-v4/hero-georgian-london.webp"
              alt="A refined sage-green Georgian London townhouse with a classical portico entrance, urn planters and a hedge-lined front garden"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* 2. Editorial quote band */}
      <section className={s.quoteBand}>
        <div className={s.quoteInner}>
          <span className={s.quoteLabel}>Est. as a House of design</span>
          <p className={s.quoteText}>
            “We hold our homes to a higher standard — in design, in care, in the
            record kept over time.”
          </p>
          <span className={s.quoteAttr}>— House of Willow Alexander</span>
        </div>
      </section>

      {/* 3. Four pillar cards — prominent, early */}
      <section className={s.pillars}>
        <div className={s.pillarsGrid}>
          {PILLARS.map((p) => (
            <Link key={p.label} href={p.href} className={s.pillarCard}>
              <Image src={p.image} alt={p.title} fill sizes="(min-width: 1024px) 24vw, 78vw" className={s.pillarImg} />
              <div className={s.pillarScrim} aria-hidden />
              <div className={s.pillarBody}>
                <p className={s.pillarLabel}>{p.label}</p>
                <h3 className={s.pillarTitle}>{p.title}</h3>
                <p className={s.pillarSub}>{p.sub}</p>
                <span aria-hidden className={s.pillarArrow}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. House introduction */}
      <section id="the-house" className={s.houseIntro}>
        <div>
          <p className={s.eyebrow}>The House</p>
          <h2 className={s.houseIntroHead}>
            Design, care,<br />
            <em>and the standard behind it.</em>
          </h2>
        </div>
        <div className={s.houseIntroBody}>
          <p>
            House of Willow Alexander was founded on a single conviction: that the
            homes we love should be held to the same standard as the objects within
            them — designed with intention, maintained with care, and recorded with
            precision.
          </p>
          <p>
            Every service we offer, every partner we approve, every piece in the
            Marketplace carries that conviction. The House is not a brand. It is a
            standard.
          </p>
          <Link href="/the-house/philosophy" className={s.textLink}>
            Discover the House standard <span aria-hidden className={s.arrow}>→</span>
          </Link>
        </div>
      </section>

      {/* 5. HoWA introduction — first HoWA appearance */}
      <section className={s.howaIntro}>
        <div className={s.howaIntroInner}>
          <div className={s.howaIntroVisual}>
            <HowaWidget />
          </div>
          <div className={s.howaIntroCopy}>
            <p className={s.eyebrow}>HoWA — the House system</p>
            <h2 className={s.howaIntroTitle}>
              The House,<br />
              <em>in your hands.</em>
            </h2>
            <p className={s.howaIntroPara}>
              HoWA is how the House of Willow Alexander standard becomes practice.
              It observes your home, learns its rhythms, and acts — so nothing is
              missed, delayed, or forgotten. Not just an app. The House, made
              intelligent.
            </p>
            <div className={s.howaFeatures}>
              {HOWA_FEATURES.map((f) => (
                <div key={f.lead} className={s.howaFeature}>
                  <strong>{f.lead}</strong> — {f.rest}
                </div>
              ))}
            </div>
            <div className={s.howaIntroCtas}>
              <Link href="/howa/coming-soon" className={s.btnFilled}>Coming soon</Link>
              <Link href="/howa/how-it-works" className={s.btnGhost}>
                See how it works <span aria-hidden className={s.arrow}>→</span>
              </Link>
            </div>
            <p className={s.howaNote}>Arriving on App Store &amp; Google Play</p>
          </div>
        </div>
      </section>

      {/* 6. House principles — manifesto */}
      <section className={s.principles}>
        <div className={s.principlesInner}>
          <p className={s.eyebrow}>The House standard</p>
          <div className={s.principlesGrid}>
            {PRINCIPLES.map((p) => (
              <div key={p.num} className={s.principle}>
                <p className={s.principleNum}>{p.num}</p>
                <h3 className={s.principleTitle}>{p.title}</h3>
                <p className={s.principleBody}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Services showcase */}
      <section className={s.services}>
        <div className={s.servicesInner}>
          <div className={s.servicesHead}>
            <p className={s.eyebrow}>The Services</p>
            <h2 className={s.servicesTitle}>Every home, properly cared for.</h2>
            <Link href="/services" className={s.btnGhost}>
              See all services <span aria-hidden className={s.arrow}>→</span>
            </Link>
          </div>
          <div className={s.servicesGrid}>
            {SERVICES.map((svc) => (
              <Link key={svc.name} href={svc.href} className={s.serviceTile}>
                <p className={s.serviceName}>
                  {svc.name}
                  <span aria-hidden className={s.serviceTileArrow}>→</span>
                </p>
                <p className={s.serviceDesc}>{svc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. The Hearth feature */}
      <section className={s.hearth}>
        <div className={s.hearthInner}>
          <div className={s.hearthCopy}>
            <p className={s.eyebrow + " " + s.eyebrowLight}>The Hearth</p>
            <h2 className={s.hearthTitle}>
              <em>The magazine for</em> homes with soul.
            </h2>
            <p className={s.hearthPara}>
              Seasonal recipes, interiors inspiration, gardening notes, and the
              quiet work of maintaining a home with care. Published when it matters,
              never when it doesn&apos;t.
            </p>
            <Link href="/the-hearth" className={s.btnCream}>
              Read the Hearth <span aria-hidden className={s.arrow}>→</span>
            </Link>
          </div>
          <div className={s.hearthGrid}>
            {(hearthArticles.length >= 4
              ? hearthArticles.slice(0, 4).map((a) => ({ title: a.title, href: `/the-hearth/${a.slug}`, image: a.image }))
              : HEARTH_FALLBACK.map((t, i) => ({ title: t, href: "/the-hearth", image: `/home-v4/pillar-${(i % 4) + 1}.webp` }))
            ).map((card) => (
              <Link key={card.title} href={card.href} className={s.hearthCard}>
                <Image src={card.image} alt={card.title} fill sizes="(min-width: 1024px) 28vw, 45vw" className={s.hearthCardImg} />
                <div className={s.hearthCardScrim} aria-hidden />
                <span className={s.hearthCardLabel}>{card.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Marketplace feature */}
      <section className={s.market}>
        <div className={s.marketInner}>
          <div className={s.marketHead}>
            <div>
              <p className={s.eyebrow}>The Marketplace</p>
              <h2 className={s.marketTitle}>Curated essentials for home and hearth.</h2>
            </div>
            <Link href="/shop" className={s.btnGhost}>
              Shop all <span aria-hidden className={s.arrow}>→</span>
            </Link>
          </div>
          <div className={s.marketGrid}>
            {marketCards.map((p) => (
              <Link key={p.name} href={p.href} className={s.productCard}>
                <div className={s.productImg}>
                  {p.image ? (
                    <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 24vw, 60vw" />
                  ) : null}
                </div>
                <div className={s.productBody}>
                  <p className={s.productName}>{p.name}</p>
                  <p className={s.productPrice}>{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. HoWA intelligence — second HoWA appearance */}
      <section className={s.intel}>
        <div className={s.intelCopy}>
          <h2 className={s.intelTitle}>
            The House,<br />
            <em>at work for you.</em>
          </h2>
          <div className={s.intelStats}>
            {INTEL_STATS.map((stat) => (
              <div key={stat.label} className={s.intelStat}>
                <p className={s.intelStatLabel}>{stat.label}</p>
                <p className={s.intelStatValue}>{stat.value}</p>
              </div>
            ))}
          </div>
          <Link href="/howa/how-it-works" className={s.btnGhostDark}>
            See HoWA in action <span aria-hidden className={s.arrow}>→</span>
          </Link>
        </div>
        <div className={s.intelVisual}>
          <Image
            src="/home-v4/pillar-1.webp"
            alt="A warm parlour interior with a marble fireplace and flowers"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      {/* 11. HoWA tiers — third HoWA appearance (reuses v4a tier cards) */}
      <section className={s.tiers}>
        <header className={s.tiersHead}>
          <p className={s.eyebrow}>HoWA</p>
          <h2 className={s.tiersTitle}>Three ways HoWA serves the House.</h2>
        </header>
        <div className={v.tierGrid}>
          {TIERS.map((tier) => (
            <Link key={tier.slug} href={tier.href} className={`${v.tierCard} ${v[tier.slug]}`}>
              <div className={v.tierBg} aria-hidden="true" />
              <div className={v.tierOverlay}>
                <header className={v.tierTop}>
                  <p className={v.tierMeta}>{tier.numeral} {tier.label}</p>
                  <h3 className={v.tierTagline}>{tier.name}</h3>
                </header>
                <footer className={v.tierFoot}>
                  <ul className={v.tierFeatures}>
                    {tier.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <span className={v.tierLearn}>Learn more →</span>
                </footer>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 12. Powered by / house standards */}
      <section className={s.powered}>
        <p className={s.eyebrow}>The design authority behind it all</p>
        <h2 className={s.poweredTitle}>The House sets the standard.</h2>
        <div className={s.poweredGrid}>
          {POWERED.map((line) => {
            const Icon = line.icon;
            return (
              <div key={line.lead} className={s.poweredItem}>
                <span className={s.poweredIcon}><Icon /></span>
                <p className={s.poweredText}><strong>{line.lead}</strong>{line.rest}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 13. Closing CTA */}
      <section className={s.closing}>
        <p className={s.closingStatement}>
          The house you love, held to the standard <em>it deserves.</em>
        </p>
        <div className={s.closingCtas}>
          <Link href="/howa/coming-soon" className={s.btnFilled}>Coming soon</Link>
          <Link href="#open-booking-form" className={s.btnGhostDark}>Book with HoWA</Link>
        </div>
      </section>
    </div>
  );
}

/* ----------------------------------------------------------------
   HoWA app-preview widget — reused from v4a (house health 91/100).
---------------------------------------------------------------- */
function HowaWidget() {
  return (
    <aside className={v.heroSideCard} aria-label="HoWA app preview">
      <div className={v.appBrand}>
        <Image src="/brand/howa/howa-black.svg" alt="HoWA" width={204} height={102} className={v.appBrandLogo} />
      </div>
      <header className={v.appHeader}>
        <span className={v.appHeaderLeft}>
          <span className={v.appDot} aria-hidden="true" />
          <span className={v.appHeaderTitle}>Today, in your home</span>
        </span>
        <span className={v.appHeaderDate}>Thu · 09:00</span>
      </header>
      <div className={v.appHero}>
        <p className={v.appHeroLabel}>House Health</p>
        <div className={v.appHeroRow}>
          <PieScore value={91} />
          <p className={v.appHeroScore}>91<span className={v.appHeroScoreUnit}>/100</span></p>
        </div>
        <p className={v.appHeroSub}>All systems in good order</p>
      </div>
      <ul className={v.appList}>
        <li className={v.appRow}><span className={`${v.appStatus} ${v.appStatusOk}`} aria-hidden /><span className={v.appRowLabel}>Roof</span><span className={v.appRowValue}>Good order</span></li>
        <li className={v.appRow}><span className={`${v.appStatus} ${v.appStatusAttn}`} aria-hidden /><span className={v.appRowLabel}>Boiler</span><span className={v.appRowValue}>14 days</span></li>
        <li className={v.appRow}><span className={`${v.appStatus} ${v.appStatusOk}`} aria-hidden /><span className={v.appRowLabel}>Garden</span><span className={v.appRowValue}>Thursday</span></li>
        <li className={v.appRow}><span className={`${v.appStatus} ${v.appStatusOk}`} aria-hidden /><span className={v.appRowLabel}>Cleaning</span><span className={v.appRowValue}>Tomorrow</span></li>
        <li className={v.appRow}><span className={`${v.appStatus} ${v.appStatusOk}`} aria-hidden /><span className={v.appRowLabel}>Insurance</span><span className={v.appRowValue}>42 days</span></li>
      </ul>
      <footer className={v.appFooter}>
        <Link href="/howa/coming-soon" className={v.appFooterCta}>Coming soon →</Link>
      </footer>
    </aside>
  );
}

function PieScore({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <svg viewBox="0 0 36 36" width="64" height="64" aria-hidden="true" className="shrink-0">
      <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(48,35,28,0.12)" strokeWidth="3.5" />
      <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--color-house-gold-dark)" strokeWidth="3.5" strokeLinecap="round" pathLength={100} strokeDasharray={`${pct} 100`} transform="rotate(-90 18 18)" />
    </svg>
  );
}

function HomeIcon() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true"><path d="M3 11 L12 4 L21 11 V20 a1 1 0 0 1 -1 1 H4 a1 1 0 0 1 -1 -1 Z" /><path d="M9 21 V13 H15 V21" /></svg>);
}
function ShieldIcon() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true"><path d="M12 3 L20 6 V12 C20 16, 16 20, 12 22 C8 20, 4 16, 4 12 V6 Z" /><path d="M9 12 L11 14 L15 10" /></svg>);
}
function LeafIcon() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true"><path d="M5 21 C 5 12, 12 5, 21 5 C 21 14, 14 21, 5 21 Z" /><path d="M5 21 L 14 12" /></svg>);
}
function AwardIcon() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true"><circle cx="12" cy="9" r="6" /><path d="M9 14 L7 22 L12 19 L17 22 L15 14" /></svg>);
}
