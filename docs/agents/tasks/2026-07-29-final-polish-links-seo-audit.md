# Audit final des liens, du SEO et des URL — 29 juillet 2026

## Verdict

**Aucun défaut bloquant constaté sur la production actuelle. Publication techniquement cohérente, avec des risques de régression à traiter avant les prochains enrichissements.**

L’audit porte sur le commit `20ad211`, présent sur `main` et `origin/main`, ainsi que sur la production `https://didc-dev.github.io/`. Le dernier déploiement GitHub Pages consulté, exécution `30469601221`, est terminé avec succès. Le dépôt était propre au début de la mission.

Les défauts critiques du premier audit sont corrigés : les canonical, les métadonnées propres aux pages de détail, `robots.txt`, `sitemap.xml` et le QR code sont désormais réellement publiés. Les points ouverts concernent surtout la reproductibilité, la prévention d’une mauvaise origine de publication, la duplication de logique SEO et l’enrichissement des données structurées.

## Contrôles effectués

- lecture des instructions, du journal, des preuves du 29 juillet et des sources SEO actuelles ;
- parcours HTTP de toutes les URL du sitemap et de tous les liens d’ancrage rendus ;
- comparaison des titres, descriptions, canonical, Open Graph et Twitter ;
- contrôle de `robots.txt`, `sitemap.xml`, des redirections et des types MIME ;
- inspection des données structurées JSON-LD ;
- comparaison SHA-256 du QR local et du QR servi par GitHub Pages ;
- recherche des anciennes origines, de `localhost` et des références à `Peixinho987` ;
- inspection du workflow GitHub Pages et de la logique de génération SEO.

## Résultats conformes en production

### Pages et liens

- Le sitemap contient **31 URL**, toutes uniques, en HTTPS, sur `didc-dev.github.io` et avec barre oblique finale.
- Les 31 pages répondent en HTTP `200`.
- Les 31 pages ont exactement un `h1`, un titre, une description et un canonical.
- Les **31 titres sont uniques** et les **31 canonical sont uniques**.
- Chaque canonical correspond exactement à l’URL contrôlée.
- `og:url` correspond exactement au canonical sur les 31 pages.
- Le parcours des pages a relevé 569 occurrences de liens, représentant 35 `href` distincts ; aucune cible HTML interne n’emploie une forme incohérente sans barre finale.
- `/contact` redirige en `301` vers `/contact/`.
- `http://didc-dev.github.io/` redirige en `301` vers `https://didc-dev.github.io/`.
- Aucune URL HTTP externe n’est rendue. Le seul protocole spécial est `mailto:danielinaciocruz1@gmail.com`.
- L’ancienne origine `Peixinho987` et `localhost` sont absents du site publié et du sitemap.

### Robots et sitemap

| Ressource | Statut | Type MIME | Contenu vérifié |
| --- | --- | --- | --- |
| `/robots.txt` | `200` | `text/plain; charset=utf-8` | autorise `/` et annonce le sitemap HTTPS exact |
| `/sitemap.xml` | `200` | `application/xml` | 31 URL uniques, aucune ancienne origine |

Le sitemap et les canonical décrivent le même ensemble de 31 pages. La page `404.html`, le QR et les brouillons n’y figurent pas.

### Métadonnées sociales

- Les titres et descriptions Open Graph correspondent aux métadonnées HTML propres à chaque page.
- Les 31 pages possèdent `og:url`, `og:type=website`, `og:locale=fr_CH` et une image absolue.
- Les 31 pages possèdent `twitter:card=summary_large_image` ainsi qu’un titre, une description et une image.
- L’image sociale est servie sur `https://didc-dev.github.io/og-daniel-cruz.png`.

### QR code

Le QR public est cohérent avec l’artefact validé :

- URL du fichier : `https://didc-dev.github.io/qr-didc-dev.png` ;
- HTTP `200`, type `image/png`, taille 16 572 octets ;
- SHA-256 public : `55f838c06ac90ee45a955f317172f1f39ba33395a4194862b7b94e8eb2796696` ;
- SHA-256 local : identique ;
- charge utile décodée dans la preuve : `https://didc-dev.github.io/` ;
- lien englobant déclaré dans le code : `https://didc-dev.github.io/` ;
- lien de téléchargement : `/qr-didc-dev.png`.

## Défauts concrets et risques résiduels

### P1 — L’origine de publication n’est pas validée

`app/_lib/site.ts` et `scripts/generate-static-seo.mjs` acceptent toute valeur de `NEXT_PUBLIC_SITE_URL` après avoir retiré une barre finale. Le workflow fournit aujourd’hui la bonne origine, mais une variable erronée, un fork ou une modification du workflow pourrait produire un site parfaitement construit avec des canonical, des URL Open Graph, un sitemap et un QR contextuel incohérents.

La valeur du workflow est calculée avec `github.repository_owner`; elle n’exprime donc pas explicitement la seule origine officielle attendue.

**Recommandation :** ajouter une validation commune et bloquante pour les builds de publication. L’origine doit être une URL HTTPS valide et, dans le workflow officiel, être strictement égale à `https://didc-dev.github.io`. Ajouter un test négatif avec `localhost`, une origine arbitraire et un chemin ajouté à l’hôte.

### P1 — Le sitemap indexe automatiquement toute future route exportée

`scripts/generate-static-seo.mjs` ajoute au sitemap chaque fichier `index.html` trouvé dans `dist/client`. Cette stratégie donne aujourd’hui exactement les 31 bonnes routes, mais elle publiera automatiquement une future route de prévisualisation, de test ou de contenu non destiné à l’indexation si cette route est exportée par erreur.

**Recommandation :** construire le sitemap depuis un manifeste public explicite ou appliquer une politique d’exclusion testée. Vérifier que chaque URL du sitemap correspond à une route déclarée comme publique et que chaque note respecte `status: published`.

### P2 — Deux implémentations sitemap/robots peuvent diverger

Le dépôt conserve :

- `app/sitemap.ts` et `app/robots.ts` ;
- `scripts/generate-static-seo.mjs`, qui écrase ou complète le résultat dans `dist/client`.

La production dépend en pratique du script statique. Les implémentations ne sont déjà pas équivalentes : `app/sitemap.ts` contient des `lastModified` fixes ou éditoriaux, alors que le sitemap réellement publié n’a aucun `lastmod`. Si vinext commence à exporter ces MetadataRoute ou si le script est retiré, le résultat peut changer silencieusement.

**Recommandation :** choisir une seule source de vérité. Si le script statique reste nécessaire, extraire les données communes dans un module neutre et tester l’égalité exacte des URL produites. Ne pas conserver de dates fixes `2026-07-28` comme pseudo-date de mise à jour.

### P2 — Le QR validé n’est pas reproductible

Le PNG public est correct, décodable et identique au fichier local. Cependant, aucun générateur local versionné, paramétrage déterministe ou test de décodage n’est présent dans `scripts/`, `package.json` ou les tests. Le test actuel vérifie uniquement l’existence du fichier.

**Recommandation :** ajouter un générateur local épinglé avec charge utile, niveau de correction, masque, marge, couleurs et dimensions explicites. Le pipeline doit décoder l’artefact avec une bibliothèque indépendante, comparer strictement la valeur à `https://didc-dev.github.io/` et vérifier une empreinte attendue.

### P2 — La couverture SEO automatisée reste partielle

`tests/portfolio.test.mjs` contrôle les canonical de l’accueil, d’une réalisation et d’une note, mais pas les 31 pages. La recherche d’ancienne origine ne couvre également qu’un sous-ensemble de fichiers. L’exhaustivité mentionnée dans la revue QA provient d’un contrôle ponctuel, pas d’un test complet visible dans la suite versionnée.

**Recommandation :** transformer le contrôle exhaustif en test permanent : pour chaque URL du sitemap, vérifier le fichier exporté, un titre et une description uniques, un seul canonical, `og:url === canonical`, l’origine exacte, l’absence de brouillon et l’absence de `Peixinho987` ou `localhost`.

### P2 — Données structurées valides mais trop peu reliées au site

Les 31 pages publient le même objet JSON-LD `Person`. L’objet est syntaxiquement valide et contient le nom, le métier, l’adresse régionale et les domaines de connaissance, mais il ne contient ni `url`, ni `@id`, ni `image`. Il n’exprime pas non plus la nature des pages de notes ou de réalisations.

**Recommandation :** donner à la personne un identifiant stable, par exemple `https://didc-dev.github.io/#person`, avec `url` et l’image publique. Relier ensuite les pages pertinentes à cette personne. Pour les notes, envisager `BlogPosting` ou `TechArticle` uniquement avec des dates et un auteur exacts ; pour les réalisations, employer un type adapté sans transformer un laboratoire en mission professionnelle. Ajouter `BreadcrumbList` seulement si une hiérarchie visible correspondante est maintenue.

### P3 — Les sources éditoriales ne sont pas des liens

Les rubriques « Sources et repères » affichent des noms comme « Microsoft Learn » ou « RFC 1034 », mais aucun lien HTTP externe n’est proposé. Il est donc impossible de contrôler la destination et plus difficile pour le lecteur de consulter la source primaire.

**Recommandation :** migrer progressivement les sources vers `{ label, url }`, en utilisant uniquement les pages officielles réellement vérifiées. Ajouter un contrôle de liens externes distinct, tolérant les protections `403` et `429`.

### P3 — Texte alternatif Twitter absent

Open Graph publie `og:image:alt`, mais les métadonnées générées par `pageMetadata()` ne rendent pas `twitter:image:alt`. Ce n’est pas bloquant pour l’affichage des cartes, mais c’est une perte de contexte accessible sur les plateformes qui exploitent ce champ.

**Recommandation :** utiliser un descripteur d’image Twitter qui porte le même texte alternatif que l’image Open Graph, si le type Metadata de la version actuelle le permet, puis vérifier le HTML exporté.

### P3 — Preuve de production non clôturée

`docs/proofs/2026-07-29/final-verification.md` indique encore que la vérification GitHub Pages sera ajoutée après publication. Or les commits sont maintenant déployés et le contrôle de production est possible. Le rapport de preuve ne reflète donc pas l’état final atteint.

**Recommandation :** ajouter une preuve post-déploiement datée, sans réécrire les résultats antérieurs, comprenant l’exécution GitHub Actions, les statuts HTTP, les types MIME, la parité sitemap/canonical et le hash du QR téléchargé.

### P3 — Actions GitHub référencées par tags mobiles

Le workflow utilise `actions/checkout@v4`, `actions/setup-node@v4`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3` et `actions/deploy-pages@v4`. Ces références sont habituelles, mais leurs tags peuvent évoluer.

**Recommandation :** pour un durcissement de la chaîne de publication, épingler les actions sur des SHA vérifiés avec commentaire de version, puis organiser leur mise à jour contrôlée.

## Cohérence de l’ancienne identité

Les références `Peixinho987` encore présentes sont historiques, dans la revue et les preuves du 28 juillet, ou intentionnelles dans les tests de non-régression. Elles ne figurent pas dans le code public actif, les canonical, le sitemap, le QR ou le HTML déployé.

Il convient de préserver les preuves historiques et d’éviter leur réécriture silencieuse. Les nouveaux documents et toutes les sorties publiques doivent continuer à employer uniquement `didc-dev`.

## Priorité proposée

1. Verrouiller l’origine officielle lors du build de publication.
2. Empêcher le sitemap d’indexer automatiquement une future route non publique.
3. Unifier la logique sitemap/robots et rendre le contrôle SEO exhaustif permanent.
4. Rendre le QR reproductible et décodé dans le pipeline.
5. Clôturer la preuve post-déploiement.
6. Enrichir prudemment les données structurées et les sources externes.
7. Ajouter le texte alternatif Twitter et durcir les références des actions GitHub.

## Critères de sortie recommandés

- 31 pages HTTP `200`, 31 canonical uniques et 31 `og:url` identiques ;
- sitemap strictement égal à l’ensemble public autorisé ;
- `robots.txt`, `sitemap.xml`, le QR et l’image sociale avec statut et type MIME corrects ;
- build refusé pour toute origine autre que `https://didc-dev.github.io` dans le workflow officiel ;
- QR régénéré, décodé et comparé octet pour octet à l’URL attendue ;
- aucune ancienne origine ou valeur `localhost` dans l’artefact publié ;
- preuve post-déploiement conservée avec le SHA du commit et l’identifiant d’exécution GitHub Actions.

## Limites de cet audit

Le contrôle des liens externes est limité parce que le site ne publie actuellement aucun lien HTTP externe. L’audit ne remplace pas une validation par Google Search Console, Bing Webmaster Tools ou les outils de débogage des plateformes sociales. Aucune soumission à un moteur, aucune modification GitHub et aucune modification du code applicatif n’ont été effectuées.
