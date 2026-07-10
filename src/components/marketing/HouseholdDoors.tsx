import Link from "next/link";
import Image from "next/image";

/**
 * The five free Household doors, as cutaway-house cards (askhowa reference
 * layout). Shared by /household and the homepage "Meet the Household" section.
 * Render inside a `.howa-surface` scope so the rounded corners apply.
 */

export const FREE_DOORS = [
  {
    role: "The Gardener",
    href: "/household/gardener",
    img: "/howa/household/gardener.webp",
    color: "#5f6f3c",
    forLine: "For the garden that needs reading before it needs doing.",
    line: "Scan your garden. Learn what is thriving, what is struggling and what the season asks.",
    cta: "Scan free",
  },
  {
    role: "The Handyman",
    href: "/household/handyman",
    img: "/howa/household/handyman.webp",
    color: "#b3623a",
    forLine: "For the thing that is broken, dripping, clicking or making people anxious.",
    line: "Photo a fault. Learn what it likely is, how urgent it feels and what a fair fix might cost.",
    cta: "Photo the fault",
  },
  {
    role: "The Designer",
    href: "/household/designer",
    img: "/howa/household/designer.webp",
    color: "#7c5a78",
    forLine: "For the room or garden someone can imagine, but cannot yet see clearly.",
    line: "Send one photo. A room or garden becomes a considered direction, palette, planting, layout or mood.",
    cta: "See yours",
  },
  {
    role: "The Surveyor",
    href: "/household/surveyor",
    img: "/howa/household/surveyor.webp",
    color: "#4a5568",
    forLine: "For the crack, damp patch or quote that sits in the back of someone's mind.",
    line: "Decode a crack, damp patch, survey note or quote that has been sitting in your head.",
    cta: "Decode free",
  },
  {
    role: "The Archivist",
    href: "/household/archivist",
    img: "/howa/household/archivist.webp",
    color: "#8a7a3c",
    forLine: "For the paperwork that keeps disappearing.",
    line: "Send one document. Watch it become dates, costs and reminders.",
    cta: "Send one document",
  },
];

export function HouseholdDoors({ className = "" }: { className?: string }) {
  return (
    <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-5 ${className}`}>
      {FREE_DOORS.map((d) => (
        <Link
          key={d.role}
          href={d.href}
          className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-house-brown/8 shadow-[0_2px_22px_rgba(48,35,28,0.06)] no-underline transition-shadow hover:shadow-[0_6px_30px_rgba(48,35,28,0.1)]"
        >
          <div className="relative aspect-[4/5] bg-house-cream-dark">
            <Image
              src={d.img}
              alt={d.role}
              fill
              sizes="(min-width:1024px) 20vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="is-round w-2.5 h-2.5 shrink-0" style={{ background: d.color }} aria-hidden />
              <h3 className="font-display text-[21px] leading-none text-house-black">{d.role}</h3>
            </div>
            <p className="font-display italic text-[14px] leading-[1.4] mb-3" style={{ color: d.color }}>
              {d.forLine}
            </p>
            <p className="font-sans text-[14px] leading-[1.5] text-house-brown/72 mb-4 flex-1">{d.line}</p>
            <span className="font-sans text-[13px] font-medium" style={{ color: d.color }}>
              {d.cta} →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
