import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { glossary } from '../services/content';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function GlossaryPage() {
  const [query, setQuery] = useState('');
  useDocumentTitle('Glossaire');

  const terms = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('fr-FR');
    if (!normalized) {
      return glossary;
    }

    return glossary.filter((item) => `${item.term} ${item.definition}`.toLocaleLowerCase('fr-FR').includes(normalized));
  }, [query]);

  return (
    <>
      <PageHeader
        eyebrow="Definitions"
        title="Glossaire"
        description="Base terminologique extensible pour les notions genetiques, archeologiques et bioinformatiques."
      />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="mb-5 w-full rounded-md border border-black/15 bg-white px-4 py-3 outline-none focus:border-lagoon focus:ring-2 focus:ring-lagoon/20"
        placeholder="Filtrer les termes"
        type="search"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {terms.map((item) => (
          <Link key={item.id} to={`/glossary/${item.id}`} className="group block">
            <article className="h-full overflow-hidden rounded-lg border border-black/10 bg-paper shadow-soft transition group-hover:-translate-y-1 group-hover:border-lagoon/40">
              <img
                src={item.image}
                alt={`Illustration du terme ${item.term}`}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ochre">{item.category}</p>
                    <h2 className="mt-1 text-xl font-bold">{item.term}</h2>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-lagoon transition group-hover:translate-x-1" aria-hidden="true" />
                </div>
                <p className="mt-2 leading-7 text-ink/75">{item.definition}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
