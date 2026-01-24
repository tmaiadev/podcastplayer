"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Episode, Podcast } from "@/lib/podcast-index";

export type PlaybackRate = 0.5 | 1 | 1.5 | 2 | 3;
export type SleepTimerOption = 5 | 10 | 15 | 30 | 60 | null;

export interface PlayerState {
  isPlaying: boolean;
  isPaused: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  buffered: number;
  playbackRate: PlaybackRate;
  currentEpisode: Episode | null;
  currentPodcast: Podcast | null;
  sleepTimerEndTime: number | null;
  sleepTimerRemaining: number | null;
}

export interface PlayerActions {
  play: (episode: Episode, podcast: Podcast) => void;
  pause: () => void;
  resume: () => void;
  seek: (time: number) => void;
  skipForward: (seconds?: number) => void;
  skipBackward: (seconds?: number) => void;
  setPlaybackRate: (rate: PlaybackRate) => void;
  setSleepTimer: (minutes: SleepTimerOption) => void;
  download: () => Promise<void>;
}

export interface PlayerContextValue extends PlayerState, PlayerActions {}

const initialState: PlayerState = {
  isPlaying: false,
  isPaused: false,
  isLoading: false,
  currentTime: 0,
  duration: 0,
  buffered: 0,
  playbackRate: 1,
  currentEpisode: null,
  currentPodcast: null,
  sleepTimerEndTime: null,
  sleepTimerRemaining: null,
};

export const PlayerContext = createContext<PlayerContextValue | null>(null);

interface PlayerProviderProps {
  children: ReactNode;
}

export function PlayerProvider({ children }: PlayerProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<PlayerState>(initialState);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = "metadata";

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setState((prev) => ({
        ...prev,
        currentTime: audio.currentTime,
      }));
    };

    const handleDurationChange = () => {
      setState((prev) => ({
        ...prev,
        duration: audio.duration || 0,
      }));
    };

    const handleProgress = () => {
      if (audio.buffered.length > 0) {
        setState((prev) => ({
          ...prev,
          buffered: audio.buffered.end(audio.buffered.length - 1),
        }));
      }
    };

    const handleLoadStart = () => {
      setState((prev) => ({ ...prev, isLoading: true }));
    };

    const handleCanPlay = () => {
      setState((prev) => ({ ...prev, isLoading: false }));
    };

    const handlePlay = () => {
      setState((prev) => ({
        ...prev,
        isPlaying: true,
        isPaused: false,
      }));
    };

    const handlePause = () => {
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        isPaused: true,
      }));
    };

    const handleEnded = () => {
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        isPaused: false,
        currentTime: 0,
      }));
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("progress", handleProgress);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("progress", handleProgress);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Sleep timer effect - intentionally updates state in interval to show countdown
  useEffect(() => {
    if (state.sleepTimerEndTime === null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- clear timer state when disabled
      setState((prev) => ({ ...prev, sleepTimerRemaining: null }));
      return;
    }

    const checkTimer = () => {
      const now = Date.now();
      const remaining = Math.max(0, state.sleepTimerEndTime! - now);

      if (remaining <= 0) {
        audioRef.current?.pause();
        setState((prev) => ({
          ...prev,
          sleepTimerEndTime: null,
          sleepTimerRemaining: null,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          sleepTimerRemaining: Math.ceil(remaining / 1000),
        }));
      }
    };

    checkTimer();
    const interval = setInterval(checkTimer, 1000);

    return () => clearInterval(interval);
  }, [state.sleepTimerEndTime]);

  const play = useCallback((episode: Episode, podcast: Podcast) => {
    const audio = audioRef.current;
    if (!audio) return;

    // If same episode, just resume
    if (audio.src === episode.enclosureUrl) {
      audio.play().catch(console.error);
      return;
    }

    audio.src = episode.enclosureUrl;
    setState((prev) => ({
      ...prev,
      currentEpisode: episode,
      currentPodcast: podcast,
      currentTime: 0,
      duration: 0,
      buffered: 0,
    }));
    audio.play().catch(console.error);
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const resume = useCallback(() => {
    audioRef.current?.play().catch(console.error);
  }, []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
    }
  }, []);

  const skipForward = useCallback((seconds = 30) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.min(audio.duration, audio.currentTime + seconds);
    }
  }, []);

  const skipBackward = useCallback((seconds = 30) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(0, audio.currentTime - seconds);
    }
  }, []);

  const setPlaybackRate = useCallback((rate: PlaybackRate) => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = rate;
      setState((prev) => ({ ...prev, playbackRate: rate }));
    }
  }, []);

  const setSleepTimer = useCallback((minutes: SleepTimerOption) => {
    if (minutes === null) {
      setState((prev) => ({
        ...prev,
        sleepTimerEndTime: null,
        sleepTimerRemaining: null,
      }));
    } else {
      const endTime = Date.now() + minutes * 60 * 1000;
      setState((prev) => ({
        ...prev,
        sleepTimerEndTime: endTime,
        sleepTimerRemaining: minutes * 60,
      }));
    }
  }, []);

  const download = useCallback(async () => {
    const episode = state.currentEpisode;
    if (!episode) return;

    try {
      const response = await fetch(episode.enclosureUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${episode.title}.${episode.enclosureType.split("/")[1] || "mp3"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  }, [state.currentEpisode]);

  const value: PlayerContextValue = {
    ...state,
    play,
    pause,
    resume,
    seek,
    skipForward,
    skipBackward,
    setPlaybackRate,
    setSleepTimer,
    download,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}
