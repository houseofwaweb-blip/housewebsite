/**
 * A flat index of every insurance cover the House introduces, with search tags,
 * powering the "Find your cover" search on the insurance hub. Tags are generous
 * on purpose: the specific things people actually type ("necklace", "washing
 * machine", "loft conversion", "ferrari") should resolve to the right cover.
 * One place so the search stays in step with the pages.
 */
export type CoverIndexEntry = {
  name: string;
  blurb: string;
  href: string;
  image: string;
  group: string;
  tags: string[];
};

export const ALL_COVERS: CoverIndexEntry[] = [
  // Everyday
  { name: "Home insurance", blurb: "Buildings and contents for a standard home.", href: "/insurance/everyday/home", image: "/insurance/ev-home.webp", group: "Everyday cover", tags: ["home", "house", "buildings", "contents", "standard", "flat", "apartment", "bungalow", "terraced", "terrace", "semi", "maisonette", "studio", "new build", "household", "possessions", "belongings", "accidental damage"] },
  { name: "Car, van & motorbike", blurb: "Including temporary cover from one hour to 28 days.", href: "/insurance/everyday/motor", image: "/insurance/ev-motor.webp", group: "Everyday cover", tags: ["car", "van", "motorbike", "motorcycle", "moped", "scooter", "vehicle", "temporary", "learner", "provisional", "motor", "4x4", "suv", "pickup", "ev", "electric car", "hybrid", "comprehensive", "third party"] },
  { name: "Pet & travel", blurb: "Pet cover, and single-trip or annual travel.", href: "/insurance/everyday/pet-and-travel", image: "/insurance/ev-pet.webp", group: "Everyday cover", tags: ["pet", "dog", "puppy", "cat", "kitten", "rabbit", "vet", "vet bills", "travel", "holiday", "trip", "cruise", "ski", "winter sports", "backpacking", "baggage", "cancellation", "medical", "annual travel"] },
  { name: "Breakdown & bicycle", blurb: "Roadside and recovery, and cover for bikes.", href: "/insurance/everyday/breakdown-and-bicycle", image: "/insurance/ev-breakdown.webp", group: "Everyday cover", tags: ["breakdown", "recovery", "roadside", "home start", "tow", "bicycle", "bike", "bikes", "mountain bike", "road bike", "ebike", "electric bike", "cycle", "cycling"] },

  // Home cover
  { name: "Boiler & heating cover", blurb: "When the heating stops.", href: "/insurance/boiler-cover", image: "/insurance/boiler-cover.webp", group: "Home cover", tags: ["boiler", "heating", "central heating", "radiator", "radiators", "plumbing", "hot water", "cold", "heat pump", "thermostat", "gas", "oil", "engineer", "service", "home emergency", "drains", "leak"] },
  { name: "Appliance cover", blurb: "The machines a home runs on.", href: "/insurance/appliance-cover", image: "/insurance/appliance-cover.webp", group: "Home cover", tags: ["appliance", "appliances", "washing machine", "washer", "oven", "cooker", "hob", "fridge", "freezer", "dishwasher", "microwave", "tumble dryer", "dryer", "kitchen", "white goods", "tv", "television", "electronics", "warranty"] },

  // Advised
  { name: "Private client", blurb: "Advised cover for period & high-value homes.", href: "/insurance/private-client", image: "/insurance/cat-house.webp", group: "Advised", tags: ["advised", "private client", "high value", "high-net-worth", "hnw", "wealthy", "estate", "mansion", "luxury", "one policy", "renewal", "portfolio", "lifestyle"] },

  // Specialist property
  { name: "Listed buildings", blurb: "Grade I, II* and II homes.", href: "/insurance/listed-buildings", image: "/insurance/listed.webp", group: "Specialist property", tags: ["listed", "grade", "grade 1", "grade 2", "heritage", "period", "georgian", "victorian", "edwardian", "tudor", "conservation", "manor", "rectory", "barn conversion", "church conversion"] },
  { name: "Thatched properties", blurb: "Thatch, read on its real risk.", href: "/insurance/thatched-properties", image: "/insurance/thatched.webp", group: "Specialist property", tags: ["thatch", "thatched", "cottage", "straw", "reed", "water reed", "longstraw", "chocolate box"] },
  { name: "Non-standard construction", blurb: "Timber, cob, flint, steel and more.", href: "/insurance/non-standard-construction", image: "/insurance/non-standard.webp", group: "Specialist property", tags: ["non-standard", "non standard", "timber frame", "cob", "flint", "stone", "steel frame", "prefab", "prefabricated", "single skin", "concrete", "wimpey", "airey", "cornish", "mundic", "prc", "system build"] },
  { name: "Second & holiday homes", blurb: "Cover that fits real occupancy.", href: "/insurance/second-homes", image: "/insurance/holiday-home.webp", group: "Specialist property", tags: ["second home", "holiday home", "holiday let", "let", "overseas", "abroad", "airbnb", "pied-a-terre", "lodge", "chalet", "villa", "static caravan"] },
  { name: "Unoccupied & probate", blurb: "Empty homes, calmly covered.", href: "/insurance/unoccupied-property", image: "/insurance/probate.webp", group: "Specialist property", tags: ["unoccupied", "empty", "vacant", "probate", "inheritance", "inherited", "deceased", "between owners", "empty house", "void"] },
  { name: "Renovation & works", blurb: "One policy for the works.", href: "/insurance/renovation-and-extension", image: "/insurance/renovation.webp", group: "Specialist property", tags: ["renovation", "extension", "building work", "works", "contract works", "jct", "refurbishment", "refurb", "builder", "loft conversion", "self build", "self-build", "conversion", "structural", "building site"] },

  // Assets & advice
  { name: "Fine art & collections", blurb: "Art, jewellery, watches and wine.", href: "/insurance/fine-art-and-collections", image: "/insurance/cat-fine-art.webp", group: "Assets & advice", tags: ["fine art", "art", "painting", "paintings", "canvas", "print", "sculpture", "antique", "antiques", "jewellery", "jewelry", "necklace", "ring", "rings", "earrings", "bracelet", "pendant", "brooch", "gemstone", "diamond", "gold", "silver", "watch", "watches", "rolex", "wine", "cellar", "whisky", "spirits", "collection", "collections", "valuables", "scheduled", "heirloom", "handbag", "designer bag", "memorabilia", "stamps", "coins", "vinyl"] },
  { name: "Classic & prestige motor", blurb: "The car, on one renewal date.", href: "/insurance/classic-and-prestige-motor", image: "/insurance/cat-cars.webp", group: "Assets & advice", tags: ["classic car", "classic", "prestige", "supercar", "hypercar", "sports car", "kit car", "collection", "agreed value", "vintage", "ferrari", "porsche", "aston martin", "jaguar", "e-type", "morgan", "land rover", "defender", "track day", "concours"] },
  { name: "Business insurance", blurb: "Warm B2B introductions.", href: "/insurance/business", image: "/insurance/cat-business.webp", group: "Assets & advice", tags: ["business", "commercial", "b2b", "company", "directors", "cyber", "fleet", "property owners", "landlord", "buy to let", "rental property", "shop", "office", "cafe", "restaurant", "salon", "ecommerce", "stock"] },
  { name: "Trades & contractors", blurb: "Liability, tools and contract works.", href: "/insurance/business/trades-and-contractors", image: "/insurance/interior-editorial.webp", group: "Assets & advice", tags: ["trades", "trade", "contractor", "tradesman", "builder", "plumber", "electrician", "carpenter", "joiner", "plasterer", "roofer", "painter", "decorator", "scaffolder", "groundworker", "liability", "public liability", "employers liability", "tools", "contract works", "cis"] },
  { name: "Professional indemnity", blurb: "Cover for advice given.", href: "/insurance/business/professional-indemnity", image: "/insurance/interior-editorial.webp", group: "Assets & advice", tags: ["professional indemnity", "pi", "architect", "engineer", "surveyor", "designer", "consultant", "accountant", "bookkeeper", "it consultant", "coach", "advice", "negligence", "errors and omissions"] },
];
