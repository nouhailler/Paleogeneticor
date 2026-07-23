import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Bone,
  CheckCircle2,
  Dna,
  FlaskConical,
  GitBranch,
  Microscope,
  PlayCircle,
  ShieldCheck,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdmixtureChart } from '../components/AdmixtureChart';
import { PageHeader } from '../components/PageHeader';
import { techniques } from '../services/content';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { Technique } from '../types/domain';

const dnaBasics = [
  {
    title: "Qu'est-ce que l'ADN ?",
    text:
      "L'ADN est une molecule en double helice qui stocke une information hereditaire avec quatre lettres chimiques: A, T, C et G. L'ordre de ces lettres forme des genes, mais aussi de grandes zones regulatrices ou non codantes."
  },
  {
    title: "Pourquoi l'ADN ancien se degrade ?",
    text:
      "Apres la mort, les cellules ne reparent plus les dommages. L'eau coupe les brins, l'oxygene et les microbes modifient les bases, puis la chaleur accelere la fragmentation. Dans un os ancien, on recupere donc surtout des morceaux tres courts."
  },
  {
    title: "Extraction",
    text:
      "Les chercheurs prelevent souvent une dent ou l'os petreux, tres dense. En salle blanche, la surface est retiree, la poudre osseuse est dissoute, puis les fragments d'ADN sont captures sur une matrice chimique."
  },
  {
    title: "Contamination",
    text:
      "L'ADN moderne est beaucoup plus abondant et moins abime que l'ADN ancien. Une cellule de peau, une poussiere ou un reactif contamine peut dominer le signal si les controles ne sont pas stricts."
  },
  {
    title: "Sequencage",
    text:
      "Les fragments sont transformes en bibliotheques avec de petits adaptateurs. Les machines lisent ensuite des millions de fragments, qui deviennent des fichiers numeriques de sequences et de scores de qualite."
  },
  {
    title: "ADN mitochondrial",
    text:
      "Le genome mitochondrial existe en nombreuses copies par cellule et se conserve donc mieux. Il suit surtout la lignee maternelle et sert souvent de premier signal quand l'ADN nucleaire est rare."
  },
  {
    title: "Chromosome Y",
    text:
      "Le chromosome Y suit principalement la lignee paternelle. Il est utile pour suivre certaines migrations masculines, mais il n'est present que chez les individus genetiquement masculins et couvre une seule branche genealogique."
  }
];

const workflowSteps = [
  { label: 'Os ou dent', detail: 'Choisir une zone dense et peu manipulee.' },
  { label: 'Salle blanche', detail: 'Combinaison, UV, air filtre, controles a blanc.' },
  { label: 'Extraction', detail: 'Dissoudre la poudre et capturer les fragments courts.' },
  { label: 'Bibliotheque', detail: 'Ajouter des adaptateurs pour rendre les fragments lisibles.' },
  { label: 'Sequencage', detail: 'Lire massivement les molecules sur une plateforme haut debit.' },
  { label: 'Alignement', detail: 'Comparer les lectures a un genome de reference.' },
  { label: 'Authentification', detail: 'Verifier dommages, longueur, contamination et coherence.' }
];

const videoResources = [
  {
    title: 'What Is Ancient DNA?',
    source: 'Long Story Shorts',
    url: 'https://www.youtube.com/watch?v=Kt72TMUw1M4'
  },
  {
    title: 'Ancient DNA Analysis: From Sample to Sequence',
    source: 'Video pedagogique sur le flux laboratoire',
    url: 'https://www.youtube.com/watch?v=gp_yKX9JhcI'
  },
  {
    title: 'The Double Helix',
    source: 'HHMI BioInteractive',
    url: 'https://www.biointeractive.org/classroom-resources/double-helix'
  }
];

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

      <AncientDnaPrimer />

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

function AncientDnaPrimer() {
  return (
    <section data-demo-id="dna-primer" className="mb-6 grid gap-5">
      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <Dna className="h-6 w-6 text-lagoon" aria-hidden="true" />
            <h2 className="text-2xl font-bold">Avant de commencer: comprendre l'ADN ancien</h2>
          </div>
          <p className="mt-3 leading-7 text-ink/75">
            La paleogenetique ne lit pas un genome intact. Elle reconstruit une histoire a partir de fragments courts,
            abimes et melanges a de l'ADN moderne ou microbien. C'est pour cela que les notions de degradation,
            contamination, sequencage et lignees genetiques sont indispensables.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {dnaBasics.map((item) => (
              <div key={item.title} className="rounded-lg border border-black/10 bg-white/70 p-4">
                <h3 className="font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">{item.text}</p>
              </div>
            ))}
          </div>
        </article>

        <div className="grid gap-5">
          <DnaFragmentAnimation />
          <LineageSchema />
        </div>
      </div>

      <section data-demo-id="dna-workflow" className="rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-lagoon" aria-hidden="true" />
          <h2 className="text-xl font-bold">Du fragment biologique a la donnee numerique</h2>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-7">
          {workflowSteps.map((step, index) => (
            <div key={step.label} className="relative rounded-lg border border-black/10 bg-white p-3">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-lagoon text-sm font-bold text-paper">
                {index + 1}
              </span>
              <h3 className="mt-3 font-bold">{step.label}</h3>
              <p className="mt-2 text-xs leading-5 text-ink/65">{step.detail}</p>
              {index < workflowSteps.length - 1 ? (
                <ArrowRight className="absolute -right-3 top-5 z-10 hidden h-5 w-5 text-ochre md:block" aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-lg border border-black/10 bg-ink p-5 text-paper shadow-soft">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-clay" aria-hidden="true" />
            <h2 className="text-xl font-bold">Pourquoi les controles changent tout</h2>
          </div>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-paper/76">
            <p>
              Un resultat ancien fiable doit montrer des fragments courts, des dommages chimiques attendus aux extremites
              et une faible contamination moderne. Sans ces signatures, une sequence peut raconter l'histoire du
              laboratoire plutot que celle du fossile.
            </p>
            <p>
              L'ADN mitochondrial donne souvent un premier repere car il est abondant. L'ADN nucleaire donne ensuite une
              image plus complete des parentes. Le chromosome Y, quand il existe, precise une partie de la lignee
              paternelle.
            </p>
          </div>
        </article>

        <article className="rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5 text-lagoon" aria-hidden="true" />
            <h2 className="text-xl font-bold">Videos et animations utiles</h2>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {videoResources.map((video) => (
              <a
                key={video.url}
                href={video.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-lg border border-black/10 bg-white p-4 transition hover:border-lagoon/40 hover:bg-lagoon/5"
              >
                <span className="grid h-10 w-10 place-items-center rounded-md bg-lagoon/10 text-lagoon">
                  <PlayCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 font-bold group-hover:text-lagoon">{video.title}</h3>
                <p className="mt-2 text-sm leading-5 text-ink/65">{video.source}</p>
              </a>
            ))}
          </div>
        </article>
      </section>
    </section>
  );
}

function DnaFragmentAnimation() {
  return (
    <article className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-soft">
      <div className="border-b border-black/10 bg-paper px-5 py-4">
        <div className="flex items-center gap-2">
          <Microscope className="h-5 w-5 text-lagoon" aria-hidden="true" />
          <h2 className="text-xl font-bold">Schema anime: degradation</h2>
        </div>
      </div>
      <svg viewBox="0 0 520 260" role="img" aria-label="Animation de fragmentation de l'ADN ancien" className="h-72 w-full">
        <rect width="520" height="260" fill="#fbf7ed" />
        <g strokeLinecap="round" strokeWidth="5">
          <path d="M70 72 C130 25 190 119 250 72 S370 25 450 72" fill="none" stroke="#1f766f">
            <animate attributeName="d" dur="5s" repeatCount="indefinite" values="M70 72 C130 25 190 119 250 72 S370 25 450 72;M70 82 C130 42 190 110 250 76 S370 45 450 83;M70 72 C130 25 190 119 250 72 S370 25 450 72" />
          </path>
          <path d="M70 112 C130 65 190 159 250 112 S370 65 450 112" fill="none" stroke="#c3542f">
            <animate attributeName="d" dur="5s" repeatCount="indefinite" values="M70 112 C130 65 190 159 250 112 S370 65 450 112;M70 121 C130 84 190 150 250 116 S370 82 450 123;M70 112 C130 65 190 159 250 112 S370 65 450 112" />
          </path>
        </g>
        <g stroke="#24312f" strokeWidth="2" opacity="0.45">
          {Array.from({ length: 12 }).map((_, index) => {
            const x = 78 + index * 34;
            return <line key={x} x1={x} y1="78" x2={x} y2="108" />;
          })}
        </g>
        <g fill="#7b4d2a" opacity="0.85">
          <rect x="105" y="170" width="46" height="8" rx="4">
            <animateTransform attributeName="transform" type="translate" dur="4s" repeatCount="indefinite" values="0 0; 6 -6; 0 0" />
          </rect>
          <rect x="184" y="190" width="72" height="8" rx="4">
            <animateTransform attributeName="transform" type="translate" dur="4.5s" repeatCount="indefinite" values="0 0; -8 4; 0 0" />
          </rect>
          <rect x="294" y="169" width="38" height="8" rx="4">
            <animateTransform attributeName="transform" type="translate" dur="3.8s" repeatCount="indefinite" values="0 0; 10 8; 0 0" />
          </rect>
          <rect x="359" y="198" width="84" height="8" rx="4">
            <animateTransform attributeName="transform" type="translate" dur="4.2s" repeatCount="indefinite" values="0 0; -5 -7; 0 0" />
          </rect>
        </g>
        <text x="70" y="36" fill="#24312f" fontSize="15" fontWeight="700">ADN intact theorique</text>
        <text x="70" y="232" fill="#24312f" fontSize="15" fontWeight="700">ADN ancien: fragments courts, dommages, melange microbien</text>
      </svg>
    </article>
  );
}

function LineageSchema() {
  return (
    <article className="rounded-lg border border-black/10 bg-paper p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <GitBranch className="h-5 w-5 text-lagoon" aria-hidden="true" />
        <h2 className="text-xl font-bold">Mitochondries, noyau et chromosome Y</h2>
      </div>
      <div className="mt-4 grid gap-3">
        <div className="rounded-lg border border-black/10 bg-white p-4">
          <p className="text-sm font-bold text-ochre">ADN mitochondrial</p>
          <div className="mt-3 flex items-center gap-2">
            {['Grand-mere', 'Mere', 'Individu'].map((label) => (
              <span key={label} className="rounded-md bg-clay/15 px-3 py-2 text-xs font-bold text-ink">
                {label}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm leading-6 text-ink/70">Signal abondant, utile pour suivre une lignee maternelle.</p>
        </div>
        <div className="rounded-lg border border-black/10 bg-white p-4">
          <p className="text-sm font-bold text-ochre">Chromosome Y</p>
          <div className="mt-3 flex items-center gap-2">
            {['Grand-pere', 'Pere', 'Individu XY'].map((label) => (
              <span key={label} className="rounded-md bg-lagoon/15 px-3 py-2 text-xs font-bold text-ink">
                {label}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm leading-6 text-ink/70">Signal plus rare, utile pour une partie de la lignee paternelle.</p>
        </div>
      </div>
    </article>
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
