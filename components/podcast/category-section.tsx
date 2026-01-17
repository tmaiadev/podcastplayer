'use client';

import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import type { Podcast } from '@/lib/podcast-index';
import { getCategory } from '@/lib/categories';
import type { Category } from '@/lib/categories';
import type { SupportedLanguage } from '@/lib/i18n/constants';
import { PodcastCard } from './podcast-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface CategorySectionProps {
  category: Category;
  podcasts: Podcast[];
  language: SupportedLanguage;
}

export function CategorySection({ category, podcasts, language }: CategorySectionProps) {
  const displayPodcasts = podcasts.slice(0, 12);

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <Link href={`/${language}/cat/${category.id}`} className="flex items-center gap-1 hover:underline">
          <h2 className="text-2xl font-semibold">{getCategory(category.id, language)?.name ?? category.name}</h2>
          <HugeiconsIcon icon={ArrowRight01Icon} size={24} />
        </Link>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-2 px-1">
          {displayPodcasts.map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} language={language} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
