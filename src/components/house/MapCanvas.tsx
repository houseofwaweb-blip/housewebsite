"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./CoverageMap.module.css";

/**
 * The Leaflet canvas. Never imported directly — CoverageMap pulls it in through
 * next/dynamic with ssr:false, because Leaflet touches `window` on import and
 * would throw during server rendering.
 *
 * Three pieces, all free and keyless:
 *   1. Leaflet 1.9.4     — the map library
 *   2. OpenStreetMap     — the tiles
 *   3. postcodes.io      — the geocoding (see CoverageMap.tsx)
 *
 * BEFORE PRODUCTION: OSM's public tile server is fine for a local preview, but
 * its usage policy does not permit production traffic. Swap TILE_URL for
 * Maptiler, Mapbox or Ordnance Survey with an API key at deploy. It is a
 * one-line change — and an OS map would arguably suit the brand better.
 * postcodes.io can stay: it is fine for production and UK-only suits the market.
 */
const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

/** Roughly the centre of the patch — London and the near South East. */
const PATCH_CENTRE: L.LatLngTuple = [51.31, -0.11];
const PATCH_RADIUS_M = 46_000;

export type MapCanvasProps = {
  /** Geocoded postcode to drop a pin on, or null for the patch overview. */
  pin: { lat: number; lng: number; label: string } | null;
};

export default function MapCanvas({ pin }: MapCanvasProps) {
  const holder = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const patch = useRef<L.Circle | null>(null);
  const marker = useRef<L.CircleMarker | null>(null);

  /**
   * Frame the whole patch. A fixed zoom cannot do this: the card is a narrow
   * grid column, and at zoom 8 the circle is wider than that and clips. Fitting
   * to the circle's bounds keeps the patch whole at any box size.
   */
  const fitPatch = (m: L.Map) => {
    if (patch.current) m.fitBounds(patch.current.getBounds(), { padding: [10, 10] });
  };

  // Build the map once.
  useEffect(() => {
    if (!holder.current || map.current) return;

    const m = L.map(holder.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
    }).setView(PATCH_CENTRE, 8);

    L.tileLayer(TILE_URL, { minZoom: 6, maxZoom: 12 }).addTo(m);

    // The patch itself, drawn in gold.
    patch.current = L.circle(PATCH_CENTRE, {
      radius: PATCH_RADIUS_M,
      color: "#7a6229",
      weight: 1.5,
      fillColor: "#b8943e",
      fillOpacity: 0.14,
    }).addTo(m);

    map.current = m;

    // The holder is usually still sizing on first paint (grid column).
    const t = setTimeout(() => {
      m.invalidateSize();
      fitPatch(m);
    }, 250);

    // Re-fit when the column reflows — breakpoints, font swap, zoom.
    const ro = new ResizeObserver(() => {
      m.invalidateSize();
      if (!marker.current) fitPatch(m);
    });
    ro.observe(holder.current);

    return () => {
      clearTimeout(t);
      ro.disconnect();
      m.remove();
      map.current = null;
      patch.current = null;
    };
  }, []);

  // Move the pin as the postcode resolves.
  useEffect(() => {
    const m = map.current;
    if (!m) return;

    if (marker.current) {
      marker.current.remove();
      marker.current = null;
    }

    if (!pin) {
      fitPatch(m);
      return;
    }

    marker.current = L.circleMarker([pin.lat, pin.lng], {
      radius: 7,
      color: "#30231c",
      weight: 2,
      fillColor: "#c5a960",
      fillOpacity: 1,
    })
      .addTo(m)
      .bindTooltip(pin.label, { permanent: false, direction: "top" });

    m.setView([pin.lat, pin.lng], 10);
  }, [pin]);

  return <div ref={holder} className={styles.canvas} aria-hidden="true" />;
}
