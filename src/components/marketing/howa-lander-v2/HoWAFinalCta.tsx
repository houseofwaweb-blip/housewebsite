import Link from "next/link";
import type { HoWALanderV2 } from "@/lib/cms/howa-lander-v2";
import s from "./howa-lander-v2.module.css";

export function HoWAFinalCta({ data }: { data: HoWALanderV2 }) {
  return (
    <section className={s.finalCta} data-howa-final>
      <h2 className={s.finalHeadline}>{data.finalHeadline}</h2>
      {data.finalSub && <p className={s.finalSub}>{data.finalSub}</p>}
      <Link href={data.finalCtaHref} className={s.finalCtaBtn}>
        {data.finalCtaLabel} →
      </Link>
    </section>
  );
}
