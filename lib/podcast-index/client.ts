import crypto from 'crypto';
import type {
  Category,
  CategoriesResponse,
  Podcast,
  Episode,
  TrendingResponse,
  SearchResponse,
  PodcastDetailsResponse,
  EpisodesResponse,
} from './types';

export class PodcastIndex {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl = 'https://api.podcastindex.org/api/1.0';
  private userAgent = 'PodcastPlayer.app';
  private cacheRevalidate: number;

  constructor(apiKey?: string, apiSecret?: string, cacheRevalidate?: number) {
    this.apiKey = apiKey || process.env.PODCAST_INDEX_API_KEY || '';
    this.apiSecret = apiSecret || process.env.PODCAST_INDEX_API_SECRET || '';
    this.cacheRevalidate =
      cacheRevalidate ||
      parseInt(process.env.PODCAST_INDEX_CACHE_DURATION || '10800', 10);

    if (!this.apiKey || !this.apiSecret) {
      throw new Error(
        'Podcast Index API credentials are required. Please provide apiKey and apiSecret, or set PODCAST_INDEX_API_KEY and PODCAST_INDEX_API_SECRET environment variables.'
      );
    }
  }

  private generateAuthHeaders(): Record<string, string> {
    const authDate = Math.floor(Date.now() / 1000).toString();
    const authString = this.apiKey + this.apiSecret + authDate;
    const hash = crypto.createHash('sha1').update(authString).digest('hex');

    return {
      'User-Agent': this.userAgent,
      'X-Auth-Key': this.apiKey,
      'X-Auth-Date': authDate,
      'Authorization': hash,
    };
  }

  private async request<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean>,
    cacheTags?: string[]
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const headers = this.generateAuthHeaders();

    // Build cache tags
    const tags = cacheTags || [`podcast-index${endpoint}`];

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers,
        next: {
          revalidate: this.cacheRevalidate,
          tags,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Podcast Index API request failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.status !== 'true' && data.status !== true) {
        throw new Error(
          `Podcast Index API returned error status: ${data.description || 'Unknown error'}`
        );
      }

      return data as T;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Podcast Index API error: ${error.message}`);
      }
      throw error;
    }
  }

  async getCategories(): Promise<Category[]> {
    const response = await this.request<CategoriesResponse>(
      '/categories/list',
      undefined,
      ['podcast-index', 'podcast-index-categories']
    );
    return response.feeds;
  }

  async getTrending(options?: {
    max?: number;
    since?: number;
    lang?: string;
    cat?: string;
  }): Promise<Podcast[]> {
    const params: Record<string, string | number> = {};

    if (options?.max) params.max = options.max;
    if (options?.since) params.since = options.since;
    if (options?.lang) params.lang = options.lang;
    if (options?.cat) params.cat = options.cat;

    const tags = ['podcast-index', 'podcast-index-trending'];

    // Include language in cache tags for per-language caching
    if (options?.lang) {
      tags.push(`podcast-index-trending-lang-${options.lang}`);
    }

    // Include category in cache tags
    if (options?.cat) {
      tags.push(`podcast-index-trending-cat-${options.cat}`);
    }

    // Include both language and category for granular caching
    if (options?.lang && options?.cat) {
      tags.push(`podcast-index-trending-${options.lang}-${options.cat}`);
    }

    const response = await this.request<TrendingResponse>(
      '/podcasts/trending',
      params,
      tags
    );
    return response.feeds;
  }

  async search(
    query: string,
    options?: { max?: number }
  ): Promise<SearchResponse> {
    const params: Record<string, string | number> = { q: query };

    if (options?.max) params.max = options.max;

    return this.request<SearchResponse>(
      '/search/byterm',
      params,
      ['podcast-index', 'podcast-index-search']
    );
  }

  async getPodcastById(feedId: number): Promise<Podcast> {
    const params: Record<string, string | number> = { id: feedId };
    const response = await this.request<PodcastDetailsResponse>(
      '/podcasts/byfeedid',
      params,
      ['podcast-index', `podcast-index-podcast-${feedId}`]
    );
    return response.feed;
  }

  async getEpisodesByFeedId(
    feedId: number,
    options?: { max?: number }
  ): Promise<Episode[]> {
    const params: Record<string, string | number> = { id: feedId };

    if (options?.max) params.max = options.max;

    const response = await this.request<EpisodesResponse>(
      '/episodes/byfeedid',
      params,
      ['podcast-index', `podcast-index-episodes-${feedId}`]
    );
    return response.items;
  }
}
