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
  services/         acces donnees, recherche, IndexedDB
  store/            etat applicatif Zustand
  types/            contrats TypeScript
  data/             contenu JSON local
public/
  icons/            icones PWA
  images/           captures et futurs visuels libres
```

## Etat Fonctionnel

La base actuelle contient :

- accueil interactif ;
- recherche globale Fuse.js ;
- fiches especes et fiche detail ;
- page ADN ancien avec graphique Recharts ;
- carte Leaflet offline-friendly ;
- arbre evolutif ReactFlow ;
- glossaire filtrable ;
- pages fossiles et decouvertes ;
- favoris et historique en IndexedDB ;
- manifest PWA, service worker et configuration Netlify.

## Conventions de Donnees

Les types principaux sont definis dans `src/types/domain.ts`. Les donnees JSON doivent rester compatibles avec ces types.

Pour ajouter une espece :

1. Ajouter un fichier JSON dans `src/data/species`.
2. Importer le fichier dans `src/services/content.ts`.
3. Verifier que la recherche globale expose bien la nouvelle entree.
4. Ajouter au besoin des sites associes dans `src/data/maps/sites.json`.

## Priorites Suivantes

- Enrichir le glossaire vers plusieurs centaines de termes.
- Ajouter une vraie chronologie interactive complete.
- Ajouter des pages chercheurs et laboratoires dediees.
- Etendre les donnees bibliographiques.
- Ajouter des tests de rendu pour les routes principales.
- Ajouter un audit Lighthouse PWA dans le workflow de validation.
