# Baseline QA fonctionnelle — 29 juillet 2026

## Périmètre

Contrôle fonctionnel en lecture seule du dépôt `DIDC-Portfolio`, sur la branche
`main` au commit `aa6b016`. Les instructions de `AGENTS.md`, le journal
`docs/WORK_LOG.md`, le modèle `docs/CONTENT_MODEL.md` et les preuves QA récentes
de `docs/proofs/2026-07-28/` ont été lus avant l’exécution.

Environnement observé :

- Windows PowerShell
- Node.js `v24.15.0` (exigence du projet : `>=22.13.0`)
- npm `11.12.1`
- `node_modules` absent au départ
- `git status --short` vide avant l’installation et les validations

## Installation reproductible

Commande :

```text
npm ci
```

Résultat : code de sortie `0`.

```text
added 508 packages, and audited 509 packages in 19s

160 packages are looking for funding
  run `npm fund` for details

18 vulnerabilities (1 low, 4 moderate, 13 high)
```

npm a aussi signalé la dépréciation de `@esbuild-kit/esm-loader@2.6.5` et
`@esbuild-kit/core-utils@3.3.2`. Aucun `npm audit fix` n’a été lancé : cette
commande pourrait modifier les versions verrouillées et sort du périmètre de la
baseline fonctionnelle.

## Résultats des validations

### Import du profil public

Commande :

```text
npm run import:cv
```

Résultat : code de sortie `0`.

```text
Profil public validé: Daniel Cruz
```

### Import des contenus

Commande :

```text
npm run import:content
```

Résultat : code de sortie `0`.

```text
9 projets contrôlés; 8 publiés.
```

### Vérification TypeScript

Commande :

```text
npm run typecheck
```

Résultat : code de sortie `0`; `tsc --noEmit` n’a produit aucun diagnostic.

### Lint

Commande :

```text
npm run lint
```

Résultat : code de sortie `0`; ESLint n’a produit aucun diagnostic.

### Construction GitHub Pages

Commande :

```text
npm run build:pages
```

Résultat : code de sortie `0`.

```text
vinext build  (Vite 8.0.13)
Pre-rendering all routes (output: 'export')...
Prerendered 32 routes (0 skipped).
Build complete. Run `vinext start` to start the production server.
```

Routes déclarées dans le résumé de construction :

```text
○ /
○ /blog
ƒ /blog/:slug
○ /contact
○ /formations
○ /metiers
○ /parcours
○ /realisations
ƒ /realisations/:slug
```

### Tests du rendu exporté

Commande :

```text
npm run test:rendered
```

Résultat : code de sortie `0`.

```text
✔ les routes publiques principales sont exportées
✔ les réalisations et notes publiées sont exportées
✔ le Carnet technique est public et les brouillons restent exclus
✔ la recherche et les filtres du carnet sont interactifs
✔ le menu mobile respecte les interactions essentielles
✔ le contenu public ne contient ni notes internes ni ton de candidature
✔ les données privées restent exclues du contenu visible
✔ les images publiques possèdent un texte alternatif
✔ chaque note publiée possède un visuel dédié et unique
✔ toutes les variantes responsive des nouveaux visuels existent
✔ les protections responsive et mouvement réduit sont présentes
ℹ tests 11
ℹ suites 0
ℹ pass 11
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
```

`npm test` n’a pas été relancé, car son script exécute exactement
`npm run build` puis les mêmes tests `node --test tests/*.test.mjs`. La paire
`npm run build:pages` et `npm run test:rendered` couvre donc ce chemin sans
dupliquer la construction.

## Échecs et causes

Aucun échec fonctionnel n’a été observé dans les six validations demandées.
Tous les processus ont terminé avec le code `0`.

Les 18 vulnérabilités et les deux dépréciations signalées par `npm ci` sont des
alertes de santé des dépendances, pas des échecs des contrôles fonctionnels.
Leur correction n’a pas été tentée afin de ne pas changer les versions.

## Écart avec les preuves précédentes

Les preuves du 28 juillet annonçaient 7 tests réussis et 20 routes statiques.
La baseline actuelle compte 11 tests réussis et 32 routes pré-rendues. Les
contrôles actuels étant tous verts, cet écart correspond à l’élargissement du
site et de sa couverture de tests; il ne constitue pas une régression.

## État final du dépôt

Les commandes d’import ont réécrit `app/_data/public-profile.json` et
`app/_data/generated-manifest.json`, mais leurs empreintes Git après import
étaient strictement identiques à celles de `HEAD`. Aucun changement de contenu
applicatif n’a donc été conservé. Le seul changement attendu après cette revue
est le présent rapport.
