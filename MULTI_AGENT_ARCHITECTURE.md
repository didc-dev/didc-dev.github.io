# Architecture multi-agents

Le CEO conserve la responsabilité de la cohérence et de la livraison. Les spécialistes travaillent sur un périmètre borné, déposent leur résultat dans `docs/agents/`, puis une revue distincte contrôle les faits, l’UX, l’accessibilité ou la publication.

Flux: **mission → production → revue → correction → QA → publication vérifiée**.

Les agents ne publient jamais de donnée privée, ne transforment pas un laboratoire en expérience client et ne déclarent pas un test réussi sans sortie vérifiable.

Les configurations se trouvent dans `.codex/agents/`. Les dossiers `tasks/`, `reviews/`, `decisions/` et `handoffs/` assurent la reprise d’une session.
