# Portfolio public de Daniel Cruz

Portfolio professionnel statique en français de Suisse. Il présente trois piliers équilibrés: infrastructures et électricité, planification et coordination, informatique et systèmes.

## Développement

```bash
npm install
npm run import:cv
npm run import:content
npm run dev
```

Contrôles complets:

```bash
npm run typecheck
npm run lint
npm test
```

## Contenu

- `content/cv/public-profile.json`: profil public expurgé.
- `content/projects/`: sources éditoriales des études de cas.
- `app/_data/content.ts`: données structurées actuellement rendues.
- `docs/`: architecture, procédures éditoriales et preuves.
- `content/media-manifest.json`: origine et classification des visuels publics.

Les brouillons, secrets, adresses privées, fichiers du laboratoire privé et classeur de suivi ne sont jamais publiés.

## Déploiement

La branche `main` est exportée automatiquement vers GitHub Pages par `.github/workflows/deploy-pages.yml`.
