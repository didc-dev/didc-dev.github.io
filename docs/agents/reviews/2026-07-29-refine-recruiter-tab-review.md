# Revue indépendante — affinement de la languette recruteur

Date : 29 juillet 2026
Branche : `codex/refine-recruiter-tab`

## Verdict

**GO — aucun bloqueur de publication confirmé.**

## Géométrie vérifiée

- Le conteneur est fixé à `right: 0`; il ne subsiste donc aucun espace entre la
  languette fermée et le bord droit du viewport.
- Sur ordinateur, la languette mesure 34 px et son décalage `right: -7px`
  laisse exactement 27 px visibles. Elle est nettement plus fine que la version
  précédente de 46 px et paraît continuer hors écran.
- À 768 px et moins, elle mesure 32 px avec `right: -6px`, soit 26 px visibles.
  Sa hauteur de 56 px reste suffisante pour identifier et toucher la flèche.
- La version ouverte revient entièrement dans le viewport : 42 × 54 px sur
  ordinateur et 40 × 50 px sur mobile. Elle reste séparée du panneau par 8 px
  ou 6 px et conserve une cible supérieure au minimum tactile usuel.
- Le panneau garde sa largeur de 350 px au maximum, ou 340 px sur mobile, avec
  les réserves latérales existantes. Le changement ne réduit pas son contenu.

## Interactions et accessibilité

- Le composant et sa logique n’ont pas été modifiés : libellé accessible,
  `aria-expanded`, `aria-controls`, Échap, clic extérieur, second clic et retour
  du focus restent en place.
- Le focus visible reste perceptible sur la partie affichée de la languette.
- La cible ouverte est entièrement visible et les scénarios de coexistence avec
  le menu mobile demeurent réussis.
- `prefers-reduced-motion` et le masquage à l’impression restent applicables.

## Preuves

- `npm test` rejoué pendant la revue : construction réussie, 32 routes
  pré-rendues, 31 routes SEO et **23/23 tests réussis**.
- `.qa-responsive/audit.json` : **155 résultats, 0 échec** sur 31 pages et cinq
  formats; fichier final daté du 29 juillet 2026 à 23:38.
- Aucun des 155 résultats ne signale de débordement horizontal ou d’échec dans
  `recruiterInteraction`.
- `git diff --check` ne relève aucune erreur.

## Bloqueurs restants

Aucun.
