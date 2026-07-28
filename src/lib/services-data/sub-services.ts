import type { SubService } from ".";

/**
 * Sub-services for each of the 4 launch disciplines.
 * Content sourced from WP /service/ hierarchy + editorial rewrite for House voice.
 * These populate the sub-service grid on /services/[slug] and drive the
 * /services/[slug]/[sub] detail pages.
 */

export const GARDENING_SUBS: SubService[] = [
  {
    slug: "garden-clearance",
    name: "Garden clearance",
    lede: "Reclaim an overgrown space. We clear, sort, and remove, leaving a garden ready for what comes next.",
    body: "Whether you have just moved in, are preparing to sell, or simply haven't been able to keep up with an increasingly overgrown garden, a professional clearance is the first step back. Our horticulturally trained team assesses what should stay, what should go, and what needs care rather than removal. All green waste is removed by licensed carriers. The garden is left clean, raked, and ready for replanting or a design brief.",
    whyChoose: [
      "Horticulturally trained team, we don't just cut, we assess",
      "Structured approach: assess, clear, remove, prepare",
      "Licensed waste carriers, responsible disposal as standard",
      "Discreet, efficient, and respectful of your neighbours",
    ],
    included: [
      "Full site assessment before work begins",
      "Cutting back of overgrown shrubs, hedges, and borders",
      "Removal of dead plants, debris, and green waste",
      "Light ground preparation for future planting",
      "Photographic before-and-after in your HoWA record",
    ],
    faq: [
      { q: "Do you remove and dispose of all garden waste?", a: "Yes. We are licensed waste carriers. Everything is removed, sorted, and disposed of responsibly, never fly-tipped." },
      { q: "How do you approach larger or heavily overgrown gardens?", a: "We start with a structured assessment. For larger spaces we may stage the clearance over two visits, so the work is done properly and nothing worth keeping is lost." },
      { q: "Can you prepare a garden for sale or letting?", a: "Yes, we regularly prepare gardens for estate agent photography and viewings. We can also coordinate with Willow Alexander Gardens for planting if you want to go further." },
    ],
  },
  {
    slug: "garden-tidy",
    name: "Garden tidy",
    lede: "A single visit to bring the garden back to order. Weeding, edging, pruning, and a clean finish.",
  },
  {
    slug: "lawn-mowing",
    name: "Lawn mowing",
    lede: "Regular or one-off mowing, edging, and stripe. Blades set to the right height for the season.",
  },
  {
    slug: "lawn-care",
    name: "Lawn care",
    lede: "Feeds, aerating, scarifying, and weed treatment. The work behind a lawn that looks after itself.",
  },
  {
    slug: "hedge-and-boundary-maintenance",
    name: "Hedge & boundary maintenance",
    lede: "Formal hedges trimmed to line. Informal boundaries shaped with the season. All cuttings removed.",
  },
  {
    slug: "planting",
    name: "Planting",
    lede: "Seasonal beds, border refreshes, and specimen planting. We supply or plant what you bring.",
  },
  {
    slug: "tree-work",
    name: "Tree work",
    lede: "Crown reduction, deadwood removal, and light felling up to 4 metres. Larger jobs quoted on site.",
  },
  {
    slug: "turf-laying",
    name: "Turf laying",
    lede: "New lawns from quality turf, properly prepared. Ground levelled, turf laid, edges cut, first water done.",
  },
  {
    slug: "garden-maintenance-subscriptions",
    name: "Garden maintenance subscriptions",
    lede: "Scheduled seasonal care, the same gardener, on a rhythm. Weekly, fortnightly, or monthly.",
    body: "Our subscription plans are the most popular way to keep a garden running. You pick the rhythm. We assign a named gardener who learns the space. Visits are scheduled through HoWA, photographed, and logged to your home record. No per-visit admin, no surprises.",
  },
  {
    slug: "jet-washing",
    name: "Jet washing",
    lede: "Paths, patios, decking, and driveways. Professional equipment, controlled pressure, no surface damage.",
  },
];

export const WINDOW_CLEANING_SUBS: SubService[] = [
  {
    slug: "regular-window-cleaning",
    name: "Regular window cleaning",
    lede: "Scheduled monthly or bi-monthly cleans. The same team, the same day, text before arrival.",
    body: "Pure-water pole cleaning for all exterior windows, frames, and sills. Scheduled on a cadence that suits the property, monthly for high-traffic streets, bi-monthly for quieter ones. You don't need to be home. We text the morning of, arrive when we said, and file a note to your HoWA record after each visit.",
    whyChoose: [
      "Pure-water pole system, no detergents, no residue, no streaks",
      "Frames and sills included as standard (not extra)",
      "Up to four storeys from the ground, no ladders required",
      "A rain guarantee: if it rains within 48 hours, we return free",
    ],
    included: [
      "All exterior windows, frames, and sills",
      "Front and back elevations",
      "Text reminder the day before",
      "Condition note on cracked or failed glazing if spotted",
      "Logged in HoWA after each visit",
    ],
    faq: [
      { q: "Do I need to be at the property?", a: "No. Most clients pass on a gate code or leave access instructions. We text before arrival and photograph after." },
      { q: "What if it rains right after you clean?", a: "Our 48-hour rain guarantee means we come back at no extra charge. Pure-water cleaning is more rain-resistant than traditional methods, though." },
      { q: "How fast can I book?", a: "Usually within a few days. For urgent one-offs we can sometimes fit you in next-day." },
    ],
  },
  {
    slug: "one-off-window-cleaning",
    name: "One-off window cleaning",
    lede: "A single visit to restore clarity. Same equipment and standard as the regular service, no commitment.",
  },
  {
    slug: "gutter-cleaning",
    name: "Gutter cleaning",
    lede: "Vacuum-pole gutter clears, front and back. Photographic evidence of every run. Twice a year is ideal.",
    body: "Blocked gutters cause damp, staining, and pest access. Our team clears all gutters by industrial vacuum pole, no ladders on your walls, no damage to fascia. We photograph every run before and after, note any loose brackets or splits, and file the whole thing to your HoWA record. Most homes need this twice a year: once after the last leaves, once before winter rain.",
    whyChoose: [
      "Industrial vacuum pole, safe, efficient, no ladders on walls",
      "Before/after photographic record filed to HoWA",
      "Downpipe checks and minor blockage clearance included",
      "Flags repairs early, before damp sets in",
    ],
    included: [
      "Full gutter clear, front and back elevations",
      "Downpipe visual check + minor clearance",
      "Photographic record filed to HoWA",
      "Condition report on brackets, splits, and falls",
      "Green waste bagged and removed",
    ],
    faq: [
      { q: "How often should gutters be cleaned?", a: "At least twice a year, autumn after the last leaves, and spring before heavy rain. Properties near trees may benefit from quarterly." },
      { q: "Can you repair damaged gutters?", a: "We flag issues in the condition report. For replacements and re-seating we introduce you to a trusted roofer through the House." },
    ],
  },
  {
    slug: "softwashing",
    name: "Softwashing",
    lede: "Low-pressure exterior cleaning for render, cladding, and delicate stonework. No jet-wash damage.",
  },
  {
    slug: "jet-washing",
    name: "Jet washing",
    lede: "Paths, patios, driveways, and decking. Professional pressure washing with controlled technique. No surface damage.",
  },
  {
    slug: "commercial-window-cleaning",
    name: "Commercial window cleaning",
    lede: "Offices, retail, and multi-unit buildings. Scheduled contracts, access equipment, and insurance documentation provided.",
  },
  {
    slug: "commercial-gutter-cleaning",
    name: "Commercial gutter cleaning",
    lede: "Industrial SkyVac systems for commercial properties. Scheduled maintenance contracts with photographic reporting.",
  },
  {
    slug: "commercial-softwashing",
    name: "Commercial softwashing",
    lede: "Low-pressure exterior cleaning for commercial facades, render, and cladding. Planned maintenance or one-off restoration.",
  },
  {
    slug: "commercial-exterior-maintenance",
    name: "Commercial exterior maintenance",
    lede: "Full exterior care packages for businesses. Windows, gutters, fascias, and pressure washing on a managed schedule.",
  },
];

export const CLEANING_SUBS: SubService[] = [
  {
    slug: "regular-cleaning",
    name: "Regular cleaning",
    lede: "Weekly or fortnightly domestic care. Same team each visit, your preferences on file in HoWA.",
    body: "Our regular cleaning service is built on consistency. We assign a named team who learns the home, your surfaces, your products, your preferences. Visits are scheduled through HoWA and logged with a short note after each one. If your regular cleaner is away, we send a cover team briefed from your record.",
    whyChoose: [
      "Named team who learns the home over time",
      "Scheduled through HoWA, no per-visit admin",
      "All products House-standard; fragrance-free on request",
      "Vetted, insured, and DBS-checked as standard",
    ],
    included: [
      "Full ground-floor and bedroom clean",
      "Kitchen surfaces, hob, and sink",
      "Bathroom descale and sanitisation",
      "Floors vacuumed and mopped (surface-appropriate)",
      "Logged in HoWA after each visit",
    ],
    faq: [
      { q: "Can I use my own products?", a: "Of course. If you prefer specific brands or fragrance-free products, note it in HoWA and the team will follow it." },
      { q: "What about bank holidays?", a: "Regular service clients get bank holiday coverage included. We'll reschedule around closures in advance." },
    ],
  },
  {
    slug: "one-off-cleaning",
    name: "One-off cleaning",
    lede: "A single deep clean for move-in, post-guests, or estate agent viewings. No commitment, full standard.",
  },
  {
    slug: "end-of-tenancy-cleaning",
    name: "End-of-tenancy cleaning",
    lede: "Inventory-standard clean for landlords and tenants. Oven, carpets, and behind-furniture deep work included.",
  },
  {
    slug: "after-building-cleaning",
    name: "After-building cleaning",
    lede: "Post-renovation deep clean. Dust extraction, paint-spot removal, and surface-by-surface restoration.",
  },
  {
    slug: "spring-clean",
    name: "Spring clean",
    lede: "A seasonal reset, windows inside, skirting, light switches, under-furniture, and the things the weekly misses.",
  },
];

export const GUTTER_CLEANING_SUBS: SubService[] = [];

export const HANDYMAN_SUBS: SubService[] = [
  {
    slug: "furniture-assembly",
    name: "Furniture assembly",
    lede: "Flat-pack, beds, wardrobes, desks. Assembled properly, in the right room, packaging removed.",
    body: "From a single bookcase to a full house of flat-pack, our handypeople arrive with the tools and patience to assemble everything correctly. We check every fitting, anchor anything that should be wall-fixed, and remove all packaging when we leave. If the instructions are missing, we don't need them.",
    whyChoose: [
      "Experienced with every major flat-pack brand",
      "Wall-anchoring for heavy or tall items as standard",
      "Packaging removed and recycled",
      "Usually same-week availability",
    ],
    included: [
      "Assembly of all flat-pack and part-assembled furniture",
      "Wall-anchoring where safety requires it",
      "Packaging removal and recycling",
      "Logged in your HoWA record",
    ],
    faq: [
      { q: "Can you assemble furniture I've already started?", a: "Yes. We'll assess what's been done and finish it properly." },
      { q: "Do you supply the furniture?", a: "No, but we can collect large items from shops and assemble on the same visit." },
    ],
  },
  {
    slug: "picture-hanging",
    name: "Picture hanging & mirror mounting",
    lede: "Hung level, at the right height, into the right fixing. Heavy mirrors and gallery walls included.",
    body: "Whether it's a single frame or a full gallery wall, we measure, mark, and hang with the correct fixings for the wall type. Heavy mirrors and artwork are anchored securely. We bring a laser level, a range of fixings, and the experience to know what belongs where.",
    whyChoose: [
      "Laser-levelled hanging for perfect alignment",
      "Correct fixings for plasterboard, brick, or stud walls",
      "Heavy mirrors and oversized art handled safely",
      "Gallery wall layout service available",
    ],
    included: [
      "Measuring, marking, and levelling",
      "All fixings supplied (standard sizes)",
      "Hanging and adjustment",
      "Wall-type assessment for correct anchoring",
    ],
  },
  {
    slug: "shelving-installation",
    name: "Shelving installation",
    lede: "Floating shelves, bracketed shelves, and storage units. Level, secure, and rated for what you'll put on them.",
  },
  {
    slug: "painting-and-decorating",
    name: "Painting & decorating",
    lede: "Touch-ups, single rooms, and feature walls. Clean edges, proper prep, dust sheets down.",
    image: "/services/home/painting-and-decorating.webp",
  },
  {
    slug: "tv-wall-mounting",
    name: "TV wall mounting",
    lede: "Secure bracket fitting, cable management, and tidy finish. All screen sizes, all wall types.",
  },
  {
    slug: "door-hanging",
    name: "Door hanging & lock changes",
    lede: "Internal doors hung, external locks changed, handles replaced. Measured, fitted, and finished.",
  },
  {
    slug: "general-repairs",
    name: "General repairs",
    lede: "Cupboard doors, toilet seats, shower screens, window handles, and the jobs that pile up. One visit, all done.",
  },
  {
    slug: "baby-proofing",
    name: "Baby-proofing",
    lede: "Stair gates, corner guards, socket covers, and furniture anchoring. A safe home before the crawling starts.",
  },
  {
    slug: "jet-washing",
    name: "Jet washing",
    lede: "Paths, patios, driveways, and decking. Professional equipment, controlled pressure, no surface damage.",
  },
  {
    slug: "alarm-installation",
    name: "Alarm installation",
    lede: "Wired and wireless alarm systems installed, tested, and configured. Sensors, keypads, and app setup included.",
  },
  {
    slug: "bed-assembly",
    name: "Bed assembly",
    lede: "Divan, frame, bunk, and cabin beds assembled on site. Headboards mounted, slats set, mattress placed.",
  },
  {
    slug: "cat-flap-installation",
    name: "Cat flap installation",
    lede: "Fitted into timber, UPVC, or glass doors. Microchip flaps wired and programmed to your cat.",
  },
  {
    slug: "christmas-lights",
    name: "Christmas light installation & removal",
    lede: "Exterior and interior lighting installed safely. Timers set, cabling secured, removal booked for January.",
  },
  {
    slug: "loft-organisation",
    name: "Loft organisation",
    lede: "Boarding, shelving, lighting, and labelling. Turn unused roof space into accessible, organised storage.",
  },
];

export const REMOVALS_SUBS: SubService[] = [
  {
    slug: "small-house-move",
    name: "Small house move",
    lede: "Flats, studios, and one-bed moves. Load, transport, unload. Blanket-wrapped, fully insured.",
    body: "Our small move service covers everything from a studio flat to a one-bedroom home. A two-person team loads, transports, and unloads your belongings with blanket wrapping for all furniture. Beds and tables are dismantled and reassembled. Everything is insured in transit. We arrive on time, in uniform, and leave the new place ready to live in.",
    whyChoose: [
      "Two-person team with a clean, electric van",
      "Blanket wrapping and furniture protection included",
      "Dismantling and reassembly of beds and tables",
      "Fully insured in transit with certification on request",
    ],
    included: [
      "Full load and unload at both ends",
      "Blanket wrapping for all furniture",
      "Dismantling and reassembly of key items",
      "Transit insurance for all items",
      "Logged in your HoWA record",
    ],
    faq: [
      { q: "How long does a small move take?", a: "Most small moves are completed in half a day. We'll confirm timing at quoting stage based on volume and distance." },
      { q: "Can I add packing to a small move?", a: "Yes. Let us know which items you'd like us to pack and we'll include it in the quote." },
    ],
  },
  {
    slug: "large-item-collection",
    name: "Large item shop collection",
    lede: "We collect from the shop and deliver to your door. Sofas, appliances, and anything that won't fit in the car.",
  },
  {
    slug: "local-pick-up-drop-off",
    name: "Local pick-up & drop-off",
    lede: "Single items or small loads moved across London and Kent. Flexible scheduling, same-week availability.",
  },
  {
    slug: "moving-to-storage",
    name: "Moving items to storage",
    lede: "We load, transport, and place your items in storage. Coordination with your facility included.",
  },
  {
    slug: "home-organising",
    name: "Home organising",
    lede: "Pre-move declutter or post-move setup. Lofts, garages, wardrobes, and the rooms that need thinking through.",
  },
  {
    slug: "packing-service",
    name: "Packing service",
    lede: "Full or partial packing by our team. Boxes, wrapping, labelling, and careful handling of fragile items.",
  },
];

export const ENERGY_SUBS: SubService[] = [
  {
    slug: "solar-installation",
    name: "Solar installation",
    lede: "Roof-mounted and in-roof solar panel systems. Full survey, design, installation, and MCS certification.",
    body: "We handle the complete solar journey: structural survey, panel layout design, scaffolding, installation, DNO grid connection application, and MCS certification. Battery storage systems (Tesla Powerwall, GivEnergy, Fox ESS) can be added at install or retrofitted later. Every system is designed for the specific property, not a generic template.",
    whyChoose: [
      "MCS-certified installation, qualifies for Smart Export Guarantee payments",
      "Full structural and electrical survey before any work begins",
      "Battery storage integration available at install or later",
      "DNO application and grid connection handled for you",
    ],
    included: [
      "Site survey and system design",
      "Scaffolding and installation",
      "Inverter, mounting, and all electrical work",
      "DNO notification and MCS certification",
      "System monitoring setup and handover",
    ],
    faq: [
      { q: "How long does installation take?", a: "Most residential installations take 2-3 days. Larger systems or battery additions may take an extra day." },
      { q: "Will I need planning permission?", a: "Most domestic solar installations are permitted development. We check and advise before quoting." },
    ],
  },
  {
    slug: "ev-charging",
    name: "EV charger installation",
    lede: "Home and workplace EV charger installation. All major brands, OZEV grant applications handled where eligible.",
    body: "We install Ohme, Pod Point, Wallbox, Tesla, Zappi, and other leading chargers. Installation includes dedicated circuit, consumer unit upgrade if needed, and full testing. We handle the OZEV grant application where your property qualifies, reducing the cost by up to £350.",
    whyChoose: [
      "All major charger brands installed and supported",
      "OZEV grant application handled where eligible",
      "Dedicated circuit with RCD protection as standard",
      "Load balancing available for multi-charger properties",
    ],
    included: [
      "Charger supply and installation",
      "Dedicated circuit from consumer unit",
      "Full electrical testing and certification",
      "App setup and smart scheduling walkthrough",
      "OZEV grant application (if eligible)",
    ],
  },
  {
    slug: "electrical-repairs",
    name: "Electrical repairs",
    lede: "Fault finding, socket and switch replacement, circuit repairs, and emergency call-outs. Same-day availability.",
  },
  {
    slug: "commercial-electrical",
    name: "Commercial electrical services",
    lede: "Office fit-outs, retail lighting, three-phase installations, and commercial maintenance contracts.",
  },
  {
    slug: "new-builds-renovations",
    name: "New builds & renovations",
    lede: "First and second fix electrical for new builds, extensions, and full renovations. Building control sign-off included.",
  },
  {
    slug: "electrical-testing",
    name: "Electrical testing & inspections",
    lede: "EICR reports, PAT testing, and pre-purchase electrical surveys. Certification filed to your HoWA record.",
  },
];

export const PET_CARE_SUBS: SubService[] = [
  {
    slug: "dog-walking",
    name: "Dog walking",
    image: "/services/pet/dog-walking.webp",
    lede: "Solo walks by experienced, insured handlers. GPS-tracked routes, photo updates, and behaviour notes after every visit.",
    body: "Every walk is solo unless you request otherwise. Your handler learns the dog's temperament, favourite routes, and recall level. Walks are GPS-tracked with a live map you can check from your phone. After each walk, you receive a photo, a route summary, and a short behaviour note, all filed to your HoWA record.",
    whyChoose: [
      "Solo walks, your dog gets full attention, every time",
      "GPS-tracked with live route sharing",
      "Same handler wherever possible for consistency",
      "All handlers DBS-checked and fully insured",
    ],
    included: [
      "30-minute or 60-minute solo walk",
      "GPS route tracking and live map",
      "Photo and behaviour update after each walk",
      "Key access managed through HoWA",
      "Logged in your HoWA record",
    ],
    faq: [
      { q: "Can I track the walk live?", a: "Yes. You'll receive a live GPS link at the start of each walk." },
      { q: "What if my dog doesn't get on with the handler?", a: "We'll reassign to a different handler. The meet-and-greet is designed to catch this before regular walks begin." },
    ],
  },
  {
    slug: "dog-sitting",
    name: "Dog sitting",
    image: "/services/pet/dog-sitting.webp",
    lede: "In-home care while you're away. Feeding, walks, medication, and daily updates. Your home or the sitter's.",
    body: "Our sitters stay in your home or host your dog in theirs, whichever suits the dog's temperament. They follow your instructions for feeding, medication, exercise, and bedtime routine. You receive daily photo updates and can message the sitter directly through the platform. Emergency vet details are held on file.",
    whyChoose: [
      "In-home care, your dog stays in familiar surroundings",
      "Feeding, medication, and routine followed exactly",
      "Daily photo and status updates",
      "Emergency vet instructions on file in HoWA",
    ],
    included: [
      "Overnight or daytime care",
      "All walks, feeds, and medication as directed",
      "Daily photo and behaviour update",
      "Meet-and-greet before the first sit",
      "Emergency vet protocol on file",
    ],
    faq: [
      { q: "Can the sitter stay at my house?", a: "Yes. Most clients prefer in-home sitting so the dog stays in familiar surroundings. We can also host at the sitter's home if you prefer." },
      { q: "What about cats or other pets?", a: "We can arrange care for cats and small animals alongside dogs. Let us know during booking." },
    ],
  },
];

export const SERVICE_TRUST_BADGES = [
  "House & Garden 'The List'",
  "Guild of Master Craftsmen",
  "Carbon Neutral Certified",
  "Fully Insured & Accredited",
  "Safe Contractor Approved",
];

export const SERVICE_AREAS = [
  "Chelsea",
  "Kensington",
  "Fulham",
  "Hammersmith",
  "Battersea",
  "Clapham",
  "Notting Hill",
  "Chiswick",
  "Kingston",
  "Dulwich",
  "Greenwich",
  "Blackheath",
  "Bromley",
  "Beckenham",
  "Sevenoaks",
  "Orpington",
];

export const SERVICE_FAQ_SHARED = [
  { q: "Are you insured?", a: "Yes. Every team is fully insured, vetted, and accredited. Proof of cover is available on request." },
  { q: "Do I need to be at the property?", a: "No. Most clients share access instructions or a key code. We text before arrival and file a note to your HoWA record after." },
  { q: "How fast can I book?", a: "Usually within a few days for regular services. Urgent one-offs can sometimes be fitted next-day." },
  { q: "What writes into HoWA?", a: "Every visit is logged: date, team, notes, photographs on request, products used. It compounds into a record of care." },
];
