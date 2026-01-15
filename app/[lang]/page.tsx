import { PodcastIndex } from '@/lib/podcast-index';
import type { Category, Podcast } from '@/lib/podcast-index';
import type { SupportedLanguage } from '@/lib/i18n/constants';
import { CategorySection } from '@/components/podcast/category-section';
import { Separator } from '@/components/ui/separator';
import { isValidLanguage } from '@/lib/i18n/locale';
import { getTranslations } from '@/lib/i18n/translations';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

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

async function fetchCategoriesWithPodcasts(language: SupportedLanguage) {
  const api = new PodcastIndex();

  const allCategories = await api.getCategories();

  const topCategories = allCategories.slice(0, 8);

  const results = await Promise.allSettled(
    topCategories.map(async (category) => {
      const podcasts = await api.getTrending({
        max: 12,
        cat: category.name,
        lang: language,
        since: getFirstDayOfPreviousMonthEpoch(),
      });
      return { category, podcasts };
    })
  );

  return results
    .filter(
      (result): result is PromiseFulfilledResult<{ category: Category; podcasts: Podcast[] }> =>
        result.status === 'fulfilled'
    )
    .map((result) => result.value);
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  // Validate language parameter
  if (!isValidLanguage(lang)) {
    notFound();
  }

  const data = await fetchCategoriesWithPodcasts(lang);
  const t = getTranslations(lang);

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2">{t['home.title']}</h1>
          <p className="text-muted-foreground">
            {t['home.subtitle']}
          </p>
        </header>

        <div className="space-y-12">
          {data.map(({ category, podcasts }, index) => (
            <div key={category.id}>
              <CategorySection category={category} podcasts={podcasts} language={lang} />
              {index < data.length - 1 && <Separator className="mt-12" />}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
