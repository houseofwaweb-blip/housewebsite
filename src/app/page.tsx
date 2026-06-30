import Image from "next/image";
import Link from "next/link";
import s from "./home-v5/home-v5.module.css";
import v from "./home-v4a.module.css";
import { getLatestHearthArticles } from "@/lib/cms/hearth";
import { shopifyProvider } from "@/lib/commerce/shopify";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { HowaAppBanner } from "@/components/marketing/HowaAppBanner";
import { EnquiryForm } from "@/components/marketing/EnquiryForm";
import { BookingFlowStrip } from "@/components/marketing/BookingFlowStrip";

/**
 * Homepage — House-led (v5).
 *
 * Leads with House of Willow Alexander as a design authority and editorial
 * house; introduces HoWA mid-page as the intelligence layer (sections 5, 10,
 * 11 only). Section order follows howa-homepage-v5-brief.md.
 */

export const metadata = {
  title: { absolute: "House of Willow Alexander | Care, design and intelligence for home and garden" },
  description:
    "House of Willow Alexander is the design authority behind every service, every standard, and the system that keeps your home in its best order.",
};

const PILLARS = [
  { label: "Design & Care", title: "Design & Care", sub: "Design and care, held to the House standard.", image: "/home-v4/design-portrait.webp", href: "/design" },
  { label: "The Marketplace", title: "The Marketplace", sub: "Objects with a place in the House.", image: "/home-v4/pillar-2.webp", href: "/shop" },
  { label: "The Hearth", title: "The Hearth", sub: "The editorial soul of the House.", image: "/home-v4/pillar-3.webp", href: "/the-hearth" },
  { label: "The House", title: "The House", sub: "The standard we hold ourselves to.", image: "/home-v4/pillar-4.webp", href: "#the-house" },
];

const HOWA_FEATURES = [
  { lead: "A living record", rest: "the boiler date, the window clean, the warranty and the rose bed, all remembered in one place." },
  { lead: "Risk surfaced early", rest: "the right specialist booked, the record updated, the next reminder set." },
  { lead: "Every home has a rhythm", rest: "windows remembered, gutters before the storm, garden care kept in season." },
];

const PRINCIPLES = [
  { num: "I.", title: "Design-led thinking", body: "Every system, every service, every recommendation is held to a design standard. Not just functional, but considered." },
  { num: "II.", title: "The living record", body: "Nothing should be lost to memory. The boiler service, the warranty, the planting plan, every decision and document, kept where the house can find them." },
  { num: "III.", title: "Stewardship over transaction", body: "A home is not a product to be processed. It is where a life is kept. We treat it, and the people who care for it, that way." },
  { num: "IV.", title: "House-vetted, always", body: "Every partner, every studio, every service carries the House Approved seal. No exceptions, no compromises." },
];

const SERVICES = [
  { name: "Gardening", href: "/services/gardening", image: "/services/subbrands/gardeners.webp" },
  { name: "Window Cleaning", href: "/services/window-cleaning", image: "/services/subbrands/window-cleaner.webp" },
  { name: "Cleaning", href: "/services/cleaning", image: "/services/subbrands/cleaners.webp" },
  { name: "Gutter Cleaning", href: "/services/gutter-cleaning", image: "/services/subbrands/gutter-cleaning.webp" },
];

const SERVICE_BLURB: Record<string, string> = {
  Gardening: "Lawns, borders and seasonal care",
  "Window Cleaning": "Streak-free, inside and out",
  Cleaning: "Regular or one-off, kept spotless",
  "Gutter Cleaning": "Cleared, checked and flowing",
};

const INTEL_STATS = [
  { label: "Risk surfaced", value: "early" },
  { label: "The right specialist", value: "booked" },
  { label: "The record", value: "updated" },
  { label: "The next reminder", value: "set" },
];

const TIERS = [
  { slug: "assistant", numeral: "I.", label: "HoWA Assistant", name: "The house, seen.", features: ["Notices what matters", "Tracks changes in real time", "Surfaces subtle signals"], href: "/howa#assistant" },
  { slug: "housekeeper", numeral: "II.", label: "HoWA Housekeeper", name: "The house, in order.", features: ["Windows remembered", "Services in rhythm", "Nothing slips"], href: "/howa/housekeeper" },
  { slug: "steward", numeral: "III.", label: "HoWA Steward", name: "The house, protected before failure.", features: ["Predicts risk", "Optimises systems", "Protects long-term value"], href: "/howa/steward" },
];

const POWERED = [
  { icon: HomeIcon, lead: "House-vetted partners only", rest: ", every studio carries the seal." },
  { icon: ShieldIcon, lead: "Held in your record", rest: ", every decision and document, kept." },
  { icon: LeafIcon, lead: "Repair over replace", rest: ", retain the fabric, choose better, evidence the impact." },
  { icon: AwardIcon, lead: "House Approved", rest: ", the standard, openly published." },
];

const PRODUCTS = [
  { name: "Dark Grey Chunky Knit Throw", price: "£89.00", image: "https://cdn.shopify.com/s/files/1/1006/9449/1462/files/handmade-dark-grey-chunky-knit-throw.jpg", href: "/shop/collections/soft-furnishings" },
  { name: "Soft Furnishings", price: "The collection", image: null, href: "/shop/collections/soft-furnishings" },
  { name: "Home Accessories", price: "The collection", image: null, href: "/shop/collections/home-accessories" },
  { name: "House Approved", price: "Shop all", image: null, href: "/shop" },
];

// A curated set of room collections for the homepage Marketplace teaser.
// The full eight live on /shop.
const HOME_ROOMS = [
  { name: "Kitchen", handle: "kitchen", image: "/shop/rooms/kitchen.webp" },
  { name: "Living Room", handle: "living-room", image: "/shop/rooms/living-room.webp" },
  { name: "Bedroom", handle: "bedroom", image: "/shop/rooms/bedroom.webp" },
  { name: "Garden & Outdoor", handle: "garden-outdoor", image: "/shop/rooms/garden.webp" },
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
          <FlowerWatermark color="gold" side="left" opacity={0.16} className="!top-auto bottom-[-12%] h-[74%]" />
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>House of Willow Alexander</p>
            <h1 className={s.heroTitle}>
              That Feeling<br />
              <em>You Call Home.</em>
            </h1>
            <p className={s.heroLede}>
              A modern British House for the care, design and intelligence of
              home and garden. We bring together House Approved services,
              considered goods, editorial guidance and HoWA, the Home
              Intelligence OS created to help every home be beautifully kept and
              better understood over time.
            </p>
            <div className={s.heroCtas}>
              <a href="#open-booking-form" className={s.btnFilled}>
                Book through HoWA
              </a>
              <Link href="/shop" className={s.btnGhost}>
                Shop the Marketplace
              </Link>
            </div>
            <p className={s.heroBookingNote}>
              Online bookings are powered by HoWA, the Home Intelligence OS
              created from the House. Prefer to speak to us? <Link href="/contact">Call the House directly</Link>.
            </p>
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
        <FlowerWatermark color="white" side="right" opacity={0.14} />
        <div className={s.quoteInner}>
          <span className={s.quoteLabel}>Est. as a House of design</span>
          <p className={s.quoteText}>
            “We hold our homes to a higher standard, in design, in care, in the
            record kept over time.”
          </p>
          <span className={s.quoteAttr}>House of Willow Alexander</span>
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
            Care, design and intelligence,<br />
            <em>held to one House standard.</em>
          </h2>
        </div>
        <div className={s.houseIntroBody}>
          <p>
            House of Willow Alexander brings the many parts of home into one
            considered standard: gardens and rooms, services and objects,
            documents and records. Each is held to a single test, would we trust
            this in a home we love?
          </p>
          <Link href="/the-house/philosophy" className={s.textLink}>
            Discover the House standard <span aria-hidden className={s.arrow}>→</span>
          </Link>
        </div>
      </section>

      {/* Origin pulse — founder story brought up from About / Artwork (slide 12 #03, slide 18) */}
      <section className={s.origin}>
        <FlowerWatermark color="gold" side="right" opacity={0.2} />
        <div className={s.originVisual}>
          <Image
            src="/home-v4/origin-garden-studio.webp"
            alt="The original Willow Alexander garden studio: soil, seasons and a single electric van"
            width={1122}
            height={1402}
            sizes="(min-width: 860px) 42vw, 100vw"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <div className={s.originScrim} aria-hidden="true" />
          <Image
            src="/brand/wa-gardens-white.png"
            alt="Willow Alexander Gardens"
            width={3595}
            height={2184}
            className={s.originLogo}
          />
        </div>
        <div className={s.originCopy}>
          <p className={s.eyebrow}>Origin</p>
          <h2 className={s.originTitle}>
            Cultivated from a garden studio.<br />
            <em>Built into a House.</em>
          </h2>
          <p className={s.originPara}>
            House of Willow Alexander began with gardens. Soil, seasons, craft, a
            single electric van and regenerative planting plans, founded by Samuel
            Collett and Alexander Oakley on a simple belief, that care could be
            beautiful.
          </p>
          <p className={s.originPara}>
            The name was chosen like a dedication. Willow for resilience and quiet
            magic, Alexander for something steady and classical. Cultivated, not
            branded. From that studio it grew into a modern British House for the
            whole home, part service standard, part design authority, part
            editorial world, and the place HoWA was born.
          </p>
          <Link href="/the-house/artwork" className={s.textLink}>
            Read the Artwork of the House <span aria-hidden className={s.arrow}>→</span>
          </Link>
        </div>
      </section>

      {/* House principles — manifesto */}
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

      {/* Services showcase — sits directly under The House standard */}
      <section className={s.services}>
        <div className={s.servicesInner}>
          <div className={s.servicesHead}>
            <p className={s.eyebrow}>The Services</p>
            <h2 className={s.servicesTitle}>The practical care of home and garden.</h2>
            <p className={s.sectionSub}>
              Gardeners, cleaners, window care, design, repairs and specialist
              partners, booked through HoWA, delivered to the House standard and
              written back to your Home Record.
            </p>
            <div className={s.servicesCtas}>
              <Link href="#open-booking-form" className={s.btnFilled}>
                Book through HoWA
              </Link>
              <Link href="/services" className={s.btnGhost}>
                See all services <span aria-hidden className={s.arrow}>→</span>
              </Link>
            </div>
          </div>
          <div className={s.servicesGrid}>
            {SERVICES.map((svc) => (
              <Link key={svc.name} href={svc.href} className={s.serviceTile}>
                <Image
                  src={svc.image}
                  alt={svc.name}
                  fill
                  sizes="(min-width: 860px) 22vw, 50vw"
                  className={s.serviceTileImg}
                />
                <span className={s.serviceTileName}>{svc.name}</span>
                <span aria-hidden className={s.serviceTileArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Real crew proof on a forest-green ground (brief slide 5: real people,
          real standards; moodboard section colour) */}
      <section className="px-[5vw] py-[clamp(52px,7vw,104px)] bg-house-forest">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-center" style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--color-house-gold-light)", margin: "0 0 14px", fontWeight: 500 }}>
            On the road
          </p>
          <h2 className="text-center" style={{ fontFamily: "var(--font-hearth-serif)", fontWeight: 400, fontSize: "clamp(26px,3.6vw,44px)", lineHeight: 1.1, color: "var(--color-house-cream)", margin: "0 0 clamp(28px,4vw,52px)" }}>
            Real people, real standards, <em>one remembered home.</em>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {[
              { src: "/services/photos/vans/asher-349.webp", alt: "A liveried House of Willow Alexander electric van" },
              { src: "/services/photos/gardening/garden-tidy-hero.webp", alt: "Gardening team at work" },
              { src: "/services/photos/window-cleaning/one-off-window-cleaning-hero.webp", alt: "Window cleaning in progress" },
              { src: "/services/photos/cleaning/regular-cleaning-hero.webp", alt: "Home cleaning in progress" },
            ].map((t) => (
              <div key={t.src} className="relative aspect-[4/5] overflow-hidden bg-house-forest">
                <Image src={t.src} alt={t.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-[clamp(28px,4vw,48px)] flex justify-center">
            <a
              href="#open-booking-form"
              className="inline-flex items-center justify-center border border-house-gold bg-house-gold px-9 py-4 font-sans text-[11px] tracking-[0.18em] uppercase text-house-cream no-underline transition-colors hover:bg-house-gold-light hover:border-house-gold-light"
            >
              Book through HoWA
            </a>
          </div>
        </div>
      </section>

      {/* HoWA — the intelligence layer, introduced before the execution layers (slide 12) */}
      <section className={s.howaIntro}>
        <div className={s.howaIntroInner}>
          <div className={s.howaIntroVisual}>
            <HowaWidget />
          </div>
          <div className={s.howaIntroCopy}>
            <p className={s.eyebrow}>HoWA · Home Intelligence OS</p>
            <h2 className={s.howaIntroTitle}>
              Born inside the House.<br />
              <em>Built for every home.</em>
            </h2>
            <p className={s.howaIntroPara}>
              HoWA is the Home Intelligence OS created from House of Willow
              Alexander. It begins with your address, builds the first portrait of
              your home and keeps a living record of its services, documents, costs,
              risks and care over time. House bookings are powered by HoWA, but
              HoWA is not only for House services.
            </p>
            <p className={s.howaIntroPara}>
              HoWA began as the House booking and home-record platform. It now also
              lives independently as the Home Intelligence OS for any address.
            </p>
            <p className={s.howaIntroPara}>
              <em>Technology in service of beauty, calm and flow, never technology for its own sake.</em>
            </p>
            <div className={s.howaFeatures}>
              {HOWA_FEATURES.map((f) => (
                <div key={f.lead} className={s.howaFeature}>
                  <strong>{f.lead}:</strong> {f.rest}
                </div>
              ))}
            </div>
            <div className={s.howaIntroCtas}>
              <Link href="/howa" className={s.btnFilled}>Start your Home Record</Link>
              <Link href="/howa/how-it-works" className={s.btnGhost}>
                See how it works <span aria-hidden className={s.arrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Booking flow strip — make the "what happens next" loop explicit (brief 5/8) */}
      <BookingFlowStrip />

      {/* HoWA intelligence — what the house notices */}
      <section className={s.intel}>
        <div className={s.intelCopy}>
          <h2 className={s.intelTitle}>
            Your house is trying<br />
            <em>to tell you something.</em>
          </h2>
          <p className={s.intelPara}>
            The windows, the gutters, the laundry that never ends, the boiler
            service you keep meaning to book, the warranty you know is somewhere.
            Hand it to HoWA, and the house starts to remember for you, so the
            next thing to do is simply there when you need it.
          </p>
          <div className={s.intelStats}>
            {INTEL_STATS.map((stat) => (
              <div key={stat.label} className={s.intelStat}>
                <p className={s.intelStatLabel}>{stat.label}</p>
                <p className={s.intelStatValue}>{stat.value}</p>
              </div>
            ))}
          </div>
          <Link href="/howa/how-it-works" className={s.btnGhostDark}>
            See how HoWA works <span aria-hidden className={s.arrow}>→</span>
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

      {/* HoWA tiers — three ways HoWA serves the home (reuses v4a tier cards) */}
      <section className={s.tiers}>
        <header className={s.tiersHead}>
          <p className={s.eyebrow}>HoWA</p>
          <h2 className={s.tiersTitle}>Three ways HoWA serves the home.</h2>
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

      {/* HoWA app — compact get-the-app banner, closing the HoWA zone */}
      <HowaAppBanner />

      {/* Marketplace — shop by room (collections teaser; full grid lives a few sections below) */}
      <section className={s.market}>
        <div className={s.marketInner}>
          <div className={s.marketHead}>
            <div>
              <p className={s.eyebrow}>The Marketplace</p>
              <h2 className={s.marketTitle}>A place for everything.</h2>
              <p className={s.sectionSub}>
                Step into a room to see what the House keeps there, from the
                kitchen table to the garden bench. Every object earns its place.
              </p>
            </div>
            <Link href="/shop" className={s.btnGhost}>
              All rooms <span aria-hidden className={s.arrow}>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {HOME_ROOMS.map((r) => (
              <Link
                key={r.handle}
                href={`/shop/collections/${r.handle}`}
                className="group relative block aspect-[4/5] overflow-hidden bg-house-cream-dark no-underline"
              >
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  sizes="(min-width: 860px) 22vw, 50vw"
                  className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(26,19,13,0.72), rgba(26,19,13,0.05) 55%)" }}
                />
                <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                  <p className="font-display text-[clamp(17px,1.6vw,24px)] leading-[1.1] text-white">{r.name}</p>
                  <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/80 mt-1.5 transition-colors group-hover:text-white">
                    Shop the room →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The Hearth — editorial break between the two Marketplace sections */}
      <section className={s.hearth}>
        <div className={s.hearthInner}>
          <div className={s.hearthCopy}>
            <p className={s.eyebrow + " " + s.eyebrowLight}>The Hearth</p>
            <h2 className={s.hearthTitle}>
              <em>The editorial</em> soul of the House.
            </h2>
            <p className={s.hearthPara}>
              Essays, recipes, garden notes and design wisdom for the quiet art of
              keeping a home. Published when there is something worth saying,
              never when there isn&apos;t.
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

      {/* The House sets the standard — between the two Marketplace sections */}
      <section className={s.powered}>
        <FlowerWatermark color="gold" side="left" opacity={0.18} />
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

      {/* Marketplace feature */}
      <section className={s.market}>
        <div className={s.marketInner}>
          <div className={s.marketHead}>
            <div>
              <p className={s.eyebrow}>The Marketplace</p>
              <h2 className={s.marketTitle}>Objects with a place in the House.</h2>
              <p className={s.sectionSub}>
                Considered goods, home essentials, garden tools and House Approved
                pieces, chosen for usefulness, beauty and longevity.
              </p>
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

      {/* Services — second touchpoint with clear CTAs, beneath the House standard */}
      <section className="px-[5vw] py-[clamp(48px,6vw,90px)] border-t border-house-brown/10" style={{ background: "var(--color-house-cream)" }}>
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center max-w-[660px] mx-auto mb-11">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-house-gold mb-3">The Services</p>
            <h2 className="font-display text-[clamp(26px,3vw,42px)] leading-[1.06] text-house-brown mb-4">
              Whatever the home needs, booked in minutes.
            </h2>
            <p className="font-sans text-[14px] text-house-stone leading-[1.6]">
              Vetted local specialists, delivered to the House standard and written
              back to your Home Record.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-11">
            {SERVICES.map((svc) => (
              <Link
                key={svc.name}
                href={svc.href}
                className="group flex flex-col border border-house-brown/12 bg-house-white no-underline transition-colors hover:border-house-gold"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-house-cream-dark">
                  <Image
                    src={svc.image}
                    alt={svc.name}
                    fill
                    sizes="(min-width: 768px) 22vw, 50vw"
                    className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <p className="font-display text-[19px] leading-tight text-house-brown mb-1.5">{svc.name}</p>
                  <p className="font-sans text-[12.5px] text-house-stone leading-[1.5] mb-6 flex-1">{SERVICE_BLURB[svc.name]}</p>
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-house-gold-dark transition-colors group-hover:text-house-brown">
                    Book through HoWA →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#open-booking-form" className={s.btnFilled}>Book through HoWA</Link>
            <Link href="/services" className={s.btnGhost}>
              See all services <span aria-hidden className={s.arrow}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Enquiry / book-a-service form — direct lead capture into the Home Record */}
      <EnquiryForm
        sourcePage="/"
        eyebrow="Get in touch"
        headline="Speak to the House."
        body="Ask a question or tell us which service you are after, and we will come back to you personally. Choose a service below, or leave it as a general enquiry."
      />

      {/* 13. Closing CTA */}
      <section className={s.closing}>
        <FlowerWatermark color="white" side="right" opacity={0.14} />
        <p className={s.closingStatement}>
          A House for the home you love, <em>kept to the standard a good home deserves.</em>
        </p>
        <div className={s.closingCtas}>
          <Link href="#open-booking-form" className={s.btnFilled}>Book through HoWA</Link>
          <Link href="/shop" className={s.btnGhostDark}>Shop the Marketplace</Link>
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
        <p className={v.appHeroSub}>Boiler, roof and garden, on track</p>
      </div>
      <ul className={v.appList}>
        <li className={v.appRow}><span className={`${v.appStatus} ${v.appStatusOk}`} aria-hidden /><span className={v.appRowLabel}>Roof</span><span className={v.appRowValue}>Good order</span></li>
        <li className={v.appRow}><span className={`${v.appStatus} ${v.appStatusAttn}`} aria-hidden /><span className={v.appRowLabel}>Boiler</span><span className={v.appRowValue}>14 days</span></li>
        <li className={v.appRow}><span className={`${v.appStatus} ${v.appStatusOk}`} aria-hidden /><span className={v.appRowLabel}>Garden</span><span className={v.appRowValue}>Thursday</span></li>
        <li className={v.appRow}><span className={`${v.appStatus} ${v.appStatusOk}`} aria-hidden /><span className={v.appRowLabel}>Cleaning</span><span className={v.appRowValue}>Tomorrow</span></li>
        <li className={v.appRow}><span className={`${v.appStatus} ${v.appStatusOk}`} aria-hidden /><span className={v.appRowLabel}>Warranty</span><span className={v.appRowValue}>42 days</span></li>
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
