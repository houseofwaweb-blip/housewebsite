import Image from "next/image";
import type { HoWALanderV2 } from "@/lib/cms/howa-lander-v2";
import { EmphasiseText, LucideIcon } from "../home-v2/shared";
import s from "./howa-lander-v2.module.css";

export function HoWAWorkflow({ data }: { data: HoWALanderV2 }) {
  return (
    <section className={s.workflow}>
      <div className={s.workflowRow}>
        <div className={s.workflowMain}>
          <div className={s.workflowTitleBlock}>
            <span className={s.workflowLeadIcon}>
              <LucideIcon name={data.workflowLeadIcon ?? "clipboard-check"} size={20} />
            </span>
            {data.workflowTitle && (
              <span className={s.workflowTitle}>{data.workflowTitle}</span>
            )}
          </div>
          {data.workflowSteps.map((step) => (
            <div key={step.heading} className={s.workflowStep}>
              <h4>{step.heading}</h4>
              <p>
                <EmphasiseText value={step.sub} />
              </p>
            </div>
          ))}
        </div>
        {data.workflowSideImageUrl && (
          <Image
            src={data.workflowSideImageUrl}
            alt={data.workflowSideImageAlt ?? ""}
            width={280}
            height={160}
            sizes="140px"
            className={s.workflowSideImg}
          />
        )}
      </div>
    </section>
  );
}
