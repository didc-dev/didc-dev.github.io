import { mkdir, readFile, writeFile } from "node:fs/promises";
const source = new URL("../content/cv/public-profile.json", import.meta.url);
const target = new URL("../app/_data/public-profile.json", import.meta.url);
const profile = JSON.parse(await readFile(source, "utf8"));
for (const field of ["name", "displayName", "location", "email", "headline"]) {
  if (!profile[field]) throw new Error(`Champ CV public manquant: ${field}`);
}
await mkdir(new URL("../app/_data/", import.meta.url), { recursive: true });
await writeFile(target, JSON.stringify(profile, null, 2) + "\n");
console.log(`Profil public validé: ${profile.displayName}`);
