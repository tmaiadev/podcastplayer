"use client";

import type { ReactNode } from "react";
import { PlayerProvider } from "./player-context";
import { useProgressSync } from "./use-progress-sync";

function ProgressSyncWrapper({ children }: { children: ReactNode }) {
	useProgressSync();
	return <>{children}</>;
}

interface PlayerProviderWithSyncProps {
	children: ReactNode;
}

export function PlayerProviderWithSync({ children }: PlayerProviderWithSyncProps) {
	return (
		<PlayerProvider>
			<ProgressSyncWrapper>{children}</ProgressSyncWrapper>
		</PlayerProvider>
	);
}
