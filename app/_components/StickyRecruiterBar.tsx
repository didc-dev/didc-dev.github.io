"use client";

import { useEffect, useRef, useState, type TouchEvent as ReactTouchEvent } from "react";
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
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();
  const dockRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pullStartYRef = useRef<number | null>(null);
  const pullCurrentYRef = useRef<number | null>(null);

  const resetPullGesture = () => {
    pullStartYRef.current = null;
    pullCurrentYRef.current = null;
    panelRef.current?.classList.remove("is-pulling");
    panelRef.current?.style.removeProperty("--recruiter-pull");
  };

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

  const handleTouchStart = (event: ReactTouchEvent<HTMLElement>) => {
    if (!mobile || !open || event.touches.length !== 1 || (panelRef.current?.scrollTop ?? 0) > 0) {
      resetPullGesture();
      return;
    }
    pullStartYRef.current = event.touches[0].clientY;
    pullCurrentYRef.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event: ReactTouchEvent<HTMLElement>) => {
    const startY = pullStartYRef.current;
    if (startY === null || event.touches.length !== 1 || (panelRef.current?.scrollTop ?? 0) > 0) {
      resetPullGesture();
      return;
    }
    const currentY = event.touches[0].clientY;
    const distance = currentY - startY;
    if (distance <= 0) return;
    pullCurrentYRef.current = currentY;
    panelRef.current?.classList.add("is-pulling");
    panelRef.current?.style.setProperty("--recruiter-pull", `${Math.min(distance * 0.55, 96)}px`);
  };

  const handleTouchEnd = () => {
    const distance = (pullCurrentYRef.current ?? 0) - (pullStartYRef.current ?? 0);
    if (pullStartYRef.current !== null && distance >= 64 && (panelRef.current?.scrollTop ?? 0) <= 0) {
      close();
      requestAnimationFrame(resetPullGesture);
      return;
    }
    resetPullGesture();
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => setOpen(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const sync = () => setMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    const background = Array.from(document.querySelectorAll<HTMLElement>(".site-header, main, footer"));
    if (mobile) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.classList.add("recruiter-open");
      background.forEach((element) => { element.inert = true; });
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!dockRef.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { close(); return; }
      if (!mobile || event.key !== "Tab") return;
      const focusable = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])') ?? []);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable.at(-1)!;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      document.body.classList.remove("recruiter-open");
      background.forEach((element) => { element.inert = false; });
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobile, open]);

  const languageCodes = profileLanguages.map((language) => language.code).join(" · ");
  const languageNames = profileLanguages.map((language) => language.label).join(", ");

  return (
    <div ref={dockRef} className={`recruiter-dock${open ? " is-open" : ""}`}>
      <button className="recruiter-overlay" type="button" aria-label="Fermer les repères professionnels" tabIndex={-1} onClick={() => close()} />
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
        <span className="recruiter-toggle-label">CV &amp; infos recruteur</span>
      </button>

      <aside
        ref={panelRef}
        id="recruiter-panel"
        className="recruiter-panel"
        aria-labelledby="recruiter-title"
        aria-hidden={!open}
        role={mobile ? "dialog" : undefined}
        aria-modal={mobile && open ? true : undefined}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={resetPullGesture}
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
