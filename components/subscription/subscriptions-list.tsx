"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import type { Podcast } from "@/lib/podcast-index";
import type { SupportedLanguage } from "@/lib/i18n/constants";
import type { TranslationKeys } from "@/lib/i18n/translations";
import { PodcastCard } from "@/components/podcast/podcast-card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading03Icon } from "@hugeicons/core-free-icons";
import { useSubscriptions } from "@/lib/hooks/use-subscriptions";

type SortOption = "subscribed" | "name" | "author" | "lastUpdated";

const STORAGE_KEY = "subscriptions-sort-order";

interface SubscriptionWithPodcast {
	podcastId: number;
	subscribedAt: number;
	podcast: Podcast | null;
}

interface SubscriptionsListProps {
	language: SupportedLanguage;
	translations: TranslationKeys;
}

export function SubscriptionsList({ language, translations: t }: SubscriptionsListProps) {
	const { subscriptions, isLoading } = useSubscriptions();
	const [sortOrder, setSortOrder] = useState<SortOption>(() => {
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored && ["subscribed", "name", "author", "lastUpdated"].includes(stored)) {
				return stored as SortOption;
			}
		}
		return "subscribed";
	});
	const [podcasts, setPodcasts] = useState<Map<number, Podcast>>(new Map());
	const [isLoadingPodcasts, setIsLoadingPodcasts] = useState(false);
	const podcastsRef = useRef(podcasts);
	podcastsRef.current = podcasts;

	// Save sort order to localStorage
	const handleSortChange = (value: SortOption) => {
		setSortOrder(value);
		localStorage.setItem(STORAGE_KEY, value);
	};

	// Fetch podcast details when subscriptions change
	const fetchPodcasts = useCallback(async (podcastIds: number[]) => {
		const missingIds = podcastIds.filter((id) => !podcastsRef.current.has(id));
		if (missingIds.length === 0) return;

		setIsLoadingPodcasts(true);

		try {
			const res = await fetch("/api/podcasts/batch", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ podcastIds: missingIds }),
			});
			const data = await res.json();
			setPodcasts((prev) => {
				const newPodcasts = new Map(prev);
				for (const item of data.podcasts) {
					if (item.podcast) {
						newPodcasts.set(item.id, item.podcast);
					}
				}
				return newPodcasts;
			});
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoadingPodcasts(false);
		}
	}, []);

	useEffect(() => {
		if (!subscriptions || subscriptions.length === 0) {
			return;
		}

		const podcastIds = subscriptions.map((s) => s.podcastId);
		fetchPodcasts(podcastIds);
	}, [subscriptions, fetchPodcasts]);

	// Merge subscriptions with podcast data and sort
	const sortedSubscriptions = useMemo(() => {
		if (!subscriptions) return [];

		const merged: SubscriptionWithPodcast[] = subscriptions.map((sub) => ({
			podcastId: sub.podcastId,
			subscribedAt: sub.subscribedAt,
			podcast: podcasts.get(sub.podcastId) || null,
		}));

		return merged.sort((a, b) => {
			switch (sortOrder) {
				case "subscribed":
					return b.subscribedAt - a.subscribedAt;
				case "name":
					const nameA = a.podcast?.title?.toLowerCase() || "";
					const nameB = b.podcast?.title?.toLowerCase() || "";
					return nameA.localeCompare(nameB);
				case "author":
					const authorA = (a.podcast?.author || a.podcast?.ownerName || "").toLowerCase();
					const authorB = (b.podcast?.author || b.podcast?.ownerName || "").toLowerCase();
					return authorA.localeCompare(authorB);
				case "lastUpdated":
					const updateA = a.podcast?.lastUpdateTime || 0;
					const updateB = b.podcast?.lastUpdateTime || 0;
					return updateB - updateA;
				default:
					return 0;
			}
		});
	}, [subscriptions, podcasts, sortOrder]);

	// Loading state
	if (isLoading || subscriptions === undefined) {
		return (
			<div className="flex items-center justify-center py-12">
				<HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	// Empty state
	if (subscriptions.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-muted-foreground">{t["subscriptions.noSubscriptions"]}</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Sort controls */}
			<div className="flex items-center gap-3 justify-end">
				<span className="text-sm text-muted-foreground">{t["subscriptions.sortBy"]}:</span>
				<Select value={sortOrder} onValueChange={handleSortChange}>
					<SelectTrigger className="w-48">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="subscribed">{t["subscriptions.sortBy.subscribed"]}</SelectItem>
						<SelectItem value="name">{t["subscriptions.sortBy.name"]}</SelectItem>
						<SelectItem value="author">{t["subscriptions.sortBy.author"]}</SelectItem>
						<SelectItem value="lastUpdated">{t["subscriptions.sortBy.lastUpdated"]}</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Podcasts grid */}
			{isLoadingPodcasts && podcasts.size === 0 ? (
				<div className="flex items-center justify-center py-12">
					<HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-8 animate-spin text-muted-foreground" />
				</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
					{sortedSubscriptions.map((sub) =>
						sub.podcast ? (
							<PodcastCard
								key={sub.podcastId}
								podcast={sub.podcast}
								language={language}
								className="w-full"
							/>
						) : (
							<div
								key={sub.podcastId}
								className="aspect-square bg-muted rounded-lg animate-pulse"
							/>
						)
					)}
				</div>
			)}
		</div>
	);
}
