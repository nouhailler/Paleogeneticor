import { Navigate, useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';
import { getGlossaryTermById } from '../services/content';

export function GlossaryDetailPage() {
  const { id } = useParams();
  const term = id ? getGlossaryTermById(id) : undefined;

  if (!term) {
    return <Navigate to="/glossary" replace />;
  }

  return (
    <>
      <PageHeader eyebrow={term.category} title={term.term} description={term.definition} />
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <img
          src={term.image}
          alt={`Illustration du terme ${term.term}`}
          className="aspect-[4/3] w-full rounded-lg border border-black/10 object-cover shadow-soft"
        />
        <div className="grid content-start gap-5">
          <Card>
            <h2 className="text-xl font-bold">Explication</h2>
            <div className="mt-4 grid gap-4 leading-7 text-ink/75">
              {term.details.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Exemple dans l'application</h2>
            <p className="mt-3 leading-7 text-ink/75">{term.example}</p>
          </Card>
        </div>
      </div>
    </>
  );
}
