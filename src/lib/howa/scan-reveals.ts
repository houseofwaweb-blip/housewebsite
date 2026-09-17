import type { ScanRevealData, ScanField } from "@/components/howa/scans/ScanReveal";

/**
 * Per-tool "scan-to-result" datasets (§06). Each drives the shared ScanReveal
 * engine in the exact style of the design reveal, but with the fields that tool
 * actually returns. Every field maps to a real deliverable in the scan catalog,
 * so the reveal stays truthful. Design keeps its own Interior/Garden showcase;
 * these cover the other scan-type tools.
 *
 * captions length must equal fields.length + 3
 * (scan, resolve, one per field, final).
 */

export type ToolReveal = { data: ScanRevealData; fields: ScanField[] };

export const SCAN_REVEALS: Record<string, ToolReveal> = {
  repair: {
    data: {
      productName: "Repair Scan",
      source: "Photo + Home Record",
      confidence: "Moderate",
      statusScanning: "HoWA · scanning",
      statusResolved: "Assessed",
      image: "/howa/v5/ai-repair-scan.png",
      imageAlt: "A home fault being read for an initial assessment",
      imageLabel: "A reported fault",
      pins: ["Corrosion", "Damp trace", "Worn seal"],
      scanCaption: "Scanning the fault",
      resolveCaption: "Reading the fault",
      finalCaption: "Your repair scan",
      disclaimer:
        "A sample assessment and indicative estimate, not a definitive diagnosis or a binding quote. A named provider confirms scope and price.",
      continueLabel: "Book a repair →",
      continueHref: "/services",
    },
    fields: [
      { kind: "text", label: "The problem", value: "A corroded radiator valve, with damp beginning to track into the skirting." },
      { kind: "chips", label: "How big it is", items: ["Localised", "Urgency: within days", "Water risk: medium"] },
      { kind: "chips", label: "Likely cause", items: ["Failed valve seal", "A slow weep over time"] },
      { kind: "chips", label: "Materials and parts", items: ["Thermostatic valve", "PTFE tape", "System inhibitor", "Bleed key"] },
      { kind: "metric", label: "Indicative cost", lo: 120, hi: 280, prefix: "£", note: "An indicative range, not a binding quote." },
      { kind: "brief", label: "The job brief", lines: [
        "Isolate and drain the affected circuit before removing the valve.",
        "Fit a new valve, re-tape the joints and refill with inhibitor.",
        "Dry and monitor the skirting so damp does not track further.",
        "A competent or Gas Safe engineer confirms scope and price on site.",
      ] },
    ],
  },

  garden: {
    data: {
      productName: "Garden Scan",
      source: "Photo + Home Record",
      confidence: "Moderate",
      statusScanning: "HoWA · scanning",
      statusResolved: "Read",
      image: "/howa/v5/ai-garden-scan.png",
      imageAlt: "A garden being read for its zones, health and seasonal priorities",
      imageLabel: "A garden · scanned",
      pins: ["Lawn", "Deep border", "Terrace"],
      scanCaption: "Scanning the garden",
      resolveCaption: "Reading the garden",
      finalCaption: "Your garden scan",
      disclaimer:
        "A sample reading and indicative scope, not a botanical diagnosis, measured survey or binding quote. A named gardener confirms scope and price.",
      continueLabel: "Find a gardener →",
      continueHref: "/services",
    },
    fields: [
      { kind: "text", label: "What is growing", value: "Established lawn, mixed shrub borders and a young multi-stem tree, with a paved dining terrace." },
      { kind: "chips", label: "Health and condition", items: ["Lawn: healthy", "Borders: congested", "Tree: establishing"] },
      { kind: "chips", label: "Zones", items: ["Terrace dining", "Lawn", "Deep borders"] },
      { kind: "chips", label: "Seasonal priorities", items: ["Lift and divide borders", "Autumn lawn feed", "Mulch the beds"] },
      { kind: "metric", label: "Indicative scope", lo: 800, hi: 2200, prefix: "£", note: "An indicative range for the work, not a quote." },
      { kind: "brief", label: "The plan", lines: [
        "Relieve the congested borders and re-space for year-round structure.",
        "A seasonal care rhythm that keeps the lawn and beds ahead of the weather.",
        "Protect the young tree through its establishing years.",
        "A named gardener confirms scope and price on a visit.",
      ] },
    ],
  },

  property: {
    data: {
      productName: "Property & Quote Intelligence",
      source: "Photo + Home Record",
      confidence: "Low",
      statusScanning: "HoWA · scanning",
      statusResolved: "Interpreted",
      image: "/howa/v5/ai-property-scan.png",
      imageAlt: "A condition issue being interpreted for risk and missing evidence",
      imageLabel: "A condition issue",
      pins: ["Crack line", "Damp patch", "Evidence gap"],
      scanCaption: "Scanning the issue",
      resolveCaption: "Reading the issue",
      finalCaption: "Your interpretation",
      disclaimer:
        "An interpretation to help you ask better questions, not a chartered survey, structural verdict or regulated advice. A qualified professional confirms condition and risk.",
      continueLabel: "Find a specialist →",
      continueHref: "/services",
    },
    fields: [
      { kind: "text", label: "What we see", value: "A stepped crack above the bay and a damp patch to the chimney breast." },
      { kind: "chips", label: "How serious", items: ["Monitor", "Not urgent", "Watch after rain"] },
      { kind: "chips", label: "Missing evidence", items: ["Date first noticed", "Photos over time", "A damp-meter reading"] },
      { kind: "chips", label: "The quote, decoded", items: ["Underpinning flagged early", "No cause established yet", "Second opinion advised"] },
      { kind: "brief", label: "What to do next", lines: [
        "Gather the missing evidence before accepting any major work.",
        "Monitor the crack with dated photos across a few weeks.",
        "Ask the builder to establish the cause, not just the fix.",
        "A chartered surveyor confirms condition and risk.",
      ] },
    ],
  },

  documents: {
    data: {
      productName: "Document Intelligence",
      source: "Uploaded document",
      confidence: "High",
      statusScanning: "HoWA · scanning",
      statusResolved: "Extracted",
      image: "/howa/v5/ai-documents-scan.png",
      imageAlt: "A policy document being read for its key facts, dates and parties",
      imageLabel: "A policy document",
      pins: ["Renewal date", "Insurer", "Excess"],
      scanCaption: "Scanning the document",
      resolveCaption: "Reading the document",
      finalCaption: "Your document scan",
      disclaimer:
        "Extraction to help you find and act, not legal or financial advice. You can correct anything HoWA reads, for free.",
      continueLabel: "See the Home Record →",
      continueHref: "/howa/house-customers",
    },
    fields: [
      { kind: "text", label: "The document", value: "A buildings and contents insurance schedule." },
      { kind: "chips", label: "Key facts", items: ["Insurer named", "Sum insured", "Excess £250"] },
      { kind: "chips", label: "Dates", items: ["Renews 14 Mar", "30-day notice", "Annual"] },
      { kind: "chips", label: "Parties", items: ["Policyholder", "Insurer", "Broker"] },
      { kind: "chips", label: "Reminders set", items: ["Renewal minus 30 days", "Compare cover", "Check contents value"] },
      { kind: "brief", label: "Filed to the Home Record", lines: [
        "The document and its extracted facts are saved to the address.",
        "Renewal and notice dates become reminders you will actually see.",
        "You can correct anything HoWA reads, for free.",
        "Nothing is shared without your say-so.",
      ] },
    ],
  },

  plan: {
    data: {
      productName: "Home Plan",
      source: "Home Record",
      confidence: "Moderate",
      statusScanning: "HoWA · scanning",
      statusResolved: "Sequenced",
      image: "/howa/v5/ai-plan-scan.png",
      imageAlt: "The whole home being sequenced into a calm plan",
      imageLabel: "The whole home",
      pins: ["Due now", "This season", "Later"],
      scanCaption: "Scanning the home",
      resolveCaption: "Reading the record",
      finalCaption: "Your home plan",
      disclaimer:
        "A prioritised plan from the evidence HoWA holds, including a deliberate choice to leave some things alone. You decide what to act on.",
      continueLabel: "Meet your home →",
      continueHref: "/howa",
    },
    fields: [
      { kind: "text", label: "What the home knows", value: "Certificates, services, warranties, seasonal jobs and a few open risks." },
      { kind: "chips", label: "Due now", items: ["Boiler service", "Gutter clear", "Alarm test"] },
      { kind: "chips", label: "This season", items: ["Bleed radiators", "Lag exposed pipes", "Check roof after storms"] },
      { kind: "chips", label: "Deliberately left", items: ["Repaint hallway", "Re-turf lawn"] },
      { kind: "brief", label: "Your calm sequence", lines: [
        "The few things that protect the home come first.",
        "Seasonal jobs are grouped so nothing is done twice.",
        "Some things are deliberately left alone, and said so.",
        "You decide what to act on, schedule, monitor or delegate.",
      ] },
    ],
  },
};
