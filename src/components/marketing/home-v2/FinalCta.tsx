import Link from "next/link";
import type { HomepageV2 } from "@/lib/cms/homepage-v2";
import s from "./home-v2.module.css";

export function FinalCta({ data }: { data: HomepageV2 }) {
  return (
    <section className={s.finalCta}>
      <p className={s.finalStatement}>{data.finalCtaStatement}</p>
      {data.finalCtaSub && <p className={s.finalSub}>{data.finalCtaSub}</p>}
      <div className={s.finalButtons}>
        <Link href={data.finalCtaPrimaryHref} className="gold">
          {data.finalCtaPrimaryLabel}
        </Link>
        {data.finalCtaSecondaryLabel && data.finalCtaSecondaryHref && (
          <>
            <span className="or">or</span>
            <Link href={data.finalCtaSecondaryHref} className="secondary">
              {data.finalCtaSecondaryLabel}
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
