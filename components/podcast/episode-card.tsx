import type { Episode } from '@/lib/podcast-index';
import type { SupportedLanguage } from '@/lib/i18n/constants';
import { getTranslations } from '@/lib/i18n/translations';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface EpisodeCardProps {
  episode: Episode;
  language: SupportedLanguage;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function EpisodeCard({ episode, language }: EpisodeCardProps) {
  const t = getTranslations(language);

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex flex-col gap-3">
        {/* Title and Badges */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold flex-1 line-clamp-2">
            {episode.title}
          </h3>

          <div className="flex gap-2 shrink-0">
            {episode.season && (
              <Badge variant="secondary" className="text-xs">
                {t['episodes.season']} {episode.season}
              </Badge>
            )}
            {episode.episode && (
              <Badge variant="secondary" className="text-xs">
                {t['episodes.episode']} {episode.episode}
              </Badge>
            )}
          </div>
        </div>

        {/* Description */}
        {episode.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {episode.description.replace(/<[^>]*>/g, '')}
          </p>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {episode.datePublishedPretty && (
            <span>
              {t['episodes.published']}: {episode.datePublishedPretty}
            </span>
          )}

          {episode.duration > 0 && (
            <span>
              {t['episodes.duration']}: {formatDuration(episode.duration)}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
