# Paleogeneticor

Application PWA React/TypeScript de reference sur la paleogenetique.

## Stack

- React 19, TypeScript strict, Vite
- TailwindCSS, React Router, Zustand, Framer Motion
- Leaflet, ReactFlow, Recharts, D3.js
- Fuse.js pour la recherche
- Dexie / IndexedDB pour favoris, historique et preferences
- Workbox via `vite-plugin-pwa`

## Commandes

```bash
npm install
npm run dev
npm run build
npm run test
```

## Architecture

Les donnees sont stockees dans `src/data` sous forme JSON. Chaque domaine applicatif dispose de types dans
`src/types`, de services dans `src/services`, et de pages chargees en lazy loading dans `src/pages`.

## Offline

Le service worker est genere au build. Les assets applicatifs et JSON sont precaches pour permettre l'usage apres
installation. Les donnees personnelles locales sont conservees dans IndexedDB.
