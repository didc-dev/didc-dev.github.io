import Link from "next/link";
import type { Project } from "../_data/content";
import { DomainArt } from "./DomainArt";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <Link className="project-media" href={`/realisations/${project.slug}/`} aria-label={`Découvrir ${project.title}`}>
        <DomainArt pillar={project.pillar} compact />
      </Link>
      <div className="project-body">
        <span className="content-type">{project.type}</span>
        <div className="meta"><span>{project.domain}</span><span>{project.year}</span></div>
        <h3><Link href={`/realisations/${project.slug}/`}>{project.title}</Link></h3>
        <p>{project.summary}</p>
        <div className="tags">{project.skills.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}</div>
        <Link className="text-link" href={`/realisations/${project.slug}/`}>Voir l’étude de cas <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
