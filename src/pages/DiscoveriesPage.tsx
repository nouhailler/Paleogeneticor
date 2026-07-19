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
          <Card key={discovery.id}>
            <p className="text-sm font-semibold text-ochre">{discovery.year} · {discovery.category}</p>
            <h2 className="mt-2 text-xl font-bold">{discovery.title}</h2>
            <p className="mt-3 leading-7 text-ink/75">{discovery.summary}</p>
          </Card>
        ))}
      </div>
    </>
  );
}
