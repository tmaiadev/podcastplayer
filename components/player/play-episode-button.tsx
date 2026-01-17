"use client";

import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon, PauseIcon } from "@hugeicons/core-free-icons";
import type { Episode, Podcast } from "@/lib/podcast-index";
import type { SupportedLanguage } from "@/lib/i18n/constants";
import { getTranslations } from "@/lib/i18n/translations";
import { usePlayer } from "./use-player";

interface PlayEpisodeButtonProps {
  episode: Episode;
  podcast: Podcast;
  language: SupportedLanguage;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  showLabel?: boolean;
  className?: string;
}

export function PlayEpisodeButton({
  episode,
  podcast,
  language,
  variant = "default",
  size = "default",
  showLabel = true,
  className,
}: PlayEpisodeButtonProps) {
  const t = getTranslations(language);
  const { currentEpisode, isPlaying, play, pause, resume } = usePlayer();

  const isCurrentEpisode = currentEpisode?.id === episode.id;
  const isCurrentlyPlaying = isCurrentEpisode && isPlaying;

  const handleClick = () => {
    if (isCurrentEpisode) {
      if (isPlaying) {
        pause();
      } else {
        resume();
      }
    } else {
      play(episode, podcast);
    }
  };

  const label = isCurrentlyPlaying ? t["player.pause"] : t["player.play"];
  const Icon = isCurrentlyPlaying ? PauseIcon : PlayIcon;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
      title={label}
    >
      <HugeiconsIcon icon={Icon} size={size.includes("icon") ? 20 : 16} />
      {showLabel && !size.includes("icon") && <span>{label}</span>}
    </Button>
  );
}
