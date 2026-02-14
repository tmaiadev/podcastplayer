"use client";

import { memo } from "react";
import type { Episode, Podcast } from "@/lib/podcast-index";
import type { SupportedLanguage } from "@/lib/i18n/constants";
import type { BreadcrumbParams } from "@/lib/breadcrumb";
import Link from "next/link";
import { getTranslations, TranslationKeys } from "@/lib/i18n/translations";
import { buildEpisodeUrl } from "@/lib/breadcrumb";
import { Card } from "@/components/ui/card";
import { PlayEpisodeButton } from "@/components/player";

interface EpisodeCardProps {
  episode: Episode;
  language: SupportedLanguage;
  podcast: Podcast;
  breadcrumbContext?: BreadcrumbParams;
}

function formatSeasonEpisode(t: TranslationKeys, season?: number, episode?: number): string {
  if (episode && season) {
    return t["episodes.season"] + ` ${season} - ` + t["episodes.episode"] + ` ${episode}`;
  } else if (episode) {
    return t["episodes.episode"] + ` ${episode}`;
  } else {
    return "";
  }
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  let output = "";
  if (hours > 0) {
    output += `${hours}h `;
  }
  if (minutes > 0 || hours > 0) {
    output += `${minutes}m `;
  }
  output += `${secs}s`;

  return output.trim();
}

function formatPublishDate(ts: number, language: SupportedLanguage): string {
  const date = new Date(ts * 1000);

  return date.toLocaleDateString(language, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const EpisodeCard = memo(function EpisodeCard({
  episode,
  language,
  podcast,
  breadcrumbContext,
}: EpisodeCardProps) {
  const t = getTranslations(language);
  const episodeUrl = buildEpisodeUrl(language, podcast.id, episode.id, breadcrumbContext);

  if (1 > 0) {
    return (
      <Link href={episodeUrl} className="flex flex-col hover:bg-muted p-4 -ms-4 -me-4" aria-label={episode.title}>
        <div className="text-muted-foreground text-sm">{formatSeasonEpisode(t, episode.season, episode.episode)}</div>
        <div className="font-bold">{episode.title}</div>
        <div className="line-clamp-3 text-muted-foreground text-xs">{episode.description.replace(/<[^>]*>/g, "")}</div>
        <div className="text-muted-foreground text-xs mt-2 flex flex-row gap-2">
          {episode.datePublished && (
            <span>
              {t["episodes.published"]}: {formatPublishDate(episode.datePublished, language)}
            </span>
          )}
          {episode.duration > 0 && (
            <span>
              {t["episodes.duration"]}: {formatDuration(episode.duration)}
            </span>
          )}
        </div>
        <noscript>
          {/* Fallback audio player for no-JS */}
          <div>
            <audio src={episode.enclosureUrl} controls className="w-full" />
          </div>
        </noscript>
        <div className="flex flex-row gap-4 mt-2">
          <PlayEpisodeButton
            episode={episode}
            podcast={podcast}
            language={language}
            showLabel={false}
            circle
          />
        </div>
      </Link>
    )
  }

  return (
    <Card className="gap-4 md:flex-row">
      <div className="flex flex-col gap-4 px-6 grow">
        <Link href={episodeUrl} className="block text-primary hover:underline">
          <h2 className="text-lg font-bold">
            {episode.title}
          </h2>
        </Link>

        <div className="flex flex-col gap-2">
          <div className="line-clamp-2">
            {episode.description.replace(/<[^>]*>/g, "")}
          </div>

          <div>
            {episode.datePublished && (
              <span>
                {t["episodes.published"]}: {formatPublishDate(episode.datePublished, language)}
              </span>
            )}

            {episode.duration > 0 && (
              <span className="ms-4">
                {t["episodes.duration"]}: {formatDuration(episode.duration)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <PlayEpisodeButton
            episode={episode}
            podcast={podcast}
            language={language}
            variant="outline"
            size="sm"
            circle
          />
          {/* Fallback audio player for no-JS */}
          <noscript>
            <audio src={episode.enclosureUrl} controls className="w-full" />
          </noscript>
        </div>
      </div>
    </Card >
  );
});
