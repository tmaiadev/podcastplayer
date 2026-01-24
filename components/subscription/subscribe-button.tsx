"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { HeartAddIcon, HeartRemoveIcon, Loading03Icon } from "@hugeicons/core-free-icons";
import type { TranslationKeys } from "@/lib/i18n/translations";
import { useState } from "react";

interface SubscribeButtonProps {
	podcastId: number;
	translations: TranslationKeys;
}

export function SubscribeButton({ podcastId, translations: t }: SubscribeButtonProps) {
	const { isSignedIn, isLoaded } = useAuth();
	const isSubscribed = useQuery(
		api.subscriptions.isSubscribed,
		isSignedIn ? { podcastId } : "skip"
	);
	const subscribe = useMutation(api.subscriptions.subscribe);
	const unsubscribe = useMutation(api.subscriptions.unsubscribe);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubscribe = async () => {
		setIsLoading(true);
		try {
			await subscribe({ podcastId });
		} finally {
			setIsLoading(false);
		}
	};

	const handleUnsubscribe = async () => {
		setIsLoading(true);
		try {
			await unsubscribe({ podcastId });
		} finally {
			setIsLoading(false);
		}
	};

	if (!isLoaded) {
		return (
			<Button disabled variant="outline" className="gap-2">
				<HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-4 animate-spin" />
				{t["subscription.subscribe"]}
			</Button>
		);
	}

	if (!isSignedIn) {
		return (
			<SignInButton mode="modal">
				<Button variant="default" className="gap-2">
					<HugeiconsIcon icon={HeartAddIcon} strokeWidth={2} className="size-4" />
					{t["subscription.subscribe"]}
				</Button>
			</SignInButton>
		);
	}

	if (isSubscribed === undefined) {
		return (
			<Button disabled variant="outline" className="gap-2">
				<HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-4 animate-spin" />
				{t["subscription.subscribe"]}
			</Button>
		);
	}

	if (isSubscribed) {
		return (
			<Button
				variant="outline"
				onClick={handleUnsubscribe}
				disabled={isLoading}
				className="gap-2"
			>
				{isLoading ? (
					<>
						<HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-4 animate-spin" />
						{t["subscription.unsubscribing"]}
					</>
				) : (
					<>
						<HugeiconsIcon icon={HeartRemoveIcon} strokeWidth={2} className="size-4" />
						{t["subscription.unsubscribe"]}
					</>
				)}
			</Button>
		);
	}

	return (
		<Button
			variant="default"
			onClick={handleSubscribe}
			disabled={isLoading}
			className="gap-2"
		>
			{isLoading ? (
				<>
					<HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-4 animate-spin" />
					{t["subscription.subscribing"]}
				</>
			) : (
				<>
					<HugeiconsIcon icon={HeartAddIcon} strokeWidth={2} className="size-4" />
					{t["subscription.subscribe"]}
				</>
			)}
		</Button>
	);
}
