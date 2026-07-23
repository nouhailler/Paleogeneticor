import { FastForward, Gauge, Pause, Play, StepForward, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DemoScenarioEngine,
  type DemoCursorPosition,
  type DemoEngine,
  type DemoHighlightState,
  type DemoNarrationState,
  type DemoRuntimeState,
  type DemoScenario,
  type DemoSpeed
} from './engine';
import { demoScenarios } from './scenarios';
import { useLibraryStore } from '../store/libraryStore';

const speedOptions: DemoSpeed[] = [0.5, 1, 1.5, 2];

const initialRuntimeState: DemoRuntimeState = {
  status: 'idle',
  scenarioId: '',
  currentStepIndex: 0,
  totalSteps: 0,
  speed: 1
};

export function DemoPlayer() {
  const location = useLocation();
  const navigate = useNavigate();
  const startDemoSeed = useLibraryStore((state) => state.startDemo);
  const stopDemoSeed = useLibraryStore((state) => state.stopDemo);
  const [scenario, setScenario] = useState<DemoScenario | null>(null);
  const [runtimeState, setRuntimeState] = useState<DemoRuntimeState>(initialRuntimeState);
  const [cursor, setCursor] = useState<DemoCursorPosition | null>(null);
  const [highlight, setHighlight] = useState<DemoHighlightState | null>(null);
  const [narration, setNarration] = useState<DemoNarrationState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const engineRef = useRef<DemoEngine | null>(null);
  const restorePathRef = useRef<string | null>(null);
  const activeScenarioIdRef = useRef<string | null>(null);

  const queryScenarioId = useMemo(() => new URLSearchParams(location.search).get('demo'), [location.search]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener('change', updateMotion);
    return () => media.removeEventListener('change', updateMotion);
  }, []);

  useEffect(() => {
    if (!queryScenarioId) {
      return;
    }

    const nextScenario = demoScenarios[queryScenarioId];
    if (!nextScenario || activeScenarioIdRef.current === nextScenario.id) {
      return;
    }

    restorePathRef.current = getPathWithoutDemoParam(location.pathname, location.search, location.hash);
    activeScenarioIdRef.current = nextScenario.id;
    setScenario(nextScenario);
  }, [location.hash, location.pathname, location.search, queryScenarioId]);

  useEffect(() => {
    if (!scenario) {
      return;
    }

    const engine = new DemoScenarioEngine({
      scenario,
      reducedMotion,
      navigate: (to) => navigate(to),
      getElement: getDemoElement,
      applySeed: (seed) => startDemoSeed(seed),
      restoreAppState: async () => {
        await stopDemoSeed();
        const restorePath = restorePathRef.current;
        if (restorePath && restorePath !== `${location.pathname}${location.search}${location.hash}`) {
          navigate(restorePath, { replace: true });
        }
      },
      onStateChange: setRuntimeState,
      onCursorChange: setCursor,
      onHighlightChange: setHighlight,
      onNarrationChange: setNarration,
      onExit: () => {
        engineRef.current = null;
        activeScenarioIdRef.current = null;
        setScenario(null);
        setCursor(null);
        setHighlight(null);
        setNarration(null);
      },
      onError: (demoError) => setError(demoError.message)
    });

    engineRef.current = engine;
    engine.play();

    return () => {
      if (engineRef.current === engine) {
        engine.exit();
      }
    };
  }, [location.hash, location.pathname, location.search, navigate, reducedMotion, scenario, startDemoSeed, stopDemoSeed]);

  useEffect(() => {
    if (!scenario) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        engineRef.current?.exit();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [scenario]);

  useEffect(() => {
    if (runtimeState.status === 'finished') {
      const timeout = window.setTimeout(() => engineRef.current?.exit(), 900);
      return () => window.clearTimeout(timeout);
    }
  }, [runtimeState.status]);

  if (!scenario) {
    return null;
  }

  return (
    <div className="demo-layer" aria-live="polite">
      {highlight ? <DemoHighlight highlight={highlight} /> : null}
      {narration ? <DemoNarration narration={narration} /> : null}
      {cursor ? <DemoCursor cursor={cursor} reducedMotion={reducedMotion} /> : null}
      <DemoControls
        scenario={scenario}
        runtimeState={runtimeState}
        error={error}
        onPlay={() => engineRef.current?.play()}
        onPause={() => engineRef.current?.pause()}
        onNext={() => engineRef.current?.next()}
        onSpeedChange={(speed) => engineRef.current?.setSpeed(speed)}
        onExit={() => engineRef.current?.exit()}
      />
    </div>
  );
}

export function getDemoScenarioPath(scenarioId = 'onboarding') {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('demo', scenarioId);
  const search = searchParams.toString();
  return `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`;
}

function DemoControls({
  scenario,
  runtimeState,
  error,
  onPlay,
  onPause,
  onNext,
  onSpeedChange,
  onExit
}: {
  scenario: DemoScenario;
  runtimeState: DemoRuntimeState;
  error: string | null;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onSpeedChange: (speed: DemoSpeed) => void;
  onExit: () => void;
}) {
  const isPlaying = runtimeState.status === 'playing';

  return (
    <section className="demo-controls" aria-label="Controle de la demonstration">
      <div className="min-w-0">
        <p className="truncate text-xs font-bold uppercase text-clay">{scenario.title}</p>
        <p className="text-sm font-semibold text-paper">
          Etape {Math.min(runtimeState.currentStepIndex + 1, runtimeState.totalSteps)} / {runtimeState.totalSteps}
        </p>
        {error ? <p className="mt-1 max-w-xs text-xs text-clay">{error}</p> : null}
      </div>
      <div className="flex items-center gap-2">
        <button type="button" className="demo-icon-button" onClick={isPlaying ? onPause : onPlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button type="button" className="demo-icon-button" onClick={onNext} aria-label="Etape suivante">
          <StepForward className="h-4 w-4" />
        </button>
        <label className="demo-speed-control">
          <Gauge className="h-4 w-4" aria-hidden="true" />
          <select
            value={runtimeState.speed}
            onChange={(event) => onSpeedChange(Number(event.target.value) as DemoSpeed)}
            aria-label="Vitesse de la demo"
          >
            {speedOptions.map((speed) => (
              <option key={speed} value={speed}>
                x{speed}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="demo-icon-button" onClick={onExit} aria-label="Quitter la demo">
          <X className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

function DemoCursor({ cursor, reducedMotion }: { cursor: DemoCursorPosition; reducedMotion: boolean }) {
  return (
    <div
      className="demo-cursor"
      data-reduced-motion={reducedMotion ? 'true' : 'false'}
      style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`, opacity: cursor.visible ? 1 : 0 }}
    >
      <FastForward className="h-5 w-5 rotate-45 fill-paper text-ink drop-shadow" aria-hidden="true" />
    </div>
  );
}

function DemoHighlight({ highlight }: { highlight: DemoHighlightState }) {
  const rect = highlight.rect;

  return (
    <>
      <div
        className="demo-highlight-ring"
        style={{
          left: rect.left - 8,
          top: rect.top - 8,
          width: rect.width + 16,
          height: rect.height + 16
        }}
      />
      {highlight.text ? <DemoCallout highlight={highlight} /> : null}
    </>
  );
}

function DemoCallout({ highlight }: { highlight: DemoHighlightState }) {
  const rect = highlight.rect;
  const viewportWidth = window.innerWidth;
  const top = highlight.placement === 'top' ? rect.top - 18 : rect.bottom + 18;
  const left = Math.min(Math.max(rect.left, 16), viewportWidth - 336);

  return (
    <div className="demo-callout" style={{ left, top: Math.max(top, 16) }}>
      {highlight.text}
    </div>
  );
}

function DemoNarration({ narration }: { narration: DemoNarrationState }) {
  return <div className={`demo-narration demo-narration-${narration.placement}`}>{narration.text}</div>;
}

function getDemoElement(target: string) {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(`[data-demo-id="${window.CSS.escape(target)}"]`));
  return elements.find(isVisibleElement) ?? elements[0] ?? null;
}

function isVisibleElement(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0 && window.getComputedStyle(element).visibility !== 'hidden';
}

function getPathWithoutDemoParam(pathname: string, searchValue: string, hash: string) {
  const searchParams = new URLSearchParams(searchValue);
  searchParams.delete('demo');
  const search = searchParams.toString();
  return `${pathname}${search ? `?${search}` : ''}${hash}`;
}
