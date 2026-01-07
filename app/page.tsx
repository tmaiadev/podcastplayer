import { PodcastIndex } from '@/lib/podcast-index';
import type { Category, Podcast } from '@/lib/podcast-index';
import { CategorySection } from '@/components/podcast/category-section';
import { Separator } from '@/components/ui/separator';

export const revalidate = 3600;

async function fetchCategoriesWithPodcasts() {
  const api = new PodcastIndex();

  const allCategories = await api.getCategories();

  const topCategories = allCategories.slice(0, 8);

  const results = await Promise.allSettled(
    topCategories.map(async (category) => {
      const podcasts = await api.getTrending({
        max: 12,
        cat: category.name,
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

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Discover Podcasts</h1>
          <p className="text-muted-foreground">
            Explore trending shows across categories
          </p>
        </header>

        <div className="space-y-12">
          {data.map(({ category, podcasts }, index) => (
            <div key={category.id}>
              <CategorySection category={category} podcasts={podcasts} />
              {index < data.length - 1 && <Separator className="mt-12" />}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
