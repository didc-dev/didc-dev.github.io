# Décision — publication responsive et QR code

Date : 29 juillet 2026

## Décision

- L’adresse publique de référence est `https://didc-dev.github.io/`.
- Le QR code encode exactement cette adresse, avec une zone blanche de quatre modules.
- Les images responsive publiées utilisent WebP. Les variantes AVIF restent dans les sources, mais ne sont plus proposées au navigateur, car un essai réel a montré un échec de décodage dans un navigateur mobile alors que la réponse HTTP était valide.
- Les métadonnées canoniques, Open Graph, `robots.txt` et `sitemap.xml` utilisent la même origine publique.

## Motifs

Cette configuration garantit une adresse cohérente dans les moteurs de recherche et les partages, un QR code stable, et un rendu d’image compatible sur les formats téléphone, tablette et ordinateur testés.

## Validation attendue

- Typage, lint, build et tests unitaires réussis.
- Audit de toutes les routes publiques sur quatre tailles d’écran sans débordement, image non décodée, image manquante ni texte alternatif absent.
- Décodage indépendant du QR code vers l’adresse publique exacte.
