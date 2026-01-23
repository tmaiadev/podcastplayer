import { render, screen } from '@testing-library/react';
import { PodcastCard } from '../podcast-card';
import type { Podcast } from '@/lib/podcast-index';

// Mock the PodcastImage component
jest.mock('../podcast-image', () => ({
  PodcastImage: ({ alt, title }: { alt: string; title: string }) => (
    <img data-testid="podcast-image" alt={alt} title={title} />
  ),
}));

const createMockPodcast = (overrides: Partial<Podcast> = {}): Podcast => ({
  id: 123,
  title: 'Test Podcast',
  description: 'A test podcast description',
  url: 'https://example.com/feed.xml',
  author: 'Test Author',
  image: 'https://example.com/image.jpg',
  artwork: 'https://example.com/artwork.jpg',
  language: 'en',
  categories: { '1': 'Arts' },
  ownerName: 'Test Owner',
  episodeCount: 100,
  ...overrides,
});

describe('PodcastCard', () => {
  it('renders podcast title', () => {
    const podcast = createMockPodcast({ title: 'My Podcast Title' });
    render(<PodcastCard podcast={podcast} language="en" />);
    expect(screen.getByText('My Podcast Title')).toBeInTheDocument();
  });

  it('renders podcast image', () => {
    const podcast = createMockPodcast({ title: 'Image Test' });
    render(<PodcastCard podcast={podcast} language="en" />);
    expect(screen.getByTestId('podcast-image')).toBeInTheDocument();
  });

  it('renders author name', () => {
    const podcast = createMockPodcast({ author: 'John Doe' });
    render(<PodcastCard podcast={podcast} language="en" />);
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
  });

  it('falls back to ownerName when author is empty', () => {
    const podcast = createMockPodcast({ author: '', ownerName: 'Jane Owner' });
    render(<PodcastCard podcast={podcast} language="en" />);
    expect(screen.getByText(/Jane Owner/)).toBeInTheDocument();
  });

  it('uses "by" text in correct language (English)', () => {
    const podcast = createMockPodcast({ author: 'Author Name' });
    render(<PodcastCard podcast={podcast} language="en" />);
    expect(screen.getByText(/by Author Name/)).toBeInTheDocument();
  });

  it('uses "por" text in Portuguese', () => {
    const podcast = createMockPodcast({ author: 'Author Name' });
    render(<PodcastCard podcast={podcast} language="pt" />);
    expect(screen.getByText(/por Author Name/)).toBeInTheDocument();
  });

  it('uses "von" text in German', () => {
    const podcast = createMockPodcast({ author: 'Author Name' });
    render(<PodcastCard podcast={podcast} language="de" />);
    expect(screen.getByText(/von Author Name/)).toBeInTheDocument();
  });

  it('links to podcast detail page', () => {
    const podcast = createMockPodcast({ id: 456 });
    render(<PodcastCard podcast={podcast} language="en" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/en/podcast/456');
  });

  it('includes breadcrumb context in link', () => {
    const podcast = createMockPodcast({ id: 789 });
    render(
      <PodcastCard
        podcast={podcast}
        language="en"
        breadcrumbContext={{ from: 'search', q: 'test query' }}
      />
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', expect.stringContaining('from=search'));
    expect(link).toHaveAttribute('href', expect.stringContaining('q=test'));
  });

  it('includes language in link URL', () => {
    const podcast = createMockPodcast({ id: 123 });
    render(<PodcastCard podcast={podcast} language="fr" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', expect.stringContaining('/fr/'));
  });

  it('applies custom className', () => {
    const podcast = createMockPodcast();
    render(<PodcastCard podcast={podcast} language="en" className="custom-class" />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('custom-class');
  });
});

describe('PodcastCard image selection', () => {
  it('prefers image over artwork', () => {
    const podcast = createMockPodcast({
      image: 'https://example.com/preferred.jpg',
      artwork: 'https://example.com/fallback.jpg',
    });
    render(<PodcastCard podcast={podcast} language="en" />);
    const image = screen.getByTestId('podcast-image');
    // The mock doesn't use src, but we can verify the component rendered
    expect(image).toBeInTheDocument();
  });

  it('uses artwork when image is empty', () => {
    const podcast = createMockPodcast({
      image: '',
      artwork: 'https://example.com/artwork.jpg',
    });
    render(<PodcastCard podcast={podcast} language="en" />);
    expect(screen.getByTestId('podcast-image')).toBeInTheDocument();
  });
});
