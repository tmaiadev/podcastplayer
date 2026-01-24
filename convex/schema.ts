import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	fetchCache: defineTable({
		cacheTag: v.string(),
		validUntil: v.number(),
		responseBody: v.string(),
		responseOptions: v.object({
			status: v.number(),
			statusText: v.string(),
			headers: v.record(v.string(), v.string()),
		}),
	}).index("byCacheTag", ["cacheTag"]),
	subscriptions: defineTable({
		userId: v.string(),
		podcastId: v.number(),
		subscribedAt: v.number(),
	})
		.index("byUserId", ["userId"])
		.index("byUserAndPodcast", ["userId", "podcastId"]),
	listeningHistory: defineTable({
		userId: v.string(),
		episodeId: v.number(),
		podcastId: v.number(),
		currentTime: v.number(),
		duration: v.number(),
		lastListenedAt: v.number(),
	})
		.index("byUserId", ["userId"])
		.index("byUserIdAndLastListened", ["userId", "lastListenedAt"])
		.index("byUserAndEpisode", ["userId", "episodeId"]),
});
