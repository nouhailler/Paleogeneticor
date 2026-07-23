import type { DemoScenario } from '../engine';

export const onboardingScenario: DemoScenario = {
  id: 'onboarding',
  title: 'Decouvrir Paleogeneticor',
  description: "Parcours guide des principales zones de l'application.",
  seed: {
    favorites: [
      {
        entityType: 'species',
        entityId: 'homo-neanderthalensis',
        title: 'Homo neanderthalensis',
        path: '/species/homo-neanderthalensis'
      }
    ],
    history: [
      {
        path: '/dna',
        title: 'ADN ancien'
      }
    ]
  },
  steps: [
    {
      type: 'navigate',
      to: '/',
      waitFor: 'home-hero'
    },
    {
      type: 'highlight',
      target: 'home-hero',
      text: "La page d'accueil ouvre les grands themes: especes, ADN ancien, cartes et chronologie.",
      durationMs: 2100
    },
    {
      type: 'click',
      target: 'home-species-link'
    },
    {
      type: 'highlight',
      target: 'species-grid',
      text: 'Les fiches permettent de comparer les especes humaines documentees.',
      durationMs: 1900
    },
    {
      type: 'click',
      target: 'species-card-homo-neanderthalensis'
    },
    {
      type: 'highlight',
      target: 'species-detail-summary',
      text: 'Chaque fiche combine portrait, chronologie, repartition et sections detaillees.',
      durationMs: 2100
    },
    {
      type: 'highlight',
      target: 'species-detail-identity',
      text: "La fiche d'identite rassemble les donnees scientifiques utiles pour une lecture rapide.",
      durationMs: 1900
    },
    {
      type: 'navigate',
      to: '/dna',
      waitFor: 'dna-primer'
    },
    {
      type: 'highlight',
      target: 'dna-primer',
      text: "Le module ADN explique pourquoi l'information ancienne est fragmentee et fragile.",
      durationMs: 2100
    },
    {
      type: 'highlight',
      target: 'dna-workflow',
      text: "Le parcours laboratoire va de l'os ou de la dent jusqu'a la donnee numerique interpretable.",
      durationMs: 2200
    },
    {
      type: 'narrate',
      text: 'Fin de la demonstration. Vous pouvez relancer le mode demo depuis le menu.',
      durationMs: 1800
    }
  ]
};
