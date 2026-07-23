export type DemoScenarioId = string;
export type DemoTargetId = string;

export type DemoSpeed = 0.5 | 1 | 1.5 | 2;

export interface DemoScenario {
  id: DemoScenarioId;
  title: string;
  description?: string;
  seed?: DemoSeed;
  steps: DemoStep[];
}

export interface DemoSeed {
  favorites?: DemoFavoriteSeed[];
  history?: DemoHistorySeed[];
}

export interface DemoFavoriteSeed {
  entityType: string;
  entityId: string;
  title: string;
  path?: string;
}

export interface DemoHistorySeed {
  path: string;
  title: string;
}

export type DemoStep =
  | DemoNavigateStep
  | DemoClickStep
  | DemoTypeStep
  | DemoWaitStep
  | DemoHighlightStep
  | DemoNarrateStep;

interface DemoBaseStep {
  id?: string;
  label?: string;
  durationMs?: number;
}

export interface DemoNavigateStep extends DemoBaseStep {
  type: 'navigate';
  to: string;
  waitFor?: DemoTargetId;
}

export interface DemoClickStep extends DemoBaseStep {
  type: 'click';
  target: DemoTargetId;
}

export interface DemoTypeStep extends DemoBaseStep {
  type: 'type';
  target: DemoTargetId;
  text: string;
  clearBefore?: boolean;
  submit?: boolean;
}

export interface DemoWaitStep extends DemoBaseStep {
  type: 'wait';
  ms: number;
}

export interface DemoHighlightStep extends DemoBaseStep {
  type: 'highlight';
  target: DemoTargetId;
  text?: string;
  placement?: DemoOverlayPlacement;
}

export interface DemoNarrateStep extends DemoBaseStep {
  type: 'narrate';
  text: string;
  placement?: DemoOverlayPlacement;
}

export type DemoOverlayPlacement = 'top' | 'right' | 'bottom' | 'left' | 'center' | 'auto';

export interface DemoEngineOptions {
  scenario: DemoScenario;
  navigate: (to: string) => void | Promise<void>;
  getElement: (target: DemoTargetId) => HTMLElement | null;
  applySeed?: (seed: DemoSeed) => void | Promise<void>;
  restoreAppState?: () => void | Promise<void>;
  speed?: DemoSpeed;
  reducedMotion?: boolean;
  onStateChange?: (state: DemoRuntimeState) => void;
  onStepChange?: (step: DemoStep, index: number) => void;
  onCursorChange?: (position: DemoCursorPosition | null) => void;
  onHighlightChange?: (highlight: DemoHighlightState | null) => void;
  onNarrationChange?: (narration: DemoNarrationState | null) => void;
  onExit?: () => void;
  onError?: (error: DemoEngineError) => void;
}

export interface DemoRuntimeState {
  status: 'idle' | 'playing' | 'paused' | 'finished' | 'exiting' | 'error';
  scenarioId: DemoScenarioId;
  currentStepIndex: number;
  totalSteps: number;
  speed: DemoSpeed;
}

export interface DemoCursorPosition {
  x: number;
  y: number;
  visible: boolean;
}

export interface DemoHighlightState {
  target?: DemoTargetId;
  rect: DOMRect;
  text?: string;
  placement: DemoOverlayPlacement;
}

export interface DemoNarrationState {
  text: string;
  placement: DemoOverlayPlacement;
}

export interface DemoEngine {
  play: () => void;
  pause: () => void;
  next: () => void;
  setSpeed: (speed: DemoSpeed) => void;
  exit: () => void;
  getState: () => DemoRuntimeState;
}

export interface DemoEngineError {
  code: 'target-not-found' | 'navigation-timeout' | 'step-failed' | 'scenario-cancelled';
  message: string;
  step?: DemoStep;
  target?: DemoTargetId;
}

const DEFAULT_STEP_DURATION_MS = 1300;
const TARGET_TIMEOUT_MS = 5000;

export class DemoScenarioEngine implements DemoEngine {
  private readonly options: DemoEngineOptions;
  private readonly abortController = new AbortController();
  private state: DemoRuntimeState;
  private isRunning = false;
  private skipRequested = false;
  private lastCursorPosition: DemoCursorPosition | null = null;

  constructor(options: DemoEngineOptions) {
    this.options = options;
    this.state = {
      status: 'idle',
      scenarioId: options.scenario.id,
      currentStepIndex: 0,
      totalSteps: options.scenario.steps.length,
      speed: options.speed ?? 1
    };
    this.emitState();
  }

  play() {
    if (this.state.status === 'finished' || this.state.status === 'exiting') {
      return;
    }

    this.setStatus('playing');
    void this.run();
  }

  pause() {
    if (this.state.status !== 'playing') {
      return;
    }

    this.setStatus('paused');
  }

  next() {
    if (this.state.status === 'finished' || this.state.status === 'exiting') {
      return;
    }

    this.skipRequested = true;
    if (this.state.status !== 'playing') {
      this.setStatus('playing');
      void this.run();
    }
  }

  setSpeed(speed: DemoSpeed) {
    this.state = { ...this.state, speed };
    this.emitState();
  }

  exit() {
    if (this.state.status === 'exiting') {
      return;
    }

    this.abortController.abort();
    this.setStatus('exiting');
    this.clearVisuals();
    void Promise.resolve(this.options.restoreAppState?.()).finally(() => {
      this.options.onExit?.();
    });
  }

  getState() {
    return this.state;
  }

  private async run() {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;

    try {
      if (this.state.currentStepIndex === 0 && this.options.scenario.seed) {
        await this.options.applySeed?.(this.options.scenario.seed);
      }

      while (this.state.status === 'playing' && this.state.currentStepIndex < this.options.scenario.steps.length) {
        const step = this.options.scenario.steps[this.state.currentStepIndex];
        this.options.onStepChange?.(step, this.state.currentStepIndex);
        await this.executeStep(step);

        if (this.state.status === 'playing') {
          this.state = { ...this.state, currentStepIndex: this.state.currentStepIndex + 1 };
          this.emitState();
        }
      }

      if (this.state.currentStepIndex >= this.options.scenario.steps.length && this.state.status === 'playing') {
        this.setStatus('finished');
      }
    } catch (error) {
      if (!this.abortController.signal.aborted) {
        this.fail({
          code: 'step-failed',
          message: error instanceof Error ? error.message : 'Etape de demo impossible a executer.'
        });
      }
    } finally {
      this.isRunning = false;
    }
  }

  private async executeStep(step: DemoStep) {
    this.skipRequested = false;

    switch (step.type) {
      case 'navigate':
        this.clearVisuals();
        await this.options.navigate(step.to);
        if (step.waitFor) {
          await this.waitForElement(step.waitFor, step);
        } else {
          await this.delay(450);
        }
        break;
      case 'click':
        await this.pointAt(step.target, step);
        this.options.getElement(step.target)?.click();
        await this.delay(step.durationMs ?? 650);
        break;
      case 'type':
        await this.typeInto(step);
        break;
      case 'wait':
        await this.delay(step.ms);
        break;
      case 'highlight':
        await this.highlight(step);
        break;
      case 'narrate':
        this.options.onHighlightChange?.(null);
        this.options.onNarrationChange?.({ text: step.text, placement: step.placement ?? 'center' });
        await this.delay(step.durationMs ?? DEFAULT_STEP_DURATION_MS);
        break;
      default:
        assertNever(step);
    }
  }

  private async typeInto(step: DemoTypeStep) {
    const element = await this.waitForElement(step.target, step);
    await this.moveCursorToElement(element);
    element.focus();

    if (!isTextInput(element)) {
      throw new Error(`La cible ${step.target} ne peut pas recevoir de texte.`);
    }

    if (step.clearBefore) {
      element.value = '';
      element.dispatchEvent(new Event('input', { bubbles: true }));
    }

    if (this.options.reducedMotion) {
      element.value += step.text;
      element.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
      for (const character of step.text) {
        element.value += character;
        element.dispatchEvent(new Event('input', { bubbles: true }));
        await this.delay(45);
      }
    }

    if (step.submit) {
      element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    }

    await this.delay(step.durationMs ?? 500);
  }

  private async highlight(step: DemoHighlightStep) {
    const element = await this.waitForElement(step.target, step);
    await this.moveCursorToElement(element);
    this.options.onNarrationChange?.(null);
    this.options.onHighlightChange?.({
      target: step.target,
      rect: element.getBoundingClientRect(),
      text: step.text,
      placement: step.placement ?? 'auto'
    });
    await this.delay(step.durationMs ?? DEFAULT_STEP_DURATION_MS);
  }

  private async pointAt(target: DemoTargetId, step: DemoStep) {
    const element = await this.waitForElement(target, step);
    await this.moveCursorToElement(element);
    this.options.onHighlightChange?.({
      target,
      rect: element.getBoundingClientRect(),
      placement: 'auto'
    });
  }

  private async moveCursorToElement(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const nextPosition = {
      x: rect.left + rect.width / 2,
      y: rect.top + Math.min(rect.height / 2, 42),
      visible: true
    };

    if (this.options.reducedMotion || !this.lastCursorPosition) {
      this.lastCursorPosition = nextPosition;
      this.options.onCursorChange?.(nextPosition);
      return;
    }

    const start = this.lastCursorPosition;
    const duration = 360 / this.state.speed;
    const startedAt = performance.now();

    while (performance.now() - startedAt < duration) {
      this.throwIfAborted();
      if (this.skipRequested) {
        break;
      }
      const progress = Math.min((performance.now() - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.lastCursorPosition = {
        x: start.x + (nextPosition.x - start.x) * eased,
        y: start.y + (nextPosition.y - start.y) * eased,
        visible: true
      };
      this.options.onCursorChange?.(this.lastCursorPosition);
      await animationFrame();
    }

    this.lastCursorPosition = nextPosition;
    this.options.onCursorChange?.(nextPosition);
  }

  private async waitForElement(target: DemoTargetId, step: DemoStep) {
    const startedAt = performance.now();

    while (performance.now() - startedAt < TARGET_TIMEOUT_MS) {
      this.throwIfAborted();
      const element = this.options.getElement(target);
      if (element) {
        element.scrollIntoView({ behavior: this.options.reducedMotion ? 'auto' : 'smooth', block: 'center', inline: 'center' });
        await this.delay(this.options.reducedMotion ? 80 : 260);
        return element;
      }
      await this.delay(100);
    }

    this.fail({
      code: 'target-not-found',
      message: `Element data-demo-id="${target}" introuvable.`,
      step,
      target
    });
    throw new Error(`Element data-demo-id="${target}" introuvable.`);
  }

  private async delay(ms: number) {
    const effectiveMs = ms / this.state.speed;
    const startedAt = performance.now();

    while (performance.now() - startedAt < effectiveMs) {
      this.throwIfAborted();

      if (this.skipRequested) {
        this.skipRequested = false;
        return;
      }

      while (this.state.status === 'paused') {
        this.throwIfAborted();
        await new Promise((resolve) => window.setTimeout(resolve, 80));
      }

      await new Promise((resolve) => window.setTimeout(resolve, 40));
    }
  }

  private throwIfAborted() {
    if (this.abortController.signal.aborted) {
      throw new Error('Scenario demo annule.');
    }
  }

  private fail(error: DemoEngineError) {
    this.state = { ...this.state, status: 'error' };
    this.emitState();
    this.options.onError?.(error);
  }

  private setStatus(status: DemoRuntimeState['status']) {
    this.state = { ...this.state, status };
    this.emitState();
  }

  private emitState() {
    this.options.onStateChange?.(this.state);
  }

  private clearVisuals() {
    this.options.onCursorChange?.(null);
    this.options.onHighlightChange?.(null);
    this.options.onNarrationChange?.(null);
  }
}

function isTextInput(element: HTMLElement): element is HTMLInputElement | HTMLTextAreaElement {
  return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;
}

function animationFrame() {
  return new Promise((resolve) => window.requestAnimationFrame(resolve));
}

function assertNever(value: never): never {
  throw new Error(`Type d'etape demo inconnu: ${String(value)}`);
}
