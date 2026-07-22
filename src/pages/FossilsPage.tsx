import { BookOpen, CalendarDays, Camera, ExternalLink, Landmark, MapPin, Microscope, ScanLine, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { fossils, getSpeciesById } from '../services/content';
import type { Fossil } from '../types/domain';

function isExternalUrl(value: string) {
  return value.startsWith('http://') || value.startsWith('https://');
}

const fossilStats = [
  { label: 'fiches documentaires', value: fossils.length },
  { label: 'regions couvertes', value: new Set(fossils.map((fossil) => fossil.location.split(',').at(-1)?.trim())).size },
  { label: 'references citees', value: fossils.reduce((total, fossil) => total + fossil.publications.length, 0) }
];

function getMapPoint(fossil: Fossil) {
  const x = ((fossil.coordinates.lng + 180) / 360) * 100;
  const y = ((90 - fossil.coordinates.lat) / 180) * 100;
  return { x, y };
}

function FossilMap({ fossil }: { fossil: Fossil }) {
  const point = getMapPoint(fossil);

  return (
    <div className="overflow-hidden rounded-lg border border-black/10 bg-[#eef2df]">
      <svg viewBox="0 0 360 190" role="img" aria-label={`Localisation de ${fossil.name}`} className="h-48 w-full">
        <rect width="360" height="190" fill="#dcead8" />
        <path
          d="M32 62c24-28 68-29 91-10 16 13 10 31 30 38 16 6 31-2 45 9 16 13 8 35-9 42-35 13-71 0-93-19-21-18-48-19-67-6-18 12-34 4-27-15 5-13 18-21 30-39Z"
          fill="#f4e6c6"
          opacity="0.92"
        />
        <path
          d="M190 44c28-18 66-16 91-2 25 14 32 35 18 51-13 14-42 4-52 20-9 14 15 30 2 43-14 14-57 5-75-15-18-19-2-37-14-54-9-13 10-30 30-43Z"
          fill="#f4e6c6"
          opacity="0.92"
        />
        <path
          d="M72 132c23-4 44 10 45 27 1 13-17 21-35 16-20-6-33-20-27-31 3-6 9-10 17-12Z"
          fill="#f4e6c6"
          opacity="0.92"
        />
        <path
          d="M270 126c18-8 39-2 43 12 4 15-14 26-32 21-15-4-25-13-24-22 1-5 5-9 13-11Z"
          fill="#f4e6c6"
          opacity="0.92"
        />
        <g transform={`translate(${(point.x / 100) * 360} ${(point.y / 100) * 190})`}>
          <circle r="9" fill="#c3542f" opacity="0.24" />
          <circle r="4" fill="#c3542f" />
        </g>
      </svg>
      <div className="border-t border-black/10 bg-white px-4 py-3 text-sm text-ink/70">
        <p className="font-semibold text-ink">{fossil.location}</p>
        <p>
          {fossil.coordinates.lat.toFixed(2)}, {fossil.coordinates.lng.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

function PublicationList({ fossil }: { fossil: Fossil }) {
  return (
    <div className="space-y-3">
      {fossil.publications.map((publication) => {
        const content = (
          <>
            <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-lagoon" aria-hidden="true" />
            <span className="min-w-0">
              <span className="block font-semibold text-ink">{publication.label}</span>
              <span className="mt-1 flex items-center gap-1 text-ink/60">
                {publication.source}, {publication.year}
                {isExternalUrl(publication.source) ? <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /> : null}
              </span>
            </span>
          </>
        );

        if (isExternalUrl(publication.source)) {
          return (
            <a
              key={`${fossil.id}-${publication.label}`}
              href={publication.source}
              target="_blank"
              rel="noreferrer"
              className="flex gap-3 rounded-lg border border-black/10 bg-white p-3 text-sm transition hover:border-lagoon/40 hover:bg-lagoon/5"
            >
              {content}
            </a>
          );
        }

        return (
          <div key={`${fossil.id}-${publication.label}`} className="flex gap-3 rounded-lg border border-black/10 bg-white p-3 text-sm">
            {content}
          </div>
        );
      })}
    </div>
  );
}

function FossilDetail({ fossil, onClose }: { fossil: Fossil; onClose: () => void }) {
  const species = getSpeciesById(fossil.speciesId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/45 px-3 py-4 backdrop-blur-sm sm:px-6" role="dialog" aria-modal="true">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-lg bg-paper shadow-soft">
        <div className="flex items-center justify-between gap-3 border-b border-black/10 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ochre">{fossil.period}</p>
            <h2 className="truncate text-2xl font-bold text-ink">{fossil.name}</h2>
          </div>
          <button
            type="button"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-black/10 bg-white text-lagoon"
            onClick={onClose}
            aria-label="Fermer la fiche"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="bg-white">
            <img src={fossil.image} alt={fossil.name} className="h-72 w-full object-cover sm:h-[420px]" />
            <div className="space-y-3 border-t border-black/10 p-4 sm:p-6">
              <a
                href={fossil.imageSource}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-lagoon hover:underline"
              >
                <Camera className="h-4 w-4" aria-hidden="true" />
                {fossil.imageCredit}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <FossilMap fossil={fossil} />
            </div>
          </div>

          <div className="space-y-6 p-4 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-black/10 bg-white p-3">
                <CalendarDays className="h-5 w-5 text-lagoon" aria-hidden="true" />
                <p className="mt-2 text-xs font-semibold uppercase text-ink/50">Decouverte</p>
                <p className="text-lg font-bold">{fossil.discoveredYear}</p>
              </div>
              <div className="rounded-lg border border-black/10 bg-white p-3">
                <Landmark className="h-5 w-5 text-lagoon" aria-hidden="true" />
                <p className="mt-2 text-xs font-semibold uppercase text-ink/50">Conservation</p>
                <p className="text-sm font-bold leading-5">{fossil.museum}</p>
              </div>
              <div className="rounded-lg border border-black/10 bg-white p-3">
                <MapPin className="h-5 w-5 text-lagoon" aria-hidden="true" />
                <p className="mt-2 text-xs font-semibold uppercase text-ink/50">Site</p>
                <p className="text-sm font-bold leading-5">{fossil.location}</p>
              </div>
            </div>

            <section>
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <Microscope className="h-5 w-5 text-lagoon" aria-hidden="true" />
                Importance scientifique
              </h3>
              <p className="mt-3 leading-7 text-ink/76">{fossil.importance}</p>
              {species ? (
                <Link
                  to={`/species/${species.id}`}
                  className="mt-3 inline-flex items-center gap-2 rounded-md border border-lagoon/25 bg-lagoon/10 px-3 py-2 text-sm font-semibold text-lagoon"
                >
                  Voir la fiche espece : {species.name}
                </Link>
              ) : null}
            </section>

            <section>
              <h3 className="text-lg font-bold">Histoire de la decouverte</h3>
              <div className="mt-3 space-y-3">
                {fossil.discoveryStory.map((paragraph) => (
                  <p key={paragraph} className="leading-7 text-ink/76">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <ScanLine className="h-5 w-5 text-lagoon" aria-hidden="true" />
                Scanner 3D et numerisation
              </h3>
              <p className="mt-3 leading-7 text-ink/76">{fossil.scan3d}</p>
            </section>

            <section>
              <h3 className="text-lg font-bold">Ce que le fossile documente</h3>
              <ul className="mt-3 grid gap-2">
                {fossil.scientificDetails.map((detail) => (
                  <li key={detail} className="rounded-lg border border-black/10 bg-white p-3 leading-6 text-ink/76">
                    {detail}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold">Publications</h3>
              <div className="mt-3">
                <PublicationList fossil={fossil} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FossilsPage() {
  const [selectedId, setSelectedId] = useState('');
  const selectedFossil = useMemo(() => fossils.find((fossil) => fossil.id === selectedId), [selectedId]);

  return (
    <>
      <PageHeader
        eyebrow="Collections"
        title="Fossiles celebres"
        description="Une base documentaire illustree: photos, localisation, scanner 3D, histoire de la decouverte, importance scientifique et publications."
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        {fossilStats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-black/10 bg-paper p-4 shadow-soft">
            <p className="text-3xl font-bold text-lagoon">{stat.value}</p>
            <p className="mt-1 text-sm font-semibold text-ink/65">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {fossils.map((fossil) => (
          <button
            key={fossil.id}
            type="button"
            onClick={() => setSelectedId(fossil.id)}
            className="group overflow-hidden rounded-lg border border-black/10 bg-paper text-left shadow-soft transition hover:-translate-y-0.5 hover:border-lagoon/40 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-lagoon/45"
          >
            <div className="relative h-44 overflow-hidden bg-white">
              <img
                src={fossil.image}
                alt={fossil.name}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute left-3 top-3 rounded-md bg-paper/95 px-2 py-1 text-xs font-bold text-ink shadow-soft">
                {fossil.discoveredYear}
              </span>
            </div>
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ochre">{fossil.period}</p>
              <h2 className="mt-2 text-xl font-bold">{fossil.name}</h2>
              <p className="mt-2 flex items-start gap-2 text-sm font-semibold text-ink/65">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lagoon" aria-hidden="true" />
                {fossil.location}
              </p>
              <p className="mt-3 line-clamp-4 text-sm leading-6 text-ink/72">{fossil.importance}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-lagoon">
                Ouvrir la fiche
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </p>
            </div>
          </button>
        ))}
      </div>

      {selectedFossil ? <FossilDetail fossil={selectedFossil} onClose={() => setSelectedId('')} /> : null}
    </>
  );
}
