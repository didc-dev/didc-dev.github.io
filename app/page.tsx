import Image from "next/image";
import Link from "next/link";
import { experiences, formations, pillars, projects } from "./_data/content";
import { ProjectCard } from "./_components/ProjectCard";
import { DomainArt } from "./_components/DomainArt";
import { assetPath } from "./_lib/site";

export default function Home() {
  const selected = ["infrastructures-industrielles", "planification-electrique", "laboratoire-proxmox-ve"].map((slug) => projects.find((project) => project.slug === slug)!);
  return <>
    <section className="hero section-shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">Infrastructures industrielles · Planification électrique · Technologies IT</p>
        <h1 id="hero-title">Daniel Cruz</h1>
        <p className="hero-lead">Technicien en infrastructures industrielles et planificateur-électricien CFC, je construis mon parcours à la rencontre du terrain, de la coordination et des systèmes informatiques.</p>
        <p className="hero-note">Mon expérience m’a appris à analyser, anticiper les contraintes, documenter les décisions et rechercher des solutions fiables. J’approfondis aujourd’hui les systèmes, les réseaux et le support IT par une pratique régulière.</p>
        <div className="actions"><Link className="button primary" href="/parcours/">Découvrir mon parcours</Link><Link className="button ghost" href="/realisations/">Voir mes réalisations</Link></div>
      </div>
      <div className="portrait-wrap">
        <div className="portrait-frame"><div className="portrait-halo" aria-hidden="true" /><Image className="portrait" src={assetPath("/images/daniel-cruz.jpg")} width={560} height={560} priority unoptimized alt="Portrait professionnel de Daniel Cruz" /></div>
        <div className="portrait-meta">
          <div className="availability"><span />Basé en Suisse romande</div>
          <p><strong>Poste actuel</strong><span>Technicien en infrastructures industrielles / planificateur-électricien</span><small>Connect Groupe E · depuis 2024</small></p>
        </div>
      </div>
    </section>

    <section className="section section-shell" aria-labelledby="pillars-title">
      <div className="section-heading"><p className="eyebrow">Trois piliers professionnels</p><h2 id="pillars-title">Une même rigueur, dans des environnements différents</h2><p>Le terrain, le plan et le système se répondent: observer la réalité, structurer l’information et valider le résultat.</p></div>
      <div className="pillar-grid">{pillars.map((pillar) => <article className="pillar-card" key={pillar.id}><DomainArt pillar={pillar.id} /><div className="pillar-copy"><p className="eyebrow">{pillar.kicker}</p><h3>{pillar.title}</h3><p>{pillar.description}</p><div className="tags">{pillar.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><Link className="text-link" href="/metiers/">Explorer ce domaine <span aria-hidden="true">→</span></Link></div></article>)}</div>
    </section>

    <section className="section section-shell" aria-labelledby="projects-title"><div className="section-heading split"><div><p className="eyebrow">Expérience, pratique et laboratoire</p><h2 id="projects-title">Réalisations sélectionnées</h2></div><Link className="text-link" href="/realisations/">Toutes les réalisations <span aria-hidden="true">→</span></Link></div><div className="project-grid">{selected.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></section>

    <section className="section journey-band" aria-labelledby="journey-title"><div className="section-shell"><div className="section-heading"><p className="eyebrow">Parcours résumé</p><h2 id="journey-title">Une évolution technique continue</h2></div><ol className="journey-flow">{[...experiences].reverse().map((item) => <li key={`${item.period}-${item.role}`}><span>{item.period}</span><strong>{item.domain}</strong><small>{item.role}</small></li>)}</ol><Link className="button ghost light" href="/parcours/">Voir le parcours complet</Link></div></section>

    <section className="section section-shell formation-preview" aria-labelledby="formation-title"><div><p className="eyebrow">Formation & progression</p><h2 id="formation-title">Des qualifications de terrain, complétées par la pratique IT</h2><p>Deux CFC terminés, une formation informatique initiale et un laboratoire personnel consacré aux systèmes et aux réseaux.</p><Link className="button ghost" href="/formations/">Consulter les formations</Link></div><div className="qualification-stack">{formations.map((item) => <article key={item.title}><span>{item.status}</span><strong>{item.title}</strong><small>{item.period}</small></article>)}</div></section>

    <section className="cta section-shell"><div><p className="eyebrow">Opportunités professionnelles</p><h2>Vous recherchez un profil technique polyvalent?</h2><p>Échangeons sur un environnement où le terrain, la planification et les technologies se rencontrent.</p></div><Link className="button primary" href="/contact/">Prendre contact</Link></section>
  </>;
}
