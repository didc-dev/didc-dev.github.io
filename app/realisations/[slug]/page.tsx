import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../_data/content";
import { assetPath } from "../../_lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <article>
      <section className="project-hero section-shell">
        <div>
          <Link className="back-link" href="/realisations/">← Toutes les réalisations</Link>
          <p className="eyebrow">{project.domain} · {project.year}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <div className="tags large">{project.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
        </div>
        <Image src={assetPath(project.cover)} width={960} height={600} alt={project.coverAlt} priority />
      </section>
      <section className="case-study section-shell">
        <aside>
          <p className="eyebrow">Outils</p>
          {project.tools.map((tool) => <span key={tool}>{tool}</span>)}
        </aside>
        <div className="case-copy">
          <section><h2>Contexte</h2><p>{project.context}</p></section>
          <section><h2>Travail réalisé</h2><ul>{project.work.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <div className="case-pair">
            <section><h2>Difficulté</h2><p>{project.challenges}</p></section>
            <section><h2>Solution</h2><p>{project.solution}</p></section>
          </div>
          <section className="result-block"><p className="eyebrow">Résultat</p><h2>{project.result}</h2></section>
        </div>
      </section>
    </article>
  );
}
