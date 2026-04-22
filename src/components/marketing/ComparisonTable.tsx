import { cn } from "@/lib/cn";
import { StateBadge } from "@/components/primitives/StateBadge";

interface Feature {
  label: string;
  free: string;
  plus: string;
  steward: string;
}

/* Slide 7 matrix from howa-integration-master.pptx — the definitive comparison */
const FEATURES: Feature[] = [
  { label: "Home address record", free: "1 address", plus: "✓", steward: "Multi-property (future)" },
  { label: "House Companion", free: "Entry", plus: "Full", steward: "Full + automated" },
  { label: "AI repair scan & quote", free: "✓", plus: "✓", steward: "✓" },
  { label: "AI design moodboards", free: "✓", plus: "✓", steward: "✓" },
  { label: "Dashboard continuity", free: "Basic", plus: "Full", steward: "Full + live" },
  { label: "Task & plan centre", free: "—", plus: "✓", steward: "Automated" },
  { label: "Carbon estimate & offsetting", free: "Entry", plus: "Full fund", steward: "Full fund" },
  { label: "Service discount (10%)", free: "—", plus: "✓ All services", steward: "✓ via HoWA+" },
  { label: "The Hearth magazine", free: "Preview", plus: "Full access", steward: "Full access" },
  { label: "Saved guides & seasonal prompts", free: "—", plus: "✓", steward: "✓" },
  { label: "Priority booking", free: "—", plus: "✓", steward: "✓" },
  { label: "House events & drops", free: "—", plus: "✓", steward: "✓" },
  { label: "Steward Plans (recurring care)", free: "—", plus: "—", steward: "✓ Gated" },
  { label: "Smart-home controller", free: "—", plus: "—", steward: "✓ Phase 2" },
  { label: "Anomaly alerts & predictive care", free: "—", plus: "—", steward: "✓" },
  { label: "Live utility & energy monitoring", free: "—", plus: "—", steward: "✓" },
  { label: "Home Protection Review", free: "—", plus: "—", steward: "✓ When live" },
  { label: "Insurance prefill & risk score", free: "Register interest", plus: "Richer prefill", steward: "Full integration" },
  { label: "Delegated permissions", free: "—", plus: "—", steward: "✓" },
  { label: "Priority support channel", free: "—", plus: "—", steward: "✓" },
  { label: "Dedicated House contact", free: "—", plus: "—", steward: "✓" },
  { label: "Quarterly home reviews", free: "—", plus: "—", steward: "✓" },
];

function CellValue({ value }: { value: string }) {
  if (value === "—") return <span className="text-house-brown/25 text-[14px]">—</span>;
  if (value === "✓") return <span style={{ color: "var(--house-gold-dark)" }} className="text-[16px]">✓</span>;
  return <span className="font-sans text-[11px] leading-[1.4] text-house-brown/70">{value}</span>;
}

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr>
            <th className="text-left py-4 pr-4 font-sans text-[11px] tracking-[0.18em] uppercase text-house-brown/60 font-normal w-[36%]">
              Feature
            </th>
            <th className="text-center py-4 px-3 font-sans text-[11px] tracking-[0.18em] uppercase text-house-brown/60 font-normal">
              HoWA
              <span className="block font-display text-[13px] tracking-normal normal-case text-house-brown mt-0.5">Free</span>
            </th>
            <th className="text-center py-4 px-3 font-normal bg-[var(--house-gold-dark)]/[0.04] border-x" style={{ borderColor: "rgba(138,111,46,0.2)" }}>
              <span className="font-sans text-[11px] tracking-[0.18em] uppercase" style={{ color: "var(--house-gold-dark)" }}>HoWA+</span>
              <span className="block font-display text-[13px] tracking-normal text-house-brown mt-0.5">£16.99/mo</span>
            </th>
            <th className="text-center py-4 px-3 font-sans text-[11px] tracking-[0.18em] uppercase text-house-brown/60 font-normal">
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
                <CellValue value={f.free} />
              </td>
              <td className="py-3 px-3 text-center bg-[var(--house-gold-dark)]/[0.04] border-x" style={{ borderColor: "rgba(138,111,46,0.2)" }}>
                <CellValue value={f.plus} />
              </td>
              <td className={cn("py-3 px-3 text-center", f.steward === "—" && "opacity-50")}>
                <CellValue value={f.steward} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
