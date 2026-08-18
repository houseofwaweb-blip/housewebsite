# House of Willow Alexander — Site-wide Copy Inventory

A full, per-page, per-section inventory of the current live copy, captured verbatim so an editor can review and rewrite it. Each section notes the file/component the copy lives in, so every line can be found and changed at source.

## What is excluded (per instruction)
- **The Hearth** magazine articles (written accurately already; dynamic from Sanity)
- **Shop** product descriptions, names and prices (dynamic from Shopify)
- **Cinema** film titles and descriptions (dynamic from the YouTube channel / Sanity toggle)

## How to read the tags
- `[dynamic]` / `[dynamic from CMS]` — the copy is pulled from Sanity or Shopify at runtime; the current hardcoded fallback is shown so you can see what renders today.
- `[CMS-backed; fallback shown]` — the page reads from Sanity via `getPageSections(...)` etc.; the fallback (current live text where there's no Sanity override) is captured.
- `[data]` — rendered through a shared template from a data file (e.g. the insurance specialist pages).

## Highest-risk area to review first
The **service inclusions, package bullets and "what's included/not included"** copy is where the original writing invented operational specifics that are not part of the business (weather guarantees, priority rescheduling, call-out credits, fixed visit frequencies, "photo handover", team sizes, trade jargon like "frontage type"). A corrective pass has already been run against the real service sites (willowalexandergardeners / cleaners / windowcleaners .co.uk) and is reflected in Section 4 below, but the whole area still deserves a careful line-by-line read against what the business actually offers. Two things to check specifically: the **review scores/counts are honest-looking placeholders** (held until a real ratings source is wired in), and every service now shows a **charging basis** ("Priced per hour" etc.) instead of a price.

---

## Contents
1. **Home, The House & global shell** (header/nav, footer, homepage sections, The House pages)
2. **Insurance, Shop & Offers**
3. **System & Design pages** (how-it-works, House Approved Pro, My House, search, help, contact, legal, Interiors + Gardens design)
4. **Services** — Do/Services landing, the detail templates, per-service data, sub-services and the requestable catalogue (charging basis + corrected copy)

---



---

# Home, The House & global shell — copy inventory

Verbatim current user-facing copy for the global header/nav, global footer, the
homepage, and The House section pages. Copy that is fetched from Sanity/Shopify
at runtime is marked **[dynamic from CMS]**. Several House pages render Sanity
content when present but ship with hardcoded fallback copy — that fallback is the
current live text where no Studio override exists, so it is captured here and
flagged **[CMS-backed; fallback shown]**.

Cinema and Hearth article copy are intentionally excluded per the brief.

---

## Global — Header / Nav (`components/layout/navConfig.ts`, `Header.tsx`)

### Primary nav triggers (desktop mega-menu)
- Trigger: "Services" (→ /services)
- Trigger: "Insurance & Cover" (→ /insurance)
- Trigger: "Shop" (→ /shop)
- Trigger: "Magazine" (→ /the-hearth)
- Trigger: "Offers" (→ /offers)
- Trigger: "The House" (→ /the-house/about)

### Header utility (desktop right cluster)
- Link: "Search"
- Link: "Powered by HoWA" (PoweredByHowa component, → /how-it-works)
- Link: "My House" (→ /my-house)
- CTA (primary): "Book a service" (default `ctaLabel`, → #open-booking-form)
- Cart icon (no text label)

### Mobile sticky CTA
- CTA: "Book a service" (most routes)
- CTA: "Get a quote" (on /insurance routes; → /insurance-and-cover/quote)

### Mobile drawer group labels (the six panels regrouped under five verbs)
- Label: "Do" (paired sublabel: "Services")
- Label: "Protect" (paired sublabel: "Insurance & Cover")
- Label: "Shop" (paired sublabel: "Shop")
- Label: "Read" (paired sublabel: "Magazine")
- Label: "About" (paired sublabel: "The House")
- Per-group link (generated): "See all {trigger} →" (e.g. "See all services →")
- Drawer footer links: "Search", "My House", "Powered by HoWA"

### Mega-menu: Services panel
Group heading: "Home care"
- Link: "Gardeners" (→ /services/gardening)
- Link: "Housekeeping" (→ /services/housekeeping)
- Link: "Cleaners" (→ /services/cleaning)
- Link: "Window cleaners" (→ /services/window-cleaning)
- Link: "Repairs & handyman" (→ /services/handyman)
- Link: "Removals" (→ /services/removals)

Group heading: "Specialist"
- Link: "Electrical & energy" (→ /services/energy)
- Link: "Dog walking & pet care" (→ /services/pet-care)
- Link: "Home & garden" (→ /services/home-and-garden)
- Link: "Interior design" (→ /services/interiors)
- Link: "Garden design" (→ /design/gardens)

Group heading: "Recurring care"
- Link: "Home & garden care" — description: "The whole property, on one plan" (→ /services/home-and-garden)
- Link: "House Offers" — description: "Packages & member benefits" (→ /offers)
- Link: "House Approved standards" — description: "How we vet" (→ /the-house/standards)
- Link: "Book a service" (→ #open-booking-form)

Two-level category list (desktop hover): Gardeners · Housekeeping · Cleaners · Window cleaners · Repairs & handyman · Removals · Electrical & energy · Dog walking & pet care · Home & garden · Design (sub-links: "Interior design", "Garden design")

Services mega-menu footer row:
- Link: "House Approved standards" (→ /the-house/standards)
- Link: "House Offers" (→ /offers)
- Link: "Book a service" (→ #open-booking-form)

Services mega-menu featured tile:
- Tag: "House Approved"
- Heading: "Every visit, to the House standard." (→ /the-house/standards)
- Postcode field label: "See services near you"
- Trust: "Every professional is House Approved: background-checked, insured and reviewed."

### Mega-menu: Insurance & Cover panel
Group heading: "Everyday cover"
- Link: "Home & contents" — description: "For everyday homes" (→ /insurance/everyday/home)
- Link: "Car, van & motorbike" — description: "Including temporary cover" (→ /insurance/everyday/motor)
- Link: "Pet & travel" — description: "The animal and the trip" (→ /insurance/everyday/pet-and-travel)
- Link: "Breakdown & bicycle" — description: "Roadside and bikes" (→ /insurance/everyday/breakdown-and-bicycle)
- Link: "How this works" — description: "Introduced by Provenance" (→ /insurance/how-this-works)

Group heading: "Specialist & private client"
- Link: "Private client & estate" — description: "A life considered" (→ /insurance/private-client)
- Link: "Business & commercial" — description: "Assets & liability" (→ /insurance/business)
- Link: "Home protection" — description: "Register interest" (→ /protect/home-protection)

Insurance preview tile:
- Tag: "Insurance & Cover"
- Heading: "Cover for the house. And everyone who lives in it." (→ /insurance)

### Mega-menu: Shop panel
- Group heading: "Categories" — **[dynamic from CMS/Shopify]** category list generated from `shop-nav.generated.json`
Shop mega-menu footer row:
- Link: "House Approved" (→ /shop/collections/house-approved)
- Link: "All products" (→ /shop)
- Link: "All collections" (→ /shop/collections)
- Link: "Gift Cards" (→ /gift-cards)

### Mega-menu: Magazine panel
Group heading: "The Hearth"
- Link: "Read the magazine" — description: "Homes, gardens & living well" (→ /the-hearth)
- Link: "Cinema" — description: "Films from the House" (→ /cinema)
- Link: "Recipes" — description: "Seasonal cooking" (→ /recipes)
- Link: "News" — description: "Press, awards & announcements" (→ /news)

Magazine preview tile:
- Tag: "The Hearth"
- Heading: "Writing worth keeping, for the home and garden." (→ /the-hearth)

### Mega-menu: Offers panel
Group heading: "House Offers"
- Link: "Current offers" — description: "Seasonal packages & member benefits" (→ /offers)

### Mega-menu: The House panel
Group heading: "What we stand for"
- Link: "Philosophy" — description: "Our founding idea" (→ /the-house/philosophy)
- Link: "The Artwork of the House" — description: "Heritage, craft, colour" (→ /the-house/artwork)
- Link: "Standards" — description: "How we work" (→ /the-house/standards)
- Link: "Sustainability" — description: "Our commitments" (→ /the-house/sustainability)

Group heading: "How the House works"
- Link: "How it works" — description: "Book, remembered, cared for" (→ /how-it-works)
- Link: "House Approved Pro" — description: "For trusted tradespeople" (→ /house-approved-pro)
- Link: "About" — description: "The team behind the House" (→ /the-house/about)

The House preview tile:
- Tag: "The Philosophy"
- Heading: "Ownership is passive. Stewardship is intentional." (→ /the-house/philosophy)

---

## Global — Footer (`components/layout/Footer.tsx`)

- Opening statement (display italic): "Welcome to the House that looks after yours."

Column heading: "Services"
- All services (→ /services)
- Gardeners (→ /services/gardeners)
- Cleaners (→ /services/cleaners)
- Window cleaners (→ /services/window-cleaners)
- Repairs (→ /services/repairs-handyman)
- Home & garden (→ /services/home-and-garden)

Column heading: "Insurance & Cover"
- Home cover (→ /insurance-and-cover/home-cover)
- Pet cover (→ /insurance-and-cover/pet-cover)
- Home & pet cover (→ /insurance-and-cover/home-and-pet-cover)
- Get a quote (→ /insurance-and-cover/quote)
- Claims & help (→ /insurance-and-cover/help-and-claims)

Column heading: "Shop · Magazine · Offers"
- The House Store (→ /shop)
- The Hearth magazine (→ /magazine)
- House Offers (→ /offers)
- Gift cards (→ /gift-cards)

Column heading: "Help & account"
- Help centre (→ /help)
- Contact (→ /contact)
- My House (→ /my-house)
- How it works (→ /how-it-works)

Column heading: "The House"
- About the House (→ /the-house/about)
- Philosophy (→ /the-house/philosophy)
- Standards (→ /the-house/standards)
- House Approved Pro (→ /house-approved-pro)

- Statement line: "House of Willow Alexander, for the care, protection and enjoyment of home and garden."
- Technology / regulatory line: "Booking and home intelligence powered by HoWA. Insurance is arranged by Provenance, which is authorised and regulated by the Financial Conduct Authority."
- Powered-by link: "Powered by HoWA" (→ /how-it-works)
- Legal nav: "Privacy" (→ /legal/privacy) · "Terms" (→ /legal/terms) · "Cookie policy" (→ /legal/cookies) · Cookie preferences (CookiePreferencesLink)
- Tagline (footer bottom, italic): "Ownership is passive. Stewardship is intentional." (default `tagline`; overridable from Sanity)

---

## Homepage (`/` — `src/app/page.tsx`)

Page metadata (SEO, not on-page but user-facing in tab/search):
- Title: "House of Willow Alexander | Services, insurance and useful things for the British home"
- Description: "The House that looks after yours. Services, insurance, useful things and good ideas for the British home, all held to one standard."

### 1. Cabinet hero (`CabinetHero`)
- Section aria-label: "The House that looks after yours"
- Eyebrow: "A modern British House for home and garden"
- Heading (h1): "Welcome to the House that looks after yours."
- Sub: "Services, insurance, useful things and good ideas, all kept in order by HoWA."
- CTA (filled): "Book a service" (→ #open-booking-form)
- CTA (ghost): "Explore the House" (→ /the-house/about)
- Trust: "House-vetted · insured · clear pricing"
- Cabinet hotspot labels (interactive service links over the artwork): "Housekeeping", "Gardeners", "Dog walking & pet care", "Insurance & cover", "Removals", "Cleaners", "Repairs & handyman", "Dog walking & pet care", "Electrical & energy", "Window cleaners", "Home & garden"

### 2. Booking rail (`BookingRail`)
- Eyebrow: "Book the House"
- Heading (h2): "What needs doing?"
- Sub: "Tell us the job and your postcode, and see real availability and clear pricing in seconds."
- Service chips: "Gardeners", "Housekeeping", "Cleaners", "Repairs", "All services"
- Field label: "I'm looking for" — placeholder option: "Select a service"
- Field label: "Postcode" — placeholder: "Enter postcode"
- Field label: "When" — options: "Next available", "Choose a date"
- Field label: "Date" (shown when "Choose a date" selected)
- Submit CTA: "See times & prices" (→ #open-booking-form)
- Trust: "House-vetted · clear pricing · remembered by HoWA"

### 3. Editorial split — the House standard (`EditorialSplit`, brown tone)
- Eyebrow: "The House"
- Heading: "Care, cover and good order, held to one standard."
- Body: "House of Willow Alexander brings the many parts of home into one considered standard: gardens and rooms, services and objects, all held to a single test: would we trust this in a home we love?"
- CTA: "Discover the House" (→ /the-house/philosophy)

### 4. Hearth magazine spread (`HearthSpread`)
- Eyebrow: "The Hearth"
- Heading (h2): "The magazine of the House."
- Issue marker: "Issue No. 04 · {month}" (month derived from lead article publish date, defaults to "August")
- CTA: "View the latest issue" (→ /the-hearth)
- Lead article category / title / dek / author / read time: **[dynamic from CMS — Sanity Hearth]**
- CTA: "Read the feature" (→ lead article)
- Supporting article category / title: **[dynamic from CMS — Sanity Hearth]**
- Note: entire section renders only if articles exist; article text excluded per brief.

### 5. Cinema spread (`CinemaSpread`)
- Excluded per brief (Cinema).

### 6. Store & Offers (`StoreOffers`)
- Eyebrow: "The House Store"
- Heading (h2): "Useful things, beautifully chosen."
- Link: "Shop the edit" (→ /shop)
- Product cards (name + price): **[dynamic from CMS — Shopify]**; fallback name if empty: "House Approved object"
- Right panel 1 — eyebrow: "The House View"
- Right panel 1 — heading (h3): "Cover for the house, and everyone in it."
- Right panel 1 — body: "Home and pet cover, arranged with care. Insurance introduced by Provenance."
- Right panel 1 — CTA: "Get a quote" (→ /insurance)
- Right panel 2 — eyebrow: "House Offers"
- Right panel 2 — heading (h3): "Considered seasonal offers."
- Right panel 2 — body: "Seasonal service packages, member benefits and selected cover offers."
- Right panel 2 — CTA: "View House Offers" (→ /offers)

### 7. Services showcase (`ServicesShowcase`)
- Eyebrow: "The House · Services"
- Heading (h2): "A specialist for every corner."
- Link: "All services" (→ /services)
- Service card labels: "Gardeners", "Housekeeping", "Cleaners", "Window cleaners", "Repairs & handyman", "Removals", "Electrical & energy", "Dog walking", "Home & garden", "Interiors"
- Conditional badge (unused at present): "Coming soon"

### 8. Design showcase (`DesignShowcase`)
- Eyebrow: "House Design"
- Heading (h2): "Two studios, one standard of care."
- Body: "Whether it is the rooms inside or the garden around them, the House designs, plants and keeps them to the same considered standard."
- Card 1 — eyebrow: "Interior design"
- Card 1 — title (h3): "Rooms that hold a life."
- Card 1 — body: "A considered interior scheme for a room, a floor or a whole house, from first concept to the last detail, run by a named House designer."
- Card 1 — CTA: "Explore interior design" (→ /services/interiors)
- Card 2 — eyebrow: "Garden design"
- Card 2 — title (h3): "Gardens made to be lived in."
- Card 2 — body: "Planting, structure and lighting drawn up as a proper plan, then planted and kept by the House's own gardeners across the seasons."
- Card 2 — CTA: "Explore garden design" (→ /design/gardens)

### 9. How the House works (`HowItWorks`)
- Eyebrow: "How the House works"
- Heading (h2): "Simple to ask. Kept in order after."
- Step 1 — title: "Ask the House" — body: "Choose a service, cover or product."
- Step 2 — title: "The House arranges it" — body: "Vetted people, clear information and joined-up fulfilment."
- Step 3 — title: "HoWA remembers it" — body: "Records, reminders and relevant next steps stay with the home."
- CTA: "See how it works" (→ /how-it-works)

### 10. Proof band (`ProofBand`)
- Eyebrow: "The proof"
- Heading (h2): "Held to a standard you can check."
- Body: "Every professional is vetted, every price is clear, and the House stands behind the work. The evidence, not badges."
- Stat 1: "5.0" — label: "Verified customer rating"
- Stat 2: "House Approved" — label: "Every professional vetted"
- Stat 3: "London & Home Counties" — label: "Where the House works"
- Stat 4: "Introduced by Provenance" — label: "Insurance, FCA-regulated"
- Regulatory line: "House of Willow Alexander acts as an introducer for insurance, arranged by Provenance, which is authorised and regulated by the Financial Conduct Authority. Full details are provided before any purchase."

### 11. House institution strip (`HouseInstitutionStrip`)
- Heading: "An institution for the British home."
- Sub: "Service, pride and good order."
- Body (centre): "HoWA keeps the whole House in order, the records, reminders and next steps that stay with your home."
- Eyebrow (right): "Speak to the House"
- Phone: "0800 047 8738" (tel:08000478738)
- Email: "sales@willowalexander.co.uk"
- CTA: "Explore the House" (→ /the-house/about)

---

## The House — hub (`/the-house` — `src/app/the-house/page.tsx`)

Fully hardcoded page (no CMS).

Page metadata:
- Title: "The House"
- Description: "The House of Willow Alexander: a modern British House for the care, protection and enjoyment of home and garden. Our story, our standard and the people behind it."

### 1. Hero
- Eyebrow: "The House of Willow Alexander"
- Heading (h1): "A modern British House for home and garden living."
- Sub (italic): "For the care, protection and enjoyment of home and garden."

### 2. Origin story
- Eyebrow: "Our story"
- Heading (h2): "From specialist services to a House."
- Body 1: "The House of Willow Alexander began in the practical work of looking after homes and gardens: gardeners, cleaners, window cleaners and the trades a household relies on. Doing that work well, visit after visit, taught us something simple. People do not want ten separate companies. They want one they can trust."
- Body 2: "So we became a House. The same standard now runs through everything we do, from a single garden visit to home and pet cover, from the objects in the Store to the pages of The Hearth. The disciplines keep their own expertise and their own recognised colours, but they belong to one family and answer to one standard."
- Body 3 (with links): "Read more about what we believe in our philosophy (→ /the-house/philosophy) and about the House (→ /the-house/about)."

### 3. The House today
- Eyebrow: "The House today"
- Heading (h2): "Care, Cover, Shop and Read."
- Card "Care" — body: "Trusted home and garden services, each with its own expertise and all held to the same House standard." — CTA: "See services" (→ /services)
- Card "Cover" — body: "Home and pet cover, plainly explained, owned by the House and arranged with care." — CTA: "Insurance and cover" (→ /insurance-and-cover)
- Card "Shop" — body: "The House Store: useful, well-made objects for home and garden, beautifully chosen." — CTA: "Visit the Store" (→ /shop)
- Card "Read" — body: "The Hearth, the magazine of the House, for ideas worth keeping and good domestic sense." — CTA: "Read The Hearth" (→ /magazine)

### 4. The House standard
- Eyebrow: "The House standard"
- Heading (h2): "One standard, held everywhere."
- Body 1: "The House standard is the promise behind the name. Every professional is vetted. Prices and availability are shown clearly. Reviews are verified and attributable. When something goes wrong, we put it right."
- Body 2: "We work sustainably wherever we can: choosing durable, well-made goods for the Store, reducing waste on service visits and favouring professionals who share the same care. We would rather do a smaller number of things properly than a great many carelessly."
- Body 3 (with links): "More on our standards (→ /the-house/standards) and sustainability commitments (→ /the-house/sustainability)."

### 5. The role of HoWA
- Eyebrow: "The role of HoWA"
- Heading (h2): "The system the House uses to remember and coordinate."
- Body 1: "Beneath the House sits HoWA: the quiet infrastructure that powers booking, scheduling, the Home Record, reminders and the joined-up memory of every visit, policy and purchase. It is the technology the House uses, not a product the customer is asked to join."
- Body 2 (with link): "You feel HoWA as a remembered address, a pre-filled property detail, a timely reminder before winter. You are always in control of what it keeps. Learn more on the How it works (→ /how-it-works) page."

### 6. People
- Eyebrow: "People"
- Heading (h2): "A House is its people."
- Body 1: "The House is led by a small team with real operational heritage in home and garden care, and delivered by the professionals we approve to work under our name. We name the people who look after your home, because trust is personal."
- Body 2 (with link): "Meet more of the House in about the House (→ /the-house/about)."

### 7. House Approved and professional standards
- Eyebrow: "House Approved and professional standards"
- Heading (h2): "The people we let through your door."
- Body 1: "Every professional who works under the House is House Approved: verified for identity, qualifications and insurance, and held to our standards of conduct and care. It is a mark customers can trust and one professionals earn."
- Body 2 (with links): "Professionals can apply to become House Approved (→ /house-approved-pro), and you can read about our approach to standards and accreditation (→ /the-house/standards)."

### 8. Press, awards and partnerships
- Eyebrow: "Press, awards and partnerships"
- Heading (h2): "Recognised for the work."
- Body 1: "The House is proud of the recognition its work has earned and the partners it keeps. We list press coverage, awards and partnerships only where they are current and verifiable."
- Body 2 (with links): "See the latest in news (→ /news) and view our creative work in the House artwork (→ /the-house/artwork)."

---

## The House — About (`/the-house/about`)

**[CMS-backed; fallback shown]** — uses `getPageSections("the-house-about")` with `EditorialPage` + `EnquiryForm`. Below is the hardcoded fallback text.

Page metadata:
- Title: "About"
- Description: "The small team who runs the House, and the partner studios who carry most of the work."

### Editorial intro (fallback)
- Eyebrow: "The House · About"
- Title (headline + em + tail): "A modern British House for the *care, design and intelligence* of home."
- Lede: "We began with gardens, soil and seasons, and grew into a House that tends the whole of a home. Today that means the design that shapes a house, the care that keeps it, and the records that remember it."

### Section: Who we are
- Body: "House of Willow Alexander was founded by Samuel Collett and Alexander Oakley, from a belief that home and garden care could be more beautiful, more sustainable and more intelligently held.

What began with gardens, soil, seasons, craft and electric vans, has grown into a modern British House: part service standard, part design authority, part editorial world, part marketplace, and part technology system through HoWA.

The House exists to bring taste, trust, sustainability and intelligent memory into the everyday work of keeping a home. The people we send, the products we approve, the partners we recommend and the records we keep are held to the same test: would we trust this in a home we love? We work across the UK for design and Steward commissions; services operate in defined postcode areas you'll find on each service's page."
- Figure caption: "Our electric vans, out across London and the South East."

### Section: How design begins
- Body: "Design runs through a small circle, kept deliberately small. Our own garden studio, Willow Alexander Gardens, for gardens and outdoor spaces. Delve Interiors, a House Approved partner, for considered interiors. And HoWA's design intelligence, connecting the two back to your home record. We chose a small number on purpose, so we know the people who turn up at your door and the standard they bring through it.

Each works to a single understanding. House Approved is a standard, not a label. It is the same test we set ourselves: would we trust this in a home we love? We stay honest with each other, and with you, about what is working and what needs attention. If a partner stops meeting the standard, the seal comes off. That is the whole point of holding one."

### Section: How to reach us
- Body: "The quickest way to reach us is the contact form. It routes by topic, so a question about a garden, a window, a warranty or a press enquiry lands in the right inbox rather than a general one. If you are thinking about a design, services or protection commission, start with the consultation form instead. That is where we take the few details we need to come back to you properly.

We reply within one working day. We would always rather hear from you than not, so write even if the question is half-formed. The House is built to be spoken to."

### Enquiry form (hardcoded, always shown)
- Eyebrow: "How to reach us"
- Headline: "Write to the House."
- Body: "A question about a garden, a window, a warranty or a press enquiry. Choose the topic and it lands in the right inbox. We reply within one working day."

---

## The House — Philosophy (`/the-house/philosophy`)

**[CMS-backed; fallback shown]** — `getPageSections("the-house-philosophy")` + `EditorialPage`.

Page metadata:
- Title: "Philosophy"
- Description: "What we believe about homes, ownership, and the quiet institutions that make long things last."

### Editorial intro (fallback)
- Eyebrow: "The House · Philosophy"
- Title: "Beautiful living, *intelligently* stewarded."
- Lede: "We think homes deserve the same kind of quiet institution that schools, clubs, and estates have always had: somewhere to belong, somewhere to ask, somewhere that remembers."

### Section: The founding idea
- Body: "Ownership is passive. Stewardship is intentional.

We bought our first homes not knowing much about how they were made, how they wanted to be looked after, or who to call when something went wrong. We had to learn it the expensive way. Every generation does.

House of Willow Alexander exists so the next generation doesn't have to. The idea is simple: one calm institution that remembers your home, introduces the right people, keeps a proper record, and quietly gets things done on a schedule."
- Pull quote: "A home that carries you. Not a statement you have to keep up with." — attribution: "The House brief · 2025"

### Section: What a house is actually for
- Body: "It's the frame inside which a life happens. It holds your books, your photos, your arguments, your mornings. It's expensive, complicated, and mostly invisible when it works.

We think the best homes feel worn-in, not decorated. Useful, not performative. They're kept by people who mean to keep them for a long time, not flipped for the next rung of a ladder.

Everything the House does, the design commissions, the services, the Hearth, HoWA, is in service of that kind of home. The one you mean to stay in."
- Image caption: "Worn-in, not decorated. A house meant to be kept."

### Section: Why now, and why an institution
- Body: "Care for a home used to run in families. You inherited a network of trades, a quiet education in materials and weather, a set of standards from the people who raised you. Most of us no longer do.

Institutions replace that, at scale and across generations. They hold memory, standards, and trust in one place so every new member doesn't have to rebuild them from scratch. The House is that idea, applied to a home."
- Image caption: "Memory, standards and trust, kept in one place."

---

## The House — Standards (`/the-house/standards`)

**[CMS-backed; fallback shown]** — `getPageSections("the-house-standards")` + `EditorialPage`.

Page metadata:
- Title: "Standards"
- Description: "How we work, what we refuse to compromise on, and what House Approved actually means."

### Editorial intro (fallback)
- Eyebrow: "The House · Standards"
- Title: "The *quiet* bar."
- Lede: "Everything the House does is measured against a specific standard. This page explains what that standard is, how it's maintained, and what we refuse to negotiate on."

### Section: What House Approved means
- Body: "We only place the House Approved seal on partners and products that meet three tests.

First, they would survive the kind of use a real family puts a home through, not a show home, a lived-in one. Second, they are made, grown, or offered by people we have met, visited, and would recommend to a friend. Third, they come with care notes: what it is, how to look after it, how to repair it when something goes wrong."
- Pull quote: "Would we trust this in a home we love?"

### Section: The review cadence
- Body: "House Approved is not a badge you earn once. Partners are reviewed annually. Products are reviewed whenever we stop hearing good things about them, which happens more often than we'd like to admit.

When something stops meeting the standard, it comes off the list. Quietly, without drama. The point of the seal is that it means something; the moment it stops, the institution stops."
- Image caption: "Reviewed, and re-read, year on year."

### Section: What we refuse
- Body: "We don't take undisclosed commission from partners. Introductions are introductions, not affiliate deals.

We don't recommend anything we wouldn't use in our own homes.

We don't sell data. Your record, your photographs, your documents are yours; they're stored securely and never offered to third parties for any purpose."
- Pull quote: "Standards survive because somebody refuses to lower them. Usually quietly."
- Image caption: "What we leave out matters as much as what we keep."

---

## The House — Sustainability (`/the-house/sustainability`)

**[CMS-backed; fallback shown]** — `getPageSections("the-house-sustainability")` + `EditorialPage`.

Page metadata:
- Title: "Sustainability"
- Description: "What we measure, what we refuse to do, and where we want to get to. Named numbers, not slogans."

### Editorial intro (fallback)
- Eyebrow: "The House · Sustainability"
- Title: "What we *keep*."
- Lede: "We're wary of sustainability pages that don't name anything specific. This one tries to. It will be updated as we measure more things and as what we measure gets better."

### Section: Our framing
- Body: "Most of what makes a home sustainable happens before you decorate it. Retain the fabric. Repair over replace. Extend the life of what was already made. The most sustainable piece of furniture is the one already in the room.

Our partner studios are asked to plan for a thirty-year horizon, not a style cycle. Our services are designed to keep things going longer. The Steward logic exists precisely because long-lived homes need fewer one-off interventions."
- Image caption: "Kept, repaired, extended. Grown for the long term."

### Section: What we measure
- Body: "We track three things at the moment, and intend to add more.

Materials provenance for House Approved products: where the raw materials came from, who worked them, and the distance travelled to reach the store.

Travel impact for our own operations: miles driven by services teams, consolidated where possible into single trips.

End-of-life plans for everything we sell: how it's repaired, how it's returned if it ever needs to be, and what happens to it when the next owner has had their turn."
- Image caption: "Tracked, recorded, kept honest."

### Section: What we refuse
- Body: "Fast-turnover anything. Products we couldn't repair. Partners who can't tell us where their materials come from. Marketing that claims green credentials we can't evidence.

We'd rather not write about sustainability at all than overstate it. Everything on this page should be verifiable if you ask."
- Pull quote: "Kept things last longer than new ones. We're mostly in the keeping business."

---

## The House — Proof (`/the-house/proof`)

**[CMS-backed; fallback shown]** — `getPageSections("the-house-proof")` + `EditorialPage`. Note: not linked in primary nav.

Page metadata:
- Title: "Proof"
- Description: "Press, testimony, and the institutions we keep company with. Updated as things happen."

### Editorial intro (fallback)
- Eyebrow: "The House · Proof"
- Title (headline): "Testimony."
- Lede: "Homes we've worked on. People we've written with. The occasional award. This page grows over time and once Sanity lands, every entry will carry a link."

### Section: In the press
- Body: "House of Willow Alexander has been written about in House & Garden UK, The Financial Times How To Spend It, Country Life, and World of Interiors. Full archive to follow once the Journal is populated."

### Section: Recent work
- Body: "A Grade II Georgian terrace in Notting Hill: full interior re-read, garden replant, ongoing Steward care. Delve Interiors.

A private studio in Chelsea: architectural detailing, library build, two-year commission. Delve Interiors.

A country house garden in Oxfordshire: three-year landscape scheme, seasonal management ongoing. Willow Alexander Gardens."

### Section: Testimony
- Body: "We'll let people speak for themselves here once the Journal is live. Every testimony is from someone who paid for the work, not someone who was paid to say nice things about it."
- Pull quote: "The House remembered what I asked for last spring when I'd forgotten it myself." — attribution: "A client, W11"

---

## The House — The Artwork of the House (`/the-house/artwork`)

**[CMS-backed; fallback shown]** — `getArtworkPage()` merges Sanity over the hardcoded chapters below (by index). Fallback text is the current live copy.

Page metadata:
- Title: "The Artwork of the House"
- Description: "A design-led story of heritage, craft, colour, and British domestic beauty. How the House of Willow Alexander was cultivated, not branded."

### Hero
- Eyebrow: "House of Willow Alexander · An origin story"
- Title (headline + em): "The Artwork *of the House.*"
- Lede: "A design-led story of heritage, craft, colour, and British domestic beauty. How the House of Willow Alexander was cultivated, not branded."
- Scroll cue: "↓ ten chapters"

### Chapter I — Every house begins with a name
- Kicker: "Every house begins with a name"
- Headline: "A name chosen like a dedication."
- Body 1: "Willow, inspired by Samuel's mother's favourite tree. A symbol of resilience, softness, and quiet magic. A tree that bends but never breaks. Alexander, the name of the co-founder. Steady, classical, architectural. The grounding note that anchors the lyricism of the willow."
- Body 2: "Together, they form a name with its own mythology, a name that sounds as though it has lived on bookshelves and brass plaques for generations."
- Pull quote (defined, not rendered in Ch I layout): "A name planted like a tree. A House rooted in meaning."

### Chapter II — The birthplace
- Kicker: "The birthplace"
- Headline: "A garden studio, and a little magic."
- Body 1: "The brand began as a garden design studio, its creative cradle. Two artefacts lit the spark: a vintage copy of The Wizard of Oz, with typography that danced between fantasy and serif authority, and an antique gardening encyclopaedia, bound in deep green and black."
- Body 2: "From these came our first palette: heritage green, grounded in nature, paired with a thread of gold, a subtle spark of magic. Earthy, enchanting, quietly theatrical."

### Chapter III — The Victorian discovery
- Kicker: "The Victorian discovery"
- Headline: "Mrs Beeton, and the first pattern."
- Body 1: "Studying British design history, Samuel encountered the ornate world of Mrs Beeton, the Victorian matriarch of British domestic culture. Her books were more than manuals; they were artworks. Engraved botanical frames, decorative florals, meticulous linework."
- Body 2: "From these illustrations came the first Willow Alexander pattern: a continuous hand-drawn floral tapestry, originally rendered in gold on deep green. The pattern connected horticultural expertise to domestic authority, garden and home united under a single illustrated canopy."
- Pull quote (rendered after Ch III): "Not in trend, but in tradition. Not in decoration, but in cultural lineage."
- Pattern reveal captions: "01 The source, Beeton's engraved botanical frame." / "02 The pattern, gold on heritage green, our first."

### Chapter IV — The coloured volumes
- Kicker: "The coloured volumes"
- Headline: "A library that became a fleet."
- Body 1: "Mrs Beeton's books came in coloured editions. Greens. Blues. Burgundies. Teals. Auburns. Magentas. A row of them looked like the rainbow of British housekeeping, each spine a different discipline of domestic life."
- Body 2: "Years later, those colours resurfaced as the perfect design system. Each Willow Alexander service became its own volume in the library of the House, wrapped in the same white floral pattern, transformed into a moving anthology of expertise."
- Pull quote (rendered dark after shelf): "This is not a rainbow. It is a system, a coded, crafted chromatic identity rooted in British publishing history."

### Chapter V — From studio to institution
- Kicker: "From studio to institution"
- Headline: "When a studio became a House."
- Body 1: "As the brand expanded, the name began to behave like something larger than a business. It became a House. The service brands became its children. The House became the library, the host, the institution."
- Body 2: "Visually, this required an evolution. Gold stepped forward as the primary colour of the House. Cream became the fresh, editorial canvas. The floral pattern transformed from decorative heritage into institutional insignia, used with elegance and restraint."
- Body 3: "Heritage modernism replaced whimsy. Editorial clarity replaced embellishment. Quiet confidence replaced decorative charm."

### Chapter VI — The pattern today
- Kicker: "The pattern today"
- Headline: "Linework, as a language."
- Body 1: "The floral pattern now functions as one of the House's most important design devices. It speaks differently depending on where it lives."
- Body 2: "For the institution: gold or white linework, used sparingly, as a frame, a border, a whisper, the visual equivalent of a monogram. For the service brands: white pattern set boldly over their Beeton-inspired colourways, a visual genealogy linking each discipline back to the House. For editorial and the marketplace: the pattern deepens, softens, expands; becomes atmosphere, textile, mood."
- Body 3: "The pattern does what the House does. It unites many worlds with quiet authority."

### Chapter VII — The early icons
- Kicker: "The early icons"
- Headline: "A human hand in the margins."
- Body 1: "In the early years, a family of hand-drawn icons appeared across the brand, sketches inspired by the doodles and recipe notes a mother might scribble in the margins of her favourite cookbook. They expressed warmth, familiarity, the human hand behind the services."
- Body 2: "As the House matured, the icons gently stepped back. They live now mostly in the archive, but their spirit remains in the tone of voice: warm, observant, never cold."
- Icon labels: "Garden shears", "Watering can", "Wheelbarrow", "Toolkit", "The fleet van", "The pet at the door", "The handshake at handover", "Earth, in the round"

### Chapter VIII — The ecosystem
- Kicker: "The ecosystem"
- Headline: "A living, design-led universe."
- Body: "The House is now a complete aesthetic ecosystem: institution, service brands, editorial voice, modern intelligence. Every part is threaded together by name, colour, pattern, story. Nothing stands alone."

### Chapter IX — The philosophy
- Kicker: "The philosophy"
- Headline: "Beauty as responsibility."
- Body 1: "At the heart of the House lies a belief: that homes and gardens are not simply spaces, but expressions of care. That craftsmanship and sustainability are not trends, but inherited duties. That beauty is not excess, but an act of stewardship."
- Body 2: "The artwork of the House, its colours, its patterns, its names, its stories, is a reminder that design matters because life matters. That what we touch daily should be crafted with intention."
- Pull quote (defined): "Beauty is not excess. It is an act of stewardship."

### Chapter X — A living story
- Kicker: "A living story"
- Headline: "Rooted in the past. Growing into the future."
- Body: "The artwork of the House is not finished. It evolves with every new service, every new product, every new idea. But its foundation is set: a name planted like a tree, a palette lifted from literature, a pattern drawn from Victorian craft, a fleet inspired by British domestic history. A brand that feels discovered, not invented."

### Closing
- Kicker: "The House of Willow Alexander"
- Statement (headline + em): "A modern British institution built on *design, story, care* and the extraordinary beauty of home."
- CTA (primary): "Read our philosophy" (→ /the-house/philosophy)
- CTA (secondary): "Back to The House" (→ /the-house)
- Tagline: "Ownership is passive. *Stewardship is intentional.*"


---

# Insurance, Shop & Offers — copy inventory

Verbatim current user-facing copy. `[dynamic]` = content pulled from Sanity CMS or Shopify at runtime (never hardcoded). `[data]` = static content held in a TypeScript data file and rendered through a shared template. Cinema and Hearth excluded (Hearth cross-link labels noted only where they appear in an in-scope section).

---

## Insurance — Hub (`/insurance`, `src/app/insurance/page.tsx`)

### Metadata
- Title: "Insurance from the House"
- Description: "Insurance introduced by House of Willow Alexander and arranged by Provenance. Advised cover for homes worth insuring properly, and everyday cover for everything that does not need a conversation."

### Hero
- Eyebrow: "The House · Insurance"
- Heading: "Cover for the house. *And everyone who lives in it.*" (second sentence italic `<em>`)
- Body: "Insuring a home well means understanding what it is made of and what has been done to it. The House introduces you to a specialist who takes the time to ask; the cover is arranged by Provenance."
- Primary CTA: "Speak to a specialist" (→ /insurance/private-client)
- Secondary CTA: "Everyday cover" (→ /insurance/everyday)
- Tertiary link: "Remind me before my renewal →" (→ #reminder)
- Tertiary link: "Already insured? Claims and help →" (→ /insurance/claims-and-help)
- (ProvenanceLockup: "Arranged by" + Provenance logo)

### Choose what to cover
- Eyebrow: "Choose what to cover"
- Card 1 label: "Home" / body: "Buildings and contents, from a standard house to a period one." / link: "Cover home →" (→ /insurance/everyday/home)
- Card 2 label: "Pet" / body: "Cover for the animal, shaped around it rather than a tick-box." / link: "Cover pet →" (→ /insurance/everyday/pet-and-travel)
- Card 3 label: "Home and pet" / body: "Both in one conversation, on one renewal date." / link: "Cover home and pet →" (→ /insurance/speak-to-a-specialist)

### Two doors
- Advised card eyebrow: "Advised · Private client & estate"
- Advised card heading: "For a home worth insuring properly."
- Advised card body: "A named specialist, a conversation about the house, and a policy built around it rather than around a comparison engine. One estate, one renewal date."
- Advised card link: "Speak to a specialist →"
- Everyday card eyebrow: "Everyday cover"
- Everyday card heading: "For everything that does not need a conversation."
- Everyday card body: "Home, car, pet and travel, arranged online through the service Provenance operates."
- Everyday card link: "Everyday cover →"

### Why House cover (`WhyHouseCover` component) — see component section below

### What may be covered (`WhatMayBeCovered` component) — see component section below

### Find your cover
- Intro line: "Know what you are looking for? Search every cover the House introduces."
- (CoverFinder component — see below)

### What is not covered / key limitations
- Eyebrow: "Read this before you rely on cover"
- Heading: "What is not covered, and what to check."
- Body: "Every policy has limits and exclusions. This is a general guide, never the full picture, so the policy wording is what to read before you commit. The specifics for each cover sit on its own page."
- Item 1 heading: "Wear, tear and gradual damage" / body: "Ordinary ageing, gradual deterioration and a lack of maintenance are not insured events. Cover is for sudden and unforeseen loss."
- Item 2 heading: "Anything already known" / body: "A loss, fault or condition that already exists when cover starts is not picked up by a new policy."
- Item 3 heading: "Under-insurance" / body: "Set the sum insured too low and a claim can be reduced in proportion. The rebuild figure is not the market value."
- Item 4 heading: "Limits and excesses" / body: "Section limits, single-item limits and the excess all shape what is paid. Valuables above the limit usually need listing separately."
- Item 5 heading: "Unoccupied and let homes" / body: "Standard cover can fall away once a home is left empty beyond a set period, or let out, unless the policy is written for it."
- Item 6 heading: "The House does not advise" / body: "The House introduces you to Provenance and does not advise on, arrange or decide your cover. The terms that bind are in the policy documents."
- Closing note: "The policy wording, key facts and exclusions are provided by Provenance before you commit to anything."

### Claims and help band (`ClaimsHelpBand` component) — see component section below

### The argument, once (burgundy anchor)
- Statistic: "70%"
- Statistic body: "of UK properties are insured below their rebuild cost, at an average of 66% of what they should be. Rebuild costs rose around 40% between 2020 and 2024, and index-linking runs behind."
- Pull quote: "A specialist who understands what your home is made of is the difference between a guess and a figure. That is what the House introduces you to."
- Footnote: "Figures indicative and pending Provenance compliance sign-off."

### Who arranges it
- Eyebrow: "Who arranges it"
- Body: "Cover is arranged and administered by Provenance, authorised and regulated by the FCA, part of the Benefact group, a charity-owned insurer whose profits go to charitable causes. The House introduces you; it does not advise on, arrange, administer or compare insurance."
- Link: "How this works, and how we are paid →" (→ /insurance/how-this-works)

### The published commitment
- Statement: "No fear. No urgency. No pressure. We will not chase you, and we will not manufacture a deadline."

### Closing CTA band (`InsuranceCtaBand`)
- Eyebrow: "Insure it properly"
- Heading: "Ready to arrange cover that understands your home?"
- Body: "Speak to a specialist about the whole estate, or arrange everyday cover online. The House introduces you; Provenance arranges and administers the cover."
- Primary CTA: "Request a quote" (→ /insurance/private-client)
- Secondary CTA: "Call 0800 047 8738"
- Tertiary link: "Everyday cover →"

### Renewal reminder
- Eyebrow: "Not ready today?"
- Heading: "Remind me before my renewal."
- Body: "Insurance is bought at one moment in the year, and most people miss it. Tell us your renewal month and we will send one email at the right time. Not a newsletter."
- (RenewalReminderForm — form fields not audited here)

### Page-level disclosure (`InsuranceDisclosure`) — see component section below

---

## Insurance — Private client & estate (`/insurance/private-client`, `src/app/insurance/private-client/page.tsx`)

### Metadata
- Title: "Private client & estate insurance, high-value homes"
- Description: "Advised, arranged insurance for high-value and period homes: one policy for the whole estate, a named specialist, and one renewal date. Introduced by the House, arranged by Provenance."

### Hero
- Eyebrow: "Insurance · Private client & estate"
- Heading (line-broken): "A life this considered / shouldn't be insured / in separate pieces."
- Body: "Advised means three things: a named specialist, a real conversation about the house, and a policy built around it rather than around a comparison engine. One estate, one renewal date."
- Sub-line (display): "Insurance built around you. Structured properly, managed personally."
- CTA: "Speak to a specialist" (→ #enquire)
- (ProvenanceLockup)

### Enquiry (top, conversion surface)
- Heading: "Speak to a specialist"
- Body: "Five details, and a specialist will call. Nothing about sums insured or your current insurer."
- (InsuranceEnquiryForm, enquiryType "private-client" — see component)

### Trust strip (`InsuranceTrustStrip`) — see component section below

### What can be placed
- Heading: "One lifestyle policy, one renewal date."
- Body: "Provenance's proposition treats the estate as one thing rather than a folder of separate policies. Each of these can sit within it:"
- (ProvenanceLockup + CoverCards component — see below)

### The specialist difference
- Eyebrow: "The difference the House brings"
- Heading: "A policy built on the house, not a form."
- Body: "A specialist can only insure a home as well as it is described. That is why the House introduces you to one who takes the time: the lime mortar, the rewire, the chimney lining, the things worth scheduling. Describing those properly is the difference between a home a specialist can price with confidence and one they have to guess at. And because a specialist relationship is ongoing, sums insured and reinstatement costs are reviewed every renewal, not only when a claim forces the question."

### Underinsurance evidence (burgundy anchor)
- Stat 1: "70%" / "of UK properties insured below rebuild cost"
- Stat 2: "66%" / "the average level they are insured at"
- Stat 3: "40%" / "rise in rebuild costs, 2020 to 2024"
- Body: "Listed buildings, high-value homes and extended properties are the categories worst affected, and index-linking alone rarely keeps pace. A specialist sets the figure against the real cost of rebuilding your home."
- Footnote: "Figures indicative and pending Provenance compliance sign-off."

### Process ("How it works, in four steps.")
- Heading: "How it works, in four steps."
- Step 01 heading: "Send your current documents" / body: "Your existing schedule is enough to begin. Nothing is asked of you that you do not already have."
- Step 02 heading: "A specialist reviews and benchmarks" / body: "Provenance reviews the cover, checks it against the rebuild reality of your home, and benchmarks the premium."
- Step 03 heading: "The market is searched" / body: "The right specialist markets are approached, rather than a single comparison table."
- Step 04 heading: "Claims handled on your behalf" / body: "If the day comes, Provenance manages the claim for you, from first notification to settlement."

### FAQ ("Before you get in touch.")
- Heading: "Before you get in touch."
- Q: "What does it cost to talk?" / A: "Nothing. The introduction and the review are free; you only ever pay a premium if you decide to place cover."
- Q: "Does it have to be everything at once?" / A: "No. You can start with the house and add the rest over time, or move a single risk that a standard insurer has struggled with."
- Q: "What happens to my existing policy?" / A: "It stays exactly as it is until you choose otherwise. Nothing is cancelled without your say-so."
- Q: "When should I start?" / A: "The unhurried window is roughly 15 to 25 days before renewal. Earlier than that and you are quoting too soon; later and it is a rush."

### Enquiry (foot, repeated)
- Eyebrow: "Speak to a specialist"
- Heading: "A conversation about the house."
- (InsuranceEnquiryForm, enquiryType "private-client")

---

## Insurance — Everyday hub (`/insurance/everyday`, `src/app/insurance/everyday/page.tsx`)

### Metadata
- Title: "Everyday cover"
- Description: "Home, car, pet and travel cover for the everyday things. Introduced by the House, arranged by Provenance."

### Hero
- Eyebrow: "Insurance · Everyday cover"
- Heading: "For everything that does not need a conversation."
- Body: "Straightforward cover for the everyday things. Tell us what you need and a specialist will arrange it. The House introduces you; Provenance arranges the cover."
- CTA: "Choose a cover" (→ #choose-a-cover)
- (ProvenanceLockup)

### Trust strip (`InsuranceTrustStrip`) — see component section

### Choose a cover (product grid)
- Heading: "Choose a cover."
- Product 1: "Home" / "Buildings and contents for a standard home." / "View cover →" (→ /insurance/everyday/home)
- Product 2: "Car, van and motorbike" / "Including temporary cover from one hour to 28 days." / "View cover →" (→ /insurance/everyday/motor)
- Product 3: "Pet and travel" / "Pet cover, and single-trip or annual travel." / "View cover →" (→ /insurance/everyday/pet-and-travel)
- Product 4: "Breakdown and bicycle" / "Roadside and recovery, and cover for road, mountain and electric bikes." / "View cover →" (→ /insurance/everyday/breakdown-and-bicycle)

### How it works
- Eyebrow: "How it works"
- Heading: "Simple to arrange, no comparison forms."
- Step 1 heading: "Choose a cover" / body: "Pick the everyday cover you need, from home to bicycle."
- Step 2 heading: "A short introduction" / body: "Leave a few details. Nothing about sums insured, and no comparison forms."
- Step 3 heading: "Provenance arranges it" / body: "A specialist calls, arranges the cover and handles it from there."

### Burgundy anchor
- Statement: "No fear, no urgency, no pressure. The House introduces you; Provenance arranges and administers the cover."

### High-value routing
- Body: "Insuring a listed, high-value or non-standard home? Everyday cover is not built for it. Speak to a specialist instead →" (→ /insurance/private-client)

### Closing CTA band (`InsuranceCtaBand`)
- Eyebrow: "Arrange everyday cover"
- Heading: "Choose a cover and a specialist will arrange it."
- Body: "Home, car, pet and travel, arranged online through the service Provenance operates. No comparison forms, and no pressure."
- Primary CTA: "Choose a cover" (→ #choose-a-cover)
- Secondary CTA: "Call 0800 047 8738"
- Tertiary link: "Speak to a specialist →"

### Disclosure (`InsuranceDisclosure`)

---

## Insurance — Everyday product pages (`/insurance/everyday/[slug]`, `src/app/insurance/everyday/[slug]/page.tsx`)

Renders the shared `SpecialistPage` template (see below). Per-slug copy (home, motor, pet-and-travel, breakdown-and-bicycle, boiler-cover, appliance-cover) is `[data]` from `src/lib/insurance/specialist-pages.ts` (`EVERYDAY_SPECIALIST_SLUGS`). Metadata: title/description `[data]` per slug, falling back to "Everyday cover" when absent.

Note: the older thin `EverydayPreframe` component (see component section) still exists in the codebase but everyday products now render on the full `SpecialistPage` template.

---

## Insurance — Specialist property/asset pages (`/insurance/[slug]`, `src/app/insurance/[slug]/page.tsx`)

Advert landing pages (indexable, not in nav). Only known specialist slugs resolve. Renders the shared `SpecialistPage` template. Per-slug copy is `[data]` from `src/lib/insurance/specialist-pages.ts` (`SPECIALIST_SLUGS`) — hero eyebrow/heading/lede, whyDifferent, detail points, limitations (per-slug or default), placed band, evidence stats, etc.

Example (`listed-buildings`, `[data]`):
- Meta title: "Listed building insurance"
- Meta description: "Cover for Grade II, II* and I listed homes, built around like-for-like reinstatement and a rebuild cost that bears no relation to market value. Arranged by Provenance; introduced by the House."
- Hero eyebrow: "Specialist property"
- Hero heading: "A listed home is a different risk. It should be insured like one."
- Hero lede: "Listed buildings are repaired with original materials and methods, under consent constraints, by specialist trades. A standard policy priced off a table rarely reflects that. There are 379,580 listed buildings in England, and most are not insured for what it would truly cost to put them back."

Template's static/default strings are documented under `SpecialistPage` below.

---

## Insurance — Claims and help (`/insurance/claims-and-help`, `src/app/insurance/claims-and-help/page.tsx`)

### Metadata
- Title: "Claims and help"
- Description: "Already insured through the House? How to make a claim, who to contact, and what to have ready. Claims are handled by Provenance; the House will make sure you reach the right person."

### Hero
- Eyebrow: "The House · Insurance"
- Heading: "Claims and help."
- Body: "If something has happened, or you just need to reach the right person, start here. The House will point you to it, and Provenance handles the claim."
- CTA: "Call 0800 047 8738"
- Link: "Email the House →" (mailto sales@willowalexander.co.uk)

### Detail (`ClaimsHelpDetail` component) — see component section below

### Foot note
- Body: "Not yet insured through the House, and weighing it up? Start with the insurance hub or speak to a specialist."
- Note: "This page describes how to reach us and how claims are handled, and is pending Provenance compliance sign-off."

---

## Insurance — How this works (`/insurance/how-this-works`, `src/app/insurance/how-this-works/page.tsx`)

### Metadata
- Title: "How this works, and how we are paid"
- Description: "Plainly: the House introduces you to Provenance, who arranges the cover. Who Provenance and Benefact are, how the House is paid, and how to complain."

### Hero
- Eyebrow: "The House · Insurance"
- Heading: "How this works, and how we are paid."
- Body: "Almost nobody in this market explains this openly. We would rather you did not have to ask."

### Body blocks
- Block "What the House does": "The House **introduces** you to a specialist. That is all it does. It does not advise on, arrange, administer, compare or transact insurance. Those are regulated activities, and they belong to Provenance."
- Block "Who arranges the cover": "Provenance Insurance Brokers Ltd is authorised and regulated by the Financial Conduct Authority, firm reference number 804047, and is part of Lloyd & Whyte. Provenance advises, arranges, administers and, when the time comes, handles claims on your behalf." (+ ProvenanceLockup)
- Block "Why Benefact matters": "Provenance places business with markets in the Benefact group, a charity-owned insurer. Benefact gave £28.3m to charitable causes in 2025 and more than £275m since 2014, is the third-largest corporate donor in the UK, and is AM Best A rated. Benefact gives all its available profits to good causes, so every policy placed supports UK charities, at no extra cost to you. This is verifiable, and it is unusual, and it is the part we are happiest to put in writing."
- Block "How the House is paid": "As the introducer, the House receives a share of Provenance's commission when a policy starts and at renewal. We would rather tell you that plainly than leave it unsaid."
- Block "What the House contributes in return": "The House brings the part a comparison form cannot: a considered introduction to a genuine specialist, the ongoing care of the home through its Home Protection service, and the renewal timing kept in view. That is the work, and it is what earns the share."
- Block "If something goes wrong": "Complaints about the arranged cover are handled by Provenance under its FCA permissions, and eligible complainants can refer a matter to the Financial Ombudsman Service. The full regulatory notice and complaints route are set out on the regulatory notice page." (link → /insurance/terms)
- Foot note: "This page describes the regulatory relationship and is pending Provenance compliance sign-off."

---

## Insurance — Regulatory notice / terms (`/insurance/terms`, `src/app/insurance/terms/page.tsx`)

### Metadata
- Title: "Insurance, regulatory notice and complaints"
- Description: "The regulatory notice for insurance introduced by House of Willow Alexander and arranged by Provenance, with the complaints route and FOS eligibility."

### Page
- Eyebrow: "Insurance"
- Heading: "Regulatory notice and complaints."
- Pending banner label: "Pending Provenance compliance"
- Pending banner body: "The wording below is indicative. The published version is issued by Provenance compliance verbatim before launch."
- Section "The introducer arrangement": "House of Willow Alexander acts solely as an introducer. It does not advise on, arrange, administer, compare or transact insurance. Insurance is arranged and administered by Provenance Insurance Brokers Ltd."
- Section "Provenance's FCA registration": "Provenance Insurance Brokers Ltd is authorised and regulated by the Financial Conduct Authority, firm reference number 804047. You can verify this on the FCA Register at register.fca.org.uk."
- Section "Complaints and the Financial Ombudsman Service": "Complaints about the arranged cover are handled by Provenance under its FCA permissions. Where a matter cannot be resolved, eligible complainants may refer it to the Financial Ombudsman Service. The full complaints procedure is issued by Provenance compliance."
- Section "How your information is handled": "Under the introducer arrangement, the House passes only the information you provide or ask it to pass, and only when you ask it to. What is passed, when, and on what basis is set out here in the wording Provenance compliance issues, and in the House privacy notice."

---

## Insurance — Home Protection (`/insurance/home-protection`, `src/app/insurance/home-protection/page.tsx`)

CMS-driven via `getPageSections("protect-home-protection")`; every string below is a hardcoded fallback overridable by Sanity `[dynamic]`.

### Metadata
- Title: "Home Protection. Know the home before the home needs you."
- Description: "A one-day in-person review by House-vetted specialists. Condition review, evidence pack, and insurance-ready documentation for your home."

### Hero `[dynamic w/ fallback]`
- Eyebrow: "Protect · Late 2026"
- Heading: "Know the home" + em "before the home needs you."
- Body: "A one-day in-person review by House-vetted specialists. A condition review, an evidence pack, and insurance-ready documentation, yours to keep and ready for whatever comes next."
- Primary CTA: "Register interest" (→ #register)
- Secondary CTA: "See Protect overview" (→ /insurance)
- Footnote/caption: "Open to all House customers."

### Stats strip `[dynamic w/ fallback]`
- Headline: "One day on-site. One clear pack. Years of clarity."
- Subheadline: "The first practical act of Home Protection."
- Stat 1: "1" / "Day on-site"
- Stat 2: "1 wk" / "Report turnaround"
- Stat 3: "17" / "House standards"
- Stat 4: "0" / "Disruption"

### What the review covers `[dynamic w/ fallback]`
- Eyebrow: "What the review covers"
- Heading: "Everything the home quietly needs," + em "surfaced in one day."
- Card "Condition review": "A thorough walk-through of the building: fabric, systems, access, security, damp, drainage. Carried out by House-vetted specialists who understand period homes. This is a House condition review and evidence pack, not a formal RICS survey."
- Card "Evidence pack": "Photographs, detailed notes, and a prioritised works list. Everything documented, nothing left to memory. Yours to keep for ongoing reference."
- Card "Insurance documentation": "Insurance-ready reports that sit alongside your cover. When the underwriter asks questions, the answers are already prepared and properly evidenced."

### How it works `[dynamic w/ fallback]`
- Eyebrow: "How it works"
- Heading: "Four steps to a" + em "calmer home."
- Step I. "Book": "Register interest and we'll arrange a date. The review fits into a single day: no disruption, no scaffolding."
- Step II. "Assess": "Our House-vetted specialist visits the property and conducts a full condition review. You don't need to prepare anything."
- Step III. "Report": "Within a week, your evidence pack and prioritised works list arrive as a clear pack you keep. Clear, actionable, properly documented."
- Step IV. "Act": "Where the review flags work, we introduce you to vetted specialists. Where it flags risk, it feeds directly into your insurance conversation."

### Register interest (waitlist) `[dynamic w/ fallback]`
- Eyebrow: "Register interest"
- Heading: "Opening in" + em "late 2026."
- Body: "Leave your email and we'll write when Home Protection opens. Open to all House customers."
- WaitlistMini placeholder: "Your email" / button: "Register interest" / success: "Thank you. We'll write when Home Protection opens."

### Cross-sell `[dynamic w/ fallback]`
- Card 1 eyebrow: "Also from Protect" / title: "Home Insurance" / body: "Cover that understands period homes, valuable contents, and the things a standard policy quietly excludes. Introduced by the House, underwritten by FCA-regulated specialists." / link: "See Home Insurance →" (→ /insurance)
- Card 2 eyebrow: "One pack, joined up" / title: "Joined up, not repeated" / body: "Your Home Protection evidence feeds directly into the insurance introduction. One conversation, one shared pack, no starting from scratch." / link: "Register interest →" (→ #register)

### Closing tagline `[dynamic w/ fallback]`
- Statement: "*Prevention is quieter than repair.* That's the point."

---

## Insurance — Shared components

### `WhyHouseCover` (`src/components/insurance/WhyHouseCover.tsx`)
- Eyebrow: "Why House cover"
- Heading: "What an introduction from the House is worth."
- Pillar 1 heading: "A considered introduction" / body: "Not a comparison form. The House introduces you to a specialist who takes the time to understand the home before anything is arranged."
- Pillar 2 heading: "One named specialist" / body: "One person who knows the file, from the first conversation to renewal. Not a call centre, and not a new name each time."
- Pillar 3 heading: "Claims handled for you" / body: "Provenance handles the claim on your behalf, from first notification through to settlement, so you are not left to argue it alone."
- Pillar 4 heading: "Profits to charity" / body: "Cover is placed with markets in the Benefact group, a charity-owned insurer. Every policy supports UK charities, at no extra cost to you."
- CTA: "Speak to a specialist →" (→ /insurance/private-client)
- Link: "Or arrange everyday cover →" (→ /insurance/everyday)

### `WhatMayBeCovered` (`src/components/insurance/WhatMayBeCovered.tsx`)
- Eyebrow: "What may be covered"
- Heading: "The kinds of thing a good policy is there for."
- Intro: "These are examples, to show the shape of cover, not a list of what your policy includes. What is actually covered, and to what limit, is set out in the policy wording. Read it before you rely on anything here."
- Example 1 heading: "A burst pipe" / body: "Sudden escape of water that soaks floors and ceilings, and putting the damage right."
- Example 2 heading: "Storm and flood" / body: "Damage to the building and its contents from named storms and rising water."
- Example 3 heading: "Fire and smoke" / body: "From the fabric of the house to the things inside it, and somewhere to stay while it is repaired."
- Example 4 heading: "Theft and attempted break-in" / body: "Loss of contents, and the cost of making the home secure again afterwards."
- Example 5 heading: "Accidental damage" / body: "The dropped heirloom or the foot through the ceiling, where the cover is written to include it."
- Example 6 heading: "Valuables and belongings away from home" / body: "Jewellery, art and personal items, at home and, where added, out in the world."
- CTA: "See what each cover includes →" (→ /insurance/everyday)
- Link: "Where to find the full policy wording →" (→ /insurance/how-this-works)
- Note: "The full policy wording, key facts and exclusions are provided by Provenance before you commit to anything."

### `ClaimsHelpBand` (`src/components/insurance/ClaimsHelp.tsx`)
- Eyebrow: "Already with us"
- Heading: "Need to make a claim, or a hand with your cover?"
- Body: "If something has happened, or you simply need to reach the right person, the House will point you to it. Claims are handled by Provenance, and we will make sure you get there quickly."
- CTA: "Make a claim or get help →" (→ /insurance/claims-and-help)
- Contact label: "Talk to the House"
- Phone: "0800 047 8738" / Email: "sales@willowalexander.co.uk"

### `ClaimsHelpDetail` (`src/components/insurance/ClaimsHelp.tsx`) — used on /claims-and-help
- Block "If you need to make a claim": "Claims on your policy are handled by Provenance Insurance Brokers Ltd under its FCA permissions, from the first notification through to settlement. The sooner a claim is reported the better, so please get in touch as soon as it is safe to." / "If you are not sure where to start, talk to the House on the numbers below and we will make sure you reach the right person at Provenance quickly. We do not assess or settle claims ourselves."
- Block "Who to contact": "Talk to the House and we will connect you to your specialist and to Provenance." / Phone: "0800 047 8738" / Email: "sales@willowalexander.co.uk" / Note: "In an emergency that puts people or the property at risk, contact the emergency services first, then make your home safe before you call."
- Block "What to have ready": "Having a few things to hand makes the first call quicker."
  - "Your policy number, and the name the cover is held in."
  - "When it happened, and where, with the address if it concerns the home."
  - "A plain account of what happened and what has been affected."
  - "Photographs of any damage, and receipts or valuations if you have them."
  - "A crime reference number, if the police have been involved."
- Block "How the House and Provenance fit": "The House introduces you to a specialist and stays alongside you. Provenance advises on, arranges and administers the cover, and handles claims on your behalf. The House does not advise on, arrange, administer, compare or transact insurance, and it does not settle claims." / "Complaints about your cover or a claim are handled by Provenance under its FCA permissions, and eligible complainants can refer a matter to the Financial Ombudsman Service. The full route is set out on the regulatory notice page." (link → /insurance/terms)

### `CoverFinder` (`src/components/insurance/CoverFinder.tsx`)
- Field label: "Find your cover"
- Search placeholder: "Try 'van', 'listed', 'necklace', 'toyota', 'plumber'…"
- No-match message: "Nothing matches "{query}". Speak to a specialist and we will point you the right way." (link → /insurance/private-client)
- Card CTA: "View cover →"
- Category groups (order): "Everyday cover", "Home cover", "Advised", "Specialist property", "Assets & advice"
- Cover cards (name/blurb/group) are `[data]` from `src/lib/insurance/cover-index.ts` (`ALL_COVERS`).

### `CoverCards` (`src/components/insurance/CoverCards.tsx`) — the five "what can be arranged" cards
- Card 1 heading: "The house" / body: "Listed and period homes, thatch, non-standard construction, second and unoccupied homes." / CTA: "Listed & period homes →" (→ /insurance/listed-buildings)
- Card 2 heading: "The things in it" / body: "Fine art, jewellery, watches, wine and collections, scheduled and valued properly." / CTA: "Fine art, jewellery & collections →" (→ /insurance/fine-art-and-collections)
- Card 3 heading: "The cars" / body: "Classic, prestige and collection vehicles, on one renewal date with the home." / CTA: "Classic & prestige motor →" (→ /insurance/classic-and-prestige-motor)
- Card 4 heading: "The works" / body: "One policy over the existing structure and the contract works, for the life of a project." / CTA: "Renovation & works →" (→ /insurance/renovation-and-extension)
- Card 5 heading: "The boat, yacht or aircraft" / body: "Marine and aviation cover, from a family boat to complex Lloyd's placements, arranged alongside the home." / CTA: "Boat, yacht & aviation →" (→ /insurance/boat-yacht-aviation)

### `InsuranceTrustStrip` (`src/components/insurance/InsuranceTrustStrip.tsx`) — deep-green band
- Pillar 1 heading: "FCA-regulated" / body: "Arranged by Provenance Insurance (FRN 804047)"
- Pillar 2 heading: "Claims handled for you" / body: "From first notification to settlement"
- Pillar 3 heading: "A named specialist" / body: "One person who knows the file, not a call centre"
- Pillar 4 heading: "Profits to charity" / body: "Provenance sits within the Lloyd & Whyte group"

### `InsuranceCtaBand` (`src/components/insurance/InsuranceCtaBand.tsx`) — reusable band
- Copy is passed in per use (see hub / everyday above). Static default within component: secondary CTA renders "Call 0800 047 8738".

### `InsuranceDisclosure` (`src/components/insurance/InsuranceDisclosure.tsx`)
- Disclosure text (from `DISCLOSURE_TEXT`, `src/lib/insurance/config.ts`): "Insurance from the House is arranged and administered by Provenance Insurance Brokers Ltd, authorised and regulated by the Financial Conduct Authority (FRN 804047). House of Willow Alexander acts solely as an introducer."
- Trailing link: "How this works, and how we are paid" (→ /insurance/how-this-works)

### `ProvenanceLockup` (`src/components/insurance/ProvenanceLockup.tsx`)
- Default label: "Arranged by" (+ Provenance Insurance Brokers logo, alt "Provenance Insurance Brokers")

### `SpecialistPage` template (`src/components/insurance/SpecialistPage.tsx`)
Shared template for specialist + everyday product pages. Hero/whyDifferent/detail/placed/evidence/limitations copy is `[data]` per slug. Static / default template strings:
- Hero eyebrow prefix: "Insurance · {data.hero.eyebrow}"
- Hero CTA (default): "Speak to a specialist" (data.heroCta may override; business uses "Request a review")
- Hero secondary CTA: "Call 0800 047 8738"
- Evidence band side heading: "Find out where your own cover stands." / CTA "Speak to a specialist" / footnote "Figures are indicative and pending Provenance compliance sign-off."
- Limitations block eyebrow: "Read this before you rely on cover" / default heading (when data omits): "What is not covered, and what to check"
- "The difference" section eyebrow: "The difference" / heading: "The questions a comparison form never asks."
- Default difference intro (`DIFFERENCE_INTRO_DEFAULT`): "Most insurance is priced by people who never ask a single thing about the house. The House introduces you to a specialist who starts from what the home actually is, so the cover is built on the real risk rather than a guess."
- Default readiness cards (`READINESS_DEFAULT`, property pages): "The roof" / "What it is, and when it was last treated." · "What it's built of" / "The fabric behind the walls, not a guess from a table." · "What's been added" / "Every extension, rewire and works project." · "The cost to rebuild" / "The reinstatement figure, not the market value."
- Pull quote: "A specialist asks. A comparison engine assumes."
- "What Provenance can place" band regulatory line: "Provenance is authorised and regulated by the FCA (FRN 804047), a member of BIBA, and part of the Lloyd & Whyte group, owned by Benefact, whose profits go to charitable causes."
- Enquiry section default eyebrow: "Speak to a specialist" / default heading: "A short conversation, not a comparison engine." / default body: "Leave your details and a specialist will call. We ask only what we need to make the introduction, nothing about sums insured, contents or your current insurer. That conversation belongs on your first call with Provenance."

### `SpecialistPage` default limitations (`DEFAULT_LIMITATIONS`, `src/lib/insurance/specialist-pages.ts`)
- Heading: "What is not covered, and what to check"
- Intro: "Every policy has limits and exclusions, and this is a general guide rather than the policy itself. The cover, its limits and its exclusions are set out in the policy wording, which is what to read before you rely on any of it."
- Point "Wear, tear and gradual damage": "Ordinary ageing, gradual deterioration and a lack of maintenance are not insured events. Cover is for sudden and unforeseen loss, not upkeep."
- Point "Anything already known": "A loss, fault or condition that already exists, or that you are aware of when cover starts, is not picked up by a new policy."
- Point "Under-insurance": "If the sum insured is set too low, a claim can be reduced in proportion. Setting the rebuild figure and contents value correctly is what keeps a policy honest."
- Point "Limits and excesses": "Section limits, single-item limits and the excess all shape what is actually paid. High-value items usually need listing separately to be covered in full."
- Point "The House does not advise": "The House introduces you to Provenance and does not advise on, arrange or decide your cover. The terms that bind are the ones in the policy documents, agreed with Provenance."
- Note: "The policy wording, key facts and exclusions are provided by Provenance before you commit to anything."

### `EverydayPreframe` (`src/components/insurance/EverydayPreframe.tsx`) — legacy thin template (data `[data]` from everyday-pages.ts)
- Eyebrow: "Insurance · Everyday cover"
- "At a glance" heading over covered list.
- Hand-off band heading: "How it works" — Step 1 "Choose your cover" / "Pick the option that fits from the choices above." · Step 2 "Answer a few questions" / "On the service Provenance operates, not a form on the House." · Step 3 "Get your quote" / "In a few minutes, and buy there and then if it suits."
- Hand-off CTA: "Continue to the quote service ↗" / caption: "You leave the House here and enter Provenance's regulated service."
- Hand-off statement: "This is a self-serve service operated by Provenance, authorised and regulated by the FCA. The House is an introducer only: it does not advise on, arrange, administer or compare insurance. Clicking through takes you into Provenance's regulated service."
- High-value routing (home): "Insuring a listed, high-value or non-standard home? Everyday cover is not built for it. Speak to a specialist instead →"

### `InsuranceEnquiryForm` (`src/components/insurance/InsuranceEnquiryForm.tsx`)
- Field labels: "Name", "Company" (B2B only), "Email", "Phone", "Postcode", "The cover you need"
- Cover select placeholder: "Choose cover…"
- Cover option groups/labels `[data from config.ts INSURANCE_COVER_GROUPS]`:
  - Group "Home & pet": Home insurance · Private client & estate · Car, van & motorbike · Pet & travel · Breakdown & bicycle · Boiler & heating cover · Appliance cover
  - Group "Specialist property": Listed buildings · Thatched properties · Non-standard construction · Second & holiday homes · Unoccupied & probate · Renovation & works
  - Group "Assets": Fine art, jewellery & collections · Classic & prestige motor · Boat, yacht & aviation
  - Group "Business": Business insurance · Trades & contractors · Professional indemnity
- Project start month label: "Project start month (optional)" / default option "Not sure yet"
- Additional info label: "Additional information (optional)" / textarea placeholder: "Need cover for more than one thing, or anything else we should know? Add it here."
- Marketing opt-in: "Keep me posted with occasional notes from the House. You can stop any time."
- Submit label (default): "Speak to a specialist"
- (Renders `InsuranceDisclosure` above the submit button)

---

## Shop — Marketplace landing (`/shop`, `src/app/shop/page.tsx`)

Product names, prices and images throughout are `[dynamic]` from Shopify/Sanity catalogue. Section framing copy is hardcoded below.

### Metadata
- Title (absolute): "The House Marketplace | Shop home, garden and household"
- Description: "Objects with a place in the House. Shop by room, kitchen, table, garden and more, or browse House Approved goods, best sellers and new arrivals."

### Seasonal hero (season word is computed at runtime)
- Eyebrow: "The House · The {season} edit"
- Heading: "The {Season} *collection.*"
- Body: "The pieces we are reaching for this {season}. An edited cabinet, not a catalogue, gathered for how it is made, how long it lasts, and whether it can be mended rather than replaced."
- Primary CTA: "Explore the edit" (→ /shop/collections/house-approved)
- Secondary link: "Shop all products →" (→ /shop/all)

### Shop by room
- Eyebrow: "Room by room"
- Heading: "A place for everything."
- Room tiles (name / CTA "Shop the room →"): Kitchen · Dining & Table · Living Room · Bedroom · Bathroom · Hallway & Entrance · Garden & Outdoor · Utility & Laundry
- Placeholder-tile fallback labels: "Placeholder image" / "Shop the room →"

### Rail — The House Edit
- Eyebrow: "Chosen by the House"
- Title: "The House Edit."
- Intro: "A curator-led shelf, kept small on purpose. Each piece here carries the House Approved seal, chosen for craft, provenance and a long life."
- View-all: "View all →" (→ /shop/collections/house-approved)
- (Cards `[dynamic]`; card badge "House Approved" where applicable)

### Rail — Useful staples
- Eyebrow: "The everyday things"
- Title: "Useful staples."
- Intro: "The quiet, well-made basics a household leans on. Bought once, kept for years."
- View-all → /shop/collections/household-essentials

### Rail — Best sellers
- Title: "Best sellers." / View-all → /shop/all

### Featured product ("The piece this week")
- Eyebrow: "The piece this week"
- Title / price / excerpt `[dynamic]`
- Excerpt trailing link: "Read more →"
- Add-to-cart button (AddToCartButton)

### Rail — Garden and outdoor living
- Eyebrow: "Beyond the back door"
- Title: "Garden and outdoor living."
- Intro: "Tools, pots and the pieces that make the outdoor rooms of the House worth spending time in."
- View-all → /shop/collections/garden-outdoor

### Two collections block
- Block 1: "The Garden" / "Tools, pots and the outdoor life" / "Explore the collection →" (→ /shop/collections/garden-outdoor)
- Block 2: "The Table" / "Dining, glass and good linen" / "Explore the collection →" (→ /shop/collections/dining)

### Rail — Gifts and experiences
- Eyebrow: "For someone you like"
- Title: "Gifts and experiences."
- Intro: "Considered things to give, and small pleasures to keep. Wrapped with care, chosen to be remembered."
- View-all → /shop/collections/gifts-stationery

### Product slider
- Title: "More worth keeping." (slides `[dynamic]`)

### Rail — New in
- Title: "New in." / View-all → /shop/all

### Related Hearth (`RelatedHearth`) — cross-link, articles `[dynamic]`
- Eyebrow: "From The Hearth"
- Heading: "Read before you choose."
- Foot link: "Visit The Hearth →"

### House standard strip (`HouseStandardStrip`)
- Points: "Vetted against real family use" · "Care notes for use and repair" · "Chosen to last, made to mend"

---

## Shop — Product listing / browser (`/shop/all` etc., `src/app/shop/ShopBrowser.tsx`)

Client-side filter/sort UI. Products `[dynamic]`.

### Sort labels (`SORT_OPTIONS`)
- "Featured" · "New" · "Price: low → high" · "Price: high → low"

### Filter rail labels
- Section heading: "Search" / input placeholder: "Search products"
- Section heading: "Categories" (category pages only; sub-nav links `[dynamic]`)
- Section heading: "Collections" — "All" option + collection names `[dynamic]` with counts
- Section heading: "Brand" — "All brands" + brand names `[dynamic]` with counts
- Section heading: "Price" — options `[data PRICE_RANGES]`: "Any", "Under £25", "£25 to £50", "£50 to £100", "£100 to £250", "£250+"
- Section heading: "Filters" — toggle "In stock only", toggle "House Approved only"
- Clear control (rail): "Clear all filters ×"
- Mobile drawer header: "Filters" / apply button: "View {n} piece(s)"

### Utility bar
- Count label: "{n} piece" / "{n} pieces"
- Clear control: "Clear ×"
- Mobile filters button: "Filters" (+ active count badge)

### Product card
- Badge: "House Approved" (where applicable)
- Badge: "Sale" (where on sale)
- Maker/brand line `[dynamic]` (falls back to collection)
- Stock line: "In stock · ready to send" / "Available to order"

### Empty state
- "No products match your filters."
- Reset control: "Clear filters"

### Pagination
- "← Prev" / "Next →"

---

## Shop — Product detail page (`/shop/[handle]`, `src/app/shop/[handle]/page.tsx`)

Product title, price, description, images, maker, collection all `[dynamic]`.

### Breadcrumb
- "Shop" / {collection} `[dynamic]` / {title} `[dynamic]`

### Buy column
- Eyebrow: {collection} `[dynamic]` + seal "House Approved" (where applicable)
- Maker line: "By {maker}" `[dynamic]`
- Price / compareAtPrice `[dynamic]`
- Stock line: "In stock · ready to send" / "Currently unavailable" / "Available to order"
- Buy CTA (when variants present): ProductBuy component; fallback stand-in label: "Available at launch"
- Home Record button (HomeRecordButton) + line: "Save it to your Home Record to keep its details, care notes and warranty in one place."

### Description + spec (`ProductCopy` component, `ProductCopy.tsx`)
- Lede `[dynamic]` (shown only when distinct editorial)
- Body `[dynamic]` with "Read more" / "Read less" toggle
- Accordion "Product details" (materials + dimensions `[dynamic]`)
- Accordion "Care" (careNotes `[dynamic]`)
- Accordion "Shipping & returns": "{delivery or 'Free UK delivery on every order.'} Returns accepted within 30 days in original condition."

### Sustainability & provenance
- Heading: "Sustainability & provenance"
- Item "Maker.": "Made by {maker}, a named supplier we can trace and stand behind." (where maker present)
- Item "House Approved.": "Judged against our standard for craft, provenance and honest materials before it earned a place here." (where applicable)
- Item "Made to last.": "Chosen so it can be mended and kept rather than replaced, which is the most sustainable choice a household can make."
- Item "Care.": {careNotes} `[dynamic]` (where present)

### Kept in your Home Record
- Heading: "Kept in your Home Record"
- "Supplier": {brand} `[dynamic]` or "House Approved maker"
- "Care": {careNotes} `[dynamic]` or "Surface-appropriate care notes, saved with the item."
- "Warranty": "Receipt and any warranty stored at purchase."
- "Replacement": "HoWA reminds you when it is due for renewal."

### Secondary services CTA (wording adapts by product type)
- Serviceable goods: "Need this fitted, hung, cleaned or maintained? Book a service and it is kept in your Home Record."
- Other goods: "Planning work on your home? Book a service and it is kept in your Home Record."

### Gallery plaque (`ProductGallery` component) — where `whyChosen` present `[dynamic]`
- Seal top text: "The House"
- Plaque label: "Why the House chose it"
- Plaque text: {whyChosen} `[dynamic]`

### Related
- Eyebrow: "You might also consider"
- Heading: "From the same *world.*"
- Foot link: "All products →"

### Related editorial (Hearth cross-link, `[dynamic]`)
- Eyebrow: "From The Hearth"
- Heading: "Read around it."

### Recently viewed (`RecentlyViewed`) — client history `[dynamic]`

---

## Offers — Page (`/offers`, `src/app/offers/page.tsx`)

### Metadata
- Title: "House Offers"
- Description: "Seasonal service packages, multi-service care, member benefits and selected cover offers from the House. Every offer shown in full, with nothing hidden."

### Hero
- Eyebrow: "House Offers"
- Heading: "Good value, honestly put."
- Body: "Seasonal packages, multi-service care, member benefits and selected cover offers, gathered in one place. Each one shows exactly what is included, who it is for, the price or saving basis, when it runs and what it does not cover. No countdowns, and no pressure."

### Offer grid — OfferCards (see per-offer data below)

### How offers work / honest note
- Eyebrow: "How House Offers work"
- Heading: "Considered, not discounted."
- Body: "An offer earns its place here when it genuinely helps a household: a season handled in one visit, several services kept in step, or a benefit that comes with knowing the House. Every price basis is real, every date is stated, and every exclusion is on the card rather than in the small print. Cover offers are introduced by Provenance; the House does not advise on or sell insurance."
- CTA: "Explore services" (→ /services)
- CTA: "Insurance & cover" (→ /insurance)

### `OfferCard` component (`src/components/offers/OfferCard.tsx`) — static labels
- Included section label: "What's included"
- Meta labels: "Price" / "Runs" ("{starts} to {ends}") / "Who" / "Excludes"
- Terms link label: "Offer terms"
- (category eyebrow, title, summary, included, CTA are per-offer data)

---

## Offers — Offer data (`src/app/offers/offers-data.ts`) `[data]` (spec: would be CMS-driven at production)

### Offer 1 — The autumn garden and gutter tidy
- Category: "Seasonal package"
- Title: "The autumn garden and gutter tidy"
- Summary: "One visit to put the garden to bed and clear the gutters before the leaves fall, from Willow Alexander Gardeners and Window Cleaners together."
- Included: "A full autumn tidy: borders cut back, beds cleared, the lawn given its last cut" · "Gutters, downpipes and gullies cleared on the same visit" · "Green waste removed and composted, nothing left behind" · "A short note on what the garden will need come spring"
- Eligibility (Who): "New and existing customers at a serviced postcode. One booking per household."
- Price basis: "From £180 for a standard garden and a two-storey house, booked as one visit and confirmed after a short survey. The saving is against booking the garden tidy and the gutter clear separately."
- Runs: "1 September 2026" to "30 November 2026"
- Exclusions: "Excludes tree surgery, moss removal and gardens over half an acre, which are quoted on their own. Safe ladder access and parking must be available on the day."
- Terms: /legal/service-terms
- CTA: "Book the autumn tidy" (→ /services/gardening)

### Offer 2 — The whole-home care plan
- Category: "Multi-service care"
- Title: "The whole-home care plan"
- Summary: "Regular cleaning, gardening and window cleaning arranged as one plan, with a single coordinator and one monthly statement."
- Included: "A recurring visit schedule across three or more House services" · "One coordinator who keeps the visits in step" · "A single monthly statement rather than separate invoices" · "Priority rebooking when plans change"
- Eligibility (Who): "Households booking three or more regular services in one plan, at a serviced postcode."
- Price basis: "Priced per plan after a home visit. The value is in coordinating the visits and holding one rate for the year, rather than a headline discount."
- Runs: "Open now" to "Reviewed each season"
- Exclusions: "One-off and survey-based work is quoted separately and sits outside the plan. A minimum three-month term applies; you can pause or change services with notice."
- Terms: /legal/service-terms
- CTA: "Arrange a plan" (→ /services)

### Offer 3 — My House member benefits
- Category: "Member benefit"
- Title: "My House member benefits"
- Summary: "The standing benefits that come with a My House account, kept in one place and free to join."
- Included: "Priority booking windows through the busy seasons" · "A held rate card for twelve months from your first booking" · "Seasonal maintenance reminders set around your home" · "Invitations to House events and previews"
- Eligibility (Who): "Anyone with a My House account. Free to join, and free to leave."
- Price basis: "No charge to join. The benefits are included with a My House account; individual services are still priced and booked as usual."
- Runs: "Open now" to "Ongoing"
- Exclusions: "Priority windows are subject to availability. Event invitations are limited by venue capacity. Held rates follow the published rate card and any change is notified in advance."
- Terms: /legal/terms
- CTA: "See My House" (→ /my-house)

### Offer 4 — The House gift edit
- Category: "Store edit"
- Title: "The House gift edit"
- Summary: "A small, seasonal edit of homeware and gifts chosen by the House, wrapped and finished so it arrives ready to give."
- Included: "A curated selection of homeware and gifts, refreshed each season" · "Wrapping in House papers with a hand-written card, at no extra charge" · "A short note on the maker or origin of each piece" · "Complimentary standard UK delivery on gift-edit orders over £75"
- Eligibility (Who): "Anyone shopping the House, with delivery to a United Kingdom address. Gift wrapping is chosen at checkout."
- Price basis: "Each piece is sold at its usual shelf price; there is no mark-up for the edit. The wrapping, card and note are included rather than added on."
- Runs: "Open now" to "Refreshed each season"
- Exclusions: "The edit changes with the season and pieces sell as stock allows; nothing is held or back-ordered. Made-to-order and personalised items sit outside complimentary delivery and are quoted at checkout."
- Terms: /legal/terms
- CTA: "Shop the gift edit" (→ /shop)

### Offer 5 — A free home and contents cover review
- Category: "Cover offer"
- Title: "A free home and contents cover review"
- Summary: "A calm second look at the cover you already hold, with an introduction to Provenance where it helps. No obligation, and nothing to buy on the day."
- Included: "A no-obligation review of your existing home and contents cover" · "A check for the common under-insurance gaps, rebuild figure included" · "An introduction to Provenance, who arrange and administer any cover" · "A written summary of what was discussed, yours to keep"
- Eligibility (Who): "Homeowners in the United Kingdom. The review is free and carries no obligation to switch."
- Price basis: "The review is free. Any cover is arranged and administered by Provenance; the House does not advise on, sell or underwrite the policy."
- Runs: "Open now" to "Ongoing"
- Exclusions: "Not advice. The House introduces you to Provenance; the terms that bind are set out in the policy documents, and cover is subject to Provenance's acceptance."
- Terms: /legal/insurance-disclosures
- CTA: "Request a review" (→ /insurance)

### Offer 6 — An interiors design consultation
- Category: "Experience"
- Title: "An interiors design consultation"
- Summary: "Ninety minutes at home with the House interiors team to shape a direction for a room or a whole house."
- Included: "A ninety-minute design consultation in your home" · "A written summary of ideas, priorities and where to begin" · "A scheme direction and a considered next step to build from"
- Eligibility (Who): "Homes within the interiors service area. Consultation-led, arranged by enquiry rather than instant booking."
- Price basis: "£150 for the consultation, redeemable in full against a full project booked within three months."
- Runs: "Open now" to "Ongoing"
- Exclusions: "The redeemable amount applies to projects over a minimum value, confirmed at the consultation. Travel beyond the standard service area may be charged and is agreed beforehand."
- Terms: /legal/service-terms
- CTA: "Book a consultation" (→ /services/interiors)


---

# System & Design pages — copy inventory

Verbatim current user-facing copy. `[dynamic]` marks CMS-driven content (with the hardcoded fallback captured). Cinema and Hearth excluded. Services category/detail pages and ServiceDetail excluded — only the two named design pages are here.

---

## How it works (`/how-it-works`)
File: `src/app/how-it-works/page.tsx`

### Metadata
- Title: "How it works · Powered by HoWA"
- Description: "HoWA is the booking and home-intelligence system the House uses to keep services, records, reminders, cover and useful recommendations connected around your home."

### Hero
- Eyebrow: "Powered by HoWA"
- Heading: "The House is powered by HoWA."
- Body: "HoWA is the booking and home-intelligence system the House uses to keep services, records, reminders, cover and useful recommendations connected around your home."
- CTA (primary): "Go to My House" → `/my-house`
- CTA (secondary): "Book a service" → `#open-booking-form`
- Hero image brief: "A calm Georgian doorway at golden hour, keys in hand, the quiet moment before a first visit." (`how-hero-doorway.webp`, 1600 × 900)

### Process band ("How the visit works")
- Eyebrow: "How the visit works"
- Heading: "One home, remembered from the first visit on."
- Step 01 — Heading: "Ask the House"
- Step 01 — Body: "Choose a service, enter your postcode and see real availability and pricing."
- Step 02 — Heading: "The House arranges it"
- Step 02 — Body: "Vetted people, clear information and joined-up fulfilment, delivered to one standard."
- Step 03 — Heading: "HoWA remembers it"
- Step 03 — Body: "Records, reminders and relevant next steps stay with your home."

### Numbered sections 01–06

**01**
- Heading: "Book and manage House services."
- Body: "Choose a service, enter your postcode and see real availability and pricing. Everything you book, from a single gardener visit to a recurring housekeeping rhythm, is kept in one place so you can reschedule, repeat or cancel without starting again."
- Body: "Because the House remembers your address and property details, the next booking is quicker than the first."
- Image brief: "A gardener and housekeeper arriving at a British townhouse in soft morning light, calm and unhurried, the moment a service begins." (`how-book-services.webp`, 1200 × 900)

**02**
- Heading: "Keep a Home Record."
- Body: "Your Home Record is a useful, private record of your home: its rooms, its quirks, the professionals who have visited and the notes worth keeping. It belongs to you."
- Body: "Access instructions, the make of a boiler, a preferred cleaning product or where the stopcock lives all sit in one place, so the House can help without asking you to repeat yourself."
- Image brief: "A leather-bound household ledger open on a kitchen table beside a set of keys, editorial still life, the quiet keeping of a home." (`how-home-record.webp`, 1200 × 1500)

**03**
- Heading: "Store relevant policy, visit and purchase history."
- Body: "Cover documents, completed visits and things you have bought from the House Store are gathered together and easy to find. When a policy renews or a warranty matters, the detail is already to hand."
- Body: "You decide what is kept. Every record shows where it came from and when it was added."

**04**
- Heading: "Receive reminders and seasonal recommendations."
- Body: "Gutters before autumn, a boiler service before winter, the lawn in spring. HoWA keeps track of the rhythm of a home and reminds you before the moment passes, not after."
- Body: "Reminders are yours to keep, snooze or turn off. Nothing is bought on your behalf, and nothing manufactures urgency."
- Image brief: "An English garden turning from late summer to autumn, gutters and hedges catching low golden light, the rhythm of the year around a home." (`how-seasonal-reminders.webp`, 1200 × 900)

**05**
- Heading: "Understand what the home may need next."
- Body: "Over time, the joined-up picture helps the House suggest the sensible next step: a service worth booking, cover worth reviewing or a small job worth doing before it becomes a large one."
- Body: "Every suggestion explains why it appears, and you are always free to dismiss it."

**06**
- Heading: "Privacy, permissions and control."
- Body: "Your home, access, pet, policy and schedule details are treated as sensitive. You can see what is held, edit or delete it, and control who within the House can use it."
- Body: "Marketing consent is kept separate from the information needed to deliver a service. Your Home Record is never used to learn about your household for unrelated purposes."

### Closing panel
- Eyebrow: "Powered by HoWA"
- Heading: "One home, remembered."
- CTA (primary): "Go to My House" → `/my-house`
- CTA (secondary): "Book a service" → `#open-booking-form`

---

## House Approved Pro (`/house-approved-pro`)
File: `src/app/house-approved-pro/page.tsx`

### Metadata
- Title: "House Approved Pro"
- Description: "Bring your expertise into the House. House Approved Pro is the professional and contractor proposition of the House of Willow Alexander."

### Hero
- Eyebrow: "House Approved Pro"
- Heading: "Bring your expertise into the House."
- Body: "The House of Willow Alexander works with trusted independent professionals and service businesses to care for homes and gardens to one standard. If you do good work, we would like to send it your way."
- CTA: "Apply to become House Approved" → `#apply`

### Who it is for
- Eyebrow: "Who it is for"
- Heading: "Independent professionals who take pride in the work."
- Body: "House Approved Pro is a business-to-business proposition. It is built for people who run their own trade and want a steadier flow of quality work, not a recruitment scheme for employees."
- List item: "Independent tradespeople and sole traders"
- List item: "Established service businesses and small teams"
- List item: "Licensed operators in regulated disciplines"
- List item: "Specialists in home and garden care looking for consistent, quality work"

### Benefits
- Eyebrow: "Benefits"
- Heading: "What being House Approved brings you."
- Card — Heading: "Steady, qualified demand" / Body: "Bookings routed from a trusted House brand, matched to your trade and service area, without you chasing leads."
- Card — Heading: "Scheduling that fits" / Body: "Availability, visit windows and rebookings handled through House tools, so your diary stays your own."
- Card — Heading: "A recognised standard" / Body: "Being House Approved is a mark customers understand. The House vouches for the people it lets through the door."
- Card — Heading: "Support behind you" / Body: "A real team for scheduling questions, payment queries and the occasional difficult job."
- Card — Heading: "Tools that do the admin" / Body: "Booking, records, reminders and customer history, powered by HoWA, so less of your week is paperwork."
- Card — Heading: "A reputation you build" / Body: "Verified reviews follow good work, and good work brings the next booking."

### The contractor model
- Eyebrow: "The contractor model"
- Heading: "How working with the House works."
- Card — Heading: "You stay independent" / Body: "House Approved professionals are independent contractors and licensed operators, not employees of the House. You keep your business, your name and your judgement."
- Card — Heading: "The House brings the work" / Body: "Customers book through the House. The service is delivered by you, to the House standard, in the recognised discipline colours where relevant."
- Card — Heading: "One clear commercial model" / Body: "Fees and the commercial split are stated plainly and agreed before you take work. No hidden deductions, no surprise charges."
- Body (below cards): "Fees and the commercial model are stated clearly and agreed before you take any work. We distinguish independent contractors, licensed operators and any employed roles according to the actual legal arrangement, never blurring the two."

### Standards and vetting
- Eyebrow: "Standards and vetting"
- Heading: "The House vouches for who it lets in."
- Body: "Being House Approved means customers can trust the person at the door. Before you take work, we verify:"
- List item: "Identity, right-to-work and business verification"
- List item: "Relevant qualifications and certifications for the trade"
- List item: "Public liability and, where required, professional insurance"
- List item: "References and a review of recent work"
- List item: "Ongoing conduct, punctuality and customer-care expectations"
- List item: "A shared commitment to sustainability and responsible working"

### Tools, powered by HoWA
- Eyebrow: "Tools, powered by HoWA"
- Heading: "Less admin. More of the work you are good at."
- Body: "The House uses HoWA, its booking and home-intelligence system, to take the paperwork off your plate. As a House Approved professional you get:"
- List item: "Booking and diary management"
- List item: "Customer and property history at each visit"
- List item: "Reminders for recurring and seasonal work"
- List item: "Records of completed visits and notes"
- List item: "Clear payment and payout summaries"
- Image alt: "The HoWA app showing a Home Record and HoWA Score"

### Application steps
- Eyebrow: "Application steps"
- Heading: "From apply to your first booking."
- Step 01 — Heading: "Apply" / Body: "Tell us your trade, your area and a little about your business using the form below."
- Step 02 — Heading: "Verification" / Body: "We check identity, qualifications, insurance and references, and review examples of your work."
- Step 03 — Heading: "Onboarding" / Body: "We agree the commercial model, set up your tools and brief you on the House standard."
- Step 04 — Heading: "Go live" / Body: "You start receiving matched bookings in your area, with support on hand."

### FAQs
- Eyebrow: "FAQs"
- Heading: "Questions professionals ask."
- Q: "Am I employed by the House?" / A: "No. House Approved professionals are independent contractors or licensed operators. The legal model is made explicit before you agree to anything, and employed roles, if ever offered, are advertised separately and clearly."
- Q: "What does it cost to join?" / A: "There is no charge to apply. The commercial model, including any fees or commission, is stated in full and agreed before you take any work."
- Q: "Do I need my own insurance?" / A: "Yes. You must carry valid public liability cover, and professional or trade-specific insurance where your discipline requires it. We verify this during onboarding."
- Q: "Can I keep my own customers and brand?" / A: "Yes. House Approved work sits alongside your own business. You keep your name, your existing clients and your independence."
- Q: "Which trades are you looking for?" / A: "Home and garden disciplines including gardening, housekeeping, cleaning, window cleaning, repairs, electrical and energy work, removals and dog walking. If your specialism sits nearby, apply and tell us about it."

### Apply form
- Eyebrow: "Apply"
- Heading: "Apply to become House Approved."
- Body: "Send us the essentials and the House team will be in touch. Submitting opens your email client so you can review before it sends."
- Field label: "Your name"
- Field label: "Trade or discipline" (placeholder: "For example: gardening, window cleaning, repairs")
- Field label: "Service area" (placeholder: "Towns or postcodes you cover")
- Field label: "Email"
- Submit button: "Apply to become House Approved"
- Footer: "Prefer to write directly? Email sales@willowalexander.co.uk." (mailto: sales@willowalexander.co.uk)

---

## My House (`/my-house`)
File: `src/app/my-house/page.tsx`

### Metadata
- Title: "My House"
- Description: "My House is your account with the House of Willow Alexander, powered by HoWA. Manage bookings, cover, orders and your Home Record in one place."

### Hero
- Heading: "My House"
- Sub-label: "Powered by HoWA"
- Body: "One place for everything the House looks after on your behalf: your bookings, your cover, your orders and the record of your home. Sign in to pick up where you left off."
- CTA (primary): "Sign in" → `https://accounts.willowalexander.co.uk/`
- CTA (secondary): "Book a service" → `#open-booking-form`
- Note: "New to the House? You can book a service or get a quote as a guest. An account is offered afterwards, never as a gate."

### Inside My House — the 7 nav areas
- Eyebrow: "Inside My House"
- Area — "Overview": "Your next booking, current actions and anything that needs your attention, gathered on one page."
- Area — "Bookings": "Upcoming and past visits. Reschedule, repeat or cancel, with clear terms shown before you confirm."
- Area — "Cover": "Home and pet policies, renewal dates, documents and a direct route to claims and help."
- Area — "Orders": "Purchases from the House Store, delivery status, returns and receipts kept together."
- Area — "Home Record": "A useful, private record of your home: property details, past visits, warranties and access notes."
- Area — "Saved": "Articles from The Hearth and objects from the Store you have set aside for later."
- Area — "Profile & permissions": "Your contact details, marketing preferences and control over what information the House can use."

### Your Home Record
- Eyebrow: "Your Home Record"
- Heading: "A useful record of your home. Not a profile of you."
- Body: "The Home Record keeps the practical details of your home in one place, so the House can help without asking you to repeat yourself. It belongs to you. Every record shows where it came from and when it was added, and you can edit or delete it."
- Body: "Read more about how the House uses HoWA on the How it works page." (link: "How it works" → `/how-it-works`)
- Panel label: "A Home Record may hold"
- List item: "Property details and room notes"
- List item: "Completed visits and professional notes"
- List item: "Uploaded receipts and documents"
- List item: "Policy references and renewal dates"
- List item: "Product warranties"
- List item: "Maintenance reminders"
- List item: "Preferences and access notes"

### Sign-in band
- Heading: "Everything the House holds, in one place."
- CTA: "Sign in to My House" → `https://accounts.willowalexander.co.uk/`
- Sub-label: "My House, powered by HoWA"

---

## Search (`/search`)
File: `src/app/search/page.tsx` (+ `search.module.css`, styling only)

Note: results themselves are dynamic (fetched from `/api/search`); the strings below are the static UI copy.

- Suspense fallback: "Loading search…"
- Eyebrow: "Search the House"
- Search input placeholder: "What are you looking for?"
- Filter tabs: "All" · "Services" · "Shop" · "Design" · "Journal" · "The House" · "HoWA"
- Loading status: "Searching…"
- Empty-state title: "Nothing quite like "{query}" yet." (query interpolated)
- Empty-state lede: "Try different terms, or browse these sections:"
- Empty-state chips: "Services" → `/services` · "Design" → `/design/interiors` · "Shop" → `/shop` · "Journal" → `/the-hearth`
- Pre-search status: "Start typing to search across the House."
- Results count: "{n} result" / "{n} results" (pluralised)
- Result card: type label, title, excerpt — all `[dynamic]` per result

---

## Help (`/help`)
File: `src/app/help/page.tsx`

### Metadata
- Title: "Help"
- Description: "The House help centre. Find answers by task: bookings, insurance and claims, orders and returns, My House, payments and House Approved Pro."

### Hero
- Eyebrow: "Help"
- Heading: "How can the House help?"
- Body: "Find what you need by task. If you cannot see it here, the House team is only an email or a call away."

### Task categories

**Manage a booking**
- Intro: "Change, repeat or cancel a service visit, and understand arrival windows and terms."
- Task: "Reschedule or cancel an upcoming visit"
- Task: "Rebook a service you have had before"
- Task: "Check what time your professional will arrive"
- Task: "Understand cancellation and rescheduling terms"
- Action: "Go to My House" → `/my-house`

**Insurance and claims**
- Intro: "Get help with home and pet cover, policy documents, renewals and making a claim."
- Task: "Start or continue a quote"
- Task: "Find your policy documents"
- Task: "Make or track a claim"
- Task: "Understand what is and is not covered"
- Action: "Insurance and cover help" → `/insurance-and-cover/help-and-claims`

**Orders and returns**
- Intro: "Track a House Store order, arrange a return and check delivery and stock."
- Task: "Track a Store order and delivery"
- Task: "Return or exchange an item"
- Task: "Check stock and delivery times"
- Task: "Find a receipt or invoice"
- Action: "Visit the House Store" → `/shop`

**My House and Home Record**
- Intro: "Sign in, keep your Home Record up to date and manage what the House remembers."
- Task: "Sign in to My House"
- Task: "Add or edit property and access details"
- Task: "Upload documents, receipts and warranties"
- Task: "Manage reminders and recommendations"
- Action: "Go to My House" → `/my-house`

**Payments and refunds**
- Intro: "Understand charges, pricing basis, VAT treatment and how refunds are handled."
- Task: "Understand a charge or the pricing basis"
- Task: "Update a payment method"
- Task: "Request or track a refund"
- Task: "Read about VAT and minimum booking values"
- Action: "Contact the House" → `/contact`

**House Approved Pro**
- Intro: "For professionals: applying, verification, tools and the commercial model."
- Task: "Apply to become House Approved"
- Task: "Understand the contractor model and fees"
- Task: "Check standards, vetting and insurance requirements"
- Task: "Get help with your booking and payout tools"
- Action: "House Approved Pro" → `/house-approved-pro`

### Contact band
- Heading: "Still need a hand?"
- Body: "Speak to the House team. We will point you to the right place, or sort it for you."
- CTA: "Contact the House" → `/contact`

---

## Contact (`/contact`)
Files: `src/app/contact/page.tsx` + `src/components/forms/ContactForm.tsx`

### Metadata
- Title: "Contact | Write to the House."
- Description: "Write to the House. We read every message."

### Hero (page.tsx)
- Eyebrow: "Contact"
- Heading: "Write to the House." ("the House." set in italic emphasis)
- Lede: "Choose what this is about first. The form adapts so you only answer what we need. We read every message."

### Contact detail block (page.tsx — phone/email/hours/urgent)
- Label: "Call the House" / Value: "0800 047 8738" (tel:08000478738) / Note: "Freephone, from a UK line."
- Label: "Email" / Value: "sales@willowalexander.co.uk" (mailto) / Note: "We reply within one working day."
- Label: "Opening hours" / Value: "Monday to Friday, 8am to 6pm" / "Saturday, 9am to 1pm" / "Sunday and bank holidays, closed"
- Label: "Something urgent?" / Body: "For a booking already under way, call us on 0800 047 8738 so we can reach the professional directly. For a home emergency, contact the relevant emergency service first."

### Contact form (ContactForm.tsx)
- Step 1 legend: "What's this about?"
- Topic card — "General enquiry": "Anything else we haven't covered." (subject hint: "A few words on what you'd like to discuss")
- Topic card — "Press & editorial": "Features, comment requests, assets, interviews." (subject hint: "Publication or outlet + deadline")
- Topic card — "Partnerships": "Collaborations, suppliers, designers, brands." (subject hint: "Nature of the partnership")
- Topic card — "Careers": "Open roles and speculative applications." (subject hint: "Role or area of interest")
- Topic card — "Existing client": "Issues with a service or an active engagement." (subject hint: "Your project reference, if you have one")
- Topic card — "Complaint": "Something went wrong. We'll read it personally." (subject hint: "Brief summary of the issue")
- Field label: "Name" (required)
- Field label: "Email" (required)
- Field label: "Subject" (hint = the chosen topic's subject hint above)
- Field label: "Message" (required)
- Marketing opt-in checkbox: "I'd like to hear from House of Willow Alexander occasionally about home, garden and seasonal tips and offers."
- Submit button: "Send message"
- (On success redirects to `/thank-you`)

---

## Legal index (`/legal`)
File: `src/app/legal/page.tsx`

### Metadata
- Title: "Legal"
- Description: "Privacy, terms, and cookie policy for House of Willow Alexander."

- Eyebrow: "Legal"
- Heading: "Small print, plainly written." ("plainly written" in italic emphasis)
- Lede: "These pages are the legal backbone for how the House operates. We've tried to keep them in plain English. Any question, write to us and we'll translate."
- Secondary body: "House services are provided by House of Willow Alexander and its approved partners. Online bookings, your account and the Home Record are powered by HoWA, a separate Home Intelligence OS for which House of Willow Alexander is the founding service partner. Information you add to your Home Record is held within HoWA under its own terms."
- Index link — "Privacy": "What we collect, why, and how it's handled." → `/legal/privacy`
- Index link — "Terms": "The rules of using the site, HoWA, and our services." → `/legal/terms`
- Index link — "Cookies": "What we set in your browser and why." → `/legal/cookies`
- Link affordance label: "Read →"

---

## Legal · Privacy (`/legal/privacy`)
File: `src/app/legal/privacy/page.tsx` (rendered via `EditorialPage`; `title` + `updatedAt` are `[dynamic]` from Sanity `getLegalPage("privacy")` with fallbacks below)

### Metadata
- Title: "Privacy"
- Description: "How House of Willow Alexander collects, uses, and protects your personal data."

- Eyebrow: "Legal · Privacy"
- Title: `[dynamic]` — fallback "Privacy policy."
- Lede: "How House of Willow Alexander Ltd collects, uses, and protects your personal data, and the rights you have over it under UK data protection law."
- Updated-at: `[dynamic]` — fallback "1 July 2026"

Section headings + intro lines:
- "Overview" — opens: "We collect only the data we need to provide the site, shop, and services, and we do not sell your personal data. Data you add to your Home Record remains yours; you can export or delete it at any time." [legal body — 3 paragraphs total]
- "Who we are" — "House of Willow Alexander Ltd (registered in England & Wales, company number 15062693) is the data controller. Registered office: 12 Hatherley Road, Sidcup, Kent, DA14 4DT." / "Contact: sales@willowalexander.co.uk"
- "What we collect, and why" — [legal body — 5 paragraphs, covering account/billing, form messages, photos/documents/notes, measurement data, advertising/attribution data]
- "Your rights" — opens: "You can request a copy of your data, correct anything that's wrong, or ask us to delete it. We'll respond within 30 days…" [legal body — 2 paragraphs]

---

## Legal · Cookies (`/legal/cookies`)
File: `src/app/legal/cookies/page.tsx` (via `EditorialPage`; `updatedAt` `[dynamic]` from Sanity with fallback)

### Metadata
- Title: "Cookies"
- Description: "What cookies and similar tech the House site uses, and why."

- Eyebrow: "Legal · Cookies"
- Title: "Cookie policy."
- Lede: "What cookies we set in your browser, what we share and with whom, and how to manage your choices."
- Updated-at: `[dynamic]` — fallback "1 July 2026"

Section headings + intro lines:
- "The four categories" — opens: "The banner asks you to pick from four categories. You can accept all, reject everything non-essential, or open "Customise" to mix and match." [legal body — covers Essential / Functional / Measurement / Marketing]
- "What happens when you reject Measurement and Marketing" — [legal body — 2 paragraphs]
- "Data we share with third parties (only with consent)" — [legal body — 3 paragraphs]
- "If you arrived from an ad" — [legal body — 1 paragraph on gclid/fbclid/msclkid, wa_click_ids, 90 days]
- "Managing your choices" — [legal body — 2 paragraphs]
- "Full cookie list" — "The table below lists the cookies and similar storage this site uses, grouped by the category above…" (followed by `<CookieDisclosureTable />` component — table data not inlined here)

---

## Legal · Terms (`/legal/terms`)
File: `src/app/legal/terms/page.tsx` (via `EditorialPage`; `updatedAt` `[dynamic]` from Sanity with fallback)

### Metadata
- Title: "Terms"
- Description: "Terms of use for the House of Willow Alexander website, products, and services."

- Eyebrow: "Legal · Terms"
- Title: "Terms of use."
- Lede: "The terms on which you may use the site, HoWA, and our services."
- Updated-at: `[dynamic]` — fallback "1 July 2026"

Section headings + intro lines:
- "The basics" — opens: "This site and HoWA are operated by House of Willow Alexander Ltd, registered in England & Wales (company number 15062693), registered office 12 Hatherley Road, Sidcup, Kent, DA14 4DT…" [legal body — 2 paragraphs]
- "Your account" — [legal body — 2 paragraphs]
- "Services & bookings" — [legal body — 2 paragraphs]
- "Payments" — opens: "Payments for services, memberships and orders taken through HoWA are charged by HoWA Living Ltd…" [legal body — 3 paragraphs]
- "Liability" — [legal body — 2 paragraphs]

---

## Legal · Service terms (`/legal/service-terms`)
File: `src/app/legal/service-terms/page.tsx` (self-contained template, not CMS)

### Metadata
- Title: "Service terms"
- Description: "The terms on which House of Willow Alexander provides and arranges home and garden services, including booking, pricing, cancellation and liability."

- Eyebrow: "Legal · Service terms"
- Title: "Service terms."
- Lede: "The terms on which the House provides and arranges home and garden services. Please read them alongside our general terms and privacy policy."
- Updated-at: "17 August 2026"

Section headings (numbered) + intro lines:
- "1. About these terms" — "These service terms govern your use of the home and garden services booked through House of Willow Alexander (the House)…" [legal body — 2 paragraphs]
- "2. How services are provided" — [legal body — 2 paragraphs]
- "3. Booking, quotes and surveys" — [legal body — 2 paragraphs]
- "4. Pricing and payment" — [legal body — 2 paragraphs]
- "5. Access and your responsibilities" — [legal body — 2 paragraphs]
- "6. Changes, cancellation and rescheduling" — [legal body — 2 paragraphs]
- "7. Refunds" — [legal body — 1 paragraph]
- "8. Standards, complaints and putting things right" — [legal body — 1 paragraph]
- "9. Liability" — [legal body — 2 paragraphs]
- "10. Regulated and excluded work" — [legal body — 1 paragraph]
- "11. Changes to these terms" — [legal body — 1 paragraph]
- Footer: "Last updated 17 August 2026. See also our general terms and privacy policy." (links → `/legal/terms`, `/legal/privacy`)

---

## Legal · Insurance disclosures (`/legal/insurance-disclosures`)
File: `src/app/legal/insurance-disclosures/page.tsx` (self-contained, not CMS)

### Metadata
- Title: "Insurance disclosures"
- Description: "Regulatory disclosures for House of Willow Alexander home and pet cover, including our role as an introducer and the FCA-authorised intermediary."

- Eyebrow: "Legal · Insurance disclosures"
- Title: "Insurance disclosures."
- Lede: "The regulatory information you need before taking home or pet cover introduced by the House."
- Updated-at: "17 August 2026" (plus: "This page is subject to legal and compliance review.")

At-a-glance panel (label: "At a glance"):
- "The House's role" — "Introducer only. Not the insurer, underwriter or adviser."
- "Authorised intermediary" — "Provenance, authorised and regulated by the FCA."
- "FCA Firm Reference Number" — "804047 (check at register.fca.org.uk)."
- "Insurer / underwriter" — "Named in your policy documents before you buy."

Section headings (numbered) + intro lines:
- "1. The House's role: introducer only" — "House of Willow Alexander does not provide insurance advice, does not arrange, underwrite or administer insurance, and is not the insurer…" [legal body — 2 paragraphs]
- "2. The authorised intermediary" — "Insurance introduced by the House is arranged by Provenance, an insurance intermediary authorised and regulated by the Financial Conduct Authority (FCA). Provenance's Firm Reference Number (FRN) is 804047…" [legal body — 2 paragraphs]
- "3. Insurer and underwriter" — [legal body — 2 paragraphs]
- "4. Fees and remuneration" — [legal body — 1 paragraph]
- "5. What is and is not covered" — [legal body — 2 paragraphs]
- "6. Making a claim" — [legal body — 1 paragraph]
- "7. Complaints" — [legal body — 2 paragraphs]
- "8. Company details" — "House of Willow Alexander Ltd is registered in England and Wales, company number 15062693, registered office 12 Hatherley Road, Sidcup, Kent, DA14 4DT. Contact: sales@willowalexander.co.uk."
- Footer: "Last updated 17 August 2026. This page is subject to legal and compliance review. See also Insurance & Cover." (link → `/insurance-and-cover`)

---

## Legal · Accessibility (`/legal/accessibility`)
File: `src/app/legal/accessibility/page.tsx` (self-contained, not CMS)

### Metadata
- Title: "Accessibility"
- Description: "The House of Willow Alexander's accessibility statement: our commitment to WCAG 2.2 AA, what we have done, known limitations and how to get help."

- Eyebrow: "Legal · Accessibility"
- Title: "Accessibility statement."
- Lede: "How we work to make the House usable for everyone, and how to reach us if something is not working for you."
- Updated-at: "17 August 2026"

Section headings + copy:
- "Our commitment" — "House of Willow Alexander is committed to making its website usable for as many people as possible, regardless of ability or the technology they use. We aim to meet the Web Content Accessibility Guidelines (WCAG) version 2.2 at level AA across the site." / "Accessibility is treated as part of the House standard, not an afterthought. We test as we build and fix issues as we find them."
- "What we have done" — list:
  - "Full keyboard navigation, with a skip link to the main content"
  - "Visible focus states with clear contrast"
  - "A logical heading order on every page"
  - "Semantic buttons and links, not clickable non-interactive elements"
  - "Form labels, descriptions and errors that are programmatically associated"
  - "Colour is never the only way a service or state is identified"
  - "Body text contrast of at least 4.5:1 and large text of at least 3:1"
  - "Touch targets of at least 44 by 44 pixels"
  - "Alternative text that describes the purpose of editorial and still-life images"
  - "Decorative pattern marked so assistive technology can ignore it"
  - "A reduced-motion mode that removes parallax and non-essential animation"
- "Known limitations" — [body — 2 paragraphs; opens "Some content is still being brought up to the full standard, and a small number of third-party components…"]
- "Getting help" — "If you need information from this site in a different format, or you have difficulty using any part of it, contact the House and we will help…" / "Contact us at sales@willowalexander.co.uk, or through the help centre."
- "Enforcement and feedback" — [body — 2 paragraphs]
- Footer: "Last updated 17 August 2026. Need a hand? Visit help or contact the House." (links → `/help`, `/contact`)

---

## Design · Interiors (`/services/interiors`)
File: `src/app/services/interiors/page.tsx` (+ `interiors.module.css`). Not CMS-driven — all copy hardcoded.

### Metadata
- Title: "Interiors"
- Description: "Consultation-led interior design, held by the House. Portfolio, design stages, budget guidance and scope, then a personal enquiry, every scheme House Approved."

### Hero
- Breadcrumb: "Services / Interiors"
- Eyebrow: "Services · Interiors"
- Heading: "Consciously designed interiors." ("interiors." in italic emphasis)
- Lede: "Rooms read for the people who live in them, not decorated at them. Worked out in plaster, paint, joinery and the light a room actually gets, with a House Approved studio who know period fabric and how a home wears over years. This is a considered, consultation-led service, so we begin with a conversation, not a checkout."
- CTA (filled): "Start an enquiry" → `#interiors-enquiry`
- CTA (ghost): "See our work →" → `#portfolio`

### Stats strip
- Lede line 1: "Beauty. Balance. Intention."
- Lede line 2: "Every scheme through a House Approved studio."
- Stat: "1:1" — "Designer access"
- Stat: "3" — "Ways to begin"
- Stat: "House" — "Approved studio"
- Stat: "0" — "Cookie-cutter schemes"

### Portfolio
- Eyebrow: "Our work"
- Heading: "Rooms that remember their people." ("remember their people." in italic emphasis)
- Captions: "Herts Living Room" · "Buckingham Bedroom" · "Herts Dining" · "Tunbridge Wells I" · "Tunbridge Wells II"

### Design stages
- Eyebrow: "How the work moves"
- Heading: "From first conversation to finished room." ("to finished room." in italic emphasis)
- Lede: "A clear, unhurried path. You see the thinking at every stage and nothing is ordered until the scheme is right."
- Stage 01 — "Consultation": "We start with a conversation about the room, how you live in it, and what you want it to become. No brief is too early."
- Stage 02 — "Concept & moodboard": "Palette, layout and material direction, worked out in plaster, paint, joinery and the light a room actually gets."
- Stage 03 — "Sourcing & specification": "Furniture, finishes and fabric, curated to the scheme with a clear, shoppable specification and honest pricing."
- Stage 04 — "Styling & install": "The scheme brought together in the room, considered down to the last placement, so it reads as one whole."

### Budget and scope
- Eyebrow: "Budget and scope"
- Heading: "Three ways to begin." ("to begin." in italic emphasis)
- Budget note: "Design fees start from £195 for a single room and from £795 for a whole-home brief. Furniture, finishes and trades are quoted separately and always agreed with you before anything is ordered. We will talk openly about budget in your consultation, so the scheme is shaped around what you want to spend, never the other way round."

Plans:
- Plan — "The House Edit" (ribbon: "Most chosen") / Tagline: "A 90-minute studio session." / Price: "From £295"
  - "A 90-minute one-to-one online styling session"
  - "Thoughtful guidance on palette, layout and sourcing"
  - "A personalised PDF moodboard with curated links"
  - "10% House Store discount"
- Plan — "Additions to Your Edit" / Tagline: "Room-by-room top-ups." / Price: "From £195"
  - "A shoppable moodboard"
  - "Sourcing per room"
  - "A material pack: swatches, samples, scents"
  - "A 30-minute follow-up call"
- Plan — "The Full House Edit" / Tagline: "A whole-home brief, fully held." / Price: "From £795"
  - "An initial 90-minute consultation"
  - "Moodboards for up to three rooms"
  - "Sourcing for two rooms"
  - "A tactile material pack posted to you"
  - "A 30-minute follow-up call"
  - "15% House Store discount"
- Each plan CTA: "Enquire about this →" → `#interiors-enquiry`

### Quote
- Quote: ""A home that carries you. Not a statement you have to keep up with.""
- Attribution: "The House brief · 2025"

### Enquiry form (`<EnquiryForm>`)
- Eyebrow: "Begin the conversation"
- Headline: "Tell us about the room."
- Body: "Share the space, your ambition, timeline and a sense of budget. We read every enquiry personally and come back to you to arrange a consultation, usually within one working day."
- Button label: "Send enquiry"

### Newsletter
- `<NewsletterInline variant="cream">` — newsletter block copy sourced from the component (not defined on this page)

---

## Design · Gardens (`/design/gardens`)
File: `src/app/design/gardens/page.tsx` (+ `gardens.module.css`)

Note: this page IS CMS-driven via `getPageSections("design-gardens")`. Every string wrapped in `cms(...)` below is `[dynamic]` — the hardcoded fallback is captured. Plan/specialist card data and stat cols also merge Sanity over the hardcoded defaults (`cmsCards`). Projects gallery pulls from `GARDEN_PROJECTS` (`src/lib/gardens-projects.ts`).

### Metadata
- Title: "Gardens: Landscapes, properly read."
- Description: "Planting plans, concept designs and full landscape commissions through the House. Led by our in-house garden studio, Willow Alexander Gardens."

### Hero — all `[dynamic]` with fallbacks
- Eyebrow: fallback "Design · Gardens"
- Heading: fallback "Landscapes, properly read." ("properly read." in italic emphasis)
- Lede: fallback "Designed around what the garden already wants to do: light, shade, drainage, the soil it has. The brief is to make the garden feel inevitable, ten years from now. Led by Willow Alexander Gardens, the House's own garden studio, with specialist partners brought in for build."
- CTA (filled): fallback "See the plans" → fallback `#plans`
- CTA (ghost): fallback "The lead studio" → fallback `/partners/willow-alexander-gardens`
- Hero image alt: fallback "Estate grounds: mature planting, brick paths and Georgian house behind"

### Stats strip — `[dynamic]` with fallbacks
- Lede line 1: fallback "Light. Soil. Aspect. Time."
- Lede line 2: fallback "Every scheme through a House-Approved studio."
- Stat: "4" — "Ways to begin"
- Stat: "1" — "Lead studio"
- Stat: "10yr" — "Design horizon"
- Stat: "0" — "Off-the-shelf schemes"

### Three plans — header `[dynamic]` with fallbacks
- Eyebrow: fallback "Garden Plans"
- Heading: fallback "Three ways to begin." ("to begin." in italic emphasis)
- Lede: fallback "From a planting plan that solves a single border to a fully dimensioned 3D design ready for build, the right entry point for the garden you have now."

Plan cards (hardcoded defaults, CMS-overridable):
- Plan — "Planting Plans" / Tagline: "Light, soil and aspect, properly read." / Price: "from £495"
  - "Site survey of light, soil and aspect"
  - "Full plant list with seasonal palette"
  - "Placement guide and maintenance notes"
  - "30-minute follow-up call"
- Plan — "Concept Plans" (ribbon: "Featured") / Tagline: "The whole garden, considered." / Price: "from £1,495"
  - "Layout design and zoning"
  - "Materials palette and hardscape"
  - "Planting inspiration board"
  - "Lighting and water consideration"
  - "Three rounds of revisions"
- Plan — "2D & 3D Plans" / Tagline: "Drawn, dimensioned, build-ready." / Price: "from £2,950"
  - "Fully dimensioned plans"
  - "3D renders of key views"
  - "Construction-grade detail"
  - "Contractor liaison brief"
  - "On-site walk-through"
- Each plan CTA: "Enquire →" → `#open-booking-form`

### Specialist services — header `[dynamic]` with fallbacks
- Eyebrow: fallback "Specialist services"
- Heading: fallback "Beyond the plan, three ways further." ("three ways further." in italic emphasis)

Specialist cards (hardcoded defaults, CMS-overridable):
- "Lighting Plans" / Price: "from £395" / "A professional lighting layout: fixture map, specification list and circuit guide."
- "Signature Collaboration" / Price: "Coming soon" / "A full creative partnership with one of our leading studios: artistic direction, materials and build liaison."
- "Full Design & Build" / Price: "Bespoke" / "Commission a full bespoke design with on-site consultation and build management through Willow Alexander Gardens."

### Projects gallery — header `[dynamic]` with fallbacks
- Eyebrow: fallback "From the studio"
- Heading: fallback "Recent commissions." ("commissions." in italic emphasis)
- Cards: `[dynamic]` from `GARDEN_PROJECTS` — each shows project title + location, links to `/design/gardens/projects/[slug]`

### Quote — `[dynamic]` with fallbacks
- Quote: fallback "A garden deserves a mood, not just a hand."
- Attribution: fallback "Willow Alexander Gardens · 2025"

### Assistant split — `[dynamic]` with fallbacks
- Eyebrow: fallback "HoWA · Assistant"
- Heading: fallback "Start with the Assistant." ("Assistant." in italic emphasis)
- Lede: fallback "Capture your garden's light, soil, aspect, maintenance appetite and budget. The Assistant builds a brief your designer can work from on day one, nothing lost, nothing repeated."
- Footnote: fallback "Available to all HoWA members."
- CTA: fallback label "Coming soon" → fallback `/api/howa-bounce?source=gardens-companion`
- Image alt: fallback "A garden concept plan, the kind of brief the Assistant helps you build"

### Newsletter
- `<NewsletterInline variant="cream">` — variant + block content `[dynamic]` from `getNewsletterBlock("design-gardens")`


---

# Services — copy inventory

A per-page, per-section inventory of the CURRENT services copy (post-correction: charging basis instead of £ prices; no invented guarantees, team sizes or jargon). Every distinct string is on its own bullet with a short label. Charging basis is noted explicitly per package. Cinema and Hearth content is excluded. Fallback strings shown are the code defaults (`cms(...)` reads can be overridden from Sanity, but the default string is what ships).

---

## Services landing (`/services`)
File: `src/app/services/page.tsx`

### Page metadata
- Title: "Home and garden services"
- Description: "Garden care, cleaning and housekeeping, window and gutter cleaning, handyman and repairs, clearance and specialist garden work. Delivered by House teams and named House Approved professionals, powered by HoWA."

### 1. Hero
- Eyebrow: "The House · Services"
- Heading: "A specialist for" + em "every corner."
- Body: "Trusted home and garden services, each with its own expertise and all held to the same House standard. Lawns cut and beds planted, windows and sills cleared, gutters seen to before the weather turns, small repairs put right. Delivered by House of Willow Alexander's own teams and named House Approved professionals, booked and written back to your Home Record so the house remembers what was done."
- CTA (ghost): "Not sure? Ask the House" (→ /contact)
- CTA (ghost): "Call the House" (→ tel:08000478738)
- Micro: "Enter a postcode for coverage and your price. Bookings create or update your Home Record."
- Hero image alt: "A hand cleaning a sash window in golden-hour light, with a plant on the sill inside"
- (Also renders the `HeroServiceFinder` component — service + postcode finder.)

### 2. Stats strip
- Lede line 1 (headline): "Same standard. Same hands twice."
- Lede line 2 (subheadline): "Held in your record, surfaced when it matters."
- Stat column: value "1" / label "House standard"
- Stat column: value "17" / label "Published standards"
- Stat column: value "One" / label "Calendar, everything in step"
- Stat column: value "Every" / label "Professional House-vetted"

### 3. The catalogue (service cards)
- Eyebrow: "The catalogue"
- Heading: "The hands that" + em "keep a house in good order."
- Body: "The whole home and garden, from one House. Some work is done by our own teams; some is done by a named House Approved professional. You are always told which before you commit."
- Footnote: "Do not see the job you need? Tell the House [→ /contact] and we will find who does it, what it costs and when we can come."

Cards (name / tagline / body). Each card also shows a from-price basis phrase (derived from the service's first non-steward package) and area "London and the Home Counties":
- Card — Gardeners: tagline "Lawn, beds, and seasonal care." / body "Routine cuts, hedge work, planting plans and seasonal tidies, by gardeners who know the difference between cutting back and cutting down." (→ /services/gardening)
- Card — Window cleaners: tagline "Spotless glass, frames, and sills." / body "Pure-water reach-and-wash on the outside, traditional cloth on the inside, with a sash-window method that respects the original timber." (→ /services/window-cleaning)
- Card — Cleaners: tagline "Domestic cleaning, properly briefed." / body "A regular team that gets to know the home: surfaces, finishes, what to use, what to leave. Same hands twice. Filed to your record after every visit." (→ /services/cleaning)
- Card — Gutter Cleaning: tagline "Pre-winter clears and downpipe checks." / body "Reach-and-vac from the ground for safety, with a borescope check on the downpipes and a flagged works list if anything else needs doing." (→ /services/gutter-cleaning)
- Card — Repairs: tagline "Small jobs, properly done." / body "A trusted set of hands for the long list. Shelves, fixes, draught-proofing, tile replacements, the things that bother you." (→ /services/handyman)
- Card — Housekeeping: tagline "A discreet, ongoing presence." / body "Daily or weekly housekeeping, laundry, linen, kitchen, light cooking, for households that prefer the home kept beautifully without managing it." (→ /services/housekeeping)
- Card — Removals: tagline "Moves, briefed by the record." / body "Moves briefed by your record, with packers who handle period interiors with care. Your Home Record makes the unpack at the other end clean and quick." (→ /services/removals)
- Card — Electrical & energy: tagline "Safety checks, EV chargers, energy advice." / body "Vetted electricians, EICRs filed to your Home Record, and energy-efficiency planning so the home performs as well as it looks." (→ /services/energy)
- Card — Dog walking & pet care: tagline "Dog walking, sitting and check-ins." / body "Vetted walkers and sitters who know the door codes, the leash habits, and the after-walk routine." (→ /services/pet-care)

### 3a. How booking works
- Eyebrow: "How booking works"
- Heading: "Four steps," + em "start to finish."
- Step 01 — "Select the service": "Choose the service and enter your postcode, so everything after this is real for your address."
- Step 02 — "See availability and price": "The charging basis and the next available times, or a short quote step where a job is priced on the details."
- Step 03 — "Confirm": "Pick the slot that suits you and confirm. You are told who is coming, House team or named House Approved professional."
- Step 04 — "Added to My House": "The booking, notes and history are written to your service record in My House, powered by HoWA."
- Related Hearth link — kicker "From the Hearth" + "How to choose the right kind of help for your home." (→ /the-hearth)

### 3b. Who turns up (House teams vs House Approved)
- Eyebrow: "Who turns up"
- Heading: "Two kinds of hands," + em "one standard."
- Card 1 heading: "A House of Willow Alexander team"
- Card 1 body: "Our own employed crews, in our own liveried electric vans, trained to the House standard. Most garden, cleaning, window and gutter work across our core postcodes is done this way."
- Card 1 footer: "Delivered by House of Willow Alexander. Booking, scheduling and Home Record powered by HoWA."
- Card 2 heading: "A named House Approved professional"
- Card 2 body: "For specialist and wider-area work, a vetted professional we have approved and named. You are told who they are before you pay or commit, never after."
- Card 2 footer: "Delivered by a named House Approved professional. Booking and Home Record powered by HoWA."
- Closing line: "HoWA manages the booking and keeps the record of the work. It is not the physical service provider, and it never appears at your door."

### 3b-ii. Everything the House can arrange (requestable groups)
- Eyebrow: "Everything the House can arrange"
- Heading: "If it belongs to the home," + em "ask us about it."
- Body: "Some of this we do ourselves and you can see the price now. The rest we arrange through professionals we have approved. Either way, tell us what you need and you will have a real answer within one working day, including an honest no if that is the answer."
- Group headings (from `SERVICE_GROUPS`): "Garden", "Home", "Exterior", "Moving & clearance", "Trades & specialists"
- Each row link label: "See prices" (service names listed under DATA · Requestable catalogue below)
- Closing line: "Where a job is carried out by a named House Approved professional rather than a House team, you are told who they are before you pay or commit to anything."

### 3c. Help me choose
- Eyebrow: "Help me choose"
- Heading: "You do not have to know" + em "what it is called."
- Body: "Most people do not arrive knowing whether they need softwashing or jet washing, a tidy or a clearance. Describe the problem in your own words and we will name it for you."
- Card 1 — "Describe a problem": body "Tell us what is wrong, in plain words. The House tells you which service it is and what it costs." / CTA "Ask the House" (→ /contact)
- Card 2 — "Diagnose an issue": body "Photograph the repair and have it identified before anyone books a survey visit." / CTA "Diagnose the problem" (→ /contact/repair)
- Card 3 — "Scan the garden": body "Have the garden read back to you, then turn what it finds into a visit or a design brief." / CTA "Scan my garden" (→ /contact/garden)

### Real teams on the road (field photography band)
- Eyebrow: "On the road"
- Heading: "Real teams. Real vans." + em "One House standard."
- CTA (filled): "Book a service" (→ #open-booking-form)
- Image alts: "A liveried House of Willow Alexander electric van"; "Gardening team clearing a garden"; "Window cleaning in progress"; "Home cleaning in progress"

### 4. Frequency, not membership
- Eyebrow: "How often ·" + highlight "Not a membership"
- Heading: "Choose how often," + em "not which plan to join."
- Lede: "There is no House maintenance plan to sign up to and no subscription to hold. You choose a service, then choose how often you want it. That is the whole arrangement, and you can change it at any point."
- Frequency 1 — "One-off visit": lede "A single booking, for a single job." / body "A tidy before guests, a clean between tenants, a gutter clear before winter. Priced for the visit, with nothing to cancel afterwards." / examples: Garden tidy, One-off clean, End-of-tenancy clean, Gutter clear
- Frequency 2 — "Regular service": lede "The same work, on a rhythm you set." / body "Weekly, fortnightly or monthly, with the same team where we can manage it. Change the frequency, pause it or stop it whenever you like." / examples: Weekly cleaning, Fortnightly garden care, Monthly window cleaning
- Frequency 3 — "Seasonal care": lede "Work that only makes sense at certain times of year." / body "Booked once, then remembered for you. HoWA holds the date and tells you when it is coming round again, so it does not get missed." / examples: Spring and autumn gutters, Hedge cutting in season, Spring clean, Winter garden prep
- Card CTA (each): "See prices & availability →" (→ /services#service-catalogue)
- Footnote: "Every service carries its own charging basis: per visit, per hour, per item, per job or a quote. Booking, scheduling and your Home Record are powered by HoWA."

### 5. Brief builder / worked example
- Eyebrow: "Tell us what you need · in two minutes"
- Heading: "Tell us about the home." + em "We'll shape the plan."
- Lede: "A short conversation and the House shapes a plan that fits the home, the rhythm, and the budget. Adjust before booking, or book straight in."
- CTA (filled): "Book a service" (→ #open-booking-form)
- Worked-example panel title: "A worked example"
- Line I — Property: "Victorian terrace, SE3 · 3 bedrooms, garden"
- Line II — Priorities: "Cleaning, gardening, gutters before winter"
- Line III — Rhythm: "Weekly cleaning · fortnightly garden"
- Line IV — Budget: "A comfortable monthly budget, shaped with you"
- Line V — Recommendation (highlighted): "Weekly cleaning + fortnightly garden · starting Monday"

### 6. FAQ
- Eyebrow: "Questions"
- Heading: "What people" + em "usually" + "ask."
- FAQ: "Can I book a one-off, or only on a regular rhythm?" — "Either. A regular rhythm holds the same work on a schedule you set; one-offs sit alongside without any commitment."
- FAQ: "Who actually comes to the home?" — "Our own teams where we operate directly. Where we don't, a named House Approved professional, disclosed up front and held to the same standard."
- FAQ: "What's kept in my Home Record?" — "Visits, notes, photographs on request, products used, team assigned. Filed to your Home Record automatically."
- FAQ: "Do you cover my postcode?" — "London + Home Counties at launch. Register interest for other regions."

### 7. Closing
- Kicker (eyebrow): "The quiet discipline of looking after a place."
- Statement (em): "Booked, briefed, and remembered."
- CTA (filled): "Book a service" (→ #open-booking-form)
- CTA (ghost): "See how it works →" (→ /how-it-works)

---

## Service detail TEMPLATE (category pages: gardening, window-cleaning, cleaning, gutter-cleaning, handyman, removals, energy, pet-care)
File: `src/components/marketing/ServiceDetail.tsx`
Fixed template copy (per-service variable copy comes from `services-data`, inventoried later). `mode` is "book" (primary CTA "See times and prices") or "quote" (primary CTA "Get a quote").

### 1. Hero + booking panel
- Breadcrumb: "Services" (→ /services) / [service name]
- Heading: service headline with em accent (per-service)
- Proof line 1: "[score] / 5 from [count] verified visits" (score/count from `serviceReview`)
- Proof line 2: from-price basis phrase (per-service, e.g. "Priced per hour"), shown only where a priced package exists
- Proof line 3: "Serving [first 4 service areas]"
- Hero image alt: service headline
- Booking panel: see BookingPanel below

### Trust strip
- Renders `service.trustBadges` (per-service; shared set inventoried under DATA)

### 2. What we can help with (only if sub-services exist)
- Eyebrow: "What we can help with"
- Heading: "Everything under" + em "[service name lowercased]."
- Sub-cards: sub name, sub lede, CTA "See detail →"

### 3. What's included / What's not included
- Left eyebrow: "What's included"
- Left heading: "Every" + em "visit."
- Left list: `service.sections.included` (per-service)
- Right eyebrow: "What's not included"
- Right heading: "So there are" + em "no surprises."
- Right list (FIXED, all services):
  - "Materials, parts and waste disposal unless stated, always itemised in your price."
  - "Regulated works needing separate certification are referred to a named specialist."
  - "Anything beyond the agreed scope is quoted and agreed before we start."
  - "VAT treatment is shown in your price summary, never hidden."

### 4. Pricing and frequency (only if priced packages exist)
- Eyebrow: "Pricing and frequency"
- Heading: "How we price" + em "[service name lowercased]."
- Per package: eyebrow "How you're charged" / package name / **basis phrase** (e.g. "Priced per hour") / "Best for [bestFor]" / inclusion bullets / CTA
- Package CTA labels: "Get a quote" (quoteEntry) · "Register interest" (waitlist) · primary label "See times and prices"/"Get a quote" (bookNow)
- Footnote (FIXED): "Book a one-off, or set a regular rhythm, weekly, fortnightly or seasonal. There is no subscription to hold; change, pause or stop it whenever you like. Minimum booking values and any extras are shown before you confirm."

### 5. How the visit works
- Eyebrow: "How the visit works"
- Heading: "From first message to first visit."
- Steps: `service.sections.how` (per-service), numbered 01, 02, …
- Image alt: "A House professional arriving at a client's home for a first visit"

### 6. Meet the House standard
- Renders `HouseStandardStrip` component (not inventoried here — shared strip)

### 7. Recent verified reviews
- Eyebrow: "Verified reviews"
- Heading: "Rated after" + em "every visit."
- Big score: "[score] / 5 from [count] verified visits"
- Body (FIXED): "Every professional who works through the House is reviewed by the client after the visit. Scores are verified against a completed, paid booking and shown to you before you commit, never invented and never anonymous."
- Trust badges repeated (per-service)

### 8. Service area and availability
- Eyebrow: "Where we work"
- List: `SERVICE_AREAS` (see DATA below)
- Footnote: "Not listed? Write to us. [→ /contact] We're expanding."

### 9. FAQs (only if FAQ exists)
- Eyebrow: "Questions"
- Heading: "Before you" + em "book."
- Items: `service.faq` (per-service)

### Enquiry form (inline)
- Eyebrow: "Enquire"
- Headline: "Ask about [service name lowercased]."
- Body: "Tell us about your home and what you need. We come back to you personally, usually within one working day. Or book online in a couple of minutes."

### 10. Also from the House + Recent work
- Eyebrow: "Also from the House"
- Heading: "One House," + em "many hands."
- Card — Service: "More home and garden care" / "Browse every discipline the House keeps in good order, held to one standard." / CTA "See all services →" (→ /services)
- Card — Cover: "Insurance and cover" / "Cover for the house and everyone who lives in it, a House proposition." / CTA "Explore cover →" (→ /insurance)
- Card — Read: "From the magazine" / "Guides and ideas for looking after a home and garden, well." / CTA "Read the Hearth →" (→ /the-hearth)
- Recent work eyebrow: "Recent work"
- Recent work heading: "From the" + em "field."

### 11. Final CTA
- Statement: em "A well-kept home" + " starts with one conversation."
- CTA (filled): primary label ("See times and prices" / "Get a quote")
- Note (FIXED): "Booking, scheduling and your Home Record are powered by HoWA, so your appointment, notes, invoices and service history stay in one place."

### BookingPanel labels
File: `src/components/services/BookingPanel.tsx`
- Phone display: "0800 047 8738" (tel:08000478738)
- Eyebrow: "Book this service" (book mode) / "Get a quote" (quote or hide-timing mode)
- Title: "See times and prices." (book) / "Get a quote." (quote/enquiry)
- From-price line: basis phrase where set
- Field label: "Service" (value = service name, colour swatch)
- Field label: "Your postcode" — placeholder "e.g. SW1A 1AA"
- Field label: "When" — options "Next available" / "Choose a date" (hidden in quote/enquiry mode)
- Primary CTA: "See times and prices" (book) / "Get a quote" (quote) / intake CTA where set
- Phone alt line: "Prefer to talk? Call 0800 047 8738"
- Footer: "Powered by HoWA"
- Intake — handyman: label "First, the details" / body "Describe the task and add a photograph or two. Small jobs are priced from what actually needs doing, so you get a real figure rather than a false instant price." / CTA "Describe the job"
- Intake — removals: label "First, the move details" / body "Start with the move details, where from, where to, floors, access and rough room count. A move is priced on a quote, never a false instant number." / CTA "Get a quote" (timing hidden)

---

## Housekeeping / leaf template
File: `src/components/marketing/SingleServiceDetail.tsx`
The shared "single service" (leaf) template — used by real sub-service pages (`/services/[slug]/[sub]`) and standalone quote-mode catalogue services. Section copy:

### 1. Hero + booking panel
- Breadcrumb: `view.breadcrumb` trail (per-page)
- Heading: `view.name` + em "."
- Lede: `view.lede` (per-page)
- Proof line 1: "[score] / 5 from [count] verified visits"
- Proof line 2: "Serving London and the Home Counties"
- Hero image alt: `view.name`
- Delivery line (quote mode): "Delivered by a House team or a named House Approved professional, disclosed before you commit. Booking and Home Record powered by HoWA."
- Delivery line (book mode): "Delivered by House of Willow Alexander. Booking, scheduling and Home Record powered by HoWA."
- Booking panel: shared BookingPanel (see above)

### 2. About + Why choose
- Left eyebrow: "About this service"
- Left heading: "What you can" + em "expect."
- Left body: `view.aboutBody` (per-page)
- Right eyebrow: "Why choose us"
- Right heading: "The House" + em "standard."
- Right list: `view.whyChoose` (per-page)

### 3. From the work (only if workImage)
- Eyebrow: "From the work"
- Heading: "Our team," + em "on the job."
- Lede: "A recent [service name lowercased] visit. Every job is photographed and filed to your HoWA record."
- Work image alt: "[name], our team at work"

### 4. Enquiry form (inline)
- Eyebrow: "Enquire"
- Headline: "Ask about [name lowercased]."
- Body: "Tell us about your home and what you need. We come back to you personally, usually within one working day. Or book online in a couple of minutes."

### 5. What's included (only if included)
- Eyebrow: "What's included"
- Heading: "Every" + em "visit."
- List: `view.included` (per-page)

### 6. FAQ (only if faq)
- Eyebrow: "Questions"
- Heading: "About" + em "[name lowercased]."
- Items: `view.faq` (per-page)

### 7. Related (only if related items)
- Eyebrow / Heading: `view.related.heading` / `view.related.title` (per-page)
- Cards: name, blurb, CTA "See detail →"

### 8. Closing enquiry + closing CTA
- Closing enquiry eyebrow: "Still deciding?"
- Closing enquiry headline: "Talk to us about [name lowercased]."
- Closing enquiry body: "Prefer to ask before you book? Tell us about your home and we'll come back to you personally, usually within one working day."
- Closing kicker: "Ready when you are"
- Closing statement: "Book" + em "[name lowercased]."
- Closing lede: "A short consultation, a fair quote, and a team that arrives when we said they would."
- CTA (filled): "Book a service" (→ #open-booking-form)
- CTA (ghost): `view.backLabel` (→ `view.backHref`, per-page)

---

## Home & Garden page (`/services/home-and-garden`)
File: `src/app/services/home-and-garden/page.tsx`
The bundled recurring-care edition. Accent: House gold.

### Page metadata
- Title: "Home & Garden"
- Description: "One coordinated plan for the whole home and garden. Gardening, window cleaning, cleaning and repairs on one schedule, one point of contact, one record. Held to the House standard."

### 1. Hero + planning panel
- Breadcrumb: "Services" (→ /services) / "Home & Garden"
- Eyebrow: "Services · Home & Garden"
- Heading: "One plan for the" + em "whole home and garden."
- Lede: "Gardening, window cleaning, cleaning and repairs, coordinated as a single recurring plan. One schedule, one point of contact and one record, so the whole property is looked after without you holding all the threads. Held to the same House standard as every service we arrange."
- Proof line 1: "Four disciplines, one coordinated plan"
- Proof line 2: "No lock-in, change the rhythm anytime"
- Proof line 3: "Serving London and the Home Counties"
- Hero image alt: "A well-kept garden and home, cared for on one coordinated plan"
- Planning panel eyebrow: "Plan your care"
- Planning panel title: "See times and prices."
- Panel field label: "Plan" (value "Home & Garden")
- Panel field label: "Your postcode" — placeholder "e.g. SW1A 1AA"
- Panel CTA: "See times and prices" (→ #open-booking-form)
- Panel phone line: "Prefer to talk? Call 0800 047 8738"
- Panel footer: "Powered by HoWA"

### 2. What's in the plan (disciplines)
- Eyebrow: "What's in the plan"
- Heading: "Four disciplines," + em "one household rhythm."
- Discipline — Gardening: "Seasonal maintenance, borders, lawns and waste handling, kept to a rhythm that suits the garden."
- Discipline — Window cleaning: "Interior and exterior glass on a regular cycle, with reach-and-wash for upper floors where access allows."
- Discipline — Cleaning: "A regular household clean, room by room, with products chosen for the surfaces and the people in the home."
- Discipline — Repairs: "The small jobs a home always gathers, handled by a vetted professional and logged against your record."
- Included column eyebrow: "Included as standard"
- Included column heading: "Everything" + em "coordinated."
- Included list:
  - "The services you choose, coordinated onto one schedule"
  - "One point of contact for the whole plan, not a different number per trade"
  - "One Home Record, so every visit, note and invoice sits in one place"
  - "Rated professionals, reviewed by clients after each visit"
  - "Change, pause or stop the rhythm whenever you like, with no lock-in"
- Not-included column eyebrow: "Not included as standard"
- Not-included column heading: "Clear" + em "before you plan."
- Not-included list:
  - "Materials, parts and green waste beyond the agreed plan, always itemised in your price."
  - "Regulated works needing separate certification, referred to a named specialist."
  - "One-off deep cleans, end-of-tenancy or major garden projects, quoted separately."
  - "VAT treatment is shown in your price summary, never hidden."

### 3. How it works
- Eyebrow: "How it works"
- Heading: "One plan," + em "quietly kept."
- Step 1 — "Choose your services": "Pick the disciplines your home needs, from one to all four. Tell us your postcode so we can show real availability."
- Step 2 — "We build one schedule": "We coordinate the visits into a single rhythm, weekly, fortnightly or seasonal, so the home is looked after without you managing it."
- Step 3 — "One point of contact": "A single person holds the plan. No repeating yourself to a different trade each time something needs arranging."
- Step 4 — "One record, kept for you": "Every visit, note and invoice lands in your Home Record, so the history of the home stays in one place, powered by HoWA."
- Closing line: "Recurring care is a rhythm, not a tier. Set it weekly, fortnightly or seasonal; there is nothing to lock into and you can change, pause or stop it whenever you like. Any minimum booking values and extras are shown before you confirm."

### 5. FAQs
- Eyebrow: "Questions"
- Heading: "Before you" + em "plan."
- FAQ: "Is this a subscription I have to commit to?" — "No. Home & Garden is a coordinated plan, not a locked contract. You set the rhythm, and you can change, pause or stop it whenever you like. You only ever pay for visits that happen."
- FAQ: "Can I start with just one or two services?" — "Yes. Begin with whatever the home needs most, then add disciplines when it suits you. The plan is built around you, not a fixed bundle."
- FAQ: "How is a coordinated plan priced?" — "Each service is priced on its own clear basis, per visit, per hour or per team, and shown before you confirm. Because the visits are coordinated, we will talk through the annual economics with you so you can see the value across the year before anything recurring is agreed."
- FAQ: "Who actually does the work?" — "Vetted, rated professionals working through the House, each reviewed by clients after the visit. The same standard applies to every discipline in the plan."
- FAQ: "What areas do you cover?" — "We work across London and the Home Counties and are expanding. Enter your postcode to see availability, or write to us if your area is not yet listed."

### Enquiry form (inline)
- Eyebrow: "Enquire"
- Headline: "Ask about a Home & Garden plan."
- Body: "Tell us about your home and garden and what you would like looked after. We come back to you personally, usually within one working day, or you can plan online in a couple of minutes."

### 6. Final CTA
- Statement: em "One conversation," + " and the whole home is looked after."
- CTA (filled): "See times and prices" (→ #open-booking-form)
- Note: "Booking, scheduling and your Home Record are powered by HoWA, so every visit, note, invoice and service history stays in one place."

---

## Shared service DATA
Files: `src/lib/services-data/index.ts`, `sub-services.ts`

### Charging basis phrases (`basisPhrase`)
- "per visit" → "Priced per visit"
- "per hour" → "Priced per hour"
- "per item" → "Priced per item"
- "per job" → "Priced per job"
- "quote" → "Priced on a quote"
- unset / CMS-hydrated → "Priced on enquiry"

### Trust badges (`SERVICE_TRUST_BADGES`, applied to every core service)
- "House & Garden 'The List'"
- "Guild of Master Craftsmen"
- "Carbon Neutral Certified"
- "Fully Insured & Accredited"
- "Safe Contractor Approved"

### Service areas (`SERVICE_AREAS`)
- London: Notting Hill, Kensington, Fulham, Brixton, Greenwich, Croydon
- Kent: Bromley, Orpington, Bexley, Dartford, Sevenoaks, Westerham

### Shared FAQ (`SERVICE_FAQ_SHARED`, appended to core-service FAQs)
- "Are you insured?" — "Yes. Every team is fully insured, vetted, and accredited. Proof of cover is available on request."
- "Do I need to be at the property?" — "No. Most clients share access instructions or a key code. We text before arrival and file a note to your Home Record after."
- "How fast can I book?" — "Usually within a few days for regular services. Urgent one-offs can sometimes be fitted next-day."
- "What's kept in my Home Record?" — "Every visit is logged: date, team, notes, photographs on request, products used. It compounds into a record of care."

### Verified review scores (`serviceReview`, placeholders)
- gardening 4.9 / 342 · window-cleaning 4.8 / 507 · cleaning 4.9 / 618 · gutter-cleaning 4.8 / 213 · handyman 4.8 / 289 · removals 4.9 / 174 · energy 4.9 / 156 · pet-care 5.0 / 231 · housekeeping 4.9 / 142 · default 4.8 / 120

---

## DATA · Gardening
File: `src/lib/services-data/index.ts`
- Name: "Gardening"
- Eyebrow: "Services · Gardening"
- Headline: "A garden you meant to have." (em "to have.")
- Lede: "Planting, maintenance, and seasonal care by gardeners who know the difference between a bay and a laurel."
- Included: "Garden tidies and clearance" · "Lawn care, mowing and edging" · "Hedge and boundary maintenance" · "Tree surgery and planting" · "Green waste removed by a licensed carrier"
- How: "Tell us about the garden, and your postcode" · "A clear, itemised price for the work" · "Book a one-off, or a regular seasonal rhythm" · "We arrive when arranged, and file the visit to your Home Record"
- Package — "One-off tidy" (tier one-off, **Priced per job / per job**): bestFor "pre-event or back-from-holiday"; inclusions "Overgrowth cut back, beds and paths cleared" / "Weeding, edging and a light prune" / "Green waste removed by a licensed carrier"; CTA bookNow
- Package — "Seasonal care" (tier care, **Priced per hour / per hour**): bestFor "ongoing monthly rhythm"; inclusions "Regular, season-aware visits" / "Green waste composted, removed by a licensed carrier" / "Battery and electric tools, quieter visits" / "Carbon neutral"; CTA bookNow
- Package — "Estate care" (tier steward, **Priced per hour / per hour**): bestFor "larger gardens, a fuller recurring rhythm"; inclusions "A fuller recurring rhythm, fortnightly or weekly" / "The same gardener through the seasons" / "Coordinated with window, gutter and cleaning care" / "Green waste composted, removed by a licensed carrier"; CTA waitlist
- FAQ: "Do you remove and dispose of all garden waste?" — "Yes. We are licensed waste carriers. Everything is removed, sorted, and disposed of responsibly."
- FAQ: "Can I mix one-off and subscription visits?" — "Absolutely. One-offs sit alongside a subscription rhythm without affecting it."
- FAQ: "What happens in winter?" — "Reduced cadence: monthly check-in, structural pruning, leaf clearance. The garden still needs someone."
- (+ shared FAQ)

## DATA · Window cleaning
- Name: "Window cleaning"
- Eyebrow: "Services · Window cleaning"
- Headline: "Light, properly let in." (em "properly let in.")
- Lede: "Pure water cleaning from the ground, powered by our electric fleet. No ladders, no harsh detergents, no streaks. Federation of Window Cleaners certified."
- Included: "All outside windows, frames and sills, front and back" · "Pure water cleaning, no harsh detergents, dries streak-free" · "Upper floors reached safely from the ground, no ladders against your walls" · "uPVC frames, sills and trim cleaned back to white" · "A note on any cracked or misted glass we spot"
- How: "Tell us your postcode and a little about the property" · "A fixed price for your property" · "Book a one-off, or a regular visit every month or two" · "A reminder the day before, and the visit filed to your Home Record"
- Package — "One-off clean" (tier one-off, **Priced per job / per job**): bestFor "a first look, or between scheduled visits"; inclusions "All outside windows, frames and sills" / "Front and back of the property" / "Pure water, streak-free finish"; CTA bookNow
- Package — "Monthly care" (tier care, **Priced per hour / per hour**): bestFor "streets with regular rain or dust"; inclusions "The same trained team, visit after visit" / "A confirmed visit window, with notice before we arrive" / "Real-time arrival tracking"; CTA bookNow
- FAQ: "Are you insured?" — "Yes. Every team member is fully insured, with Federation of Window Cleaners certification."
- FAQ: "How do you clean upper floors?" — "We reach the upper floors from the ground with a water-fed pole, so no ladders lean against your walls."
- (+ shared FAQ from index 1 onward)

## DATA · Cleaning
- Name: "Cleaning"
- Eyebrow: "Services · Cleaning"
- Headline: "A house that feels cared for." (em "that feels cared for.")
- Lede: "Trained, uniformed cleaners using plant-based products that lift grime without leaving a chemical note in the air. Electric fleet, battery-powered tools, fragrance-free on request."
- Included: "Full-home clean, kitchens, bathrooms, living spaces, bedrooms" · "Plant-based, low-tox products" · "Battery-powered, low-noise equipment, we bring everything" · "Wood, tile, carpet and laminate floors, each cleaned the right way" · "Window insides, skirting boards, light switches, door handles" · "Optional inside-oven and inside-fridge deep clean"
- How: "Tell us the home, the rooms, and the products you prefer" · "We set a plan around your priorities, room by room" · "A vetted team arrives on time, bringing everything they need" · "We walk the work with you and file a note to your record"
- Package — "One-off clean" (tier one-off, **Priced per job / per job**): bestFor "pre-arrival, post-guests, estate agent viewings"; inclusions "A single deep clean, top to bottom" / "Kitchens and bathrooms, surfaces, hob and descale" / "Floors vacuumed and mopped throughout"; CTA bookNow
- Package — "Weekly care" (tier care, **Priced per hour / per hour**): bestFor "working households and family homes"; inclusions "Weekly or fortnightly, the same trusted cleaner" / "Plant-based, low-tox products as standard" / "DBS-checked, insured and reference-verified" / "No long contract, change or pause whenever you like"; CTA bookNow
- Package — "Whole-home care" (tier steward, **Priced per hour / per hour**): bestFor "larger homes and listed buildings"; inclusions "Everything in weekly care, for larger homes" / "Deep cleaning, top to bottom" / "Coordinated with garden, windows and gutters" / "Full public liability and accidental-damage cover"; CTA waitlist
- FAQ: "Can I choose my own products?" — "Yes. Note your preferences in your Home Record and the team will follow them. We default to House-standard, fragrance-free ranges."
- FAQ: "What about key access?" — "Most clients share a key code or a lockbox code. We text before arrival and never share access with anyone outside the team."
- (+ shared FAQ)

## DATA · Gutter cleaning
- Name: "Gutter cleaning"
- Eyebrow: "Services · Gutter cleaning"
- Headline: "A small job that saves a large one." (em "that saves a large one.")
- Lede: "Gutters cleared from the ground with a vacuum system and a camera check. Clears blockages, leaves, moss and bird mess. Safe and ladder-free."
- Included: "Full gutter clear from the ground, front and back" · "A camera check to confirm every gutter is clear" · "Downpipes cleaned and checked for blockages" · "A note on any repairs needed, loose brackets, splits or poor drainage"
- How: "Tell us about the property and how we get access" · "A fixed quote based on your postcode and the property" · "Typically seen within a week, twice a year if scheduled" · "A text before we arrive, no need to be home"
- Package — "One-off clear" (tier one-off, **Priced per job / per job**): bestFor "first visits, or after a big storm"; inclusions "Full gutter clear, front and back" / "Downpipes cleaned and checked for blockages" / "Filed to your Home Record"; CTA bookNow
- Package — "Twice-yearly care" (tier care, **Priced per hour / per hour**): bestFor "most British homes"; inclusions "Autumn and spring visits" / "Downpipes cleaned and checked each visit" / "A note on any repairs the gutters need" / "Filed to your Home Record"; CTA bookNow
- FAQ: "How often should gutters be cleaned?" — "At least twice a year, autumn after the last leaves, and spring before heavy rain. Properties near trees may need quarterly."
- FAQ: "Can you repair damaged gutters?" — "We flag issues in the condition report. For replacements we introduce you to a trusted roofer through the House."
- (+ shared FAQ). No sub-services.

## DATA · Handyman
- Name: "Handyman"
- Eyebrow: "Services · Handyman"
- Headline: "The small fixes that keep a house running." (no em)
- Lede: "General repairs, furniture assembly, picture hanging, shelf fitting, and the odd jobs a house always needs. Fully insured, on time."
- Included: "Furniture assembly, flat-pack, beds, wardrobes" · "Picture hanging, mirror mounting, and shelf fitting" · "TV wall-mounting and cable management" · "Door hanging, lock changes, and handle replacement" · "General repairs, cupboard doors, toilet seats, shower screens" · "Baby-proofing, cat flaps, alarm installation" · "Painting and decorating touch-ups" · "Decking repairs and garden gate fixes"
- How: "Describe the job, photos or a short video are usually enough" · "A fixed quote, VAT included" · "The team arrives with the tools and materials for the job" · "The work is photographed and filed to your Home Record"
- Package — "By the hour" (tier one-off, **Priced per hour / per hour**): bestFor "quick fixes and single tasks"; inclusions "Fully equipped for the task" / "All standard tools and fixings included" / "Minimum one-hour booking" / "Waste removal available on request"; CTA bookNow
- Package — "Half-day visit" (tier one-off, **Priced per job / per job**): bestFor "a list of small jobs in one go"; inclusions "Up to four hours on site" / "Multiple tasks in one visit" / "All tools and standard fixings included"; CTA bookNow
- Package — "Whole-home care" (tier steward, **Priced per hour / per hour**): bestFor "larger homes with ongoing maintenance needs"; inclusions "Coordinated with cleaning, garden and window care" / "A dedicated handyperson who knows your home" / "Booked and tracked in your Home Record"; CTA waitlist
- FAQ: "Do I need to be home?" — "An adult should be present while work is carried out. If you have a regular key arrangement on file in your Home Record, we can discuss access for pre-agreed tasks."
- FAQ: "Do you remove waste?" — "Yes, waste removal can be arranged. We'll confirm at quoting stage whether it's included or charged separately."
- FAQ: "Do you need to visit before quoting?" — "Not usually. Photos or a short video are enough for most jobs. For larger or structural work, we'll arrange a site visit."
- FAQ: "What's your cancellation policy?" — "Cancellations must be made 48 hours before the booking. Refund terms apply, full details in your booking confirmation."
- (+ shared FAQ). Note: `recurring: false`.

## DATA · Removals
- Name: "Removals"
- Eyebrow: "Services · Removals"
- Headline: "Moving, without the dread." (no em)
- Lede: "Carbon-neutral house moves, packing, and storage coordination. Uniformed teams, fully insured, careful with the things that matter."
- Included: "Small and medium house moves across London and Kent" · "Packing and wrapping, full or partial, your choice" · "Large-item shop collection and delivery" · "Local pick-up and drop-off for single pieces" · "Moving items to and from storage" · "Home organising before or after a move"
- How: "Tell us what's moving, where from, where to" · "Fixed quote based on volume, distance, and access" · "Book at least two weeks ahead, short notice possible" · "Uniformed team arrives on time, fully insured, electric fleet"
- Package — "Local pick-up & drop-off" (tier one-off, **Priced on a quote / quote**): bestFor "single items, shop collections, storage runs"; inclusions "Loaded, transported and unloaded with care" / "Wrapping and protection included" / "Door-to-door within the service area" / "Flexible scheduling, including weekends"; CTA quoteEntry
- Package — "Small house move" (tier one-off, **Priced on a quote / quote**): bestFor "flats, studios, and one-bed moves"; inclusions "Full load and unload" / "Blanket wrapping for furniture" / "Dismantling and reassembly of beds and tables" / "All items insured in transit"; CTA quoteEntry
- Package — "Full house move" (tier one-off, **Priced on a quote / quote**): bestFor "family homes and larger properties"; inclusions "Packing service available (full or partial)" / "Everything loaded, moved and placed in the right rooms" / "Storage coordination if needed" / "Post-move home organising available"; CTA quoteEntry
- FAQ: "Are my items insured during the move?" — "Yes. All items are fully insured in transit, with certification proof available on request."
- FAQ: "How far in advance should I book?" — "Two weeks is ideal. The team can sometimes fit short-notice moves, but availability isn't guaranteed."
- FAQ: "Can you pack for me?" — "Yes. We offer full or partial packing. Let us know which items you'd like us to handle and which you'll pack yourself."
- FAQ: "Do you cover areas outside London?" — "We serve London and northern Kent as standard. For moves further afield, get in touch and we'll confirm."
- (+ shared FAQ from index 2 onward). Note: `recurring: false`.

## DATA · Energy & Electrical
- Name: "Energy & Electrical"
- Eyebrow: "Services · Energy & Electrical"
- Headline: "Power that works for the home." (no em)
- Lede: "Solar installation, EV charging, electrical repairs, and safety inspections. NICEIC-registered, fully certified, electric fleet."
- Included: "Domestic and commercial electrical installation" · "Solar panel installation and battery storage" · "EV charger installation (all major brands)" · "Full and partial rewires" · "Electrical testing, inspection, and certification (EICR)" · "Fault finding and emergency repairs"
- How: "Describe the job or send photos, we'll price it from those where we can" · "A detailed, itemised quote once we have scoped the work" · "NICEIC-registered electrician assigned to the job" · "Certification and paperwork filed to your Home Record"
- Package — "Call-out & repair" (tier one-off, **Priced per job / per job**): bestFor "faults, outages, and urgent fixes"; inclusions "Diagnostic and repair in one visit where possible" / "All parts and labour included in quote" / "Certification issued for all notifiable work"; CTA bookNow
- Package — "Project work" (tier one-off, **Priced on a quote / quote**): bestFor "installations, rewires, and new builds"; inclusions "Full project scoping and design" / "NICEIC-registered installation" / "Building control notification handled" / "Completion certificate and Home Record update"; CTA quoteEntry
- Package — "Testing & inspection" (tier one-off, **Priced per job / per job**): bestFor "landlords, buyers, and five-year compliance"; inclusions "Full EICR (Electrical Installation Condition Report)" / "Portable appliance testing available" / "Written report with recommendations" / "Filed to your Home Record for future reference"; CTA bookNow
- FAQ: "Are your electricians qualified?" — "Yes. Every electrician is NICEIC-registered and fully insured. Certification is issued for all notifiable work."
- FAQ: "Can you install solar panels?" — "Yes. We handle the full process: site assessment, design, installation, DNO notification, and MCS certification."
- FAQ: "Do I need an EICR?" — "Landlords must have a valid EICR every five years. Homeowners should test every ten years or when buying a property."
- FAQ: "Can you install an EV charger?" — "Yes. We install all major brands (Ohme, Pod Point, Wallbox, Tesla) and handle the OZEV grant application where eligible."
- (+ shared FAQ from index 1 onward). Note: `recurring: false`.

## DATA · Pet Care
- Name: "Pet Care"
- Eyebrow: "Services · Pet Care"
- Headline: "Because the dog is part of the house." (no em)
- Lede: "Trusted, insured dog walking and pet sitting by experienced handlers. GPS-tracked walks, photo updates, and visit notes filed to your Home Record."
- Included: "Daily, weekly, or ad-hoc dog walking" · "Pet sitting, in your home or in the sitter's" · "GPS-tracked walks with live route sharing" · "Photo and behaviour updates after every visit" · "Feeding, medication, and routine care as instructed" · "All handlers DBS-checked, insured, and experienced"
- How: "Tell us about your pet, breed, temperament, routine" · "We match you with a handler based on fit, not just location" · "A meet-and-greet before the first walk or sit" · "Book a service, single visits or a recurring rhythm"
- Package — "Single walk" (tier one-off, **Priced per job / per job**): bestFor "occasional days out or late meetings"; inclusions "30- or 60-minute walk" / "GPS-tracked route" / "Photo and behaviour update" / "Logged in your Home Record"; CTA bookNow
- Package — "Weekly walking" (tier care, **Priced per hour / per hour**): bestFor "working households with a regular schedule"; inclusions "Five walks per week, same handler" / "Consistent time slot and route" / "Key access held on your Home Record" / "Monthly report filed to record"; CTA bookNow
- Package — "Pet sitting" (tier one-off, **Priced per job / per job**): bestFor "holidays, weekends away, emergencies"; inclusions "In-home care (yours or the sitter's)" / "Feeding, walks, and medication as directed" / "Daily photo and status update" / "Meet-and-greet beforehand"; CTA bookNow
- FAQ: "Are your handlers insured?" — "Yes. Every handler carries public liability insurance and is DBS-checked. Proof available on request."
- FAQ: "Can you walk reactive dogs?" — "In some cases, yes. We'll assess during the meet-and-greet and match you with a handler experienced in reactive behaviour."
- FAQ: "What happens if my dog is unwell?" — "The handler contacts you immediately. If they can't reach you, they follow your emergency vet instructions on file in your Home Record."
- FAQ: "Do you walk in groups?" — "Solo walks only, unless you specifically request a group walk with a known companion dog."
- (+ shared FAQ from index 2 onward).

---

## DATA · Sub-services
File: `src/lib/services-data/sub-services.ts`
Sub-services with only a `name` + `lede` are listed compactly; those with full body/whyChoose/included/faq are expanded.

### Gardening sub-services
- Garden clearance — lede "Reclaim an overgrown space. We clear, sort, and remove, leaving a garden ready for what comes next."
  - Body: "Whether you have just moved in, are preparing to sell, or simply haven't been able to keep up with an increasingly overgrown garden, a professional clearance is the first step back. Our horticulturally trained team assesses what should stay, what should go, and what needs care rather than removal. All green waste is removed by licensed carriers. The garden is left clean, raked, and ready for replanting or a design brief."
  - Why choose: "Horticulturally trained team, we don't just cut, we assess" / "Structured approach: assess, clear, remove, prepare" / "Licensed waste carriers, responsible disposal as standard" / "Discreet, efficient, and respectful of your neighbours"
  - Included: "Full site assessment before work begins" / "Cutting back of overgrown shrubs, hedges, and borders" / "Removal of dead plants, debris, and green waste" / "Light ground preparation for future planting" / "Green waste removed by a licensed carrier"
  - FAQ: "Do you remove and dispose of all garden waste?" — "Yes. We are licensed waste carriers. Everything is removed, sorted, and disposed of responsibly, never fly-tipped."
  - FAQ: "How do you approach larger or heavily overgrown gardens?" — "We start with a structured assessment. For larger spaces we may stage the clearance over two visits, so the work is done properly and nothing worth keeping is lost."
  - FAQ: "Can you prepare a garden for sale or letting?" — "Yes, we regularly prepare gardens for estate agent photography and viewings. We can also coordinate with Willow Alexander Gardens for planting if you want to go further."
- Garden tidy — "A single visit to bring the garden back to order. Weeding, edging, pruning, and a clean finish."
- Lawn mowing — "Regular or one-off mowing, edging, and stripe. Blades set to the right height for the season."
- Lawn care — "Feeds, aerating, scarifying, and weed treatment. The work behind a lawn that looks after itself."
- Hedge & boundary maintenance — "Formal hedges trimmed to line. Informal boundaries shaped with the season. All cuttings removed."
- Planting — "Seasonal beds, border refreshes, and specimen planting. We supply or plant what you bring."
- Tree work — "Crown reduction, deadwood removal, and light felling up to 4 metres. Larger jobs quoted on site."
- Turf laying — "New lawns from quality turf, properly prepared. Ground levelled, turf laid, edges cut, first water done."
- Garden maintenance subscriptions — lede "Scheduled seasonal care, the same gardener, on a rhythm. Weekly, fortnightly, or monthly." / body "A regular rhythm is the most popular way to keep a garden running. You pick how often. We assign a named gardener who gets to know the garden. Visits are booked and logged to your Home Record. No per-visit admin, no surprises."
- Jet washing — "Paths, patios, decking, and driveways. Professional equipment, controlled pressure, no surface damage."

### Window cleaning sub-services
- Regular window cleaning — lede "Scheduled monthly or bi-monthly cleans. The same team, the same day, text before arrival."
  - Body: "Pure water cleaning for all outside windows, frames and sills. Booked on a rhythm that suits the property, monthly for busier streets, every other month for quieter ones. You don't need to be home. We let you know before we come, arrive when we said, and file a note to your Home Record after each visit."
  - Why choose: "Pure water, no harsh detergents, no residue, no streaks" / "Frames and sills included as standard" / "Upper floors reached from the ground, no ladders" / "Comprehensive public liability insurance"
  - Included: "All outside windows, frames and sills" / "Front and back of the property" / "A reminder the day before we come" / "Logged in your Home Record after each visit"
  - FAQ: "Do I need to be at the property?" — "No. Most clients pass on a gate code or leave access instructions. We let you know before we arrive."
  - FAQ: "How fast can I book?" — "Usually within a few days. For urgent one-offs we can sometimes fit you in next-day."
- One-off window cleaning — "A single visit to restore clarity. Same equipment and standard as the regular service, no commitment."
- Gutter cleaning (window-group) — lede "Gutters cleared from the ground, front and back. Twice a year is ideal."
  - Body: "Blocked gutters cause damp, staining and pest access. We clear all gutters from the ground with a vacuum pole, so no ladders lean on your walls. We note any loose brackets or splits and file the visit to your Home Record. Most homes need this twice a year, once after the last leaves and once before the winter rain."
  - Why choose: "Cleared from the ground with a vacuum pole, no ladders on walls" / "Downpipe checks and blockage clearance included" / "Flags any repairs early, before damp sets in" / "Filed to your Home Record"
  - Included: "Full gutter clear, front and back" / "Downpipes checked and cleared" / "A note on any brackets, splits or drainage that need attention" / "Green waste bagged and removed"
  - FAQ: "How often should gutters be cleaned?" — "At least twice a year, autumn after the last leaves, and spring before heavy rain. Properties near trees may benefit from quarterly."
  - FAQ: "Can you repair damaged gutters?" — "We flag issues in the condition report. For replacements and re-seating we introduce you to a trusted roofer through the House."
- Softwashing — "Low-pressure exterior cleaning for render, cladding, and delicate stonework. No jet-wash damage."
- Jet washing — "Paths, patios, driveways, and decking. Professional pressure washing with controlled technique. No surface damage."
- Commercial window cleaning — "Offices, retail, and multi-unit buildings. Scheduled contracts, access equipment, and insurance documentation provided."
- Commercial gutter cleaning — "Industrial SkyVac systems for commercial properties. Scheduled maintenance contracts with photographic reporting."
- Commercial softwashing — "Low-pressure exterior cleaning for commercial facades, render, and cladding. Planned maintenance or one-off restoration."
- Commercial exterior maintenance — "Full exterior care packages for businesses. Windows, gutters, fascias, and pressure washing on a managed schedule."

### Cleaning sub-services
- Regular cleaning — lede "Weekly or fortnightly domestic care. Same team each visit, your preferences on file in your Home Record."
  - Body: "Our regular cleaning service is built on consistency. We assign a named team who gets to know the home, your surfaces, your products, your preferences. Visits are booked and logged with a short note after each one. If your regular cleaner is away, we send a cover team briefed from your record."
  - Why choose: "The same trusted cleaner, getting to know your home" / "Plant-based, low-tox products, fragrance-free on request" / "DBS-checked, insured and reference-verified" / "No long contract, change or pause whenever you like"
  - Included: "Full ground-floor and bedroom clean" / "Kitchen surfaces, hob, and sink" / "Bathroom descale and sanitisation" / "Floors vacuumed and mopped, each the right way" / "Logged in your Home Record after each visit"
  - FAQ: "Can I use my own products?" — "Of course. If you prefer specific brands or fragrance-free products, note it in your Home Record and the cleaner will follow it."
- One-off cleaning — "A single deep clean for move-in, post-guests, or estate agent viewings. No commitment, full standard."
- End-of-tenancy cleaning — "Inventory-standard clean for landlords and tenants. Oven, carpets, and behind-furniture deep work included."
- After-building cleaning — "Post-renovation deep clean. Dust extraction, paint-spot removal, and surface-by-surface restoration."
- Spring clean — "A seasonal reset, windows inside, skirting, light switches, under-furniture, and the things the weekly misses."

### Gutter cleaning sub-services
- None (`GUTTER_CLEANING_SUBS` is empty).

### Handyman sub-services
- Furniture assembly — lede "Flat-pack, beds, wardrobes, desks. Assembled properly, in the right room, packaging removed."
  - Body: "From a single bookcase to a full house of flat-pack, our handypeople arrive with the tools and patience to assemble everything correctly. We check every fitting, anchor anything that should be wall-fixed, and remove all packaging when we leave. If the instructions are missing, we don't need them."
  - Why choose: "Experienced with every major flat-pack brand" / "Wall-anchoring for heavy or tall items as standard" / "Packaging removed and recycled" / "Usually same-week availability"
  - Included: "Assembly of all flat-pack and part-assembled furniture" / "Wall-anchoring where safety requires it" / "Packaging removal and recycling" / "Logged in your Home Record"
  - FAQ: "Can you assemble furniture I've already started?" — "Yes. We'll assess what's been done and finish it properly."
  - FAQ: "Do you supply the furniture?" — "No, but we can collect large items from shops and assemble on the same visit."
- Picture hanging & mirror mounting — lede "Hung level, at the right height, into the right fixing. Heavy mirrors and gallery walls included."
  - Body: "Whether it's a single frame or a full gallery wall, we measure, mark, and hang with the correct fixings for the wall type. Heavy mirrors and artwork are anchored securely. We bring a laser level, a range of fixings, and the experience to know what belongs where."
  - Why choose: "Laser-levelled hanging for perfect alignment" / "Correct fixings for plasterboard, brick, or stud walls" / "Heavy mirrors and oversized art handled safely" / "Gallery wall layout service available"
  - Included: "Measuring, marking, and levelling" / "All fixings supplied (standard sizes)" / "Hanging and adjustment" / "Wall-type assessment for correct anchoring"
- Shelving installation — "Floating shelves, bracketed shelves, and storage units. Level, secure, and rated for what you'll put on them."
- Painting & decorating — "Touch-ups, single rooms, and feature walls. Clean edges, proper prep, dust sheets down."
- TV wall mounting — "Secure bracket fitting, cable management, and tidy finish. All screen sizes, all wall types."
- Door hanging & lock changes — "Internal doors hung, external locks changed, handles replaced. Measured, fitted, and finished."
- General repairs — "Cupboard doors, toilet seats, shower screens, window handles, and the jobs that pile up. One visit, all done."
- Baby-proofing — "Stair gates, corner guards, socket covers, and furniture anchoring. A safe home before the crawling starts."
- Jet washing — "Paths, patios, driveways, and decking. Professional equipment, controlled pressure, no surface damage."
- Alarm installation — "Wired and wireless alarm systems installed, tested, and configured. Sensors, keypads, and app setup included."
- Bed assembly — "Divan, frame, bunk, and cabin beds assembled on site. Headboards mounted, slats set, mattress placed."
- Cat flap installation — "Fitted into timber, UPVC, or glass doors. Microchip flaps wired and programmed to your cat."
- Christmas light installation & removal — "Exterior and interior lighting installed safely. Timers set, cabling secured, removal booked for January."
- Loft organisation — "Boarding, shelving, lighting, and labelling. Turn unused roof space into accessible, organised storage."

### Removals sub-services
- Small house move — lede "Flats, studios, and one-bed moves. Load, transport, unload. Blanket-wrapped, fully insured."
  - Body: "Our small move service covers everything from a studio flat to a one-bedroom home. Your belongings are loaded, transported and unloaded with blanket wrapping for all furniture. Beds and tables are dismantled and reassembled. Everything is insured in transit. We arrive on time, in uniform, and leave the new place ready to live in."
  - Why choose: "A clean, electric van and careful handling" / "Blanket wrapping and furniture protection included" / "Dismantling and reassembly of beds and tables" / "Fully insured in transit with certification on request"
  - Included: "Full load and unload at both ends" / "Blanket wrapping for all furniture" / "Dismantling and reassembly of key items" / "Transit insurance for all items" / "Logged in your Home Record"
  - FAQ: "How long does a small move take?" — "Most small moves are completed in half a day. We'll confirm timing at quoting stage based on volume and distance."
  - FAQ: "Can I add packing to a small move?" — "Yes. Let us know which items you'd like us to pack and we'll include it in the quote."
- Large item shop collection — "We collect from the shop and deliver to your door. Sofas, appliances, and anything that won't fit in the car."
- Local pick-up & drop-off — "Single items or small loads moved across London and Kent. Flexible scheduling, same-week availability."
- Moving items to storage — "We load, transport, and place your items in storage. Coordination with your facility included."
- Home organising — "Pre-move declutter or post-move setup. Lofts, garages, wardrobes, and the rooms that need thinking through."
- Packing service — "Full or partial packing by our team. Boxes, wrapping, labelling, and careful handling of fragile items."

### Energy sub-services
- Solar installation — lede "Roof-mounted and in-roof solar panel systems. Full site assessment, design, installation, and MCS certification."
  - Body: "We handle the complete solar journey: structural assessment, panel layout design, scaffolding, installation, DNO grid connection application, and MCS certification. Battery storage systems (Tesla Powerwall, GivEnergy, Fox ESS) can be added at install or retrofitted later. Every system is designed for the specific property, not a generic template."
  - Why choose: "MCS-certified installation, qualifies for Smart Export Guarantee payments" / "Full structural and electrical assessment before any work begins" / "Battery storage integration available at install or later" / "DNO application and grid connection handled for you"
  - Included: "Site assessment and system design" / "Scaffolding and installation" / "Inverter, mounting, and all electrical work" / "DNO notification and MCS certification" / "System monitoring setup and handover"
  - FAQ: "How long does installation take?" — "Most residential installations take 2-3 days. Larger systems or battery additions may take an extra day."
  - FAQ: "Will I need planning permission?" — "Most domestic solar installations are permitted development. We check and advise before quoting."
- EV charger installation — lede "Home and workplace EV charger installation. All major brands, OZEV grant applications handled where eligible."
  - Body: "We install Ohme, Pod Point, Wallbox, Tesla, Zappi, and other leading chargers. Installation includes dedicated circuit, consumer unit upgrade if needed, and full testing. We handle the OZEV grant application where your property qualifies."
  - Why choose: "All major charger brands installed and supported" / "OZEV grant application handled where eligible" / "Dedicated circuit with RCD protection as standard" / "Load balancing available for multi-charger properties"
  - Included: "Charger supply and installation" / "Dedicated circuit from consumer unit" / "Full electrical testing and certification" / "App setup and smart scheduling walkthrough" / "OZEV grant application (if eligible)"
- Electrical repairs — "Fault finding, socket and switch replacement, circuit repairs, and emergency call-outs. Same-day availability."
- Commercial electrical services — "Office fit-outs, retail lighting, three-phase installations, and commercial maintenance contracts."
- New builds & renovations — "First and second fix electrical for new builds, extensions, and full renovations. Building control sign-off included."
- Electrical testing & inspections — "EICR reports, PAT testing, and pre-purchase electrical inspections. Certification filed to your Home Record."

### Pet care sub-services
- Dog walking — lede "Solo walks by experienced, insured handlers. GPS-tracked routes, photo updates, and behaviour notes after every visit."
  - Body: "Every walk is solo unless you request otherwise. Your handler gets to know the dog's temperament, favourite routes, and recall level. Walks are GPS-tracked with a live map you can check from your phone. After each walk, you receive a photo, a route summary, and a short behaviour note, all filed to your Home Record."
  - Why choose: "Solo walks, your dog gets full attention, every time" / "GPS-tracked with live route sharing" / "Same handler wherever possible for consistency" / "All handlers DBS-checked and fully insured"
  - Included: "30-minute or 60-minute solo walk" / "GPS route tracking and live map" / "Photo and behaviour update after each walk" / "Key access held on your Home Record" / "Logged in your Home Record"
  - FAQ: "Can I track the walk live?" — "Yes. You'll receive a live GPS link at the start of each walk."
  - FAQ: "What if my dog doesn't get on with the handler?" — "We'll reassign to a different handler. The meet-and-greet is designed to catch this before regular walks begin."
- Dog sitting — lede "In-home care while you're away. Feeding, walks, medication, and daily updates. Your home or the sitter's."
  - Body: "Our sitters stay in your home or host your dog in theirs, whichever suits the dog's temperament. They follow your instructions for feeding, medication, exercise, and bedtime routine. You receive daily photo updates and can message the sitter directly through the platform. Emergency vet details are held on file."
  - Why choose: "In-home care, your dog stays in familiar surroundings" / "Feeding, medication, and routine followed exactly" / "Daily photo and status updates" / "Emergency vet instructions on file in your Home Record"
  - Included: "Overnight or daytime care" / "All walks, feeds, and medication as directed" / "Daily photo and behaviour update" / "Meet-and-greet before the first sit" / "Emergency vet protocol on file"
  - FAQ: "Can the sitter stay at my house?" — "Yes. Most clients prefer in-home sitting so the dog stays in familiar surroundings. We can also host at the sitter's home if you prefer."
  - FAQ: "What about cats or other pets?" — "We can arrange care for cats and small animals alongside dogs. Let us know during booking."

---

## DATA · Requestable catalogue (quote-mode services)
The whole-home catalogue on the landing page. Each row: name / group / blurb / (note or "See prices" if bookable).
File: `src/lib/services-data/requestable.ts`

### Garden group
- Garden care (bookable → /services/gardening): "Lawns, borders and seasonal upkeep, one-off or on a rhythm."
- Garden clearance (bookable): "Overgrowth cut back, cleared and taken away by a licensed carrier."
- Hedges and seasonal cutting (bookable): "Hedges and boundaries cut back to shape while the season allows."
- Planting and garden improvements (bookable): "Beds replanted, borders reworked, and plants chosen for the soil."
- Trees and specialist garden work (bookable): "Pruning, crown reductions and removals by qualified hands."
- Lawn care and turfing (bookable): "Cutting, edging, feeds, scarifying and new turf laid."
- Landscaping and garden build: blurb "Patios, paths, raised beds, steps and the harder structure of a garden." / note "We will ask for photographs and rough measurements, then arrange a site visit to price it."
- Fencing and decking: blurb "New fencing, repairs, gates and timber decking." / note "Send photographs and a rough run length and we will come back with an estimate."
- Irrigation and garden watering: blurb "Automatic watering for beds, pots and lawns." / note "We will ask about the garden size and water supply before quoting."
- Garden lighting: blurb "Lighting for paths, planting and outdoor rooms." / note "Usually needs a site visit, and an electrician where it is mains-wired."

### Home group
- Cleaning and housekeeping (bookable → /services/cleaning): "Regular, one-off, spring and end-of-tenancy cleaning."
- Handyman and repairs (bookable): "Hourly and half-day visits for the list that never gets done."
- Painting and decorating (bookable): "Interior and exterior decorating, prepared properly."
- Oven and appliance cleaning: blurb "Ovens, hobs, extractors and ranges stripped and cleaned." / note "Tell us the make and how many appliances and we will come back with a fixed price."
- Carpet and upholstery cleaning: blurb "Carpets, rugs, sofas and curtains deep cleaned." / note "We will ask for room sizes or item counts to price it."
- Pest control: blurb "Mice, rats, wasps, moths and the things nobody wants to ring about." / note "Tell us what you have seen and where, and we will get someone to you quickly."
- Plumbing: blurb "Leaks, taps, toilets, radiators and bathroom work." / note "Photographs help enormously. Send them and we will tell you what it needs."
- Heating and boilers: blurb "Servicing, repairs, gas safety certificates and replacements." / note "We will ask for the boiler make, model and last service date."
- Electrical work and energy (→ /services/energy, request): blurb "Sockets, lighting, consumer units, fault finding, EICRs and EV charge points." / note "All electrical work is carried out by a qualified, registered electrician."
- Housekeeping (→ /services/housekeeping, request): blurb "A discreet ongoing presence: laundry, linen, kitchen and the daily order of a home." / note "Tell us the days and hours you have in mind and the size of the household."
- Flooring: blurb "Wood, vinyl, tile and carpet supplied and fitted." / note "Send room dimensions and what is down now and we will come back with options."
- Plastering and tiling: blurb "Skimming, patching, re-plastering and wall or floor tiling." / note "Photographs and rough areas let us price this without a first visit."
- Damp, mould and condensation: blurb "Diagnosis first, then the work that actually fixes the cause." / note "We will always look at the cause before quoting for treatment."
- Appliance repair: blurb "Washing machines, dishwashers, fridges and ovens." / note "Tell us the make, model and fault code if there is one."
- Locks and security: blurb "Lock changes, snapped keys, window locks and door security." / note "If you are locked out right now, call the House rather than filling this in."

### Exterior group
- Window cleaning (bookable → /services/window-cleaning): "Reach-and-wash exteriors, with interiors on request."
- Gutter cleaning (bookable → /services/gutter-cleaning): "Vacuum-cleared from the ground, with before and after photographs."
- Pressure and exterior cleaning (bookable → jet-washing): "Paths, patios, decking and driveways brought back."
- Softwashing and render cleaning (bookable → softwashing): "Render, cladding and painted masonry cleaned at low pressure."
- Gutter and downpipe repair: blurb "Leaks, sagging runs, brackets and replacement guttering." / note "Send photographs of the run and we will tell you whether it needs repair or replacement."
- Roofing and roof repairs: blurb "Slipped tiles, flashing, flat roofs and leak tracing." / note "We will ask for photographs from the ground and arrange an inspection."
- Chimney sweeping: blurb "Swept, checked and certificated for your insurer." / note "Tell us the fuel type and when it was last swept."
- Driveways and paving: blurb "New driveways, resurfacing, edging and drainage." / note "This needs a site visit. Send photographs and rough dimensions to start."
- Solar panel cleaning: blurb "Panels cleaned so they earn what they are supposed to." / note "We will ask how many panels and the roof height."

### Moving & clearance group
- Removals (→ /services/removals, note): blurb "Local and longer moves, with packers who handle period interiors carefully." / note "Tell us where from, where to, and roughly how many rooms."
- Packing and unpacking: blurb "Packed properly at one end, put away at the other." / note "Usually booked alongside a move, but available on its own."
- Storage: blurb "Short and long-term storage, collected and returned." / note "We will ask roughly how much and for how long."
- House and loft clearance: blurb "Whole properties, single rooms, lofts and garages cleared." / note "Photographs are the fastest way to a price. Everything goes to a licensed carrier."
- Waste and rubbish removal: blurb "Single loads taken away without hiring a skip." / note "Send a photograph of the pile and we will price it by volume."
- Man and van (bookable → local-pick-up-drop-off): "Single items, shop collections and local drop-offs."

### Trades & specialists group
- Pet care and dog walking (→ /services/pet-care, note): blurb "Walkers and sitters who learn the routine and the door code." / note "Tell us the animal, the routine and the days you need covered."
- EV charger installation: blurb "Home charge points, installed and certificated." / note "We will ask about your consumer unit and where the car parks."
- Solar and home battery: blurb "Generation and storage, sized to how the house actually runs." / note "We will look at your usage before recommending anything."
- Smart home and networking: blurb "Wi-Fi that reaches, plus heating, lighting and door entry that behave." / note "Tell us the property size and what is already installed."
- Alarms and CCTV: blurb "Intruder alarms, cameras and door entry, installed and maintained." / note "We will ask what you already have and what you want covered."
- Interior design (bookable → /design/interiors): "A mapped first direction, then a named human studio."
- Garden design (bookable → /design/gardens): "A first concept and indicative budget, then the full plan."

---

## DATA · Requestable service detail pages (quote mode, ServiceDetail template)
These render through `ServiceDetail` in `mode="quote"`. Each entry has eyebrow, headline (+ em), lede, `included`, `how` steps, FAQ Q&As, and a `practical` block (duration / materials / access / parking / excluded). None publishes a price — every "How is this priced?" answer describes the method.

### Home group — File: `src/lib/services-data/detail-home.ts`

**Oven and appliance cleaning** (`recurring: true`)
- Eyebrow: "Services · Oven and appliance cleaning"
- Headline: "An oven returned to itself." (em "returned to itself.")
- Lede: "Ovens, hobs, extractors and range cookers stripped down, cleaned and rebuilt in your kitchen. For homes where the appliance has stopped looking like the one that was delivered."
- Included: "Oven dismantled where the model allows: door glass, shelves, runners, fans and back plate" / "Removable parts soaked in a heated tank outside the house, not in your sink" / "Cavity, seals and door reassembled and function-checked before we leave" / "Hobs, extractor filters, grills, microwaves and warming drawers cleaned on the same visit" / "Floor and worktop protected throughout, and the kitchen left ready to use"
- How: "Tell us the make, the type and how many appliances, with a photograph if you have one" / "We come back with a fixed price for that list, and confirm who is carrying out the work" / "You choose a date, and we confirm the arrival window the day before" / "The appliances are cleaned, rebuilt, tested and handed back to you in working order"
- FAQ: "How is this priced?" — "By appliance, not by hour. Tell us the make and how many pieces you want cleaned and we will give you a fixed price before anything is booked, so a stubborn oven does not become a longer bill."
- FAQ: "Is the house usable while you work?" — "The kitchen is out of use for the visit and there will be some smell of the cleaning products, though the caustic soaking happens outside. Most single ovens are back in service the same afternoon."
- FAQ: "Will you damage the oven?" — "Dismantling is limited to what the manufacturer intends to be removable, and older seals and printed door glass are checked first. If a part is already perished we will tell you before we touch it rather than after."
- FAQ: "Can you fix an oven that is not heating?" — "No, cleaning and repair are different visits. If we find a fault while cleaning we will note it and you can raise it with us as an appliance repair."
- Practical: duration "Two to four hours for a single oven, longer for a range or a full appliance list" / materials "All tanks, products and protective coverings brought with the team" / access "Someone at home to let us in, and a clear path to the appliance" / parking "A space near the door helps, as the soaking tank travels in the van" / excluded: "Repairs, spare parts and electrical or gas fault finding" / "Self-cleaning liners, which are damaged by the products used here" / "Whole-kitchen cleaning, cupboards and floors beyond the working area"

**Carpet and upholstery cleaning** (`recurring: true`)
- Eyebrow: "Services · Carpet and upholstery cleaning"
- Headline: "Fibres brought back, not soaked." (em "not soaked.")
- Lede: "Carpets, rugs, sofas, curtains and mattresses cleaned by a method chosen for the fibre rather than the machine that happens to be in the van. For homes with textiles worth keeping."
- Included: "Fibre and backing identified first, then hot water extraction or low-moisture cleaning selected accordingly" / "Pre-vacuum, pre-treatment of traffic lanes and spot work on marks before the main clean" / "Sofas, armchairs, dining chairs, curtains in situ and mattresses" / "Wool, silk and hand-knotted rugs handled by the method their construction allows" / "Furniture moved and protected, and drying times explained before we go"
- How: "Send room sizes or a list of the items, with photographs of any stains that worry you" / "We price the job and tell you which method suits the fibres and who will be carrying it out" / "A date is booked, and we confirm what needs moving before the team arrives" / "The work is done, the marks that lifted are shown to you, and drying guidance is left behind"
- FAQ: "How is this priced?" — "By room and by item, so a hallway and three seats is a different price from a whole floor. Give us the rooms or an item count and we will quote from that without needing to visit first."
- FAQ: "How long until we can walk on it?" — "Usually a few hours for low-moisture work and longer for hot water extraction, depending on the room and the weather. We will tell you what to expect on the day rather than promise a number now."
- FAQ: "Will every stain come out?" — "No. Dye, bleach, rust and old pet damage can permanently alter the fibre, and no clean reverses that. We will say which marks we expect to lift and which we do not before starting."
- FAQ: "Do we have to move the furniture?" — "Small and light pieces are moved by the team. Wardrobes, pianos, beds and anything on a fragile floor should be dealt with beforehand, and we will tell you which is which when we quote."
- Practical: duration "Two hours for a room or two, most of a day for a whole floor" / materials "Machines, solutions and protectors brought by the team" / access "Rooms cleared of small items, and a water point and power available" / parking "Parking close to the door, as hoses run from the van on larger jobs" / excluded: "Carpet repair, refitting, re-stretching and replacement" / "Flood and escape-of-water drying, which is a restoration job" / "Leather and antique upholstery restoration or re-covering"

**Pest control**
- Eyebrow: "Services · Pest control"
- Headline: "The call nobody wants to make." (em "nobody wants to make.")
- Lede: "Mice, rats, wasps, moths, fleas and the rest, dealt with discreetly and without drama. For households that want the problem understood and closed, not simply sprayed."
- Included: "An inspection of the affected rooms and the routes in, including voids, loft and drainage where reachable" / "Identification of what you actually have, which changes the treatment entirely" / "Treatment appropriate to the species, sited away from children and pets" / "Proofing recommendations for the entry points found, quoted separately if works are needed" / "Follow-up visits where the species requires a second or third treatment to break the cycle"
- How: "Tell us what you have seen, where, and when it started" / "We confirm who will attend and roughly when, and what the visit will cost" / "The property is inspected and treated on the same visit wherever possible" / "You get a note of what was found and what was used, plus any follow-up dates"
- FAQ: "How quickly can someone come?" — "Pest work is prioritised over most other enquiries, and wasps and rodents inside a home come first. We will not promise a fixed window until we have spoken to you and know where you are."
- FAQ: "How is this priced?" — "Usually per treatment programme rather than per hour, because rodents and fleas need a set number of visits to be resolved rather than moved. Proofing works are quoted separately once the entry points are known."
- FAQ: "Is it safe with children and pets in the house?" — "Treatments are placed and secured with that in mind, and you will be told which rooms to keep clear and for how long. Where a home has small children or animals we will say if a different approach is better."
- FAQ: "What if they come back?" — "Recurrence usually means an entry point is still open or a neighbouring property is the source, neither of which a treatment alone will fix. That is why the report names the routes in, and why proofing is often the real answer."
- Practical: duration "One to two hours per visit, with follow-ups where the species needs them" / materials "All treatments, traps and monitoring stations supplied" / access "Access to lofts, cupboards and under-sink voids, and pets kept clear during treatment" / parking "A space near the property, as equipment is carried in from the van" / excluded: "Building works, drain relining and structural proofing beyond simple sealing" / "Removal of a protected species, including bats and some nesting birds" / "Cleaning and decontamination after an infestation, which is a separate visit"

**Plumbing**
- Eyebrow: "Services · Plumbing"
- Headline: "Water where it should be." (em "where it should be.")
- Lede: "Leaks, taps, toilets, radiators, stopcocks and bathroom work, arranged through a plumber whose name you will have before they arrive. For the repairs that quietly get worse."
- Included: "Leak tracing on supply and waste pipework, including behind panels where access allows" / "Taps, mixers, wastes, traps, toilets and cisterns repaired or replaced" / "Radiators, valves, bleeding, balancing and full system flushes" / "Outside taps, stopcocks, isolation valves and washing machine connections" / "Bathroom and cloakroom installation, from a swapped basin to a full room"
- How: "Describe the fault and send photographs, including the pipework under or behind the fitting" / "We come back with what it is likely to need and how it will be priced, and name who is attending" / "The visit is booked, and parts are confirmed with you before anything is ordered" / "The work is carried out, tested under pressure, and left clean with the old parts shown to you"
- FAQ: "How is this priced?" — "Small repairs are usually charged for the visit plus parts, while bathroom work is quoted as a job after we have seen it. Photographs let us give you a realistic range before anyone travels."
- FAQ: "It is leaking now. What do I do?" — "Turn the water off at the stopcock, then call the House on 0800 047 8738 rather than filling in a form. A form is the slower route when water is moving."
- FAQ: "Can you price it without visiting?" — "Sometimes. A tap swap or a cistern part can be priced from photographs, but a leak with no obvious source cannot, because the first hour is finding it. We will tell you honestly which of the two you have."
- FAQ: "What is not covered?" — "Gas work, boiler repairs and unvented cylinder work belong under heating and boilers, and are done by a separately registered engineer. Anything on the main outside your boundary is your water company's responsibility."
- Practical: duration "An hour or two for most repairs, several days for a bathroom" / materials "Common parts carried on the van, specials ordered and confirmed with you first" / access "Access to the stopcock, the loft tank if there is one, and the room in question" / parking "A space near the door for tools and parts" / excluded: "Gas appliances, boilers and flues, which are booked as heating work" / "Drain jetting, CCTV drain inspections and work on the shared or public sewer" / "Tiling, plastering and decorating to make good after pipework is opened up"

**Heating and boilers** (`recurring: true`)
- Eyebrow: "Services · Heating and boilers"
- Headline: "Warmth you stop thinking about." (em "you stop thinking about.")
- Lede: "Annual servicing, repairs, gas safety certificates and replacement, arranged through a registered engineer. For households who would rather find the fault in October than in January."
- Included: "Annual boiler service with combustion analysis and a written record" / "Landlord gas safety certificates covering the boiler, hob and any other gas appliance" / "Fault finding and repair on boilers, controls, pumps, valves and cylinders" / "Radiator balancing, power flushing, thermostats and heating controls" / "Replacement boilers and full system upgrades, quoted after a site visit"
- How: "Tell us the boiler make, model, rough age and when it was last serviced" / "We match it to a registered engineer, and confirm the visit type and cost to you" / "The engineer attends, reports what the system is actually doing, and prices any repair before starting" / "Certificates and service records are sent to you, and to your record if you keep one"
- FAQ: "How is this priced?" — "A service or a certificate is a fixed price per visit. Repairs are diagnosis first and parts after, and no part is ordered until you have agreed the cost, because a diagnosis that commits you to a bill is not a diagnosis."
- FAQ: "Should I repair it or replace it?" — "It usually turns on the age of the boiler, the availability of parts and how much of the system is original. The engineer will give you the honest comparison on the day rather than steer you towards a new one."
- FAQ: "How disruptive is a replacement?" — "Most straightforward swaps take a day or two with the heating and hot water off for part of that. Moving the boiler, changing fuel or adding a cylinder takes longer, and we will set out the schedule before you commit."
- FAQ: "Who actually carries out the work?" — "Gas work is only ever carried out by a registered engineer, either a House team member or a named House Approved professional. You will be told which before you commit, along with their name."
- Practical: duration "Around an hour for a service, one to three days for a replacement" / materials "Parts confirmed and priced with you before they are ordered" / access "Access to the boiler, controls, gas meter and every gas appliance being certificated" / parking "Parking near the property, particularly on a replacement" / excluded: "Electrical work beyond the heating controls, which is booked as electrical work" / "Building works such as flue penetrations through structure, or moving a meter" / "Repairs to underfloor heating pipework buried in a screed"

**Flooring**
- Eyebrow: "Services · Flooring"
- Headline: "The surface a room stands on." (em "a room stands on.")
- Lede: "Wood, engineered board, vinyl, tile and carpet supplied and fitted, with the subfloor put right first. For rooms where the floor has become the thing you notice."
- Included: "Subfloor inspection, levelling and preparation before anything is laid" / "Solid and engineered wood, laminate, luxury vinyl, carpet and hard tile" / "Uplift and disposal of the existing floor by a licensed carrier" / "Thresholds, beading, skirting adjustments and door trimming where needed" / "Sanding and refinishing of existing boards where replacement is not the answer"
- How: "Send room dimensions, photographs and what is down at the moment" / "We come back with material options and an indicative cost, then arrange a measure" / "Materials are confirmed, ordered and given time to acclimatise where the product requires it" / "The floor is fitted, finished and the room left clear, with offcuts kept back for repairs"
- FAQ: "How is this priced?" — "Materials by the square metre and labour by the room, with subfloor preparation quoted separately once we have seen what is underneath. Rough dimensions get you an indicative figure, and a measure makes it firm."
- FAQ: "Why do you need to see the subfloor first?" — "Because most flooring failures are subfloor failures. Damp, movement or an uneven screed will show through any covering, and it is cheaper to find that at the quote stage than after the boards are down."
- FAQ: "How long is the room out of use?" — "Usually one to three days for an average room, plus any acclimatisation and curing time the material needs. We will give you the schedule with the quote so you can plan around it."
- FAQ: "Can we supply our own material?" — "Yes, and we will fit it. We cannot then stand behind the material itself, and any shortfall or batch variation becomes your side of the arrangement, so we will confirm quantities with you before you order."
- Practical: duration "One to three days for a room, longer across a floor of a house" / materials "Supplied by us, or fitted from your own supply by agreement" / access "Rooms emptied of furniture, and power available for cutting and levelling" / parking "Parking for a van, as materials are heavy and delivered to the door" / excluded: "Structural joist repair and floor strengthening" / "Damp proofing and tanking of a floor found to be wet" / "Decorating and skirting replacement after the floor is laid"

**Plastering and tiling**
- Eyebrow: "Services · Plastering and tiling"
- Headline: "Walls that read as flat." (em "that read as flat.")
- Lede: "Skimming, patching, re-plastering, and wall or floor tiling, finished to a standard that survives a low winter sun. For rooms being put back together properly."
- Included: "Skim coats over existing plaster or new board, taped and finished ready for decoration" / "Patch repairs to cracks, blown plaster, old fixings and removed fireplaces" / "Plasterboarding, dot and dab, stud partitions and ceiling replacement" / "Wall and floor tiling in ceramic, porcelain and natural stone, including grouting and silicone" / "Protection of floors and adjoining rooms, and removal of waste at the end"
- How: "Send photographs and rough areas in square metres, with a note of what is behind the surface" / "We price the work from that where we can, and arrange a visit where the substrate is uncertain" / "Dates are agreed, and we confirm who is doing the work and how many days it will take" / "The work is carried out, the room is cleared, and drying times before decorating are explained"
- FAQ: "How is this priced?" — "By area and by day, which is why photographs and a rough square metre figure usually get you a price without a first visit. Where old lath or damp is suspected we will want to look before committing."
- FAQ: "How long before we can paint?" — "Fresh plaster generally needs several days to dry out fully, and longer in a cold or unventilated room. Painting too early traps moisture and shows later, so we will tell you when the wall is genuinely ready."
- FAQ: "How much mess is there?" — "Plastering is wet and dusty work, and the room is unusable while it happens. Floors and doorways are protected, adjoining rooms are sealed where practical, and waste goes with the team."
- FAQ: "What could go wrong?" — "The most common surprise is what is found once old plaster comes off, such as damp, perished lath or missing background. If that happens the work stops and you are told the revised cost before it restarts."
- Practical: duration "A day for a patch or a small ceiling, several days for a full room" / materials "Plaster, board and adhesives supplied, tiles usually chosen and supplied by you" / access "Rooms cleared, water and power available, and the space free for the duration" / parking "A space near the door, as board and bagged materials are carried in" / excluded: "Decorating and painting once the plaster has dried" / "Damp proofing, tanking and the cause of any damp found behind the surface" / "Structural alterations, lintels and removal of load-bearing walls"

**Damp, mould and condensation**
- Eyebrow: "Services · Damp, mould and condensation"
- Headline: "The cause before the cure." (em "before the cure.")
- Lede: "Rising damp, penetrating damp, condensation and black mould, diagnosed before anything is sold to you. For homes where a wall keeps coming back no matter how often it is painted."
- Included: "An inspection of the affected walls with moisture readings, taken internally and externally" / "Identification of which of the three it is, because the remedies have nothing in common" / "External checks of ground levels, gutters, downpipes, pointing and airbricks" / "A written report setting out cause, recommended works and what can wait" / "Remedial work where it is needed, including injected courses, tanking, replastering and ventilation"
- How: "Describe what you are seeing, where it appears and whether it changes with the seasons" / "An inspection is arranged, because we will not quote for treatment we have not diagnosed" / "You receive the findings and a costed set of works, with the order they should be done in" / "The works are carried out, and the wall is left to dry before any making good"
- FAQ: "Why can you not quote from photographs?" — "Because a photograph cannot tell rising damp from a leaking downpipe or a cold bridge, and those three cost very different amounts to fix. Quoting blind is how people end up with an injected course they never needed."
- FAQ: "How is this priced?" — "The inspection is charged as its own visit, and any remedial work is quoted from the findings. You are free to take the report and do nothing, or to use it to get other prices."
- FAQ: "Is black mould dangerous?" — "Persistent mould in a lived-in room is worth taking seriously, particularly where anyone in the house has a respiratory condition. Most of it is a ventilation and heating problem rather than a building failure, and cleaning it without changing that only buys a few months."
- FAQ: "How long does a wall take to dry?" — "Months rather than weeks, depending on the thickness of the wall and the time of year. Anyone who tells you a treated wall can be replastered and decorated immediately is setting you up to do it twice."
- Practical: duration "One to two hours for the inspection, and several days for remedial works" / materials "Meters and inspection equipment on the visit, remedial materials quoted after" / access "Access to both faces of the wall where possible, plus any cellar, void or loft" / parking "A space near the property for the inspection and works visits" / excluded: "Structural repair, underpinning and movement or subsidence work" / "Roof, gutter and drainage repairs found to be the cause, which are quoted separately" / "Redecoration once the wall has dried out"

**Appliance repair**
- Eyebrow: "Services · Appliance repair"
- Headline: "Repair considered first." (em "considered first.")
- Lede: "Washing machines, dishwashers, fridges, freezers, dryers and ovens looked at by an engineer before you replace them. For households who would rather mend a good machine than buy a worse one."
- Included: "Diagnosis of the fault, including error codes, drainage, heating and motor faults" / "Washing machines, tumble dryers, dishwashers, fridges, freezers, ovens and hobs" / "Common parts fitted on the first visit where the engineer carries them" / "Non-standard parts identified by model number and ordered against your agreement" / "An honest view on whether the machine is worth repairing at all"
- How: "Send the make, model number and any error code showing on the display" / "We check part availability for that model and tell you the likely cost and who is attending" / "The engineer diagnoses on site, and no part is ordered until you have agreed the price" / "The repair is completed, the machine is tested through a cycle, and the old part is left with you"
- FAQ: "How is this priced?" — "A diagnosis charge for the visit, then parts and labour agreed with you before the repair goes ahead. If the machine is not worth repairing you pay for the diagnosis and nothing more."
- FAQ: "Why do you need the model number?" — "Because parts availability decides whether a repair is possible at all, and it varies by model rather than by brand. It is usually on a sticker inside the door, on the back, or behind the drawer."
- FAQ: "Will the first visit fix it?" — "Often, where the fault is a common one and the part is on the van. Where a part has to be ordered a second visit is needed, and we will tell you at the point of diagnosis rather than leave you waiting."
- FAQ: "What if the machine is still under warranty?" — "Go to the manufacturer first, because an independent repair can end the warranty. We will say so if you tell us the age of the machine, rather than take the booking."
- Practical: duration "Around an hour for diagnosis and most first-visit repairs" / materials "Common parts carried, specific parts ordered against your agreement" / access "The appliance pulled out or accessible, with water and power available" / parking "A space near the door, as parts and tools are carried in" / excluded: "Integrated cabinetry alterations to remove or refit a built-in machine" / "Plumbing and electrical work beyond the appliance connection" / "Gas appliances and gas hobs, which are booked as heating work"

**Locks and security**
- Eyebrow: "Services · Locks and security"
- Headline: "A door that holds." (em "that holds.")
- Lede: "Lock changes, snapped keys, lockouts, window locks and door security, arranged quickly and without damage where the lock allows. For a house you have just moved into, or one you no longer trust."
- Included: "Non-destructive entry attempted first, with the lock preserved where it can be" / "Cylinder changes and upgrades to anti-snap, anti-drill and anti-bump standards" / "Full lock changes after a move, a lost key or a change of circumstances" / "Window locks, patio doors, multipoint mechanisms, letterplates and door chains" / "A review of the door and frame, since most failures are the frame rather than the lock"
- How: "Call the House on 0800 047 8738 if you are locked out now, rather than sending a form" / "For planned work, send photographs of the lock, the door edge and any key you still have" / "We confirm the likely cost, the parts needed and who will be attending" / "The lock is changed or opened, tested with every key, and the spare keys handed to you"
- FAQ: "I am locked out right now. What should I do?" — "Call 0800 047 8738 rather than using the enquiry form, because the form is checked in working hours and a lockout is not a working-hours problem. Tell us the door type and whether you have any key at all."
- FAQ: "How is this priced?" — "A call-out for the visit plus the cost of any cylinder or mechanism fitted. We will give you a range on the phone once we know the lock type, and confirm the exact figure before any work starts."
- FAQ: "Will the door be damaged?" — "Non-destructive entry is always attempted first and works in most cases. Some locks, particularly older mortice and certain multipoint mechanisms, cannot be opened without drilling, and you will be told before that decision is made."
- FAQ: "Should I change the locks after moving in?" — "It is worth doing, since you cannot know how many keys exist or who holds them. Changing the cylinder alone is usually enough, and is considerably cheaper than replacing whole locks."
- Practical: duration "Under an hour for most openings and cylinder changes" / materials "Cylinders and common mechanisms carried, unusual patterns ordered in" / access "Proof that you live at or are entitled to access the property" / parking "A space near the door, though the team can carry in on foot" / excluded: "Alarms, CCTV and door entry systems, which are booked as security installation" / "Door and frame replacement, and repair of a forced or damaged frame" / "Safe opening, vehicle locks and commercial master-key suites"

**Housekeeping** (`recurring: true`) — this is the data behind `/services/housekeeping`
- Eyebrow: "Services · Housekeeping"
- Headline: "The daily order of a home." (em "order of a home.")
- Lede: "A discreet ongoing presence rather than a visit: laundry, linen, the kitchen and the small order that keeps a household running. For homes that want the same person, on the same days."
- Included: "Laundry, ironing, linen changes and wardrobe rotation through the seasons" / "Kitchen order, fridge management, everyday food shopping and putting away deliveries" / "Daily reset of the rooms in use, rather than a full clean each time" / "Care of the surfaces and materials a house is actually made of, noted room by room" / "A standing note of what needs attention, so trades are arranged before something fails"
- How: "Tell us the household, the days and hours you have in mind, and what matters most" / "We set out who is available, what it costs and how the arrangement would work" / "You meet the housekeeper before anything is agreed, because this is the closest role in the house" / "The rhythm settles over the first few weeks, and is adjusted with you rather than fixed"
- FAQ: "How is this priced?" — "By the hour or by a set number of days a week, agreed in advance so the household budget is predictable. Longer standing arrangements are priced differently from occasional cover."
- FAQ: "Is it the same person each time?" — "That is the intention, since the value of housekeeping is in someone knowing the house. Holiday and sickness cover is arranged with you, and you will be told in advance rather than met at the door by a stranger."
- FAQ: "How is this different from cleaning?" — "Cleaning is a defined task carried out on a visit. Housekeeping is an ongoing responsibility for how the house runs, which includes cleaning but also laundry, provisioning and noticing what needs doing."
- FAQ: "Do we have to be at home?" — "Usually not, and most households settle on key or code access after the first few weeks. Access arrangements are recorded and never shared outside the arrangement."
- Practical: duration "Agreed days and hours each week, from a single day to full-time" / materials "Household products supplied by you, or ordered on your behalf" / access "Keys or an access code once the arrangement is settled" / parking "A permit or a space is helpful where the housekeeper drives" / excluded: "Childcare, sole charge of children and any form of personal or nursing care" / "Cooking for events, formal service and staffing a party" / "Trade work such as repairs, gardening and window cleaning, which are booked separately"

### Moving & clearance / trades group — File: `src/lib/services-data/detail-moving.ts`

**Packing and unpacking** (`recurring: false`)
- Eyebrow: "Services · Packing and unpacking"
- Headline: "Packed properly at both ends." (em "at both ends.")
- Lede: "Boxing up a home so nothing arrives broken, and unpacking it so the new house works on the first night. Usually booked alongside a move, but available on its own."
- Included: "Materials brought to the house: cartons, tissue, bubble wrap, tape and wardrobe boxes" / "Room-by-room packing, with every carton labelled by room and contents" / "Separate handling for glass, ceramics, mirrors, pictures and lamps" / "Unpacking at the other end, with kitchens, beds and bathrooms set up first" / "Empty cartons and packing waste taken away on the last day"
- How: "Tell us the property size, which rooms you want packed, and the move date" / "We agree how many packers and how many days the job needs" / "Materials are delivered, then the team packs to the agreed order of rooms" / "We unpack and place items where you want them, then clear the packaging"
- FAQ: "How is packing priced?" — "By the number of packers and days the property needs, plus materials. We work that out from the room count and how full the house is, so a short video walkthrough or a few photographs gets you an accurate figure quickly."
- FAQ: "Can I pack some of it myself?" — "Yes, and most people do. A common split is that you handle clothes, books and personal papers while the team takes the kitchen, glassware and anything fragile. Tell us the split and we will price only the part we are doing."
- FAQ: "What happens if something is damaged?" — "Items packed by the team are covered by the insurance held by whoever carries out the work, and we will confirm the cover in writing before you commit. Cartons you pack yourself are generally excluded, which is worth knowing when you decide the split."
- FAQ: "Do you pack valuables and documents?" — "We would rather you carried passports, jewellery, cash and irreplaceable papers yourself. We will point them out and set them aside rather than boxing them. Anything genuinely high value should go by a specialist carrier."
- Practical: duration "A one or two-bedroom flat is usually one day. Family houses are two to three days, plus a day for unpacking." / materials "Cartons, tissue, bubble wrap, tape, wardrobe boxes and covers are supplied and charged with the job." / access "We need the rooms reasonably clear and the utilities on. Tell us about narrow stairs or a lift booking." / parking "A bay suspension or permit is often needed in London. We will tell you what to arrange, or arrange it for you." / excluded: "The move itself, which is quoted as removals" / "Cleaning the property once it is empty" / "Disconnecting or reconnecting appliances, plumbing and gas"

**Storage** (`recurring: true`)
- Eyebrow: "Services · Storage"
- Headline: "Kept safe until you want it." (em "until you want it.")
- Lede: "Short and long-term storage for furniture and belongings, collected from the house and returned when you are ready. For moves that do not line up, refurbishments, and homes between chapters."
- Included: "Collection from the property, wrapped and loaded by the team" / "An itemised inventory of everything that goes into store" / "Secure, dry storage in containers or a unit, sized to what you have" / "Monthly billing for as long as you need it, with no fixed term" / "Return delivery and placement back into the rooms you choose"
- How: "Tell us roughly how much there is and how long you expect to need it" / "We estimate the volume from photographs or a short visit, then quote collection, storage and return" / "Everything is wrapped, listed and taken into store on the agreed day" / "You give us notice when you want it back, and we deliver and unload"
- FAQ: "How is storage priced?" — "By volume and by month, with collection and return quoted separately. Volume is the number that matters, so an accurate estimate up front avoids a correction later. Photographs of each room are usually enough for us to size it."
- FAQ: "Can I get to my things while they are in store?" — "Access depends on the facility holding them, and container storage generally needs notice rather than turning up. Tell us if you expect to need regular access and we will choose a site that allows it."
- FAQ: "Is anything not suitable for storage?" — "Food, plants, fuel, paint, aerosols and anything perishable or flammable cannot go into store. Nor can documents or valuables you would be unable to replace. We will flag anything on the day rather than quietly loading it."
- FAQ: "Are my belongings insured while stored?" — "Storage cover is arranged separately from the move and is usually based on a declared total value. We will tell you what the cover is and what it excludes before anything leaves the house, so you can decide the declared figure."
- Practical: duration "Collection is usually half a day to a day. Storage runs by the month, from a few weeks to open-ended." / materials "Blankets, covers and wrapping are supplied. Cartons for loose items are charged separately." / access "We need the items accessible at ground level or via stairs we have been told about. Lofts and cellars need to be emptied first, or add clearance." / parking "Loading space near the door is needed. A suspended bay or permit may be required in London." / excluded: "Loft, cellar and garage emptying, which is quoted as clearance" / "Disposal of anything you do not want stored" / "Long-term document archiving and specialist art or wine storage"

**House and loft clearance** (`recurring: false`)
- Eyebrow: "Services · House and loft clearance"
- Headline: "A house emptied with care." (em "with care.")
- Lede: "Whole properties, single rooms, lofts and garages cleared and taken away. Often after a death, a sale or a downsize, which is work that deserves a calm pair of hands."
- Included: "A walkthrough of what goes, what stays and what you want set aside" / "Furniture, white goods, carpets, loft and garage contents removed" / "Items separated for reuse, charity donation and recycling before disposal" / "Everything taken away by a licensed waste carrier, with transfer notes issued" / "The property left swept and empty, ready for a clean or a handover"
- How: "Send photographs of each room, loft and garage, or ask us to visit" / "We price the clearance by volume and access, and tell you who will carry it out" / "On the day we confirm the keep pile with you before anything is loaded" / "The house is cleared, swept and handed back, and your waste notes follow by email"
- FAQ: "How do you price a clearance?" — "By the volume going out and how hard it is to get to, so photographs of every room including the loft are the fastest route to a firm figure. Where a property is very full, or we cannot see it properly, we will visit before quoting."
- FAQ: "What happens to everything you take?" — "Usable furniture and household goods go to reuse or charity where they will be accepted. The rest is sorted for recycling, and only what is left goes for disposal. All of it leaves with a licensed waste carrier and you receive the transfer documentation."
- FAQ: "Can you look out for things that matter?" — "Yes, and please tell us in advance. Paperwork, photographs, jewellery and anything with a name on it are set aside rather than cleared, and we will show you the pile before we load. If you would rather be there for that, we will work to your time."
- FAQ: "Is there anything you cannot take?" — "Asbestos, gas bottles, paint, chemicals, tyres and clinical waste all need specialist disposal and are not part of a standard clearance. If we find any, we will stop, tell you, and arrange the right route for it."
- Practical: duration "A single room or loft is often half a day. A full house is one to three days depending on volume and access." / materials "The team brings sacks, sheeting and floor protection. No materials are charged to you." / access "We need keys or someone on site, and a clear route out. Tell us about stairs, lifts and loft hatches." / parking "A van needs to sit close to the door. A permit or suspended bay is often needed in London." / excluded: "Asbestos, chemicals, gas bottles and other hazardous waste" / "Stripping out fitted kitchens, bathrooms and built-in joinery" / "The post-clearance deep clean, which is booked as cleaning"

**Waste and rubbish removal** (`recurring: false`)
- Eyebrow: "Services · Waste and rubbish removal"
- Headline: "Cleared without hiring a skip." (em "without hiring a skip.")
- Lede: "Single loads collected and taken away, from a garage full of boxes to the leftovers of a job. Loaded by the team, so nothing sits on your drive for a week."
- Included: "Loading by the team, whether the pile is in the garden, garage or a back room" / "Household furniture, mattresses, white goods, garden waste and general rubbish" / "Pricing by the volume actually taken, measured against the van" / "Sorting for recycling before anything goes for disposal" / "Collection by a licensed waste carrier, with a transfer note issued to you"
- How: "Send a photograph of the pile and tell us where in the property it sits" / "We price it by volume and confirm a collection window" / "The team loads it, sweeps the area and takes it away" / "Your waste transfer note follows by email once it is tipped"
- FAQ: "How is this priced?" — "By volume, described as a fraction of a van load, plus any surcharges for items with their own disposal route such as fridges and mattresses. A photograph with something familiar in shot for scale is usually all we need."
- FAQ: "Why not just hire a skip?" — "A skip needs a permit on the road, sits there for days, and you load it yourself. A collection is loaded by the team and gone the same visit. Where the volume is genuinely large or the work runs for weeks, a skip may still be the cheaper answer and we will say so."
- FAQ: "How do I know it is disposed of properly?" — "Everything leaves with a licensed waste carrier and you receive a waste transfer note naming the carrier. That document is what protects you, because householders remain liable if their waste is fly-tipped by whoever they handed it to."
- FAQ: "What can you not take away?" — "Asbestos, paint, solvents, oils, gas bottles, tyres and clinical waste are outside a standard collection. Tell us if any of that is in the pile and we will arrange the correct disposal route rather than leaving you with it."
- Practical: duration "Most collections are inside two hours, including loading and sweeping up." / materials "Sacks, sheeting and floor protection are brought by the team and are not charged." / access "Tell us which floor the waste is on and whether there is a lift. Stairs and long carries affect the price." / parking "The van needs to park close to the door. A permit or suspended bay may be needed in London." / excluded: "Hazardous waste, including asbestos, chemicals and gas bottles" / "Demolition, soil and construction rubble in quantity" / "Dismantling fitted units and appliances before removal"

**Removals** (quote-mode requestable variant; `recurring: false`)
- Eyebrow: "Services · Removals"
- Headline: "A move that stays calm." (em "that stays calm.")
- Lede: "Local and longer moves across London and the South East, with packers who handle period interiors carefully. Quoted on volume, distance and access, not on hope."
- Included: "Blanket wrapping and protection for furniture, floors and door frames" / "Dismantling and reassembly of beds, tables and flat-pack wardrobes" / "Loading, transport and unloading into the rooms you nominate" / "Full or partial packing, if you want it, quoted alongside the move" / "Coordination with storage where the two dates do not meet"
- How: "Tell us where from, where to, roughly how many rooms and the date you are working towards" / "We assess by video or in person, then quote on volume, distance and access" / "We confirm the team, the vehicles and who is carrying out the move" / "On the day the house is protected, loaded, moved and unpacked into the right rooms"
- FAQ: "How far ahead should I book?" — "Two to three weeks is comfortable, and the end of a month is always the busiest window. Short notice is sometimes possible but never guaranteed, so tell us your date early even if it is not fixed."
- FAQ: "What happens if completion slips?" — "It happens often, and the honest answer is that a moved date depends on what is free. Tell us the moment you know, and we will hold the crew where we can. Cancellation terms are set out in the quote so there is no argument on the day."
- FAQ: "Are my belongings insured in transit?" — "Goods in transit cover is held by whoever carries out the move, and we confirm the level and the excess in writing before you commit. High-value single items usually need to be declared separately, so tell us about anything unusual."
- FAQ: "Will it be your own team?" — "Sometimes, and sometimes it is a House Approved professional we work with regularly. Either way you are told who is doing the work before you commit, and the House stays responsible for the arrangement from enquiry to the last box."
- Practical: duration "A flat is usually a single day. Family houses run one to two days, longer with packing either side." / materials "Blankets, covers and floor protection are included. Cartons and packing materials are charged with a packing service." / access "We need lift bookings, stair widths, and any loading restrictions in advance. Access is what most quotes turn on." / parking "Bay suspensions and permits are frequently required at both ends. We will tell you what to book, or arrange it." / excluded: "Disconnecting or reconnecting gas, plumbing and hardwired appliances" / "Piano, safe and fine art moves, which need a specialist carrier" / "Cleaning either property, which is booked as cleaning"

**EV charger installation** (`recurring: false`)
- Eyebrow: "Services · EV charger installation"
- Headline: "Charging at home, done properly." (em "done properly.")
- Lede: "A home charge point specified, installed and certificated by a qualified registered electrician. For anyone tired of planning journeys around public chargers."
- Included: "An assessment of the consumer unit, incoming supply and earthing arrangement" / "Charge point recommendation matched to your car, parking and daily mileage" / "Installation by a qualified, registered electrician, including cable run and isolation" / "Any load management or supply upgrade the installation needs, agreed first" / "Commissioning, app setup and the electrical certificate issued to you"
- How: "Tell us the car, where it parks, and roughly where the consumer unit sits" / "We arrange an assessment, by photographs or on site, and confirm what your supply allows" / "You approve the charge point, the cable route and the price before anything is ordered" / "The electrician installs, tests and commissions it, and issues the certificate"
- FAQ: "Why can you not price it from the enquiry?" — "Because the cost turns on the cable run, the state of the consumer unit and the earthing arrangement, none of which we can see from a postcode. A site assessment turns that into a fixed price, and we will tell you the assessment cost up front."
- FAQ: "Who actually does the work?" — "A qualified, registered electrician, either from a House of Willow Alexander team or a named House Approved professional. You are told which before you commit. The certificate is issued in their name and the installation is notified as it should be."
- FAQ: "What if my supply will not take it?" — "It is a common finding, particularly in older properties and flats. The usual answers are load management, which throttles the charger when the house is busy, or an upgrade arranged with your network operator. We will explain both and what each costs."
- FAQ: "Can you install one for a flat or shared parking?" — "Sometimes, and it depends entirely on the freeholder, the metering and whether the cable can reach a bay you have rights over. We will look at it honestly and tell you if the answer is no rather than starting work you cannot finish."
- Practical: duration "A straightforward installation is a single day. Supply upgrades depend on the network operator and take longer." / materials "The charge point, cable, isolator and any protective devices are quoted after the assessment." / access "We need access to the consumer unit, the meter and the parking space on the day." / parking "A space for the van near the property, and the car space kept clear while the work is carried out." / excluded: "Groundworks and trenching for cable runs across driveways" / "Network operator supply upgrades, which are arranged but not carried out by us" / "Servicing or warranty repair of the vehicle itself"

**Solar and home battery** (`recurring: false`)
- Eyebrow: "Services · Solar and home battery"
- Headline: "Power made and held." (em "made and held.")
- Lede: "Generation and storage sized to how the house actually runs, not to the biggest system that fits the roof. We look at your usage before recommending anything."
- Included: "A review of your electricity usage, tariff and the shape of your daily demand" / "A roof and structural assessment covering orientation, shading and condition" / "A system proposal with the modelled generation, storage and payback set out plainly" / "Installation by a qualified, registered electrician, with the roof work by the right trade" / "Commissioning, monitoring setup and the electrical certification issued to you"
- How: "Send twelve months of electricity bills, or your meter readings, and photographs of the roof" / "We model what the house would actually use and store, and propose a system size" / "You see the costs, the assumptions and who will carry out the work before committing" / "The system is installed, tested, commissioned and registered, and the paperwork follows"
- FAQ: "Will it pay for itself?" — "That depends on your usage pattern, your tariff and how much of the generation you use rather than export. We will model it on your own bills and show the assumptions, and if the numbers do not work for your house we will tell you that."
- FAQ: "Is a battery worth it without solar?" — "Sometimes, on a tariff with cheap overnight rates, because you are then buying low and using it at peak. It is a different calculation from solar and we will run it separately rather than bundling the two."
- FAQ: "What about grants and export payments?" — "Schemes change and eligibility depends on your property and supplier, so we will not quote a figure we cannot stand behind. We will point you at the current schemes and what the application needs, and you can confirm the amount with the provider."
- FAQ: "What could go wrong on my roof?" — "Older or poorly maintained roofs sometimes need repair before panels go on, and shading from trees or a neighbouring building can cut output badly. Both are found at the assessment, and we would rather lose the job than fit a system that underperforms."
- Practical: duration "A typical domestic install is two to three days on site, after an assessment and a design period." / materials "Panels, inverter, battery, mounting and protective devices are specified and quoted after the assessment." / access "Scaffolding is usually required, plus access to the consumer unit, meter and a location for the battery." / parking "Space for scaffolding, deliveries and a van for the duration of the installation." / excluded: "Roof repairs or re-covering found necessary before installation" / "Tree work to reduce shading, which is quoted as garden work" / "Off-grid systems and generator or standby power installations"

**Smart home and networking** (`recurring: false`)
- Eyebrow: "Services · Smart home and networking"
- Headline: "A house that behaves." (em "that behaves.")
- Lede: "Wi-Fi that reaches the far bedroom, plus heating, lighting and door entry that do what you expect. For homes where thick walls or an extension have defeated the router."
- Included: "An assessment of the property, the incoming broadband and where the signal currently fails" / "Wired and mesh network design, with access points placed where they earn their keep" / "Heating, lighting, blinds and door entry set up and linked to one app" / "Cabling, containment and making good, agreed before any wall is touched" / "Handover with the settings written down, so the house is yours and not ours"
- How: "Tell us the property size, what is already installed and where things stop working" / "We assess the building, the broadband and the dead spots, then propose a design" / "You approve the equipment, the cable routes and the price before work starts" / "It is installed, configured and handed over, with the network documented for you"
- FAQ: "Why not just buy a mesh kit?" — "In a small flat that is often the right answer and we will say so. In a period house with solid walls, a basement or a garden room, mesh over Wi-Fi struggles and a wired backbone is what fixes it properly. The assessment tells us which house you have."
- FAQ: "Do I have to run cables through finished rooms?" — "Not always. Loft, cellar and existing conduit routes cover a great deal, and we will show you every proposed route before we start. Where a chase is unavoidable we will say so, and making good is priced in rather than left to you."
- FAQ: "Will it still work if I change broadband provider?" — "Yes. The internal network is separate from whoever supplies the line, and swapping provider means swapping the router at the front of it. We hand over the settings and passwords so any competent installer can pick it up later."
- FAQ: "Who owns the system afterwards?" — "You do. The accounts are set up in your name, the documentation is yours, and nothing is locked to us. If you would rather we kept an eye on it we can arrange that, but it is a choice and never a condition."
- Practical: duration "A network install is often one to two days. Whole-house lighting and heating work runs longer and is staged." / materials "Access points, switches, cable, containment and control equipment are quoted after the assessment." / access "We need the loft, cupboards and the location of the incoming line accessible, plus the broadband account details." / parking "A space near the property for the van while cabling and equipment are brought in." / excluded: "Broadband line installation and provider contracts, which stay with your supplier" / "Decorating beyond making good the routes we have opened" / "Ongoing support for third-party apps and consumer devices you buy separately"

**Alarms and CCTV** (`recurring: false`)
- Eyebrow: "Services · Alarms and CCTV"
- Headline: "A house watched without noise." (em "without noise.")
- Lede: "Intruder alarms, cameras and door entry specified for the way the property is actually used, then installed and maintained. We start with what you already have."
- Included: "A walk of the property covering entry points, sight lines and existing equipment" / "Alarm design with sensors placed to catch intruders rather than the cat" / "Camera positions chosen for usable images, with storage and retention agreed" / "Installation by a qualified, registered electrician where mains wiring is involved" / "Handover, app setup, user codes and a written note of how the system is configured"
- How: "Tell us what you already have, what you want covered and whether anyone is home in the day" / "We assess the property and propose a design, with the equipment and monitoring options priced" / "You approve the layout, the cable routes and who will carry out the work" / "It is installed, tested and handed over, with certification where electrical work is involved"
- FAQ: "Do I need monitoring, or is a bell box enough?" — "It depends on the property and what your insurer asks for. An audible-only system deters, but nobody is obliged to respond to it. Monitoring costs a monthly fee and brings a response, so we set out both and let you choose."
- FAQ: "Will my insurer accept the system?" — "Ask them before we install, and tell us what they say. Some policies specify a grade of system or a particular certification, and it is far cheaper to design to that from the start than to discover the requirement at renewal."
- FAQ: "Where can I legally put cameras?" — "Cameras that capture anything beyond your own boundary bring data protection duties, including signage and handling requests from people recorded. We will place cameras to do the job with the least overspill, and tell you plainly what your obligations are."
- FAQ: "What goes wrong with these systems?" — "False alarms from badly placed sensors, cameras pointed at a bright sky, and batteries nobody replaced. The assessment deals with the first two. The third is why we recommend a service visit, and we will quote it rather than assume it."
- Practical: duration "A domestic alarm or camera install is usually one to two days after the assessment." / materials "Panel, sensors, cameras, recorder and cabling are specified and quoted once the design is agreed." / access "We need access to every room being covered, the loft where cables run, and the broadband for remote access." / parking "A space for the van near the property while the system is installed and tested." / excluded: "Locks, doors, gates and physical security hardware, which is booked as locks and security" / "Monitoring station contracts, which are arranged with the provider in your name" / "Retrieving or exporting footage for legal proceedings"

### Garden & exterior group — File: `src/lib/services-data/detail-outdoor.ts`

**Landscaping and garden build**
- Eyebrow: "Services · Landscaping and garden build"
- Headline: "The hard bones of a garden." (em "of a garden.")
- Lede: "Patios, paths, steps, raised beds and retaining walls: the built structure that decides how a garden is used. For homes making a lasting change rather than a seasonal tidy."
- Included: "Site clearance, excavation and disposal through a licensed carrier" / "Sub-base, haunching and falls set so surfaces drain away from the house" / "Paving, stone, brick and setts laid, cut and pointed" / "Raised beds, steps, low retaining walls and edging in timber, brick or stone" / "Topsoil, turf and planting reinstated where the build has disturbed them"
- How: "Send photographs and rough measurements of the area you have in mind" / "We arrange a site visit to check levels, drainage, access and ground conditions" / "A written proposal follows, itemised by element, with materials named" / "Work is scheduled in stages, and you are told who is on site and when"
- FAQ: "Why can you not price this from photographs?" — "Photographs tell us the shape of the job but not the ground beneath it. Levels, drainage, what is under the existing surface and how materials reach the garden all change the figure, so we look before we quote."
- FAQ: "How long does a garden build take?" — "A small patio is usually a week. A full rebuild with levels, drainage and planting runs to several weeks. We give you a stage plan with the proposal so you know which weeks are noisy and which are not."
- FAQ: "What happens if the weather turns?" — "Groundwork and laying stop in hard frost or sustained heavy rain, because concrete and mortar will not cure properly. We reschedule rather than press on, and we tell you the same day if a day is lost."
- FAQ: "Will I need planning permission?" — "Most patios and paths do not, but raised decking, larger retaining walls and anything altering levels near a boundary can. We will tell you where we think a consent is needed, and you should confirm it with your local authority before we start."
- Practical: duration "One week for a small patio, several weeks for a full build" / materials "Stone, paving, aggregate and timber supplied by us and itemised in the proposal" / access "We need a route wide enough for barrows, and somewhere to stand materials and spoil" / parking "A vehicle bay near the property for deliveries and skips or grab lorries" / excluded: "Structural retaining walls above one metre, which need an engineer's design" / "Drainage connections into a public sewer, which need a water authority approval" / "Garden design drawings, which sit with our garden design service"

**Fencing and decking**
- Eyebrow: "Services · Fencing and decking"
- Headline: "Boundaries that hold." (em "that hold.")
- Lede: "New fencing, repairs, gates and timber decking, set properly into the ground rather than propped up for another winter. For gardens where the boundary has started to lean or lift."
- Included: "Close-board, feather-edge, panel and picket fencing supplied and erected" / "Posts set in concrete or on spikes, with gravel boards where ground contact is a risk" / "Repairs to existing runs: replacement posts, rails, boards and panels" / "Gates hung and ironmongery fitted, including latches, drop bolts and closers" / "Softwood and hardwood decking, framed, laid and finished, with steps where needed"
- How: "Send photographs of the run and a rough length in metres or panel count" / "We come back with an estimate, or ask for a site visit where levels are awkward" / "You choose timber, height and finish, and we confirm a date in writing" / "Old timber is taken away by a licensed carrier and the ground is left clear"
- FAQ: "How is fencing priced?" — "By the metre or by the panel, plus posts, gravel boards and the removal of what is there now. Awkward access, sloping ground and concrete-set old posts add labour, which is why we ask for photographs before quoting."
- FAQ: "Whose fence is it?" — "That is set by your deeds, not by convention, and the House cannot decide it for you. Check your title plan, and speak to your neighbour before work starts if the boundary is shared."
- FAQ: "Can decking be laid over an existing patio?" — "Often yes, provided there is drainage beneath and enough height at door thresholds. We check both on site, because a deck that traps water will rot from underneath whatever timber you choose."
- FAQ: "Does new timber need treating?" — "Pressure-treated softwood arrives protected, but cut ends need treating and most timber benefits from a stain or oil in its first year. We will tell you what this run needs and when."
- Practical: duration "One to three days for a typical run, longer for decking" / materials "Timber, posts, fixings and concrete supplied and itemised" / access "Side or rear access wide enough to carry panels and posts through" / parking "A bay near the property for the timber delivery" / excluded: "Boundary disputes and deeds questions, which are for your solicitor" / "Retaining walls holding back ground, which are a landscaping or structural job" / "Composite decking systems, which we quote separately by supplier"

**Irrigation and garden watering**
- Eyebrow: "Services · Irrigation and garden watering"
- Headline: "Water that arrives without you." (em "without you.")
- Lede: "Automatic watering for beds, pots, planters and lawns, set to the seasons and left to run. For gardens that suffer in August, and for households that travel."
- Included: "Drip line to beds and borders, and micro-jets or dripper heads to pots and planters" / "Pop-up sprinkler zones for lawns, laid out to avoid dry corners and overspray" / "Controller and solenoid valves installed, with zones programmed by season" / "Backflow prevention fitted at the supply, as water regulations require" / "Rain sensor or soil moisture sensor where the layout suits it"
- How: "Tell us the garden size, what is planted where, and where the outside tap sits" / "We check flow and pressure at the supply, on site or with a simple test you can run" / "A zoned layout and estimate follow, with the controller and heads named" / "We install, commission each zone with you watching, and set the seasonal programme"
- FAQ: "Will it damage the lawn or borders?" — "Pipe runs are trenched or slit into the ground and the turf is relaid over them. Borders take a few weeks to settle and look untouched by the following season."
- FAQ: "What happens in winter?" — "The system should be drained and the controller switched off before the first hard frost, then recommissioned in spring. We can do both as a visit each year, or show you how once and leave you to it."
- FAQ: "Does this work with a water meter?" — "Yes, and a well-zoned system usually uses less water than a hose because it delivers to the root rather than the air. We cannot promise a figure, because it depends on your planting and how often you were watering before."
- FAQ: "What if the pressure is not good enough?" — "Some supplies will not run several sprinkler zones at once. We measure first, and if the flow is short we either split the garden into more zones or tell you plainly that a pump would be needed."
- Practical: duration "One to three days depending on zone count" / materials "Pipe, fittings, heads, valves and the controller supplied and itemised" / access "Access to an outside tap or mains supply, and to a power point for the controller" / parking "A bay near the property on installation day" / excluded: "New mains water supply runs, which are a plumbing job" / "Rainwater harvesting tanks and pumps, which we quote separately" / "Ongoing seasonal shutdown and recommissioning unless you ask for it"

**Garden lighting**
- Eyebrow: "Services · Garden lighting"
- Headline: "A garden that keeps going after dark." (em "after dark.")
- Lede: "Lighting for paths, steps, planting and outdoor rooms, placed so you see the garden and not the fittings. Usually needs a site visit, and a qualified electrician where it is mains-wired."
- Included: "A lighting scheme walked and agreed on site, fitting by fitting" / "Path, step and threshold lighting where safety matters most" / "Uplights and spike lights to trees, planting and garden structures" / "Low-voltage transformers, cable runs and connectors installed and buried" / "Timers, photocells or app-controlled switching where you want it"
- How: "Send photographs of the garden by day and tell us what you want lit" / "We visit at dusk where we can, because that is when placement is obvious" / "An estimate follows, listing fittings, cable runs and any electrical work needed" / "We install, then return after dark to aim each fitting and set the timings"
- FAQ: "Do I need an electrician?" — "For low-voltage lighting run from an existing outdoor socket, usually not. Anything mains-wired, or any new circuit or outdoor socket, is carried out by a qualified registered electrician and certificated, and we arrange that as part of the job."
- FAQ: "How is this priced?" — "By the number of fittings, the cable runs between them and whether any electrical work is needed. We do not publish a fixed price because two gardens of the same size can differ by half, so we quote after the visit."
- FAQ: "Will the cables be visible?" — "Low-voltage cable is buried in beds and under paths where the route allows, and clipped discreetly where it does not. We agree the runs with you before anything goes in the ground."
- FAQ: "Will it annoy the neighbours?" — "It can, if it is aimed badly. We use shielded fittings, aim downward or into planting rather than over a boundary, and set warm colour temperatures. The after-dark aiming visit exists mostly for this reason."
- Practical: duration "One to two days, plus a short return visit after dark" / materials "Fittings, cable, transformers and controls supplied and itemised" / access "Access to the garden and to a suitable outdoor power supply" / parking "A bay near the property on installation day" / excluded: "Consumer unit work and new circuits beyond the agreed electrical scope" / "Indoor lighting and switching" / "Festoon and event lighting hire"

**Gutter and downpipe repair**
- Eyebrow: "Services · Gutter and downpipe repair"
- Headline: "Rainwater sent where it belongs." (em "where it belongs.")
- Lede: "Leaks, sagging runs, failed joints, loose brackets and whole replacement runs where repair is no longer honest. For the drip down the wall that has started to mark the render."
- Included: "Inspection of the full run, with photographs of every fault found" / "Joints, seals, unions and stop ends replaced" / "Brackets refixed or renewed, and falls reset so water runs to the outlet" / "Downpipes, shoes, offsets and gully connections repaired or replaced" / "Sections or whole runs replaced in matching profile where repair is not honest"
- How: "Send photographs of the run, ideally taken while it is raining" / "We tell you whether this is a repair or a replacement before anyone attends" / "The work is quoted in writing, with the access method named" / "On completion you get before and after photographs for your record"
- FAQ: "Repair or replace?" — "If the profile is sound and only joints or brackets have failed, repair is the right answer and much cheaper. Where plastic has gone brittle or a cast iron run is fracturing, patching it simply moves the leak along, and we will say so."
- FAQ: "How do you reach it?" — "Most repairs need ladders, a tower or a platform rather than the ground-based vacuum poles used for cleaning. Work at height is done by trained operatives to a method agreed in advance, and where a tower or platform is required that cost is shown separately."
- FAQ: "Can you match cast iron or an older profile?" — "Often yes, in cast iron or in a cast-effect aluminium or plastic that reads correctly from the ground. We will show you the options and be honest about which will match and which will merely be close."
- FAQ: "Will this fix damp on the wall inside?" — "It removes one common cause, but not always the only one. If the wall has been wet for a long time it will take a season to dry, and if damp persists we would look at the cause properly rather than guess."
- Practical: duration "Half a day for most repairs, one to two days for a full replacement" / materials "Guttering, brackets, seals and fixings supplied and itemised" / access "Clear ground beneath the run for ladders, a tower or a platform" / parking "A bay near the property, and space for a tower where one is needed" / excluded: "Roof coverings, flashings and verges, which sit with our roofing service" / "Underground drainage and soakaway repairs" / "Internal damp treatment and redecoration"

**Roofing and roof repairs**
- Eyebrow: "Services · Roofing and roof repairs"
- Headline: "The layer everything else depends on." (em "everything else depends on.")
- Lede: "Slipped and broken tiles, failed flashing, ridge and verge work, flat roof repairs and leak tracing. Arranged through a roofer who inspects properly before quoting."
- Included: "Inspection from ground level and, where safe, from the roof or a platform" / "Photographic report of what was found, including inside the loft where relevant" / "Slipped, cracked and missing tiles or slates replaced in matching material" / "Lead flashing, ridge, hip and verge details repaired or renewed" / "Flat roof repairs in felt, single ply or liquid systems, and leak tracing on request"
- How: "Send photographs from the ground, and from the loft if you can see daylight or staining" / "We arrange an inspection, because no honest roof price exists without one" / "A written quote follows, separating the repair from anything else the inspection found" / "Work is scheduled around dry weather, and photographed on completion"
- FAQ: "Why can you not quote from photographs?" — "You can sometimes see the symptom from the ground, but rarely the cause. A stain on a ceiling can come from a tile, a flashing, a valley or a blocked gutter several metres away, so we inspect before putting a figure on it."
- FAQ: "Is roof work safe to arrange casually?" — "No. Work at height is the most dangerous thing done on a house, and it is carried out only by trained roofers working to a method statement, with scaffolding or a platform where the pitch or height requires it. We will not send anyone up a ladder to save you a scaffold cost."
- FAQ: "Can it be done in bad weather?" — "Small repairs can be done between showers. Anything involving stripping a section, mortar work or a flat roof membrane needs dry conditions, so we schedule around the forecast and reschedule rather than rush a detail that has to last."
- FAQ: "What if the inspection finds more than the leak?" — "You get told, in writing, with photographs, and the extra is priced separately rather than folded into the original figure. You decide what to do and when. Nothing beyond the agreed scope goes ahead without your say."
- Practical: duration "Half a day for a small repair, longer where access equipment is needed" / materials "Tiles, slates, lead and membranes supplied and itemised" / access "Ground clearance for ladders, a tower or scaffolding, and loft access where relevant" / parking "A bay near the property, plus space for scaffolding and deliveries" / excluded: "Full roof replacement and re-covering, which is quoted as a separate project" / "Structural timber and truss repairs, which need a structural engineer" / "Loft insulation and ventilation upgrades"

**Chimney sweeping** (`recurring: true`)
- Eyebrow: "Services · Chimney sweeping"
- Headline: "Swept, checked and written down." (em "and written down.")
- Lede: "Chimneys and flues swept, inspected and certificated for your insurer, with the fireplace sheeted and vacuumed throughout. For open fires, wood burners and stoves used through the winter."
- Included: "Sweeping of the flue by rod and brush or power sweep, to the fuel type" / "Sheeting and vacuum extraction so the room is left as it was found" / "Smoke draw test to confirm the flue is drawing correctly" / "Visual check of the appliance, register plate, hearth and terminal from inside" / "A sweep certificate issued for your records and your insurer"
- How: "Tell us the fuel type, the appliance and roughly when it was last swept" / "We book a visit and confirm who is attending before the day" / "The sweep is carried out, sheeted and vacuumed, and the flue is tested" / "You are given the certificate and told plainly of anything that needs attention"
- FAQ: "How often should a chimney be swept?" — "Wood and solid fuel usually twice a year where the fire is in regular use, once before the season and once during it. Gas and oil appliances are typically annual. We will tell you what your appliance and usage suggest."
- FAQ: "Will it make a mess?" — "It should not. The fireplace is sheeted and the sweep works with a vacuum running throughout. Clear ornaments from the mantel and move a rug or two, and the room is put back as it was found."
- FAQ: "What if something is wrong with the flue?" — "You will be told, and it will be written on the certificate. Cracked liners, defective register plates, nesting and terminal damage are not things a sweep can put right on the day, and any remedial work is quoted separately by the right specialist."
- FAQ: "Does the certificate satisfy my insurer?" — "Most home insurers ask for evidence of regular sweeping by a competent sweep, and the certificate is issued for that purpose. Check the wording of your own policy, since requirements differ between insurers."
- Practical: duration "Around an hour per flue" / materials "All sheeting, rods and extraction brought with the sweep" / access "Clear access to the fireplace, and the fire unlit for at least 24 hours beforehand" / parking "A bay near the property for the duration of the visit" / excluded: "Flue lining, rebuilding and structural chimney repairs" / "Stove installation and commissioning, which needs a registered installer" / "Gas appliance servicing, which must be done by a Gas Safe registered engineer"

**Driveways and paving**
- Eyebrow: "Services · Driveways and paving"
- Headline: "The first thing anyone sees." (em "anyone sees.")
- Lede: "New driveways, resurfacing, edging and drainage in block paving, resin, gravel or tarmac, dug out and rebuilt from the sub-base. For frontages that have sunk, spread or stopped draining."
- Included: "Excavation of the existing surface and disposal through a licensed carrier" / "Sub-base laid and compacted to the depth the surface and vehicle loading require" / "Block paving, resin-bound, gravel or tarmac surfacing laid and finished" / "Edging, kerbs, drop kerb reinstatement and threshold detailing" / "Linear drainage and permeable build-ups where surface water has to be managed"
- How: "Send photographs and rough dimensions so we understand the scale" / "We arrange a site visit to check levels, ground conditions and where water goes" / "A written proposal follows, priced by surface type so you can compare options" / "Work is scheduled in stages, with the drive usable again on an agreed date"
- FAQ: "How long will I be without the drive?" — "Usually most of a week for a typical frontage. Resin and tarmac need curing time before vehicles return, and we tell you the date you can park again as part of the plan rather than on the day."
- FAQ: "Do I need permission?" — "Draining a new hard surface to the road generally requires planning permission, and a permeable build-up or a soakaway usually avoids it. A new or widened dropped kerb needs highway authority approval. We will flag both, and the application is made in your name."
- FAQ: "Which surface should I choose?" — "Block paving is repairable piece by piece, resin is smooth and free-draining but harder to patch invisibly, gravel is cheapest and needs raking, and tarmac suits longer runs. We will tell you what suits your frontage rather than what suits us."
- FAQ: "What about the weather?" — "Resin will not cure in the damp, and tarmac needs reasonable temperatures to lay properly. We schedule around the forecast and would rather move a date than lay a surface that fails in its first winter."
- Practical: duration "Typically most of a week, longer where drainage work is needed" / materials "Aggregate, blocks, resin, kerbs and drainage supplied and itemised" / access "Room for a grab lorry or skip, and space to stand materials" / parking "You will need to park elsewhere while the drive is out of use" / excluded: "Dropped kerb applications and highway works, which are consented separately" / "Garage floors, structures and retaining walls" / "Gates and automation, which we quote as a separate job"

**Solar panel cleaning** (`recurring: true`)
- Eyebrow: "Services · Solar panel cleaning"
- Headline: "Panels earning what they should." (em "what they should.")
- Lede: "Solar panels cleaned of dust, pollen, moss and bird mess so light reaches the cells. For arrays that have quietly dropped output over a few unwashed years."
- Included: "Pure water pole clean of the panel faces, with no detergents or abrasives" / "Soft brush heads chosen for the panel surface, worked from the ground where possible" / "Bird mess, lichen and moss growth removed from panel edges and frames" / "Visual check of frames, fixings and visible cabling, reported with photographs" / "Before and after photographs of the array for your record"
- How: "Tell us how many panels there are and the roof height or storey count" / "We confirm whether it can be reached from the ground or needs a platform" / "A fixed price follows, per visit, with any access equipment shown separately" / "We clean, photograph the array and flag anything that looked wrong"
- FAQ: "Does cleaning actually improve output?" — "Soiled panels generate less, and heavy bird mess or lichen can shade cells badly. How much you recover depends on how dirty they were, so we will not quote a percentage. The photographs before and after tell you plainly what came off."
- FAQ: "How often should panels be cleaned?" — "Once a year suits most homes, and twice where there are overhanging trees, nesting birds or a nearby main road. A shallow pitch holds dirt longer than a steep one, which we will point out when we see it."
- FAQ: "Could cleaning damage the panels or the roof?" — "Not when done properly. We use pure water, soft brushes and no chemicals, and we do not walk on panels. Where the array cannot be reached safely from the ground we use a platform rather than a ladder against the gutter."
- FAQ: "Can you fix an inverter or wiring fault?" — "No. We will photograph and report anything that looks wrong, but electrical work on a solar array is for a qualified installer and is arranged separately. Cleaning is a cleaning visit, not a system service."
- Practical: duration "One to three hours for a domestic array" / materials "Pure water, poles and soft brush heads brought with the team" / access "Clear ground beneath the array, and a water supply where available" / parking "A bay near the property, and space for a platform where one is needed" / excluded: "Electrical work, inverter faults and system servicing" / "Bird proofing and mesh installation, which we quote separately" / "Roof repairs and gutter work found during the visit"

---

*End of services copy inventory.*
