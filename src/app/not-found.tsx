import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";

/**
 * Custom 404 page. Matches the House voice and is useful —
 * pointing to the places people are usually looking for.
 *
 * The Digital Estate register requires a branded 404 carrying service, address
 * and contact recovery routes. This page will absorb the legacy Willow URLs
 * that have no equivalent after the willowalexander.co.uk -> House of HoWA
 * cutover, so the address route matters: it is the one recovery path that
 * works when the visitor's original page has no successor at all.
 */

export const metadata = {
  title: "Not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-house-cream text-house-brown px-[5vw] py-[16vh] min-h-[70vh] flex items-center">
      <div className="max-w-[720px] mx-auto w-full text-center">
        <Eyebrow>404 · Not found</Eyebrow>
        <h1 className="em-accent font-display font-medium text-[clamp(48px,7vw,96px)] leading-[1.02] tracking-[-0.01em] mt-6">
          This <em>room</em> is empty.
        </h1>
        <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[52ch] mx-auto">
          The page you asked for isn&apos;t here, or isn&apos;t here any more.
          If you followed a link from elsewhere, we&apos;d like to know:
          <Link
            href="/contact"
            className="text-house-brown underline decoration-house-gold underline-offset-4"
          >
            {" "}
            write to the House
          </Link>{" "}
          and we&apos;ll chase it down.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/"
            className="inline-block font-sans text-[15px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold px-6 py-3.5 no-underline transition-colors duration-[var(--t-slow)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
          >
            Back to the House
          </Link>
          <GhostLink href="/howa">Start with my address</GhostLink>
          <GhostLink href="/services">Browse services</GhostLink>
          <GhostLink href="/contact">Speak to the House</GhostLink>
        </div>
      </div>
    </section>
  );
}
