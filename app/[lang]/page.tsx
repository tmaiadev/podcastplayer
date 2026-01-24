import { PodcastIndex } from '@/lib/podcast-index';
import type { Podcast } from '@/lib/podcast-index';
import { getPopularCategories, POPULAR_CATEGORIES } from '@/lib/categories';
import type { Category } from '@/lib/categories';
import type { SupportedLanguage } from '@/lib/i18n/constants';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n/constants';
import { CategorySection } from '@/components/podcast/category-section';
import { LazyCategorySection } from '@/components/podcast/lazy-category-section';
import { Separator } from '@/components/ui/separator';
import { isValidLanguage } from '@/lib/i18n/constants';
import { getTranslations, getTranslation, TranslationKeys } from '@/lib/i18n/translations';
import { notFound } from 'next/navigation';

const EAGER_LOAD_COUNT = 4;

export const revalidate = 2592000; // Revalidate every month (30 days)

export async function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

function getFirstDayOfPreviousMonthEpoch(): number {
  const now = new Date();
  const firstDayPrevMonth = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth() - 1,
    1,
    0,
    0,
    0,
    0
  ));
  return Math.floor(firstDayPrevMonth.getTime() / 1000);
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

async function fetchEagerCategories(language: SupportedLanguage) {
  const api = new PodcastIndex();

  const topCategories = getPopularCategories('en').slice(0, EAGER_LOAD_COUNT);
  const results = await Promise.allSettled(
    topCategories.map(async (category) => {
      const podcasts = await api.getTrending({
        max: 12,
        cat: String(category.id),
        lang: language,
        since: getFirstDayOfPreviousMonthEpoch(),
      });
      return { category, podcasts };
    })
  );

  return results
    .filter(
      (result): result is PromiseFulfilledResult<{ category: Category; podcasts: Podcast[] }> =>
        result.status === 'fulfilled' && result.value.podcasts.length == 12
    )
    .map((result) => result.value);
}

function getLazyCategories(language: SupportedLanguage): Category[] {
  return POPULAR_CATEGORIES.slice(EAGER_LOAD_COUNT).map((id) => ({
    id,
    name: getTranslation(language, `category.${id}` as keyof TranslationKeys),
  }));
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  // Validate language parameter
  if (!isValidLanguage(lang)) {
    notFound();
  }

  const eagerData = await fetchEagerCategories(lang);
  const lazyCategories = getLazyCategories(lang);
  const t = getTranslations(lang);

  const totalSections = eagerData.length + lazyCategories.length;

  return (
    <div className="container mx-auto px-4">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-2">{t['home.title']}</h1>
        <p className="text-muted-foreground">
          {t['home.subtitle']}
        </p>
      </header>

      <div className="space-y-12">
        {/* Eager-loaded categories (server-rendered) */}
        {eagerData.map(({ category, podcasts }, index) => (
          <div key={category.id}>
            <CategorySection category={category} podcasts={podcasts} language={lang} />
            {index < totalSections - 1 && <Separator className="mt-12" />}
          </div>
        ))}

        {/* Lazy-loaded categories (client-side) */}
        {lazyCategories.map((category, index) => (
          <div key={category.id}>
            <LazyCategorySection category={category} language={lang} />
            {eagerData.length + index < totalSections - 1 && <Separator className="mt-12" />}
          </div>
        ))}
      </div>
    </div>
  );
}
