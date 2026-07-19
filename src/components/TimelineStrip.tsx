import { timelineEvents } from '../services/content';
import { formatKya } from '../utils/format';

const categoryLabels: Record<string, string> = {
  species: 'Espece',
  climate: 'Climat',
  migration: 'Migration',
  innovation: 'Innovation',
  publication: 'Publication'
};

export function TimelineStrip() {
  return (
    <div className="pb-2">
      <ol className="grid min-w-0 gap-4 sm:grid-cols-3">
        {timelineEvents.map((event) => (
          <li key={event.id} className="min-w-0 rounded-lg border border-black/10 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ochre">
              {categoryLabels[event.category] ?? event.category}
            </p>
            <h3 className="mt-2 font-semibold text-ink">{event.title}</h3>
            <p className="mt-1 text-sm font-medium text-lagoon">
              {event.dateKya ? formatKya(event.dateKya) : event.year}
            </p>
            <p className="mt-3 text-sm leading-6 text-ink/70">{event.summary}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
