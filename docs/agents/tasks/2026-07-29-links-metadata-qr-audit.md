# Audit des liens, métadonnées et QR code — 29 juillet 2026

## Mandat et méthode

Audit en lecture seule du dépôt et de la publication `https://didc-dev.github.io/`. Aucun code applicatif, contenu public ou réglage GitHub n’a été modifié.

Éléments contrôlés :

- `AGENTS.md`, `docs/WORK_LOG.md` et toutes les preuves textuelles de `docs/proofs/2026-07-28/` ;
- état Git, dépôt distant, historique récent, workflow GitHub Pages et configuration Sites ;
- liens rendus et réponses HTTP de la version publique le 29 juillet 2026 ;
- métadonnées HTML, Open Graph, canonical, sitemap, robots et données structurées ;
- toutes les références suivies par Git à `Peixinho987` ;
- possibilité d’intégrer un QR code déterministe encodant exactement `https://didc-dev.github.io/`.

## Conclusion exécutive

La publication principale fonctionne et la navigation interne est saine : les 31 pages découvertes par parcours des liens internes répondent toutes en HTTP `200`. Le dépôt distant et GitHub Pages pointent bien vers `didc-dev/didc-dev.github.io`, HTTPS est imposé et le dernier workflow observé est réussi.

Les défauts prioritaires concernent la découvrabilité et l’identité des pages : `robots.txt` et `sitemap.xml` sont absents de la publication (`404`), aucun canonical ni `og:url` n’est rendu, et les 24 pages de détail (16 notes et 8 réalisations) héritent du titre, de la description et des métadonnées sociales génériques de l’accueil. La documentation affirme actuellement que les canonical sont construits, alors qu’ils ne sont pas présents dans le HTML publié.

Les trois mentions de l’ancienne identité `Peixinho987` sont limitées à des documents historiques. Elles ne contaminent ni le code, ni le workflow, ni le HTML public. Elles doivent rester traçables comme preuves historiques, avec une annotation claire indiquant qu’elles sont obsolètes, plutôt que d’être réécrites silencieusement.

## État GitHub Pages vérifié

| Contrôle | Constat | Évaluation |
| --- | --- | --- |
| Dépôt distant | `https://github.com/didc-dev/didc-dev.github.io.git` | Conforme |
| Type de site | dépôt utilisateur `didc-dev.github.io`, servi à la racine | Conforme ; aucun `basePath` nécessaire |
| Adresse publique | `https://didc-dev.github.io/`, HTTP `200` | Conforme |
| API GitHub Pages | publication publique, `build_type: workflow`, HTTPS imposé, aucun CNAME | Conforme |
| Workflow | `.github/workflows/deploy-pages.yml`, déclenché sur `main` et manuellement | Conforme |
| Dernière exécution consultée | `30464008864`, terminée avec succès le 29 juillet 2026 | Conforme |
| Artefact | `dist/client` publié par `actions/upload-pages-artifact` | Conforme à la construction actuelle |
| URL de production au build | `https://${{ github.repository_owner }}.github.io` | Correcte dans ce dépôt, mais indirecte |
| Permissions | `contents: read`, `pages: write`, `id-token: write` | Principe du moindre privilège respecté |

### Recommandations GitHub Pages

1. Définir l’origine de production une seule fois et explicitement à `https://didc-dev.github.io`, soit dans une variable de dépôt GitHub contrôlée, soit comme constante de production. La valeur dérivée du propriétaire est correcte aujourd’hui, mais un fork construit une autre origine sans signaler l’écart.
2. Faire échouer une construction de publication si `NEXT_PUBLIC_SITE_URL` est absent, invalide, non HTTPS ou différent de l’origine autorisée. Le repli actuel vers `http://localhost:3000` est utile en développement, mais ne doit jamais pouvoir alimenter un artefact publié.
3. Conserver le déploiement à la racine et `basePath = ""` tant que le dépôt reste exactement `didc-dev.github.io`.
4. En durcissement secondaire, épingler les actions GitHub tierces sur des SHA de commit vérifiés, avec commentaire de version, puis prévoir une mise à jour automatisée contrôlée.

## Liens internes et externes

### Liens internes

Le parcours automatisé depuis l’accueil a découvert 31 pages HTML : 7 routes principales, 8 réalisations et 16 notes. Toutes répondent en HTTP `200`, utilisent des chemins internes cohérents avec les barres obliques finales et restent sur l’origine `https://didc-dev.github.io`.

Les actifs essentiels contrôlés répondent également en `200` :

- `/favicon.svg` ;
- `/og-daniel-cruz.png` ;
- `/404.html`.

La route volontairement inexistante `/inexistant/` répond correctement en `404`.

### Liens externes

Le seul lien externe ou protocole spécial rendu et découvert est :

- `mailto:danielinaciocruz1@gmail.com` sur la page de contact.

Il n’existe aucun lien web externe cliquable dans les pages parcourues. Les « Sources et repères » des notes sont des libellés en texte simple, par exemple « Microsoft Learn — DHCP overview » ou « RFC 1034 — Domain Names » ; leur destination ne peut donc pas être contrôlée et l’utilisateur ne peut pas consulter directement la référence.

### Recommandations sur les liens

1. Ajouter un test de crawl sur l’export `dist/client` qui extrait tous les `href`, vérifie que chaque cible interne existe, refuse les références à `localhost` et à `Peixinho987`, et exige la forme canonique avec barre oblique finale pour les pages HTML.
2. Structurer progressivement les sources éditoriales sous la forme `{ label, url }` et privilégier les sources officielles déjà citées nominalement. Ne pas inventer d’URL par rapprochement approximatif.
3. Pour les futurs liens externes, conserver l’ouverture dans le même onglet par défaut. Si `target="_blank"` est réellement souhaité, ajouter `rel="noopener noreferrer"` et un indice accessible annonçant le nouvel onglet.
4. Tester les liens externes dans un contrôle séparé tolérant les réponses `403`/`429` de protection anti-robot, sans transformer une indisponibilité temporaire en échec de publication.

## Canonical, sitemap et robots

### Constats critiques

| Élément | Source présente | Résultat public | Impact |
| --- | --- | --- | --- |
| Canonical | `metadataBase` existe dans `app/layout.tsx`, mais aucun `alternates.canonical` n’est défini | aucun `<link rel="canonical">` sur les pages testées | les variantes d’URL ne sont pas consolidées explicitement |
| `og:url` | non défini | absent | les partages sociaux n’identifient pas l’URL propre à la page |
| Sitemap | `app/sitemap.ts` décrit les 31 routes attendues | `/sitemap.xml` répond `404` | les moteurs ne disposent pas de l’inventaire annoncé |
| Robots | `app/robots.ts` autorise `/` et annonce le sitemap | `/robots.txt` répond `404` | la directive et le lien de sitemap ne sont pas publiés |
| Documentation | `docs/DEPLOYMENT.md` dit que `NEXT_PUBLIC_SITE_URL` construit les « métadonnées canoniques » | affirmation non vérifiée dans le rendu | documentation trompeuse |

La cause observable est que les deux routes MetadataRoute existent dans le code, mais ne sont pas émises dans l’export `dist/client` publié par la chaîne vinext actuelle. Il s’agit d’une inférence fondée sur les sources et les réponses publiques, pas d’un diagnostic interne du compilateur.

### Recommandation d’implémentation

1. Définir pour chaque route une URL canonique absolue, avec origine exacte `https://didc-dev.github.io` et barre oblique finale. Ne pas poser uniquement `canonical: "/"` dans le layout, car cette valeur risquerait d’être héritée à tort par toutes les pages.
2. Centraliser un helper de métadonnées par route qui produit au minimum `title`, `description`, `alternates.canonical`, `openGraph.url`, `openGraph.title` et `openGraph.description`.
3. Ajouter `generateMetadata()` aux routes dynamiques `blog/[slug]` et `realisations/[slug]`, à partir des données déjà publiées, afin que chaque détail ait son propre titre, résumé, canonical et URL Open Graph.
4. Produire `robots.txt` et `sitemap.xml` comme fichiers statiques garantis dans `dist/client`. Tant que vinext n’exporte pas les MetadataRoute, utiliser un script de génération déterministe exécuté avant la publication, plutôt que de compter sur `app/robots.ts` et `app/sitemap.ts` seuls.
5. Générer le sitemap depuis les mêmes collections filtrées que le site (`projects` et `publishedNotes`), normaliser toutes les URL avec barre finale, et ne jamais inclure les brouillons.
6. Mettre à jour automatiquement `lastmod` depuis les dates éditoriales réelles. La date fixe `2026-07-28` pour les pages et les réalisations deviendra rapidement inexacte.
7. Ajouter des tests de publication exigeant HTTP `200`, type MIME approprié et contenu attendu pour `/robots.txt` et `/sitemap.xml`, ainsi qu’un canonical unique et exact sur chacune des 31 pages.

## Métadonnées HTML et sociales

### Points conformes

- `lang="fr-CH"` est présent sur le document.
- Le titre et la description de l’accueil sont rendus correctement.
- Les six pages principales secondaires possèdent un titre et une description propres.
- L’image Open Graph absolue `https://didc-dev.github.io/og-daniel-cruz.png` répond en `200`, avec dimensions déclarées `1200 × 630` et texte alternatif.
- Les icônes absolues pointent vers `https://didc-dev.github.io/favicon.svg`, qui répond en `200`.
- Les données structurées `Person` sont rendues sans référence à l’ancien compte GitHub.

### Défauts observés

1. Les 16 notes et les 8 réalisations héritent du titre générique « Daniel Cruz — Infrastructures, planification et technologies » et de la description de l’accueil.
2. Les pages secondaires, même celles dont le `<title>` est spécifique, héritent encore du titre et de la description Open Graph génériques.
3. Aucun `og:url` ni canonical n’est rendu.
4. Les pages dynamiques n’exportent pas de `generateMetadata()`.
5. Le schéma `Person` n’indique pas l’URL officielle du portfolio. Il pourrait inclure `url: "https://didc-dev.github.io/"` et l’image publique. Ne pas ajouter `sameAs` sans profil public confirmé et autorisé.
6. Le libellé `Peixinho987` n’apparaît pas dans le HTML public actuel, ce qui est conforme à la règle de ne pas l’utiliser comme identité professionnelle.

### Critères d’acceptation métadonnées

- chacune des 31 pages possède exactement un canonical absolu correspondant à son URL publique normalisée ;
- chacun des 31 canonical répond en `200` ;
- les 24 pages de détail ont un titre et une description uniques et factuels ;
- `og:url` égale le canonical de la page ;
- l’image Open Graph reste absolue et accessible ;
- aucune métadonnée publiée ne contient `localhost`, `Peixinho987` ou une origine issue d’un fork.

## Références à `Peixinho987`

Trois occurrences suivies par Git subsistent :

1. `docs/agents/reviews/ux-content-audit-2026-07-28.md` : URL de la version auditée à cette date ;
2. `docs/proofs/2026-07-28/PORTFOLIO_QA.md` : ancien nom de dépôt ;
3. `docs/proofs/2026-07-28/PORTFOLIO_QA.md` : ancienne adresse publique.

Ces occurrences sont historiques et non actives. L’ancienne URL répond désormais en `404`. Recommandation : préserver les preuves originales, puis ajouter une note datée « cible remplacée le 29 juillet 2026 par `https://didc-dev.github.io/` » dans le journal ou dans une preuve de migration. Les procédures courantes, tests et nouveaux documents doivent employer uniquement `didc-dev`.

## QR code déterministe

### Emplacement recommandé

Intégrer le QR code sur la page Contact, dans un bloc secondaire « Ouvrir ce portfolio sur un autre appareil », et dans la feuille d’impression. Ne pas l’ajouter à la navigation principale ni le répéter dans toutes les pages : sur mobile, un QR code pointant vers la page déjà ouverte apporte peu de valeur ; il est surtout utile depuis un écran de bureau, un CV ou un document imprimé.

### Charge utile obligatoire

Le contenu encodé doit être exactement, octet pour octet, sans UTM, espace, saut de ligne ou redirection :

```text
https://didc-dev.github.io/
```

### Production reproductible recommandée

1. Utiliser un générateur local versionné et épinglé dans le projet, jamais une API distante de QR code.
2. Générer un SVG statique suivi par Git, par exemple `public/qr-didc-dev.svg`, avec paramètres explicites : niveau de correction d’erreur, version QR, masque, marge et couleurs. L’explicitation de la version et du masque évite qu’une mise à jour de bibliothèque modifie silencieusement le motif.
3. Employer un contraste noir sur blanc, une zone calme d’au moins quatre modules, aucun logo superposé et aucune transparence. Prévoir une taille d’affichage d’au moins 180 px à l’écran et environ 30 mm à l’impression.
4. Afficher sous l’image un lien texte cliquable vers `https://didc-dev.github.io/`, afin que la destination soit vérifiable sans scanner.
5. Définir une largeur et une hauteur pour éviter les déplacements de mise en page. Texte alternatif recommandé : « QR code vers le portfolio de Daniel Cruz ».
6. Conserver la destination dans une seule constante partagée avec l’origine du site, puis vérifier que la valeur passée au générateur reste exactement celle exigée. La décoration visuelle et le libellé ne doivent pas modifier la charge utile.

### Tests QR obligatoires

- décoder le SVG généré dans le pipeline avec un décodeur indépendant du générateur ;
- comparer la chaîne décodée par égalité stricte à `https://didc-dev.github.io/` ;
- conserver un hash SHA-256 attendu de l’artefact pour détecter une variation non expliquée ;
- contrôler le scan sur au moins un téléphone à l’écran et sur une impression réelle ;
- vérifier que le lien texte adjacent et le QR code mènent à la même URL HTTP `200` ;
- refuser toute occurrence de l’ancienne origine `Peixinho987` dans l’artefact, son nom, son texte alternatif et son contexte.

## Ordre de correction proposé

1. **P0 — indexation :** rendre réellement disponibles `/robots.txt` et `/sitemap.xml`, puis ajouter les tests de l’artefact publié.
2. **P0 — identité des URL :** ajouter canonical et `og:url` exacts à toutes les routes.
3. **P1 — pages de détail :** produire des titres, descriptions et métadonnées sociales spécifiques pour les 16 notes et 8 réalisations.
4. **P1 — origine :** verrouiller l’origine de production et interdire un build de publication avec `localhost` ou une origine inattendue.
5. **P1 — migration historique :** annoter la transition depuis `Peixinho987` sans altérer les preuves originales.
6. **P2 — QR code :** générer, décoder, contrôler et intégrer l’artefact déterministe sur Contact et à l’impression.
7. **P2 — sources externes :** transformer progressivement les libellés de sources en liens officiels vérifiables.

## Vérification finale attendue après correction

Une validation complète devra conserver les 31 réponses internes en `200`, confirmer `robots.txt` et `sitemap.xml`, analyser les 31 documents pour leurs canonical et métadonnées, décoder le QR code, rechercher les anciennes origines dans l’artefact construit, puis effectuer une revue visuelle desktop, mobile et impression. Les résultats doivent être consignés dans un nouveau dossier daté sous `docs/proofs/` avant publication.
