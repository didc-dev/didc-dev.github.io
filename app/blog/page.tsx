import type { Metadata } from "next";
import { PageIntro } from "../_components/PageIntro";
import { TechnicalNotebook } from "../_components/TechnicalNotebook";
import { pageMetadata } from "../_lib/site";
export const metadata: Metadata = pageMetadata("Carnet technique", "Notes personnelles de Daniel Cruz sur les infrastructures, la planification, la fibre, les systèmes, les réseaux et la virtualisation.", "/blog/");
export default function NotebookPage() { return <><PageIntro eyebrow="Carnet technique" title="Des repères pour comprendre et revenir à l’essentiel" lead="Je rassemble ici des explications, des méthodes et des repères rencontrés au fil de mes expériences et de mes apprentissages. L’objectif n’est pas de tout enseigner, mais de garder une trace claire de ce que j’ai compris et pratiqué." /><section className="section section-shell notebook-section"><TechnicalNotebook /></section></>; }
