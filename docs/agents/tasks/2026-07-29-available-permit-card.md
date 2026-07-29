# Disponibilité immédiate et carte de permis C illustrative

## Demande

- Retirer le portrait personnel de la ligne « Permis C ».
- Le remplacer par une petite carte illustrative cohérente avec les autres icônes.
- Afficher une disponibilité immédiate avec un signal vert pulsant.

## Implémentation

- `professionalStatus` passe de `employed` à `available` dans la configuration centrale.
- L’accueil et la barre affichent « Disponible pour de nouvelles opportunités » et « Disponible dès maintenant ».
- Le signal partagé devient vert, sans duplication de logique.
- Le portrait est remplacé par une carte CSS abstraite avec silhouette générique, lignes décoratives et repère « C ».
- La carte ne reproduit aucun document officiel et ne contient aucune donnée personnelle.

## Fichiers concernés

- `app/_data/recruiterBar.ts`
- `app/_components/StickyRecruiterBar.tsx`
- `app/globals.css`
- `tests/portfolio.test.mjs`

## Validation

- Compilation, TypeScript et lint réussis.
- 23/23 tests automatisés réussis.
- Audit responsive et interactif : 155/155 contrôles réussis sur 31 pages et cinq formats.
- Contrôle visuel du panneau ouvert à 1440 px et 390 px.
- Aucun portrait de Daniel dans le panneau recruteur.
- Statut vert et textes identiques sur l’accueil et dans le panneau.
- Aucun débordement aux formats ordinateur, tablette et téléphone.
