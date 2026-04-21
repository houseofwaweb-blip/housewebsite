/**
 * HearthColophon — italic Cormorant head + small-caps Jost line.
 * Per variant-A.
 */
export function HearthColophon() {
  return (
    <div className="max-w-[1360px] mx-auto px-[5vw] py-10 text-center">
      <p className="mb-1.5 font-hearth-serif italic text-[16px] text-house-stone">
        — The Hearth, published by the House of Willow Alexander —
      </p>
      <p className="font-hearth-sans text-[10px] tracking-[0.22em] uppercase text-house-black">
        Weekly from the studios · Quarterly in print · Spring MMXXVI, No. XI
      </p>
    </div>
  );
}
