# Composition du hero d’après le mockup de référence

Date : 30 juillet 2026

## Objectif

Rapprocher la page d’accueil du mockup fourni sans intégrer le screenshot dans
le site et sans modifier les contenus, liens ou fonctionnalités existants.

## Décisions

- Conservation de l’image canonique
  `header/header_panorama_paysage_technique` et de ses variantes WebP.
- Panorama en `cover`, au ratio proche de 3:1, avec une hauteur maximale de
  405 px et des coins de 28 à 34 px sur ordinateur.
- Carte de profil limitée à 370 px et superposée d’environ 103 px sur le bas
  droit du panorama à 1440 px, sans masquer le pêcheur, le drone, le barrage ou
  les lignes électriques.
- Chevauchement réduit à 75 px à 1024 px, puis supprimé à partir de 980 px.
- Sur mobile, ordre panorama, carte de profil, texte et boutons. Le cadrage à
  60 % conserve le lac, les montagnes, le pêcheur et le barrage.
- Boutons empilés sous 460 px et aucune modification du menu recruteur.

## Validation

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm test` : 23/23
- Audit responsive complet : 248/248 contrôles, 0 échec, sur 31 pages et huit
  formats.
- Contrôle visuel ciblé aux sept formats demandés : 1920×1080, 1440×1000,
  1024×768, 768×1024, 430×932, 390×844 et 360×800.

## Preuves

Les sept captures se trouvent dans
`docs/proofs/2026-07-30-hero-mockup-composition/`.
