import { useMemo, useState } from 'react';
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
      <div className="grid gap-3">
        {terms.map((item) => (
          <article key={item.id} className="rounded-lg border border-black/10 bg-paper p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ochre">{item.category}</p>
            <h2 className="mt-1 text-xl font-bold">{item.term}</h2>
            <p className="mt-2 leading-7 text-ink/75">{item.definition}</p>
          </article>
        ))}
      </div>
    </>
  );
}
