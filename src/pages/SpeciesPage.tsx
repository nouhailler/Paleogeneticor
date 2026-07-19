import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';
import { species } from '../services/content';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatKya } from '../utils/format';

export function SpeciesPage() {
  useDocumentTitle('Especes humaines');

  return (
    <>
      <PageHeader
        eyebrow="Encyclopedie"
        title="Especes humaines"
        description="Fiches structurées pour comparer repartition, culture materielle, donnees genetiques et hybridations."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {species.map((item) => (
          <Link key={item.id} to={`/species/${item.id}`}>
            <Card className="h-full transition hover:-translate-y-1 hover:border-lagoon/40">
              <p className="text-sm font-semibold text-ochre">{formatKya(item.rangeStartKya)} - {formatKya(item.rangeEndKya)}</p>
              <h2 className="mt-2 text-2xl font-bold italic">{item.name}</h2>
              <p className="mt-1 text-sm font-medium text-lagoon">{item.region}</p>
              <p className="mt-4 leading-7 text-ink/75">{item.summary}</p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
