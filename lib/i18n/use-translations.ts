'use client';

import { useState } from 'react';
import { getTranslations } from './translations';
import { DEFAULT_LANGUAGE, type SupportedLanguage } from './constants';
import type { TranslationKeys } from './translations';

/**
 * Client-side hook to get translations based on HTML lang attribute
 */
export function useTranslations(): TranslationKeys {
  const [language] = useState<SupportedLanguage>(() => {
    if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
    return (document.documentElement.lang as SupportedLanguage) || DEFAULT_LANGUAGE;
  });

  return getTranslations(language);
}
