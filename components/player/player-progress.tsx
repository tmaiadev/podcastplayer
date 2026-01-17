"use client";

import { Slider } from "@/components/ui/slider";
import { usePlayer } from "./use-player";

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

interface PlayerProgressProps {
  className?: string;
}

export function PlayerProgress({ className }: PlayerProgressProps) {
  const { currentTime, duration, seek } = usePlayer();

  const handleSeek = (value: number[]) => {
    seek(value[0]);
  };

  const remaining = duration - currentTime;

  return (
    <div className={className}>
      <Slider
        value={[currentTime]}
        max={duration || 100}
        step={1}
        onValueChange={handleSeek}
        disabled={duration === 0}
      />
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>{formatTime(currentTime)}</span>
        <span>-{formatTime(remaining)}</span>
      </div>
    </div>
  );
}
