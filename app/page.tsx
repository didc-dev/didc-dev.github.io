import { StaticLink as Link } from "./_components/StaticLink";
import { experiences, formations, pillars, projects } from "./_data/content";
import { ProjectCard } from "./_components/ProjectCard";
import { HeroPortraitCard } from "./_components/HeroPortraitCard";
import { ResponsiveImage } from "./_components/ResponsiveImage";
import { pillarImageKeys } from "./_data/images";
import { pageMetadata } from "./_lib/site";

export const metadata = pageMetadata(
  "Daniel Cruz — Infrastructures, planification et technologies",
  "Portfolio de Daniel Cruz: infrastructures industrielles, électricité, planification, diagnostic et technologies informatiques en Suisse romande.",
  "/",
);

export default function Home() {
  const selected = ["infrastructures-industrielles", "planification-electrique", "laboratoire-proxmox-ve"].map((slug) => projects.find((project) => project.slug === slug)!);
  return <>
    <section className="hero section-shell" aria-labelledby="hero-title">
      <ResponsiveImage imageKey="header" className="hero-panorama" sizes="100vw" eager alt="" />
      <div className="hero-copy">
        <p className="eyebrow">Infrastructures industrielles · Planification électrique · Technologies IT</p>
        <h1 id="hero-title">Daniel Cruz</h1>
        <p className="hero-lead">Mon parcours s’est construit entre le terrain, la planification, les infrastructures et l’informatique.</p>
        <p className="hero-note">Ce site rassemble les projets, les expériences et les sujets techniques qui m’accompagnent, tout en gardant une trace claire de ce que j’apprends au fil du temps.</p>
        <div className="actions"><Link className="button primary" href="/parcours/">Découvrir mon parcours</Link><Link className="button ghost" href="/realisations/">Voir mes réalisations</Link></div>
      </div>
      <HeroPortraitCard />
    </section>

    <section className="section section-shell" aria-labelledby="pillars-title">
      <div className="section-heading"><p className="eyebrow">Trois piliers professionnels</p><h2 id="pillars-title">Une même rigueur, dans des environnements différents</h2><p>Le terrain, le plan et le système se répondent: observer la réalité, structurer l’information et valider le résultat.</p></div>
      <div className="pillar-grid">{pillars.map((pillar) => <article className="pillar-card" key={pillar.id}><ResponsiveImage imageKey={pillarImageKeys[pillar.id]} className="pillar-image" sizes="(max-width: 680px) 100vw, (max-width: 1080px) 40vw, 33vw" /><div className="pillar-copy"><p className="eyebrow">{pillar.kicker}</p><h3>{pillar.title}</h3><p>{pillar.description}</p><div className="tags">{pillar.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><Link className="text-link" href="/metiers/">Explorer ce domaine <span aria-hidden="true">→</span></Link></div></article>)}</div>
    </section>

    <section className="section section-shell" aria-labelledby="projects-title"><div className="section-heading split"><div><p className="eyebrow">Expérience, pratique et laboratoire</p><h2 id="projects-title">Réalisations sélectionnées</h2></div><Link className="text-link" href="/realisations/">Toutes les réalisations <span aria-hidden="true">→</span></Link></div><div className="project-grid">{selected.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></section>

    <section className="section journey-band" aria-labelledby="journey-title"><div className="section-shell"><div className="section-heading"><p className="eyebrow">Parcours résumé</p><h2 id="journey-title">Une évolution technique continue</h2></div><ol className="journey-flow">{[...experiences].reverse().map((item) => <li key={`${item.period}-${item.role}`}><span>{item.period}</span><strong>{item.domain}</strong><small>{item.role}</small></li>)}</ol><Link className="button ghost light" href="/parcours/">Voir le parcours complet</Link></div></section>

    <section className="section section-shell formation-preview" aria-labelledby="formation-title"><div><p className="eyebrow">Formation & progression</p><h2 id="formation-title">Des qualifications de terrain, complétées par la pratique IT</h2><p>Deux CFC obtenus en Suisse, un diplôme professionnel informatique portugais reconnu par le SEFRI au niveau CFC, et un laboratoire personnel consacré aux systèmes et aux réseaux.</p><Link className="button ghost" href="/formations/">Consulter les formations</Link></div><div className="qualification-stack">{formations.map((item) => <article key={item.title}><span>{item.status}</span><strong>{item.title}</strong><small>{item.period}</small></article>)}</div></section>

    <section className="cta section-shell"><div><p className="eyebrow">Au fil du temps</p><h2>Un site qui évolue avec mes projets</h2><p>J’ajouterai progressivement de nouvelles réalisations, des notes techniques et les étapes de mes apprentissages.</p></div><div className="actions"><Link className="button primary" href="/blog/">Explorer mes notes</Link><Link className="button ghost light" href="/realisations/">Découvrir mes projets</Link></div></section>
  </>;
}
