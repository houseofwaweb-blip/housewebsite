"use client";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

/**
 * Sanity Studio embedded at /studio.
 * Only renders when Sanity env is configured; otherwise shows a setup hint.
 */
export const dynamic = "force-static";

export default function StudioPage() {
  if (!config.projectId) {
    return (
      <div className="p-12 font-sans text-[14px]">
        <h1 className="font-display text-[24px] mb-4">Sanity Studio</h1>
        <p>
          Set <code>SANITY_PROJECT_ID</code> (or <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>)
          in <code>.env.local</code> then restart the dev server.
        </p>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
