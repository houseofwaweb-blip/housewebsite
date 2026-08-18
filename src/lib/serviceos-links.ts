/**
 * ServiceOS OBF deep-links.
 *
 * ServiceOS opens the booking modal preselected to a specific service when the
 * page is loaded with `?book=1&service_id=N` (the exact format ServiceOS gave us
 * in serviceos-all-service-links.csv; the on-page `?book=1` handling in
 * BookingWidget then pops the modal, and the OBF client reads `service_id` from
 * the URL). Our old slug-based `data-service` handoff was ignored by ServiceOS.
 *
 * The IDs below are the HIGH-INTENT GENERIC service for each discipline — the
 * one a cold visitor most likely wants (e.g. gardening → a garden maintenance
 * visit, not a subscription or a niche sub-job). Housekeeping has no ServiceOS
 * service of its own, so it opens a fresh booking.
 *
 * NOTE: ServiceOS preselect + logo only work on the live allow-listed domain,
 * not localhost / preview hosts.
 */
export const SERVICEOS_SERVICE_ID: Record<string, number> = {
  gardening: 148, // Garden Maintenance Visit
  gardeners: 148,
  cleaning: 115, // Regular Domestic Cleaning
  cleaners: 115,
  "window-cleaning": 121, // Window Cleaning
  windows: 121,
  handyman: 90, // Handyman
  repairs: 90,
  removals: 47, // Small house move
  energy: 60, // Electric car charging
  "pet-care": 65, // Dog Walking
  // housekeeping: no ServiceOS service — opens a fresh booking (?book=1)

  // ── Sub-service slugs ──────────────────────────────────────────────────
  // Leaf /services/[slug]/[sub] pages preselect the exact ServiceOS service,
  // not just the discipline. Each id is matched by name to the authoritative
  // export in AUG 17TH REDESIGN/serviceos-all-service-links.csv (columns:
  // service_id, title, visible). Where the same name exists twice we take the
  // VISIBLE (visible=Y) row. Slugs with no confident CSV match are omitted and
  // fall back to a fresh booking (still carrying the postcode).

  // Gardening
  "garden-clearance": 149, // Garden Clearance Packages (visible; "Garden Clearance" 119 is hidden)
  "garden-tidy": 23, // Garden Tidy
  "lawn-care": 2, // Lawn Care
  "hedge-and-boundary-maintenance": 7, // Hedge & Boundary
  planting: 53, // Planting
  "tree-work": 8, // Tree Work
  "turf-laying": 54, // Turf laying
  "garden-maintenance-subscriptions": 131, // Garden Maintenance Subscription
  "jet-washing": 124, // Jet Washing (shared: gardening / window / handyman)
  // lawn-mowing: no ServiceOS service — fresh booking

  // Window cleaning
  "regular-window-cleaning": 64, // Regular window cleaning
  "one-off-window-cleaning": 63, // One off window cleaning
  "gutter-cleaning": 123, // Gutter Cleaning (visible; "Gutter cleaning" 39 is hidden)
  // softwashing, commercial-*: no ServiceOS service — fresh booking

  // Cleaning
  "regular-cleaning": 115, // Regular Domestic Cleaning (visible; "Regular cleaning" 57 is hidden)
  "one-off-cleaning": 61, // One off cleaning
  "end-of-tenancy-cleaning": 58, // End of Tenancy Cleaning
  "after-building-cleaning": 62, // After building cleaning
  "spring-clean": 59, // Spring Cleaning

  // Handyman
  "furniture-assembly": 34, // Furniture Assembly
  "picture-hanging": 37, // Hanging pictures
  "shelving-installation": 77, // Shelving Installation
  "tv-wall-mounting": 35, // Wall mounting TV
  "door-hanging": 84, // Door Hanging
  "general-repairs": 90, // Handyman (generic repairs)
  "baby-proofing": 75, // Baby Proofing
  "alarm-installation": 76, // Alarm Installation
  "bed-assembly": 85, // Bed Assembly
  "cat-flap-installation": 80, // Cat Flap Installation
  "christmas-lights": 87, // Christmas Light Installation & Removing
  "loft-organisation": 78, // Loft Organisation
  // painting-and-decorating: no ServiceOS service — fresh booking

  // Removals
  "small-house-move": 47, // Small house move
  "large-item-collection": 49, // Large item shop collection
  "local-pick-up-drop-off": 48, // Local pick up and drop off
  "moving-to-storage": 46, // Moving stuff to storage
  "home-organising": 88, // Home Organisation
  // packing-service: no ServiceOS service — fresh booking

  // Energy
  "solar-installation": 66, // Solar installation
  "ev-charging": 60, // Electric car charging
  // electrical-repairs, commercial-electrical, new-builds-renovations,
  // electrical-testing: no ServiceOS service — fresh booking

  // Pet care
  "dog-walking": 65, // Dog Walking
  "dog-sitting": 67, // Dog sitting
};
