# Audit UX/UI et contenu — 28 juillet 2026

## Périmètre et verdict

Audit du dépôt `daniel-cruz-portfolio` et de la version publique `https://peixinho987.github.io/` (réponse HTTP 200 et titre vérifiés). L’inspection visuelle automatisée du navigateur n’était pas disponible dans l’environnement de l’agent; les constats d’interface ci-dessous reposent donc sur les composants, les styles, la structure des pages, les contenus et les assets réellement publiés. Une revue humaine desktop/mobile avec captures reste obligatoire avant la release.

**Verdict:** la base visuelle est élégante, cohérente et déjà crédible, mais la narration et le volume de contenu sont encore nettement trop centrés sur l’IT. Le site se lit aujourd’hui comme un portfolio de reconversion informatique enrichi d’un passé électrique, alors que le prompt maître exige trois piliers professionnels d’importance comparable.

## Ce qui est beau et doit être conservé

- La palette crème, vert-bleu foncé et orange est distinctive, chaleureuse et professionnelle. L’orange correspond en plus à la couleur préférée de Daniel: il doit rester l’accent identitaire, pas devenir une surface omniprésente.
- Le hero avec portrait détouré, halo organique, gros titre et deux appels à l’action donne une présence humaine forte.
- La typographie ample, les espaces généreux, les bordures fines et les cartes arrondies forment un système éditorial cohérent.
- Les détails d’interaction sont sobres: légère élévation, zoom discret des images et déplacement de flèche. Le respect de `prefers-reduced-motion` est déjà prévu.
- Le header collant et translucide fonctionne bien comme repère constant; le menu mobile est simple et compréhensible.
- Les pages détaillées de réalisation ont une structure solide: hero, rail d’informations, travail, difficultés, solution et résultat.
- Les bases d’accessibilité sont présentes: lien d’évitement, `lang="fr-CH"`, focus visible, textes alternatifs, navigation sémantique et titres hiérarchisés.
- Les illustrations SVG existantes partagent une direction graphique homogène et ne prétendent pas être des photographies réelles.

## Déséquilibre éditorial prioritaire

### État actuel

- Le hero annonce «Support IT · Systèmes · Infrastructures» et le sous-titre de marque «Infrastructures & support IT»: l’électricité et la planification ne sont pas visibles au premier écran.
- Trois des quatre compétences de l’accueil sont directement IT; «Infrastructure terrain» est reléguée en quatrième position et décrite comme un apport à l’IT.
- Les trois réalisations mises en avant sont Proxmox, Active Directory et Windows 11. La quatrième est Raspberry Pi. Aucune réalisation électrique, industrielle, de planification, fibre ou modélisation n’est visible.
- Le blog public ne contient que DNS et PowerShell; l’article électrique est un brouillon.
- La page Métiers ne contient que quatre entrées, dont deux IT, et les métiers électriques n’ont aucun projet associé.
- La page Contact vise exclusivement le support, le desktop support et l’administration systèmes junior.

### Rééquilibrage attendu

Présenter immédiatement trois piliers de poids visuel égal:

1. **Infrastructures, électricité & terrain** — expérience professionnelle, sécurité, exécution, diagnostic et infrastructures industrielles.
2. **Planification, coordination & modélisation** — CFC, AutoCAD/Revit, documentation, anticipation et gestion de projet.
3. **Informatique, systèmes & diagnostic** — support, Windows/Linux, réseaux, virtualisation et laboratoires actuels.

Le message central recommandé est: **«Infrastructures industrielles · Planification électrique · Technologies IT»**. Le texte doit partir de l’expérience professionnelle réelle et présenter l’IT comme un approfondissement actuel, non comme l’unique identité.

## Pages trop faibles et corrections concrètes

### Accueil — priorité critique

- Remplacer le hero actuel par une accroche équilibrée et une courte synthèse reliant terrain, planification, diagnostic, documentation et systèmes.
- Transformer la grille de quatre compétences en trois grandes cartes de piliers, chacune avec illustration technique, compétences et lien vers le domaine.
- Afficher au minimum une réalisation de terrain, une de planification/modélisation et une IT. Tant que les preuves manquent, utiliser une fiche d’expérience professionnelle prudente ou une illustration clairement étiquetée, jamais un faux projet.
- Ajouter une frise courte du parcours et un bloc «Formation & progression».
- Remplacer le CTA commercial «Parlons de vos besoins…» par «Échangeons autour d’une opportunité ou d’un projet technique».

### Parcours — priorité critique

- La timeline actuelle ne comporte que cinq lignes, sans description, tâches, outils, acquis ni liens. Elle ne constitue pas encore un CV interactif complet.
- Ajouter toutes les étapes vérifiées du CV: informatique initiale, dépannage, électronique, installation électrique, deux CFC, planification, chef de projet, infrastructures industrielles et progression IT.
- Chaque entrée doit afficher période, statut, organisation, domaine, résumé, tâches connues, outils, compétences et liens. Masquer les champs non documentés plutôt que les inventer.
- Utiliser des filtres ou des repères colorés par pilier, avec une légende textuelle; ne pas dépendre uniquement de la couleur.
- Ajouter un encart pratique distinct: **permis de conduire**. Ne pas le confondre avec le permis de séjour, qui reste privé.

### Métiers — priorité élevée

- Passer de 4 à 10 domaines: infrastructures industrielles, planification électrique, installation électrique, gestion de projet, électronique, support/dépannage IT, systèmes, fibre/câblage, domotique, CAO/BIM/modélisation.
- Le sélecteur unique crée beaucoup d’espace vide et masque la richesse du parcours. Préférer une grille de cartes explorables ou, sur desktop, une liste verticale avec panneau détaillé. Sur mobile, conserver un accordéon natif ou un `select` en repli.
- Pour chaque métier: définition, lien avec Daniel, compétences, outils, expériences, réalisations/formations/articles et visuel.
- Ne pas afficher un «empty state» comme contenu principal: proposer les expériences ou formations associées lorsque les photographies manquent.

### Réalisations — priorité critique

- Les quatre cartes sont toutes personnelles ou de laboratoire et aucune n’affiche explicitement son type. Ajouter une taxonomie visible: expérience professionnelle, réalisation professionnelle, projet personnel, laboratoire d’apprentissage, formation pratique.
- Ajouter des filtres combinables par domaine, type, période et contexte. Les filtres doivent être de vrais boutons accessibles avec `aria-pressed`, un compteur de résultats et un bouton «Réinitialiser».
- Sur mobile, placer les filtres dans une barre horizontale défilable ou un panneau repliable; ne pas enfermer les contenus dans une modale difficile à parcourir.
- Enrichir les cartes avec période, type, contexte et statut de l’image (`photo réelle`, `illustration technique`).

### Formations — priorité élevée

- La page est propre, mais limitée à trois diplômes et un bloc IT en cours.
- Ajouter les attestations et formations vérifiées, séparer clairement «terminé», «en cours», «autoformation», «laboratoire personnel» et «planifié».
- Ajouter des filtres et des liens vers métiers/réalisations associés.
- Éviter que le grand bloc sombre «Transition vers l’administration IT» redevienne le seul point focal: créer trois axes de progression équilibrés.

### Blog — priorité élevée

- Deux articles IT donnent une page trop courte et monotone. Préparer une grille équilibrée: électricité, planification, fibre/réseau, électronique/diagnostic et IT.
- Chaque carte devrait porter une miniature technique, la catégorie, le statut de validation et le temps de lecture.
- Tout article réglementaire suisse doit rester en brouillon jusqu’à validation et sources fiables.

### Contact — priorité élevée

- Repositionner le texte pour couvrir les opportunités techniques transversales, sans limiter Daniel aux postes IT juniors.
- Ajouter «Permis de conduire» comme information de mobilité professionnelle si confirmé par le CV/utilisateur.
- Conserver l’absence de formulaire fictif et le courriel protégé.

## Section humaine: permis, loisirs et hobbies

Créer sur la page Parcours, ou en fin d’accueil, un bloc compact «En dehors du travail» qui humanise sans diluer le positionnement professionnel.

Contenu recommandé, fondé sur les informations données:

- **Permis de conduire** — à placer aussi dans les informations pratiques, car utile pour les postes de terrain et les déplacements.
- **Moto** — formulation honnête: «Apprentissage de la conduite moto» ou «En train d’apprendre à conduire une moto»; ne pas laisser entendre qu’un permis moto est obtenu.
- **Drones DJI** — «DJI Mini 4» et «drone DJI grand format noir de première génération». Le modèle du second appareil n’étant pas précisé, ne pas inventer «Inspire», «Phantom» ou un autre nom. Utiliser une légende «modèle à documenter» dans les données internes si nécessaire.
- **Vélo et natation** — loisirs sportifs, présentés simplement.
- **Orange** — continuer à l’utiliser comme signature graphique; inutile de l’écrire comme un hobby, mais possible de mentionner discrètement «couleur signature» dans une micro-interaction ou une note de design.

Direction visuelle du bloc: quatre petites cartes illustrées (moto, deux silhouettes de drones, vélo/natation), fond crème, pictogrammes orange et traits vert-bleu. Éviter les photos de stock et les illustrations enfantines. Les drones peuvent aussi devenir un futur projet personnel si des photos et usages réels sont ajoutés.

## Système visuel et illustrations

- Conserver le trio crème / vert-bleu / orange et l’échelle de rayons actuelle.
- Étendre la bibliothèque avec un style isométrique ou semi-réaliste sobre commun aux trois piliers: TGBT/chemin de câble, plan technique/CAO, baie réseau/serveur, fibre/OTDR, électronique/diagnostic, domotique, drones et mobilité.
- Chaque asset doit porter une métadonnée `imageType`: `real-photo`, `technical-illustration`, `generated-illustration` ou `placeholder`.
- Une illustration générée doit être légendée comme telle sur la page détaillée. La photographie du portrait doit rester le seul visuel explicitement présenté comme photo réelle tant que d’autres preuves ne sont pas disponibles.
- Éviter la répétition de grands aplats teal identiques. Alterner schéma pleine largeur, détail technique, vignette éditoriale et photographie réelle.
- Prévoir des ratios fixes (carte 16:10, hero 1:1, galerie 4:3) et des dimensions source suffisantes pour éviter les sauts de mise en page.

## Navigation et états actifs

- Le header ne marque actuellement que le survol/focus; ajouter un état actif persistant basé sur la route avec `aria-current="page"`, trait orange visible et contraste suffisant.
- Le sous-titre de marque doit devenir transversal: «Infrastructures · Planification · Technologies».
- Sur mobile, fermer le menu avec `Escape`, restaurer le focus sur le bouton, verrouiller le défilement de fond et animer l’icône en respectant `prefers-reduced-motion`.
- Vérifier que le header collant ne masque jamais les ancres et que les cibles disposent de `scroll-margin-top`.
- Ajouter des chemins de retour cohérents sur les pages détaillées et, si les contenus se multiplient, un fil d’Ariane léger.

## Desktop, mobile et accessibilité

### Desktop

- Réduire les très grands espaces lorsque les pages ne contiennent qu’un composant (notamment Métiers et Blog).
- Harmoniser la hauteur des cartes sans imposer de grands `min-height` aux résumés courts.
- Sur la timeline, exploiter la largeur disponible avec une colonne date stable, une colonne de contenu et des badges de domaine.
- Vérifier les lignes de texte: conserver 60–75 caractères pour les paragraphes longs.

### Mobile

- Le `h1` du hero est fixé à `4rem` sous 680 px; utiliser `clamp(2.8rem, 15vw, 4rem)` pour éviter le débordement à 320 px.
- Le badge de localisation déborde potentiellement du portrait (`right:-.5rem`); le replacer dans le flux sous l’image sur très petits écrans.
- Réduire les marges verticales du hero et des `PageIntro` afin d’amener plus vite le contenu utile.
- Rendre les zones tactiles des liens de navigation et filtres d’au moins 44 × 44 px.
- Empêcher les cartes liées et métadonnées longues de créer un défilement horizontal.

### Accessibilité

- Le texte blanc sur l’orange principal `#e96a23` offre environ **3,21:1**, insuffisant pour du texte normal WCAG AA. Assombrir le bouton orange (ou utiliser texte sombre) jusqu’à au moins 4,5:1; `#bd4b11` sur le fond crème est juste conforme à environ **4,54:1**.
- Ajouter `aria-current="page"` à la navigation et annoncer le nombre de résultats des filtres avec une région `aria-live="polite"`.
- Les cartes entièrement cliquables doivent conserver un seul intitulé accessible clair et éviter les liens dupliqués au clavier.
- Les sélecteurs, accordéons, galeries et filtres doivent rester utilisables au clavier, avec ordre de focus logique et état visible.
- Préserver le lien d’évitement, le focus orange, le HTML sémantique et `prefers-reduced-motion` déjà présents.
- Vérifier systématiquement les contrastes des petits textes gris, des badges et des états désactivés, ainsi que les alternatives textuelles des illustrations techniques.

## Ordre de mise en œuvre recommandé

1. Repositionner hero, marque, métadonnées et contact autour des trois piliers.
2. Introduire la taxonomie des contenus et les types visibles sur toutes les cartes/pages.
3. Enrichir la timeline Parcours et ajouter permis/hobbies.
4. Ajouter au moins une preuve ou fiche vérifiée par pilier avant de recomposer l’accueil.
5. Enrichir Métiers, Réalisations, Formations et Blog avec filtres accessibles.
6. Étendre la bibliothèque d’illustrations avec classification explicite.
7. Ajouter navigation active, comportements clavier/mobile et corrections de contraste.
8. Effectuer une revue visuelle réelle sur 1440, 1024, 768, 390 et 320 px, puis corriger avant publication.

## Critères de validation UX finale

- Les trois piliers sont identifiables en moins de cinq secondes sur l’accueil et ont un poids visuel comparable.
- Une expérience professionnelle, une réalisation/formation de planification et un laboratoire IT sont visibles sans confusion de statut.
- Toutes les cartes indiquent type, domaine et période.
- La timeline explique les passerelles du parcours, pas seulement les intitulés de postes.
- Le permis de conduire est visible dans les informations pratiques; les loisirs restent distincts des compétences professionnelles.
- Les filtres sont utilisables au clavier et sur mobile; le résultat est annoncé.
- La navigation indique la page active.
- Aucune illustration n’est présentée comme preuve photographique.
- Aucun débordement horizontal à 320 px et aucune zone tactile principale sous 44 px.
- Les contrastes textuels atteignent WCAG AA et le mode de réduction des animations reste respecté.
