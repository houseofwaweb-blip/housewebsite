"use client";

import { useState } from "react";
import Image from "next/image";
import s from "./BeforeAfterSlider.module.css";

/**
 * BeforeAfterSlider — a wipe comparison between two images of the SAME scene.
 *
 * It fills its nearest positioned parent (the parent sets the size / aspect),
 * exactly like a `next/image` with `fill`. The "after" image is the base layer;
 * the "before" image sits on top, clipped to the left of the handle. Dragging
 * the handle (or arrowing the range input, which is the real control for
 * pointer + keyboard + screen readers) wipes between them. Both images must be
 * framed the same way for the wipe to line up.
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Before",
  afterLabel = "After",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  aspectRatio = "4 / 3",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  sizes?: string;
  /** The frame's aspect ratio; match it to the images so nothing is cropped. */
  aspectRatio?: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className={s.wrap} style={{ aspectRatio }}>
      {/* Base layer: the redesign. */}
      <Image src={afterSrc} alt={afterAlt} fill sizes={sizes} className={s.img} />

      {/* Top layer: the original room, revealed to the left of the handle. */}
      <div className={s.clip} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} aria-hidden="true">
        <Image src={beforeSrc} alt="" fill sizes={sizes} className={s.img} />
      </div>

      <span className={`${s.tag} ${s.tagBefore}`} aria-hidden="true">{beforeLabel}</span>
      <span className={`${s.tag} ${s.tagAfter}`} aria-hidden="true">{afterLabel}</span>

      {/* The control: an invisible range that fills the frame, so a pointer can
          grab anywhere and the keyboard can arrow between the two states. */}
      <input
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className={s.range}
        aria-label={`Drag to compare: ${beforeLabel} and ${afterLabel}`}
      />

      {/* Visual divider + grabber, drawn at the handle position. */}
      <div className={s.divider} style={{ left: `${pos}%` }} aria-hidden="true">
        <span className={s.knob}>
          <span className={s.arrows}>&#8249;&#8202;&#8250;</span>
        </span>
      </div>
    </div>
  );
}
