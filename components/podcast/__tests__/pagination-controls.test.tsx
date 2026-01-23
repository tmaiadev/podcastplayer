import { render, screen } from '@testing-library/react';
import { PaginationControls } from '../pagination-controls';

// Need to mock useSearchParams for this component
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useSearchParams: () => new URLSearchParams(),
}));

describe('PaginationControls', () => {
  describe('Previous/Next buttons', () => {
    it('disables Previous button on first page', () => {
      render(
        <PaginationControls
          currentPage={1}
          totalPages={10}
          podcastId={123}
          language="en"
        />
      );
      const prevButton = screen.getByRole('button', { name: /previous/i });
      expect(prevButton).toBeDisabled();
    });

    it('enables Previous button after first page', () => {
      render(
        <PaginationControls
          currentPage={2}
          totalPages={10}
          podcastId={123}
          language="en"
        />
      );
      const prevLink = screen.getByRole('link', { name: /previous/i });
      expect(prevLink).toBeInTheDocument();
      expect(prevLink).toHaveAttribute('href', expect.stringContaining('page=1'));
    });

    it('disables Next button on last page', () => {
      render(
        <PaginationControls
          currentPage={10}
          totalPages={10}
          podcastId={123}
          language="en"
        />
      );
      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).toBeDisabled();
    });

    it('enables Next button before last page', () => {
      render(
        <PaginationControls
          currentPage={5}
          totalPages={10}
          podcastId={123}
          language="en"
        />
      );
      const nextLink = screen.getByRole('link', { name: /next/i });
      expect(nextLink).toBeInTheDocument();
      expect(nextLink).toHaveAttribute('href', expect.stringContaining('page=6'));
    });
  });

  describe('Page numbers', () => {
    it('shows all pages when total <= 5', () => {
      render(
        <PaginationControls
          currentPage={1}
          totalPages={5}
          podcastId={123}
          language="en"
        />
      );
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.queryByText('...')).not.toBeInTheDocument();
    });

    it('shows ellipsis for many pages when current is near start', () => {
      render(
        <PaginationControls
          currentPage={2}
          totalPages={20}
          podcastId={123}
          language="en"
        />
      );
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('...')).toBeInTheDocument();
      expect(screen.getByText('20')).toBeInTheDocument();
    });

    it('shows ellipsis for many pages when current is near end', () => {
      render(
        <PaginationControls
          currentPage={19}
          totalPages={20}
          podcastId={123}
          language="en"
        />
      );
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('...')).toBeInTheDocument();
      expect(screen.getByText('17')).toBeInTheDocument();
      expect(screen.getByText('18')).toBeInTheDocument();
      expect(screen.getByText('19')).toBeInTheDocument();
      expect(screen.getByText('20')).toBeInTheDocument();
    });

    it('shows two ellipses when current is in middle', () => {
      render(
        <PaginationControls
          currentPage={10}
          totalPages={20}
          podcastId={123}
          language="en"
        />
      );
      expect(screen.getByText('1')).toBeInTheDocument();
      const ellipses = screen.getAllByText('...');
      expect(ellipses).toHaveLength(2);
      expect(screen.getByText('9')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('11')).toBeInTheDocument();
      expect(screen.getByText('20')).toBeInTheDocument();
    });

    it('highlights current page', () => {
      render(
        <PaginationControls
          currentPage={3}
          totalPages={10}
          podcastId={123}
          language="en"
        />
      );
      const currentPageSpan = screen.getByRole('button', { name: '3' });
      expect(currentPageSpan).toBeDisabled();
    });
  });

  describe('URL generation', () => {
    it('includes podcast ID in URL', () => {
      render(
        <PaginationControls
          currentPage={1}
          totalPages={5}
          podcastId={456}
          language="en"
        />
      );
      const page2Link = screen.getByRole('link', { name: 'Page 2' });
      expect(page2Link).toHaveAttribute('href', expect.stringContaining('/podcast/456'));
    });

    it('includes language in URL', () => {
      render(
        <PaginationControls
          currentPage={1}
          totalPages={5}
          podcastId={123}
          language="pt"
        />
      );
      const page2Link = screen.getByRole('link', { name: 'Page 2' });
      expect(page2Link).toHaveAttribute('href', expect.stringContaining('/pt/'));
    });

    it('includes page number in URL', () => {
      render(
        <PaginationControls
          currentPage={2}
          totalPages={5}
          podcastId={123}
          language="en"
        />
      );
      const page3Link = screen.getByRole('link', { name: 'Page 3' });
      expect(page3Link).toHaveAttribute('href', expect.stringContaining('page=3'));
    });
  });

  describe('Single page', () => {
    it('renders pagination with single page', () => {
      render(
        <PaginationControls
          currentPage={1}
          totalPages={1}
          podcastId={123}
          language="en"
        />
      );
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
      expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    });
  });
});
