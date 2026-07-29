# Audit fonctionnel final de finition — 29 juillet 2026

## Verdict

**Aucun défaut P0. Le site est utilisable et le déploiement actuel fonctionne,
mais il reste plusieurs corrections P1 vérifiables avant de qualifier la
finition de définitive.**

Les bases sont solides : le dépôt était propre au commit `20ad211` au début de
l’audit, la production
répond en HTTP 200, le contenu Connect Groupe E est correctement passé au passé,
les données professionnelles et les laboratoires sont distingués, TypeScript et
ESLint sont propres, la construction exporte 32 routes, le sitemap contient 31
pages et les 15 tests réussissent.

Les principaux défauts restants concernent une affirmation temporelle ambiguë,
la minimisation des données personnelles dans le dépôt public, trois défauts UX
visibles et une QA qui peut annoncer zéro échec sans contrôler les erreurs
console ni garantir que toutes les images sont peintes.

## Contrôles exécutés

```text
npm run typecheck       : réussi
npm run lint            : réussi
npm test                : réussi
routes pré-rendues      : 32, 0 ignorée
routes SEO              : 31
tests                   : 15 réussis, 0 échec
```

La production a été relue directement :

- `/`, `/parcours/`, `/realisations/infrastructures-industrielles/` et
  `/realisations/planification-electrique/` répondent en HTTP 200;
- l’accueil publie « Disponible dès maintenant »;
- Connect Groupe E est daté `2024–2026` et décrit au passé;
- aucune raison de départ n’est publiée;
- la réalisation Planification publie encore `2021–aujourd’hui`.

Le rapport responsive versionné contient 124 résultats et zéro échec. Les
captures brutes ont également été examinées, car le seul compteur JSON ne
suffit pas à prouver la qualité visuelle.

## Corrections P1

### 1. Clarifier `2021–aujourd’hui` sur une « Expérience professionnelle »

**Preuve :** `app/_data/content.ts` déclare la réalisation
`planification-electrique` avec `type: "Expérience professionnelle"` et
`year: "2021–aujourd’hui"`. Cette mention est rendue sur l’accueil, la liste des
réalisations et la page de détail en production. Le même site annonce désormais
une disponibilité immédiate et borne l’emploi chez Connect Groupe E à
`2024–2026`.

**Impact :** un lecteur peut raisonnablement comprendre qu’une activité
professionnelle de planification est encore exercée aujourd’hui. Le texte de
contexte parle pourtant d’une compétence développée puis exercée, sans employeur
ni activité actuelle identifiée.

**Correction vérifiable :** demander la période factuelle exacte. Si aucune
activité professionnelle actuelle ne peut être confirmée, remplacer le marqueur
ouvert par une période bornée ou un libellé neutre qui décrit l’expérience sans
affirmer sa continuité. Ajouter un test sur les trois pages où la valeur paraît.

### 2. Retirer le nom légal complet inutilisé des JSON suivis par Git

**Preuve :** `content/cv/public-profile.json` et
`app/_data/public-profile.json` contiennent `Daniel Inácio da Cruz`. Ces deux
fichiers sont suivis dans le dépôt public. La recherche d’usage montre que le
champ `name` n’est consommé par aucun composant; le site et les données
structurées emploient uniquement `Daniel Cruz`. Le script `import:cv` se limite à
copier le fichier.

**Impact :** le HTML public respecte la minimisation, mais le dépôt public
conserve une donnée d’identité plus précise, inutile au fonctionnement. Le test
de confidentialité inspecte seulement quelques pages HTML et ne peut pas
détecter ce cas.

**Correction vérifiable :** supprimer le champ inutilisé ou le remplacer par le
nom public, sauf autorisation explicite de publier le nom légal complet. Étendre
le contrôle de confidentialité aux fichiers suivis destinés au dépôt public.
L’adresse électronique est déjà volontairement publiée pour le contact et doit
être traitée séparément de ce constat.

### 3. Corriger le contraste du texte de transparence dans le pied de page

**Preuve :** `.content-disclosure p` hérite de `--muted: #5d6b70` sur le fond
`--ink: #132329`. Le contraste calculé est `2.92:1`, sous les `4.5:1` requis
pour du texte normal. Le défaut est visible sur les captures de toutes les
tailles. La couleur de pied de page `#aebbbd` donnerait `8.19:1`.

**Impact :** l’explication qui distingue expériences, projets, laboratoires et
illustrations est difficile à lire alors qu’elle protège précisément la
crédibilité du contenu.

**Correction vérifiable :** appliquer une couleur conforme à ce paragraphe et
ajouter un test de contraste sur les couleurs finales.

### 4. Rendre les cartes Réalisations cohérentes avec leur apparence

**Preuve :** `app/_components/ProjectCard.tsx` rend l’image dans un `div` et
« Voir l’étude de cas → » dans un `span.text-link` masqué à l’arbre
d’accessibilité. Seul le titre est un lien. Les captures montrent pourtant une
image de carte et un appel orange qui paraissent tous deux cliquables.

**Impact :** clic et toucher ne produisent rien sur les deux zones les plus
évidentes; sur mobile, le petit titre est la seule cible réelle.

**Correction vérifiable :** utiliser un seul motif de lien étendu accessible,
ou rendre l’appel réellement cliquable sans créer plusieurs arrêts clavier. Ne
pas réintroduire un lien interactif sous `aria-hidden`.

### 5. Replacer les indicateurs des accordéons Formations

**Preuve :** les captures tablette et mobile montrent le signe `−` isolé sous
l’image ou près du bord. Le `summary` comporte trois éléments dans une grille à
trois colonnes, puis le pseudo-élément `summary::after` devient un quatrième
élément. Le positionnement mobile ne définit pas de coordonnée verticale.

**Impact :** l’indicateur paraît cassé et n’explique pas clairement que la
formation peut être repliée.

**Correction vérifiable :** réserver une colonne `auto` ou positionner le
pseudo-élément avec `top`, `right` et l’espace nécessaire. Capturer les états
ouvert et fermé à 390, 820 et 1440 px.

### 6. Faire échouer la QA lorsque les images paresseuses ne sont pas peintes

**Preuve :** les captures `mobile-accueil`, `mobile-realisations` et
`mobile-blog` contiennent de grandes zones teal sans image. Le rapport annonce
pourtant zéro échec. Dans `scripts/qa-responsive.mjs`, `decodeFailures` ne
retient que les images déjà `complete` dont `naturalWidth` vaut zéro. Une image
encore incomplète après le délai est donc exclue des échecs; une URL vide est
également retirée avant le contrôle réseau.

**Impact :** la preuve visuelle peut être verte alors que le rendu capturé est
manifestement incomplet. Elle ne permet pas de distinguer un défaut du scénario
QA d’un défaut réel de chargement.

**Correction vérifiable :** échouer sur toute image attendue qui n’est pas
`complete`, attendre les images paresseuses à chaque position, puis refaire les
captures. Ne modifier le chargement applicatif que si le défaut se reproduit sur
un vrai navigateur ou appareil.

### 7. Collecter réellement les erreurs navigateur

**Preuve :** le script active `Runtime`, mais n’écoute ni
`Runtime.exceptionThrown`, ni `Runtime.consoleAPICalled`, ni `Log.entryAdded`.
Il ne conserve pas non plus les échecs réseau des scripts et feuilles de style.
La recherche du code applicatif ne trouve aucun `console.error` ou
`console.warn`, mais cela ne prouve pas l’absence d’exception à l’exécution. Les
bundles Vinext contiennent naturellement des chemins `console.error` activés en
cas d’échec de navigation ou de préchargement.

**Impact :** « 124 contrôles, 0 échec » ne signifie pas « console propre ».

**Correction vérifiable :** collecter exceptions, erreurs et avertissements de
console, entrées Log, `Network.loadingFailed` et réponses HTTP 4xx/5xx. Faire
échouer la QA sur les événements applicatifs inattendus, avec une liste
d’exceptions documentée si nécessaire.

## Corrections P2

### 8. Mettre les preuves finales au niveau du commit publié

`docs/proofs/2026-07-29/final-verification.md` annonce encore 14 tests et dit que
la vérification de production sera ajoutée après publication. Le chemin CI
actuel exécute 15 tests et GitHub Pages est déjà disponible. L’audit ciblé de
disponibilité existe sous `.qa-availability/` avec 4 résultats, 0 échec et
4 captures, mais ce dossier est ignoré par Git et aucune preuve correspondante
n’est suivie.

**Correction vérifiable :** ajouter une preuve post-déploiement datée, conserver
les captures de disponibilité utiles, noter 15/15 tests et référencer le commit
ainsi que le déploiement contrôlé. Ne pas réécrire silencieusement l’ancienne
preuve.

### 9. Renforcer les tests de temporalité et de confidentialité

Le test de disponibilité ne contrôle que l’accueil. Il ne vérifie ni la page
Parcours, ni les deux réalisations concernées, ni les données structurées. Le
test de confidentialité ne parcourt que quatre pages et ignore les fichiers
suivis par Git.

**Correction vérifiable :** ajouter une matrice d’assertions sur l’accueil,
Parcours, la réalisation Infrastructures, la réalisation Planification et le
JSON-LD. Contrôler l’absence de formulations d’emploi actuel non vérifiées et
de raisons de départ, ainsi que les données personnelles inutiles dans les
sources publiques suivies.

### 10. Corriger la faute AGDLP dans l’URL publique

Le titre et le contenu emploient correctement `AGDLP`, mais le slug public est
`agdpl-explique-simplement`. La permutation `DP`/`DL` est une faute stable dans
le tableau des notes, les tests, le sitemap et l’URL déployée.

**Correction vérifiable :** renommer vers `agdlp-explique-simplement`. Comme
l’URL actuelle est déjà publiée, préserver son accès avec une redirection ou
une page canonique de migration afin de ne pas créer de lien mort.

### 11. Harmoniser deux formulations fr-CH

Dans la réalisation Diagnostic, « Diagnostic hardware et software » et la
compétence « Hardware » contrastent avec les formulations françaises déjà
employées plus bas : « matériel », « systèmes et logiciels ». Dans la frise,
« Toshiba Portugal et mission en Suisse » est moins précis et moins naturel que
le contexte public « Toshiba Portugal puis missions de dépannage informatique
en Suisse ».

**Correction vérifiable :** employer « diagnostic matériel et logiciel » et
« Matériel ». Harmoniser la frise avec le contexte vérifié, sans inventer de
nombre de missions si ce point n’est pas confirmé.

### 12. Corriger les arrêts clavier répétés et la sémantique des filtres

Chaque carte du Carnet possède trois liens vers la même note : image, titre et
appel « Ouvrir la note ». Sur 16 notes, cela peut créer 48 arrêts clavier. Les
conteneurs de filtres emploient par ailleurs `aria-label` sur un `div` sans rôle
de groupe explicite.

**Correction vérifiable :** conserver une seule destination focalisable par
carte avec une grande surface visuelle, puis employer `fieldset`/`legend` ou
`role="group"` avec un nom accessible pour les groupes de filtres.

## Constats conformes

- Connect Groupe E n’est plus présenté comme employeur actuel.
- L’expérience `2024–2026` reste visible sans raison de départ.
- Les formations Connect Groupe E sont clairement identifiées comme formations
  terminées.
- Les laboratoires, projets personnels et expériences professionnelles ont des
  types publics distincts.
- Aucun mot de passe, jeton, numéro de téléphone, chemin local, adresse privée
  complète, date de naissance ou nationalité n’apparaît dans le texte HTML
  visible.
- L’adresse de laboratoire `10.10.10.0/24`, le domaine `cruzlab.test` et
  `LAB-DC01` sont des identifiants techniques privés/non routables publiés comme
  preuve de laboratoire; aucun identifiant utilisateur réel ni secret n’est
  exposé. Leur publication doit rester intentionnelle.
- L’adresse électronique est volontairement publique sur la page Contact.
- Les canonical, le sitemap, `robots.txt` et le QR sont cohérents avec
  `https://didc-dev.github.io/`.

## Ordre de correction recommandé

1. Clarifier la période Planification et minimiser le nom légal dans le dépôt.
2. Corriger contraste, accordéons et affordance des cartes.
3. Durcir la QA images/console, puis régénérer les preuves.
4. Mettre à jour la preuve post-déploiement et les tests de temporalité.
5. Corriger le slug AGDLP avec migration, puis harmoniser les formulations
   fr-CH et les motifs clavier/filtres.

## Conclusion

Le portfolio est publiable et aucune panne générale n’est ouverte. Les défauts
P1 ci-dessus sont cependant visibles ou mesurables et empêchent de considérer
la finition, la minimisation des données et la preuve QA comme totalement
clôturées.
