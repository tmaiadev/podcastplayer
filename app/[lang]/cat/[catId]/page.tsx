import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PodcastIndex } from '@/lib/podcast-index';
import type { Podcast } from '@/lib/podcast-index';
import { getCategory } from '@/lib/categories';
import { PodcastCard } from '@/components/podcast/podcast-card';
import { isValidLanguage } from '@/lib/i18n/constants';
import { getTranslations } from '@/lib/i18n/translations';
import type { BreadcrumbParams } from '@/lib/breadcrumb';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export const revalidate = 86400; // Revalidate every day
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

interface PageProps {
  params: Promise<{ lang: string; catId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, catId } = await params;

  if (!isValidLanguage(lang)) {
    return {};
  }

  const categoryId = parseInt(catId, 10);
  const category = getCategory(categoryId, lang);

  if (!category) {
    return {};
  }

  return {
    title: category.name,
    description: `Top trending ${category.name.toLowerCase()} podcasts`,
  };
}

async function fetchTrendingPodcasts(categoryId: number, lang: string): Promise<Podcast[]> {
  try {
    const api = new PodcastIndex();
    return await api.getTrending({
      max: 50,
      cat: String(categoryId),
      lang: lang,
    });
  } catch {
    return [];
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { lang, catId } = await params;

  // Validate language parameter
  if (!isValidLanguage(lang)) {
    notFound();
  }

  // Parse and validate category ID
  const categoryId = parseInt(catId, 10);
  if (isNaN(categoryId) || categoryId < 1 || categoryId > 112) {
    notFound();
  }

  // Get localized category for display
  const categoryLocalized = getCategory(categoryId, lang);
  if (!categoryLocalized) {
    notFound();
  }
  const t = getTranslations(lang);

  // Fetch trending podcasts for this category
  const podcasts = await fetchTrendingPodcasts(categoryId, lang);

  const breadcrumbContext: BreadcrumbParams = {
    from: 'category',
    catId: categoryId,
  };

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${lang}`}>{t['breadcrumb.home']}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{categoryLocalized?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mb-12">
          <h1 className="text-4xl font-bold">{categoryLocalized?.name}</h1>
        </header>

        {podcasts.length === 0 ? (
          <p className="text-muted-foreground">{t['search.noResults']}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {podcasts.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                podcast={podcast}
                language={lang}
                className="w-full"
                breadcrumbContext={breadcrumbContext}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
