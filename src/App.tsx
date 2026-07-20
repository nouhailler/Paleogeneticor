import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';

const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const SpeciesPage = lazy(() => import('./pages/SpeciesPage').then((module) => ({ default: module.SpeciesPage })));
const SpeciesDetailPage = lazy(() =>
  import('./pages/SpeciesDetailPage').then((module) => ({ default: module.SpeciesDetailPage }))
);
const DnaPage = lazy(() => import('./pages/DnaPage').then((module) => ({ default: module.DnaPage })));
const MapPage = lazy(() => import('./pages/MapPage').then((module) => ({ default: module.MapPage })));
const TreePage = lazy(() => import('./pages/TreePage').then((module) => ({ default: module.TreePage })));
const GlossaryPage = lazy(() => import('./pages/GlossaryPage').then((module) => ({ default: module.GlossaryPage })));
const GlossaryDetailPage = lazy(() =>
  import('./pages/GlossaryDetailPage').then((module) => ({ default: module.GlossaryDetailPage }))
);
const FossilsPage = lazy(() => import('./pages/FossilsPage').then((module) => ({ default: module.FossilsPage })));
const DiscoveriesPage = lazy(() =>
  import('./pages/DiscoveriesPage').then((module) => ({ default: module.DiscoveriesPage }))
);
const DiscoveryDetailPage = lazy(() =>
  import('./pages/DiscoveryDetailPage').then((module) => ({ default: module.DiscoveryDetailPage }))
);
const LibraryPage = lazy(() => import('./pages/LibraryPage').then((module) => ({ default: module.LibraryPage })));

function Loading() {
  return (
    <div className="grid min-h-[40vh] place-items-center rounded-lg border border-black/10 bg-paper">
      <p className="text-sm font-semibold text-lagoon">Chargement du module...</p>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        ),
        handle: { title: 'Accueil' }
      },
      {
        path: 'species',
        element: (
          <Suspense fallback={<Loading />}>
            <SpeciesPage />
          </Suspense>
        ),
        handle: { title: 'Especes' }
      },
      {
        path: 'species/:id',
        element: (
          <Suspense fallback={<Loading />}>
            <SpeciesDetailPage />
          </Suspense>
        ),
        handle: { title: 'Fiche espece' }
      },
      {
        path: 'fossils',
        element: (
          <Suspense fallback={<Loading />}>
            <FossilsPage />
          </Suspense>
        ),
        handle: { title: 'Fossiles' }
      },
      {
        path: 'discoveries',
        element: (
          <Suspense fallback={<Loading />}>
            <DiscoveriesPage />
          </Suspense>
        ),
        handle: { title: 'Decouvertes' }
      },
      {
        path: 'discoveries/:id',
        element: (
          <Suspense fallback={<Loading />}>
            <DiscoveryDetailPage />
          </Suspense>
        ),
        handle: { title: 'Fiche decouverte' }
      },
      {
        path: 'dna',
        element: (
          <Suspense fallback={<Loading />}>
            <DnaPage />
          </Suspense>
        ),
        handle: { title: 'ADN ancien' }
      },
      {
        path: 'map',
        element: (
          <Suspense fallback={<Loading />}>
            <MapPage />
          </Suspense>
        ),
        handle: { title: 'Carte' }
      },
      {
        path: 'tree',
        element: (
          <Suspense fallback={<Loading />}>
            <TreePage />
          </Suspense>
        ),
        handle: { title: 'Arbre' }
      },
      {
        path: 'glossary',
        element: (
          <Suspense fallback={<Loading />}>
            <GlossaryPage />
          </Suspense>
        ),
        handle: { title: 'Glossaire' }
      },
      {
        path: 'glossary/:id',
        element: (
          <Suspense fallback={<Loading />}>
            <GlossaryDetailPage />
          </Suspense>
        ),
        handle: { title: 'Fiche glossaire' }
      },
      {
        path: 'library',
        element: (
          <Suspense fallback={<Loading />}>
            <LibraryPage />
          </Suspense>
        ),
        handle: { title: 'Bibliotheque locale' }
      }
    ]
  }
]);

export function App() {
  return <RouterProvider router={router} />;
}
