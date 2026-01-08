'use client';

import { useState, useEffect } from 'react';
import { getTranslations } from './translations';
import { DEFAULT_LANGUAGE, type SupportedLanguage } from './constants';
import type { TranslationKeys } from './translations';

/**
 * Client-side hook to get translations based on HTML lang attribute
 */
export function useTranslations(): TranslationKeys {
  const [language, setLanguage] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);

  useEffect(() => {
    // Get language from HTML lang attribute set by server
    const htmlLang = document.documentElement.lang as SupportedLanguage;
    if (htmlLang) {
      setLanguage(htmlLang);
    }
  }, []);

  return getTranslations(language);
}
