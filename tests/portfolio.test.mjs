import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const html = async (file) => readFile(new URL(`dist/client/${file}`, root), "utf8");
const source = async (file) => readFile(new URL(file, root), "utf8");

const mainRoutes = ["index.html", "parcours/index.html", "metiers/index.html", "realisations/index.html", "formations/index.html", "blog/index.html", "contact/index.html", "404.html"];
const projectSlugs = ["infrastructures-industrielles", "planification-electrique", "fibre-optique-tests", "laboratoire-proxmox-ve", "active-directory-cruzlab", "diagnostic-informatique", "raspberry-pi-services", "domotique-maison"];
const noteSlugs = ["dns-a-quoi-sert-il", "dhcp-configuration-reseau", "active-directory-role-general", "agdpl-explique-simplement", "hyperviseur-role", "proxmox-hyperv-virtualbox", "snapshot-sauvegarde-retour", "ip-masque-passerelle-dns", "diagnostic-reseau-premiere-methode", "diagnostiquer-sans-conclure", "link-test-et-otdr", "autocad-revit-approches", "documenter-une-modification", "tgbt-role-general", "raspberry-pi-petit-serveur", "wifi-ou-zigbee"];
const publicRoutes = JSON.parse(await source("app/_data/public-routes.json"));
const routeFile = (route) => route === "/" ? "index.html" : `${route.slice(1)}index.html`;

test("les routes publiques principales sont exportées", async () => {
  for (const route of mainRoutes) await access(new URL(`dist/client/${route}`, root));
  for (const file of ["robots.txt", "sitemap.xml", "qr-didc-dev.png"]) await access(new URL(`dist/client/${file}`, root));
});

test("les repères publics utilisent la nouvelle adresse GitHub Pages", async () => {
  const [homePage, projectPage, notePage, robots, sitemap] = await Promise.all([html("index.html"), html("realisations/laboratoire-proxmox-ve/index.html"), html("blog/dns-a-quoi-sert-il/index.html"), html("robots.txt"), html("sitemap.xml")]);
  for (const content of [homePage, robots, sitemap]) {
    assert.doesNotMatch(content, /Peixinho987|localhost/i);
  }
  assert.match(homePage, /rel="canonical" href="https:\/\/didc-dev\.github\.io\/"/);
  assert.match(projectPage, /rel="canonical" href="https:\/\/didc-dev\.github\.io\/realisations\/laboratoire-proxmox-ve\/"/);
  assert.match(notePage, /rel="canonical" href="https:\/\/didc-dev\.github\.io\/blog\/dns-a-quoi-sert-il\/"/);
  assert.match(robots, /Sitemap: https:\/\/didc-dev\.github\.io\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/didc-dev\.github\.io\/<\/loc>/);
});

test("le manifeste public et les métadonnées SEO couvrent exactement les 31 pages", async () => {
  assert.equal(publicRoutes.length, 31);
  assert.equal(new Set(publicRoutes).size, publicRoutes.length);
  const titles = new Set();
  for (const route of publicRoutes) {
    const page = await html(routeFile(route));
    const canonical = `https://didc-dev.github.io${route}`;
    assert.match(page, new RegExp(`rel="canonical" href="${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.match(page, new RegExp(`property="og:url" content="${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    const title = page.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title, `Titre manquant pour ${route}`);
    assert.ok(!titles.has(title), `Titre dupliqué: ${title}`);
    titles.add(title);
    assert.doesNotMatch(page, /Peixinho987|localhost|NEXT_PUBLIC_SITE_URL/i);
  }
  const sitemap = await html("sitemap.xml");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.deepEqual(urls, publicRoutes.map((route) => `https://didc-dev.github.io${route}`));
});

test("la structure accessible évite les contrôles masqués et les régions principales imbriquées", async () => {
  const [tradeExplorer, notePage, projectCard] = await Promise.all([
    source("app/_components/TradeExplorer.tsx"),
    source("app/blog/[slug]/page.tsx"),
    source("app/_components/ProjectCard.tsx"),
  ]);
  assert.doesNotMatch(tradeExplorer, /className="trade-list" aria-hidden="true"/);
  assert.doesNotMatch(notePage, /<main className="article-body">/);
  assert.doesNotMatch(projectCard, /aria-hidden="true" tabIndex=\{-1\}/);
  assert.match(projectCard, /<h3><Link href=/);
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
  for (const marker of ["Escape", "Tab", "pointerdown", "document.body.style.overflow", "menu-open", "aria-expanded", "buttonRef.current?.focus", "usePathname", "nav-recruiter-quick", "recruiterBar.cvPath"]) assert.match(header, new RegExp(marker.replace(/[?.]/g, "\\$&")));
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

test("la page d’accueil et le panneau partagent la disponibilité immédiate", async () => {
  const page = await html("index.html");
  const visible = page.replace(/<head[\s\S]*?<\/head>/gi, "").replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ");
  assert.equal((visible.match(/Disponible pour de nouvelles opportunités/g) ?? []).length, 2);
  assert.equal((visible.match(/Disponible dès maintenant/g) ?? []).length, 4);
  assert.doesNotMatch(visible, /Connect Groupe E · depuis 2024/);
});

test("la barre recruteur est globale, accessible et se ferme proprement", async () => {
  const [layout, component] = await Promise.all([
    source("app/layout.tsx"),
    source("app/_components/StickyRecruiterBar.tsx"),
  ]);
  assert.match(layout, /<StickyRecruiterBar \/>/);
  for (const marker of ["aria-expanded", "aria-controls", "Escape", "Tab", "pointerdown", "matchMedia", "document.documentElement.style.overflow", "usePathname", "triggerRef.current?.focus", "aria-hidden={!open}", "aria-modal", "recruiter-overlay"]) {
    assert.match(component, new RegExp(marker.replace(/[?.{}!]/g, "\\$&")));
  }
  for (const file of mainRoutes) {
    const page = await html(file);
    assert.match(page, /aria-controls="recruiter-panel"/);
    assert.match(page, /id="recruiter-panel"/);
  }
});

test("la configuration centralise le statut, le contact et les repères publics", async () => {
  const [config, emailLink, hero, contact] = await Promise.all([
    source("app/_data/recruiterBar.ts"), source("app/_components/EmailLink.tsx"),
    source("app/_components/HeroPortraitCard.tsx"), source("app/contact/page.tsx"),
  ]);
  assert.match(config, /professionalStatus: ProfessionalStatus = "available"/);
  assert.match(config, /cvAvailable: true/);
  assert.match(config, /cvPath: "\/documents\/daniel-cruz-cv\.pdf"/);
  assert.match(config, /publicLabel: "Renens \(VD\), Suisse romande"/);
  assert.match(config, /\{ code: "FR", label: "Français" \}/);
  assert.match(emailLink, /contactEmailHref/);
  assert.match(hero, /currentAvailability/);
  assert.match(contact, /profileLocation/);
  assert.match(contact, /profileLanguages/);
});

test("le CV centralisé est téléchargeable depuis le hero, le menu et la barre recruteur", async () => {
  const page = await html("index.html");
  assert.doesNotMatch(page, /PDF bientôt disponible/);
  assert.equal(page.match(/href="\/documents\/daniel-cruz-cv\.pdf"/g)?.length, 3);
  assert.match(page, /href="\/documents\/daniel-cruz-cv\.pdf"[^>]*download/);
  const [home, header] = await Promise.all([source("app/page.tsx"), source("app/_components/SiteHeader.tsx")]);
  assert.match(home, /recruiterBar\.cvPath/);
  assert.match(header, /recruiterBar\.cvPath/);
  await access(new URL("public/documents/daniel-cruz-cv.pdf", root));
  await access(new URL("dist/client/documents/daniel-cruz-cv.pdf", root));
});

test("les permis restent des repères illustratifs sans photo ni données sensibles", async () => {
  const page = await html("index.html");
  const component = await source("app/_components/StickyRecruiterBar.tsx");
  assert.match(page, /Permis C/);
  assert.match(page, /Autorisation d’établissement/);
  assert.match(page, /Permis de conduire B/);
  assert.match(component, /recruiter-residence-card/);
  assert.doesNotMatch(component, /daniel-cruz\.jpg|Portrait professionnel de Daniel Cruz/);
  assert.doesNotMatch(component, /numéro|validité|signature|code-barres|date de naissance/i);
});

test("la disponibilité et les périodes professionnelles sont cohérentes sur toutes les pages concernées", async () => {
  const pages = await Promise.all(["index.html", "parcours/index.html", "realisations/index.html", "realisations/infrastructures-industrielles/index.html", "realisations/planification-electrique/index.html"].map(html));
  const visible = pages.map((page) => page.replace(/<head[\s\S]*?<\/head>/gi, "").replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ")).join("\n");
  assert.doesNotMatch(visible, /Poste actuel(?!lement)|depuis 2024|2021[–-]aujourd’hui|raison du départ|licenci/i);
  assert.match(visible, /2024[–-]2026/);
  assert.match(visible, /2021[–-]2026/);
});

test("les sources publiques minimisent le nom et les cartes n’ont qu’une destination clavier", async () => {
  const [profile, importedProfile, projectCard, notebook] = await Promise.all([
    source("content/cv/public-profile.json"), source("app/_data/public-profile.json"), source("app/_components/ProjectCard.tsx"), source("app/_components/TechnicalNotebook.tsx"),
  ]);
  for (const content of [profile, importedProfile]) {
    assert.doesNotMatch(content, /Daniel Inácio da Cruz/);
    assert.match(content, /"name": "Daniel Cruz"/);
  }
  assert.equal((projectCard.match(/<Link\b/g) ?? []).length, 1);
  assert.equal((notebook.match(/<Link\b/g) ?? []).length, 1);
  assert.match(notebook, /role="group"/);
});

test("le QR code publié reste l’artefact validé", async () => {
  const qr = await readFile(new URL("public/qr-didc-dev.png", root));
  assert.equal(createHash("sha256").update(qr).digest("hex"), "55f838c06ac90ee45a955f317172f1f39ba33395a4194862b7b94e8eb2796696");
});

test("les images publiques possèdent un attribut alternatif", async () => {
  for (const page of await Promise.all(mainRoutes.map(html))) for (const match of page.matchAll(/<img\b[^>]*>/g)) assert.match(match[0], /\balt="[^"]*"/);
});

test("les images responsive utilisent le format WebP compatible", async () => {
  const responsiveImage = await source("app/_components/ResponsiveImage.tsx");
  assert.match(responsiveImage, /type="image\/webp"/);
  assert.doesNotMatch(responsiveImage, /type="image\/avif"/);
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
  assert.match(css, /@media print[\s\S]*?\.recruiter-dock[\s\S]*?display:none/);
  assert.match(css, /@media \(max-width:768px\)[\s\S]*?\.recruiter-dock/);
  assert.match(css, /\.recruiter-dock \{[^}]*right:0/);
  assert.match(css, /\.recruiter-toggle \{[^}]*right:-7px[^}]*width:34px[^}]*height:96px/);
  assert.match(css, /\.hero \{[^}]*grid-template-rows:clamp\(340px,28vw,405px\)[^}]*overflow:visible/);
  assert.match(css, /\.hero-panorama \{[^}]*height:100%[^}]*opacity:1[^}]*mask-image:none/);
  assert.match(css, /\.hero-panorama img \{ object-fit:cover; object-position:center; \}/);
  assert.match(css, /\.hero \.portrait-card \{[^}]*grid-row:1\/3[^}]*margin-top:clamp\(255px,21vw,300px\)/);
  assert.match(css, /@media \(max-width:980px\)[\s\S]*?\.hero \{[^}]*grid-template-columns:minmax\(0,1fr\)/);
  assert.match(css, /@media \(max-width:680px\)[\s\S]*?\.hero-copy \{[^}]*grid-row:1[^}]*\}[\s\S]*?\.hero \.portrait-card \{[^}]*grid-row:2[^}]*min-height:124px[\s\S]*?\.hero-panorama \{[^}]*grid-row:3[^}]*height:clamp\(165px,47vw,195px\)/);
  assert.match(css, /@media \(max-width:768px\)[\s\S]*?bottom:calc\(\.9rem \+ env\(safe-area-inset-bottom\)\)[\s\S]*?max-height:min\(82dvh,720px\)[\s\S]*?overscroll-behavior:contain/);
  assert.match(css, /padding-bottom:env\(safe-area-inset-bottom\)/);
  assert.doesNotMatch(css, /\.hero::before \{[^}]*rgba\(246,243,237,\.93\)/);
});
