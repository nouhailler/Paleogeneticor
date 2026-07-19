<p align="center">
  <img src="public/icons/app-icon.svg" width="112" height="112" alt="Paleogeneticor app icon" />
</p>

<h1 align="center">Paleogeneticor</h1>

<p align="center">
  Encyclopedie PWA offline-first sur la paleogenetique, les especes humaines anciennes et l'ADN ancien.
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-PWA-646cff?logo=vite&logoColor=white">
  <img alt="Offline" src="https://img.shields.io/badge/Offline-first-0f6f73">
  <img alt="Netlify" src="https://img.shields.io/badge/Netlify-ready-00ad9f?logo=netlify&logoColor=white">
</p>

## Apercu

Paleogeneticor est une application educative concue pour le grand public, les etudiants et les enseignants. Elle combine fiches encyclopediques, recherche instantanee, visualisations scientifiques, favoris locaux et fonctionnement hors ligne apres installation.

<p align="center">
  <img src="public/images/screenshots/home-desktop.png" alt="Accueil Paleogeneticor desktop" width="900" />
</p>

## Captures

| Accueil mobile | Especes humaines | ADN ancien |
| --- | --- | --- |
| <img src="public/images/screenshots/home-mobile.png" alt="Accueil Paleogeneticor mobile" width="240" /> | <img src="public/images/screenshots/species-desktop.png" alt="Page especes humaines" width="320" /> | <img src="public/images/screenshots/dna-desktop.png" alt="Page ADN ancien" width="320" /> |

## Fonctionnalites

- Recherche globale instantanee avec Fuse.js dans les especes, fossiles, decouvertes, techniques et termes du glossaire.
- Fiches d'especes humaines avec periode, repartition, ADN, culture, outils et hybridations.
- Carte interactive Leaflet compatible offline-first, sans appel obligatoire a des tuiles externes.
- Arbre evolutif interactif avec ReactFlow.
- Graphiques de melanges genetiques avec Recharts.
- Favoris et historique conserves localement avec Dexie / IndexedDB.
- Chargement progressif des pages avec React Router et lazy loading.
- PWA installable sur Android avec manifest, icones et service worker Workbox.

## Stack

| Domaine | Technologies |
| --- | --- |
| Interface | React 19, TypeScript, Vite |
| Styles | TailwindCSS |
| Navigation | React Router |
| Etat local | Zustand |
| Stockage | Dexie, IndexedDB |
| Recherche | Fuse.js |
| Visualisations | Leaflet, ReactFlow, Recharts, D3.js |
| Animations | Framer Motion |
| PWA | vite-plugin-pwa, Workbox |
| Deploiement | Netlify |

## Installation

```bash
npm install
npm run dev
```

L'application locale est servie par defaut sur :

```text
http://localhost:5173/
```

## Scripts

```bash
npm run dev      # serveur de developpement
npm run build    # verification TypeScript et build production PWA
npm run preview  # preview locale du build
npm run test     # tests Vitest
npm run lint     # lint ESLint
```

## Structure

```text
src/
  components/       composants reutilisables
  pages/            ecrans routes charges en lazy loading
  layouts/          structure globale de l'application
  services/         contenu, recherche, IndexedDB
  store/            etat Zustand
  types/            modeles TypeScript
  data/             donnees JSON par domaine
public/
  icons/            icones PWA et application
  images/
    screenshots/    captures d'ecran documentaires
```

## Donnees

Toutes les donnees applicatives sont locales et stockees en JSON dans `src/data`. Le projet ne depend pas d'un backend. Chaque domaine peut etre enrichi progressivement avec de nouveaux fichiers ou collections JSON.

## PWA Android

Les assets d'installation sont disponibles dans `public/icons` :

- `app-icon.svg`
- `app-icon-192.png`
- `app-icon-512.png`

Le manifest est genere par `vite-plugin-pwa` depuis `vite.config.ts`. Le service worker precache les fichiers de build et les donnees JSON pour maintenir une experience offline apres installation.

## Documentation projet

- [CONTEXT.md](CONTEXT.md) : vision produit, principes techniques et conventions d'evolution.
- [CHANGELOG.md](CHANGELOG.md) : historique des versions.
- [PROMPT.md](PROMPT.md) : cahier des charges initial.
