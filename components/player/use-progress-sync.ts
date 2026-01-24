"use client";

import { useEffect, useRef } from "react";
import { useMutation } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { usePlayer } from "./use-player";

const SYNC_INTERVAL = 10000; // 10 seconds

export function useProgressSync() {
	const { isSignedIn } = useAuth();
	const player = usePlayer();
	const updateProgress = useMutation(api.listeningHistory.updateProgress);
	const lastSyncRef = useRef<number>(0);
	const lastEpisodeIdRef = useRef<number | null>(null);

	useEffect(() => {
		if (!isSignedIn) return;
		if (!player.currentEpisode || !player.currentPodcast) return;

		const syncProgress = async () => {
			if (!player.currentEpisode || !player.currentPodcast) return;
			if (player.currentTime <= 0) return;

			try {
				await updateProgress({
					episodeId: player.currentEpisode.id,
					podcastId: player.currentPodcast.id,
					currentTime: player.currentTime,
					duration: player.duration || player.currentEpisode.duration,
				});
				lastSyncRef.current = Date.now();
			} catch (error) {
				console.error("Failed to sync progress:", error);
			}
		};

		// Sync when episode changes
		if (lastEpisodeIdRef.current !== player.currentEpisode.id) {
			lastEpisodeIdRef.current = player.currentEpisode.id;
			// Don't sync immediately on episode change - wait for playback
		}

		// Sync periodically while playing
		if (player.isPlaying) {
			const now = Date.now();
			if (now - lastSyncRef.current >= SYNC_INTERVAL) {
				syncProgress();
			}
		}

		// Set up interval for syncing while playing
		let interval: ReturnType<typeof setInterval> | null = null;
		if (player.isPlaying) {
			interval = setInterval(() => {
				const now = Date.now();
				if (now - lastSyncRef.current >= SYNC_INTERVAL) {
					syncProgress();
				}
			}, SYNC_INTERVAL);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isSignedIn, player.isPlaying, player.currentEpisode, player.currentPodcast, player.currentTime, player.duration, updateProgress]);

	// Sync on pause
	useEffect(() => {
		if (!isSignedIn) return;
		if (!player.isPaused) return;
		if (!player.currentEpisode || !player.currentPodcast) return;
		if (player.currentTime <= 0) return;

		const syncProgress = async () => {
			if (!player.currentEpisode || !player.currentPodcast) return;

			try {
				await updateProgress({
					episodeId: player.currentEpisode.id,
					podcastId: player.currentPodcast.id,
					currentTime: player.currentTime,
					duration: player.duration || player.currentEpisode.duration,
				});
				lastSyncRef.current = Date.now();
			} catch (error) {
				console.error("Failed to sync progress on pause:", error);
			}
		};

		syncProgress();
	}, [isSignedIn, player.isPaused, player.currentEpisode, player.currentPodcast, player.currentTime, player.duration, updateProgress]);
}
