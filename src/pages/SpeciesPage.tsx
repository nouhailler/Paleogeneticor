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
            <Card className="h-full overflow-hidden p-0 transition hover:-translate-y-1 hover:border-lagoon/40">
              <img
                src={item.image}
                alt={`Reconstitution illustree de ${item.name}`}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <div className="p-5">
              <p className="text-sm font-semibold text-ochre">{formatKya(item.rangeStartKya)} - {formatKya(item.rangeEndKya)}</p>
              <h2 className="mt-2 text-2xl font-bold italic">{item.name}</h2>
              <p className="mt-1 text-sm font-medium text-lagoon">{item.region}</p>
              <p className="mt-4 leading-7 text-ink/75">{item.summary}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
