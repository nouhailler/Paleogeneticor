import type {
  Discovery,
  Fossil,
  GlossaryTerm,
  MapSite,
  SearchDocument,
  Species,
  Technique,
  TimelineEvent
} from '../types/domain';
import discoveriesData from '../data/discoveries/discoveries.json';
import fossilsData from '../data/fossils/fossils.json';
import glossaryData from '../data/glossary/core.json';
import mapSitesData from '../data/maps/sites.json';
import denisovansData from '../data/species/denisova.json';
import neanderthalData from '../data/species/neanderthalensis.json';
import sapiensData from '../data/species/sapiens.json';
import techniquesData from '../data/techniques/techniques.json';
import timelineData from '../data/timeline/events.json';

export const species = [neanderthalData, denisovansData, sapiensData] as Species[];
export const fossils = fossilsData as Fossil[];
export const discoveries = discoveriesData as Discovery[];
export const glossary = glossaryData as GlossaryTerm[];
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
      body: `${item.importance} ${item.museum}`,
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
    }))
  ];
}
