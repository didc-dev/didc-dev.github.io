import type { Metadata } from "next";
import { PageIntro } from "../_components/PageIntro";
import { ResponsiveImage } from "../_components/ResponsiveImage";
import { experiences, pillars } from "../_data/content";
import { pillarImageKeys, type PortfolioImageKey } from "../_data/images";
import { pageMetadata } from "../_lib/site";

export const metadata: Metadata = pageMetadata("Parcours", "Parcours professionnel de Daniel Cruz entre infrastructures, planification, électronique et informatique.", "/parcours/");

const timelineImages: PortfolioImageKey[] = ["timeline2024", "timeline2023", "timeline2021", "timeline2017", "timeline2013", "timeline2010"];

const timelineNotes = [
  "Cette expérience reliait l’exécution, la compréhension des installations et la préparation technique.",
  "Cette étape a renforcé ma capacité à coordonner les informations et à suivre les décisions jusqu’au terrain.",
  "La planification m’a appris à anticiper les contraintes, coordonner les informations et documenter les décisions.",
  "Le terrain et le CFC ont construit une méthode de travail rigoureuse et progressive.",
  "Le diagnostic informatique m’a appris à partir du symptôme, isoler la cause et expliquer la solution.",
  "Cette formation a posé mes premières bases en matériel, systèmes et support informatique.",
];

export default function ParcoursPage() {
  return <>
    <PageIntro eyebrow="CV interactif" title="Un parcours construit entre terrain et technologie" lead="De l’informatique à l’électronique, puis de l’installation électrique à la planification et aux infrastructures industrielles: chaque étape enrichit la suivante." />
    <section className="section section-shell"><div className="timeline">{experiences.map((item, index) => <article key={`${item.period}-${item.company}`}><div className="timeline-marker" aria-hidden="true" /><div className="timeline-date">{item.period}</div><details className="timeline-content" open={index < 2}><summary><ResponsiveImage imageKey={timelineImages[index]} className="timeline-image" sizes="(max-width: 680px) 100vw, 720px" /><span>{item.domain}</span><h2>{item.role}</h2><p>{item.company}</p><span className="timeline-disclosure">Détails</span></summary><p>{timelineNotes[index]}</p></details></article>)}</div></section>
    <section className="section section-shell journey-grid"><div><p className="eyebrow">Fil conducteur</p><h2>Diagnostiquer, structurer, réaliser</h2></div><div className="prose"><p>Le terrain a renforcé ma rigueur, mon attention à la sécurité et mon sens du diagnostic. La planification m’a appris à anticiper les contraintes, coordonner les informations et documenter les décisions.</p><p>Je transpose ces acquis aux systèmes, aux réseaux et au support informatique. Les laboratoires présentés sur ce site constituent un approfondissement actuel, clairement distinct de mon expérience professionnelle.</p></div></section>
    <section className="section section-shell"><div className="pillar-mini-grid">{pillars.map((pillar) => <article key={pillar.id}><ResponsiveImage imageKey={pillarImageKeys[pillar.id]} className="pillar-mini-image" sizes="(max-width: 980px) 100vw, 33vw" /><h3>{pillar.title}</h3><p>{pillar.description}</p></article>)}</div></section>
    <section className="section section-shell personal-section"><div><p className="eyebrow">Repères personnels</p><h2>Curieux aussi en dehors du travail</h2><p>En dehors du travail, j’aime continuer à apprendre et rester actif. Je me forme actuellement à la conduite moto, je pratique le vélo et la natation, et je m’intéresse aussi à la prise de vue aérienne avec mes drones DJI, dont un DJI Mini 4.</p><p>L’orange est ma couleur préférée. Elle a donc naturellement trouvé sa place dans l’identité visuelle de ce site.</p></div><div className="hobby-grid" aria-label="Centres d’intérêt"><figure><ResponsiveImage imageKey="personalMoto" sizes="(max-width: 680px) 50vw, 20vw" /><figcaption>Moto</figcaption></figure><figure><ResponsiveImage imageKey="personalVelo" sizes="(max-width: 680px) 50vw, 20vw" /><figcaption>Vélo</figcaption></figure><figure><ResponsiveImage imageKey="personalNatation" sizes="(max-width: 680px) 50vw, 20vw" /><figcaption>Natation</figcaption></figure><figure><ResponsiveImage imageKey="personalDrone" sizes="(max-width: 680px) 50vw, 20vw" /><figcaption>Drones DJI</figcaption></figure></div></section>
    <section className="section section-shell"><div className="language-grid"><article><strong>Portugais</strong><span>Langue maternelle</span></article><article><strong>Français</strong><span>Très bonnes connaissances</span></article><article><strong>Anglais</strong><span>Très bonnes connaissances</span></article><article><strong>Espagnol</strong><span>Connaissances de base</span></article></div></section>
  </>;
}
