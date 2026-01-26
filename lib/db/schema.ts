import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

export const subscriptions = sqliteTable(
	"subscriptions",
	{
		id: integer("id").primaryKey({ autoIncrement: true }),
		userId: text("user_id").notNull(),
		podcastId: integer("podcast_id").notNull(),
		subscribedAt: integer("subscribed_at", { mode: "timestamp_ms" })
			.notNull()
			.$defaultFn(() => new Date()),
	},
	(table) => [
		index("subscriptions_user_id_idx").on(table.userId),
		index("subscriptions_user_podcast_idx").on(table.userId, table.podcastId),
	]
);

export const listeningHistory = sqliteTable(
	"listening_history",
	{
		id: integer("id").primaryKey({ autoIncrement: true }),
		userId: text("user_id").notNull(),
		episodeId: integer("episode_id").notNull(),
		podcastId: integer("podcast_id").notNull(),
		currentTime: integer("current_time").notNull(),
		duration: integer("duration").notNull(),
		lastListenedAt: integer("last_listened_at", { mode: "timestamp_ms" })
			.notNull()
			.$defaultFn(() => new Date()),
	},
	(table) => [
		index("history_user_id_idx").on(table.userId),
		index("history_user_last_listened_idx").on(table.userId, table.lastListenedAt),
		index("history_user_episode_idx").on(table.userId, table.episodeId),
	]
);

export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
export type ListeningHistoryEntry = typeof listeningHistory.$inferSelect;
export type NewListeningHistoryEntry = typeof listeningHistory.$inferInsert;
