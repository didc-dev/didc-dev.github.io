# Affinement de la languette recruteur

## Demande

- Supprimer l’espace entre la languette fermée et le bord droit du site.
- Donner l’impression que la languette continue hors de l’écran.
- Réduire son poids visuel pour laisser principalement apparaître la flèche.

## Implémentation

- Le conteneur fixe est aligné à `right: 0`.
- La languette fermée est décalée de quelques pixels hors du viewport.
- Sa largeur passe à 34 px sur ordinateur et 32 px sur mobile.
- Sa hauteur est réduite à 96 px sur ordinateur et 56 px sur mobile.
- Le panneau ouvert et son contenu conservent leur largeur et leur comportement.
- La cible ouverte reste suffisamment grande et entièrement visible.

## Fichiers concernés

- `app/globals.css`
- `tests/portfolio.test.mjs`

## Validation

- Aucun espace visible entre la languette et le bord droit à 1440 px et 390 px.
- Seulement 27 px environ restent visibles sur ordinateur et 26 px sur téléphone.
- Aucun débordement horizontal.
- Ouverture, fermeture et focus inchangés.
- TypeScript, lint, compilation et 23/23 tests réussis.
- Audit responsive et interactif : 155/155 contrôles réussis.
