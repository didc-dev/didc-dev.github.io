import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("les routes publiques principales sont exportées", async () => {
  for (const route of ["index.html", "parcours/index.html", "metiers/index.html", "realisations/index.html", "formations/index.html", "blog/index.html", "contact/index.html"]) {
    await access(new URL(`dist/client/${route}`, root));
  }
});

test("le contenu public ne publie ni brouillon ni données privées", async () => {
  const files = ["index.html", "blog/index.html", "contact/index.html"];
  const html = (await Promise.all(files.map((file) => readFile(new URL(`dist/client/${file}`, root), "utf8")))).join("\n");
  const visibleMarkup = html
    .replace(/<head[\s\S]*?<\/head>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "");
  assert.doesNotMatch(visibleMarkup, /Peixinho|adresse privée|date de naissance|mot de passe/i);
  assert.doesNotMatch(visibleMarkup, /Sécurité électrique en Suisse/i);
  assert.match(visibleMarkup, /Daniel Cruz/);
});

test("chaque réalisation détaillée est exportée", async () => {
  for (const slug of ["laboratoire-proxmox-ve", "active-directory-cruzlab", "poste-windows-11", "raspberry-pi-services"]) {
    await access(new URL(`dist/client/realisations/${slug}/index.html`, root));
  }
});
