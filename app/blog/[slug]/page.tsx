import Link from "next/link";
import { notFound } from "next/navigation";
import { publishedNotes } from "../../_data/notes";
import { projects } from "../../_data/content";
import { TechnicalIllustration } from "../../_components/TechnicalIllustration";
import { ResponsiveImage } from "../../_components/ResponsiveImage";
import { noteImageKeys } from "../../_data/images";

export function generateStaticParams() { return publishedNotes.map((note) => ({ slug: note.slug })); }
export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = publishedNotes.find((item) => item.slug === slug);
  if (!note) notFound();
  const index = publishedNotes.findIndex((item) => item.slug === slug);
  const previous = publishedNotes[(index - 1 + publishedNotes.length) % publishedNotes.length];
  const next = publishedNotes[(index + 1) % publishedNotes.length];
  const related = publishedNotes.filter((item) => item.slug !== slug && (item.category === note.category || item.illustration === note.illustration)).slice(0, 3);
  const project = note.relatedProject ? projects.find((item) => item.slug === note.relatedProject) : undefined;
  return <article className="note-page section-shell">
    <Link className="back-link" href="/blog/">← Carnet technique</Link>
    <header className="note-hero"><div><p className="eyebrow">{note.category} · {note.type}</p><h1>{note.title}</h1><p className="article-lead">{note.summary}</p><dl className="note-meta"><div><dt>Niveau</dt><dd>{note.level}</dd></div><div><dt>Lecture</dt><dd>{note.reading}</dd></div><div><dt>Mise à jour</dt><dd><time dateTime={note.updatedAt}>28 juillet 2026</time></dd></div></dl></div>{noteImageKeys[note.slug] ? <ResponsiveImage imageKey={noteImageKeys[note.slug]} className="note-hero-image" sizes="(max-width: 980px) 100vw, 45vw" eager /> : <TechnicalIllustration kind={note.illustration} />}</header>
    <div className="note-layout"><main className="article-body"><p className="personal-intro">{note.introduction}</p>{note.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}<section className="key-points"><h2>Ce que je retiens</h2><ul>{note.keyPoints.map((point) => <li key={point}>{point}</li>)}</ul></section>{project && <section className="related-project"><p className="eyebrow">Projet lié</p><h2>{project.title}</h2><p>{project.summary}</p><Link className="text-link" href={`/realisations/${project.slug}/`}>Voir la réalisation <span aria-hidden="true">→</span></Link></section>}<section className="note-sources"><h2>Sources et repères</h2><ul>{note.sources.map((source) => <li key={source}>{source}</li>)}</ul></section></main><aside className="note-aside"><h2>Outils associés</h2><div className="tags">{note.tools.map((tool) => <span key={tool}>{tool}</span>)}</div><p>Statut : note publiée</p></aside></div>
    <nav className="note-navigation" aria-label="Navigation entre les notes"><Link href={`/blog/${previous.slug}/`}><span>← Note précédente</span><strong>{previous.title}</strong></Link><Link href={`/blog/${next.slug}/`}><span>Note suivante →</span><strong>{next.title}</strong></Link></nav>
    <section className="related-notes"><p className="eyebrow">Continuer la lecture</p><h2>Notes liées</h2><div>{related.map((item) => <Link key={item.slug} href={`/blog/${item.slug}/`}><span>{item.category}</span><strong>{item.title}</strong></Link>)}</div></section>
  </article>;
}
