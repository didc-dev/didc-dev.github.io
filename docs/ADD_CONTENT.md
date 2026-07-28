# Ajouter du contenu

## Réalisation

1. Créer `content/projects/<slug>/project.md` avec `slug` et `status`.
2. Ajouter les données rendues dans `app/_data/content.ts`.
3. Utiliser une illustration publique sans données sensibles.
4. Lancer `npm run import:content`, puis `npm test`.

## Formation ou article

Mettre à jour la collection correspondante dans `app/_data/content.ts`. Un article en `draft` ne doit pas apparaître dans les pages, les tests ou le plan du site.
