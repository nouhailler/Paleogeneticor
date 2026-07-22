import { useMemo, useState } from 'react';
import { ArrowRight, Building2, ExternalLink, FlaskConical, Landmark, MapPin, X } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { CircleMarker, MapContainer, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { WorldMap } from '../components/WorldMap';
import { mapSites } from '../services/content';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { MapSite } from '../types/domain';

const kindLabels: Record<MapSite['kind'], string> = {
  site: 'Site archeologique',
  laboratory: 'Laboratoire',
  museum: 'Musee'
};

const kindIcons: Record<MapSite['kind'], typeof MapPin> = {
  site: MapPin,
  laboratory: FlaskConical,
  museum: Building2
};

const kindColors: Record<MapSite['kind'], string> = {
  site: '#0f6f73',
  laboratory: '#48635b',
  museum: '#182323'
};

export function MapPage() {
  useDocumentTitle('Carte mondiale');
  const [activeSite, setActiveSite] = useState<MapSite | null>(null);
  const counts = useMemo(
    () =>
      mapSites.reduce(
        (acc, site) => {
          acc[site.kind] += 1;
          return acc;
        },
        { site: 0, laboratory: 0, museum: 0 } satisfies Record<MapSite['kind'], number>
      ),
    []
  );

  return (
    <>
      <PageHeader
        eyebrow="Atlas"
        title="Carte mondiale"
        description="Sites archeologiques, laboratoires et musees relies aux donnees paleogenetiques."
      />
      <WorldMap />

      <section className="mt-5 grid gap-3 md:grid-cols-3">
        {Object.entries(counts).map(([kind, count]) => {
          const typedKind = kind as MapSite['kind'];
          const Icon = kindIcons[typedKind];
          return (
            <div key={kind} className="rounded-lg border border-black/10 bg-paper p-4 shadow-soft">
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5" style={{ color: kindColors[typedKind] }} />
                <p className="text-sm font-bold text-ink">{kindLabels[typedKind]}</p>
              </div>
              <p className="mt-2 text-3xl font-bold text-ochre">{count}</p>
              <p className="mt-1 text-sm text-ink/65">entrees documentees</p>
            </div>
          );
        })}
      </section>

      <section className="mt-6">
        <div className="mb-4 flex items-center gap-2">
          <Landmark className="h-5 w-5 text-lagoon" />
          <h2 className="text-2xl font-bold">Lieux documentes</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {mapSites.map((site) => {
            const Icon = kindIcons[site.kind];
            const color = kindColors[site.kind];

            return (
              <button
                key={site.id}
                className="group h-full rounded-lg border border-black/10 bg-paper p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-lagoon/40"
                onClick={() => setActiveSite(site)}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase" style={{ color }}>
                    <Icon className="h-4 w-4" />
                    {kindLabels[site.kind]}
                  </span>
                  <span className="rounded-md bg-bone px-2 py-1 text-xs font-semibold text-ink/65">{site.period}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold">{site.name}</h3>
                <p className="mt-1 text-sm font-semibold text-lagoon">{site.region}</p>
                <p className="mt-3 text-sm leading-6 text-ink/70">{site.summary}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-lagoon">
                  Lire l'explication
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {activeSite ? <MapSiteDialog site={activeSite} onClose={() => setActiveSite(null)} /> : null}
    </>
  );
}

function MapSiteDialog({ site, onClose }: { site: MapSite; onClose: () => void }) {
  const Icon = kindIcons[site.kind];
  const color = kindColors[site.kind];
  const relatedPath = getRelatedPath(site);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="map-site-title"
    >
      <article className="max-h-[88vh] w-full max-w-3xl overflow-auto rounded-lg bg-paper shadow-soft">
        <header className="sticky top-0 flex items-start justify-between gap-3 border-b border-black/10 bg-paper p-4">
          <div className="flex gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md" style={{ backgroundColor: `${color}18` }}>
              <Icon className="h-6 w-6" style={{ color }} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase text-ink/55">
                {kindLabels[site.kind]} - {site.period}
              </p>
              <h3 id="map-site-title" className="mt-1 text-2xl font-bold">
                {site.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-lagoon">{site.region}</p>
            </div>
          </div>
          <button
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-black/10 text-ink"
            onClick={onClose}
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="grid gap-5 p-5">
          <p className="text-lg leading-8 text-ink/80">{site.summary}</p>
          <div className="grid gap-3">
            {site.details.map((detail) => (
              <p key={detail} className="leading-7 text-ink/75">
                {detail}
              </p>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <InfoBox label="Pourquoi ce lieu compte" value={site.importance} />
            <InfoBox label="Indices et donnees" value={site.evidence} />
          </div>
          <div className="rounded-lg border border-black/10 bg-bone p-4">
            <p className="text-xs font-bold uppercase text-ink/50">Coordonnees</p>
            <p className="mt-2 font-semibold text-ink">
              {site.coordinates.lat.toFixed(3)}, {site.coordinates.lng.toFixed(3)}
            </p>
          </div>
          <PreciseSiteMap site={site} />
          {relatedPath ? (
            <Link
              className="inline-flex w-fit items-center gap-2 rounded-md bg-lagoon px-4 py-3 text-sm font-bold text-paper"
              to={relatedPath}
              onClick={onClose}
            >
              Ouvrir la fiche liee
              <ExternalLink className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </article>
    </div>
  );
}

function PreciseSiteMap({ site }: { site: MapSite }) {
  const color = kindColors[site.kind];
  const zoom = site.kind === 'laboratory' || site.kind === 'museum' ? 11 : 8;

  return (
    <section className="overflow-hidden rounded-lg border border-black/10 bg-bone">
      <div className="border-b border-black/10 bg-paper px-4 py-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5" style={{ color }} aria-hidden="true" />
          <div>
            <h4 className="font-bold">Carte de localisation precise</h4>
            <p className="text-sm text-ink/65">{site.region}</p>
          </div>
        </div>
      </div>
      <div className="h-72 w-full bg-[#d9e8e6]">
        <MapContainer
          key={site.id}
          center={[site.coordinates.lat, site.coordinates.lng]}
          zoom={zoom}
          minZoom={2}
          maxZoom={15}
          className="h-full w-full"
          scrollWheelZoom={false}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />
          <CircleMarker
            center={[site.coordinates.lat, site.coordinates.lng]}
            radius={10}
            pathOptions={{
              color,
              fillColor: site.kind === 'museum' ? '#f7f4ed' : '#c9835a',
              fillOpacity: 0.95,
              weight: 4
            }}
          >
            <Popup>
              <div className="max-w-64">
                <p className="text-xs font-bold uppercase text-ochre">{kindLabels[site.kind]}</p>
                <strong className="mt-1 block text-base text-ink">{site.name}</strong>
                <p className="mt-1 text-sm font-semibold text-lagoon">{site.region}</p>
                <p className="mt-2 font-mono text-xs text-ink/60">
                  {site.coordinates.lat.toFixed(5)}, {site.coordinates.lng.toFixed(5)}
                </p>
              </div>
            </Popup>
          </CircleMarker>
        </MapContainer>
      </div>
    </section>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-black/10 bg-bone p-4">
      <p className="text-xs font-bold uppercase text-ink/50">{label}</p>
      <p className="mt-2 text-sm leading-6 text-ink/75">{value}</p>
    </div>
  );
}

function getRelatedPath(site: MapSite): string | null {
  if (!site.relatedEntityId) {
    return null;
  }

  if (['homo-sapiens', 'homo-neanderthalensis', 'denisovans'].includes(site.relatedEntityId)) {
    return `/species/${site.relatedEntityId}`;
  }

  return null;
}
