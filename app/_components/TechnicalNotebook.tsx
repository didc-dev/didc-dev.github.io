"use client";
import { useMemo, useState } from "react";
import { StaticLink as Link } from "./StaticLink";
import { publishedNotes } from "../_data/notes";
import { TechnicalIllustration } from "./TechnicalIllustration";
import { ResponsiveImage } from "./ResponsiveImage";
import { noteImageKeys } from "../_data/images";

export function TechnicalNotebook() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Toutes");
  const [type, setType] = useState("Tous");
  const categories = ["Toutes", ...new Set(publishedNotes.map((n) => n.category))];
  const types = ["Tous", ...new Set(publishedNotes.map((n) => n.type))];
  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("fr-CH");
    return publishedNotes.filter((note) => (category === "Toutes" || note.category === category) && (type === "Tous" || note.type === type) && (!needle || `${note.title} ${note.summary} ${note.tools.join(" ")}`.toLocaleLowerCase("fr-CH").includes(needle)));
  }, [query, category, type]);
  const reset = () => { setQuery(""); setCategory("Toutes"); setType("Tous"); };
  return <>
    <div className="notebook-controls" role="group" aria-label="Recherche et filtres du carnet">
      <label className="notebook-search">Rechercher<input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="DNS, fibre, diagnostic…" /></label>
      <label>Catégorie<select value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label>Type<select value={type} onChange={(e) => setType(e.target.value)}>{types.map((item) => <option key={item}>{item}</option>)}</select></label>
      <button type="button" className="filter-reset" onClick={reset}>Réinitialiser</button>
      <span className="result-count" aria-live="polite">{visible.length} note{visible.length !== 1 ? "s" : ""}</span>
    </div>
    {visible.length ? <div className="note-grid">{visible.map((note) => <article className="note-card" key={note.slug}>
      <div className="note-visual" aria-hidden="true">{noteImageKeys[note.slug] ? <ResponsiveImage imageKey={noteImageKeys[note.slug]} sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 33vw" /> : <TechnicalIllustration kind={note.illustration} compact />}</div>
      <div className="note-card-body"><div className="meta"><span>{note.category}</span><span>{note.reading}</span></div><p className="note-type">{note.type}</p><h2><Link href={`/blog/${note.slug}/`}>{note.title}</Link></h2><p>{note.summary}</p><div className="note-card-footer"><span>{note.level}</span><span className="text-link" aria-hidden="true">Ouvrir la note <span>→</span></span></div></div>
    </article>)}</div> : <div className="notebook-empty" role="status"><h2>Aucune note ne correspond à ces critères.</h2><button className="button ghost" type="button" onClick={reset}>Afficher tout le carnet</button></div>}
  </>;
}
