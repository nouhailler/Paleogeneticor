import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { GlobalSearch } from '../components/GlobalSearch';
import { TimelineStrip } from '../components/TimelineStrip';
import { WorldMap } from '../components/WorldMap';
import { discoveries, fossils, getDiscoveryOfTheDay, species } from '../services/content';
import { useLibraryStore } from '../store/libraryStore';

export function HomePage() {
  const discovery = getDiscoveryOfTheDay();
  const favorites = useLibraryStore((state) => state.favorites);

  return (
    <div className="grid min-w-0 gap-6">
      <section className="grid min-h-[calc(100vh-9rem)] w-full min-w-0 max-w-[calc(100vw-2rem)] content-center gap-8 overflow-hidden rounded-lg bg-ink px-4 py-8 text-white sm:max-w-full sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-12">
        <motion.div
          className="min-w-0 max-w-full"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-clay">Encyclopedie scientifique offline</p>
          <h1 className="mt-3 max-w-full break-words text-4xl font-bold leading-tight sm:max-w-4xl sm:text-6xl">
            Paleogenetique
          </h1>
          <p className="mt-5 max-w-full text-base leading-7 text-white/78 sm:max-w-2xl sm:text-lg sm:leading-8">
            Explorer l'ADN ancien, les fossiles humains, les migrations et les hybridations qui ont transforme notre
            comprehension de l'evolution humaine.
          </p>
          <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
            <Link className="rounded-md bg-clay px-4 py-3 text-sm font-semibold text-ink" to="/species">
              Explorer les especes
            </Link>
            <Link className="rounded-md border border-white/25 px-4 py-3 text-sm font-semibold text-white" to="/map">
              Ouvrir la carte
            </Link>
          </div>
        </motion.div>
        <GlobalSearch />
      </section>

      <section className="grid gap-4 sm:grid-cols-4">
        {[
          ['Especes', species.length],
          ['Fossiles', fossils.length],
          ['Decouvertes', discoveries.length],
          ['Favoris', favorites.length]
        ].map(([label, value]) => (
          <Card key={label as string}>
            <p className="text-sm text-ink/60">{label}</p>
            <p className="mt-2 text-3xl font-bold text-lagoon">{value}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <p className="text-sm font-semibold uppercase tracking-wide text-ochre">Decouverte du jour</p>
          <h2 className="mt-2 text-2xl font-bold">{discovery.title}</h2>
          <p className="mt-2 text-sm font-medium text-lagoon">{discovery.year} · {discovery.category}</p>
          <p className="mt-4 leading-7 text-ink/75">{discovery.summary}</p>
        </Card>
        <WorldMap />
      </section>

      <section className="rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
        <h2 className="mb-4 text-2xl font-bold">Frise rapide</h2>
        <TimelineStrip />
      </section>
    </div>
  );
}
