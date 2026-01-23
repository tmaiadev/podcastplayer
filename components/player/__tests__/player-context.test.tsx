import { render, screen, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { PlayerProvider } from '../player-context';
import { usePlayer } from '../use-player';
import type { ReactNode } from 'react';
import type { Episode, Podcast } from '@/lib/podcast-index';

const mockEpisode: Episode = {
  id: 1,
  title: 'Test Episode',
  description: 'Test description',
  enclosureUrl: 'https://example.com/episode.mp3',
  enclosureType: 'audio/mpeg',
  enclosureLength: 1000000,
  datePublished: 1234567890,
  duration: 3600,
  image: 'https://example.com/image.jpg',
  feedId: 123,
  feedTitle: 'Test Podcast',
  feedImage: 'https://example.com/feed.jpg',
  episode: 1,
  season: 1,
};

const mockPodcast: Podcast = {
  id: 123,
  title: 'Test Podcast',
  description: 'Test podcast description',
  url: 'https://example.com/feed.xml',
  author: 'Test Author',
  image: 'https://example.com/image.jpg',
  artwork: 'https://example.com/artwork.jpg',
  language: 'en',
  categories: { '1': 'Arts' },
  ownerName: 'Owner',
  episodeCount: 100,
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <PlayerProvider>{children}</PlayerProvider>
);

describe('PlayerProvider', () => {
  it('renders children', () => {
    render(
      <PlayerProvider>
        <div data-testid="child">Child Content</div>
      </PlayerProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('provides initial state', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    expect(result.current.isPlaying).toBe(false);
    expect(result.current.isPaused).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentEpisode).toBeNull();
    expect(result.current.currentPodcast).toBeNull();
  });
});

describe('Player actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('play() sets current episode and podcast', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    act(() => {
      result.current.play(mockEpisode, mockPodcast);
    });

    expect(result.current.currentEpisode).toEqual(mockEpisode);
    expect(result.current.currentPodcast).toEqual(mockPodcast);
  });

  it('setPlaybackRate() updates playback rate', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    expect(result.current.playbackRate).toBe(1);

    act(() => {
      result.current.setPlaybackRate(1.5);
    });

    expect(result.current.playbackRate).toBe(1.5);
  });

  it('setPlaybackRate() accepts valid rates', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    const validRates = [0.5, 1, 1.5, 2, 3] as const;

    validRates.forEach((rate) => {
      act(() => {
        result.current.setPlaybackRate(rate);
      });
      expect(result.current.playbackRate).toBe(rate);
    });
  });

  it('setSleepTimer() sets timer end time and remaining', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    expect(result.current.sleepTimerEndTime).toBeNull();
    expect(result.current.sleepTimerRemaining).toBeNull();

    act(() => {
      result.current.setSleepTimer(5);
    });

    expect(result.current.sleepTimerEndTime).not.toBeNull();
    expect(result.current.sleepTimerRemaining).toBe(5 * 60); // 5 minutes in seconds
  });

  it('setSleepTimer(null) clears the timer', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    act(() => {
      result.current.setSleepTimer(10);
    });

    expect(result.current.sleepTimerEndTime).not.toBeNull();

    act(() => {
      result.current.setSleepTimer(null);
    });

    expect(result.current.sleepTimerEndTime).toBeNull();
    expect(result.current.sleepTimerRemaining).toBeNull();
  });

  it('pause() is callable', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    expect(() => {
      act(() => {
        result.current.pause();
      });
    }).not.toThrow();
  });

  it('resume() is callable', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    expect(() => {
      act(() => {
        result.current.resume();
      });
    }).not.toThrow();
  });

  it('seek() is callable', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    expect(() => {
      act(() => {
        result.current.seek(100);
      });
    }).not.toThrow();
  });

  it('skipForward() is callable', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    expect(() => {
      act(() => {
        result.current.skipForward();
      });
    }).not.toThrow();
  });

  it('skipForward() accepts custom seconds', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    expect(() => {
      act(() => {
        result.current.skipForward(15);
      });
    }).not.toThrow();
  });

  it('skipBackward() is callable', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    expect(() => {
      act(() => {
        result.current.skipBackward();
      });
    }).not.toThrow();
  });

  it('skipBackward() accepts custom seconds', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    expect(() => {
      act(() => {
        result.current.skipBackward(15);
      });
    }).not.toThrow();
  });
});

describe('download', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      blob: jest.fn().mockResolvedValue(new Blob(['test'])),
    });
  });

  it('does nothing when no episode is playing', async () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    await act(async () => {
      await result.current.download();
    });

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('fetches and downloads episode when playing', async () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    // Mock document.createElement and appendChild
    const mockAnchor = {
      href: '',
      download: '',
      click: jest.fn(),
    };
    jest.spyOn(document, 'createElement').mockReturnValue(mockAnchor as unknown as HTMLElement);
    jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockAnchor as unknown as HTMLElement);
    jest.spyOn(document.body, 'removeChild').mockImplementation(() => mockAnchor as unknown as HTMLElement);

    act(() => {
      result.current.play(mockEpisode, mockPodcast);
    });

    await act(async () => {
      await result.current.download();
    });

    expect(global.fetch).toHaveBeenCalledWith(mockEpisode.enclosureUrl);
    expect(mockAnchor.click).toHaveBeenCalled();
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalled();
  });
});
