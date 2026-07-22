export type EntityKind =
  | 'species'
  | 'fossil'
  | 'researcher'
  | 'laboratory'
  | 'migration'
  | 'timeline'
  | 'discovery'
  | 'glossary'
  | 'technique';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface BibliographyEntry {
  label: string;
  year: number;
  source: string;
}

export interface Species {
  id: string;
  name: string;
  period: string;
  image: string;
  rangeStartKya: number;
  rangeEndKya: number;
  region: string;
  summary: string;
  genetics: string;
  culture: string[];
  tools: string[];
  hybridations: string[];
  traits: SpeciesTraits;
  detailedSections: SpeciesDetailedSections;
  coordinates: Coordinates[];
  bibliography: BibliographyEntry[];
}

export interface SpeciesTraits {
  height: string;
  weight: string;
  cranialCapacity: string;
  dnaRecovered: string;
  parentage: string;
  diet: string;
  fire: string;
  burials: string;
}

export interface SpeciesDetailTopic {
  title: string;
  summary: string;
  details: string[];
  evidence: string;
}

export interface SpeciesMetric {
  label: string;
  value: number;
  note: string;
}

export interface SpeciesSectionMedia {
  image: string;
  alt: string;
  caption: string;
  credit: string;
  sourceUrl: string;
}

export interface SpeciesDetailedSection {
  intro: string;
  media: SpeciesSectionMedia;
  highlights: string[];
  topics: SpeciesDetailTopic[];
  metrics: SpeciesMetric[];
}

export interface SpeciesDetailedSections {
  genetics: SpeciesDetailedSection;
  culture: SpeciesDetailedSection;
  landmarks: SpeciesDetailedSection;
  tools: SpeciesDetailedSection;
}

export interface Fossil {
  id: string;
  name: string;
  speciesId: string;
  discoveredYear: number;
  location: string;
  coordinates: Coordinates;
  museum: string;
  importance: string;
  period: string;
  image: string;
  imageCredit: string;
  imageSource: string;
  scan3d: string;
  discoveryStory: string[];
  scientificDetails: string[];
  publications: BibliographyEntry[];
}

export interface Discovery {
  id: string;
  title: string;
  year: number;
  category: string;
  summary: string;
  details: string[];
  impact: string;
  sources: BibliographyEntry[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  image: string;
  details: string[];
  example: string;
}

export interface Technique {
  id: string;
  name: string;
  year: number;
  summary: string;
  impact: string;
  image: string;
  category: string;
  whyItMatters: string;
  steps: {
    title: string;
    description: string;
  }[];
  ancientDnaRole: string[];
  contaminationRisks: string[];
  safeguards: string[];
  comparison: {
    label: string;
    before: string;
    after: string;
  }[];
  keyFigures: string[];
}

export interface LaboratoryProfile {
  id: string;
  name: string;
  shortName: string;
  city: string;
  country: string;
  coordinates: Coordinates;
  officialUrl: string;
  period: string;
  specialty: string;
  summary: string;
  teamModel: string;
  researchers: {
    name: string;
    role: string;
    contribution: string;
  }[];
  discoveries: {
    title: string;
    year: number;
    explanation: string;
  }[];
  publications: BibliographyEntry[];
}

export interface MapSite {
  id: string;
  name: string;
  kind: 'site' | 'museum' | 'laboratory';
  coordinates: Coordinates;
  region: string;
  period: string;
  summary: string;
  details: string[];
  importance: string;
  evidence: string;
  relatedEntityId?: string;
}

export type MigrationPopulation = 'sapiens' | 'neanderthal' | 'denisovan';

export interface MigrationRoute {
  id: string;
  population: MigrationPopulation;
  title: string;
  period: string;
  summary: string;
  explanation: string;
  path: Coordinates[];
  evidence: string[];
}

export interface MigrationSite {
  id: string;
  name: string;
  population: MigrationPopulation | 'shared';
  coordinates: Coordinates;
  region: string;
  period: string;
  summary: string;
  details: string[];
  importance: string;
  relatedPath?: string;
}

export interface MigrationDataset {
  routes: MigrationRoute[];
  sites: MigrationSite[];
}

export interface TimePeriod {
  id: string;
  name: string;
  startKya: number;
  endKya: number;
  summary: string;
  context: string[];
  keyExamples: string[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  dateKya?: number;
  year?: number;
  category: 'species' | 'climate' | 'migration' | 'innovation' | 'publication';
  summary: string;
  details: string[];
  impact: string;
  evidence: string;
  relatedPath: string;
}

export interface SearchDocument {
  id: string;
  kind: EntityKind;
  title: string;
  subtitle: string;
  body: string;
  path: string;
}
