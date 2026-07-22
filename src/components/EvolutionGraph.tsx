import { useMemo, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Edge,
  type Node,
  type OnSelectionChangeParams
} from 'reactflow';
import 'reactflow/dist/style.css';
import { GitBranch, Network, RotateCcw, Search, Shuffle } from 'lucide-react';

type GraphMode = 'all' | 'lineages' | 'introgression';

interface GraphNodeData {
  label: string;
  kind: 'ancestor' | 'archaic' | 'modern' | 'ghost';
  period: string;
  region: string;
  summary: string;
  details: string[];
}

interface GraphEdgeData {
  kind: 'descent' | 'introgression' | 'uncertain';
  summary: string;
  details: string[];
}

const nodeInfo: Record<string, GraphNodeData> = {
  ancestor: {
    label: 'Ancetre commun',
    kind: 'ancestor',
    period: 'Avant 700 ka',
    region: 'Afrique / Eurasie probable',
    summary: 'Point de depart simplifie des lignees humaines recentes.',
    details: [
      "Ce n'est pas un individu unique connu, mais un repere pour lire les divergences.",
      "Il represente une population ancestrale partagee, souvent rapprochee de formes plus anciennes comme Homo erectus ou Homo ergaster dans les scenarios pedagogiques.",
      "Les dates de separation varient selon les modeles genetiques et les fossiles inclus.",
      "Un arbre interactif sert a naviguer dans des hypotheses, pas a figer une certitude definitive."
    ]
  },
  heidelbergensis: {
    label: 'H. heidelbergensis / formes proches',
    kind: 'ancestor',
    period: '700-300 ka',
    region: 'Afrique et Eurasie',
    summary: 'Ensemble de populations souvent placees pres de la base des lignees recentes.',
    details: [
      "Le nom recouvre probablement plusieurs populations, pas une espece simple et uniforme.",
      "Ces formes jouent ici le role de carrefour evolutif du Pleistocene moyen.",
      "Elles aident a discuter l'origine de Neandertal, Denisova et Sapiens.",
      "Leur position exacte depend des fossiles et du cadre taxonomique retenu."
    ]
  },
  neanderthal: {
    label: 'Neandertaliens',
    kind: 'archaic',
    period: '430-40 ka',
    region: 'Europe et Asie occidentale',
    summary: 'Lignee humaine robuste documentee par fossiles, outils et genomes anciens.',
    details: [
      "Les genomes montrent une parente etroite avec les Denisoviens.",
      "Des segments neandertaliens subsistent chez de nombreux humains actuels.",
      "Les populations tardives etaient parfois petites et regionalement differenciees."
    ]
  },
  denisovan: {
    label: 'Denisoviens',
    kind: 'archaic',
    period: '300-30 ka',
    region: 'Asie, Altai, plateau tibetain',
    summary: "Groupe revele d'abord par l'ADN ancien, avec peu de fossiles identifies.",
    details: [
      "La phalange de Denisova a revele une lignee humaine inattendue.",
      "Des traces denisoviennes sont fortes en Oceanie et presentes dans plusieurs regions d'Asie.",
      "La carte fossile est plus pauvre que la carte genetique."
    ]
  },
  sapiens: {
    label: 'Homo sapiens',
    kind: 'modern',
    period: '300 ka - present',
    region: 'Origine africaine puis expansion mondiale',
    summary: "Espece humaine actuelle, issue d'une histoire africaine structuree et de migrations successives.",
    details: [
      "Les expansions hors d'Afrique ne se resument pas a une seule vague.",
      "Les genomes anciens montrent melanges, remplacements partiels et adaptations locales.",
      "Sapiens porte des fragments neandertaliens et parfois denisoviens selon les populations."
    ]
  },
  ghost: {
    label: 'Lignee fantome',
    kind: 'ghost',
    period: 'Date incertaine',
    region: 'Afrique / Eurasie selon modeles',
    summary: "Population inferee par des signaux genetiques, mais encore mal documentee par les fossiles.",
    details: [
      "Une lignee fantome est proposee lorsque les genomes indiquent un apport non explique.",
      "On n'a pas encore trouve de fossile ou d'ADN direct clairement attribue a cette population.",
      "Certains modeles suggerent de faibles signaux archaiques chez des populations humaines, notamment en Afrique subsaharienne.",
      "Elle rappelle que l'arbre connu est incomplet.",
      "Ces hypotheses peuvent changer avec de nouveaux fossiles ou genomes."
    ]
  }
};

const baseNodes: Node<GraphNodeData>[] = [
  { id: 'ancestor', position: { x: 430, y: 20 }, data: nodeInfo.ancestor, type: 'default' },
  { id: 'heidelbergensis', position: { x: 390, y: 150 }, data: nodeInfo.heidelbergensis },
  { id: 'neanderthal', position: { x: 120, y: 310 }, data: nodeInfo.neanderthal },
  { id: 'denisovan', position: { x: 390, y: 310 }, data: nodeInfo.denisovan },
  { id: 'sapiens', position: { x: 660, y: 310 }, data: nodeInfo.sapiens },
  { id: 'ghost', position: { x: 790, y: 145 }, data: nodeInfo.ghost }
];

const baseEdges: Edge<GraphEdgeData>[] = [
  {
    id: 'ancestor-heidelbergensis',
    source: 'ancestor',
    target: 'heidelbergensis',
    label: 'divergence ancienne',
    data: {
      kind: 'descent',
      summary: 'Relation de descendance simplifiee entre populations anciennes.',
      details: [
        "La branche verticale represente une hypothese pedagogique.",
        "Elle condense plusieurs populations fossiles du Pleistocene moyen."
      ]
    }
  },
  {
    id: 'heidelbergensis-neanderthal',
    source: 'heidelbergensis',
    target: 'neanderthal',
    label: 'branche neandertalienne',
    data: {
      kind: 'descent',
      summary: 'Transition vers les populations neandertaliennes en Eurasie.',
      details: [
        "Les traits neandertaliens s'accumulent progressivement.",
        "Les genomes anciens confirment une lignee distincte mais proche des Denisoviens."
      ]
    }
  },
  {
    id: 'heidelbergensis-denisovan',
    source: 'heidelbergensis',
    target: 'denisovan',
    label: 'branche denisovienne',
    data: {
      kind: 'descent',
      summary: "Branche soeur des Neandertaliens, mieux connue par l'ADN que par les fossiles.",
      details: [
        "Le registre fossile reste rare.",
        "Les traces genetiques actuelles suggerent une geographie ancienne plus large."
      ]
    }
  },
  {
    id: 'ancestor-sapiens',
    source: 'ancestor',
    target: 'sapiens',
    label: 'branche sapiens',
    data: {
      kind: 'descent',
      summary: "Branche menant aux populations de Homo sapiens.",
      details: [
        "L'origine est africaine, mais probablement structuree.",
        "Les migrations hors d'Afrique s'accompagnent de contacts avec d'autres humains."
      ]
    }
  },
  {
    id: 'neanderthal-sapiens',
    source: 'neanderthal',
    target: 'sapiens',
    animated: true,
    label: 'introgression neandertalienne',
    data: {
      kind: 'introgression',
      summary: 'Fragments neandertaliens transmis a des ancetres de populations humaines modernes.',
      details: [
        "Les segments sont disperses dans le genome apres recombinaisons.",
        "Le signal est particulierement visible hors d'Afrique.",
        "Chez beaucoup de populations non africaines actuelles, il represente environ 1 a 2 % du genome."
      ]
    }
  },
  {
    id: 'denisovan-sapiens',
    source: 'denisovan',
    target: 'sapiens',
    animated: true,
    label: 'introgression denisovienne',
    data: {
      kind: 'introgression',
      summary: 'Apport denisovien chez certaines populations actuelles, notamment en Oceanie et Asie.',
      details: [
        "Les proportions varient fortement selon les regions.",
        "Certains fragments ont pu contribuer a des adaptations locales.",
        "Dans certaines populations d'Oceanie et d'Asie du Sud-Est, les apports denisoviens peuvent atteindre environ 4 a 6 %."
      ]
    }
  },
  {
    id: 'neanderthal-denisovan',
    source: 'neanderthal',
    target: 'denisovan',
    animated: true,
    label: 'contacts archaiques',
    data: {
      kind: 'introgression',
      summary: 'Contacts directs ou indirects entre Neandertaliens et Denisoviens.',
      details: [
        "Un individu de Denisova avait une mere neandertalienne et un pere denisovien.",
        "Cet individu est souvent surnomme Denny et illustre un hybride de premiere generation.",
        "Ce lien rappelle que les branches ne sont pas des compartiments etanches."
      ]
    }
  },
  {
    id: 'ghost-sapiens',
    source: 'ghost',
    target: 'sapiens',
    animated: true,
    label: 'signal possible',
    data: {
      kind: 'uncertain',
      summary: "Signal d'apport potentiel depuis une population encore mal identifiee.",
      details: [
        "Les lignees fantomes sont inferees par modeles statistiques.",
        "Elles doivent etre presentees comme hypotheses, pas comme especes nommees definitivement."
      ]
    }
  }
];

const nodeStyles: Record<GraphNodeData['kind'], string> = {
  ancestor: '#48635b',
  archaic: '#0f6f73',
  modern: '#b65f25',
  ghost: '#182323'
};

export function EvolutionGraph() {
  const [mode, setMode] = useState<GraphMode>('all');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('sapiens');
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);

  const nodes = useMemo(
    () =>
      baseNodes.map((node) => ({
        ...node,
        style: {
          border: `2px solid ${nodeStyles[node.data.kind]}`,
          borderRadius: 8,
          background: node.id === selectedNodeId ? '#fff3e8' : '#fffdf8',
          color: '#182323',
          fontWeight: 700,
          width: 180,
          boxShadow: node.id === selectedNodeId ? '0 14px 40px rgb(24 35 35 / 0.18)' : undefined
        }
      })),
    [selectedNodeId]
  );

  const edges = useMemo(() => {
    const visibleEdges = baseEdges.filter((edge) => {
      if (mode === 'lineages') {
        return edge.data?.kind === 'descent';
      }

      if (mode === 'introgression') {
        return edge.data?.kind !== 'descent';
      }

      return true;
    });

    return visibleEdges.map((edge) => ({
      ...edge,
      style: {
        stroke:
          edge.data?.kind === 'introgression'
            ? '#b65f25'
            : edge.data?.kind === 'uncertain'
              ? '#182323'
              : '#48635b',
        strokeWidth: edge.id === selectedEdgeId ? 4 : 2,
        strokeDasharray: edge.data?.kind === 'descent' ? undefined : '6 6'
      },
      labelStyle: { fill: '#182323', fontWeight: 700, fontSize: 12 },
      labelBgStyle: { fill: '#fffdf8', fillOpacity: 0.9 }
    }));
  }, [mode, selectedEdgeId]);

  const selectedNode = selectedNodeId ? nodeInfo[selectedNodeId] : null;
  const selectedEdge = selectedEdgeId ? baseEdges.find((edge) => edge.id === selectedEdgeId) : null;

  const handleNodeClick = (_event: MouseEvent, node: Node<GraphNodeData>) => {
    setSelectedNodeId(node.id);
    setSelectedEdgeId(null);
  };

  const handleSelectionChange = ({ edges: selectedEdges }: OnSelectionChangeParams) => {
    if (selectedEdges[0]) {
      setSelectedEdgeId(selectedEdges[0].id);
    }
  };

  return (
    <div className="grid gap-5">
      <section className="grid gap-4 rounded-lg border border-black/10 bg-paper p-5 shadow-soft lg:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5 text-lagoon" />
            <h2 className="text-2xl font-bold">Arbre navigable, pas schema fige</h2>
          </div>
          <p className="mt-3 max-w-3xl leading-7 text-ink/72">
            Comme une carte interactive, le graphe permet de zoomer, de deplacer la vue et de filtrer les relations. Les
            traits pleins indiquent des branches de parente; les traits pointilles animes indiquent des flux de genes.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[360px]">
          <ModeButton active={mode === 'all'} icon={<Search className="h-4 w-4" />} label="Tout" onClick={() => setMode('all')} />
          <ModeButton
            active={mode === 'lineages'}
            icon={<GitBranch className="h-4 w-4" />}
            label="Branches"
            onClick={() => setMode('lineages')}
          />
          <ModeButton
            active={mode === 'introgression'}
            icon={<Shuffle className="h-4 w-4" />}
            label="Introgressions"
            onClick={() => setMode('introgression')}
          />
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="h-[560px] overflow-hidden rounded-lg border border-black/10 bg-white shadow-soft">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            minZoom={0.35}
            maxZoom={1.8}
            onNodeClick={handleNodeClick}
            onEdgeClick={(_event, edge) => {
              setSelectedEdgeId(edge.id);
              setSelectedNodeId('');
            }}
            onSelectionChange={handleSelectionChange}
          >
            <Background />
            <Controls />
            <MiniMap
              nodeColor={(node) => nodeStyles[(node.data as GraphNodeData).kind]}
              maskColor="rgb(247 244 237 / 0.65)"
              pannable
              zoomable
            />
          </ReactFlow>
        </div>

        <aside className="grid content-start gap-4">
          <GraphLegend />
          <DetailPanel node={selectedNode} edge={selectedEdge} />
          <button
            className="inline-flex items-center justify-center gap-2 rounded-md border border-black/10 bg-paper px-4 py-3 text-sm font-bold text-lagoon shadow-soft"
            onClick={() => {
              setMode('all');
              setSelectedNodeId('sapiens');
              setSelectedEdgeId(null);
            }}
          >
            <RotateCcw className="h-4 w-4" />
            Reinitialiser la lecture
          </button>
        </aside>
      </div>
    </div>
  );
}

function ModeButton({
  active,
  icon,
  label,
  onClick
}: {
  active: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-bold transition ${
        active ? 'bg-lagoon text-white' : 'border border-black/10 bg-white text-ink/75 hover:bg-lagoon/10'
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}

function GraphLegend() {
  return (
    <section className="rounded-lg border border-black/10 bg-paper p-4 shadow-soft">
      <h3 className="font-bold">Legende</h3>
      <div className="mt-3 grid gap-2 text-sm">
        <LegendItem color="#48635b" label="Ancetre ou population source" />
        <LegendItem color="#0f6f73" label="Lignee humaine archaique" />
        <LegendItem color="#b65f25" label="Homo sapiens / flux genetique" />
        <LegendItem color="#182323" label="Lignee fantome ou signal incertain" />
      </div>
      <p className="mt-4 text-sm leading-6 text-ink/65">
        Une ligne pointillee n'est pas une branche: elle represente un transfert genetique entre populations deja
        separees.
      </p>
    </section>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-ink/75">{label}</span>
    </div>
  );
}

function DetailPanel({ node, edge }: { node: GraphNodeData | null; edge?: Edge<GraphEdgeData> | null }) {
  if (edge?.data) {
    return (
      <section className="rounded-lg border border-black/10 bg-paper p-4 shadow-soft">
        <p className="text-xs font-bold uppercase text-ochre">Relation selectionnee</p>
        <h3 className="mt-2 text-xl font-bold">{edge.label}</h3>
        <p className="mt-3 leading-7 text-ink/75">{edge.data.summary}</p>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/70">
          {edge.data.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </section>
    );
  }

  if (!node) {
    return (
      <section className="rounded-lg border border-black/10 bg-paper p-4 shadow-soft">
        <p className="text-sm leading-6 text-ink/70">Selectionner un noeud ou une relation pour afficher les details.</p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-black/10 bg-paper p-4 shadow-soft">
      <p className="text-xs font-bold uppercase text-ochre">Noeud selectionne</p>
      <h3 className="mt-2 text-xl font-bold">{node.label}</h3>
      <dl className="mt-3 grid gap-2 text-sm">
        <div>
          <dt className="font-bold">Periode</dt>
          <dd className="text-ink/70">{node.period}</dd>
        </div>
        <div>
          <dt className="font-bold">Region</dt>
          <dd className="text-ink/70">{node.region}</dd>
        </div>
      </dl>
      <p className="mt-3 leading-7 text-ink/75">{node.summary}</p>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/70">
        {node.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
    </section>
  );
}
