import Fuse from 'fuse.js';
import { buildSearchDocuments } from './content';
import type { SearchDocument } from '../types/domain';

const documents = buildSearchDocuments();

const fuse = new Fuse(documents, {
  keys: [
    { name: 'title', weight: 0.45 },
    { name: 'subtitle', weight: 0.2 },
    { name: 'body', weight: 0.35 }
  ],
  threshold: 0.34,
  ignoreLocation: true,
  includeScore: true
});

export function searchContent(query: string): SearchDocument[] {
  const normalized = query.trim();

  if (normalized.length < 2) {
    return documents.slice(0, 8);
  }

  return fuse.search(normalized).slice(0, 12).map((result) => result.item);
}
