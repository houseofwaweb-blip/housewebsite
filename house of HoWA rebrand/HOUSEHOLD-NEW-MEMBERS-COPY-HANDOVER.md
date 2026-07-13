# Household — New Members Copy Handover

Publish-ready copy for the three members added to the Household: **The Storekeeper**, **The Host** and **The Butler**. Covers the homepage/hub card copy and the full member-page copy for each.

Prepared for the website designer / dev team · aligns to the Final Master Directive (Part IV, "The Household hub" + member-page template).

---

## Rules that apply to all three (from the directive)

- Always write **"The"** in the public name. Never call them bots, agents or separate AI products.
- Each member must answer three things: **what it helps with**, **what is available now**, **what action follows**.
- Every useful action can return to the **one Home Record**. Membership changes continuity, not the account or the record.
- Only claim automatic write-back where the workflow is live; otherwise say "can be saved to your Home Record".
- No "AI" in visible copy. No em dashes. No exclamation marks.

| Member | Public role | Primary route | Truthful status |
|---|---|---|---|
| The Storekeeper | Keeps considered goods organised by the rooms and needs of the home. | The Stores (`/shop`) | **Live** (if commerce live) |
| The Host | Welcomes you into the culture and practical knowledge of keeping a home. | The Hearth, recipes, guides, news (`/the-hearth`) | **Live** |
| The Butler | Reads the instruments of the home and, with permission, helps operate supported connected systems. | Staged product (`/household/butler`) | **Staged release** — demonstration → recommendations → command |

---

## 1. The Storekeeper

**Card (homepage + hub)**
- Name: **The Storekeeper**
- One-line promise: *Keep considered goods organised by the rooms and needs of the home.*
- Status chip: **The Stores**
- Card CTA / route: **Enter The Stores** → `/shop`

**Member page** *(optional dedicated page, or use as the intro band on The Stores)*

- **Eyebrow:** The Storekeeper · The Stores
- **H1:** The Storekeeper keeps The Stores.
- **Promise (italic):** For the home that deserves considered things, kept in order.
- **Intro:** A place for everything. The Storekeeper organises considered goods by the rooms and needs of the home, shows the seller clearly, and lets a useful purchase join the home's record rather than vanish into an inbox.
- **CTA:** Shop the rooms → `/shop`

*What the Storekeeper does*
- **Organised by room.** Kitchen, living room, bedroom, bathroom, hallway, garden and utility, so what you need is where you would look for it.
- **The seller, shown.** Every object names who makes or supplies it, and why it earns a place in a well-kept home.
- **House Approved goods.** Made well, chosen carefully, honest about care and capable of being looked after.
- **Saved to the record.** Care notes, warranties, room and repair instructions can be kept against the home, so an object is still understood years later.

*Close:* Everything the Storekeeper keeps can be remembered by HoWA, so the home holds the story of the things in it.
CTA: Enter The Stores → `/shop`

---

## 2. The Host

**Card (homepage + hub)**
- Name: **The Host**
- One-line promise: *Welcome you into the culture and practical knowledge of keeping a home.*
- Status chip: **Live**
- Card CTA / route: **Read the Hearth** → `/the-hearth`

**Member page** *(optional dedicated page, or use as the intro band on The Hearth / Ideas & Advice)*

- **Eyebrow:** The Host · Ideas & Advice
- **H1:** The Host welcomes you in.
- **Promise (italic):** For the pleasure and the practical craft of keeping a home well.
- **Intro:** Come in. The Host is the culture of the House: The Hearth, recipes, seasonal knowledge and practical guidance, kept because it is worth returning to. Not content for its own sake, useful reading for homes people mean to keep.
- **CTA:** Read the Hearth → `/the-hearth`

*What the Host offers*
- **The Hearth.** Essays, garden notes and design wisdom, published when there is something worth saying.
- **Recipes and seasonal notes.** The rituals of a home through the year.
- **Practical guides.** Clear, calm advice on caring for rooms, gardens and the things that keep a home moving.

*Reading that can act*
Every practical guide can offer one quiet, relevant next step: save a seasonal task to the Home Record, turn a checklist into reminders, ask the Gardener, or add a job to the Housekeeper. A guide should not just be read; it should help the home remember.

*Close:* The Host gives the House its voice. HoWA gives that voice somewhere to act.
CTA: Ideas & Advice → `/the-hearth`

---

## 3. The Butler  *(new page to build — see `/household/butler`)*

**Card (homepage + hub)**
- Name: **The Butler**
- One-line promise: *Read the instruments of the home and, with permission, help operate supported connected systems.*
- Status chip: **Staged release**
- Card CTA / route: **See how it works** → `/household/butler`

**Member page — publish-ready copy**

- **Eyebrow:** The Butler · Staged release
- **H1:** The Butler reads the instruments of the home.
- **Promise (italic):** For the home whose systems should be understood before they are automated.
- **Intro:** Meters, thermostats, sensors and connected systems each hold a small truth about the home. The Butler learns to read them, explains what they mean in plain language, and, only with your explicit permission, helps operate the systems that support it.
- **Status line:** The Butler is released in stages. It demonstrates first, then recommends, then, where you allow it, acts. It never implies that every device is supported.

*The three stages* (this is the honesty of the product; show the current stage clearly)
1. **Demonstration.** The Butler shows how a connected home could be read and understood, using clear examples.
2. **Recommendations.** Where systems are connected and permitted, the Butler explains what the instruments are saying and what might be worth doing.
3. **Command.** Only with explicit, revocable permission, and only for supported systems, the Butler can help operate them. You stay in control.

*What the Butler reads*
- Energy, heating and water signals.
- Connected safety devices, where supported.
- Environmental readings such as temperature, humidity and damp risk.
- The maintenance rhythm those readings imply.

*Permission and boundaries* (required safety framing)
- Nothing is connected, read or operated without your explicit permission, and any permission can be withdrawn.
- The Butler works only with supported systems. It does not claim universal device compatibility, and it does not replace a qualified electrician, engineer or a manufacturer's own safety controls.
- Life-safety systems remain the responsibility of the appropriate certified equipment and professional.

*How it returns to the record*
What the Butler reads and does can be saved to the Home Record: readings over time, permissions granted, and the actions taken, so the connected home has a memory and an audit trail.

*Where it sits*
Deeper connected-home control is part of **The Steward**. As Steward's product depth grows, supported Butler control is included there.
CTA: Explore the Steward → `/howa/steward`

*Close:* Understood first. Automated only with permission. Remembered either way.
CTA (secondary): Start with my address → `/howa/assistant`

---

## Build notes

- **Storekeeper / Host:** their real destinations already exist (The Stores = `/shop`, The Hearth = `/the-hearth`). The page copy above can either populate a light `/household/storekeeper` and `/household/host` intro page, or be dropped in as an intro band at the top of Shop / the Hearth. Recommendation: keep them routing straight to Stores / Hearth (fewer thin pages) and use the intro copy as a section there.
- **Butler:** has no destination, so a dedicated page is being built at **`/household/butler`** using the copy above. The homepage + hub Butler cards should link to it.
- Keep the cutaway art already in place: `/howa/household/storekeeper.webp`, `/howa/household/host.webp`, `/howa/household/butler.webp`.
