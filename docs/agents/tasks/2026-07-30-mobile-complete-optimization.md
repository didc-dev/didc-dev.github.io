# Optimisation mobile complète — 30 juillet 2026

## Périmètre

- Point de contrôle Git avant modification : `ba79bde6c8828c7eeae0fe34be45883007c9215a`.
- Audit initial des 31 routes publiques en 360, 390 et 430 px.
- Identité visuelle, contenus, routes, photographie et composition desktop conservés.

## Constats initiaux

- Le panorama et le grand portrait repoussaient la proposition professionnelle et les actions sous la première vue mobile.
- Le menu n’avait pas de véritable boucle de focus ni de raccourci CV/statut.
- La barre recruteur ne gérait pas les safe areas, le scroll du fond et les limites verticales comme un panneau mobile.
- Plusieurs espacements, filtres, cartes, timelines et zones de pied de page restaient dimensionnés comme sur desktop.

## Décisions et corrections

- Hero mobile réordonné : présentation, actions, profil compact, panorama, contenu.
- Actions directes vers les réalisations et le CV centralisé ajoutées dans le hero.
- Carte de profil mobile ramenée à environ 153 px avec photo, lieu et disponibilité immédiate.
- Panorama mobile ramené à 165–195 px, sans déformation et avec les éléments narratifs visibles.
- Header mobile réduit à 66 px ; menu avec focus trap, Escape, retour de focus, verrouillage du scroll, CV et disponibilité.
- Barre recruteur transformée en bouton compact « CV » et bottom sheet : overlay, safe areas, contenu scrollable, focus trap, Escape et verrouillage du fond.
- Espacements, cartes, filtres, timelines, footer et zones tactiles compactés pour téléphone.
- Contrôles automatiques renforcés pour simuler un véritable appareil tactile mobile et valider le panneau recruteur.

## Validation

- `npm run lint` : réussi.
- `npm test` : 23/23 tests réussis.
- Build statique : 32 routes prérendues, SEO généré pour 31 routes.
- Audit mobile complet : 93/93 combinaisons réussies, aucun débordement ni erreur.
- Captures visuelles principales : 21/21 réussies sur 7 pages en 360, 390 et 430 px.
- Régression finale multi-écran : 248/248 combinaisons réussies sur 31 pages et 8 formats, de 360×800 à 1920×1080.
- Mesures du hero : nom et premier bouton présents dans la première vue aux trois largeurs ; carte de profil à environ 153 px ; panorama entre 169 et 195 px.

## Preuves

- `docs/proofs/2026-07-30-mobile-complete/baseline-audit.json`
- `docs/proofs/2026-07-30-mobile-complete/final-audit.json`
- `docs/proofs/2026-07-30-mobile-complete/final-regression-audit.json`
- Captures avant/après de l’accueil dans le même dossier, en 360, 390 et 430 px.
