# Revue QA fonctionnelle finale — 29 juillet 2026

## Verdict

**Favorable à la publication, sous réserve d’une vérification post-déploiement.**

Aucune anomalie fonctionnelle bloquante ne subsiste dans le build revu. Les
contrôles TypeScript, lint, construction, tests du rendu, SEO exhaustif, QR,
WebP et responsive sont réussis. Le défaut ARIA détecté pendant la revue sur
les cartes de réalisations a été signalé, corrigé par le CEO, puis revérifié
dans le code et le HTML exporté.

La publication doit néanmoins confirmer que les trois nouveaux artefacts
`/robots.txt`, `/sitemap.xml` et `/qr-didc-dev.png` répondent en HTTP 200 sur le
site public. Ils répondent encore en 404 avant déploiement, ce qui est cohérent
avec leur absence de la version actuellement en ligne.

## Périmètre contrôlé

La revue porte sur le diff final non commité : composants React, CSS
responsive, métadonnées par route, génération SEO statique, QR code, tests,
script QA et mise à jour verrouillée de Next.js `16.2.6` vers `16.2.12`.

Le QA n’a modifié aucun code applicatif. Le seul fichier créé par cette revue
est le présent rapport.

## Contrôles reproductibles

### Dépendances

```text
npm ci
```

Résultat : code `0`, 508 paquets installés et 509 audités. npm signale encore
18 vulnérabilités au total : 1 faible, 4 modérées et 13 élevées.

### Typage et lint

```text
npm run typecheck
npm run lint
```

Résultat : codes `0`; aucun diagnostic TypeScript ni ESLint.

### Construction statique

```text
npm run build:pages
```

Résultat : code `0`.

```text
Prerendered 32 routes (0 skipped).
SEO statique généré pour 31 routes.
```

La différence correspond à la route technique supplémentaire du build;
31 pages publiques sont indexables.

### Tests du rendu

```text
npm run test:rendered
```

Résultat : code `0`, 14 tests exécutés, 14 réussis, 0 échec, 0 test ignoré.
Les nouveaux contrôles couvrent l’origine publique, les canonical, les
artefacts SEO/QR, la structure accessible et l’emploi de WebP.

## Accessibilité

### Résultats confirmés

- exactement un repère `main` dans chacune des 31 pages exportées;
- aucun élément interactif rendu sous `aria-hidden="true"`;
- boutons de sélection des métiers exposés avec leur état `aria-pressed`;
- menu mobile défilable en faible hauteur;
- alternatives vides conservées uniquement pour les panoramas décoratifs;
- chaque image possède un attribut `alt`, vide ou descriptif selon son rôle;
- lien d’évitement et protections `prefers-reduced-motion` présents;
- 93 scénarios menu réussis : ouverture, fermeture avec `Échap` et restitution
  du focus, sur tablette, mobile portrait et mobile paysage.

Le premier correctif de `ProjectCard` utilisait des liens portant
`aria-hidden="true"` et `tabIndex={-1}`. Ce défaut a été remonté comme bloquant.
La version finale emploie des éléments décoratifs non interactifs; une nouvelle
construction confirme zéro occurrence interactive masquée.

## SEO et liens

Un contrôle exhaustif des 31 documents HTML exportés donne :

```text
pages=31
canonical_uniques=31
titres_uniques=31
seo_failures=0
sitemap_urls=31
sitemap_matches_canonicals=True
old_origin_refs=0
```

Chaque page contient exactement un titre, une description, un canonical absolu
sur `https://didc-dev.github.io/` et un `og:url` identique au canonical. Le
sitemap contient exactement les mêmes 31 URL, sans brouillon ni ancienne
origine. Les 46 destinations internes uniques trouvées dans le HTML pointent
toutes vers un fichier exporté existant.

Le site public actuel répond en HTTP 200 sur
`https://didc-dev.github.io/`. Avant publication du diff, les nouveaux
`robots.txt`, `sitemap.xml` et `qr-didc-dev.png` répondent encore en 404.

## QR code

Artefact : `public/qr-didc-dev.png`.

Décodage indépendant avec OpenCV `QRCodeDetector` :

```text
dimensions=(1024, 1024, 3)
module_grid=25
decoded='https://didc-dev.github.io/'
quiet_zone_estimated_modules=6.06
```

Le PNG est noir et blanc, sans ancienne origine incorporée. Sa zone calme est
supérieure aux quatre modules requis. L’URL décodée répond en HTTP 200.

Empreinte SHA-256 :

```text
55F838C06AC90EE45A955F317172F1F39BA33395A4194862B7B94E8EB2796696
```

L’inspection des captures Contact desktop et mobile paysage confirme un QR
net, contrasté, non rogné, dimensionné explicitement et accompagné d’un lien de
téléchargement.

## Compatibilité WebP

- aucune référence `.avif` ou `image/avif` dans les 31 HTML exportés;
- 191 fichiers WebP contrôlés;
- 191 décodages réussis avec OpenCV;
- zéro image non décodée dans les 124 contrôles navigateur;
- le repli `<img>` utilise lui aussi WebP.

La correction évite le chemin AVIF qui avait échoué sur le navigateur mobile
réel signalé. Les variantes AVIF restent dans les sources mais ne sont plus
proposées aux navigateurs.

## Audit responsive final

Preuve : `docs/proofs/2026-07-29/responsive/audit.json`.

Empreinte SHA-256 de la preuve :

```text
C094CBC574672EA7DC961BA6F898F0234973057546589E6BB5DE8F03392EA798
```

La preuve contient 124 résultats et 0 échec : 31 routes sur chacun des quatre
formats 1440 × 1000, 820 × 1180, 390 × 844 et 844 × 390. Résultats cumulés :

- 0 ressource image indisponible;
- 0 échec de décodage;
- 0 attribut `alt` absent;
- 0 débordement horizontal;
- 0 placeholder public;
- 0 page sans `h1`;
- 93/93 interactions menu réussies;
- 28 captures de référence générées.

Le fichier copié sous `docs/proofs/` possède la même empreinte que le rapport
brut `.qa-responsive/audit.json`.

## Risques résiduels et recommandations

### P1 — Vérification après déploiement

Exiger HTTP 200 et un type MIME correct pour `/robots.txt`, `/sitemap.xml` et
`/qr-didc-dev.png`, puis redécoder le QR téléchargé depuis GitHub Pages. Vérifier
également que les 31 canonical restent sur l’origine finale.

### P1 — Vulnérabilités de dépendances de production

`npm audit --omit=dev --json` termine avec le code `1` et recense trois
vulnérabilités élevées : `next`, son `postcss` embarqué et `sharp`. L’exposition
en production est réduite par l’export statique sans serveur Next, mais le
risque reste présent pendant la construction et le traitement d’entrées. Ne pas
appliquer `npm audit fix --force`, qui propose une régression majeure
inadaptée; suivre une mise à jour compatible de Next/Vinext/PostCSS/Sharp.

### P2 — QR non reproductible dans le dépôt

Le QR actuel est valide et vérifié, mais aucun générateur local versionné ni
test de décodage/empreinte ne garantit sa reproduction. Ajouter un script
déterministe avec charge utile, correction d’erreur, masque, marge et couleurs
explicites, puis un test qui décode l’artefact et compare strictement l’URL.

### P2 — Origine de publication configurable sans garde

`NEXT_PUBLIC_SITE_URL` peut remplacer l’origine sans validation. Le workflow
actuel fournit la bonne valeur, mais un fork ou une exécution manuelle pourrait
générer des canonical incorrects. Refuser le build de publication si l’origine
n’est pas exactement celle attendue ou si elle contient `localhost`.

### P2 — Couverture accessibilité encore partielle

L’audit ne remplace pas une validation avec lecteur d’écran, zoom texte à 200 %,
vrai appareil tactile et impression réelle. Il ne collecte pas non plus les
exceptions JavaScript ni les messages de console. Ajouter ces scénarios au
prochain cycle QA.

### P3 — Affordance des cartes et arrêts clavier du carnet

Dans `ProjectCard`, « Voir l’étude de cas » est maintenant un texte décoratif
stylé comme un lien alors que seul le titre est cliquable; réduire son apparence
interactive évitera une attente trompeuse. Les cartes du Carnet technique
conservent plusieurs liens vers la même destination, ce qui allonge le parcours
au clavier. Harmoniser ces deux motifs sans réintroduire d’éléments interactifs
masqués.

## Conclusion de sortie

Le build local est fonctionnellement prêt. Aucun échec bloquant n’est ouvert.
Le contrôle post-déploiement des trois nouveaux artefacts publics constitue la
dernière condition de publication vérifiable.
