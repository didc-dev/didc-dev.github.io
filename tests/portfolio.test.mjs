import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const html = async (file) => readFile(new URL(`dist/client/${file}`, root), "utf8");
const source = async (file) => readFile(new URL(file, root), "utf8");

const mainRoutes = ["index.html", "parcours/index.html", "metiers/index.html", "realisations/index.html", "formations/index.html", "blog/index.html", "contact/index.html", "404.html"];
const projectSlugs = ["infrastructures-industrielles", "planification-electrique", "fibre-optique-tests", "laboratoire-proxmox-ve", "active-directory-cruzlab", "diagnostic-informatique", "raspberry-pi-services", "domotique-maison"];
const noteSlugs = ["dns-a-quoi-sert-il", "dhcp-configuration-reseau", "active-directory-role-general", "agdpl-explique-simplement", "hyperviseur-role", "proxmox-hyperv-virtualbox", "snapshot-sauvegarde-retour", "ip-masque-passerelle-dns", "diagnostic-reseau-premiere-methode", "diagnostiquer-sans-conclure", "link-test-et-otdr", "autocad-revit-approches", "documenter-une-modification", "tgbt-role-general", "raspberry-pi-petit-serveur", "wifi-ou-zigbee"];

test("les routes publiques principales sont exportées", async () => {
  for (const route of mainRoutes) await access(new URL(`dist/client/${route}`, root));
});

test("les réalisations et notes publiées sont exportées", async () => {
  for (const slug of projectSlugs) await access(new URL(`dist/client/realisations/${slug}/index.html`, root));
  for (const slug of noteSlugs) await access(new URL(`dist/client/blog/${slug}/index.html`, root));
});

test("le Carnet technique est public et les brouillons restent exclus", async () => {
  const page = await html("blog/index.html");
  assert.match(page, /Carnet technique/);
  assert.match(page.replace(/<!--.*?-->/g, ""), /16 notes/);
  assert.doesNotMatch(page, /Règles de sécurité électrique suisses/);
  await assert.rejects(access(new URL("dist/client/blog/securite-electrique-suisse/index.html", root)));
});

test("la recherche et les filtres du carnet sont interactifs", async () => {
  const component = await source("app/_components/TechnicalNotebook.tsx");
  for (const marker of ["type=\"search\"", "setCategory", "setType", "aria-live=\"polite\"", "Réinitialiser"]) assert.match(component, new RegExp(marker));
});

test("le menu mobile respecte les interactions essentielles", async () => {
  const header = await source("app/_components/SiteHeader.tsx");
  for (const marker of ["Escape", "pointerdown", "document.body.style.overflow", "aria-expanded", "buttonRef.current?.focus", "usePathname"]) assert.match(header, new RegExp(marker.replace(/[?.]/g, "\\$&")));
});

test("le contenu public ne contient ni notes internes ni ton de candidature", async () => {
  const pages = await Promise.all([...mainRoutes.filter((file) => file !== "404.html"), ...projectSlugs.map((slug) => `realisations/${slug}/index.html`), ...noteSlugs.map((slug) => `blog/${slug}/index.html`)].map(html));
  const visible = pages.join("\n").replace(/<head[\s\S]*?<\/head>/gi, "").replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ");
  const forbidden = /opportunité professionnelle|vous recherchez un profil|je suis ouvert aux environnements|future collaboration|modèle exact non précisé|pas une certification obtenue|le portfolio n’affirme|contenu à compléter|donnée non vérifiée|information à confirmer|placeholder|prochaine mise à jour|brouillon en attente|ne représente pas une mission client/i;
  assert.doesNotMatch(visible, forbidden);
});

test("les données privées restent exclues du contenu visible", async () => {
  const pages = await Promise.all(["index.html", "parcours/index.html", "contact/index.html", "realisations/index.html"].map(html));
  const visible = pages.join("\n").replace(/<head[\s\S]*?<\/head>/gi, "").replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ");
  assert.doesNotMatch(visible, /Peixinho|date de naissance|nationalité|permis de séjour|mot de passe/i);
  assert.match(visible, /Daniel Cruz/);
  assert.match(visible, /Permis de conduire B/);
});

test("les images publiques possèdent un texte alternatif", async () => {
  for (const page of await Promise.all(mainRoutes.map(html))) for (const match of page.matchAll(/<img\b[^>]*>/g)) assert.match(match[0], /\balt="[^"]+"/);
});

test("chaque note publiée possède un visuel dédié et unique", async () => {
  const images = await source("app/_data/images.ts");
  const mapBlock = images.match(/export const noteImageKeys[\s\S]*?= \{([\s\S]*?)\n\};/);
  assert.ok(mapBlock, "La table noteImageKeys doit exister");

  const entries = [...mapBlock[1].matchAll(/"([^"]+)":\s*"([^"]+)"/g)].map((match) => ({ slug: match[1], imageKey: match[2] }));
  assert.deepEqual(entries.map(({ slug }) => slug).sort(), [...noteSlugs].sort());
  assert.equal(new Set(entries.map(({ imageKey }) => imageKey)).size, noteSlugs.length, "Chaque note doit utiliser un visuel différent");
});

test("toutes les variantes responsive des nouveaux visuels existent", async () => {
  const bases = [
    "article_active_directory_role_general", "article_agdlp_explique_simplement", "article_dhcp_configuration_reseau",
    "article_diagnostic_reseau_premiere_methode", "article_documenter_une_modification", "article_hyperviseur_role",
    "article_ip_masque_passerelle_dns", "article_proxmox_hyperv_virtualbox", "article_raspberry_pi_petit_serveur",
    "article_snapshot_sauvegarde_retour", "article_tgbt_role_general", "article_wifi_ou_zigbee",
  ];
  for (const base of bases) {
    for (const width of [480, 800, 1200, 1672]) {
      for (const format of ["avif", "webp"]) await access(new URL(`public/images/portfolio/articles/${base}-${width}.${format}`, root));
    }
  }
  for (const width of [480, 800, 1200, 1800]) {
    for (const format of ["avif", "webp"]) await access(new URL(`public/images/portfolio/timeline/timeline_2017_2021_installation_electrique-${width}.${format}`, root));
  }
});

test("les protections responsive et mouvement réduit sont présentes", async () => {
  const css = await source("app/globals.css");
  assert.match(css, /overflow-x:clip/);
  assert.match(css, /clamp\(2\.75rem,15vw,4rem\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
});
