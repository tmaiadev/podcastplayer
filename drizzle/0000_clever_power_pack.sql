CREATE TABLE `listening_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`episode_id` integer NOT NULL,
	`podcast_id` integer NOT NULL,
	`current_time` integer NOT NULL,
	`duration` integer NOT NULL,
	`last_listened_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `history_user_id_idx` ON `listening_history` (`user_id`);--> statement-breakpoint
CREATE INDEX `history_user_last_listened_idx` ON `listening_history` (`user_id`,`last_listened_at`);--> statement-breakpoint
CREATE INDEX `history_user_episode_idx` ON `listening_history` (`user_id`,`episode_id`);--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`podcast_id` integer NOT NULL,
	`subscribed_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `subscriptions_user_id_idx` ON `subscriptions` (`user_id`);--> statement-breakpoint
CREATE INDEX `subscriptions_user_podcast_idx` ON `subscriptions` (`user_id`,`podcast_id`);