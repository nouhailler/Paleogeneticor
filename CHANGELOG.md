# Changelog

Toutes les modifications notables de Paleogeneticor sont documentees ici.

## 0.2.0 - Documentation et assets

- Ajout d'un README illustre avec badges, captures d'ecran, stack, scripts et structure projet.
- Ajout de `CONTEXT.md` pour documenter la vision produit, l'architecture et les conventions d'evolution.
- Ajout d'une icone d'application en SVG et PNG pour installation mobile.
- Ajout de captures d'ecran desktop et mobile dans `public/images/screenshots`.
- Correction du rendu mobile de l'accueil pour supprimer les debordements horizontaux.
- Mise a jour du manifest PWA pour referencer les icones d'installation.

## 0.1.0 - Base applicative

- Initialisation de l'application React 19, TypeScript strict et Vite.
- Ajout de TailwindCSS, React Router, Zustand, Framer Motion, Leaflet, ReactFlow, Recharts, Fuse.js et Dexie.
- Ajout de la PWA avec Workbox via `vite-plugin-pwa`.
- Ajout des premieres donnees JSON : especes, fossiles, decouvertes, glossaire, carte, techniques, laboratoires et chercheurs.
- Ajout de la recherche globale, des favoris, de l'historique et des premieres visualisations.
- Ajout de la configuration Netlify.
