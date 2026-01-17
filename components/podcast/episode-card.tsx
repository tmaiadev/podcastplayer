"use client";

import { memo } from "react";
import type { Episode, Podcast } from "@/lib/podcast-index";
import type { SupportedLanguage } from "@/lib/i18n/constants";
import type { BreadcrumbParams } from "@/lib/breadcrumb";
import Link from "next/link";
import { getTranslations } from "@/lib/i18n/translations";
import { buildEpisodeUrl } from "@/lib/breadcrumb";
import { Card } from "@/components/ui/card";
import { EpisodeImage } from "./episode-image";
import { PlayEpisodeButton } from "@/components/player";

interface EpisodeCardProps {
  episode: Episode;
  language: SupportedLanguage;
  podcast: Podcast;
  breadcrumbContext?: BreadcrumbParams;
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
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
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
  const podcastImage = podcast.image || podcast.artwork;

  return (
    <Card className="gap-4 md:flex-row">
      <div className="-mt-6 md:-mb-6 md:shrink-0 md:w-60">
        <EpisodeImage
          src={episode.image}
          alt={episode.title}
          episode={episode}
          size={295}
          podcastImage={podcastImage}
          podcastTitle={podcast.title}
          className="w-full rounded-b-none md:rounded-e-none"
        />
      </div>

      <div className="flex flex-col gap-4 px-6 grow">
        <Link href={episodeUrl} className="block text-primary hover:underline">
          <h2 className="text-lg font-bold">
            {formatTitle(episode)}
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
