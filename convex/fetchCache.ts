import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
	args: { cacheTag: v.string() },
	handler: async (ctx, args) => {
		return await ctx.db
			.query("fetchCache")
			.withIndex("byCacheTag", (q) => q.eq("cacheTag", args.cacheTag))
			.first();
	},
});

export const set = mutation({
	args: {
		cacheTag: v.string(),
		validUntil: v.number(),
		responseBody: v.string(),
		responseOptions: v.object({
			status: v.number(),
			statusText: v.string(),
			headers: v.record(v.string(), v.string()),
		}),
	},
	handler: async (ctx, args) => {
		const existing = await ctx.db
			.query("fetchCache")
			.withIndex("byCacheTag", (q) => q.eq("cacheTag", args.cacheTag))
			.first();

		if (existing) {
			await ctx.db.patch(existing._id, {
				validUntil: args.validUntil,
				responseBody: args.responseBody,
				responseOptions: args.responseOptions,
			});
		} else {
			await ctx.db.insert("fetchCache", {
				cacheTag: args.cacheTag,
				validUntil: args.validUntil,
				responseBody: args.responseBody,
				responseOptions: args.responseOptions,
			});
		}
	},
});

export const remove = mutation({
	args: { cacheTag: v.string() },
	handler: async (ctx, args) => {
		const existing = await ctx.db
			.query("fetchCache")
			.withIndex("byCacheTag", (q) => q.eq("cacheTag", args.cacheTag))
			.first();

		if (existing) {
			await ctx.db.delete(existing._id);
		}
	},
});
