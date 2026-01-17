import { PodcastIndex } from '@/lib/podcast-index';
import type { Episode } from '@/lib/podcast-index';
import { isValidLanguage } from '@/lib/i18n/locale';
import { getTranslations } from '@/lib/i18n/translations';
import { PodcastHeader } from '@/components/podcast/podcast-header';
import { EpisodesListClient } from '@/components/podcast/episodes-list-client';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { parseBreadcrumbParams, buildBreadcrumbTrail } from '@/lib/breadcrumb';
import { DynamicBreadcrumb } from '@/components/navigation/dynamic-breadcrumb';

function formatTitle(episode: Episode): string {
  let title = episode.title;

  if (episode.season && episode.episode) {
    title = `S${episode.season}E${episode.episode} - ${title}`;
  } else if (episode.episode) {
    title = `E${episode.episode} - ${title}`;
  }

  return title;
}

const EPISODES_PER_PAGE = 20;

interface PageProps {
  params: Promise<{ lang: string; id: string }>;
  searchParams: Promise<{
    page?: string;
    sort?: 'asc' | 'desc';
    search?: string;
    from?: string;
    catId?: string;
    q?: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const api = new PodcastIndex();

  try {
    const podcast = await api.getPodcastById(parseInt(id, 10));

    return {
      title: `${podcast.title} - Podcast Player`,
      description: podcast.description,
      openGraph: {
        title: podcast.title,
        description: podcast.description,
        images: [podcast.image || podcast.artwork],
      },
    };
  } catch {
    return {
      title: 'Podcast Not Found',
    };
  }
}

export default async function PodcastDetailPage({ params, searchParams }: PageProps) {
  const { lang, id } = await params;
  const feedId = parseInt(id, 10);

  // Validate language parameter
  if (!isValidLanguage(lang)) {
    notFound();
  }

  if (isNaN(feedId)) {
    notFound();
  }

  const api = new PodcastIndex();
  const t = getTranslations(lang);

  // Parse search params
  const searchParamsResolved = await searchParams;
  const page = Math.max(1, parseInt(searchParamsResolved.page || '1', 10));
  const sort = searchParamsResolved.sort === 'asc' ? 'asc' : 'desc';
  const searchQuery = searchParamsResolved.search || '';

  // Parse breadcrumb params
  const breadcrumbParams = parseBreadcrumbParams(searchParamsResolved);

  let podcast, allEpisodes;

  try {
    // Fetch podcast and episodes in parallel
    [podcast, allEpisodes] = await Promise.all([
      api.getPodcastById(feedId),
      api.getEpisodesByFeedId(feedId),
    ]);
  } catch (error) {
    console.error('Failed to fetch podcast:', error);
    notFound();
  }

  // Sort episodes by date
  const sortedEpisodes = [...allEpisodes].sort((a, b) => {
    return sort === 'desc'
      ? b.datePublished - a.datePublished
      : a.datePublished - b.datePublished;
  });

  // If search query exists, filter server-side for SEO
  const filteredEpisodes = searchQuery
    ? sortedEpisodes.filter(ep =>
        formatTitle(ep).toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sortedEpisodes;

  // Paginate
  const totalPages = Math.ceil(filteredEpisodes.length / EPISODES_PER_PAGE);
  const validPage = Math.min(page, Math.max(1, totalPages));
  const startIndex = (validPage - 1) * EPISODES_PER_PAGE;
  const paginatedEpisodes = filteredEpisodes.slice(
    startIndex,
    startIndex + EPISODES_PER_PAGE
  );

  // Build dynamic breadcrumb trail
  const breadcrumbTrail = buildBreadcrumbTrail({
    language: lang,
    params: breadcrumbParams,
    podcastTitle: podcast.title,
  });

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <DynamicBreadcrumb trail={breadcrumbTrail} className="mb-8" />

        <PodcastHeader podcast={podcast} language={lang} />

        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              {t['podcast.episodes']}
              <span className="text-muted-foreground text-lg ml-2">
                ({allEpisodes.length} {t['podcast.totalEpisodes']})
              </span>
            </h2>
          </div>

          <EpisodesListClient
            episodes={paginatedEpisodes}
            allEpisodes={sortedEpisodes}
            totalCount={filteredEpisodes.length}
            currentPage={validPage}
            totalPages={totalPages}
            sortOrder={sort}
            initialSearch={searchQuery}
            language={lang}
            podcastId={feedId}
            podcastImage={podcast.image || podcast.artwork}
            podcastTitle={podcast.title}
            breadcrumbContext={breadcrumbParams}
          />
        </div>
      </div>
    </main>
  );
}

export const revalidate = 3600; // Revalidate every hour
