import 'leaflet/dist/leaflet.css';
import { CircleMarker, MapContainer, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { mapSites } from '../services/content';
import type { MapSite } from '../types/domain';

const kindLabels: Record<MapSite['kind'], string> = {
  site: 'Site archeologique',
  museum: 'Musee',
  laboratory: 'Laboratoire'
};

const kindColors: Record<MapSite['kind'], { stroke: string; fill: string }> = {
  site: { stroke: '#0f6f73', fill: '#c9835a' },
  museum: { stroke: '#182323', fill: '#f7f4ed' },
  laboratory: { stroke: '#48635b', fill: '#0f6f73' }
};

export function WorldMap() {
  return (
    <section className="overflow-hidden rounded-lg border border-black/10 bg-paper shadow-soft">
      <div className="grid gap-4 border-b border-black/10 p-5 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm font-semibold uppercase text-ochre">Atlas paleogenetique</p>
          <h2 className="mt-1 text-2xl font-bold">Carte des sites et laboratoires</h2>
          <p className="mt-2 max-w-3xl leading-7 text-ink/70">
            Explorer les lieux qui structurent l'histoire des fossiles humains, des genomes anciens et des methodes de
            laboratoire.
          </p>
        </div>
        <MapLegend />
      </div>

      <div className="h-[460px] bg-[#d9e8e6]">
        <MapContainer
          center={[35, 30]}
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
          {mapSites.map((site) => {
            const colors = kindColors[site.kind];
            return (
              <CircleMarker
                key={site.id}
                center={[site.coordinates.lat, site.coordinates.lng]}
                radius={site.kind === 'site' ? 8 : 7}
                pathOptions={{
                  color: colors.stroke,
                  fillColor: colors.fill,
                  fillOpacity: 0.9,
                  weight: 3
                }}
              >
                <Popup>
                  <div className="max-w-64">
                    <p className="text-xs font-bold uppercase text-ochre">{kindLabels[site.kind]}</p>
                    <strong className="mt-1 block text-base text-ink">{site.name}</strong>
                    <p className="mt-1 text-sm font-semibold text-lagoon">{site.region}</p>
                    <p className="text-xs font-semibold text-ink/55">{site.period}</p>
                    <p className="mt-2 leading-6 text-ink/75">{site.summary}</p>
                    {getRelatedPath(site) ? (
                      <Link className="mt-3 inline-block font-bold text-lagoon" to={getRelatedPath(site) ?? '/'}>
                        Ouvrir la fiche
                      </Link>
                    ) : null}
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </section>
  );
}

function MapLegend() {
  return (
    <div className="grid content-start gap-2 rounded-lg bg-bone p-3 text-sm sm:min-w-52">
      {Object.entries(kindLabels).map(([kind, label]) => {
        const colors = kindColors[kind as MapSite['kind']];
        return (
          <div key={kind} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full border-2"
              style={{ borderColor: colors.stroke, backgroundColor: colors.fill }}
            />
            <span className="font-medium text-ink/75">{label}</span>
          </div>
        );
      })}
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
