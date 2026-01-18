import type { SupportedLanguage } from "./i18n/constants";
import type { TranslationKeys } from "./i18n/translations";
import { getTranslation } from "./i18n/translations";

export interface Category {
	id: number;
	name: string;
}

// All valid category IDs (1-112)
const CATEGORY_IDS = Array.from({ length: 112 }, (_, i) => i + 1);

// Popular categories for the home page (reduces API requests from 112 to 17)
export const POPULAR_CATEGORIES = [
	103, // True Crime
	16, // Comedy
	55, // News
	67, // Science
	28, // History
	26, // Fiction
	102, // Technology
	9, // Business
	77, // Society (Society and Culture)
	53, // Music
	86, // Sports
	29, // Health (Health & Fitness)
	1, // Arts
	65, // Religion (Religion and Spirituality)
	42, // Leisure
	104, // TV (TV & Film)
	20, // Education
];

/**
 * Get all categories with localized names
 */
export function getCategories(language: SupportedLanguage): Category[] {
	return CATEGORY_IDS.map((id) => ({
		id,
		name: getTranslation(language, `category.${id}` as keyof TranslationKeys),
	}));
}

/**
 * Get a single category by ID with localized name
 */
export function getCategory(
	id: number,
	language: SupportedLanguage
): Category | undefined {
	if (id < 1 || id > 112) {
		return undefined;
	}

	return {
		id,
		name: getTranslation(language, `category.${id}` as keyof TranslationKeys),
	};
}

/**
 * Get popular categories with localized names (for home page)
 */
export function getPopularCategories(language: SupportedLanguage): Category[] {
	return POPULAR_CATEGORIES.map((id) => ({
		id,
		name: getTranslation(language, `category.${id}` as keyof TranslationKeys),
	}));
}
