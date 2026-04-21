import * as React from "react";
import { Eyebrow } from "./Eyebrow";
import { StateBadge } from "./StateBadge";

/**
 * SectionStub — placeholder hero for unbuilt routes so nav links always resolve.
 * Remove once the real page ships from Sanity.
 */
export function SectionStub({
  eyebrow,
  title,
  body,
  state = "soon",
}: {
  eyebrow: string;
  title: string;
  body: string;
  state?: "coming" | "live" | "interest" | "soon";
}) {
  return (
    <section className="bg-house-cream text-house-brown px-[5vw] py-[18vh] min-h-[70vh] flex items-center">
      <div className="max-w-[960px] mx-auto w-full">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-display text-[clamp(40px,5vw,72px)] font-medium leading-[1.08] mt-6">
          {title}
        </h1>
        <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[60ch]">
          {body}
        </p>
        <div className="mt-8">
          <StateBadge state={state}>In build</StateBadge>
        </div>
      </div>
    </section>
  );
}
