import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const html = async (file) => readFile(new URL(`dist/client/${file}`, root), "utf8");

test("les routes publiques principales et la page 404 sont exportées", async () => {
  for (const route of ["index.html", "parcours/index.html", "metiers/index.html", "realisations/index.html", "formations/index.html", "blog/index.html", "contact/index.html", "404.html"]) await access(new URL(`dist/client/${route}`, root));
});

test("l’accueil présente les trois piliers avec un poids comparable", async () => {
  const source = await html("index.html");
  for (const title of ["Infrastructures &amp; électricité", "Planification &amp; coordination", "Informatique &amp; systèmes"]) assert.match(source, new RegExp(title));
  assert.match(source, /Technicien en infrastructures industrielles/);
  assert.match(source, /Laboratoire Proxmox VE/);
});

test("les contenus distinguent expérience, projet personnel et laboratoire", async () => {
  const source = await html("realisations/index.html");
  assert.match(source, /Expérience professionnelle/);
  assert.match(source, /Projet personnel/);
  assert.match(source, /Laboratoire d’apprentissage/);
  assert.match(source, /Illustration technique/);
});

test("chaque réalisation détaillée est exportée", async () => {
  for (const slug of ["infrastructures-industrielles", "planification-electrique", "fibre-optique-tests", "laboratoire-proxmox-ve", "active-directory-cruzlab", "diagnostic-informatique", "raspberry-pi-services", "domotique-maison"]) await access(new URL(`dist/client/realisations/${slug}/index.html`, root));
});

test("les quatre articles équilibrés sont exportés et le brouillon reste privé", async () => {
  const source = await html("blog/index.html");
  for (const slug of ["dns-annuaire-du-reseau", "methode-diagnostic-technique", "planification-du-plan-au-terrain", "fibre-link-test-otdr"]) await access(new URL(`dist/client/blog/${slug}/index.html`, root));
  assert.doesNotMatch(source, /Sécurité électrique en Suisse/);
});

test("les données privées restent exclues du balisage visible", async () => {
  const files = ["index.html", "parcours/index.html", "contact/index.html", "realisations/index.html"];
  const source = (await Promise.all(files.map(html))).join("\n").replace(/<head[\s\S]*?<\/head>/gi, "").replace(/<script[\s\S]*?<\/script>/gi, "");
  assert.doesNotMatch(source, /Peixinho|date de naissance|nationalité|permis de séjour|mot de passe/i);
  assert.match(source, /Daniel Cruz/);
  assert.match(source, /Permis de conduire B/);
});

test("les images publiques possèdent un texte alternatif", async () => {
  const source = await html("index.html");
  for (const match of source.matchAll(/<img\b[^>]*>/g)) assert.match(match[0], /\balt="[^"]+"/);
});
