"use client";

import useSWR from "swr";
import { useCallback } from "react";
import {
	getHistory,
	updateProgress as doUpdateProgress,
} from "@/lib/actions/history";

export function useHistory(limit: number = 10, cursor?: number) {
	const { data, error, isLoading, mutate } = useSWR(
		["history", limit, cursor],
		() => getHistory(limit, cursor),
		{
			revalidateOnFocus: false,
		}
	);

	return {
		history: data,
		isLoading,
		error,
		mutate,
	};
}

export function useUpdateProgress() {
	const updateProgress = useCallback(
		async ({
			episodeId,
			podcastId,
			currentTime,
			duration,
		}: {
			episodeId: number;
			podcastId: number;
			currentTime: number;
			duration: number;
		}) => {
			await doUpdateProgress({ episodeId, podcastId, currentTime, duration });
		},
		[]
	);

	return { updateProgress };
}
