# Architecture des agents

Le CEO sélectionne uniquement les spécialistes utiles à une tâche concrète. Chaque mission produit un livrable dans `docs/agents/tasks/`, une revue dans `docs/agents/reviews/` et, lorsqu’un choix structurel est nécessaire, une décision dans `docs/agents/decisions/`.

## Collaboration

1. Le CEO définit le périmètre et les faits autorisés.
2. Le spécialiste produit un livrable vérifiable.
3. Un second rôle contrôle contenu, UX, code ou sécurité.
4. Les défauts sont corrigés et documentés.
5. Le QA exécute les contrôles reproductibles.
6. Le publisher ne publie qu’après validation et vérification du dépôt.

Les agents ne peuvent ni inventer des faits, ni publier des secrets, ni annoncer un test réussi sans preuve. Les contenus publics doivent être en français de Suisse et exclure les données privées inutiles.

## Reprise d’une session

Lire `docs/WORK_LOG.md`, le dernier dossier `docs/proofs/`, `git status`, puis les modèles de contenu. Préserver les brouillons et ne publier que les entrées portant `status: published`.

## Ajouter un agent

Créer un fichier TOML dans `.codex/agents/` avec rôle, mission, périmètre, entrées, livrables, limites, critères de qualité, vérifications et collaborations. Ajouter une preuve de sa revue avant de lui confier une publication.

## Spécialistes disponibles

Le registre couvre notamment l'audit du portfolio, l'analyse du CV, la rédaction professionnelle en fr-CH, la conception de visuels techniques, la vérification factuelle et le contrôle de publication. Les agents produisent des recommandations; le CEO reste responsable de leur intégration et de la décision finale.
