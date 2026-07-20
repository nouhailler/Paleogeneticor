import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';
import { discoveries } from '../services/content';

export function DiscoveriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Chronologie"
        title="Decouvertes majeures"
        description="Jalons scientifiques qui structurent l'histoire de la paleogenetique."
      />
      <div className="grid gap-4">
        {discoveries.map((discovery) => (
          <Link key={discovery.id} to={`/discoveries/${discovery.id}`} className="group block">
            <Card className="transition group-hover:border-lagoon/40 group-hover:bg-lagoon/5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-ochre">{discovery.year} · {discovery.category}</p>
                  <h2 className="mt-2 text-xl font-bold">{discovery.title}</h2>
                </div>
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-lagoon transition group-hover:translate-x-1" aria-hidden="true" />
              </div>
              <p className="mt-3 leading-7 text-ink/75">{discovery.summary}</p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
