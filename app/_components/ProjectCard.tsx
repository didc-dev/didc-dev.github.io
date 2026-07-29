import { StaticLink as Link } from "./StaticLink";
import type { Project } from "../_data/content";
import { ResponsiveImage } from "./ResponsiveImage";
import { projectImageKeys } from "../_data/images";

export function ProjectCard({ project }: { project: Project }) {
  const hasPublishedPeriod = project.year !== project.type;
  return (
    <article className="project-card">
      <div className="project-media" aria-hidden="true">
        <ResponsiveImage imageKey={projectImageKeys[project.slug]} sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 33vw" />
      </div>
      <div className="project-body">
        <span className="content-type">{project.type}</span>
        <div className="meta"><span>{project.domain}</span>{hasPublishedPeriod ? <span>{project.year}</span> : null}</div>
        <h3><Link href={`/realisations/${project.slug}/`}>{project.title}</Link></h3>
        <p>{project.summary}</p>
        <div className="tags">{project.skills.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}</div>
        <span className="text-link" aria-hidden="true">Voir l’étude de cas <span>→</span></span>
      </div>
    </article>
  );
}
