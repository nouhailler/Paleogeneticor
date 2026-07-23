import { Navigate, useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';
import { getDiscoveryById } from '../services/content';

export function DiscoveryDetailPage() {
  const { id } = useParams();
  const discovery = id ? getDiscoveryById(id) : undefined;

  if (!discovery) {
    return <Navigate to="/discoveries" replace />;
  }

  return (
    <>
      <PageHeader eyebrow={`${discovery.year} · ${discovery.category}`} title={discovery.title} description={discovery.summary} />
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <figure className="mb-5 overflow-hidden rounded-lg border border-black/10 bg-bone">
            <img src={discovery.image} alt={discovery.imageAlt} className="max-h-[460px] w-full object-cover" />
            <figcaption className="flex flex-wrap items-center justify-between gap-2 bg-paper px-4 py-3 text-xs text-ink/60">
              <span>{discovery.imageCredit}</span>
              <a className="font-semibold text-lagoon underline-offset-4 hover:underline" href={discovery.imageSource} target="_blank" rel="noreferrer">
                Source Wikimedia
              </a>
            </figcaption>
          </figure>
          <h2 className="text-xl font-bold">Explication</h2>
          <div className="mt-4 grid gap-4 leading-7 text-ink/75">
            {discovery.details.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Card>
        <div className="grid content-start gap-5">
          <Card>
            <h2 className="text-xl font-bold">Pourquoi c'est important</h2>
            <p className="mt-3 leading-7 text-ink/75">{discovery.impact}</p>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Sources</h2>
            <ul className="mt-3 grid gap-3 text-sm text-ink/75">
              {discovery.sources.map((source) => (
                <li key={`${source.label}-${source.year}`}>
                  <span className="font-semibold text-ink">{source.label}</span>
                  <span> ({source.year})</span>
                  <span className="block">{source.source}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
