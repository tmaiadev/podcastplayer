import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

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

const CACHE_DIR = path.join(process.cwd(), 'cache');
const DEFAULT_CACHE_DURATION = 3600000; // 1 hour in milliseconds

async function ensureCacheDir(): Promise<void> {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
  } catch {
    // Directory might already exist
  }
}

function generateCacheTag(url: string): string {
  return crypto.createHash('md5').update(url).digest('hex');
}

function getCachePath(cacheTag: string): string {
  return path.join(CACHE_DIR, cacheTag);
}

async function readCache(cacheTag: string): Promise<CacheEntry | null> {
  const cachePath = getCachePath(cacheTag);
  try {
    const data = await fs.readFile(cachePath, 'utf-8');
    return JSON.parse(data) as CacheEntry;
  } catch {
    return null;
  }
}

async function writeCache(cacheTag: string, entry: CacheEntry): Promise<void> {
  await ensureCacheDir();
  const cachePath = getCachePath(cacheTag);
  await fs.writeFile(cachePath, JSON.stringify(entry), 'utf-8');
}

async function deleteCache(cacheTag: string): Promise<void> {
  const cachePath = getCachePath(cacheTag);
  try {
    await fs.unlink(cachePath);
  } catch {
    // File might not exist
  }
}

export async function fetchWithCache(
  url: string | URL,
  options?: FetchWithCacheOptions
): Promise<Response> {
  const urlString = url.toString();
  const cacheTag = options?.cacheTag || generateCacheTag(urlString);
  const cacheUntil = options?.cacheUntil || Date.now() + DEFAULT_CACHE_DURATION;

  // Check for cached response
  const cachedEntry = await readCache(cacheTag);
  if (cachedEntry) {
    if (cachedEntry.validUntil > Date.now()) {
      // Cache is still valid - reconstruct Response with proper headers
      const headers = new Headers(cachedEntry.responseOptions.headers);
      // Ensure content-type is set for JSON responses
      if (!headers.has('content-type')) {
        headers.set('content-type', 'application/json');
      }
      return new Response(cachedEntry.responseBody, {
        status: cachedEntry.responseOptions.status,
        statusText: cachedEntry.responseOptions.statusText,
        headers,
      });
    } else {
      // Cache expired, delete it
      await deleteCache(cacheTag);
    }
  }

  // Extract fetch options (remove custom cache options)
  const { cacheTag: _, cacheUntil: __, ...fetchOptions } = options || {};

  // Perform actual fetch
  const response = await fetch(urlString, fetchOptions);

  // Only cache successful responses
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

    // Return a new Response since we consumed the body
    const responseHeaders = new Headers(headersObj);
    return new Response(responseBody, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  }

  return response;
}
