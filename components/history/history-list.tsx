"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Episode, Podcast } from "@/lib/podcast-index";
import type { SupportedLanguage } from "@/lib/i18n/constants";
import type { TranslationKeys } from "@/lib/i18n/translations";
import { HistoryCard } from "./history-card";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading03Icon } from "@hugeicons/core-free-icons";
import { useHistory } from "@/lib/hooks/use-history";

interface HistoryItem {
	episodeId: number;
	podcastId: number;
	currentTime: number;
	duration: number;
	lastListenedAt: number;
}

interface EpisodeWithPodcast {
	episode: Episode;
	podcast: Podcast;
}

interface HistoryListProps {
	language: SupportedLanguage;
	translations: TranslationKeys;
}

export function HistoryList({ language, translations: t }: HistoryListProps) {
	const [cursor, setCursor] = useState<number | undefined>(undefined);
	const [allItems, setAllItems] = useState<HistoryItem[]>([]);
	const [hasMore, setHasMore] = useState(true);
	const [episodeData, setEpisodeData] = useState<Map<number, EpisodeWithPodcast>>(new Map());
	const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(false);
	const episodeDataRef = useRef(episodeData);
	episodeDataRef.current = episodeData;

	const { history, isLoading } = useHistory(10, cursor);

	// Merge new history items when data loads
	useEffect(() => {
		if (!history) return;

		if (cursor === undefined) {
			// First load or refresh
			setAllItems(history.items as HistoryItem[]);
		} else {
			// Loading more - append new items
			setAllItems((prev) => {
				const existingIds = new Set(prev.map((item) => item.episodeId));
				const newItems = (history.items as HistoryItem[]).filter(
					(item) => !existingIds.has(item.episodeId)
				);
				return [...prev, ...newItems];
			});
		}

		setHasMore(history.nextCursor !== null);
	}, [history, cursor]);

	// Fetch episode details when history items change
	const fetchEpisodeData = useCallback(async (episodeIds: number[]) => {
		const missingIds = episodeIds.filter((id) => !episodeDataRef.current.has(id));
		if (missingIds.length === 0) return;

		setIsLoadingEpisodes(true);

		try {
			const res = await fetch("/api/episodes/batch", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ episodeIds: missingIds }),
			});
			const data = await res.json();
			setEpisodeData((prev) => {
				const newData = new Map(prev);
				for (const item of data.episodes) {
					if (item.episode && item.podcast) {
						newData.set(item.episodeId, {
							episode: item.episode,
							podcast: item.podcast,
						});
					}
				}
				return newData;
			});
		} catch (error) {
			console.error("Failed to fetch episode data:", error);
		} finally {
			setIsLoadingEpisodes(false);
		}
	}, []);

	useEffect(() => {
		if (allItems.length === 0) return;
		const episodeIds = allItems.map((item) => item.episodeId);
		fetchEpisodeData(episodeIds);
	}, [allItems, fetchEpisodeData]);

	const handleLoadMore = () => {
		if (history?.nextCursor) {
			setCursor(history.nextCursor);
		}
	};

	// Loading state
	if (isLoading && allItems.length === 0) {
		return (
			<div className="flex items-center justify-center py-12">
				<HugeiconsIcon
					icon={Loading03Icon}
					strokeWidth={2}
					className="size-8 animate-spin text-muted-foreground"
				/>
			</div>
		);
	}

	// Empty state
	if (allItems.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-muted-foreground">{t["history.noHistory"]}</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{/* History items */}
			{isLoadingEpisodes && episodeData.size === 0 ? (
				<div className="flex items-center justify-center py-12">
					<HugeiconsIcon
						icon={Loading03Icon}
						strokeWidth={2}
						className="size-8 animate-spin text-muted-foreground"
					/>
				</div>
			) : (
				<div className="space-y-3">
					{allItems.map((item) => {
						const data = episodeData.get(item.episodeId);
						if (!data) {
							return (
								<div
									key={item.episodeId}
									className="h-28 bg-muted rounded-lg animate-pulse"
								/>
							);
						}
						return (
							<HistoryCard
								key={item.episodeId}
								episode={data.episode}
								podcast={data.podcast}
								currentTime={item.currentTime}
								duration={item.duration}
								language={language}
								translations={t}
							/>
						);
					})}
				</div>
			)}

			{/* Load more button */}
			{hasMore && (
				<div className="flex justify-center pt-4">
					<Button
						variant="outline"
						onClick={handleLoadMore}
						disabled={isLoading}
					>
						{t["history.loadMore"]}
					</Button>
				</div>
			)}
		</div>
	);
}
