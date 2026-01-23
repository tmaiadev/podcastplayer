import { translations, getTranslation, getTranslations, type TranslationKeys } from '../translations';

const SUPPORTED_LANGUAGES = ['en', 'pt', 'es', 'fr', 'de'] as const;

describe('translations object', () => {
  it('contains all supported languages', () => {
    SUPPORTED_LANGUAGES.forEach((lang) => {
      expect(translations).toHaveProperty(lang);
    });
  });

  it('has the same keys for all languages', () => {
    const enKeys = Object.keys(translations.en).sort();

    SUPPORTED_LANGUAGES.forEach((lang) => {
      const langKeys = Object.keys(translations[lang]).sort();
      expect(langKeys).toEqual(enKeys);
    });
  });

  it('has non-empty values for all translations', () => {
    SUPPORTED_LANGUAGES.forEach((lang) => {
      const langTranslations = translations[lang];
      Object.entries(langTranslations).forEach(([key, value]) => {
        expect(value.trim()).not.toBe('');
      });
    });
  });

  it('contains all category translations (1-112)', () => {
    SUPPORTED_LANGUAGES.forEach((lang) => {
      for (let i = 1; i <= 112; i++) {
        const key = `category.${i}` as keyof TranslationKeys;
        expect(translations[lang][key]).toBeDefined();
        expect(translations[lang][key].trim()).not.toBe('');
      }
    });
  });

  it('contains all player translations', () => {
    const playerKeys = [
      'player.play',
      'player.pause',
      'player.skipForward',
      'player.skipBackward',
      'player.sleepTimer',
      'player.sleepTimer.off',
      'player.sleepTimer.minutes',
      'player.sleepTimer.hour',
      'player.options.download',
      'player.options.playbackRate',
      'player.noEpisode',
    ] as const;

    SUPPORTED_LANGUAGES.forEach((lang) => {
      playerKeys.forEach((key) => {
        expect(translations[lang][key]).toBeDefined();
      });
    });
  });

  it('contains all navigation translations', () => {
    const navKeys = [
      'nav.discover',
      'nav.search',
      'nav.subscriptions',
      'nav.account',
    ] as const;

    SUPPORTED_LANGUAGES.forEach((lang) => {
      navKeys.forEach((key) => {
        expect(translations[lang][key]).toBeDefined();
      });
    });
  });
});

describe('getTranslation', () => {
  it('returns correct translation for key and language', () => {
    expect(getTranslation('en', 'home.title')).toBe('Discover Podcasts');
    expect(getTranslation('pt', 'home.title')).toBe('Descubra Podcasts');
    expect(getTranslation('es', 'home.title')).toBe('Descubre Podcasts');
  });

  it('returns category name in correct language', () => {
    expect(getTranslation('en', 'category.1')).toBe('Arts');
    expect(getTranslation('pt', 'category.1')).toBe('Artes');
    expect(getTranslation('fr', 'category.1')).toBe('Arts');
    expect(getTranslation('de', 'category.1')).toBe('Kunst');
  });

  it('returns player translations', () => {
    expect(getTranslation('en', 'player.play')).toBe('Play');
    expect(getTranslation('pt', 'player.play')).toBe('Reproduzir');
    expect(getTranslation('de', 'player.play')).toBe('Abspielen');
  });

  it('returns navigation translations', () => {
    expect(getTranslation('en', 'nav.discover')).toBe('Discover');
    expect(getTranslation('es', 'nav.discover')).toBe('Descubrir');
    expect(getTranslation('fr', 'nav.discover')).toBe('Découvrir');
  });

  it('returns error translations', () => {
    expect(getTranslation('en', 'error.title')).toBe('Something went wrong!');
    expect(getTranslation('pt', 'error.title')).toBe('Algo deu errado!');
  });
});

describe('getTranslations', () => {
  it('returns entire translation object for a language', () => {
    const enTranslations = getTranslations('en');
    expect(enTranslations).toBe(translations.en);
  });

  it('returns correct translation object for each language', () => {
    SUPPORTED_LANGUAGES.forEach((lang) => {
      const langTranslations = getTranslations(lang);
      expect(langTranslations).toBe(translations[lang]);
    });
  });

  it('returns object with all expected keys', () => {
    const t = getTranslations('en');
    expect(t['home.title']).toBeDefined();
    expect(t['category.1']).toBeDefined();
    expect(t['player.play']).toBeDefined();
    expect(t['nav.discover']).toBeDefined();
  });

  it('can be used with bracket notation', () => {
    const t = getTranslations('en');
    expect(t['podcast.by']).toBe('by');
    expect(t['breadcrumb.home']).toBe('Home');
  });
});

describe('translation consistency', () => {
  it('player.play and player.pause are different', () => {
    SUPPORTED_LANGUAGES.forEach((lang) => {
      const t = getTranslations(lang);
      expect(t['player.play']).not.toBe(t['player.pause']);
    });
  });

  it('pagination translations are consistent', () => {
    SUPPORTED_LANGUAGES.forEach((lang) => {
      const t = getTranslations(lang);
      expect(t['pagination.previous']).toBeDefined();
      expect(t['pagination.next']).toBeDefined();
      expect(t['pagination.page']).toBeDefined();
      expect(t['pagination.of']).toBeDefined();
    });
  });

  it('search translations are consistent', () => {
    SUPPORTED_LANGUAGES.forEach((lang) => {
      const t = getTranslations(lang);
      expect(t['search.title']).toBeDefined();
      expect(t['search.placeholder']).toBeDefined();
      expect(t['search.noResults']).toBeDefined();
      expect(t['search.empty']).toBeDefined();
    });
  });

  it('subscription translations are consistent', () => {
    SUPPORTED_LANGUAGES.forEach((lang) => {
      const t = getTranslations(lang);
      expect(t['subscriptions.title']).toBeDefined();
      expect(t['subscriptions.notSignedIn']).toBeDefined();
      expect(t['subscriptions.signIn']).toBeDefined();
      expect(t['subscriptions.noSubscriptions']).toBeDefined();
    });
  });
});
