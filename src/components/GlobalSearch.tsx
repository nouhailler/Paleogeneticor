import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchContent } from '../services/search';
import { entityLabel } from '../utils/format';

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchContent(query), [query]);

  return (
    <section
      className="w-full min-w-0 max-w-full overflow-hidden rounded-lg border border-black/10 bg-paper p-4 shadow-soft"
      aria-label="Recherche globale"
    >
      <label className="flex items-center gap-3 rounded-md border border-black/15 bg-white px-3 py-2 focus-within:border-lagoon">
        <Search className="h-5 w-5 text-lagoon" aria-hidden="true" />
        <span className="sr-only">Rechercher dans l'encyclopedie</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher une espece, un fossile, une technique..."
          className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none"
          type="search"
        />
      </label>
      <div className="mt-4 grid gap-2">
        {results.map((item) => (
          <Link
            key={`${item.kind}:${item.id}`}
            to={item.path}
            className="min-w-0 rounded-md border border-transparent px-3 py-2 text-sm transition hover:border-lagoon/30 hover:bg-lagoon/5 focus:outline-none focus:ring-2 focus:ring-lagoon"
          >
            <span className="block truncate font-semibold text-ink">{item.title}</span>
            <span className="block truncate text-xs text-ink/60">
              {entityLabel(item.kind)} · {item.subtitle}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
