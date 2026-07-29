# Revue indépendante — barre recruteur fixe

Date : 29 juillet 2026

## Verdict final

**GO — aucun bloqueur de publication confirmé.**

Les deux P1 de la première revue sont fermés dans le diff final et couverts par
une preuve navigateur complète.

## P1 fermés

### Coexistence avec le menu mobile

`SiteHeader` inclut maintenant `.recruiter-dock` dans les éléments rendus
inertes lorsque le menu mobile est ouvert. L’audit confirme, sur les 124 cas où
le menu est affiché, que la barre devient inerte et que son bouton ne peut pas
recevoir le focus. Les 124 scénarios confirment aussi l’ouverture et la
fermeture du menu ainsi que la restauration du focus.

### Preuve responsive et interactions

Le fichier final `.qa-responsive/audit.json`, daté du 29 juillet 2026 à 23:13,
contient bien 155 résultats et zéro échec : 31 pages sur cinq formats. Chaque
résultat possède un scénario `recruiterInteraction` entièrement réussi :

- aucune ouverture au survol;
- ouverture au clic et panneau borné à l’écran;
- page toujours défilable et languette fixe pendant le défilement;
- clic interne sans fermeture;
- fermeture par Échap, clic extérieur et second clic sur la languette;
- restauration du focus après Échap et clic extérieur.

Le filtre d’échecs du script inclut désormais chaque valeur de ce scénario,
ainsi que l’état inerte et le blocage du focus pendant le menu mobile.

## Autres contrôles maintenus

- `professionalStatus` est centralisé à `employed`; l’accueil et la barre
  partagent le même état et le même délai de congé.
- Le contenu reste cohérent en français de Suisse.
- Le CV PDF est absent, `cvAvailable` vaut `false` et aucun lien de
  téléchargement cassé n’est rendu.
- L’audit final ne signale ni image cassée ou incomplète, ni débordement, ni
  erreur navigateur ou réseau.
- `git diff --check` ne relève aucune erreur de diff.

## Bloqueurs restants

Aucun.
