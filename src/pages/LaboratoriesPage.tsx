import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  ExternalLink,
  FlaskConical,
  MapPin,
  Microscope,
  Users,
  X
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { laboratories } from '../services/content';
import type { LaboratoryProfile } from '../types/domain';

const palette = ['#0f6f73', '#c3542f', '#48635b', '#7b4d2a', '#24312f'];

function isExternalUrl(value: string) {
  return value.startsWith('http://') || value.startsWith('https://');
}

function getMapPoint(laboratory: LaboratoryProfile) {
  const x = ((laboratory.coordinates.lng + 180) / 360) * 100;
  const y = ((90 - laboratory.coordinates.lat) / 180) * 100;
  return { x, y };
}

function LaboratoryMap({ laboratory }: { laboratory: LaboratoryProfile }) {
  const point = getMapPoint(laboratory);

  return (
    <div className="overflow-hidden rounded-lg border border-black/10 bg-[#eef2df]">
      <svg viewBox="0 0 360 190" role="img" aria-label={`Localisation de ${laboratory.name}`} className="h-44 w-full">
        <rect width="360" height="190" fill="#dcead8" />
        <path
          d="M32 62c24-28 68-29 91-10 16 13 10 31 30 38 16 6 31-2 45 9 16 13 8 35-9 42-35 13-71 0-93-19-21-18-48-19-67-6-18 12-34 4-27-15 5-13 18-21 30-39Z"
          fill="#f4e6c6"
        />
        <path
          d="M190 44c28-18 66-16 91-2 25 14 32 35 18 51-13 14-42 4-52 20-9 14 15 30 2 43-14 14-57 5-75-15-18-19-2-37-14-54-9-13 10-30 30-43Z"
          fill="#f4e6c6"
        />
        <g transform={`translate(${(point.x / 100) * 360} ${(point.y / 100) * 190})`}>
          <circle r="9" fill="#c3542f" opacity="0.24" />
          <circle r="4" fill="#c3542f" />
        </g>
      </svg>
      <div className="border-t border-black/10 bg-white px-4 py-3 text-sm text-ink/70">
        <p className="font-semibold text-ink">
          {laboratory.city}, {laboratory.country}
        </p>
        <p>
          {laboratory.coordinates.lat.toFixed(2)}, {laboratory.coordinates.lng.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

function PublicationList({ laboratory }: { laboratory: LaboratoryProfile }) {
  return (
    <div className="grid gap-3">
      {laboratory.publications.map((publication) => {
        const body = (
          <>
            <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-lagoon" aria-hidden="true" />
            <span className="min-w-0">
              <span className="block font-semibold text-ink">{publication.label}</span>
              <span className="mt-1 flex items-center gap-1 text-ink/60">
                {publication.year}
                {isExternalUrl(publication.source) ? <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /> : null}
              </span>
            </span>
          </>
        );

        if (isExternalUrl(publication.source)) {
          return (
            <a
              key={`${laboratory.id}-${publication.label}`}
              href={publication.source}
              target="_blank"
              rel="noreferrer"
              className="flex gap-3 rounded-lg border border-black/10 bg-white p-3 text-sm transition hover:border-lagoon/40 hover:bg-lagoon/5"
            >
              {body}
            </a>
          );
        }

        return (
          <div key={`${laboratory.id}-${publication.label}`} className="flex gap-3 rounded-lg border border-black/10 bg-white p-3 text-sm">
            {body}
          </div>
        );
      })}
    </div>
  );
}

function LaboratoryDialog({ laboratory, onClose }: { laboratory: LaboratoryProfile; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/70 p-4" role="dialog" aria-modal="true" aria-labelledby="lab-title">
      <article className="mx-auto max-w-6xl overflow-hidden rounded-lg bg-paper shadow-soft">
        <header className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-black/10 bg-paper p-4 sm:p-5">
          <div className="flex gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-lagoon text-sm font-bold text-paper">
              {laboratory.shortName.slice(0, 2).toUpperCase()}
            </span>
            <div>
              <p className="text-xs font-bold uppercase text-ochre">{laboratory.period}</p>
              <h2 id="lab-title" className="mt-1 text-2xl font-bold">
                {laboratory.name}
              </h2>
              <p className="mt-1 text-sm font-semibold text-lagoon">
                {laboratory.city}, {laboratory.country}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-black/10 bg-white text-ink"
            onClick={onClose}
            aria-label="Fermer la fiche laboratoire"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[0.92fr_1.08fr]">
          <aside className="grid content-start gap-5">
            <div className="rounded-lg border border-black/10 bg-white p-5">
              <div className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-lagoon" aria-hidden="true" />
                <h3 className="text-lg font-bold">Specialite</h3>
              </div>
              <p className="mt-3 leading-7 text-ink/75">{laboratory.specialty}</p>
            </div>
            <LaboratoryMap laboratory={laboratory} />
            <a
              href={laboratory.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-lagoon px-4 py-3 text-sm font-bold text-paper"
            >
              Site officiel
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </aside>

          <div className="grid gap-5">
            <section className="rounded-lg border border-black/10 bg-white p-5">
              <h3 className="text-lg font-bold">Presentation de l'equipe</h3>
              <p className="mt-3 leading-7 text-ink/75">{laboratory.summary}</p>
              <p className="mt-3 leading-7 text-ink/75">{laboratory.teamModel}</p>
            </section>

            <section>
              <div className="mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-lagoon" aria-hidden="true" />
                <h3 className="text-lg font-bold">Chercheurs et roles</h3>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {laboratory.researchers.map((researcher) => (
                  <div key={researcher.name} className="rounded-lg border border-black/10 bg-white p-4">
                    <h4 className="font-bold">{researcher.name}</h4>
                    <p className="mt-1 text-sm font-semibold text-ochre">{researcher.role}</p>
                    <p className="mt-2 text-sm leading-6 text-ink/70">{researcher.contribution}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-3 flex items-center gap-2">
                <Microscope className="h-5 w-5 text-lagoon" aria-hidden="true" />
                <h3 className="text-lg font-bold">Decouvertes associees</h3>
              </div>
              <div className="grid gap-3">
                {laboratory.discoveries.map((discovery) => (
                  <div key={discovery.title} className="rounded-lg border border-black/10 bg-white p-4">
                    <p className="text-sm font-bold text-ochre">{discovery.year}</p>
                    <h4 className="mt-1 font-bold">{discovery.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-ink/70">{discovery.explanation}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-lagoon" aria-hidden="true" />
                <h3 className="text-lg font-bold">Publications</h3>
              </div>
              <PublicationList laboratory={laboratory} />
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}

export function LaboratoriesPage() {
  const [selectedId, setSelectedId] = useState('');
  const selectedLaboratory = useMemo(() => laboratories.find((laboratory) => laboratory.id === selectedId), [selectedId]);
  const stats = [
    { label: 'laboratoires', value: laboratories.length },
    { label: 'chercheurs cites', value: laboratories.reduce((total, laboratory) => total + laboratory.researchers.length, 0) },
    { label: 'publications', value: laboratories.reduce((total, laboratory) => total + laboratory.publications.length, 0) }
  ];

  return (
    <>
      <PageHeader
        eyebrow="Equipes"
        title="Laboratoires celebres"
        description="Institutions, chercheurs, decouvertes et publications qui structurent l'histoire de la paleogenomique."
      />

      <section className="mb-5 grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-black/10 bg-paper p-4 shadow-soft">
            <p className="text-3xl font-bold text-lagoon">{stat.value}</p>
            <p className="mt-1 text-sm font-semibold text-ink/65">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {laboratories.map((laboratory, index) => (
          <button
            key={laboratory.id}
            type="button"
            onClick={() => setSelectedId(laboratory.id)}
            className="group overflow-hidden rounded-lg border border-black/10 bg-paper text-left shadow-soft transition hover:-translate-y-0.5 hover:border-lagoon/40 focus:outline-none focus:ring-2 focus:ring-lagoon/45"
          >
            <div className="h-28 p-4 text-paper" style={{ backgroundColor: palette[index % palette.length] }}>
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-white/15 text-sm font-bold">
                  {laboratory.shortName.slice(0, 2).toUpperCase()}
                </span>
                <Building2 className="h-6 w-6 opacity-80" aria-hidden="true" />
              </div>
              <p className="mt-4 text-sm font-bold">{laboratory.shortName}</p>
            </div>
            <div className="p-4">
              <p className="flex items-center gap-2 text-xs font-bold uppercase text-ochre">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {laboratory.city}
              </p>
              <h2 className="mt-2 text-lg font-bold leading-6">{laboratory.name}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/70">{laboratory.specialty}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-lagoon">
                Voir l'equipe
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </p>
            </div>
          </button>
        ))}
      </section>

      <section className="mt-6 rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-lagoon" aria-hidden="true" />
          <h2 className="text-xl font-bold">Ce que ces laboratoires ont change</h2>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {laboratories.map((laboratory) => (
            <div key={`${laboratory.id}-impact`} className="rounded-lg border border-black/10 bg-white p-4">
              <p className="text-sm font-bold text-ochre">{laboratory.shortName}</p>
              <p className="mt-2 text-sm leading-6 text-ink/70">{laboratory.discoveries[0]?.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {selectedLaboratory ? <LaboratoryDialog laboratory={selectedLaboratory} onClose={() => setSelectedId('')} /> : null}
    </>
  );
}
