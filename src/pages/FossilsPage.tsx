import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';
import { fossils } from '../services/content';

export function FossilsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Collections"
        title="Fossiles celebres"
        description="Specimens, lieux de conservation, publications et role scientifique."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {fossils.map((fossil) => (
          <Card key={fossil.id}>
            <p className="text-sm font-semibold text-ochre">{fossil.discoveredYear} · {fossil.location}</p>
            <h2 className="mt-2 text-2xl font-bold">{fossil.name}</h2>
            <p className="mt-3 leading-7 text-ink/75">{fossil.importance}</p>
            <p className="mt-3 text-sm text-ink/60">Musee : {fossil.museum}</p>
          </Card>
        ))}
      </div>
    </>
  );
}
