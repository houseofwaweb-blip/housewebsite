import Link from "next/link";

export interface Feature {
  title: string;
  description: string;
  linkHref?: string;
  linkLabel?: string;
}

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((f) => (
        <div
          key={f.title}
          className="border border-house-brown/8 p-7 transition-all duration-[var(--t-slow)] ease-out hover:border-house-gold hover:-translate-y-0.5"
        >
          <div className="font-sans text-[9px] tracking-[0.22em] uppercase text-howa-teal mb-2">
            Included
          </div>
          <h3 className="font-sans font-medium text-[18px] text-house-brown mb-2">
            {f.title}
          </h3>
          <p className="font-sans text-[14px] leading-[1.55] text-house-stone">
            {f.description}
          </p>
          {f.linkHref ? (
            <Link
              href={f.linkHref}
              className="inline-block mt-4 font-sans text-[10px] tracking-[0.16em] uppercase text-howa-teal no-underline border-b border-dotted border-howa-teal pb-0.5 hover:border-solid transition-all duration-[var(--t-slow)]"
            >
              {f.linkLabel || "Learn more →"}
            </Link>
          ) : null}
        </div>
      ))}
    </div>
  );
}
