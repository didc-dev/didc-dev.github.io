# Restauration du panorama du hero

## Inspection visuelle

Les variantes 960, 1600 et 2172 px du fichier canonique `header/header_panorama_paysage_technique` montrent toutes le même panorama clair : lac, montagnes, pêcheur, maisons, drone, barrage et infrastructures électriques. Elles ne correspondent pas à l’image sombre du footer.

## Choix

Solution A : une bande panoramique autonome au sommet du hero. Ce choix conserve toute la largeur narrative sur ordinateur et tablette, contrairement à un fond plein écran qui imposerait un crop important.

## Implémentation

- Suppression du positionnement absolu, de l’opacité à `.2`, de la masque et de l’overlay blanc global.
- Panorama placé dans la première ligne de la grille du hero.
- `object-fit: contain` sur ordinateur et tablette pour préserver tous les éléments.
- Cadrage mobile dédié de 210 à 240 px avec `object-fit: cover` et position à 60 %, afin de garder le lac, les montagnes, le pêcheur, le drone et le barrage.
- Texte et carte de profil conservés dans les lignes suivantes, sans changement de contenu.
- Texte alternatif descriptif rétabli.

## Fichiers concernés

- `app/page.tsx`
- `app/_data/images.ts`
- `app/globals.css`
- `tests/portfolio.test.mjs`

## Validation

- Panorama reconnu visuellement en 1440×1000, 1920×1080, 768×1024, 390×844 et 360×800.
- Les cinq captures sont conservées dans `docs/proofs/2026-07-30-hero-panorama/`.
- Texte entièrement lisible et profil préservé.
- Aucun crop narratif problématique, étirement ou débordement.
- TypeScript, lint, compilation et 23/23 tests réussis.
- Audit responsive et interactif : 217/217 contrôles réussis sur 31 pages et sept formats.
