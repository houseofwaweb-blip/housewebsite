import { EditorialPage } from "@/components/marketing/EditorialPage";
import { getLegalPage } from "@/lib/cms/legal";

export const metadata = {
  alternates: { canonical: "/legal/delivery" },
  title: "Delivery",
  description:
    "UK delivery zones, rates, dispatch and delivery times for orders from the House of Willow Alexander shop.",
};

/**
 * Delivery policy (Google Shopping brief, Task 5 — Merchant Center requires it).
 * TEMPLATE with clearly-bracketed placeholders: the business supplies the final
 * wording, either here or (preferred) in Sanity via getLegalPage("delivery").
 * Do NOT ship the bracketed figures to production as real policy — replace them.
 */
export default async function DeliveryPage() {
  const sanityPage = await getLegalPage("delivery");

  return (
    <EditorialPage
      eyebrow="Legal · Delivery"
      title={sanityPage?.title ?? "Delivery."}
      lede="Where we deliver, what it costs, and how long it takes. Final wording is being confirmed with the business; the figures in brackets are placeholders."
      sections={[
        {
          heading: "Where we deliver",
          body: `We deliver across [UK MAINLAND / the UK]. [State any excluded areas — e.g. Channel Islands, Scottish Highlands and Islands, Northern Ireland, BFPO — and whether international delivery is offered.]`,
        },
        {
          heading: "Rates",
          body: `Standard UK delivery is [£RATE]. [List any other options — e.g. express — with their prices, and note that oversized or heavy items may carry a surcharge shown at checkout.]`,
        },
        {
          heading: "Free delivery",
          body: `Orders over [£THRESHOLD] qualify for free standard UK delivery. [State any exclusions from the free-delivery threshold.]`,
        },
        {
          heading: "Dispatch time",
          body: `In-stock orders are dispatched within [X] working days. [State cut-off times and how made-to-order items differ.]`,
        },
        {
          heading: "Delivery time",
          body: `Once dispatched, standard delivery arrives within [X–Y] working days via [CARRIER]. [State how tracking is provided.]`,
        },
        {
          heading: "Exclusions and notes",
          body: `[Note anything specific — e.g. bulky furniture handled by a separate courier, plants delivered only in certain months, or items shipped directly by a maker.]`,
        },
      ]}
    />
  );
}
