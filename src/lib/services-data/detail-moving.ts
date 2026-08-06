import type { RequestableDetail } from "./requestable-detail";

/**
 * Page content for the Moving & clearance and Trades & specialists services.
 *
 * These nine render through the same `ServiceDetail` template as gardening and
 * cleaning, in `mode="quote"`. None of them can be priced from a postcode
 * alone, so every entry is honest about the pricing method (photographs,
 * volume, hourly, or after a survey) rather than publishing a number the House
 * would then have to walk back.
 *
 * House voice rules that apply to every entry here:
 *   - No em dashes. Use a comma, or start a new sentence.
 *   - Never the word "AI".
 *   - Work is carried out by a House of Willow Alexander team or by a named
 *     House Approved professional, disclosed before anyone commits. Never claim
 *     it is always our own crews.
 *   - Electrical work (EV chargers, solar and battery, alarms) is carried out
 *     by a qualified, registered electrician who issues the certificate.
 *   - Waste leaves site with a licensed carrier. Say so where it is true.
 *   - No heroImage on any of these. We hold no photography for them yet.
 */

export const MOVING_DETAIL: Record<string, RequestableDetail> = {
  packing: {
    eyebrow: "Services · Packing and unpacking",
    headline: "Packed properly at both ends.",
    headlineEm: "at both ends.",
    lede: "Boxing up a home so nothing arrives broken, and unpacking it so the new house works on the first night. Usually booked alongside a move, but available on its own.",
    included: [
      "Materials brought to the house: cartons, tissue, bubble wrap, tape and wardrobe boxes",
      "Room-by-room packing, with every carton labelled by room and contents",
      "Separate handling for glass, ceramics, mirrors, pictures and lamps",
      "Unpacking at the other end, with kitchens, beds and bathrooms set up first",
      "Empty cartons and packing waste taken away on the last day",
    ],
    how: [
      "Tell us the property size, which rooms you want packed, and the move date",
      "We agree how many packers and how many days the job needs",
      "Materials are delivered, then the team packs to the agreed order of rooms",
      "We unpack and place items where you want them, then clear the packaging",
    ],
    faq: [
      {
        q: "How is packing priced?",
        a: "By the number of packers and days the property needs, plus materials. We work that out from the room count and how full the house is, so a short video walkthrough or a few photographs gets you an accurate figure quickly.",
      },
      {
        q: "Can I pack some of it myself?",
        a: "Yes, and most people do. A common split is that you handle clothes, books and personal papers while the team takes the kitchen, glassware and anything fragile. Tell us the split and we will price only the part we are doing.",
      },
      {
        q: "What happens if something is damaged?",
        a: "Items packed by the team are covered by the insurance held by whoever carries out the work, and we will confirm the cover in writing before you commit. Cartons you pack yourself are generally excluded, which is worth knowing when you decide the split.",
      },
      {
        q: "Do you pack valuables and documents?",
        a: "We would rather you carried passports, jewellery, cash and irreplaceable papers yourself. We will point them out and set them aside rather than boxing them. Anything genuinely high value should go by a specialist carrier.",
      },
    ],
    practical: {
      duration: "A one or two-bedroom flat is usually one day. Family houses are two to three days, plus a day for unpacking.",
      materials: "Cartons, tissue, bubble wrap, tape, wardrobe boxes and covers are supplied and charged with the job.",
      access: "We need the rooms reasonably clear and the utilities on. Tell us about narrow stairs or a lift booking.",
      parking: "A bay suspension or permit is often needed in London. We will tell you what to arrange, or arrange it for you.",
      excluded: [
        "The move itself, which is quoted as removals",
        "Cleaning the property once it is empty",
        "Disconnecting or reconnecting appliances, plumbing and gas",
      ],
    },
    recurring: false,
  },

  storage: {
    eyebrow: "Services · Storage",
    headline: "Kept safe until you want it.",
    headlineEm: "until you want it.",
    lede: "Short and long-term storage for furniture and belongings, collected from the house and returned when you are ready. For moves that do not line up, refurbishments, and homes between chapters.",
    included: [
      "Collection from the property, wrapped and loaded by the team",
      "An itemised inventory of everything that goes into store",
      "Secure, dry storage in containers or a unit, sized to what you have",
      "Monthly billing for as long as you need it, with no fixed term",
      "Return delivery and placement back into the rooms you choose",
    ],
    how: [
      "Tell us roughly how much there is and how long you expect to need it",
      "We estimate the volume from photographs or a short visit, then quote collection, storage and return",
      "Everything is wrapped, listed and taken into store on the agreed day",
      "You give us notice when you want it back, and we deliver and unload",
    ],
    faq: [
      {
        q: "How is storage priced?",
        a: "By volume and by month, with collection and return quoted separately. Volume is the number that matters, so an accurate estimate up front avoids a correction later. Photographs of each room are usually enough for us to size it.",
      },
      {
        q: "Can I get to my things while they are in store?",
        a: "Access depends on the facility holding them, and container storage generally needs notice rather than turning up. Tell us if you expect to need regular access and we will choose a site that allows it.",
      },
      {
        q: "Is anything not suitable for storage?",
        a: "Food, plants, fuel, paint, aerosols and anything perishable or flammable cannot go into store. Nor can documents or valuables you would be unable to replace. We will flag anything on the day rather than quietly loading it.",
      },
      {
        q: "Are my belongings insured while stored?",
        a: "Storage cover is arranged separately from the move and is usually based on a declared total value. We will tell you what the cover is and what it excludes before anything leaves the house, so you can decide the declared figure.",
      },
    ],
    practical: {
      duration: "Collection is usually half a day to a day. Storage runs by the month, from a few weeks to open-ended.",
      materials: "Blankets, covers and wrapping are supplied. Cartons for loose items are charged separately.",
      access: "We need the items accessible at ground level or via stairs we have been told about. Lofts and cellars need to be emptied first, or add clearance.",
      parking: "Loading space near the door is needed. A suspended bay or permit may be required in London.",
      excluded: [
        "Loft, cellar and garage emptying, which is quoted as clearance",
        "Disposal of anything you do not want stored",
        "Long-term document archiving and specialist art or wine storage",
      ],
    },
    recurring: true,
  },

  "house-clearance": {
    eyebrow: "Services · House and loft clearance",
    headline: "A house emptied with care.",
    headlineEm: "with care.",
    lede: "Whole properties, single rooms, lofts and garages cleared and taken away. Often after a death, a sale or a downsize, which is work that deserves a calm pair of hands.",
    included: [
      "A walkthrough of what goes, what stays and what you want set aside",
      "Furniture, white goods, carpets, loft and garage contents removed",
      "Items separated for reuse, charity donation and recycling before disposal",
      "Everything taken away by a licensed waste carrier, with transfer notes issued",
      "The property left swept and empty, ready for a clean or a handover",
    ],
    how: [
      "Send photographs of each room, loft and garage, or ask us to visit",
      "We price the clearance by volume and access, and tell you who will carry it out",
      "On the day we confirm the keep pile with you before anything is loaded",
      "The house is cleared, swept and handed back, and your waste notes follow by email",
    ],
    faq: [
      {
        q: "How do you price a clearance?",
        a: "By the volume going out and how hard it is to get to, so photographs of every room including the loft are the fastest route to a firm figure. Where a property is very full, or we cannot see it properly, we will visit before quoting.",
      },
      {
        q: "What happens to everything you take?",
        a: "Usable furniture and household goods go to reuse or charity where they will be accepted. The rest is sorted for recycling, and only what is left goes for disposal. All of it leaves with a licensed waste carrier and you receive the transfer documentation.",
      },
      {
        q: "Can you look out for things that matter?",
        a: "Yes, and please tell us in advance. Paperwork, photographs, jewellery and anything with a name on it are set aside rather than cleared, and we will show you the pile before we load. If you would rather be there for that, we will work to your time.",
      },
      {
        q: "Is there anything you cannot take?",
        a: "Asbestos, gas bottles, paint, chemicals, tyres and clinical waste all need specialist disposal and are not part of a standard clearance. If we find any, we will stop, tell you, and arrange the right route for it.",
      },
    ],
    practical: {
      duration: "A single room or loft is often half a day. A full house is one to three days depending on volume and access.",
      materials: "The team brings sacks, sheeting and floor protection. No materials are charged to you.",
      access: "We need keys or someone on site, and a clear route out. Tell us about stairs, lifts and loft hatches.",
      parking: "A van needs to sit close to the door. A permit or suspended bay is often needed in London.",
      excluded: [
        "Asbestos, chemicals, gas bottles and other hazardous waste",
        "Stripping out fitted kitchens, bathrooms and built-in joinery",
        "The post-clearance deep clean, which is booked as cleaning",
      ],
    },
    recurring: false,
  },

  "waste-removal": {
    eyebrow: "Services · Waste and rubbish removal",
    headline: "Cleared without hiring a skip.",
    headlineEm: "without hiring a skip.",
    lede: "Single loads collected and taken away, from a garage full of boxes to the leftovers of a job. Loaded by the team, so nothing sits on your drive for a week.",
    included: [
      "Loading by the team, whether the pile is in the garden, garage or a back room",
      "Household furniture, mattresses, white goods, garden waste and general rubbish",
      "Pricing by the volume actually taken, measured against the van",
      "Sorting for recycling before anything goes for disposal",
      "Collection by a licensed waste carrier, with a transfer note issued to you",
    ],
    how: [
      "Send a photograph of the pile and tell us where in the property it sits",
      "We price it by volume and confirm a collection window",
      "The team loads it, sweeps the area and takes it away",
      "Your waste transfer note follows by email once it is tipped",
    ],
    faq: [
      {
        q: "How is this priced?",
        a: "By volume, described as a fraction of a van load, plus any surcharges for items with their own disposal route such as fridges and mattresses. A photograph with something familiar in shot for scale is usually all we need.",
      },
      {
        q: "Why not just hire a skip?",
        a: "A skip needs a permit on the road, sits there for days, and you load it yourself. A collection is loaded by the team and gone the same visit. Where the volume is genuinely large or the work runs for weeks, a skip may still be the cheaper answer and we will say so.",
      },
      {
        q: "How do I know it is disposed of properly?",
        a: "Everything leaves with a licensed waste carrier and you receive a waste transfer note naming the carrier. That document is what protects you, because householders remain liable if their waste is fly-tipped by whoever they handed it to.",
      },
      {
        q: "What can you not take away?",
        a: "Asbestos, paint, solvents, oils, gas bottles, tyres and clinical waste are outside a standard collection. Tell us if any of that is in the pile and we will arrange the correct disposal route rather than leaving you with it.",
      },
    ],
    practical: {
      duration: "Most collections are inside two hours, including loading and sweeping up.",
      materials: "Sacks, sheeting and floor protection are brought by the team and are not charged.",
      access: "Tell us which floor the waste is on and whether there is a lift. Stairs and long carries affect the price.",
      parking: "The van needs to park close to the door. A permit or suspended bay may be needed in London.",
      excluded: [
        "Hazardous waste, including asbestos, chemicals and gas bottles",
        "Demolition, soil and construction rubble in quantity",
        "Dismantling fitted units and appliances before removal",
      ],
    },
    recurring: false,
  },

  removals: {
    eyebrow: "Services · Removals",
    headline: "A move that stays calm.",
    headlineEm: "that stays calm.",
    lede: "Local and longer moves across London and the South East, with packers who handle period interiors carefully. Quoted on volume, distance and access, not on hope.",
    included: [
      "Blanket wrapping and protection for furniture, floors and door frames",
      "Dismantling and reassembly of beds, tables and flat-pack wardrobes",
      "Loading, transport and unloading into the rooms you nominate",
      "Full or partial packing, if you want it, quoted alongside the move",
      "Coordination with storage where the two dates do not meet",
    ],
    how: [
      "Tell us where from, where to, roughly how many rooms and the date you are working towards",
      "We survey by video or in person, then quote on volume, distance and access",
      "We confirm the team, the vehicles and who is carrying out the move",
      "On the day the house is protected, loaded, moved and unpacked into the right rooms",
    ],
    faq: [
      {
        q: "How far ahead should I book?",
        a: "Two to three weeks is comfortable, and the end of a month is always the busiest window. Short notice is sometimes possible but never guaranteed, so tell us your date early even if it is not fixed.",
      },
      {
        q: "What happens if completion slips?",
        a: "It happens often, and the honest answer is that a moved date depends on what is free. Tell us the moment you know, and we will hold the crew where we can. Cancellation terms are set out in the quote so there is no argument on the day.",
      },
      {
        q: "Are my belongings insured in transit?",
        a: "Goods in transit cover is held by whoever carries out the move, and we confirm the level and the excess in writing before you commit. High-value single items usually need to be declared separately, so tell us about anything unusual.",
      },
      {
        q: "Will it be your own team?",
        a: "Sometimes, and sometimes it is a House Approved professional we work with regularly. Either way you are told who is doing the work before you commit, and the House stays responsible for the arrangement from enquiry to the last box.",
      },
    ],
    practical: {
      duration: "A flat is usually a single day. Family houses run one to two days, longer with packing either side.",
      materials: "Blankets, covers and floor protection are included. Cartons and packing materials are charged with a packing service.",
      access: "We need lift bookings, stair widths, and any loading restrictions in advance. Access is what most quotes turn on.",
      parking: "Bay suspensions and permits are frequently required at both ends. We will tell you what to book, or arrange it.",
      excluded: [
        "Disconnecting or reconnecting gas, plumbing and hardwired appliances",
        "Piano, safe and fine art moves, which need a specialist carrier",
        "Cleaning either property, which is booked as cleaning",
      ],
    },
    recurring: false,
  },

  "ev-charger": {
    eyebrow: "Services · EV charger installation",
    headline: "Charging at home, done properly.",
    headlineEm: "done properly.",
    lede: "A home charge point specified, installed and certificated by a qualified registered electrician. For anyone tired of planning journeys around public chargers.",
    included: [
      "A survey of the consumer unit, incoming supply and earthing arrangement",
      "Charge point recommendation matched to your car, parking and daily mileage",
      "Installation by a qualified, registered electrician, including cable run and isolation",
      "Any load management or supply upgrade the installation needs, agreed first",
      "Commissioning, app setup and the electrical certificate issued to you",
    ],
    how: [
      "Tell us the car, where it parks, and roughly where the consumer unit sits",
      "We arrange a survey, by photographs or on site, and confirm what your supply allows",
      "You approve the charge point, the cable route and the price before anything is ordered",
      "The electrician installs, tests and commissions it, and issues the certificate",
    ],
    faq: [
      {
        q: "Why can you not price it from the enquiry?",
        a: "Because the cost turns on the cable run, the state of the consumer unit and the earthing arrangement, none of which we can see from a postcode. A survey turns that into a fixed price, and we will tell you the survey cost up front.",
      },
      {
        q: "Who actually does the work?",
        a: "A qualified, registered electrician, either from a House of Willow Alexander team or a named House Approved professional. You are told which before you commit. The certificate is issued in their name and the installation is notified as it should be.",
      },
      {
        q: "What if my supply will not take it?",
        a: "It is a common finding, particularly in older properties and flats. The usual answers are load management, which throttles the charger when the house is busy, or an upgrade arranged with your network operator. We will explain both and what each costs.",
      },
      {
        q: "Can you install one for a flat or shared parking?",
        a: "Sometimes, and it depends entirely on the freeholder, the metering and whether the cable can reach a bay you have rights over. We will look at it honestly and tell you if the answer is no rather than starting work you cannot finish.",
      },
    ],
    practical: {
      duration: "A straightforward installation is a single day. Supply upgrades depend on the network operator and take longer.",
      materials: "The charge point, cable, isolator and any protective devices are quoted after the survey.",
      access: "We need access to the consumer unit, the meter and the parking space on the day.",
      parking: "A space for the van near the property, and the car space kept clear while the work is carried out.",
      excluded: [
        "Groundworks and trenching for cable runs across driveways",
        "Network operator supply upgrades, which are arranged but not carried out by us",
        "Servicing or warranty repair of the vehicle itself",
      ],
    },
    recurring: false,
  },

  "solar-battery": {
    eyebrow: "Services · Solar and home battery",
    headline: "Power made and held.",
    headlineEm: "made and held.",
    lede: "Generation and storage sized to how the house actually runs, not to the biggest system that fits the roof. We look at your usage before recommending anything.",
    included: [
      "A review of your electricity usage, tariff and the shape of your daily demand",
      "A roof and structural assessment covering orientation, shading and condition",
      "A system proposal with the modelled generation, storage and payback set out plainly",
      "Installation by a qualified, registered electrician, with the roof work by the right trade",
      "Commissioning, monitoring setup and the electrical certification issued to you",
    ],
    how: [
      "Send twelve months of electricity bills, or your meter readings, and photographs of the roof",
      "We model what the house would actually use and store, and propose a system size",
      "You see the costs, the assumptions and who will carry out the work before committing",
      "The system is installed, tested, commissioned and registered, and the paperwork follows",
    ],
    faq: [
      {
        q: "Will it pay for itself?",
        a: "That depends on your usage pattern, your tariff and how much of the generation you use rather than export. We will model it on your own bills and show the assumptions, and if the numbers do not work for your house we will tell you that.",
      },
      {
        q: "Is a battery worth it without solar?",
        a: "Sometimes, on a tariff with cheap overnight rates, because you are then buying low and using it at peak. It is a different calculation from solar and we will run it separately rather than bundling the two.",
      },
      {
        q: "What about grants and export payments?",
        a: "Schemes change and eligibility depends on your property and supplier, so we will not quote a figure we cannot stand behind. We will point you at the current schemes and what the application needs, and you can confirm the amount with the provider.",
      },
      {
        q: "What could go wrong on my roof?",
        a: "Older or poorly maintained roofs sometimes need repair before panels go on, and shading from trees or a neighbouring building can cut output badly. Both are found at survey, and we would rather lose the job than fit a system that underperforms.",
      },
    ],
    practical: {
      duration: "A typical domestic install is two to three days on site, after a survey and a design period.",
      materials: "Panels, inverter, battery, mounting and protective devices are specified and quoted after the survey.",
      access: "Scaffolding is usually required, plus access to the consumer unit, meter and a location for the battery.",
      parking: "Space for scaffolding, deliveries and a van for the duration of the installation.",
      excluded: [
        "Roof repairs or re-covering found necessary before installation",
        "Tree work to reduce shading, which is quoted as garden work",
        "Off-grid systems and generator or standby power installations",
      ],
    },
    recurring: false,
  },

  "smart-home": {
    eyebrow: "Services · Smart home and networking",
    headline: "A house that behaves.",
    headlineEm: "that behaves.",
    lede: "Wi-Fi that reaches the far bedroom, plus heating, lighting and door entry that do what you expect. For homes where thick walls or an extension have defeated the router.",
    included: [
      "A survey of the property, the incoming broadband and where the signal currently fails",
      "Wired and mesh network design, with access points placed where they earn their keep",
      "Heating, lighting, blinds and door entry set up and linked to one app",
      "Cabling, containment and making good, agreed before any wall is touched",
      "Handover with the settings written down, so the house is yours and not ours",
    ],
    how: [
      "Tell us the property size, what is already installed and where things stop working",
      "We survey the building, the broadband and the dead spots, then propose a design",
      "You approve the equipment, the cable routes and the price before work starts",
      "It is installed, configured and handed over, with the network documented for you",
    ],
    faq: [
      {
        q: "Why not just buy a mesh kit?",
        a: "In a small flat that is often the right answer and we will say so. In a period house with solid walls, a basement or a garden room, mesh over Wi-Fi struggles and a wired backbone is what fixes it properly. The survey tells us which house you have.",
      },
      {
        q: "Do I have to run cables through finished rooms?",
        a: "Not always. Loft, cellar and existing conduit routes cover a great deal, and we will show you every proposed route before we start. Where a chase is unavoidable we will say so, and making good is priced in rather than left to you.",
      },
      {
        q: "Will it still work if I change broadband provider?",
        a: "Yes. The internal network is separate from whoever supplies the line, and swapping provider means swapping the router at the front of it. We hand over the settings and passwords so any competent installer can pick it up later.",
      },
      {
        q: "Who owns the system afterwards?",
        a: "You do. The accounts are set up in your name, the documentation is yours, and nothing is locked to us. If you would rather we kept an eye on it we can arrange that, but it is a choice and never a condition.",
      },
    ],
    practical: {
      duration: "A network install is often one to two days. Whole-house lighting and heating work runs longer and is staged.",
      materials: "Access points, switches, cable, containment and control equipment are quoted after the survey.",
      access: "We need the loft, cupboards and the location of the incoming line accessible, plus the broadband account details.",
      parking: "A space near the property for the van while cabling and equipment are brought in.",
      excluded: [
        "Broadband line installation and provider contracts, which stay with your supplier",
        "Decorating beyond making good the routes we have opened",
        "Ongoing support for third-party apps and consumer devices you buy separately",
      ],
    },
    recurring: false,
  },

  "security-alarms": {
    eyebrow: "Services · Alarms and CCTV",
    headline: "A house watched without noise.",
    headlineEm: "without noise.",
    lede: "Intruder alarms, cameras and door entry specified for the way the property is actually used, then installed and maintained. We start with what you already have.",
    included: [
      "A walk of the property covering entry points, sight lines and existing equipment",
      "Alarm design with sensors placed to catch intruders rather than the cat",
      "Camera positions chosen for usable images, with storage and retention agreed",
      "Installation by a qualified, registered electrician where mains wiring is involved",
      "Handover, app setup, user codes and a written note of how the system is configured",
    ],
    how: [
      "Tell us what you already have, what you want covered and whether anyone is home in the day",
      "We survey the property and propose a design, with the equipment and monitoring options priced",
      "You approve the layout, the cable routes and who will carry out the work",
      "It is installed, tested and handed over, with certification where electrical work is involved",
    ],
    faq: [
      {
        q: "Do I need monitoring, or is a bell box enough?",
        a: "It depends on the property and what your insurer asks for. An audible-only system deters, but nobody is obliged to respond to it. Monitoring costs a monthly fee and brings a response, so we set out both and let you choose.",
      },
      {
        q: "Will my insurer accept the system?",
        a: "Ask them before we install, and tell us what they say. Some policies specify a grade of system or a particular certification, and it is far cheaper to design to that from the start than to discover the requirement at renewal.",
      },
      {
        q: "Where can I legally put cameras?",
        a: "Cameras that capture anything beyond your own boundary bring data protection duties, including signage and handling requests from people recorded. We will place cameras to do the job with the least overspill, and tell you plainly what your obligations are.",
      },
      {
        q: "What goes wrong with these systems?",
        a: "False alarms from badly placed sensors, cameras pointed at a bright sky, and batteries nobody replaced. The survey deals with the first two. The third is why we recommend a service visit, and we will quote it rather than assume it.",
      },
    ],
    practical: {
      duration: "A domestic alarm or camera install is usually one to two days after the survey.",
      materials: "Panel, sensors, cameras, recorder and cabling are specified and quoted once the design is agreed.",
      access: "We need access to every room being covered, the loft where cables run, and the broadband for remote access.",
      parking: "A space for the van near the property while the system is installed and tested.",
      excluded: [
        "Locks, doors, gates and physical security hardware, which is booked as locks and security",
        "Monitoring station contracts, which are arranged with the provider in your name",
        "Retrieving or exporting footage for legal proceedings",
      ],
    },
    recurring: false,
  },
};
