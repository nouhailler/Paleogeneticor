import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { useLibraryStore } from '../store/libraryStore';

export function LibraryPage() {
  const favorites = useLibraryStore((state) => state.favorites);
  const history = useLibraryStore((state) => state.history);

  return (
    <>
      <PageHeader
        eyebrow="Local"
        title="Favoris et historique"
        description="Donnees conservees dans IndexedDB sur cet appareil pour rester disponibles hors ligne."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 text-xl font-bold">Favoris</h2>
          <div className="grid gap-3">
            {favorites.length === 0 ? <p className="text-ink/65">Aucun favori enregistre.</p> : null}
            {favorites.map((item) => (
              <article key={item.id} className="rounded-lg border border-black/10 bg-paper p-4">
                <p className="text-xs font-semibold uppercase text-ochre">{item.entityType}</p>
                <p className="mt-1 font-bold">{item.title}</p>
              </article>
            ))}
          </div>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-bold">Historique</h2>
          <div className="grid gap-3">
            {history.length === 0 ? <p className="text-ink/65">Aucune visite enregistree.</p> : null}
            {history.map((item) => (
              <Link key={item.id} to={item.path} className="rounded-lg border border-black/10 bg-paper p-4">
                <p className="font-bold">{item.title}</p>
                <p className="mt-1 text-xs text-ink/60">{new Date(item.visitedAt).toLocaleString('fr-FR')}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
