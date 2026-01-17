import crypto from 'crypto';
import { fetchWithCache } from '../fetchWithCache';
import type {
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

  constructor(apiKey?: string, apiSecret?: string) {
    this.apiKey = apiKey || process.env.PODCAST_INDEX_API_KEY || '';
    this.apiSecret = apiSecret || process.env.PODCAST_INDEX_API_SECRET || '';

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
    cacheTag?: string,
    cacheDuration?: number
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const headers = this.generateAuthHeaders();

    const tag = cacheTag || `podcast-index${endpoint.replace(/\//g, '-')}`;

    try {
      const response = await fetchWithCache(url.toString(), {
        method: 'GET',
        headers,
        cacheTag: tag,
        cacheUntil: cacheDuration ? Date.now() + cacheDuration * 1000 : undefined,
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

    // Build a unique cache tag based on options
    let cacheTag = 'podcast-index-trending';
    if (options?.lang) cacheTag += `-lang-${options.lang}`;
    if (options?.cat) cacheTag += `-cat-${options.cat}`;
    if (options?.max) cacheTag += `-max-${options.max}`;

    const response = await this.request<TrendingResponse>(
      '/podcasts/trending',
      params,
      cacheTag,
      604800 // 1 week
    );
    return response.feeds;
  }

  async search(
    query: string,
    options?: { max?: number }
  ): Promise<SearchResponse> {
    const params: Record<string, string | number> = { q: query };

    if (options?.max) params.max = options.max;

    // Sanitize query for cache tag (lowercase, replace non-alphanumeric with dashes)
    const sanitizedQuery = query.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const cacheTag = `podcast-index-search-${sanitizedQuery}`;

    return this.request<SearchResponse>(
      '/search/byterm',
      params,
      cacheTag,
      2592000 // 1 month
    );
  }

  async getPodcastById(feedId: number): Promise<Podcast> {
    const params: Record<string, string | number> = { id: feedId };
    const response = await this.request<PodcastDetailsResponse>(
      '/podcasts/byfeedid',
      params,
      `podcast-index-podcast-${feedId}`,
      604800 // 1 week
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
      `podcast-index-episodes-${feedId}`,
      3600 // 1 hour
    );
    return response.items;
  }
}
