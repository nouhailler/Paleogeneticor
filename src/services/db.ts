import Dexie, { type EntityTable } from 'dexie';

export interface FavoriteRecord {
  id: string;
  entityId: string;
  entityType: string;
  title: string;
  createdAt: string;
}

export interface HistoryRecord {
  id: string;
  path: string;
  title: string;
  visitedAt: string;
}

export interface PreferenceRecord {
  key: string;
  value: unknown;
}

export const db = new Dexie('paleogeneticor') as Dexie & {
  favorites: EntityTable<FavoriteRecord, 'id'>;
  history: EntityTable<HistoryRecord, 'id'>;
  preferences: EntityTable<PreferenceRecord, 'key'>;
};

db.version(1).stores({
  favorites: 'id, entityId, entityType, createdAt',
  history: 'id, path, visitedAt',
  preferences: 'key'
});
