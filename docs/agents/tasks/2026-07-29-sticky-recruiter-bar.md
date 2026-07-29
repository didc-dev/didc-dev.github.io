# Barre recruteur fixe — rapport d’implémentation

## Périmètre

- Ajouter une barre recruteur fixe à droite sur toutes les pages.
- Conserver le site visible et défilable quand le panneau est ouvert.
- Centraliser le statut professionnel, le contact, la localisation, les langues et les permis.
- Synchroniser l’accueil avec le statut professionnel actuel.
- Ne publier aucun lien de CV tant que le PDF réel n’est pas présent.

## État factuel utilisé

- Statut : `employed`.
- Libellé : « En poste actuellement ».
- Détail : « Disponible après un délai de congé de 3 mois ».
- Signal : orange.
- Localisation publique : Renens (VD), Suisse romande.
- Langues : français, portugais, anglais et espagnol.
- Permis C : repère illustratif « Autorisation d’établissement », sans donnée d’identité privée.
- Permis de conduire B : « Avec voiture ».

## Implémentation

- Configuration centrale : `app/_data/recruiterBar.ts`.
- Composant global : `app/_components/StickyRecruiterBar.tsx`.
- Montage global : `app/layout.tsx`.
- Synchronisation de l’accueil : `app/_components/HeroPortraitCard.tsx`.
- Synchronisation du courriel : `app/_components/EmailLink.tsx`.
- Synchronisation de la page Contact : `app/contact/page.tsx`.
- Styles responsive, mouvement réduit et impression : `app/globals.css`.
- Contrôles automatisés : `tests/portfolio.test.mjs` et `scripts/qa-responsive.mjs`.

## Comportement validé

- Le survol ne déclenche pas l’ouverture.
- Le clic sur la languette ouvre et referme le panneau.
- Le panneau se ferme avec Échap, le bouton de fermeture, un clic extérieur et un changement de page.
- Le focus revient sur la languette après fermeture.
- Le menu mobile rend la barre inerte et empêche son accès au clavier tant que la navigation est ouverte.
- Le panneau reste sous 380 px et ne bloque pas le défilement vertical.
- La languette reste fixe pendant le défilement.
- Le lien de contact utilise `mailto:danielinaciocruz1@gmail.com`.
- Aucun lien cassé vers le CV n’est rendu.
- La barre est masquée à l’impression et respecte `prefers-reduced-motion`.

## Validation

- `npm run typecheck` : réussi.
- `npm run lint` : réussi.
- `npm test` : 23/23 réussis.
- Audit responsive conservé dans `.qa-responsive/audit.json` : 31 pages × 5 formats, 155/155 contrôles réussis, y compris les interactions de la barre et sa coexistence avec le menu mobile.
- Formats ciblés : 1440×1000, 1024×900, 768×1024, 390×844 et 844×390.
- Contrôle visuel manuel du panneau ouvert : ordinateur, tablette et téléphone.
- Lighthouse local : accessibilité 100, bonnes pratiques 100 et SEO 100.

## CV

Chemin public réservé : `public/documents/daniel-cruz-cv.pdf`.

Le fichier n’est pas présent. `recruiterBar.cvAvailable` reste donc à `false` et l’interface affiche « PDF bientôt disponible » sans créer de lien de téléchargement.
