import { cn } from "@/lib/cn";
import { StateBadge } from "@/components/primitives/StateBadge";

interface Feature {
  label: string;
  free: boolean;
  plus: boolean;
  steward: boolean;
}

const FEATURES: Feature[] = [
  { label: "One home record", free: true, plus: true, steward: true },
  { label: "Companion diagnostic", free: true, plus: true, steward: true },
  { label: "Quotes & service bookings", free: true, plus: true, steward: true },
  { label: "Starter dashboard", free: true, plus: true, steward: true },
  { label: "Task & plan management", free: false, plus: true, steward: true },
  { label: "Reminders & documents", free: false, plus: true, steward: true },
  { label: "Member pricing on services", free: false, plus: true, steward: true },
  { label: "Shop discount (10%)", free: false, plus: true, steward: true },
  { label: "The Hearth (members-only)", free: false, plus: true, steward: true },
  { label: "AI design consultation", free: false, plus: true, steward: true },
  { label: "Protect Review early access", free: false, plus: true, steward: true },
  { label: "Insurance introductions", free: false, plus: true, steward: true },
  { label: "Managed Steward Plans", free: false, plus: false, steward: true },
  { label: "Dedicated House contact", free: false, plus: false, steward: true },
  { label: "Quarterly reviews", free: false, plus: false, steward: true },
  { label: "One monthly invoice", free: false, plus: false, steward: true },
  { label: "Priority urgent response", free: false, plus: false, steward: true },
];

function Check() {
  return <span className="text-house-gold text-[16px]">✓</span>;
}
function Dash() {
  return <span className="text-house-stone/30 text-[14px]">—</span>;
}

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr>
            <th className="text-left py-4 pr-4 font-sans text-[10px] tracking-[0.18em] uppercase text-house-stone font-normal w-[40%]">
              Feature
            </th>
            <th className="text-center py-4 px-3 font-sans text-[10px] tracking-[0.18em] uppercase text-house-stone font-normal">
              HoWA
              <span className="block font-display text-[13px] tracking-normal normal-case text-house-brown mt-0.5">Free</span>
            </th>
            <th className="text-center py-4 px-3 font-normal bg-house-gold/[0.04] border-x border-house-gold/20">
              <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-house-gold">HoWA+</span>
              <span className="block font-display text-[13px] tracking-normal text-house-brown mt-0.5">£16.99/mo</span>
            </th>
            <th className="text-center py-4 px-3 font-sans text-[10px] tracking-[0.18em] uppercase text-house-stone font-normal">
              Steward
              <span className="block mt-1"><StateBadge state="coming">Coming soon</StateBadge></span>
            </th>
          </tr>
        </thead>
        <tbody>
          {FEATURES.map((f) => (
            <tr key={f.label} className="border-t border-house-brown/6">
              <td className="py-3 pr-4 font-sans text-[13px] text-house-brown">
                {f.label}
              </td>
              <td className="py-3 px-3 text-center">
                {f.free ? <Check /> : <Dash />}
              </td>
              <td className="py-3 px-3 text-center bg-house-gold/[0.04] border-x border-house-gold/20">
                {f.plus ? <Check /> : <Dash />}
              </td>
              <td className={cn("py-3 px-3 text-center", !f.steward && "opacity-50")}>
                {f.steward ? <Check /> : <Dash />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
