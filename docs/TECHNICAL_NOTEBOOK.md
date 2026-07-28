# Carnet technique

Le carnet technique est la mémoire publique et personnelle des sujets rencontrés par Daniel Cruz. Il ne cherche pas à remplacer une documentation officielle : chaque note explique un repère utile, le contexte dans lequel il a été rencontré et ce qui doit être retenu.

## Modèle de contenu

Les notes se trouvent dans `app/_data/notes.ts`. Chaque entrée comporte un titre, un slug, une catégorie, un type, un résumé, des dates, un temps de lecture, un niveau, une illustration, une introduction personnelle, des sections, des points clés, des outils, des sources, un éventuel projet associé et un statut.

Les statuts sont :

- `published` : la note est visible dans le carnet, exportée comme page statique et ajoutée au sitemap ;
- `draft` : le sujet est préparé mais absent du site public.

## Règles éditoriales

- Conserver un ton naturel en français de Suisse.
- Distinguer clairement expérience professionnelle, projet personnel, laboratoire et sujet étudié.
- Ne jamais inventer une pratique, une preuve ou une source.
- Utiliser des sources officielles pour les règles de sécurité et les prescriptions suisses.
- Garder les explications courtes, structurées et utiles pour une future révision.

## Publication d’une note

1. Compléter toutes les propriétés de la note.
2. Vérifier les faits, les sources et la formulation personnelle.
3. Passer le statut de `draft` à `published`.
4. Exécuter `npm run typecheck`, `npm run lint`, `npm run test` et `npm run build`.
5. Contrôler la page sur téléphone et ordinateur avant publication.

Les illustrations générées en CSS portent toutes la mention commune « Illustration technique » afin de ne pas être confondues avec des photographies réelles.
