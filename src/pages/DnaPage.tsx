import { AdmixtureChart } from '../components/AdmixtureChart';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';
import { techniques } from '../services/content';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function DnaPage() {
  useDocumentTitle('ADN ancien');

  return (
    <>
      <PageHeader
        eyebrow="Methode"
        title="ADN ancien"
        description="Extraction, degradation, contamination, PCR, sequencage haut debit et interpretation des melanges genetiques."
      />
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          {techniques.map((technique) => (
            <Card key={technique.id}>
              <p className="text-sm font-semibold text-ochre">{technique.year}</p>
              <h2 className="mt-1 text-xl font-bold">{technique.name}</h2>
              <p className="mt-3 text-ink/75">{technique.summary}</p>
              <p className="mt-3 text-sm leading-6 text-ink/65">{technique.impact}</p>
            </Card>
          ))}
        </div>
        <section>
          <h2 className="mb-3 text-xl font-bold">Melanges genetiques</h2>
          <AdmixtureChart />
        </section>
      </div>
    </>
  );
}
