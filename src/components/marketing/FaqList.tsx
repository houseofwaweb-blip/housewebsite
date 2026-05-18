"use client";

import { useState } from "react";
import s from "./FaqList.module.css";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className={s.faqList}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className={s.faqItem}>
            <button
              type="button"
              className={s.faqQ}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <span aria-hidden="true" className={s.faqIcon}>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              className={s.faqAWrap}
              data-open={isOpen}
              aria-hidden={!isOpen}
            >
              <p className={s.faqA}>{item.a}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
