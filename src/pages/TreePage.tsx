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
      <EvolutionGraph />
    </>
  );
}
