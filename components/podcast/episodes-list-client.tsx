'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Episode } from '@/lib/podcast-index';
import type { SupportedLanguage } from '@/lib/i18n/constants';
import { getTranslations } from '@/lib/i18n/translations';
import { Input } from '@/components/ui/input';
import { EpisodeCard } from './episode-card';
import { PaginationControls } from './pagination-controls';
import { SortToggle } from './sort-toggle';

interface EpisodesListClientProps {
  episodes: Episode[]; // Pre-paginated slice from server
  allEpisodes: Episode[]; // All episodes for client-side search
  totalCount: number;
  currentPage: number;
  totalPages: number;
  sortOrder: 'asc' | 'desc';
  initialSearch?: string;
  language: SupportedLanguage;
  podcastId: number;
}

export function EpisodesListClient({
  episodes,
  allEpisodes,
  totalCount,
  currentPage,
  totalPages,
  sortOrder,
  initialSearch = '',
  language,
  podcastId,
}: EpisodesListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const t = getTranslations(language);

  // Filter episodes client-side for instant feedback
  const filteredEpisodes = useMemo(() => {
    if (!searchQuery) return episodes;

    return allEpisodes.filter(episode =>
      episode.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, episodes, allEpisodes]);

  // Update URL with search parameter (debounced)
  useEffect(() => {
    if (searchQuery === initialSearch) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (searchQuery) {
        params.set('search', searchQuery);
        params.delete('page'); // Reset to page 1 on search
      } else {
        params.delete('search');
      }

      router.replace(`/${language}/podcast/${podcastId}?${params.toString()}`, {
        scroll: false
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, initialSearch, podcastId, router, searchParams]);

  return (
    <div>
      {/* Controls: Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder={t['episodes.search.placeholder']}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        <SortToggle
          currentSort={sortOrder}
          podcastId={podcastId}
          language={language}
        />
      </div>

      {/* Episodes List */}
      {filteredEpisodes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {t['episodes.search.noResults']}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {filteredEpisodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                episode={episode}
                language={language}
              />
            ))}
          </div>

          {/* Pagination (hide when searching) */}
          {!searchQuery && totalPages > 1 && (
            <div className="mt-8">
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                podcastId={podcastId}
                language={language}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
