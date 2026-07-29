# Journal de réalisation

## 28 juillet 2026 — Création du portfolio public

### Avant

Un socle Sites vide existait dans un nouveau dépôt. Le projet privé LabNotes contenait le suivi d’apprentissage, le classeur, la base locale et des preuves brutes qui ne doivent pas être publiés.

### Réalisé

- Audit Git, architecture, confidentialité et contenu.
- Analyse visuelle et structurée du CV; extraction de la photo professionnelle.
- Décision de séparer strictement portfolio public et données privées.
- Mise en place d’une architecture multi-agents documentée et traçable.

### Problèmes identifiés

- Script de développement initial incompatible avec Windows.
- Absence de contenu, de routes, de tests de portfolio et de déploiement GitHub Pages.
- Plusieurs dates du CV demandent confirmation; elles ne seront pas extrapolées.

### Validation

Les résultats de lint, typecheck, tests, build, contrôles visuels et publication sont consignés dans `docs/proofs/2026-07-28/` au terme de l’intervention.

## 28 juillet 2026 — Refonte transversale

- Repositionnement autour de trois piliers équilibrés: terrain, planification et informatique.
- Ajout d’expériences de terrain, planification, fibre, diagnostic, domotique et laboratoires avec types explicites.
- Intégration autorisée du permis B, des loisirs et des drones sans inventer le modèle non confirmé.
- Ajout d’illustrations techniques HTML/CSS, de filtres, d’une navigation active et de données structurées.
- Enrichissement du parcours, des formations, du blog et des études de cas.

## 29 juillet 2026 — Migration vers didc-dev et fiabilisation responsive

- Migration de l’adresse publique vers `https://didc-dev.github.io/`.
- Ajout des URL canoniques, des métadonnées de partage, de `robots.txt` et du sitemap statique.
- Correction du menu mobile, des seuils tablette, des cibles tactiles et de plusieurs défauts d’accessibilité.
- Remplacement de la source AVIF par WebP après constat d’un échec de décodage réel dans un navigateur mobile.
- Ajout d’un QR code vérifié sur la page Contact et téléchargeable séparément.
- Extension du contrôle responsive aux formats ordinateur, tablette, téléphone portrait et téléphone paysage.

## 29 juillet 2026 — Finition, disponibilité et validation renforcée

- Remplacement des formulations de poste actuel par une disponibilité immédiate, sans publier de raison de départ.
- Bornage cohérent des expériences à `2024–2026` et `2021–2026`.
- Amélioration des cartes cliquables, des filtres, des accordéons, du contraste et de la navigation clavier.
- Remplacement de la navigation applicative par des liens HTML fiables sur GitHub Pages, sans préchargement `.rsc` en erreur.
- Minimisation du profil public au nom d’usage `Daniel Cruz`.
- Manifeste explicite des 31 routes publiques et contrôles SEO exhaustifs.
- Renforcement de la QA pour détecter images incomplètes, console, exceptions, erreurs réseau et réponses HTTP.
- Validation finale : 19 tests sur 19, 124 rendus sur 124, Lighthouse accessibilité/bonnes pratiques/SEO à 100 et QR redécodé avec succès.
