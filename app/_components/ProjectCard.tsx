import Image from "next/image";
import Link from "next/link";
import type { Project } from "../_data/content";
import { assetPath } from "../_lib/site";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <Link className="project-media" href={`/realisations/${project.slug}/`} aria-label={`Découvrir ${project.title}`}>
        <Image src={assetPath(project.cover)} alt={project.coverAlt} width={840} height={520} />
      </Link>
      <div className="project-body">
        <div className="meta"><span>{project.domain}</span><span>{project.year}</span></div>
        <h3><Link href={`/realisations/${project.slug}/`}>{project.title}</Link></h3>
        <p>{project.summary}</p>
        <div className="tags">{project.skills.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}</div>
        <Link className="text-link" href={`/realisations/${project.slug}/`}>Voir l’étude de cas <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
