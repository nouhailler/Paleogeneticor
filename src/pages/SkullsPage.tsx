import { useMemo, useState } from 'react';
import { Box, Dna, Eye, GitCompare, Info, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SkullViewer3D } from '../components/SkullViewer3D';
import { PageHeader } from '../components/PageHeader';
import { skulls } from '../services/content';
import type { SkullProfile } from '../types/domain';

const comparisonPairs: Record<string, string> = {
  sapiens: 'neanderthal',
  neanderthal: 'sapiens',
  denisovan: 'neanderthal'
};

function getAnnotation(skull: SkullProfile, annotationId: string) {
  return skull.annotations.find((annotation) => annotation.id === annotationId) ?? skull.annotations[0];
}

export function SkullsPage() {
  const [selectedId, setSelectedId] = useState(skulls[0]?.id ?? 'sapiens');
  const [showComparison, setShowComparison] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const selectedSkull = skulls.find((skull) => skull.id === selectedId) ?? skulls[0];
  const comparisonSkull = skulls.find((skull) => skull.id === comparisonPairs[selectedSkull.id]);
  const [selectedAnnotationId, setSelectedAnnotationId] = useState(selectedSkull.annotations[0]?.id ?? '');

  const activeAnnotation = useMemo(() => getAnnotation(selectedSkull, selectedAnnotationId), [selectedAnnotationId, selectedSkull]);

  return (
    <>
      <PageHeader
        eyebrow="Morphologie"
        title="Comparaison de cranes"
        description="Visualisation 3D rotative de cranes de Homo sapiens, Neandertal et Denisoviens avec annotations anatomiques."
      />

      <section className="mb-5 grid gap-4 rounded-lg border border-black/10 bg-paper p-5 shadow-soft lg:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-center gap-2">
            <Box className="h-5 w-5 text-lagoon" aria-hidden="true" />
            <h2 className="text-2xl font-bold">Modele 3D pedagogique</h2>
          </div>
          <p className="mt-3 max-w-4xl leading-7 text-ink/75">
            Les formes sont volontairement stylisees pour mettre en evidence les contrastes anatomiques: hauteur de la
            voute, arcades sourcilieres, projection faciale, robustesse mandibulaire et incertitudes denisoviennes.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[320px]">
          <button
            type="button"
            className={`inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-bold ${
              showComparison ? 'bg-lagoon text-paper' : 'border border-black/10 bg-white text-ink/75'
            }`}
            onClick={() => setShowComparison((value) => !value)}
          >
            <GitCompare className="h-4 w-4" aria-hidden="true" />
            Comparer
          </button>
          <button
            type="button"
            className={`inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-bold ${
              autoRotate ? 'bg-lagoon text-paper' : 'border border-black/10 bg-white text-ink/75'
            }`}
            onClick={() => setAutoRotate((value) => !value)}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Rotation
          </button>
        </div>
      </section>

      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="overflow-hidden rounded-lg border border-black/10 bg-paper shadow-soft">
          <div className="grid gap-3 border-b border-black/10 p-4 md:grid-cols-3">
            {skulls.map((skull) => (
              <button
                key={skull.id}
                type="button"
                className={`rounded-lg border p-4 text-left transition ${
                  selectedSkull.id === skull.id
                    ? 'border-lagoon bg-lagoon text-paper'
                    : 'border-black/10 bg-white text-ink hover:border-lagoon/40'
                }`}
                onClick={() => {
                  setSelectedId(skull.id);
                  setSelectedAnnotationId(skull.annotations[0]?.id ?? '');
                }}
              >
                <p className="text-sm font-bold">{skull.name}</p>
                <p className={`mt-1 text-xs ${selectedSkull.id === skull.id ? 'text-paper/75' : 'text-ink/60'}`}>{skull.period}</p>
              </button>
            ))}
          </div>
          <div className="relative h-[420px] bg-bone sm:h-[560px]">
            <SkullViewer3D
              skull={selectedSkull}
              comparison={comparisonSkull}
              showComparison={showComparison}
              autoRotate={autoRotate}
              selectedAnnotationId={activeAnnotation?.id ?? ''}
              onSelectAnnotation={setSelectedAnnotationId}
            />
            <div className="pointer-events-none absolute left-4 top-4 rounded-lg bg-paper/90 p-3 text-sm shadow-soft">
              <p className="font-bold text-ink">{selectedSkull.name}</p>
              {showComparison && comparisonSkull ? <p className="mt-1 text-ink/65">Comparaison: {comparisonSkull.name}</p> : null}
            </div>
          </div>
        </div>

        <aside className="grid min-w-0 content-start gap-4">
          <section className="rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-lagoon" aria-hidden="true" />
              <h2 className="text-xl font-bold">{selectedSkull.name}</h2>
            </div>
            <p className="mt-2 text-sm font-semibold text-ochre">{selectedSkull.region}</p>
            <p className="mt-3 leading-7 text-ink/75">{selectedSkull.summary}</p>
            <Link
              to={`/species/${selectedSkull.speciesId}`}
              className="mt-4 inline-flex rounded-md bg-lagoon px-4 py-3 text-sm font-bold text-paper"
            >
              Ouvrir la fiche espece
            </Link>
          </section>

          <section className="rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-lagoon" aria-hidden="true" />
              <h2 className="text-xl font-bold">Annotations</h2>
            </div>
            <div className="mt-4 grid gap-2">
              {selectedSkull.annotations.map((annotation) => (
                <button
                  key={annotation.id}
                  type="button"
                  className={`rounded-lg border p-3 text-left transition ${
                    activeAnnotation?.id === annotation.id
                      ? 'border-lagoon bg-lagoon/10'
                      : 'border-black/10 bg-white hover:border-lagoon/40'
                  }`}
                  onClick={() => setSelectedAnnotationId(annotation.id)}
                >
                  <p className="font-bold text-ink">{annotation.label}</p>
                  <p className="mt-1 text-xs font-semibold uppercase text-ochre">{annotation.region}</p>
                </button>
              ))}
            </div>
            {activeAnnotation ? (
              <div className="mt-4 rounded-lg border border-black/10 bg-bone p-4">
                <p className="text-sm font-bold text-ink">{activeAnnotation.label}</p>
                <p className="mt-2 text-sm leading-6 text-ink/70">{activeAnnotation.description}</p>
              </div>
            ) : null}
          </section>

          <section className="rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
            <div className="flex items-center gap-2">
              <Dna className="h-5 w-5 text-lagoon" aria-hidden="true" />
              <h2 className="text-xl font-bold">Differences anatomiques</h2>
            </div>
            <div className="mt-4 grid gap-3">
              {selectedSkull.metrics.map((metric) => (
                <div key={metric.label} className="rounded-lg border border-black/10 bg-white p-3">
                  <p className="text-sm font-bold text-ink">{metric.label}</p>
                  <p className="mt-1 text-sm text-lagoon">{metric.value}</p>
                  <p className="mt-1 text-xs leading-5 text-ink/60">{metric.note}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </>
  );
}
