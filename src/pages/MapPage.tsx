import { PageHeader } from '../components/PageHeader';
import { WorldMap } from '../components/WorldMap';
import { mapSites } from '../services/content';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function MapPage() {
  useDocumentTitle('Carte mondiale');

  return (
    <>
      <PageHeader
        eyebrow="Atlas"
        title="Carte mondiale"
        description="Sites archeologiques, laboratoires et musees relies aux donnees paleogenetiques."
      />
      <WorldMap />
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {mapSites.map((site) => (
          <article key={site.id} className="rounded-lg border border-black/10 bg-paper p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ochre">{site.kind}</p>
            <h2 className="mt-2 font-bold">{site.name}</h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">{site.summary}</p>
          </article>
        ))}
      </div>
    </>
  );
}
