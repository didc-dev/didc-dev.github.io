import type { MetadataRoute } from "next";
import { articles, projects } from "./_data/content";
import { siteUrl } from "./_lib/site";
export default function sitemap(): MetadataRoute.Sitemap { const routes = ["", "/parcours", "/metiers", "/realisations", "/formations", "/blog", "/contact"]; return [...routes.map((route) => ({ url: `${siteUrl}${route}/`, lastModified: new Date("2026-07-28") })), ...projects.map((p) => ({ url: `${siteUrl}/realisations/${p.slug}/`, lastModified: new Date("2026-07-28") })), ...articles.filter((a) => a.status === "published").map((a) => ({ url: `${siteUrl}/blog/${a.slug}/`, lastModified: new Date("2026-07-28") }))]; }
