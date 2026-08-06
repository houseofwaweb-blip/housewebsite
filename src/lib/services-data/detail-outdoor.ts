import type { RequestableDetail } from "./requestable-detail";

/**
 * Page content for the GARDEN and EXTERIOR half of the requestable catalogue.
 *
 * Nine services the House arranges but cannot price from a postcode alone:
 * landscaping, fencing and decking, irrigation, garden lighting, gutter and
 * downpipe repair, roofing, chimney sweeping, driveways and paving, and solar
 * panel cleaning. Each renders through the same `ServiceDetail` template as
 * gardening and gutter cleaning, in `mode="quote"`, so a request page carries
 * the same weight as a bookable one.
 *
 * House voice rules that apply to every entry here:
 *   - No em dashes. Use a comma, or start a new sentence.
 *   - Never name machine intelligence, in any abbreviation.
 *   - Never invent a price, a response time, a guarantee or an accreditation.
 *     Where the honest answer is "we would need to look first", write that.
 *   - Work at height, gas, electrical and structural work is named plainly as
 *     requiring a qualified or certificated specialist.
 *   - The work is carried out by a House of Willow Alexander team or by a named
 *     House Approved professional, disclosed before anyone commits.
 */
export const OUTDOOR_DETAIL: Record<string, RequestableDetail> = {
  // ---------------------------------------------------------------- Garden --
  landscaping: {
    eyebrow: "Services · Landscaping and garden build",
    headline: "The hard bones of a garden.",
    headlineEm: "of a garden.",
    lede: "Patios, paths, steps, raised beds and retaining walls: the built structure that decides how a garden is used. For homes making a lasting change rather than a seasonal tidy.",
    included: [
      "Site clearance, excavation and disposal through a licensed carrier",
      "Sub-base, haunching and falls set so surfaces drain away from the house",
      "Paving, stone, brick and setts laid, cut and pointed",
      "Raised beds, steps, low retaining walls and edging in timber, brick or stone",
      "Topsoil, turf and planting reinstated where the build has disturbed them",
    ],
    how: [
      "Send photographs and rough measurements of the area you have in mind",
      "We arrange a site visit to check levels, drainage, access and ground conditions",
      "A written proposal follows, itemised by element, with materials named",
      "Work is scheduled in stages, and you are told who is on site and when",
    ],
    faq: [
      {
        q: "Why can you not price this from photographs?",
        a: "Photographs tell us the shape of the job but not the ground beneath it. Levels, drainage, what is under the existing surface and how materials reach the garden all change the figure, so we look before we quote.",
      },
      {
        q: "How long does a garden build take?",
        a: "A small patio is usually a week. A full rebuild with levels, drainage and planting runs to several weeks. We give you a stage plan with the proposal so you know which weeks are noisy and which are not.",
      },
      {
        q: "What happens if the weather turns?",
        a: "Groundwork and laying stop in hard frost or sustained heavy rain, because concrete and mortar will not cure properly. We reschedule rather than press on, and we tell you the same day if a day is lost.",
      },
      {
        q: "Will I need planning permission?",
        a: "Most patios and paths do not, but raised decking, larger retaining walls and anything altering levels near a boundary can. We will tell you where we think a consent is needed, and you should confirm it with your local authority before we start.",
      },
    ],
    practical: {
      duration: "One week for a small patio, several weeks for a full build",
      materials: "Stone, paving, aggregate and timber supplied by us and itemised in the proposal",
      access: "We need a route wide enough for barrows, and somewhere to stand materials and spoil",
      parking: "A vehicle bay near the property for deliveries and skips or grab lorries",
      excluded: [
        "Structural retaining walls above one metre, which need an engineer's design",
        "Drainage connections into a public sewer, which need a water authority approval",
        "Garden design drawings, which sit with our garden design service",
      ],
    },
  },

  "fencing-decking": {
    eyebrow: "Services · Fencing and decking",
    headline: "Boundaries that hold.",
    headlineEm: "that hold.",
    lede: "New fencing, repairs, gates and timber decking, set properly into the ground rather than propped up for another winter. For gardens where the boundary has started to lean or lift.",
    included: [
      "Close-board, feather-edge, panel and picket fencing supplied and erected",
      "Posts set in concrete or on spikes, with gravel boards where ground contact is a risk",
      "Repairs to existing runs: replacement posts, rails, boards and panels",
      "Gates hung and ironmongery fitted, including latches, drop bolts and closers",
      "Softwood and hardwood decking, framed, laid and finished, with steps where needed",
    ],
    how: [
      "Send photographs of the run and a rough length in metres or panel count",
      "We come back with an estimate, or ask for a site visit where levels are awkward",
      "You choose timber, height and finish, and we confirm a date in writing",
      "Old timber is taken away by a licensed carrier and the ground is left clear",
    ],
    faq: [
      {
        q: "How is fencing priced?",
        a: "By the metre or by the panel, plus posts, gravel boards and the removal of what is there now. Awkward access, sloping ground and concrete-set old posts add labour, which is why we ask for photographs before quoting.",
      },
      {
        q: "Whose fence is it?",
        a: "That is set by your deeds, not by convention, and the House cannot decide it for you. Check your title plan, and speak to your neighbour before work starts if the boundary is shared.",
      },
      {
        q: "Can decking be laid over an existing patio?",
        a: "Often yes, provided there is drainage beneath and enough height at door thresholds. We check both on site, because a deck that traps water will rot from underneath whatever timber you choose.",
      },
      {
        q: "Does new timber need treating?",
        a: "Pressure-treated softwood arrives protected, but cut ends need treating and most timber benefits from a stain or oil in its first year. We will tell you what this run needs and when.",
      },
    ],
    practical: {
      duration: "One to three days for a typical run, longer for decking",
      materials: "Timber, posts, fixings and concrete supplied and itemised",
      access: "Side or rear access wide enough to carry panels and posts through",
      parking: "A bay near the property for the timber delivery",
      excluded: [
        "Boundary disputes and deeds questions, which are for your solicitor",
        "Retaining walls holding back ground, which are a landscaping or structural job",
        "Composite decking systems, which we quote separately by supplier",
      ],
    },
  },

  irrigation: {
    eyebrow: "Services · Irrigation and garden watering",
    headline: "Water that arrives without you.",
    headlineEm: "without you.",
    lede: "Automatic watering for beds, pots, planters and lawns, set to the seasons and left to run. For gardens that suffer in August, and for households that travel.",
    included: [
      "Drip line to beds and borders, and micro-jets or dripper heads to pots and planters",
      "Pop-up sprinkler zones for lawns, laid out to avoid dry corners and overspray",
      "Controller and solenoid valves installed, with zones programmed by season",
      "Backflow prevention fitted at the supply, as water regulations require",
      "Rain sensor or soil moisture sensor where the layout suits it",
    ],
    how: [
      "Tell us the garden size, what is planted where, and where the outside tap sits",
      "We check flow and pressure at the supply, on site or with a simple test you can run",
      "A zoned layout and estimate follow, with the controller and heads named",
      "We install, commission each zone with you watching, and set the seasonal programme",
    ],
    faq: [
      {
        q: "Will it damage the lawn or borders?",
        a: "Pipe runs are trenched or slit into the ground and the turf is relaid over them. Borders take a few weeks to settle and look untouched by the following season.",
      },
      {
        q: "What happens in winter?",
        a: "The system should be drained and the controller switched off before the first hard frost, then recommissioned in spring. We can do both as a visit each year, or show you how once and leave you to it.",
      },
      {
        q: "Does this work with a water meter?",
        a: "Yes, and a well-zoned system usually uses less water than a hose because it delivers to the root rather than the air. We cannot promise a figure, because it depends on your planting and how often you were watering before.",
      },
      {
        q: "What if the pressure is not good enough?",
        a: "Some supplies will not run several sprinkler zones at once. We measure first, and if the flow is short we either split the garden into more zones or tell you plainly that a pump would be needed.",
      },
    ],
    practical: {
      duration: "One to three days depending on zone count",
      materials: "Pipe, fittings, heads, valves and the controller supplied and itemised",
      access: "Access to an outside tap or mains supply, and to a power point for the controller",
      parking: "A bay near the property on installation day",
      excluded: [
        "New mains water supply runs, which are a plumbing job",
        "Rainwater harvesting tanks and pumps, which we quote separately",
        "Ongoing seasonal shutdown and recommissioning unless you ask for it",
      ],
    },
  },

  "garden-lighting": {
    eyebrow: "Services · Garden lighting",
    headline: "A garden that keeps going after dark.",
    headlineEm: "after dark.",
    lede: "Lighting for paths, steps, planting and outdoor rooms, placed so you see the garden and not the fittings. Usually needs a site visit, and a qualified electrician where it is mains-wired.",
    included: [
      "A lighting scheme walked and agreed on site, fitting by fitting",
      "Path, step and threshold lighting where safety matters most",
      "Uplights and spike lights to trees, planting and garden structures",
      "Low-voltage transformers, cable runs and connectors installed and buried",
      "Timers, photocells or app-controlled switching where you want it",
    ],
    how: [
      "Send photographs of the garden by day and tell us what you want lit",
      "We visit at dusk where we can, because that is when placement is obvious",
      "An estimate follows, listing fittings, cable runs and any electrical work needed",
      "We install, then return after dark to aim each fitting and set the timings",
    ],
    faq: [
      {
        q: "Do I need an electrician?",
        a: "For low-voltage lighting run from an existing outdoor socket, usually not. Anything mains-wired, or any new circuit or outdoor socket, is carried out by a qualified registered electrician and certificated, and we arrange that as part of the job.",
      },
      {
        q: "How is this priced?",
        a: "By the number of fittings, the cable runs between them and whether any electrical work is needed. We do not publish a fixed price because two gardens of the same size can differ by half, so we quote after the visit.",
      },
      {
        q: "Will the cables be visible?",
        a: "Low-voltage cable is buried in beds and under paths where the route allows, and clipped discreetly where it does not. We agree the runs with you before anything goes in the ground.",
      },
      {
        q: "Will it annoy the neighbours?",
        a: "It can, if it is aimed badly. We use shielded fittings, aim downward or into planting rather than over a boundary, and set warm colour temperatures. The after-dark aiming visit exists mostly for this reason.",
      },
    ],
    practical: {
      duration: "One to two days, plus a short return visit after dark",
      materials: "Fittings, cable, transformers and controls supplied and itemised",
      access: "Access to the garden and to a suitable outdoor power supply",
      parking: "A bay near the property on installation day",
      excluded: [
        "Consumer unit work and new circuits beyond the agreed electrical scope",
        "Indoor lighting and switching",
        "Festoon and event lighting hire",
      ],
    },
  },

  // -------------------------------------------------------------- Exterior --
  "gutter-repair": {
    eyebrow: "Services · Gutter and downpipe repair",
    headline: "Rainwater sent where it belongs.",
    headlineEm: "where it belongs.",
    lede: "Leaks, sagging runs, failed joints, loose brackets and whole replacement runs where repair is no longer honest. For the drip down the wall that has started to mark the render.",
    included: [
      "Inspection of the full run, with photographs of every fault found",
      "Joints, seals, unions and stop ends replaced",
      "Brackets refixed or renewed, and falls reset so water runs to the outlet",
      "Downpipes, shoes, offsets and gully connections repaired or replaced",
      "Sections or whole runs replaced in matching profile where repair is not honest",
    ],
    how: [
      "Send photographs of the run, ideally taken while it is raining",
      "We tell you whether this is a repair or a replacement before anyone attends",
      "The work is quoted in writing, with the access method named",
      "On completion you get before and after photographs for your record",
    ],
    faq: [
      {
        q: "Repair or replace?",
        a: "If the profile is sound and only joints or brackets have failed, repair is the right answer and much cheaper. Where plastic has gone brittle or a cast iron run is fracturing, patching it simply moves the leak along, and we will say so.",
      },
      {
        q: "How do you reach it?",
        a: "Most repairs need ladders, a tower or a platform rather than the ground-based vacuum poles used for cleaning. Work at height is done by trained operatives to a method agreed in advance, and where a tower or platform is required that cost is shown separately.",
      },
      {
        q: "Can you match cast iron or an older profile?",
        a: "Often yes, in cast iron or in a cast-effect aluminium or plastic that reads correctly from the ground. We will show you the options and be honest about which will match and which will merely be close.",
      },
      {
        q: "Will this fix damp on the wall inside?",
        a: "It removes one common cause, but not always the only one. If the wall has been wet for a long time it will take a season to dry, and if damp persists we would look at the cause properly rather than guess.",
      },
    ],
    practical: {
      duration: "Half a day for most repairs, one to two days for a full replacement",
      materials: "Guttering, brackets, seals and fixings supplied and itemised",
      access: "Clear ground beneath the run for ladders, a tower or a platform",
      parking: "A bay near the property, and space for a tower where one is needed",
      excluded: [
        "Roof coverings, flashings and verges, which sit with our roofing service",
        "Underground drainage and soakaway repairs",
        "Internal damp treatment and redecoration",
      ],
    },
  },

  roofing: {
    eyebrow: "Services · Roofing and roof repairs",
    headline: "The layer everything else depends on.",
    headlineEm: "everything else depends on.",
    lede: "Slipped and broken tiles, failed flashing, ridge and verge work, flat roof repairs and leak tracing. Arranged through a roofer who inspects properly before quoting.",
    included: [
      "Inspection from ground level and, where safe, from the roof or a platform",
      "Photographic report of what was found, including inside the loft where relevant",
      "Slipped, cracked and missing tiles or slates replaced in matching material",
      "Lead flashing, ridge, hip and verge details repaired or renewed",
      "Flat roof repairs in felt, single ply or liquid systems, and leak tracing on request",
    ],
    how: [
      "Send photographs from the ground, and from the loft if you can see daylight or staining",
      "We arrange an inspection, because no honest roof price exists without one",
      "A written quote follows, separating the repair from anything else the survey found",
      "Work is scheduled around dry weather, and photographed on completion",
    ],
    faq: [
      {
        q: "Why can you not quote from photographs?",
        a: "You can sometimes see the symptom from the ground, but rarely the cause. A stain on a ceiling can come from a tile, a flashing, a valley or a blocked gutter several metres away, so we inspect before putting a figure on it.",
      },
      {
        q: "Is roof work safe to arrange casually?",
        a: "No. Work at height is the most dangerous thing done on a house, and it is carried out only by trained roofers working to a method statement, with scaffolding or a platform where the pitch or height requires it. We will not send anyone up a ladder to save you a scaffold cost.",
      },
      {
        q: "Can it be done in bad weather?",
        a: "Small repairs can be done between showers. Anything involving stripping a section, mortar work or a flat roof membrane needs dry conditions, so we schedule around the forecast and reschedule rather than rush a detail that has to last.",
      },
      {
        q: "What if the survey finds more than the leak?",
        a: "You get told, in writing, with photographs, and the extra is priced separately rather than folded into the original figure. You decide what to do and when. Nothing beyond the agreed scope goes ahead without your say.",
      },
    ],
    practical: {
      duration: "Half a day for a small repair, longer where access equipment is needed",
      materials: "Tiles, slates, lead and membranes supplied and itemised",
      access: "Ground clearance for ladders, a tower or scaffolding, and loft access where relevant",
      parking: "A bay near the property, plus space for scaffolding and deliveries",
      excluded: [
        "Full roof replacement and re-covering, which is quoted as a separate project",
        "Structural timber and truss repairs, which need a structural engineer",
        "Loft insulation and ventilation upgrades",
      ],
    },
  },

  "chimney-sweep": {
    eyebrow: "Services · Chimney sweeping",
    headline: "Swept, checked and written down.",
    headlineEm: "and written down.",
    lede: "Chimneys and flues swept, inspected and certificated for your insurer, with the fireplace sheeted and vacuumed throughout. For open fires, wood burners and stoves used through the winter.",
    included: [
      "Sweeping of the flue by rod and brush or power sweep, to the fuel type",
      "Sheeting and vacuum extraction so the room is left as it was found",
      "Smoke draw test to confirm the flue is drawing correctly",
      "Visual check of the appliance, register plate, hearth and terminal from inside",
      "A sweep certificate issued for your records and your insurer",
    ],
    how: [
      "Tell us the fuel type, the appliance and roughly when it was last swept",
      "We book a visit and confirm who is attending before the day",
      "The sweep is carried out, sheeted and vacuumed, and the flue is tested",
      "You are given the certificate and told plainly of anything that needs attention",
    ],
    faq: [
      {
        q: "How often should a chimney be swept?",
        a: "Wood and solid fuel usually twice a year where the fire is in regular use, once before the season and once during it. Gas and oil appliances are typically annual. We will tell you what your appliance and usage suggest.",
      },
      {
        q: "Will it make a mess?",
        a: "It should not. The fireplace is sheeted and the sweep works with a vacuum running throughout. Clear ornaments from the mantel and move a rug or two, and the room is put back as it was found.",
      },
      {
        q: "What if something is wrong with the flue?",
        a: "You will be told, and it will be written on the certificate. Cracked liners, defective register plates, nesting and terminal damage are not things a sweep can put right on the day, and any remedial work is quoted separately by the right specialist.",
      },
      {
        q: "Does the certificate satisfy my insurer?",
        a: "Most home insurers ask for evidence of regular sweeping by a competent sweep, and the certificate is issued for that purpose. Check the wording of your own policy, since requirements differ between insurers.",
      },
    ],
    recurring: true,
    practical: {
      duration: "Around an hour per flue",
      materials: "All sheeting, rods and extraction brought with the sweep",
      access: "Clear access to the fireplace, and the fire unlit for at least 24 hours beforehand",
      parking: "A bay near the property for the duration of the visit",
      excluded: [
        "Flue lining, rebuilding and structural chimney repairs",
        "Stove installation and commissioning, which needs a registered installer",
        "Gas appliance servicing, which must be done by a Gas Safe registered engineer",
      ],
    },
  },

  driveways: {
    eyebrow: "Services · Driveways and paving",
    headline: "The first thing anyone sees.",
    headlineEm: "anyone sees.",
    lede: "New driveways, resurfacing, edging and drainage in block paving, resin, gravel or tarmac, dug out and rebuilt from the sub-base. For frontages that have sunk, spread or stopped draining.",
    included: [
      "Excavation of the existing surface and disposal through a licensed carrier",
      "Sub-base laid and compacted to the depth the surface and vehicle loading require",
      "Block paving, resin-bound, gravel or tarmac surfacing laid and finished",
      "Edging, kerbs, drop kerb reinstatement and threshold detailing",
      "Linear drainage and permeable build-ups where surface water has to be managed",
    ],
    how: [
      "Send photographs and rough dimensions so we understand the scale",
      "We arrange a site visit to check levels, ground conditions and where water goes",
      "A written proposal follows, priced by surface type so you can compare options",
      "Work is scheduled in stages, with the drive usable again on an agreed date",
    ],
    faq: [
      {
        q: "How long will I be without the drive?",
        a: "Usually most of a week for a typical frontage. Resin and tarmac need curing time before vehicles return, and we tell you the date you can park again as part of the plan rather than on the day.",
      },
      {
        q: "Do I need permission?",
        a: "Draining a new hard surface to the road generally requires planning permission, and a permeable build-up or a soakaway usually avoids it. A new or widened dropped kerb needs highway authority approval. We will flag both, and the application is made in your name.",
      },
      {
        q: "Which surface should I choose?",
        a: "Block paving is repairable piece by piece, resin is smooth and free-draining but harder to patch invisibly, gravel is cheapest and needs raking, and tarmac suits longer runs. We will tell you what suits your frontage rather than what suits us.",
      },
      {
        q: "What about the weather?",
        a: "Resin will not cure in the damp, and tarmac needs reasonable temperatures to lay properly. We schedule around the forecast and would rather move a date than lay a surface that fails in its first winter.",
      },
    ],
    practical: {
      duration: "Typically most of a week, longer where drainage work is needed",
      materials: "Aggregate, blocks, resin, kerbs and drainage supplied and itemised",
      access: "Room for a grab lorry or skip, and space to stand materials",
      parking: "You will need to park elsewhere while the drive is out of use",
      excluded: [
        "Dropped kerb applications and highway works, which are consented separately",
        "Garage floors, structures and retaining walls",
        "Gates and automation, which we quote as a separate job",
      ],
    },
  },

  "solar-cleaning": {
    eyebrow: "Services · Solar panel cleaning",
    headline: "Panels earning what they should.",
    headlineEm: "what they should.",
    lede: "Solar panels cleaned of dust, pollen, moss and bird mess so light reaches the cells. For arrays that have quietly dropped output over a few unwashed years.",
    included: [
      "Pure water pole clean of the panel faces, with no detergents or abrasives",
      "Soft brush heads chosen for the panel surface, worked from the ground where possible",
      "Bird mess, lichen and moss growth removed from panel edges and frames",
      "Visual check of frames, fixings and visible cabling, reported with photographs",
      "Before and after photographs of the array for your record",
    ],
    how: [
      "Tell us how many panels there are and the roof height or storey count",
      "We confirm whether it can be reached from the ground or needs a platform",
      "A fixed price follows, per visit, with any access equipment shown separately",
      "We clean, photograph the array and flag anything that looked wrong",
    ],
    faq: [
      {
        q: "Does cleaning actually improve output?",
        a: "Soiled panels generate less, and heavy bird mess or lichen can shade cells badly. How much you recover depends on how dirty they were, so we will not quote a percentage. The photographs before and after tell you plainly what came off.",
      },
      {
        q: "How often should panels be cleaned?",
        a: "Once a year suits most homes, and twice where there are overhanging trees, nesting birds or a nearby main road. A shallow pitch holds dirt longer than a steep one, which we will point out when we see it.",
      },
      {
        q: "Could cleaning damage the panels or the roof?",
        a: "Not when done properly. We use pure water, soft brushes and no chemicals, and we do not walk on panels. Where the array cannot be reached safely from the ground we use a platform rather than a ladder against the gutter.",
      },
      {
        q: "Can you fix an inverter or wiring fault?",
        a: "No. We will photograph and report anything that looks wrong, but electrical work on a solar array is for a qualified installer and is arranged separately. Cleaning is a cleaning visit, not a system service.",
      },
    ],
    recurring: true,
    practical: {
      duration: "One to three hours for a domestic array",
      materials: "Pure water, poles and soft brush heads brought with the team",
      access: "Clear ground beneath the array, and a water supply where available",
      parking: "A bay near the property, and space for a platform where one is needed",
      excluded: [
        "Electrical work, inverter faults and system servicing",
        "Bird proofing and mesh installation, which we quote separately",
        "Roof repairs and gutter work found during the visit",
      ],
    },
  },
};
