import type { HoWALanderV2 } from "@/lib/cms/howa-lander-v2";
import { LucideIcon } from "../home-v2/shared";
import s from "./howa-lander-v2.module.css";

export function HoWAPoweredBy({ data }: { data: HoWALanderV2 }) {
  return (
    <section className={s.powered}>
      <div className={s.poweredTitleRow}>
        <span className={s.rule} />
        <h3>{data.poweredByTitle}</h3>
        <span className={s.rule} />
      </div>
      <div className={s.poweredGrid}>
        {data.poweredByItems.map((item) => (
          <div key={item.label} className={s.poweredItem}>
            <div className={s.poweredIcon}>
              <LucideIcon name={item.icon} size={18} />
            </div>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
