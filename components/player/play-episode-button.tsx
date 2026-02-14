"use client";

import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon, PauseIcon } from "@hugeicons/core-free-icons";
import type { Episode, Podcast } from "@/lib/podcast-index";
import type { SupportedLanguage } from "@/lib/i18n/constants";
import { getTranslations } from "@/lib/i18n/translations";
import { usePlayer } from "./use-player";
import { cn } from "@/lib/utils";

interface PlayEpisodeButtonProps {
  circle?: boolean;
  className?: string;
  episode: Episode;
  language: SupportedLanguage;
  podcast: Podcast;
  showLabel?: boolean;
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  variant?: "default" | "outline" | "ghost";
}

export function PlayEpisodeButton({
  circle = false,
  className,
  episode,
  language,
  podcast,
  showLabel = true,
  size = "default",
  variant = "default",
}: PlayEpisodeButtonProps) {
  const t = getTranslations(language);
  const { currentEpisode, isPlaying, play, pause, resume } = usePlayer();

  const isCurrentEpisode = currentEpisode?.id === episode.id;
  const isCurrentlyPlaying = isCurrentEpisode && isPlaying;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

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
      className={cn(circle && "rounded-full aspect-square flex items-center justify-center p-0", className)}
      onClick={handleClick}
      size={size}
      title={label}
      variant={variant}
    >
      <HugeiconsIcon icon={Icon} size={size.includes("icon") ? 20 : 16} />
      {showLabel && !circle && !size.includes("icon") && <span>{label}</span>}
    </Button>
  );
}
