import { render, screen } from '@testing-library/react';
import { EpisodeCard } from '../episode-card';
import type { Episode, Podcast } from '@/lib/podcast-index';

// Mock the player components
jest.mock('@/components/player', () => ({
  PlayEpisodeButton: ({ episode }: { episode: Episode }) => (
    <button data-testid="play-button">Play {episode.title}</button>
  ),
}));

// Mock the episode image
jest.mock('../episode-image', () => ({
  EpisodeImage: ({ alt }: { alt: string }) => (
    <img data-testid="episode-image" alt={alt} />
  ),
}));

const mockPodcast: Podcast = {
  id: 123,
  title: 'Test Podcast',
  description: 'A test podcast',
  url: 'https://example.com/feed.xml',
  author: 'Test Author',
  image: 'https://example.com/podcast.jpg',
  artwork: 'https://example.com/artwork.jpg',
  language: 'en',
  categories: {},
  ownerName: 'Owner',
  episodeCount: 100,
};

const createMockEpisode = (overrides: Partial<Episode> = {}): Episode => ({
  id: 1,
  title: 'Test Episode',
  description: '<p>Episode description with <b>HTML</b></p>',
  enclosureUrl: 'https://example.com/episode.mp3',
  enclosureType: 'audio/mpeg',
  enclosureLength: 1000000,
  datePublished: 1704067200, // Jan 1, 2024
  duration: 3665, // 1h 1m 5s
  image: 'https://example.com/episode.jpg',
  feedId: 123,
  feedTitle: 'Test Podcast',
  feedImage: 'https://example.com/feed.jpg',
  ...overrides,
});

describe('EpisodeCard', () => {
  it('renders episode title', () => {
    const episode = createMockEpisode({ title: 'My Episode Title' });
    render(<EpisodeCard episode={episode} language="en" podcast={mockPodcast} />);
    expect(screen.getByText('My Episode Title')).toBeInTheDocument();
  });

  it('renders play button', () => {
    const episode = createMockEpisode();
    render(<EpisodeCard episode={episode} language="en" podcast={mockPodcast} />);
    expect(screen.getByTestId('play-button')).toBeInTheDocument();
  });

  it('strips HTML from description', () => {
    const episode = createMockEpisode({
      description: '<p>Clean <b>text</b> only</p>',
    });
    render(<EpisodeCard episode={episode} language="en" podcast={mockPodcast} />);
    expect(screen.getByText('Clean text only')).toBeInTheDocument();
    expect(screen.queryByText('<p>')).not.toBeInTheDocument();
  });
});

describe('formatTitle (via EpisodeCard)', () => {
  it('formats title with season and episode number', () => {
    const episode = createMockEpisode({
      title: 'Great Episode',
      season: 2,
      episode: 5,
    });
    render(<EpisodeCard episode={episode} language="en" podcast={mockPodcast} />);
    expect(screen.getByText('S2E5 - Great Episode')).toBeInTheDocument();
  });

  it('formats title with episode number only', () => {
    const episode = createMockEpisode({
      title: 'Just Episode',
      episode: 10,
      season: undefined,
    });
    render(<EpisodeCard episode={episode} language="en" podcast={mockPodcast} />);
    expect(screen.getByText('E10 - Just Episode')).toBeInTheDocument();
  });

  it('displays plain title when no season/episode', () => {
    const episode = createMockEpisode({
      title: 'Plain Title',
      season: undefined,
      episode: undefined,
    });
    render(<EpisodeCard episode={episode} language="en" podcast={mockPodcast} />);
    expect(screen.getByText('Plain Title')).toBeInTheDocument();
  });
});

describe('formatDuration (via EpisodeCard)', () => {
  it('shows duration when duration > 0', () => {
    const episode = createMockEpisode({ duration: 3665 }); // 1:01:05
    render(<EpisodeCard episode={episode} language="en" podcast={mockPodcast} />);
    expect(screen.getByText(/1:01:05/)).toBeInTheDocument();
  });

  it('does not show duration when duration is 0', () => {
    const episode = createMockEpisode({ duration: 0 });
    render(<EpisodeCard episode={episode} language="en" podcast={mockPodcast} />);
    expect(screen.queryByText('Duration:')).not.toBeInTheDocument();
  });

  it('formats minutes-only duration correctly', () => {
    const episode = createMockEpisode({ duration: 125 }); // 2:05
    render(<EpisodeCard episode={episode} language="en" podcast={mockPodcast} />);
    expect(screen.getByText(/2:05/)).toBeInTheDocument();
  });
});

describe('formatPublishDate (via EpisodeCard)', () => {
  it('shows formatted publish date', () => {
    const episode = createMockEpisode({ datePublished: 1704067200 }); // Jan 1, 2024
    render(<EpisodeCard episode={episode} language="en" podcast={mockPodcast} />);
    // The exact format depends on locale, but should contain the date
    expect(screen.getByText(/Jan 1, 2024|1 Jan 2024/)).toBeInTheDocument();
  });

  it('uses correct locale for date formatting', () => {
    const episode = createMockEpisode({ datePublished: 1704067200 });
    render(<EpisodeCard episode={episode} language="de" podcast={mockPodcast} />);
    // German format would be different
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });
});

describe('EpisodeCard link', () => {
  it('links to episode page', () => {
    const episode = createMockEpisode({ id: 456 });
    render(<EpisodeCard episode={episode} language="en" podcast={mockPodcast} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', expect.stringContaining('/episode/456'));
  });

  it('includes breadcrumb context in link', () => {
    const episode = createMockEpisode({ id: 789 });
    render(
      <EpisodeCard
        episode={episode}
        language="en"
        podcast={mockPodcast}
        breadcrumbContext={{ from: 'category', catId: 16 }}
      />
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', expect.stringContaining('from=category'));
    expect(link).toHaveAttribute('href', expect.stringContaining('catId=16'));
  });
});
