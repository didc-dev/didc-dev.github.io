import Image from "next/image";
import Link from "next/link";
import { projects, skills } from "./_data/content";
import { ProjectCard } from "./_components/ProjectCard";
import { assetPath } from "./_lib/site";

export default function Home() {
  return <>
    <section className="hero section-shell" aria-labelledby="hero-title">
      <div className="hero-copy"><p className="eyebrow">Support IT · Systèmes · Infrastructures</p><h1 id="hero-title">Daniel Cruz</h1><p className="hero-lead">Je relie l’expérience du terrain à l’administration des systèmes pour construire des environnements fiables, documentés et faciles à maintenir.</p><div className="actions"><Link className="button primary" href="/realisations/">Voir mes réalisations</Link><Link className="button ghost" href="/parcours/">Découvrir mon parcours</Link></div><ul className="signal-list" aria-label="Domaines principaux"><li>Windows & Microsoft</li><li>Virtualisation</li><li>Réseaux</li><li>Support utilisateur</li></ul></div>
      <div className="portrait-wrap"><div className="portrait-halo" aria-hidden="true" /><Image className="portrait" src={assetPath("/images/daniel-cruz.jpg")} width={560} height={560} priority unoptimized alt="Portrait professionnel de Daniel Cruz" /><div className="availability"><span />Basé à Renens (VD)</div></div>
    </section>
    <section className="section section-shell" aria-labelledby="approche-title"><div className="section-heading"><p className="eyebrow">Une approche transversale</p><h2 id="approche-title">Du diagnostic à la solution documentée</h2><p>Une progression vers l’IT fondée sur la pratique, la validation et la compréhension des choix techniques.</p></div><div className="skills-grid">{skills.map((item, index) => <article className="skill-card" key={item.title}><span className="index">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>
    <section className="section section-shell" aria-labelledby="projects-title"><div className="section-heading split"><div><p className="eyebrow">Laboratoire & terrain</p><h2 id="projects-title">Réalisations sélectionnées</h2></div><Link className="text-link" href="/realisations/">Toutes les réalisations <span aria-hidden="true">→</span></Link></div><div className="project-grid">{projects.filter((p) => p.featured).slice(0, 3).map((project) => <ProjectCard key={project.slug} project={project} />)}</div></section>
    <section className="cta section-shell"><div><p className="eyebrow">Prochaine étape</p><h2>Parlons de vos besoins en support et infrastructures IT.</h2></div><Link className="button primary" href="/contact/">Me contacter</Link></section>
  </>;
}
