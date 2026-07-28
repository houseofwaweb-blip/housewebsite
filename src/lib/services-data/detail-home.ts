import type { RequestableDetail } from "./requestable-detail";

/**
 * Page content for the Home group of the requestable catalogue.
 *
 * Eleven services that the House arranges but cannot price from a postcode
 * alone: oven cleaning, carpets and upholstery, pest control, plumbing,
 * heating, flooring, plastering and tiling, damp, appliance repair, locks and
 * security, and housekeeping. Each renders through `ServiceDetail` in
 * `mode="quote"`, so the sections here carry the same weight as gardening and
 * cleaning. The difference is what the CTA asks for.
 *
 * House voice rules that apply to every entry:
 *   - No em dashes. Use a comma, or start a new sentence.
 *   - Never invent a price, a response time, a guarantee or an accreditation.
 *     Describe the pricing method instead.
 *   - The work is carried out by a House team or by a named HoWA Approved
 *     professional, and which one is always disclosed before you commit.
 *   - Coverage is London and the South East. The House number is 0800 047 8738.
 *
 * Merged into `REQUESTABLE_DETAIL` at the point of use. No `heroImage` is set
 * on any entry here, because we hold no photography for these services yet.
 */

export const HOME_DETAIL: Record<string, RequestableDetail> = {
  "oven-cleaning": {
    eyebrow: "Services · Oven and appliance cleaning",
    headline: "An oven returned to itself.",
    headlineEm: "returned to itself.",
    lede: "Ovens, hobs, extractors and range cookers stripped down, cleaned and rebuilt in your kitchen. For homes where the appliance has stopped looking like the one that was delivered.",
    included: [
      "Oven dismantled where the model allows: door glass, shelves, runners, fans and back plate",
      "Removable parts soaked in a heated tank outside the house, not in your sink",
      "Cavity, seals and door reassembled and function-checked before we leave",
      "Hobs, extractor filters, grills, microwaves and warming drawers cleaned on the same visit",
      "Floor and worktop protected throughout, and the kitchen left ready to use",
    ],
    how: [
      "Tell us the make, the type and how many appliances, with a photograph if you have one",
      "We come back with a fixed price for that list, and confirm who is carrying out the work",
      "You choose a date, and we confirm the arrival window the day before",
      "The appliances are cleaned, rebuilt, tested and handed back to you in working order",
    ],
    faq: [
      {
        q: "How is this priced?",
        a: "By appliance, not by hour. Tell us the make and how many pieces you want cleaned and we will give you a fixed price before anything is booked, so a stubborn oven does not become a longer bill.",
      },
      {
        q: "Is the house usable while you work?",
        a: "The kitchen is out of use for the visit and there will be some smell of the cleaning products, though the caustic soaking happens outside. Most single ovens are back in service the same afternoon.",
      },
      {
        q: "Will you damage the oven?",
        a: "Dismantling is limited to what the manufacturer intends to be removable, and older seals and printed door glass are checked first. If a part is already perished we will tell you before we touch it rather than after.",
      },
      {
        q: "Can you fix an oven that is not heating?",
        a: "No, cleaning and repair are different visits. If we find a fault while cleaning we will note it and you can raise it with us as an appliance repair.",
      },
    ],
    practical: {
      duration: "Two to four hours for a single oven, longer for a range or a full appliance list",
      materials: "All tanks, products and protective coverings brought with the team",
      access: "Someone at home to let us in, and a clear path to the appliance",
      parking: "A space near the door helps, as the soaking tank travels in the van",
      excluded: [
        "Repairs, spare parts and electrical or gas fault finding",
        "Self-cleaning liners, which are damaged by the products used here",
        "Whole-kitchen cleaning, cupboards and floors beyond the working area",
      ],
    },
    recurring: true,
  },

  "carpet-upholstery": {
    eyebrow: "Services · Carpet and upholstery cleaning",
    headline: "Fibres brought back, not soaked.",
    headlineEm: "not soaked.",
    lede: "Carpets, rugs, sofas, curtains and mattresses cleaned by a method chosen for the fibre rather than the machine that happens to be in the van. For homes with textiles worth keeping.",
    included: [
      "Fibre and backing identified first, then hot water extraction or low-moisture cleaning selected accordingly",
      "Pre-vacuum, pre-treatment of traffic lanes and spot work on marks before the main clean",
      "Sofas, armchairs, dining chairs, curtains in situ and mattresses",
      "Wool, silk and hand-knotted rugs handled by the method their construction allows",
      "Furniture moved and protected, and drying times explained before we go",
    ],
    how: [
      "Send room sizes or a list of the items, with photographs of any stains that worry you",
      "We price the job and tell you which method suits the fibres and who will be carrying it out",
      "A date is booked, and we confirm what needs moving before the team arrives",
      "The work is done, the marks that lifted are shown to you, and drying guidance is left behind",
    ],
    faq: [
      {
        q: "How is this priced?",
        a: "By room and by item, so a hallway and three seats is a different price from a whole floor. Give us the rooms or an item count and we will quote from that without needing to visit first.",
      },
      {
        q: "How long until we can walk on it?",
        a: "Usually a few hours for low-moisture work and longer for hot water extraction, depending on the room and the weather. We will tell you what to expect on the day rather than promise a number now.",
      },
      {
        q: "Will every stain come out?",
        a: "No. Dye, bleach, rust and old pet damage can permanently alter the fibre, and no clean reverses that. We will say which marks we expect to lift and which we do not before starting.",
      },
      {
        q: "Do we have to move the furniture?",
        a: "Small and light pieces are moved by the team. Wardrobes, pianos, beds and anything on a fragile floor should be dealt with beforehand, and we will tell you which is which when we quote.",
      },
    ],
    practical: {
      duration: "Two hours for a room or two, most of a day for a whole floor",
      materials: "Machines, solutions and protectors brought by the team",
      access: "Rooms cleared of small items, and a water point and power available",
      parking: "Parking close to the door, as hoses run from the van on larger jobs",
      excluded: [
        "Carpet repair, refitting, re-stretching and replacement",
        "Flood and escape-of-water drying, which is a restoration job",
        "Leather and antique upholstery restoration or re-covering",
      ],
    },
    recurring: true,
  },

  "pest-control": {
    eyebrow: "Services · Pest control",
    headline: "The call nobody wants to make.",
    headlineEm: "nobody wants to make.",
    lede: "Mice, rats, wasps, moths, fleas and the rest, dealt with discreetly and without drama. For households that want the problem understood and closed, not simply sprayed.",
    included: [
      "An inspection of the affected rooms and the routes in, including voids, loft and drainage where reachable",
      "Identification of what you actually have, which changes the treatment entirely",
      "Treatment appropriate to the species, sited away from children and pets",
      "Proofing recommendations for the entry points found, quoted separately if works are needed",
      "Follow-up visits where the species requires a second or third treatment to break the cycle",
    ],
    how: [
      "Tell us what you have seen, where, and when it started",
      "We confirm who will attend and roughly when, and what the visit will cost",
      "The property is inspected and treated on the same visit wherever possible",
      "You get a note of what was found and what was used, plus any follow-up dates",
    ],
    faq: [
      {
        q: "How quickly can someone come?",
        a: "Pest work is prioritised over most other enquiries, and wasps and rodents inside a home come first. We will not promise a fixed window until we have spoken to you and know where you are.",
      },
      {
        q: "How is this priced?",
        a: "Usually per treatment programme rather than per hour, because rodents and fleas need a set number of visits to be resolved rather than moved. Proofing works are quoted separately once the entry points are known.",
      },
      {
        q: "Is it safe with children and pets in the house?",
        a: "Treatments are placed and secured with that in mind, and you will be told which rooms to keep clear and for how long. Where a home has small children or animals we will say if a different approach is better.",
      },
      {
        q: "What if they come back?",
        a: "Recurrence usually means an entry point is still open or a neighbouring property is the source, neither of which a treatment alone will fix. That is why the report names the routes in, and why proofing is often the real answer.",
      },
    ],
    practical: {
      duration: "One to two hours per visit, with follow-ups where the species needs them",
      materials: "All treatments, traps and monitoring stations supplied",
      access: "Access to lofts, cupboards and under-sink voids, and pets kept clear during treatment",
      parking: "A space near the property, as equipment is carried in from the van",
      excluded: [
        "Building works, drain relining and structural proofing beyond simple sealing",
        "Removal of a protected species, including bats and some nesting birds",
        "Cleaning and decontamination after an infestation, which is a separate visit",
      ],
    },
  },

  plumbing: {
    eyebrow: "Services · Plumbing",
    headline: "Water where it should be.",
    headlineEm: "where it should be.",
    lede: "Leaks, taps, toilets, radiators, stopcocks and bathroom work, arranged through a plumber whose name you will have before they arrive. For the repairs that quietly get worse.",
    included: [
      "Leak tracing on supply and waste pipework, including behind panels where access allows",
      "Taps, mixers, wastes, traps, toilets and cisterns repaired or replaced",
      "Radiators, valves, bleeding, balancing and full system flushes",
      "Outside taps, stopcocks, isolation valves and washing machine connections",
      "Bathroom and cloakroom installation, from a swapped basin to a full room",
    ],
    how: [
      "Describe the fault and send photographs, including the pipework under or behind the fitting",
      "We come back with what it is likely to need and how it will be priced, and name who is attending",
      "The visit is booked, and parts are confirmed with you before anything is ordered",
      "The work is carried out, tested under pressure, and left clean with the old parts shown to you",
    ],
    faq: [
      {
        q: "How is this priced?",
        a: "Small repairs are usually charged for the visit plus parts, while bathroom work is quoted as a job after we have seen it. Photographs let us give you a realistic range before anyone travels.",
      },
      {
        q: "It is leaking now. What do I do?",
        a: "Turn the water off at the stopcock, then call the House on 0800 047 8738 rather than filling in a form. A form is the slower route when water is moving.",
      },
      {
        q: "Can you price it without visiting?",
        a: "Sometimes. A tap swap or a cistern part can be priced from photographs, but a leak with no obvious source cannot, because the first hour is finding it. We will tell you honestly which of the two you have.",
      },
      {
        q: "What is not covered?",
        a: "Gas work, boiler repairs and unvented cylinder work belong under heating and boilers, and are done by a separately registered engineer. Anything on the main outside your boundary is your water company's responsibility.",
      },
    ],
    practical: {
      duration: "An hour or two for most repairs, several days for a bathroom",
      materials: "Common parts carried on the van, specials ordered and confirmed with you first",
      access: "Access to the stopcock, the loft tank if there is one, and the room in question",
      parking: "A space near the door for tools and parts",
      excluded: [
        "Gas appliances, boilers and flues, which are booked as heating work",
        "Drain jetting, CCTV surveys and work on the shared or public sewer",
        "Tiling, plastering and decorating to make good after pipework is opened up",
      ],
    },
  },

  "heating-boiler": {
    eyebrow: "Services · Heating and boilers",
    headline: "Warmth you stop thinking about.",
    headlineEm: "you stop thinking about.",
    lede: "Annual servicing, repairs, gas safety certificates and replacement, arranged through a registered engineer. For households who would rather find the fault in October than in January.",
    included: [
      "Annual boiler service with combustion analysis and a written record",
      "Landlord gas safety certificates covering the boiler, hob and any other gas appliance",
      "Fault finding and repair on boilers, controls, pumps, valves and cylinders",
      "Radiator balancing, power flushing, thermostats and heating controls",
      "Replacement boilers and full system upgrades, quoted after a survey",
    ],
    how: [
      "Tell us the boiler make, model, rough age and when it was last serviced",
      "We match it to a registered engineer, and confirm the visit type and cost to you",
      "The engineer attends, reports what the system is actually doing, and prices any repair before starting",
      "Certificates and service records are sent to you, and to your record if you keep one",
    ],
    faq: [
      {
        q: "How is this priced?",
        a: "A service or a certificate is a fixed price per visit. Repairs are diagnosis first and parts after, and no part is ordered until you have agreed the cost, because a diagnosis that commits you to a bill is not a diagnosis.",
      },
      {
        q: "Should I repair it or replace it?",
        a: "It usually turns on the age of the boiler, the availability of parts and how much of the system is original. The engineer will give you the honest comparison on the day rather than steer you towards a new one.",
      },
      {
        q: "How disruptive is a replacement?",
        a: "Most straightforward swaps take a day or two with the heating and hot water off for part of that. Moving the boiler, changing fuel or adding a cylinder takes longer, and we will set out the schedule before you commit.",
      },
      {
        q: "Who actually carries out the work?",
        a: "Gas work is only ever carried out by a registered engineer, either a House team member or a named HoWA Approved professional. You will be told which before you commit, along with their name.",
      },
    ],
    practical: {
      duration: "Around an hour for a service, one to three days for a replacement",
      materials: "Parts confirmed and priced with you before they are ordered",
      access: "Access to the boiler, controls, gas meter and every gas appliance being certificated",
      parking: "Parking near the property, particularly on a replacement",
      excluded: [
        "Electrical work beyond the heating controls, which is booked as electrical work",
        "Building works such as flue penetrations through structure, or moving a meter",
        "Repairs to underfloor heating pipework buried in a screed",
      ],
    },
    recurring: true,
  },

  flooring: {
    eyebrow: "Services · Flooring",
    headline: "The surface a room stands on.",
    headlineEm: "a room stands on.",
    lede: "Wood, engineered board, vinyl, tile and carpet supplied and fitted, with the subfloor put right first. For rooms where the floor has become the thing you notice.",
    included: [
      "Subfloor inspection, levelling and preparation before anything is laid",
      "Solid and engineered wood, laminate, luxury vinyl, carpet and hard tile",
      "Uplift and disposal of the existing floor by a licensed carrier",
      "Thresholds, beading, skirting adjustments and door trimming where needed",
      "Sanding and refinishing of existing boards where replacement is not the answer",
    ],
    how: [
      "Send room dimensions, photographs and what is down at the moment",
      "We come back with material options and an indicative cost, then arrange a measure",
      "Materials are confirmed, ordered and given time to acclimatise where the product requires it",
      "The floor is fitted, finished and the room left clear, with offcuts kept back for repairs",
    ],
    faq: [
      {
        q: "How is this priced?",
        a: "Materials by the square metre and labour by the room, with subfloor preparation quoted separately once we have seen what is underneath. Rough dimensions get you an indicative figure, and a measure makes it firm.",
      },
      {
        q: "Why do you need to see the subfloor first?",
        a: "Because most flooring failures are subfloor failures. Damp, movement or an uneven screed will show through any covering, and it is cheaper to find that at the quote stage than after the boards are down.",
      },
      {
        q: "How long is the room out of use?",
        a: "Usually one to three days for an average room, plus any acclimatisation and curing time the material needs. We will give you the schedule with the quote so you can plan around it.",
      },
      {
        q: "Can we supply our own material?",
        a: "Yes, and we will fit it. We cannot then stand behind the material itself, and any shortfall or batch variation becomes your side of the arrangement, so we will confirm quantities with you before you order.",
      },
    ],
    practical: {
      duration: "One to three days for a room, longer across a floor of a house",
      materials: "Supplied by us, or fitted from your own supply by agreement",
      access: "Rooms emptied of furniture, and power available for cutting and levelling",
      parking: "Parking for a van, as materials are heavy and delivered to the door",
      excluded: [
        "Structural joist repair and floor strengthening",
        "Damp proofing and tanking of a floor found to be wet",
        "Decorating and skirting replacement after the floor is laid",
      ],
    },
  },

  "plastering-tiling": {
    eyebrow: "Services · Plastering and tiling",
    headline: "Walls that read as flat.",
    headlineEm: "that read as flat.",
    lede: "Skimming, patching, re-plastering, and wall or floor tiling, finished to a standard that survives a low winter sun. For rooms being put back together properly.",
    included: [
      "Skim coats over existing plaster or new board, taped and finished ready for decoration",
      "Patch repairs to cracks, blown plaster, old fixings and removed fireplaces",
      "Plasterboarding, dot and dab, stud partitions and ceiling replacement",
      "Wall and floor tiling in ceramic, porcelain and natural stone, including grouting and silicone",
      "Protection of floors and adjoining rooms, and removal of waste at the end",
    ],
    how: [
      "Send photographs and rough areas in square metres, with a note of what is behind the surface",
      "We price the work from that where we can, and arrange a visit where the substrate is uncertain",
      "Dates are agreed, and we confirm who is doing the work and how many days it will take",
      "The work is carried out, the room is cleared, and drying times before decorating are explained",
    ],
    faq: [
      {
        q: "How is this priced?",
        a: "By area and by day, which is why photographs and a rough square metre figure usually get you a price without a first visit. Where old lath or damp is suspected we will want to look before committing.",
      },
      {
        q: "How long before we can paint?",
        a: "Fresh plaster generally needs several days to dry out fully, and longer in a cold or unventilated room. Painting too early traps moisture and shows later, so we will tell you when the wall is genuinely ready.",
      },
      {
        q: "How much mess is there?",
        a: "Plastering is wet and dusty work, and the room is unusable while it happens. Floors and doorways are protected, adjoining rooms are sealed where practical, and waste goes with the team.",
      },
      {
        q: "What could go wrong?",
        a: "The most common surprise is what is found once old plaster comes off, such as damp, perished lath or missing background. If that happens the work stops and you are told the revised cost before it restarts.",
      },
    ],
    practical: {
      duration: "A day for a patch or a small ceiling, several days for a full room",
      materials: "Plaster, board and adhesives supplied, tiles usually chosen and supplied by you",
      access: "Rooms cleared, water and power available, and the space free for the duration",
      parking: "A space near the door, as board and bagged materials are carried in",
      excluded: [
        "Decorating and painting once the plaster has dried",
        "Damp proofing, tanking and the cause of any damp found behind the surface",
        "Structural alterations, lintels and removal of load-bearing walls",
      ],
    },
  },

  "damp-proofing": {
    eyebrow: "Services · Damp, mould and condensation",
    headline: "The cause before the cure.",
    headlineEm: "before the cure.",
    lede: "Rising damp, penetrating damp, condensation and black mould, diagnosed before anything is sold to you. For homes where a wall keeps coming back no matter how often it is painted.",
    included: [
      "A survey of the affected walls with moisture readings, taken internally and externally",
      "Identification of which of the three it is, because the remedies have nothing in common",
      "External checks of ground levels, gutters, downpipes, pointing and airbricks",
      "A written report setting out cause, recommended works and what can wait",
      "Remedial work where it is needed, including injected courses, tanking, replastering and ventilation",
    ],
    how: [
      "Describe what you are seeing, where it appears and whether it changes with the seasons",
      "A survey is arranged, because we will not quote for treatment we have not diagnosed",
      "You receive the findings and a costed set of works, with the order they should be done in",
      "The works are carried out, and the wall is left to dry before any making good",
    ],
    faq: [
      {
        q: "Why can you not quote from photographs?",
        a: "Because a photograph cannot tell rising damp from a leaking downpipe or a cold bridge, and those three cost very different amounts to fix. Quoting blind is how people end up with an injected course they never needed.",
      },
      {
        q: "How is this priced?",
        a: "A survey is charged as its own visit, and any remedial work is quoted from the findings. You are free to take the report and do nothing, or to use it to get other prices.",
      },
      {
        q: "Is black mould dangerous?",
        a: "Persistent mould in a lived-in room is worth taking seriously, particularly where anyone in the house has a respiratory condition. Most of it is a ventilation and heating problem rather than a building failure, and cleaning it without changing that only buys a few months.",
      },
      {
        q: "How long does a wall take to dry?",
        a: "Months rather than weeks, depending on the thickness of the wall and the time of year. Anyone who tells you a treated wall can be replastered and decorated immediately is setting you up to do it twice.",
      },
    ],
    practical: {
      duration: "One to two hours for the survey, and several days for remedial works",
      materials: "Meters and survey equipment on the visit, remedial materials quoted after",
      access: "Access to both faces of the wall where possible, plus any cellar, void or loft",
      parking: "A space near the property for survey and works visits",
      excluded: [
        "Structural repair, underpinning and movement or subsidence work",
        "Roof, gutter and drainage repairs found to be the cause, which are quoted separately",
        "Redecoration once the wall has dried out",
      ],
    },
  },

  "appliance-repair": {
    eyebrow: "Services · Appliance repair",
    headline: "Repair considered first.",
    headlineEm: "considered first.",
    lede: "Washing machines, dishwashers, fridges, freezers, dryers and ovens looked at by an engineer before you replace them. For households who would rather mend a good machine than buy a worse one.",
    included: [
      "Diagnosis of the fault, including error codes, drainage, heating and motor faults",
      "Washing machines, tumble dryers, dishwashers, fridges, freezers, ovens and hobs",
      "Common parts fitted on the first visit where the engineer carries them",
      "Non-standard parts identified by model number and ordered against your agreement",
      "An honest view on whether the machine is worth repairing at all",
    ],
    how: [
      "Send the make, model number and any error code showing on the display",
      "We check part availability for that model and tell you the likely cost and who is attending",
      "The engineer diagnoses on site, and no part is ordered until you have agreed the price",
      "The repair is completed, the machine is tested through a cycle, and the old part is left with you",
    ],
    faq: [
      {
        q: "How is this priced?",
        a: "A diagnosis charge for the visit, then parts and labour agreed with you before the repair goes ahead. If the machine is not worth repairing you pay for the diagnosis and nothing more.",
      },
      {
        q: "Why do you need the model number?",
        a: "Because parts availability decides whether a repair is possible at all, and it varies by model rather than by brand. It is usually on a sticker inside the door, on the back, or behind the drawer.",
      },
      {
        q: "Will the first visit fix it?",
        a: "Often, where the fault is a common one and the part is on the van. Where a part has to be ordered a second visit is needed, and we will tell you at the point of diagnosis rather than leave you waiting.",
      },
      {
        q: "What if the machine is still under warranty?",
        a: "Go to the manufacturer first, because an independent repair can end the warranty. We will say so if you tell us the age of the machine, rather than take the booking.",
      },
    ],
    practical: {
      duration: "Around an hour for diagnosis and most first-visit repairs",
      materials: "Common parts carried, specific parts ordered against your agreement",
      access: "The appliance pulled out or accessible, with water and power available",
      parking: "A space near the door, as parts and tools are carried in",
      excluded: [
        "Integrated cabinetry alterations to remove or refit a built-in machine",
        "Plumbing and electrical work beyond the appliance connection",
        "Gas appliances and gas hobs, which are booked as heating work",
      ],
    },
  },

  locksmith: {
    eyebrow: "Services · Locks and security",
    headline: "A door that holds.",
    headlineEm: "that holds.",
    lede: "Lock changes, snapped keys, lockouts, window locks and door security, arranged quickly and without damage where the lock allows. For a house you have just moved into, or one you no longer trust.",
    included: [
      "Non-destructive entry attempted first, with the lock preserved where it can be",
      "Cylinder changes and upgrades to anti-snap, anti-drill and anti-bump standards",
      "Full lock changes after a move, a lost key or a change of circumstances",
      "Window locks, patio doors, multipoint mechanisms, letterplates and door chains",
      "A review of the door and frame, since most failures are the frame rather than the lock",
    ],
    how: [
      "Call the House on 0800 047 8738 if you are locked out now, rather than sending a form",
      "For planned work, send photographs of the lock, the door edge and any key you still have",
      "We confirm the likely cost, the parts needed and who will be attending",
      "The lock is changed or opened, tested with every key, and the spare keys handed to you",
    ],
    faq: [
      {
        q: "I am locked out right now. What should I do?",
        a: "Call 0800 047 8738 rather than using the enquiry form, because the form is checked in working hours and a lockout is not a working-hours problem. Tell us the door type and whether you have any key at all.",
      },
      {
        q: "How is this priced?",
        a: "A call-out for the visit plus the cost of any cylinder or mechanism fitted. We will give you a range on the phone once we know the lock type, and confirm the exact figure before any work starts.",
      },
      {
        q: "Will the door be damaged?",
        a: "Non-destructive entry is always attempted first and works in most cases. Some locks, particularly older mortice and certain multipoint mechanisms, cannot be opened without drilling, and you will be told before that decision is made.",
      },
      {
        q: "Should I change the locks after moving in?",
        a: "It is worth doing, since you cannot know how many keys exist or who holds them. Changing the cylinder alone is usually enough, and is considerably cheaper than replacing whole locks.",
      },
    ],
    practical: {
      duration: "Under an hour for most openings and cylinder changes",
      materials: "Cylinders and common mechanisms carried, unusual patterns ordered in",
      access: "Proof that you live at or are entitled to access the property",
      parking: "A space near the door, though the team can carry in on foot",
      excluded: [
        "Alarms, CCTV and door entry systems, which are booked as security installation",
        "Door and frame replacement, and repair of a forced or damaged frame",
        "Safe opening, vehicle locks and commercial master-key suites",
      ],
    },
  },

  housekeeping: {
    eyebrow: "Services · Housekeeping",
    headline: "The daily order of a home.",
    headlineEm: "order of a home.",
    lede: "A discreet ongoing presence rather than a visit: laundry, linen, the kitchen and the small order that keeps a household running. For homes that want the same person, on the same days.",
    included: [
      "Laundry, ironing, linen changes and wardrobe rotation through the seasons",
      "Kitchen order, fridge management, everyday food shopping and putting away deliveries",
      "Daily reset of the rooms in use, rather than a full clean each time",
      "Care of the surfaces and materials a house is actually made of, noted room by room",
      "A standing note of what needs attention, so trades are arranged before something fails",
    ],
    how: [
      "Tell us the household, the days and hours you have in mind, and what matters most",
      "We set out who is available, what it costs and how the arrangement would work",
      "You meet the housekeeper before anything is agreed, because this is the closest role in the house",
      "The rhythm settles over the first few weeks, and is adjusted with you rather than fixed",
    ],
    faq: [
      {
        q: "How is this priced?",
        a: "By the hour or by a set number of days a week, agreed in advance so the household budget is predictable. Longer standing arrangements are priced differently from occasional cover.",
      },
      {
        q: "Is it the same person each time?",
        a: "That is the intention, since the value of housekeeping is in someone knowing the house. Holiday and sickness cover is arranged with you, and you will be told in advance rather than met at the door by a stranger.",
      },
      {
        q: "How is this different from cleaning?",
        a: "Cleaning is a defined task carried out on a visit. Housekeeping is an ongoing responsibility for how the house runs, which includes cleaning but also laundry, provisioning and noticing what needs doing.",
      },
      {
        q: "Do we have to be at home?",
        a: "Usually not, and most households settle on key or code access after the first few weeks. Access arrangements are recorded and never shared outside the arrangement.",
      },
    ],
    practical: {
      duration: "Agreed days and hours each week, from a single day to full-time",
      materials: "Household products supplied by you, or ordered on your behalf",
      access: "Keys or an access code once the arrangement is settled",
      parking: "A permit or a space is helpful where the housekeeper drives",
      excluded: [
        "Childcare, sole charge of children and any form of personal or nursing care",
        "Cooking for events, formal service and staffing a party",
        "Trade work such as repairs, gardening and window cleaning, which are booked separately",
      ],
    },
    recurring: true,
  },
};
