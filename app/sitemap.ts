import type { MetadataRoute } from "next";
import routes from "./_data/public-routes.json";
import { siteUrl } from "./_lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `${siteUrl}${route}`, lastModified: new Date("2026-07-29") }));
}
