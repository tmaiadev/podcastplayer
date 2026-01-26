"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { listeningHistory } from "@/lib/db/schema";
import { eq, and, desc, lt } from "drizzle-orm";

interface HistoryItem {
	episodeId: number;
	podcastId: number;
	currentTime: number;
	duration: number;
	lastListenedAt: number;
}

interface GetHistoryResult {
	items: HistoryItem[];
	nextCursor: number | null;
}

export async function getHistory(
	limit: number = 10,
	cursor?: number
): Promise<GetHistoryResult> {
	const { userId } = await auth();
	if (!userId) {
		return { items: [], nextCursor: null };
	}

	const conditions = [eq(listeningHistory.userId, userId)];

	if (cursor !== undefined) {
		conditions.push(lt(listeningHistory.lastListenedAt, new Date(cursor)));
	}

	const results = await db
		.select({
			episodeId: listeningHistory.episodeId,
			podcastId: listeningHistory.podcastId,
			currentTime: listeningHistory.currentTime,
			duration: listeningHistory.duration,
			lastListenedAt: listeningHistory.lastListenedAt,
		})
		.from(listeningHistory)
		.where(and(...conditions))
		.orderBy(desc(listeningHistory.lastListenedAt))
		.limit(limit + 1); // Fetch one extra to check if there are more

	const hasMore = results.length > limit;
	const items = hasMore ? results.slice(0, limit) : results;

	const formattedItems: HistoryItem[] = items.map((r) => ({
		episodeId: r.episodeId,
		podcastId: r.podcastId,
		currentTime: r.currentTime,
		duration: r.duration,
		lastListenedAt: r.lastListenedAt.getTime(),
	}));

	const nextCursor = hasMore
		? formattedItems[formattedItems.length - 1].lastListenedAt
		: null;

	return { items: formattedItems, nextCursor };
}

export async function getEpisodeProgress(episodeId: number) {
	const { userId } = await auth();
	if (!userId) {
		return null;
	}

	const result = await db
		.select({
			currentTime: listeningHistory.currentTime,
			duration: listeningHistory.duration,
		})
		.from(listeningHistory)
		.where(
			and(
				eq(listeningHistory.userId, userId),
				eq(listeningHistory.episodeId, episodeId)
			)
		)
		.limit(1);

	if (result.length === 0) {
		return null;
	}

	return {
		currentTime: result[0].currentTime,
		duration: result[0].duration,
	};
}

export async function updateProgress({
	episodeId,
	podcastId,
	currentTime,
	duration,
}: {
	episodeId: number;
	podcastId: number;
	currentTime: number;
	duration: number;
}) {
	const { userId } = await auth();
	if (!userId) {
		throw new Error("Not authenticated");
	}

	// Check if entry exists
	const existing = await db
		.select({ id: listeningHistory.id })
		.from(listeningHistory)
		.where(
			and(
				eq(listeningHistory.userId, userId),
				eq(listeningHistory.episodeId, episodeId)
			)
		)
		.limit(1);

	if (existing.length > 0) {
		// Update existing entry
		await db
			.update(listeningHistory)
			.set({
				currentTime,
				duration,
				lastListenedAt: new Date(),
			})
			.where(eq(listeningHistory.id, existing[0].id));
	} else {
		// Insert new entry
		await db.insert(listeningHistory).values({
			userId,
			episodeId,
			podcastId,
			currentTime,
			duration,
		});
	}
}
