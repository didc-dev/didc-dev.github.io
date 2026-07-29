# Revue indépendante — disponibilité et carte Permis C

Date : 29 juillet 2026
Branche : `codex/available-permit-card`

## Verdict

**GO — aucun bloqueur de publication confirmé.**

## Constats vérifiés

- Le panneau recruteur ne contient plus d’import `Image`, de balise `img`, de
  référence à `daniel-cruz.jpg` ni de texte alternatif relatif au portrait.
  La photo personnelle reste uniquement sur l’accueil, hors du panneau.
- La carte Permis C est une illustration CSS abstraite : silhouette générique,
  deux lignes décoratives et repère « C ». Elle ne reproduit aucune donnée ni
  élément d’identification d’un document réel.
- L’illustration est placée sous `aria-hidden="true"`. Les informations utiles
  restent annoncées en texte : « Permis C » et « Autorisation
  d’établissement ». La compréhension ne dépend donc ni du dessin ni de la
  couleur.
- Les dimensions fixes de 58 × 46 px restent compatibles avec la grille du
  panneau. Le débordement est masqué, les contrastes décoratifs sont cohérents
  avec la palette et `prefers-reduced-motion` neutralise toujours les
  animations et transitions.
- La source centrale `professionalStatus` vaut `available`. L’accueil et le
  panneau consomment le même objet et affichent « Disponible pour de nouvelles
  opportunités » puis « Disponible dès maintenant ».
- Le signal partagé reçoit la classe `available` et utilise le vert. Le libellé
  textuel explicite garantit que cet état n’est pas transmis par la seule
  couleur.
- Les formulations sont cohérentes en français de Suisse; aucune ancienne
  affirmation « En poste actuellement » n’est rendue par l’état actif.
- `git diff --check` ne relève aucune erreur.

## Preuves

- `npm test` rejoué pendant la revue : build réussi, 32 routes pré-rendues,
  31 routes SEO et **23/23 tests réussis**.
- `.qa-responsive/audit.json` : **155 résultats, 0 échec** sur 31 pages et cinq
  formats.
- Les 155 scénarios `recruiterInteraction` sont entièrement réussis.
- Aucun résultat QA ne signale d’image cassée ou incomplète, de texte alternatif
  manquant, de débordement ou d’erreur navigateur/réseau.
- Contrôle du HTML final de l’accueil : zéro image dans `#recruiter-panel` et
  une carte `recruiter-residence-card`.

## Bloqueurs restants

Aucun.
