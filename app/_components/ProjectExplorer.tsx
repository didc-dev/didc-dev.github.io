"use client";
import { useMemo, useState } from "react";
import { projects } from "../_data/content";
import { ProjectCard } from "./ProjectCard";

export function ProjectExplorer() {
  const [domain, setDomain] = useState("Tous");
  const [type, setType] = useState("Tous");
  const domains = ["Tous", ...new Set(projects.map((project) => project.domain))];
  const types = ["Tous", ...new Set(projects.map((project) => project.type))];
  const visible = useMemo(() => projects.filter((project) => (domain === "Tous" || project.domain === domain) && (type === "Tous" || project.type === type)), [domain, type]);
  const resetFilters = () => { setDomain("Tous"); setType("Tous"); };
  return <><div className="filter-bar" aria-label="Filtres des réalisations"><label>Domaine<select value={domain} onChange={(event) => setDomain(event.target.value)}>{domains.map((item) => <option key={item}>{item}</option>)}</select></label><label>Type<select value={type} onChange={(event) => setType(event.target.value)}>{types.map((item) => <option key={item}>{item}</option>)}</select></label><span aria-live="polite">{visible.length} réalisation{visible.length > 1 ? "s" : ""}</span></div>{visible.length ? <div className="project-grid">{visible.map((project) => <ProjectCard key={project.slug} project={project} />)}</div> : <div className="project-empty" role="status"><p className="eyebrow">Aucun résultat</p><h2>Cette combinaison de filtres ne contient pas encore de réalisation.</h2><p>Choisis un autre domaine ou réinitialise les filtres pour retrouver l’ensemble des projets documentés.</p><button className="button primary" type="button" onClick={resetFilters}>Afficher toutes les réalisations</button></div>}</>;
}
