import { create } from 'zustand';
import { db, type FavoriteRecord, type HistoryRecord } from '../services/db';
import type { DemoSeed } from '../demo/engine';

interface LibraryState {
  favorites: FavoriteRecord[];
  history: HistoryRecord[];
  isDemo: boolean;
  hydrate: () => Promise<void>;
  toggleFavorite: (favorite: Omit<FavoriteRecord, 'id' | 'createdAt'>) => Promise<void>;
  recordVisit: (path: string, title: string) => Promise<void>;
  startDemo: (seed: DemoSeed) => Promise<void>;
  stopDemo: () => Promise<void>;
}

export const useLibraryStore = create<LibraryState>((set, get) => ({
  favorites: [],
  history: [],
  isDemo: false,
  hydrate: async () => {
    const [favorites, history] = await Promise.all([
      db.favorites.orderBy('createdAt').reverse().toArray(),
      db.history.orderBy('visitedAt').reverse().limit(20).toArray()
    ]);
    if (get().isDemo) {
      return;
    }
    set({ favorites, history });
  },
  toggleFavorite: async (favorite) => {
    const id = `${favorite.entityType}:${favorite.entityId}`;
    const existing = get().favorites.some((item) => item.id === id);

    if (get().isDemo) {
      set((state) => ({
        favorites: existing
          ? state.favorites.filter((item) => item.id !== id)
          : [
              {
                ...favorite,
                id,
                createdAt: new Date().toISOString()
              },
              ...state.favorites
            ]
      }));
      return;
    }

    if (existing) {
      await db.favorites.delete(id);
    } else {
      await db.favorites.put({
        ...favorite,
        id,
        createdAt: new Date().toISOString()
      });
    }

    await get().hydrate();
  },
  recordVisit: async (path, title) => {
    if (get().isDemo) {
      set((state) => ({
        history: [
          {
            id: path,
            path,
            title,
            visitedAt: new Date().toISOString()
          },
          ...state.history.filter((item) => item.id !== path)
        ].slice(0, 20)
      }));
      return;
    }

    await db.history.put({
      id: path,
      path,
      title,
      visitedAt: new Date().toISOString()
    });
    await get().hydrate();
  },
  startDemo: async (seed) => {
    const now = new Date().toISOString();
    set({
      isDemo: true,
      favorites:
        seed.favorites?.map((favorite) => ({
          id: `${favorite.entityType}:${favorite.entityId}`,
          entityId: favorite.entityId,
          entityType: favorite.entityType,
          title: favorite.title,
          createdAt: now
        })) ?? [],
      history:
        seed.history?.map((history) => ({
          id: history.path,
          path: history.path,
          title: history.title,
          visitedAt: now
        })) ?? []
    });
  },
  stopDemo: async () => {
    set({ isDemo: false });
    await get().hydrate();
  }
}));
