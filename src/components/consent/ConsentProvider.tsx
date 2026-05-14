"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { acceptAll, readConsent, rejectAll, writeConsent, type Consent } from "@/lib/consent";

interface ConsentContextValue {
  /** Null = user hasn't decided yet (banner should show). */
  consent: Consent | null;
  /** True once the client has hydrated and can safely show consent UI. */
  ready: boolean;
  /** Open the preferences modal (state lives in the provider so any component can request it). */
  openPreferences: () => void;
  /** Banner / preferences modal state. */
  preferencesOpen: boolean;
  closePreferences: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  setConsent: (next: { functional: boolean; analytics: boolean }) => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

/** External store subscription — fires re-render when consent changes. */
function subscribe(callback: () => void) {
  window.addEventListener("wa-consent-changed", callback);
  return () => window.removeEventListener("wa-consent-changed", callback);
}

function getSnapshot(): Consent | null {
  return readConsent();
}

/** Server snapshot — consent is browser-only, so SSR always sees null. */
function getServerSnapshot(): Consent | null {
  return null;
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  // useSyncExternalStore handles both the initial localStorage read AND the
  // event subscription, with proper SSR/hydration semantics. Replaces the
  // old useEffect(setState) pattern that React 19 lints as cascading.
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // `ready` flips true on the first client render. Before that, the banner
  // stays hidden to avoid SSR/CSR flash.
  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      ready,
      preferencesOpen,
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
      acceptAll: () => {
        acceptAll();
        setPreferencesOpen(false);
      },
      rejectAll: () => {
        rejectAll();
        setPreferencesOpen(false);
      },
      setConsent: (next) => {
        writeConsent(next);
        setPreferencesOpen(false);
      },
    }),
    [consent, ready, preferencesOpen],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    // Defensive default — components that mount outside the provider tree
    // (shouldn't happen, but render-on-error scenarios exist) get a safe
    // "nothing granted, not ready" view.
    return {
      consent: null,
      ready: false,
      preferencesOpen: false,
      openPreferences: () => {},
      closePreferences: () => {},
      acceptAll: () => {},
      rejectAll: () => {},
      setConsent: () => {},
    } satisfies ConsentContextValue;
  }
  return ctx;
}

/** Shortcut: is this category granted right now? */
export function useConsentGranted(category: "functional" | "analytics") {
  const { consent } = useConsent();
  return consent ? consent[category] : false;
}
