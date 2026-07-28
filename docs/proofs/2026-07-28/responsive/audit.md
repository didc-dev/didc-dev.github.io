# Audit responsive et interactif — 28 juillet 2026

## Viewports contrôlés

- Mobile : 320 × 700, 360 × 800, 390 × 844 et 430 × 932.
- Tablette : 768 × 1024.
- Desktop : 1366 × 768, 1440 × 900 et 1920 × 1080.

Sur les huit dimensions, la page d'accueil ne présente aucun débordement horizontal. Le bouton de menu est visible jusqu'à 768 px et la navigation complète est affichée sur desktop.

## Pages contrôlées

- Accueil.
- Parcours.
- Métiers.
- Réalisations.
- Formations.
- Carnet technique.
- Contact.
- Étude de cas Proxmox VE.
- Note « DNS : à quoi sert-il ? ».

Chaque page contient une zone `main`, ne présente aucun débordement horizontal à 1440 × 900 et ne contient aucune image cassée.

## Interactions contrôlées

- Menu mobile : ouverture, blocage du défilement de la page, fermeture avec `Échap` et retour du focus sur le bouton.
- Carnet technique : recherche « DNS » réduisant la liste de 16 à 3 notes, puis réinitialisation complète.
- Filtres des réalisations : options de domaine, type, période et contexte disponibles, avec remise à zéro.

## Preuves visuelles

Les captures PNG de chaque viewport et des pages principales sont conservées dans ce dossier. Elles montrent la version testée localement avant publication.
