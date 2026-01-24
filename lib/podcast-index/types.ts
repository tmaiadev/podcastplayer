// TypeScript type definitions for Podcast Index API responses

export interface Category {
  id: number;
  name: string;
}

export interface Podcast {
  id: number;
  title: string;
  url: string;
  originalUrl: string;
  link: string;
  description: string;
  author: string;
  ownerName: string;
  image: string;
  artwork: string;
  lastUpdateTime: number;
  lastCrawlTime: number;
  lastParseTime: number;
  lastGoodHttpStatusTime: number;
  lastHttpStatus: number;
  contentType: string;
  itunesId?: number;
  generator?: string;
  language: string;
  type: number;
  dead: number;
  crawlErrors: number;
  parseErrors: number;
  categories: Record<number, string>;
  locked: number;
  imageUrlHash: number;
}

export interface Episode {
  id: number;
  title: string;
  link: string;
  description: string;
  guid: string;
  datePublished: number;
  datePublishedPretty: string;
  dateCrawled: number;
  enclosureUrl: string;
  enclosureType: string;
  enclosureLength: number;
  duration: number;
  explicit: number;
  episode?: number;
  episodeType?: string;
  season?: number;
  image: string;
  feedItunesId?: number;
  feedId: number;
  feedLanguage: string;
  feedDead: number;
  feedDuplicateOf?: number;
  chaptersUrl?: string;
  transcriptUrl?: string;
}

export interface CategoriesResponse {
  status: string;
  feeds: Category[];
  count: number;
  description: string;
}

export interface TrendingResponse {
  status: string;
  feeds: Podcast[];
  count: number;
  max: number;
  since?: number;
  description: string;
}

export interface SearchResponse {
  status: string;
  feeds: Podcast[];
  count: number;
  query: string;
  description: string;
}

export interface PodcastDetailsResponse {
  status: string;
  query: {
    id: string;
  };
  feed: Podcast;
  description: string;
}

export interface EpisodesResponse {
  status: string;
  items: Episode[];
  count: number;
  query: string;
  description: string;
}

export interface PodcastWithEpisodes {
  podcast: Podcast;
  episodes: Episode[];
}

export interface EpisodeByIdResponse {
  status: string;
  id: string;
  episode: Episode;
  description: string;
}
