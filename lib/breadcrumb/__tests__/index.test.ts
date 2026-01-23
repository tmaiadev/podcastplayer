import {
  parseBreadcrumbParams,
  buildBreadcrumbTrail,
  buildPodcastUrl,
  buildEpisodeUrl,
} from '../index';

describe('parseBreadcrumbParams', () => {
  it('parses valid origin "home"', () => {
    const result = parseBreadcrumbParams({ from: 'home' });
    expect(result.from).toBe('home');
  });

  it('parses valid origin "category"', () => {
    const result = parseBreadcrumbParams({ from: 'category', catId: '16' });
    expect(result.from).toBe('category');
    expect(result.catId).toBe(16);
  });

  it('parses valid origin "search"', () => {
    const result = parseBreadcrumbParams({ from: 'search', q: 'test query' });
    expect(result.from).toBe('search');
    expect(result.q).toBe('test query');
  });

  it('parses valid origin "subscriptions"', () => {
    const result = parseBreadcrumbParams({ from: 'subscriptions' });
    expect(result.from).toBe('subscriptions');
  });

  it('returns undefined for invalid origin', () => {
    const result = parseBreadcrumbParams({ from: 'invalid' });
    expect(result.from).toBeUndefined();
  });

  it('validates catId range (1-112)', () => {
    expect(parseBreadcrumbParams({ catId: '1' }).catId).toBe(1);
    expect(parseBreadcrumbParams({ catId: '112' }).catId).toBe(112);
    expect(parseBreadcrumbParams({ catId: '0' }).catId).toBeUndefined();
    expect(parseBreadcrumbParams({ catId: '113' }).catId).toBeUndefined();
    expect(parseBreadcrumbParams({ catId: '-1' }).catId).toBeUndefined();
  });

  it('returns undefined catId for non-numeric strings', () => {
    expect(parseBreadcrumbParams({ catId: 'abc' }).catId).toBeUndefined();
    expect(parseBreadcrumbParams({ catId: '' }).catId).toBeUndefined();
  });

  it('handles empty search params', () => {
    const result = parseBreadcrumbParams({});
    expect(result.from).toBeUndefined();
    expect(result.catId).toBeUndefined();
    expect(result.q).toBeUndefined();
  });

  it('handles array values for catId', () => {
    // When catId is an array, it should return undefined
    const result = parseBreadcrumbParams({ catId: ['1', '2'] });
    expect(result.catId).toBeUndefined();
  });

  it('handles empty query string', () => {
    const result = parseBreadcrumbParams({ q: '' });
    expect(result.q).toBeUndefined();
  });
});

describe('buildBreadcrumbTrail', () => {
  it('always starts with Home', () => {
    const trail = buildBreadcrumbTrail({
      language: 'en',
      params: {},
    });
    expect(trail[0]).toEqual({
      label: 'Home',
      href: '/en',
    });
  });

  it('uses localized Home label', () => {
    const ptTrail = buildBreadcrumbTrail({
      language: 'pt',
      params: {},
    });
    expect(ptTrail[0].label).toBe('Início');

    const deTrail = buildBreadcrumbTrail({
      language: 'de',
      params: {},
    });
    expect(deTrail[0].label).toBe('Startseite');
  });

  it('adds category breadcrumb when from=category', () => {
    const trail = buildBreadcrumbTrail({
      language: 'en',
      params: { from: 'category', catId: 16 }, // Comedy
    });
    expect(trail).toHaveLength(2);
    expect(trail[1]).toEqual({
      label: 'Comedy',
      href: '/en/cat/16',
    });
  });

  it('adds search breadcrumb when from=search', () => {
    const trail = buildBreadcrumbTrail({
      language: 'en',
      params: { from: 'search', q: 'test query' },
    });
    expect(trail).toHaveLength(2);
    expect(trail[1]).toEqual({
      label: 'Search: "test query"',
      href: '/en/search?q=test%20query',
    });
  });

  it('adds podcast without link when viewing podcast page', () => {
    const trail = buildBreadcrumbTrail({
      language: 'en',
      params: {},
      podcastTitle: 'My Podcast',
    });
    expect(trail[1]).toEqual({
      label: 'My Podcast',
    });
    expect(trail[1].href).toBeUndefined();
  });

  it('adds podcast with link when viewing episode page', () => {
    const trail = buildBreadcrumbTrail({
      language: 'en',
      params: { from: 'home' },
      podcastTitle: 'My Podcast',
      podcastId: 123,
      episodeTitle: 'Episode 1',
    });
    const podcastItem = trail.find((item) => item.label === 'My Podcast');
    expect(podcastItem?.href).toBeDefined();
    expect(podcastItem?.href).toContain('/en/podcast/123');
  });

  it('adds episode without link as final item', () => {
    const trail = buildBreadcrumbTrail({
      language: 'en',
      params: {},
      podcastTitle: 'My Podcast',
      podcastId: 123,
      episodeTitle: 'Episode 1',
    });
    const lastItem = trail[trail.length - 1];
    expect(lastItem).toEqual({
      label: 'Episode 1',
    });
    expect(lastItem.href).toBeUndefined();
  });

  it('builds complete trail for episode from category', () => {
    const trail = buildBreadcrumbTrail({
      language: 'en',
      params: { from: 'category', catId: 16 },
      podcastTitle: 'Comedy Show',
      podcastId: 456,
      episodeTitle: 'Funny Episode',
    });
    expect(trail).toHaveLength(4);
    expect(trail[0].label).toBe('Home');
    expect(trail[1].label).toBe('Comedy');
    expect(trail[2].label).toBe('Comedy Show');
    expect(trail[3].label).toBe('Funny Episode');
  });
});

describe('buildPodcastUrl', () => {
  it('returns base URL without params', () => {
    const url = buildPodcastUrl('en', 123);
    expect(url).toBe('/en/podcast/123');
  });

  it('returns base URL when params is undefined', () => {
    const url = buildPodcastUrl('en', 123, undefined);
    expect(url).toBe('/en/podcast/123');
  });

  it('returns base URL when params.from is undefined', () => {
    const url = buildPodcastUrl('en', 123, {});
    expect(url).toBe('/en/podcast/123');
  });

  it('includes from parameter', () => {
    const url = buildPodcastUrl('en', 123, { from: 'home' });
    expect(url).toContain('from=home');
  });

  it('includes catId for category origin', () => {
    const url = buildPodcastUrl('en', 123, { from: 'category', catId: 16 });
    expect(url).toContain('from=category');
    expect(url).toContain('catId=16');
  });

  it('includes q for search origin', () => {
    const url = buildPodcastUrl('en', 123, { from: 'search', q: 'test' });
    expect(url).toContain('from=search');
    expect(url).toContain('q=test');
  });

  it('does not include catId for non-category origin', () => {
    const url = buildPodcastUrl('en', 123, { from: 'home', catId: 16 });
    expect(url).not.toContain('catId');
  });

  it('does not include q for non-search origin', () => {
    const url = buildPodcastUrl('en', 123, { from: 'home', q: 'test' });
    expect(url).not.toContain('q=');
  });

  it('uses correct language in URL', () => {
    expect(buildPodcastUrl('pt', 123)).toContain('/pt/');
    expect(buildPodcastUrl('es', 123)).toContain('/es/');
    expect(buildPodcastUrl('fr', 123)).toContain('/fr/');
  });
});

describe('buildEpisodeUrl', () => {
  it('returns base URL without params', () => {
    const url = buildEpisodeUrl('en', 123, 456);
    expect(url).toBe('/en/podcast/123/episode/456');
  });

  it('returns base URL when params is undefined', () => {
    const url = buildEpisodeUrl('en', 123, 456, undefined);
    expect(url).toBe('/en/podcast/123/episode/456');
  });

  it('includes from parameter', () => {
    const url = buildEpisodeUrl('en', 123, 456, { from: 'home' });
    expect(url).toContain('from=home');
  });

  it('includes catId for category origin', () => {
    const url = buildEpisodeUrl('en', 123, 456, { from: 'category', catId: 16 });
    expect(url).toContain('from=category');
    expect(url).toContain('catId=16');
  });

  it('includes q for search origin', () => {
    const url = buildEpisodeUrl('en', 123, 456, { from: 'search', q: 'test' });
    expect(url).toContain('from=search');
    expect(url).toContain('q=test');
  });

  it('uses correct language in URL', () => {
    expect(buildEpisodeUrl('de', 123, 456)).toContain('/de/');
  });

  it('includes both podcast and episode IDs', () => {
    const url = buildEpisodeUrl('en', 100, 200);
    expect(url).toContain('/podcast/100/');
    expect(url).toContain('/episode/200');
  });
});
