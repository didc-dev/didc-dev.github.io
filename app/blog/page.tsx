import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../_components/PageIntro";
import { articles } from "../_data/content";
export const metadata: Metadata = { title: "Blog technique", description: "Notes techniques sur les systèmes, réseaux et apprentissages de Daniel Cruz." };
export default function BlogPage() { const published = articles.filter((article) => article.status === "published"); return <><PageIntro eyebrow="Notes de terrain" title="Comprendre, pratiquer, expliquer" lead="Des articles courts qui transforment les apprentissages du laboratoire en repères utiles." /><section className="section section-shell"><div className="article-grid">{published.map((article) => <article key={article.slug}><div className="meta"><span>{article.category}</span><span>{article.reading}</span></div><h2><Link href={`/blog/${article.slug}/`}>{article.title}</Link></h2><p>{article.excerpt}</p><Link className="text-link" href={`/blog/${article.slug}/`}>Lire l’article →</Link></article>)}</div></section></>; }
