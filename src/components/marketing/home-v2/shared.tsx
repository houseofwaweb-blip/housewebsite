import * as Lucide from "lucide-react";
import type { ComponentType, SVGProps } from "react";

/**
 * Renders a Lucide icon by name (kebab-case from Sanity).
 * Falls back to a circle if the name isn't found.
 */
export function LucideIcon({
  name,
  size = 18,
  strokeWidth = 1.4,
  className,
}: {
  name?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  if (!name) return null;
  const camel = name
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
  const Icon =
    (Lucide as unknown as Record<string, ComponentType<SVGProps<SVGSVGElement> & { size?: number }>>)[camel] ??
    Lucide.Circle;
  return <Icon size={size} strokeWidth={strokeWidth} className={className} />;
}

/**
 * Renders text with *asterisk-italic* segments wrapped in <em>.
 * Used for headlines and stats with gold-emphasis values.
 */
export function EmphasiseText({ value }: { value?: string }) {
  if (!value) return null;
  const parts = value.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("*") && p.endsWith("*") ? (
          <em key={i}>{p.slice(1, -1)}</em>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}
