"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MoreHorizontalCircle01Icon,
  DownloadIcon,
  Clock01Icon,
  PodcastIcon,
  PlayIcon,
  Moon02Icon,
  GoBackward30SecIcon,
  GoForward30SecIcon,
} from "@hugeicons/core-free-icons";
import type { SupportedLanguage } from "@/lib/i18n/constants";
import { getTranslations } from "@/lib/i18n/translations";
import { usePlayer } from "./use-player";
import type { PlaybackRate, SleepTimerOption } from "./player-context";

interface PlayerOptionsMenuProps {
  language: SupportedLanguage;
  variant?: "desktop" | "mobile";
  trigger?: React.ReactNode;
}

export function PlayerOptionsMenu({
  language,
  variant = "desktop",
  trigger,
}: PlayerOptionsMenuProps) {
  const isMobile = variant === "mobile";
  const t = getTranslations(language);
  const {
    currentEpisode,
    currentPodcast,
    playbackRate,
    setPlaybackRate,
    sleepTimerRemaining,
    setSleepTimer,
    download,
    skipForward,
    skipBackward,
  } = usePlayer();

  const playbackRates: PlaybackRate[] = [0.5, 1, 1.5, 2, 3];

  const sleepTimerOptions: { value: SleepTimerOption; label: string }[] = [
    { value: null, label: t["player.sleepTimer.off"] },
    { value: 5, label: `5 ${t["player.sleepTimer.minutes"]}` },
    { value: 10, label: `10 ${t["player.sleepTimer.minutes"]}` },
    { value: 15, label: `15 ${t["player.sleepTimer.minutes"]}` },
    { value: 30, label: `30 ${t["player.sleepTimer.minutes"]}` },
    { value: 60, label: t["player.sleepTimer.hour"] },
  ];

  const handleSleepTimerChange = (value: string) => {
    if (value === "null") {
      setSleepTimer(null);
    } else {
      setSleepTimer(parseInt(value, 10) as SleepTimerOption);
    }
  };

  return (
    <DropdownMenu>
      {trigger || (
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <HugeiconsIcon icon={MoreHorizontalCircle01Icon} size={20} />
          </Button>
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent align="end" className="whitespace-nowrap min-w-50">
        {/* Skip Backward - Mobile Only */}
        {isMobile && (
          <DropdownMenuItem onClick={() => skipForward(30)}>
            <HugeiconsIcon icon={GoForward30SecIcon} size={16} />
            {t["player.skipForward"]}
          </DropdownMenuItem>
        )}

        {/* Skip Forward - Mobile Only */}
        {isMobile && (
          <DropdownMenuItem onClick={() => skipBackward(30)}>
            <HugeiconsIcon icon={GoBackward30SecIcon} size={16} />
            {t["player.skipBackward"]}
          </DropdownMenuItem>
        )}

        {/* Separator if mobile */}
        {isMobile && <DropdownMenuSeparator />}

        {/* Download */}
        <DropdownMenuItem
          onClick={download}
          disabled={!currentEpisode}
        >
          <HugeiconsIcon icon={DownloadIcon} size={16} />
          {t["player.options.download"]}
        </DropdownMenuItem>

        {/* Playback Rate */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <HugeiconsIcon icon={Clock01Icon} size={16} />
            {t["player.options.playbackRate"]} ({playbackRate}x)
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={playbackRate.toString()}
              onValueChange={(v) => setPlaybackRate(parseFloat(v) as PlaybackRate)}
            >
              {playbackRates.map((rate) => (
                <DropdownMenuRadioItem key={rate} value={rate.toString()}>
                  {rate}x
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Sleep Timer - Mobile only */}
        {isMobile && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <HugeiconsIcon icon={Moon02Icon} size={16} />
              {t["player.sleepTimer"]}
              {sleepTimerRemaining !== null && (
                <span className="ml-auto text-xs text-muted-foreground">
                  {Math.ceil(sleepTimerRemaining / 60)}m
                </span>
              )}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={sleepTimerRemaining !== null ? "active" : "null"}
                onValueChange={handleSleepTimerChange}
              >
                {sleepTimerOptions.map((option) => (
                  <DropdownMenuRadioItem
                    key={option.value ?? "off"}
                    value={option.value === null ? "null" : option.value.toString()}
                  >
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}

        <DropdownMenuSeparator />

        {/* Go to Podcast */}
        {currentPodcast && (
          <DropdownMenuItem asChild>
            <Link href={`/${language}/podcast/${currentPodcast.id}`}>
              <HugeiconsIcon icon={PodcastIcon} size={16} />
              {t["player.options.goToPodcast"]}
            </Link>
          </DropdownMenuItem>
        )}

        {/* Go to Episode */}
        {currentPodcast && currentEpisode && (
          <DropdownMenuItem asChild>
            <Link
              href={`/${language}/podcast/${currentPodcast.id}/episode/${currentEpisode.id}`}
            >
              <HugeiconsIcon icon={PlayIcon} size={16} />
              {t["player.options.goToEpisode"]}
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
