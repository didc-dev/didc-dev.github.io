import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outputRoot = path.resolve("dist/client");
const siteUrl = "https://didc-dev.github.io";

async function collectRoutes(directory, relative = "") {
  const routes = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const nextRelative = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) routes.push(...await collectRoutes(path.join(directory, entry.name), nextRelative));
    else if (entry.name === "index.html") routes.push(relative ? `/${relative}/` : "/");
  }
  return routes;
}

const exportedRoutes = [...new Set(await collectRoutes(outputRoot))].sort((a, b) => a.localeCompare(b, "fr-CH"));
const routes = JSON.parse(await readFile(path.resolve("app/_data/public-routes.json"), "utf8"));
const unexpected = exportedRoutes.filter((route) => !routes.includes(route));
const missing = routes.filter((route) => !exportedRoutes.includes(route));
if (unexpected.length || missing.length) throw new Error(`Manifeste public incohérent. Routes inattendues: ${unexpected.join(", ") || "aucune"}. Routes manquantes: ${missing.join(", ") || "aucune"}.`);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`),
  '</urlset>',
  '',
].join("\n");

await writeFile(path.join(outputRoot, "sitemap.xml"), sitemap, "utf8");
await writeFile(path.join(outputRoot, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`, "utf8");
console.log(`SEO statique généré pour ${routes.length} routes.`);
