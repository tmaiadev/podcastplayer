'use client';

import type { Category, Podcast } from '@/lib/podcast-index';
import type { SupportedLanguage } from '@/lib/i18n/constants';
import { PodcastCard } from './podcast-card';
import { Badge } from '@/components/ui/badge';
import { getTranslations } from '@/lib/i18n/translations';

interface CategorySectionProps {
  category: Category;
  podcasts: Podcast[];
  language: SupportedLanguage;
}

export function CategorySection({ category, podcasts, language }: CategorySectionProps) {
  const displayPodcasts = podcasts.slice(0, 12);
  const t = getTranslations(language);

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-semibold">{category.name}</h2>
        <Badge variant="secondary" className="text-xs">
          {displayPodcasts.length} {t['category.shows']}
        </Badge>
      </div>

      <div className="overflow-x-auto flex gap-4 pb-2 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {displayPodcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} language={language} />
        ))}
      </div>
    </section>
  );
}
