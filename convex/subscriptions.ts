import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getUserSubscriptions = query({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return [];
		}

		const subscriptions = await ctx.db
			.query("subscriptions")
			.withIndex("byUserId", (q) => q.eq("userId", identity.subject))
			.collect();

		return subscriptions;
	},
});

export const isSubscribed = query({
	args: { podcastId: v.number() },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return false;
		}

		const subscription = await ctx.db
			.query("subscriptions")
			.withIndex("byUserAndPodcast", (q) =>
				q.eq("userId", identity.subject).eq("podcastId", args.podcastId)
			)
			.first();

		return subscription !== null;
	},
});

export const subscribe = mutation({
	args: { podcastId: v.number() },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Not authenticated");
		}

		const existing = await ctx.db
			.query("subscriptions")
			.withIndex("byUserAndPodcast", (q) =>
				q.eq("userId", identity.subject).eq("podcastId", args.podcastId)
			)
			.first();

		if (existing) {
			return existing._id;
		}

		const id = await ctx.db.insert("subscriptions", {
			userId: identity.subject,
			podcastId: args.podcastId,
			subscribedAt: Date.now(),
		});

		return id;
	},
});

export const unsubscribe = mutation({
	args: { podcastId: v.number() },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Not authenticated");
		}

		const subscription = await ctx.db
			.query("subscriptions")
			.withIndex("byUserAndPodcast", (q) =>
				q.eq("userId", identity.subject).eq("podcastId", args.podcastId)
			)
			.first();

		if (subscription) {
			await ctx.db.delete(subscription._id);
		}
	},
});
