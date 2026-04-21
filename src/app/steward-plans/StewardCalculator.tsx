"use client";

import * as React from "react";
import Link from "next/link";
import { PLANS } from "@/lib/steward-data";

/**
 * StewardCalculator — pick services, see a live matched plan + price.
 * Desktop: 2-col (checkboxes left, sticky navy result right).
 * Mobile: stacked (checkboxes, then result below, not sticky).
 */

const SERVICE_OPTIONS = [
  { label: "Weekly gardening", freq: "1–2 hrs/week", index: 0 },
  { label: "Weekly cleaning", freq: "2–3 hrs/week", index: 1 },
  { label: "External windows", freq: "Monthly", index: 2 },
  { label: "Internal windows", freq: "Monthly", index: 3 },
  { label: "Gutter cleaning", freq: "Bi-annual", index: 4 },
  { label: "Quarterly deep clean", freq: "4 hrs/quarter", index: 5 },
];

const PLAN_MAP = [
  { name: "Home & Garden+ Essential", price: 605, list: ["Weekly gardening (1hr)", "Weekly cleaning (2hrs)", "External windows (monthly)"], needs: [0, 1, 2], slug: "home-garden-essential" },
  { name: "Home & Garden+ Comprehensive", price: 745, list: ["Weekly gardening (1hr)", "Weekly cleaning (3hrs)", "External windows (monthly)", "Bi-annual gutter clean", "Quarterly deep clean"], needs: [0, 1, 2, 4, 5], slug: "home-garden-comprehensive" },
  { name: "Home & Garden+ Premium", price: 1040, list: ["Weekly gardening (2hrs)", "Weekly cleaning (3hrs)", "Int & ext windows (monthly)", "Bi-annual gutters", "Quarterly deep clean"], needs: [0, 1, 2, 3, 4, 5], slug: "home-garden-premium" },
  { name: "Apartment Essential", price: 300, list: ["Weekly cleaning (2hrs)", "External windows (monthly)"], needs: [1, 2], slug: "apartment-essential" },
  { name: "Apartment+ Balcony", price: 460, list: ["Fortnightly gardening", "Weekly cleaning (2hrs)", "External windows", "Quarterly deep clean"], needs: [0, 1, 2, 5], slug: "apartment-balcony" },
  { name: "Apartment Comprehensive", price: 335, list: ["Weekly cleaning (2hrs)", "External windows", "Quarterly deep clean"], needs: [1, 2, 5], slug: "apartment-comprehensive" },
];

function matchPlan(selected: number[]) {
  let best = PLAN_MAP[0];
  let bestScore = -Infinity;
  for (const p of PLAN_MAP) {
    const covered = p.needs.filter((n) => selected.includes(n)).length;
    const extra = selected.filter((s) => !p.needs.includes(s)).length;
    const score = covered * 10 - extra * 3;
    if (score > bestScore) {
      bestScore = score;
      best = p;
    }
  }
  return best;
}

export function StewardCalculator() {
  const [checked, setChecked] = React.useState([0, 1, 2]);

  const toggle = (idx: number) => {
    setChecked((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  const match = matchPlan(checked);

  return (
    <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[56px] items-start">
      {/* Checkboxes */}
      <div className="bg-house-cream border border-house-brown/12 px-[32px] py-[36px]">
        <h3 className="font-display font-medium text-[22px] mb-[20px]">Your services</h3>
        {SERVICE_OPTIONS.map((s) => (
          <div key={s.index} className="flex justify-between items-center py-[14px] border-b border-house-brown/10 last:border-b-0">
            <label className="font-sans text-[15px] flex items-center gap-[12px] cursor-pointer">
              <input
                type="checkbox"
                checked={checked.includes(s.index)}
                onChange={() => toggle(s.index)}
                className="appearance-none w-[18px] h-[18px] border-[1.5px] border-house-brown cursor-pointer transition-all duration-[var(--t-slow)] ease-out checked:bg-house-gold checked:border-house-gold"
              />
              {s.label}
            </label>
            <span className="font-sans text-[12px] text-house-stone">{s.freq}</span>
          </div>
        ))}
      </div>

      {/* Result panel */}
      <div className="bg-howa-navy text-house-cream px-[32px] py-[36px] md:sticky md:top-[70px]">
        <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold-light mb-[8px]">
          Your estimate
        </div>
        <div className="font-display font-medium text-[48px] text-house-cream mb-[4px]">
          £{match.price.toLocaleString()}
        </div>
        <div className="font-sans text-[13px] text-house-cream/60 mb-[24px]">per month</div>

        <div className="font-sans text-[10px] tracking-[0.18em] uppercase text-house-gold-light mb-[6px]">
          Best match
        </div>
        <div className="font-display font-medium text-[24px] mb-[20px]">{match.name}</div>

        <ul className="list-none pl-[16px] text-[13px] leading-[1.8] text-house-cream/78 mb-[24px]">
          {match.list.map((l) => (
            <li key={l} className="relative py-[2px] before:content-['—'] before:absolute before:-left-[16px] before:text-house-gold-light">
              {l}
            </li>
          ))}
        </ul>

        <Link
          href={`/steward-plans/${match.slug}`}
          className="block w-full text-center px-[32px] py-[14px] font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
        >
          Subscribe to this plan →
        </Link>
      </div>
    </div>
  );
}
