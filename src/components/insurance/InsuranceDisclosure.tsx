import Link from "next/link";
import { DISCLOSURE_TEXT } from "@/lib/insurance/config";

/**
 * InsuranceDisclosure, the mandated Provenance disclosure block. Renders
 * directly ABOVE the primary action on every conversion surface (never in the
 * site footer). One source of truth so a wording change happens once.
 *
 * Wording is indicative pending Provenance compliance sign-off.
 */
export function InsuranceDisclosure({ className = "" }: { className?: string }) {
  return (
    <div
      className={`border-l-2 border-[color:var(--ins-ink)] bg-house-cream-dark/50 px-4 py-3 ${className}`}
    >
      <p className="m-0 font-sans text-[14.5px] leading-[1.55] text-house-brown/80">
        {DISCLOSURE_TEXT}{" "}
        <Link
          href="/insurance/how-this-works"
          className="underline underline-offset-2 hover:text-[color:var(--ins-ink)]"
        >
          How this works, and how we are paid
        </Link>
        .
      </p>
    </div>
  );
}
