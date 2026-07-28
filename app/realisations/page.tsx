import type { Metadata } from "next";
import { PageIntro } from "../_components/PageIntro";
import { ProjectExplorer } from "../_components/ProjectExplorer";
export const metadata: Metadata = { title: "Réalisations", description: "Expériences, projets personnels et laboratoires de Daniel Cruz, filtrables par domaine et contexte." };
export default function ProjectsPage() { return <><PageIntro eyebrow="Expérience & pratique" title="Des réalisations clairement contextualisées" lead="Expérience professionnelle, projet personnel ou laboratoire d’apprentissage: chaque contenu indique son origine et ses limites." /><section className="section section-shell"><ProjectExplorer /></section></>; }
