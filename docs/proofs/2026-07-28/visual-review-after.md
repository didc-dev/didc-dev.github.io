# Revue visuelle après refonte

Date : 28 juillet 2026

## Résolutions contrôlées

- 360 × 800 : page d'accueil lisible, sans débordement ni image cassée.
- 390 × 844 : navigation mobile, titre et portrait correctement disposés.
- 768 × 1024 : grille des réalisations en deux colonnes et filtres utilisables.
- 1366 × 768 : composition équilibrée, sans débordement horizontal.
- 1440 × 900 : hero, portrait, piliers et accents orange correctement rendus.

## Pages secondaires contrôlées

- Parcours
- Formations
- Réalisations
- Détail du laboratoire Proxmox VE
- Blog
- Article DNS
- Contact

## Interactions

- L'état actif de la navigation correspond à la page affichée.
- Le filtre « Virtualisation » réduit la liste de 8 à 1 réalisation.
- Le filtre « Projet personnel » affiche 2 réalisations.
- La région `aria-live` annonce correctement le nombre de résultats.

## Résultat

Aucune erreur ni alerte dans la console du navigateur. Aucune image cassée et
aucun débordement horizontal détecté sur les résolutions contrôlées.
