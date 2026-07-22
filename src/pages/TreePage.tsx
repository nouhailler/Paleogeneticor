import { Dna, GitBranch, Network, Shuffle } from 'lucide-react';
import { EvolutionGraph } from '../components/EvolutionGraph';
import { PageHeader } from '../components/PageHeader';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const explanationBlocks = [
  {
    title: '1. Lignes verticales: les lignees qui divergent',
    icon: GitBranch,
    points: [
      "En haut, l'ancetre commun ne designe pas un individu unique, mais une population ancestrale partagee par plusieurs groupes humains.",
      "Au centre, H. heidelbergensis ou des formes proches servent de carrefour pedagogique du Pleistocene moyen.",
      "Depuis ce carrefour emergent trois grandes trajectoires recentes: Neandertaliens en Europe et au Moyen-Orient, Denisoviens surtout en Asie, puis Homo sapiens d'abord en Afrique avant sa dispersion."
    ]
  },
  {
    title: "2. Lignes pointillees marron: l'introgression",
    icon: Shuffle,
    points: [
      "Les lignes pointillees ne sont pas des branches de descendance: elles indiquent des croisements entre populations deja separees.",
      "Neandertaliens et Denisoviens se sont rencontres; le fossile Denny illustre un hybride de premiere generation, avec une mere neandertalienne et un pere denisovien.",
      "Sapiens a rencontre Neandertal en Eurasie, laissant environ 1 a 2 % d'ADN neandertalien chez beaucoup de populations non africaines actuelles.",
      "Sapiens a aussi recu de l'ADN denisovien, avec des proportions pouvant atteindre environ 4 a 6 % dans certaines populations d'Oceanie et d'Asie du Sud-Est."
    ]
  },
  {
    title: '3. Lignee fantome: un signal sans fossile direct',
    icon: Dna,
    points: [
      "Une lignee fantome est une population que l'on infere par des signatures genetiques, sans disposer encore d'un fossile ou d'un genome direct clairement attribue.",
      "Chez Homo sapiens, certains modeles suggerent des apports archaiques anciens, notamment en Afrique subsaharienne.",
      "Le lien pointille noir doit donc etre lu comme un signal possible: il oriente la recherche, mais il ne nomme pas encore une espece definitive."
    ]
  }
];

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

      <section className="mb-5 rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-lagoon/10 text-lagoon">
            <Network className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold uppercase text-ochre">Lecture du schema</p>
            <h2 className="mt-1 text-2xl font-bold">Une evolution en reseau, pas une simple echelle</h2>
            <p className="mt-3 max-w-4xl leading-7 text-ink/75">
              Ce schema montre une evolution reticulee: les lignees humaines se separent, mais certaines se recroisent
              ensuite. L'histoire du genre humain ressemble donc moins a un arbre aux branches totalement isolees qu'a un
              reseau interconnecte ou des populations proches ont partage des genes avant que Homo sapiens reste la seule
              espece humaine actuelle.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {explanationBlocks.map((block) => {
            const Icon = block.icon;
            return (
              <article key={block.title} className="rounded-lg border border-black/10 bg-white/70 p-4">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-lagoon" aria-hidden="true" />
                  <h3 className="font-bold">{block.title}</h3>
                </div>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/72">
                  {block.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <EvolutionGraph />
    </>
  );
}
