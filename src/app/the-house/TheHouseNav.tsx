"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

const LINKS = [
  { id: "care", label: "Care" },
  { id: "protect", label: "Protect" },
  { id: "design", label: "Design" },
  { id: "shop", label: "Shop" },
  { id: "howa", label: "HoWA" },
  { id: "steward", label: "Steward" },
];

export function TheHouseNav() {
  const [visible, setVisible] = React.useState(false);
  const [activeId, setActiveId] = React.useState("");

  React.useEffect(() => {
    function onScroll() {
      const hero = document.getElementById("premise");
      if (hero) {
        setVisible(hero.getBoundingClientRect().bottom < 0);
      }

      let current = "";
      for (const link of LINKS) {
        const el = document.getElementById(link.id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = link.id;
        }
      }
      setActiveId(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav
      aria-label="Page sections"
      className={cn(
        "fixed top-0 left-0 right-0 z-40",
        "bg-house-cream/95 backdrop-blur-[12px] border-b border-house-brown/6",
        "transition-transform duration-[var(--t-slow)] ease-out",
        visible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="flex items-center max-w-[1200px] mx-auto px-[5vw]">
        <span className="font-display font-medium text-[12px] tracking-[0.1em] uppercase mr-auto py-3">
          The House
        </span>
        <div className="hidden md:flex gap-0">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              className={cn(
                "relative px-4 py-3 font-sans text-[9px] tracking-[0.16em] uppercase bg-transparent border-0 cursor-pointer",
                "transition-colors duration-[var(--t-base)]",
                activeId === link.id
                  ? "text-house-gold"
                  : "text-house-stone hover:text-house-brown",
              )}
            >
              {link.label}
              {activeId === link.id ? (
                <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-house-gold" />
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
