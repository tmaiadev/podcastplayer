import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

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

const CACHE_DIR = path.join(
	process.cwd(),
	".next",
	"cache",
	"fetch-with-cache"
);
const DEFAULT_CACHE_DURATION = 3600000; // 1 hour in milliseconds
const DEFAULT_REVALIDATE = 3600; // 1 hour in seconds

async function ensureCacheDir(): Promise<void> {
	try {
		await fs.mkdir(CACHE_DIR, { recursive: true });
	} catch {
		// Directory might already exist
	}
}

function generateCacheTag(url: string): string {
	return crypto.createHash("md5").update(url).digest("hex");
}

function getCachePath(cacheTag: string): string {
	return path.join(CACHE_DIR, cacheTag);
}

async function readCache(cacheTag: string): Promise<CacheEntry | null> {
	const cachePath = getCachePath(cacheTag);
	try {
		const data = await fs.readFile(cachePath, "utf-8");
		return JSON.parse(data) as CacheEntry;
	} catch {
		return null;
	}
}

async function writeCache(cacheTag: string, entry: CacheEntry): Promise<void> {
	await ensureCacheDir();
	const cachePath = getCachePath(cacheTag);
	await fs.writeFile(cachePath, JSON.stringify(entry), "utf-8");
}

async function deleteCache(cacheTag: string): Promise<void> {
	const cachePath = getCachePath(cacheTag);
	try {
		await fs.unlink(cachePath);
	} catch {
		// File might not exist
	}
}

async function fetchWithFileCache(
	url: string | URL,
	options?: FetchWithCacheOptions
): Promise<Response> {
	const urlString = url.toString();
	const cacheTag = options?.cacheTag || generateCacheTag(urlString);
	const cacheUntil = options?.cacheUntil || Date.now() + DEFAULT_CACHE_DURATION;

	const cachedEntry = await readCache(cacheTag);
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
			await deleteCache(cacheTag);
		}
	}

	const { cacheTag: _, cacheUntil: __, ...fetchOptions } = options || {};
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

		await writeCache(cacheTag, cacheEntry);

		return new Response(responseBody, {
			status: response.status,
			statusText: response.statusText,
			headers: new Headers(headersObj),
		});
	}

	return response;
}

async function fetchWithNextCache(
	url: string | URL,
	options?: FetchWithCacheOptions
): Promise<Response> {
	const { cacheTag, cacheUntil, ...fetchOptions } = options || {};

	let revalidate = DEFAULT_REVALIDATE;
	if (cacheUntil) {
		revalidate = Math.max(0, Math.floor((cacheUntil - Date.now()) / 1000));
	}

	const nextOptions: RequestInit & {
		next?: { revalidate?: number; tags?: string[] };
	} = {
		...fetchOptions,
		next: {
			revalidate,
			...(cacheTag && { tags: [cacheTag] }),
		},
	};

	return fetch(url, nextOptions);
}

export async function fetchWithCache(
	url: string | URL,
	options?: FetchWithCacheOptions
): Promise<Response> {
	if (process.env.CUSTOM_CACHE === "true") {
		return fetchWithFileCache(url, options);
	}
	return fetchWithNextCache(url, options);
}
