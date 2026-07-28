# Rapport d’intégration des images

Date de validation : 29 juillet 2026
Projet : portfolio public de Daniel Cruz
Langue : français de Suisse (`fr-CH`)

## Résultat

La phase visuelle est terminée avec 13 nouvelles illustrations produites avec GPT Image, contrôlées individuellement, optimisées et intégrées au portfolio. Douze illustrations complètent le Carnet technique et une illustration remplace le visuel de la période 2017–2021 dans le parcours.

Les visuels respectent la direction artistique existante : fond crème clair, vert pétrole, gris technique, touches orange, composition propre, sujet central, absence de texte et de logo dans l’image.

## Illustrations créées

### Carnet technique

1. Configuration DHCP et attribution d’adresses
2. Rôle général d’Active Directory
3. Modèle AGDLP
4. Rôle d’un hyperviseur
5. Comparaison Proxmox, Hyper-V et VirtualBox
6. Snapshot, sauvegarde et retour arrière
7. Adresse IP, masque, passerelle et DNS
8. Première méthode de diagnostic réseau
9. Documentation d’une modification
10. Rôle général d’un TGBT
11. Raspberry Pi comme petit serveur
12. Comparaison Wi-Fi et Zigbee

### Parcours

13. Installation électrique 2017–2021, avec tableau, instruments et outillage entièrement visibles dans la zone centrale sûre

## Couverture du Carnet technique

Les 16 notes publiées disposent désormais chacune d’un visuel dédié. Les quatre visuels déjà présents ont été conservés pour les sujets DNS, diagnostic général, LinkTest/OTDR et AutoCAD/Revit. Les douze nouveaux visuels complètent tous les autres sujets sans réutilisation générique.

## Optimisation et diffusion responsive

Chaque nouvelle illustration du Carnet est disponible en AVIF et WebP aux largeurs suivantes :

- 480 px ;
- 800 px ;
- 1200 px ;
- 1672 px, format source optimisé.

Le nouveau visuel du parcours est disponible en AVIF et WebP aux largeurs 480, 800, 1200 et 1800 px.

Le script `scripts/optimize-portfolio-images.mjs` a été rendu non destructif : il produit les variantes attendues sans supprimer les autres médias du site.

## Contrôle visuel et responsive

Le contrôle a porté sur 31 routes et trois formats d’écran, soit 93 combinaisons :

- desktop : 1440 × 1000 ;
- tablette : 820 × 1180 ;
- mobile : 390 × 844.

Résultats :

- aucun débordement horizontal ;
- aucun attribut `alt` manquant ;
- aucune image référencée absente selon les tests de fichiers ;
- aucun placeholder pertinent conservé pour une note publiée ;
- sujets principaux lisibles et centrés sur desktop et mobile ;
- cadrage 16:9 cohérent dans le parcours et les cartes du Carnet.

Captures de contrôle enregistrées dans `docs/qa/` :

- `parcours-desktop.png` ;
- `carnet-mobile.png`.

## Validation technique

Les commandes suivantes ont toutes réussi :

- `npm run lint` ;
- `npm run typecheck` ;
- `npm run build` ;
- `npm run test:rendered`.

Le build a pré-rendu 32 routes. Les 11 tests automatisés ont réussi sans échec.

## Fichiers structurants modifiés

- `app/_data/images.ts` : manifeste des nouveaux médias, dimensions, positions et correspondance unique des notes ;
- `app/globals.css` : cadrage responsive du parcours ;
- `scripts/optimize-portfolio-images.mjs` : génération AVIF/WebP non destructive ;
- `tests/portfolio.test.mjs` : contrôle de couverture unique et présence de toutes les variantes ;
- `assets/portfolio-sources/generated/` : sources validées des illustrations ;
- `public/images/portfolio/articles/` : variantes de publication du Carnet ;
- `public/images/portfolio/timeline/` : nouveau visuel 2017–2021 ;
- `docs/qa/` : preuves du contrôle visuel.

## Conclusion

L’intégration est prête pour publication. Le Carnet technique forme désormais une collection visuelle cohérente, chaque sujet reste identifiable au premier regard et le parcours conserve une présentation sobre et professionnelle adaptée à un portfolio destiné aux recruteurs.
