import Image from 'next/image';
import type { Podcast } from '@/lib/podcast-index';
import type { SupportedLanguage } from '@/lib/i18n/constants';
import { getTranslations } from '@/lib/i18n/translations';
import { Badge } from '@/components/ui/badge';

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
      <div className="shrink-0">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={podcast.title}
            width={300}
            height={300}
            className="rounded-lg shadow-lg border-2"
            priority
          />
        )}
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
            {Object.values(podcast.categories).map((category) => (
              <Badge key={category} variant="secondary">
                {category}
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
