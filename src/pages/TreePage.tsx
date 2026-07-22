import { EvolutionGraph } from '../components/EvolutionGraph';
import { PageHeader } from '../components/PageHeader';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function TreePage() {
  useDocumentTitle('Arbre evolutif');

  return (
    <>
      <PageHeader
        eyebrow="Relations"
        title="Arbre evolutif interactif"
        description="Visualisation navigable des parentes et des principaux episodes d'introgression."
      />
      <section className="mb-5 grid gap-4 rounded-lg border border-black/10 bg-paper p-5 shadow-soft lg:grid-cols-3">
        <article>
          <p className="text-sm font-bold uppercase text-ochre">Pourquoi interactif ?</p>
          <p className="mt-2 leading-7 text-ink/72">
            Un arbre imprime force a simplifier. Une interface navigable permet de zoomer, filtrer et selectionner les
            relations comme on explore une carte.
          </p>
        </article>
        <article>
          <p className="text-sm font-bold uppercase text-ochre">Branches et reseaux</p>
          <p className="mt-2 leading-7 text-ink/72">
            Les branches montrent la parente; les liens pointilles montrent l'introgression, c'est-a-dire des genes qui
            traversent des lignees deja separees.
          </p>
        </article>
        <article>
          <p className="text-sm font-bold uppercase text-ochre">Reference</p>
          <p className="mt-2 leading-7 text-ink/72">
            Des projets comme OneZoom ont popularise l'idee d'un arbre du vivant explore par zoom continu. Ici, le
            principe est applique a l'histoire humaine recente.
          </p>
        </article>
      </section>
      <EvolutionGraph />
    </>
  );
}
