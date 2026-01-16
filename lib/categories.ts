import type { SupportedLanguage } from "./i18n/constants";
import type { TranslationKeys } from "./i18n/translations";
import { getTranslation } from "./i18n/translations";

export interface Category {
	id: number;
	name: string;
}

// All valid category IDs (1-112)
const CATEGORY_IDS = Array.from({ length: 112 }, (_, i) => i + 1);

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
