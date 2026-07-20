export type EntityKind =
  | 'species'
  | 'fossil'
  | 'researcher'
  | 'laboratory'
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
  rangeStartKya: number;
  rangeEndKya: number;
  region: string;
  summary: string;
  genetics: string;
  culture: string[];
  tools: string[];
  hybridations: string[];
  coordinates: Coordinates[];
  bibliography: BibliographyEntry[];
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
}

export interface Technique {
  id: string;
  name: string;
  year: number;
  summary: string;
  impact: string;
}

export interface MapSite {
  id: string;
  name: string;
  kind: 'site' | 'museum' | 'laboratory';
  coordinates: Coordinates;
  summary: string;
  relatedEntityId?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  dateKya?: number;
  year?: number;
  category: 'species' | 'climate' | 'migration' | 'innovation' | 'publication';
  summary: string;
}

export interface SearchDocument {
  id: string;
  kind: EntityKind;
  title: string;
  subtitle: string;
  body: string;
  path: string;
}
