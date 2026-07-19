import 'leaflet/dist/leaflet.css';
import { CircleMarker, MapContainer, Popup } from 'react-leaflet';
import { mapSites } from '../services/content';

export function WorldMap() {
  return (
    <div className="h-[360px] overflow-hidden rounded-lg border border-black/10 bg-[#d9e8e6]">
      <MapContainer center={[30, 18]} zoom={2} minZoom={2} className="h-full w-full" scrollWheelZoom={false}>
        {mapSites.map((site) => (
          <CircleMarker
            key={site.id}
            center={[site.coordinates.lat, site.coordinates.lng]}
            radius={8}
            pathOptions={{ color: '#0f6f73', fillColor: '#d9894f', fillOpacity: 0.85, weight: 2 }}
          >
            <Popup>
              <strong>{site.name}</strong>
              <br />
              {site.summary}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
