'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import type { Podcast } from '@/lib/podcast-index';
import type { Category } from '@/lib/categories';
import { getCategory } from '@/lib/categories';
import type { SupportedLanguage } from '@/lib/i18n/constants';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { CategorySection } from './category-section';
import { CategorySectionSkeleton } from './category-section-skeleton';

interface LazyCategorySectionProps {
  category: Category;
  language: SupportedLanguage;
}

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export function LazyCategorySection({ category, language }: LazyCategorySectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>();
  const [state, setState] = useState<LoadingState>('idle');
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    if (!isIntersecting || state !== 'idle') return;

    const fetchPodcasts = async () => {
      setState('loading');

      try {
        const params = new URLSearchParams({
          cat: String(category.id),
          lang: language,
          max: '12',
        });

        const response = await fetch(`${window.location.origin}/api/trending?${params}`);

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await response.json();

        if (data.podcasts && data.podcasts.length === 12) {
          setPodcasts(data.podcasts);
          setState('success');
        } else {
          // Not enough podcasts, treat as error (will hide section)
          setState('error');
        }
      } catch {
        setState('error');
      }
    };

    fetchPodcasts();
  }, [isIntersecting, state, category.id, language]);

  // Hide section on error (matching server behavior)
  if (state === 'error') {
    return null;
  }

  // Show skeleton while loading or idle
  if (state === 'idle' || state === 'loading') {
    const localizedName = getCategory(category.id, language)?.name ?? category.name;

    return (
      <div ref={ref}>
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Link href={`/${language}/cat/${category.id}`} className="group flex items-center gap-1">
              <h2 className="text-2xl font-semibold transition-colors duration-200 group-hover:text-primary group-focus-visible:text-primary">
                {localizedName}
              </h2>
              <span className="transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1">
                <HugeiconsIcon icon={ArrowRight01Icon} size={24} />
              </span>
            </Link>
          </div>
          <CategorySectionSkeleton showTitle={false} />
        </section>
      </div>
    );
  }

  // Show actual content on success
  return (
    <CategorySection
      category={category}
      podcasts={podcasts}
      language={language}
    />
  );
}
