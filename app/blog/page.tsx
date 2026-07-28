import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../_components/PageIntro";
import { articles } from "../_data/content";
export const metadata: Metadata = { title: "Blog technique", description: "Notes de Daniel Cruz sur le diagnostic, la planification, la fibre et les systèmes." };
export default function BlogPage() { const published = articles.filter((article) => article.status === "published"); return <><PageIntro eyebrow="Notes techniques" title="Comprendre, pratiquer, expliquer" lead="Des repères courts entre terrain, planification, fibre, diagnostic et systèmes. Les sujets réglementaires non vérifiés restent en brouillon." /><section className="section section-shell"><div className="article-grid">{published.map((article) => <article key={article.slug}><div className="meta"><span>{article.category}</span><span>{article.reading}</span></div><h2><Link href={`/blog/${article.slug}/`}>{article.title}</Link></h2><p>{article.excerpt}</p><Link className="text-link" href={`/blog/${article.slug}/`}>Lire l’article →</Link></article>)}</div></section></>; }
