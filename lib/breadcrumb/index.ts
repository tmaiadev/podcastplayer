import type {
	BreadcrumbParams,
	BreadcrumbItem,
	BreadcrumbOrigin,
} from "./types";
import type { SupportedLanguage } from "@/lib/i18n/constants";
import { getCategory } from "@/lib/categories";
import { getTranslations } from "@/lib/i18n/translations";

export type { BreadcrumbParams, BreadcrumbItem, BreadcrumbOrigin };

/**
 * Parse breadcrumb params from URL search params
 */
export function parseBreadcrumbParams(
	searchParams: Record<string, string | string[] | undefined>,
): BreadcrumbParams {
	const from = searchParams.from as BreadcrumbOrigin | undefined;
	const catIdRaw = searchParams.catId;
	const q = searchParams.q as string | undefined;

	// Validate 'from' parameter
	const validOrigins: BreadcrumbOrigin[] = [
		"home",
		"category",
		"search",
		"subscriptions",
		"history",
	];
	const validFrom = from && validOrigins.includes(from) ? from : undefined;

	// Parse catId as number
	const catId =
		typeof catIdRaw === "string" ? parseInt(catIdRaw, 10) : undefined;
	const validCatId =
		catId && !isNaN(catId) && catId >= 1 && catId <= 112 ? catId : undefined;

	return {
		from: validFrom,
		catId: validCatId,
		q: q || undefined,
	};
}

interface BuildBreadcrumbTrailOptions {
	language: SupportedLanguage;
	params: BreadcrumbParams;
	podcastTitle?: string;
	podcastId?: number;
	episodeTitle?: string;
}

/**
 * Build a breadcrumb trail based on navigation context
 */
export function buildBreadcrumbTrail({
	language,
	params,
	podcastTitle,
	podcastId,
	episodeTitle,
}: BuildBreadcrumbTrailOptions): BreadcrumbItem[] {
	const t = getTranslations(language);
	const trail: BreadcrumbItem[] = [];

	// Add context-specific intermediate items
	if (params.from === "category" && params.catId) {
		trail.push({
			label: t["breadcrumb.home"],
			href: `/${language}`,
		});

		const category = getCategory(params.catId, language);
		if (category) {
			trail.push({
				label: category.name,
				href: `/${language}/cat/${params.catId}`,
			});
		}
	} else if (params.from === "search" && params.q) {
		trail.push({
			label: `${t["breadcrumb.search"]}: "${params.q}"`,
			href: `/${language}/search?q=${encodeURIComponent(params.q)}`,
		});
	} else if (params.from === "history") {
		trail.push({
			label: t["breadcrumb.history"],
			href: `/${language}/history`,
		});
	}

	// Add podcast if we have a title
	if (podcastTitle) {
		if (episodeTitle && podcastId) {
			// Podcast is intermediate link when viewing episode
			trail.push({
				label: podcastTitle,
				href: buildPodcastUrl(language, podcastId, params),
			});
		} else {
			// Podcast is current page (no href)
			trail.push({
				label: podcastTitle,
			});
		}
	}

	// Add episode as current page (no href)
	if (episodeTitle) {
		trail.push({
			label: episodeTitle,
		});
	}

	return trail;
}

/**
 * Build podcast URL with breadcrumb context params
 */
export function buildPodcastUrl(
	language: SupportedLanguage,
	podcastId: number,
	params?: BreadcrumbParams,
): string {
	const base = `/${language}/podcast/${podcastId}`;

	if (!params || !params.from) {
		return base;
	}

	const searchParams = new URLSearchParams();

	if (params.from) {
		searchParams.set("from", params.from);
	}

	if (params.from === "category" && params.catId) {
		searchParams.set("catId", String(params.catId));
	}

	if (params.from === "search" && params.q) {
		searchParams.set("q", params.q);
	}

	const queryString = searchParams.toString();
	return queryString ? `${base}?${queryString}` : base;
}

/**
 * Build episode URL with breadcrumb context params
 */
export function buildEpisodeUrl(
	language: SupportedLanguage,
	podcastId: number,
	episodeId: number,
	params?: BreadcrumbParams,
): string {
	const base = `/${language}/podcast/${podcastId}/episode/${episodeId}`;

	if (!params || !params.from) {
		return base;
	}

	const searchParams = new URLSearchParams();

	if (params.from) {
		searchParams.set("from", params.from);
	}

	if (params.from === "category" && params.catId) {
		searchParams.set("catId", String(params.catId));
	}

	if (params.from === "search" && params.q) {
		searchParams.set("q", params.q);
	}

	const queryString = searchParams.toString();
	return queryString ? `${base}?${queryString}` : base;
}
