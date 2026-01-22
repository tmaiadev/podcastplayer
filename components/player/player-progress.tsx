"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "./use-player";

export function formatTime(seconds: number): string {
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
  const [draggedTime, setDraggedTime] = useState<number | null>(null);

  const handleValueChange = (value: number[]) => {
    // Update preview time while dragging (no media seeking)
    setDraggedTime(value[0]);
  };

  const handleValueCommit = (value: number[]) => {
    // Actually seek the media on release
    seek(value[0]);

    // Reset dragging state after a short delay to allow UI updates
    setTimeout(() => {
      // Reset dragging state
      setDraggedTime(null);
    }, 500);
  };

  // Use dragged time if dragging, otherwise use actual playback time
  const displayTime = draggedTime !== null ? draggedTime : currentTime;
  const displayRemaining = duration - displayTime;

  return (
    <div className={className}>
      <Slider
        value={[draggedTime !== null ? draggedTime : currentTime]}
        max={duration || 100}
        step={1}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
        disabled={duration === 0}
      />
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>{formatTime(displayTime)}</span>
        <span>-{formatTime(displayRemaining)}</span>
      </div>
    </div>
  );
}
