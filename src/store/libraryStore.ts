import { create } from 'zustand';
import { db, type FavoriteRecord, type HistoryRecord } from '../services/db';

interface LibraryState {
  favorites: FavoriteRecord[];
  history: HistoryRecord[];
  hydrate: () => Promise<void>;
  toggleFavorite: (favorite: Omit<FavoriteRecord, 'id' | 'createdAt'>) => Promise<void>;
  recordVisit: (path: string, title: string) => Promise<void>;
}

export const useLibraryStore = create<LibraryState>((set, get) => ({
  favorites: [],
  history: [],
  hydrate: async () => {
    const [favorites, history] = await Promise.all([
      db.favorites.orderBy('createdAt').reverse().toArray(),
      db.history.orderBy('visitedAt').reverse().limit(20).toArray()
    ]);
    set({ favorites, history });
  },
  toggleFavorite: async (favorite) => {
    const id = `${favorite.entityType}:${favorite.entityId}`;
    const existing = get().favorites.some((item) => item.id === id);

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
    await db.history.put({
      id: path,
      path,
      title,
      visitedAt: new Date().toISOString()
    });
    await get().hydrate();
  }
}));
