import { useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, Dna, ExternalLink, Globe2, IceCreamBowl, Lightbulb, ScrollText, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { timelineEvents } from '../services/content';
import type { TimelineEvent } from '../types/domain';
import { formatKya } from '../utils/format';

const categoryLabels: Record<TimelineEvent['category'], string> = {
  species: 'Espece',
  climate: 'Climat',
  migration: 'Migration',
  innovation: 'Innovation',
  publication: 'Publication'
};

const categoryColors: Record<TimelineEvent['category'], string> = {
  species: '#0f6f73',
  climate: '#48635b',
  migration: '#b65f25',
  innovation: '#7b4b2a',
  publication: '#182323'
};

const categoryIcons: Record<TimelineEvent['category'], typeof Dna> = {
  species: Dna,
  climate: IceCreamBowl,
  migration: Globe2,
  innovation: Lightbulb,
  publication: ScrollText
};

export function TimelineStrip() {
  const [activeEvent, setActiveEvent] = useState<TimelineEvent | null>(null);
  const sortedEvents = useMemo(
    () =>
      [...timelineEvents].sort((left, right) => {
        const leftTime = left.dateKya ? -left.dateKya : left.year ?? 0;
        const rightTime = right.dateKya ? -right.dateKya : right.year ?? 0;
        return leftTime - rightTime;
      }),
    []
  );

  return (
    <div className="grid gap-5">
      <TimelineInfographic events={sortedEvents} onSelect={setActiveEvent} />

      <ol className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {sortedEvents.map((event) => {
          const Icon = categoryIcons[event.category];
          const color = categoryColors[event.category];

          return (
            <li key={event.id} className="min-w-0">
              <button
                className="group h-full w-full rounded-lg border border-black/10 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-lagoon/40"
                onClick={() => setActiveEvent(event)}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide" style={{ color }}>
                    <Icon className="h-4 w-4" />
                    {categoryLabels[event.category]}
                  </span>
                  <span className="shrink-0 rounded-md bg-bone px-2 py-1 text-xs font-bold text-ink/70">
                    {formatEventDate(event)}
                  </span>
                </div>
                <h3 className="mt-3 font-semibold text-ink">{event.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/70">{event.summary}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-lagoon">
                  Details
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {activeEvent ? <TimelineDialog event={activeEvent} onClose={() => setActiveEvent(null)} /> : null}
    </div>
  );
}

function TimelineInfographic({
  events,
  onSelect
}: {
  events: TimelineEvent[];
  onSelect: (event: TimelineEvent) => void;
}) {
  const ancientEvents = events.filter((event) => event.dateKya);
  const modernEvents = events.filter((event) => event.year);

  return (
    <section className="overflow-hidden rounded-lg border border-black/10 bg-ink text-paper">
      <div className="grid gap-6 p-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-clay" />
            <h3 className="text-xl font-bold">Deux vitesses de lecture</h3>
          </div>
          <p className="mt-3 leading-7 text-paper/75">
            La frise se lit en deux plans: le temps profond des especes et migrations, puis l'acceleration recente des
            methodes ADN qui change notre interpretation des fossiles.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Stat value={`${ancientEvents.length}`} label="jalons prehistoriques" />
            <Stat value={`${modernEvents.length}`} label="jalons scientifiques" />
            <Stat value="1983-2024" label="revolution ADN" />
          </div>
        </div>

        <div className="grid gap-5">
          <InfographicLane
            title="Temps profond"
            subtitle="430 ka a 21 ka"
            events={ancientEvents}
            onSelect={onSelect}
            rangeStart={430}
            rangeEnd={0}
          />
          <ModernLane events={modernEvents} onSelect={onSelect} />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg bg-paper/10 p-3">
      <p className="text-2xl font-bold text-clay">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase text-paper/65">{label}</p>
    </div>
  );
}

function InfographicLane({
  title,
  subtitle,
  events,
  onSelect,
  rangeStart,
  rangeEnd
}: {
  title: string;
  subtitle: string;
  events: TimelineEvent[];
  onSelect: (event: TimelineEvent) => void;
  rangeStart: number;
  rangeEnd: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h4 className="text-sm font-bold">{title}</h4>
        <p className="text-xs font-semibold text-paper/55">{subtitle}</p>
      </div>
      <div className="relative h-20 rounded-lg bg-paper/10 px-3">
        <div className="absolute left-4 right-4 top-1/2 h-1 -translate-y-1/2 rounded-full bg-paper/25" />
        {events.map((event) => {
          const value = event.dateKya ?? 0;
          const position = ((rangeStart - value) / (rangeStart - rangeEnd)) * 100;
          return <InfographicPoint key={event.id} event={event} position={position} onSelect={onSelect} />;
        })}
      </div>
    </div>
  );
}

function ModernLane({ events, onSelect }: { events: TimelineEvent[]; onSelect: (event: TimelineEvent) => void }) {
  const years = events.map((event) => event.year ?? 0);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h4 className="text-sm font-bold">Revolution paleogenomique</h4>
        <p className="text-xs font-semibold text-paper/55">
          {minYear} a {maxYear}
        </p>
      </div>
      <div className="relative h-20 rounded-lg bg-paper/10 px-3">
        <div className="absolute left-4 right-4 top-1/2 h-1 -translate-y-1/2 rounded-full bg-paper/25" />
        {events.map((event) => {
          const year = event.year ?? minYear;
          const position = ((year - minYear) / Math.max(maxYear - minYear, 1)) * 100;
          return <InfographicPoint key={event.id} event={event} position={position} onSelect={onSelect} />;
        })}
      </div>
    </div>
  );
}

function InfographicPoint({
  event,
  position,
  onSelect
}: {
  event: TimelineEvent;
  position: number;
  onSelect: (event: TimelineEvent) => void;
}) {
  const Icon = categoryIcons[event.category];
  const color = categoryColors[event.category];

  return (
    <button
      className="absolute top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md border border-paper/30 bg-ink shadow-soft transition hover:scale-105"
      style={{ left: `calc(1rem + ${Math.min(Math.max(position, 0), 100) * 0.9}%)` }}
      onClick={() => onSelect(event)}
      aria-label={event.title}
      title={event.title}
    >
      <Icon className="h-5 w-5" style={{ color }} />
    </button>
  );
}

function TimelineDialog({ event, onClose }: { event: TimelineEvent; onClose: () => void }) {
  const Icon = categoryIcons[event.category];
  const color = categoryColors[event.category];

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="timeline-event-title"
    >
      <article className="max-h-[88vh] w-full max-w-3xl overflow-auto rounded-lg bg-paper shadow-soft">
        <header className="sticky top-0 flex items-start justify-between gap-3 border-b border-black/10 bg-paper p-4">
          <div className="flex gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md" style={{ backgroundColor: `${color}18` }}>
              <Icon className="h-6 w-6" style={{ color }} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase text-ink/55">
                {categoryLabels[event.category]} - {formatEventDate(event)}
              </p>
              <h3 id="timeline-event-title" className="mt-1 text-2xl font-bold">
                {event.title}
              </h3>
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
          <p className="text-lg leading-8 text-ink/80">{event.summary}</p>
          <div className="grid gap-3">
            {event.details.map((detail) => (
              <p key={detail} className="leading-7 text-ink/75">
                {detail}
              </p>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <InfoBox label="Pourquoi c'est important" value={event.impact} />
            <InfoBox label="Indices utilises" value={event.evidence} />
          </div>
          <Link
            className="inline-flex w-fit items-center gap-2 rounded-md bg-lagoon px-4 py-3 text-sm font-bold text-paper"
            to={event.relatedPath}
            onClick={onClose}
          >
            Explorer la section liee
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </div>
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

function formatEventDate(event: TimelineEvent): string {
  return event.dateKya ? formatKya(event.dateKya) : String(event.year);
}
