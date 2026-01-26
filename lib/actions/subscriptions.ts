"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function getUserSubscriptions() {
	const { userId } = await auth();
	if (!userId) {
		return [];
	}

	const results = await db
		.select({
			podcastId: subscriptions.podcastId,
			subscribedAt: subscriptions.subscribedAt,
		})
		.from(subscriptions)
		.where(eq(subscriptions.userId, userId))
		.orderBy(subscriptions.subscribedAt);

	return results.map((r) => ({
		podcastId: r.podcastId,
		subscribedAt: r.subscribedAt.getTime(),
	}));
}

export async function isSubscribed(podcastId: number) {
	const { userId } = await auth();
	if (!userId) {
		return false;
	}

	const result = await db
		.select({ id: subscriptions.id })
		.from(subscriptions)
		.where(
			and(
				eq(subscriptions.userId, userId),
				eq(subscriptions.podcastId, podcastId)
			)
		)
		.limit(1);

	return result.length > 0;
}

export async function subscribe(podcastId: number) {
	const { userId } = await auth();
	if (!userId) {
		throw new Error("Not authenticated");
	}

	// Check if already subscribed
	const existing = await db
		.select({ id: subscriptions.id })
		.from(subscriptions)
		.where(
			and(
				eq(subscriptions.userId, userId),
				eq(subscriptions.podcastId, podcastId)
			)
		)
		.limit(1);

	if (existing.length > 0) {
		return; // Already subscribed
	}

	await db.insert(subscriptions).values({
		userId,
		podcastId,
	});
}

export async function unsubscribe(podcastId: number) {
	const { userId } = await auth();
	if (!userId) {
		throw new Error("Not authenticated");
	}

	await db
		.delete(subscriptions)
		.where(
			and(
				eq(subscriptions.userId, userId),
				eq(subscriptions.podcastId, podcastId)
			)
		);
}
