import type { HomepageV2 } from "@/lib/cms/homepage-v2";
import { EmphasiseText, LucideIcon } from "./shared";
import s from "./home-v2.module.css";

export function WorkflowStrip({ data }: { data: HomepageV2 }) {
  return (
    <section className={s.workflow}>
      <div className={s.workflowRow}>
        <div className={s.workflowSteps}>
          <span className={s.workflowLeadicon}>
            <LucideIcon name={data.workflowLeadIcon ?? "clipboard-check"} size={22} />
          </span>
          {data.workflowSteps.map((step) => (
            <div key={step.heading} className={s.workflowStep}>
              <h4>{step.heading}</h4>
              <p>
                <EmphasiseText value={step.sub} />
              </p>
            </div>
          ))}
        </div>
        <div className={s.workflowDivider} />
        <div className={s.workflowStats}>
          {data.stats.map((stat) => (
            <div key={stat.label}>
              <div className={s.statNum}>{stat.num}</div>
              <div className={s.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
