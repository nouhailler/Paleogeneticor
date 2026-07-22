import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Binary,
  Bone,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Dna,
  FlaskConical,
  Microscope,
  ShieldCheck
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

type WorkflowStepId = 'extraction' | 'sequencing' | 'bioinformatics';

interface WorkflowStep {
  id: WorkflowStepId;
  title: string;
  subtitle: string;
  icon: typeof Bone;
  objective: string;
  risk: string;
  result: string;
  actions: string[];
  controls: string[];
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 'extraction',
    title: "1. L'extraction",
    subtitle: 'De la dent ou de l os petreux vers un extrait ADN',
    icon: Bone,
    objective: "Recuperer les fragments d'ADN ancien encore pieges dans un tissu dense.",
    risk: "Le danger majeur est l'ADN moderne: peau, salive, poussiere, reactifs ou anciens manipulateurs du fossile.",
    result: "Un extrait liquide contenant un melange de fragments anciens, d'ADN microbien et de traces possibles de contamination.",
    actions: [
      "Choisir un tissu dense comme une dent ou la portion petreuse de l'os temporal.",
      "Retirer ou nettoyer la surface externe, souvent contaminee depuis la fouille.",
      "Travailler en salle blanche avec combinaison, masque, charlotte, double gants et air filtre.",
      "Dissoudre une petite poudre d'os ou de dent pour liberer les fragments d'ADN."
    ],
    controls: [
      "Blanc d'extraction traite comme un vrai echantillon.",
      "Separation stricte entre zone pre-PCR et zone post-PCR.",
      "Nettoyage UV et agents chimiques sur surfaces et instruments."
    ]
  },
  {
    id: 'sequencing',
    title: '2. La sequencation',
    subtitle: 'Des fragments aDNA vers des lectures numeriques',
    icon: Dna,
    objective: "Transformer des molecules courtes, abimees et melangees en donnees lisibles par ordinateur.",
    risk: "Les fragments anciens sont tres courts; des duplicats PCR ou des molecules contaminantes peuvent etre lus comme si elles venaient du fossile.",
    result: "Un fichier de lectures: des millions de petites sequences A, C, G, T avec des scores de qualite.",
    actions: [
      "Ajouter des adaptateurs aux extremites des fragments pour creer une bibliotheque de sequencage.",
      "Indexer chaque echantillon pour savoir de quel tube vient chaque lecture.",
      "Lire massivement les fragments en parallele sur une plateforme haut debit.",
      "Produire des fichiers de donnees brutes contenant sequences et qualites."
    ],
    controls: [
      "Blanc de bibliotheque pour detecter une contamination introduite apres extraction.",
      "Double index pour limiter les erreurs d'assignation entre echantillons.",
      "Mesure de la longueur des fragments et du taux de duplication."
    ]
  },
  {
    id: 'bioinformatics',
    title: '3. La bioinformatique',
    subtitle: 'Aligner, filtrer, authentifier, interpreter',
    icon: Binary,
    objective: "Replacer les fragments courts sur un genome de reference et verifier qu'ils portent une signature ancienne.",
    risk: "Un mauvais alignement, un biais vers le genome de reference ou une contamination moderne peuvent produire une histoire genetique trompeuse.",
    result: "Un jeu de donnees interpretable: couverture, dommages, contamination estimee, variants et relations de parente.",
    actions: [
      "Retirer adaptateurs et lectures de mauvaise qualite.",
      "Aligner les fragments sur un genome de reference moderne.",
      "Regrouper les duplicats pour ne pas compter plusieurs fois la meme molecule.",
      "Verifier les dommages typiques: fragments courts et substitutions C vers T aux extremites."
    ],
    controls: [
      "Comparer plusieurs seuils de qualite et plusieurs statistiques.",
      "Mesurer la contamination mitochondriale ou chromosomique quand c'est possible.",
      "Croiser les resultats avec datation, archeologie et contexte du site."
    ]
  }
];

const sampleFragments = ['ATCGA', 'TCG', 'GATTA', 'CCT', 'AAGC', 'TTGA'];
const alignedRows = [
  { ref: 'ATCGATTCGATTAACCTGAAGCTTGA', read: 'ATCGA', offset: 0 },
  { ref: 'ATCGATTCGATTAACCTGAAGCTTGA', read: 'TCG', offset: 6 },
  { ref: 'ATCGATTCGATTAACCTGAAGCTTGA', read: 'GATTA', offset: 8 },
  { ref: 'ATCGATTCGATTAACCTGAAGCTTGA', read: 'CCT', offset: 15 },
  { ref: 'ATCGATTCGATTAACCTGAAGCTTGA', read: 'AAGC', offset: 19 }
];

export function BoneToDnaPage() {
  useDocumentTitle("De l'os a l'ADN");
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = workflowSteps[activeIndex];
  const ActiveIcon = activeStep.icon;
  const progress = useMemo(() => ((activeIndex + 1) / workflowSteps.length) * 100, [activeIndex]);

  return (
    <>
      <PageHeader
        eyebrow="Module pas a pas"
        title="De l'os a l'ADN"
        description="Comprendre comment un fragment de dent ou d'os devient une donnee genetique interpretable."
      />

      <section className="grid min-w-0 gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="grid min-w-0 content-start gap-3">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeIndex;

            return (
              <button
                key={step.id}
                className={`rounded-lg border p-4 text-left transition ${
                  isActive
                    ? 'border-lagoon bg-lagoon text-paper shadow-soft'
                    : 'border-black/10 bg-paper text-ink hover:border-lagoon/40'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className={`grid h-11 w-11 place-items-center rounded-md ${isActive ? 'bg-paper/15' : 'bg-bone text-lagoon'}`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-bold">{step.title}</h2>
                    <p className={`mt-1 text-sm ${isActive ? 'text-paper/75' : 'text-ink/65'}`}>{step.subtitle}</p>
                  </div>
                </div>
              </button>
            );
          })}

          <div className="rounded-lg border border-black/10 bg-paper p-4 shadow-soft">
            <div className="mb-2 flex items-center justify-between text-sm font-bold">
              <span>Progression du protocole</span>
              <span className="text-lagoon">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 rounded-full bg-black/10">
              <div className="h-2 rounded-full bg-lagoon transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </aside>

        <section className="min-w-0 rounded-lg border border-black/10 bg-paper p-4 shadow-soft sm:p-5">
          <div className="flex min-w-0 items-start gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-lagoon/10 text-lagoon">
              <ActiveIcon className="h-7 w-7" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold uppercase text-ochre">{activeStep.subtitle}</p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{activeStep.title}</h2>
              <p className="mt-3 leading-7 text-ink/75">{activeStep.objective}</p>
            </div>
          </div>

          <WorkflowVisual stepId={activeStep.id} />

          <div className="mt-5 grid min-w-0 gap-4 lg:grid-cols-3">
            <InfoBlock icon={<FlaskConical className="h-5 w-5 text-lagoon" />} title="Gestes scientifiques" items={activeStep.actions} />
            <InfoBlock icon={<AlertTriangle className="h-5 w-5 text-ochre" />} title="Risque critique" items={[activeStep.risk]} />
            <InfoBlock icon={<ShieldCheck className="h-5 w-5 text-moss" />} title="Controles" items={activeStep.controls} />
          </div>

          <div className="mt-5 rounded-lg border border-black/10 bg-bone p-4">
            <p className="text-xs font-bold uppercase text-ink/50">Resultat de l'etape</p>
            <p className="mt-2 leading-7 text-ink/75">{activeStep.result}</p>
          </div>

          <div className="mt-5 flex flex-wrap justify-between gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-4 py-3 text-sm font-bold text-ink disabled:opacity-45"
              onClick={() => setActiveIndex((index) => Math.max(index - 1, 0))}
              disabled={activeIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              Etape precedente
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-md bg-lagoon px-4 py-3 text-sm font-bold text-paper disabled:opacity-45"
              onClick={() => setActiveIndex((index) => Math.min(index + 1, workflowSteps.length - 1))}
              disabled={activeIndex === workflowSteps.length - 1}
            >
              Etape suivante
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </section>

      <section className="mt-6 min-w-0 rounded-lg border border-black/10 bg-ink p-5 text-paper shadow-soft">
        <div className="flex items-center gap-2">
          <Microscope className="h-5 w-5 text-clay" />
          <h2 className="text-2xl font-bold">Ce que le module doit faire comprendre</h2>
        </div>
        <div className="mt-4 grid min-w-0 gap-4 md:grid-cols-3">
          <Takeaway title="L'ADN ancien est rare" text="La plupart des molecules viennent du sol, des microbes ou de contaminations modernes." />
          <Takeaway title="La sequence brute ne suffit pas" text="Il faut verifier longueur, dommages, duplicats, blancs et contamination estimee." />
          <Takeaway title="L'interpretation est croisee" text="Le genome est lu avec l'archeologie, la datation, le site et les limites du protocole." />
        </div>
      </section>
    </>
  );
}

function WorkflowVisual({ stepId }: { stepId: WorkflowStepId }) {
  if (stepId === 'extraction') {
    return (
      <div className="mt-6 min-w-0 rounded-lg border border-black/10 bg-bone p-3 sm:p-4">
        <div className="grid min-w-0 items-center gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <VisualCard icon={<Bone className="h-9 w-9" />} title="Dent / petreux" text="Tissu dense et protege" />
          <ArrowRight className="mx-auto hidden h-5 w-5 text-ochre md:block" />
          <VisualCard icon={<ShieldCheck className="h-9 w-9" />} title="Salle blanche" text="Combinaison, UV, blancs" />
          <ArrowRight className="mx-auto hidden h-5 w-5 text-ochre md:block" />
          <VisualCard icon={<FlaskConical className="h-9 w-9" />} title="Extrait" text="Fragments courts en solution" />
        </div>
      </div>
    );
  }

  if (stepId === 'sequencing') {
    return (
      <div className="mt-6 min-w-0 rounded-lg border border-black/10 bg-bone p-3 sm:p-4">
        <div className="grid min-w-0 gap-4 lg:grid-cols-2">
          <div className="min-w-0">
            <p className="text-sm font-bold uppercase text-ochre">Fragments aDNA</p>
            <div className="mt-3 grid gap-2">
              {sampleFragments.map((fragment) => (
                <div key={fragment} className="min-w-0 break-words rounded-md bg-white px-3 py-2 font-mono text-sm font-bold text-lagoon">
                  {fragment.split('').join(' - ')}
                </div>
              ))}
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold uppercase text-ochre">Donnees numeriques</p>
            <div className="mt-3 overflow-x-auto rounded-md bg-ink p-4 font-mono text-xs leading-6 text-paper/80">
              @read_001<br />
              ATCGA<br />
              +<br />
              IIIHI<br />
              @read_002<br />
              TCG<br />
              +<br />
              HHF
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 min-w-0 rounded-lg border border-black/10 bg-bone p-3 sm:p-4">
      <p className="text-sm font-bold uppercase text-ochre">Alignement simplifie sur genome de reference</p>
      <div className="mt-3 overflow-x-auto rounded-md bg-white p-4">
        <div className="w-max min-w-full font-mono text-xs sm:text-sm">
          <p className="text-ink/50">REF {alignedRows[0].ref}</p>
          {alignedRows.map((row) => (
            <p key={`${row.read}-${row.offset}`} className="text-lagoon">
              <span className="text-ink/30">READ</span> {' '.repeat(row.offset)}
              {row.read}
            </p>
          ))}
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-ink/65">
        Les lectures ne couvrent qu'une partie du genome. La confiance augmente quand plusieurs fragments independants
        couvrent la meme position et portent des signatures anciennes.
      </p>
    </div>
  );
}

function VisualCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-lg border border-black/10 bg-white p-4 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-md bg-lagoon/10 text-lagoon">{icon}</div>
      <h3 className="mt-3 font-bold">{title}</h3>
      <p className="mt-1 text-sm text-ink/65">{text}</p>
    </div>
  );
}

function InfoBlock({ icon, title, items }: { icon: ReactNode; title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-black/10 bg-white/60 p-4">
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

function Takeaway({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-lg bg-paper/10 p-4">
      <h3 className="font-bold text-clay">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-paper/75">{text}</p>
    </article>
  );
}
