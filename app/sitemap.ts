import type { MetadataRoute } from "next";
import { projects } from "./_data/content";
import { publishedNotes } from "./_data/notes";
import { siteUrl } from "./_lib/site";
export default function sitemap(): MetadataRoute.Sitemap { const routes = ["", "/parcours", "/metiers", "/realisations", "/formations", "/blog", "/contact"]; return [...routes.map((route) => ({ url: `${siteUrl}${route}/`, lastModified: new Date("2026-07-28") })), ...projects.map((p) => ({ url: `${siteUrl}/realisations/${p.slug}/`, lastModified: new Date("2026-07-28") })), ...publishedNotes.map((note) => ({ url: `${siteUrl}/blog/${note.slug}/`, lastModified: new Date(note.updatedAt) }))]; }
