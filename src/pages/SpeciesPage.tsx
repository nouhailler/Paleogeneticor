import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';
import { species } from '../services/content';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatKya } from '../utils/format';

export function SpeciesPage() {
  useDocumentTitle('Especes humaines');
  const earlySpecies = species.filter((item) => item.rangeStartKya >= 1000).length;
  const recentSpecies = species.filter((item) => item.rangeEndKya <= 100).length;

  return (
    <>
      <PageHeader
        eyebrow="Encyclopedie"
        title="Especes humaines"
        description="Fiches structurees pour comparer repartition, culture materielle, donnees genetiques, debats taxonomiques et hybridations."
      />
      <section className="mb-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-black/10 bg-paper p-4 shadow-soft">
          <p className="text-3xl font-bold text-ochre">{species.length}</p>
          <p className="mt-1 text-sm font-semibold text-ink/70">especes ou taxons Homo documentes</p>
        </div>
        <div className="rounded-lg border border-black/10 bg-paper p-4 shadow-soft">
          <p className="text-3xl font-bold text-ochre">{earlySpecies}</p>
          <p className="mt-1 text-sm font-semibold text-ink/70">formes anciennes au-dela de 1 Ma</p>
        </div>
        <div className="rounded-lg border border-black/10 bg-paper p-4 shadow-soft">
          <p className="text-3xl font-bold text-ochre">{recentSpecies}</p>
          <p className="mt-1 text-sm font-semibold text-ink/70">contemporains recents de Sapiens ou survivances tardives</p>
        </div>
      </section>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
                <p className="text-sm font-semibold text-ochre">
                  {formatKya(item.rangeStartKya)} - {formatKya(item.rangeEndKya)}
                </p>
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
