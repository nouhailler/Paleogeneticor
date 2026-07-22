import 'leaflet/dist/leaflet.css';
import { CircleMarker, MapContainer, Polyline, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { Dna, ExternalLink, GitBranch, MapPin, Network, Route } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { migrations } from '../services/content';
import type { MigrationPopulation, MigrationRoute, MigrationSite } from '../types/domain';

type PopulationFilter = 'all' | MigrationPopulation;

const populationLabels: Record<PopulationFilter, string> = {
  all: 'Toutes les couches',
  sapiens: 'Homo sapiens',
  neanderthal: 'Neandertal',
  denisovan: 'Denisoviens'
};

const populationColors: Record<MigrationPopulation | 'shared', string> = {
  sapiens: '#c3542f',
  neanderthal: '#0f6f73',
  denisovan: '#7b4d2a',
  shared: '#182323'
};

const populationSummaries = [
  {
    id: 'sapiens' as const,
    title: 'Homo sapiens',
    text: "Sorties d'Afrique, passage par le Levant, expansion vers l'Eurasie, l'Europe et Sahul."
  },
  {
    id: 'neanderthal' as const,
    title: 'Neandertal',
    text: "Occupation longue de l'Europe et de l'Asie occidentale, avec contacts genetiques avec Sapiens et Denisova."
  },
  {
    id: 'denisovan' as const,
    title: 'Denisoviens',
    text: "Carte surtout genetique: peu de fossiles directs, mais des traces fortes en Asie et en Oceanie."
  }
];

function shouldShowSite(site: MigrationSite, filter: PopulationFilter) {
  return filter === 'all' || site.population === filter || site.population === 'shared';
}

function shouldShowRoute(route: MigrationRoute, filter: PopulationFilter) {
  return filter === 'all' || route.population === filter;
}

export function MigrationsPage() {
  useDocumentTitle('Carte des migrations humaines');
  const [filter, setFilter] = useState<PopulationFilter>('all');
  const [selectedRouteId, setSelectedRouteId] = useState(migrations.routes[0]?.id ?? '');
  const [selectedSiteId, setSelectedSiteId] = useState(migrations.sites[0]?.id ?? '');

  const visibleRoutes = useMemo(() => migrations.routes.filter((route) => shouldShowRoute(route, filter)), [filter]);
  const visibleSites = useMemo(() => migrations.sites.filter((site) => shouldShowSite(site, filter)), [filter]);
  const selectedRoute = migrations.routes.find((route) => route.id === selectedRouteId) ?? visibleRoutes[0];
  const selectedSite = migrations.sites.find((site) => site.id === selectedSiteId) ?? visibleSites[0];

  return (
    <>
      <PageHeader
        eyebrow="Atlas"
        title="Carte des migrations humaines"
        description="Deplacements de Homo sapiens, Neandertal et Denisoviens, avec sites archeologiques majeurs cliquables."
      />

      <section className="mb-5 grid gap-4 rounded-lg border border-black/10 bg-paper p-5 shadow-soft lg:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5 text-lagoon" aria-hidden="true" />
            <h2 className="text-2xl font-bold">Lire les routes comme des hypotheses</h2>
          </div>
          <p className="mt-3 max-w-4xl leading-7 text-ink/75">
            Les traits representent des corridors et aires de contact simplifiees, pas des chemins uniques. Les marqueurs
            correspondent a des sites ou regions qui documentent fossiles, genomes anciens, introgressions ou presence
            archeologique.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[380px]">
          {Object.entries(populationLabels).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`rounded-md px-3 py-2 text-sm font-bold transition ${
                filter === key ? 'bg-lagoon text-paper' : 'border border-black/10 bg-white text-ink/75 hover:bg-lagoon/10'
              }`}
              onClick={() => setFilter(key as PopulationFilter)}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="overflow-hidden rounded-lg border border-black/10 bg-paper shadow-soft">
          <div className="border-b border-black/10 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase text-ochre">Carte interactive</p>
                <h2 className="mt-1 text-xl font-bold">Routes et sites majeurs</h2>
              </div>
              <MapLegend />
            </div>
          </div>
          <div className="h-[620px] bg-[#d9e8e6]">
            <MapContainer
              center={[28, 45]}
              zoom={2}
              minZoom={2}
              maxZoom={8}
              className="h-full w-full"
              scrollWheelZoom={false}
              zoomControl={false}
              worldCopyJump
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ZoomControl position="bottomright" />

              {visibleRoutes.map((route) => (
                <Polyline
                  key={route.id}
                  positions={route.path.map((point) => [point.lat, point.lng])}
                  pathOptions={{
                    color: populationColors[route.population],
                    weight: selectedRoute?.id === route.id ? 6 : 4,
                    opacity: selectedRoute?.id === route.id ? 0.95 : 0.62,
                    dashArray: route.population === 'sapiens' ? undefined : '8 8'
                  }}
                  eventHandlers={{
                    click: () => setSelectedRouteId(route.id)
                  }}
                >
                  <Popup>
                    <RoutePopup route={route} />
                  </Popup>
                </Polyline>
              ))}

              {visibleSites.map((site) => (
                <CircleMarker
                  key={site.id}
                  center={[site.coordinates.lat, site.coordinates.lng]}
                  radius={selectedSite?.id === site.id ? 11 : 8}
                  pathOptions={{
                    color: populationColors[site.population],
                    fillColor: site.population === 'shared' ? '#f7f4ed' : populationColors[site.population],
                    fillOpacity: site.population === 'shared' ? 0.95 : 0.82,
                    weight: selectedSite?.id === site.id ? 4 : 3
                  }}
                  eventHandlers={{
                    click: () => setSelectedSiteId(site.id)
                  }}
                >
                  <Popup>
                    <SitePopup site={site} />
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </div>

        <aside className="grid min-w-0 content-start gap-4">
          <RoutePanel route={selectedRoute} />
          <SitePanel site={selectedSite} />
        </aside>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {populationSummaries.map((item) => (
          <article key={item.id} className="rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: populationColors[item.id] }} />
              <h2 className="font-bold">{item.title}</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-ink/70">{item.text}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function MapLegend() {
  return (
    <div className="flex flex-wrap gap-2 text-xs font-semibold">
      <LegendItem color={populationColors.sapiens} label="Sapiens" />
      <LegendItem color={populationColors.neanderthal} label="Neandertal" />
      <LegendItem color={populationColors.denisovan} label="Denisoviens" />
      <LegendItem color={populationColors.shared} label="Zone partagee" />
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md bg-bone px-2 py-1 text-ink/70">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

function RoutePopup({ route }: { route: MigrationRoute }) {
  return (
    <div className="max-w-64">
      <p className="text-xs font-bold uppercase text-ochre">{populationLabels[route.population]}</p>
      <strong className="mt-1 block text-base text-ink">{route.title}</strong>
      <p className="mt-1 text-xs font-semibold text-ink/55">{route.period}</p>
      <p className="mt-2 leading-6 text-ink/75">{route.summary}</p>
    </div>
  );
}

function SitePopup({ site }: { site: MigrationSite }) {
  return (
    <div className="max-w-64">
      <p className="text-xs font-bold uppercase text-ochre">
        {site.population === 'shared' ? 'Zone de contacts' : populationLabels[site.population]}
      </p>
      <strong className="mt-1 block text-base text-ink">{site.name}</strong>
      <p className="mt-1 text-sm font-semibold text-lagoon">{site.region}</p>
      <p className="mt-1 text-xs font-semibold text-ink/55">{site.period}</p>
      <p className="mt-2 leading-6 text-ink/75">{site.summary}</p>
      {site.relatedPath ? (
        <Link className="mt-3 inline-block font-bold text-lagoon" to={site.relatedPath}>
          Ouvrir la fiche liee
        </Link>
      ) : null}
    </div>
  );
}

function RoutePanel({ route }: { route?: MigrationRoute }) {
  if (!route) {
    return null;
  }

  return (
    <section className="rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <Route className="h-5 w-5" style={{ color: populationColors[route.population] }} aria-hidden="true" />
        <p className="text-sm font-bold uppercase text-ochre">Route selectionnee</p>
      </div>
      <h2 className="mt-2 text-xl font-bold">{route.title}</h2>
      <p className="mt-1 text-sm font-semibold text-lagoon">{route.period}</p>
      <p className="mt-3 leading-7 text-ink/75">{route.explanation}</p>
      <div className="mt-4 rounded-lg border border-black/10 bg-bone p-4">
        <p className="text-xs font-bold uppercase text-ink/50">Indices mobilises</p>
        <ul className="mt-2 grid gap-2 text-sm leading-6 text-ink/70">
          {route.evidence.map((item) => (
            <li key={item} className="flex gap-2">
              <GitBranch className="mt-0.5 h-4 w-4 shrink-0 text-lagoon" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SitePanel({ site }: { site?: MigrationSite }) {
  if (!site) {
    return null;
  }

  return (
    <section className="rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5" style={{ color: populationColors[site.population] }} aria-hidden="true" />
        <p className="text-sm font-bold uppercase text-ochre">Site selectionne</p>
      </div>
      <h2 className="mt-2 text-xl font-bold">{site.name}</h2>
      <p className="mt-1 text-sm font-semibold text-lagoon">{site.region}</p>
      <p className="mt-1 text-xs font-bold uppercase text-ink/50">{site.period}</p>
      <p className="mt-3 leading-7 text-ink/75">{site.summary}</p>
      <div className="mt-4 grid gap-2 text-sm leading-6 text-ink/70">
        {site.details.map((detail) => (
          <p key={detail}>{detail}</p>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-black/10 bg-bone p-4">
        <div className="flex items-center gap-2">
          <Dna className="h-4 w-4 text-lagoon" aria-hidden="true" />
          <p className="text-xs font-bold uppercase text-ink/50">Importance</p>
        </div>
        <p className="mt-2 text-sm leading-6 text-ink/75">{site.importance}</p>
      </div>
      {site.relatedPath ? (
        <Link
          to={site.relatedPath}
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-lagoon px-4 py-3 text-sm font-bold text-paper"
        >
          Ouvrir la fiche liee
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}
      <p className="mt-4 font-mono text-xs text-ink/55">
        {site.coordinates.lat.toFixed(4)}, {site.coordinates.lng.toFixed(4)}
      </p>
    </section>
  );
}
