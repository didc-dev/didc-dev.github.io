# Contrôle qualité du portfolio — 28 juillet 2026

## Portée

- Portfolio public autonome, distinct de LabNotes et du classeur de suivi privé.
- Contenu en français de Suisse, fondé sur le CV fourni et des réalisations techniques vérifiées.
- Quatorze routes statiques : accueil, parcours, métiers, réalisations, quatre études de cas, formations, blog, deux articles et contact.

## Contrôles automatisés

- Import du profil public : réussi.
- Import des contenus éditoriaux : réussi.
- Vérification TypeScript : réussie.
- Lint : réussi.
- Construction statique : réussie.
- Tests du rendu exporté : 3 sur 3 réussis.

## Contrôles visuels

- Accueil contrôlé sur écran de bureau et mobile.
- Navigation mobile contrôlée.
- Étude de cas Proxmox et page de contact contrôlées.
- Aucun débordement horizontal détecté.
- Toutes les images visibles sont chargées.
- Aucun avertissement ni erreur dans la console du navigateur.

## Confidentialité

- Aucun fichier LabNotes, classeur Excel, chemin local, mot de passe ou capture privée n'est publié.
- Les brouillons restent exclus du rendu.
- Le CV n'est pas distribué comme fichier brut ; seules les informations professionnelles sélectionnées alimentent le site.

## Publication prévue

- Dépôt : `Peixinho987.github.io`.
- Adresse publique : `https://peixinho987.github.io/`.
- Déploiement automatique : GitHub Actions vers GitHub Pages à chaque mise à jour de `main`.
