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

  // Podcast detail page
  'podcast.episodes': string;
  'podcast.totalEpisodes': string;

  // Episodes list
  'episodes.search.placeholder': string;
  'episodes.search.noResults': string;
  'episodes.sort.newest': string;
  'episodes.sort.oldest': string;
  'episodes.duration': string;
  'episodes.published': string;
  'episodes.season': string;
  'episodes.episode': string;

  // Pagination
  'pagination.previous': string;
  'pagination.next': string;
  'pagination.page': string;
  'pagination.of': string;

  // Breadcrumb
  'breadcrumb.home': string;

  // Navigation
  'nav.discover': string;
  'nav.search': string;
  'nav.subscriptions': string;
  'nav.account': string;

  // Search page
  'search.title': string;
  'search.placeholder': string;
  'search.noResults': string;
  'search.empty': string;
  'search.results': string;
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
    'podcast.episodes': 'Episodes',
    'podcast.totalEpisodes': 'episodes',
    'episodes.search.placeholder': 'Search episodes...',
    'episodes.search.noResults': 'No episodes found',
    'episodes.sort.newest': 'Newest first',
    'episodes.sort.oldest': 'Oldest first',
    'episodes.duration': 'Duration',
    'episodes.published': 'Published',
    'episodes.season': 'Season',
    'episodes.episode': 'Episode',
    'pagination.previous': 'Previous',
    'pagination.next': 'Next',
    'pagination.page': 'Page',
    'pagination.of': 'of',
    'breadcrumb.home': 'Home',
    'nav.discover': 'Discover',
    'nav.search': 'Search',
    'nav.subscriptions': 'Subscriptions',
    'nav.account': 'Account',
    'search.title': 'Search Podcasts',
    'search.placeholder': 'Search for podcasts...',
    'search.noResults': 'No podcasts found',
    'search.empty': 'Enter a search term to find podcasts',
    'search.results': 'results',
  },
  pt: {
    'home.title': 'Descubra Podcasts',
    'home.subtitle': 'Explore programas em alta nas categorias',
    'category.shows': 'programas',
    'podcast.by': 'por',
    'error.title': 'Algo deu errado!',
    'error.message': 'Falha ao carregar podcasts',
    'error.tryAgain': 'Tentar novamente',
    'podcast.episodes': 'Episódios',
    'podcast.totalEpisodes': 'episódios',
    'episodes.search.placeholder': 'Buscar episódios...',
    'episodes.search.noResults': 'Nenhum episódio encontrado',
    'episodes.sort.newest': 'Mais recentes',
    'episodes.sort.oldest': 'Mais antigos',
    'episodes.duration': 'Duração',
    'episodes.published': 'Publicado',
    'episodes.season': 'Temporada',
    'episodes.episode': 'Episódio',
    'pagination.previous': 'Anterior',
    'pagination.next': 'Próximo',
    'pagination.page': 'Página',
    'pagination.of': 'de',
    'breadcrumb.home': 'Início',
    'nav.discover': 'Descobrir',
    'nav.search': 'Buscar',
    'nav.subscriptions': 'Inscrições',
    'nav.account': 'Conta',
    'search.title': 'Buscar Podcasts',
    'search.placeholder': 'Buscar podcasts...',
    'search.noResults': 'Nenhum podcast encontrado',
    'search.empty': 'Digite um termo para encontrar podcasts',
    'search.results': 'resultados',
  },
  es: {
    'home.title': 'Descubre Podcasts',
    'home.subtitle': 'Explora programas populares por categorías',
    'category.shows': 'programas',
    'podcast.by': 'por',
    'error.title': '¡Algo salió mal!',
    'error.message': 'Error al cargar podcasts',
    'error.tryAgain': 'Intentar de nuevo',
    'podcast.episodes': 'Episodios',
    'podcast.totalEpisodes': 'episodios',
    'episodes.search.placeholder': 'Buscar episodios...',
    'episodes.search.noResults': 'No se encontraron episodios',
    'episodes.sort.newest': 'Más recientes',
    'episodes.sort.oldest': 'Más antiguos',
    'episodes.duration': 'Duración',
    'episodes.published': 'Publicado',
    'episodes.season': 'Temporada',
    'episodes.episode': 'Episodio',
    'pagination.previous': 'Anterior',
    'pagination.next': 'Siguiente',
    'pagination.page': 'Página',
    'pagination.of': 'de',
    'breadcrumb.home': 'Inicio',
    'nav.discover': 'Descubrir',
    'nav.search': 'Buscar',
    'nav.subscriptions': 'Suscripciones',
    'nav.account': 'Cuenta',
    'search.title': 'Buscar Podcasts',
    'search.placeholder': 'Buscar podcasts...',
    'search.noResults': 'No se encontraron podcasts',
    'search.empty': 'Ingresa un término para buscar podcasts',
    'search.results': 'resultados',
  },
  fr: {
    'home.title': 'Découvrez des Podcasts',
    'home.subtitle': 'Explorez les émissions tendance par catégories',
    'category.shows': 'émissions',
    'podcast.by': 'par',
    'error.title': 'Quelque chose s\'est mal passé!',
    'error.message': 'Échec du chargement des podcasts',
    'error.tryAgain': 'Réessayer',
    'podcast.episodes': 'Épisodes',
    'podcast.totalEpisodes': 'épisodes',
    'episodes.search.placeholder': 'Rechercher des épisodes...',
    'episodes.search.noResults': 'Aucun épisode trouvé',
    'episodes.sort.newest': 'Plus récents',
    'episodes.sort.oldest': 'Plus anciens',
    'episodes.duration': 'Durée',
    'episodes.published': 'Publié',
    'episodes.season': 'Saison',
    'episodes.episode': 'Épisode',
    'pagination.previous': 'Précédent',
    'pagination.next': 'Suivant',
    'pagination.page': 'Page',
    'pagination.of': 'sur',
    'breadcrumb.home': 'Accueil',
    'nav.discover': 'Découvrir',
    'nav.search': 'Rechercher',
    'nav.subscriptions': 'Abonnements',
    'nav.account': 'Compte',
    'search.title': 'Rechercher des Podcasts',
    'search.placeholder': 'Rechercher des podcasts...',
    'search.noResults': 'Aucun podcast trouvé',
    'search.empty': 'Entrez un terme pour rechercher des podcasts',
    'search.results': 'résultats',
  },
  de: {
    'home.title': 'Entdecke Podcasts',
    'home.subtitle': 'Erkunde angesagte Shows nach Kategorien',
    'category.shows': 'Shows',
    'podcast.by': 'von',
    'error.title': 'Etwas ist schiefgelaufen!',
    'error.message': 'Podcasts konnten nicht geladen werden',
    'error.tryAgain': 'Erneut versuchen',
    'podcast.episodes': 'Episoden',
    'podcast.totalEpisodes': 'Episoden',
    'episodes.search.placeholder': 'Episoden suchen...',
    'episodes.search.noResults': 'Keine Episoden gefunden',
    'episodes.sort.newest': 'Neueste zuerst',
    'episodes.sort.oldest': 'Älteste zuerst',
    'episodes.duration': 'Dauer',
    'episodes.published': 'Veröffentlicht',
    'episodes.season': 'Staffel',
    'episodes.episode': 'Episode',
    'pagination.previous': 'Zurück',
    'pagination.next': 'Weiter',
    'pagination.page': 'Seite',
    'pagination.of': 'von',
    'breadcrumb.home': 'Startseite',
    'nav.discover': 'Entdecken',
    'nav.search': 'Suchen',
    'nav.subscriptions': 'Abonnements',
    'nav.account': 'Konto',
    'search.title': 'Podcasts suchen',
    'search.placeholder': 'Podcasts suchen...',
    'search.noResults': 'Keine Podcasts gefunden',
    'search.empty': 'Gib einen Suchbegriff ein, um Podcasts zu finden',
    'search.results': 'Ergebnisse',
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
