"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon } from "@hugeicons/core-free-icons";
import type { SupportedLanguage } from "@/lib/i18n/constants";
import { getTranslations } from "@/lib/i18n/translations";
import { usePlayer } from "./use-player";
import type { SleepTimerOption } from "./player-context";

interface SleepTimerDropdownProps {
  language: SupportedLanguage;
}

function formatRemaining(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export function SleepTimerDropdown({ language }: SleepTimerDropdownProps) {
  const t = getTranslations(language);
  const { sleepTimerRemaining, setSleepTimer } = usePlayer();

  const options: { value: SleepTimerOption; label: string }[] = [
    { value: null, label: t["player.sleepTimer.off"] },
    { value: 5, label: `5 ${t["player.sleepTimer.minutes"]}` },
    { value: 10, label: `10 ${t["player.sleepTimer.minutes"]}` },
    { value: 15, label: `15 ${t["player.sleepTimer.minutes"]}` },
    { value: 30, label: `30 ${t["player.sleepTimer.minutes"]}` },
    { value: 60, label: t["player.sleepTimer.hour"] },
  ];

  const currentValue = sleepTimerRemaining !== null ? "active" : "null";

  const handleValueChange = (value: string) => {
    if (value === "null") {
      setSleepTimer(null);
    } else {
      setSleepTimer(parseInt(value, 10) as SleepTimerOption);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          title={t["player.sleepTimer"]}
          className="relative"
        >
          <HugeiconsIcon icon={Moon02Icon} size={20} />
          {sleepTimerRemaining !== null && (
            <span className="absolute -top-1 -right-1 text-[10px] bg-primary text-primary-foreground rounded-full px-1 min-w-[20px]">
              {formatRemaining(sleepTimerRemaining)}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuRadioGroup
          value={currentValue}
          onValueChange={handleValueChange}
        >
          {options.map((option) => (
            <DropdownMenuRadioItem
              key={option.value ?? "off"}
              value={option.value === null ? "null" : option.value.toString()}
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
