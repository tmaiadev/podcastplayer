import { renderHook } from '@testing-library/react';
import { usePlayer } from '../use-player';
import { PlayerProvider } from '../player-context';
import type { ReactNode } from 'react';

describe('usePlayer', () => {
  it('throws error when used outside PlayerProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => usePlayer());
    }).toThrow('usePlayer must be used within a PlayerProvider');

    consoleSpy.mockRestore();
  });

  it('returns context value when used inside PlayerProvider', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <PlayerProvider>{children}</PlayerProvider>
    );

    const { result } = renderHook(() => usePlayer(), { wrapper });

    expect(result.current).toBeDefined();
    expect(typeof result.current.play).toBe('function');
    expect(typeof result.current.pause).toBe('function');
    expect(typeof result.current.resume).toBe('function');
    expect(typeof result.current.seek).toBe('function');
    expect(typeof result.current.skipForward).toBe('function');
    expect(typeof result.current.skipBackward).toBe('function');
    expect(typeof result.current.setPlaybackRate).toBe('function');
    expect(typeof result.current.setSleepTimer).toBe('function');
    expect(typeof result.current.download).toBe('function');
  });

  it('returns initial state values', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <PlayerProvider>{children}</PlayerProvider>
    );

    const { result } = renderHook(() => usePlayer(), { wrapper });

    expect(result.current.isPlaying).toBe(false);
    expect(result.current.isPaused).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentTime).toBe(0);
    expect(result.current.duration).toBe(0);
    expect(result.current.buffered).toBe(0);
    expect(result.current.playbackRate).toBe(1);
    expect(result.current.currentEpisode).toBeNull();
    expect(result.current.currentPodcast).toBeNull();
    expect(result.current.sleepTimerEndTime).toBeNull();
    expect(result.current.sleepTimerRemaining).toBeNull();
  });
});
