'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import type { SupportedLanguage } from '@/lib/i18n/constants';
import { getTranslations } from '@/lib/i18n/translations';

interface SortToggleProps {
  currentSort: 'asc' | 'desc';
  podcastId: number;
  language: SupportedLanguage;
}

export function SortToggle({ currentSort, podcastId, language }: SortToggleProps) {
  const searchParams = useSearchParams();
  const t = getTranslations(language);

  const createSortUrl = () => {
    const params = new URLSearchParams(searchParams);
    const newSort = currentSort === 'desc' ? 'asc' : 'desc';
    params.set('sort', newSort);
    params.delete('page'); // Reset to page 1 on sort change
    return `/podcast/${podcastId}?${params.toString()}`;
  };

  const label = currentSort === 'desc'
    ? t['episodes.sort.newest']
    : t['episodes.sort.oldest'];

  return (
    <Button variant="outline" asChild>
      <Link href={createSortUrl()} className="gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          {currentSort === 'desc' ? (
            <>
              <path d="m3 16 4 4 4-4" />
              <path d="M7 20V4" />
              <path d="m21 8-4-4-4 4" />
              <path d="M17 4v16" />
            </>
          ) : (
            <>
              <path d="m3 8 4-4 4 4" />
              <path d="M7 4v16" />
              <path d="m21 16-4 4-4-4" />
              <path d="M17 20V4" />
            </>
          )}
        </svg>
        <span>{label}</span>
      </Link>
    </Button>
  );
}
