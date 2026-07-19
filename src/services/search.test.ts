import { describe, expect, it } from 'vitest';
import { searchContent } from './search';

describe('searchContent', () => {
  it('finds species from genetics vocabulary', () => {
    const results = searchContent('introgression');

    expect(results.some((item) => item.id === 'homo-neanderthalensis')).toBe(true);
  });

  it('returns curated initial documents for short queries', () => {
    expect(searchContent('')).not.toHaveLength(0);
  });
});
