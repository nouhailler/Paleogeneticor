import { Star } from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';
import { getSpeciesById } from '../services/content';
import { useLibraryStore } from '../store/libraryStore';
import { formatKya } from '../utils/format';

export function SpeciesDetailPage() {
  const { id } = useParams();
  const item = id ? getSpeciesById(id) : undefined;
  const favorites = useLibraryStore((state) => state.favorites);
  const toggleFavorite = useLibraryStore((state) => state.toggleFavorite);

  if (!item) {
    return <Navigate to="/species" replace />;
  }

  const favoriteId = `species:${item.id}`;
  const isFavorite = favorites.some((favorite) => favorite.id === favoriteId);

  return (
    <>
      <PageHeader eyebrow="Fiche espece" title={item.name} description={item.summary} />
      <button
        className="mb-5 inline-flex items-center gap-2 rounded-md border border-black/10 bg-paper px-4 py-2 text-sm font-semibold text-ink"
        onClick={() => void toggleFavorite({ entityId: item.id, entityType: 'species', title: item.name })}
      >
        <Star className={`h-4 w-4 ${isFavorite ? 'fill-ochre text-ochre' : 'text-lagoon'}`} />
        {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      </button>
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <h2 className="text-xl font-bold">ADN et parentes</h2>
          <p className="mt-3 leading-7 text-ink/75">{item.genetics}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {item.hybridations.map((hybridation) => (
              <span key={hybridation} className="rounded-md bg-lagoon/10 px-3 py-1 text-sm font-medium text-lagoon">
                {hybridation}
              </span>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-bold">Repères</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <div>
              <dt className="font-semibold">Periode</dt>
              <dd className="text-ink/70">{formatKya(item.rangeStartKya)} - {formatKya(item.rangeEndKya)}</dd>
            </div>
            <div>
              <dt className="font-semibold">Region</dt>
              <dd className="text-ink/70">{item.region}</dd>
            </div>
          </dl>
        </Card>
        <Card>
          <h2 className="text-xl font-bold">Culture</h2>
          <ul className="mt-3 grid gap-2 text-ink/75">
            {item.culture.map((entry) => <li key={entry}>{entry}</li>)}
          </ul>
        </Card>
        <Card>
          <h2 className="text-xl font-bold">Outils</h2>
          <ul className="mt-3 grid gap-2 text-ink/75">
            {item.tools.map((entry) => <li key={entry}>{entry}</li>)}
          </ul>
        </Card>
      </div>
    </>
  );
}
