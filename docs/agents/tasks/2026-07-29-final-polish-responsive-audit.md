# Audit final de finition responsive, UX et accessibilité — 29 juillet 2026

## Périmètre

Revue en lecture seule de l’état actuel après les PR #1 et #2. Le code React/CSS, les tests, le script QA, les revues finales et les captures desktop, tablette, mobile portrait et mobile paysage ont été inspectés. Aucun code applicatif n’a été modifié.

## Verdict

Il ne subsiste aucun défaut P0. Les corrections structurelles attendues sont présentes: menu mobile défilable, seuil de navigation relevé, un seul repère `main`, liste des métiers accessible, alternatives décoratives vides, cibles secondaires agrandies et images WebP.

Quatre défauts P1 empêchent encore de qualifier le résultat de totalement soigné ou de considérer la preuve visuelle comme définitive. Les corrections recommandées sont locales.

## P0 — Aucun

Aucun blocage total de navigation, perte de contenu principale ou défaut responsive généralisé n’a été constaté.

## P1 — À corriger avant la validation finale

### 1. Le texte de transparence du pied de page échoue au contraste WCAG AA

**Preuve:** `app/_components/SiteFooter.tsx:30-32` place le paragraphe `.content-disclosure` directement dans le pied de page sombre. Il conserve la couleur globale des paragraphes `--muted: #5d6b70` définie par `app/globals.css:3` et appliquée à `app/globals.css:22`, sur le fond `--ink: #132329` de `app/globals.css:70`.

Le rapport de contraste calculé est d’environ **2.92:1**, sous les 4.5:1 requis pour ce texte normal. Le défaut est visible sur toutes les captures: ce paragraphe est nettement plus faible que les autres textes du pied de page.

**Impact:** une information importante sur la nature des contenus et des illustrations devient difficile à lire, sur toutes les pages et tous les formats.

**Correction minimale:** appliquer à `.content-disclosure p` la couleur déjà utilisée et conforme dans le pied de page, par exemple `#aebbbd` (environ 8.19:1), puis contrôler aussi les états à contraste forcé.

### 2. Les signes `+`/`−` des formations sont détachés de leur accordéon

**Preuve:** `app/globals.css:137` définit le `summary` comme une grille à trois colonnes, alors qu’il contient trois éléments plus le pseudo-élément `summary::after` défini à `app/globals.css:104`. Ce quatrième élément part sur une nouvelle ligne. Dans la capture tablette finale, chaque signe `−` apparaît seul sous l’image, à gauche. Sous 680 px, `app/globals.css:179` le place à droite en absolu, mais sans coordonnée verticale ni espace réservé; les captures mobiles montrent un petit tiret isolé près du bord supérieur.

**Impact:** le contrôle ressemble à un artefact graphique et n’indique pas clairement que la formation peut être repliée. La page Formations paraît cassée malgré un contenu correct.

**Correction minimale:** positionner le pseudo-élément en absolu à toutes les largeurs, avec `top`, `right` et un espace réservé dans le `summary`; ou ajouter explicitement une quatrième colonne `auto`. Vérifier les états ouvert et fermé à 390, 820 et 1440 px.

### 3. Les cartes Réalisations affichent deux fausses zones cliquables

**Preuve:** dans `app/_components/ProjectCard.tsx:9-18`, seul le titre est un lien. L’image occupe pourtant toute la zone supérieure attendue comme cliquable, et le texte «Voir l’étude de cas →» garde le style `.text-link`, mais c’est un `span` masqué à l’arbre d’accessibilité.

**Impact:** au pointeur et au tactile, les deux zones que l’utilisateur essaie naturellement d’activer ne font rien. Sur mobile, le petit titre devient la seule cible réelle de la carte. L’affordance visuelle contredit donc le comportement.

**Correction minimale:** rendre au moins l’image et l’appel «Voir l’étude de cas» réellement cliquables avec un seul arrêt clavier cohérent, ou étendre le lien du titre sur la carte par un motif de lien étendu accessible. Ne pas réintroduire de lien focalisable sous `aria-hidden`.

### 4. La preuve responsive peut réussir alors que des images restent visuellement vides

**Preuve:** les captures finales `.qa-responsive/mobile-accueil.png`, `tablet-accueil.png`, `mobile-realisations.png` et `mobile-blog.png` contiennent plusieurs grandes zones teal sans image: troisième pilier ou réalisations sur l’accueil, plusieurs cartes Réalisations et la majorité des notes après les premières cartes. Le script passe néanmoins avec zéro échec.

Dans `scripts/qa-responsive.mjs:186-193`, `decodeFailures` ne retient que les images ayant `image.complete === true` et `naturalWidth === 0`. Une image paresseuse encore incomplète n’est donc pas un échec. De plus, les URL vides sont retirées avant le contrôle réseau à `scripts/qa-responsive.mjs:159`.

**Impact:** la preuve visuelle ne garantit pas que toutes les images sont peintes avant capture. Il n’est pas possible de distinguer un simple défaut du scénario QA d’un problème réel de chargement sur téléphone sans une nouvelle vérification. Des cartes vides rendraient le portfolio immédiatement inachevé.

**Correction minimale:** faire échouer le script si une image visible ou attendue n’est pas `complete` ou possède `naturalWidth === 0`; attendre les images paresseuses à chaque position avec un délai raisonnable avant de revenir en haut. Refaire les captures, puis n’envisager une modification du chargement applicatif que si le défaut se reproduit sur un vrai appareil.

## P2 — Finition recommandée

### 5. Le Carnet technique répète trois fois chaque destination au clavier

**Preuve:** `app/_components/TechnicalNotebook.tsx:29-30` rend, pour chaque note, un lien sur l’image, un lien sur le titre et un lien «Ouvrir la note». Pour 16 notes, cela produit jusqu’à 48 arrêts clavier pour 16 destinations.

**Impact:** le parcours clavier et lecteur d’écran est inutilement long et répétitif.

**Correction minimale:** adopter le même motif de lien principal que pour les cartes Réalisations, avec une seule destination focalisable clairement nommée et une surface visuelle suffisamment grande.

### 6. Les groupes de filtres ne possèdent pas de sémantique de groupe fiable

**Preuve:** `app/_components/ProjectExplorer.tsx:19` et `app/_components/TechnicalNotebook.tsx:21` placent `aria-label` sur un `div` générique sans rôle. Les champs ont bien leurs étiquettes individuelles, mais le nom du groupe n’est pas garanti dans l’arbre d’accessibilité.

**Impact:** le contexte «Filtres des réalisations» ou «Recherche et filtres du carnet» peut ne pas être annoncé lors de l’entrée dans la série de contrôles.

**Correction minimale:** employer `fieldset` et `legend` visuellement adapté, ou un conteneur avec un rôle de groupe et un nom accessible.

### 7. Les microtextes des cartes sont trop petits sur mobile

**Preuve:** `app/globals.css:56-57` fixe les métadonnées à `.75rem`, les tags à `.72rem` et le type de contenu à `.68rem`; `app/globals.css:87` utilise `.7rem` pour le type des notes. Dans les captures à 390 px, ces textes deviennent nettement moins lisibles que le corps et certains libellés ressemblent à des détails décoratifs.

**Impact:** les informations qui distinguent expérience professionnelle, laboratoire et projet personnel perdent en lisibilité, alors qu’elles sont essentielles à la crédibilité du portfolio.

**Correction minimale:** relever les libellés critiques à environ `.75rem`–`.8rem`, conserver une hauteur de ligne confortable et vérifier à 200 % de zoom sans débordement.

## Preuves à régénérer après la PR #2

Les captures disponibles montrent encore «Poste actuel» et «Connect Groupe E · depuis 2024», alors que `app/_components/HeroPortraitCard.tsx:28-30` affiche désormais «Disponible dès maintenant» et «À la recherche d’une nouvelle opportunité». La PR #2 a donc changé un fait public important après la génération des preuves visuelles.

Après les corrections P1, refaire au minimum les sept pages principales aux quatre formats existants. Les nouvelles captures doivent montrer la disponibilité actuelle, tous les visuels chargés, les indicateurs d’accordéon correctement ancrés et le paragraphe du pied de page lisible.

## Ordre minimal recommandé

1. Corriger le contraste du pied de page.
2. Replacer les indicateurs des accordéons Formations.
3. Rendre les cartes Réalisations cohérentes avec leur apparence cliquable.
4. Durcir l’attente et l’échec des images dans la QA, puis régénérer toutes les preuves après la PR #2.
5. Réduire les arrêts clavier du Carnet et améliorer la sémantique des filtres.

## Critères de sortie

- Aucun texte normal sous 4.5:1.
- Chaque accordéon possède un indicateur visuellement rattaché à son résumé, ouvert comme fermé.
- Toute zone qui ressemble à un lien réagit au clic/toucher et possède un comportement clavier cohérent.
- Toutes les images attendues sont peintes dans chaque capture; aucune carte ne reste sur son fond teal.
- Les captures reflètent bien la disponibilité introduite par la PR #2.
- Le Carnet ne répète pas inutilement la même destination dans l’ordre de tabulation.
