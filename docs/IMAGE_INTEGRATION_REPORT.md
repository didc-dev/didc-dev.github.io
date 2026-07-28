# Rapport d’intégration des images

Date: 28 juillet 2026  
Projet: portfolio public de Daniel Cruz  
Checkpoint préalable: `cceb242` (`Checkpoint avant integration des 37 images`)

## Résultat

Les 37 images fournies ont été identifiées, renommées de manière canonique, optimisées et intégrées dans les sections correspondantes du portfolio. Les fichiers originaux sont restés intacts dans `C:\Users\Cruz\Downloads`.

- 37 sources retrouvées sur 37;
- 284 fichiers web générés et décodés avec succès;
- 142 variantes AVIF et 142 variantes WebP;
- 20,85 Mio au total;
- plusieurs largeurs par image afin de limiter le transfert sur mobile;
- textes alternatifs descriptifs en français;
- `object-fit`, cadrage, overlays et ratios adaptés à chaque composant;
- chargement différé pour les visuels hors écran et priorité pour le hero;
- aucune image générée n’est présentée comme une preuve photographique d’un travail professionnel réel.

## Inventaire canonique

| # | Source dans Téléchargements | Destination canonique | Utilisation principale |
|---:|---|---|---|
| 1 | `21_38_04 (1)` | `header/header_panorama_paysage_technique` | Hero de l’accueil |
| 2 | `21_38_04 (2)` | `pillars/pillar_infrastructures_electricite` | Pilier infrastructures |
| 3 | `21_38_04 (3)` | `pillars/pillar_planification_coordination` | Pilier planification |
| 4 | `21_38_05 (4)` | `pillars/pillar_informatique_systemes` | Pilier informatique |
| 5 | `21_38_05 (5)` | `projects/project_infrastructures_industrielles` | Projet infrastructures |
| 6 | `21_38_05 (6)` | `projects/project_planification_electrique` | Projet planification |
| 7 | `21_38_05 (7)` | `projects/project_fibre_linktest_otdr` | Projet fibre |
| 8 | `21_38_06 (8)` | `projects/project_proxmox_ve` | Laboratoire Proxmox |
| 9 | `21_38_06 (9)` | `projects/project_active_directory` | Laboratoire Active Directory |
| 10 | `21_38_06 (10)` | `projects/project_diagnostic_informatique` | Diagnostic informatique |
| 11 | `22_13_07 (1)` | `projects/project_raspberry_pi` | Projet Raspberry Pi |
| 12 | `22_13_07 (2)` | `projects/project_domotique` | Projet domotique |
| 13 | `22_13_07 (3)` | `metiers/metier_technicien_infrastructures` | Métier infrastructures |
| 14 | `22_13_07 (4)` | `metiers/metier_planificateur_electricien` | Métier planification |
| 15 | `22_13_07 (5)` | `metiers/metier_chef_projet_technique` | Métier gestion de projet |
| 16 | `22_13_07 (6)` | `metiers/metier_support_informatique` | Métier support IT |
| 17 | `22_13_07 (7)` | `metiers/metier_administration_systemes` | Métier systèmes |
| 18 | `22_13_07 (8)` | `articles/article_dns_resolution` | Article DNS |
| 19 | `22_13_07 (9)` | `articles/article_methode_diagnostic` | Articles diagnostic |
| 20 | `22_13_07 (10)` | `articles/article_planification_terrain` | Article planification |
| 21 | `22_20_21 (1)` | `timeline/timeline_2010_2013_banc_informatique` | Parcours 2010–2013 |
| 22 | `22_20_21 (2)` | `timeline/timeline_2013_2015_diagnostic_portable` | Parcours 2013–2015 |
| 23 | `22_20_23 (3)` | `timeline/timeline_2017_2021_installation_electrique` | Parcours 2017–2021 |
| 24 | `22_20_23 (4)` | `timeline/timeline_2021_2023_planification_revit` | Parcours 2021–2023 |
| 25 | `22_20_23 (5)` | `timeline/timeline_2024_infrastructures_industrielles` | Parcours actuel |
| 26 | `22_20_24 (6)` | `timeline/timeline_2023_coordination_projet` | Parcours 2023–2024 |
| 27 | `22_20_24 (7)` | `formations/formation_installateur_electricien_cfc` | Formation CFC électricité |
| 28 | `22_20_24 (8)` | `formations/formation_gestion_equipements_informatiques` | Formation informatique |
| 29 | `22_23_43 (1)` | `articles/article_linktest_otdr` | Article Link Test / OTDR |
| 30 | `22_23_44 (2)` | `formations/formation_planificateur_electricien_cfc` | Formation CFC planification |
| 31 | `22_31_09 (1)` | `formations/formation_systemes_reseaux_administration` | Formation systèmes et réseaux |
| 32 | `22_31_10 (2)` | `personal/personal_moto` | Centre d’intérêt moto |
| 33 | `22_31_10 (3)` | `personal/personal_velo` | Centre d’intérêt vélo |
| 34 | `22_31_10 (4)` | `personal/personal_natation` | Centre d’intérêt natation |
| 35 | `22_31_11 (5)` | `personal/personal_drone` | Centre d’intérêt drone |
| 36 | `22_31_11 (6)` | `contact/contact_workspace_daniel_cruz` | Page contact |
| 37 | `22_31_11 (7)` | `footer/footer_paysage_suisse_dark` | Pied de page |

Le nom complet de chaque source et l’association exacte sont conservés dans `scripts/optimize-portfolio-images.mjs`.

## Architecture d’intégration

- `app/_data/images.ts`: registre central des dimensions, variantes, cadrages et textes alternatifs;
- `app/_components/ResponsiveImage.tsx`: rendu `<picture>` AVIF/WebP, `srcset`, `sizes`, dimensions intrinsèques et stratégie de chargement;
- `public/images/portfolio/`: ressources optimisées classées par usage;
- `scripts/optimize-portfolio-images.mjs`: pipeline reproductible à partir des 37 originaux.

## Contrôles visuels et responsive

Toutes les 31 routes statiques ont été ouvertes et contrôlées dans le navigateur intégré avec trois surfaces:

| Surface | Dimensions |
|---|---:|
| Desktop | 1440 × 1000 |
| Tablette | 820 × 1180 |
| Mobile | 390 × 844 |

Total: **93 contrôles sur 93 réussis**.

Pour chaque vue, le contrôle a vérifié:

- un titre principal `h1` unique;
- absence de débordement horizontal;
- chargement effectif de chaque image visible, y compris les ressources différées;
- absence d’image cassée;
- absence d’alt manquant;
- absence de déformation de ratio;
- absence de placeholder visuel pertinent.

La duplication du sélecteur sur la page «Métiers» a été corrigée: boutons complets sur desktop, menu compact sur tablette et mobile.

## Validation technique

- les 284 fichiers AVIF/WebP ont été ouverts et décodés par `sharp`;
- les 37 sources sont encore présentes dans Téléchargements;
- le build statique produit 32 sorties, dont 31 routes de contenu et la page 404;
- les contrôles automatiques incluent lint, TypeScript, build et tests Node;
- les fichiers générés n’introduisent ni secret ni donnée d’authentification.

## Conclusion

L’intégration est complète, responsive et reproductible. Le portfolio n’emploie plus de placeholder important dans les zones prévues pour ces 37 visuels. Les illustrations enrichissent la lecture sans transformer les laboratoires personnels en expérience professionnelle déclarée.
