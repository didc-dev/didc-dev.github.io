# Audit initial — 28 juillet 2026

## Périmètre

Le portfolio est créé dans un dépôt autonome afin de ne pas exposer le classeur de suivi, la base SQLite, l’exécutable LabNotes, les captures brutes et les notes privées du projet de transition professionnelle.

## État avant intervention

- Nouveau dépôt Git local, branche `main`, sans historique ni dépôt distant.
- Socle Sites/vinext généré, encore limité à un écran d’attente.
- Aucun contenu professionnel, aucune navigation, aucune stratégie GitHub Pages.
- Aucun secret détecté dans le nouveau dépôt.

## Décisions

- Site public séparé nommé `daniel-cruz-portfolio`.
- Contenu public en français de Suisse.
- Adresse postale, date de naissance, nationalité et permis de séjour exclus.
- CV original conservé hors du site public; seules les données professionnelles vérifiées sont importées.
- Photo professionnelle extraite du CV et optimisée pour le web.
- Projets de laboratoire décrits sans IP, identifiants, mots de passe ni captures sensibles.

## Risques surveillés

- Dates ambiguës du CV: formulation prudente, sans extrapolation.
- Routage GitHub Pages: navigation par fragments pour garantir les liens directs.
- Contenu futur: import depuis des dossiers Markdown, brouillons exclus du site.
- Coordonnées: courriel protégé contre l’extraction HTML élémentaire; aucune adresse privée.
