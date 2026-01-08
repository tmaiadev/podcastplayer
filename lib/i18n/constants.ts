// Shared constants that can be used in both client and server components
export const SUPPORTED_LANGUAGES = ['en', 'pt', 'es', 'fr', 'de'] as const;
export const DEFAULT_LANGUAGE = 'en';

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

/**
 * Parses Accept-Language header and returns best match
 * Example: "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7" -> "pt"
 */
export function parseAcceptLanguage(acceptLanguage: string): SupportedLanguage {
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, qValue] = lang.trim().split(';q=');
      const langCode = code.split('-')[0].toLowerCase();
      const quality = qValue ? parseFloat(qValue) : 1.0;
      return { code: langCode, quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { code } of languages) {
    if (SUPPORTED_LANGUAGES.includes(code as SupportedLanguage)) {
      return code as SupportedLanguage;
    }
  }

  return DEFAULT_LANGUAGE;
}

/**
 * Validates if a language code is supported
 */
export function isValidLanguage(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}
