import { EditorialPage } from "@/components/marketing/EditorialPage";
import { getLegalPage } from "@/lib/cms/legal";

export const metadata = {
  alternates: { canonical: "/legal/returns" },
  title: "Returns and refunds",
  description:
    "How to return an item bought from the House of Willow Alexander shop, and how refunds are handled.",
};

/**
 * Returns & refunds policy (Google Shopping brief, Task 5 — Merchant Center
 * requires it). TEMPLATE with clearly-bracketed placeholders: the business
 * supplies the final wording, either here or (preferred) in Sanity via
 * getLegalPage("returns"), which overrides the title when set. Do NOT ship the
 * bracketed figures to production as real policy — replace them first.
 */
export default async function ReturnsPage() {
  const sanityPage = await getLegalPage("returns");

  return (
    <EditorialPage
      eyebrow="Legal · Returns"
      title={sanityPage?.title ?? "Returns and refunds."}
      lede="How to return something bought from the House shop, and how your refund is handled. Final wording is being confirmed with the business; the figures in brackets are placeholders."
      sections={[
        {
          heading: "Your right to return",
          body: `You may return most items within [RETURN WINDOW, e.g. 14 or 30] days of delivery for a refund. This is in addition to your statutory rights under the Consumer Contracts Regulations and the Consumer Rights Act.

[State any categories that cannot be returned for hygiene or bespoke reasons, e.g. opened toiletries, made-to-order or personalised items, gift cards.]`,
        },
        {
          heading: "Condition",
          body: `Items should be returned [unused and in their original condition and packaging / in the condition described]. [State how faulty or not-as-described items are handled and that they are always covered by your statutory rights.]`,
        },
        {
          heading: "Who pays return postage",
          body: `[State whether the customer or the House pays return postage, and any exceptions — e.g. the House pays when an item is faulty or was sent in error.]`,
        },
        {
          heading: "How to start a return",
          body: `Email [RETURNS EMAIL, e.g. sales@willowalexander.co.uk] with your order number and what you would like to return, and we will send return instructions and the address. [Describe any online returns form or portal if one exists.]`,
        },
        {
          heading: "Refund timescale",
          body: `Once we receive and check the returned item, we will refund you within [REFUND WINDOW, e.g. 14] days, to your original payment method. [State how return postage and any original delivery charge are treated.]`,
        },
      ]}
    />
  );
}
