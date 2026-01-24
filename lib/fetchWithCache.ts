import crypto from "crypto";
import { getConvexClient } from "./convex";
import { api } from "../convex/_generated/api";

interface CacheEntry {
	validUntil: number;
	responseBody: string;
	responseOptions: {
		status: number;
		statusText: string;
		headers: Record<string, string>;
	};
}

interface FetchWithCacheOptions extends RequestInit {
	cacheTag?: string;
	cacheUntil?: number;
}

const DEFAULT_CACHE_DURATION = 3600000; // 1 hour in milliseconds

function generateCacheTag(url: string): string {
	return crypto.createHash("md5").update(url).digest("hex");
}

export async function fetchWithCache(
	url: string | URL,
	options?: FetchWithCacheOptions
): Promise<Response> {
	const urlString = url.toString();
	const cacheTag = options?.cacheTag || generateCacheTag(urlString);
	const cacheUntil = options?.cacheUntil || Date.now() + DEFAULT_CACHE_DURATION;

	const convex = getConvexClient();

	// Try to get cached entry
	const cachedEntry = await convex.query(api.fetchCache.get, { cacheTag });

	if (cachedEntry) {
		if (cachedEntry.validUntil > Date.now()) {
			const headers = new Headers(cachedEntry.responseOptions.headers);
			if (!headers.has("content-type")) {
				headers.set("content-type", "application/json");
			}
			return new Response(cachedEntry.responseBody, {
				status: cachedEntry.responseOptions.status,
				statusText: cachedEntry.responseOptions.statusText,
				headers,
			});
		} else {
			// Remove expired entry (fire-and-forget)
			convex.mutation(api.fetchCache.remove, { cacheTag });
		}
	}

	// Fetch from origin - extract cache options to pass only valid fetch options
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { cacheTag: _cacheTag, cacheUntil: _cacheUntil, ...fetchOptions } = options || {};
	const response = await fetch(urlString, fetchOptions);

	if (response.ok) {
		const responseBody = await response.text();
		const headersObj: Record<string, string> = {};
		response.headers.forEach((value, key) => {
			headersObj[key] = value;
		});

		const cacheEntry: CacheEntry = {
			validUntil: cacheUntil,
			responseBody,
			responseOptions: {
				status: response.status,
				statusText: response.statusText,
				headers: headersObj,
			},
		};

		// Store in cache (fire-and-forget)
		convex.mutation(api.fetchCache.set, {
			cacheTag,
			...cacheEntry,
		});

		return new Response(responseBody, {
			status: response.status,
			statusText: response.statusText,
			headers: new Headers(headersObj),
		});
	}

	return response;
}
