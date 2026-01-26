"use client";

import useSWR from "swr";
import { useCallback } from "react";
import {
	getUserSubscriptions,
	isSubscribed as checkIsSubscribed,
	subscribe as doSubscribe,
	unsubscribe as doUnsubscribe,
} from "@/lib/actions/subscriptions";

export function useSubscriptions() {
	const { data, error, isLoading, mutate } = useSWR(
		"subscriptions",
		() => getUserSubscriptions(),
		{
			revalidateOnFocus: false,
		}
	);

	return {
		subscriptions: data,
		isLoading,
		error,
		mutate,
	};
}

export function useIsSubscribed(podcastId: number) {
	const { data, error, isLoading, mutate } = useSWR(
		["isSubscribed", podcastId],
		() => checkIsSubscribed(podcastId),
		{
			revalidateOnFocus: false,
		}
	);

	return {
		isSubscribed: data,
		isLoading,
		error,
		mutate,
	};
}

export function useSubscribeMutation() {
	const subscribe = useCallback(async (podcastId: number) => {
		await doSubscribe(podcastId);
	}, []);

	const unsubscribe = useCallback(async (podcastId: number) => {
		await doUnsubscribe(podcastId);
	}, []);

	return { subscribe, unsubscribe };
}
