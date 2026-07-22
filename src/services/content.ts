import type {
  Discovery,
  Fossil,
  GlossaryTerm,
  LaboratoryProfile,
  MapSite,
  SearchDocument,
  Species,
  Technique,
  TimelineEvent
} from '../types/domain';
import discoveriesData from '../data/discoveries/discoveries.json';
import fossilsData from '../data/fossils/fossils.json';
import glossaryData from '../data/glossary/core.json';
import laboratoriesData from '../data/laboratories/laboratories.json';
import mapSitesData from '../data/maps/sites.json';
import { speciesCatalog } from '../data/species/catalog';
import techniquesData from '../data/techniques/techniques.json';
import timelineData from '../data/timeline/events.json';

export const species = speciesCatalog as Species[];
export const fossils = fossilsData as Fossil[];
export const discoveries = discoveriesData as Discovery[];
export const glossary = glossaryData as GlossaryTerm[];
export const laboratories = laboratoriesData as LaboratoryProfile[];
export const mapSites = mapSitesData as MapSite[];
export const techniques = techniquesData as Technique[];
export const timelineEvents = timelineData as TimelineEvent[];

export function getSpeciesById(id: string): Species | undefined {
  return species.find((item) => item.id === id);
}

export function getDiscoveryOfTheDay(date = new Date()): Discovery {
  const index = Math.abs(date.getFullYear() + date.getMonth() + date.getDate()) % discoveries.length;
  return discoveries[index];
}

export function getDiscoveryById(id: string): Discovery | undefined {
  return discoveries.find((item) => item.id === id);
}

export function getGlossaryTermById(id: string): GlossaryTerm | undefined {
  return glossary.find((item) => item.id === id);
}

export function buildSearchDocuments(): SearchDocument[] {
  return [
    ...species.map((item) => ({
      id: item.id,
      kind: 'species' as const,
      title: item.name,
      subtitle: item.region,
      body: `${item.summary} ${item.genetics} ${item.culture.join(' ')} ${item.tools.join(' ')}`,
      path: `/species/${item.id}`
    })),
    ...fossils.map((item) => ({
      id: item.id,
      kind: 'fossil' as const,
      title: item.name,
      subtitle: item.location,
      body: `${item.period} ${item.importance} ${item.museum} ${item.scan3d} ${item.discoveryStory.join(' ')} ${item.scientificDetails.join(' ')} ${item.publications
        .map((publication) => `${publication.label} ${publication.year} ${publication.source}`)
        .join(' ')}`,
      path: '/fossils'
    })),
    ...discoveries.map((item) => ({
      id: item.id,
      kind: 'discovery' as const,
      title: item.title,
      subtitle: String(item.year),
      body: `${item.category} ${item.summary} ${item.details.join(' ')} ${item.impact}`,
      path: `/discoveries/${item.id}`
    })),
    ...laboratories.map((item) => ({
      id: item.id,
      kind: 'laboratory' as const,
      title: item.name,
      subtitle: `${item.city}, ${item.country}`,
      body: `${item.shortName} ${item.specialty} ${item.summary} ${item.teamModel} ${item.researchers
        .map((researcher) => `${researcher.name} ${researcher.role} ${researcher.contribution}`)
        .join(' ')} ${item.discoveries
        .map((discovery) => `${discovery.title} ${discovery.year} ${discovery.explanation}`)
        .join(' ')} ${item.publications.map((publication) => `${publication.label} ${publication.year}`).join(' ')}`,
      path: '/laboratories'
    })),
    ...glossary.map((item) => ({
      id: item.id,
      kind: 'glossary' as const,
      title: item.term,
      subtitle: item.category,
      body: `${item.definition} ${item.details.join(' ')} ${item.example}`,
      path: `/glossary/${item.id}`
    })),
    ...techniques.map((item) => ({
      id: item.id,
      kind: 'technique' as const,
      title: item.name,
      subtitle: String(item.year),
      body: `${item.summary} ${item.impact}`,
      path: '/dna'
    })),
    {
      id: 'bone-to-dna',
      kind: 'technique' as const,
      title: "De l'os a l'ADN",
      subtitle: 'Module pas a pas',
      body:
        "Extraction dent os petreux salle blanche contamination moderne sequencage fragments ADN ancien aDNA donnees numeriques bioinformatique alignement genome reference dommages controles",
      path: '/bone-to-dna'
    }
  ];
}
