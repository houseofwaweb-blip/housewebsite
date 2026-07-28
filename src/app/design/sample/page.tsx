import type { Metadata } from "next";
import Link from "next/link";
import { SampleDesignShowcase } from "@/components/design/SampleDesignShowcase";

/**
 * /design/sample — "See a sample output" (DIRECTIVE §10). A worked example of
 * what the £400 HoWA First Design delivers, shown as a live reveal: the space
 * is scanned, mapped, resolved into a first direction, zoned, given a palette,
 * an indicative budget and a written brief.
 */
export const metadata: Metadata = {
  title: "A sample first design output",
  description:
    "See what the £400 HoWA First Design delivers: a mapped space, a first direction, a palette, an indicative budget range and a structured brief, before you commission a human studio.",
};

export default function DesignSamplePage() {
  return (
    <div className="bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-[clamp(48px,7vw,104px)] pb-[clamp(28px,4vw,48px)]">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink mb-4">
            HoWA First Design
          </p>
          <h1 className="font-display text-[clamp(32px,5vw,58px)] leading-[1.05] text-house-brown">
            Watch a scan <em>become a design.</em>
          </h1>
          <p className="font-sans text-[17px] leading-[1.65] text-house-stone mt-6 max-w-[620px] mx-auto">
            Scan your room or garden, and HoWA returns a first design in minutes:
            the space mapped, a first direction, a palette, an indicative budget
            and a written brief. Here is a worked example, start to finish.
          </p>
        </div>
      </section>

      <section className="px-[5vw] pb-[clamp(48px,7vw,104px)]">
        <div className="mx-auto max-w-[1120px]">
          <SampleDesignShowcase />
        </div>
      </section>

      <section className="px-[5vw] py-[clamp(40px,5vw,72px)] bg-house-white border-t border-house-brown/10">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-brown mb-4">
            Then the real design <em>begins.</em>
          </h2>
          <p className="font-sans text-[15px] leading-[1.6] text-house-stone mb-8 max-w-[560px] mx-auto">
            Your first design and its brief carry straight to Delve Interiors or
            Willow Alexander Gardens, so you never repeat yourself and the real
            work begins from a shared picture.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/design/interiors" className="font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-7 py-4 no-underline transition-[filter] hover:brightness-110">
              Start my interior design
            </Link>
            <Link href="/design/gardens" className="font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/25 bg-house-white px-7 py-4 no-underline transition-colors hover:border-house-gold">
              Start my garden design
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
