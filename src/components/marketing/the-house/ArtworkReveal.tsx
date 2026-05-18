"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades + slides children in as they enter the viewport. Respects
 * `prefers-reduced-motion`. Use sparingly — too many of these turns
 * a calm page into a slot machine.
 */
export function ArtworkReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Reduced-motion users skip the reveal entirely — start visible.
  // Check once at mount via a lazy initialiser so the effect doesn't
  // need to cascade-render.
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      className={
        "transition-[opacity,transform] duration-[800ms] ease-out " +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3") +
        " " + className
      }
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
