"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { assetPath } from "../_lib/site";
import {
  contactEmailHref,
  currentAvailability,
  professionalStatus,
  profileLanguages,
  profileLocation,
  recruiterBar,
} from "../_data/recruiterBar";

export function StickyRecruiterBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dockRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = (restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const toggle = () => {
    if (open) close();
    else {
      setOpen(true);
      requestAnimationFrame(() => closeRef.current?.focus());
    }
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => setOpen(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!dockRef.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const languageCodes = profileLanguages.map((language) => language.code).join(" · ");
  const languageNames = profileLanguages.map((language) => language.label).join(", ");

  return (
    <div ref={dockRef} className={`recruiter-dock${open ? " is-open" : ""}`}>
      <button
        ref={triggerRef}
        className="recruiter-toggle"
        type="button"
        aria-label={open ? "Fermer les repères professionnels" : "Ouvrir les repères professionnels"}
        aria-expanded={open}
        aria-controls="recruiter-panel"
        onClick={toggle}
      >
        <span className="recruiter-chevron" aria-hidden="true" />
      </button>

      <aside
        id="recruiter-panel"
        className="recruiter-panel"
        aria-labelledby="recruiter-title"
        aria-hidden={!open}
      >
        <div className="recruiter-panel-header">
          <div>
            <p>En bref</p>
            <h2 id="recruiter-title">Repères professionnels</h2>
          </div>
          <button
            ref={closeRef}
            className="recruiter-close"
            type="button"
            aria-label="Fermer les repères professionnels"
            tabIndex={open ? 0 : -1}
            onClick={() => close()}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="recruiter-panel-body">
          {recruiterBar.cvAvailable ? (
            <a className="recruiter-item recruiter-action" href={assetPath(recruiterBar.cvPath)} download tabIndex={open ? 0 : -1}>
              <span className="recruiter-icon icon-document" aria-hidden="true"><i>PDF</i></span>
              <span><strong>Télécharger mon CV</strong><small>Document PDF</small></span>
              <span className="recruiter-action-mark" aria-hidden="true">↓</span>
            </a>
          ) : (
            <div className="recruiter-item recruiter-item-disabled" aria-disabled="true">
              <span className="recruiter-icon icon-document" aria-hidden="true"><i>PDF</i></span>
              <span><strong>Télécharger mon CV</strong><small>PDF bientôt disponible</small></span>
            </div>
          )}

          <a className="recruiter-item recruiter-action" href={contactEmailHref} tabIndex={open ? 0 : -1}>
            <span className="recruiter-icon icon-envelope" aria-hidden="true" />
            <span><strong>Contacter</strong><small>Écrire un courriel</small></span>
            <span className="recruiter-action-mark" aria-hidden="true">→</span>
          </a>

          <div className="recruiter-permit-card">
            <span className="recruiter-residence-card" aria-hidden="true">
              <i className="residence-card-portrait" />
              <i className="residence-card-line residence-card-line-one" />
              <i className="residence-card-line residence-card-line-two" />
              <b>C</b>
            </span>
            <div><strong>{recruiterBar.residencePermit.title}</strong><small>{recruiterBar.residencePermit.detail}</small><i aria-hidden="true" /></div>
          </div>

          <div className="recruiter-permit-card recruiter-driving-card">
            <span className="recruiter-icon icon-car" aria-hidden="true"><i /></span>
            <div><strong>{recruiterBar.drivingLicence.title}</strong><small>{recruiterBar.drivingLicence.detail}</small><i aria-hidden="true" /></div>
          </div>

          <div className="recruiter-item recruiter-status">
            <span className="recruiter-icon icon-calendar" aria-hidden="true"><i /></span>
            <span><strong>{currentAvailability.label}</strong><small>{currentAvailability.detail}</small></span>
            <i className={`status-signal ${professionalStatus}`} aria-hidden="true" />
          </div>

          <div className="recruiter-item">
            <span className="recruiter-icon icon-pin" aria-hidden="true"><i /></span>
            <span><strong>Localisation</strong><small>{profileLocation.publicLabel}</small></span>
          </div>

          <div className="recruiter-item" title={languageNames}>
            <span className="recruiter-icon icon-language" aria-hidden="true"><i /></span>
            <span><strong>Langues</strong><small aria-label={languageNames}>{languageCodes}</small></span>
          </div>
        </div>
      </aside>
    </div>
  );
}
