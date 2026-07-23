import type { DemoScenario } from '../engine';
import { onboardingScenario } from './onboarding';

export const demoScenarios = {
  [onboardingScenario.id]: onboardingScenario
} satisfies Record<string, DemoScenario>;

export type KnownDemoScenarioId = keyof typeof demoScenarios;
