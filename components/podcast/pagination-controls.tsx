'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import type { SupportedLanguage } from '@/lib/i18n/constants';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  podcastId: number;
  language: SupportedLanguage;
}

export function PaginationControls({
  currentPage,
  totalPages,
  podcastId,
  language,
}: PaginationControlsProps) {
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `/${language}/podcast/${podcastId}?${params.toString()}`;
  };

  // Generate page numbers to display (max 5 visible)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show subset with ellipsis
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        asChild={currentPage > 1}
        disabled={currentPage === 1}
      >
        {currentPage > 1 ? (
          <Link href={createPageUrl(currentPage - 1)} aria-label="Previous page">
            Previous
          </Link>
        ) : (
          <span aria-label="Previous page">Previous</span>
        )}
      </Button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) =>
        typeof page === 'number' ? (
          <Button
            key={index}
            variant={page === currentPage ? 'default' : 'outline'}
            size="sm"
            asChild={page !== currentPage}
            disabled={page === currentPage}
            className="min-w-[2.5rem]"
          >
            {page === currentPage ? (
              <span aria-current="page">{page}</span>
            ) : (
              <Link href={createPageUrl(page)} aria-label={`Page ${page}`}>
                {page}
              </Link>
            )}
          </Button>
        ) : (
          <span key={index} className="px-2 text-muted-foreground">
            {page}
          </span>
        )
      )}

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        asChild={currentPage < totalPages}
        disabled={currentPage === totalPages}
      >
        {currentPage < totalPages ? (
          <Link href={createPageUrl(currentPage + 1)} aria-label="Next page">
            Next
          </Link>
        ) : (
          <span aria-label="Next page">Next</span>
        )}
      </Button>
    </nav>
  );
}
