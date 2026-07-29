"use client";
import { StaticLink as Link } from "./StaticLink";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
const links = [["/", "Accueil"], ["/parcours/", "Parcours"], ["/metiers/", "Métiers"], ["/realisations/", "Réalisations"], ["/formations/", "Formations"], ["/blog/", "Carnet technique"], ["/contact/", "Contact"]];
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const close = (restore = false) => { setOpen(false); if (restore) requestAnimationFrame(() => buttonRef.current?.focus()); };
  useEffect(() => { const frame = requestAnimationFrame(() => setOpen(false)); return () => cancelAnimationFrame(frame); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const background = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
    document.body.style.overflow = "hidden";
    background.forEach((element) => { element.inert = true; });
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") close(true); };
    const onPointer = (event: PointerEvent) => { const target = event.target as Node; if (!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) close(); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => { document.body.style.overflow = previousOverflow; background.forEach((element) => { element.inert = false; }); document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onPointer); };
  }, [open]);
  return <header className="site-header"><div className="nav-shell"><Link className="brand" href="/" onClick={() => close()}><span className="brand-mark" aria-hidden="true">DC</span><span><strong>Daniel Cruz</strong><small>Terrain · planification · technologies</small></span></Link><button ref={buttonRef} className="menu-button" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen((value) => !value)}><i /><i /><i /></button>{open && <div className="nav-overlay" aria-hidden="true" />}<nav ref={menuRef} id="main-nav" className={open ? "nav-links open" : "nav-links"} aria-label="Navigation principale">{links.map(([href, label]) => { const active = href === "/" ? pathname === "/" : pathname.startsWith(href.slice(0, -1)); return <Link key={href} href={href} className={active ? "active" : ""} aria-current={active ? "page" : undefined} onClick={() => close()}>{label}</Link>; })}</nav></div></header>;
}
