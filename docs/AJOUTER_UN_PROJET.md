# Ajouter un projet

1. Créer `content/projects/<slug>/project.md`.
2. Renseigner `slug`, `status`, `type`, `domain`, `period`, `professionalContext`, `imageType`, `skills` et `tools`.
3. Ajouter uniquement des faits vérifiables et signaler les limites.
4. Ajouter le projet au modèle rendu dans `app/_data/content.ts`.
5. Exécuter `npm run import:content`, `npm run typecheck`, `npm test`.

Un laboratoire doit porter le type `Laboratoire d’apprentissage` et préciser qu’il ne s’agit pas d’une mission client.
