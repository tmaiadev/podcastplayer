"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlayIcon,
  PauseIcon,
  GoForward30SecIcon,
  GoBackward30SecIcon,
} from "@hugeicons/core-free-icons";
import type { SupportedLanguage } from "@/lib/i18n/constants";
import { getTranslations } from "@/lib/i18n/translations";
import { usePlayer } from "./use-player";
import { PlayerProgress } from "./player-progress";
import { SleepTimerDropdown } from "./sleep-timer-dropdown";
import { PlayerOptionsMenu } from "./player-options-menu";
import { cn } from "@/lib/utils";

interface SidebarPlayerProps {
  language: SupportedLanguage;
}

export function SidebarPlayer({ language }: SidebarPlayerProps) {
  const t = getTranslations(language);
  const {
    currentEpisode,
    currentPodcast,
    isPlaying,
    pause,
    resume,
    skipForward,
    skipBackward,
  } = usePlayer();

  const hasEpisode = currentEpisode !== null;
  const imageUrl =
    currentEpisode?.image ||
    currentPodcast?.image ||
    currentPodcast?.artwork ||
    "/placeholder-podcast.png";

  return (
    <div
      className={cn(
        "p-4 space-y-3 transition-opacity",
        !hasEpisode && "opacity-50 pointer-events-none"
      )}
    >
      {/* Cover Image */}
      <div className="aspect-square relative rounded-lg overflow-hidden bg-muted hidden-[414px]">
        {hasEpisode ? (
          <Image
            src={imageUrl}
            alt={currentEpisode?.title || ""}
            fill
            className="object-cover"
            sizes="(max-width: 256px) 100vw, 256px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <span className="text-sm">{t["player.noEpisode"]}</span>
          </div>
        )}
      </div>

      {/* Episode Info */}
      <div className="space-y-1 min-h-[52px]">
        <h3 className="font-semibold text-sm line-clamp-2">
          {currentEpisode?.title || t["player.noEpisode"]}
        </h3>
        {currentPodcast && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            {t["podcast.by"]} {currentPodcast.author || currentPodcast.title}
          </p>
        )}
      </div>

      {/* Progress Bar */}
      <PlayerProgress />

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Sleep Timer */}
        <SleepTimerDropdown language={language} />

        {/* Skip Backward */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => skipBackward(30)}
          title={t["player.skipBackward"]}
          disabled={!hasEpisode}
        >
          <HugeiconsIcon icon={GoBackward30SecIcon} size={20} />
        </Button>

        {/* Play/Pause */}
        <Button
          variant="default"
          size="icon"
          onClick={isPlaying ? pause : resume}
          title={isPlaying ? t["player.pause"] : t["player.play"]}
          disabled={!hasEpisode}
          className="rounded-full"
        >
          <HugeiconsIcon
            icon={isPlaying ? PauseIcon : PlayIcon}
            size={20}
          />
        </Button>

        {/* Skip Forward */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => skipForward(30)}
          title={t["player.skipForward"]}
          disabled={!hasEpisode}
        >
          <HugeiconsIcon icon={GoForward30SecIcon} size={20} />
        </Button>

        {/* Options Menu */}
        <PlayerOptionsMenu language={language} variant="desktop" />
      </div>
    </div>
  );
}
