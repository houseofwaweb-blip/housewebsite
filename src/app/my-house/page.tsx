import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonLd";

export const metadata: Metadata = {
  title: "My House",
  description:
    "My House is your account with the House of Willow Alexander, powered by HoWA. Manage bookings, cover, orders and your Home Record in one place.",
};

const ACCOUNTS_URL = "https://accounts.willowalexander.co.uk/";

const areas: { name: string; blurb: string }[] = [
  { name: "Overview", blurb: "Your next booking, current actions and anything that needs your attention, gathered on one page." },
  { name: "Bookings", blurb: "Upcoming and past visits. Reschedule, repeat or cancel, with clear terms shown before you confirm." },
  { name: "Cover", blurb: "Home and pet policies, renewal dates, documents and a direct route to claims and help." },
  { name: "Orders", blurb: "Purchases from the House Store, delivery status, returns and receipts kept together." },
  { name: "Home Record", blurb: "A useful, private record of your home: property details, past visits, warranties and access notes." },
  { name: "Saved", blurb: "Articles from The Hearth and objects from the Store you have set aside for later." },
  { name: "Profile & permissions", blurb: "Your contact details, marketing preferences and control over what information the House can use." },
];

const records = [
  "Property details and room notes",
  "Completed visits and professional notes",
  "Uploaded receipts and documents",
  "Policy references and renewal dates",
  "Product warranties",
  "Maintenance reminders",
  "Preferences and access notes",
];

const eyebrow =
  "font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-house-gold-dark";

/** Alternating image / text feature row. `flip` puts the image on the right. */
function Feature({
  kicker,
  title,
  img,
  alt,
  flip = false,
  portrait = true,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  img: string;
  alt: string;
  flip?: boolean;
  portrait?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-[clamp(28px,5vw,72px)] md:grid-cols-2">
      <div className={flip ? "md:order-2" : ""}>
        <div
          className={`relative w-full overflow-hidden border border-house-line ${
            portrait ? "aspect-[3/4]" : "aspect-[3/2]"
          }`}
        >
          <Image
            src={img}
            alt={alt}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className={flip ? "md:order-1" : ""}>
        <p className={eyebrow}>{kicker}</p>
        <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,42px)] font-normal leading-[1.12] tracking-[-0.01em] text-house-brown">
          {title}
        </h2>
        <div className="mt-5 max-w-[52ch] font-sans text-[16px] leading-[1.7] text-house-brown/82">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function MyHousePage() {
  return (
    <div className="bg-house-cream text-house-ink">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "My House", href: "/my-house" },
        ]}
      />

      {/* Hero — split: plaque left, image right */}
      <header className="px-[clamp(24px,5vw,96px)] pt-[clamp(56px,9vh,120px)] pb-[clamp(40px,6vw,80px)]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-[clamp(32px,5vw,72px)] md:grid-cols-2">
          <div>
            <p className={eyebrow}>My House · Powered by HoWA</p>
            <h1 className="mt-5 font-display text-[clamp(46px,6vw,92px)] font-normal leading-[0.98] tracking-[-0.02em] text-house-brown">
              My House
            </h1>
            <p className="mt-7 max-w-[48ch] font-sans text-[clamp(17px,1.6vw,21px)] leading-[1.6] text-house-brown/84">
              One place for everything the House looks after on your behalf: your
              bookings, your cover, your orders and the record of your home. Sign
              in to pick up where you left off.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={ACCOUNTS_URL}
                className="inline-flex min-h-12 items-center border border-house-brown bg-house-brown px-8 font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-house-chalk no-underline transition-colors hover:bg-house-brown/90"
              >
                Sign in
              </a>
              <a
                href="#open-booking-form"
                className="inline-flex min-h-12 items-center border border-house-brown px-8 font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-house-brown no-underline transition-colors hover:bg-house-brown hover:text-house-chalk"
              >
                Book a service
              </a>
            </div>
            <p className="mt-6 max-w-[46ch] font-sans text-[14px] leading-[1.6] text-house-brown/60">
              New to the House? You can book a service or get a quote as a guest.
              An account is offered afterwards, never as a gate.
            </p>
          </div>

          <div className="relative aspect-[3/2] w-full overflow-hidden border border-house-line">
            <Image
              src="/brand/my-house/hero.webp"
              alt="A sunlit room in a British home, cared for and in good order"
              fill
              priority
              sizes="(min-width: 768px) 48vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </header>

      {/* Feature rows — image-led, alternating */}
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[clamp(56px,8vw,120px)] px-[clamp(24px,5vw,96px)] py-[clamp(48px,7vw,104px)]">
        <Feature
          kicker="One account"
          title="Everything the House looks after, gathered in one place."
          img="/brand/my-house/townhouse.webp"
          alt="A cream London townhouse at dusk, drawn as a wireframe"
          flip
        >
          <p>
            Your next visit, your cover, your orders and the record of your home,
            on a single page. No repeating yourself, no digging through email.
            Sign in and everything is where you left it.
          </p>
        </Feature>

        <Feature
          kicker="Your Home Record"
          title={
            <>
              A useful record of your home. <em>Not a profile of you.</em>
            </>
          }
          img="/brand/my-house/library.webp"
          alt="A House library with House Approved tools, kept in good order"
        >
          <p>
            The practical details of your home, kept in one place so the House
            can help without asking you to repeat yourself. It belongs to you.
            Every entry shows where it came from and when it was added, and you
            can edit or delete it.
          </p>
          <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {records.map((r) => (
              <li
                key={r}
                className="flex items-baseline gap-3 font-sans text-[15px] leading-[1.5] text-house-brown"
              >
                <span aria-hidden className="font-display text-house-gold">
                  ·
                </span>
                {r}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-sans text-[15px] text-house-brown/70">
            Read more about how the House uses HoWA on the{" "}
            <Link
              href="/how-it-works"
              className="text-house-gold-dark underline underline-offset-2"
            >
              How it works
            </Link>{" "}
            page.
          </p>
        </Feature>

        <Feature
          kicker="Bookings"
          title="Book once. The House remembers the rest."
          img="/brand/my-house/garden-doors.webp"
          alt="Garden doors opening onto a sage garden with roses"
          flip
        >
          <p>
            Upcoming and past visits, together. Reschedule, repeat or cancel,
            with clear terms shown before you confirm, and every visit written
            back to your Home Record so the house remembers what was done.
          </p>
        </Feature>

        <Feature
          kicker="Cover, orders and saved things"
          title="Policies, purchases and the pieces you set aside."
          img="/brand/my-house/pinkroom.webp"
          alt="A soft pink room framed by wisteria"
        >
          <p>
            Renewal dates and policy documents, Store orders and returns, and the
            articles from The Hearth and objects from the Store you saved for
            later, all kept in one calm place.
          </p>
        </Feature>
      </div>

      {/* Seven areas */}
      <section className="border-t border-house-line bg-house-cream-light px-[clamp(24px,5vw,96px)] py-[clamp(48px,7vw,96px)]">
        <div className="mx-auto max-w-[1200px]">
          <p className={`${eyebrow} flex items-center gap-3.5`}>
            <span aria-hidden className="h-px w-9 bg-house-gold-dark/70" />
            Inside My House
          </p>
          <div className="mt-7 grid border-l border-t border-house-line sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <div key={a.name} className="border-b border-r border-house-line bg-house-cream-light p-[clamp(22px,2.6vw,32px)]">
                <h3 className="font-display text-[clamp(19px,2vw,25px)] font-normal italic leading-[1.2] text-house-brown">
                  {a.name}
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-[1.6] text-house-brown/78">
                  {a.blurb}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing image — contained, framed (not full-bleed) */}
      <div className="px-[clamp(24px,5vw,96px)] pb-[clamp(48px,7vw,96px)]">
        <div className="relative mx-auto aspect-[3/2] w-full max-w-[1200px] overflow-hidden border border-house-line sm:aspect-[16/9]">
          <Image
            src="/brand/my-house/garden-view.webp"
            alt="A sage garden room looking out onto the grounds"
            fill
            sizes="(min-width: 1200px) 1200px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Sign-in band */}
      <section className="bg-house-brown text-house-chalk">
        <div className="mx-auto max-w-[1200px] px-[clamp(24px,5vw,96px)] py-[clamp(56px,7vw,96px)] text-center">
          <h2 className="mx-auto max-w-[18ch] font-display text-[clamp(28px,3.4vw,46px)] font-normal leading-[1.12] text-house-chalk">
            Everything the House holds, in one place.
          </h2>
          <a
            href={ACCOUNTS_URL}
            className="mt-8 inline-flex min-h-12 items-center border border-house-chalk bg-house-chalk px-9 font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-house-brown no-underline transition-colors hover:bg-transparent hover:text-house-chalk"
          >
            Sign in to My House
          </a>
          <p className="mt-7 font-sans text-[11px] uppercase tracking-[0.24em] text-house-chalk/60">
            My House, powered by HoWA
          </p>
        </div>
      </section>
    </div>
  );
}
