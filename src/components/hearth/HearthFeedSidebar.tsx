"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { HearthTitle } from "./HearthTitle";
import { submitForm } from "@/components/forms/submitForm";
import { POPULAR as POPULAR_FALLBACK, type PopularItem } from "@/lib/hearth-data";

/**
 * HearthFeedSidebar — per variant-A.
 *   · Most Popular: 3px black top rule, Jost 12px kicker, ol with 28px/1fr/72px
 *     columns (num / body / thumb), gold italic number, 72x72 thumb.
 *   · Newsletter: howa-paper background, tiny gold kicker, Cormorant h4 with
 *     italic "from the House", italic p, one-line form (input + button).
 */
export function HearthFeedSidebar({ popular }: { popular?: PopularItem[] }) {
  const items = popular && popular.length > 0 ? popular : POPULAR_FALLBACK;
  return (
    <aside className="sticky top-[88px] h-fit">
      <div className="border-t-[3px] border-house-black pt-[14px] mb-10">
        <h3 className="font-hearth-sans font-medium text-[12px] tracking-[0.24em] uppercase text-house-black mb-[18px]">
          Most Popular
          <em className="not-italic font-hearth-serif italic text-[14px] tracking-[0.02em] normal-case text-house-stone font-normal ml-1.5">
            this week
          </em>
        </h3>
        <ol className="list-none m-0 p-0">
          {items.map((item, i) => (
            <li
              key={item.slug}
              className="grid grid-cols-[28px_1fr_72px] gap-3 items-start py-[14px] border-b border-house-brown/10 last:border-b-0"
            >
              <span className="font-hearth-serif italic text-[28px] leading-none text-house-gold">
                {i + 1}
              </span>
              <div className="min-w-0">
                <span className="block mb-1 font-hearth-sans text-[9px] tracking-[0.22em] uppercase text-house-stone">
                  {item.tag}
                </span>
                <h5 className="font-hearth-serif font-medium text-[16px] leading-[1.2] tracking-[-0.005em] text-house-black">
                  <HearthTitle
                    title={item.title}
                    em={item.titleEm}
                    href={`/journal/${item.slug}`}
                  />
                </h5>
              </div>
              <Image
                src={item.image}
                alt=""
                width={144}
                height={144}
                sizes="72px"
                className="w-[72px] h-[72px] object-cover"
              />
            </li>
          ))}
        </ol>
      </div>

      <SidebarNewsletter />
    </aside>
  );
}

function SidebarNewsletter() {
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const honeyRef = React.useRef<HTMLInputElement>(null);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    const result = await submitForm("newsletter", {
      email,
      sourcePage: "/journal",
      honey: honeyRef.current?.value ?? "",
      turnstileToken: "",
    });
    setState(result.ok ? "success" : "error");
  };

  return (
    <div className="bg-howa-paper p-[20px_20px_24px] border border-house-brown/20">
      <span className="block mb-[10px] font-hearth-sans text-[9px] tracking-[0.28em] uppercase text-house-gold">
        The Hearth · Weekly
      </span>
      <h4 className="font-hearth-serif font-medium text-[22px] leading-[1.15] tracking-[-0.005em] text-house-black mb-2">
        A letter <em className="italic font-normal">from the House.</em>
      </h4>
      <p className="font-hearth-serif italic text-[14px] leading-[1.5] text-house-stone mb-[14px]">
        Our best reading from the week, plus seasonal notes and a standing
        invitation into HoWA. No clutter.
      </p>

      {state === "success" ? (
        <p
          role="status"
          className="font-hearth-serif italic text-[14px] leading-[1.5] text-house-black"
        >
          Thank you — the next letter lands on Friday.
        </p>
      ) : (
        <form
          onSubmit={handle}
          className="flex bg-white border border-house-brown/30"
          noValidate
        >
          <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
            <input ref={honeyRef} type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.co.uk"
            autoComplete="email"
            aria-label="Your email"
            className="flex-1 bg-transparent border-0 outline-none min-w-0 font-hearth-sans text-[13px] px-[14px] py-[11px] text-house-black placeholder:italic placeholder:font-hearth-serif placeholder:text-house-stone"
          />
          <button
            type="submit"
            disabled={state === "submitting"}
            className="shrink-0 bg-house-black text-house-white font-hearth-sans text-[10px] tracking-[0.18em] uppercase px-[14px] py-[11px] border-0 cursor-pointer disabled:opacity-60"
          >
            {state === "submitting" ? "…" : "Sign up"}
          </button>
        </form>
      )}
      {state === "error" ? (
        <p
          role="alert"
          className="mt-2 font-hearth-serif italic text-[12px] text-error"
        >
          Something went wrong. Try again.
        </p>
      ) : null}
    </div>
  );
}
