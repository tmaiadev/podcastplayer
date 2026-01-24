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
});
