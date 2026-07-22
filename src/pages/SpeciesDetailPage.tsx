import { useState } from 'react';
import {
  BookOpen,
  Brain,
  CalendarDays,
  Dna,
  Flame,
  Hammer,
  Info,
  Map,
  MapPinned,
  Palette,
  Ruler,
  Scale,
  Star,
  Utensils,
  X
} from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { getSpeciesById } from '../services/content';
import { useLibraryStore } from '../store/libraryStore';
import type { Species, SpeciesDetailedSection, SpeciesSectionMedia } from '../types/domain';

type SectionKey = keyof Species['detailedSections'];

interface ActiveDetail {
  sectionKey: SectionKey;
  topicIndex: number;
}

const sectionMeta: Record<
  SectionKey,
  {
    title: string;
    icon: typeof Dna;
    tone: string;
  }
> = {
  genetics: {
    title: 'ADN et parentes',
    icon: Dna,
    tone: '#0f6f73'
  },
  culture: {
    title: 'Culture',
    icon: Palette,
    tone: '#b65f25'
  },
  landmarks: {
    title: 'Reperes',
    icon: MapPinned,
    tone: '#48635b'
  },
  tools: {
    title: 'Outils',
    icon: Hammer,
    tone: '#7b4b2a'
  }
};

const sectionOrder: SectionKey[] = ['genetics', 'culture', 'landmarks', 'tools'];

export function SpeciesDetailPage() {
  const { id } = useParams();
  const item = id ? getSpeciesById(id) : undefined;
  const favorites = useLibraryStore((state) => state.favorites);
  const toggleFavorite = useLibraryStore((state) => state.toggleFavorite);
  const [activeDetail, setActiveDetail] = useState<ActiveDetail | null>(null);

  if (!item) {
    return <Navigate to="/species" replace />;
  }

  const favoriteId = `species:${item.id}`;
  const isFavorite = favorites.some((favorite) => favorite.id === favoriteId);
  const activeTopic = activeDetail
    ? item.detailedSections[activeDetail.sectionKey].topics[activeDetail.topicIndex]
    : null;
  const activeMeta = activeDetail ? sectionMeta[activeDetail.sectionKey] : null;
  const activeMedia = activeDetail ? item.detailedSections[activeDetail.sectionKey].media : null;

  return (
    <>
      <PageHeader eyebrow="Fiche espece" title={item.name} description={item.summary} />
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-paper px-4 py-2 text-sm font-semibold text-ink"
          onClick={() => void toggleFavorite({ entityId: item.id, entityType: 'species', title: item.name })}
        >
          <Star className={`h-4 w-4 ${isFavorite ? 'fill-ochre text-ochre' : 'text-lagoon'}`} />
          {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        </button>
      </div>

      <section className="overflow-hidden rounded-lg border border-black/10 bg-ink text-paper shadow-soft">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <img
            src={item.image}
            alt={`Reconstitution illustree de ${item.name}`}
            className="h-full min-h-72 w-full object-cover"
          />
          <div className="grid content-between gap-8 p-6 sm:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-clay">{item.period}</p>
              <h2 className="mt-3 text-3xl font-bold italic sm:text-4xl">{item.name}</h2>
              <p className="mt-4 max-w-2xl leading-7 text-paper/75">{item.summary}</p>
            </div>
            <TimelineSketch species={item} />
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <IdentityPanel species={item} />
        <RangePanel species={item} />
      </section>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        {sectionOrder.map((sectionKey) => (
          <IllustratedSection
            key={sectionKey}
            sectionKey={sectionKey}
            section={item.detailedSections[sectionKey]}
            onOpen={(topicIndex) => setActiveDetail({ sectionKey, topicIndex })}
          />
        ))}
      </div>

      <section className="mt-6 rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-lagoon" />
          <h2 className="text-xl font-bold">Sources principales</h2>
        </div>
        <ul className="mt-4 grid gap-2 text-sm text-ink/75 sm:grid-cols-2">
          {item.bibliography.map((entry) => (
            <li key={`${entry.label}-${entry.year}`}>
              <span className="font-semibold text-ink">{entry.label}</span>, {entry.source}, {entry.year}
            </li>
          ))}
        </ul>
      </section>

      {activeTopic && activeMeta && activeMedia ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="species-detail-title"
        >
          <div className="max-h-[88vh] w-full max-w-3xl overflow-auto rounded-lg bg-paper shadow-soft">
            <div className="sticky top-0 flex items-center justify-between gap-3 border-b border-black/10 bg-paper p-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md" style={{ backgroundColor: `${activeMeta.tone}18` }}>
                  <activeMeta.icon className="h-5 w-5" style={{ color: activeMeta.tone }} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase text-ink/55">{activeMeta.title}</p>
                  <h2 id="species-detail-title" className="text-xl font-bold">
                    {activeTopic.title}
                  </h2>
                </div>
              </div>
              <button
                className="grid h-10 w-10 place-items-center rounded-md border border-black/10 text-ink"
                onClick={() => setActiveDetail(null)}
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-5 p-5">
              <p className="text-lg leading-8 text-ink/80">{activeTopic.summary}</p>
              <MediaFigure media={activeMedia} color={activeMeta.tone} size="large" />
              <div className="grid gap-3">
                {activeTopic.details.map((detail) => (
                  <p key={detail} className="leading-7 text-ink/75">
                    {detail}
                  </p>
                ))}
              </div>
              <div className="rounded-lg border border-black/10 bg-bone p-4">
                <p className="text-xs font-semibold uppercase text-ink/50">Indice utilise</p>
                <p className="mt-1 font-medium text-ink">{activeTopic.evidence}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function IdentityPanel({ species }: { species: Species }) {
  const facts = [
    { label: 'Periode', value: species.period, icon: CalendarDays },
    { label: 'Taille', value: species.traits.height, icon: Ruler },
    { label: 'Poids', value: species.traits.weight, icon: Scale },
    { label: 'Capacite cranienne', value: species.traits.cranialCapacity, icon: Brain },
    { label: 'ADN recupere', value: species.traits.dnaRecovered, icon: Dna },
    { label: 'Alimentation', value: species.traits.diet, icon: Utensils },
    { label: 'Feu', value: species.traits.fire, icon: Flame },
    { label: 'Sepultures', value: species.traits.burials, icon: MapPinned }
  ];

  return (
    <section className="rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <Info className="h-5 w-5 text-lagoon" />
        <h2 className="text-2xl font-bold">Fiche d'identite scientifique</h2>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {facts.map((fact) => {
          const Icon = fact.icon;
          return (
            <div key={fact.label} className="rounded-lg border border-black/10 bg-white/60 p-4">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-lagoon" />
                <p className="text-xs font-bold uppercase text-ink/50">{fact.label}</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-ink/75">{fact.value}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-4 rounded-lg border border-black/10 bg-bone p-4">
        <p className="text-xs font-bold uppercase text-ink/50">Parente</p>
        <p className="mt-2 text-sm leading-6 text-ink/75">{species.traits.parentage}</p>
      </div>
      <div className="mt-4 rounded-lg border border-black/10 bg-bone p-4">
        <p className="text-xs font-bold uppercase text-ink/50">Hybridations ou rapprochements connus</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {species.hybridations.map((hybridation) => (
            <span key={hybridation} className="rounded-md bg-lagoon/10 px-3 py-1 text-sm font-semibold text-lagoon">
              {hybridation}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function RangePanel({ species }: { species: Species }) {
  return (
    <section className="rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <Map className="h-5 w-5 text-lagoon" />
        <h2 className="text-2xl font-bold">Carte et repartition</h2>
      </div>
      <p className="mt-3 leading-7 text-ink/75">{species.region}</p>
      <div className="mt-5 rounded-lg border border-black/10 bg-bone p-3">
        <RangeSketch species={species} />
      </div>
      <div className="mt-4 grid gap-2 text-sm">
        {species.coordinates.map((coordinate) => (
          <div key={`${coordinate.lat}-${coordinate.lng}`} className="flex items-center justify-between rounded-md bg-white/70 px-3 py-2">
            <span className="font-medium text-ink/75">Point de reference</span>
            <span className="font-mono text-ink/65">
              {coordinate.lat.toFixed(2)}, {coordinate.lng.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function IllustratedSection({
  sectionKey,
  section,
  onOpen
}: {
  sectionKey: SectionKey;
  section: SpeciesDetailedSection;
  onOpen: (topicIndex: number) => void;
}) {
  const meta = sectionMeta[sectionKey];
  const Icon = meta.icon;

  return (
    <section className="rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md" style={{ backgroundColor: `${meta.tone}16` }}>
          <Icon className="h-6 w-6" style={{ color: meta.tone }} />
        </span>
        <div>
          <h2 className="text-2xl font-bold">{meta.title}</h2>
          <p className="mt-2 leading-7 text-ink/75">{section.intro}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <MediaFigure media={section.media} color={meta.tone} />
        <div className="grid gap-4">
          <MetricBars metrics={section.metrics} color={meta.tone} />
          <ul className="grid gap-2">
            {section.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2 text-sm leading-6 text-ink/75">
                <Info className="mt-0.5 h-4 w-4 shrink-0" style={{ color: meta.tone }} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {section.topics.map((topic, topicIndex) => (
          <button
            key={topic.title}
            className="rounded-lg border border-black/10 bg-white/60 p-4 text-left transition hover:-translate-y-0.5 hover:border-lagoon/40"
            onClick={() => onOpen(topicIndex)}
          >
            <p className="text-sm font-bold text-ink">{topic.title}</p>
            <p className="mt-2 text-sm leading-6 text-ink/70">{topic.summary}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function TimelineSketch({ species }: { species: Species }) {
  const width = 100;
  const start = Math.min(species.rangeStartKya, 500);
  const end = species.rangeEndKya;
  const left = ((500 - start) / 500) * width;
  const right = ((500 - end) / 500) * width;

  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-paper/80">
        <CalendarDays className="h-4 w-4 text-clay" />
        Reperes chronologiques
      </div>
      <div className="relative h-16 rounded-lg bg-paper/10 p-4">
        <div className="absolute left-4 right-4 top-1/2 h-1 -translate-y-1/2 rounded-full bg-paper/25" />
        <div
          className="absolute top-1/2 h-3 -translate-y-1/2 rounded-full bg-clay"
          style={{ left: `calc(1rem + ${left * 0.92}%)`, right: `calc(1rem + ${(100 - right) * 0.92}%)` }}
        />
        <div className="absolute bottom-2 left-4 text-xs text-paper/60">500 ka</div>
        <div className="absolute bottom-2 right-4 text-xs text-paper/60">present</div>
      </div>
    </div>
  );
}

function RangeSketch({ species }: { species: Species }) {
  const points = species.coordinates.map((coordinate) => ({
    x: ((coordinate.lng + 180) / 360) * 300 + 10,
    y: ((90 - coordinate.lat) / 180) * 150 + 18
  }));

  return (
    <svg viewBox="0 0 320 210" className="h-64 w-full" role="img" aria-label={`Carte simplifiee de ${species.name}`}>
      <rect x="14" y="24" width="292" height="154" rx="8" fill="#d9e8e6" />
      <path d="M44 86 C76 44 123 54 141 83 C157 110 117 131 75 124 C49 120 29 105 44 86Z" fill="#48635b" opacity="0.34" />
      <path d="M133 75 C178 36 237 51 274 88 C245 108 226 136 187 129 C154 124 126 105 133 75Z" fill="#48635b" opacity="0.34" />
      <path d="M105 134 C139 125 165 143 151 164 C121 171 96 160 105 134Z" fill="#48635b" opacity="0.25" />
      <path d="M208 140 C235 130 267 139 276 158 C247 174 220 166 208 140Z" fill="#48635b" opacity="0.22" />
      {points.map((point) => (
        <g key={`${point.x}-${point.y}`}>
          <circle cx={point.x} cy={point.y} r="15" fill="#0f6f73" opacity="0.18" />
          <circle cx={point.x} cy={point.y} r="6" fill="#b65f25" stroke="#0f6f73" strokeWidth="2" />
        </g>
      ))}
      <text x="22" y="199" className="fill-ink text-[11px] font-semibold">
        {species.region}
      </text>
    </svg>
  );
}

function MetricBars({ metrics, color }: { metrics: SpeciesDetailedSection['metrics']; color: string }) {
  return (
    <div className="grid gap-3">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <div className="mb-1 flex items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-ink">{metric.label}</span>
            <span className="text-ink/55">{metric.note}</span>
          </div>
          <div className="h-2 rounded-full bg-black/10">
            <div className="h-2 rounded-full" style={{ width: `${metric.value}%`, backgroundColor: color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function MediaFigure({
  media,
  color,
  size = 'compact'
}: {
  media: SpeciesSectionMedia;
  color: string;
  size?: 'compact' | 'large';
}) {
  return (
    <figure className="overflow-hidden rounded-lg border border-black/10 bg-bone">
      <div className="relative">
        <img
          src={media.image}
          alt={media.alt}
          className={`${size === 'large' ? 'max-h-[440px]' : 'h-64'} w-full bg-white object-contain`}
          loading="lazy"
        />
        <span
          className="absolute left-3 top-3 rounded-md px-2 py-1 text-xs font-bold text-paper shadow-soft"
          style={{ backgroundColor: color }}
        >
          Wikimedia Commons
        </span>
      </div>
      <figcaption className="grid gap-2 p-4">
        <p className="text-sm leading-6 text-ink/75">{media.caption}</p>
        <a
          className="text-xs font-semibold text-lagoon underline-offset-4 hover:underline"
          href={media.sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          {media.credit}
        </a>
      </figcaption>
    </figure>
  );
}
