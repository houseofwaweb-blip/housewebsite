"use client";

import * as React from "react";
import { Accordion } from "@/components/primitives/Accordion";
import type { ShopProduct } from "@/lib/shop-data";

/**
 * True when `lede` is genuinely distinct editorial, not just the truncated
 * first line of `body` (the Shopify case, where lede = firstLine(description)).
 */
function ledeIsDistinct(lede?: string, body?: string): boolean {
  if (!lede || !body) return false;
  const norm = (s: string) => s.replace(/[…\.]+\s*$/, "").trim().toLowerCase();
  const l = norm(lede);
  if (l.length < 8) return false;
  return !norm(body).startsWith(l.slice(0, Math.min(40, l.length)));
}

const SUMMARY = "font-sans text-[18px] tracking-[0.2em] uppercase";

/**
 * ProductCopy — description (with Read more) + the spec accordion list,
 * styled like the House of Hackney / Henry Holland product information:
 * a short lead paragraph, a Read more toggle, then hairline-divided
 * dropdowns. No price/CTA here — the buy column owns those.
 */
export function ProductCopy({ product: p }: { product: ShopProduct }) {
  const [expanded, setExpanded] = React.useState(false);

  const details = [
    p.materials && { id: "details", summary: <span className={SUMMARY}>Product details</span>, body: <p>{p.materials}{p.dimensions ? ` ${p.dimensions}` : ""}</p> },
    p.careNotes && { id: "care", summary: <span className={SUMMARY}>Care</span>, body: <p>{p.careNotes}</p> },
    {
      id: "delivery",
      summary: <span className={SUMMARY}>Shipping &amp; returns</span>,
      body: (
        <p>
          {p.delivery ?? "Delivery options and costs are shown at checkout."} Returns are handled in line with the store's current returns policy.
        </p>
      ),
    },
  ].filter(Boolean) as Array<{ id: string; summary: React.ReactNode; body: React.ReactNode }>;

  const showLede = ledeIsDistinct(p.lede, p.body);
  const body = p.body ?? "";
  const LIMIT = 260;
  const long = body.length > LIMIT;
  const shown = expanded || !long ? body : body.slice(0, LIMIT).replace(/\s+\S*$/, "") + "…";

  return (
    <div className="pt-2">
      {showLede ? (
        <p className="font-display italic text-[23px] leading-[1.45] text-house-stone mb-5">
          {p.lede}
        </p>
      ) : null}

      <p className="font-sans text-[19px] leading-[1.8] text-house-brown/85 whitespace-pre-line">
        {shown}
      </p>

      {long ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 font-sans text-[18px] tracking-[0.08em] text-house-brown underline underline-offset-4 decoration-house-brown/40 hover:decoration-house-gold cursor-pointer"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      ) : null}

      {details.length > 0 ? (
        <div className="mt-9">
          <Accordion items={details} />
        </div>
      ) : null}
    </div>
  );
}
