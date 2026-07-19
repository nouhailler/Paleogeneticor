import { timelineEvents } from '../services/content';
import { formatKya } from '../utils/format';

export function TimelineStrip() {
  return (
    <div className="overflow-x-auto pb-2">
      <ol className="grid min-w-[760px] grid-cols-3 gap-4">
        {timelineEvents.map((event) => (
          <li key={event.id} className="rounded-lg border border-black/10 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ochre">{event.category}</p>
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
