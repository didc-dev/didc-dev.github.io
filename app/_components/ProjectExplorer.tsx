"use client";
import { useMemo, useState } from "react";
import { projects } from "../_data/content";
import { ProjectCard } from "./ProjectCard";

export function ProjectExplorer() {
  const [domain, setDomain] = useState("Tous");
  const [type, setType] = useState("Tous");
  const [period, setPeriod] = useState("Toutes");
  const [context, setContext] = useState("Tous");
  const domains = ["Tous", ...new Set(projects.map((project) => project.domain))];
  const types = ["Tous", ...new Set(projects.map((project) => project.type))];
  const periods = ["Toutes", "Actuel", "2026", "Avant 2026"];
  const contexts = ["Tous", "Professionnel", "Personnel", "Laboratoire"];
  const contextOf = (project: (typeof projects)[number]) => project.type.startsWith("Expérience") || project.type.startsWith("Réalisation") ? "Professionnel" : project.type.startsWith("Projet") ? "Personnel" : "Laboratoire";
  const periodOf = (project: (typeof projects)[number]) => project.year.includes("aujourd") ? "Actuel" : project.year.includes("2026") ? "2026" : "Avant 2026";
  const visible = useMemo(() => projects.filter((project) => (domain === "Tous" || project.domain === domain) && (type === "Tous" || project.type === type) && (period === "Toutes" || periodOf(project) === period) && (context === "Tous" || contextOf(project) === context)), [domain, type, period, context]);
  const resetFilters = () => { setDomain("Tous"); setType("Tous"); setPeriod("Toutes"); setContext("Tous"); };
  return <><div className="filter-bar" aria-label="Filtres des réalisations"><label>Domaine<select value={domain} onChange={(event) => setDomain(event.target.value)}>{domains.map((item) => <option key={item}>{item}</option>)}</select></label><label>Type<select value={type} onChange={(event) => setType(event.target.value)}>{types.map((item) => <option key={item}>{item}</option>)}</select></label><label>Période<select value={period} onChange={(event) => setPeriod(event.target.value)}>{periods.map((item) => <option key={item}>{item}</option>)}</select></label><label>Contexte<select value={context} onChange={(event) => setContext(event.target.value)}>{contexts.map((item) => <option key={item}>{item}</option>)}</select></label><button className="filter-reset" type="button" onClick={resetFilters}>Réinitialiser</button><span aria-live="polite">{visible.length} réalisation{visible.length > 1 ? "s" : ""}</span></div>{visible.length ? <div className="project-grid">{visible.map((project) => <ProjectCard key={project.slug} project={project} />)}</div> : <div className="project-empty" role="status"><p className="eyebrow">Aucun résultat</p><h2>Aucune réalisation ne correspond à ces critères.</h2><button className="button primary" type="button" onClick={resetFilters}>Afficher toutes les réalisations</button></div>}</>;
}
