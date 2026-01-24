"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlayIcon,
  PauseIcon,
  MoreHorizontalCircle01Icon,
} from "@hugeicons/core-free-icons";
import type { SupportedLanguage } from "@/lib/i18n/constants";
import { getTranslations } from "@/lib/i18n/translations";
import { usePlayer } from "./use-player";
import { PlayerOptionsMenu } from "./player-options-menu";

interface MobilePlayerProps {
  language: SupportedLanguage;
}

export function MobilePlayer({ language }: MobilePlayerProps) {
  const t = getTranslations(language);
  const {
    currentEpisode,
    currentPodcast,
    isPlaying,
    pause,
    resume,
    currentTime,
    duration,
  } = usePlayer();

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Hide if no episode is playing
  if (!currentEpisode) {
    return null;
  }

  const imageUrl =
    currentEpisode.image ||
    currentPodcast?.image ||
    currentPodcast?.artwork ||
    "/placeholder-podcast.png";

  return (
    <div className="md:hidden">
      <div className="bg-background/80 backdrop-blur-sm rounded-2xl shadow-lg border p-1 relative overflow-hidden">
        <div className="flex items-center gap-3">
          {/* Cover Image */}
          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0">
            <Image
              src={imageUrl}
              alt={currentEpisode.title}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>

          {/* Episode Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm line-clamp-1">
              {currentEpisode.title}
            </h3>
            {currentPodcast && (
              <p className="text-xs text-muted-foreground line-clamp-1">
                {t["podcast.by"]} {currentPodcast.author || currentPodcast.title}
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Play/Pause */}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={isPlaying ? pause : resume}
              title={isPlaying ? t["player.pause"] : t["player.play"]}
            >
              <HugeiconsIcon
                icon={isPlaying ? PauseIcon : PlayIcon}
                size={20}
              />
            </Button>

            {/* Options Menu */}
            <PlayerOptionsMenu
              language={language}
              variant="mobile"
              trigger={
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm" aria-label={t["player.options"]}>
                    <HugeiconsIcon icon={MoreHorizontalCircle01Icon} size={18} />
                  </Button>
                </DropdownMenuTrigger>
              }
            />
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_var(--primary)]"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
