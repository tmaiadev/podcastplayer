import type { SupportedLanguage } from './constants';

export type TranslationKeys = {
  // Homepage
  'home.title': string;
  'home.subtitle': string;

  // Category section
  'category.shows': string;

  // Podcast card
  'podcast.by': string;

  // Error page
  'error.title': string;
  'error.message': string;
  'error.tryAgain': string;
};

export const translations: Record<SupportedLanguage, TranslationKeys> = {
  en: {
    'home.title': 'Discover Podcasts',
    'home.subtitle': 'Explore trending shows across categories',
    'category.shows': 'shows',
    'podcast.by': 'by',
    'error.title': 'Something went wrong!',
    'error.message': 'Failed to load podcasts',
    'error.tryAgain': 'Try again',
  },
  pt: {
    'home.title': 'Descubra Podcasts',
    'home.subtitle': 'Explore programas em alta nas categorias',
    'category.shows': 'programas',
    'podcast.by': 'por',
    'error.title': 'Algo deu errado!',
    'error.message': 'Falha ao carregar podcasts',
    'error.tryAgain': 'Tentar novamente',
  },
  es: {
    'home.title': 'Descubre Podcasts',
    'home.subtitle': 'Explora programas populares por categorías',
    'category.shows': 'programas',
    'podcast.by': 'por',
    'error.title': '¡Algo salió mal!',
    'error.message': 'Error al cargar podcasts',
    'error.tryAgain': 'Intentar de nuevo',
  },
  fr: {
    'home.title': 'Découvrez des Podcasts',
    'home.subtitle': 'Explorez les émissions tendance par catégories',
    'category.shows': 'émissions',
    'podcast.by': 'par',
    'error.title': 'Quelque chose s\'est mal passé!',
    'error.message': 'Échec du chargement des podcasts',
    'error.tryAgain': 'Réessayer',
  },
  de: {
    'home.title': 'Entdecke Podcasts',
    'home.subtitle': 'Erkunde angesagte Shows nach Kategorien',
    'category.shows': 'Shows',
    'podcast.by': 'von',
    'error.title': 'Etwas ist schiefgelaufen!',
    'error.message': 'Podcasts konnten nicht geladen werden',
    'error.tryAgain': 'Erneut versuchen',
  },
};

/**
 * Get translation for a specific key and language
 */
export function getTranslation(
  language: SupportedLanguage,
  key: keyof TranslationKeys
): string {
  return translations[language][key];
}

/**
 * Get all translations for a specific language
 */
export function getTranslations(language: SupportedLanguage): TranslationKeys {
  return translations[language];
}
