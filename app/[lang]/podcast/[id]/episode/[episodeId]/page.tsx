import { PodcastIndex } from '@/lib/podcast-index';
import type { Episode } from '@/lib/podcast-index';
import { isValidLanguage } from '@/lib/i18n/constants';
import { getTranslations } from '@/lib/i18n/translations';
import type { SupportedLanguage } from '@/lib/i18n/constants';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { parseBreadcrumbParams, buildBreadcrumbTrail } from '@/lib/breadcrumb';
import { DynamicBreadcrumb } from '@/components/navigation/dynamic-breadcrumb';
import { EpisodeImage } from '@/components/podcast/episode-image';
import { sanitizeHtml } from '@/lib/sanitize-html';
import { PlayEpisodeButton } from '@/components/player';

interface PageProps {
  params: Promise<{ lang: string; id: string; episodeId: string }>;
  searchParams: Promise<{
    from?: string;
    catId?: string;
    q?: string;
  }>;
}

function formatTitle(episode: Episode): string {
  let title = episode.title;

  if (episode.season && episode.episode) {
    title = `S${episode.season}E${episode.episode} - ${title}`;
  } else if (episode.episode) {
    title = `E${episode.episode} - ${title}`;
  }

  return title;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function formatPublishDate(ts: number, language: SupportedLanguage): string {
  const date = new Date(ts * 1000);

  return date.toLocaleDateString(language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, episodeId } = await params;
  const api = new PodcastIndex();

  try {
    const [podcast, episodes] = await Promise.all([
      api.getPodcastById(parseInt(id, 10)),
      api.getEpisodesByFeedId(parseInt(id, 10)),
    ]);

    const episode = episodes.find((ep) => ep.id === parseInt(episodeId, 10));

    if (!episode) {
      return { title: 'Episode Not Found' };
    }

    return {
      title: `${episode.title} - ${podcast.title}`,
      description: episode.description.replace(/<[^>]*>/g, '').slice(0, 200),
      openGraph: {
        title: episode.title,
        description: episode.description.replace(/<[^>]*>/g, '').slice(0, 200),
        images: [episode.image || podcast.image || podcast.artwork],
      },
    };
  } catch {
    return { title: 'Episode Not Found' };
  }
}

export default async function EpisodeDetailPage({ params, searchParams }: PageProps) {
  const { lang, id, episodeId } = await params;
  const feedId = parseInt(id, 10);
  const epId = parseInt(episodeId, 10);

  if (!isValidLanguage(lang)) {
    notFound();
  }

  if (isNaN(feedId) || isNaN(epId)) {
    notFound();
  }

  const api = new PodcastIndex();
  const t = getTranslations(lang);

  // Parse breadcrumb params
  const searchParamsResolved = await searchParams;
  const breadcrumbParams = parseBreadcrumbParams(searchParamsResolved);

  let podcast, episode;

  try {
    const [podcastData, episodes] = await Promise.all([
      api.getPodcastById(feedId),
      api.getEpisodesByFeedId(feedId),
    ]);

    podcast = podcastData;
    episode = episodes.find((ep) => ep.id === epId);

    if (!episode) {
      notFound();
    }
  } catch (error) {
    console.error('Failed to fetch episode:', error);
    notFound();
  }

  const sanitizedDescription = sanitizeHtml(episode.description);

  // Build dynamic breadcrumb trail
  const breadcrumbTrail = buildBreadcrumbTrail({
    language: lang,
    params: breadcrumbParams,
    podcastTitle: podcast.title,
    podcastId: feedId,
    episodeTitle: episode.title,
  });

  return (
    <div className="container mx-auto px-4">
      {/* Breadcrumb */}
      <DynamicBreadcrumb trail={breadcrumbTrail} className="mb-8" />

      {/* Episode Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="shrink-0">
          <EpisodeImage
            src={episode.image}
            alt={episode.title}
            episode={episode}
            size={250}
            podcastImage={podcast.image || podcast.artwork}
            podcastTitle={podcast.title}
            className="rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{formatTitle(episode)}</h1>

          <div className="text-muted-foreground space-y-1">
            {episode.datePublished && (
              <p>
                {t['episodes.published']}: {formatPublishDate(episode.datePublished, lang)}
              </p>
            )}
            {episode.duration > 0 && (
              <p>
                {t['episodes.duration']}: {formatDuration(episode.duration)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Play Button */}
      <div className="mb-8">
        <PlayEpisodeButton
          episode={episode}
          podcast={podcast}
          language={lang}
          size="lg"
        />
        {/* Fallback audio player for no-JS */}
        <noscript>
          <audio src={episode.enclosureUrl} controls className="w-full mt-4" />
        </noscript>
      </div>

      {/* Description */}
      <div
        className="prose prose-neutral dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
    </div>
  );
}

export const revalidate = 86400; // Revalidate every day
