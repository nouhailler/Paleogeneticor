# PROMPT.md

## Contexte

Tu es un ingénieur logiciel senior spécialisé dans les Progressive Web Apps, React, TypeScript, les applications éducatives, les visualisations scientifiques et les applications riches en données.

Tu dois développer une **application complète de référence sur la Paléogénétique**, destinée au grand public, aux étudiants et aux enseignants.

L'application doit être **100 % offline après installation**, extrêmement fluide, très visuelle, parfaitement responsive et optimisée pour Android via une Progressive Web App (PWA).

L'objectif n'est pas de réaliser une démonstration mais une **véritable encyclopédie scientifique** capable d'évoluer pendant plusieurs années.

Le code doit être maintenable, documenté, modulaire et facilement extensible.

## Technologies imposées

- React 19
- TypeScript
- Vite
- TailwindCSS
- React Router
- Zustand
- Framer Motion
- Leaflet
- D3.js
- ReactFlow
- Recharts
- Fuse.js
- Dexie (IndexedDB)
- Workbox
- PWA
- Netlify

Aucun backend. Toutes les données proviennent de fichiers JSON.

## Architecture

```text
src/
  components/
  pages/
  layouts/
  hooks/
  store/
  services/
  utils/
  types/
  assets/
  styles/
  data/
    species/
    fossils/
    researchers/
    laboratories/
    discoveries/
    timeline/
    glossary/
    maps/
    dna/
    techniques/

public/
  images/
  videos/
  models/
  icons/
```

Chaque entité possède son propre fichier JSON.

## Fonctionnalités

1. Accueil interactif
- Frise chronologique (-7 Ma à aujourd'hui)
- Carte mondiale interactive
- Découverte du jour
- Statistiques
- Recherche globale
- Favoris
- Historique

2. Encyclopédie des espèces humaines
- Fiches détaillées
- Illustrations
- Cartes
- ADN
- Parenté
- Culture
- Outils
- Hybridations
- Bibliographie

3. Fossiles célèbres
- Photos
- Scanner 3D
- Localisation
- Musée
- Importance scientifique
- Publications

4. ADN ancien
- Extraction
- Dégradation
- PCR
- NGS
- Contamination
- ADN mitochondrial
- Chromosome Y
- ADN nucléaire
- Animations et schémas

5. Laboratoires
- Historique
- Équipes
- Chercheurs
- Publications
- Découvertes

6. Chercheurs
- Biographie
- Découvertes
- Livres
- Conférences
- Prix

7. Découvertes majeures
- Chronologie interactive
- Recherche
- Filtres

8. Carte mondiale
- Leaflet
- Sites archéologiques
- Musées
- Laboratoires
- Filtres
- Ouverture des fiches

9. Arbre évolutif interactif
- ReactFlow ou D3
- Zoom
- Hybridations
- Navigation

10. Migrations humaines
- Animation
- Curseur temporel
- Lecture automatique

11. Mélanges génétiques
- Introgression
- ADN néandertalien
- ADN denisovien
- Graphiques Recharts

12. Glossaire
- Plus de 500 termes
- Recherche instantanée

13. Comparateur
- Comparaison de deux espèces

14. Ligne du temps interactive
- Espèces
- Climat
- Glaciations
- Migrations
- Innovations
- Publications

15. Arbre génétique
- Visualisation zoomable
- Navigation

16. Chronologie des techniques
- PCR
- Séquençage
- NGS
- Bioinformatique
- IA

## Recherche

Utiliser Fuse.js pour une recherche instantanée dans toutes les données.

## Stockage

Utiliser Dexie / IndexedDB pour :
- favoris
- historique
- préférences
- cache

## Performances

- Lazy Loading
- Code Splitting
- WebP / AVIF
- Cache Workbox
- Lighthouse >95

## Accessibilité

Respect WCAG AA.

## PWA

- Installation Android
- Fonctionnement hors ligne
- Manifest
- Service Worker
- Splash Screen

## Netlify

Créer un netlify.toml optimisé.

## Images

Prévoir uniquement des emplacements et des placeholders. N'utiliser que des ressources libres de droits.

## Qualité

- TypeScript strict
- TSDoc
- Architecture modulaire
- Tests
- README.md
- CHANGELOG.md

## Méthodologie

Ne réalise pas un prototype.

Construis une application de production.

Travaille par étapes :

1. Architecture
2. Initialisation
3. Design System
4. Composants
5. Fonctionnalités
6. Données JSON
7. Tests
8. Corrections
9. Documentation

L'application doit rester compilable et fonctionnelle après chaque étape.
