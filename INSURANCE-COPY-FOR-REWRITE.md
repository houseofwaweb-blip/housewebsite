# Insurance copy — rewrite handoff

Every piece of customer-facing copy across the House of Willow Alexander **insurance** section (`/insurance/*`), extracted verbatim from source, page by page and field by field. Live preview: https://housewebsite-3vwp0wzth-houseofwaweb-blips-projects.vercel.app/insurance

## How to use this document (for the rewriter)

Each copy block looks like this:

```
- **KEY** `page-or-source › field.path`
  - CURRENT: "the current copy, verbatim"
  - NEW:
```

**Write the new copy on the `NEW:` line of each block.** Leave the `**KEY**` and `CURRENT:` lines exactly as they are — the KEY is how the copy gets mapped back to the exact place in the code. Do not add, remove, reorder, merge or renumber blocks. If a block should stay unchanged, write `NEW: (keep)`.

Return the whole file back in this same structure.

## Rules for the rewrite

- **Voice:** House of Willow Alexander — considered, calm, plain-spoken, quietly premium. Never salesy, never urgent.
- **No em dashes.** Brand rule: never use an em dash in customer-facing copy. Use commas, full stops, or "and".
- **Keep every fact, figure and name.** Do not change statistics (e.g. `379,580`), prices, phone numbers, email addresses, FRN, legal entity names, "Provenance", "Benefact", "House of Willow Alexander", grades, dates, or regulatory wording. Rephrase around them, never alter them.
- **Regulatory / compliance copy is sensitive.** Any block in the `terms`, `how-this-works`, disclosures, FCA/FOS/complaints wording, and the `DISCLOSURE_TEXT` / `PROVENANCE` config below is pending Provenance compliance sign-off. Improve clarity and tone only; do not change legal meaning. If unsure, write `NEW: (keep — regulatory)`.
- **Match length roughly.** These fill fixed layouts (hero lines, cards, buttons, list items). Keep headings short, buttons 1–4 words, paragraphs about the same length as CURRENT.
- **`{...}` placeholders** (e.g. `{PROVENANCE.frn}`, `{an/a}`) are values injected at runtime. Keep them verbatim in your rewrite where they appear.
- **Do not rewrite** anything marked `(rendered by imported component ...)` in place — that copy has its own block in the "Shared components" section; rewrite it once there and it updates everywhere.

## What the KEY paths mean (mapping back to source)

- `KEY` starting with a **page key** (e.g. `insurance-hub ›`, `private-client ›`, `speak-to-a-specialist ›`) → copy hardcoded in that page's file under `src/app/insurance/...`. I map it back by the page + CURRENT string.
- `KEY` starting with an **ARRAY name** (e.g. `SPECIALIST_PAGES/listed-buildings ›`, `EVERYDAY_SPECIALIST_PAGES/home ›`, `GUIDES/underinsurance ›`) → a field in `src/lib/insurance/*.ts` data. The path (`hero.heading`, `whyDifferent.body[0]`, `detail.points[1].p`) is the exact object path.
- `KEY` starting with a **component name** (e.g. `SpecialistPage ›`, `InsuranceCtaBand ›`, `WhyHouseCover ›`) → standing copy in `src/components/insurance/*.tsx`, shown on many pages.

## Document map

1. **Static pages** — hub pages and one-off pages (copy hardcoded in the page files)
2. **Data-driven pages** — the 11 specialist property pages, 4 everyday covers (+ hub cards), 3 business pages (+ hub cards), 5 guides (copy from `src/lib/insurance/*.ts`). NOTE: `EVERYDAY_SPECIALIST_PAGES`/`BUSINESS_SPECIALIST_PAGES` are the **full page** copy; `EVERYDAY_PAGES`/`BUSINESS_PAGES` are the shorter **hub-card** copy for the same slugs. Rewrite both (they appear in different places).
3. **Shared components & config** — CTA bands, trust strips, forms, disclosures and the cover-finder index, reused across pages (rewrite once).

---

# Part 1 — Static pages
### page:/insurance — Insurance hub
<sub>source: src/app/insurance/page.tsx</sub>
renders shared components: `<ProvenanceLockup/>`, `<WhyHouseCover/>`, `<WhatMayBeCovered/>`, `<CoverFinder/>`, `<ClaimsHelpBand/>`, `<InsuranceCtaBand/>`, `<RenewalReminderForm/>`, `<InsuranceDisclosure/>`, `<Accordion/>`

- **KEY** `insurance-hub › meta.title`
  - CURRENT: "Insurance from the House"
  - NEW:

- **KEY** `insurance-hub › meta.description`
  - CURRENT: "Insurance introduced by House of Willow Alexander and arranged by Provenance. Advised cover for homes worth insuring properly, and everyday cover for everything that does not need a conversation."
  - NEW:

- **KEY** `insurance-hub › hero.eyebrow`
  - CURRENT: "The House · Insurance"
  - NEW:

- **KEY** `insurance-hub › hero.heading`
  - CURRENT: "Cover for the house. And everyone who lives in it."
  - NEW:

- **KEY** `insurance-hub › hero.lede`
  - CURRENT: "Insuring a home well means understanding what it is made of and what has been done to it. The House introduces you to a specialist who takes the time to ask; the cover is arranged by Provenance."
  - NEW:

- **KEY** `insurance-hub › hero.cta.primary`
  - CURRENT: "Speak to a specialist"
  - NEW:

- **KEY** `insurance-hub › hero.cta.secondary`
  - CURRENT: "Everyday cover"
  - NEW:

- **KEY** `insurance-hub › chooseWhatToCover.eyebrow`
  - CURRENT: "Choose what to cover"
  - NEW:

- **KEY** `insurance-hub › chooseWhatToCover.cards[0].label`
  - CURRENT: "Home"
  - NEW:

- **KEY** `insurance-hub › chooseWhatToCover.cards[0].body`
  - CURRENT: "Buildings and contents, from a standard house to a period one."
  - NEW:

- **KEY** `insurance-hub › chooseWhatToCover.cards[0].link`
  - CURRENT: "Cover home →"
  - NEW:

- **KEY** `insurance-hub › chooseWhatToCover.cards[1].label`
  - CURRENT: "Pet"
  - NEW:

- **KEY** `insurance-hub › chooseWhatToCover.cards[1].body`
  - CURRENT: "Cover for the animal, shaped around it rather than a tick-box."
  - NEW:

- **KEY** `insurance-hub › chooseWhatToCover.cards[1].link`
  - CURRENT: "Cover pet →"
  - NEW:

- **KEY** `insurance-hub › chooseWhatToCover.cards[2].label`
  - CURRENT: "Home and pet"
  - NEW:

- **KEY** `insurance-hub › chooseWhatToCover.cards[2].body`
  - CURRENT: "Both in one conversation, on one renewal date."
  - NEW:

- **KEY** `insurance-hub › chooseWhatToCover.cards[2].link`
  - CURRENT: "Cover home and pet →"
  - NEW:

- **KEY** `insurance-hub › twoDoors.advised.eyebrow`
  - CURRENT: "Advised · Private client & estate"
  - NEW:

- **KEY** `insurance-hub › twoDoors.advised.heading`
  - CURRENT: "For a home worth insuring properly."
  - NEW:

- **KEY** `insurance-hub › twoDoors.advised.body`
  - CURRENT: "A named specialist, a conversation about the house, and a policy built around it rather than around a comparison engine. One estate, one renewal date."
  - NEW:

- **KEY** `insurance-hub › twoDoors.advised.link`
  - CURRENT: "Speak to a specialist →"
  - NEW:

- **KEY** `insurance-hub › twoDoors.everyday.eyebrow`
  - CURRENT: "Everyday cover"
  - NEW:

- **KEY** `insurance-hub › twoDoors.everyday.heading`
  - CURRENT: "For everything that does not need a conversation."
  - NEW:

- **KEY** `insurance-hub › twoDoors.everyday.body`
  - CURRENT: "Home, car, pet and travel. Tell us what you need and a specialist arranges it."
  - NEW:

- **KEY** `insurance-hub › twoDoors.everyday.link`
  - CURRENT: "Everyday cover →"
  - NEW:

- **KEY** `insurance-hub › findCover.lede`
  - CURRENT: "Know what you are looking for? Search every cover the House introduces."
  - NEW:

- **KEY** `insurance-hub › notCovered.eyebrow`
  - CURRENT: "Read this before you rely on cover"
  - NEW:

- **KEY** `insurance-hub › notCovered.heading`
  - CURRENT: "What is not covered, and what to check."
  - NEW:

- **KEY** `insurance-hub › notCovered.lede`
  - CURRENT: "Every policy has limits and exclusions. This is a general guide, never the full picture, so the policy wording is what to read before you commit. The specifics for each cover sit on its own page."
  - NEW:

- **KEY** `insurance-hub › notCovered.points[0].h`
  - CURRENT: "Wear, tear and gradual damage"
  - NEW:

- **KEY** `insurance-hub › notCovered.points[0].p`
  - CURRENT: "Ordinary ageing, gradual deterioration and a lack of maintenance are not insured events. Cover is for sudden and unforeseen loss."
  - NEW:

- **KEY** `insurance-hub › notCovered.points[1].h`
  - CURRENT: "Anything already known"
  - NEW:

- **KEY** `insurance-hub › notCovered.points[1].p`
  - CURRENT: "A loss, fault or condition that already exists when cover starts is not picked up by a new policy."
  - NEW:

- **KEY** `insurance-hub › notCovered.points[2].h`
  - CURRENT: "Under-insurance"
  - NEW:

- **KEY** `insurance-hub › notCovered.points[2].p`
  - CURRENT: "Set the sum insured too low and a claim can be reduced in proportion. The rebuild figure is not the market value."
  - NEW:

- **KEY** `insurance-hub › notCovered.points[3].h`
  - CURRENT: "Limits and excesses"
  - NEW:

- **KEY** `insurance-hub › notCovered.points[3].p`
  - CURRENT: "Section limits, single-item limits and the excess all shape what is paid. Valuables above the limit usually need listing separately."
  - NEW:

- **KEY** `insurance-hub › notCovered.points[4].h`
  - CURRENT: "Unoccupied and let homes"
  - NEW:

- **KEY** `insurance-hub › notCovered.points[4].p`
  - CURRENT: "Standard cover can fall away once a home is left empty beyond a set period, or let out, unless the policy is written for it."
  - NEW:

- **KEY** `insurance-hub › notCovered.points[5].h`
  - CURRENT: "The House does not advise"
  - NEW:

- **KEY** `insurance-hub › notCovered.points[5].p`
  - CURRENT: "The House introduces you to Provenance and does not advise on, arrange or decide your cover. The terms that bind are in the policy documents."
  - NEW:

- **KEY** `insurance-hub › notCovered.footnote`
  - CURRENT: "The policy wording, key facts and exclusions are provided by Provenance before you commit to anything."
  - NEW:

- **KEY** `insurance-hub › argument.rebuild.label`
  - CURRENT: "Rebuild cost"
  - NEW:

- **KEY** `insurance-hub › argument.rebuild.body`
  - CURRENT: "The cost of rebuilding a home is not the same as its market value. For specialist, period or altered properties, it is worth checking that the figure used for insurance reflects the property itself."
  - NEW:

- **KEY** `insurance-hub › argument.statement`
  - CURRENT: "A specialist who understands what your home is made of is the difference between a guess and a figure. That is what the House introduces you to."
  - NEW:

- **KEY** `insurance-hub › whoArranges.eyebrow`
  - CURRENT: "Who arranges it"
  - NEW:

- **KEY** `insurance-hub › whoArranges.body` (interpolates PROVENANCE.legalName / .frn / .group / .backer)
  - CURRENT: "Cover is arranged and administered by {PROVENANCE.legalName}, authorised and regulated by the FCA (FRN {PROVENANCE.frn}), part of {PROVENANCE.group} and the {PROVENANCE.backer} group. {PROVENANCE.backer} is charity-owned and gives its available profits to good causes. The House introduces you; it does not advise on, arrange, administer or compare insurance."
  - NEW:

- **KEY** `insurance-hub › whoArranges.link`
  - CURRENT: "How this works, and how we are paid →"
  - NEW:

- **KEY** `insurance-hub › commitment.statement`
  - CURRENT: "No fear, no urgency, no pressure. We will not chase you or manufacture a deadline. Take the time to understand the cover, the exclusions and the policy documents before you decide."
  - NEW:

- **KEY** `insurance-hub › faq.eyebrow`
  - CURRENT: "Good to know"
  - NEW:

- **KEY** `insurance-hub › faq.heading`
  - CURRENT: "Questions people ask before they arrange cover."
  - NEW:

- **KEY** `insurance-hub › faq[0].q`
  - CURRENT: "Who provides the insurance?"
  - NEW:

- **KEY** `insurance-hub › faq[0].a`
  - CURRENT: "The House introduces you to Provenance, an FCA-authorised firm that arranges and administers the cover. The House does not underwrite or sell the policy itself."
  - NEW:

- **KEY** `insurance-hub › faq[1].q`
  - CURRENT: "What can I cover?"
  - NEW:

- **KEY** `insurance-hub › faq[1].a`
  - CURRENT: "Home and pet, together or separately. Speak to a specialist about the whole estate, or choose an everyday cover and a specialist will arrange it for you."
  - NEW:

- **KEY** `insurance-hub › faq[2].q`
  - CURRENT: "How do I make a claim?"
  - NEW:

- **KEY** `insurance-hub › faq[2].a`
  - CURRENT: "Claims and existing-policy help go directly to Provenance. The claims route and contact details are set out in your policy documents and in the Claims and help section."
  - NEW:

- **KEY** `insurance-hub › faq[3].q`
  - CURRENT: "What is not covered?"
  - NEW:

- **KEY** `insurance-hub › faq[3].a`
  - CURRENT: "Every policy has limits and exclusions. These are set out plainly before you decide, and in full in the policy wording. Read them alongside what may be covered."
  - NEW:

- **KEY** `insurance-hub › faq[4].q`
  - CURRENT: "Is there any pressure to buy?"
  - NEW:

- **KEY** `insurance-hub › faq[4].a`
  - CURRENT: "No. We will not chase you or manufacture a deadline. Take the time to understand the cover, the exclusions and the policy documents before you decide."
  - NEW:

- **KEY** `insurance-hub › faq[5].q`
  - CURRENT: "Can you remind me before my renewal?"
  - NEW:

- **KEY** `insurance-hub › faq[5].a`
  - CURRENT: "Yes. Tell us your renewal month and we will send one email at the right time. It is a reminder, not a newsletter."
  - NEW:

- **KEY** `insurance-hub › ctaBand.eyebrow` (props into `<InsuranceCtaBand/>`)
  - CURRENT: "Insure it properly"
  - NEW:

- **KEY** `insurance-hub › ctaBand.heading`
  - CURRENT: "Ready to arrange cover that understands your home?"
  - NEW:

- **KEY** `insurance-hub › ctaBand.body`
  - CURRENT: "Speak to a specialist about the whole estate, or choose an everyday cover and a specialist will arrange it. The House introduces you; Provenance arranges and administers the cover."
  - NEW:

- **KEY** `insurance-hub › ctaBand.primaryLabel`
  - CURRENT: "Request a quote"
  - NEW:

- **KEY** `insurance-hub › ctaBand.tertiaryLabel`
  - CURRENT: "Everyday cover"
  - NEW:

- **KEY** `insurance-hub › renewalReminder.eyebrow`
  - CURRENT: "Not ready today?"
  - NEW:

- **KEY** `insurance-hub › renewalReminder.heading`
  - CURRENT: "Remind me before my renewal."
  - NEW:

- **KEY** `insurance-hub › renewalReminder.body`
  - CURRENT: "Insurance is bought at one moment in the year, and most people miss it. Tell us your renewal month and we will send one email at the right time. Not a newsletter."
  - NEW:

### page:/insurance/everyday — Everyday cover hub
<sub>source: src/app/insurance/everyday/page.tsx</sub>
renders shared components: `<ProvenanceLockup/>`, `<InsuranceTrustStrip/>`, `<InsuranceCtaBand/>`, `<InsuranceDisclosure/>`

- **KEY** `everyday-hub › meta.title`
  - CURRENT: "Everyday cover"
  - NEW:

- **KEY** `everyday-hub › meta.description`
  - CURRENT: "Home, car, pet and travel cover for the everyday things. Introduced by the House, arranged by Provenance."
  - NEW:

- **KEY** `everyday-hub › hero.eyebrow`
  - CURRENT: "Insurance · Everyday cover"
  - NEW:

- **KEY** `everyday-hub › hero.heading`
  - CURRENT: "For everything that does not need a conversation."
  - NEW:

- **KEY** `everyday-hub › hero.lede`
  - CURRENT: "Straightforward cover for the everyday things. Tell us what you need and a specialist will arrange it. The House introduces you; Provenance arranges the cover."
  - NEW:

- **KEY** `everyday-hub › hero.cta`
  - CURRENT: "Choose a cover"
  - NEW:

- **KEY** `everyday-hub › products.heading`
  - CURRENT: "Choose a cover."
  - NEW:

- **KEY** `everyday-hub › products[0].name`
  - CURRENT: "Home"
  - NEW:

- **KEY** `everyday-hub › products[0].body`
  - CURRENT: "Buildings and contents for a standard home."
  - NEW:

- **KEY** `everyday-hub › products[1].name`
  - CURRENT: "Car, van and motorbike"
  - NEW:

- **KEY** `everyday-hub › products[1].body`
  - CURRENT: "Including temporary cover from one hour to 28 days."
  - NEW:

- **KEY** `everyday-hub › products[2].name`
  - CURRENT: "Pet and travel"
  - NEW:

- **KEY** `everyday-hub › products[2].body`
  - CURRENT: "Pet cover, and single-trip or annual travel."
  - NEW:

- **KEY** `everyday-hub › products[3].name`
  - CURRENT: "Breakdown and bicycle"
  - NEW:

- **KEY** `everyday-hub › products[3].body`
  - CURRENT: "Roadside and recovery, and cover for road, mountain and electric bikes."
  - NEW:

- **KEY** `everyday-hub › products.card.link`
  - CURRENT: "View cover →"
  - NEW:

- **KEY** `everyday-hub › howItWorks.eyebrow`
  - CURRENT: "How it works"
  - NEW:

- **KEY** `everyday-hub › howItWorks.heading`
  - CURRENT: "Simple to arrange, no comparison forms."
  - NEW:

- **KEY** `everyday-hub › howItWorks.steps[0].h`
  - CURRENT: "Choose a cover"
  - NEW:

- **KEY** `everyday-hub › howItWorks.steps[0].p`
  - CURRENT: "Pick the everyday cover you need, from home to bicycle."
  - NEW:

- **KEY** `everyday-hub › howItWorks.steps[1].h`
  - CURRENT: "A short introduction"
  - NEW:

- **KEY** `everyday-hub › howItWorks.steps[1].p`
  - CURRENT: "Leave a few details. Nothing about sums insured, and no comparison forms."
  - NEW:

- **KEY** `everyday-hub › howItWorks.steps[2].h`
  - CURRENT: "Provenance arranges it"
  - NEW:

- **KEY** `everyday-hub › howItWorks.steps[2].p`
  - CURRENT: "A specialist calls, arranges the cover and handles it from there."
  - NEW:

- **KEY** `everyday-hub › anchor.statement`
  - CURRENT: "No fear, no urgency, no pressure. The House introduces you; Provenance arranges and administers the cover."
  - NEW:

- **KEY** `everyday-hub › highValueRouting.body`
  - CURRENT: "Insuring a listed, high-value or non-standard home? Everyday cover is not built for it. Speak to a specialist instead →"
  - NEW:

- **KEY** `everyday-hub › ctaBand.eyebrow` (props into `<InsuranceCtaBand/>`)
  - CURRENT: "Arrange everyday cover"
  - NEW:

- **KEY** `everyday-hub › ctaBand.heading`
  - CURRENT: "Choose a cover and a specialist will arrange it."
  - NEW:

- **KEY** `everyday-hub › ctaBand.body`
  - CURRENT: "Home, car, pet and travel. Tell us what you need and a specialist will arrange it. No comparison forms, and no pressure."
  - NEW:

- **KEY** `everyday-hub › ctaBand.primaryLabel`
  - CURRENT: "Choose a cover"
  - NEW:

- **KEY** `everyday-hub › ctaBand.tertiaryLabel`
  - CURRENT: "Speak to a specialist"
  - NEW:

### page:/insurance/how-this-works — How this works
<sub>source: src/app/insurance/how-this-works/page.tsx</sub>
renders shared components: `<ProvenanceLockup/>`

- **KEY** `how-this-works › meta.title`
  - CURRENT: "How this works, and how we are paid"
  - NEW:

- **KEY** `how-this-works › meta.description`
  - CURRENT: "Plainly: the House introduces you to Provenance, who arranges the cover. Who Provenance and Benefact are, how the House is paid, and how to complain."
  - NEW:

- **KEY** `how-this-works › hero.eyebrow`
  - CURRENT: "The House · Insurance"
  - NEW:

- **KEY** `how-this-works › hero.heading`
  - CURRENT: "How this works, and how we are paid."
  - NEW:

- **KEY** `how-this-works › hero.lede`
  - CURRENT: "Almost nobody in this market explains this openly. We would rather you did not have to ask."
  - NEW:

- **KEY** `how-this-works › blocks[0].eyebrow`
  - CURRENT: "What the House does"
  - NEW:

- **KEY** `how-this-works › blocks[0].body` ("introduces" is bold)
  - CURRENT: "The House introduces you to a specialist. That is all it does. It does not advise on, arrange, administer, compare or transact insurance. Those are regulated activities, and they belong to Provenance."
  - NEW:

- **KEY** `how-this-works › blocks[1].eyebrow`
  - CURRENT: "Who arranges the cover"
  - NEW:

- **KEY** `how-this-works › blocks[1].body` (interpolates PROVENANCE.legalName / .frn / .group) — REGULATORY
  - CURRENT: "{PROVENANCE.legalName} is authorised and regulated by the Financial Conduct Authority, firm reference number {PROVENANCE.frn}, and is part of {PROVENANCE.group}. Provenance advises, arranges, administers and, when the time comes, handles claims on your behalf."
  - NEW:

- **KEY** `how-this-works › blocks[2].eyebrow`
  - CURRENT: "Why Benefact matters"
  - NEW:

- **KEY** `how-this-works › blocks[2].body` (interpolates PROVENANCE.backer)
  - CURRENT: "Provenance places business with markets in the {PROVENANCE.backer} group, a charity-owned group. {PROVENANCE.backer} gives its available profits to charitable causes, so business placed through it supports good causes at no extra cost to you. It is an unusual arrangement, and one we are glad to put in writing."
  - NEW:

- **KEY** `how-this-works › blocks[3].eyebrow`
  - CURRENT: "How the House is paid"
  - NEW:

- **KEY** `how-this-works › blocks[3].body`
  - CURRENT: "As the introducer, the House receives a share of Provenance's commission when a policy starts and at renewal. We would rather tell you that plainly than leave it unsaid."
  - NEW:

- **KEY** `how-this-works › blocks[4].eyebrow`
  - CURRENT: "What the House contributes in return"
  - NEW:

- **KEY** `how-this-works › blocks[4].body`
  - CURRENT: "The House brings the part a comparison form cannot: a considered introduction to a genuine specialist, and the renewal timing kept in view. That is the work, and it is what earns the share."
  - NEW:

- **KEY** `how-this-works › blocks[5].eyebrow`
  - CURRENT: "If something goes wrong"
  - NEW:

- **KEY** `how-this-works › blocks[5].body` ("regulatory notice" links to /insurance/terms) — REGULATORY
  - CURRENT: "Complaints about the arranged cover are handled by Provenance under its FCA permissions, and eligible complainants can refer a matter to the Financial Ombudsman Service. The full regulatory notice and complaints route are set out on the regulatory notice page."
  - NEW:

- **KEY** `how-this-works › footnote`
  - CURRENT: "This page describes the regulatory relationship and is pending Provenance compliance sign-off."
  - NEW:
### page:/insurance/private-client — Private client
<sub>source: src/app/insurance/private-client/page.tsx</sub>
renders shared components: `<InsuranceTrustStrip/>`, `<ProvenanceLockup/>` (×2), `<CoverCards/>`, `<InsuranceEnquiryForm/>` (×2)

- **KEY** `private-client › meta.title`
  - CURRENT: "Private client & estate insurance, high-value homes"
  - NEW:

- **KEY** `private-client › meta.description`
  - CURRENT: "Advised, arranged insurance for high-value and period homes: one policy for the whole estate, a named specialist, and one renewal date. Introduced by the House, arranged by Provenance."
  - NEW:

- **KEY** `private-client › hero.eyebrow`
  - CURRENT: "Insurance · Private client & estate"
  - NEW:

- **KEY** `private-client › hero.heading`
  - CURRENT: "A life this considered shouldn't be insured in separate pieces."
  - NEW:

- **KEY** `private-client › hero.lede`
  - CURRENT: "Advised means three things: a named specialist, a real conversation about the house, and a policy built around it rather than around a comparison engine. One estate, one renewal date."
  - NEW:

- **KEY** `private-client › hero.subhead`
  - CURRENT: "Insurance built around you. Structured properly, managed personally."
  - NEW:

- **KEY** `private-client › hero.cta`
  - CURRENT: "Speak to a specialist"
  - NEW:

- **KEY** `private-client › enquire.heading`
  - CURRENT: "Speak to a specialist"
  - NEW:

- **KEY** `private-client › enquire.body`
  - CURRENT: "Five details, and a specialist will call. Nothing about sums insured or your current insurer."
  - NEW:

- **KEY** `private-client › cover.heading`
  - CURRENT: "The estate, considered as one."
  - NEW:

- **KEY** `private-client › cover.body`
  - CURRENT: "Depending on the policy and insurer, much of an estate can sit within one arranged relationship rather than a folder of separate policies. Each of these can often be included:"
  - NEW:

- **KEY** `private-client › difference.eyebrow`
  - CURRENT: "The difference the House brings"
  - NEW:

- **KEY** `private-client › difference.heading`
  - CURRENT: "A policy built on the house, not a form."
  - NEW:

- **KEY** `private-client › difference.body`
  - CURRENT: "A specialist can only insure a home as well as it is described. That is why the House introduces you to one who takes the time: the lime mortar, the rewire, the chimney lining, the things worth scheduling. Describing those properly is the difference between a home a specialist can price with confidence and one they have to guess at. And because a specialist relationship is ongoing, sums insured and reinstatement costs are reviewed every renewal, not only when a claim forces the question."
  - NEW:

- **KEY** `private-client › underinsurance.stats[0].stat`
  - CURRENT: "Rebuild"
  - NEW:

- **KEY** `private-client › underinsurance.stats[0].label`
  - CURRENT: "The cost to rebuild a home is not its market value, and for period or altered homes the gap can be wide."
  - NEW:

- **KEY** `private-client › underinsurance.stats[1].stat`
  - CURRENT: "Contents"
  - NEW:

- **KEY** `private-client › underinsurance.stats[1].label`
  - CURRENT: "Valuables above the single-item limit need scheduling, or a claim can fall short."
  - NEW:

- **KEY** `private-client › underinsurance.stats[2].stat`
  - CURRENT: "Renewal"
  - NEW:

- **KEY** `private-client › underinsurance.stats[2].label`
  - CURRENT: "Sums insured and reinstatement costs drift over time unless they are reviewed each year."
  - NEW:

- **KEY** `private-client › underinsurance.body`
  - CURRENT: "Listed buildings, high-value homes and extended properties are among the categories worst affected by under-insurance, and index-linking alone rarely keeps pace. A specialist sets the figure against the real cost of rebuilding your home."
  - NEW:

- **KEY** `private-client › process.heading`
  - CURRENT: "How it works, in four steps."
  - NEW:

- **KEY** `private-client › process.items[0].heading`
  - CURRENT: "Send your current documents"
  - NEW:

- **KEY** `private-client › process.items[0].body`
  - CURRENT: "Your existing schedule is enough to begin. Nothing is asked of you that you do not already have."
  - NEW:

- **KEY** `private-client › process.items[1].heading`
  - CURRENT: "A specialist reviews and benchmarks"
  - NEW:

- **KEY** `private-client › process.items[1].body`
  - CURRENT: "Provenance reviews the cover, checks it against the rebuild reality of your home, and benchmarks the premium."
  - NEW:

- **KEY** `private-client › process.items[2].heading`
  - CURRENT: "The market is searched"
  - NEW:

- **KEY** `private-client › process.items[2].body`
  - CURRENT: "The right specialist markets are approached, rather than a single comparison table."
  - NEW:

- **KEY** `private-client › process.items[3].heading`
  - CURRENT: "Claims handled on your behalf"
  - NEW:

- **KEY** `private-client › process.items[3].body`
  - CURRENT: "If the day comes, Provenance manages the claim for you, from first notification to settlement."
  - NEW:

- **KEY** `private-client › faq.heading`
  - CURRENT: "Before you get in touch."
  - NEW:

- **KEY** `private-client › faq.items[0].q`
  - CURRENT: "What does it cost to talk?"
  - NEW:

- **KEY** `private-client › faq.items[0].a`
  - CURRENT: "Nothing. The introduction and the review are free; you only ever pay a premium if you decide to place cover."
  - NEW:

- **KEY** `private-client › faq.items[1].q`
  - CURRENT: "Does it have to be everything at once?"
  - NEW:

- **KEY** `private-client › faq.items[1].a`
  - CURRENT: "No. You can start with the house and add the rest over time, or move a single risk that a standard insurer has struggled with."
  - NEW:

- **KEY** `private-client › faq.items[2].q`
  - CURRENT: "What happens to my existing policy?"
  - NEW:

- **KEY** `private-client › faq.items[2].a`
  - CURRENT: "It stays exactly as it is until you choose otherwise. Nothing is cancelled without your say-so."
  - NEW:

- **KEY** `private-client › faq.items[3].q`
  - CURRENT: "When should I start?"
  - NEW:

- **KEY** `private-client › faq.items[3].a`
  - CURRENT: "Start early enough to review the options properly before renewal. There is no need to rush it, and little benefit in leaving it to the last week."
  - NEW:

- **KEY** `private-client › footEnquire.eyebrow`
  - CURRENT: "Speak to a specialist"
  - NEW:

- **KEY** `private-client › footEnquire.heading`
  - CURRENT: "A conversation about the house."
  - NEW:

### page:/insurance/claims-and-help — Claims and help
<sub>source: src/app/insurance/claims-and-help/page.tsx</sub>
renders shared components: `<ClaimsHelpDetail/>` (from ClaimsHelp)

- **KEY** `claims-and-help › meta.title`
  - CURRENT: "Claims and help"
  - NEW:

- **KEY** `claims-and-help › meta.description`
  - CURRENT: "Already insured through the House? How to make a claim, who to contact, and what to have ready. Claims are handled by Provenance; the House will make sure you reach the right person."
  - NEW:

- **KEY** `claims-and-help › hero.eyebrow`
  - CURRENT: "The House · Insurance"
  - NEW:

- **KEY** `claims-and-help › hero.heading`
  - CURRENT: "Claims and help."
  - NEW:

- **KEY** `claims-and-help › hero.lede`
  - CURRENT: "If something has happened, or you just need to reach the right person, start here. The House will point you to it, and Provenance handles the claim."
  - NEW:

- **KEY** `claims-and-help › hero.cta.email`
  - CURRENT: "Email the House →"
  - NEW:

- **KEY** `claims-and-help › footer.body` (inline links: "insurance hub" → /insurance, "speak to a specialist" → /insurance/private-client)
  - CURRENT: "Not yet insured through the House, and weighing it up? Start with the insurance hub or speak to a specialist ."
  - NEW:

- **KEY** `claims-and-help › footer.disclaimer`
  - CURRENT: "This page describes how to reach us and how claims are handled, and is pending Provenance compliance sign-off."
  - NEW:

### page:/insurance/home-protection — Home protection
<sub>source: src/app/insurance/home-protection/page.tsx — most strings are CMS-backed via cms(); values below are the hardcoded fallback defaults</sub>
renders shared components: `<WaitlistMini/>`

- **KEY** `home-protection › meta.title`
  - CURRENT: "Home Protection. Know the home before the home needs you."
  - NEW:

- **KEY** `home-protection › meta.description`
  - CURRENT: "A one-day in-person review by House-vetted specialists. Condition review, evidence pack, and insurance-ready documentation for your home."
  - NEW:

- **KEY** `home-protection › hero.eyebrow`
  - CURRENT: "Protect · Late 2026"
  - NEW:

- **KEY** `home-protection › hero.headline`
  - CURRENT: "Know the home"
  - NEW:

- **KEY** `home-protection › hero.headlineEm`
  - CURRENT: "before the home needs you."
  - NEW:

- **KEY** `home-protection › hero.body`
  - CURRENT: "A one-day in-person review by House-vetted specialists. A condition review, an evidence pack, and insurance-ready documentation, yours to keep and ready for whatever comes next."
  - NEW:

- **KEY** `home-protection › hero.ctaLabel`
  - CURRENT: "Register interest"
  - NEW:

- **KEY** `home-protection › hero.cta2Label`
  - CURRENT: "See Protect overview"
  - NEW:

- **KEY** `home-protection › hero.caption`
  - CURRENT: "Open to all House customers."
  - NEW:

- **KEY** `home-protection › stats.headline`
  - CURRENT: "One day on-site. One clear pack. Years of clarity."
  - NEW:

- **KEY** `home-protection › stats.subheadline`
  - CURRENT: "The first practical act of Home Protection."
  - NEW:

- **KEY** `home-protection › stats.cols[0].label`
  - CURRENT: "Day on-site"
  - NEW:

- **KEY** `home-protection › stats.cols[1].label`
  - CURRENT: "Report turnaround"
  - NEW:

- **KEY** `home-protection › stats.cols[2].label`
  - CURRENT: "House standards"
  - NEW:

- **KEY** `home-protection › stats.cols[3].label`
  - CURRENT: "Disruption"
  - NEW:

- **KEY** `home-protection › covers.eyebrow`
  - CURRENT: "What the review covers"
  - NEW:

- **KEY** `home-protection › covers.headline`
  - CURRENT: "Everything the home quietly needs,"
  - NEW:

- **KEY** `home-protection › covers.headlineEm`
  - CURRENT: "surfaced in one day."
  - NEW:

- **KEY** `home-protection › covers.cards[0].title`
  - CURRENT: "Condition review"
  - NEW:

- **KEY** `home-protection › covers.cards[0].body`
  - CURRENT: "A thorough walk-through of the building: fabric, systems, access, security, damp, drainage. Carried out by House-vetted specialists who understand period homes. This is a House condition review and evidence pack, not a formal RICS survey."
  - NEW:

- **KEY** `home-protection › covers.cards[1].title`
  - CURRENT: "Evidence pack"
  - NEW:

- **KEY** `home-protection › covers.cards[1].body`
  - CURRENT: "Photographs, detailed notes, and a prioritised works list. Everything documented, nothing left to memory. Yours to keep for ongoing reference."
  - NEW:

- **KEY** `home-protection › covers.cards[2].title`
  - CURRENT: "Insurance documentation"
  - NEW:

- **KEY** `home-protection › covers.cards[2].body`
  - CURRENT: "Insurance-ready reports that sit alongside your cover. When the underwriter asks questions, the answers are already prepared and properly evidenced."
  - NEW:

- **KEY** `home-protection › steps.eyebrow`
  - CURRENT: "How it works"
  - NEW:

- **KEY** `home-protection › steps.headline`
  - CURRENT: "Four steps to a"
  - NEW:

- **KEY** `home-protection › steps.headlineEm`
  - CURRENT: "calmer home."
  - NEW:

- **KEY** `home-protection › steps.cards[0].title`
  - CURRENT: "Book"
  - NEW:

- **KEY** `home-protection › steps.cards[0].body`
  - CURRENT: "Register interest and we'll arrange a date. The review fits into a single day: no disruption, no scaffolding."
  - NEW:

- **KEY** `home-protection › steps.cards[1].title`
  - CURRENT: "Assess"
  - NEW:

- **KEY** `home-protection › steps.cards[1].body`
  - CURRENT: "Our House-vetted specialist visits the property and conducts a full condition review. You don't need to prepare anything."
  - NEW:

- **KEY** `home-protection › steps.cards[2].title`
  - CURRENT: "Report"
  - NEW:

- **KEY** `home-protection › steps.cards[2].body`
  - CURRENT: "Within a week, your evidence pack and prioritised works list arrive as a clear pack you keep. Clear, actionable, properly documented."
  - NEW:

- **KEY** `home-protection › steps.cards[3].title`
  - CURRENT: "Act"
  - NEW:

- **KEY** `home-protection › steps.cards[3].body`
  - CURRENT: "Where the review flags work, we introduce you to vetted specialists. Where it flags risk, it feeds directly into your insurance conversation."
  - NEW:

- **KEY** `home-protection › register.eyebrow`
  - CURRENT: "Register interest"
  - NEW:

- **KEY** `home-protection › register.headline`
  - CURRENT: "Opening in"
  - NEW:

- **KEY** `home-protection › register.headlineEm`
  - CURRENT: "late 2026."
  - NEW:

- **KEY** `home-protection › register.body`
  - CURRENT: "Leave your email and we'll write when Home Protection opens. Open to all House customers."
  - NEW:

- **KEY** `home-protection › register.form.placeholder`
  - CURRENT: "Your email"
  - NEW:

- **KEY** `home-protection › register.form.buttonLabel`
  - CURRENT: "Register interest"
  - NEW:

- **KEY** `home-protection › register.form.successMessage`
  - CURRENT: "Thank you. We'll write when Home Protection opens."
  - NEW:

- **KEY** `home-protection › crossSell.card1.eyebrow`
  - CURRENT: "Also from Protect"
  - NEW:

- **KEY** `home-protection › crossSell.card1.headline`
  - CURRENT: "Home Insurance"
  - NEW:

- **KEY** `home-protection › crossSell.card1.body`
  - CURRENT: "Cover that understands period homes, valuable contents, and the things a standard policy quietly excludes. Introduced by the House, underwritten by FCA-regulated specialists."
  - NEW:

- **KEY** `home-protection › crossSell.card1.ctaLabel`
  - CURRENT: "See Home Insurance"
  - NEW:

- **KEY** `home-protection › crossSell.card2.eyebrow`
  - CURRENT: "One pack, joined up"
  - NEW:

- **KEY** `home-protection › crossSell.card2.headline`
  - CURRENT: "Joined up, not repeated"
  - NEW:

- **KEY** `home-protection › crossSell.card2.body`
  - CURRENT: "Your Home Protection evidence feeds directly into the insurance introduction. One conversation, one shared pack, no starting from scratch."
  - NEW:

- **KEY** `home-protection › crossSell.card2.ctaLabel`
  - CURRENT: "Register interest"
  - NEW:

- **KEY** `home-protection › closing.headlineEm`
  - CURRENT: "Prevention is quieter than repair."
  - NEW:

- **KEY** `home-protection › closing.subheadline`
  - CURRENT: "That's the point."
  - NEW:
### page:/insurance/speak-to-a-specialist — Speak to a specialist
<sub>source: src/app/insurance/speak-to-a-specialist/page.tsx</sub>
renders shared components: `<InsuranceEnquiryForm/>`

- **KEY** `speak-to-a-specialist › meta.title`
  - CURRENT: "Speak to a specialist"
  - NEW:

- **KEY** `speak-to-a-specialist › meta.description`
  - CURRENT: "Leave your details and an insurance specialist will call. Introduced by House of Willow Alexander, arranged by Provenance."
  - NEW:

- **KEY** `speak-to-a-specialist › hero.eyebrow`
  - CURRENT: "Insurance"
  - NEW:

- **KEY** `speak-to-a-specialist › hero.heading`
  - CURRENT: "Speak to a specialist."
  - NEW:

- **KEY** `speak-to-a-specialist › hero.intro`
  - CURRENT: "Leave your details and a specialist will call. We ask only what we need to make the introduction, nothing about sums insured, contents or your current insurer."
  - NEW:

- **KEY** `speak-to-a-specialist › hero.contextBanner` (dynamic: assembles as e.g. "Starting a home insurance enquiry for SW1A 1AA.")
  - CURRENT: "Starting {an/a} {cover.label} enquiry / your enquiry{ for POSTCODE}."
  - NEW:

- **KEY** `speak-to-a-specialist › form` (rendered by `<InsuranceEnquiryForm/>`, submitLabel="Send" — see component section)
  - CURRENT: rendered by imported component
  - NEW:

### page:/insurance/renewal-reminder — Remind me before my renewal
<sub>source: src/app/insurance/renewal-reminder/page.tsx</sub>
renders shared components: `<RenewalReminderForm/>`

- **KEY** `renewal-reminder › meta.title`
  - CURRENT: "Remind me before my renewal"
  - NEW:

- **KEY** `renewal-reminder › meta.description`
  - CURRENT: "Insurance is bought at one moment a year, and most people miss it. Tell us your renewal month and we will send a single email at the right time."
  - NEW:

- **KEY** `renewal-reminder › hero.eyebrow`
  - CURRENT: "Insurance"
  - NEW:

- **KEY** `renewal-reminder › hero.heading`
  - CURRENT: "Remind me before my renewal."
  - NEW:

- **KEY** `renewal-reminder › hero.intro`
  - CURRENT: "Insurance is bought at exactly one moment in the year, and most people miss it. The unhurried, better-value window is roughly 15 to 25 days before renewal."
  - NEW:

- **KEY** `renewal-reminder › hero.reassurance`
  - CURRENT: "This is one email, once, at the right moment. Not a newsletter. And we will not pass your address to anyone until you ask us to."
  - NEW:

- **KEY** `renewal-reminder › form` (rendered by `<RenewalReminderForm/>` — see component section)
  - CURRENT: rendered by imported component
  - NEW:

### page:/insurance/terms — Regulatory notice and complaints
<sub>source: src/app/insurance/terms/page.tsx</sub>
renders shared components: none

- **KEY** `terms › meta.title`
  - CURRENT: "Insurance, regulatory notice and complaints"
  - NEW:

- **KEY** `terms › meta.description`
  - CURRENT: "The regulatory notice for insurance introduced by House of Willow Alexander and arranged by Provenance, with the complaints route and FOS eligibility."
  - NEW:

- **KEY** `terms › hero.eyebrow`
  - CURRENT: "Insurance"
  - NEW:

- **KEY** `terms › hero.heading`
  - CURRENT: "Regulatory notice and complaints."
  - NEW:

- **KEY** `terms › pendingBanner.label`
  - CURRENT: "Pending Provenance compliance"
  - NEW:

- **KEY** `terms › pendingBanner.body`
  - CURRENT: "The wording below is indicative. The published version is issued by Provenance compliance verbatim before launch."
  - NEW:

- **KEY** `terms › section1.title`
  - CURRENT: "The introducer arrangement"
  - NEW:

- **KEY** `terms › section1.body` (interpolates INTRODUCER_LEGAL_NAME, PROVENANCE.legalName from @/lib/insurance/config)
  - CURRENT: "{INTRODUCER_LEGAL_NAME} acts solely as an introducer. It does not advise on, arrange, administer, compare or transact insurance. Insurance is arranged and administered by {PROVENANCE.legalName}."
  - NEW:

- **KEY** `terms › section2.title`
  - CURRENT: "Provenance's FCA registration"
  - NEW:

- **KEY** `terms › section2.body` (interpolates PROVENANCE.legalName, PROVENANCE.frn)
  - CURRENT: "{PROVENANCE.legalName} is authorised and regulated by the Financial Conduct Authority, firm reference number {PROVENANCE.frn}. You can verify this on the FCA Register at register.fca.org.uk."
  - NEW:

- **KEY** `terms › section3.title`
  - CURRENT: "Complaints and the Financial Ombudsman Service"
  - NEW:

- **KEY** `terms › section3.body`
  - CURRENT: "Complaints about the arranged cover are handled by Provenance under its FCA permissions. Where a matter cannot be resolved, eligible complainants may refer it to the Financial Ombudsman Service. The full complaints procedure is issued by Provenance compliance."
  - NEW:

- **KEY** `terms › section4.title`
  - CURRENT: "How your information is handled"
  - NEW:

- **KEY** `terms › section4.body`
  - CURRENT: "Under the introducer arrangement, the House passes only the information you provide or ask it to pass, and only when you ask it to. What is passed, when, and on what basis is set out here in the wording Provenance compliance issues, and in the House privacy notice."
  - NEW:

### page:/insurance/thank-you — Thank you
<sub>source: src/app/insurance/thank-you/page.tsx</sub>
renders shared components: `<ThankYouConversion/>`, `<RenewalReminderForm/>`

- **KEY** `thank-you › meta.title`
  - CURRENT: "Thank you"
  - NEW:

- **KEY** `thank-you › hero.eyebrow`
  - CURRENT: "Received"
  - NEW:

- **KEY** `thank-you › hero.heading` ("And remembered." rendered italic)
  - CURRENT: "Covered. And remembered."
  - NEW:

- **KEY** `thank-you › hero.body` ("Provenance" rendered bold)
  - CURRENT: "Thank you. A specialist will be in touch to talk it through. The call will come from Provenance, the firm that arranges the cover, not from the House itself, so if an unfamiliar name rings, that is who it is."
  - NEW:

- **KEY** `thank-you › hero.body2`
  - CURRENT: "There is nothing you need to do in the meantime. No forms, no documents, no rush."
  - NEW:

- **KEY** `thank-you › renewal.eyebrow`
  - CURRENT: "While you are here"
  - NEW:

- **KEY** `thank-you › renewal.heading`
  - CURRENT: "Set a reminder for your renewal."
  - NEW:

- **KEY** `thank-you › renewal.body`
  - CURRENT: "If you told us your renewal month already, you are set. If not, one line here means we can write at the right moment next year."
  - NEW:

- **KEY** `thank-you › hearthLink` ("Read something from the Hearth" links to /the-hearth; "while you wait." trails outside the link)
  - CURRENT: "Read something from the Hearth while you wait."
  - NEW:

---

# Part 2 — Data-driven pages

Copy from `src/lib/insurance/*.ts`. Each `### ARRAY → slug` heading is one page; each KEY path (`hero.heading`, `whyDifferent.body[0]`, `detail.points[1].p`) is the exact field. Reminder: `*_SPECIALIST_PAGES` = full page copy; `EVERYDAY_PAGES` / `BUSINESS_PAGES` = shorter hub-card copy for the same slugs.


### `BUSINESS_SPECIALIST_PAGES` → `business` — Business insurance
<sub>source: src/lib/insurance/specialist-pages.ts · BUSINESS_SPECIALIST_PAGES[slug="business"]</sub>

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › title`
  - CURRENT: "Business insurance"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › metaTitle`
  - CURRENT: "Business insurance broker introductions"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › metaDescription`
  - CURRENT: "Warm B2B insurance introductions for the House's contractor, supplier and member network. A free silent review of existing cover. Introduced by the House, arranged by Provenance."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › hero.eyebrow`
  - CURRENT: "Business"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › hero.heading`
  - CURRENT: "The cover a working business needs, without the aggregator guesswork."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › hero.lede`
  - CURRENT: "Brokers hold most of the UK commercial market for a reason: business risk does not fit a comparison form. These are introductions through a network the House already knows and trusts."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › whyDifferent.heading`
  - CURRENT: "Who this is for"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › whyDifferent.body[0]`
  - CURRENT: "The House's contractor and supplier network, members running their own businesses, and the House's own operating companies."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › whyDifferent.body[1]`
  - CURRENT: "If you already work with the House, you are a known quantity, which is the strongest starting point a specialist broker can have."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › differenceIntro`
  - CURRENT: "Business risk is the one thing a comparison form genuinely cannot price. A broker reads the actual exposure of the actual business."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › readiness[0].h`
  - CURRENT: "What the business does"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › readiness[0].p`
  - CURRENT: "The real activities, sites and headcount, not a category code."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › readiness[1].h`
  - CURRENT: "The liabilities"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › readiness[1].p`
  - CURRENT: "Public, employers' and product liability, sized to the work."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › readiness[2].h`
  - CURRENT: "The moving parts"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › readiness[2].p`
  - CURRENT: "Tools, stock, fleet, premises and cyber, wherever the exposure sits."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › readiness[3].h`
  - CURRENT: "What is already held"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › readiness[3].p`
  - CURRENT: "The cover in place today, reviewed for gaps and overlaps."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › detail.title`
  - CURRENT: "A free review of the cover you hold"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › detail.points[0].h`
  - CURRENT: "A free review of what you hold"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › detail.points[0].p`
  - CURRENT: "Provenance will review your existing arrangements and identify gaps, underinsurance and where the premium can be benchmarked. No obligation, and nothing changes unless you decide it should."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › detail.points[1].h`
  - CURRENT: "Built for relationships, not rate"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › detail.points[1].p`
  - CURRENT: "The UK commercial market is soft, so this is built for a lasting relationship rather than a one-off saving. That is the honest position."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › detail.points[2].h`
  - CURRENT: "One conversation across the estate"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › detail.points[2].p`
  - CURRENT: "Where a member's home and business both need cover, they can sit with one adviser rather than two."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › placed.heading`
  - CURRENT: "What Provenance can place"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › placed.body`
  - CURRENT: "Business combined, professional indemnity, directors' and officers', property owners, fleet from two vehicles, motor trade and cyber. The House introduces you; Provenance arranges and administers the cover."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › crossLinks[0].label`
  - CURRENT: "Trades & contractors"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › crossLinks[1].label`
  - CURRENT: "Professional indemnity"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › heroCta`
  - CURRENT: "Request a review"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › enquiry.eyebrow`
  - CURRENT: "Request a review"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › enquiry.heading`
  - CURRENT: "A free review, not a hard sell."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › enquiry.body`
  - CURRENT: "Leave your details and a specialist will call to arrange a free, no-obligation review of the cover you already hold. We ask only what we need to make the introduction; the detail belongs on your first call with Provenance."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/business › enquiry.submitLabel`
  - CURRENT: "Request a review"
  - NEW:


### `BUSINESS_SPECIALIST_PAGES` → `trades-and-contractors` — Trades and contractors
<sub>source: src/lib/insurance/specialist-pages.ts · BUSINESS_SPECIALIST_PAGES[slug="trades-and-contractors"]</sub>

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › title`
  - CURRENT: "Trades and contractors"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › metaTitle`
  - CURRENT: "Tradesman and contractor insurance"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › metaDescription`
  - CURRENT: "Public and employers' liability, tools, contract works and professional indemnity for trades and contractors. The House's own supply chain. Introduced by the House, arranged by Provenance."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › hero.eyebrow`
  - CURRENT: "Business"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › hero.heading`
  - CURRENT: "Being properly insured and being House Approved are the same conversation."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › hero.lede`
  - CURRENT: "Construction is the largest single sector of UK small business, and these are the trades the House already works with, which makes the introduction a natural one."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › whyDifferent.heading`
  - CURRENT: "What a trade actually needs"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › whyDifferent.body[0]`
  - CURRENT: "Public and employers' liability, tools cover, contract works, and professional indemnity where design is part of the job. A specialist puts the right combination together rather than a one-size policy."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › whyDifferent.body[1]`
  - CURRENT: "For anyone on, or applying to, the House Approved list, this is the same standard-and-cover conversation."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › differenceIntro`
  - CURRENT: "A trade's risk changes with every job, site and hire. A comparison form prices a category; a specialist prices the work."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › readiness[0].h`
  - CURRENT: "The work"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › readiness[0].p`
  - CURRENT: "The trades carried out, and the sites and clients they are done for."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › readiness[1].h`
  - CURRENT: "Liability limits"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › readiness[1].p`
  - CURRENT: "Public and employers' liability set against real jobs and headcount."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › readiness[2].h`
  - CURRENT: "Tools and works"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › readiness[2].p`
  - CURRENT: "The tools that earn the living, and the contract works while live."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › readiness[3].h`
  - CURRENT: "Design exposure"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › readiness[3].p`
  - CURRENT: "Professional indemnity where any design or specification is involved."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › detail.title`
  - CURRENT: "The detail"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › detail.points[0].h`
  - CURRENT: "Liability, sized to the work"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › detail.points[0].p`
  - CURRENT: "Public and employers' liability limits are set against the actual jobs, sites and headcount, not a default figure."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › detail.points[1].h`
  - CURRENT: "Tools and contract works"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › detail.points[1].p`
  - CURRENT: "Cover for the tools that earn the living, and for the works themselves while a project is live."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › detail.points[2].h`
  - CURRENT: "Indicative premiums"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › detail.points[2].p`
  - CURRENT: "Tradesperson cover typically runs around £360 to £540 a year. Figures are indicative and confirmed case by case, pending Provenance sign-off."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › placed.heading`
  - CURRENT: "What Provenance can place"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › placed.body`
  - CURRENT: "Liability, tools, contract works, professional indemnity and the wider commercial combined cover a trade needs. The House introduces you; Provenance arranges and administers the cover."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › crossLinks[0].label`
  - CURRENT: "Professional indemnity"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › crossLinks[1].label`
  - CURRENT: "Business insurance overview"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › heroCta`
  - CURRENT: "Request a review"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › enquiry.eyebrow`
  - CURRENT: "Request a review"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › enquiry.heading`
  - CURRENT: "A free review, not a hard sell."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › enquiry.body`
  - CURRENT: "Leave your details and a specialist will call to arrange a free, no-obligation review of the cover you already hold. We ask only what we need to make the introduction; the detail belongs on your first call with Provenance."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/trades-and-contractors › enquiry.submitLabel`
  - CURRENT: "Request a review"
  - NEW:


### `BUSINESS_SPECIALIST_PAGES` → `professional-indemnity` — Professional indemnity
<sub>source: src/lib/insurance/specialist-pages.ts · BUSINESS_SPECIALIST_PAGES[slug="professional-indemnity"]</sub>

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › title`
  - CURRENT: "Professional indemnity"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › metaTitle`
  - CURRENT: "Professional indemnity insurance"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › metaDescription`
  - CURRENT: "Professional indemnity for architects, designers, surveyors and consultants, with limits set against real exposure. Introduced by the House, arranged by Provenance."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › hero.eyebrow`
  - CURRENT: "Business"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › hero.heading`
  - CURRENT: "Cover for advice given, sized to the exposure that actually exists."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › hero.lede`
  - CURRENT: "Architects, designers, surveyors and consultants: exactly the professional network around a home-management business, and exactly where a standard limit is often the wrong one."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › whyDifferent.heading`
  - CURRENT: "Who it is for"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › whyDifferent.body[0]`
  - CURRENT: "The professions whose advice, drawings and specifications carry liability long after the job is done."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › whyDifferent.body[1]`
  - CURRENT: "Provenance sets the limit against real exposure rather than a round number, which is where most policies are quietly wrong."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › differenceIntro`
  - CURRENT: "Professional indemnity is priced on advice and exposure, not a postcode. The right limit is a function of the work, never a round number."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › readiness[0].h`
  - CURRENT: "The advice given"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › readiness[0].p`
  - CURRENT: "The drawings, specifications and consultancy the practice is liable for."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › readiness[1].h`
  - CURRENT: "The right limit"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › readiness[1].p`
  - CURRENT: "Set against real exposure, contracts and clients, not a default figure."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › readiness[2].h`
  - CURRENT: "Design and construct"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › readiness[2].p`
  - CURRENT: "Where designing and building overlap, and liability quietly grows."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › readiness[3].h`
  - CURRENT: "Claims-made cover"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › readiness[3].p`
  - CURRENT: "Continuity across renewals, because gaps in cover bite later."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › detail.title`
  - CURRENT: "The detail"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › detail.points[0].h`
  - CURRENT: "Limits against exposure"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › detail.points[0].p`
  - CURRENT: "How much cover is enough is a function of the work, the contracts and the clients, not a standard figure pulled from a table."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › detail.points[1].h`
  - CURRENT: "The design-and-construct trap"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › detail.points[1].p`
  - CURRENT: "The overlap between designing and building catches architects out. A specialist reads where the liability actually sits."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › detail.points[2].h`
  - CURRENT: "Renewal continuity"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › detail.points[2].p`
  - CURRENT: "Professional indemnity is claims-made, so continuity of cover matters. It is worth reviewing before, not at, renewal."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › placed.heading`
  - CURRENT: "What Provenance can place"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › placed.body`
  - CURRENT: "Professional indemnity across the built-environment and consulting professions, alongside the wider business cover a practice needs. The House introduces you; Provenance arranges and administers the cover."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › crossLinks[0].label`
  - CURRENT: "Trades & contractors"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › crossLinks[1].label`
  - CURRENT: "Business insurance overview"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › heroCta`
  - CURRENT: "Request a review"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › enquiry.eyebrow`
  - CURRENT: "Request a review"
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › enquiry.heading`
  - CURRENT: "A free review, not a hard sell."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › enquiry.body`
  - CURRENT: "Leave your details and a specialist will call to arrange a free, no-obligation review of the cover you already hold. We ask only what we need to make the introduction; the detail belongs on your first call with Provenance."
  - NEW:

- **KEY** `BUSINESS_SPECIALIST_PAGES/professional-indemnity › enquiry.submitLabel`
  - CURRENT: "Request a review"
  - NEW:


### `DEFAULT_LIMITATIONS` (shared default)
<sub>source: src/lib/insurance/specialist-pages.ts · DEFAULT_LIMITATIONS</sub>

- **KEY** `DEFAULT_LIMITATIONS › heading`
  - CURRENT: "What is not covered, and what to check"
  - NEW:

- **KEY** `DEFAULT_LIMITATIONS › intro`
  - CURRENT: "Every policy has limits and exclusions, and this is a general guide rather than the policy itself. The cover, its limits and its exclusions are set out in the policy wording, which is what to read before you rely on any of it."
  - NEW:

- **KEY** `DEFAULT_LIMITATIONS › points[0].h`
  - CURRENT: "Wear, tear and gradual damage"
  - NEW:

- **KEY** `DEFAULT_LIMITATIONS › points[0].p`
  - CURRENT: "Ordinary ageing, gradual deterioration and a lack of maintenance are not insured events. Cover is for sudden and unforeseen loss, not upkeep."
  - NEW:

- **KEY** `DEFAULT_LIMITATIONS › points[1].h`
  - CURRENT: "Anything already known"
  - NEW:

- **KEY** `DEFAULT_LIMITATIONS › points[1].p`
  - CURRENT: "A loss, fault or condition that already exists, or that you are aware of when cover starts, is not picked up by a new policy."
  - NEW:

- **KEY** `DEFAULT_LIMITATIONS › points[2].h`
  - CURRENT: "Under-insurance"
  - NEW:

- **KEY** `DEFAULT_LIMITATIONS › points[2].p`
  - CURRENT: "If the sum insured is set too low, a claim can be reduced in proportion. Setting the rebuild figure and contents value correctly is what keeps a policy honest."
  - NEW:

- **KEY** `DEFAULT_LIMITATIONS › points[3].h`
  - CURRENT: "Limits and excesses"
  - NEW:

- **KEY** `DEFAULT_LIMITATIONS › points[3].p`
  - CURRENT: "Section limits, single-item limits and the excess all shape what is actually paid. High-value items usually need listing separately to be covered in full."
  - NEW:

- **KEY** `DEFAULT_LIMITATIONS › points[4].h`
  - CURRENT: "The House does not advise"
  - NEW:

- **KEY** `DEFAULT_LIMITATIONS › points[4].p`
  - CURRENT: "The House introduces you to Provenance and does not advise on, arrange or decide your cover. The terms that bind are the ones in the policy documents, agreed with Provenance."
  - NEW:

- **KEY** `DEFAULT_LIMITATIONS › note`
  - CURRENT: "The policy wording, key facts and exclusions are provided by Provenance before you commit to anything."
  - NEW:


### `EVERYDAY_SPECIALIST_PAGES` → `home` — Home insurance
<sub>source: src/lib/insurance/specialist-pages.ts · EVERYDAY_SPECIALIST_PAGES[slug="home"]</sub>

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › title`
  - CURRENT: "Home insurance"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › metaTitle`
  - CURRENT: "Home insurance"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › metaDescription`
  - CURRENT: "Straightforward buildings and contents cover, introduced by the House and arranged by Provenance. Period and high-value homes are routed to the advised service."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › hero.eyebrow`
  - CURRENT: "Everyday cover"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › hero.heading`
  - CURRENT: "Home insurance, for a standard home."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › hero.lede`
  - CURRENT: "For a straightforward house or flat, cover built around what the home actually is. The House introduces you; Provenance arranges the policy."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › whyDifferent.heading`
  - CURRENT: "Cover built on the home, not a postcode"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › whyDifferent.body[0]`
  - CURRENT: "Most home cover is priced from a postcode and a short set of tick-boxes, then sold on price. It works, until a claim finds the gap between what was assumed and what is true."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › whyDifferent.body[1]`
  - CURRENT: "A short conversation sets the buildings and contents at the right level, and flags the add-ons worth having before they are needed rather than after."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › differenceIntro`
  - CURRENT: "Even a standard home is priced by most insurers from a postcode and a few boxes. A short conversation catches the things a form skips."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › readiness[0].h`
  - CURRENT: "Buildings or contents"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › readiness[0].p`
  - CURRENT: "What needs covering: the structure, what is inside, or both."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › readiness[1].h`
  - CURRENT: "The rebuild figure"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › readiness[1].p`
  - CURRENT: "What it would cost to rebuild, which is not the market value."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › readiness[2].h`
  - CURRENT: "The everyday risks"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › readiness[2].p`
  - CURRENT: "Escape of water, accidental damage and the add-ons worth having."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › readiness[3].h`
  - CURRENT: "How it is lived in"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › readiness[3].p`
  - CURRENT: "How the home is used day to day, which quietly changes the cover."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › detail.title`
  - CURRENT: "What is covered"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › detail.points[0].h`
  - CURRENT: "Buildings"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › detail.points[0].p`
  - CURRENT: "Cover for the structure of the home itself."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › detail.points[1].h`
  - CURRENT: "Contents"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › detail.points[1].p`
  - CURRENT: "Cover for what is inside, set at a level that fits."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › detail.points[2].h`
  - CURRENT: "Sensible add-ons"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › detail.points[2].p`
  - CURRENT: "Accidental damage and similar, added only where they earn their place."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › placed.heading`
  - CURRENT: "What Provenance can place"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › placed.body`
  - CURRENT: "Provenance arranges straightforward buildings and contents cover, and can route a period, listed or high-value home to the advised service where that fits better. The House introduces you; Provenance arranges and administers the cover."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › limitations.heading`
  - CURRENT: "What home cover does not include"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › limitations.intro`
  - CURRENT: "Even straightforward home cover has limits and exclusions. These are the usual ones; the policy wording governs."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › limitations.points[0].h`
  - CURRENT: "Wear, tear and gradual damage"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › limitations.points[0].p`
  - CURRENT: "Ordinary ageing, damp, and slow leaks that build up over time are maintenance matters rather than insured events."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › limitations.points[1].h`
  - CURRENT: "Under-insurance"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › limitations.points[1].p`
  - CURRENT: "Set the rebuild figure or contents value too low and a claim can be reduced in proportion. The rebuild figure is not the market value."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › limitations.points[2].h`
  - CURRENT: "Single-item and valuables limits"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › limitations.points[2].p`
  - CURRENT: "High-value items above the single-article limit need listing separately, and some are only covered away from home if specified."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › limitations.points[3].h`
  - CURRENT: "Not advice"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › limitations.points[3].p`
  - CURRENT: "The House introduces you to Provenance and does not advise on cover. Limits and exclusions are set out in the policy documents."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › limitations.note`
  - CURRENT: "The policy wording and exclusions come from Provenance before you commit."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › crossLinks[0].label`
  - CURRENT: "A period or listed home? Speak to a specialist"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › relatedCovers.title`
  - CURRENT: "Explore everyday cover"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › relatedCovers.items[0].name`
  - CURRENT: "Home"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › relatedCovers.items[0].body`
  - CURRENT: "Buildings and contents."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › relatedCovers.items[1].name`
  - CURRENT: "Car, van & motorbike"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › relatedCovers.items[1].body`
  - CURRENT: "Including temporary cover."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › relatedCovers.items[2].name`
  - CURRENT: "Pet & travel"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › relatedCovers.items[2].body`
  - CURRENT: "Pet, and single or annual travel."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › relatedCovers.items[3].name`
  - CURRENT: "Breakdown & bicycle"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/home › relatedCovers.items[3].body`
  - CURRENT: "Roadside, and bicycle cover."
  - NEW:


### `EVERYDAY_SPECIALIST_PAGES` → `motor` — Car, van and motorbike
<sub>source: src/lib/insurance/specialist-pages.ts · EVERYDAY_SPECIALIST_PAGES[slug="motor"]</sub>

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › title`
  - CURRENT: "Car, van and motorbike"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › metaTitle`
  - CURRENT: "Car, van and motorbike insurance"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › metaDescription`
  - CURRENT: "Everyday motor cover for car, van and motorbike, plus temporary cover from one hour to 28 days. Introduced by the House, arranged by Provenance."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › hero.eyebrow`
  - CURRENT: "Everyday cover"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › hero.heading`
  - CURRENT: "Car, van and motorbike."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › hero.lede`
  - CURRENT: "Everyday motor cover in one place, including the temporary cover that is genuinely useful and rarely marketed."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › whyDifferent.heading`
  - CURRENT: "Cover that fits how you actually drive"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › whyDifferent.body[0]`
  - CURRENT: "A comparison engine prices the vehicle and the postcode. It rarely asks how the car is used, who else drives it, or whether a short temporary policy would do the job better."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › whyDifferent.body[1]`
  - CURRENT: "Everyday motor is quick to arrange, and a short conversation keeps the level of cover and the extras honest."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › differenceIntro`
  - CURRENT: "Most motor quotes are priced off a table and a registration. A short conversation makes sure the cover fits how the vehicle is actually used."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › readiness[0].h`
  - CURRENT: "Car, van or bike"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › readiness[0].p`
  - CURRENT: "The vehicle and the class of use, priced on the real risk."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › readiness[1].h`
  - CURRENT: "Level of cover"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › readiness[1].p`
  - CURRENT: "Third-party, third-party fire and theft, or comprehensive."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › readiness[2].h`
  - CURRENT: "Temporary needs"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › readiness[2].p`
  - CURRENT: "Cover from one hour to 28 days, for borrowing or lending."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › readiness[3].h`
  - CURRENT: "Extras worth having"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › readiness[3].p`
  - CURRENT: "Breakdown, legal and key cover, added only where useful."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › detail.title`
  - CURRENT: "What can be arranged"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › detail.points[0].h`
  - CURRENT: "Car"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › detail.points[0].p`
  - CURRENT: "Standard private car cover."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › detail.points[1].h`
  - CURRENT: "Van and motorbike"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › detail.points[1].p`
  - CURRENT: "Private and light-commercial van use, and bikes and scooters."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › detail.points[2].h`
  - CURRENT: "Temporary cover"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › detail.points[2].p`
  - CURRENT: "From one hour to 28 days, for borrowing, lending or a short need."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › placed.heading`
  - CURRENT: "What Provenance can place"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › placed.body`
  - CURRENT: "Provenance arranges everyday motor cover across car, van, motorbike and temporary use. The House introduces you; Provenance arranges and administers the cover."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › limitations.heading`
  - CURRENT: "What motor cover does not include"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › limitations.intro`
  - CURRENT: "Everyday motor cover is quick to arrange, and its limits are the standard ones. The policy wording governs."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › limitations.points[0].h`
  - CURRENT: "Wear and mechanical breakdown"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › limitations.points[0].p`
  - CURRENT: "General wear, servicing and mechanical breakdown are not part of a motor policy unless breakdown cover is added separately."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › limitations.points[1].h`
  - CURRENT: "The wrong class of use"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › limitations.points[1].p`
  - CURRENT: "Using a car for business or hire when it is insured for social use, or the wrong named drivers, can leave a claim unpaid."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › limitations.points[2].h`
  - CURRENT: "Excess and modifications"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › limitations.points[2].p`
  - CURRENT: "The excess applies to each claim, and undeclared modifications can affect cover. Both are worth confirming up front."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › limitations.points[3].h`
  - CURRENT: "Not advice"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › limitations.points[3].p`
  - CURRENT: "The House introduces you to Provenance and does not advise on cover. Limits and exclusions are set out in the policy documents."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › limitations.note`
  - CURRENT: "The policy wording and exclusions come from Provenance before you commit."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › crossLinks[0].label`
  - CURRENT: "A classic or prestige vehicle? Speak to a specialist"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › relatedCovers.title`
  - CURRENT: "Explore everyday cover"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › relatedCovers.items[0].name`
  - CURRENT: "Home"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › relatedCovers.items[0].body`
  - CURRENT: "Buildings and contents."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › relatedCovers.items[1].name`
  - CURRENT: "Car, van & motorbike"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › relatedCovers.items[1].body`
  - CURRENT: "Including temporary cover."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › relatedCovers.items[2].name`
  - CURRENT: "Pet & travel"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › relatedCovers.items[2].body`
  - CURRENT: "Pet, and single or annual travel."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › relatedCovers.items[3].name`
  - CURRENT: "Breakdown & bicycle"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/motor › relatedCovers.items[3].body`
  - CURRENT: "Roadside, and bicycle cover."
  - NEW:


### `EVERYDAY_SPECIALIST_PAGES` → `pet-and-travel` — Pet and travel
<sub>source: src/lib/insurance/specialist-pages.ts · EVERYDAY_SPECIALIST_PAGES[slug="pet-and-travel"]</sub>

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › title`
  - CURRENT: "Pet and travel"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › metaTitle`
  - CURRENT: "Pet and travel insurance"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › metaDescription`
  - CURRENT: "Pet cover, and single-trip or annual travel including specialist medical. Introduced by the House, arranged by Provenance."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › hero.eyebrow`
  - CURRENT: "Everyday cover"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › hero.heading`
  - CURRENT: "Pet and travel."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › hero.lede`
  - CURRENT: "Two low-fuss covers in one place, both built around the animal and the trip rather than a tick-box."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › whyDifferent.heading`
  - CURRENT: "Cover shaped by the animal and the trip"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › whyDifferent.body[0]`
  - CURRENT: "Pet and travel are the covers most often bought on price and regretted at claim time, usually over an excluded condition or a missing declaration."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › whyDifferent.body[1]`
  - CURRENT: "A short conversation gets the vet-bill level and the travel declarations right, so the cover holds when it is needed."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › differenceIntro`
  - CURRENT: "Most pet and travel cover is bought in a rush and the exclusions read later. A short conversation makes sure it fits the animal and the trip."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › readiness[0].h`
  - CURRENT: "The animal"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › readiness[0].p`
  - CURRENT: "The pet, its age and breed, and the vet-bill cover that suits."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › readiness[1].h`
  - CURRENT: "Existing conditions"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › readiness[1].p`
  - CURRENT: "Whether cover is needed where a condition already exists."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › readiness[2].h`
  - CURRENT: "One trip or many"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › readiness[2].p`
  - CURRENT: "Single-trip, or annual multi-trip for several journeys a year."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › readiness[3].h`
  - CURRENT: "Specialist medical"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › readiness[3].p`
  - CURRENT: "Travel cover where existing medical conditions need declaring."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › detail.title`
  - CURRENT: "What can be arranged"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › detail.points[0].h`
  - CURRENT: "Pet"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › detail.points[0].p`
  - CURRENT: "Cover for vet bills and the usual pet risks, for cats and dogs."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › detail.points[1].h`
  - CURRENT: "Travel"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › detail.points[1].p`
  - CURRENT: "Single-trip for one holiday, or annual multi-trip for several a year."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › detail.points[2].h`
  - CURRENT: "Specialist medical travel"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › detail.points[2].p`
  - CURRENT: "Where existing medical conditions need covering."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › placed.heading`
  - CURRENT: "What Provenance can place"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › placed.body`
  - CURRENT: "Provenance arranges pet cover and single-trip or annual travel, including specialist medical travel. The House introduces you; Provenance arranges and administers the cover."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › limitations.heading`
  - CURRENT: "What pet and travel cover does not include"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › limitations.intro`
  - CURRENT: "Pet and travel are the covers most often regretted at claim time, usually over an exclusion read too late. These are the usual ones; the policy wording governs."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › limitations.points[0].h`
  - CURRENT: "Pre-existing conditions"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › limitations.points[0].p`
  - CURRENT: "An illness or injury a pet already has, or has had, is typically excluded unless a specialist policy specifically takes it on."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › limitations.points[1].h`
  - CURRENT: "Undeclared medical history (travel)"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › limitations.points[1].p`
  - CURRENT: "Travel claims can fail where an existing medical condition was not declared. Specialist medical travel cover exists for exactly this."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › limitations.points[2].h`
  - CURRENT: "Time limits and excesses"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › limitations.points[2].p`
  - CURRENT: "Vet-fee cover can be capped per condition or per year, and both pet and travel policies carry an excess. Routine, preventive and cosmetic treatment is excluded."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › limitations.points[3].h`
  - CURRENT: "Not advice"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › limitations.points[3].p`
  - CURRENT: "The House introduces you to Provenance and does not advise on cover. Limits and exclusions are set out in the policy documents."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › limitations.note`
  - CURRENT: "The policy wording and exclusions come from Provenance before you commit."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › relatedCovers.title`
  - CURRENT: "Explore everyday cover"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › relatedCovers.items[0].name`
  - CURRENT: "Home"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › relatedCovers.items[0].body`
  - CURRENT: "Buildings and contents."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › relatedCovers.items[1].name`
  - CURRENT: "Car, van & motorbike"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › relatedCovers.items[1].body`
  - CURRENT: "Including temporary cover."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › relatedCovers.items[2].name`
  - CURRENT: "Pet & travel"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › relatedCovers.items[2].body`
  - CURRENT: "Pet, and single or annual travel."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › relatedCovers.items[3].name`
  - CURRENT: "Breakdown & bicycle"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/pet-and-travel › relatedCovers.items[3].body`
  - CURRENT: "Roadside, and bicycle cover."
  - NEW:


### `EVERYDAY_SPECIALIST_PAGES` → `breakdown-and-bicycle` — Breakdown and bicycle
<sub>source: src/lib/insurance/specialist-pages.ts · EVERYDAY_SPECIALIST_PAGES[slug="breakdown-and-bicycle"]</sub>

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › title`
  - CURRENT: "Breakdown and bicycle"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › metaTitle`
  - CURRENT: "Breakdown and bicycle cover"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › metaDescription`
  - CURRENT: "Roadside, recovery and home-start breakdown cover, and cover for road, mountain, electric and high-value bicycles. Introduced by the House, arranged by Provenance."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › hero.eyebrow`
  - CURRENT: "Everyday cover"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › hero.heading`
  - CURRENT: "Breakdown and bicycle."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › hero.lede`
  - CURRENT: "The smaller everyday covers, arranged simply and set at the level that fits how you travel."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › whyDifferent.heading`
  - CURRENT: "Small covers, set at the right level"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › whyDifferent.body[0]`
  - CURRENT: "Breakdown and bicycle cover are cheap enough that most people pick a default and move on, then find the level does not match how they actually travel."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › whyDifferent.body[1]`
  - CURRENT: "A short conversation matches the breakdown tier and the bicycle value to real use, so the cover is neither thin nor wasteful."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › differenceIntro`
  - CURRENT: "The smaller covers are the easiest to buy badly. A short conversation makes sure the level fits how you travel."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › readiness[0].h`
  - CURRENT: "Level of breakdown"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › readiness[0].p`
  - CURRENT: "Roadside, recovery and home start, matched to how far you go."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › readiness[1].h`
  - CURRENT: "Where you break down"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › readiness[1].p`
  - CURRENT: "At home, roadside or national recovery, priced accordingly."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › readiness[2].h`
  - CURRENT: "The bike"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › readiness[2].p`
  - CURRENT: "Road, mountain, electric or high-value, each a different figure."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › readiness[3].h`
  - CURRENT: "Away from home"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › readiness[3].p`
  - CURRENT: "Whether the bike is covered away from home and in transit."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › detail.title`
  - CURRENT: "What can be arranged"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › detail.points[0].h`
  - CURRENT: "Breakdown"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › detail.points[0].p`
  - CURRENT: "Roadside assistance, recovery and home start."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › detail.points[1].h`
  - CURRENT: "Bicycle"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › detail.points[1].p`
  - CURRENT: "Road, mountain, electric and high-value bikes."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › detail.points[2].h`
  - CURRENT: "The right level"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › detail.points[2].p`
  - CURRENT: "Matched to how far and how often you travel, rather than a default."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › placed.heading`
  - CURRENT: "What Provenance can place"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › placed.body`
  - CURRENT: "Provenance arranges breakdown cover and bicycle cover across the full range of bikes. The House introduces you; Provenance arranges and administers the cover."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › limitations.heading`
  - CURRENT: "What breakdown and bicycle cover does not include"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › limitations.intro`
  - CURRENT: "The smaller covers are the easiest to buy badly, and their limits are where that shows. The policy wording governs."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › limitations.points[0].h`
  - CURRENT: "The level you chose"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › limitations.points[0].p`
  - CURRENT: "Roadside-only cover does not include recovery or home start, and callouts beyond the policy limit are charged. The tier needs to match how far you travel."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › limitations.points[1].h`
  - CURRENT: "Pre-existing faults"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › limitations.points[1].p`
  - CURRENT: "A known fault, or a vehicle already broken down when cover starts, is not covered."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › limitations.points[2].h`
  - CURRENT: "Bicycle limits and security"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › limitations.points[2].p`
  - CURRENT: "Bike cover is capped to the sum insured and often requires an approved lock. Theft when a bike is left unsecured, and general wear, are excluded."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › limitations.points[3].h`
  - CURRENT: "Not advice"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › limitations.points[3].p`
  - CURRENT: "The House introduces you to Provenance and does not advise on cover. Limits and exclusions are set out in the policy documents."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › limitations.note`
  - CURRENT: "The policy wording and exclusions come from Provenance before you commit."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › relatedCovers.title`
  - CURRENT: "Explore everyday cover"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › relatedCovers.items[0].name`
  - CURRENT: "Home"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › relatedCovers.items[0].body`
  - CURRENT: "Buildings and contents."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › relatedCovers.items[1].name`
  - CURRENT: "Car, van & motorbike"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › relatedCovers.items[1].body`
  - CURRENT: "Including temporary cover."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › relatedCovers.items[2].name`
  - CURRENT: "Pet & travel"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › relatedCovers.items[2].body`
  - CURRENT: "Pet, and single or annual travel."
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › relatedCovers.items[3].name`
  - CURRENT: "Breakdown & bicycle"
  - NEW:

- **KEY** `EVERYDAY_SPECIALIST_PAGES/breakdown-and-bicycle › relatedCovers.items[3].body`
  - CURRENT: "Roadside, and bicycle cover."
  - NEW:


### `SPECIALIST_PAGES` → `listed-buildings` — Listed building insurance
<sub>source: src/lib/insurance/specialist-pages.ts · SPECIALIST_PAGES[slug="listed-buildings"]</sub>

- **KEY** `SPECIALIST_PAGES/listed-buildings › title`
  - CURRENT: "Listed building insurance"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › metaTitle`
  - CURRENT: "Listed building insurance"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › metaDescription`
  - CURRENT: "Cover for Grade II, II* and I listed homes, built around like-for-like reinstatement and a rebuild cost that bears no relation to market value. Arranged by Provenance; introduced by the House."
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › hero.eyebrow`
  - CURRENT: "Specialist property"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › hero.heading`
  - CURRENT: "A listed home is a different risk. It should be insured like one."
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › hero.lede`
  - CURRENT: "Listed buildings are repaired with original materials and methods, under consent constraints, by specialist trades. A standard policy priced off a table rarely reflects that. There are 379,580 listed buildings in England, and most are not insured for what it would truly cost to put them back."
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › whyDifferent.heading`
  - CURRENT: "Why a listed building is a different risk"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › whyDifferent.body[0]`
  - CURRENT: "After a loss, a listed building must be reinstated like for like: the same stone, the same lime, the same joinery, done by trades who work to conservation standards and often under listed building consent. That is slower and dearer than a modern rebuild, and it is why the rebuild cost bears no relation to the market value."
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › whyDifferent.body[1]`
  - CURRENT: "Index-linking, the mechanism most policies use to keep pace, tends to run below actual reinstatement for heritage fabric. Listed and high-value homes are named among the categories worst affected by underinsurance."
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › detail.title`
  - CURRENT: "What changes with the grade"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › detail.points[0].h`
  - CURRENT: "The grades"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › detail.points[0].p`
  - CURRENT: "Grade II, Grade II* and Grade I each carry different repair obligations, and the premium reflects that. Listed property typically costs more than an equivalent unlisted home; the higher grades more so again. Figures are indicative and confirmed case by case."
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › detail.points[1].h`
  - CURRENT: "The rebuild assessment"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › detail.points[1].p`
  - CURRENT: "Because a listed rebuild cannot be estimated from a table, a proper reinstatement assessment is worth commissioning. The House can help you commission one; it is exactly what a heritage underwriter wants to see."
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › detail.points[2].h`
  - CURRENT: "The underinsurance trap"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › detail.points[2].p`
  - CURRENT: "Reinstatement for listed fabric can outrun index-linked cover by a meaningful margin. The point of the review is to find that gap before a claim does."
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › placed.heading`
  - CURRENT: "What Provenance can place"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › placed.body`
  - CURRENT: "Provenance works with the specialist markets that underwrite heritage risk, so a listed home can sit within one arranged policy alongside contents, outbuildings and, where relevant, the rest of the estate. The House introduces you; Provenance arranges and administers the cover."
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › evidence[0].stat`
  - CURRENT: "379,580"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › evidence[0].label`
  - CURRENT: "listed buildings in England"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › evidence[1].stat`
  - CURRENT: "Rebuild cost"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › evidence[1].label`
  - CURRENT: "is what it costs to put a listed home back, not its market value"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › evidence[2].stat`
  - CURRENT: "Heritage fabric"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › evidence[2].label`
  - CURRENT: "costs more to reinstate than a standard rebuild table assumes"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › crossLinks[0].label`
  - CURRENT: "Thatched property insurance"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › crossLinks[1].label`
  - CURRENT: "Guide: insuring a listed building"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › limitations.heading`
  - CURRENT: "What listed cover does not stretch to"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › limitations.intro`
  - CURRENT: "Heritage cover is broad, but it is not unconditional. These are the usual limits; the policy wording is what governs any claim."
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › limitations.points[0].h`
  - CURRENT: "The rebuild figure you give"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › limitations.points[0].p`
  - CURRENT: "Cover follows the reinstatement sum insured. Set it below the true cost of a like-for-like heritage rebuild and a claim can be cut in proportion, which is exactly the trap a proper assessment avoids."
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › limitations.points[1].h`
  - CURRENT: "Gradual decay and known defects"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › limitations.points[1].p`
  - CURRENT: "Rot, damp, movement and deterioration that build up over time, or a defect already known, are maintenance matters rather than insured events."
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › limitations.points[2].h`
  - CURRENT: "Consent and unapproved work"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › limitations.points[2].p`
  - CURRENT: "Work carried out without listed building consent, or repairs done in the wrong materials, can affect a claim. Cover assumes the building is kept lawfully and properly."
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › limitations.points[3].h`
  - CURRENT: "Not advice"
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › limitations.points[3].p`
  - CURRENT: "The House introduces you to Provenance and does not advise on cover. Grades, limits and exclusions are set out in the policy documents."
  - NEW:

- **KEY** `SPECIALIST_PAGES/listed-buildings › limitations.note`
  - CURRENT: "The policy wording and exclusions come from Provenance before you commit."
  - NEW:


### `SPECIALIST_PAGES` → `thatched-properties` — Thatched property insurance
<sub>source: src/lib/insurance/specialist-pages.ts · SPECIALIST_PAGES[slug="thatched-properties"]</sub>

- **KEY** `SPECIALIST_PAGES/thatched-properties › title`
  - CURRENT: "Thatched property insurance"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › metaTitle`
  - CURRENT: "Thatched property insurance"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › metaDescription`
  - CURRENT: "Cover for thatched homes, built around the real risk factors underwriters look at. Around three-quarters are also listed. Arranged by Provenance; introduced by the House."
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › hero.eyebrow`
  - CURRENT: "Specialist property"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › hero.heading`
  - CURRENT: "Thatch is a specialist risk, and it should be underwritten by someone who understands it."
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › hero.lede`
  - CURRENT: "There are around 60,000 thatched properties in Britain, and roughly three-quarters are also listed. Standard insurers often decline thatch or load it heavily. A specialist reads the actual risk instead."
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › differenceIntro`
  - CURRENT: "Most insurers see the word 'thatch' and either decline it or load it. The House introduces you to a specialist who asks the questions that actually price the risk."
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › readiness[0].h`
  - CURRENT: "The thatch"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › readiness[0].p`
  - CURRENT: "Its type, age and condition, and when it was last re-ridged."
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › readiness[1].h`
  - CURRENT: "The chimney"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › readiness[1].p`
  - CURRENT: "Any wood-burner, its lining and a spark arrestor."
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › readiness[2].h`
  - CURRENT: "Sweeping records"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › readiness[2].p`
  - CURRENT: "How often the chimney is swept, which underwriters weigh directly."
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › readiness[3].h`
  - CURRENT: "The electrics"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › readiness[3].p`
  - CURRENT: "An up-to-date inspection, the other common source of fire risk."
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › whyDifferent.heading`
  - CURRENT: "What underwriters actually look at"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › whyDifferent.body[0]`
  - CURRENT: "The concern with thatch is fire, and the questions that follow are specific: the chimney and any wood-burner, the presence of a lining and spark arrestor, sweeping records, an up-to-date electrical inspection, and the type and age of the thatch itself."
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › whyDifferent.body[1]`
  - CURRENT: "Documenting exactly these things is what can turn a risk a standard insurer declines into one a specialist will cover."
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › detail.title`
  - CURRENT: "The reality of insuring thatch"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › detail.points[0].h`
  - CURRENT: "The risk factors"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › detail.points[0].p`
  - CURRENT: "Lining, spark arrestors, sweeping frequency and electrical safety are what a specialist underwriter weighs. Documented maintenance is directly relevant to the terms offered."
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › detail.points[1].h`
  - CURRENT: "Premium reality"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › detail.points[1].p`
  - CURRENT: "Thatch typically adds to a household premium, and because most thatched homes are also listed, the two effects compound. Ranges are indicative and settled case by case."
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › detail.points[2].h`
  - CURRENT: "Fire, discussed plainly"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › detail.points[2].p`
  - CURRENT: "Fire is a factual underwriting matter, not a fear. No disaster imagery, no pressure."
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › placed.heading`
  - CURRENT: "What Provenance can place"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › placed.body`
  - CURRENT: "Provenance works with markets that understand thatch and heritage construction, so the roof, the building and its contents sit within one arranged policy. The House introduces you; Provenance arranges and administers the cover."
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › evidence[0].stat`
  - CURRENT: "~60,000"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › evidence[0].label`
  - CURRENT: "thatched properties in Britain"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › evidence[1].stat`
  - CURRENT: "~75%"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › evidence[1].label`
  - CURRENT: "of them also listed"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › crossLinks[0].label`
  - CURRENT: "Listed building insurance"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › limitations.heading`
  - CURRENT: "What thatch cover depends on"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › limitations.intro`
  - CURRENT: "A specialist will cover thatch, but the terms rest on how the fire risk is managed. These are the usual conditions and limits; the policy wording governs."
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › limitations.points[0].h`
  - CURRENT: "Sweeping and maintenance conditions"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › limitations.points[0].p`
  - CURRENT: "Cover typically requires the chimney swept to a stated frequency and the thatch kept in good order. Miss the conditions and a fire claim can be affected."
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › limitations.points[1].h`
  - CURRENT: "The chimney and wood-burner"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › limitations.points[1].p`
  - CURRENT: "An unlined flue, a missing spark arrestor or an unsafe wood-burner sit outside what an underwriter will accept, and can void a claim."
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › limitations.points[2].h`
  - CURRENT: "Electrics and known defects"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › limitations.points[2].p`
  - CURRENT: "An out-of-date electrical inspection, or a defect already known, is a maintenance matter rather than an insured event."
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › limitations.points[3].h`
  - CURRENT: "Not advice"
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › limitations.points[3].p`
  - CURRENT: "The House introduces you to Provenance and does not advise on cover. Limits and exclusions are set out in the policy documents."
  - NEW:

- **KEY** `SPECIALIST_PAGES/thatched-properties › limitations.note`
  - CURRENT: "The policy wording and conditions come from Provenance before you commit."
  - NEW:


### `SPECIALIST_PAGES` → `non-standard-construction` — Non-standard construction
<sub>source: src/lib/insurance/specialist-pages.ts · SPECIALIST_PAGES[slug="non-standard-construction"]</sub>

- **KEY** `SPECIALIST_PAGES/non-standard-construction › title`
  - CURRENT: "Non-standard construction"
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › metaTitle`
  - CURRENT: "Non-standard construction insurance"
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › metaDescription`
  - CURRENT: "Cover for timber frame, cob, stone, flint, single-skin, steel-frame and prefabricated homes, risks a comparison form cannot handle. Arranged by Provenance; introduced by the House."
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › hero.eyebrow`
  - CURRENT: "Specialist property"
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › hero.heading`
  - CURRENT: "Some homes do not fit the form. Yours may be one of them."
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › hero.lede`
  - CURRENT: "Timber frame, cob, stone, flint, single-skin, steel frame, prefabricated: construction that resists standardisation is genuinely poorly served by an automated quote. It needs an underwriter who will read it."
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › differenceIntro`
  - CURRENT: "A comparison engine asks a fixed set of questions and prices off the answers. Non-standard construction is exactly the case those questions were never written for."
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › readiness[0].h`
  - CURRENT: "What it's built of"
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › readiness[0].p`
  - CURRENT: "Timber frame, cob, stone, flint, single-skin or steel, read individually, not by category."
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › readiness[1].h`
  - CURRENT: "The walls"
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › readiness[1].p`
  - CURRENT: "Solid-wall and single-skin construction that sits outside cavity-wall assumptions."
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › readiness[2].h`
  - CURRENT: "The system"
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › readiness[2].p`
  - CURRENT: "For post-war and prefabricated types, the specific system and its known issues."
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › readiness[3].h`
  - CURRENT: "What's been done"
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › readiness[3].p`
  - CURRENT: "Repairs, retrofits and how the fabric has been kept sound."
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › whyDifferent.heading`
  - CURRENT: "Why a form cannot handle it"
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › whyDifferent.body[0]`
  - CURRENT: "A comparison engine asks a fixed set of questions and prices off the answers. Non-standard construction is, by definition, the case those questions were not written for, so the engine either declines it or prices it as though it were something it is not."
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › whyDifferent.body[1]`
  - CURRENT: "A specialist underwriter starts from what the building actually is, and what has been done to keep it sound."
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › detail.title`
  - CURRENT: "The common constructions"
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › detail.points[0].h`
  - CURRENT: "Timber frame and cob"
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › detail.points[0].p`
  - CURRENT: "Traditional and modern timber frame, and earth-built walls such as cob, each behave differently in a loss and are read individually rather than by category."
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › detail.points[1].h`
  - CURRENT: "Stone, flint and single-skin"
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › detail.points[1].p`
  - CURRENT: "Solid-wall and single-skin construction sit outside standard cavity-wall assumptions, which is where automated cover tends to fall down."
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › detail.points[2].h`
  - CURRENT: "Steel frame and prefabricated"
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › detail.points[2].p`
  - CURRENT: "Non-traditional post-war construction, including certain prefabricated types, needs an underwriter familiar with the specific system."
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › placed.heading`
  - CURRENT: "What Provenance can place"
  - NEW:

- **KEY** `SPECIALIST_PAGES/non-standard-construction › placed.body`
  - CURRENT: "Provenance works with underwriters who assess non-standard construction on its merits rather than declining it by rule. The House introduces you and can supply what is known about the building; Provenance arranges and administers the cover."
  - NEW:


### `SPECIALIST_PAGES` → `second-homes` — Second and holiday homes
<sub>source: src/lib/insurance/specialist-pages.ts · SPECIALIST_PAGES[slug="second-homes"]</sub>

- **KEY** `SPECIALIST_PAGES/second-homes › title`
  - CURRENT: "Second and holiday homes"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › metaTitle`
  - CURRENT: "Second and holiday home insurance"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › metaDescription`
  - CURRENT: "Cover for second homes, holiday homes and holiday lets, where standard policies most often decline a claim. Arranged by Provenance; introduced by the House."
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › hero.eyebrow`
  - CURRENT: "Specialist property"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › hero.heading`
  - CURRENT: "A second home is not a first home that happens to be empty sometimes."
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › hero.lede`
  - CURRENT: "England has 268,152 second homes and 67,858 commercial holiday lets. Periods unoccupied, different security expectations, escape of water while nobody is there, and any letting activity all change the cover, and getting the distinction wrong is the commonest reason a claim is declined."
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › differenceIntro`
  - CURRENT: "A comparison form prices a home that is lived in. A second home is empty for stretches, sometimes let, and that changes the risk entirely."
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › readiness[0].h`
  - CURRENT: "How often it's empty"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › readiness[0].p`
  - CURRENT: "The stretches unoccupied, which most standard policies quietly limit."
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › readiness[1].h`
  - CURRENT: "How it's used"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › readiness[1].p`
  - CURRENT: "Second home, holiday home or holiday let, three different things to an insurer."
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › readiness[2].h`
  - CURRENT: "Security while away"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › readiness[2].p`
  - CURRENT: "Alarms, key-holding and how the home is checked between visits."
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › readiness[3].h`
  - CURRENT: "Where it is"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › readiness[3].p`
  - CURRENT: "Coastal, rural or overseas, each carrying its own exposure."
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › whyDifferent.heading`
  - CURRENT: "Why it is a different risk"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › whyDifferent.body[0]`
  - CURRENT: "The core issue is time spent empty. Escape of water, weather damage and theft all read differently in a home that is not lived in day to day, and standard policies carry an unoccupancy clause that many owners never notice until they claim."
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › whyDifferent.body[1]`
  - CURRENT: "Then there is use. A second home, a holiday home and a holiday let are three different things to an insurer, and describing one as another can invalidate the policy entirely."
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › detail.title`
  - CURRENT: "The things that catch people out"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › detail.points[0].h`
  - CURRENT: "The unoccupancy clause"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › detail.points[0].p`
  - CURRENT: "Most standard policies stop responding after a home has been empty for a set period. It is the single commonest reason a second-home claim fails. A specialist policy is written around how the home is actually used."
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › detail.points[1].h`
  - CURRENT: "Second home vs holiday let"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › detail.points[1].p`
  - CURRENT: "Letting activity changes the cover completely. If the policy describes the wrong use, it may not pay. This is worth getting right before it matters."
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › detail.points[2].h`
  - CURRENT: "Overseas properties"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › detail.points[2].p`
  - CURRENT: "Homes abroad can often be brought within the same arranged relationship, on one renewal date, rather than managed separately."
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › placed.heading`
  - CURRENT: "What Provenance can place"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › placed.body`
  - CURRENT: "Provenance arranges cover for second, holiday and overseas homes that reflects real occupancy and use, and can consolidate them onto one renewal date with the main home. The House introduces you; Provenance arranges and administers the cover."
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › evidence[0].stat`
  - CURRENT: "268,152"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › evidence[0].label`
  - CURRENT: "second homes in England"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › evidence[1].stat`
  - CURRENT: "67,858"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › evidence[1].label`
  - CURRENT: "commercial holiday lets in England"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › limitations.heading`
  - CURRENT: "Where second-home cover stops"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › limitations.intro`
  - CURRENT: "Cover for a second or holiday home is written around how it is really used. Describe that wrongly and the gaps open up. These are the usual limits; the policy wording governs."
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › limitations.points[0].h`
  - CURRENT: "Long periods empty"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › limitations.points[0].p`
  - CURRENT: "Most policies limit or withdraw cover once a home is unoccupied beyond a set number of days, and escape of water while nobody is there is a common exclusion in that window."
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › limitations.points[1].h`
  - CURRENT: "Letting not declared"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › limitations.points[1].p`
  - CURRENT: "A home used as a holiday let is a different risk from a private second home. If letting is not declared, a claim may not be paid at all."
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › limitations.points[2].h`
  - CURRENT: "Gradual damage and maintenance"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › limitations.points[2].p`
  - CURRENT: "Slow leaks, damp and deterioration that go unnoticed between visits are maintenance matters, not insured events."
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › limitations.points[3].h`
  - CURRENT: "Not advice"
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › limitations.points[3].p`
  - CURRENT: "The House introduces you to Provenance and does not advise on cover. Occupancy conditions and exclusions are set out in the policy documents."
  - NEW:

- **KEY** `SPECIALIST_PAGES/second-homes › limitations.note`
  - CURRENT: "The policy wording and occupancy conditions come from Provenance before you commit."
  - NEW:


### `SPECIALIST_PAGES` → `unoccupied-property` — Unoccupied and probate property
<sub>source: src/lib/insurance/specialist-pages.ts · SPECIALIST_PAGES[slug="unoccupied-property"]</sub>

- **KEY** `SPECIALIST_PAGES/unoccupied-property › title`
  - CURRENT: "Unoccupied and probate property"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › metaTitle`
  - CURRENT: "Unoccupied and probate property insurance"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › metaDescription`
  - CURRENT: "Cover for empty homes, in probate, between owners, or empty during works. Calm, practical, no pressure. Arranged by Provenance; introduced by the House."
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › hero.eyebrow`
  - CURRENT: "Specialist property"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › hero.heading`
  - CURRENT: "An empty house is still a home, and it still needs cover."
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › hero.lede`
  - CURRENT: "There are 309,856 long-term empty homes in England. Behind most of them is a difficult moment: probate, a move that has not completed, a house between phases of work. Calm and practical, with nothing to sell you."
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › differenceIntro`
  - CURRENT: "A comparison form prices a home that is lived in. An empty house is a different risk, and the questions that matter are about how it is left and looked after."
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › readiness[0].h`
  - CURRENT: "How long it's empty"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › readiness[0].p`
  - CURRENT: "The period unoccupied, which most standard policies stop covering."
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › readiness[1].h`
  - CURRENT: "How it's secured"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › readiness[1].p`
  - CURRENT: "Locks, boarding where needed, alarms and who holds a key."
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › readiness[2].h`
  - CURRENT: "Water and heating"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › readiness[2].p`
  - CURRENT: "Systems drained, or heating kept on through winter to prevent burst pipes."
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › readiness[3].h`
  - CURRENT: "How often it's checked"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › readiness[3].p`
  - CURRENT: "Regular inspections, the condition insurers usually require."
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › whyDifferent.heading`
  - CURRENT: "The three situations"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › whyDifferent.body[0]`
  - CURRENT: "Probate: a home held while an estate is settled. If you are dealing with a death, we are sorry. The practical point is only that the existing policy has very likely lapsed, often without anyone realising."
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › whyDifferent.body[1]`
  - CURRENT: "A property between owners or tenants, and a house empty during works, both leave a home standing without the day-to-day presence a standard policy assumes."
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › detail.title`
  - CURRENT: "What an empty property needs"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › detail.points[0].h`
  - CURRENT: "Why the old policy may have lapsed"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › detail.points[0].p`
  - CURRENT: "Standard cover typically ends once a home passes its unoccupancy limit, so a house that has been empty for a while is often uninsured exactly when it is most exposed."
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › detail.points[1].h`
  - CURRENT: "What insurers ask for"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › detail.points[1].p`
  - CURRENT: "Regular inspections, water systems drained down, secure boarding where needed, and heating managed through winter are the usual conditions. A specialist policy sets these out plainly."
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › detail.points[2].h`
  - CURRENT: "No urgency here"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › detail.points[2].p`
  - CURRENT: "There is no countdown here, and there never will be. When you are ready, a specialist will talk it through."
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › placed.heading`
  - CURRENT: "What Provenance can place"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › placed.body`
  - CURRENT: "Provenance arranges unoccupied and probate cover written for the situation, for the period it is needed. The House introduces you; Provenance arranges and administers the cover."
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › evidence[0].stat`
  - CURRENT: "309,856"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › evidence[0].label`
  - CURRENT: "long-term empty homes in England"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › limitations.heading`
  - CURRENT: "What an empty-home policy asks of you"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › limitations.intro`
  - CURRENT: "Unoccupied cover is written for the situation, and it comes with conditions that keep it valid. These are the usual limits; the policy wording governs."
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › limitations.points[0].h`
  - CURRENT: "The conditions must be kept"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › limitations.points[0].p`
  - CURRENT: "Regular inspections, water drained down or heating maintained through winter, and secure boarding where needed are typical requirements. A claim can rest on them being met."
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › limitations.points[1].h`
  - CURRENT: "Reduced perils while empty"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › limitations.points[1].p`
  - CURRENT: "Cover on an unoccupied home is often narrower than a lived-in one, with theft, escape of water and malicious damage limited or excluded."
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › limitations.points[2].h`
  - CURRENT: "Gradual damage"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › limitations.points[2].p`
  - CURRENT: "Slow deterioration in a home nobody is living in is a maintenance matter rather than an insured event."
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › limitations.points[3].h`
  - CURRENT: "Not advice"
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › limitations.points[3].p`
  - CURRENT: "The House introduces you to Provenance and does not advise on cover. The conditions and exclusions are set out in the policy documents."
  - NEW:

- **KEY** `SPECIALIST_PAGES/unoccupied-property › limitations.note`
  - CURRENT: "The policy wording and conditions come from Provenance before you commit. There is no urgency here."
  - NEW:


### `SPECIALIST_PAGES` → `renovation-and-extension` — Renovation, extension and contract works
<sub>source: src/lib/insurance/specialist-pages.ts · SPECIALIST_PAGES[slug="renovation-and-extension"]</sub>

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › title`
  - CURRENT: "Renovation, extension and contract works"
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › metaTitle`
  - CURRENT: "Renovation and contract works insurance"
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › metaDescription`
  - CURRENT: "One policy covering the existing structure, contract works, contents and liability for the period of building work. Arranged by Provenance; introduced by the House."
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › hero.eyebrow`
  - CURRENT: "Specialist property"
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › hero.heading`
  - CURRENT: "During building work, your home is at its most exposed, and often its least covered."
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › hero.lede`
  - CURRENT: "While works are underway a home may be open to the weather, structurally in flux, vulnerable to theft and controlled by contractors, and a standard household policy may not respond. A single renovation policy is unusually clean to explain and unusually worth having."
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › differenceIntro`
  - CURRENT: "A comparison form prices a finished, occupied home. During building work almost none of those assumptions hold, and the questions that matter are about the works themselves."
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › readiness[0].h`
  - CURRENT: "The works"
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › readiness[0].p`
  - CURRENT: "What is being done, and whether the home is open to the weather or structurally in flux."
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › readiness[1].h`
  - CURRENT: "Who is on site"
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › readiness[1].p`
  - CURRENT: "The contractors, their own cover, and the JCT contract position."
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › readiness[2].h`
  - CURRENT: "The existing structure"
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › readiness[2].p`
  - CURRENT: "Cover for the standing building as well as the contract works."
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › readiness[3].h`
  - CURRENT: "How long"
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › readiness[3].p`
  - CURRENT: "The length of the project, which sets the period cover is needed for."
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › whyDifferent.heading`
  - CURRENT: "The gap most owners do not know exists"
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › whyDifferent.body[0]`
  - CURRENT: "Standard home insurance assumes a finished, occupied house. Once scaffolding goes up and walls come down, several of its assumptions no longer hold, and cover can quietly fall away at the very moment risk is highest."
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › whyDifferent.body[1]`
  - CURRENT: "A renovation policy is designed for exactly that period, and it is one of Provenance's cleanest products to set out."
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › detail.title`
  - CURRENT: "What a renovation policy covers"
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › detail.points[0].h`
  - CURRENT: "One policy, four things"
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › detail.points[0].p`
  - CURRENT: "The existing structure, the contract works, contents and homeowner liability, all for the period of the works. When the job finishes, cover returns to a normal footing."
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › detail.points[1].h`
  - CURRENT: "JCT contracts, in plain English"
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › detail.points[1].p`
  - CURRENT: "Building contracts set out who insures what. A short, plain explanation of the JCT position helps you check the contractor's arrangements line up with yours. This is factual, not advice."
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › detail.points[2].h`
  - CURRENT: "Non-negligence cover"
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › detail.points[2].p`
  - CURRENT: "Where work happens close to a neighbour, non-negligence cover matters. Indicative costs sit around £550 for shorter projects and around £1,000 where non-negligence is included; figures are indicative and confirmed case by case."
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › placed.heading`
  - CURRENT: "What Provenance can place"
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › placed.body`
  - CURRENT: "Provenance arranges renovation and contract works cover for the life of a project, and the House can route straight in from the works it already manages. The House introduces you; Provenance arranges and administers the cover."
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › crossLinks[0].label`
  - CURRENT: "Guide: insurance during building work"
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › limitations.heading`
  - CURRENT: "What a works policy does not cover"
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › limitations.intro`
  - CURRENT: "A renovation policy is unusually clean, but it has edges. These are the usual limits; the policy wording, and the building contract, govern."
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › limitations.points[0].h`
  - CURRENT: "The contractor's own liability"
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › limitations.points[0].p`
  - CURRENT: "A works policy is not a substitute for the contractor's public liability and their cover for their own work and workmanship. The JCT contract sets out who insures what."
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › limitations.points[1].h`
  - CURRENT: "Faulty design or workmanship"
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › limitations.points[1].p`
  - CURRENT: "Defective design, materials or workmanship, and putting right work that was done badly, sit outside the cover."
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › limitations.points[2].h`
  - CURRENT: "Neighbours, without non-negligence cover"
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › limitations.points[2].p`
  - CURRENT: "Damage to an adjoining property caused without negligence is only covered where non-negligence cover is specifically included."
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › limitations.points[3].h`
  - CURRENT: "Not advice"
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › limitations.points[3].p`
  - CURRENT: "The House introduces you to Provenance and does not advise on cover. Scope, limits and exclusions are set out in the policy documents."
  - NEW:

- **KEY** `SPECIALIST_PAGES/renovation-and-extension › limitations.note`
  - CURRENT: "The policy wording and the JCT position come from Provenance before you commit."
  - NEW:


### `SPECIALIST_PAGES` → `fine-art-and-collections` — Fine art, jewellery and collections
<sub>source: src/lib/insurance/specialist-pages.ts · SPECIALIST_PAGES[slug="fine-art-and-collections"]</sub>

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › title`
  - CURRENT: "Fine art, jewellery and collections"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › metaTitle`
  - CURRENT: "Fine art, jewellery and collections insurance"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › metaDescription`
  - CURRENT: "Cover for scheduled items, art, jewellery, watches, wine and design, where general contents limits fall short. Arranged by Provenance; introduced by the House."
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › hero.eyebrow`
  - CURRENT: "Specialist assets"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › hero.heading`
  - CURRENT: "The things worth insuring properly rarely fit a general contents limit."
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › hero.lede`
  - CURRENT: "Scheduled items behave differently from general contents, and standard single-article limits bite quickly. The point is not only to cover what is under-insured, but to stop paying for what is over-insured."
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › differenceIntro`
  - CURRENT: "Most contents cover is priced from a single figure and a postcode, and never asks what the valuable things actually are. The House introduces you to a specialist who starts from the pieces themselves."
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › readiness[0].h`
  - CURRENT: "What it is"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › readiness[0].p`
  - CURRENT: "The maker, the period and the materials, not a line on a contents schedule."
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › readiness[1].h`
  - CURRENT: "What it is worth now"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › readiness[1].p`
  - CURRENT: "A current valuation, because markets move, rather than the price you paid."
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › readiness[2].h`
  - CURRENT: "Where it lives"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › readiness[2].p`
  - CURRENT: "On the wall, in a safe, worn daily or in storage, each a different risk."
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › readiness[3].h`
  - CURRENT: "In and out of the home"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › readiness[3].p`
  - CURRENT: "Whether it travels, is exhibited or lent, which standard cover rarely allows."
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › whyDifferent.heading`
  - CURRENT: "Why scheduled items are different"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › whyDifferent.body[0]`
  - CURRENT: "General contents cover carries a per-item limit that fine art, jewellery and collections routinely exceed. Above that limit, items should be scheduled and valued individually."
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › whyDifferent.body[1]`
  - CURRENT: "Valuation runs both ways. Homes are often over-insured as well as under-insured, paying for cover they will never need, which is money wasted. A proper schedule saves as often as it protects."
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › detail.title`
  - CURRENT: "How it is handled"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › detail.points[0].h`
  - CURRENT: "Valuation"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › detail.points[0].p`
  - CURRENT: "Scheduled items should be valued, and revalued as markets move. The House does not appraise or advise on value; it simply introduces the specialist who can."
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › detail.points[1].h`
  - CURRENT: "The ancillary network"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › detail.points[1].p`
  - CURRENT: "Provenance's proposition extends beyond the policy to collection management, restoration, security and valuation partners."
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › detail.points[2].h`
  - CURRENT: "Newer asset classes"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › detail.points[2].p`
  - CURRENT: "Watches, wine, streetwear and design are handled seriously and without condescension."
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › placed.heading`
  - CURRENT: "What Provenance can place"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › placed.body`
  - CURRENT: "Provenance arranges scheduled cover for art and collections, and can fold it into a household policy on one renewal date. The House introduces you to the specialist who schedules and values them properly; Provenance arranges and administers the cover."
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › evidence[0].stat`
  - CURRENT: "Both ways"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › evidence[0].label`
  - CURRENT: "a proper schedule can save on over-insurance as often as it protects against under-insurance"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › limitations.heading`
  - CURRENT: "What scheduled cover will and will not do"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › limitations.intro`
  - CURRENT: "Cover for valuables is precise, and the precision is the point. These are the usual limits; the policy wording and the schedule govern."
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › limitations.points[0].h`
  - CURRENT: "Only what is scheduled"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › limitations.points[0].p`
  - CURRENT: "Items above the general single-article limit are covered in full only once they are listed and valued. Leave a piece off the schedule and it falls back to the standard limit."
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › limitations.points[1].h`
  - CURRENT: "Valuations must be current"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › limitations.points[1].p`
  - CURRENT: "Cover follows the valuation on file. An out-of-date figure can leave a piece under-insured as markets move, which is why revaluation matters."
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › limitations.points[2].h`
  - CURRENT: "Wear, damage and known faults"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › limitations.points[2].p`
  - CURRENT: "Gradual wear, inherent fragility and damage that already exists are not insured events, and some risks in transit or on loan need to be agreed in advance."
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › limitations.points[3].h`
  - CURRENT: "Not advice"
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › limitations.points[3].p`
  - CURRENT: "The House does not appraise or advise on value. Provenance and its valuation partners handle that; limits and exclusions are in the policy documents."
  - NEW:

- **KEY** `SPECIALIST_PAGES/fine-art-and-collections › limitations.note`
  - CURRENT: "The policy wording and schedule terms come from Provenance before you commit."
  - NEW:


### `SPECIALIST_PAGES` → `classic-and-prestige-motor` — Classic and prestige motor
<sub>source: src/lib/insurance/specialist-pages.ts · SPECIALIST_PAGES[slug="classic-and-prestige-motor"]</sub>

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › title`
  - CURRENT: "Classic and prestige motor"
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › metaTitle`
  - CURRENT: "Classic and prestige motor insurance"
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › metaDescription`
  - CURRENT: "Agreed-value cover for classic, collection and prestige vehicles, consolidated onto one renewal date with the home. Arranged by Provenance; introduced by the House."
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › hero.eyebrow`
  - CURRENT: "Specialist assets"
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › hero.heading`
  - CURRENT: "The car and the house, treated as one estate."
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › hero.lede`
  - CURRENT: "There are 1.93 million registered historic vehicles in the UK, owned by 690,777 people. Specialist motor brokers do this well; the reason to come here is consolidation, one adviser, one renewal date, the car and the home managed together."
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › differenceIntro`
  - CURRENT: "Most motor quotes are priced off a table and a registration, and never ask what the car actually is or how it is used. The House introduces you to a specialist who starts from the vehicle."
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › readiness[0].h`
  - CURRENT: "What it is"
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › readiness[0].p`
  - CURRENT: "Make, model, year and condition, valued as the car it is rather than a category."
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › readiness[1].h`
  - CURRENT: "The agreed value"
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › readiness[1].p`
  - CURRENT: "The figure settled up front, not argued after a total loss."
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › readiness[2].h`
  - CURRENT: "How it is used"
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › readiness[2].p`
  - CURRENT: "Weekend, show, limited-mileage or daily, each priced on the real risk."
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › readiness[3].h`
  - CURRENT: "Where it is kept"
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › readiness[3].p`
  - CURRENT: "Garaging and security, which a comparison form flattens to a postcode."
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › whyDifferent.heading`
  - CURRENT: "One estate, one renewal date"
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › whyDifferent.body[0]`
  - CURRENT: "This is a mature, competitive niche, and the honest reason to arrange a prestige or classic vehicle through the House is not price. It is that the vehicle sits on the same renewal date as the home, with one specialist across the whole estate."
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › whyDifferent.body[1]`
  - CURRENT: "Agreed value is the mechanism that matters: the figure the vehicle is insured for is settled up front, not argued after a loss."
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › detail.title`
  - CURRENT: "What can be arranged"
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › detail.points[0].h`
  - CURRENT: "The range"
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › detail.points[0].p`
  - CURRENT: "Classic, collections, family fleet, supercar and hypercar, and 4x4, typically for vehicles from £50,000 upward."
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › detail.points[1].h`
  - CURRENT: "Agreed value"
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › detail.points[1].p`
  - CURRENT: "An agreed value is set at inception, so a total loss pays the figure agreed rather than a disputed market value."
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › detail.points[2].h`
  - CURRENT: "One renewal date"
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › detail.points[2].p`
  - CURRENT: "The vehicle joins the home and the wider estate on a single renewal, which is the whole point of arranging it here."
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › placed.heading`
  - CURRENT: "What Provenance can place"
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › placed.body`
  - CURRENT: "Provenance arranges classic and prestige motor cover and consolidates it with the household policy. The House introduces you; Provenance arranges and administers the cover."
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › evidence[0].stat`
  - CURRENT: "1.93m"
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › evidence[0].label`
  - CURRENT: "registered historic vehicles in the UK"
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › evidence[1].stat`
  - CURRENT: "690,777"
  - NEW:

- **KEY** `SPECIALIST_PAGES/classic-and-prestige-motor › evidence[1].label`
  - CURRENT: "people who own them"
  - NEW:


### `SPECIALIST_PAGES` → `boat-yacht-aviation` — Boat, yacht & aviation
<sub>source: src/lib/insurance/specialist-pages.ts · SPECIALIST_PAGES[slug="boat-yacht-aviation"]</sub>

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › title`
  - CURRENT: "Boat, yacht & aviation"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › metaTitle`
  - CURRENT: "Boat, yacht and aviation insurance"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › metaDescription`
  - CURRENT: "Cover for boats, yachts and aircraft, from a family boat to complex Lloyd's placements, arranged alongside the home on one relationship. Introduced by the House, arranged by Provenance."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › hero.eyebrow`
  - CURRENT: "Specialist assets"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › hero.heading`
  - CURRENT: "The boat, the yacht, the aircraft, on the same estate."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › hero.lede`
  - CURRENT: "Marine and aviation risks sit outside a household policy and are underwritten by specialist markets. The House introduces you to one, so the boat or aircraft is arranged alongside the home rather than managed apart."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › whyDifferent.heading`
  - CURRENT: "Why marine and aviation are their own world"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › whyDifferent.body[0]`
  - CURRENT: "A boat, a yacht or an aircraft is not a possession a home insurer covers. Each is underwritten by specialist marine and aviation markets, on its own terms, with its own surveys, moorings, usage and crew considerations."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › whyDifferent.body[1]`
  - CURRENT: "The reason to arrange it through the House is not price. It is that the asset sits within one relationship, on one renewal date, with the home and the rest of the estate, rather than as a separate policy nobody joins up."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › differenceIntro`
  - CURRENT: "A household policy stops at the water's edge and the runway. The House introduces you to a specialist who prices the vessel or aircraft on what it is and how it is used."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › readiness[0].h`
  - CURRENT: "What it is"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › readiness[0].p`
  - CURRENT: "The make, length or type, and value, surveyed rather than estimated."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › readiness[1].h`
  - CURRENT: "How it's used"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › readiness[1].p`
  - CURRENT: "Cruising ground, racing, charter or private flying, each a different risk."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › readiness[2].h`
  - CURRENT: "Where it's kept"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › readiness[2].p`
  - CURRENT: "Mooring, marina, hangar or dry storage, and the security that goes with it."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › readiness[3].h`
  - CURRENT: "Crew and skipper"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › readiness[3].p`
  - CURRENT: "Who operates it, their experience and any professional crew."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › detail.title`
  - CURRENT: "What can be arranged"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › detail.points[0].h`
  - CURRENT: "Boats and yachts"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › detail.points[0].p`
  - CURRENT: "From a family motorboat or sailing yacht to a bluewater cruiser, on agreed value."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › detail.points[1].h`
  - CURRENT: "Aviation"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › detail.points[1].p`
  - CURRENT: "Private aircraft and helicopters, through the specialist and Lloyd's markets."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › detail.points[2].h`
  - CURRENT: "On one estate"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › detail.points[2].p`
  - CURRENT: "Arranged alongside the home, cars and collections on a single renewal date."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › placed.heading`
  - CURRENT: "What Provenance can place"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › placed.body`
  - CURRENT: "Provenance works with the specialist marine and aviation markets, from the standard market through to complex Lloyd's of London placements, and can consolidate the vessel or aircraft with the household policy. The House introduces you; Provenance arranges and administers the cover."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boat-yacht-aviation › crossLinks[0].label`
  - CURRENT: "Private client insurance"
  - NEW:


### `SPECIALIST_PAGES` → `boiler-cover` — Boiler and heating cover
<sub>source: src/lib/insurance/specialist-pages.ts · SPECIALIST_PAGES[slug="boiler-cover"]</sub>

- **KEY** `SPECIALIST_PAGES/boiler-cover › title`
  - CURRENT: "Boiler and heating cover"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › metaTitle`
  - CURRENT: "Boiler and central heating cover"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › metaDescription`
  - CURRENT: "Cover for when the boiler or central heating stops, with annual and monthly options. Introduced by the House, arranged by a regulated partner."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › hero.eyebrow`
  - CURRENT: "Home cover"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › hero.heading`
  - CURRENT: "When the heating stops, the cover should already be in place."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › hero.lede`
  - CURRENT: "A boiler that fails in the cold is one of the few home problems that cannot wait. Cover for the repair, and for the annual service that prevents most failures, arranged through a regulated partner."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › differenceIntro`
  - CURRENT: "Most cover is sold on price alone and never asks about the system itself. What matters is the boiler and how it has been looked after."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › readiness[0].h`
  - CURRENT: "The boiler's age"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › readiness[0].p`
  - CURRENT: "How old the system is, and whether it is still economically worth repairing."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › readiness[1].h`
  - CURRENT: "The service history"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › readiness[1].p`
  - CURRENT: "Whether it has been serviced, which keeps a system insurable and the terms sensible."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › readiness[2].h`
  - CURRENT: "What's included"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › readiness[2].p`
  - CURRENT: "The engineer, parts and labour, and whether an annual service is part of the plan."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › readiness[3].h`
  - CURRENT: "Controls and heating"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › readiness[3].p`
  - CURRENT: "The controls and central heating, not the boiler in isolation."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › whyDifferent.heading`
  - CURRENT: "What boiler cover actually covers"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › whyDifferent.body[0]`
  - CURRENT: "Boiler and central-heating cover pays for the engineer, the parts and the labour when the system fails, and most plans include an annual service that catches the faults that would otherwise become a mid-winter breakdown."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › whyDifferent.body[1]`
  - CURRENT: "The detail that matters is the boiler's age and service history: a maintained record is what keeps a system insurable and the terms sensible."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › detail.title`
  - CURRENT: "The options, in plain terms"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › detail.points[0].h`
  - CURRENT: "Boiler and controls"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › detail.points[0].p`
  - CURRENT: "Cover for the boiler, the controls and the central heating, with the annual service usually included."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › detail.points[1].h`
  - CURRENT: "Annual or monthly"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › detail.points[1].p`
  - CURRENT: "Pay yearly or spread it monthly. The House introduces you; the plan is arranged and administered by the partner."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › detail.points[2].h`
  - CURRENT: "Service history helps"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › detail.points[2].p`
  - CURRENT: "A documented service record keeps cover straightforward, so it is worth keeping the paperwork to hand."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › placed.heading`
  - CURRENT: "What the partner can place"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › placed.body`
  - CURRENT: "Cover is arranged and administered by a regulated partner. The House makes the introduction; the partner arranges the cover."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › crossLinks[0].label`
  - CURRENT: "Appliance cover"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › limitations.heading`
  - CURRENT: "What boiler cover does not include"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › limitations.intro`
  - CURRENT: "Boiler and heating cover is straightforward, and so are its edges. These are the usual limits; the plan terms govern."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › limitations.points[0].h`
  - CURRENT: "Old or unserviceable systems"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › limitations.points[0].p`
  - CURRENT: "Very old boilers, or systems that cannot be economically repaired, are often excluded or capped. Age and service history decide what a plan will take on."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › limitations.points[1].h`
  - CURRENT: "Pre-existing faults and no maintenance"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › limitations.points[1].p`
  - CURRENT: "A fault that already exists when cover starts, and breakdowns caused by a lack of servicing, are not covered."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › limitations.points[2].h`
  - CURRENT: "Sludge, scale and parts availability"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › limitations.points[2].p`
  - CURRENT: "Damage from system sludge or scale, and delays where obsolete parts cannot be sourced, sit outside a standard plan."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › limitations.points[3].h`
  - CURRENT: "Not advice"
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › limitations.points[3].p`
  - CURRENT: "The House introduces you to a regulated partner and does not advise on cover. Limits and exclusions are set out in the plan documents."
  - NEW:

- **KEY** `SPECIALIST_PAGES/boiler-cover › limitations.note`
  - CURRENT: "The plan terms and exclusions come from the partner before you commit."
  - NEW:


### `SPECIALIST_PAGES` → `appliance-cover` — Appliance cover
<sub>source: src/lib/insurance/specialist-pages.ts · SPECIALIST_PAGES[slug="appliance-cover"]</sub>

- **KEY** `SPECIALIST_PAGES/appliance-cover › title`
  - CURRENT: "Appliance cover"
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › metaTitle`
  - CURRENT: "Household appliance cover"
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › metaDescription`
  - CURRENT: "Cover for the household appliances you rely on, a single item or the whole kitchen, from washing machines to ovens. Introduced by the House, arranged by a regulated partner."
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › hero.eyebrow`
  - CURRENT: "Home cover"
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › hero.heading`
  - CURRENT: "The appliances a home runs on, covered before they fail."
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › hero.lede`
  - CURRENT: "A washing machine, an oven, a fridge-freezer: the everyday machines whose failure is an expensive surprise. Cover for repair or replacement, on a single item or across the home."
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › differenceIntro`
  - CURRENT: "Most cover is sold per box with the small print unread. What matters is which appliances, how old they are, and what they would cost to replace."
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › readiness[0].h`
  - CURRENT: "Which appliances"
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › readiness[0].p`
  - CURRENT: "A single valued machine, or the whole kitchen and utility room together."
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › readiness[1].h`
  - CURRENT: "Age and warranty"
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › readiness[1].p`
  - CURRENT: "Whether each is in or out of its manufacturer warranty."
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › readiness[2].h`
  - CURRENT: "Repair or replace"
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › readiness[2].p`
  - CURRENT: "Repair where sensible, replacement where a machine cannot be economically fixed."
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › readiness[3].h`
  - CURRENT: "The replacement cost"
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › readiness[3].p`
  - CURRENT: "What it would cost to put back, not what you paid."
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › whyDifferent.heading`
  - CURRENT: "Single item or the whole kitchen"
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › whyDifferent.body[0]`
  - CURRENT: "Appliance cover pays for repair or replacement when a machine fails outside its manufacturer warranty. It can sit on a single valued item or across every appliance in the home."
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › whyDifferent.body[1]`
  - CURRENT: "Cover is simplest when you know what you own, when it was bought, and what it would cost to replace, so it is worth keeping the receipts and model details to hand."
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › detail.title`
  - CURRENT: "How it is arranged"
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › detail.points[0].h`
  - CURRENT: "One item or many"
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › detail.points[0].p`
  - CURRENT: "Cover a single high-value appliance, or bundle the kitchen and utility room together."
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › detail.points[1].h`
  - CURRENT: "Repair or replace"
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › detail.points[1].p`
  - CURRENT: "Plans cover repair, and replacement where a machine cannot be economically fixed."
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › detail.points[2].h`
  - CURRENT: "Kept records help"
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › detail.points[2].p`
  - CURRENT: "Purchase dates and values make cover simpler, so it is worth keeping receipts to hand."
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › placed.heading`
  - CURRENT: "What the partner can place"
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › placed.body`
  - CURRENT: "Cover is arranged and administered by a regulated partner. The House makes the introduction; the partner arranges the cover."
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › crossLinks[0].label`
  - CURRENT: "Boiler and heating cover"
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › limitations.heading`
  - CURRENT: "What appliance cover does not include"
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › limitations.intro`
  - CURRENT: "Appliance cover repairs or replaces machines that fail, within limits. These are the usual ones; the plan terms govern."
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › limitations.points[0].h`
  - CURRENT: "Cosmetic and accidental damage"
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › limitations.points[0].p`
  - CURRENT: "Scratches, dents and accidental damage are not the same as mechanical failure, and are usually excluded unless specifically added."
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › limitations.points[1].h`
  - CURRENT: "Pre-existing faults and misuse"
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › limitations.points[1].p`
  - CURRENT: "A fault present before cover started, and failure caused by misuse or improper installation, are not covered."
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › limitations.points[2].h`
  - CURRENT: "Age and replacement basis"
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › limitations.points[2].p`
  - CURRENT: "Older appliances may be settled on a contribution or like-for-like basis rather than a new-for-old replacement. Plans differ, so the basis is worth checking."
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › limitations.points[3].h`
  - CURRENT: "Not advice"
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › limitations.points[3].p`
  - CURRENT: "The House introduces you to a regulated partner and does not advise on cover. Limits and exclusions are set out in the plan documents."
  - NEW:

- **KEY** `SPECIALIST_PAGES/appliance-cover › limitations.note`
  - CURRENT: "The plan terms and exclusions come from the partner before you commit."
  - NEW:


### `EVERYDAY_PAGES` → `home` — Home insurance
<sub>source: src/lib/insurance/everyday-pages.ts · EVERYDAY_PAGES[slug="home"]</sub>

- **KEY** `EVERYDAY_PAGES/home › title`
  - CURRENT: "Home insurance"
  - NEW:

- **KEY** `EVERYDAY_PAGES/home › metaTitle`
  - CURRENT: "Home insurance, everyday cover"
  - NEW:

- **KEY** `EVERYDAY_PAGES/home › metaDescription`
  - CURRENT: "Straightforward buildings and contents cover, arranged for you through Provenance. High-value and period homes are routed to the advised service."
  - NEW:

- **KEY** `EVERYDAY_PAGES/home › heading`
  - CURRENT: "Home insurance, for a standard home."
  - NEW:

- **KEY** `EVERYDAY_PAGES/home › lede`
  - CURRENT: "For a straightforward house or flat, everyday buildings and contents cover, arranged for you. Tell the House what you need and a specialist arranges it through Provenance on your behalf."
  - NEW:

- **KEY** `EVERYDAY_PAGES/home › covered[0]`
  - CURRENT: "Buildings cover for the structure"
  - NEW:

- **KEY** `EVERYDAY_PAGES/home › covered[1]`
  - CURRENT: "Contents cover for what is inside"
  - NEW:

- **KEY** `EVERYDAY_PAGES/home › covered[2]`
  - CURRENT: "Optional add-ons such as accidental damage"
  - NEW:

- **KEY** `EVERYDAY_PAGES/home › journey`
  - CURRENT: "Tell the House what you need, and a specialist arranges your cover through Provenance."
  - NEW:


### `EVERYDAY_PAGES` → `motor` — Car, van and motorbike
<sub>source: src/lib/insurance/everyday-pages.ts · EVERYDAY_PAGES[slug="motor"]</sub>

- **KEY** `EVERYDAY_PAGES/motor › title`
  - CURRENT: "Car, van and motorbike"
  - NEW:

- **KEY** `EVERYDAY_PAGES/motor › metaTitle`
  - CURRENT: "Car, van and motorbike insurance, everyday cover"
  - NEW:

- **KEY** `EVERYDAY_PAGES/motor › metaDescription`
  - CURRENT: "Cover for car, van and motorbike, plus temporary cover from one hour to 28 days, arranged for you through Provenance."
  - NEW:

- **KEY** `EVERYDAY_PAGES/motor › heading`
  - CURRENT: "Car, van and motorbike."
  - NEW:

- **KEY** `EVERYDAY_PAGES/motor › lede`
  - CURRENT: "Everyday motor cover in one place, including the temporary cover that is genuinely useful and rarely marketed."
  - NEW:

- **KEY** `EVERYDAY_PAGES/motor › covered[0]`
  - CURRENT: "Third-party, third-party fire and theft, or comprehensive"
  - NEW:

- **KEY** `EVERYDAY_PAGES/motor › covered[1]`
  - CURRENT: "Optional breakdown, legal and key cover"
  - NEW:

- **KEY** `EVERYDAY_PAGES/motor › covered[2]`
  - CURRENT: "Temporary cover from one hour to 28 days"
  - NEW:

- **KEY** `EVERYDAY_PAGES/motor › journey`
  - CURRENT: "Tell the House which cover fits, and a specialist arranges it through Provenance."
  - NEW:

- **KEY** `EVERYDAY_PAGES/motor › products[0].name`
  - CURRENT: "Car"
  - NEW:

- **KEY** `EVERYDAY_PAGES/motor › products[0].body`
  - CURRENT: "Standard private car cover."
  - NEW:

- **KEY** `EVERYDAY_PAGES/motor › products[1].name`
  - CURRENT: "Van"
  - NEW:

- **KEY** `EVERYDAY_PAGES/motor › products[1].body`
  - CURRENT: "Private and light commercial van use."
  - NEW:

- **KEY** `EVERYDAY_PAGES/motor › products[2].name`
  - CURRENT: "Motorbike"
  - NEW:

- **KEY** `EVERYDAY_PAGES/motor › products[2].body`
  - CURRENT: "Bikes and scooters."
  - NEW:

- **KEY** `EVERYDAY_PAGES/motor › products[3].name`
  - CURRENT: "Temporary cover"
  - NEW:

- **KEY** `EVERYDAY_PAGES/motor › products[3].body`
  - CURRENT: "From one hour to 28 days, for borrowing, lending or a short need."
  - NEW:


### `EVERYDAY_PAGES` → `pet-and-travel` — Pet and travel
<sub>source: src/lib/insurance/everyday-pages.ts · EVERYDAY_PAGES[slug="pet-and-travel"]</sub>

- **KEY** `EVERYDAY_PAGES/pet-and-travel › title`
  - CURRENT: "Pet and travel"
  - NEW:

- **KEY** `EVERYDAY_PAGES/pet-and-travel › metaTitle`
  - CURRENT: "Pet and travel insurance, everyday cover"
  - NEW:

- **KEY** `EVERYDAY_PAGES/pet-and-travel › metaDescription`
  - CURRENT: "Pet cover, and single-trip or annual travel including specialist medical, arranged for you through Provenance."
  - NEW:

- **KEY** `EVERYDAY_PAGES/pet-and-travel › heading`
  - CURRENT: "Pet and travel."
  - NEW:

- **KEY** `EVERYDAY_PAGES/pet-and-travel › lede`
  - CURRENT: "Two low-fuss covers in one place, both arranged for you through Provenance."
  - NEW:

- **KEY** `EVERYDAY_PAGES/pet-and-travel › covered[0]`
  - CURRENT: "Vet-bill cover for cats and dogs"
  - NEW:

- **KEY** `EVERYDAY_PAGES/pet-and-travel › covered[1]`
  - CURRENT: "Single-trip and annual multi-trip travel"
  - NEW:

- **KEY** `EVERYDAY_PAGES/pet-and-travel › covered[2]`
  - CURRENT: "Travel cover where existing conditions apply"
  - NEW:

- **KEY** `EVERYDAY_PAGES/pet-and-travel › journey`
  - CURRENT: "Tell the House whether you need pet or travel cover, and a specialist arranges it through Provenance."
  - NEW:

- **KEY** `EVERYDAY_PAGES/pet-and-travel › products[0].name`
  - CURRENT: "Pet"
  - NEW:

- **KEY** `EVERYDAY_PAGES/pet-and-travel › products[0].body`
  - CURRENT: "Cover for vet bills and the usual pet risks."
  - NEW:

- **KEY** `EVERYDAY_PAGES/pet-and-travel › products[1].name`
  - CURRENT: "Single-trip travel"
  - NEW:

- **KEY** `EVERYDAY_PAGES/pet-and-travel › products[1].body`
  - CURRENT: "One holiday or trip."
  - NEW:

- **KEY** `EVERYDAY_PAGES/pet-and-travel › products[2].name`
  - CURRENT: "Annual multi-trip"
  - NEW:

- **KEY** `EVERYDAY_PAGES/pet-and-travel › products[2].body`
  - CURRENT: "For several trips a year."
  - NEW:

- **KEY** `EVERYDAY_PAGES/pet-and-travel › products[3].name`
  - CURRENT: "Specialist medical travel"
  - NEW:

- **KEY** `EVERYDAY_PAGES/pet-and-travel › products[3].body`
  - CURRENT: "Where existing conditions need cover."
  - NEW:


### `EVERYDAY_PAGES` → `breakdown-and-bicycle` — Breakdown and bicycle
<sub>source: src/lib/insurance/everyday-pages.ts · EVERYDAY_PAGES[slug="breakdown-and-bicycle"]</sub>

- **KEY** `EVERYDAY_PAGES/breakdown-and-bicycle › title`
  - CURRENT: "Breakdown and bicycle"
  - NEW:

- **KEY** `EVERYDAY_PAGES/breakdown-and-bicycle › metaTitle`
  - CURRENT: "Breakdown and bicycle cover, everyday"
  - NEW:

- **KEY** `EVERYDAY_PAGES/breakdown-and-bicycle › metaDescription`
  - CURRENT: "Roadside, recovery and home-start breakdown cover, and cover for road, mountain, electric and high-value bicycles, arranged for you through Provenance."
  - NEW:

- **KEY** `EVERYDAY_PAGES/breakdown-and-bicycle › heading`
  - CURRENT: "Breakdown and bicycle."
  - NEW:

- **KEY** `EVERYDAY_PAGES/breakdown-and-bicycle › lede`
  - CURRENT: "The smaller everyday covers, arranged for you through Provenance."
  - NEW:

- **KEY** `EVERYDAY_PAGES/breakdown-and-bicycle › covered[0]`
  - CURRENT: "Roadside assistance, recovery and home start"
  - NEW:

- **KEY** `EVERYDAY_PAGES/breakdown-and-bicycle › covered[1]`
  - CURRENT: "Cover for road, mountain, electric and high-value bikes"
  - NEW:

- **KEY** `EVERYDAY_PAGES/breakdown-and-bicycle › covered[2]`
  - CURRENT: "Arranged for you through Provenance"
  - NEW:

- **KEY** `EVERYDAY_PAGES/breakdown-and-bicycle › journey`
  - CURRENT: "Tell the House which cover you need, and a specialist arranges it through Provenance."
  - NEW:

- **KEY** `EVERYDAY_PAGES/breakdown-and-bicycle › products[0].name`
  - CURRENT: "Breakdown"
  - NEW:

- **KEY** `EVERYDAY_PAGES/breakdown-and-bicycle › products[0].body`
  - CURRENT: "Roadside assistance, recovery and home start."
  - NEW:

- **KEY** `EVERYDAY_PAGES/breakdown-and-bicycle › products[1].name`
  - CURRENT: "Bicycle"
  - NEW:

- **KEY** `EVERYDAY_PAGES/breakdown-and-bicycle › products[1].body`
  - CURRENT: "Road, mountain, electric and high-value bikes."
  - NEW:


### `BUSINESS_PAGES` → `business` — Business insurance
<sub>source: src/lib/insurance/business-pages.ts · BUSINESS_PAGES[slug="business"]</sub>

- **KEY** `BUSINESS_PAGES/business › title`
  - CURRENT: "Business insurance"
  - NEW:

- **KEY** `BUSINESS_PAGES/business › metaTitle`
  - CURRENT: "Business insurance broker introductions"
  - NEW:

- **KEY** `BUSINESS_PAGES/business › metaDescription`
  - CURRENT: "Warm B2B insurance introductions for the House's contractor, supplier and member network. A free silent review of existing cover. Introduced by the House, arranged by Provenance."
  - NEW:

- **KEY** `BUSINESS_PAGES/business › hero.eyebrow`
  - CURRENT: "Business"
  - NEW:

- **KEY** `BUSINESS_PAGES/business › hero.heading`
  - CURRENT: "The cover a working business needs, without the aggregator guesswork."
  - NEW:

- **KEY** `BUSINESS_PAGES/business › hero.lede`
  - CURRENT: "Brokers hold most of the UK commercial market for a reason: business risk does not fit a comparison form. Introductions here are warm B2B, through a network the House already knows."
  - NEW:

- **KEY** `BUSINESS_PAGES/business › whoImageAlt`
  - CURRENT: "A leather ledger, brass sconce and a fountain pen on a sage surface, standing for the free silent review of the cover a working business already holds."
  - NEW:

- **KEY** `BUSINESS_PAGES/business › who.heading`
  - CURRENT: "Who this is for"
  - NEW:

- **KEY** `BUSINESS_PAGES/business › who.body[0]`
  - CURRENT: "The House's contractor and supplier network, members running their own businesses, and the House's own operating companies."
  - NEW:

- **KEY** `BUSINESS_PAGES/business › who.body[1]`
  - CURRENT: "If you already work with the House, you are a known quantity, which is the strongest starting point a specialist broker can have."
  - NEW:

- **KEY** `BUSINESS_PAGES/business › detail.title`
  - CURRENT: "The silent review"
  - NEW:

- **KEY** `BUSINESS_PAGES/business › detail.points[0].h`
  - CURRENT: "A free review of what you hold"
  - NEW:

- **KEY** `BUSINESS_PAGES/business › detail.points[0].p`
  - CURRENT: "Provenance will review your existing arrangements and identify gaps, underinsurance and where the premium can be benchmarked. No obligation, and nothing changes unless you decide it should."
  - NEW:

- **KEY** `BUSINESS_PAGES/business › detail.points[1].h`
  - CURRENT: "Built for relationships, not rate"
  - NEW:

- **KEY** `BUSINESS_PAGES/business › detail.points[1].p`
  - CURRENT: "The UK commercial market is soft, so this is built for the long relationship and the cross-sell, not for a quick saving. That is the honest position."
  - NEW:

- **KEY** `BUSINESS_PAGES/business › detail.points[2].h`
  - CURRENT: "One conversation across the estate"
  - NEW:

- **KEY** `BUSINESS_PAGES/business › detail.points[2].p`
  - CURRENT: "Where a member's home and business both need cover, they can sit with one adviser rather than two."
  - NEW:

- **KEY** `BUSINESS_PAGES/business › placed.heading`
  - CURRENT: "What Provenance can place"
  - NEW:

- **KEY** `BUSINESS_PAGES/business › placed.body`
  - CURRENT: "Business combined, professional indemnity, directors' and officers', property owners, fleet from two vehicles, motor trade and cyber. The House introduces you; Provenance arranges and administers the cover."
  - NEW:

- **KEY** `BUSINESS_PAGES/business › subLinks[0].label`
  - CURRENT: "Trades & contractors"
  - NEW:

- **KEY** `BUSINESS_PAGES/business › subLinks[1].label`
  - CURRENT: "Professional indemnity"
  - NEW:


### `BUSINESS_PAGES` → `trades-and-contractors` — Trades and contractors
<sub>source: src/lib/insurance/business-pages.ts · BUSINESS_PAGES[slug="trades-and-contractors"]</sub>

- **KEY** `BUSINESS_PAGES/trades-and-contractors › title`
  - CURRENT: "Trades and contractors"
  - NEW:

- **KEY** `BUSINESS_PAGES/trades-and-contractors › metaTitle`
  - CURRENT: "Tradesman and contractor insurance"
  - NEW:

- **KEY** `BUSINESS_PAGES/trades-and-contractors › metaDescription`
  - CURRENT: "Public and employers' liability, tools, contract works and professional indemnity for trades and contractors. The House's own supply chain. Introduced by the House, arranged by Provenance."
  - NEW:

- **KEY** `BUSINESS_PAGES/trades-and-contractors › hero.eyebrow`
  - CURRENT: "Business"
  - NEW:

- **KEY** `BUSINESS_PAGES/trades-and-contractors › hero.heading`
  - CURRENT: "Being properly insured and being House Approved are the same conversation."
  - NEW:

- **KEY** `BUSINESS_PAGES/trades-and-contractors › hero.lede`
  - CURRENT: "Construction is the largest single sector of UK small business, and it is the House's own supply chain, which makes it the warmest introduction route there is."
  - NEW:

- **KEY** `BUSINESS_PAGES/trades-and-contractors › whoImageAlt`
  - CURRENT: "A leather ledger and a fountain pen resting on a sage surface, standing for the liability, tools and contract-works cover a trade needs set down clearly."
  - NEW:

- **KEY** `BUSINESS_PAGES/trades-and-contractors › who.heading`
  - CURRENT: "What a trade actually needs"
  - NEW:

- **KEY** `BUSINESS_PAGES/trades-and-contractors › who.body[0]`
  - CURRENT: "Public and employers' liability, tools cover, contract works, and professional indemnity where design is part of the job. A specialist puts the right combination together rather than a one-size policy."
  - NEW:

- **KEY** `BUSINESS_PAGES/trades-and-contractors › who.body[1]`
  - CURRENT: "For anyone on, or applying to, the House Approved list, this is the same standard-and-cover conversation."
  - NEW:

- **KEY** `BUSINESS_PAGES/trades-and-contractors › detail.title`
  - CURRENT: "The detail"
  - NEW:

- **KEY** `BUSINESS_PAGES/trades-and-contractors › detail.points[0].h`
  - CURRENT: "Liability, sized to the work"
  - NEW:

- **KEY** `BUSINESS_PAGES/trades-and-contractors › detail.points[0].p`
  - CURRENT: "Public and employers' liability limits are set against the actual jobs, sites and headcount, not a default figure."
  - NEW:

- **KEY** `BUSINESS_PAGES/trades-and-contractors › detail.points[1].h`
  - CURRENT: "Tools and contract works"
  - NEW:

- **KEY** `BUSINESS_PAGES/trades-and-contractors › detail.points[1].p`
  - CURRENT: "Cover for the tools that earn the living, and for the works themselves while a project is live."
  - NEW:

- **KEY** `BUSINESS_PAGES/trades-and-contractors › detail.points[2].h`
  - CURRENT: "Indicative premiums"
  - NEW:

- **KEY** `BUSINESS_PAGES/trades-and-contractors › detail.points[2].p`
  - CURRENT: "Tradesperson cover typically runs around £360 to £540 a year. Figures are indicative and confirmed case by case, pending Provenance sign-off."
  - NEW:

- **KEY** `BUSINESS_PAGES/trades-and-contractors › placed.heading`
  - CURRENT: "What Provenance can place"
  - NEW:

- **KEY** `BUSINESS_PAGES/trades-and-contractors › placed.body`
  - CURRENT: "Liability, tools, contract works, professional indemnity and the wider commercial combined cover a trade needs. The House introduces you; Provenance arranges and administers the cover."
  - NEW:


### `BUSINESS_PAGES` → `professional-indemnity` — Professional indemnity
<sub>source: src/lib/insurance/business-pages.ts · BUSINESS_PAGES[slug="professional-indemnity"]</sub>

- **KEY** `BUSINESS_PAGES/professional-indemnity › title`
  - CURRENT: "Professional indemnity"
  - NEW:

- **KEY** `BUSINESS_PAGES/professional-indemnity › metaTitle`
  - CURRENT: "Professional indemnity insurance"
  - NEW:

- **KEY** `BUSINESS_PAGES/professional-indemnity › metaDescription`
  - CURRENT: "Professional indemnity for architects, designers, surveyors and consultants, with limits set against real exposure. Introduced by the House, arranged by Provenance."
  - NEW:

- **KEY** `BUSINESS_PAGES/professional-indemnity › hero.eyebrow`
  - CURRENT: "Business"
  - NEW:

- **KEY** `BUSINESS_PAGES/professional-indemnity › hero.heading`
  - CURRENT: "Cover for advice given, sized to the exposure that actually exists."
  - NEW:

- **KEY** `BUSINESS_PAGES/professional-indemnity › hero.lede`
  - CURRENT: "Architects, designers, surveyors and consultants: exactly the professional network around a home-management business, and exactly where a standard limit is often the wrong one."
  - NEW:

- **KEY** `BUSINESS_PAGES/professional-indemnity › whoImageAlt`
  - CURRENT: "A leather ledger and drawings on a sage sill, standing for the drawings and specifications whose professional-indemnity exposure outlives the job."
  - NEW:

- **KEY** `BUSINESS_PAGES/professional-indemnity › who.heading`
  - CURRENT: "Who it is for"
  - NEW:

- **KEY** `BUSINESS_PAGES/professional-indemnity › who.body[0]`
  - CURRENT: "The professions whose advice, drawings and specifications carry liability long after the job is done."
  - NEW:

- **KEY** `BUSINESS_PAGES/professional-indemnity › who.body[1]`
  - CURRENT: "Provenance sets the limit against real exposure rather than a round number, which is where most policies are quietly wrong."
  - NEW:

- **KEY** `BUSINESS_PAGES/professional-indemnity › detail.title`
  - CURRENT: "The detail"
  - NEW:

- **KEY** `BUSINESS_PAGES/professional-indemnity › detail.points[0].h`
  - CURRENT: "Limits against exposure"
  - NEW:

- **KEY** `BUSINESS_PAGES/professional-indemnity › detail.points[0].p`
  - CURRENT: "How much cover is enough is a function of the work, the contracts and the clients, not a standard figure pulled from a table."
  - NEW:

- **KEY** `BUSINESS_PAGES/professional-indemnity › detail.points[1].h`
  - CURRENT: "The design-and-construct trap"
  - NEW:

- **KEY** `BUSINESS_PAGES/professional-indemnity › detail.points[1].p`
  - CURRENT: "The overlap between designing and building catches architects out. A specialist reads where the liability actually sits."
  - NEW:

- **KEY** `BUSINESS_PAGES/professional-indemnity › detail.points[2].h`
  - CURRENT: "Renewal continuity"
  - NEW:

- **KEY** `BUSINESS_PAGES/professional-indemnity › detail.points[2].p`
  - CURRENT: "Professional indemnity is claims-made, so continuity of cover matters. It is worth reviewing before, not at, renewal."
  - NEW:

- **KEY** `BUSINESS_PAGES/professional-indemnity › placed.heading`
  - CURRENT: "What Provenance can place"
  - NEW:

- **KEY** `BUSINESS_PAGES/professional-indemnity › placed.body`
  - CURRENT: "Professional indemnity across the built-environment and consulting professions, alongside the wider business cover a practice needs. The House introduces you; Provenance arranges and administers the cover."
  - NEW:


### `GUIDES` → `underinsurance` — The underinsurance gap: are you insured for what it would really cost?
<sub>source: src/lib/insurance/guides.ts · GUIDES[slug="underinsurance"]</sub>

- **KEY** `GUIDES/underinsurance › takeaways[0]`
  - CURRENT: "Many UK homes are insured below what it would actually cost to rebuild them."
  - NEW:

- **KEY** `GUIDES/underinsurance › takeaways[1]`
  - CURRENT: "The error is almost always downward, and index-linking rarely keeps pace."
  - NEW:

- **KEY** `GUIDES/underinsurance › takeaways[2]`
  - CURRENT: "Listed, extended and non-standard homes are worst affected."
  - NEW:

- **KEY** `GUIDES/underinsurance › takeaways[3]`
  - CURRENT: "A rebuild assessment sets the right figure, not a market valuation."
  - NEW:

- **KEY** `GUIDES/underinsurance › stat.value`
  - CURRENT: "Most homes"
  - NEW:

- **KEY** `GUIDES/underinsurance › stat.label`
  - CURRENT: "are insured below what it would actually cost to rebuild them"
  - NEW:

- **KEY** `GUIDES/underinsurance › faqs[0].q`
  - CURRENT: "How do I know if I'm underinsured?"
  - NEW:

- **KEY** `GUIDES/underinsurance › faqs[0].a`
  - CURRENT: "Compare your sum insured against a professional rebuild (reinstatement) cost, not your home's market value. If you have never had a rebuild assessment, or your home is period, extended or non-standard, it is worth checking."
  - NEW:

- **KEY** `GUIDES/underinsurance › faqs[1].q`
  - CURRENT: "Is being over-insured a problem too?"
  - NEW:

- **KEY** `GUIDES/underinsurance › faqs[1].a`
  - CURRENT: "Yes. Some properties are over-insured, paying for cover they will never need, which is premium wasted. The right figure saves as often as it protects."
  - NEW:

- **KEY** `GUIDES/underinsurance › faqs[2].q`
  - CURRENT: "Does index-linking keep my cover accurate?"
  - NEW:

- **KEY** `GUIDES/underinsurance › faqs[2].a`
  - CURRENT: "Not reliably. Index-linking is meant to track building costs but tends to run below actual reinstatement, especially when costs move quickly as they did between 2020 and 2024."
  - NEW:

- **KEY** `GUIDES/underinsurance › faqs[3].q`
  - CURRENT: "Who works out the rebuild cost?"
  - NEW:

- **KEY** `GUIDES/underinsurance › faqs[3].a`
  - CURRENT: "For a standard home a professional reinstatement assessment sets the figure. For a listed, extended or non-standard home it is the only reliable way to get it right."
  - NEW:

- **KEY** `GUIDES/underinsurance › sources[0]`
  - CURRENT: "Association of British Insurers (ABI)"
  - NEW:

- **KEY** `GUIDES/underinsurance › sources[1]`
  - CURRENT: "BCIS rebuild-cost data"
  - NEW:

- **KEY** `GUIDES/underinsurance › sources[2]`
  - CURRENT: "Rebuild cost inflation 2020-2024, published market research"
  - NEW:

- **KEY** `GUIDES/underinsurance › title`
  - CURRENT: "The underinsurance gap: are you insured for what it would really cost?"
  - NEW:

- **KEY** `GUIDES/underinsurance › metaTitle`
  - CURRENT: "Am I underinsured? The UK underinsurance gap"
  - NEW:

- **KEY** `GUIDES/underinsurance › metaDescription`
  - CURRENT: "Many UK properties are insured below their rebuild cost. Why it happens, the over-insurance counterpoint, and how to check."
  - NEW:

- **KEY** `GUIDES/underinsurance › intro`
  - CURRENT: "Most homes are insured for the wrong figure, and the direction of the error is nearly always down. Here is what the evidence says, why it happens, and how to check your own cover without a calculator making the decision for you."
  - NEW:

- **KEY** `GUIDES/underinsurance › sections[0].heading`
  - CURRENT: "The headline finding"
  - NEW:

- **KEY** `GUIDES/underinsurance › sections[0].paras[0]`
  - CURRENT: "Many UK properties are insured below their rebuild cost. In plain terms, a large number of homes would not be paid enough to rebuild after a total loss."
  - NEW:

- **KEY** `GUIDES/underinsurance › sections[1].heading`
  - CURRENT: "Why it happens"
  - NEW:

- **KEY** `GUIDES/underinsurance › sections[1].paras[0]`
  - CURRENT: "The usual mechanism is index-linking, which is meant to keep a sum insured in step with building costs but tends to run below actual reinstatement. And costs have moved fast: rebuild costs have risen sharply in recent years, faster than most policies tracked."
  - NEW:

- **KEY** `GUIDES/underinsurance › sections[1].paras[1]`
  - CURRENT: "Listed, extended and non-standard homes are affected most, because their rebuild cost is hardest to estimate from a table in the first place."
  - NEW:

- **KEY** `GUIDES/underinsurance › sections[2].heading`
  - CURRENT: "The over-insurance counterpoint"
  - NEW:

- **KEY** `GUIDES/underinsurance › sections[2].paras[0]`
  - CURRENT: "It runs both ways. Some properties are over-insured as well, which is simply money wasted on premium. A proper figure saves as often as it protects."
  - NEW:

- **KEY** `GUIDES/underinsurance › sections[3].heading`
  - CURRENT: "How to check"
  - NEW:

- **KEY** `GUIDES/underinsurance › sections[3].paras[0]`
  - CURRENT: "Start with the distinction that catches most people: rebuild cost is what it would cost to rebuild the house, not what it would sell for. For a standard home a professional rebuild assessment sets the figure; for a listed, extended or non-standard home it is the only reliable way to get it right."
  - NEW:

- **KEY** `GUIDES/underinsurance › footCta`
  - CURRENT: "specialist"
  - NEW:

- **KEY** `GUIDES/underinsurance › related[0].label`
  - CURRENT: "What a rebuild cost actually is"
  - NEW:

- **KEY** `GUIDES/underinsurance › related[1].label`
  - CURRENT: "Insuring a listed building"
  - NEW:


### `GUIDES` → `rebuild-cost` — What a rebuild cost actually is
<sub>source: src/lib/insurance/guides.ts · GUIDES[slug="rebuild-cost"]</sub>

- **KEY** `GUIDES/rebuild-cost › takeaways[0]`
  - CURRENT: "Rebuild cost is what it would cost to rebuild your home, not what it would sell for."
  - NEW:

- **KEY** `GUIDES/rebuild-cost › takeaways[1]`
  - CURRENT: "The two numbers are rarely the same, and only rebuild cost belongs on your policy."
  - NEW:

- **KEY** `GUIDES/rebuild-cost › takeaways[2]`
  - CURRENT: "Listed, extended and non-standard homes cannot be estimated from a table."
  - NEW:

- **KEY** `GUIDES/rebuild-cost › takeaways[3]`
  - CURRENT: "Construction costs are still rising, so a figure from a few years ago is probably low."
  - NEW:

- **KEY** `GUIDES/rebuild-cost › stat.value`
  - CURRENT: "Rising"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › stat.label`
  - CURRENT: "rebuild costs have risen sharply in recent years, faster than most policies tracked"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › table.title`
  - CURRENT: "Rebuild cost, market value and sum insured"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › table.columns[0]`
  - CURRENT: "Term"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › table.columns[1]`
  - CURRENT: "What it means"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › table.columns[2]`
  - CURRENT: "On your policy?"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › table.rows[0][0]`
  - CURRENT: "Rebuild cost"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › table.rows[0][1]`
  - CURRENT: "What it would cost to rebuild the home: materials, labour, fees, demolition, site clearance"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › table.rows[0][2]`
  - CURRENT: "Yes"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › table.rows[1][0]`
  - CURRENT: "Market value"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › table.rows[1][1]`
  - CURRENT: "What the home would sell for, including location, demand and the land"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › table.rows[1][2]`
  - CURRENT: "No"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › table.rows[2][0]`
  - CURRENT: "Sum insured"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › table.rows[2][1]`
  - CURRENT: "The figure your buildings cover is set at, ideally equal to rebuild cost"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › table.rows[2][2]`
  - CURRENT: "The number to get right"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › table.caption`
  - CURRENT: "Insuring on market value instead of rebuild cost is the most common cause of underinsurance."
  - NEW:

- **KEY** `GUIDES/rebuild-cost › faqs[0].q`
  - CURRENT: "Why isn't market value the right figure?"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › faqs[0].a`
  - CURRENT: "Market value includes the land and location, which you do not rebuild. In some areas rebuild cost is well below market value; for period and rural homes it is often well above it."
  - NEW:

- **KEY** `GUIDES/rebuild-cost › faqs[1].q`
  - CURRENT: "What is a reinstatement cost assessment?"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › faqs[1].a`
  - CURRENT: "A professional measures the building and prices its actual construction: the fabric, finishes, fees and the cost of rebuilding to current regulations. It is the figure a specialist underwriter wants to see."
  - NEW:

- **KEY** `GUIDES/rebuild-cost › faqs[2].q`
  - CURRENT: "Can I use an online calculator?"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › faqs[2].a`
  - CURRENT: "For a standard home, calculators such as the ABI/BCIS tool give a starting point. For listed, extended or non-standard homes they are unreliable, because they assume standard construction."
  - NEW:

- **KEY** `GUIDES/rebuild-cost › sources[0]`
  - CURRENT: "BCIS (Building Cost Information Service)"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › sources[1]`
  - CURRENT: "Association of British Insurers (ABI)"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › title`
  - CURRENT: "What a rebuild cost actually is"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › metaTitle`
  - CURRENT: "What is rebuild cost? Reinstatement cost, explained"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › metaDescription`
  - CURRENT: "Rebuild cost is not market value. What a professional reinstatement assessment includes, why some homes cannot be estimated from a table, and where costs are heading."
  - NEW:

- **KEY** `GUIDES/rebuild-cost › intro`
  - CURRENT: "The single most useful thing to understand about insuring a home is the difference between what it would sell for and what it would cost to rebuild. They are rarely the same number, and only one of them belongs on your policy."
  - NEW:

- **KEY** `GUIDES/rebuild-cost › sections[0].heading`
  - CURRENT: "Rebuild cost versus market value"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › sections[0].paras[0]`
  - CURRENT: "Market value reflects location, demand and the land. Rebuild cost reflects materials, labour, professional fees, demolition and site clearance. In some areas the rebuild cost is far below the market value; in others, particularly for period and rural homes, it is well above it. Insuring on the wrong one is how underinsurance starts."
  - NEW:

- **KEY** `GUIDES/rebuild-cost › sections[1].heading`
  - CURRENT: "What a reinstatement assessment includes"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › sections[1].paras[0]`
  - CURRENT: "A professional reinstatement cost assessment measures the building and prices its actual construction: the fabric, the finishes, the fees, the cost of doing it under current regulations. It is the figure a specialist underwriter wants to see."
  - NEW:

- **KEY** `GUIDES/rebuild-cost › sections[2].heading`
  - CURRENT: "Why some homes cannot be tabled"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › sections[2].paras[0]`
  - CURRENT: "Listed, extended and non-standard homes cannot be estimated from a rebuild-cost table, because the table assumes standard construction. Heritage fabric, unusual materials and additions all move the figure in ways an average cannot capture."
  - NEW:

- **KEY** `GUIDES/rebuild-cost › sections[3].heading`
  - CURRENT: "Where costs are heading"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › sections[3].paras[0]`
  - CURRENT: "Construction costs have kept rising in recent years, with services and fit-out among the fastest to move. A figure that was right two years ago is probably low now."
  - NEW:

- **KEY** `GUIDES/rebuild-cost › footCta`
  - CURRENT: "specialist"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › related[0].label`
  - CURRENT: "The underinsurance gap"
  - NEW:

- **KEY** `GUIDES/rebuild-cost › related[1].label`
  - CURRENT: "Insuring a listed building"
  - NEW:


### `GUIDES` → `listed-building-insurance` — Insuring a listed building: a practical guide
<sub>source: src/lib/insurance/guides.ts · GUIDES[slug="listed-building-insurance"]</sub>

- **KEY** `GUIDES/listed-building-insurance › takeaways[0]`
  - CURRENT: "A listed building is insured differently because it is repaired differently."
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › takeaways[1]`
  - CURRENT: "After a loss, reinstatement is usually like-for-like, under listed building consent."
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › takeaways[2]`
  - CURRENT: "Heritage fabric costs more than a standard rebuild table assumes."
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › takeaways[3]`
  - CURRENT: "A reinstatement assessment for a listed home is worth commissioning."
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › stat.value`
  - CURRENT: "Underinsured"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › stat.label`
  - CURRENT: "listed homes are frequently insured below their true reinstatement cost"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › table.title`
  - CURRENT: "What changes with the grade"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › table.columns[0]`
  - CURRENT: "Grade"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › table.columns[1]`
  - CURRENT: "What it means"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › table.columns[2]`
  - CURRENT: "Repair control"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › table.rows[0][0]`
  - CURRENT: "Grade II"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › table.rows[0][1]`
  - CURRENT: "Special interest; the great majority of listed homes"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › table.rows[0][2]`
  - CURRENT: "Alterations need consent"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › table.rows[1][0]`
  - CURRENT: "Grade II*"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › table.rows[1][1]`
  - CURRENT: "Particularly important, more than special interest"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › table.rows[1][2]`
  - CURRENT: "Tighter control, higher rebuild cost"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › table.rows[2][0]`
  - CURRENT: "Grade I"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › table.rows[2][1]`
  - CURRENT: "Exceptional interest"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › table.rows[2][2]`
  - CURRENT: "The most tightly controlled, and the dearest to reinstate"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › table.caption`
  - CURRENT: "Higher grades carry more obligation and a higher rebuild cost, which the premium reflects."
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › faqs[0].q`
  - CURRENT: "Can I use modern materials to repair a listed building?"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › faqs[0].a`
  - CURRENT: "Usually not. Listed building consent typically requires like-for-like reinstatement in original materials and methods, even after an insured loss. That is slower and dearer than a modern repair, which is why the rebuild cost is higher."
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › faqs[1].q`
  - CURRENT: "Do I need consent to repair after damage?"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › faqs[1].a`
  - CURRENT: "For anything beyond like-for-like repair, yes, and consent does not pause for an insurance claim. The local conservation officer usually becomes part of the process."
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › faqs[2].q`
  - CURRENT: "Why can't a standard rebuild calculator price my home?"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › faqs[2].a`
  - CURRENT: "Lime mortar, hand-made brick, oak framing and specialist trades all cost more than modern equivalents, and a standard table does not know they are there. A reinstatement assessment prices what is actually there."
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › sources[0]`
  - CURRENT: "Historic England"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › sources[1]`
  - CURRENT: "RebuildCostASSESSMENT listed-building data"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › title`
  - CURRENT: "Insuring a listed building: a practical guide"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › metaTitle`
  - CURRENT: "Listed building insurance: a practical guide"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › metaDescription`
  - CURRENT: "The grades, what listed building consent means for repair after a claim, rebuild cost for heritage fabric, and working with conservation officers."
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › intro`
  - CURRENT: "A listed building is insured differently because it is repaired differently. This guide covers the grades, consent, rebuild cost for heritage fabric, and the people you end up working with when something goes wrong."
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › sections[0].heading`
  - CURRENT: "The grades"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › sections[0].paras[0]`
  - CURRENT: "Grade II, Grade II* and Grade I reflect increasing significance, and increasing obligation. The higher the grade, the more tightly repair is controlled and the more a rebuild costs, which the premium reflects."
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › sections[1].heading`
  - CURRENT: "Consent, and what it means after a claim"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › sections[1].paras[0]`
  - CURRENT: "Listed building consent governs alterations, and it does not pause for an insurance claim. After a loss, reinstatement usually has to be like for like, using original materials and methods, under the same consent regime. That is slower and dearer than a modern repair."
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › sections[2].heading`
  - CURRENT: "Rebuild cost for heritage fabric"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › sections[2].paras[0]`
  - CURRENT: "Lime mortar, hand-made brick, oak framing and specialist trades all cost more than their modern equivalents, and a standard rebuild table does not know they are there. A reinstatement assessment for a listed home is worth commissioning."
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › sections[3].heading`
  - CURRENT: "Working with conservation officers"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › sections[3].paras[0]`
  - CURRENT: "For anything significant, the local conservation officer becomes part of the process. A specialist policy and a broker who understands heritage risk make that conversation far smoother."
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › footCta`
  - CURRENT: "specialist"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › related[0].label`
  - CURRENT: "Listed building insurance"
  - NEW:

- **KEY** `GUIDES/listed-building-insurance › related[1].label`
  - CURRENT: "The underinsurance gap"
  - NEW:


### `GUIDES` → `renovation-insurance` — Insurance during building work
<sub>source: src/lib/insurance/guides.ts · GUIDES[slug="renovation-insurance"]</sub>

- **KEY** `GUIDES/renovation-insurance › takeaways[0]`
  - CURRENT: "A home is most exposed while it is being worked on, and a standard policy may stop responding."
  - NEW:

- **KEY** `GUIDES/renovation-insurance › takeaways[1]`
  - CURRENT: "JCT building contracts set out who insures the existing structure and the works."
  - NEW:

- **KEY** `GUIDES/renovation-insurance › takeaways[2]`
  - CURRENT: "Non-negligence cover responds to neighbour damage that is nobody's fault."
  - NEW:

- **KEY** `GUIDES/renovation-insurance › takeaways[3]`
  - CURRENT: "Arrange one renovation policy before the contractor starts, not after."
  - NEW:

- **KEY** `GUIDES/renovation-insurance › table.title`
  - CURRENT: "What a renovation policy covers"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › table.columns[0]`
  - CURRENT: "Cover"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › table.columns[1]`
  - CURRENT: "What it protects"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › table.rows[0][0]`
  - CURRENT: "Existing structure"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › table.rows[0][1]`
  - CURRENT: "The standing building while works are underway"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › table.rows[1][0]`
  - CURRENT: "Contract works"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › table.rows[1][1]`
  - CURRENT: "The new work itself, materials and labour, until complete"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › table.rows[2][0]`
  - CURRENT: "Contents"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › table.rows[2][1]`
  - CURRENT: "Your belongings during the project"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › table.rows[3][0]`
  - CURRENT: "Liability & non-negligence"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › table.rows[3][1]`
  - CURRENT: "Injury or damage claims, including neighbour damage that is nobody's fault"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › table.caption`
  - CURRENT: "One policy over all four, for the period of the works; then cover returns to a normal footing."
  - NEW:

- **KEY** `GUIDES/renovation-insurance › faqs[0].q`
  - CURRENT: "Will my normal home insurance cover the building work?"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › faqs[0].a`
  - CURRENT: "Often not. Standard cover assumes a finished, occupied house. Once the building is open, unoccupied for periods, or controlled by contractors, several conditions may no longer be met and cover can fall away."
  - NEW:

- **KEY** `GUIDES/renovation-insurance › faqs[1].q`
  - CURRENT: "Doesn't the builder's insurance cover it?"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › faqs[1].a`
  - CURRENT: "A contractor's policy covers their liability, not necessarily your existing structure or the works. JCT contracts set out who insures what; checking that clause avoids the common gap where each party assumes the other has it."
  - NEW:

- **KEY** `GUIDES/renovation-insurance › faqs[2].q`
  - CURRENT: "When should I arrange it?"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › faqs[2].a`
  - CURRENT: "Before the contractor starts. A single renovation policy over the existing structure, the works, contents and liability, for the length of the job, is the clean way to do it."
  - NEW:

- **KEY** `GUIDES/renovation-insurance › sources[0]`
  - CURRENT: "JCT (Joint Contracts Tribunal) standard building contract forms"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › title`
  - CURRENT: "Insurance during building work"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › metaTitle`
  - CURRENT: "Insurance during renovation and building work"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › metaDescription`
  - CURRENT: "What happens to a household policy during works, who is responsible under a JCT contract, non-negligence cover explained, and when to arrange it."
  - NEW:

- **KEY** `GUIDES/renovation-insurance › intro`
  - CURRENT: "A home is at its most exposed while it is being worked on, and that is exactly when a standard household policy may stop responding. Here is what changes during works, and what to have in place before the contractor starts."
  - NEW:

- **KEY** `GUIDES/renovation-insurance › sections[0].heading`
  - CURRENT: "What happens to a household policy"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › sections[0].paras[0]`
  - CURRENT: "Standard home insurance assumes a finished, occupied house. Once the building is open, unoccupied for periods, or under the control of contractors, several of its conditions may no longer be met, and cover can quietly fall away."
  - NEW:

- **KEY** `GUIDES/renovation-insurance › sections[1].heading`
  - CURRENT: "Who is responsible under a JCT contract"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › sections[1].paras[0]`
  - CURRENT: "Building contracts, and the JCT forms in particular, set out who insures the existing structure and the works. A short read of that clause, checked against the contractor's own cover, avoids the common gap where each party assumes the other has it. This is factual, not advice."
  - NEW:

- **KEY** `GUIDES/renovation-insurance › sections[2].heading`
  - CURRENT: "Non-negligence cover"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › sections[2].paras[0]`
  - CURRENT: "Where work happens close to a neighbour, non-negligence cover responds to damage that is nobody's fault, which ordinary liability cover will not. It matters more than its obscurity suggests."
  - NEW:

- **KEY** `GUIDES/renovation-insurance › sections[3].heading`
  - CURRENT: "When to arrange it"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › sections[3].paras[0]`
  - CURRENT: "Before the contractor starts, not after. A single renovation policy over the existing structure, the works, contents and liability, for the period of the job, is the clean way to do it."
  - NEW:

- **KEY** `GUIDES/renovation-insurance › footCta`
  - CURRENT: "specialist"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › related[0].label`
  - CURRENT: "Renovation, extension and contract works"
  - NEW:

- **KEY** `GUIDES/renovation-insurance › related[1].label`
  - CURRENT: "What a rebuild cost actually is"
  - NEW:


### `GUIDES` → `renewal` — When to renew, and why timing pays
<sub>source: src/lib/insurance/guides.ts · GUIDES[slug="renewal"]</sub>

- **KEY** `GUIDES/renewal › takeaways[0]`
  - CURRENT: "Home insurance is usually cheapest 5 to 25 days before renewal, best around 15 days out."
  - NEW:

- **KEY** `GUIDES/renewal › takeaways[1]`
  - CURRENT: "Quoting more than about 28 days ahead often costs more, not less."
  - NEW:

- **KEY** `GUIDES/renewal › takeaways[2]`
  - CURRENT: "Auto-renewal is convenient and rarely the cheapest option."
  - NEW:

- **KEY** `GUIDES/renewal › takeaways[3]`
  - CURRENT: "One diarised reminder a year is the whole discipline."
  - NEW:

- **KEY** `GUIDES/renewal › stat.value`
  - CURRENT: "~15 days"
  - NEW:

- **KEY** `GUIDES/renewal › stat.label`
  - CURRENT: "before renewal is typically the cheapest moment to buy home insurance"
  - NEW:

- **KEY** `GUIDES/renewal › table.title`
  - CURRENT: "When to buy"
  - NEW:

- **KEY** `GUIDES/renewal › table.columns[0]`
  - CURRENT: "When you buy"
  - NEW:

- **KEY** `GUIDES/renewal › table.columns[1]`
  - CURRENT: "What tends to happen"
  - NEW:

- **KEY** `GUIDES/renewal › table.rows[0][0]`
  - CURRENT: "More than ~28 days before"
  - NEW:

- **KEY** `GUIDES/renewal › table.rows[0][1]`
  - CURRENT: "Often costs more; insurers price a distant start date"
  - NEW:

- **KEY** `GUIDES/renewal › table.rows[1][0]`
  - CURRENT: "5 to 25 days before"
  - NEW:

- **KEY** `GUIDES/renewal › table.rows[1][1]`
  - CURRENT: "The cheapest window, best around 15 days out"
  - NEW:

- **KEY** `GUIDES/renewal › table.rows[2][0]`
  - CURRENT: "On renewal day"
  - NEW:

- **KEY** `GUIDES/renewal › table.rows[2][1]`
  - CURRENT: "Averages meaningfully more than buying at the right moment"
  - NEW:

- **KEY** `GUIDES/renewal › table.rows[3][0]`
  - CURRENT: "Auto-renewal"
  - NEW:

- **KEY** `GUIDES/renewal › table.rows[3][1]`
  - CURRENT: "Convenient, rarely cheapest; worth a yearly look"
  - NEW:

- **KEY** `GUIDES/renewal › table.caption`
  - CURRENT: "Timing is one of the few genuinely free savings available."
  - NEW:

- **KEY** `GUIDES/renewal › faqs[0].q`
  - CURRENT: "When is the cheapest time to renew?"
  - NEW:

- **KEY** `GUIDES/renewal › faqs[0].a`
  - CURRENT: "Between 5 and 25 days before your renewal date, with the optimum around 15 days out. Buying on the day itself averages meaningfully more."
  - NEW:

- **KEY** `GUIDES/renewal › faqs[1].q`
  - CURRENT: "Isn't earlier always better?"
  - NEW:

- **KEY** `GUIDES/renewal › faqs[1].a`
  - CURRENT: "Not past about 28 days. Quote too far ahead and the price often rises, because insurers price the extra uncertainty of a distant start date."
  - NEW:

- **KEY** `GUIDES/renewal › faqs[2].q`
  - CURRENT: "Should I just let it auto-renew?"
  - NEW:

- **KEY** `GUIDES/renewal › faqs[2].a`
  - CURRENT: "Auto-renewal is convenient but rarely the cheapest, and it does not check the cover still fits. A diarised look each year is worth it."
  - NEW:

- **KEY** `GUIDES/renewal › sources[0]`
  - CURRENT: "MoneySavingExpert renewal-timing analysis"
  - NEW:

- **KEY** `GUIDES/renewal › sources[1]`
  - CURRENT: "Consumer pricing studies, published market research"
  - NEW:

- **KEY** `GUIDES/renewal › title`
  - CURRENT: "When to renew, and why timing pays"
  - NEW:

- **KEY** `GUIDES/renewal › metaTitle`
  - CURRENT: "When to renew home insurance: timing that saves"
  - NEW:

- **KEY** `GUIDES/renewal › metaDescription`
  - CURRENT: "Insurance is cheapest 5 to 25 days before renewal, with the optimum around 15 days out. Why quoting too early costs more, auto-renewal, and setting a reminder."
  - NEW:

- **KEY** `GUIDES/renewal › intro`
  - CURRENT: "Insurance is bought at exactly one moment in the year, and the price moves depending on when you buy. A little timing is one of the few genuinely free savings available."
  - NEW:

- **KEY** `GUIDES/renewal › sections[0].heading`
  - CURRENT: "The window"
  - NEW:

- **KEY** `GUIDES/renewal › sections[0].paras[0]`
  - CURRENT: "Cover tends to be cheapest between 5 and 25 days before renewal, with the sweet spot around 15 days out. Bought on renewal day itself it averages meaningfully more than bought at the right moment; the difference is real money for doing nothing but timing it."
  - NEW:

- **KEY** `GUIDES/renewal › sections[1].heading`
  - CURRENT: "Why quoting too early costs more"
  - NEW:

- **KEY** `GUIDES/renewal › sections[1].paras[0]`
  - CURRENT: "Quote more than about 28 days ahead and the price often rises, because insurers price the extra uncertainty of a distant start date. Earlier is not cheaper past that point."
  - NEW:

- **KEY** `GUIDES/renewal › sections[2].heading`
  - CURRENT: "Auto-renewal"
  - NEW:

- **KEY** `GUIDES/renewal › sections[2].paras[0]`
  - CURRENT: "Auto-renewal is convenient and rarely cheapest. It is worth a diarised look every year rather than a quiet roll-over, both for price and for whether the cover still fits."
  - NEW:

- **KEY** `GUIDES/renewal › sections[3].heading`
  - CURRENT: "The simplest move"
  - NEW:

- **KEY** `GUIDES/renewal › sections[3].paras[0]`
  - CURRENT: "Set a reminder for the right window and let it do the work. One note a year is the whole discipline."
  - NEW:

- **KEY** `GUIDES/renewal › footCta`
  - CURRENT: "renewal"
  - NEW:


---

# Part 3 — Shared components & config

Standing copy reused across many insurance pages. **Rewrite each block once here** and it updates everywhere the component renders. The template components (`SpecialistPage`, `GuideLayout`, `BusinessPage`, `EverydayPreframe`) hold the fixed section headings/labels that wrap the page-specific copy from Part 2.

### component:SpecialistPage
<sub>source: src/components/insurance/SpecialistPage.tsx — hardcoded copy on every /insurance/[slug], everyday/[slug], business/[slug] page</sub>

- **KEY** `SpecialistPage › readiness.default.roof.h`
  - CURRENT: "The roof"
  - NEW:
- **KEY** `SpecialistPage › readiness.default.roof.p`
  - CURRENT: "What it is, and when it was last treated."
  - NEW:
- **KEY** `SpecialistPage › readiness.default.builtof.h`
  - CURRENT: "What it's built of"
  - NEW:
- **KEY** `SpecialistPage › readiness.default.builtof.p`
  - CURRENT: "The fabric behind the walls, not a guess from a table."
  - NEW:
- **KEY** `SpecialistPage › readiness.default.added.h`
  - CURRENT: "What's been added"
  - NEW:
- **KEY** `SpecialistPage › readiness.default.added.p`
  - CURRENT: "Every extension, rewire and works project."
  - NEW:
- **KEY** `SpecialistPage › readiness.default.rebuild.h`
  - CURRENT: "The cost to rebuild"
  - NEW:
- **KEY** `SpecialistPage › readiness.default.rebuild.p`
  - CURRENT: "The reinstatement figure, not the market value."
  - NEW:
- **KEY** `SpecialistPage › difference.intro.default`
  - CURRENT: "Most insurance is priced by people who never ask a single thing about the house. The House introduces you to a specialist who starts from what the home actually is, so the cover is built on the real risk rather than a guess."
  - NEW:
- **KEY** `SpecialistPage › hero.eyebrow.prefix`
  - CURRENT: "Insurance · "
  - NEW:
- **KEY** `SpecialistPage › hero.cta.default`
  - CURRENT: "Speak to a specialist"
  - NEW:
- **KEY** `SpecialistPage › hero.cta.call`
  - CURRENT: "Call "
  - NEW:
- **KEY** `SpecialistPage › evidence.note`
  - CURRENT: "Figures are indicative and pending Provenance compliance sign-off."
  - NEW:
- **KEY** `SpecialistPage › evidence.cta.heading`
  - CURRENT: "Find out where your own cover stands."
  - NEW:
- **KEY** `SpecialistPage › evidence.cta.button`
  - CURRENT: "Speak to a specialist"
  - NEW:
- **KEY** `SpecialistPage › limitations.eyebrow`
  - CURRENT: "Read this before you rely on cover"
  - NEW:
- **KEY** `SpecialistPage › limitations.heading.default`
  - CURRENT: "What is not covered, and what to check"
  - NEW:
- **KEY** `SpecialistPage › difference.eyebrow`
  - CURRENT: "The difference"
  - NEW:
- **KEY** `SpecialistPage › difference.heading`
  - CURRENT: "The questions a comparison form never asks."
  - NEW:
- **KEY** `SpecialistPage › difference.pullquote`
  - CURRENT: "A specialist asks. A comparison engine assumes."
  - NEW:
- **KEY** `SpecialistPage › difference.cta.button`
  - CURRENT: "Speak to a specialist"
  - NEW:
- **KEY** `SpecialistPage › relatedCovers.card.viewlink`
  - CURRENT: "View cover →"
  - NEW:
- **KEY** `SpecialistPage › placed.fca.disclosure` (interpolates PROVENANCE.frn / .group / .backer) — REGULATORY
  - CURRENT: "Provenance is authorised and regulated by the FCA (FRN {PROVENANCE.frn}), and part of the {PROVENANCE.group} group, within the {PROVENANCE.backer} group, which is charity-owned and gives its available profits to good causes."
  - NEW:
- **KEY** `SpecialistPage › placed.cta.button`
  - CURRENT: "Speak to a specialist"
  - NEW:
- **KEY** `SpecialistPage › enquiry.eyebrow.default`
  - CURRENT: "Speak to a specialist"
  - NEW:
- **KEY** `SpecialistPage › enquiry.heading.default`
  - CURRENT: "A short conversation, not a comparison engine."
  - NEW:
- **KEY** `SpecialistPage › enquiry.body.default`
  - CURRENT: "Leave your details and a specialist will call. We ask only what we need to make the introduction, nothing about sums insured, contents or your current insurer. That conversation belongs on your first call with Provenance."
  - NEW:

### component:GuideLayout
<sub>source: src/components/insurance/GuideLayout.tsx — hardcoded copy on every /insurance/guides/[slug] page</sub>

- **KEY** `GuideLayout › hero.eyebrow`
  - CURRENT: "Insurance · Guide"
  - NEW:
- **KEY** `GuideLayout › toc.label`
  - CURRENT: "On this page"
  - NEW:
- **KEY** `GuideLayout › toc.faq.link`
  - CURRENT: "Common questions"
  - NEW:
- **KEY** `GuideLayout › takeaways.label`
  - CURRENT: "In short"
  - NEW:
- **KEY** `GuideLayout › faq.heading`
  - CURRENT: "Common questions"
  - NEW:
- **KEY** `GuideLayout › sources.label`
  - CURRENT: "Sources:"
  - NEW:
- **KEY** `GuideLayout › figures.note`
  - CURRENT: "Figures are indicative and pending Provenance compliance sign-off. This is general information, not advice."
  - NEW:
- **KEY** `GuideLayout › footcta.renewal.heading`
  - CURRENT: "Remind me before my renewal."
  - NEW:
- **KEY** `GuideLayout › footcta.renewal.body`
  - CURRENT: "One email, at the right moment. Not a newsletter, and your details are not passed to anyone until you ask."
  - NEW:
- **KEY** `GuideLayout › footcta.default.heading`
  - CURRENT: "When you want a figure you can trust."
  - NEW:
- **KEY** `GuideLayout › footcta.default.body`
  - CURRENT: "A specialist can review your cover against the real rebuild reality of your home. The House introduces you; Provenance arranges the cover."
  - NEW:
- **KEY** `GuideLayout › footcta.default.button`
  - CURRENT: "Speak to a specialist"
  - NEW:
- **KEY** `GuideLayout › related.label`
  - CURRENT: "Related reading"
  - NEW:

### component:BusinessPage
<sub>source: src/components/insurance/BusinessPage.tsx — hardcoded copy on every /insurance/business/[slug] page</sub>

- **KEY** `BusinessPage › hero.eyebrow.prefix`
  - CURRENT: "Insurance · "
  - NEW:
- **KEY** `BusinessPage › hero.cta.button`
  - CURRENT: "Request a review"
  - NEW:
- **KEY** `BusinessPage › enquiry.eyebrow`
  - CURRENT: "Request a review"
  - NEW:
- **KEY** `BusinessPage › enquiry.heading`
  - CURRENT: "A free look at what you already hold."
  - NEW:
- **KEY** `BusinessPage › enquiry.body`
  - CURRENT: "Leave your details and a specialist will be in touch. We ask only what we need to make the introduction, nothing evaluative."
  - NEW:
- **KEY** `BusinessPage › enquiry.submitlabel`
  - CURRENT: "Request a review"
  - NEW:

### component:EverydayPreframe
<sub>source: src/components/insurance/EverydayPreframe.tsx — hardcoded copy on every everyday Group D page</sub>

- **KEY** `EverydayPreframe › hero.eyebrow`
  - CURRENT: "Insurance · Everyday cover"
  - NEW:
- **KEY** `EverydayPreframe › covered.heading`
  - CURRENT: "At a glance"
  - NEW:
- **KEY** `EverydayPreframe › howitworks.heading`
  - CURRENT: "How it works"
  - NEW:
- **KEY** `EverydayPreframe › howitworks.step1.h`
  - CURRENT: "Choose your cover"
  - NEW:
- **KEY** `EverydayPreframe › howitworks.step1.p`
  - CURRENT: "Pick the option that fits from the choices above."
  - NEW:
- **KEY** `EverydayPreframe › howitworks.step2.h`
  - CURRENT: "Leave a few details"
  - NEW:
- **KEY** `EverydayPreframe › howitworks.step2.p`
  - CURRENT: "A short introduction, nothing about sums insured, and no comparison forms."
  - NEW:
- **KEY** `EverydayPreframe › howitworks.step3.h`
  - CURRENT: "A specialist arranges it"
  - NEW:
- **KEY** `EverydayPreframe › howitworks.step3.p`
  - CURRENT: "Provenance calls, arranges the cover and handles it from there."
  - NEW:
- **KEY** `EverydayPreframe › howitworks.cta.button`
  - CURRENT: "Speak to a specialist →"
  - NEW:
- **KEY** `EverydayPreframe › howitworks.cta.note`
  - CURRENT: "The House introduces you; Provenance arranges and administers the cover."
  - NEW:
- **KEY** `EverydayPreframe › handoff.statement` — REGULATORY
  - CURRENT: "Cover is arranged and administered by Provenance, authorised and regulated by the FCA. The House is an introducer only: it does not advise on, arrange, administer or compare insurance."
  - NEW:
- **KEY** `EverydayPreframe › highvalue.routing.text`
  - CURRENT: "Insuring a listed, high-value or non-standard home? Everyday cover is not built for it. "
  - NEW:
- **KEY** `EverydayPreframe › highvalue.routing.link`
  - CURRENT: "Speak to a specialist instead →"
  - NEW:

### component:InsuranceTrustStrip
<sub>source: src/components/insurance/InsuranceTrustStrip.tsx (shared)</sub>

- **KEY** `InsuranceTrustStrip › pillar1.heading`
  - CURRENT: "FCA-regulated"
  - NEW:
- **KEY** `InsuranceTrustStrip › pillar2.heading`
  - CURRENT: "Claims handled for you"
  - NEW:
- **KEY** `InsuranceTrustStrip › pillar2.body`
  - CURRENT: "From first notification to settlement"
  - NEW:
- **KEY** `InsuranceTrustStrip › pillar3.heading`
  - CURRENT: "A named specialist"
  - NEW:
- **KEY** `InsuranceTrustStrip › pillar3.body`
  - CURRENT: "One person who knows the file, not a call centre"
  - NEW:
- **KEY** `InsuranceTrustStrip › pillar4.heading`
  - CURRENT: "Charity-owned backing"
  - NEW:
- **KEY** `InsuranceTrustStrip › pillar4.body` (assembles as "Provenance places business with markets in the {backer} group")
  - CURRENT: "Provenance places business with markets in the {backer} group"
  - NEW:

### component:WhyHouseCover
<sub>source: src/components/insurance/WhyHouseCover.tsx (shared)</sub>

- **KEY** `WhyHouseCover › section.eyebrow`
  - CURRENT: "Why House cover"
  - NEW:
- **KEY** `WhyHouseCover › section.heading`
  - CURRENT: "What an introduction from the House is worth."
  - NEW:
- **KEY** `WhyHouseCover › pillar1.heading`
  - CURRENT: "A considered introduction"
  - NEW:
- **KEY** `WhyHouseCover › pillar1.body`
  - CURRENT: "Not a comparison form. The House introduces you to a specialist who takes the time to understand the home before anything is arranged."
  - NEW:
- **KEY** `WhyHouseCover › pillar2.heading`
  - CURRENT: "One named specialist"
  - NEW:
- **KEY** `WhyHouseCover › pillar2.body`
  - CURRENT: "One person who knows the file, from the first conversation to renewal. Not a call centre, and not a new name each time."
  - NEW:
- **KEY** `WhyHouseCover › pillar3.heading`
  - CURRENT: "Claims handled for you"
  - NEW:
- **KEY** `WhyHouseCover › pillar3.body`
  - CURRENT: "Provenance handles the claim on your behalf, from first notification through to settlement, so you are not left to argue it alone."
  - NEW:
- **KEY** `WhyHouseCover › pillar4.heading`
  - CURRENT: "Profits to good causes"
  - NEW:
- **KEY** `WhyHouseCover › pillar4.body`
  - CURRENT: "Cover is placed with markets in the Benefact group, which is charity-owned and gives its available profits to good causes, so business placed through it can support charitable causes at no extra cost to you."
  - NEW:
- **KEY** `WhyHouseCover › cta.primary`
  - CURRENT: "Speak to a specialist →"
  - NEW:
- **KEY** `WhyHouseCover › cta.secondary`
  - CURRENT: "Or arrange everyday cover →"
  - NEW:

### component:WhatMayBeCovered
<sub>source: src/components/insurance/WhatMayBeCovered.tsx (shared)</sub>

- **KEY** `WhatMayBeCovered › section.eyebrow`
  - CURRENT: "What may be covered"
  - NEW:
- **KEY** `WhatMayBeCovered › section.heading`
  - CURRENT: "The kinds of thing a good policy is there for."
  - NEW:
- **KEY** `WhatMayBeCovered › section.intro`
  - CURRENT: "These are examples, to show the shape of cover, not a list of what your policy includes. What is actually covered, and to what limit, is set out in the policy wording. Read it before you rely on anything here."
  - NEW:
- **KEY** `WhatMayBeCovered › example1.heading`
  - CURRENT: "A burst pipe"
  - NEW:
- **KEY** `WhatMayBeCovered › example1.body`
  - CURRENT: "Sudden escape of water that soaks floors and ceilings, and putting the damage right."
  - NEW:
- **KEY** `WhatMayBeCovered › example2.heading`
  - CURRENT: "Storm and flood"
  - NEW:
- **KEY** `WhatMayBeCovered › example2.body`
  - CURRENT: "Damage to the building and its contents from named storms and rising water."
  - NEW:
- **KEY** `WhatMayBeCovered › example3.heading`
  - CURRENT: "Fire and smoke"
  - NEW:
- **KEY** `WhatMayBeCovered › example3.body`
  - CURRENT: "From the fabric of the house to the things inside it, and somewhere to stay while it is repaired."
  - NEW:
- **KEY** `WhatMayBeCovered › example4.heading`
  - CURRENT: "Theft and attempted break-in"
  - NEW:
- **KEY** `WhatMayBeCovered › example4.body`
  - CURRENT: "Loss of contents, and the cost of making the home secure again afterwards."
  - NEW:
- **KEY** `WhatMayBeCovered › example5.heading`
  - CURRENT: "Accidental damage"
  - NEW:
- **KEY** `WhatMayBeCovered › example5.body`
  - CURRENT: "The dropped heirloom or the foot through the ceiling, where the cover is written to include it."
  - NEW:
- **KEY** `WhatMayBeCovered › example6.heading`
  - CURRENT: "Valuables and belongings away from home"
  - NEW:
- **KEY** `WhatMayBeCovered › example6.body`
  - CURRENT: "Jewellery, art and personal items, at home and, where added, out in the world."
  - NEW:
- **KEY** `WhatMayBeCovered › cta.primary`
  - CURRENT: "See what each cover includes →"
  - NEW:
- **KEY** `WhatMayBeCovered › cta.secondary`
  - CURRENT: "Where to find the full policy wording →"
  - NEW:
- **KEY** `WhatMayBeCovered › footnote`
  - CURRENT: "The full policy wording, key facts and exclusions are provided by Provenance before you commit to anything."
  - NEW:

### component:CoverCards
<sub>source: src/components/insurance/CoverCards.tsx (shared; each cta renders with a trailing " →")</sub>

- **KEY** `CoverCards › card1.heading`
  - CURRENT: "The house"
  - NEW:
- **KEY** `CoverCards › card1.body`
  - CURRENT: "Listed and period homes, thatch, non-standard construction, second and unoccupied homes."
  - NEW:
- **KEY** `CoverCards › card1.cta`
  - CURRENT: "Listed & period homes"
  - NEW:
- **KEY** `CoverCards › card2.heading`
  - CURRENT: "The things in it"
  - NEW:
- **KEY** `CoverCards › card2.body`
  - CURRENT: "Fine art, jewellery, watches, wine and collections, scheduled and valued properly."
  - NEW:
- **KEY** `CoverCards › card2.cta`
  - CURRENT: "Fine art, jewellery & collections"
  - NEW:
- **KEY** `CoverCards › card3.heading`
  - CURRENT: "The cars"
  - NEW:
- **KEY** `CoverCards › card3.body`
  - CURRENT: "Classic, prestige and collection vehicles, on one renewal date with the home."
  - NEW:
- **KEY** `CoverCards › card3.cta`
  - CURRENT: "Classic & prestige motor"
  - NEW:
- **KEY** `CoverCards › card4.heading`
  - CURRENT: "The works"
  - NEW:
- **KEY** `CoverCards › card4.body`
  - CURRENT: "One policy over the existing structure and the contract works, for the life of a project."
  - NEW:
- **KEY** `CoverCards › card4.cta`
  - CURRENT: "Renovation & works"
  - NEW:
- **KEY** `CoverCards › card5.heading`
  - CURRENT: "The boat, yacht or aircraft"
  - NEW:
- **KEY** `CoverCards › card5.body`
  - CURRENT: "Marine and aviation cover, from a family boat to complex Lloyd's placements, arranged alongside the home."
  - NEW:
- **KEY** `CoverCards › card5.cta`
  - CURRENT: "Boat, yacht & aviation"
  - NEW:

### component:CoverFinder
<sub>source: src/components/insurance/CoverFinder.tsx (shared)</sub>

- **KEY** `CoverFinder › input.label`
  - CURRENT: "Find your cover"
  - NEW:
- **KEY** `CoverFinder › input.placeholder`
  - CURRENT: "Try 'van', 'listed', 'necklace', 'toyota', 'plumber'…"
  - NEW:
- **KEY** `CoverFinder › no-match` (assembles: "Nothing matches "{q}". " + link "Speak to a specialist" + " and we will point you the right way.")
  - CURRENT: "Nothing matches "{q}". Speak to a specialist and we will point you the right way."
  - NEW:
- **KEY** `CoverFinder › card.view-cta`
  - CURRENT: "View cover →"
  - NEW:

### component:ProvenanceLockup
<sub>source: src/components/insurance/ProvenanceLockup.tsx (shared; label is a prop defaulting to this string)</sub>

- **KEY** `ProvenanceLockup › label.default`
  - CURRENT: "Arranged by"
  - NEW:

### component:ClaimsHelp
<sub>source: src/components/insurance/ClaimsHelp.tsx (shared; renders the claims band + full claims detail)</sub>

- **KEY** `ClaimsHelp › band.eyebrow`
  - CURRENT: "Already with us"
  - NEW:
- **KEY** `ClaimsHelp › band.heading`
  - CURRENT: "Need to make a claim, or a hand with your cover?"
  - NEW:
- **KEY** `ClaimsHelp › band.body`
  - CURRENT: "If something has happened, or you simply need to reach the right person, the House will point you to it. Claims are handled by Provenance, and we will make sure you get there quickly."
  - NEW:
- **KEY** `ClaimsHelp › band.cta`
  - CURRENT: "Make a claim or get help →"
  - NEW:
- **KEY** `ClaimsHelp › band.contact.eyebrow`
  - CURRENT: "Talk to the House"
  - NEW:
- **KEY** `ClaimsHelp › detail.block1.eyebrow`
  - CURRENT: "If you need to make a claim"
  - NEW:
- **KEY** `ClaimsHelp › detail.block1.para1` (interpolates PROVENANCE.legalName)
  - CURRENT: "Claims on your policy are handled by {PROVENANCE.legalName} under its FCA permissions, from the first notification through to settlement. The sooner a claim is reported the better, so please get in touch as soon as it is safe to."
  - NEW:
- **KEY** `ClaimsHelp › detail.block1.para2`
  - CURRENT: "If you are not sure where to start, talk to the House on the numbers below and we will make sure you reach the right person at Provenance quickly. We do not assess or settle claims ourselves."
  - NEW:
- **KEY** `ClaimsHelp › detail.block2.eyebrow`
  - CURRENT: "Who to contact"
  - NEW:
- **KEY** `ClaimsHelp › detail.block2.para`
  - CURRENT: "Talk to the House and we will connect you to your specialist and to Provenance."
  - NEW:
- **KEY** `ClaimsHelp › detail.block2.emergency`
  - CURRENT: "In an emergency that puts people or the property at risk, contact the emergency services first, then make your home safe before you call."
  - NEW:
- **KEY** `ClaimsHelp › detail.block3.eyebrow`
  - CURRENT: "What to have ready"
  - NEW:
- **KEY** `ClaimsHelp › detail.block3.intro`
  - CURRENT: "Having a few things to hand makes the first call quicker."
  - NEW:
- **KEY** `ClaimsHelp › detail.block3.ready1`
  - CURRENT: "Your policy number, and the name the cover is held in."
  - NEW:
- **KEY** `ClaimsHelp › detail.block3.ready2`
  - CURRENT: "When it happened, and where, with the address if it concerns the home."
  - NEW:
- **KEY** `ClaimsHelp › detail.block3.ready3`
  - CURRENT: "A plain account of what happened and what has been affected."
  - NEW:
- **KEY** `ClaimsHelp › detail.block3.ready4`
  - CURRENT: "Photographs of any damage, and receipts or valuations if you have them."
  - NEW:
- **KEY** `ClaimsHelp › detail.block3.ready5`
  - CURRENT: "A crime reference number, if the police have been involved."
  - NEW:
- **KEY** `ClaimsHelp › detail.block4.eyebrow`
  - CURRENT: "How the House and Provenance fit"
  - NEW:
- **KEY** `ClaimsHelp › detail.block4.para`
  - CURRENT: "The House introduces you to a specialist and stays alongside you. Provenance advises on, arranges and administers the cover, and handles claims on your behalf. The House does not advise on, arrange, administer, compare or transact insurance, and it does not settle claims."
  - NEW:
- **KEY** `ClaimsHelp › detail.block4.complaints` ("regulatory notice" links to /insurance/terms) — REGULATORY
  - CURRENT: "Complaints about your cover or a claim are handled by Provenance under its FCA permissions, and eligible complainants can refer a matter to the Financial Ombudsman Service. The full route is set out on the regulatory notice page."
  - NEW:

### component:InsuranceCtaBand
<sub>source: src/components/insurance/InsuranceCtaBand.tsx — nearly all copy comes from props (see each page's ctaBand.* blocks); only fixed fragment below</sub>

- **KEY** `InsuranceCtaBand › call.fallback`
  - CURRENT: "Call "
  - NEW:

### component:InsuranceDisclosure
<sub>source: src/components/insurance/InsuranceDisclosure.tsx — main sentence is DISCLOSURE_TEXT (see config below)</sub>

- **KEY** `InsuranceDisclosure › link.label`
  - CURRENT: "How this works, and how we are paid"
  - NEW:

### component:InsuranceEnquiryForm
<sub>source: src/components/insurance/InsuranceEnquiryForm.tsx (shared enquiry form)</sub>

- **KEY** `InsuranceEnquiryForm › submit.default-label`
  - CURRENT: "Speak to a specialist"
  - NEW:
- **KEY** `InsuranceEnquiryForm › field.name.label`
  - CURRENT: "Name"
  - NEW:
- **KEY** `InsuranceEnquiryForm › field.company.label`
  - CURRENT: "Company"
  - NEW:
- **KEY** `InsuranceEnquiryForm › field.email.label`
  - CURRENT: "Email"
  - NEW:
- **KEY** `InsuranceEnquiryForm › field.phone.label`
  - CURRENT: "Phone"
  - NEW:
- **KEY** `InsuranceEnquiryForm › field.postcode.label`
  - CURRENT: "Postcode"
  - NEW:
- **KEY** `InsuranceEnquiryForm › field.cover.label`
  - CURRENT: "The cover you need"
  - NEW:
- **KEY** `InsuranceEnquiryForm › field.cover.placeholder-option`
  - CURRENT: "Choose cover…"
  - NEW:
- **KEY** `InsuranceEnquiryForm › field.project-start.label`
  - CURRENT: "Project start month "
  - NEW:
- **KEY** `InsuranceEnquiryForm › field.project-start.default-option`
  - CURRENT: "Not sure yet"
  - NEW:
- **KEY** `InsuranceEnquiryForm › field.notes.label`
  - CURRENT: "Additional information "
  - NEW:
- **KEY** `InsuranceEnquiryForm › field.notes.placeholder`
  - CURRENT: "Need cover for more than one thing, or anything else we should know? Add it here."
  - NEW:
- **KEY** `InsuranceEnquiryForm › marketing-optin.label`
  - CURRENT: "Keep me posted with occasional notes from the House. You can stop any time."
  - NEW:
- **KEY** `InsuranceEnquiryForm › validation.email`
  - CURRENT: "Enter a valid email address"
  - NEW:
- **KEY** `InsuranceEnquiryForm › validation.phone`
  - CURRENT: "Enter a valid phone number"
  - NEW:
- **KEY** `InsuranceEnquiryForm › validation.cover`
  - CURRENT: "Please choose the cover you need"
  - NEW:

### component:RenewalReminderForm
<sub>source: src/components/insurance/RenewalReminderForm.tsx (shared)</sub>

- **KEY** `RenewalReminderForm › field.email.label`
  - CURRENT: "Email"
  - NEW:
- **KEY** `RenewalReminderForm › field.month.label`
  - CURRENT: "Renewal month"
  - NEW:
- **KEY** `RenewalReminderForm › field.month.placeholder-option`
  - CURRENT: "Choose a month…"
  - NEW:
- **KEY** `RenewalReminderForm › consent.label`
  - CURRENT: "Email me once, near my renewal. I understand this is not an insurance enquiry and my details are not passed on."
  - NEW:
- **KEY** `RenewalReminderForm › submit.label`
  - CURRENT: "Remind me"
  - NEW:
- **KEY** `RenewalReminderForm › success.message`
  - CURRENT: "Done. We'll send one email at the right moment, and nothing else."
  - NEW:

<sub>ThankYouConversion.tsx has no copy (fires an analytics event only). Config facts — PROVENANCE.legalName, .frn, .group, .backer, INTRODUCER_LEGAL_NAME, phone 0800 047 8738, email sales@willowalexander.co.uk — are constants in src/lib/insurance/config.ts / ClaimsHelp.tsx; DO NOT rewrite (facts/legal).</sub>

### config: DISCLOSURE_TEXT
<sub>source: src/lib/insurance/config.ts — the standing regulatory disclosure sentence used by InsuranceDisclosure across pages. REGULATORY — clarity/tone only.</sub>

- **KEY** `config › DISCLOSURE_TEXT` (interpolates PROVENANCE.legalName / .frn)
  - CURRENT: "Insurance from the House is arranged and administered by {PROVENANCE.legalName}, authorised and regulated by the Financial Conduct Authority (FRN {PROVENANCE.frn}). House of Willow Alexander acts solely as an introducer."
  - NEW:

### config: cover-finder index (ALL_COVERS)
<sub>source: src/lib/insurance/cover-index.ts — names + blurbs shown in the CoverFinder search results across insurance pages.</sub>

- **KEY** `cover-index[1].name`
  - CURRENT: "Home insurance"
  - NEW:
- **KEY** `cover-index[1].blurb`
  - CURRENT: "Buildings and contents for a standard home."
  - NEW:
- **KEY** `cover-index[2].name`
  - CURRENT: "Car, van & motorbike"
  - NEW:
- **KEY** `cover-index[2].blurb`
  - CURRENT: "Including temporary cover from one hour to 28 days."
  - NEW:
- **KEY** `cover-index[3].name`
  - CURRENT: "Pet & travel"
  - NEW:
- **KEY** `cover-index[3].blurb`
  - CURRENT: "Pet cover, and single-trip or annual travel."
  - NEW:
- **KEY** `cover-index[4].name`
  - CURRENT: "Breakdown & bicycle"
  - NEW:
- **KEY** `cover-index[4].blurb`
  - CURRENT: "Roadside and recovery, and cover for bikes."
  - NEW:
- **KEY** `cover-index[5].name`
  - CURRENT: "Boiler & heating cover"
  - NEW:
- **KEY** `cover-index[5].blurb`
  - CURRENT: "When the heating stops."
  - NEW:
- **KEY** `cover-index[6].name`
  - CURRENT: "Appliance cover"
  - NEW:
- **KEY** `cover-index[6].blurb`
  - CURRENT: "The machines a home runs on."
  - NEW:
- **KEY** `cover-index[7].name`
  - CURRENT: "Private client & estate"
  - NEW:
- **KEY** `cover-index[7].blurb`
  - CURRENT: "One advised policy for period & high-value homes."
  - NEW:
- **KEY** `cover-index[8].name`
  - CURRENT: "Listed buildings"
  - NEW:
- **KEY** `cover-index[8].blurb`
  - CURRENT: "Grade I, II* and II homes."
  - NEW:
- **KEY** `cover-index[9].name`
  - CURRENT: "Thatched properties"
  - NEW:
- **KEY** `cover-index[9].blurb`
  - CURRENT: "Thatch, read on its real risk."
  - NEW:
- **KEY** `cover-index[10].name`
  - CURRENT: "Non-standard construction"
  - NEW:
- **KEY** `cover-index[10].blurb`
  - CURRENT: "Timber, cob, flint, steel and more."
  - NEW:
- **KEY** `cover-index[11].name`
  - CURRENT: "Second & holiday homes"
  - NEW:
- **KEY** `cover-index[11].blurb`
  - CURRENT: "Cover that fits real occupancy."
  - NEW:
- **KEY** `cover-index[12].name`
  - CURRENT: "Unoccupied & probate"
  - NEW:
- **KEY** `cover-index[12].blurb`
  - CURRENT: "Empty homes, calmly covered."
  - NEW:
- **KEY** `cover-index[13].name`
  - CURRENT: "Renovation & works"
  - NEW:
- **KEY** `cover-index[13].blurb`
  - CURRENT: "One policy for the works."
  - NEW:
- **KEY** `cover-index[14].name`
  - CURRENT: "Fine art, jewellery & collections"
  - NEW:
- **KEY** `cover-index[14].blurb`
  - CURRENT: "Art, jewellery, watches and wine."
  - NEW:
- **KEY** `cover-index[15].name`
  - CURRENT: "Classic & prestige motor"
  - NEW:
- **KEY** `cover-index[15].blurb`
  - CURRENT: "The car, on one renewal date."
  - NEW:
- **KEY** `cover-index[16].name`
  - CURRENT: "Boat, yacht & aviation"
  - NEW:
- **KEY** `cover-index[16].blurb`
  - CURRENT: "Marine and aviation, on the estate."
  - NEW:
- **KEY** `cover-index[17].name`
  - CURRENT: "Business insurance"
  - NEW:
- **KEY** `cover-index[17].blurb`
  - CURRENT: "Introductions through the House's network."
  - NEW:
- **KEY** `cover-index[18].name`
  - CURRENT: "Trades & contractors"
  - NEW:
- **KEY** `cover-index[18].blurb`
  - CURRENT: "Liability, tools and contract works."
  - NEW:
- **KEY** `cover-index[19].name`
  - CURRENT: "Professional indemnity"
  - NEW:
- **KEY** `cover-index[19].blurb`
  - CURRENT: "Cover for advice given."
  - NEW:
