export function formatKya(value: number): string {
  if (value === 0) {
    return "aujourd'hui";
  }

  return `${value.toLocaleString('fr-FR')} ka`;
}

export function entityLabel(kind: string): string {
  const labels: Record<string, string> = {
    species: 'Espece',
    fossil: 'Fossile',
    researcher: 'Chercheur',
    laboratory: 'Laboratoire',
    migration: 'Migration',
    timeline: 'Frise',
    discovery: 'Decouverte',
    glossary: 'Glossaire',
    technique: 'Technique'
  };

  return labels[kind] ?? kind;
}
