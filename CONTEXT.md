# CONTEXT.md

## Vision

Paleogeneticor est une encyclopedie scientifique progressive sur la paleogenetique. L'application doit rester exploitable hors ligne, pedagogique, responsive et maintenable sur plusieurs annees.

Le public vise couvre trois usages :

- grand public curieux d'evolution humaine ;
- etudiants ayant besoin de reperes fiables ;
- enseignants cherchant une base visuelle pour expliquer l'ADN ancien.

## Principes Produit

- L'application doit s'ouvrir directement sur l'experience, sans landing page marketing.
- Les informations doivent etre consultables par recherche, navigation thematique, carte et visualisations.
- Les contenus scientifiques doivent etre extensibles depuis des fichiers JSON locaux.
- Les favoris, l'historique et les preferences doivent rester sur l'appareil.
- Les composants doivent rester utilisables sur mobile Android en priorite.

## Principes Techniques

- TypeScript strict pour proteger les modeles de donnees.
- Pages chargees en lazy loading pour contenir le bundle initial.
- Aucune API serveur obligatoire.
- PWA offline-first avec Workbox.
- Donnees persistantes locales avec Dexie / IndexedDB.
- Visualisations specialisees avec des bibliotheques etablies : Leaflet, ReactFlow, Recharts et D3.js.

## Architecture Actuelle

```text
src/
  components/       UI partagee et visualisations
  pages/            routes principales
  layouts/          shell applicatif
  demo/             moteur de demonstration et scenarios declaratifs
  services/         acces donnees, recherche, IndexedDB
  store/            etat applicatif Zustand
  types/            contrats TypeScript
  data/             contenu JSON local
public/
  icons/            icones PWA
  images/           captures et visuels libres locaux
```

## Etat Fonctionnel

La base actuelle contient :

- accueil interactif ;
- recherche globale Fuse.js ;
- fiches especes et fiches detail enrichies par sections ;
- medias locaux dedies aux especes dans `public/images/species/details` ;
- page ADN ancien avec dossiers de methodes cliquables et graphique Recharts ;
- carte Leaflet offline-friendly ;
- arbre evolutif ReactFlow ;
- glossaire filtrable ;
- pages fossiles et decouvertes ;
- favoris et historique en IndexedDB ;
- mode demo guide avec curseur virtuel, surbrillance, narration et controles ;
- manifest PWA, service worker et configuration Netlify.

## Point d'Arret

Derniere mise a jour de contexte : 23 juillet 2026.

Le projet est pousse sur `main` vers `https://github.com/nouhailler/Paleogeneticor`.

Ce qui vient d'etre termine :

- ajout d'un mode demo lanceable par `?demo=onboarding` et par un bouton dans le header/menu ;
- ajout du moteur `src/demo/engine.ts`, capable d'executer des etapes `navigate`, `click`, `type`, `wait`, `highlight` et `narrate` ;
- ajout de scenarios declaratifs dans `src/demo/scenarios`, sans logique applicative ;
- ajout du lecteur React avec curseur virtuel, surbrillance, narration, controles play/pause/etape suivante/vitesse/quitter et sortie par `Echap` ;
- ajout d'un seed de demo isole dans le store Zustand, sans ecriture IndexedDB pendant la demonstration ;
- ajout des attributs `data-demo-id` necessaires sur accueil, navigation, especes, fiche Neandertal et page ADN ;
- enrichissement des fiches especes avec sections detaillees `ADN et parentes`, `Culture`, `Reperes` et `Outils` ;
- ajout de fenetres de detail ouvrables depuis chaque fiche espece ;
- ajout de medias Wikimedia Commons locaux pour differencier Neandertal, Denisoviens et Homo sapiens ;
- enrichissement de la page `ADN ancien` avec 13 dossiers cliquables couvrant les jalons 1983-2024 ;
- ajout de contenus structures pour PCR, extraction, salles blanches, authentification, sequencage, capture, bioinformatique, introgression, bibliotheques simple brin, os petreux, ADN sedimentaire, ADN nucleaire sedimentaire et criblage haut debit ;
- mise a jour des contrats TypeScript pour les nouvelles sections detaillees et les dossiers techniques.

Validation realisee :

```bash
npm run lint
npm run test
npm run build
```

Etat Git attendu a la reprise : branche `main` propre et synchronisee avec `origin/main`.

## Conventions de Donnees

Les types principaux sont definis dans `src/types/domain.ts`. Les donnees JSON doivent rester compatibles avec ces types.

Pour ajouter une espece :

1. Ajouter un fichier JSON dans `src/data/species`.
2. Importer le fichier dans `src/services/content.ts`.
3. Verifier que la recherche globale expose bien la nouvelle entree.
4. Ajouter au besoin des sites associes dans `src/data/maps/sites.json`.
5. Renseigner `detailedSections` avec une entree `media`, des points forts, des sujets de detail et des indicateurs.

Pour ajouter un dossier ADN :

1. Ajouter une entree dans `src/data/techniques/techniques.json`.
2. Renseigner `image`, `category`, `whyItMatters`, `steps`, `ancientDnaRole`, `contaminationRisks`, `safeguards`, `comparison` et `keyFigures`.
3. Verifier que l'image est locale ou deja disponible dans `public/images`.
4. Lancer `npm run build`, `npm run lint` et `npm run test`.

Pour ajouter un scenario demo :

1. Creer un fichier declaratif dans `src/demo/scenarios`.
2. Declarer des etapes avec les types supportes par `src/demo/engine.ts`.
3. Cibler les elements uniquement avec `data-demo-id`, jamais avec des classes CSS.
4. Ajouter les `data-demo-id` manquants sur les composants concernes.
5. Utiliser `seed` pour simuler favoris et historique sans toucher aux donnees reelles.
6. Exporter le scenario depuis `src/demo/scenarios/index.ts`.
7. Verifier le parcours avec `/?demo=<id-du-scenario>`.

## Priorites Suivantes

- Enrichir le glossaire vers plusieurs centaines de termes.
- Ajouter une vraie chronologie interactive complete.
- Ajouter des pages chercheurs et laboratoires dediees.
- Etendre les donnees bibliographiques.
- Ajouter des credits/sources plus visibles pour les medias Wikimedia Commons et les jalons ADN.
- Ajouter des tests automatises pour le moteur demo et le store en mode demo.
- Ajouter des tests de rendu pour les routes principales.
- Ajouter un audit Lighthouse PWA dans le workflow de validation.

## Notes de Reprise

- La carte Leaflet est volontairement offline-friendly et n'utilise pas de tuiles externes obligatoires.
- La frise rapide est dans `src/components/TimelineStrip.tsx`.
- Les libelles de categories de frise sont traduits cote composant via `categoryLabels`.
- Les captures README sont dans `public/images/screenshots`.
- Les icones d'installation sont dans `public/icons`.
- Les visuels d'especes ajoutes pendant l'enrichissement sont dans `public/images/species/details`.
- Le scenario demo actuel est `onboarding` et couvre accueil, especes, fiche Neandertal et ADN ancien.
- Si `localhost:5173` affiche une ancienne app, vider le service worker PWA et les donnees du site dans les DevTools.
