# Audit responsive, navigation et accessibilité — 29 juillet 2026

## Périmètre et méthode

Audit en lecture seule du code React/CSS actuel, des tests et du script de contrôle responsive. Les consignes du dépôt, le journal de réalisation, les revues du 28 juillet et les preuves visuelles les plus récentes ont été lus. Les captures 320, 768 et 1440 px, ainsi que la capture mobile du Carnet technique, ont été examinées.

Ce rapport distingue les défauts démontrables dans le code des risques qui doivent encore être reproduits dans un navigateur. Aucun code applicatif n’a été modifié.

## Verdict

La composition est globalement propre en orientation portrait et les principaux composants passent correctement d’une à trois colonnes. Les bases utiles sont présentes: lien d’évitement, focus visible, navigation active, menu avec fermeture par `Échap`, blocage de l’arrière-plan, `aria-live`, images responsives et réduction des animations.

La validation ne peut toutefois pas être considérée complète. Trois problèmes d’accessibilité sont directement visibles dans le code et le menu mobile n’est pas robuste lorsque la hauteur disponible est faible. Les contrôles automatisés actuels détectent surtout les images cassées et le débordement global; ils ne vérifient ni la sémantique, ni le clavier, ni le tactile, ni les erreurs de console.

## Constats prioritaires

### P1 — Le menu mobile peut rendre les derniers liens inaccessibles en faible hauteur

**Preuve:** `app/globals.css:72` fixe `.nav-links` sous l’en-tête avec `inset:78px 0 auto`, sans hauteur maximale ni défilement interne. `app/_components/SiteHeader.tsx` verrouille simultanément `document.body.style.overflow = "hidden"`. Les sept liens ont chacun une hauteur minimale de 48 px (`app/globals.css:105`), auxquels s’ajoutent 48 px de remplissage vertical.

**Impact:** en mobile paysage, sur un petit écran ou avec un zoom texte important, le menu dépasse la hauteur visible. Le défilement du document étant bloqué et le panneau n’étant pas défilable, les derniers liens, dont «Contact», peuvent devenir inatteignables.

**Recommandation:** donner au panneau `max-height:calc(100dvh - 78px)`, `overflow-y:auto` et `overscroll-behavior:contain`. Valider au clavier et au tactile à 667 × 320, 844 × 390, avec zoom navigateur 200 % et taille de texte augmentée.

### P1 — Les boutons desktop de la page Métiers sont masqués aux technologies d’assistance

**Preuve:** `app/_components/TradeExplorer.tsx` place tous les boutons `.trade-list` dans un conteneur `aria-hidden="true"`. Ces boutons restent visibles et focalisables au-dessus de 980 px (`app/globals.css:64` et `app/globals.css:72`).

**Impact:** un lecteur d’écran ne reçoit pas le nom ni le rôle des contrôles tandis qu’un utilisateur au clavier peut y déplacer le focus. Cela crée des éléments focalisables dans un sous-arbre explicitement masqué, un échec classique `aria-hidden-focus`.

**Recommandation:** retirer `aria-hidden` de la liste desktop, exposer l’état sélectionné avec `aria-pressed` ou employer un vrai motif d’onglets (`tablist`, `tab`, `tabpanel`). Le `select` mobile peut rester le contrôle de repli, mais seul le contrôle réellement affiché doit être exposé.

### P1 — Les pages de note contiennent un repère `main` imbriqué

**Preuve:** le layout racine enveloppe toutes les pages dans `<main id="contenu">` (`app/layout.tsx`), puis `app/blog/[slug]/page.tsx:22` ajoute un second `<main className="article-body">` à l’intérieur.

**Impact:** la structure HTML est invalide et les lecteurs d’écran peuvent annoncer plusieurs régions principales, dont une imbriquée. Le lien d’évitement mène au premier `main`, mais la hiérarchie des repères reste ambiguë.

**Recommandation:** remplacer le `main` interne par `div`, `section` ou `article` selon la structure retenue. Ajouter un contrôle automatisé exigeant exactement un repère principal visible par page.

## Constats importants

### P2 — L’indicateur des accordéons Formations est positionné par rapport à un ancêtre indéterminé

**Preuve:** sous 680 px, `.formation-list summary::after` reçoit `position:absolute; right:.2rem` (`app/globals.css:174`), mais ni le `summary` ni le `details` n’est positionné. Aucune coordonnée verticale ni place réservée à droite n’est définie.

**Impact plausible:** le signe `+`/`−` peut se placer par rapport à un ancêtre éloigné, se superposer au titre ou disparaître visuellement selon le moteur et la longueur du contenu.

**Recommandation:** rendre le `summary` relatif, positionner l’indicateur avec `top`, réserver son espace avec un remplissage droit et contrôler les quatre formations à 320 et 390 px.

### P2 — Les cartes créent des arrêts clavier dupliqués

**Preuve:** chaque `ProjectCard` propose trois liens vers la même étude de cas (`app/_components/ProjectCard.tsx:9`, `:15`, `:18`). Chaque carte du Carnet fait de même avec l’image, le titre et «Ouvrir la note» (`app/_components/TechnicalNotebook.tsx`).

**Impact:** une grille de 16 notes impose jusqu’à 48 arrêts clavier pour 16 destinations. La navigation devient longue et répétitive, surtout avec un lecteur d’écran.

**Recommandation:** conserver un lien principal clairement nommé par carte et transformer les autres surfaces en présentation, ou utiliser un motif de carte étendue sans liens interactifs imbriqués ni destinations répétées.

### P2 — Le seuil du menu ne couvre pas les tablettes larges et petits écrans desktop

**Preuve:** la navigation complète réapparaît dès 981 px (`app/globals.css:72` et `:109`) avec sept liens, des espacements de 1.35 rem, la marque et un espace de 2 rem. Le conteneur ne mesure que `100% - 3rem` (`app/globals.css:14`). De plus, `body { overflow-x:clip }` peut masquer un chevauchement au lieu de le révéler.

**Impact plausible:** autour de 981–1050 px, avec zoom ou texte agrandi, la marque et la navigation peuvent se comprimer, se chevaucher ou être rognées. Les preuves existantes sautent de 768 à 1366 px.

**Recommandation:** déterminer le point de rupture à partir de la largeur réelle du contenu, ou permettre une navigation intermédiaire. Tester 981, 1024 et 1100 px, à 100 %, 125 % et 200 % de zoom. Ne pas utiliser l’absence de `scrollWidth` excédentaire comme seule preuve, car `overflow-x:clip` masque visuellement une partie des défauts.

### P2 — Les images des piliers sont sous-dimensionnées sur mobile à haute densité

**Preuve:** l’accueil annonce `sizes="(max-width: 980px) 40vw, 33vw"` pour les images de piliers (`app/page.tsx:25`). Sous 680 px, la carte passe pourtant en colonne et l’image occupe presque toute la largeur (`app/globals.css:73` et `:168`).

**Impact:** le navigateur peut sélectionner une variante prévue pour 40 % du viewport alors que l’image est affichée à environ 100 %. Sur un écran DPR 2 ou 3, le visuel risque d’être inutilement flou.

**Recommandation:** décrire les deux états réels, par exemple largeur quasi complète sous 680 px, environ 40 % entre 681 et 980 px, puis 33 % au-dessus. Vérifier `currentSrc` avec DPR 1, 2 et 3.

### P2 — Plusieurs cibles tactiles secondaires restent plus petites que 44 px

**Preuve:** les liens `.text-link` n’ont ni hauteur minimale ni remplissage (`app/globals.css:56`). Les liens du pied de page n’ont qu’une marge verticale de `.4rem`, qui n’agrandit pas leur boîte cliquable (`app/globals.css:70`). La règle de 48 px ne concerne que le menu mobile (`app/globals.css:105`).

**Impact:** les appels secondaires et les liens du pied de page sont plus difficiles à activer au doigt, particulièrement pour les personnes ayant une dextérité réduite.

**Recommandation:** sous un pointeur grossier, garantir une boîte interactive d’au moins 44 × 44 px avec `min-height`, remplissage ou espacement réel entre cibles.

### P2 — Des images d’ambiance sont annoncées comme du contenu

**Preuve:** le panorama du hero et celui du pied de page sont des couches visuelles absolues (`app/globals.css:117` et `:154`), mais reçoivent des textes alternatifs descriptifs (`app/page.tsx:12`, `app/_components/SiteFooter.tsx:7-12`). Leur information est déjà portée par les titres et le contenu voisin.

**Impact:** un lecteur d’écran annonce des descriptions décoratives avant le contenu principal ou dans le pied de page, ce qui ajoute du bruit sans aider à comprendre la page.

**Recommandation:** utiliser `alt=""` pour les images purement décoratives. Conserver des alternatives précises pour les visuels qui apportent une information non répétée.

## Lacunes de validation

### P2 — Le script responsive ne valide pas les interactions annoncées

**Preuve:** `scripts/qa-responsive.mjs:145-179` contrôle titre, `h1`, images, attributs `alt`, placeholders et largeur du document. Il ne déclenche ni le menu, ni les filtres, ni les accordéons; il ne parcourt pas le focus et n’exécute aucun audit d’accessibilité. `mobile:false` est utilisé pour toutes les tailles (`:117-119`), donc le tactile et les caractéristiques d’un vrai appareil mobile ne sont pas émulés. Le script active `Runtime`, mais ne collecte pas `Runtime.exceptionThrown`, `Log.entryAdded` ou les messages de console.

**Impact:** le rapport peut réussir malgré un menu inutilisable en paysage, un ordre de focus défectueux, une cible tactile trop petite, un repère principal dupliqué ou une exception client. Les tests `tests/portfolio.test.mjs:35-37` recherchent seulement des chaînes dans le fichier du header et ne prouvent pas le comportement.

**Recommandation:** compléter les contrôles par des scénarios de navigateur: ouverture/fermeture et défilement du menu, parcours clavier, activation des filtres et accordéons, zoom, orientation paysage, `prefers-reduced-motion`, contraste et audit automatisé de l’arbre d’accessibilité. Capturer explicitement console, exceptions et erreurs réseau.

### P3 — La matrice actuelle laisse des angles morts

Le script courant teste 1440, 820 et 390 px (`scripts/qa-responsive.mjs:27-31`). Les anciennes preuves incluent 320 et 768 px pour l’accueil, mais pas toutes les routes, et aucune faible hauteur en paysage. Ajouter au minimum 320 × 568, 667 × 320, 768 × 1024, 981 × 900, 1024 × 768 et 1440 × 900, avec toutes les routes principales aux largeurs critiques.

## Ordre de correction recommandé

1. Rendre le menu mobile défilable en faible hauteur.
2. Corriger `aria-hidden` dans `TradeExplorer` et supprimer le `main` imbriqué.
3. Stabiliser l’indicateur des accordéons Formations.
4. Réduire les liens dupliqués dans les cartes et agrandir les cibles tactiles.
5. Ajuster le seuil de navigation et l’attribut `sizes` des piliers.
6. Passer les panoramas décoratifs à une alternative vide.
7. Renforcer le script de QA, puis refaire les preuves sur la matrice élargie.

## Critères de sortie

- Tous les liens du menu restent accessibles au clavier et au tactile en portrait, paysage, zoom 200 % et texte agrandi.
- Aucun élément focalisable ne se trouve dans un sous-arbre `aria-hidden`.
- Chaque page ne possède qu’un seul repère `main`.
- Aucun indicateur d’accordéon ne se superpose au contenu à 320 px.
- Une carte ne répète pas inutilement la même destination dans l’ordre de tabulation.
- Les cibles tactiles principales et secondaires atteignent 44 × 44 px ou disposent d’un espacement équivalent conforme.
- Aucun chevauchement ou rognage du header entre 981 et 1100 px.
- Les images choisies correspondent à leur largeur affichée sur écrans DPR 1 à 3.
- La QA collecte les erreurs de console et vérifie réellement les interactions documentées.
