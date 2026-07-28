# Architecture

Le site utilise React, TypeScript et vinext en export statique. Les routes sont dans `app/`, les composants partagés dans `app/_components/` et les données publiques dans `app/_data/`.

GitHub Pages sert uniquement `dist/client`. Le préfixe de dépôt est activé pendant le workflow avec `GITHUB_PAGES=true`. Le site reste utilisable localement sans ce préfixe.

## Frontières de confidentialité

Le dépôt est autonome. Il ne contient ni base LabNotes, ni classeur de suivi, ni captures privées, ni identifiants. Seuls des faits vérifiés et reformulés sont intégrés.
