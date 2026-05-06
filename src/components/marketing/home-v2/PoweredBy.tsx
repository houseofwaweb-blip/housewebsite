import type { HomepageV2 } from "@/lib/cms/homepage-v2";
import { LucideIcon } from "./shared";
import s from "./home-v2.module.css";

export function PoweredBy({ data }: { data: HomepageV2 }) {
  return (
    <section className={s.powered}>
      <div className={s.poweredTitle}>
        <span className="rule" style={{ flex: "0 1 220px", height: 1, background: "var(--color-house-gold)", opacity: 0.5 }} />
        <h3>{data.poweredByTitle}</h3>
        <span className="rule" style={{ flex: "0 1 220px", height: 1, background: "var(--color-house-gold)", opacity: 0.5 }} />
      </div>
      <div className={s.poweredGrid}>
        {data.poweredByItems.map((item) => (
          <div key={item.label} className={s.poweredItem}>
            <div className={s.iconCircle}>
              <LucideIcon name={item.icon} size={18} />
            </div>
            <p style={{ whiteSpace: "pre-line" }}>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
