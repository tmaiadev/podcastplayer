import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getHistory = query({
	args: {
		limit: v.optional(v.number()),
		cursor: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return { items: [], nextCursor: null };
		}

		const limit = args.limit ?? 50;
		const cursor = args.cursor ?? Date.now();

		const items = await ctx.db
			.query("listeningHistory")
			.withIndex("byUserIdAndLastListened", (q) =>
				q.eq("userId", identity.subject).lt("lastListenedAt", cursor)
			)
			.order("desc")
			.take(limit + 1);

		const hasMore = items.length > limit;
		const results = hasMore ? items.slice(0, limit) : items;
		const nextCursor = hasMore ? results[results.length - 1]?.lastListenedAt : null;

		return {
			items: results,
			nextCursor,
		};
	},
});

export const getEpisodeProgress = query({
	args: { episodeId: v.number() },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}

		const progress = await ctx.db
			.query("listeningHistory")
			.withIndex("byUserAndEpisode", (q) =>
				q.eq("userId", identity.subject).eq("episodeId", args.episodeId)
			)
			.first();

		return progress;
	},
});

export const updateProgress = mutation({
	args: {
		episodeId: v.number(),
		podcastId: v.number(),
		currentTime: v.number(),
		duration: v.number(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Not authenticated");
		}

		const existing = await ctx.db
			.query("listeningHistory")
			.withIndex("byUserAndEpisode", (q) =>
				q.eq("userId", identity.subject).eq("episodeId", args.episodeId)
			)
			.first();

		if (existing) {
			await ctx.db.patch(existing._id, {
				currentTime: args.currentTime,
				duration: args.duration,
				lastListenedAt: Date.now(),
			});
			return existing._id;
		}

		const id = await ctx.db.insert("listeningHistory", {
			userId: identity.subject,
			episodeId: args.episodeId,
			podcastId: args.podcastId,
			currentTime: args.currentTime,
			duration: args.duration,
			lastListenedAt: Date.now(),
		});

		return id;
	},
});
