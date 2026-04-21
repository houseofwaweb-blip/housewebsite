import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PortableText as PortableTextReact,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "@/lib/cms/image";

/**
 * Portable text renderer with the House / HoWA block-kit.
 * Spec: DESIGN.md Part C · "Editorial blocks" + PLAN.md §15 Finding D1.
 *
 * Blocks: pullQuote, dropCapPara, photoEssay, marginNote,
 *         inlineProduct, inlineCollection.
 * Marks:  smallCaps, link, internalLink.
 */

type SanityImage = {
  _type: "image";
  alt?: string;
  caption?: string;
  asset?: { _ref: string; _type: string };
};

interface PullQuoteBlock {
  _type: "pullQuote";
  quote: string;
  attribution?: string;
}

interface DropCapParaBlock {
  _type: "dropCapPara";
  body: string;
}

interface PhotoEssayBlock {
  _type: "photoEssay";
  title?: string;
  layout: "full" | "duo" | "trio";
  images: Array<{ alt: string; caption?: string; asset: SanityImage["asset"] }>;
}

interface MarginNoteBlock {
  _type: "marginNote";
  label?: string;
  body: string;
}

interface InlineProductBlock {
  _type: "inlineProduct";
  handle: string;
  display: "card" | "inline";
  houseNote?: string;
}

interface InlineCollectionBlock {
  _type: "inlineCollection";
  handle: string;
  limit: number;
  introCopy?: string;
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).width(1600).url();
      return (
        <figure className="my-10">
          <Image
            src={src}
            alt={value.alt ?? ""}
            width={1600}
            height={1067}
            sizes="(min-width: 1024px) 800px, 100vw"
            className="w-full h-auto"
          />
          {value.caption ? (
            <figcaption className="font-sans text-[12px] tracking-[0.04em] text-house-brown/60 mt-3 italic">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },

    pullQuote: ({ value }: { value: PullQuoteBlock }) => (
      <blockquote className="my-14 border-l border-house-gold pl-8">
        <p className="font-display italic text-[clamp(24px,3vw,34px)] leading-[1.35] text-house-brown">
          &ldquo;{value.quote}&rdquo;
        </p>
        {value.attribution ? (
          <cite className="font-sans not-italic text-[11px] tracking-[0.2em] uppercase text-house-brown/55 mt-4 block">
            {value.attribution}
          </cite>
        ) : null}
      </blockquote>
    ),

    dropCapPara: ({ value }: { value: DropCapParaBlock }) => (
      <p className="my-8 font-sans text-[18px] leading-[1.7] text-house-brown/90 first-letter:font-display first-letter:text-[64px] first-letter:leading-[0.9] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-house-gold">
        {value.body}
      </p>
    ),

    photoEssay: ({ value }: { value: PhotoEssayBlock }) => {
      const gridCls =
        value.layout === "full"
          ? "grid-cols-1"
          : value.layout === "trio"
            ? "grid-cols-1 md:grid-cols-3"
            : "grid-cols-1 md:grid-cols-2";
      return (
        <section className="my-14">
          {value.title ? (
            <h3 className="font-sans text-[11px] tracking-[0.22em] uppercase text-house-brown/60 mb-6">
              {value.title}
            </h3>
          ) : null}
          <div className={`grid ${gridCls} gap-4`}>
            {value.images?.map((img, i) => {
              const src = img.asset ? urlFor(img as SanityImage).width(1200).url() : null;
              if (!src) return null;
              return (
                <figure key={i} className="flex flex-col gap-2">
                  <Image
                    src={src}
                    alt={img.alt}
                    width={1200}
                    height={800}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="w-full h-auto"
                  />
                  {img.caption ? (
                    <figcaption className="font-sans text-[11px] text-house-brown/55 italic">
                      {img.caption}
                    </figcaption>
                  ) : null}
                </figure>
              );
            })}
          </div>
        </section>
      );
    },

    marginNote: ({ value }: { value: MarginNoteBlock }) => (
      <aside className="my-10 md:float-right md:w-[32%] md:ml-8 md:mb-6 border-t border-b border-house-brown/15 py-6">
        {value.label ? (
          <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold mb-2">
            {value.label}
          </div>
        ) : null}
        <p className="font-sans italic text-[16px] leading-[1.55] text-house-brown/85">
          {value.body}
        </p>
      </aside>
    ),

    inlineProduct: ({ value }: { value: InlineProductBlock }) => (
      <div className="my-10 border border-house-brown/12 p-6 flex flex-col gap-3">
        <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold">
          From the Shop
        </div>
        <Link
          href={`/shop/${value.handle}`}
          className="font-sans text-[20px] no-underline text-house-brown hover:text-house-gold transition-colors"
        >
          {value.handle.replace(/-/g, " ")}
        </Link>
        {value.houseNote ? (
          <p className="font-sans italic text-[15px] text-house-brown/70 leading-[1.55]">
            {value.houseNote}
          </p>
        ) : null}
      </div>
    ),

    inlineCollection: ({ value }: { value: InlineCollectionBlock }) => (
      <div className="my-10 border-t border-b border-house-brown/12 py-6">
        <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold mb-2">
          A House-approved collection
        </div>
        <Link
          href={`/shop/collections/${value.handle}`}
          className="font-display text-[22px] no-underline text-house-brown hover:text-house-gold transition-colors"
        >
          {value.handle.replace(/-/g, " ")}
        </Link>
        {value.introCopy ? (
          <p className="font-sans text-[16px] leading-[1.6] text-house-brown/75 mt-2">
            {value.introCopy}
          </p>
        ) : null}
      </div>
    ),
  },

  block: {
    normal: ({ children }) => (
      <p className="font-sans text-[18px] leading-[1.7] text-house-brown/90 my-5">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-medium leading-[1.15] mt-16 mb-4 text-house-brown">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-[clamp(22px,2.6vw,30px)] font-medium leading-[1.2] mt-12 mb-3 text-house-brown">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-sans text-[12px] tracking-[0.2em] uppercase mt-10 mb-3 text-house-brown/80">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 pl-6 border-l-2 border-house-brown/25 italic font-sans text-[19px] leading-[1.6] text-house-brown/80">
        {children}
      </blockquote>
    ),
  },

  marks: {
    smallCaps: ({ children }) => (
      <span className="font-sans text-[0.85em] tracking-[0.08em] uppercase">{children}</span>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    strong: ({ children }) => <strong className="font-medium">{children}</strong>,
    link: ({ value, children }) => {
      const href = (value as { href?: string; openInNew?: boolean }).href ?? "#";
      const newTab = (value as { openInNew?: boolean }).openInNew;
      return (
        <a
          href={href}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
          className="text-house-gold underline underline-offset-[3px] decoration-house-gold/40 hover:decoration-house-gold transition-colors"
        >
          {children}
        </a>
      );
    },
    internalLink: ({ value, children }) => {
      const ref = (
        value as { reference?: { _type?: string; slug?: { current?: string } } }
      ).reference;
      if (!ref?._type || !ref.slug?.current) return <>{children}</>;
      const prefix =
        ref._type === "article"
          ? "/journal"
          : ref._type === "partner"
            ? "/partners"
            : ref._type === "service"
              ? "/services"
              : ref._type === "legalPage"
                ? "/legal"
                : "";
      return (
        <Link
          href={`${prefix}/${ref.slug.current}`}
          className="text-house-gold underline underline-offset-[3px] decoration-house-gold/40 hover:decoration-house-gold transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
};

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return <PortableTextReact value={value} components={components} />;
}
