import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';
import { discoveries } from '../services/content';

export function DiscoveriesPage() {
  const sortedDiscoveries = discoveries.toSorted((first, second) => first.year - second.year);

  return (
    <>
      <PageHeader
        eyebrow="Chronologie"
        title="Decouvertes majeures"
        description="Jalons scientifiques qui structurent l'histoire de la paleogenetique."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {sortedDiscoveries.map((discovery) => (
          <Link key={discovery.id} to={`/discoveries/${discovery.id}`} className="group block">
            <Card className="h-full overflow-hidden p-0 transition group-hover:border-lagoon/40 group-hover:bg-lagoon/5">
              <img src={discovery.image} alt={discovery.imageAlt} className="h-52 w-full bg-bone object-cover" loading="lazy" />
              <div className="grid gap-3 p-5">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-semibold text-ochre">
                    {discovery.year} · {discovery.category}
                  </p>
                  <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-lagoon transition group-hover:translate-x-1" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="mt-2 text-xl font-bold">{discovery.title}</h2>
                  <p className="mt-3 leading-7 text-ink/75">{discovery.summary}</p>
                </div>
                <p className="text-xs font-semibold text-ink/50">{discovery.imageCredit}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
