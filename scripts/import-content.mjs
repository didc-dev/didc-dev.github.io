import { readdir, readFile, writeFile } from "node:fs/promises";
const base = new URL("../content/projects/", import.meta.url);
const entries = [];
for (const folder of await readdir(base)) {
  const text = await readFile(new URL(`${folder}/project.md`, base), "utf8");
  const slug = text.match(/^slug:\s*(.+)$/m)?.[1]?.trim();
  const status = text.match(/^status:\s*(.+)$/m)?.[1]?.trim();
  if (slug !== folder) throw new Error(`Slug incohérent: ${folder}`);
  entries.push({ slug, status });
}
await writeFile(new URL("../app/_data/generated-manifest.json", import.meta.url), JSON.stringify({ generatedAt: "2026-07-28", projects: entries.filter((item) => item.status === "published") }, null, 2) + "\n");
console.log(`${entries.length} projets contrôlés; ${entries.filter((item) => item.status === "published").length} publiés.`);
