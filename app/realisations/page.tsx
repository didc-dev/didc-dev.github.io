import type { Metadata } from "next";
import { PageIntro } from "../_components/PageIntro";
import { ProjectCard } from "../_components/ProjectCard";
import { projects } from "../_data/content";
export const metadata: Metadata = { title: "Réalisations", description: "Études de cas en virtualisation, systèmes Microsoft, support et auto-hébergement." };
export default function ProjectsPage() { return <><PageIntro eyebrow="Études de cas" title="Apprendre en construisant" lead="Chaque réalisation présente le contexte, les choix, les difficultés et les validations effectuées." /><section className="section section-shell"><div className="project-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></section></>; }
