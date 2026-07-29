# Revue indépendante — restauration du panorama du hero

Date : 30 juillet 2026
Branche : `codex/restore-hero-panorama`

## Verdict

**GO — aucun bloqueur de publication confirmé.**

## Revue visuelle des cinq preuves

Les captures `wide`, `desktop`, `tablet`, `mobile` et `mobile-compact` de
`docs/proofs/2026-07-30-hero-panorama/` ont été examinées individuellement.

- Aux formats 1920 × 1080 et 1440 × 1000, le panorama clair est entièrement
  visible dans une bande autonome. Les marges latérales résultent de
  `object-fit: contain`; l’image n’est ni étirée ni rognée.
- À 768 × 1024, le ratio 3:1 restitue toute la scène sans déformation.
- À 390 × 844 et 360 × 800, le cadrage est volontairement resserré. Le lac, les
  montagnes, le pêcheur, le drone, le barrage et les infrastructures électriques
  restent reconnaissables. Seuls des éléments périphériques, principalement les
  arbres de gauche, sortent du cadre.
- Le texte du hero et la carte de profil sont placés sous l’image, sans
  superposition. Ils restent lisibles et complets aux cinq formats.
- Aucune capture ne montre l’image sombre du footer dans le hero, ni voile
  blanc, masque progressif, opacité réduite ou overlay parasite.

## Fichier canonique et variantes

- La source déclarée est
  `header/header_panorama_paysage_technique`, distincte de
  `footer/footer_paysage_suisse_dark`.
- Les variantes suivies 960, 1600 et 2172 px existent en WebP et AVIF. Les
  variantes utilisées par les captures présentent le même panorama clair et
  les mêmes éléments narratifs.
- Les dimensions déclarées, 2172 × 724, correspondent au ratio panoramique 3:1.
- Le composant responsive conserve le ratio intrinsèque; `object-fit: contain`
  s’applique sur ordinateur et tablette, puis `cover` uniquement sous 680 px
  avec une position à 60 % pour préserver le centre narratif.
- Le texte alternatif public décrit les éléments effectivement porteurs de sens
  de la scène.

## Diff et qualité du rendu

- Le panorama n’est plus absolu et possède `opacity: 1`, `mask-image: none` et
  aucun pseudo-élément d’overlay.
- La grille réserve une ligne propre à l’image, puis une ligne au texte et au
  profil; sur tablette et mobile, les trois blocs sont empilés explicitement.
- Les hauteurs sont bornées, les coins et l’ombre restent cohérents avec la
  direction visuelle du site, et aucun étirement n’est observé.
- `git diff --check` ne relève aucune erreur.

## Preuves techniques

- `npm test` rejoué pendant la revue : build réussi, 32 routes pré-rendues,
  31 routes SEO et **23/23 tests réussis**.
- `.qa-responsive/audit.json` : **217 résultats, 0 échec** sur 31 pages et sept
  formats (`wide`, `desktop`, `laptop`, `tablet`, `mobile`, `mobile-compact` et
  `mobile-landscape`).
- Aucun résultat ne signale d’image cassée ou incomplète, de texte alternatif
  manquant, de débordement ou d’erreur navigateur/réseau.

## Bloqueurs restants

Aucun.
