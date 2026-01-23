import { getCategories, getCategory, getPopularCategories, POPULAR_CATEGORIES } from '../categories';

describe('getCategories', () => {
  it('returns all 112 categories', () => {
    const categories = getCategories('en');
    expect(categories).toHaveLength(112);
  });

  it('returns categories with id and name properties', () => {
    const categories = getCategories('en');
    categories.forEach((category) => {
      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('name');
      expect(typeof category.id).toBe('number');
      expect(typeof category.name).toBe('string');
    });
  });

  it('returns categories with IDs from 1 to 112', () => {
    const categories = getCategories('en');
    const ids = categories.map((c) => c.id);
    expect(ids).toEqual(Array.from({ length: 112 }, (_, i) => i + 1));
  });

  it('returns localized names for different languages', () => {
    const enCategories = getCategories('en');
    const ptCategories = getCategories('pt');
    const esCategories = getCategories('es');

    // Arts (id: 1) should be different in each language
    const enArts = enCategories.find((c) => c.id === 1);
    const ptArts = ptCategories.find((c) => c.id === 1);
    const esArts = esCategories.find((c) => c.id === 1);

    expect(enArts?.name).toBe('Arts');
    expect(ptArts?.name).toBe('Artes');
    expect(esArts?.name).toBe('Artes');
  });

  it('returns non-empty names for all categories', () => {
    const languages = ['en', 'pt', 'es', 'fr', 'de'] as const;
    languages.forEach((lang) => {
      const categories = getCategories(lang);
      categories.forEach((category) => {
        expect(category.name.trim()).not.toBe('');
      });
    });
  });
});

describe('getCategory', () => {
  it('returns a category for valid IDs', () => {
    const category = getCategory(1, 'en');
    expect(category).toBeDefined();
    expect(category?.id).toBe(1);
    expect(category?.name).toBe('Arts');
  });

  it('returns undefined for ID less than 1', () => {
    expect(getCategory(0, 'en')).toBeUndefined();
    expect(getCategory(-1, 'en')).toBeUndefined();
  });

  it('returns undefined for ID greater than 112', () => {
    expect(getCategory(113, 'en')).toBeUndefined();
    expect(getCategory(1000, 'en')).toBeUndefined();
  });

  it('returns boundary categories correctly', () => {
    const first = getCategory(1, 'en');
    const last = getCategory(112, 'en');

    expect(first?.id).toBe(1);
    expect(last?.id).toBe(112);
  });

  it('returns localized names', () => {
    const enCategory = getCategory(16, 'en'); // Comedy
    const ptCategory = getCategory(16, 'pt');
    const frCategory = getCategory(16, 'fr');

    expect(enCategory?.name).toBe('Comedy');
    expect(ptCategory?.name).toBe('Comédia');
    expect(frCategory?.name).toBe('Comédie');
  });
});

describe('getPopularCategories', () => {
  it('returns only popular categories', () => {
    const popular = getPopularCategories('en');
    expect(popular.length).toBe(POPULAR_CATEGORIES.length);
    expect(popular.length).toBe(17);
  });

  it('returns categories in the correct order', () => {
    const popular = getPopularCategories('en');
    const ids = popular.map((c) => c.id);
    expect(ids).toEqual(POPULAR_CATEGORIES);
  });

  it('returns localized popular categories', () => {
    const enPopular = getPopularCategories('en');
    const ptPopular = getPopularCategories('pt');

    // True Crime (id: 103) should be first
    expect(enPopular[0].name).toBe('True Crime');
    expect(ptPopular[0].name).toBe('Crime Real');
  });

  it('returns categories with id and name properties', () => {
    const popular = getPopularCategories('en');
    popular.forEach((category) => {
      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('name');
    });
  });

  it('contains expected popular categories', () => {
    const popular = getPopularCategories('en');
    const names = popular.map((c) => c.name);

    expect(names).toContain('True Crime');
    expect(names).toContain('Comedy');
    expect(names).toContain('News');
    expect(names).toContain('Science');
    expect(names).toContain('Technology');
  });
});

describe('POPULAR_CATEGORIES constant', () => {
  it('contains 17 category IDs', () => {
    expect(POPULAR_CATEGORIES).toHaveLength(17);
  });

  it('contains only valid category IDs (1-112)', () => {
    POPULAR_CATEGORIES.forEach((id) => {
      expect(id).toBeGreaterThanOrEqual(1);
      expect(id).toBeLessThanOrEqual(112);
    });
  });

  it('contains no duplicates', () => {
    const uniqueIds = new Set(POPULAR_CATEGORIES);
    expect(uniqueIds.size).toBe(POPULAR_CATEGORIES.length);
  });
});
