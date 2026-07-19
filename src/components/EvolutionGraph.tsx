import ReactFlow, { Background, Controls, type Edge, type Node } from 'reactflow';
import 'reactflow/dist/style.css';

const nodes: Node[] = [
  { id: 'ancestor', position: { x: 260, y: 20 }, data: { label: 'Ancetre commun recent' } },
  { id: 'neanderthal', position: { x: 80, y: 170 }, data: { label: 'Neandertaliens' } },
  { id: 'denisovan', position: { x: 300, y: 170 }, data: { label: 'Denisoviens' } },
  { id: 'sapiens', position: { x: 520, y: 170 }, data: { label: 'Homo sapiens' } }
];

const edges: Edge[] = [
  { id: 'a-n', source: 'ancestor', target: 'neanderthal' },
  { id: 'a-d', source: 'ancestor', target: 'denisovan' },
  { id: 'a-s', source: 'ancestor', target: 'sapiens' },
  { id: 'n-s', source: 'neanderthal', target: 'sapiens', animated: true, label: 'introgression' },
  { id: 'd-s', source: 'denisovan', target: 'sapiens', animated: true, label: 'introgression' }
];

export function EvolutionGraph() {
  return (
    <div className="h-[420px] overflow-hidden rounded-lg border border-black/10 bg-white">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
