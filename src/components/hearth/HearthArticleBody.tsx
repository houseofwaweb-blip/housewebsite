import sanitizeHtml from "sanitize-html";
import { cn } from "@/lib/cn";

const ALLOWED_TAGS = [
  "p", "h2", "h3", "h4", "a", "img", "ul", "ol", "li",
  "em", "strong", "blockquote", "figure", "figcaption", "hr",
  "br", "span", "div", "table", "thead", "tbody", "tr", "th", "td",
];

const ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  a: ["href", "title", "target", "rel"],
  img: ["src", "alt", "width", "height", "loading"],
  "*": ["class"],
};

function sanitise(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ["http", "https", "mailto"],
  });
}

export function HearthArticleBody({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "hearth-prose font-hearth-serif text-[19px] leading-[1.75] text-house-black/90",
        "[&_p]:mb-[22px]",
        "[&_h2]:font-hearth-serif [&_h2]:font-medium [&_h2]:text-[clamp(28px,3.5vw,42px)] [&_h2]:leading-[1.15] [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:text-house-black",
        "[&_h3]:font-hearth-serif [&_h3]:font-medium [&_h3]:text-[clamp(22px,2.6vw,30px)] [&_h3]:leading-[1.2] [&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:text-house-black",
        "[&_h4]:font-hearth-sans [&_h4]:text-[12px] [&_h4]:tracking-[0.2em] [&_h4]:uppercase [&_h4]:mt-8 [&_h4]:mb-3 [&_h4]:text-house-black/80",
        "[&_em]:italic",
        "[&_strong]:font-medium",
        "[&_a]:text-house-gold [&_a]:underline [&_a]:underline-offset-[3px] [&_a]:decoration-house-gold/40 hover:[&_a]:decoration-house-gold",
        "[&_blockquote]:my-10 [&_blockquote]:border-l [&_blockquote]:border-house-gold [&_blockquote]:pl-7 [&_blockquote]:italic [&_blockquote]:text-[clamp(22px,2.6vw,28px)] [&_blockquote]:leading-[1.4] [&_blockquote]:text-house-black/85",
        "[&_ul]:my-5 [&_ul]:pl-6 [&_ul]:list-none",
        "[&_ul_li]:relative [&_ul_li]:pl-5 [&_ul_li]:mb-2 [&_ul_li]:before:content-['—'] [&_ul_li]:before:absolute [&_ul_li]:before:left-0 [&_ul_li]:before:text-house-gold",
        "[&_ol]:my-5 [&_ol]:pl-6 [&_ol]:list-decimal [&_ol_li]:mb-2 [&_ol_li]:pl-2",
        "[&_img]:w-full [&_img]:h-auto [&_img]:my-10",
        "[&_figure]:my-10",
        "[&_figcaption]:font-hearth-sans [&_figcaption]:text-[12px] [&_figcaption]:italic [&_figcaption]:text-house-stone [&_figcaption]:mt-3",
        "[&_hr]:my-10 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-house-brown/15",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: sanitise(html) }}
    />
  );
}
