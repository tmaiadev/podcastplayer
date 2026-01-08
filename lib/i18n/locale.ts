// Server-only utilities for language detection
import { headers } from 'next/headers';
import { parseAcceptLanguage, DEFAULT_LANGUAGE, type SupportedLanguage } from './constants';

// Re-export shared types and constants
export type { SupportedLanguage } from './constants';
export { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, isValidLanguage } from './constants';

/**
 * Gets user's preferred language from:
 * 1. Accept-Language header
 * 2. Default (en)
 *
 * NOTE: This function can only be used in Server Components
 */
export async function getPreferredLanguage(): Promise<SupportedLanguage> {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');

  if (acceptLanguage) {
    return parseAcceptLanguage(acceptLanguage);
  }

  return DEFAULT_LANGUAGE;
}
