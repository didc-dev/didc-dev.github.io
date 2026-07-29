# Vérification finale — 29 juillet 2026

## Périmètre

Adresse publique de référence : `https://didc-dev.github.io/`

## Contrôles locaux

- `npm run typecheck` : réussi.
- `npm run lint` : réussi.
- `npm test` : 19 tests réussis sur 19.
- Export statique : 32 routes prérendues, aucune ignorée; manifeste public et sitemap limités aux 31 pages destinées à l’indexation.
- Audit responsive : 124 contrôles sur 31 pages et quatre formats, zéro échec.
- Formats : ordinateur 1440 × 1000, tablette 820 × 1180, téléphone portrait 390 × 844 et téléphone paysage 844 × 390.
- Images : zéro réponse manquante, zéro échec de décodage, zéro image incomplète et zéro attribut `alt` manquant.
- Navigateur : zéro exception, erreur/avertissement console, échec réseau ou réponse HTTP 4xx/5xx.
- Mise en page : zéro débordement horizontal; menu mobile ouvert/fermé avec Échap et focus restitué.
- Lighthouse : accessibilité 100, bonnes pratiques 100 et SEO 100. Performance observée : 98 sur ordinateur et 75 sous simulation mobile fortement ralentie.

Le détail machine se trouve dans `responsive/audit.json`. Les quatre captures Contact prouvent aussi l’affichage et la présence du QR sur chaque format.

## Contenu et confidentialité

- Disponibilité publiée : `Disponible dès maintenant` et `À la recherche d’une nouvelle opportunité`.
- Connect Groupe E est borné à `2024–2026`; la planification est bornée à `2021–2026`.
- Aucune raison de départ ni formulation d’emploi actuel non vérifiée n’est publiée.
- Le nom légal complet inutilisé a été retiré des deux profils JSON publics; le nom public reste `Daniel Cruz`.

## QR code

- Charge utile redécodée avec OpenCV : `https://didc-dev.github.io/`
- Dimensions : 1024 × 1024 pixels.
- SHA-256 : `55f838c06ac90ee45a955f317172f1f39ba33395a4194862b7b94e8eb2796696`
- Fichier public : `/qr-didc-dev.png`

## Dépendances

`npm audit --omit=dev` signale trois vulnérabilités élevées transitives dans les outils `postcss` et `sharp` inclus par Next.js. La correction automatique proposée imposerait un retour incompatible vers Next 9.3.3 et n’a donc pas été appliquée. Le site livré est un export statique : aucun serveur Next, traitement PostCSS ou traitement d’image Sharp ne s’exécute en production.

## Production

Le commit, GitHub Pages, les 31 URL publiques et le QR téléchargé seront vérifiés après la fusion. Le résultat post-déploiement sera ajouté sans modifier les preuves locales ci-dessus.
