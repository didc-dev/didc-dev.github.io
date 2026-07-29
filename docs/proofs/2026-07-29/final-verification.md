# Vérification finale — 29 juillet 2026

## Périmètre

Adresse publique de référence : `https://didc-dev.github.io/`

## Contrôles locaux

- `npm run typecheck` : réussi.
- `npm run lint` : réussi.
- `npm test` : 14 tests réussis sur 14.
- Export statique : 32 routes pré-rendues, aucune ignorée.
- SEO statique : sitemap de 31 routes et `robots.txt` générés.
- Audit responsive : 124 contrôles sur 31 pages et quatre formats, zéro échec.
- Formats : ordinateur 1440 × 1000, tablette 820 × 1180, téléphone portrait 390 × 844 et téléphone paysage 844 × 390.
- Menu responsive : 93 contrôles réels; ouverture, fermeture avec Échap et restitution du focus réussies.
- Images : zéro réponse manquante, zéro échec de décodage, zéro attribut `alt` manquant.
- Débordement horizontal : aucun.

Le détail machine est conservé dans `responsive/audit.json`. Les captures de la page Contact, dont le QR code, sont conservées pour les quatre formats dans le même dossier.

## QR code

- Charge utile décodée indépendamment : `https://didc-dev.github.io/`
- Dimensions : 1024 × 1024 pixels.
- SHA-256 : `55f838c06ac90ee45a955f317172f1f39ba33395a4194862b7b94e8eb2796696`
- Fichier public : `/qr-didc-dev.png`

## Dépendances

Next.js et sa configuration ESLint ont été mis à jour de 16.2.6 à 16.2.12. `npm audit --omit=dev` signale encore trois vulnérabilités élevées transitives (`postcss` et `sharp` via Next). La correction automatique proposée imposerait un retour majeur vers Next 9.3.3; elle n’a pas été appliquée. Le déploiement GitHub Pages est un export statique sans serveur Next ni traitement d’image à l’exécution.

## Production

La vérification de GitHub Pages et du déploiement Sites sera ajoutée après publication du commit validé.
