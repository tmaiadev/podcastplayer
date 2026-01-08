import { PodcastIndex } from '@/lib/podcast-index';
import type { Category, Podcast } from '@/lib/podcast-index';
import { CategorySection } from '@/components/podcast/category-section';
import { Separator } from '@/components/ui/separator';
import { getPreferredLanguage } from '@/lib/i18n/locale';
import { getTranslations } from '@/lib/i18n/translations';

export const revalidate = 3600;

async function fetchCategoriesWithPodcasts() {
  const api = new PodcastIndex();

  // Detect user's preferred language
  const language = await getPreferredLanguage();

  const allCategories = await api.getCategories();

  const topCategories = allCategories.slice(0, 8);

  const results = await Promise.allSettled(
    topCategories.map(async (category) => {
      const podcasts = await api.getTrending({
        max: 12,
        cat: category.name,
        lang: language, // Pass detected language to API
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

export default async function Page() {
  const data = await fetchCategoriesWithPodcasts();
  const language = await getPreferredLanguage();
  const t = getTranslations(language);

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
              <CategorySection category={category} podcasts={podcasts} language={language} />
              {index < data.length - 1 && <Separator className="mt-12" />}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
