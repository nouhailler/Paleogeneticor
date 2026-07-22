import { useState } from 'react';
import type { ReactNode } from 'react';
import { AlertTriangle, ArrowRight, Bone, CheckCircle2, Dna, FlaskConical, ShieldCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdmixtureChart } from '../components/AdmixtureChart';
import { PageHeader } from '../components/PageHeader';
import { techniques } from '../services/content';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { Technique } from '../types/domain';

export function DnaPage() {
  useDocumentTitle('ADN ancien');
  const [activeTechnique, setActiveTechnique] = useState<Technique | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="Methode"
        title="ADN ancien"
        description="Extraction, degradation, contamination, PCR, sequencage haut debit et interpretation des melanges genetiques."
      />

      <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {techniques.map((technique) => (
            <button
              key={technique.id}
              className="group overflow-hidden rounded-lg border border-black/10 bg-paper text-left shadow-soft transition hover:-translate-y-1 hover:border-lagoon/40"
              onClick={() => setActiveTechnique(technique)}
            >
              <img
                src={technique.image}
                alt=""
                className="h-40 w-full bg-bone object-cover transition duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="grid gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase text-ochre">{technique.category}</p>
                    <h2 className="mt-1 text-xl font-bold">{technique.name}</h2>
                  </div>
                  <span className="rounded-md bg-lagoon/10 px-2 py-1 text-sm font-bold text-lagoon">{technique.year}</span>
                </div>
                <p className="text-sm leading-6 text-ink/75">{technique.summary}</p>
                <p className="text-sm leading-6 text-ink/65">{technique.impact}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-lagoon">
                  Voir le dossier
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          ))}
        </div>

        <aside className="grid content-start gap-5">
          <section className="rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
            <div className="flex items-center gap-2">
              <Bone className="h-5 w-5 text-lagoon" />
              <h2 className="text-xl font-bold">Module pas a pas</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-ink/70">
              Suivre le parcours complet: prelevement, salle blanche, sequencage, alignement et controles
              bioinformatiques.
            </p>
            <Link
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-lagoon px-4 py-3 text-sm font-bold text-paper"
              to="/bone-to-dna"
            >
              Ouvrir De l'os a l'ADN
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          <section className="rounded-lg border border-black/10 bg-ink p-5 text-paper shadow-soft">
            <div className="flex items-center gap-2">
              <Dna className="h-5 w-5 text-clay" />
              <h2 className="text-xl font-bold">Logique d'une analyse</h2>
            </div>
            <ol className="mt-4 grid gap-3 text-sm leading-6 text-paper/75">
              <li>1. Prelever sans contaminer.</li>
              <li>2. Extraire des fragments courts et abimes.</li>
              <li>3. Construire une bibliotheque ou amplifier une cible.</li>
              <li>4. Sequencer, filtrer, aligner et verifier les dommages.</li>
              <li>5. Interpreter les resultats avec le contexte archeologique.</li>
            </ol>
          </section>

          <section className="rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
            <h2 className="mb-3 text-xl font-bold">Melanges genetiques</h2>
            <AdmixtureChart />
          </section>
        </aside>
      </section>

      {activeTechnique ? (
        <TechniqueDialog technique={activeTechnique} onClose={() => setActiveTechnique(null)} />
      ) : null}
    </>
  );
}

function TechniqueDialog({ technique, onClose }: { technique: Technique; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dna-technique-title"
    >
      <article className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-lg bg-paper shadow-soft">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-black/10 bg-paper p-4">
          <div>
            <p className="text-xs font-bold uppercase text-ochre">
              {technique.category} - {technique.year}
            </p>
            <h2 id="dna-technique-title" className="mt-1 text-2xl font-bold">
              {technique.name}
            </h2>
          </div>
          <button
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-black/10 text-ink"
            onClick={onClose}
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="grid gap-6 p-5">
          <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <figure className="overflow-hidden rounded-lg border border-black/10 bg-bone">
              <img src={technique.image} alt="" className="max-h-[420px] w-full object-cover" />
            </figure>
            <div className="grid content-start gap-4">
              <p className="text-lg leading-8 text-ink/80">{technique.whyItMatters}</p>
              <div className="flex flex-wrap gap-2">
                {technique.keyFigures.map((figure) => (
                  <span key={figure} className="rounded-md bg-lagoon/10 px-3 py-1 text-sm font-semibold text-lagoon">
                    {figure}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-lagoon" />
              <h3 className="text-xl font-bold">Comment ca marche</h3>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {technique.steps.map((step, index) => (
                <div key={step.title} className="rounded-lg border border-black/10 bg-white/60 p-4">
                  <p className="text-sm font-bold text-ochre">Etape {index + 1}</p>
                  <h4 className="mt-1 font-bold">{step.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <InfoPanel
              title="Role en paleogenetique"
              icon={<Dna className="h-5 w-5 text-lagoon" />}
              items={technique.ancientDnaRole}
            />
            <InfoPanel
              title="Risque principal"
              icon={<AlertTriangle className="h-5 w-5 text-ochre" />}
              items={technique.contaminationRisks}
            />
            <InfoPanel
              title="Parades"
              icon={<ShieldCheck className="h-5 w-5 text-moss" />}
              items={technique.safeguards}
            />
          </section>

          <section className="overflow-hidden rounded-lg border border-black/10">
            <div className="grid grid-cols-[0.8fr_1fr_1fr] bg-ink px-4 py-3 text-sm font-bold text-paper">
              <span>Aspect</span>
              <span>Avant / sans controle</span>
              <span>Avec la technique</span>
            </div>
            {technique.comparison.map((row) => (
              <div key={row.label} className="grid grid-cols-[0.8fr_1fr_1fr] gap-3 border-t border-black/10 px-4 py-3 text-sm">
                <span className="font-bold text-ink">{row.label}</span>
                <span className="text-ink/70">{row.before}</span>
                <span className="text-ink/70">{row.after}</span>
              </div>
            ))}
          </section>
        </div>
      </article>
    </div>
  );
}

function InfoPanel({ title, icon, items }: { title: string; icon: ReactNode; items: string[] }) {
  return (
    <section className="rounded-lg border border-black/10 bg-paper p-4">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-bold">{title}</h3>
      </div>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-ink/70">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-lagoon" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
