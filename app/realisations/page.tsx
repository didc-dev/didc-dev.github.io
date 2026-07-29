import type { Metadata } from "next";
import { PageIntro } from "../_components/PageIntro";
import { ProjectExplorer } from "../_components/ProjectExplorer";
import { pageMetadata } from "../_lib/site";
export const metadata: Metadata = pageMetadata("Réalisations", "Expériences, projets personnels et laboratoires de Daniel Cruz, filtrables par domaine et contexte.", "/realisations/");
export default function ProjectsPage() { return <><PageIntro eyebrow="Expérience & pratique" title="Des réalisations au fil de mon parcours" lead="Je rassemble ici des expériences professionnelles, des projets personnels et les laboratoires qui accompagnent mes apprentissages." /><section className="section section-shell"><ProjectExplorer /></section></>; }
