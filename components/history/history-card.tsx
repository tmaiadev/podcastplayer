"use client";

import Image from "next/image";
import Link from "next/link";
import type { Episode, Podcast } from "@/lib/podcast-index";
import type { SupportedLanguage } from "@/lib/i18n/constants";
import type { TranslationKeys } from "@/lib/i18n/translations";
import { usePlayer } from "@/components/player";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { HugeiconsIcon } from "@hugeicons/react";
import { PauseIcon, PlayIcon } from "@hugeicons/core-free-icons";

function formatDuration(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = Math.floor(seconds % 60);

	if (hours > 0) {
		return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	}
	return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

interface HistoryCardProps {
	episode: Episode;
	podcast: Podcast;
	currentTime: number;
	duration: number;
	language: SupportedLanguage;
	translations: TranslationKeys;
}

export function HistoryCard({
	episode,
	podcast,
	currentTime,
	duration,
	language,
	translations: t,
}: HistoryCardProps) {
	const player = usePlayer();
	const progressPercent = duration > 0 ? Math.round((currentTime / duration) * 100) : 0;
	const remainingTime = Math.max(0, duration - currentTime);

	const isThisEpisodePlaying =
		player.currentEpisode?.id === episode.id && player.isPlaying;

	const handleTogglePlayback = () => {
		if (isThisEpisodePlaying) {
			player.pause();
		} else {
			player.play(episode, podcast, currentTime);
		}
	};

	const imageUrl = episode.image || podcast.artwork || podcast.image;

	return (
		<div className="flex gap-4 p-4 md:rounded-lg border-y md:border-x bg-card hover:bg-accent/50 transition-colors -mx-4 md:mx-0">
			{/* Episode image */}
			<Link
				href={`/${language}/podcast/${podcast.id}/episode/${episode.id}?from=history`}
				className="shrink-0"
			>
				<div className="relative w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden bg-muted">
					{imageUrl && (
						<Image
							src={imageUrl}
							alt={episode.title}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 80px, 96px"
						/>
					)}
				</div>
			</Link>

			{/* Content */}
			<div className="flex-1 min-w-0 flex flex-col justify-between">
				<div>
					{/* Episode title */}
					<h3 className="font-semibold text-sm md:text-base line-clamp-2">
						<Link
							href={`/${language}/podcast/${podcast.id}/episode/${episode.id}?from=history`}
							className="hover:text-primary">
							{episode.title}
						</Link>
					</h3>

					{/* Podcast name */}
					<Link
						href={`/${language}/podcast/${podcast.id}?from=history`}
						className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-1"
					>
						{podcast.title}
					</Link>
				</div>

				{/* Progress section */}
				<div className="mt-2 space-y-2">
					<div className="flex items-center gap-2">
						<span className="text-xs text-muted-foreground whitespace-nowrap">
							{formatDuration(currentTime)}
						</span>
						<Progress value={progressPercent} className="h-1.5 flex-1" />
						<span className="text-xs text-muted-foreground whitespace-nowrap">
							{formatDuration(remainingTime)}
						</span>
					</div>
				</div>
			</div>

			{/* Play/Pause button */}
			<div className="flex items-center">
				<Button
					size="sm"
					variant="outline"
					onClick={handleTogglePlayback}
					className="gap-1.5"
					aria-label={isThisEpisodePlaying ? t["player.pause"] : t["history.continue"]}
				>
					<HugeiconsIcon icon={isThisEpisodePlaying ? PauseIcon : PlayIcon} size={14} />
				</Button>
			</div>
		</div>
	);
}
