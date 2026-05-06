import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { StateBadge } from "@/components/primitives/StateBadge";
import { WaitlistMini } from "@/components/marketing/WaitlistMini";
import { NewsletterInline } from "@/components/marketing/NewsletterInline";
import { getNewsletterBlock } from "@/lib/cms/newsletter";
import { getPageSections, cms } from "@/lib/cms/page-sections";

export const metadata = {
  title: "Protect",
  description:
    "Home Protection & Risk Reduction. Preventative care for homes that are lived in properly. A new House service launching late 2026.",
};

export default async function ProtectPage() {
  const [nlBlock, sections] = await Promise.all([
    getNewsletterBlock("protect"),
    getPageSections("protect"),
  ]);
  const s = (name: string) => sections.get(name);

  return (
    <article className="bg-house-cream text-house-brown">
      {/* ============================================================
          1. Hero — full viewport, House mode (cream + Didot + outlined CTAs)
          ============================================================ */}
      <section className="relative overflow-hidden border-b border-house-brown/10">
        <div className="px-[5vw] pt-[12vh] pb-20 md:pb-24">
          <div className="max-w-[1200px] mx-auto grid md:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-7">
                <Eyebrow>Home Protection &amp; Risk Reduction</Eyebrow>
                <StateBadge state="coming">Late 2026</StateBadge>
              </div>
              <h1 className="em-accent font-display font-medium text-[clamp(44px,6.2vw,84px)] leading-[1.02] tracking-[-0.012em]">
                {cms(
                  s("hero"),
                  "headline",
                  "Preventative care for homes that are lived in properly.",
                )}
              </h1>
              <p className="font-display italic text-[clamp(20px,2vw,26px)] leading-[1.45] text-house-brown/80 mt-7 max-w-[42ch]">
                A considered approach to protecting homes from avoidable damage
                through foresight, verification, and ongoing care.
              </p>
              <div className="flex items-center gap-4 flex-wrap mt-10">
                <a
                  href="#register"
                  className="inline-block font-sans text-[12px] tracking-[0.22em] uppercase text-house-brown border border-house-brown px-7 py-4 no-underline transition-all duration-200 ease-out hover:bg-house-brown hover:text-house-cream"
                >
                  Register interest
                </a>
                <a
                  href="#brief"
                  className="inline-block font-sans text-[12px] tracking-[0.22em] uppercase text-house-gold-dark no-underline border-b border-house-gold pb-1 hover:text-house-brown"
                >
                  Read the brief →
                </a>
              </div>
            </div>

            {/* Hero — surveyor's notebook open on a wooden table. Real
                evidence pack (paper-clipped photographs, hand-drawn floor
                plan, brass key, pencil). Documentary, not styled. */}
            <figure className="relative aspect-[4/5] border border-house-brown/10 overflow-hidden">
              <Image
                src="/protect/protect-hero.webp"
                alt="A House surveyor's notebook open on a wooden table — hand-drawn ground floor plan, paper-clipped photographs, brass key and pencil."
                fill
                sizes="(min-width: 768px) 48vw, 100vw"
                priority
                className="object-cover"
              />
              {/* Stamp */}
              <div className="absolute bottom-5 right-5 border border-house-gold-dark text-house-gold-dark text-[9px] tracking-[0.32em] uppercase px-3 py-1.5 rotate-[-4deg] bg-[#f0e0c2]/85">
                Coming soon
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. Premise — single editorial paragraph, calm and quiet
          ============================================================ */}
      <section id="brief" className="px-[5vw] py-24 md:py-32 border-b border-house-brown/10">
        <div className="max-w-[820px] mx-auto text-center">
          <p className="font-display italic text-[clamp(28px,3.4vw,44px)] leading-[1.3] text-house-brown tracking-[-0.005em]">
            Most damage doesn&apos;t arrive dramatically.<br/>
            It begins quietly. <span className="text-house-gold-dark">A slow leak, a forgotten battery, a system left unchecked.</span>
          </p>
          <div className="w-12 h-px bg-house-gold mx-auto mt-10" />
          <p className="font-sans text-[16px] leading-[1.7] text-house-brown/72 mt-10 max-w-[58ch] mx-auto">
            Home Protection &amp; Risk Reduction is the House&apos;s answer to that
            reality. A new service focused on prevention, continuity, and stewardship
            over time.
          </p>
        </div>
      </section>

      {/* ============================================================
          3. Twin panels — Provides / Doesn't provide
          ============================================================ */}
      <section className="px-[5vw] py-20 bg-white border-b border-house-brown/10">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-px bg-house-brown/10">
          {/* Provides */}
          <div className="bg-white p-10 lg:p-14">
            <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-house-gold-dark mb-3">
              What this service
            </p>
            <h2 className="em-accent font-display font-medium text-[clamp(28px,2.8vw,36px)] leading-[1.1] mb-6">
              <em>Provides.</em>
            </h2>
            <p className="font-sans italic text-[16px] leading-[1.6] text-house-brown/75 mb-8">
              Designed to prevent disruption before it begins. Quiet diligence,
              informed assessment, and ongoing attention.
            </p>
            <ul className="flex flex-col gap-4">
              {[
                "A preventative approach to home care",
                "Calm, practical risk identification",
                "Thoughtful follow-through and documentation",
                "Ongoing oversight, not reactive fixes",
              ].map((line) => (
                <li
                  key={line}
                  className="relative pl-6 font-sans text-[16px] leading-[1.55] text-house-brown/90 before:content-['—'] before:absolute before:left-0 before:text-house-gold"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {/* Doesn't provide */}
          <div className="bg-house-cream p-10 lg:p-14">
            <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-house-gold-dark/60 mb-3">
              What this service
            </p>
            <h2 className="em-accent font-display font-medium text-[clamp(28px,2.8vw,36px)] leading-[1.1] mb-6">
              <em>Doesn&apos;t provide.</em>
            </h2>
            <p className="font-sans italic text-[16px] leading-[1.6] text-house-brown/65 mb-8">
              Not built on alarms, urgency, or worst-case scenarios. It complements
              responsible ownership, never replaces it.
            </p>
            <ul className="flex flex-col gap-4">
              {[
                "An insurance product",
                "A legal survey",
                "A gadget-led alarm package",
                "A one-off checklist with no memory",
              ].map((line) => (
                <li
                  key={line}
                  className="relative pl-6 font-sans text-[16px] leading-[1.55] text-house-brown/65 before:content-['×'] before:absolute before:left-0 before:text-house-brown/30 before:text-[18px]"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. Three risk areas — where our experts provide support
          ============================================================ */}
      <section className="px-[5vw] py-24 md:py-28 border-b border-house-brown/10">
        <div className="max-w-[1280px] mx-auto">
          <header className="text-center max-w-[680px] mx-auto mb-16">
            <Eyebrow>Where our experts provide support</Eyebrow>
            <h2 className="em-accent font-display font-medium text-[clamp(32px,3.6vw,48px)] leading-[1.1] tracking-[-0.005em] mt-5">
              The risks that build <em>quietly.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.7] text-house-brown/72 mt-6">
              Most household damage doesn&apos;t come from a single dramatic event.
              It builds through small oversights — easy to miss, costly to ignore.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-px bg-house-brown/10">
            {[
              {
                roman: "I.",
                name: "Water, Drainage & Ingress",
                tagline: "The most common and disruptive source of household damage.",
                body: "Slow leaks. Blocked gutters. Poor drainage. Water finding its way in unnoticed and developing quietly over time. Ingress is rarely visible until it has already cost the homeowner.",
                bullets: ["Gutter and downpipe verification", "External drainage and standing-water audit", "Internal moisture and ventilation review"],
                image: "/protect/protect-water.webp",
                imageAlt: "Weathered copper downpipe at the corner of a stone house, water on the slabs below.",
              },
              {
                roman: "II.",
                name: "Boundaries, Fences & External Elements",
                tagline: "External structures, exposed to constant weathering.",
                body: "Fences, walls, and guttering. Gradual movement, decay, or failure can create safety issues, access risks, and secondary damage if left unmanaged.",
                bullets: ["Fence and boundary integrity check", "Wall and pointing inspection", "Outbuilding condition and access review"],
                image: "/protect/protect-boundaries.webp",
                imageAlt: "Wrought-iron gate set into stone piers at golden hour, with the drive beyond.",
              },
              {
                roman: "III.",
                name: "Fire & Carbon Monoxide",
                tagline: "Systems degrade. Batteries fail. Standards change.",
                body: "Smoke and CO detection placement, condition, and regular verification. Often correctly installed once and quietly forgotten — until they matter.",
                bullets: ["Detector placement against current standards", "Battery and self-test verification", "Replacement schedule documented"],
                image: "/protect/protect-fire.webp",
                imageAlt: "Brass smoke detector mounted on a moulded plaster ceiling rose.",
              },
            ].map((area) => (
              <article key={area.roman} className="bg-house-cream p-10 lg:p-12">
                <div className="relative aspect-[4/3] mb-7 overflow-hidden border border-house-brown/10">
                  <Image
                    src={area.image}
                    alt={area.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-3 font-sans text-[9px] tracking-[0.28em] uppercase text-house-cream/80 mix-blend-difference">
                    Plate {area.roman}
                  </div>
                </div>
                <p className="font-display italic text-[13px] text-house-brown/55 mb-2">
                  {area.roman}
                </p>
                <h3 className="font-sans font-medium text-[12px] tracking-[0.28em] uppercase text-house-brown mb-3">
                  {area.name}
                </h3>
                <p className="font-display italic text-[19px] leading-[1.3] text-house-brown mb-4">
                  {area.tagline}
                </p>
                <p className="font-sans text-[14px] leading-[1.65] text-house-brown/75 mb-5">
                  {area.body}
                </p>
                <ul className="flex flex-col gap-2.5 border-t border-house-brown/10 pt-5">
                  {area.bullets.map((b) => (
                    <li
                      key={b}
                      className="relative pl-5 font-sans text-[13px] leading-[1.5] text-house-brown/80 before:content-['·'] before:absolute before:left-0 before:text-house-gold-dark before:text-[16px] before:leading-[1.2]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          5. What to expect — three-step product timeline
          ============================================================ */}
      <section className="px-[5vw] py-24 md:py-28 bg-white border-b border-house-brown/10">
        <div className="max-w-[1200px] mx-auto">
          <header className="max-w-[640px] mb-14">
            <Eyebrow>What to expect</Eyebrow>
            <h2 className="em-accent font-display font-medium text-[clamp(32px,3.6vw,48px)] leading-[1.1] tracking-[-0.005em] mt-5">
              Three quiet acts of <em>looking after.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.7] text-house-brown/72 mt-6">
              When launched, Home Protection unfolds in three movements — assess,
              implement, watch over. Held in your home record, surfaced only when it
              matters.
            </p>
          </header>

          <ol className="grid md:grid-cols-3 gap-px bg-house-brown/10">
            {[
              {
                num: "01",
                name: "Home Protection Review",
                tagline: "An in-person, whole-home preventative assessment.",
                body: "A House-vetted specialist walks the property, room by room and outside in. Photographs, notes, and a prioritised works list. Insurance-ready documentation, filed straight to your home record.",
              },
              {
                num: "02",
                name: "Protection Setup",
                tagline: "Coordinated implementation of agreed measures.",
                body: "Approved partners book the work, the House oversees the schedule, and every action is logged. You see what was done, when, and by whom — without managing each handover yourself.",
              },
              {
                num: "03",
                name: "Ongoing Protection Plan",
                tagline: "Regular verification and recorded oversight via HoWA+.",
                body: "Seasonal checks, reminders before they become urgent, and a quiet running record of the home's state. You don't need to remember everything. HoWA does that for you.",
              },
            ].map((step) => (
              <li key={step.num} className="bg-house-cream p-10 lg:p-12 list-none">
                <p className="font-display italic text-[14px] tracking-[0.05em] text-house-gold-dark mb-4">
                  {step.num}
                </p>
                <h3 className="font-sans font-medium text-[12px] tracking-[0.28em] uppercase text-house-brown mb-3">
                  {step.name}
                </h3>
                <p className="font-display italic text-[20px] leading-[1.3] text-house-brown mb-5">
                  {step.tagline}
                </p>
                <p className="font-sans text-[14px] leading-[1.65] text-house-brown/75">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <p className="font-display italic text-[clamp(20px,2.2vw,26px)] leading-[1.4] text-house-brown text-center mt-16 max-w-[680px] mx-auto">
            You don&apos;t need to remember everything.{" "}
            <span className="text-house-gold-dark">HoWA does that for you.</span>
          </p>
        </div>
      </section>

      {/* ============================================================
          6. Who it's for — audience block
          ============================================================ */}
      <section className="px-[5vw] py-24 md:py-28 border-b border-house-brown/10">
        <div className="max-w-[1080px] mx-auto grid md:grid-cols-[1fr_1.3fr] gap-16 items-start">
          <div>
            <Eyebrow>Is it right for you?</Eyebrow>
            <h2 className="em-accent font-display font-medium text-[clamp(32px,3.4vw,44px)] leading-[1.1] tracking-[-0.005em] mt-5">
              For homes that expect to be <em>looked after.</em>
            </h2>
          </div>
          <div>
            <ul className="flex flex-col">
              {[
                {
                  name: "Busy households",
                  body: "Where peace of mind matters more than personally managing every detail.",
                },
                {
                  name: "Period or high-value homes",
                  body: "Where preventative care preserves both the building and its value over decades.",
                },
                {
                  name: "Second homes & unoccupied properties",
                  body: "Where the home is left for weeks or months and small problems become large in absence.",
                },
                {
                  name: "Clients who prefer prevention over repair",
                  body: "Who see care as an ongoing relationship, not a series of call-outs.",
                },
              ].map((a) => (
                <li
                  key={a.name}
                  className="border-t border-house-brown/12 py-5 first:pt-0 first:border-t-0"
                >
                  <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-house-brown font-medium mb-1.5">
                    {a.name}
                  </p>
                  <p className="font-sans italic text-[15px] leading-[1.55] text-house-brown/72">
                    {a.body}
                  </p>
                </li>
              ))}
            </ul>
            <p className="font-display italic text-[clamp(20px,2vw,24px)] leading-[1.4] text-house-brown mt-10 pt-10 border-t border-house-brown/12">
              If you already trust the House with your home,{" "}
              <span className="text-house-gold-dark">this is the next layer of care.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. Home Protection register-interest panel
          ============================================================ */}
      <section
        id="register"
        className="px-[5vw] py-20 bg-house-cream-dark border-b border-house-brown/10"
      >
        <div className="max-w-[1080px] mx-auto grid md:grid-cols-[1fr_1.3fr] gap-12 items-start">
          <div>
            <StateBadge state="coming">Late 2026 · priority for HoWA+</StateBadge>
            <h2 className="em-accent font-display font-medium text-[clamp(28px,3.2vw,40px)] leading-[1.1] mt-5 mb-4">
              Home <em>Protection.</em>
            </h2>
            <p className="font-display italic text-[17px] leading-[1.55] text-house-brown/75">
              A one-day in-person review by House-vetted specialists. The first
              practical act of Home Protection.
            </p>
          </div>
          <div>
            <ul className="flex flex-col gap-3 mb-7">
              {[
                "Condition survey across the building — fabric, systems, access, security.",
                "Evidence pack — photographs, notes, and a prioritised works list.",
                "Insurance-ready documentation, filed straight to your HoWA record.",
                "Introductions to vetted specialists for anything the Review flags.",
              ].map((line) => (
                <li
                  key={line}
                  className="relative pl-5 font-sans text-[16px] leading-[1.55] text-house-brown/90 before:content-['—'] before:absolute before:left-0 before:text-house-gold"
                >
                  {line}
                </li>
              ))}
            </ul>
            <p className="font-sans italic text-[14px] text-house-brown/65 mb-5">
              Opening late 2026. Register interest and we&apos;ll write when it&apos;s
              ready, with priority for HoWA+ members.
            </p>
            <WaitlistMini
              product="protect_review"
              sourcePage="/protect"
              placeholder="Your email"
              buttonLabel="Register interest"
              successMessage="Thank you. We'll write when Home Protection opens."
            />
          </div>
        </div>
      </section>

      {/* ============================================================
          8. Insurance — keep, slimmer
          ============================================================ */}
      <section
        id="insurance"
        className="px-[5vw] py-20 bg-white border-b border-house-brown/10"
      >
        <div className="max-w-[1080px] mx-auto grid md:grid-cols-[1fr_1.3fr] gap-12 items-start">
          <div>
            <StateBadge state="interest">Register interest</StateBadge>
            <h2 className="em-accent font-display font-medium text-[clamp(28px,3.2vw,40px)] leading-[1.1] mt-5 mb-4">
              House Approved <em>Insurance.</em>
            </h2>
            <p className="font-display italic text-[17px] leading-[1.55] text-house-brown/75">
              Cover that understands period homes, valuable contents, and the
              things a standard policy quietly excludes.
            </p>
          </div>
          <div>
            <p className="font-sans text-[16px] leading-[1.7] text-house-brown/85 mb-5">
              Introduced by the House, underwritten by FCA-regulated specialists
              we&apos;ve vetted to the same standard as every partner who carries
              the House Approved seal. A proper conversation, not a comparison site.
            </p>
            <ul className="flex flex-col gap-3 mb-6">
              {[
                "A named underwriter who understands the home.",
                "Cover for period features, outbuildings, collections, and grounds.",
                "Claims support via the House — we stay with you until it resolves.",
              ].map((line) => (
                <li
                  key={line}
                  className="relative pl-5 font-sans text-[16px] leading-[1.55] text-house-brown/90 before:content-['—'] before:absolute before:left-0 before:text-house-gold"
                >
                  {line}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 flex-wrap mb-5">
              <Link
                href="/protect/insurance"
                className="inline-block font-sans text-[12px] tracking-[0.22em] uppercase text-house-brown border border-house-brown px-6 py-3.5 no-underline transition-all duration-200 ease-out hover:bg-house-brown hover:text-house-cream"
              >
                See full insurance page
              </Link>
            </div>
            <WaitlistMini
              product="insurance"
              sourcePage="/protect#insurance"
              placeholder="Your email"
              buttonLabel="Register interest"
              successMessage="Thank you. A House contact will reach out with next steps."
            />
          </div>
        </div>
      </section>

      {/* ============================================================
          9. Natural evolution — closing editorial band + interim services
          ============================================================ */}
      <section className="relative px-[5vw] py-24 md:py-32 bg-house-brown text-house-cream overflow-hidden">
        <Image
          src="/protect/protect-evolution.webp"
          alt="Georgian country house at dusk, two windows lit warm."
          fill
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-house-brown/60 via-house-brown/75 to-house-brown/90"
        />
        <div className="relative max-w-[1080px] mx-auto">
          <div className="text-center max-w-[760px] mx-auto">
            <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-house-gold-light mb-6">
              A natural evolution
            </p>
            <h2 className="em-accent font-display font-medium text-[clamp(32px,3.8vw,52px)] leading-[1.1] tracking-[-0.005em]">
              The next layer of care from the <em>House.</em>
            </h2>
            <p className="font-display italic text-[clamp(18px,1.9vw,22px)] leading-[1.5] text-house-cream/85 mt-7 max-w-[58ch] mx-auto">
              Home Protection &amp; Risk Reduction is thoughtful, preventative, and
              designed to last. Until it launches, you can explore the services
              already available.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-house-cream/15 mt-14 max-w-[920px] mx-auto">
            {[
              { name: "Gardening", href: "/services/gardening" },
              { name: "Window Cleaning", href: "/services/window-cleaning" },
              { name: "Cleaning", href: "/services/cleaning" },
              { name: "Gutter Cleaning", href: "/services/gutter-cleaning" },
            ].map((svc) => (
              <Link
                key={svc.name}
                href={svc.href}
                className="group bg-house-brown px-6 py-7 text-center no-underline transition-colors hover:bg-[#3e2e23]"
              >
                <p className="font-display italic text-[clamp(20px,2.2vw,28px)] text-house-cream group-hover:text-house-gold-light leading-[1.15]">
                  {svc.name}
                </p>
                <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-cream/55 mt-3">
                  Available now →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          10. FCA notice
          ============================================================ */}
      <section className="px-[5vw] py-10 bg-[#241a14] text-house-cream">
        <div className="max-w-[880px] mx-auto">
          <p className="font-sans text-[12px] leading-[1.6] text-house-cream/70">
            House of Willow Alexander acts as an introducer for insurance products;
            we do not advise on, arrange, or conduct regulated activity.
            Introductions are passed to FCA-authorised partners for any subsequent
            discussion, quotation, or contract. See our{" "}
            <Link
              href="/legal/privacy"
              className="text-house-cream underline decoration-house-gold-light underline-offset-4"
            >
              privacy page
            </Link>{" "}
            for how your details are handled.
          </p>
        </div>
      </section>

      {/* ============================================================
          11. Newsletter — keep
          ============================================================ */}
      <NewsletterInline
        variant={nlBlock?.variant ?? "cream"}
        sourcePage="/protect"
        headline={nlBlock?.headline ?? "Prevention starts with awareness."}
        body={
          nlBlock?.body ??
          "The Hearth publishes weekly on homes, gardens, and the quiet discipline of looking after a place. Seasonal notes that help you stay ahead."
        }
        {...(nlBlock ?? {})}
      />
    </article>
  );
}
