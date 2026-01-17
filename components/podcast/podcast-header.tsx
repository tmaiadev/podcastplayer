import type { Podcast } from '@/lib/podcast-index';
import type { SupportedLanguage } from '@/lib/i18n/constants';
import { getTranslations } from '@/lib/i18n/translations';
import { getCategory } from '@/lib/categories';
import { Badge } from '@/components/ui/badge';
import { PodcastImage } from './podcast-image';

interface PodcastHeaderProps {
  podcast: Podcast;
  language: SupportedLanguage;
}

export function PodcastHeader({ podcast, language }: PodcastHeaderProps) {
  const t = getTranslations(language);
  const imageUrl = podcast.image || podcast.artwork;
  const author = podcast.author || podcast.ownerName;

  return (
    <header className="flex flex-col md:flex-row gap-8 items-start">
      {/* Podcast Image */}
      <div className="shrink-0 w-full md:w-auto">
        <PodcastImage
          src={imageUrl}
          alt={podcast.title}
          title={podcast.title}
          podcastId={podcast.id}
          size={300}
          priority
          className="rounded-lg shadow-lg border-2 w-full md:w-auto"
        />
      </div>

      {/* Podcast Info */}
      <div className="flex-1 space-y-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">{podcast.title}</h1>
          <p className="text-lg text-muted-foreground">
            <span className="sr-only">{t['podcast.by']}</span>
            {author}
          </p>
        </div>

        {/* Categories */}
        {podcast.categories && Object.keys(podcast.categories).length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {Object.entries(podcast.categories).map(([id, name]) => (
              <Badge key={id} variant="secondary">
                {getCategory(Number(id), language)?.name ?? name}
              </Badge>
            ))}
          </div>
        )}

        {/* Description */}
        {podcast.description && (
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {podcast.description}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
