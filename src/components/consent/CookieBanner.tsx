"use client";

import { useState } from "react";
import { useConsent } from "./ConsentProvider";
import s from "./CookieBanner.module.css";

/**
 * Cookie consent banner + preferences modal.
 *
 * UK ICO/PECR compliance points:
 *   - "Accept all", "Reject all", and "Customise" are equally prominent.
 *   - No pre-ticked boxes for non-essential categories.
 *   - Banner stays until the user makes a choice (no implicit consent).
 *   - Plain English category names. Each describes what it actually does.
 *
 * Copy is draft until Phase B4 review.
 */

export function CookieBanner() {
  const { consent, ready, preferencesOpen, openPreferences, closePreferences, acceptAll, rejectAll, setConsent } =
    useConsent();

  // No decision yet → banner. Decision made → no banner (preferences modal
  // can still be opened from the footer "Cookies" link).
  const showBanner = ready && consent === null;

  if (!showBanner && !preferencesOpen) return null;

  return (
    <>
      {showBanner && (
        <div className={s.banner} role="dialog" aria-label="Cookie preferences">
          <div className={s.bannerInner}>
            <p className={s.bannerCopy}>
              The House uses cookies. Essential cookies keep the site working.
              Functional and analytics cookies are optional. They help us run
              the booking widget and understand which pages are useful.
            </p>
            <div className={s.bannerActions}>
              <button type="button" className={s.btnGhost} onClick={() => openPreferences()}>
                Customise
              </button>
              <button type="button" className={s.btnGhost} onClick={rejectAll}>
                Reject non-essential
              </button>
              <button type="button" className={s.btnFilled} onClick={acceptAll}>
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}

      {preferencesOpen && (
        <PreferencesModal
          initial={consent ?? { functional: false, measurement: false, marketing: false }}
          onSave={(next) => setConsent(next)}
          onClose={() => closePreferences()}
        />
      )}
    </>
  );
}

interface PreferencesState {
  functional: boolean;
  measurement: boolean;
  marketing: boolean;
}

function PreferencesModal({
  initial,
  onSave,
  onClose,
}: {
  initial: PreferencesState;
  onSave: (next: PreferencesState) => void;
  onClose: () => void;
}) {
  const [functional, setFunctional] = useState(initial.functional);
  const [measurement, setMeasurement] = useState(initial.measurement);
  const [marketing, setMarketing] = useState(initial.marketing);

  return (
    <div className={s.modalScrim} role="dialog" aria-modal="true" aria-label="Cookie preferences">
      <div className={s.modal}>
        <header className={s.modalHeader}>
          <p className={s.eyebrow}>Cookie preferences</p>
          <h2 className={s.modalTitle}>Choose what the House remembers.</h2>
        </header>

        <div className={s.modalBody}>
          <Row
            title="Essential"
            description="Security, session, and your cookie choice itself. The House can't run without these."
            checked
            disabled
            onChange={() => {}}
          />
          <Row
            title="Functional"
            description="Embedded tools that need to remember a preference: the booking widget, postcode lookup, language."
            checked={functional}
            onChange={setFunctional}
          />
          <Row
            title="Measurement"
            description="Anonymous page views, Web Vitals, and error monitoring. We use them to understand which pages are useful and to fix what isn't."
            checked={measurement}
            onChange={setMeasurement}
          />
          <Row
            title="Marketing"
            description="Advertising and retargeting pixels: Meta, Pinterest, LinkedIn. Off by default. Turn on if you'd rather see relevant House ads than random ones."
            checked={marketing}
            onChange={setMarketing}
          />
        </div>

        <footer className={s.modalFooter}>
          <button type="button" className={s.btnGhost} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={s.btnFilled}
            onClick={() => onSave({ functional, measurement, marketing })}
          >
            Save preferences
          </button>
        </footer>
      </div>
    </div>
  );
}

function Row({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className={s.row}>
      <div className={s.rowText}>
        <span className={s.rowTitle}>{title}</span>
        <span className={s.rowDesc}>{description}</span>
      </div>
      <input
        type="checkbox"
        className={s.toggle}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={`${title} cookies`}
      />
    </label>
  );
}
