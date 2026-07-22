import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { CalendarDays, Dna, ExternalLink, FlaskConical, Globe2, Info, Snowflake, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { timePeriods, timelineEvents } from '../services/content';
import type { TimePeriod, TimelineEvent } from '../types/domain';
import { formatKya } from '../utils/format';

type TimelineView = 'deep' | 'science';

const categoryColors: Record<TimelineEvent['category'], string> = {
  species: '#0f6f73',
  climate: '#48635b',
  migration: '#c3542f',
  innovation: '#7b4d2a',
  publication: '#182323'
};

const categoryLabels: Record<TimelineEvent['category'], string> = {
  species: 'Especes',
  climate: 'Climat',
  migration: 'Migration',
  innovation: 'Innovation',
  publication: 'Publication'
};

function formatEventDate(event: TimelineEvent) {
  return event.dateKya ? formatKya(event.dateKya) : String(event.year);
}

export function TimelinePage() {
  useDocumentTitle('Frise du temps');
  const [view, setView] = useState<TimelineView>('deep');
  const [activeEvent, setActiveEvent] = useState<TimelineEvent | null>(null);
  const [activePeriod, setActivePeriod] = useState<TimePeriod | null>(null);

  const deepEvents = useMemo(
    () => timelineEvents.filter((event) => event.dateKya).sort((left, right) => (right.dateKya ?? 0) - (left.dateKya ?? 0)),
    []
  );
  const scienceEvents = useMemo(
    () => timelineEvents.filter((event) => event.year).sort((left, right) => (left.year ?? 0) - (right.year ?? 0)),
    []
  );
  const visibleEvents = view === 'deep' ? deepEvents : scienceEvents;

  return (
    <>
      <PageHeader
        eyebrow="Chronologie"
        title="Frise du temps"
        description="Contextualiser les periodes geologiques, les especes humaines et les grandes decouvertes de l'ADN ancien."
      />

      <section className="mb-5 grid gap-4 rounded-lg border border-black/10 bg-paper p-5 shadow-soft lg:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-lagoon" aria-hidden="true" />
            <h2 className="text-2xl font-bold">Deux echelles a lire ensemble</h2>
          </div>
          <p className="mt-3 max-w-4xl leading-7 text-ink/75">
            La paleogenetique relie le temps profond du Quaternaire aux decouvertes tres recentes. Le Pleistocene donne
            le cadre des especes humaines et des glaciations; l'Holocene donne celui des societes recentes. Depuis 1983,
            les methodes ADN ont ajoute une deuxieme chronologie: celle des outils scientifiques.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[320px]">
          <button
            type="button"
            className={`rounded-md px-3 py-2 text-sm font-bold ${
              view === 'deep' ? 'bg-lagoon text-paper' : 'border border-black/10 bg-white text-ink/75'
            }`}
            onClick={() => setView('deep')}
          >
            Temps profond
          </button>
          <button
            type="button"
            className={`rounded-md px-3 py-2 text-sm font-bold ${
              view === 'science' ? 'bg-lagoon text-paper' : 'border border-black/10 bg-white text-ink/75'
            }`}
            onClick={() => setView('science')}
          >
            Decouvertes ADN
          </button>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid min-w-0 gap-5">
          <GeologicalScale onSelect={setActivePeriod} />
          <EventTimeline view={view} events={visibleEvents} onSelect={setActiveEvent} />
        </div>

        <aside className="grid content-start gap-4">
          <SummaryCard
            icon={<Snowflake className="h-5 w-5 text-lagoon" aria-hidden="true" />}
            title="Pleistocene"
            text="De 2,58 Ma a 11,7 ka: cycles glaciaires, diversification du genre Homo, Neandertal, Denisova, Sapiens et grandes dispersions."
          />
          <SummaryCard
            icon={<Globe2 className="h-5 w-5 text-lagoon" aria-hidden="true" />}
            title="Holocene"
            text="Depuis 11,7 ka: climat interglaciaire, agriculture, fortes expansions demographiques et nombreux genomes anciens exploitables."
          />
          <SummaryCard
            icon={<Dna className="h-5 w-5 text-lagoon" aria-hidden="true" />}
            title="Revolution ADN"
            text="PCR, sequencage haut debit, os petreux et ADN sedimentaire transforment les fossiles en archives genomiques."
          />
        </aside>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {scienceEvents.slice(-3).map((event) => (
          <button
            key={event.id}
            type="button"
            onClick={() => setActiveEvent(event)}
            className="rounded-lg border border-black/10 bg-paper p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-lagoon/40"
          >
            <p className="text-sm font-bold text-ochre">{formatEventDate(event)}</p>
            <h2 className="mt-2 font-bold">{event.title}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/70">{event.summary}</p>
          </button>
        ))}
      </section>

      {activeEvent ? <TimelineEventDialog event={activeEvent} onClose={() => setActiveEvent(null)} /> : null}
      {activePeriod ? <PeriodDialog period={activePeriod} onClose={() => setActivePeriod(null)} /> : null}
    </>
  );
}

function GeologicalScale({ onSelect }: { onSelect: (period: TimePeriod) => void }) {
  const maxKya = 2580;

  return (
    <section className="rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <Globe2 className="h-5 w-5 text-lagoon" aria-hidden="true" />
        <h2 className="text-2xl font-bold">Periodes geologiques</h2>
      </div>
      <p className="mt-3 leading-7 text-ink/75">
        Le Quaternaire recent se lit surtout a travers le Pleistocene et l'Holocene. Ces bandes donnent le cadre des
        climats, des dispersions et de la conservation possible de l'ADN.
      </p>
      <div className="mt-5 overflow-hidden rounded-lg border border-black/10 bg-bone">
        <div className="flex h-24 min-w-[680px]">
          {timePeriods.map((period) => {
            const width = ((period.startKya - period.endKya) / maxKya) * 100;
            const isHolocene = period.id === 'holocene';
            return (
              <button
                key={period.id}
                type="button"
                className={`relative border-r border-paper/70 px-3 py-4 text-left text-paper transition hover:brightness-105 ${
                  isHolocene ? 'bg-ochre' : 'bg-lagoon'
                }`}
                style={{ width: `${Math.max(width, 8)}%` }}
                onClick={() => onSelect(period)}
              >
                <span className="block text-sm font-bold">{period.name}</span>
                <span className="mt-2 block text-xs font-semibold opacity-80">
                  {formatKya(period.startKya)} - {formatKya(period.endKya)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-2 text-xs font-semibold text-ink/55">Echelle schematique: les periodes tres recentes sont elargies pour rester lisibles.</p>
    </section>
  );
}

function EventTimeline({
  view,
  events,
  onSelect
}: {
  view: TimelineView;
  events: TimelineEvent[];
  onSelect: (event: TimelineEvent) => void;
}) {
  const min = view === 'deep' ? 0 : Math.min(...events.map((event) => event.year ?? 0));
  const max = view === 'deep' ? 430 : Math.max(...events.map((event) => event.year ?? 0));

  return (
    <section className="rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <FlaskConical className="h-5 w-5 text-lagoon" aria-hidden="true" />
        <h2 className="text-2xl font-bold">{view === 'deep' ? 'Jalons du temps profond' : 'Dates cles des decouvertes'}</h2>
      </div>
      <div className="mt-5 overflow-x-auto pb-2">
        <div className="relative h-72 min-w-[780px] rounded-lg bg-ink p-5 text-paper">
          <div className="absolute left-8 right-8 top-1/2 h-1 rounded-full bg-paper/20" />
          {events.map((event, index) => {
            const raw = view === 'deep' ? event.dateKya ?? 0 : event.year ?? min;
            const position = view === 'deep' ? ((max - raw) / Math.max(max - min, 1)) * 100 : ((raw - min) / Math.max(max - min, 1)) * 100;
            const top = index % 2 === 0 ? 'top-8' : 'bottom-8';
            return (
              <button
                key={event.id}
                type="button"
                className={`absolute ${top} w-40 -translate-x-1/2 rounded-lg border border-paper/20 bg-paper/10 p-3 text-left shadow-soft transition hover:scale-[1.02]`}
                style={{ left: `calc(2rem + ${Math.min(Math.max(position, 0), 100) * 0.9}%)` }}
                onClick={() => onSelect(event)}
              >
                <span className="block text-xs font-bold" style={{ color: categoryColors[event.category] }}>
                  {formatEventDate(event)}
                </span>
                <span className="mt-1 block text-sm font-bold">{event.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SummaryCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <article className="rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="font-bold">{title}</h2>
      </div>
      <p className="mt-3 text-sm leading-6 text-ink/70">{text}</p>
    </article>
  );
}

function TimelineEventDialog({ event, onClose }: { event: TimelineEvent; onClose: () => void }) {
  return (
    <DialogFrame title={event.title} subtitle={`${categoryLabels[event.category]} - ${formatEventDate(event)}`} onClose={onClose}>
      <p className="text-lg leading-8 text-ink/80">{event.summary}</p>
      <div className="grid gap-3">
        {event.details.map((detail) => (
          <p key={detail} className="leading-7 text-ink/75">
            {detail}
          </p>
        ))}
      </div>
      <InfoBox label="Pourquoi c'est important" value={event.impact} />
      <InfoBox label="Indices utilises" value={event.evidence} />
      <Link className="inline-flex w-fit items-center gap-2 rounded-md bg-lagoon px-4 py-3 text-sm font-bold text-paper" to={event.relatedPath}>
        Explorer la section liee
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </Link>
    </DialogFrame>
  );
}

function PeriodDialog({ period, onClose }: { period: TimePeriod; onClose: () => void }) {
  return (
    <DialogFrame title={period.name} subtitle={`${formatKya(period.startKya)} - ${formatKya(period.endKya)}`} onClose={onClose}>
      <p className="text-lg leading-8 text-ink/80">{period.summary}</p>
      <div className="grid gap-3">
        {period.context.map((paragraph) => (
          <p key={paragraph} className="leading-7 text-ink/75">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="rounded-lg border border-black/10 bg-bone p-4">
        <p className="text-xs font-bold uppercase text-ink/50">Exemples cles</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {period.keyExamples.map((example) => (
            <span key={example} className="rounded-md bg-lagoon/10 px-3 py-1 text-sm font-semibold text-lagoon">
              {example}
            </span>
          ))}
        </div>
      </div>
    </DialogFrame>
  );
}

function DialogFrame({
  title,
  subtitle,
  onClose,
  children
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/75 p-4" role="dialog" aria-modal="true">
      <article className="max-h-[88vh] w-full max-w-3xl overflow-auto rounded-lg bg-paper shadow-soft">
        <header className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-black/10 bg-paper p-4">
          <div className="flex gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-lagoon/10 text-lagoon">
              <Info className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase text-ink/55">{subtitle}</p>
              <h2 className="mt-1 text-2xl font-bold">{title}</h2>
            </div>
          </div>
          <button className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-black/10 text-ink" onClick={onClose}>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>
        <div className="grid gap-5 p-5">{children}</div>
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
