# ROADMAP.md

## Etat Actuel

Derniere mise a jour : 23 juillet 2026.

Paleogeneticor dispose maintenant d'une base PWA offline-first avec navigation thematique, recherche globale, fiches especes detaillees, page ADN ancien enrichie, visualisations scientifiques, favoris/historique locaux et mode demo guide.

## Termine Recemment

- Mode demo lanceable par `?demo=onboarding` ou par le bouton dedie du header/menu.
- Moteur demo TypeScript dans `src/demo/engine.ts`.
- Scenarios declaratifs dans `src/demo/scenarios`.
- Etapes supportees : `navigate`, `click`, `type`, `wait`, `highlight`, `narrate`.
- Ciblage par `data-demo-id` uniquement.
- Curseur virtuel, surbrillance, narration et barre de controle.
- Seed demo isole en memoire, sans ecriture IndexedDB.
- Sortie propre par bouton quitter ou `Echap`.

## Court Terme

- Ajouter des tests unitaires pour `DemoScenarioEngine`.
- Ajouter des tests du store en mode demo pour garantir l'absence d'ecriture IndexedDB.
- Ajouter un second scenario demo centre sur carte, migrations et chronologie.
- Ajouter une verification manuelle documentee du mode `prefers-reduced-motion`.
- Rendre les erreurs de scenario plus visibles pour les contributeurs en developpement.

## Moyen Terme

- Enrichir le glossaire vers plusieurs centaines de termes.
- Ajouter une chronologie interactive complete.
- Developper les pages chercheurs et laboratoires.
- Etendre les donnees bibliographiques et les credits medias.
- Ajouter des tests de rendu pour les routes principales.
- Ajouter un audit Lighthouse PWA au workflow de validation.

## Long Terme

- Structurer les contenus scientifiques en lots versionnes.
- Ajouter des parcours pedagogiques par niveau : college, lycee, universite, grand public.
- Ajouter une couche de comparaison avancee entre especes, techniques et sites.
- Preparer une strategie de traduction si le contenu doit devenir multilingue.

## Contraintes Permanentes

- Pas de backend obligatoire.
- Donnees applicatives locales et extensibles.
- PWA utilisable hors ligne apres installation.
- TypeScript strict.
- Pas de nouvelle dependance sans justification.
- Les scenarios demo restent declaratifs et ciblent exclusivement `data-demo-id`.
